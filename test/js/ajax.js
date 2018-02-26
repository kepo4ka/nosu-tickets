$(document).ready(function() {


    $.ajax({
        type: "get",
        url: "php/career.php",
        data: "data",
        success: function(response) {
            var res = JSON.parse(response);
            createJob(res);
        }
    });

    //Запрос цены акций 
    $('#download_price_container').click(function(e) {
        e.preventDefault();

        $.ajax({
            type: "get",
            url: "php/stock.php",
            data: "data",
            dataType: "text",
            success: function(response) {
                $('.funi_price').text("$" + response);
            }
        });

    });


});