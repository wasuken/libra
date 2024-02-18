<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class UserController extends BaseController
{
  public function logout()
  {
    auth()->logout();

    auth()->user()->revokeAllAccessTokens();

    return $this->respond([
      "message" => "User logged out successfully",
      "data" => []
    ], 200);
  }
  // ログインユーザー情報更新
  public function update($id)
  {
    return $this->respond([
      "message" => "not implement",
      "data" => []
    ], 500);
  }
}
