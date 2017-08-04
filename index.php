<?php

// Load composer dependencies
error_reporting(E_ALL | E_STRICT);
require 'vendor/autoload.php';

// Settings
$settings = require 'config.php';
$settings['settings']['displayErrorDetails'] = $settings['settings']['debug'];

// Create a new app
$app = new \Slim\App($settings);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(__DIR__ , [
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
    $view->getEnvironment()->addGlobal('debug', $container->get('settings')['debug']);
    $view->getEnvironment()->addGlobal('update_interval', $container->get('settings')['update-interval']);
    $view->getEnvironment()->addGlobal('registration', $container->get('settings')['registration']);


    return $view;
};

// Routes here.
require 'src/anonymus.php';
require 'src/browse.php';
require 'src/mods.php';
require 'src/profiles.php';

// Wrapper routes
$app->get('/static/{filename}', function($request, $response, $args) {
    return $this->view->render($response, "static/" . $args['filename']);
})->setName('static');

$app->get('/assets/styles/{filename}', function($request, $response, $args) {
    $response = $this->view->render($response, "styles/" . $args['filename']);
    return $response->withHeader("Content-Type", "text/css");
})->setName('styles');

$app->get('/images/{filename}', function($request, $response, $args) {
    return $this->view->render($response, "images/" . $args['filename']);
})->setName('images');

$app->get('/assets/scripts/{filename}', function($request, $response, $args) {
    $response = $this->view->render($response, "scripts/" . $args['filename']);
    return $response->withHeader("Content-Type", "text/javascript");
})->setName('scripts');

// Start the app
$app->run();

?>