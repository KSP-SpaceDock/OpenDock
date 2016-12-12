<?php

// Load composer dependencies
error_reporting(E_ALL | E_STRICT);
require 'vendor/autoload.php';
require 'src/coffee.php';

// Settings
$settings = require 'config.php';
$settings['settings']['displayErrorDetails'] = $settings['settings']['debug'];

// Create a new app
$app = new \Slim\App($settings);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(__DIR__ . '/templates', [
        'cache' => $container->get('settings')['debug'] ? false : __DIR__ . '/cache',
        'displayErrorDetails' => $container->get('settings')['debug']
    ]);
    
    // Instantiate and add Slim specific extension
    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));
    
    // Add globals like this
    $view->getEnvironment()->addGlobal('site_name', $container->get('settings')['site_name']);

    return $view;
};


// Routes here.
$app->get('/', function($request, $response) {
    return $this->view->render($response, 'index.html');
});

$app->get('/static/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('static', $args['filename']));
    return $response->write(file_get_contents($file_path));
})->setName('static');

// Compile SCSS and CoffeeScript
if ($container->get('settings')['debug']) {
    CoffeeCompiler::run('scripts/', 'static/');
    SassCompiler::run("styles/", "static/");
}

// Start the app
$app->run();

?>