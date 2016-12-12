<?php

// Load composer dependencies
require 'vendor/autoload.php';
require 'src/coffee.php';

// Settings
$settings = require 'config.php';

// Create a new app
$app = new \Slim\App($settings);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('templates', [
        'cache' => $container->get('settings')['debug'] ? false : 'cache'
    ]);
    
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));
    
    // Add globals like this
    // $view->getEnvironment()->addGlobal('<key>', $container->get('settings')['<key>']);

    return $view;
};


// Routes here.

// Compile SCSS and CoffeeScript
if ($settings['debug']) {
    CoffeeCompiler::run('scripts/', 'static/');
    SassCompiler::run("styles/", "static/");
}

// Start the app
$app->run();

?>