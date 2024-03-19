<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserLendBook;
use App\Models\UserLendBookReserve;

use CodeIgniter\RESTful\ResourceController;

class UserBooksController extends ResourceController
{
  public function index()
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $data = $model->books();
    $status = 200;
    $msg = '';
    return $this->respond([
      "message" => $msg,
      "data" => $data,
    ], $status);
  }
  public function status()
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $statusData = $model->status($user->id);
    $status = 200;
    $msg = '';
    return $this->respond([
      "message" => $msg,
      "data" => $statusData,
    ], $status);
  }
  // // 本の返却
  public function return($id)
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $rst = $model->userReturnBook($user->id, $id);

    $status = 200;
    $msg = "success.";
    if(!$rst){
      $status = 400;
      $msg = "failed return";
    }
    return $this->respond([
      "message" => $msg,
      "data" => []
    ], $status);
  }
  // // 本のレンタル
  public function rental($id)
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $rst = $model->userRentalBook($user->id, $id);

    $status = 200;
    $msg = "success.";
    if(!$rst){
      $status = 400;
      $msg = "failed return";
    }
    return $this->respond([
      "message" => $msg,
      "data" => []
    ], $status);
  }
  // レンタル中の本一覧を取得する
  public function rentalBooks()
  {
    $model = new UserLendBook();
    $user = auth()->user();
    $rst = $model->userRentalBooks($user->id);

    $status = 200;
    $msg = "success.";
    if(!$rst){
      $status = 400;
      $msg = "failed rental books";
    }
    return $this->respond([
      "message" => $msg,
      "data" => $rst
    ], $status);
  }
  public function reserve($id)
  {
    $model = new UserLendBookReserve();
    $user = auth()->user();
    $model->reserve($user->id, $id);
    $msg = "";
    $status = 200;
    return $this->respond([
      "message" => $msg,
      "data" => [],
    ], $status);
  }
  public function extension($id)
  {
    $model = new UserLendBookReserve();
    $user = auth()->user();
    $model->extension($user->id, $id);
    $msg = "";
    $status = 200;
    return $this->respond([
      "message" => $msg,
      "data" => [],
    ], $status);
  }

}
