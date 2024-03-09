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
    $model = new Book();
    $books = $model->findAll();
    return $this->respond($books, 200);
  }
  public function create()
  {
    $rules = [
      "title" => "required",
      "isbn" => "required|exact_length[13]|alpha_numeric",
      "author" => "permit_empty",
      "thumbnail_url" => "permit_empty|valid_email",
      "stock" => "permit_empty|alpha_numeric",
      "publisher" => "permit_empty",
      "publicationDate" => "permit_empty|valid_date",
    ];
    $status = 200;
    $response = [];

    if (!$this->validate($rules)) {
      $status = 400;
      $response = [
        "message" => $this->validator->getErrors(),
        "data" => []
      ];
    }else{
      $model = new Book();
      $validData = $this->validator->getValidated();
      $validData["publication_date"] = $validData['publicationDate'];
      unset($validData['publicationDate']);
      $model->insert($validData);
    }
    return $this->respond($response, $status);
  }
}
