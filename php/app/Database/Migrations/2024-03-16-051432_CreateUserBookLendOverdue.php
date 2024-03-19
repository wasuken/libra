<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserBookLendOverdue extends Migration
{
public function up()
  {
    $this->forge->addField([
      'lend_overdue_id' => [
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
      'overdue_date' => [
        'type' => 'datetime',
        'null'=> false,
      ],
      'status' => [
        'type' => 'TINYINT',
        'default' => 0
      ],
    ]);
    $this->forge->addKey('lend_overdue_id', true);
    $this->forge->createTable('user_lend_book_overdues');
    $this->db->query("ALTER TABLE `user_lend_book_overdues` CHANGE `overdue_date` `overdue_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");
    $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE', 'fk_user_id');
    $this->forge->addForeignKey('book_id', 'books', 'id', 'CASCADE', 'CASCADE', 'fk_book_id');
  }

  public function down()
  {
    //
    $this->forge->dropTable('user_lend_book_overdues');
  }
}
