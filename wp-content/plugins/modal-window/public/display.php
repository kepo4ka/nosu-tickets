<?php 
	/**
		* Display
		*
		* @package     Public
		* @subpackage  
		* @copyright   Copyright (c) 2017, Dmytro Lobov
		* @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
		* @since       3.2
	*/
	
	if ( ! defined( 'ABSPATH' ) ) exit;
	
	global $wpdb;    
	$table = $wpdb->prefix . "modalsimple";    
	$arrresult = $wpdb->get_results("SELECT * FROM " . $table . " order by id asc");
	if (count($arrresult) > 0) {		
		foreach ($arrresult as $key => $val) {
			$umodal_window_show = $val->umodal_window_show;
			if ($umodal_window_show == 'all'){				
				echo do_shortcode('[Wow-Modal-Windows id='.$val->id.']');
			}		
			
		}
	}
	
	
