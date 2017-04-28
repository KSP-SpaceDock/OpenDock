<?php

$app->get('/', function($request, $response) {
    return $this->view->render($response, 'index.html');
});

$app->get('/privacy', function($request, $response) {
    return $this->view->render($response, 'privacy.html');
})->setName('privacy');

$app->get('/markdown', function($request, $response) {
    return $this->view->render($response, 'markdown.html');
})->setName('markdown');

$app->get('/about', function($request, $response) {
    return $this->view->render($response, 'about.html');
})->setName('about');

$app->get('/static/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('..', 'static', $args['filename']));
    return $this->view->render($response, $file_path);
})->setName('static');

$app->get('/login', function($request, $response) {
    return $this->view->render($response, 'login.html');
})->setName('accounts.login');

$app->get('/account-pending', function($request, $response) {
    return $this->view->render($response, 'account-pending.html');
})->setName('accounts.account_pending');

$app->get('/forgot-password', function($request, $response) {
    return $this->view->render($response, 'forgot.html');
})->setName('accounts.forgot_password');

$app->post('/register', function() {
    echo('');
})->setName('accounts.register');

?>