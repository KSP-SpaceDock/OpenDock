<?php

$app->get('/profile/{id}[/{name}]', function($request, $response, $args) {
    return $this->view->render($response, 'templates/view_profile.html', [
        'userid' => $args['id']
    ]);
})->setName('profile.view');

?>