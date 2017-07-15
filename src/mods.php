<?php

$app->get('/mod/{id}[/{name}]', function($request, $response, $args) {
    $page = "";
    if (isset($args['page'])) {
        $page = $args['page'];
    } else {
        $page = '1';
    }
    return $this->view->render($response, 'templates/mod.html', [
        'modid' => $args['id']
    ]);
})->setName('mod.view');

?>