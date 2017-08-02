<?php

$app->get('/mod/{id}[/{name}]', function($request, $response, $args) {
    return $this->view->render($response, 'templates/mod.html', [
        'modid' => $args['id']
    ]);
})->setName('mod.view');

?>