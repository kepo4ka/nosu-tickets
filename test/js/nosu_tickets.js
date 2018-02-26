
var onmouseclicked = false;
var content_element = $(".content");
var seats = $(".seat");

var canvasMask ;

$(document).ready(function () {



    // for (i = 0; i < 110; i++)
    // {
    //     var seat_div = createSeat("blue");
    //     console.log(seat_div);
    //     $(".seating_charts")[0].appendChild(seat_div);
    // }


    $("section").height($("section").width());
    window.onresize = function () {
        $("section").height($("section").width());
    };




    getSeatsInfo();


    $(".seat").on("click", function () {
        if ($(this).attr("data_type") == "booked") {
            return;
        }


        if ($(this).hasClass("seat_scaled")) {
            removeLikedSeat($(this));
            $(this).removeClass("seat_scaled");

        }
        else {
            addLikedSeat($(this));
            $(this).addClass("seat_scaled");
        }
    });



    $(".seat").on("mouseenter", function () {
        setTempSeatInfo($(this));
    });


    $(".seat").on("mouseleave", function () {
        $(".liked_seat_info").html("");
    });


    $("#plus_zoom").on("click", function (e) {

        $(".handle").addClass("seating_charts_scaled");
        enableDrag();

    });

    $("#minus_zoom").on("click", function (e) {
        $(".handle").removeClass("seating_charts_scaled");
        disableDrag();

    });

});


//Активировать Перетаскивание
function enableDrag() {
    canvasMask = new Dragdealer('seating_charts_mask', {
        x: 0,
        y: 0,
        vertical: true,
        speed: 0.2,
        loose: true
    });
}

//Отключить Перетаскивание
function disableDrag() {
    if (canvasMask !== undefined) {
        canvasMask.setValue(0,0);
        canvasMask.disable();
    }
}



function setTempSeatInfo(seat) {

    var temp_seat_info = "<p>ТИП: " + seat.attr("data_type") + "</p>" +
            "<p>ID: " + seat.attr("data_id") + "</p>" +
        "<p>Цена: " + seat.attr("data_price") + "</p>";

    $(".liked_seat_info").html(temp_seat_info);
}

//Получить координаты элемента
function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}


function random(min, max) {
    var rand = min + Math.round(Math.random() * (max - min + 1));
    return rand;
}


function createSeat(type) {

    var seat_div = document.createElement('div');
    seat_div.className = 'seat ' + type;
    return seat_div;
}


function addLikedSeat(seat) {
    var li = document.createElement("li");

    $(li).attr("data_id", seat.attr("data_id"));

    li.innerHTML = "<p>ТИП: " + seat.attr("data_type") + "</p>" +
        "<p>Цена: " + seat.attr("data_price") + "</p>";

    var list = document.getElementById("liked_seats_list");
    list.appendChild(li);
}

function removeLikedSeat(seat) {

    var liked_seats = $("#liked_seats_list li");
    for (i=0;i<liked_seats.length;i++)
    {
        if ($(liked_seats[i]).attr("data_id") == seat.attr("data_id"))
        {
            var list = document.getElementById("liked_seats_list");
            list.removeChild(liked_seats[i]);
            break;
        }
    }
}


//Получить информацию о местах в зале
function getSeatsInfo()
{

    for (var i = 0; i < seats.length; i++)
    {
        seat_type = "";
        seat_color = "";
        seat_price = "";
        seat_id = i;
        if (i <= 36) {

            seat_type = "student";
            seat_color = "blue";
            seat_price = "10";
        }
        else if (i > 36 && i <= 520) {
            seat_color = "orange";
            seat_type = "person";
            seat_price = "20";
        }
        else {
            seat_color = "red";
            seat_type = "VIP";
            seat_price = "50";
        }


        if (i > 745 && i < 790) {
            seat_color = "gray";
            seat_type = "booked";
        }

        seats[i].className = "seat " + seat_color;

        //  seats[i].setAttribute("data_price",  seat_price);
        //   seats[i].setAttribute("data_type",  seat_type);

        $(seats[i]).attr("data_price", seat_price);
        $(seats[i]).attr("data_type", seat_type);
        $(seats[i]).attr("data_id", seat_id);


        //  $(".seat").attr("data_row", seat_row);
        //  $(".seat").attr("data_column", seat_column);

    }
}
