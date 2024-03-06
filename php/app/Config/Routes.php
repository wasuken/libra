<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');

// service('auth')->routes($routes);
$routes->group("api", ["namespace" => "App\Controllers"], static function ($routes) {
  $routes->get("invalid-access", "AuthController::accessDenied");
  $routes->post("register", "AuthController::register");
  $routes->post('login', 'AuthController::jwtLogin');

  $routes->get('books', 'Auth\BooksController::index', ['filter' => 'jwt']);
  $routes->get('rental/books', 'Auth\UserBooksController::rentalbooks', ['filter' => 'jwt']);
  $routes->post('book', 'Auth\BooksController::create', ['filter' => 'jwt']);
  $routes->post('book/rental/(:segment)', 'Auth\UserBooksController::rental/$1', ['filter' => 'jwt']);
  $routes->post('book/return/(:segment)', 'Auth\UserBooksController::return/$1', ['filter' => 'jwt']);


  $routes->group('user', ["namespace" => "App\Controllers\Auth", 'filter' => 'jwt'], function($routes) {
    $routes->get("logout", "AuthController::logout");
  });
});
