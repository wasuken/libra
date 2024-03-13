<?php

namespace App\Models;

use CodeIgniter\Model;

class UserLendBookReserve extends Model
{
  protected $table            = 'user_lend_book_reserves';
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

  public function reserve($user_id, $book_id)
  {
    // request時点の予約なのでreserve_dateは省略(CURRENT_DATETIME)
    $this->insert([
      'book_id' => $book_id,
      'user_id' => $user_id,
    ]);
  }
  // 予約できる本か
  // 自分以外の有効な予約がはいっていない
  public function otherReserves($user_id, $book_id)
  {
    // 予約されていない
    $rst = $this
      ->where('status = 0')
      // 自分が予約している場合はOK
      ->where('user_id <> ', $user_id)
      ->where('book_id', $book_id)
      ->findAll();


    return count($rst);
  }
  // 予約をとりけす。
  public function disableReserve($user_id, $book_id)
  {
    $this
      ->where('status = 0')
      ->where('user_id', $user_id)
      ->where('book_id', $book_id)
      ->set([
        'status' => 1,
      ])
      ->update();
  }
}
