<?php

$app->get('/', function($request, $response) {
    // return $this->view->render($response, 'templates/index.html');
    // TODO: Add index page
    $gameshort = $this->get('settings')['gameshort'];
    return $response->withRedirect("/{$gameshort}", 302);
})->setName('index');

$app->get('/{gameshort}', function($request, $response, $args) {
    return $this->view->render($response, 'templates/game.html' [
        'gameshort' => $args['gameshort']
    ]);
})->setName('game');

$app->get('/privacy', function($request, $response) {
    return $this->view->render($response, 'templates/privacy.html');
})->setName('privacy');

$app->get('/markdown', function($request, $response) {
    return $this->view->render($response, 'templates/markdown.html');
})->setName('markdown');

$app->get('/about', function($request, $response) {
    return $this->view->render($response, 'templates/about.html');
})->setName('about');

$app->get('/login', function($request, $response) {
    return $this->view->render($response, 'templates/login.html');
})->setName('accounts.login');

$app->get('/account-pending', function($request, $response) {
    return $this->view->render($response, 'templates/account-pending.html');
})->setName('accounts.account_pending');

$app->get('/forgot-password', function($request, $response) {
    return $this->view->render($response, 'templates/forgot.html');
})->setName('accounts.forgot_password');

$app->get('/register', function($request, $response) {
    return $this->view->render($response, 'templates/register.html');
})->setName('accounts.register');

$app->get('/not-found', function($request, $response) {
    return $this->view->render($response, 'templates/not_found.html');
})->setName('not-found');

?>