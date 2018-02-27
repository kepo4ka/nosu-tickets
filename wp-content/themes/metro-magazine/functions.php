<?php
/**
 * Metro Magazine functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Metro_Magazine
 */

//define theme version
if (!defined('METRO_MAGAZINE_THEME_VERSION')) {
    $theme_data = wp_get_theme();

    define('METRO_MAGAZINE_THEME_VERSION', $theme_data->get('Version'));
}

/**
 * Implement the Custom functions.
 */
require get_template_directory() . '/inc/custom-functions.php';

/**
 * Implement the WordPress Hooks.
 */
require get_template_directory() . '/inc/wp-hooks.php';

/**
 * Custom template function for this theme.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Custom template hooks for this theme.
 */
require get_template_directory() . '/inc/template-hooks.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Load plugin for right and no sidebar
 */
require get_template_directory() . '/inc/metabox.php';

/**
 * Load widgets.
 */
require get_template_directory() . '/inc/widgets/widgets.php';

/**
 * Dynamic Styles
 */
require get_template_directory() . '/css/style.php';

function enqueue_custom_scripts()
{
//    wp_deregister_script('jquery');

    //wp_register_script('jquery', get_template_directory_uri() . '/js/jquery-3.2.1.js');
    //wp_enqueue_script('jquery');

    wp_register_script('dragdealer', get_template_directory_uri() . '/js/dragdealer.js', array('jquery'));
    wp_enqueue_script('dragdealer');

    wp_register_script('nosu_tickets', get_template_directory_uri() . '/js/nosu_tickets_fronted.js', array('jquery'));
    wp_enqueue_script('nosu_tickets');

    // wp_register_style('font_awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array(), '080218', 'all');
    // wp_enqueue_style('font_awesome');

    wp_register_style('tickets_style', get_template_directory_uri() . '/css/tickets_style.css', array(), '080218', 'all');
    wp_enqueue_style('tickets_style');
}

function add_scripts_on_tickets_page()
{
    global $post;
    $concert_hall_page_name = "tickets";

    if (is_page() || is_single()) {
        if ($post->post_name == $concert_hall_page_name) {
            add_action('wp_head', 'get_ajaxUrl_fronted_tickets_page');
            //enqueue_custom_scripts();
        }
    }
}

function get_ajaxUrl_fronted_tickets_page()
{
    $my_ajax_url = admin_url('admin-ajax.php');

    echo ('<script type="text/javascript">my_ajax_url = "' . $my_ajax_url . '";</script>');
}

add_action('wp_enqueue_scripts', 'add_scripts_on_tickets_page');

