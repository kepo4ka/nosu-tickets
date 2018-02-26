var canvasMask;
$j = jQuery.noConflict();


$j(document).ready(function () {

    ShowToolTab("#preloader_tab");

    var seating_charts = $j('#seating_charts')[0];

    var main_drag = {};
    main_drag.elem = $j("#main_drag_countainer");
    main_drag.padding = parseInt(main_drag.elem.children().css("padding"), 10);


    main_drag.width = main_drag.elem.width();
    main_drag.height = main_drag.elem.height();
    var circle_raduis_min = 6;
    var circle_raduis_max = 9;
    var isdrag = false;
    var iszoomed = false;
    var shift_down = false;
    var grid_opacity = 0.3;

    var svg_chart = d3.select("#seating_charts");
    var svg_cont = $j("#seating_charts");
    var svgCoor = getCoords(svg_cont[0]);

    var seat_prices_info_ul = $j('#seat_prices_filter');

    var prices_temp_ids = [];
    var seats_selected = [];
    var seat_one_selected = null;
    var seat_prices = [];

    var price_booked_type_id;
    DrawGrid();
    getPricesAjax();

    getSeatsAjax();


    var seats = svg_chart.selectAll("circle");


    //  $j("#main_drag_countainer > .handle").css("transform", "scale(0.5) translate(-50%, -50%)");
    // $j("#main_drag_countainer > .handle").css("width", "101%");
    // $j("#main_drag_countainer > .handle").css("height", "101%");


    $j('#plus_zoom_chart').on("click", function (e) {
        $j("#main_drag_countainer > .handle").css("width", "202%");
        $j("#main_drag_countainer > .handle").css("height", "200%");
        svg_cont.css("transform", "scale(2) translate(25%, 25%)");
        enableDrag();
        iszoomed = true;
    });

    $j('#minus_zoom_chart').on("click", function (e) {
        $j("#main_drag_countainer > .handle").css("width", "100%");
        $j("#main_drag_countainer > .handle").css("height", "100%");
        svg_cont.css("transform", "");

        canvasMask.setValue(0, 0);
        canvasMask.disable();

        iszoomed = false;
    });


    $j("#seat_prices_filter").on("click", "li", function () {
        var li = $j(this);
        var list = $j("#seat_prices_filter li");


        if (li.attr('id') == "reset_price_filter") {
            hideDiffPrices();
            $j("#reset_price_filter").css("display", "none");
            return;
        }

        var curr_selected = true;
        if (li.hasClass("li_selected") == true) {
            list.each(function (k, v) {
                if (k == 0) {
                    return true;
                }
                if ($j(v).is(li)) {


                    return true;
                }
                if ($j(v).hasClass('li_selected') == false) {
                    curr_selected = false;
                    return false;
                }
            });
        }
        if (curr_selected) {
            $j("#reset_price_filter").css("display", "inline");
        } else {
            $j("#reset_price_filter").css("display", "none");
        }
        var type_id = li.attr("seat_type_id");

        showDiffPrices(type_id);

        li.toggleClass("li_selected");
    });

    // seats.on("click", function()
    // {
    //     var seat = d3.select(this);
    //     if (seat.attr("seat_isselected") == "false")
    //     {
    //         seat = seatStyleSelected(seat);
    //     }
    //     else {
    //         seat = seatStyleDeselected(seat);
    //         var seat_remove_id = parseInt(seat.attr("seat_id"));
    //     }

    // });


    // seats.on("mouseenter", function()
    // {
    //     var seat = d3.select(this);
    //     var e = d3.event;

    //     seatmouseEnterHandler(seat, e);
    // });


    $j("#fixed_seat_info").on("click", function () {
        showSeatInfo(0, 0, "", false);
    });


    $j("#deleteseatButton").on("click", function () {
        if (seat_one_selected != null) {
            removeSeatAjax(seat_one_selected);
        }
    });

    // seats.on("mouseleave", function()
    // {
    //     var seat = d3.select(this);
    //     var e = d3.event;


    //     //   seat.attr("r", circle_raduis_min);
    // });


    // seats.on("mousedown", function()
    // {
    //     var thisSeat = d3.select(this);
    //     var event = d3.event;
    //     seatmouseDownHandler(thisSeat, event);
    // });

    $j('.tool_menu_tabs').on("click", function (event) {

        $j(this).css("display", "none");
    })

    $j(".tool_tab").on("click", function (event) {
        event.stopPropagation();
    });

    $j("#addseatButton").on("click", function (event) {

        var prev_value = $j("#add_seat_type_id").val() || "";
        $j("#add_seat_type_id").empty();

        var next_row_number_in_input = parseInt($j("#add_seat_number").val()) || 0;
        $j("#add_seat_number").val(next_row_number_in_input + 1);


        for (i = 0; i < seat_prices.length; i++) {
            var opt = document.createElement("option");
            $j(opt).val(seat_prices[i].id);
            $j(opt).html(seat_prices[i].price);
            $j(opt).attr("seat_color", seat_prices[i].color);
            $j("#add_seat_type_id").append(opt);
        }

        $j("#add_seat_type_id").val(prev_value);

        ShowToolTab('#add_tab');


    });


    $j("#updateseatButton").on("click", function (event) {
        if (seat_one_selected == null) {
            return;
        }
        $j("#upd_seat_type_id").empty();
        for (i = 0; i < seat_prices.length; i++) {
            var opt = document.createElement("option");
            $j(opt).val(seat_prices[i].id);
            $j(opt).html(seat_prices[i].price);
            $j(opt).attr("seat_color", seat_prices[i].color);
            if (seat_prices[i].id == parseInt(seat_one_selected.attr("seat_type_id"))) {
                $j(opt).prop("selected", true);
            }

            $j("#upd_seat_type_id").append(opt);
        }

        $j("#upd_seat_number").val(seat_one_selected.attr("seat_number"));
        $j("#upd_seat_row").val(seat_one_selected.attr("seat_row"));

        ShowToolTab('#upd_tab');

    });


    $j("#updateAllseatPositionButton").on("click", function () {
        var allseatsD3 = svg_chart.selectAll('circle');
        var seatsJSArray = [];
        allseatsD3.each(function () {
            var d3elem = d3.select(this);
            seatsJSArray.push(d3Seat_to_jsSeat(d3elem));
        });
        updateAllSeatsPositionAjax(seatsJSArray);
    });


    $j("#add_seat_row").keyup(function () {
        if (isInt($j("#add_seat_number").val()) && isInt($j(this).val())) {
            $j("#add_seat_save_btn").prop("disabled", false);
        } else {
            $j("#add_seat_save_btn").prop("disabled", true);
        }
    });
    $j("#add_seat_number").keyup(function () {
        if (isInt($j("#add_seat_row").val()) && isInt($j(this).val())) {
            $j("#add_seat_save_btn").prop("disabled", false);
        } else {
            $j("#add_seat_save_btn").prop("disabled", true);
        }
    });

    $j("#add_seat_save_btn").on("click", function () {
        createNewSeat();
    });


    $j("#upd_seat_row").keyup(function () {
        if (isInt($j("#upd_seat_number").val()) && isInt($j(this).val())) {
            $j("#upd_seat_save_btn").prop("disabled", false);
        } else {
            $j("#upd_seat_save_btn").prop("disabled", true);
        }
    });
    $j("#upd_seat_number").keyup(function () {
        if (isInt($j("#upd_seat_row").val()) && isInt($j(this).val())) {
            $j("#upd_seat_save_btn").prop("disabled", false);
        } else {
            $j("#upd_seat_save_btn").prop("disabled", true);
        }
    });

    $j("#upd_seat_save_btn").on("click", function () {
        updCurrentSeat();
    });


    $j(document).on("keydown", function (e) {
        if (e.which == 16) //shift
        {
            shift_down = true;
            return false;
        }
        if (e.which == 65 && shift_down) //a
        {
            if (seats_selected.length > 0) {
                deselectAllSelectedSeats(true);
            }
            else {
                selectAllSeats();
            }
        }
    });

    $j(document).on("keyup", function (e) {
        if (e.which == 16) {
            shift_down = false;
        }
    });


    $j("#updateselectedseatsPositionsButton").on("click", function (e) {

        $j("#change_coord_seat_type_id").empty();

        for (i = 0; i < seat_prices.length; i++) {
            var opt = document.createElement("option");
            $j(opt).val(seat_prices[i].id);
            $j(opt).html(seat_prices[i].price);
            $j(opt).attr("seat_color", seat_prices[i].color);
            $j("#change_coord_seat_type_id").append(opt);
        }

        ShowToolTab("#change_coord_tab");

    });

    $j("#change_coord_seat_btn").on("click", function (e) {
        changeSelectedSeatsInfo();
    });

    function changeSelectedSeatsInfo() {


        var newPriceTypeId = parseInt($j("#change_coord_seat_type_id").val());

        var offsetX = parseInt($j("#change_coord_seat_x").val());
        var offsetY = parseInt($j("#change_coord_seat_y").val());


        for (i = 0; i < seats_selected.length; i++) {
            var tempseat = seats_selected[i];
            var id = parseInt(tempseat.attr("seat_id"));
            var cx = parseInt(tempseat.attr("cx"));
            var cy = parseInt(tempseat.attr("cy"));
            var resultX = RoundWithBazisNumber(cx + offsetX * circle_raduis_min, circle_raduis_min);
            var resultY = RoundWithBazisNumber(cy + offsetY * circle_raduis_min, circle_raduis_min);


            tempseat.attr("cx", resultX);
            tempseat.attr("cy", resultY);

            if (newPriceTypeId !== false) {

                seat_prices.forEach(function (value) {
                    if (value.id == newPriceTypeId) {
                        console.log(true);
                        tempseat.attr("seat_type_id", value.id)
                            .attr("seat_color", value.color)
                            .style("stroke", value.color)
                            .attr("seat_price", value.price);
                        return false;
                    }
                });
            }
        }

        // deselectAllSelectedSeats();

        hideToolTabs();
    }


    function updCurrentSeat() {

        var newRow = $j("#upd_seat_row").val();
        var newNumber = $j("#upd_seat_number").val();
        var newTypeId = $j('#upd_seat_type_id').val();

        var seat = d3Seat_to_jsSeat(seat_one_selected);

        seat.seat_row = newRow;
        seat.seat_number = newNumber;
        seat.seat_type_id = newTypeId;
        updCurrentSeatAjax(seat);
    }


    function updCurrentSeatResult(seat) {
        seat_one_selected.attr("seat_row", seat.seat_row);
        seat_one_selected.attr('seat_number', seat.seat_number);
        seat_one_selected.attr("seat_type_id", seat.seat_type_id);
        seat_one_selected.attr("cx", seat.seat_left);
        seat_one_selected.attr("cy", seat.seat_top);

        seat_prices.forEach(function (value) {
            if (value.id == seat.seat_type_id) {
                seat_one_selected.attr("seat_color", value.color);
                seat_one_selected.style("stroke", value.color);
                seat_one_selected.attr("seat_price", value.price);
                return false;
            }
        });
    }


    function updCurrentSeatAjax(seat) {
        ShowToolTab("#preloader_tab");

        $j.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'updCurrentSeat',
                seat: seat
            },
            success: function (json) {
                //   console.log(json);

                var data = JSON.parse(json);

                switch (data.res) {
                    case 1:
                        updCurrentSeatResult(seat);
                        showMessage("Место под номером " + seat.seat_id + " было обновлено", false);
                        break;

                    case 0:
                        showMessage("Место под номером " + seat.seat_id + " осталось без изменений", false);
                        break;

                    case -2:
                        showMessage("Не удалось обновить информацию о текущем месте (" + seat.seat_id + ") так как его данные (Ряд, Номер) совпадают с другим Местом", true);
                        break;
                }

            },
            error: function (res) {
                showMessage("Не удалось обновить информацию о текущем месте (" + seat.seat_id + ") в базу: " + res, true);
            },
            complete: function () {
                hideToolTabs();
            }
        });


    }


    function createNewSeat() {
        var seatNew = {};
        seatNew.seat_id = null;
        seatNew.seat_row = parseInt($j("#add_seat_row").val());
        seatNew.seat_number = parseInt($j("#add_seat_number").val());
        seatNew.seat_type_id = parseInt($j('#add_seat_type_id').val());

        //  seatNew.seat_isbooked = $j("#add_seat_booked").is(':checked');
        if (seat_one_selected) {
            seatNew.seat_left = parseInt(seat_one_selected.attr('cx')) + circle_raduis_min * 3;
            seatNew.seat_top = seat_one_selected.attr('cy');
            seat_one_selected = null;
        }
        else {
            seatNew.seat_left = circle_raduis_min * 2;
            seatNew.seat_top = circle_raduis_min * 2;
        }
        seatNew.seat_isselected = false;

        $j("#add_seat_type_id option").each(function () {
            var thisId = parseInt($j(this).val());
            if (seatNew.seat_type_id == thisId) {
                seatNew.seat_price = parseInt($j(this).html(), 10);
                seatNew.seat_color = $j(this).attr("seat_color");
                return false;
            }
        });
        // if (seatNew.seat_isbooked)
        // {
        //     seatNew.seat_color = "gray";
        // }

        //  console.log(seatNew);

        addNewSeatAjax(seatNew);

    }

    function isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)) && parseInt(value, 10) >= 0;
    }


    function seatmouseEnterHandler(seat, event) {
        if (isdrag) {
            return;
        }

        var e = event;
        var seatCoor = getCoords(seat._groups[0][0]);

        var html = "";
        if (seat.attr("seat_type_id") == price_booked_type_id) {
            html = "<p>Место недоступно</p>";
        }
        else
        {
            html = "<p>" + seat.attr("seat_price") + "₽" + "</p>";
        }
        
        html += "<p>Ряд - " + seat.attr("seat_row") + ", Место - " + seat.attr("seat_number") + "</p>" +
            "<p>ID - " + seat.attr("seat_id") + "; Координаты - (" + seat.attr("cx") + "," + seat.attr("cy") + ") </p>";

        seat.style("cursor", "pointer");


        showSeatInfo(seatCoor.left + seatCoor.width * 0.5, seatCoor.top - seatCoor.height * 0.5, html, true);
    }


    function seatmouseDownHandler(thisSeat, eventt) {

        if (shift_down) {
            return;
        }

        var eventdown = eventt;
        var seatRadius = parseInt(thisSeat.attr("r"));
        svgCoor = getCoords(svg_cont[0]);
        $j("#fixed_seat_info").removeClass("display_block");

        if (iszoomed) {
            canvasMask.disable();
            var shiftX = eventdown.pageX - getCoords(thisSeat._groups[0][0]).left - seatRadius * 2;
            var shiftY = eventdown.pageY - getCoords(thisSeat._groups[0][0]).top - seatRadius * 2;
        } else {
            var shiftX = eventdown.pageX - getCoords(thisSeat._groups[0][0]).left - seatRadius;
            var shiftY = eventdown.pageY - getCoords(thisSeat._groups[0][0]).top - seatRadius;

        }

        document.onmousemove = function (e) {
            var event = e;
            isdrag = true;
            if (iszoomed) {

                var left = (event.pageX - svgCoor.left - shiftX) * 0.5;
                var top = (event.pageY - svgCoor.top - shiftY) * 0.5;

                left = (left < seatRadius * 2) ? seatRadius * 2 : left;
                left = (left > svgCoor.width / 2 - seatRadius * 2) ? svgCoor.width / 2 - seatRadius * 2 : left;

                top = (top < seatRadius * 2) ? seatRadius * 2 : top;
                top = (top > svgCoor.height / 2 - seatRadius * 2) ? svgCoor.height / 2 - seatRadius * 2 : top;
            } else {
                var left = event.pageX - svgCoor.left - shiftX;
                var top = event.pageY - svgCoor.top - shiftY;

                left = (left < seatRadius * 2) ? seatRadius * 2 : left;
                left = (left > svgCoor.width - seatRadius * 2) ? svgCoor.width - seatRadius * 2 : left;

                top = (top < seatRadius * 2) ? seatRadius * 2 : top;
                top = (top > svgCoor.height - seatRadius * 2) ? svgCoor.height - seatRadius * 2 : top;
            }

            left = Math.round(left);
            top = Math.round(top);

            thisSeat.attr("cx", left);
            thisSeat.attr("cy", top);
        };

        document.onmouseup = function () {
            var cx = parseInt(thisSeat.attr("cx"));
            var cy = parseInt(thisSeat.attr("cy"));

            cx = RoundWithBazisNumber(cx, circle_raduis_min);
            cy = RoundWithBazisNumber(cy, circle_raduis_min);

            thisSeat.attr("cx", cx);
            thisSeat.attr("cy", cy);

            document.onmousemove = null;
            document.onmouseup = null;

            isdrag = false;
            if (iszoomed) {
                canvasMask.enable();
            }
        };

    }


    function deselectAllSelectedSeats(k) {
        if (k) {
            for (i = 0; i < seats_selected.length; i++) {
                var tempseat = seats_selected[i];
                tempseat = seatStyleDeselected(tempseat);
            }
        }
        else {
            var allSeats = svg_chart.selectAll("circle");

            allSeats.each(function () {
                var tempseat = d3.select(this);
                tempseat = seatStyleDeselected(tempseat);
            })
        }
        seats_selected.length = 0;
        $j("#updateselectedseatsPositionsButton").prop("disabled", true);
    }

    function selectAllSeats() {

        var allSeats = svg_chart.selectAll("circle");

        allSeats.each(function () {
            var tempseat = d3.select(this);
            tempseat = seatStyleSelected(tempseat);
            seats_selected.push(tempseat);
        });

        $j("#updateselectedseatsPositionsButton").prop("disabled", false);
    }


    function seatmouseClickHandler(seat) {
        if (shift_down) {
            if (seat.attr("seat_isselected") == "false") {
                seats_selected.push(seat);
                seat = seatStyleSelected(seat);
            }
            else {

                for (i = 0; i < seats_selected.length; i++) {
                    if (seat.attr("seat_id") == seats_selected[i].attr("seat_id")) {
                        seats_selected.splice(i, 1);
                        break;
                    }
                }

                seat = seatStyleDeselected(seat);
            }
            if (seats_selected.length > 0) {
                $j("#updateselectedseatsPositionsButton").prop("disabled", false);
            }
            else {
                $j("#updateselectedseatsPositionsButton").prop("disabled", true);
            }
        }

        else {

            if (seat.attr("seat_isselected") == "false") {
                deselectAllSelectedSeats(false);

                seat = seatStyleSelected(seat);
                seat_one_selected = seat;
                $j("#deleteseatButton").prop("disabled", false);
                $j("#updateseatButton").prop("disabled", false);

            } else {
                deselectAllSelectedSeats(true);

                seat = seatStyleDeselected(seat);
                var seat_remove_id = parseInt(seat.attr("seat_id"));
                seat_one_selected = null;
                $j("#deleteseatButton").prop("disabled", true);
                $j("#updateseatButton").prop("disabled", true);
            }
        }

    }

