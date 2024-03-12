<?php

namespace App\Models;

use CodeIgniter\Model;

class UserLendBookReserve extends Model
{
  protected $table            = 'userlendbookreserves';
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
}
