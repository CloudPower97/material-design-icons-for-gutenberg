<?php
/**
 * Plugin Name: Material Design Icons for Gutenberg
 * Plugin URI: https://github.com/CloudPower97/material-design-icons-for-gutenberg
 * Description: 3600+ Material Design Icons from the Community available within WordPress pages and posts through Gutenberg block editor.
 * Author: cloudpower97
 * Author URI: https://www.linkedin.com/in/claudio-cortese/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