// svg_chart.selectAll("line").on("mouseenter", function(e)
// {
//     console.log(d3.select(this).attr("x1"));
// });


// $j("#seat_order_list").on("click", ".seat_order_remove_btn", function()
// {
//     var thisRemoveId = parseInt($j(this).attr("seat_removeid"));

//     $j(this).parent().parent().remove();

//     var seats = svg_chart.selectAll("circle");
//     var seat_change_style;
//     seats.each(function(d, i)
//     {
//         var thisCir = d3.select(this);
//         var cir_id = parseInt(thisCir.attr("seat_id"));

//         if (thisRemoveId === cir_id)
//         {
//             seat_change_style = thisCir;
//             return false;
//         }
//     });

//     seat_change_style = seatStyleDeselected(seat_change_style);

//     removefromOrder(thisRemoveId);
//     logOrder();
// });


    function showSeatInfo(left, top, html, k) {
        if (k) {
            $j("#fixed_seat_info").addClass("display_block");
        } else {
            //  $j("#fixed_seat_info").removeClass("display_block");
        }

        $j("#fixed_seat_info").css("left", left - pageXOffset);
        $j("#fixed_seat_info").css("top", top - pageYOffset);
        $j("#fixed_seat_info").html(html);
    }


    function seatStyleSelected(seat) {
        seat
            .style("stroke", seat.attr("seat_color"))
            .style("stroke-width", circle_raduis_min)
            .style("fill", "white");
        seat.attr("seat_isselected", true);
        return seat;
    }


    function seatStyleDeselected(seat) {
        seat
            .style("stroke", "")
            .style("stroke-width", 1)
            .style("fill", seat.attr("seat_color"));
        seat.attr("seat_isselected", false);
        return seat;
    }


    function enableDrag() {
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


    function RoundWithBazisNumber(number, bazis) {
        if (number % bazis < bazis / 2) {
            number = number - number % bazis;
        } else {
            number = number + (bazis - number % bazis);
        }
        return number;
    }


    function addSeatsInfo(data) {
        var seats_array = [];

        for (var key in data) {
            var seat = {};

            seat.seat_id = data[key].id;
            seat.seat_type_id = data[key].type_id;
            seat.seat_price = data[key].price;
            seat.seat_color = data[key].color;
            seat.seat_left = data[key].left;
            seat.seat_top = data[key].top;
            seat.seat_row = data[key].row;
            seat.seat_number = data[key].number;
            //   seat.seat_isbooked = data[key].booked;
            seat.seat_isselected = false;
            seats_array.push(seat);
        }

        for (i = 0; i < seats_array.length; i++) {
            createSeatfromObj(seats_array[i]);
        }

        hideToolTabs();
    }


    function createSeatfromObj(obj) {
        svg_chart.append('circle')
            .attr("seat_id", obj.seat_id)
            .attr("seat_type_id", obj.seat_type_id)
            .attr("seat_price", obj.seat_price)
            .attr("cx", obj.seat_left)
            .attr("cy", obj.seat_top)
            .attr("seat_color", obj.seat_color)
            .style("fill", obj.seat_color)
            .attr("seat_isselected", obj.seat_isselected)
            .attr("seat_row", obj.seat_row)
            .attr("seat_number", obj.seat_number)
            .attr("r", circle_raduis_min)
            .on("mousedown", function () {
                seatmouseDownHandler(d3.select(this), d3.event);
            })
            .on("mouseenter", function () {
                seatmouseEnterHandler(d3.select(this), d3.event);
                //    d3.select(this).attr("seat_isbooked");
            })
            .on("mouseleave", function () {
                showSeatInfo(0, 0, "", false);
            })
            .on("click", function () {
                seatmouseClickHandler(d3.select(this));
            });
    }


    function showMessage(message, iserror) {
        //  $j("#errors_container").css("display", "inline-block");
        var error_cont = $j("#errors_container");

        if (iserror) {
            error_cont.css("background-color", "tomato");
        } else {
            error_cont.css("background-color", "cornflowerblue");
        }
        error_cont.html(message);
        error_cont.css("opacity", 1);


        setTimeout(function () {
            error_cont.css("opacity", 0);
            error_cont.css("color", "");
            error_cont.text("");

        }, 3000);
    }


    function getSeatsAjax() {
        $j.ajax({
            type: "GET",

            url: ajaxurl,
            data: {
                action: 'getSeats'
            },
            success: function (response) {

                var data = JSON.parse(response);
                addSeatsInfo(data);

            },
            error: function (res) {
                console.log("error : ", res);
            }
        });
    }

    function d3Seat_to_jsSeat(d3obj) {
        var seat = {};
        seat.seat_id = parseInt(d3obj.attr("seat_id"));
        seat.seat_type_id = parseInt(d3obj.attr("seat_type_id"));
        seat.seat_price = parseInt(d3obj.attr("seat_price"));
        seat.seat_color = d3obj.attr("seat_color");
        seat.seat_left = parseInt(d3obj.attr("cx"));
        seat.seat_top = parseInt(d3obj.attr("cy"));
        //  seat.seat_isbooked = (d3obj.attr("seat_isbooked") == "true");
        seat.seat_number = parseInt(d3obj.attr("seat_number"));
        seat.seat_row = parseInt(d3obj.attr("seat_row"));
        return seat;
    }

    function addNewSeatAjax(newSeat) {
        ShowToolTab("#preloader_tab");

        $j.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'addNewSeat',
                seat: newSeat
            },
            success: function (json) {
                var data = JSON.parse(json);
                // console.log(json);
                //  return;

                newSeat.seat_id = parseInt(data);

                if (newSeat.seat_id > 0) {
                    createSeatfromObj(newSeat);
                    showMessage("Место под номером " + newSeat.seat_id + " добавлено", false);
                } else if (newSeat.seat_id == -2) {
                    showMessage("Не удалось добавить информацию о новом месте в базу, так Место с таким Рядом и Номером уже есть", true);
                } else {
                    showMessage("Не удалось добавить информацию о новом месте в базу", true);

                }
            },
            error: function (res) {
                showMessage("Не удалось добавить информацию о новом месте в базу: " + res, true);
            },
            complete: function () {
                hideToolTabs();
            }
        });
    }

    function removeSeatAjax(seatDelete) {
        ShowToolTab("#preloader_tab");

        seatDelete = d3Seat_to_jsSeat(seatDelete);

        $j.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'removeSeat',
                seat: seatDelete
            },
            success: function (json) {

                var data = parseInt(JSON.parse(json));

                if (data > 0) {
                    seat_one_selected.remove();
                    $j(this).prop("disabled", true);
                    $j("#updateseatButton").prop("disabled", true);

                    showMessage("Место под номером " + seatDelete.seat_id + " удалено", false);
                } else {
                    showMessage("Не удалось удалить информацию об удаляемом месте в базе", true);
                }
            },
            error: function (res) {
                showMessage("Не удалось удалить информацию об удаляемом месте в базе: " + res, true);
            },
            complete: function () {
                hideToolTabs();
            }
        });
    }


    function updateAllSeatsPositionAjax(seats_array) {
        ShowToolTab("#preloader_tab");
        console.log(seats_array[0]);
        $j.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'updateSeatsPosition',
                seats_array: seats_array
            },
            success: function (json) {
                var data = JSON.parse(json);
                // console.log(json);
                updateAllSeatsShowResult(data);
            },
            error: function (res) {
                showMessage("Не удалось удалить сохранить новые координаты мест в базе: " + res, true);
            },
            complete: function () {
                hideToolTabs();
            }
        });
    }


    function updateAllSeatsShowResult(data) {
        var startmsg = "Места под номерами <span>";
        var goodmessage = "";
        var badmessage = "";
        var normalmessage = "";
        for (i = 0; i < data.length; i++) {
            switch (data[i].res) {
                case -1:
                    badmessage += data[i].id + ", "
                    break;
                case 0:
                    normalmessage += data[i].id + ", "
                    break;
                case 1:
                    goodmessage += data[i].id + ", "
                    break;
            }
        }

        (goodmessage != "") ? goodmessage = startmsg + goodmessage + "</span> были обновлены <br>" : goodmessage;
        (badmessage != "") ? badmessage = startmsg + badmessage + "</span> не были обновлены изза непредвиденной ошибки <br>" : badmessage;
        (normalmessage != "") ? normalmessage = startmsg + normalmessage + "</span> не нуждались в обновлении<br>" : normalmessage;

        var message = "Всего мест - " + data.length + " <br>";
        message += goodmessage + badmessage + normalmessage;

        showMessage(message, false);
    }


    function getPricesAjax() {
        $j.ajax({
            type: "GET",

            url: ajaxurl,
            data: {
                action: 'getPrices'
            },
            success: function (response) {

                var data = JSON.parse(response);
                addPricesInfo(data);

            },
            error: function (res) {
                console.log("error : ", res);
            }
        });
    }


    function addPricesInfo(data) {
        seat_prices = [];

        for (var key in data) {
            var price_info = {};
            price_info.id = data[key].id;
            price_info.price = data[key].price;
            price_info.name = data[key].name || "";
            price_info.color = data[key].color;
            seat_prices.push(price_info);
        }

        for (i = 0; i < seat_prices.length; i++) {
            if (seat_prices[i].name == "booked") {
                price_booked_type_id = seat_prices[i].id;
                continue;
            }
            var li_price = document.createElement('li');
            li_price.setAttribute("seat_type_id", seat_prices[i].id);
            var html = "" + seat_prices[i].price + "₽";
            li_price.innerHTML = html;
            $j(li_price).css("border-top-color", seat_prices[i].color);

            seat_prices_info_ul[0].appendChild(li_price);
        }
    }


    function showDiffPrices(id) {
        var seats = svg_chart.selectAll("circle");
        seats.each(function (d, i) {
            var thisCir = d3.select(this);
            var cir_id = thisCir.attr("seat_type_id");

            if (id == cir_id) {
                if (thisCir.style('opacity') == 0.6) {
                    thisCir.style('opacity', 1);
                } else {
                    thisCir.style('opacity', 0.6);
                }
            }
        });
    }


    function ShowToolTab(tabId) {
        $j('.tool_menu_tabs .tool_tab').css("display", "none");
        $j('.tool_menu_tabs').css('display', "block");
        $j(tabId).css("display", "block");
    }

    function hideToolTabs() {
        $j('.tool_menu_tabs').css('display', "none");
        $j('.tool_menu_tabs .tool_tab').css("display", "none");
    }

    function hideDiffPrices() {
        $j("#seat_prices_filter li").removeClass("li_selected");
        var seats = svg_chart.selectAll("circle");
        seats.each(function (d, i) {
            var thisCir = d3.select(this);
            var cir_id = thisCir.attr("seat_type_id");
            thisCir.style('opacity', 0.6);
        });
    }

    function DrawGrid() {
        var seat = svg_chart.select("circle");

        var cw = parseInt(svg_chart.attr("width"));
        var ch = parseInt(svg_chart.attr("height"));
        var cwCount = cw / circle_raduis_min;
        var chCount = ch / circle_raduis_min;
        //  console.log(cwCount, chCount);

        for (i = 0; i < cwCount; i++) {
            svg_chart.append("line")
                .style("stroke", "gray")
                .style("opacity", grid_opacity)
                .attr("x1", i * circle_raduis_min)
                .attr("x2", i * circle_raduis_min)
                .attr("y1", 0)
                .attr("y2", ch);
        }
        for (i = 0; i < chCount; i++) {
            svg_chart.append("line")
                .style("stroke", "gray")
                .style("opacity", grid_opacity)
                .attr("x1", 0)
                .attr("x2", cw)
                .attr("y1", i * circle_raduis_min)
                .attr("y2", i * circle_raduis_min);
        }

        start_x = svgCoor.width * 0.1;
        start_y = end_y = svgCoor.height - svgCoor.height * 0.05;
        x1 = x2 = svgCoor.width * 0.5;
        x1 = svgCoor.width * 0.4;
        x2 = svgCoor.width * 0.6;
        y1 = y2 = start_y * 0.9;
        end_x = svgCoor.width * 0.9;

        var path_value = "M " + start_x + ", " + start_y + " C " + x1 + ", " + y1 + " " + x2 + ", " + y2 + " " + end_x + ", " + end_y;


        svg_chart.append("path")
            .attr("d", path_value)
            .attr("stroke", "gray")
            .attr("stroke-width", 3)
            .attr("fill", "none");

        var text_elem = svg_chart.append("text")
            .attr("x", svgCoor.width / 2)
            .attr("y", svgCoor.height * 0.95)
            .text("СЦЕНА")
            .attr("fill", "gray")
            .attr("font-size", "35px");
        text_elem.attr("x", parseInt(text_elem.attr("x")) - getCoords(text_elem._groups[0][0]).width / 2);

    }

    function random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }


})
;