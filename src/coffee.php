<?php
/**
 * Class CoffeeCompiler
 *
 * This simple tool compiles all .coffee files in folder A to .js files (with exactly the same name) into folder B.
 * Everything happens right when you run your app, on-the-fly, in pure PHP.
 *
 * CoffeeCompiler is not a standalone compiler, it's just a little method that uses the excellent coffeescript-php compiler 
 * which can be found here: https://github.com/kylekatarnls/coffeescript-php and adds automatic compiling to it.
 */
class CoffeeCompiler
{
    /**
     * Compiles all .coffee files in a given folder into .js files in a given folder
     *
     * @param string $coffee_folder source folder where you have your .coffee files
     * @param string $js_folder destination folder where you want your .js files
     */
    static public function run($coffee_folder, $js_folder)
    {
        // CoffeeScript will be loaded automatically via Composer
        CoffeeScript\Init::load();
        // get all .coffee files from coffee folder
        $filelist = glob($coffee_folder . "*.coffee");
        // step through all .coffee files in that folder
        foreach ($filelist as $file_path) {
            // get path elements from that file
            $file_path_elements = pathinfo($file_path);
            // get file's name without extension
            $file_name = $file_path_elements['filename'];
            // get .coffees's content, put it into $string_coffee
            $string_coffee = file_get_contents($coffee_folder . $file_name . ".coffee");
            // compile this Coffee code to JS
            $string_js = CoffeeScript\Compiler::compile($string_coffee, array('filename' => $file_name . ".coffee"));
            // write JS into file with the same filename, but .js extension
            file_put_contents($js_folder . $file_name . ".js", $string_js);
        }
    }
}