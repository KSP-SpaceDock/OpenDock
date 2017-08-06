<?php

$app->get('/mod/{id}[/{name}]', function($request, $response, $args) {
    return $this->view->render($response, 'templates/mod.html', [
        'modid' => $args['id']
    ]);
})->setName('mod.view');

$app->get('/random', function($request, $response, $args) {
    $backend_url = $this->get('settings')['backend-url'];
    $gameshort = $this->get('settings')['gameshort'];
    $json = file_get_contents("http://{$backend_url}/api/mods/{$gameshort}/random");
    $random_mod = json_decode($json, true);

    return $response->withRedirect("mod/{$random_mod['data']['id']}/{$random_mod['data']['name']}", 302);
})->setName('mod.random');

$app->get('/create/mod', function($request, $response, $args) {
    return $this->view->render($response, 'templates/create.html');
})->setName('mod.create');

$app->get('/update/mod/{id}[/{name}]', function($request, $response, $args) {
    return $this->view->render($response, 'templates/update.html', [
        'modid' => $args['id']
    ]);
})->setName('mod.update');

?>