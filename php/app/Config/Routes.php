<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');

// service('auth')->routes($routes);
$routes->group("api", ["namespace" => "App\Controllers"], function ($routes) {
  $routes->get("invalid-access", "AuthController::accessDenied");
  $routes->post("register", "AuthController::register");
  $routes->post('login', 'AuthController::jwtLogin');
  $routes->group('user', ["namespace" => "App\Controllers\User", 'filter' => 'jwt'], function($routes) {
    $routes->get("logout", "AuthController::logout");
  });
});
