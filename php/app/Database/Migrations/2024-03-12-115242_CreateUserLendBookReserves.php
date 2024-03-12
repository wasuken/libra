<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserBookLendReserves extends Migration
{
  public function up()
  {
    $this->forge->addField([
      'lend_reserve_id' => [
        'type' => 'INT',
        'constraint' => 5,
        'unsigned' => true,
        'auto_increment' => true,
      ],
      'book_id' => [
        'type' => 'INT',
        'constraint' => 5,
        'unsigned' => true,
      ],
      'user_id' => [
        'type' => 'INT',
        'constraint' => 5,
        'unsigned' => true,
      ],
      'reserve_date' => [
        'type' => 'datetime',
        'null'=> false,
      ],
    ]);
    $this->forge->addKey('lend_reserve_id', true);
    $this->forge->createTable('user_lend_book_reserves');
    $this->db->query("ALTER TABLE `user_lend_book_reserves` CHANGE `reserve_date` `reserve_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");
    $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE', 'fk_user_id');
    $this->forge->addForeignKey('book_id', 'books', 'id', 'CASCADE', 'CASCADE', 'fk_book_id');
  }

  public function down()
  {
    //
    $this->forge->dropTable('user_lend_book_reserves');
  }
}
