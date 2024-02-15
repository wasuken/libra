<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateBook extends Migration
{
  public function up()
  {
    //
    $this->forge->adField([
      'id' => [
        'type' => 'INT',
        'constraint' => 5,
        'unsigned' => true,
        'auto_increment' => true,
      ],
      'title' => [
        'type' => 'varchar',
        'constraint' => '200',
      ],
      'author' => [
        'type' => 'varchar',
        'constraint' => '100',
      ],
      'isbn' => [
        'type' => 'varchar',
        'constraint' => '13',
      ],
      'publisher' => [
        'type' => 'varchar',
        'constraint' => '200',
      ],
      'publication_date' => [
        'type' => 'date',
      ],
    ]);
    $this->forge->addKey('id', true);
    $this->forge->createTable('books');
  }

  public function down()
  {
    //
    $this->forge->dropTable('books');
  }
}
