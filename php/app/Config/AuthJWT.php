<?php

// app/Config/AuthJWT.php

declare(strict_types=1);

namespace Config;

use CodeIgniter\Shield\Config\AuthJWT as ShieldAuthJWT;

/**
 * JWT Authenticator Configuration
 */
class AuthJWT extends ShieldAuthJWT
{
  public array $defaultClaims = [
    'iss' => 'https://archoox.archmint.local:10433/'
  ];
}
