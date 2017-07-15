<?php

$app->get('/browse/new[/{page}]', function($request, $response, $args) {
    $page = "";
    if (isset($args['page'])) {
        $page = $args['page'];
    } else {
        $page = '1';
    }
    return $this->view->render($response, 'templates/browse-list.html', [
        'page' => $page,
        'url' => '/browse/new',
        'name' => 'Newest Mods', 
        //'rss' => '/browse/new.rss',
        'search' => 'false'
    ]);
})->setName('browse.new');

$app->get('/browse/updated[/{page}]', function($request, $response, $args) {
    $page = "";
    if (isset($args['page'])) {
        $page = $args['page'];
    } else {
        $page = '1';
    }
    return $this->view->render($response, 'templates/browse-list.html', [
        'page' => $page,
        'url' => '/browse/updated',
        'name' => 'Recently Updated Mods', 
        //'rss' => '/browse/updated.rss',
        'search' => 'false'
    ]);
})->setName('browse.updated');

$app->get('/browse/top[/{page}]', function($request, $response, $args) {
    $page = "";
    if (isset($args['page'])) {
        $page = $args['page'];
    } else {
        $page = '1';
    }
    return $this->view->render($response, 'templates/browse-list.html', [
        'page' => $page,
        'url' => '/browse/top',
        'name' => 'Popular Mods', 
        //'rss' => '/browse/top.rss',
        'search' => 'false'
    ]);
})->setName('browse.top');

$app->get('/browse/featured[/{page}]', function($request, $response, $args) {
    $page = "";
    if (isset($args['page'])) {
        $page = $args['page'];
    } else {
        $page = '1';
    }
    return $this->view->render($response, 'templates/browse-list.html', [
        'page' => $page,
        'url' => '/browse/featured',
        'name' => 'Featured Mods', 
        //'rss' => '/browse/featured.rss',
        'search' => 'false'
    ]);
})->setName('browse.featured');

?>
