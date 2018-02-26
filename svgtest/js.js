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



    $j(".mmain").on("click", function(e) {});


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
        // $j(this).addClass("handle");
        // new Dragdealer($j(this).parent()[0], {
        //     x: 0,
        //     // Start in the bottom-left corner
        //     y: 0,
        //     vertical: true,
        //     speed: 3,
        //     loose: true,
        //     requestAnimationFrame: true
        // });
    });
	var cir = $j("circle");
	var svg = $j("svg");
	
	cir.on("mouseenter", function (e) {
		var text = document.createElement("text");
		$j(text).attr("x", $j(this).attr("cx"));
		$j(text).attr("y", $j(this).attr("cy"));
		$j(text).text($j(this).attr("cx"));
		$j(text).attr("fill", "blue");
		$j(text).attr("font-size", 200);
		$j("svg").append(text);
		var circle = d3.select("svg").append("text")
    .attr("x", $j(this).attr("cx"))
	.attr("y", $j(this).attr("cy"))
    .attr("style", "fill:white;stroke:black;stroke-width:5;font-size:200")
	.text($j(this).attr("cx"));	
		
		
	});
	
	


});




function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function seatClickListener(elem) {
    elem.toggleClass("seat_scaled");

}


function addSeatsInfo()
{

}


function createSeat()
{
    var seat = document.createElement("div");
    seat.className = "seat";
    return seat;
}