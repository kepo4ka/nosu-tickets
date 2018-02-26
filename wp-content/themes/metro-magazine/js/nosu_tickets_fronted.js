var canvasMask;
$j = jQuery.noConflict();



$j(document).ready(function() {



    var seating_charts = $j('#seating_charts')[0];

    var main_drag = {};
    main_drag.elem = $j("#main_drag_countainer");
    main_drag.padding = parseInt(main_drag.elem.children().css("padding"), 10);

    main_drag.width = main_drag.elem.width();
    main_drag.height = main_drag.elem.height();

    var svg_chart = d3.select("#seating_charts");
    var svg_cont = $j("#seating_charts");


    var seat_prices_info_ul = $j('#seat_prices_filter');

    var prices_temp_ids = [];
    var seats_order = [];
    var isdrag = false;

    addPricesInfo();
    addSeatsInfo();

    var seats = svg_chart.selectAll("circle");



    //  $j("#main_drag_countainer > .handle").css("transform", "scale(0.5) translate(-50%, -50%)");
    // $j("#main_drag_countainer > .handle").css("width", "101%");
    // $j("#main_drag_countainer > .handle").css("height", "101%");

    $j(".mmain").on("click", function(e) {});
    var dragged = false;


    // main_drag.elem[0].onmouseenter = function()
    // {
    //     if (dragged == false)
    //     {
    //         console.log("1233");
    //         enableDrag();
    //         dragged = true;
    //         //  main_drag.elem[0].onmouseenter = false;
    //     }

    // };

    $j('#plus_zoom_chart').on("click", function(e)
    {
        $j("#main_drag_countainer > .handle").css("width", "202%");
        $j("#main_drag_countainer > .handle").css("height", "200%");
        svg_cont.css("transform", "scale(2) translate(25%, 25%)");
        enableDrag();
    });

    $j('#minus_zoom_chart').on("click", function(e)
    {
        $j("#main_drag_countainer > .handle").css("width", "100%");
        $j("#main_drag_countainer > .handle").css("height", "100%");
        svg_cont.css("transform", "");

        canvasMask.setValue(0, 0);
        canvasMask.disable();
    });


    $j("#seat_prices_filter li").on("click", function() {
        var li = $j(this);
        var list = $j("#seat_prices_filter li");


        if (li.attr('id') == "reset_price_filter")
        {
            hideDiffPrices();
            $j("#reset_price_filter").css("display", "none");
            return;
        }

        var curr_selected = true;
        if (li.hasClass("li_selected") == true)
        {
            list.each(function(k, v)
            {
                if (k == 0)
                {
                    return true;
                }
                if ($j(v).is(li)) {


                    return true;
                }
                if ($j(v).hasClass('li_selected') == false)
                {
                    curr_selected = false;
                    return false;
                }
            });
        }
        if (curr_selected)
        {
            $j("#reset_price_filter").css("display", "inline");
        }
        else {
            $j("#reset_price_filter").css("display", "none");
        }
        var type_id = li.attr("seat_type_id");

        showDiffPrices(type_id);

        li.toggleClass("li_selected");
    });

    seats.on("click", function()
    {

        var seat = d3.select(this);

        if (seat.attr("seat_isbooked") == "true")
        {
            return false;
        }
        if (seat.attr("seat_isselected") == "false")
        {
            seat = seatStyleSelected(seat);
            addtoOrder(seat);
        }
        else {
            seat = seatStyleDeselected(seat);
            var seat_remove_id = parseInt(seat.attr("seat_id"));

            removefromOrder(seat_remove_id);
        }
        logOrder();
    });


    svg_chart.on("mousedown", function() {
        isdrag = true;
        document.onmouseup = function() {
            isdrag = false;
        }
    });



    seats.on("mouseenter", function()
    {
        if (isdrag == true)
        {
            return;
        }
        var seat = d3.select(this);
        var e = d3.event;
        var seatCoor = getCoords(this);


        if (seat.attr("seat_isbooked") == "true") {
            html = "Место недоступно";
        }
        else {
            html = "<p>" + seat.attr("seat_price") + "₽" + "</p>" +
                "<p>Ряд - " + seat.attr("seat_row") + ", Место - " + seat.attr("seat_number") + "</p>";

            seat.attr("r", "12");

            seat.style("cursor", "pointer");
        }
        showSeatInfo(seatCoor.left + seatCoor.width * 0.5, seatCoor.top - seatCoor.height * 0.5, html, true);
    });


    seats.on("mouseleave", function()
    {
        var seat = d3.select(this);

        showSeatInfo(0, 0, "", false);
        seat.attr("r", "10");
    });

    $j("#fixed_seat_info").on("click", function() {
        showSeatInfo(0, 0, "", false);
    });



    $j("#seat_order_list").on("click", ".seat_order_remove_btn", function()
    {
        var thisRemoveId = parseInt($j(this).attr("seat_removeid"));

        $j(this).parent().parent().remove();

        var seats = svg_chart.selectAll("circle");
        var seat_change_style;
        seats.each(function(d, i)
        {
            var thisCir = d3.select(this);
            var cir_id = parseInt(thisCir.attr("seat_id"));

            if (thisRemoveId === cir_id)
            {
                seat_change_style = thisCir;
                return false;
            }
        });

        seat_change_style = seatStyleDeselected(seat_change_style);

        removefromOrder(thisRemoveId);
        logOrder();
    });





    function showSeatInfo(left, top, html, k)
    {
        if (k)
        {
            $j("#fixed_seat_info").addClass("display_block");
        }
        else {
            $j("#fixed_seat_info").removeClass("display_block");
        }

        $j("#fixed_seat_info").css("left", left);
        $j("#fixed_seat_info").css("top", top);
        $j("#fixed_seat_info").html(html);
    }



    function seatStyleSelected(seat)
    {
        seat
            .style("stroke", seat.attr("seat_color"))
            .style("stroke-width", 10)
            .style("fill", "white");
        seat.attr("seat_isselected", true);
        return seat;
    }


    function seatStyleDeselected(seat)
    {
        seat
            .style("stroke", "")
            .style("stroke-width", 1)
            .style("fill", seat.attr("seat_color"));
        seat.attr("seat_isselected", false);
        return seat;
    }



    function logOrder()
    {
        console.log("order.lenght:", seats_order.length);
        for (i = 0; i < seats_order.length; i++)
        {
            console.log(seats_order[i]);
        }
        console.log("-------------");
    }

    function addtoOrder(seat)
    {
        var temp_seat_info = {
            seat_price: parseInt(seat.attr("seat_price")),
            seat_id: parseInt(seat.attr("seat_id")),
            seat_row: parseInt(seat.attr("seat_row")),
            seat_number: parseInt(seat.attr("seat_number"))
        }

        seats_order.push(temp_seat_info);

        orderSummaryChange(temp_seat_info.seat_price);


        var order_li_item = document.createElement("li");
        order_li_item.setAttribute("seat_id", temp_seat_info.seat_id);
        order_li_item_html = '<div class="seat_order_item">' +
            '<span class="fa-stack fa-lg seat_order_remove_btn" seat_removeid="' +
            temp_seat_info.seat_id +
            '">' +
            '<i class="fa fa-circle fa-stack-2x" ></i>' +
            '<i class="fa fa-times fa-stack-1x fa-inverse" ></i>' +
            '</span>' +
            '<div class="one_ticket_order_info">' +
            '<div class="position">' +
            '<p>Ряд ' + temp_seat_info.seat_row + '</p>' +
            '<p>Место ' + temp_seat_info.seat_number + '</p>' +
            '</div>' +
            '<div class="price">' +
            temp_seat_info.seat_price + " ₽" +
            '</div></div></div>';

        order_li_item.innerHTML = order_li_item_html;
        $j("#seat_order_list").append(order_li_item);
    }


    function removefromOrder(id)
    {
        for (i = 0; i < seats_order.length; i++)
        {
            var thisId = parseInt(seats_order[i].seat_id);
            if (id === thisId)
            {
                orderSummaryChange(-seats_order[i].seat_price);
                seats_order.splice(i, 1);
                break;
            }
        }

        $j("#seat_order_list li").each(function()
        {
            var thisId = parseInt($j(this).attr("seat_id"));
            if (id === thisId)
            {
                $j(this).remove();
                return false;
            }
        });
    }


    function orderSummaryChange(price)
    {
        summary_order_elem = $j("#order_summary_price");
        summary_order_price = parseInt(summary_order_elem.html());
        if (isNaN(summary_order_price) == false)
        {
            summary_order_price += price;
        }
        else {
            summary_order_price = price;
        }
        summary_order_elem.html(summary_order_price);
        if (summary_order_price > 0)
        {
            $j("#order_continue_btn").prop("disabled", "");
        }
        else {
            $j("#order_continue_btn").prop("disabled", "disabled");
        }
    }

    function enableDrag()
    {
        canvasMask = new Dragdealer('main_drag_countainer', {
            x: 0,
            y: 0,
            vertical: true,
            speed: 3,
            loose: true,
            requestAnimationFrame: true
        });
        canvasMask.enable();
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            right: box.right + pageXOffset,
            bottom: box.bottom + pageYOffset,
            width: box.width,
            height: box.height
        };
    }

    function seatScale(elem) {
        elem.toggleClass("seat_scaled");
    }



    function addPricesInfo()
    {
        var seat_prices = [];

        var price_info = {};
        price_info.id = 1;
        price_info.price = 510;
        price_info.seat_type = 510;
        price_info.color = "blue";

        seat_prices.push(price_info);


        var price_info = {};
        price_info.id = 2;
        price_info.price = 110;
        price_info.seat_type = 110;
        price_info.color = "red";

        seat_prices.push(price_info);



        for (i = 0; i < seat_prices.length; i++)
        {
            var li_price = document.createElement('li');
            li_price.setAttribute("seat_type_id", seat_prices[i].id);
            var html = "" + seat_prices[i].price + "₽";
            li_price.innerHTML = html;
            $j(li_price).css("border-top-color", seat_prices[i].color);

            seat_prices_info_ul[0].appendChild(li_price);
        }
    }

    function addSeatsInfo()
    {
        var seats = [];
        var idd = 1;

        for (i = 2; i < 12; i++)
        {
            for (j = 3; j < 15; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }


        for (i = 13; i < 29; i++)
        {
            for (j = 3; j < 15; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }

        for (i = 30; i < 39; i++)
        {
            for (j = 3; j < 15; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }


        for (i = 2; i < 39; i++)
        {
            for (j = 16; j < 23; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }


        for (i = 2; i < 17; i++)
        {
            for (j = 1; j < 2; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }


        for (i = 25; i < 39; i++)
        {
            for (j = 1; j < 2; j++)
            {
                var seat = {};
                seat.seat_id = idd;
                seat.seat_left = i * 25;
                seat.seat_top = j * 25;
                seat.seat_number = i;
                seat.seat_row = j;
                seat.isbooked = false;
                seat.isselected = false;
                var rn = random(1, 3);
                if (rn == 1)
                {
                    seat.seat_type_id = 1;
                    seat.seat_price = 510;
                    seat.seat_color = "blue";
                }
                else if (rn == 2) {
                    seat.seat_type_id = 2;
                    seat.seat_price = 220;
                    seat.seat_color = "red";
                }
                else {
                    seat.isbooked = true;
                    seat.seat_color = "gray";
                }

                idd++;
                seats.push(seat);
            }
        }


        // var seat = {};
        // seat.seat_id = 1;
        // seat.seat_top = 200;
        // seat.seat_left = 200;
        // seat.seat_type_id = 1;
        // seat.seat_price = 510;
        // seat.seat_color = "blue";
        // seat.seat_row = 2;
        // seat.seat_number = 12;
        // seat.isbooked = false;
        // seat.isselected = false;

        // seats.push(seat);

        // var seat = {};
        // seat.seat_id = 2;
        // seat.seat_top = 300;
        // seat.seat_left = 100;
        // seat.seat_type_id = 2;
        // seat.seat_price = 210;
        // seat.seat_color = "red";
        // seat.seat_row = 12;
        // seat.seat_number = 312;
        // seat.isbooked = false;
        // seat.isselected = false;

        // seats.push(seat);

        for (i = 0; i < seats.length; i++)
        {
            svg_chart.append('circle')
                .attr("seat_id", seats[i].seat_id)
                .attr("seat_type_id", seats[i].seat_type_id)
                .attr("seat_price", seats[i].seat_price)
                .attr("cx", seats[i].seat_left)
                .attr("cy", seats[i].seat_top)
                .attr("seat_color", seats[i].seat_color)
                .style("fill", seats[i].seat_color)
                .attr("seat_isbooked", seats[i].isbooked)
                .attr("seat_isselected", seats[i].isselected)
                .attr("seat_row", seats[i].seat_row)
                .attr("seat_number", seats[i].seat_number)
                .attr("r", 5);
        }
    }



    function showDiffPrices(id)
    {
        var seats = svg_chart.selectAll("circle");
        seats.each(function(d, i)
        {
            var thisCir = d3.select(this);
            var cir_id = thisCir.attr("seat_type_id");

            if (id == cir_id)
            {
                if (thisCir.style('opacity') == 0.6)
                {
                    thisCir.style('opacity', 1);
                }
                else {
                    thisCir.style('opacity', 0.6);
                }
            }
        });
    }


    function hideDiffPrices()
    {
        $j("#seat_prices_filter li").removeClass("li_selected");
        var seats = svg_chart.selectAll("circle");
        seats.each(function(d, i)
        {
            var thisCir = d3.select(this);
            var cir_id = thisCir.attr("seat_type_id");
            thisCir.style('opacity', 0.6);

        });
    }



    function random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    // getPrices();

    // function getPrices()
    // {
    //     $j.ajax({
    //         type: "GET",
    //         url: my_ajax_url + "?page,
    //         data: {
    //             action: 'do_something'
    //         },
    //         success: function(response) {
    //             console.log('AJAX response : ', response);
    //         },
    //         error: function(res)
    //         {
    //             console.log("error : ", res);
    //         }
    //     });
    // }


});