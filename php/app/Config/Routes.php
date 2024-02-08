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
  $routes->post("login", "AuthController::login");
  $routes->get("profile", "AuthController::profile", ["filter" => "apiauth"]);
  $routes->get("logout", "AuthController::logout", ["filter" => "apiauth"]);
});
