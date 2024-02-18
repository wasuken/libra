<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class BookController extends BaseController
{
  // 本一覧
  public function index()
  {
    return $this->respond([
      "message" => "not implement",
      "data" => []
    ], 500);
  }
  // // 本の返却
  public function return($id)
  {
    return $this->respond([
      "message" => "not implement",
      "data" => []
    ], 500);
  }
  // // 本のレンタル
  public function rental($id)
  {
    return $this->respond([
      "message" => "not implement",
      "data" => []
    ], 500);
  }
}