add_action('admin_menu', function () {
    add_menu_page('Концертный зал СОГУ', 'Концертный зал', 'manage_options', 'concert_hall_options', 'concertHallOptions', '
	dashicons-tickets-alt', 81);
//    add_submenu_page( 'concert_hall_options', 'Концертный зал СОГУ', 'Концертный зал', 'manage_options', 'add_concert_hall_options');
    add_submenu_page('concert_hall_options', 'Цены билетов', 'Настройка цен', 'manage_options', 'change_prices', 'changePrices');

});

function changePrices()
{
    ?>
	<h2><?php echo get_admin_page_title() ?></h2>
	<?php
do_shortcode('[Wow-Modal-Windows id=3]');
}

function concertHallOptions()
{
    ?>
		<h2><?php echo get_admin_page_title() ?></h2>

		<?php
do_shortcode('[Wow-Modal-Windows id=2]');

}

function GetPrices()
{
    global $wpdb;

    $sql = "SELECT * FROM hall_price_types";

    $prices_types = $wpdb->get_results($sql);

    echo (json_encode($prices_types));
    wp_die();
}

function GetSeats()
{
    global $wpdb;

    $sql = "SELECT * FROM `hall_price_types`, `hall_seats` WHERE `hall_price_types`.id = `hall_seats`.type_id";

    $seats = $wpdb->get_results($sql);

    echo (json_encode($seats));
    wp_die();
}

function CheckDuplicatedSeat($data)
{
    global $wpdb;
    $table = "hall_seats";

    $sql_check_free = "SELECT id FROM  {$table} WHERE `row`= {$data['seat_row']} AND `number`= {$data['seat_number']} ";

    $seats_ids = $wpdb->get_results($wpdb->prepare($sql_check_free));
    return $seats_ids;
}

function AddNewSeat()
{
    global $wpdb;
    $data = $_POST["seat"];
    $table = "hall_seats";
    //    print_r($_POST["seat"]);
    $data['seat_left'] = intval($data['seat_left']);
    $data['seat_top'] = intval($data['seat_top']);
    $data['seat_type_id'] = intval($data['seat_type_id']);
    $data['seat_row'] = intval($data['seat_row']);
    $data['seat_number'] = intval($data['seat_number']);
    if (count(CheckDuplicatedSeat($data)) > 0) {
        $data = -2;
    } else {
        $res = $wpdb->insert($table,
            array("left" => $data['seat_left'],
                "top" => $data['seat_top'],
                "type_id" => $data['seat_type_id'],
                "row" => $data['seat_row'],
                "number" => $data['seat_number']),
            array('%d', '%d', '%d', '%d', '%d', '%d')
        );

        if ($res) {
            $data = $wpdb->insert_id;
        } else {
            $data = -1;
        }
    }
    echo (json_encode($data));
    wp_die();
}

function RemoveSeat()
{
    global $wpdb;
    $data = $_POST["seat"];
    $table = "hall_seats";

    $res = $wpdb->delete($table,
        array("id" => intval($data['seat_id'])),
        array('%d')
    );

    if ($res) {
        $data = 1;
    } else {
        $data = -1;
    }

    echo (json_encode($data));
    wp_die();
}

function UpdateSeatsPosition()
{
    global $wpdb;
    $data = $_POST["seats_array"];
    $table = "hall_seats";
    $results = array();
    $result = array();

    $dataJson = str_replace("\\", "", $data);
    $dataJson = json_decode($dataJson);
    $data = $dataJson;
   // var_dump(json_decode($dataJson));
   // var_dump($data[232]-> seat_id);
    for ($i = 0; $i < count($data); $i++) {
        $data[$i]->seat_left = intval($data[$i]->seat_left);
        $data[$i]->seat_top = intval($data[$i]->seat_top);
        $data[$i]->seat_type_id = intval($data[$i]->seat_type_id);

        $res = $wpdb->update($table,
            array("left" => $data[$i]->seat_left,
                "top" => $data[$i]->seat_top,
                "type_id" => $data[$i]->seat_type_id),
            array("id" => $data[$i]->seat_id),
            array('%d', '%d', '%d'),
            array('%d')
        );

        if ($res === false) {
            $result['res'] = -1;
        } else {
            $result['res'] = $res;
        }

        $result['id'] = $data[$i]->seat_id;
        $results[] = $result;
    }

    echo (json_encode($results));
    wp_die();
}

function AddPriceType()
{
    global $wpdb;
    $data = $_POST["PriceType"];
    $table = "hall_price_types";

    $res = $wpdb->insert($table,
        array("name" => $data['name'],
            "color" => $data['color'],
            "price" => intval($data['price'])),
        array('%s', '%s', '%d')
    );

    if ($res > 0) {
        $data = $wpdb->insert_id;
    } else {
        $data = -1;
    }
    echo (json_encode($data));
    wp_die();
}

function UpdCurrentSeat()
{
    global $wpdb;
    $data = $_POST["seat"];
    $table = "hall_seats";

    $data['seat_left'] = intval($data['seat_left']);
    $data['seat_top'] = intval($data['seat_top']);
    $data['seat_id'] = intval($data['seat_id']);
    $data['seat_row'] = intval($data['seat_row']);
    $data['seat_number'] = intval($data['seat_number']);
    $data['seat_type_id'] = intval($data['seat_type_id']);

    $seats = CheckDuplicatedSeat($data);

    if (count($seats) == 1 && $seats[0]->id != $data['seat_id']) {
        $result['res'] = -2;
    } else {

        $res = $wpdb->update($table,
            array("left" => $data['seat_left'],
                "top" => $data['seat_top'],
                "row" => $data['seat_row'],
                "number" => $data['seat_number'],
                "type_id" => $data['seat_type_id']),
            array("id" => $data['seat_id']),
            array('%d', '%d', '%d', '%d', '%d'),
            array('%d')
        );

        if ($res === false) {
            $result['res'] = -1;
        } else {
            $result['res'] = $res;
        }
    }

    $result['id'] = $data['seat_id'];

    echo (json_encode($result));
    wp_die();
}

function RemovePriceType()
{
    global $wpdb;
    $data = $_GET["remove_id"];
    $table = "hall_price_types";

    $res = $wpdb->delete($table,
        array("id" => intval($data)),
        array('%d')
    );

    if ($res) {
        $data = 1;
    } else {
        $data = -1;
    }

    echo (json_encode($data));
    wp_die();
}

function updatePriceTypes()
{
    global $wpdb;
    $data = $_POST["prices_type_array"];
    $table = "hall_price_types";
    $results = array();
    $result = array();

    for ($i = 0; $i < count($data); $i++) {

        $res = $wpdb->update($table,
            array("name" => $data[$i]['name'],
                "color" => $data[$i]['color'],
                "price" => $data[$i]['price']),
            array("id" => $data[$i]['id']),
            array('%s', '%s', '%d'),
            array('%d')
        );

        if ($res === false) {
            $result['res'] = -1;
        } else {
            $result['res'] = $res;
        }

        $result['id'] = $data[$i]['id'];
        $results[] = $result;
    }

    echo (json_encode($results));
    wp_die();
}

add_action('wp_ajax_addPriceType', 'AddPriceType');
add_action('wp_ajax_removePriceType', 'RemovePriceType');
add_action('wp_ajax_updatePriceTypes', 'updatePriceTypes');

add_action('wp_ajax_updateSeatsPosition', 'UpdateSeatsPosition');

add_action('wp_ajax_updCurrentSeat', 'UpdCurrentSeat');

add_action('wp_ajax_addNewSeat', 'AddNewSeat');

add_action('wp_ajax_removeSeat', 'RemoveSeat');

add_action('wp_ajax_getSeats', 'GetSeats');
add_action('wp_ajax_nopriv_getSeats', 'GetSeats');

add_action('wp_ajax_getPrices', 'GetPrices');
add_action('wp_ajax_nopriv_getPrices', 'GetPrices');
