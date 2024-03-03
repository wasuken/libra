<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\Book;
use CodeIgniter\API\ResponseTrait;

class BooksController extends BaseController
{
  use ResponseTrait;
  // 本一覧
  public function index()
  {
    log_message("error", "er");

    $model = new Book();
    $books = $model->findAll();
    return $this->respond($books, 200);
  }
}
