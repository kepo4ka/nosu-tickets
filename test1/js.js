var canvasMask;
$j = jQuery.noConflict();


$j(document).ready(function() {


    canvasMask = new Dragdealer('main_drag_countainer', {
        x: 0,
        // Start in the bottom-left corner
        y: 0,
        vertical: true,
        speed: 3,
        loose: true,
        requestAnimationFrame: true
    });
    canvasMask.disable();

    addSeatsInfo();

    $j("#main_drag_countainer > .handle").css("transform", "scale(0.5) translate(-50%, -50%)");


    $j('#plus_zoom_chart').on("click", function(e)
    {
        $j("#main_drag_countainer > .handle").css("transform", "");
        canvasMask.enable();
    });

    $j('#minus_zoom_chart').on("click", function(e)
    {
        $j("#main_drag_countainer > .handle").css("transform", "scale(0.5) translate(-50%, -50%)");

        // $j(".handle").removeClass("zoomed");
        canvasMask.disable();
    });


    $j('.seat').on("click", function() {
        seatClickListener($j(this));
    });

});



function seatClickListener(elem) {
    elem.toggleClass("seat_scaled");

}


function addSeatsInfo()
{
    for (i = 0; i < 1800; i++)
    {
        var elem = createSeat();
        $j(elem).attr("data_id", (i + 1));
        $j("#seating_charts_container").get(0).appendChild(elem);
    }
}


function createSeat()
{
    var seat = document.createElement("div");
    seat.className = "seat";
    return seat;
}