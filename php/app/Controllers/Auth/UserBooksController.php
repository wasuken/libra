<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserLendBook;
use CodeIgniter\RESTful\ResourceController;

class UserBooksController extends ResourceController
{
  // // 本の返却
  public function return($id)
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $rst = $model->userReturnBook($user->id, $id);
    return $this->respond([
      "message" => "success",
      "data" => []
    ], 200);
  }
  // // 本のレンタル
  public function rental($id)
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $rst = $model->userRentalBook($user->id, $id);
    return $this->respond([
      "message" => "not implement",
      "data" => []
    ], 200);
  }
}
