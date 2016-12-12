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
$app->get('/', function($request, $response) {
    return $this->view->render($response, 'index.html');
});

$app->get('/static/{filename}', function($request, $response, $args) {
    $file_path = join('/', array('static', $args['filename']));
    return $response->write(file_get_contents($file_path));
})->setName('static');

$app->get('/forgot-password', function($request, $response) {
    return $this->view->render($response, 'forgot.html');
})->setName('accounts.forgot_password');

$app->get('/privacy', function($request, $response) {
    return $this->view->render($response, 'privacy.html');
})->setName('privacy');

$app->post('/register', function() {
    echo('');
})->setName('accounts.register');

// Compile SCSS and CoffeeScript
if ($container->get('settings')['debug']) {
    CoffeeCompiler::run('scripts/', 'static/');
    SassCompiler::run("styles/", "static/");
    
    // copy over .js files
    foreach (glob('scripts/*.js') as $file_path) {            
        // get path elements from that file
        $file_path_elements = pathinfo($file_path);
        
        // get file's name without extension
        $file_name = $file_path_elements['filename'];
        
        // get .js content, put it into $string_js
        $string_js = file_get_contents('scripts/' . $file_name . ".js");
        
        // write JS into file with the same filename
        file_put_contents('static/' . $file_name . ".js", $string_js);
    }
    
    // copy over .css files
    foreach (glob('styles/*.css') as $file_path) {            
        // get path elements from that file
        $file_path_elements = pathinfo($file_path);
        
        // get file's name without extension
        $file_name = $file_path_elements['filename'];
        
        // get .css content, put it into $string_css
        $string_css = file_get_contents('styles/' . $file_name . ".css");
        
        // write CSS into file with the same filename
        file_put_contents('static/' . $file_name . ".css", $string_css);
    }
    
    // copy over image files
    foreach (glob('images/*{jpg,png,gif,svg,ico}', GLOB_BRACE) as $file_path) {            
        // get path elements from that file
        $file_path_elements = pathinfo($file_path);
        
        // get file's name with extension
        $file_name = $file_path_elements['basename'];
        
        // get image content, put it into $string_img
        $string_img = file_get_contents('images/' . $file_name);
        
        // write IMG into file with the same filename
        file_put_contents('static/' . $file_name, $string_img);
    }
}

// Start the app
$app->run();

?>