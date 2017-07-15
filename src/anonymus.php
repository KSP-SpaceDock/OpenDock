<?php

$app->get('/', function($request, $response) {
    return $this->view->render($response, 'templates/index.html');
});

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

$app->post('/register', function() {
    echo('');
})->setName('accounts.register');

?>