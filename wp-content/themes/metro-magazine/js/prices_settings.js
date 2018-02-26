$j = jQuery.noConflict();


$j(document).ready(function () {

    getPrices();


    $j("#add_price_type").on('click', function () {
        $j(this).hide();
        $j(".new_price_type_container").show();

    });

    $j(".tool_menu_container").on("click", "#new_price_type_save", function () {
        $j(".new_price_type_container").hide();
        $j("#add_price_type").show();
        //   $j("#new_price_value").val('');
        addPriceType();
    });


    $j("#prices_table").on("click", ".remove_price_type_btn", function () {
        var remove_id = $j(this).parent().parent().attr("id");
        var confirmRemoving = confirm("Удалить Ценовую категорию с ID = " + remove_id);
        if (confirmRemoving) {
            removePriceTypeAjax(remove_id);
        }
    });

    $j("#save_price_type_settings").on("click", function () {
        updatePriceTypes();
    });


    $j(document).on("blur", ".price_type_value", function () {

        if ($j(this).val() == "" || parseInt($j(this).val()) < 0) {
            $j(this).css("border-color", "red");
            $j(this).attr("title", "ВВедите НеОтрицательное число");
            $j(this).focus();
        } else {
            $j(this).css("border-color", "#ddd");
            $j(this).attr("title", "");

        }
    });


    $j("#new_price_type_value").on("blur", function () {

        if ($j(this).val() == "" || parseInt($j(this).val()) < 0) {
            $j(this).css("border-color", "red");
            $j(this).attr("title", "ВВедите НеОтрицательное число");
            $j(this).focus();
        } else {
            $j(this).css("border-color", "#ddd");
            $j(this).attr("title", "");
        }
    });



    function addPriceType() {
        var newPriceType = {};
        newPriceType.price = parseInt($j("#new_price_type_value").val());
        newPriceType.color = $j("#new_price_type_color").val();
        newPriceType.name = $j("#new_price_type_name").val();

        if (newPriceType.price >= 0) {
            $j.ajax({
                type: "POST",

                url: ajaxurl,
                data: {
                    action: 'addPriceType',
                    PriceType: newPriceType
                },
                success: function (response) {
                    var data = JSON.parse(response);
                    newPriceType.id = parseInt(data);

                    if (newPriceType.id > 0) {
                        var dataarr = [];
                        dataarr.push(newPriceType);
                        addPricesInfo(dataarr);
                    } else {
                        alert("Не удалось добавить");
                    }
                },
                error: function (res) {
                    console.log("error : ", res);
                }
            });
        }
    }

    function getPrices() {
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

    function removePriceTypeAjax(remove_id) {
        $j.ajax({
            type: "GET",

            url: ajaxurl,
            data: {
                action: 'removePriceType',
                remove_id: remove_id
            },
            success: function (response) {
                var data = JSON.parse(response);
                if (data == 1) {
                    removePriceTypeRow(remove_id);
                } else {
                    alert("Не удалось удалить Категорию");
                }
            },
            error: function (res) {
                console.log("error : ", res);
                alert("Не удалось удалить Категорию, ошибка: " + res);
            }
        });
    }


    function removePriceTypeRow(remove_id) {
        $j("#prices_table tbody tr").each(function () {
            if ($j(this).attr("id") == remove_id) {
                $j(this).remove();
                return false;
            }
        })
    }


    function addPricesInfo(data) {
        for (i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            $j(tr).attr("id", data[i].id);


            if (data[i].name == "booked") {
                var html = "<td>" + data[i].id + "</td>" +
                    "<td><input disabled type='text'  class='price_type_name' value='" + data[i].name + "'></td>" +
                    "<td><input disabled type='number' min='0' class='price_type_value' value='" + parseInt(data[i].price) + "'></td>" +
                    "<td><input type='color' class='price_type_color' value='" + data[i].color + "'></td>" +
                    "<td><button disabled class='button remove_price_type_btn'>Удалить</button></td>";
            } else {
                var html = "<td>" + data[i].id + "</td>" +
                    "<td><input type='text'  class='price_type_name' value='" + data[i].name + "'></td>" +
                    "<td><input type='number' min='0' class='price_type_value' value='" + parseInt(data[i].price) + "'></td>" +
                    "<td><input type='color' class='price_type_color' value='" + data[i].color + "'></td>" +
                    "<td><button class='button remove_price_type_btn'>Удалить</button></td>";
            }
            $j(tr).html(html);

            $j("#prices_table").append($j(tr));
        }
    }


    function updatePriceTypesAjax(prices_type_array) {

        console.log(prices_type_array);
        $j.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'updatePriceTypes',
                prices_type_array: prices_type_array
            },
            success: function (response) {
                var data = JSON.parse(response);
                var badPrices = [];
                for (i = 0; i < data.length; i++) {
                    if (data[i].res < 0) {
                        badPrices.push(data[i].id);
                    }
                }
                if (badPrices.length == 0) {
                    alert("Ценовые категории успешно обновлены!")
                } else {
                    var messageList = "";
                    for (i = 0; i < badPrices.length; i++) {
                        messageList += " " + badPrices[i].id;
                    }
                    alert("Не удалось обновить Категории c ID: " + messageList);
                }
            },
            error: function (res) {
                console.log("error : ", res);
                alert("Не удалось обновить Категории!, ошибка: " + res);
            }
        });
    }

    function updatePriceTypes() {
        var prices_type_array = [];
        var i = 0;
        $j("#prices_table tbody tr").each(function () {
            if (i < 1) {
                i++;
                return;
            }
            var price_type_info = {};

            price_type_info.id = $j(this).attr("id");
            price_type_info.name = $j(this).find(".price_type_name").val();
            price_type_info.price = $j(this).find(".price_type_value").val();
            price_type_info.color = $j(this).find(".price_type_color").val();

            prices_type_array.push(price_type_info);
        });
        updatePriceTypesAjax(prices_type_array);
    }

});