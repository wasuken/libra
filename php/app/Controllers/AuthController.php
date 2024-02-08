<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Shield\Entities\User;

class AuthController extends ResourceController
{
  public function register()
  {
    $rules = [
      "username" => "required|is_unique[users.username]",
      "email" => "required|valid_email|is_unique[auth_identities.secret]",
      "password" => "required"
    ];
    $status = 200;

    if (!$this->validate($rules)) {

      $status = 400;
      $response = [
        "message" => $this->validator->getErrors(),
        "data" => []
      ];
    } else {

      // User Model
      $userObject = new UserModel();

      // User Entity
      $userEntityObject = new User([
        "username" => $this->request->getVar("username"),
        "email" => $this->request->getVar("email"),
        "password" => $this->request->getVar("password")
      ]);

      $userObject->save($userEntityObject);

      $response = [
        "message" => "User saved successfully",
        "data" => []
      ];
    }

    return $this->respond($response, $status);
  }
  public function login()
  {

    if(auth()->loggedIn()){
      auth()->logout();
    }
    $status = 200;

    $rules = [
      "email" => "required|valid_email",
      "password" => "required"
    ];

    if (!$this->validate($rules)) {
      $status = 400;
      $response = [
        "message" => $this->validator->getErrors(),
        "data" => []
      ];
    } else {

      // success
      $credentials = [
        "email" => $this->request->getVar("email"),
        "password" => $this->request->getVar("password")
      ];

      $loginAttempt = auth()->attempt($credentials);

      if (!$loginAttempt->isOK()) {

        $response = [
          "message" => "Invalid login details",
          "data" => []
        ];
      } else {

        // We have a valid data set
        $userObject = new UserModel();

        $userData = $userObject->findById(auth()->id());

        $token = $userData->generateAccessToken(getenv("secretkey"));

        $auth_token = $token->raw_token;

        $response = [
          "status" => true,
          "message" => "User logged in successfully",
          "data" => [
            "token" => $auth_token
          ]
        ];
      }
    }

    return $this->respond($response, $status);
  }
  public function profile()
  {
    $userId = auth()->id();

    $userObject = new UserModel();

    $userData = $userObject->findById($userId);

    return $this->respond([
      "message" => "Profile information of logged in user",
      "data" => [
        "user" => $userData
      ]
    ], 200);
  }
  public function logout()
  {
    auth()->logout();

    auth()->user()->revokeAllAccessTokens();

    return $this->respond([
      "message" => "User logged out successfully",
      "data" => []
    ], 200);
  }
  public function accessDenied()
  {
    return $this->respond([
      "message" => "Invalid access",
      "data" => []
    ], 400);
  }
}
