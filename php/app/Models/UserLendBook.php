<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Database\Exceptions\DatabaseException;

class UserLendBook extends Model
{
  protected $table            = 'userlendbooks';
  protected $primaryKey       = 'id';
  protected $useAutoIncrement = true;
  protected $returnType       = 'array';
  protected $useSoftDeletes   = false;
  protected $protectFields    = false;
  protected $allowedFields    = [];

  protected bool $allowEmptyInserts = false;

  // Dates
  protected $useTimestamps = false;
  protected $dateFormat    = 'datetime';
  protected $createdField  = 'created_at';
  protected $updatedField  = 'updated_at';
  protected $deletedField  = 'deleted_at';

  // Validation
  protected $validationRules      = [];
  protected $validationMessages   = [];
  protected $skipValidation       = false;
  protected $cleanValidationRules = true;

  // Callbacks
  protected $allowCallbacks = true;
  protected $beforeInsert   = [];
  protected $afterInsert    = [];
  protected $beforeUpdate   = [];
  protected $afterUpdate    = [];
  protected $beforeFind     = [];
  protected $afterFind      = [];
  protected $beforeDelete   = [];
  protected $afterDelete    = [];

  // ユーザーが対象の本をレンタルしており、かつ返却している
  private function isUserLending($user_id, $book_id)
  {
    $model = new UserLendBook();
    $record = $model
      ->where('user_id', $user_id)
      ->where('book_id', $book_id)
      ->where('return_date is null')
      ->first();

    return empty($record);
  }
  // すでに最大レンタル数に達しているか
  private function isOverBorrowLimit($user_id)
  {
    $model = new UserLendBook();
    $record = $model
      ->select('count(*) as cnt')
      ->where('user_id', $user_id)
      ->where('return_date is null')
      ->first();

    $cnt = $record['cnt'];

    // 4冊まで
    return $cnt > 4;
  }

  // ユーザーのレンタル処理
  public function userRentalBook($user_id, $book_id)
  {
    $rst = false;
    try {
      $this->db->transException(true)->transStart();

      if(!$this->isUserLending($user_id, $book_id)){
        throw new DatabaseException('Already rental.');
      }else if($this->isOverBorrowLimit($book_id)){
        throw new DatabaseException('Rental Book num over borrow limit.');
      }

      $rst = $this->insert([
        'book_id' => $book_id,
        'user_id' => $user_id,
        'lend_date' => date("Y-m-d"),
        // とりえあず二週間後
        'due_date' => date("Y-m-d", strtotime("+14 day")),
      ]);

      $this->db->transComplete();
      $rst = true;
    } catch (DatabaseException $e) {
      $this->db->transRollback();
    }
    return $rst;
  }
  public function userReturnBook($user_id, $book_id)
  {
    $rst = false;
    try {
      $this->db->transException(true)->transStart();
      if($this->isUserLending($user_id, $book_id)){
        throw new DatabaseException('Not rental.');
      }

      $this
        ->where('book_id', $book_id)
        ->where('user_id', $user_id)
        ->where('return_date is null')
        ->update([
          'return_date' => date("Y-m-d"),
        ]);

      $this->db->transComplete();
      $rst = true;
    } catch (DatabaseException $e) {
      $this->db->transRollback();
    }
    return $rst;
  }
}
