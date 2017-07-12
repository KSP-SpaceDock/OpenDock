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
    $view->getEnvironment()->addGlobal('site_name', $container->get('settings')['site-name']);
    $view->getEnvironment()->addGlobal('support_mail', $container->get('settings')['support-mail']);
    $view->getEnvironment()->addGlobal('source_code', $container->get('settings')['source-code']);
    $view->getEnvironment()->addGlobal('irc_channel', $container->get('settings')['irc-channel']);
    $view->getEnvironment()->addGlobal('donation_link', $container->get('settings')['donation-link']);
    $view->getEnvironment()->addGlobal('backend_url', $container->get('settings')['backend-url']);
    $view->getEnvironment()->addGlobal('gameshort', $container->get('settings')['gameshort']);

    return $view;
};

// Routes here.
require 'src/routes/anonymus.php';
require 'src/routes/browse.php';
require 'src/routes/mods.php';

// Wrapper routes
$app->get('/static/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('..', 'static', $args['filename']));
    return $this->view->render($response, $file_path);
})->setName('static');

$app->get('/styles/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('..', 'styles', $args['filename']));
    return $this->view->render($response, $file_path);
})->setName('styles');

$app->get('/images/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('..', 'images', $args['filename']));
    return $this->view->render($response, $file_path);
})->setName('images');

// Start the app
$app->run();

?>