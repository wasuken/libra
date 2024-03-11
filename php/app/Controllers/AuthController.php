<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

use CodeIgniter\Shield\Models\UserModel;
use CodeIgniter\Shield\Entities\User;

use CodeIgniter\Shield\Authentication\Authenticators\Session;
use CodeIgniter\Shield\Authentication\JWTManager;
use CodeIgniter\Shield\Validation\ValidationRules;

class AuthController extends ResourceController
{
  public function jwtLogin(): ResponseInterface
  {
    try{
      // Get the validation rules
      $rules = $this->getValidationRules();

      // Validate credentials
      if (! $this->validateData($this->request->getJSON(true), $rules, [], config('Auth')->DBGroup)) {
        return $this->fail(
          ['errors' => $this->validator->getErrors()],
          $this->codes['unauthorized']
        );
      }

      // Get the credentials for login
      $credentials             = $this->request->getJsonVar(setting('Auth.validFields'));
      $credentials             = array_filter($credentials);
      $credentials['password'] = $this->request->getJsonVar('password');

      /** @var Session $authenticator */
      $authenticator = auth('session')->getAuthenticator();

      // Check the credentials
      $result = $authenticator->check($credentials);

      // Credentials mismatch.
      if (!$result->isOK()) {
        return $this->failUnauthorized($result->reason());
      }

      $user = $result->extraInfo();
      $payload = [
        'email' => $user->email,
        'id' => $user->id,
        'sub' => $user->id,
        'username' => $user->username,
      ];

      /** @var JWTManager $manager */
      $manager = service('jwtmanager');

      $jwt = $manager->issue($payload, (3 * 60 * 60 * 24));

      return $this->respond([
        'access_token' => $jwt,
      ]);
    }catch(\Exception $e){
      log_message('error', $e->getMessage());
      return $this->fail(
        ['server_error' => []],
        [500],
      );
    }
  }

  /**
   * Returns the rules that should be used for validation.
   *
   * @return array<string, array<string, array<string>|string>>
   * @phpstan-return array<string, array<string, string|list<string>>>
   */
  protected function getValidationRules(): array
  {
    $rules = new ValidationRules();

    return $rules->getLoginRules();
  }
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
  public function accessDenied()
  {
    return $this->respond([
      "message" => "Invalid access",
      "data" => []
    ], 400);
  }
}
