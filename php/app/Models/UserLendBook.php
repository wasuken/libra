<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Database\Exceptions\DatabaseException;

class UserLendBook extends Model
{
  protected $table            = 'user_lend_books';
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
  private function userRentalCount($user_id)
  {
    $model = new UserLendBook();
    $record = $model
      ->select('count(*) as cnt')
      ->where('user_id', $user_id)
      ->where('return_date is null')
      ->first();

    return $record['cnt'];
  }
  // すでに最大レンタル数に達しているか
  private function isOverBorrowLimit($user_id)
  {
    // 4冊まで
    return $this->userRentalCount($user_id) > 4;
  }

  // ユーザーのレンタル処理
  public function userRentalBook($user_id, $book_id)
  {
    $rst = false;
    try {
      $this->db->transException(true)->transStart();
      $resModel = new UserLendBookReserve();
      if(!$this->isUserLending($user_id, $book_id)){
        throw new DatabaseException('Already rental.');
      }else if($this->isOverBorrowLimit($book_id)){
        throw new DatabaseException('Rental Book num over borrow limit.');
      }else if($resModel->otherReserves($user_id, $book_id) > 0){
        throw new DatabaseException('Book is reserving.');
      }

      $rst = $this->insert([
        'book_id' => $book_id,
        'user_id' => $user_id,
        'lend_date' => date("Y-m-d"),
        // とりえあず二週間後
        'due_date' => date("Y-m-d", strtotime("+14 day")),
      ]);
      $resModel->disableReserve($user_id, $book_id);

      $this->db->transComplete();
      $rst = true;
    } catch (DatabaseException $e) {
      log_message('error', $e);
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
        ->set([
          'return_date' => date("Y-m-d H:i:s"),
        ])
        ->update();

      $this->db->transComplete();
      $rst = true;
    } catch (DatabaseException $e) {
      log_message('error', $e);
      $this->db->transRollback();
    }
    return $rst;
  }
  public function userRentalBooks($user_id)
  {
    $rst = false;
    try {
      $this->db->transException(true)->transStart();
      $rst = $this
        ->select('books.*, return_date, due_date, lend_date')
        ->join('books', 'user_lend_books.book_id = books.id')
        ->where('user_id', $user_id)
        ->findAll();

      $this->db->transComplete();
    } catch (DatabaseException $e) {
      log_message('error', $e);
      $this->db->transRollback();
    }
    return $rst;
  }
  public function status($user_id)
  {
    $rentalCount = $this->userRentalCount($user_id);
    return [
      "bookCount" => $rentalCount,
    ];
  }
  public function books()
  {
    $model = new Book();
    $query = $this->db->query(<<<EOT
select b.*,
b.stock - (
      select count(*) from user_lend_books as ub2
      where ub2.book_id = b.id and ub2.return_date is null
) as stock,
(
      select count(*) from user_lend_books as ub2
      where ub2.book_id = b.id and ub2.return_date is null
) as rentals,
b.stock as bstock,
(
      select count(*) from user_lend_book_reserves as res
      where res.book_id = b.id and res.status = 0
) as reserves,
return_date, due_date, lend_date, ub.user_id as rental_user_id, username,
res.user_id as reserve_user_id
from books as b
left outer join user_lend_books as ub on ub.book_id = b.id and return_date is null
left outer join user_lend_book_reserves as res on res.book_id = b.id and status <> 1
left outer join users as u on ub.user_id = u.id
EOT);
    return $query->getResultArray();
  }
}
