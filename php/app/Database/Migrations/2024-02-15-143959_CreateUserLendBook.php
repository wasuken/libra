<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserLendBook extends Migration
{
  public function up()
  {
    //
    $this->forge->addField([
      'lend_id' => [
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
      'lend_date' => [
        'type' => 'datetime',
        'null'=> false,
      ],
      'due_date' => [
        'type' => 'datetime',
      ],
      'return_date' => [
        'type' => 'datetime',
        'null' => true,
      ],
    ]);
    $this->forge->addKey('lend_id', true);
    $this->forge->createTable('user_lend_books');
    $this->db->query("ALTER TABLE `user_lend_books` CHANGE `lend_date` `lend_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");
    $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE', 'fk_user_id');
    $this->forge->addForeignKey('book_id', 'books', 'id', 'CASCADE', 'CASCADE', 'fk_book_id');
  }

  public function down()
  {
    //
    $this->forge->dropTable('user_lend_books');
  }
}
