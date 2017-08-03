<?php

$app->get('/mod/{id}[/{name}]', function($request, $response, $args) {
    return $this->view->render($response, 'templates/mod.html', [
        'modid' => $args['id']
    ]);
})->setName('mod.view');

$app->get('/random', function($request, $response, $args) {
    $backend_url = $this->get('settings')['backend-url'];
    $gameshort = $this->get('settings')['gameshort'];
    $json = file_get_contents('http://'  . $backend_url . '/api/mods/' . $gameshort . '/random');
    $random_mod = json_decode($json);

    return $response->withRedirec('/mod/ '.$random_mod->data[0]->id);
})->setName('mod.random');

?>