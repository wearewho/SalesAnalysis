$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // Set Year and Select Data
    var year = $("a.date-picker-year").text();
    selectData(year);

    $('#headModal').text("Total Sales " + year);
    $('#headModal2').text("Total Sales " + year + " : AMB");
    $('#headModal3').text("Total Sales " + year + " : MCB");
    $('#BahtYearOld').text(year - 1);
    $('#UnitYearOld').text(year - 1);
    $('#ambBahtYearOld').text(year - 1);
    $('#ambUnitYearOld').text(year - 1);
    $('#mcbBahtYearOld').text(year - 1);
    $('#mcbUnitYearOld').text(year - 1);

    //Change Year
    $(".date-picker-year").datepicker({
        format: 'yyyy',
        minViewMode: 2,
        autoclose: true,
        startDate: '-1y',
        endDate: 'y',
    }).on("changeYear", function(e) {
        var currYear = String(e.date).split(" ")[3];
        $(".date-picker-year").text(currYear);
        $('#headModal').text("Total Sales " + currYear);
        $('#BahtYearOld').text(currYear - 1);
        $('#UnitYearOld').text(currYear - 1);
        $('#ambBahtYearOld').text(currYear - 1);
        $('#ambUnitYearOld').text(currYear - 1);
        $('#mcbBahtYearOld').text(currYear - 1);
        $('#mcbUnitYearOld').text(currYear - 1);
        selectData(currYear);
    });

    $("#A").click(function() {
        $("#modal-totalSales").modal("toggle");
    });

    $("#B").click(function() {
        $("#modal-totalSales").modal("toggle");
    });

    $("#C").click(function() {
        $("#modal-totalSales").modal("toggle");
    });

    $("#D").click(function() {
        $("#modal-ambTotalSales").modal("toggle");
    });

    $("#E").click(function() {
        $("#modal-mcbTotalSales").modal("toggle");
    });

});

function save_chart(chart, callback) {

    var x = 1;

    $.each(chart, function() {
        render_width = 1000;
        render_height = render_width * this.chartHeight / this.chartWidth

        // Get the cart's SVG code
        var svg = this.getSVG({
            exporting: {
                sourceWidth: this.chartWidth,
                sourceHeight: this.chartHeight
            }
        });

        // Create a canvas
        var canvas = document.createElement('canvas');
        canvas.height = render_height;
        canvas.width = render_width;

        // Create an image and draw the SVG onto the canvas
        var image = new Image;
        image.src = 'data:image/svg+xml;base64,' + window.btoa(svg);
        image.onload = function() {
            canvas.getContext('2d').drawImage(this, 0, 0, render_width, render_height);
            $('#chart' + x++).val(canvas.toDataURL('image/jpeg'));
            var result = canvas.toDataURL('image/jpeg');
            callback(result);
        };
    });

}

function selectData(year) {
    $.ajax({
        beforeSend: function() {
            $(".fadeTable").css("opacity", 0.2);
            $(".loading-img").show();
            $(".loading-img2").show();
        },
        url: 'selectYSD',
        type: "POST",
        data: { "year": year },
        success: function(data, statusText, resObject) {

            if (data[4] == "nullData" && data[5] == "") {
                swal({
                    title: "Data not found.",
                    text: "Please contact adminastrator!",
                    icon: 'info',
                    showConfirmButton: false
                });
                calData(year, data);
            } else if (data[4] == "" && data[5] == "nullTarget") {
                var base = window.location.origin
                var route = '/system/targetmaster/create';
                swal({
                        title: "Target Year " + year + " not found.",
                        text: "Please Create Target Master!",
                        icon: 'info',
                        buttons: ["Create Target Master", true],
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (!willDelete) {
                            window.location = base + route;
                        }
                    });
                calData(year, data);
            } else if (data[4] == "nullData" && data[5] == "nullTarget") {
                var base = window.location.origin
                var route = '/system/targetmaster/create';
                swal({
                    title: "Target Year " + year + " and Data not found.",
                    text: "Please contact adminastrator!",
                    icon: 'info',
                    showConfirmButton: false
                });
                calData(year, data);
            } else {
                calData(year, data);
            }

            return false;
        },
        complete: function() {
            $(".fadeTable").css("opacity", 1);
            $(".loading-img").hide();
            $(".loading-img2").hide();
        }
    });
}

function selectDataTableModal(type, data, startDate, endDate, startYear, endYear, desp) {
    var idItem = data;
    $.ajax({
        url: '/rem/selectEnquiryDataTableModalREM',
        type: "POST",
        data: { "type": type, "data": data, "startDate": startDate, "endDate": endDate, "startYear": startYear, "endYear": endYear },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {


            }
            return false;

        },
        complete: function() {
            if (type == "findCustomer") {
                $("#modal-customerDataTable").modal("toggle");
            } else if (type == "findItem") {
                $("#modal-itemDataTable").modal("toggle");
            } else if (type == "findInItem") {
                $("#modal-invoiceItemDataTable").modal("toggle");
            } else if (type == "findInCust") {
                $("#modal-invoiceCustomerDataTable").modal("toggle");
            }

        }
    });
}

function calData(year, data) {
    var currYear = data[0];
    var oldYear = data[1];
    var targetREMAMB = data[2][0];

    if (data[3][0].ItemGroup == 'AMB') {
        var targetMTDAMB = data[3][0];
        var targetMTDMCB = data[3][1];
    } else {
        var targetMTDMCB = data[3][0];
        var targetMTDAMB = data[3][1];
    }

    var topREMProduct = data[4];
    var topMTDProduct = data[5];
    var topREMCustomer = data[6];
    var topMTDCustomer = data[7];

    var currREMAMBTotalBaht = 0,
        currREMAMBTotalUnit = 0,
        currMTDAMBTotalBaht = 0,
        currMTDAMBTotalUnit = 0,
        currMTDMCBTotalBaht = 0,
        currMTDMCBTotalUnit = 0,
        oldREMAMBTotalBaht = 0,
        oldREMAMBTotalUnit = 0,
        oldMTDAMBTotalBaht = 0,
        oldMTDAMBTotalUnit = 0,
        oldMTDMCBTotalBaht = 0,
        oldMTDMCBTotalUnit = 0,
        currREMTotalBaht = 0,
        currREMTotalUnit = 0,
        oldREMTotalBaht = 0,
        oldREMTotalUnit = 0,
        currREMUnitJanuary = 0,
        currREMUnitFebruary = 0,
        currREMUnitMarch = 0,
        currREMUnitApril = 0,
        currREMUnitMay = 0,
        currREMUnitJune = 0,
        currREMUnitJuly = 0,
        currREMUnitAugust = 0,
        currREMUnitSeptember = 0,
        currREMUnitOctober = 0,
        currREMUnitNovember = 0,
        currREMUnitDecember = 0,
        currREMBahtJanuary = 0,
        currREMBahtFebruary = 0,
        currREMBahtMarch = 0,
        currREMBahtApril = 0,
        currREMBahtMay = 0,
        currREMBahtJune = 0,
        currREMBahtJuly = 0,
        currREMBahtAugust = 0,
        currREMBahtSeptember = 0,
        currREMBahtOctober = 0,
        currREMBahtNovember = 0,
        currREMBahtDecember = 0,
        currREMUnitQ1 = 0,
        currREMBahtQ1 = 0,
        currREMUnitQ2 = 0,
        currREMBahtQ2 = 0,
        currREMUnitQ3 = 0,
        currREMBahtQ3 = 0,
        currREMUnitQ4 = 0,
        currREMBahtQ4 = 0,
        oldREMUnitJanuary = 0,
        oldREMUnitFebruary = 0,
        oldREMUnitMarch = 0,
        oldREMUnitApril = 0,
        oldREMUnitMay = 0,
        oldREMUnitJune = 0,
        oldREMUnitJuly = 0,
        oldREMUnitAugust = 0,
        oldREMUnitSeptember = 0,
        oldREMUnitOctober = 0,
        oldREMUnitNovember = 0,
        oldREMUnitDecember = 0,
        oldREMBahtJanuary = 0,
        oldREMBahtFebruary = 0,
        oldREMBahtMarch = 0,
        oldREMBahtApril = 0,
        oldREMBahtMay = 0,
        oldREMBahtJune = 0,
        oldREMBahtJuly = 0,
        oldREMBahtAugust = 0,
        oldREMBahtSeptember = 0,
        oldREMBahtOctober = 0,
        oldREMBahtNovember = 0,
        oldREMBahtDecember = 0,
        oldREMUnitQ1 = 0,
        oldREMBahtQ1 = 0,
        oldREMUnitQ2 = 0,
        oldREMBahtQ2 = 0,
        oldREMUnitQ3 = 0,
        oldREMBahtQ3 = 0,
        oldREMUnitQ4 = 0,
        oldREMBahtQ4 = 0,
        achieveREMBahtJanuary = 0,
        achieveREMBahtFebruary = 0,
        achieveREMBahtMarch = 0,
        achieveREMBahtApril = 0,
        achieveREMBahtMay = 0,
        achieveREMBahtJune = 0,
        achieveREMBahtJuly = 0,
        achieveREMBahtAugust = 0,
        achieveREMBahtSeptember = 0,
        achieveREMBahtOctober = 0,
        achieveREMBahtNovember = 0,
        achieveREMBahtDecember = 0,
        achieveREMBahtQ1 = 0,
        achieveREMUnitQ1 = 0,
        achieveREMBahtQ2 = 0,
        achieveREMUnitQ2 = 0,
        achieveREMBahtQ3 = 0,
        achieveREMUnitQ3 = 0,
        achieveREMBahtQ4 = 0,
        achieveREMUnitQ4 = 0,
        growthREMBahtJanuary = 0,
        growthREMBahtFebruary = 0,
        growthREMBahtMarch = 0,
        growthREMBahtApril = 0,
        growthREMBahtMay = 0,
        growthREMBahtJune = 0,
        growthREMBahtJuly = 0,
        growthREMBahtAugust = 0,
        growthREMBahtSeptember = 0,
        growthREMBahtOctober = 0,
        growthREMBahtNovember = 0,
        growthREMBahtDecember = 0,
        achieveREMUnitJanuary = 0,
        achieveREMUnitFebruary = 0,
        achieveREMUnitMarch = 0,
        achieveREMUnitApril = 0,
        achieveREMUnitMay = 0,
        achieveREMUnitJune = 0,
        achieveREMUnitJuly = 0,
        achieveREMUnitAugust = 0,
        achieveREMUnitSeptember = 0,
        achieveREMUnitOctober = 0,
        achieveREMUnitNovember = 0,
        achieveREMUnitDecember = 0,
        growthREMUnitJanuary = 0,
        growthREMUnitFebruary = 0,
        growthREMUnitMarch = 0,
        growthREMUnitApril = 0,
        growthREMUnitMay = 0,
        growthREMUnitJune = 0,
        growthREMUnitJuly = 0,
        growthREMUnitAugust = 0,
        growthREMUnitSeptember = 0,
        growthREMUnitOctober = 0,
        growthREMUnitNovember = 0,
        growthREMUnitDecember = 0,
        growthREMBahtQ1 = 0,
        growthREMUnitQ1 = 0,
        growthREMBahtQ2 = 0,
        growthREMUnitQ2 = 0,
        growthREMBahtQ3 = 0,
        growthREMUnitQ3 = 0,
        growthREMBahtQ4 = 0,
        growthREMUnitQ4 = 0,
        currMTDTotalBaht = 0,
        currMTDTotalUnit = 0,
        oldMTDTotalBaht = 0,
        oldMTDTotalUnit = 0,
        currMTDUnitJanuary = 0,
        currMTDUnitFebruary = 0,
        currMTDUnitMarch = 0,
        currMTDUnitApril = 0,
        currMTDUnitMay = 0,
        currMTDUnitJune = 0,
        currMTDUnitJuly = 0,
        currMTDUnitAugust = 0,
        currMTDUnitSeptember = 0,
        currMTDUnitOctober = 0,
        currMTDUnitNovember = 0,
        currMTDUnitDecember = 0,
        currMTDBahtJanuary = 0,
        currMTDBahtFebruary = 0,
        currMTDBahtMarch = 0,
        currMTDBahtApril = 0,
        currMTDBahtMay = 0,
        currMTDBahtJune = 0,
        currMTDBahtJuly = 0,
        currMTDBahtAugust = 0,
        currMTDBahtSeptember = 0,
        currMTDBahtOctober = 0,
        currMTDBahtNovember = 0,
        currMTDBahtDecember = 0,
        currMTDUnitQ1 = 0,
        currMTDBahtQ1 = 0,
        currMTDUnitQ2 = 0,
        currMTDBahtQ2 = 0,
        currMTDUnitQ3 = 0,
        currMTDBahtQ3 = 0,
        currMTDUnitQ4 = 0,
        currMTDBahtQ4 = 0,
        oldMTDUnitJanuary = 0,
        oldMTDUnitFebruary = 0,
        oldMTDUnitMarch = 0,
        oldMTDUnitApril = 0,
        oldMTDUnitMay = 0,
        oldMTDUnitJune = 0,
        oldMTDUnitJuly = 0,
        oldMTDUnitAugust = 0,
        oldMTDUnitSeptember = 0,
        oldMTDUnitOctober = 0,
        oldMTDUnitNovember = 0,
        oldMTDUnitDecember = 0,
        oldMTDBahtJanuary = 0,
        oldMTDBahtFebruary = 0,
        oldMTDBahtMarch = 0,
        oldMTDBahtApril = 0,
        oldMTDBahtMay = 0,
        oldMTDBahtJune = 0,
        oldMTDBahtJuly = 0,
        oldMTDBahtAugust = 0,
        oldMTDBahtSeptember = 0,
        oldMTDBahtOctober = 0,
        oldMTDBahtNovember = 0,
        oldMTDBahtDecember = 0,
        oldMTDUnitQ1 = 0,
        oldMTDBahtQ1 = 0,
        oldMTDUnitQ2 = 0,
        oldMTDBahtQ2 = 0,
        oldMTDUnitQ3 = 0,
        oldMTDBahtQ3 = 0,
        oldMTDUnitQ4 = 0,
        oldMTDBahtQ4 = 0,
        achieveMTDBahtJanuary = 0,
        achieveMTDBahtFebruary = 0,
        achieveMTDBahtMarch = 0,
        achieveMTDBahtApril = 0,
        achieveMTDBahtMay = 0,
        achieveMTDBahtJune = 0,
        achieveMTDBahtJuly = 0,
        achieveMTDBahtAugust = 0,
        achieveMTDBahtSeptember = 0,
        achieveMTDBahtOctober = 0,
        achieveMTDBahtNovember = 0,
        achieveMTDBahtDecember = 0,
        achieveMTDBahtQ1 = 0,
        achieveMTDUnitQ1 = 0,
        achieveMTDBahtQ2 = 0,
        achieveMTDUnitQ2 = 0,
        achieveMTDBahtQ3 = 0,
        achieveMTDUnitQ3 = 0,
        achieveMTDBahtQ4 = 0,
        achieveMTDUnitQ4 = 0,
        growthMTDBahtJanuary = 0,
        growthMTDBahtFebruary = 0,
        growthMTDBahtMarch = 0,
        growthMTDBahtApril = 0,
        growthMTDBahtMay = 0,
        growthMTDBahtJune = 0,
        growthMTDBahtJuly = 0,
        growthMTDBahtAugust = 0,
        growthMTDBahtSeptember = 0,
        growthMTDBahtOctober = 0,
        growthMTDBahtNovember = 0,
        growthMTDBahtDecember = 0,
        achieveMTDUnitJanuary = 0,
        achieveMTDUnitFebruary = 0,
        achieveMTDUnitMarch = 0,
        achieveMTDUnitApril = 0,
        achieveMTDUnitMay = 0,
        achieveMTDUnitJune = 0,
        achieveMTDUnitJuly = 0,
        achieveMTDUnitAugust = 0,
        achieveMTDUnitSeptember = 0,
        achieveMTDUnitOctober = 0,
        achieveMTDUnitNovember = 0,
        achieveMTDUnitDecember = 0,
        growthMTDUnitJanuary = 0,
        growthMTDUnitFebruary = 0,
        growthMTDUnitMarch = 0,
        growthMTDUnitApril = 0,
        growthMTDUnitMay = 0,
        growthMTDUnitJune = 0,
        growthMTDUnitJuly = 0,
        growthMTDUnitAugust = 0,
        growthMTDUnitSeptember = 0,
        growthMTDUnitOctober = 0,
        growthMTDUnitNovember = 0,
        growthMTDUnitDecember = 0,
        growthMTDBahtQ1 = 0,
        growthMTDUnitQ1 = 0,
        growthMTDBahtQ2 = 0,
        growthMTDUnitQ2 = 0,
        growthMTDBahtQ3 = 0,
        growthMTDUnitQ3 = 0,
        growthMTDBahtQ4 = 0,
        growthMTDUnitQ4 = 0,

        currAMBREMUnitJanuary = 0,
        currAMBREMUnitFebruary = 0,
        currAMBREMUnitMarch = 0,
        currAMBREMUnitApril = 0,
        currAMBREMUnitMay = 0,
        currAMBREMUnitJune = 0,
        currAMBREMUnitJuly = 0,
        currAMBREMUnitAugust = 0,
        currAMBREMUnitSeptember = 0,
        currAMBREMUnitOctober = 0,
        currAMBREMUnitNovember = 0,
        currAMBREMUnitDecember = 0,
        currAMBREMBahtJanuary = 0,
        currAMBREMBahtFebruary = 0,
        currAMBREMBahtMarch = 0,
        currAMBREMBahtApril = 0,
        currAMBREMBahtMay = 0,
        currAMBREMBahtJune = 0,
        currAMBREMBahtJuly = 0,
        currAMBREMBahtAugust = 0,
        currAMBREMBahtSeptember = 0,
        currAMBREMBahtOctober = 0,
        currAMBREMBahtNovember = 0,
        currAMBREMBahtDecember = 0,
        currAMBMTDUnitJanuary = 0,
        currAMBMTDUnitFebruary = 0,
        currAMBMTDUnitMarch = 0,
        currAMBMTDUnitApril = 0,
        currAMBMTDUnitMay = 0,
        currAMBMTDUnitJune = 0,
        currAMBMTDUnitJuly = 0,
        currAMBMTDUnitAugust = 0,
        currAMBMTDUnitSeptember = 0,
        currAMBMTDUnitOctober = 0,
        currAMBMTDUnitNovember = 0,
        currAMBMTDUnitDecember = 0,
        currAMBMTDBahtJanuary = 0,
        currAMBMTDBahtFebruary = 0,
        currAMBMTDBahtMarch = 0,
        currAMBMTDBahtApril = 0,
        currAMBMTDBahtMay = 0,
        currAMBMTDBahtJune = 0,
        currAMBMTDBahtJuly = 0,
        currAMBMTDBahtAugust = 0,
        currAMBMTDBahtSeptember = 0,
        currAMBMTDBahtOctober = 0,
        currAMBMTDBahtNovember = 0,
        currAMBMTDBahtDecember = 0,
        currMCBMTDUnitJanuary = 0,
        currMCBMTDUnitFebruary = 0,
        currMCBMTDUnitMarch = 0,
        currMCBMTDUnitApril = 0,
        currMCBMTDUnitMay = 0,
        currMCBMTDUnitJune = 0,
        currMCBMTDUnitJuly = 0,
        currMCBMTDUnitAugust = 0,
        currMCBMTDUnitSeptember = 0,
        currMCBMTDUnitOctober = 0,
        currMCBMTDUnitNovember = 0,
        currMCBMTDUnitDecember = 0,
        currMCBMTDBahtJanuary = 0,
        currMCBMTDBahtFebruary = 0,
        currMCBMTDBahtMarch = 0,
        currMCBMTDBahtApril = 0,
        currMCBMTDBahtMay = 0,
        currMCBMTDBahtJune = 0,
        currMCBMTDBahtJuly = 0,
        currMCBMTDBahtAugust = 0,
        currMCBMTDBahtSeptember = 0,
        currMCBMTDBahtOctober = 0,
        currMCBMTDBahtNovember = 0,
        currMCBMTDBahtDecember = 0,
        currAMBTotalBaht = 0,
        oldAMBREMUnitJanuary = 0,
        oldAMBREMUnitFebruary = 0,
        oldAMBREMUnitMarch = 0,
        oldAMBREMUnitApril = 0,
        oldAMBREMUnitMay = 0,
        oldAMBREMUnitJune = 0,
        oldAMBREMUnitJuly = 0,
        oldAMBREMUnitAugust = 0,
        oldAMBREMUnitSeptember = 0,
        oldAMBREMUnitOctober = 0,
        oldAMBREMUnitNovember = 0,
        oldAMBREMUnitDecember = 0,
        oldAMBREMBahtJanuary = 0,
        oldAMBREMBahtFebruary = 0,
        oldAMBREMBahtMarch = 0,
        oldAMBREMBahtApril = 0,
        oldAMBREMBahtMay = 0,
        oldAMBREMBahtJune = 0,
        oldAMBREMBahtJuly = 0,
        oldAMBREMBahtAugust = 0,
        oldAMBREMBahtSeptember = 0,
        oldAMBREMBahtOctober = 0,
        oldAMBREMBahtNovember = 0,
        oldAMBREMBahtDecember = 0,
        oldAMBMTDUnitJanuary = 0,
        oldAMBMTDUnitFebruary = 0,
        oldAMBMTDUnitMarch = 0,
        oldAMBMTDUnitApril = 0,
        oldAMBMTDUnitMay = 0,
        oldAMBMTDUnitJune = 0,
        oldAMBMTDUnitJuly = 0,
        oldAMBMTDUnitAugust = 0,
        oldAMBMTDUnitSeptember = 0,
        oldAMBMTDUnitOctober = 0,
        oldAMBMTDUnitNovember = 0,
        oldAMBMTDUnitDecember = 0,
        oldAMBMTDBahtJanuary = 0,
        oldAMBMTDBahtFebruary = 0,
        oldAMBMTDBahtMarch = 0,
        oldAMBMTDBahtApril = 0,
        oldAMBMTDBahtMay = 0,
        oldAMBMTDBahtJune = 0,
        oldAMBMTDBahtJuly = 0,
        oldAMBMTDBahtAugust = 0,
        oldAMBMTDBahtSeptember = 0,
        oldAMBMTDBahtOctober = 0,
        oldAMBMTDBahtNovember = 0,
        oldAMBMTDBahtDecember = 0,
        oldMCBMTDUnitJanuary = 0,
        oldMCBMTDUnitFebruary = 0,
        oldMCBMTDUnitMarch = 0,
        oldMCBMTDUnitApril = 0,
        oldMCBMTDUnitMay = 0,
        oldMCBMTDUnitJune = 0,
        oldMCBMTDUnitJuly = 0,
        oldMCBMTDUnitAugust = 0,
        oldMCBMTDUnitSeptember = 0,
        oldMCBMTDUnitOctober = 0,
        oldMCBMTDUnitNovember = 0,
        oldMCBMTDUnitDecember = 0,
        oldMCBMTDBahtJanuary = 0,
        oldMCBMTDBahtFebruary = 0,
        oldMCBMTDBahtMarch = 0,
        oldMCBMTDBahtApril = 0,
        oldMCBMTDBahtMay = 0,
        oldMCBMTDBahtJune = 0,
        oldMCBMTDBahtJuly = 0,
        oldMCBMTDBahtAugust = 0,
        oldMCBMTDBahtSeptember = 0,
        oldMCBMTDBahtOctober = 0,
        oldMCBMTDBahtNovember = 0,
        oldMCBMTDBahtDecember = 0,
        oldAMBTotalBaht = 0;

    var groupedCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.SalesPersonGroup;
    });

    var groupedItemCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.ItemGroupShort;
    });

    var groupedItemOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.ItemGroupShort;
    });

    var groupedOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.SalesPersonGroup;
    });

    $.each(groupedItemCurrYear.AMB, function() {
        if (this.SalesPersonGroup == 'REM') {

            if (this.DocMonth == '1') {
                currAMBREMUnitJanuary += parseFloat(this.Quantity);
                currAMBREMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currAMBREMUnitFebruary += parseFloat(this.Quantity);
                currAMBREMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currAMBREMUnitMarch += parseFloat(this.Quantity);
                currAMBREMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currAMBREMUnitApril += parseFloat(this.Quantity);
                currAMBREMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currAMBREMUnitMay += parseFloat(this.Quantity);
                currAMBREMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currAMBREMUnitJune += parseFloat(this.Quantity);
                currAMBREMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currAMBREMUnitJuly += parseFloat(this.Quantity);
                currAMBREMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currAMBREMUnitAugust += parseFloat(this.Quantity);
                currAMBREMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currAMBREMUnitSeptember += parseFloat(this.Quantity);
                currAMBREMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currAMBREMUnitOctober += parseFloat(this.Quantity);
                currAMBREMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currAMBREMUnitNovember += parseFloat(this.Quantity);
                currAMBREMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currAMBREMUnitDecember += parseFloat(this.Quantity);
                currAMBREMBahtDecember += parseFloat(this.Total);
            }
            currREMAMBTotalUnit += parseFloat(this.Quantity);
            currREMAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD') {

            if (this.DocMonth == '1') {
                currAMBMTDUnitJanuary += parseFloat(this.Quantity);
                currAMBMTDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currAMBMTDUnitFebruary += parseFloat(this.Quantity);
                currAMBMTDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currAMBMTDUnitMarch += parseFloat(this.Quantity);
                currAMBMTDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currAMBMTDUnitApril += parseFloat(this.Quantity);
                currAMBMTDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currAMBMTDUnitMay += parseFloat(this.Quantity);
                currAMBMTDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currAMBMTDUnitJune += parseFloat(this.Quantity);
                currAMBMTDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currAMBMTDUnitJuly += parseFloat(this.Quantity);
                currAMBMTDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currAMBMTDUnitAugust += parseFloat(this.Quantity);
                currAMBMTDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currAMBMTDUnitSeptember += parseFloat(this.Quantity);
                currAMBMTDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currAMBMTDUnitOctober += parseFloat(this.Quantity);
                currAMBMTDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currAMBMTDUnitNovember += parseFloat(this.Quantity);
                currAMBMTDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currAMBMTDUnitDecember += parseFloat(this.Quantity);
                currAMBMTDBahtDecember += parseFloat(this.Total);
            }

            currMTDAMBTotalUnit += parseFloat(this.Quantity);
            currMTDAMBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.MCB, function() {
        if (this.SalesPersonGroup == 'MTD') {

            if (this.DocMonth == '1') {
                currMCBMTDUnitJanuary += parseFloat(this.Quantity);
                currMCBMTDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currMCBMTDUnitFebruary += parseFloat(this.Quantity);
                currMCBMTDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currMCBMTDUnitMarch += parseFloat(this.Quantity);
                currMCBMTDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currMCBMTDUnitApril += parseFloat(this.Quantity);
                currMCBMTDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currMCBMTDUnitMay += parseFloat(this.Quantity);
                currMCBMTDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currMCBMTDUnitJune += parseFloat(this.Quantity);
                currMCBMTDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currMCBMTDUnitJuly += parseFloat(this.Quantity);
                currMCBMTDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currMCBMTDUnitAugust += parseFloat(this.Quantity);
                currMCBMTDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currMCBMTDUnitSeptember += parseFloat(this.Quantity);
                currMCBMTDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currMCBMTDUnitOctober += parseFloat(this.Quantity);
                currMCBMTDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currMCBMTDUnitNovember += parseFloat(this.Quantity);
                currMCBMTDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currMCBMTDUnitDecember += parseFloat(this.Quantity);
                currMCBMTDBahtDecember += parseFloat(this.Total);
            }

            currMTDMCBTotalUnit += parseFloat(this.Quantity);
            currMTDMCBTotalBaht += parseFloat(this.Total);
        }
    });


    $.each(groupedItemOldYear.AMB, function() {
        if (this.SalesPersonGroup == 'REM') {

            if (this.DocMonth == '1') {
                oldAMBREMUnitJanuary += parseFloat(this.Quantity);
                oldAMBREMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBREMUnitFebruary += parseFloat(this.Quantity);
                oldAMBREMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBREMUnitMarch += parseFloat(this.Quantity);
                oldAMBREMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBREMUnitApril += parseFloat(this.Quantity);
                oldAMBREMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBREMUnitMay += parseFloat(this.Quantity);
                oldAMBREMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBREMUnitJune += parseFloat(this.Quantity);
                oldAMBREMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBREMUnitJuly += parseFloat(this.Quantity);
                oldAMBREMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBREMUnitAugust += parseFloat(this.Quantity);
                oldAMBREMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBREMUnitSeptember += parseFloat(this.Quantity);
                oldAMBREMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBREMUnitOctober += parseFloat(this.Quantity);
                oldAMBREMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBREMUnitNovember += parseFloat(this.Quantity);
                oldAMBREMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBREMUnitDecember += parseFloat(this.Quantity);
                oldAMBREMBahtDecember += parseFloat(this.Total);
            }
            oldREMAMBTotalUnit += parseFloat(this.Quantity);
            oldREMAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD') {

            if (this.DocMonth == '1') {
                oldAMBMTDUnitJanuary += parseFloat(this.Quantity);
                oldAMBMTDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBMTDUnitFebruary += parseFloat(this.Quantity);
                oldAMBMTDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBMTDUnitMarch += parseFloat(this.Quantity);
                oldAMBMTDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBMTDUnitApril += parseFloat(this.Quantity);
                oldAMBMTDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBMTDUnitMay += parseFloat(this.Quantity);
                oldAMBMTDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBMTDUnitJune += parseFloat(this.Quantity);
                oldAMBMTDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBMTDUnitJuly += parseFloat(this.Quantity);
                oldAMBMTDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBMTDUnitAugust += parseFloat(this.Quantity);
                oldAMBMTDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBMTDUnitSeptember += parseFloat(this.Quantity);
                oldAMBMTDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBMTDUnitOctober += parseFloat(this.Quantity);
                oldAMBMTDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBMTDUnitNovember += parseFloat(this.Quantity);
                oldAMBMTDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBMTDUnitDecember += parseFloat(this.Quantity);
                oldAMBMTDBahtDecember += parseFloat(this.Total);
            }

            oldMTDAMBTotalUnit += parseFloat(this.Quantity);
            oldMTDAMBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.MCB, function() {
        if (this.SalesPersonGroup == 'MTD') {

            if (this.DocMonth == '1') {
                oldMCBMTDUnitJanuary += parseFloat(this.Quantity);
                oldMCBMTDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldMCBMTDUnitFebruary += parseFloat(this.Quantity);
                oldMCBMTDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldMCBMTDUnitMarch += parseFloat(this.Quantity);
                oldMCBMTDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldMCBMTDUnitApril += parseFloat(this.Quantity);
                oldMCBMTDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldMCBMTDUnitMay += parseFloat(this.Quantity);
                oldMCBMTDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldMCBMTDUnitJune += parseFloat(this.Quantity);
                oldMCBMTDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldMCBMTDUnitJuly += parseFloat(this.Quantity);
                oldMCBMTDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldMCBMTDUnitAugust += parseFloat(this.Quantity);
                oldMCBMTDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldMCBMTDUnitSeptember += parseFloat(this.Quantity);
                oldMCBMTDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldMCBMTDUnitOctober += parseFloat(this.Quantity);
                oldMCBMTDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldMCBMTDUnitNovember += parseFloat(this.Quantity);
                oldMCBMTDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldMCBMTDUnitDecember += parseFloat(this.Quantity);
                oldMCBMTDBahtDecember += parseFloat(this.Total);
            }

            oldMTDMCBTotalUnit += parseFloat(this.Quantity);
            oldMTDMCBTotalBaht += parseFloat(this.Total);
        }
    });



    $.each(groupedCurrYear.REM, function() {
        if (this.DocMonth == '1') {
            currREMUnitJanuary += parseFloat(this.Quantity);
            currREMBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currREMUnitFebruary += parseFloat(this.Quantity);
            currREMBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currREMUnitMarch += parseFloat(this.Quantity);
            currREMBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currREMUnitApril += parseFloat(this.Quantity);
            currREMBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currREMUnitMay += parseFloat(this.Quantity);
            currREMBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currREMUnitJune += parseFloat(this.Quantity);
            currREMBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currREMUnitJuly += parseFloat(this.Quantity);
            currREMBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currREMUnitAugust += parseFloat(this.Quantity);
            currREMBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currREMUnitSeptember += parseFloat(this.Quantity);
            currREMBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currREMUnitOctober += parseFloat(this.Quantity);
            currREMBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currREMUnitNovember += parseFloat(this.Quantity);
            currREMBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currREMUnitDecember += parseFloat(this.Quantity);
            currREMBahtDecember += parseFloat(this.Total);
        }

        currREMTotalBaht += parseFloat(this.Total);
        currREMTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.MTD, function() {
        if (this.DocMonth == '1') {
            currMTDUnitJanuary += parseFloat(this.Quantity);
            currMTDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currMTDUnitFebruary += parseFloat(this.Quantity);
            currMTDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currMTDUnitMarch += parseFloat(this.Quantity);
            currMTDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currMTDUnitApril += parseFloat(this.Quantity);
            currMTDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currMTDUnitMay += parseFloat(this.Quantity);
            currMTDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currMTDUnitJune += parseFloat(this.Quantity);
            currMTDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currMTDUnitJuly += parseFloat(this.Quantity);
            currMTDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currMTDUnitAugust += parseFloat(this.Quantity);
            currMTDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currMTDUnitSeptember += parseFloat(this.Quantity);
            currMTDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currMTDUnitOctober += parseFloat(this.Quantity);
            currMTDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currMTDUnitNovember += parseFloat(this.Quantity);
            currMTDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currMTDUnitDecember += parseFloat(this.Quantity);
            currMTDBahtDecember += parseFloat(this.Total);
        }

        currMTDTotalBaht += parseFloat(this.Total);
        currMTDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.REM, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currREMUnitQ1 += parseFloat(this.Quantity);
            currREMBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currREMUnitQ2 += parseFloat(this.Quantity);
            currREMBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currREMUnitQ3 += parseFloat(this.Quantity);
            currREMBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currREMUnitQ4 += parseFloat(this.Quantity);
            currREMBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.MTD, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currMTDUnitQ1 += parseFloat(this.Quantity);
            currMTDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currMTDUnitQ2 += parseFloat(this.Quantity);
            currMTDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currMTDUnitQ3 += parseFloat(this.Quantity);
            currMTDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currMTDUnitQ4 += parseFloat(this.Quantity);
            currMTDBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.REM, function() {
        if (this.DocMonth == '1') {
            oldREMUnitJanuary += parseFloat(this.Quantity);
            oldREMBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldREMUnitFebruary += parseFloat(this.Quantity);
            oldREMBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldREMUnitMarch += parseFloat(this.Quantity);
            oldREMBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldREMUnitApril += parseFloat(this.Quantity);
            oldREMBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldREMUnitMay += parseFloat(this.Quantity);
            oldREMBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldREMUnitJune += parseFloat(this.Quantity);
            oldREMBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldREMUnitJuly += parseFloat(this.Quantity);
            oldREMBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldREMUnitAugust += parseFloat(this.Quantity);
            oldREMBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldREMUnitSeptember += parseFloat(this.Quantity);
            oldREMBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldREMUnitOctober += parseFloat(this.Quantity);
            oldREMBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldREMUnitNovember += parseFloat(this.Quantity);
            oldREMBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldREMUnitDecember += parseFloat(this.Quantity);
            oldREMBahtDecember += parseFloat(this.Total);
        }

        oldREMTotalBaht += parseFloat(this.Total);
        oldREMTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.MTD, function() {
        if (this.DocMonth == '1') {
            oldMTDUnitJanuary += parseFloat(this.Quantity);
            oldMTDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldMTDUnitFebruary += parseFloat(this.Quantity);
            oldMTDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldMTDUnitMarch += parseFloat(this.Quantity);
            oldMTDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldMTDUnitApril += parseFloat(this.Quantity);
            oldMTDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldMTDUnitMay += parseFloat(this.Quantity);
            oldMTDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldMTDUnitJune += parseFloat(this.Quantity);
            oldMTDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldMTDUnitJuly += parseFloat(this.Quantity);
            oldMTDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldMTDUnitAugust += parseFloat(this.Quantity);
            oldMTDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldMTDUnitSeptember += parseFloat(this.Quantity);
            oldMTDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldMTDUnitOctober += parseFloat(this.Quantity);
            oldMTDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldMTDUnitNovember += parseFloat(this.Quantity);
            oldMTDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldMTDUnitDecember += parseFloat(this.Quantity);
            oldMTDBahtDecember += parseFloat(this.Total);
        }

        oldMTDTotalBaht += parseFloat(this.Total);
        oldMTDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.REM, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldREMUnitQ1 += parseFloat(this.Quantity);
            oldREMBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldREMUnitQ2 += parseFloat(this.Quantity);
            oldREMBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldREMUnitQ3 += parseFloat(this.Quantity);
            oldREMBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldREMUnitQ4 += parseFloat(this.Quantity);
            oldREMBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.MTD, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldMTDUnitQ1 += parseFloat(this.Quantity);
            oldMTDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldMTDUnitQ2 += parseFloat(this.Quantity);
            oldMTDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldMTDUnitQ3 += parseFloat(this.Quantity);
            oldMTDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldMTDUnitQ4 += parseFloat(this.Quantity);
            oldMTDBahtQ4 += parseFloat(this.Total);
        }

    });

    var currAMBUnitJanuary = currAMBREMUnitJanuary + currAMBMTDUnitJanuary,
        currAMBUnitFebruary = currAMBREMUnitFebruary + currAMBMTDUnitFebruary,
        currAMBUnitMarch = currAMBREMUnitMarch + currAMBMTDUnitMarch,
        currAMBUnitApril = currAMBREMUnitApril + currAMBMTDUnitApril,
        currAMBUnitMay = currAMBREMUnitMay + currAMBMTDUnitMay,
        currAMBUnitJune = currAMBREMUnitJune + currAMBMTDUnitJune,
        currAMBUnitJuly = currAMBREMUnitJuly + currAMBMTDUnitJuly,
        currAMBUnitAugust = currAMBREMUnitAugust + currAMBMTDUnitAugust,
        currAMBUnitSeptember = currAMBREMUnitSeptember + currAMBMTDUnitSeptember,
        currAMBUnitOctober = currAMBREMUnitOctober + currAMBMTDUnitOctober,
        currAMBUnitNovember = currAMBREMUnitNovember + currAMBMTDUnitNovember,
        currAMBUnitDecember = currAMBREMUnitDecember + currAMBMTDUnitDecember,
        currAMBBahtJanuary = currAMBREMBahtJanuary + currAMBMTDBahtJanuary,
        currAMBBahtFebruary = currAMBREMBahtFebruary + currAMBMTDBahtFebruary,
        currAMBBahtMarch = currAMBREMBahtMarch + currAMBMTDBahtMarch,
        currAMBBahtApril = currAMBREMBahtApril + currAMBMTDBahtApril,
        currAMBBahtMay = currAMBREMBahtMay + currAMBMTDBahtMay,
        currAMBBahtJune = currAMBREMBahtJune + currAMBMTDBahtJune,
        currAMBBahtJuly = currAMBREMBahtJuly + currAMBMTDBahtJuly,
        currAMBBahtAugust = currAMBREMBahtAugust + currAMBMTDBahtAugust,
        currAMBBahtSeptember = currAMBREMBahtSeptember + currAMBMTDBahtSeptember,
        currAMBBahtOctober = currAMBREMBahtOctober + currAMBMTDBahtOctober,
        currAMBBahtNovember = currAMBREMBahtNovember + currAMBMTDBahtNovember,
        currAMBBahtDecember = currAMBREMBahtDecember + currAMBMTDBahtDecember,
        currAMBTotalBaht = currREMAMBTotalBaht + currMTDAMBTotalBaht,
        currAMBTotalUnit = currREMAMBTotalUnit + currMTDAMBTotalUnit,
        oldAMBUnitJanuary = oldAMBREMUnitJanuary + oldAMBMTDUnitJanuary,
        oldAMBUnitFebruary = oldAMBREMUnitFebruary + oldAMBMTDUnitFebruary,
        oldAMBUnitMarch = oldAMBREMUnitMarch + oldAMBMTDUnitMarch,
        oldAMBUnitApril = oldAMBREMUnitApril + oldAMBMTDUnitApril,
        oldAMBUnitMay = oldAMBREMUnitMay + oldAMBMTDUnitMay,
        oldAMBUnitJune = oldAMBREMUnitJune + oldAMBMTDUnitJune,
        oldAMBUnitJuly = oldAMBREMUnitJuly + oldAMBMTDUnitJuly,
        oldAMBUnitAugust = oldAMBREMUnitAugust + oldAMBMTDUnitAugust,
        oldAMBUnitSeptember = oldAMBREMUnitSeptember + oldAMBMTDUnitSeptember,
        oldAMBUnitOctober = oldAMBREMUnitOctober + oldAMBMTDUnitOctober,
        oldAMBUnitNovember = oldAMBREMUnitNovember + oldAMBMTDUnitNovember,
        oldAMBUnitDecember = oldAMBREMUnitDecember + oldAMBMTDUnitDecember,
        oldAMBBahtJanuary = oldAMBREMBahtJanuary + oldAMBMTDBahtJanuary,
        oldAMBBahtFebruary = oldAMBREMBahtFebruary + oldAMBMTDBahtFebruary,
        oldAMBBahtMarch = oldAMBREMBahtMarch + oldAMBMTDBahtMarch,
        oldAMBBahtApril = oldAMBREMBahtApril + oldAMBMTDBahtApril,
        oldAMBBahtMay = oldAMBREMBahtMay + oldAMBMTDBahtMay,
        oldAMBBahtJune = oldAMBREMBahtJune + oldAMBMTDBahtJune,
        oldAMBBahtJuly = oldAMBREMBahtJuly + oldAMBMTDBahtJuly,
        oldAMBBahtAugust = oldAMBREMBahtAugust + oldAMBMTDBahtAugust,
        oldAMBBahtSeptember = oldAMBREMBahtSeptember + oldAMBMTDBahtSeptember,
        oldAMBBahtOctober = oldAMBREMBahtOctober + oldAMBMTDBahtOctober,
        oldAMBBahtNovember = oldAMBREMBahtNovember + oldAMBMTDBahtNovember,
        oldAMBBahtDecember = oldAMBREMBahtDecember + oldAMBMTDBahtDecember,
        oldAMBTotalBaht = oldREMAMBTotalBaht + oldMTDAMBTotalBaht,
        oldAMBTotalUnit = oldREMAMBTotalUnit + oldMTDAMBTotalUnit,

        currMCBUnitJanuary = currMCBMTDUnitJanuary,
        currMCBUnitFebruary = currMCBMTDUnitFebruary,
        currMCBUnitMarch = currMCBMTDUnitMarch,
        currMCBUnitApril = currMCBMTDUnitApril,
        currMCBUnitMay = currMCBMTDUnitMay,
        currMCBUnitJune = currMCBMTDUnitJune,
        currMCBUnitJuly = currMCBMTDUnitJuly,
        currMCBUnitAugust = currMCBMTDUnitAugust,
        currMCBUnitSeptember = currMCBMTDUnitSeptember,
        currMCBUnitOctober = currMCBMTDUnitOctober,
        currMCBUnitNovember = currMCBMTDUnitNovember,
        currMCBUnitDecember = currMCBMTDUnitDecember,
        currMCBBahtJanuary = currMCBMTDBahtJanuary,
        currMCBBahtFebruary = currMCBMTDBahtFebruary,
        currMCBBahtMarch = currMCBMTDBahtMarch,
        currMCBBahtApril = currMCBMTDBahtApril,
        currMCBBahtMay = currMCBMTDBahtMay,
        currMCBBahtJune = currMCBMTDBahtJune,
        currMCBBahtJuly = currMCBMTDBahtJuly,
        currMCBBahtAugust = currMCBMTDBahtAugust,
        currMCBBahtSeptember = currMCBMTDBahtSeptember,
        currMCBBahtOctober = currMCBMTDBahtOctober,
        currMCBBahtNovember = currMCBMTDBahtNovember,
        currMCBBahtDecember = currMCBMTDBahtDecember,
        currMCBTotalBaht = currMTDMCBTotalBaht,
        currMCBTotalUnit = currMTDMCBTotalUnit,
        oldMCBUnitJanuary = oldMCBMTDUnitJanuary,
        oldMCBUnitFebruary = oldMCBMTDUnitFebruary,
        oldMCBUnitMarch = oldMCBMTDUnitMarch,
        oldMCBUnitApril = oldMCBMTDUnitApril,
        oldMCBUnitMay = oldMCBMTDUnitMay,
        oldMCBUnitJune = oldMCBMTDUnitJune,
        oldMCBUnitJuly = oldMCBMTDUnitJuly,
        oldMCBUnitAugust = oldMCBMTDUnitAugust,
        oldMCBUnitSeptember = oldMCBMTDUnitSeptember,
        oldMCBUnitOctober = oldMCBMTDUnitOctober,
        oldMCBUnitNovember = oldMCBMTDUnitNovember,
        oldMCBUnitDecember = oldMCBMTDUnitDecember,
        oldMCBBahtJanuary = oldMCBMTDBahtJanuary,
        oldMCBBahtFebruary = oldMCBMTDBahtFebruary,
        oldMCBBahtMarch = oldMCBMTDBahtMarch,
        oldMCBBahtApril = oldMCBMTDBahtApril,
        oldMCBBahtMay = oldMCBMTDBahtMay,
        oldMCBBahtJune = oldMCBMTDBahtJune,
        oldMCBBahtJuly = oldMCBMTDBahtJuly,
        oldMCBBahtAugust = oldMCBMTDBahtAugust,
        oldMCBBahtSeptember = oldMCBMTDBahtSeptember,
        oldMCBBahtOctober = oldMCBMTDBahtOctober,
        oldMCBBahtNovember = oldMCBMTDBahtNovember,
        oldMCBBahtDecember = oldMCBMTDBahtDecember,
        oldMCBTotalBaht = oldMTDMCBTotalBaht,
        oldMCBTotalUnit = oldMTDMCBTotalUnit;

    growthREMBahtJanuary = ((currREMBahtJanuary - oldREMBahtJanuary) * 100) / oldREMBahtJanuary;
    growthREMBahtFebruary = ((currREMBahtFebruary - oldREMBahtFebruary) * 100) / oldREMBahtFebruary;
    growthREMBahtMarch = ((currREMBahtMarch - oldREMBahtMarch) * 100) / oldREMBahtMarch;
    growthREMBahtApril = ((currREMBahtApril - oldREMBahtApril) * 100) / oldREMBahtApril;
    growthREMBahtMay = ((currREMBahtMay - oldREMBahtMay) * 100) / oldREMBahtMay;
    growthREMBahtJune = ((currREMBahtJune - oldREMBahtJune) * 100) / oldREMBahtJune;
    growthREMBahtJuly = ((currREMBahtJuly - oldREMBahtJuly) * 100) / oldREMBahtJuly;
    growthREMBahtAugust = ((currREMBahtAugust - oldREMBahtAugust) * 100) / oldREMBahtAugust;
    growthREMBahtSeptember = ((currREMBahtSeptember - oldREMBahtSeptember) * 100) / oldREMBahtSeptember;
    growthREMBahtOctober = ((currREMBahtOctober - oldREMBahtOctober) * 100) / oldREMBahtOctober;
    growthREMBahtNovember = ((currREMBahtNovember - oldREMBahtNovember) * 100) / oldREMBahtNovember;
    growthREMBahtDecember = ((currREMBahtDecember - oldREMBahtDecember) * 100) / oldREMBahtDecember;
    growthREMBahtTotal = ((currREMTotalBaht - oldREMTotalBaht) * 100) / oldREMTotalBaht;
    growthREMBahtQ1 = ((currREMBahtQ1 - oldREMBahtQ1) * 100) / oldREMBahtQ1;
    growthREMBahtQ2 = ((currREMBahtQ2 - oldREMBahtQ2) * 100) / oldREMBahtQ2;
    growthREMBahtQ3 = ((currREMBahtQ3 - oldREMBahtQ3) * 100) / oldREMBahtQ3;
    growthREMBahtQ4 = ((currREMBahtQ4 - oldREMBahtQ4) * 100) / oldREMBahtQ4;

    growthREMUnitJanuary = ((currREMUnitJanuary - oldREMUnitJanuary) * 100) / oldREMUnitJanuary;
    growthREMUnitFebruary = ((currREMUnitFebruary - oldREMUnitFebruary) * 100) / oldREMUnitFebruary;
    growthREMUnitMarch = ((currREMUnitMarch - oldREMUnitMarch) * 100) / oldREMUnitMarch;
    growthREMUnitApril = ((currREMUnitApril - oldREMUnitApril) * 100) / oldREMUnitApril;
    growthREMUnitMay = ((currREMUnitMay - oldREMUnitMay) * 100) / oldREMUnitMay;
    growthREMUnitJune = ((currREMUnitJune - oldREMUnitJune) * 100) / oldREMUnitJune;
    growthREMUnitJuly = ((currREMUnitJuly - oldREMUnitJuly) * 100) / oldREMUnitJuly;
    growthREMUnitAugust = ((currREMUnitAugust - oldREMUnitAugust) * 100) / oldREMUnitAugust;
    growthREMUnitSeptember = ((currREMUnitSeptember - oldREMUnitSeptember) * 100) / oldREMUnitSeptember;
    growthREMUnitOctober = ((currREMUnitOctober - oldREMUnitOctober) * 100) / oldREMUnitOctober;
    growthREMUnitNovember = ((currREMUnitNovember - oldREMUnitNovember) * 100) / oldREMUnitNovember;
    growthREMUnitDecember = ((currREMUnitDecember - oldREMUnitDecember) * 100) / oldREMUnitDecember;
    growthREMUnitTotal = ((currREMTotalUnit - oldREMTotalUnit) * 100) / oldREMTotalUnit;
    growthREMUnitQ1 = ((currREMUnitQ1 - oldREMUnitQ1) * 100) / oldREMUnitQ1;
    growthREMUnitQ2 = ((currREMUnitQ2 - oldREMUnitQ2) * 100) / oldREMUnitQ2;
    growthREMUnitQ3 = ((currREMUnitQ3 - oldREMUnitQ3) * 100) / oldREMUnitQ3;
    growthREMUnitQ4 = ((currREMUnitQ4 - oldREMUnitQ4) * 100) / oldREMUnitQ4;

    growthMTDBahtJanuary = ((currMTDBahtJanuary - oldMTDBahtJanuary) * 100) / oldMTDBahtJanuary;
    growthMTDBahtFebruary = ((currMTDBahtFebruary - oldMTDBahtFebruary) * 100) / oldMTDBahtFebruary;
    growthMTDBahtMarch = ((currMTDBahtMarch - oldMTDBahtMarch) * 100) / oldMTDBahtMarch;
    growthMTDBahtApril = ((currMTDBahtApril - oldMTDBahtApril) * 100) / oldMTDBahtApril;
    growthMTDBahtMay = ((currMTDBahtMay - oldMTDBahtMay) * 100) / oldMTDBahtMay;
    growthMTDBahtJune = ((currMTDBahtJune - oldMTDBahtJune) * 100) / oldMTDBahtJune;
    growthMTDBahtJuly = ((currMTDBahtJuly - oldMTDBahtJuly) * 100) / oldMTDBahtJuly;
    growthMTDBahtAugust = ((currMTDBahtAugust - oldMTDBahtAugust) * 100) / oldMTDBahtAugust;
    growthMTDBahtSeptember = ((currMTDBahtSeptember - oldMTDBahtSeptember) * 100) / oldMTDBahtSeptember;
    growthMTDBahtOctober = ((currMTDBahtOctober - oldMTDBahtOctober) * 100) / oldMTDBahtOctober;
    growthMTDBahtNovember = ((currMTDBahtNovember - oldMTDBahtNovember) * 100) / oldMTDBahtNovember;
    growthMTDBahtDecember = ((currMTDBahtDecember - oldMTDBahtDecember) * 100) / oldMTDBahtDecember;
    growthMTDBahtTotal = ((currMTDTotalBaht - oldMTDTotalBaht) * 100) / oldMTDTotalBaht;
    growthMTDBahtQ1 = ((currMTDBahtQ1 - oldMTDBahtQ1) * 100) / oldMTDBahtQ1;
    growthMTDBahtQ2 = ((currMTDBahtQ2 - oldMTDBahtQ2) * 100) / oldMTDBahtQ2;
    growthMTDBahtQ3 = ((currMTDBahtQ3 - oldMTDBahtQ3) * 100) / oldMTDBahtQ3;
    growthMTDBahtQ4 = ((currMTDBahtQ4 - oldMTDBahtQ4) * 100) / oldMTDBahtQ4;

    growthMTDUnitJanuary = ((currMTDUnitJanuary - oldMTDUnitJanuary) * 100) / oldMTDUnitJanuary;
    growthMTDUnitFebruary = ((currMTDUnitFebruary - oldMTDUnitFebruary) * 100) / oldMTDUnitFebruary;
    growthMTDUnitMarch = ((currMTDUnitMarch - oldMTDUnitMarch) * 100) / oldMTDUnitMarch;
    growthMTDUnitApril = ((currMTDUnitApril - oldMTDUnitApril) * 100) / oldMTDUnitApril;
    growthMTDUnitMay = ((currMTDUnitMay - oldMTDUnitMay) * 100) / oldMTDUnitMay;
    growthMTDUnitJune = ((currMTDUnitJune - oldMTDUnitJune) * 100) / oldMTDUnitJune;
    growthMTDUnitJuly = ((currMTDUnitJuly - oldMTDUnitJuly) * 100) / oldMTDUnitJuly;
    growthMTDUnitAugust = ((currMTDUnitAugust - oldMTDUnitAugust) * 100) / oldMTDUnitAugust;
    growthMTDUnitSeptember = ((currMTDUnitSeptember - oldMTDUnitSeptember) * 100) / oldMTDUnitSeptember;
    growthMTDUnitOctober = ((currMTDUnitOctober - oldMTDUnitOctober) * 100) / oldMTDUnitOctober;
    growthMTDUnitNovember = ((currMTDUnitNovember - oldMTDUnitNovember) * 100) / oldMTDUnitNovember;
    growthMTDUnitDecember = ((currMTDUnitDecember - oldMTDUnitDecember) * 100) / oldMTDUnitDecember;
    growthMTDUnitTotal = ((currMTDTotalUnit - oldMTDTotalUnit) * 100) / oldMTDTotalUnit;
    growthMTDUnitQ1 = ((currMTDUnitQ1 - oldMTDUnitQ1) * 100) / oldMTDUnitQ1;
    growthMTDUnitQ2 = ((currMTDUnitQ2 - oldMTDUnitQ2) * 100) / oldMTDUnitQ2;
    growthMTDUnitQ3 = ((currMTDUnitQ3 - oldMTDUnitQ3) * 100) / oldMTDUnitQ3;
    growthMTDUnitQ4 = ((currMTDUnitQ4 - oldMTDUnitQ4) * 100) / oldMTDUnitQ4;

    targetAMBBahtJanuary = accounting.unformat(targetREMAMB.Amt01) + accounting.unformat(targetMTDAMB.Amt01);
    targetAMBBahtFebruary = accounting.unformat(targetREMAMB.Amt02) + accounting.unformat(targetMTDAMB.Amt02);
    targetAMBBahtMarch = accounting.unformat(targetREMAMB.Amt03) + accounting.unformat(targetMTDAMB.Amt03);
    targetAMBBahtApril = accounting.unformat(targetREMAMB.Amt04) + accounting.unformat(targetMTDAMB.Amt04);
    targetAMBBahtMay = accounting.unformat(targetREMAMB.Amt05) + accounting.unformat(targetMTDAMB.Amt05);
    targetAMBBahtJune = accounting.unformat(targetREMAMB.Amt06) + accounting.unformat(targetMTDAMB.Amt06);
    targetAMBBahtJuly = accounting.unformat(targetREMAMB.Amt07) + accounting.unformat(targetMTDAMB.Amt07);
    targetAMBBahtAugust = accounting.unformat(targetREMAMB.Amt08) + accounting.unformat(targetMTDAMB.Amt08);
    targetAMBBahtSeptember = accounting.unformat(targetREMAMB.Amt09) + accounting.unformat(targetMTDAMB.Amt09);
    targetAMBBahtOctober = accounting.unformat(targetREMAMB.Amt10) + accounting.unformat(targetMTDAMB.Amt10);
    targetAMBBahtNovember = accounting.unformat(targetREMAMB.Amt11) + accounting.unformat(targetMTDAMB.Amt11);
    targetAMBBahtDecember = accounting.unformat(targetREMAMB.Amt12) + accounting.unformat(targetMTDAMB.Amt12);
    targetAMBBahtTotal = targetAMBBahtJanuary + targetAMBBahtFebruary + targetAMBBahtMarch + targetAMBBahtApril + targetAMBBahtMay + targetAMBBahtJune + targetAMBBahtJuly + targetAMBBahtAugust + targetAMBBahtSeptember + targetAMBBahtOctober + targetAMBBahtNovember + targetAMBBahtDecember;
    targetAMBUnitJanuary = accounting.unformat(targetREMAMB.Unit01) + accounting.unformat(targetMTDAMB.Unit01);
    targetAMBUnitFebruary = accounting.unformat(targetREMAMB.Unit02) + accounting.unformat(targetMTDAMB.Unit02);
    targetAMBUnitMarch = accounting.unformat(targetREMAMB.Unit03) + accounting.unformat(targetMTDAMB.Unit03);
    targetAMBUnitApril = accounting.unformat(targetREMAMB.Unit04) + accounting.unformat(targetMTDAMB.Unit04);
    targetAMBUnitMay = accounting.unformat(targetREMAMB.Unit05) + accounting.unformat(targetMTDAMB.Unit05);
    targetAMBUnitJune = accounting.unformat(targetREMAMB.Unit06) + accounting.unformat(targetMTDAMB.Unit06);
    targetAMBUnitJuly = accounting.unformat(targetREMAMB.Unit07) + accounting.unformat(targetMTDAMB.Unit07);
    targetAMBUnitAugust = accounting.unformat(targetREMAMB.Unit08) + accounting.unformat(targetMTDAMB.Unit08);
    targetAMBUnitSeptember = accounting.unformat(targetREMAMB.Unit09) + accounting.unformat(targetMTDAMB.Unit09);
    targetAMBUnitOctober = accounting.unformat(targetREMAMB.Unit10) + accounting.unformat(targetMTDAMB.Unit10);
    targetAMBUnitNovember = accounting.unformat(targetREMAMB.Unit11) + accounting.unformat(targetMTDAMB.Unit11);
    targetAMBUnitDecember = accounting.unformat(targetREMAMB.Unit12) + accounting.unformat(targetMTDAMB.Unit12);
    targetAMBUnitTotal = targetAMBUnitJanuary + targetAMBUnitFebruary + targetAMBUnitMarch + targetAMBUnitApril + targetAMBUnitMay + targetAMBUnitJune + targetAMBUnitJuly + targetAMBUnitAugust + targetAMBUnitSeptember + targetAMBUnitOctober + targetAMBUnitNovember + targetAMBUnitDecember;

    targetMCBBahtJanuary = accounting.unformat(targetMTDMCB.Amt01);
    targetMCBBahtFebruary = accounting.unformat(targetMTDMCB.Amt02);
    targetMCBBahtMarch = accounting.unformat(targetMTDMCB.Amt03);
    targetMCBBahtApril = accounting.unformat(targetMTDMCB.Amt04);
    targetMCBBahtMay = accounting.unformat(targetMTDMCB.Amt05);
    targetMCBBahtJune = accounting.unformat(targetMTDMCB.Amt06);
    targetMCBBahtJuly = accounting.unformat(targetMTDMCB.Amt07);
    targetMCBBahtAugust = accounting.unformat(targetMTDMCB.Amt08);
    targetMCBBahtSeptember = accounting.unformat(targetMTDMCB.Amt09);
    targetMCBBahtOctober = accounting.unformat(targetMTDMCB.Amt10);
    targetMCBBahtNovember = accounting.unformat(targetMTDMCB.Amt11);
    targetMCBBahtDecember = accounting.unformat(targetMTDMCB.Amt12);
    targetMCBBahtTotal = targetMCBBahtJanuary + targetMCBBahtFebruary + targetMCBBahtMarch + targetMCBBahtApril + targetMCBBahtMay + targetMCBBahtJune + targetMCBBahtJuly + targetMCBBahtAugust + targetMCBBahtSeptember + targetMCBBahtOctober + targetMCBBahtNovember + targetMCBBahtDecember;
    targetMCBUnitJanuary = accounting.unformat(targetMTDMCB.Unit01);
    targetMCBUnitFebruary = accounting.unformat(targetMTDMCB.Unit02);
    targetMCBUnitMarch = accounting.unformat(targetMTDMCB.Unit03);
    targetMCBUnitApril = accounting.unformat(targetMTDMCB.Unit04);
    targetMCBUnitMay = accounting.unformat(targetMTDMCB.Unit05);
    targetMCBUnitJune = accounting.unformat(targetMTDMCB.Unit06);
    targetMCBUnitJuly = accounting.unformat(targetMTDMCB.Unit07);
    targetMCBUnitAugust = accounting.unformat(targetMTDMCB.Unit08);
    targetMCBUnitSeptember = accounting.unformat(targetMTDMCB.Unit09);
    targetMCBUnitOctober = accounting.unformat(targetMTDMCB.Unit10);
    targetMCBUnitNovember = accounting.unformat(targetMTDMCB.Unit11);
    targetMCBUnitDecember = accounting.unformat(targetMTDMCB.Unit12);
    targetMCBUnitTotal = targetMCBUnitJanuary + targetMCBUnitFebruary + targetMCBUnitMarch + targetMCBUnitApril + targetMCBUnitMay + targetMCBUnitJune + targetMCBUnitJuly + targetMCBUnitAugust + targetMCBUnitSeptember + targetMCBUnitOctober + targetMCBUnitNovember + targetMCBUnitDecember;

    var totalREMBahtTarget = accounting.unformat(targetREMAMB.AmtQ1) + accounting.unformat(targetREMAMB.AmtQ2) + accounting.unformat(targetREMAMB.AmtQ3) + accounting.unformat(targetREMAMB.AmtQ4);
    var totalREMUnitTarget = accounting.unformat(targetREMAMB.UnitQ1) + accounting.unformat(targetREMAMB.UnitQ2) + accounting.unformat(targetREMAMB.UnitQ3) + accounting.unformat(targetREMAMB.UnitQ4);

    var totalMTDAMBBahtTarget = accounting.unformat(targetMTDAMB.AmtQ1) + accounting.unformat(targetMTDAMB.AmtQ2) + accounting.unformat(targetMTDAMB.AmtQ3) + accounting.unformat(targetMTDAMB.AmtQ4);
    var totalMTDAMBUnitTarget = accounting.unformat(targetMTDAMB.UnitQ1) + accounting.unformat(targetMTDAMB.UnitQ2) + accounting.unformat(targetMTDAMB.UnitQ3) + accounting.unformat(targetMTDAMB.UnitQ4);
    var totalMTDMCBBahtTarget = accounting.unformat(targetMTDMCB.AmtQ1) + accounting.unformat(targetMTDMCB.AmtQ2) + accounting.unformat(targetMTDMCB.AmtQ3) + accounting.unformat(targetMTDMCB.AmtQ4);
    var totalMTDMCBUnitTarget = accounting.unformat(targetMTDMCB.UnitQ1) + accounting.unformat(targetMTDMCB.UnitQ2) + accounting.unformat(targetMTDMCB.UnitQ3) + accounting.unformat(targetMTDMCB.UnitQ4);

    var totalREMBahtTarget = totalREMBahtTarget;
    var totalREMUnitTarget = totalREMUnitTarget;
    var totalMTDBahtTarget = totalMTDAMBBahtTarget + totalMTDMCBBahtTarget;
    var totalMTDUnitTarget = totalMTDAMBUnitTarget + totalMTDMCBUnitTarget;

    achieveREMBahtJanuary = (currREMBahtJanuary * 100) / accounting.unformat(targetREMAMB.Amt01);
    achieveREMBahtFebruary = (currREMBahtFebruary * 100) / accounting.unformat(targetREMAMB.Amt02);
    achieveREMBahtMarch = (currREMBahtMarch * 100) / accounting.unformat(targetREMAMB.Amt03);
    achieveREMBahtApril = (currREMBahtApril * 100) / accounting.unformat(targetREMAMB.Amt04);
    achieveREMBahtMay = (currREMBahtMay * 100) / accounting.unformat(targetREMAMB.Amt05);
    achieveREMBahtJune = (currREMBahtJune * 100) / accounting.unformat(targetREMAMB.Amt06);
    achieveREMBahtJuly = (currREMBahtJuly * 100) / accounting.unformat(targetREMAMB.Amt07);
    achieveREMBahtAugust = (currREMBahtAugust * 100) / accounting.unformat(targetREMAMB.Amt08);
    achieveREMBahtSeptember = (currREMBahtSeptember * 100) / accounting.unformat(targetREMAMB.Amt09);
    achieveREMBahtOctober = (currREMBahtOctober * 100) / accounting.unformat(targetREMAMB.Amt10);
    achieveREMBahtNovember = (currREMBahtNovember * 100) / accounting.unformat(targetREMAMB.Amt11);
    achieveREMBahtDecember = (currREMBahtDecember * 100) / accounting.unformat(targetREMAMB.Amt12);
    achieveREMBahtTotal = (currREMTotalBaht * 100) / totalREMBahtTarget;
    achieveREMBahtQ1 = (currREMBahtQ1 * 100) / accounting.unformat(targetREMAMB.AmtQ1);
    achieveREMBahtQ2 = (currREMBahtQ2 * 100) / accounting.unformat(targetREMAMB.AmtQ2);
    achieveREMBahtQ3 = (currREMBahtQ3 * 100) / accounting.unformat(targetREMAMB.AmtQ3);
    achieveREMBahtQ4 = (currREMBahtQ4 * 100) / accounting.unformat(targetREMAMB.AmtQ4);

    achieveREMUnitJanuary = (currREMUnitJanuary * 100) / accounting.unformat(targetREMAMB.Unit01);
    achieveREMUnitFebruary = (currREMUnitFebruary * 100) / accounting.unformat(targetREMAMB.Unit02);
    achieveREMUnitMarch = (currREMUnitMarch * 100) / accounting.unformat(targetREMAMB.Unit03);
    achieveREMUnitApril = (currREMUnitApril * 100) / accounting.unformat(targetREMAMB.Unit04);
    achieveREMUnitMay = (currREMUnitMay * 100) / accounting.unformat(targetREMAMB.Unit05);
    achieveREMUnitJune = (currREMUnitJune * 100) / accounting.unformat(targetREMAMB.Unit06);
    achieveREMUnitJuly = (currREMUnitJuly * 100) / accounting.unformat(targetREMAMB.Unit07);
    achieveREMUnitAugust = (currREMUnitAugust * 100) / accounting.unformat(targetREMAMB.Unit08);
    achieveREMUnitSeptember = (currREMUnitSeptember * 100) / accounting.unformat(targetREMAMB.Unit09);
    achieveREMUnitOctober = (currREMUnitOctober * 100) / accounting.unformat(targetREMAMB.Unit10);
    achieveREMUnitNovember = (currREMUnitNovember * 100) / accounting.unformat(targetREMAMB.Unit11);
    achieveREMUnitDecember = (currREMUnitDecember * 100) / accounting.unformat(targetREMAMB.Unit12);
    achieveREMUnitTotal = (currREMTotalUnit * 100) / totalREMUnitTarget;
    achieveREMUnitQ1 = (currREMUnitQ1 * 100) / accounting.unformat(targetREMAMB.UnitQ1);
    achieveREMUnitQ2 = (currREMUnitQ2 * 100) / accounting.unformat(targetREMAMB.UnitQ2);
    achieveREMUnitQ3 = (currREMUnitQ3 * 100) / accounting.unformat(targetREMAMB.UnitQ3);
    achieveREMUnitQ4 = (currREMUnitQ4 * 100) / accounting.unformat(targetREMAMB.UnitQ4);

    targetMTDAmt01 = (accounting.unformat(targetMTDAMB.Amt01) + accounting.unformat(targetMTDMCB.Amt01));
    targetMTDAmt02 = (accounting.unformat(targetMTDAMB.Amt02) + accounting.unformat(targetMTDMCB.Amt02));
    targetMTDAmt03 = (accounting.unformat(targetMTDAMB.Amt03) + accounting.unformat(targetMTDMCB.Amt03));
    targetMTDAmt04 = (accounting.unformat(targetMTDAMB.Amt04) + accounting.unformat(targetMTDMCB.Amt04));
    targetMTDAmt05 = (accounting.unformat(targetMTDAMB.Amt05) + accounting.unformat(targetMTDMCB.Amt05));
    targetMTDAmt06 = (accounting.unformat(targetMTDAMB.Amt06) + accounting.unformat(targetMTDMCB.Amt06));
    targetMTDAmt07 = (accounting.unformat(targetMTDAMB.Amt07) + accounting.unformat(targetMTDMCB.Amt07));
    targetMTDAmt08 = (accounting.unformat(targetMTDAMB.Amt08) + accounting.unformat(targetMTDMCB.Amt08));
    targetMTDAmt09 = (accounting.unformat(targetMTDAMB.Amt09) + accounting.unformat(targetMTDMCB.Amt09));
    targetMTDAmt10 = (accounting.unformat(targetMTDAMB.Amt10) + accounting.unformat(targetMTDMCB.Amt10));
    targetMTDAmt11 = (accounting.unformat(targetMTDAMB.Amt11) + accounting.unformat(targetMTDMCB.Amt11));
    targetMTDAmt12 = (accounting.unformat(targetMTDAMB.Amt12) + accounting.unformat(targetMTDMCB.Amt12));
    targetMTDAmtQ1 = (accounting.unformat(targetMTDAMB.AmtQ1) + accounting.unformat(targetMTDMCB.AmtQ1));
    targetMTDAmtQ2 = (accounting.unformat(targetMTDAMB.AmtQ2) + accounting.unformat(targetMTDMCB.AmtQ2));
    targetMTDAmtQ3 = (accounting.unformat(targetMTDAMB.AmtQ3) + accounting.unformat(targetMTDMCB.AmtQ3));
    targetMTDAmtQ4 = (accounting.unformat(targetMTDAMB.AmtQ4) + accounting.unformat(targetMTDMCB.AmtQ4));

    targetMTDUnit01 = (accounting.unformat(targetMTDAMB.Unit01) + accounting.unformat(targetMTDMCB.Unit01));
    targetMTDUnit02 = (accounting.unformat(targetMTDAMB.Unit02) + accounting.unformat(targetMTDMCB.Unit02));
    targetMTDUnit03 = (accounting.unformat(targetMTDAMB.Unit03) + accounting.unformat(targetMTDMCB.Unit03));
    targetMTDUnit04 = (accounting.unformat(targetMTDAMB.Unit04) + accounting.unformat(targetMTDMCB.Unit04));
    targetMTDUnit05 = (accounting.unformat(targetMTDAMB.Unit05) + accounting.unformat(targetMTDMCB.Unit05));
    targetMTDUnit06 = (accounting.unformat(targetMTDAMB.Unit06) + accounting.unformat(targetMTDMCB.Unit06));
    targetMTDUnit07 = (accounting.unformat(targetMTDAMB.Unit07) + accounting.unformat(targetMTDMCB.Unit07));
    targetMTDUnit08 = (accounting.unformat(targetMTDAMB.Unit08) + accounting.unformat(targetMTDMCB.Unit08));
    targetMTDUnit09 = (accounting.unformat(targetMTDAMB.Unit09) + accounting.unformat(targetMTDMCB.Unit09));
    targetMTDUnit10 = (accounting.unformat(targetMTDAMB.Unit10) + accounting.unformat(targetMTDMCB.Unit10));
    targetMTDUnit11 = (accounting.unformat(targetMTDAMB.Unit11) + accounting.unformat(targetMTDMCB.Unit11));
    targetMTDUnit12 = (accounting.unformat(targetMTDAMB.Unit12) + accounting.unformat(targetMTDMCB.Unit12));
    targetMTDUnitQ1 = (accounting.unformat(targetMTDAMB.UnitQ1) + accounting.unformat(targetMTDMCB.UnitQ1));
    targetMTDUnitQ2 = (accounting.unformat(targetMTDAMB.UnitQ2) + accounting.unformat(targetMTDMCB.UnitQ2));
    targetMTDUnitQ3 = (accounting.unformat(targetMTDAMB.UnitQ3) + accounting.unformat(targetMTDMCB.UnitQ3));
    targetMTDUnitQ4 = (accounting.unformat(targetMTDAMB.UnitQ4) + accounting.unformat(targetMTDMCB.UnitQ4));

    achieveMTDBahtJanuary = (currMTDBahtJanuary * 100) / targetMTDAmt01;
    achieveMTDBahtFebruary = (currMTDBahtFebruary * 100) / targetMTDAmt02;
    achieveMTDBahtMarch = (currMTDBahtMarch * 100) / targetMTDAmt03;
    achieveMTDBahtApril = (currMTDBahtApril * 100) / targetMTDAmt04;
    achieveMTDBahtMay = (currMTDBahtMay * 100) / targetMTDAmt05;
    achieveMTDBahtJune = (currMTDBahtJune * 100) / targetMTDAmt06;
    achieveMTDBahtJuly = (currMTDBahtJuly * 100) / targetMTDAmt07;
    achieveMTDBahtAugust = (currMTDBahtAugust * 100) / targetMTDAmt08;
    achieveMTDBahtSeptember = (currMTDBahtSeptember * 100) / targetMTDAmt09;
    achieveMTDBahtOctober = (currMTDBahtOctober * 100) / targetMTDAmt10;
    achieveMTDBahtNovember = (currMTDBahtNovember * 100) / targetMTDAmt11;
    achieveMTDBahtDecember = (currMTDBahtDecember * 100) / targetMTDAmt12;
    achieveMTDBahtTotal = (currMTDTotalBaht * 100) / totalMTDBahtTarget;
    achieveMTDBahtQ1 = (currMTDBahtQ1 * 100) / targetMTDAmtQ1;
    achieveMTDBahtQ2 = (currMTDBahtQ2 * 100) / targetMTDAmtQ2;
    achieveMTDBahtQ3 = (currMTDBahtQ3 * 100) / targetMTDAmtQ3;
    achieveMTDBahtQ4 = (currMTDBahtQ4 * 100) / targetMTDAmtQ4;

    achieveMTDUnitJanuary = (currMTDUnitJanuary * 100) / targetMTDUnit01;
    achieveMTDUnitFebruary = (currMTDUnitFebruary * 100) / targetMTDUnit02;
    achieveMTDUnitMarch = (currMTDUnitMarch * 100) / targetMTDUnit03;
    achieveMTDUnitApril = (currMTDUnitApril * 100) / targetMTDUnit04;
    achieveMTDUnitMay = (currMTDUnitMay * 100) / targetMTDUnit05;
    achieveMTDUnitJune = (currMTDUnitJune * 100) / targetMTDUnit06;
    achieveMTDUnitJuly = (currMTDUnitJuly * 100) / targetMTDUnit07;
    achieveMTDUnitAugust = (currMTDUnitAugust * 100) / targetMTDUnit08;
    achieveMTDUnitSeptember = (currMTDUnitSeptember * 100) / targetMTDUnit09;
    achieveMTDUnitOctober = (currMTDUnitOctober * 100) / targetMTDUnit10;
    achieveMTDUnitNovember = (currMTDUnitNovember * 100) / targetMTDUnit11;
    achieveMTDUnitDecember = (currMTDUnitDecember * 100) / targetMTDUnit12;
    achieveMTDUnitTotal = (currMTDTotalUnit * 100) / totalMTDUnitTarget;
    achieveMTDUnitQ1 = (currMTDUnitQ1 * 100) / targetMTDUnitQ1;
    achieveMTDUnitQ2 = (currMTDUnitQ2 * 100) / targetMTDUnitQ2;
    achieveMTDUnitQ3 = (currMTDUnitQ3 * 100) / targetMTDUnitQ3;
    achieveMTDUnitQ4 = (currMTDUnitQ4 * 100) / targetMTDUnitQ4;

    var currTotalBaht = currREMTotalBaht + currMTDTotalBaht,
        currTotalUnit = currREMTotalUnit + currMTDTotalUnit,
        oldTotalBaht = oldREMTotalBaht + oldMTDTotalBaht,
        oldTotalUnit = oldREMTotalUnit + oldMTDTotalUnit,
        currUnitJanuary = currREMUnitJanuary + currMTDUnitJanuary,
        currUnitFebruary = currREMUnitFebruary + currMTDUnitFebruary,
        currUnitMarch = currREMUnitMarch + currMTDUnitMarch,
        currUnitApril = currREMUnitApril + currMTDUnitApril,
        currUnitMay = currREMUnitMay + currMTDUnitMay,
        currUnitJune = currREMUnitJune + currMTDUnitJune,
        currUnitJuly = currREMUnitJuly + currMTDUnitJuly,
        currUnitAugust = currREMUnitAugust + currMTDUnitAugust,
        currUnitSeptember = currREMUnitSeptember + currMTDUnitSeptember,
        currUnitOctober = currREMUnitOctober + currMTDUnitOctober,
        currUnitNovember = currREMUnitNovember + currMTDUnitNovember,
        currUnitDecember = currREMUnitDecember + currMTDUnitDecember,
        currBahtJanuary = currREMBahtJanuary + currMTDBahtJanuary,
        currBahtFebruary = currREMBahtFebruary + currMTDBahtFebruary,
        currBahtMarch = currREMBahtMarch + currMTDBahtMarch,
        currBahtApril = currREMBahtApril + currMTDBahtApril,
        currBahtMay = currREMBahtMay + currMTDBahtMay,
        currBahtJune = currREMBahtJune + currMTDBahtJune,
        currBahtJuly = currREMBahtJuly + currMTDBahtJuly,
        currBahtAugust = currREMBahtAugust + currMTDBahtAugust,
        currBahtSeptember = currREMBahtSeptember + currMTDBahtSeptember,
        currBahtOctober = currREMBahtOctober + currMTDBahtOctober,
        currBahtNovember = currREMBahtNovember + currMTDBahtNovember,
        currBahtDecember = currREMBahtDecember + currMTDBahtDecember,
        currUnitQ1 = currREMUnitQ1 + currMTDUnitQ1,
        currBahtQ1 = currREMBahtQ1 + currMTDBahtQ1,
        currUnitQ2 = currREMUnitQ2 + currMTDUnitQ2,
        currBahtQ2 = currREMBahtQ2 + currMTDBahtQ2,
        currUnitQ3 = currREMUnitQ3 + currMTDUnitQ3,
        currBahtQ3 = currREMBahtQ3 + currMTDBahtQ3,
        currUnitQ4 = currREMUnitQ4 + currMTDUnitQ4,
        currBahtQ4 = currREMBahtQ4 + currMTDBahtQ4,
        oldUnitJanuary = oldREMUnitJanuary + oldMTDUnitJanuary,
        oldUnitFebruary = oldREMUnitFebruary + oldMTDUnitFebruary,
        oldUnitMarch = oldREMUnitMarch + oldMTDUnitMarch,
        oldUnitApril = oldREMUnitApril + oldMTDUnitApril,
        oldUnitMay = oldREMUnitMay + oldMTDUnitMay,
        oldUnitJune = oldREMUnitJune + oldMTDUnitJune,
        oldUnitJuly = oldREMUnitJuly + oldMTDUnitJuly,
        oldUnitAugust = oldREMUnitAugust + oldMTDUnitAugust,
        oldUnitSeptember = oldREMUnitSeptember + oldMTDUnitSeptember,
        oldUnitOctober = oldREMUnitOctober + oldMTDUnitOctober,
        oldUnitNovember = oldREMUnitNovember + oldMTDUnitNovember,
        oldUnitDecember = oldREMUnitDecember + oldMTDUnitDecember,
        oldBahtJanuary = oldREMBahtJanuary + oldMTDBahtJanuary,
        oldBahtFebruary = oldREMBahtFebruary + oldMTDBahtFebruary,
        oldBahtMarch = oldREMBahtMarch + oldMTDBahtMarch,
        oldBahtApril = oldREMBahtApril + oldMTDBahtApril,
        oldBahtMay = oldREMBahtMay + oldMTDBahtMay,
        oldBahtJune = oldREMBahtJune + oldMTDBahtJune,
        oldBahtJuly = oldREMBahtJuly + oldMTDBahtJuly,
        oldBahtAugust = oldREMBahtAugust + oldMTDBahtAugust,
        oldBahtSeptember = oldREMBahtSeptember + oldMTDBahtSeptember,
        oldBahtOctober = oldREMBahtOctober + oldMTDBahtOctober,
        oldBahtNovember = oldREMBahtNovember + oldMTDBahtNovember,
        oldBahtDecember = oldREMBahtDecember + oldMTDBahtDecember,
        oldUnitQ1 = oldREMUnitQ1 + oldMTDUnitQ1,
        oldBahtQ1 = oldREMBahtQ1 + oldMTDBahtQ1,
        oldUnitQ2 = oldREMUnitQ2 + oldMTDUnitQ2,
        oldBahtQ2 = oldREMBahtQ2 + oldMTDBahtQ2,
        oldUnitQ3 = oldREMUnitQ3 + oldMTDUnitQ3,
        oldBahtQ3 = oldREMBahtQ3 + oldMTDBahtQ3,
        oldUnitQ4 = oldREMUnitQ4 + oldMTDUnitQ4,
        oldBahtQ4 = oldREMBahtQ4 + oldMTDBahtQ4;

    $('#BahtREM1').html(accounting.formatNumber(currREMBahtJanuary / 1000, 2));
    $('#BahtREM2').html(accounting.formatNumber(currREMBahtFebruary / 1000, 2));
    $('#BahtREM3').html(accounting.formatNumber(currREMBahtMarch / 1000, 2));
    $('#BahtREM4').html(accounting.formatNumber(currREMBahtApril / 1000, 2));
    $('#BahtREM5').html(accounting.formatNumber(currREMBahtMay / 1000, 2));
    $('#BahtREM6').html(accounting.formatNumber(currREMBahtJune / 1000, 2));
    $('#BahtREM7').html(accounting.formatNumber(currREMBahtJuly / 1000, 2));
    $('#BahtREM8').html(accounting.formatNumber(currREMBahtAugust / 1000, 2));
    $('#BahtREM9').html(accounting.formatNumber(currREMBahtSeptember / 1000, 2));
    $('#BahtREM10').html(accounting.formatNumber(currREMBahtOctober / 1000, 2));
    $('#BahtREM11').html(accounting.formatNumber(currREMBahtNovember / 1000, 2));
    $('#BahtREM12').html(accounting.formatNumber(currREMBahtDecember / 1000, 2));
    $('#BahtREMTotal').html(accounting.formatNumber(currREMTotalBaht / 1000, 2));

    $('#BahtMTD1').html(accounting.formatNumber(currMTDBahtJanuary / 1000, 2));
    $('#BahtMTD2').html(accounting.formatNumber(currMTDBahtFebruary / 1000, 2));
    $('#BahtMTD3').html(accounting.formatNumber(currMTDBahtMarch / 1000, 2));
    $('#BahtMTD4').html(accounting.formatNumber(currMTDBahtApril / 1000, 2));
    $('#BahtMTD5').html(accounting.formatNumber(currMTDBahtMay / 1000, 2));
    $('#BahtMTD6').html(accounting.formatNumber(currMTDBahtJune / 1000, 2));
    $('#BahtMTD7').html(accounting.formatNumber(currMTDBahtJuly / 1000, 2));
    $('#BahtMTD8').html(accounting.formatNumber(currMTDBahtAugust / 1000, 2));
    $('#BahtMTD9').html(accounting.formatNumber(currMTDBahtSeptember / 1000, 2));
    $('#BahtMTD10').html(accounting.formatNumber(currMTDBahtOctober / 1000, 2));
    $('#BahtMTD11').html(accounting.formatNumber(currMTDBahtNovember / 1000, 2));
    $('#BahtMTD12').html(accounting.formatNumber(currMTDBahtDecember / 1000, 2));
    $('#BahtMTDTotal').html(accounting.formatNumber(currMTDTotalBaht / 1000, 2));

    $('#Baht1').html(accounting.formatNumber(currBahtJanuary / 1000, 2));
    $('#Baht2').html(accounting.formatNumber(currBahtFebruary / 1000, 2));
    $('#Baht3').html(accounting.formatNumber(currBahtMarch / 1000, 2));
    $('#Baht4').html(accounting.formatNumber(currBahtApril / 1000, 2));
    $('#Baht5').html(accounting.formatNumber(currBahtMay / 1000, 2));
    $('#Baht6').html(accounting.formatNumber(currBahtJune / 1000, 2));
    $('#Baht7').html(accounting.formatNumber(currBahtJuly / 1000, 2));
    $('#Baht8').html(accounting.formatNumber(currBahtAugust / 1000, 2));
    $('#Baht9').html(accounting.formatNumber(currBahtSeptember / 1000, 2));
    $('#Baht10').html(accounting.formatNumber(currBahtOctober / 1000, 2));
    $('#Baht11').html(accounting.formatNumber(currBahtNovember / 1000, 2));
    $('#Baht12').html(accounting.formatNumber(currBahtDecember / 1000, 2));
    $('#BahtTotal').html(accounting.formatNumber(currTotalBaht / 1000, 2));

    $('#BahtActualOld1').html(accounting.formatNumber(oldBahtJanuary / 1000, 2));
    $('#BahtActualOld2').html(accounting.formatNumber(oldBahtFebruary / 1000, 2));
    $('#BahtActualOld3').html(accounting.formatNumber(oldBahtMarch / 1000, 2));
    $('#BahtActualOld4').html(accounting.formatNumber(oldBahtApril / 1000, 2));
    $('#BahtActualOld5').html(accounting.formatNumber(oldBahtMay / 1000, 2));
    $('#BahtActualOld6').html(accounting.formatNumber(oldBahtJune / 1000, 2));
    $('#BahtActualOld7').html(accounting.formatNumber(oldBahtJuly / 1000, 2));
    $('#BahtActualOld8').html(accounting.formatNumber(oldBahtAugust / 1000, 2));
    $('#BahtActualOld9').html(accounting.formatNumber(oldBahtSeptember / 1000, 2));
    $('#BahtActualOld10').html(accounting.formatNumber(oldBahtOctober / 1000, 2));
    $('#BahtActualOld11').html(accounting.formatNumber(oldBahtNovember / 1000, 2));
    $('#BahtActualOld12').html(accounting.formatNumber(oldBahtDecember / 1000, 2));
    $('#BahtActualOldTotal').html(accounting.formatNumber(oldTotalBaht / 1000, 2));

    $('#UnitREM1').html(accounting.formatNumber(currREMUnitJanuary));
    $('#UnitREM2').html(accounting.formatNumber(currREMUnitFebruary));
    $('#UnitREM3').html(accounting.formatNumber(currREMUnitMarch));
    $('#UnitREM4').html(accounting.formatNumber(currREMUnitApril));
    $('#UnitREM5').html(accounting.formatNumber(currREMUnitMay));
    $('#UnitREM6').html(accounting.formatNumber(currREMUnitJune));
    $('#UnitREM7').html(accounting.formatNumber(currREMUnitJuly));
    $('#UnitREM8').html(accounting.formatNumber(currREMUnitAugust));
    $('#UnitREM9').html(accounting.formatNumber(currREMUnitSeptember));
    $('#UnitREM10').html(accounting.formatNumber(currREMUnitOctober));
    $('#UnitREM11').html(accounting.formatNumber(currREMUnitNovember));
    $('#UnitREM12').html(accounting.formatNumber(currREMUnitDecember));
    $('#UnitREMTotal').html(accounting.formatNumber(currREMTotalUnit));

    $('#UnitMTD1').html(accounting.formatNumber(currMTDUnitJanuary));
    $('#UnitMTD2').html(accounting.formatNumber(currMTDUnitFebruary));
    $('#UnitMTD3').html(accounting.formatNumber(currMTDUnitMarch));
    $('#UnitMTD4').html(accounting.formatNumber(currMTDUnitApril));
    $('#UnitMTD5').html(accounting.formatNumber(currMTDUnitMay));
    $('#UnitMTD6').html(accounting.formatNumber(currMTDUnitJune));
    $('#UnitMTD7').html(accounting.formatNumber(currMTDUnitJuly));
    $('#UnitMTD8').html(accounting.formatNumber(currMTDUnitAugust));
    $('#UnitMTD9').html(accounting.formatNumber(currMTDUnitSeptember));
    $('#UnitMTD10').html(accounting.formatNumber(currMTDUnitOctober));
    $('#UnitMTD11').html(accounting.formatNumber(currMTDUnitNovember));
    $('#UnitMTD12').html(accounting.formatNumber(currMTDUnitDecember));
    $('#UnitMTDTotal').html(accounting.formatNumber(currMTDTotalUnit));

    $('#Unit1').html(accounting.formatNumber(currUnitJanuary));
    $('#Unit2').html(accounting.formatNumber(currUnitFebruary));
    $('#Unit3').html(accounting.formatNumber(currUnitMarch));
    $('#Unit4').html(accounting.formatNumber(currUnitApril));
    $('#Unit5').html(accounting.formatNumber(currUnitMay));
    $('#Unit6').html(accounting.formatNumber(currUnitJune));
    $('#Unit7').html(accounting.formatNumber(currUnitJuly));
    $('#Unit8').html(accounting.formatNumber(currUnitAugust));
    $('#Unit9').html(accounting.formatNumber(currUnitSeptember));
    $('#Unit10').html(accounting.formatNumber(currUnitOctober));
    $('#Unit11').html(accounting.formatNumber(currUnitNovember));
    $('#Unit12').html(accounting.formatNumber(currUnitDecember));
    $('#UnitTotal').html(accounting.formatNumber(currTotalUnit));

    $('#UnitActualOld1').html(accounting.formatNumber(oldUnitJanuary));
    $('#UnitActualOld2').html(accounting.formatNumber(oldUnitFebruary));
    $('#UnitActualOld3').html(accounting.formatNumber(oldUnitMarch));
    $('#UnitActualOld4').html(accounting.formatNumber(oldUnitApril));
    $('#UnitActualOld5').html(accounting.formatNumber(oldUnitMay));
    $('#UnitActualOld6').html(accounting.formatNumber(oldUnitJune));
    $('#UnitActualOld7').html(accounting.formatNumber(oldUnitJuly));
    $('#UnitActualOld8').html(accounting.formatNumber(oldUnitAugust));
    $('#UnitActualOld9').html(accounting.formatNumber(oldUnitSeptember));
    $('#UnitActualOld10').html(accounting.formatNumber(oldUnitOctober));
    $('#UnitActualOld11').html(accounting.formatNumber(oldUnitNovember));
    $('#UnitActualOld12').html(accounting.formatNumber(oldUnitDecember));
    $('#UnitActualOldTotal').html(accounting.formatNumber(oldTotalUnit));

    $('#ambBahtREM1').html(accounting.formatNumber(currAMBREMBahtJanuary / 1000, 2));
    $('#ambBahtREM2').html(accounting.formatNumber(currAMBREMBahtFebruary / 1000, 2));
    $('#ambBahtREM3').html(accounting.formatNumber(currAMBREMBahtMarch / 1000, 2));
    $('#ambBahtREM4').html(accounting.formatNumber(currAMBREMBahtApril / 1000, 2));
    $('#ambBahtREM5').html(accounting.formatNumber(currAMBREMBahtMay / 1000, 2));
    $('#ambBahtREM6').html(accounting.formatNumber(currAMBREMBahtJune / 1000, 2));
    $('#ambBahtREM7').html(accounting.formatNumber(currAMBREMBahtJuly / 1000, 2));
    $('#ambBahtREM8').html(accounting.formatNumber(currAMBREMBahtAugust / 1000, 2));
    $('#ambBahtREM9').html(accounting.formatNumber(currAMBREMBahtSeptember / 1000, 2));
    $('#ambBahtREM10').html(accounting.formatNumber(currAMBREMBahtOctober / 1000, 2));
    $('#ambBahtREM11').html(accounting.formatNumber(currAMBREMBahtNovember / 1000, 2));
    $('#ambBahtREM12').html(accounting.formatNumber(currAMBREMBahtDecember / 1000, 2));
    $('#ambBahtREMTotal').html(accounting.formatNumber(currREMAMBTotalBaht / 1000, 2));

    $('#ambBahtMTD1').html(accounting.formatNumber(currAMBMTDBahtJanuary / 1000, 2));
    $('#ambBahtMTD2').html(accounting.formatNumber(currAMBMTDBahtFebruary / 1000, 2));
    $('#ambBahtMTD3').html(accounting.formatNumber(currAMBMTDBahtMarch / 1000, 2));
    $('#ambBahtMTD4').html(accounting.formatNumber(currAMBMTDBahtApril / 1000, 2));
    $('#ambBahtMTD5').html(accounting.formatNumber(currAMBMTDBahtMay / 1000, 2));
    $('#ambBahtMTD6').html(accounting.formatNumber(currAMBMTDBahtJune / 1000, 2));
    $('#ambBahtMTD7').html(accounting.formatNumber(currAMBMTDBahtJuly / 1000, 2));
    $('#ambBahtMTD8').html(accounting.formatNumber(currAMBMTDBahtAugust / 1000, 2));
    $('#ambBahtMTD9').html(accounting.formatNumber(currAMBMTDBahtSeptember / 1000, 2));
    $('#ambBahtMTD10').html(accounting.formatNumber(currAMBMTDBahtOctober / 1000, 2));
    $('#ambBahtMTD11').html(accounting.formatNumber(currAMBMTDBahtNovember / 1000, 2));
    $('#ambBahtMTD12').html(accounting.formatNumber(currAMBMTDBahtDecember / 1000, 2));
    $('#ambBahtMTDTotal').html(accounting.formatNumber(currMTDAMBTotalBaht / 1000, 2));

    $('#ambBaht1').html(accounting.formatNumber(currAMBBahtJanuary / 1000, 2));
    $('#ambBaht2').html(accounting.formatNumber(currAMBBahtFebruary / 1000, 2));
    $('#ambBaht3').html(accounting.formatNumber(currAMBBahtMarch / 1000, 2));
    $('#ambBaht4').html(accounting.formatNumber(currAMBBahtApril / 1000, 2));
    $('#ambBaht5').html(accounting.formatNumber(currAMBBahtMay / 1000, 2));
    $('#ambBaht6').html(accounting.formatNumber(currAMBBahtJune / 1000, 2));
    $('#ambBaht7').html(accounting.formatNumber(currAMBBahtJuly / 1000, 2));
    $('#ambBaht8').html(accounting.formatNumber(currAMBBahtAugust / 1000, 2));
    $('#ambBaht9').html(accounting.formatNumber(currAMBBahtSeptember / 1000, 2));
    $('#ambBaht10').html(accounting.formatNumber(currAMBBahtOctober / 1000, 2));
    $('#ambBaht11').html(accounting.formatNumber(currAMBBahtNovember / 1000, 2));
    $('#ambBaht12').html(accounting.formatNumber(currAMBBahtDecember / 1000, 2));
    $('#ambBahtTotal').html(accounting.formatNumber(currAMBTotalBaht / 1000, 2));

    $('#ambBahtActualOld1').html(accounting.formatNumber(oldAMBBahtJanuary / 1000, 2));
    $('#ambBahtActualOld2').html(accounting.formatNumber(oldAMBBahtFebruary / 1000, 2));
    $('#ambBahtActualOld3').html(accounting.formatNumber(oldAMBBahtMarch / 1000, 2));
    $('#ambBahtActualOld4').html(accounting.formatNumber(oldAMBBahtApril / 1000, 2));
    $('#ambBahtActualOld5').html(accounting.formatNumber(oldAMBBahtMay / 1000, 2));
    $('#ambBahtActualOld6').html(accounting.formatNumber(oldAMBBahtJune / 1000, 2));
    $('#ambBahtActualOld7').html(accounting.formatNumber(oldAMBBahtJuly / 1000, 2));
    $('#ambBahtActualOld8').html(accounting.formatNumber(oldAMBBahtAugust / 1000, 2));
    $('#ambBahtActualOld9').html(accounting.formatNumber(oldAMBBahtSeptember / 1000, 2));
    $('#ambBahtActualOld10').html(accounting.formatNumber(oldAMBBahtOctober / 1000, 2));
    $('#ambBahtActualOld11').html(accounting.formatNumber(oldAMBBahtNovember / 1000, 2));
    $('#ambBahtActualOld12').html(accounting.formatNumber(oldAMBBahtDecember / 1000, 2));
    $('#ambBahtActualOldTotal').html(accounting.formatNumber(oldAMBTotalBaht / 1000, 2));

    $('#ambUnitREM1').html(accounting.formatNumber(currAMBREMUnitJanuary));
    $('#ambUnitREM2').html(accounting.formatNumber(currAMBREMUnitFebruary));
    $('#ambUnitREM3').html(accounting.formatNumber(currAMBREMUnitMarch));
    $('#ambUnitREM4').html(accounting.formatNumber(currAMBREMUnitApril));
    $('#ambUnitREM5').html(accounting.formatNumber(currAMBREMUnitMay));
    $('#ambUnitREM6').html(accounting.formatNumber(currAMBREMUnitJune));
    $('#ambUnitREM7').html(accounting.formatNumber(currAMBREMUnitJuly));
    $('#ambUnitREM8').html(accounting.formatNumber(currAMBREMUnitAugust));
    $('#ambUnitREM9').html(accounting.formatNumber(currAMBREMUnitSeptember));
    $('#ambUnitREM10').html(accounting.formatNumber(currAMBREMUnitOctober));
    $('#ambUnitREM11').html(accounting.formatNumber(currAMBREMUnitNovember));
    $('#ambUnitREM12').html(accounting.formatNumber(currAMBREMUnitDecember));
    $('#ambUnitREMTotal').html(accounting.formatNumber(currREMAMBTotalUnit));

    $('#ambUnitMTD1').html(accounting.formatNumber(currAMBMTDUnitJanuary));
    $('#ambUnitMTD2').html(accounting.formatNumber(currAMBMTDUnitFebruary));
    $('#ambUnitMTD3').html(accounting.formatNumber(currAMBMTDUnitMarch));
    $('#ambUnitMTD4').html(accounting.formatNumber(currAMBMTDUnitApril));
    $('#ambUnitMTD5').html(accounting.formatNumber(currAMBMTDUnitMay));
    $('#ambUnitMTD6').html(accounting.formatNumber(currAMBMTDUnitJune));
    $('#ambUnitMTD7').html(accounting.formatNumber(currAMBMTDUnitJuly));
    $('#ambUnitMTD8').html(accounting.formatNumber(currAMBMTDUnitAugust));
    $('#ambUnitMTD9').html(accounting.formatNumber(currAMBMTDUnitSeptember));
    $('#ambUnitMTD10').html(accounting.formatNumber(currAMBMTDUnitOctober));
    $('#ambUnitMTD11').html(accounting.formatNumber(currAMBMTDUnitNovember));
    $('#ambUnitMTD12').html(accounting.formatNumber(currAMBMTDUnitDecember));
    $('#ambUnitMTDTotal').html(accounting.formatNumber(currMTDAMBTotalUnit));

    $('#ambUnit1').html(accounting.formatNumber(currAMBUnitJanuary));
    $('#ambUnit2').html(accounting.formatNumber(currAMBUnitFebruary));
    $('#ambUnit3').html(accounting.formatNumber(currAMBUnitMarch));
    $('#ambUnit4').html(accounting.formatNumber(currAMBUnitApril));
    $('#ambUnit5').html(accounting.formatNumber(currAMBUnitMay));
    $('#ambUnit6').html(accounting.formatNumber(currAMBUnitJune));
    $('#ambUnit7').html(accounting.formatNumber(currAMBUnitJuly));
    $('#ambUnit8').html(accounting.formatNumber(currAMBUnitAugust));
    $('#ambUnit9').html(accounting.formatNumber(currAMBUnitSeptember));
    $('#ambUnit10').html(accounting.formatNumber(currAMBUnitOctober));
    $('#ambUnit11').html(accounting.formatNumber(currAMBUnitNovember));
    $('#ambUnit12').html(accounting.formatNumber(currAMBUnitDecember));
    $('#ambUnitTotal').html(accounting.formatNumber(currAMBTotalUnit));

    $('#ambUnitActualOld1').html(accounting.formatNumber(oldAMBUnitJanuary));
    $('#ambUnitActualOld2').html(accounting.formatNumber(oldAMBUnitFebruary));
    $('#ambUnitActualOld3').html(accounting.formatNumber(oldAMBUnitMarch));
    $('#ambUnitActualOld4').html(accounting.formatNumber(oldAMBUnitApril));
    $('#ambUnitActualOld5').html(accounting.formatNumber(oldAMBUnitMay));
    $('#ambUnitActualOld6').html(accounting.formatNumber(oldAMBUnitJune));
    $('#ambUnitActualOld7').html(accounting.formatNumber(oldAMBUnitJuly));
    $('#ambUnitActualOld8').html(accounting.formatNumber(oldAMBUnitAugust));
    $('#ambUnitActualOld9').html(accounting.formatNumber(oldAMBUnitSeptember));
    $('#ambUnitActualOld10').html(accounting.formatNumber(oldAMBUnitOctober));
    $('#ambUnitActualOld11').html(accounting.formatNumber(oldAMBUnitNovember));
    $('#ambUnitActualOld12').html(accounting.formatNumber(oldAMBUnitDecember));
    $('#ambUnitActualOldTotal').html(accounting.formatNumber(oldAMBTotalUnit));



    $('#mcbBahtMTD1').html(accounting.formatNumber(currMCBMTDBahtJanuary / 1000, 2));
    $('#mcbBahtMTD2').html(accounting.formatNumber(currMCBMTDBahtFebruary / 1000, 2));
    $('#mcbBahtMTD3').html(accounting.formatNumber(currMCBMTDBahtMarch / 1000, 2));
    $('#mcbBahtMTD4').html(accounting.formatNumber(currMCBMTDBahtApril / 1000, 2));
    $('#mcbBahtMTD5').html(accounting.formatNumber(currMCBMTDBahtMay / 1000, 2));
    $('#mcbBahtMTD6').html(accounting.formatNumber(currMCBMTDBahtJune / 1000, 2));
    $('#mcbBahtMTD7').html(accounting.formatNumber(currMCBMTDBahtJuly / 1000, 2));
    $('#mcbBahtMTD8').html(accounting.formatNumber(currMCBMTDBahtAugust / 1000, 2));
    $('#mcbBahtMTD9').html(accounting.formatNumber(currMCBMTDBahtSeptember / 1000, 2));
    $('#mcbBahtMTD10').html(accounting.formatNumber(currMCBMTDBahtOctober / 1000, 2));
    $('#mcbBahtMTD11').html(accounting.formatNumber(currMCBMTDBahtNovember / 1000, 2));
    $('#mcbBahtMTD12').html(accounting.formatNumber(currMCBMTDBahtDecember / 1000, 2));
    $('#mcbBahtMTDTotal').html(accounting.formatNumber(currMTDMCBTotalBaht / 1000, 2));

    $('#mcbBaht1').html(accounting.formatNumber(currMCBBahtJanuary / 1000, 2));
    $('#mcbBaht2').html(accounting.formatNumber(currMCBBahtFebruary / 1000, 2));
    $('#mcbBaht3').html(accounting.formatNumber(currMCBBahtMarch / 1000, 2));
    $('#mcbBaht4').html(accounting.formatNumber(currMCBBahtApril / 1000, 2));
    $('#mcbBaht5').html(accounting.formatNumber(currMCBBahtMay / 1000, 2));
    $('#mcbBaht6').html(accounting.formatNumber(currMCBBahtJune / 1000, 2));
    $('#mcbBaht7').html(accounting.formatNumber(currMCBBahtJuly / 1000, 2));
    $('#mcbBaht8').html(accounting.formatNumber(currMCBBahtAugust / 1000, 2));
    $('#mcbBaht9').html(accounting.formatNumber(currMCBBahtSeptember / 1000, 2));
    $('#mcbBaht10').html(accounting.formatNumber(currMCBBahtOctober / 1000, 2));
    $('#mcbBaht11').html(accounting.formatNumber(currMCBBahtNovember / 1000, 2));
    $('#mcbBaht12').html(accounting.formatNumber(currMCBBahtDecember / 1000, 2));
    $('#mcbBahtTotal').html(accounting.formatNumber(currMCBTotalBaht / 1000, 2));

    $('#mcbBahtActualOld1').html(accounting.formatNumber(oldMCBBahtJanuary / 1000, 2));
    $('#mcbBahtActualOld2').html(accounting.formatNumber(oldMCBBahtFebruary / 1000, 2));
    $('#mcbBahtActualOld3').html(accounting.formatNumber(oldMCBBahtMarch / 1000, 2));
    $('#mcbBahtActualOld4').html(accounting.formatNumber(oldMCBBahtApril / 1000, 2));
    $('#mcbBahtActualOld5').html(accounting.formatNumber(oldMCBBahtMay / 1000, 2));
    $('#mcbBahtActualOld6').html(accounting.formatNumber(oldMCBBahtJune / 1000, 2));
    $('#mcbBahtActualOld7').html(accounting.formatNumber(oldMCBBahtJuly / 1000, 2));
    $('#mcbBahtActualOld8').html(accounting.formatNumber(oldMCBBahtAugust / 1000, 2));
    $('#mcbBahtActualOld9').html(accounting.formatNumber(oldMCBBahtSeptember / 1000, 2));
    $('#mcbBahtActualOld10').html(accounting.formatNumber(oldMCBBahtOctober / 1000, 2));
    $('#mcbBahtActualOld11').html(accounting.formatNumber(oldMCBBahtNovember / 1000, 2));
    $('#mcbBahtActualOld12').html(accounting.formatNumber(oldMCBBahtDecember / 1000, 2));
    $('#mcbBahtActualOldTotal').html(accounting.formatNumber(oldMCBTotalBaht / 1000, 2));

    $('#mcbUnitMTD1').html(accounting.formatNumber(currMCBMTDUnitJanuary));
    $('#mcbUnitMTD2').html(accounting.formatNumber(currMCBMTDUnitFebruary));
    $('#mcbUnitMTD3').html(accounting.formatNumber(currMCBMTDUnitMarch));
    $('#mcbUnitMTD4').html(accounting.formatNumber(currMCBMTDUnitApril));
    $('#mcbUnitMTD5').html(accounting.formatNumber(currMCBMTDUnitMay));
    $('#mcbUnitMTD6').html(accounting.formatNumber(currMCBMTDUnitJune));
    $('#mcbUnitMTD7').html(accounting.formatNumber(currMCBMTDUnitJuly));
    $('#mcbUnitMTD8').html(accounting.formatNumber(currMCBMTDUnitAugust));
    $('#mcbUnitMTD9').html(accounting.formatNumber(currMCBMTDUnitSeptember));
    $('#mcbUnitMTD10').html(accounting.formatNumber(currMCBMTDUnitOctober));
    $('#mcbUnitMTD11').html(accounting.formatNumber(currMCBMTDUnitNovember));
    $('#mcbUnitMTD12').html(accounting.formatNumber(currMCBMTDUnitDecember));
    $('#mcbUnitMTDTotal').html(accounting.formatNumber(currMTDMCBTotalUnit));

    $('#mcbUnit1').html(accounting.formatNumber(currMCBUnitJanuary));
    $('#mcbUnit2').html(accounting.formatNumber(currMCBUnitFebruary));
    $('#mcbUnit3').html(accounting.formatNumber(currMCBUnitMarch));
    $('#mcbUnit4').html(accounting.formatNumber(currMCBUnitApril));
    $('#mcbUnit5').html(accounting.formatNumber(currMCBUnitMay));
    $('#mcbUnit6').html(accounting.formatNumber(currMCBUnitJune));
    $('#mcbUnit7').html(accounting.formatNumber(currMCBUnitJuly));
    $('#mcbUnit8').html(accounting.formatNumber(currMCBUnitAugust));
    $('#mcbUnit9').html(accounting.formatNumber(currMCBUnitSeptember));
    $('#mcbUnit10').html(accounting.formatNumber(currMCBUnitOctober));
    $('#mcbUnit11').html(accounting.formatNumber(currMCBUnitNovember));
    $('#mcbUnit12').html(accounting.formatNumber(currMCBUnitDecember));
    $('#mcbUnitTotal').html(accounting.formatNumber(currMCBTotalUnit));

    $('#mcbUnitActualOld1').html(accounting.formatNumber(oldMCBUnitJanuary));
    $('#mcbUnitActualOld2').html(accounting.formatNumber(oldMCBUnitFebruary));
    $('#mcbUnitActualOld3').html(accounting.formatNumber(oldMCBUnitMarch));
    $('#mcbUnitActualOld4').html(accounting.formatNumber(oldMCBUnitApril));
    $('#mcbUnitActualOld5').html(accounting.formatNumber(oldMCBUnitMay));
    $('#mcbUnitActualOld6').html(accounting.formatNumber(oldMCBUnitJune));
    $('#mcbUnitActualOld7').html(accounting.formatNumber(oldMCBUnitJuly));
    $('#mcbUnitActualOld8').html(accounting.formatNumber(oldMCBUnitAugust));
    $('#mcbUnitActualOld9').html(accounting.formatNumber(oldMCBUnitSeptember));
    $('#mcbUnitActualOld10').html(accounting.formatNumber(oldMCBUnitOctober));
    $('#mcbUnitActualOld11').html(accounting.formatNumber(oldMCBUnitNovember));
    $('#mcbUnitActualOld12').html(accounting.formatNumber(oldMCBUnitDecember));
    $('#mcbUnitActualOldTotal').html(accounting.formatNumber(oldMCBTotalUnit));

    var totalBahtTarget = totalREMBahtTarget + totalMTDBahtTarget;
    $('#targetBaht').html(accounting.formatNumber(totalBahtTarget));
    var totalUnitTarget = totalREMUnitTarget + totalMTDUnitTarget;
    $('#targetUnit').html(accounting.formatNumber(totalUnitTarget));

    $('#totalBaht').text(accounting.formatNumber(currTotalBaht));
    $('#totalUnit').text(accounting.formatNumber(currTotalUnit));
    var percenTotalBaht = (currTotalBaht / totalBahtTarget) * 100;
    var percenTotalUnit = (currTotalUnit / totalUnitTarget) * 100;
    $('#graphBaht').attr("data-transitiongoal", accounting.formatNumber(percenTotalBaht)).progressbar();
    $('#graphUnit').attr("data-transitiongoal", accounting.formatNumber(percenTotalUnit)).progressbar();

    tableProduct(type = "REM", topREMProduct);
    tableCustomer(type = "REM", topREMCustomer);
    tableProduct(type = "MTD", topMTDProduct);
    tableCustomer(type = "MTD", topMTDCustomer);

    if (percenTotalBaht >= 0 && percenTotalBaht <= 5) {
        $('#graphBaht').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("five");

    } else if (percenTotalBaht > 5 && percenTotalBaht <= 25) {

        $('#graphBaht').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("twentyfive");

    } else if (percenTotalBaht > 25 && percenTotalBaht <= 50) {

        $('#graphBaht').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("fifty");

    } else if (percenTotalBaht > 50 && percenTotalBaht <= 75) {

        $('#graphBaht').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("seventyfive");

    } else {

        $('#graphBaht').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("onehundred");

    }

    if (percenTotalUnit >= 0 && percenTotalUnit <= 5) {

        $('#graphUnit').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("five");

    } else if (percenTotalUnit > 5 && percenTotalUnit <= 25) {

        $('#graphUnit').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("twentyfive");

    } else if (percenTotalUnit > 25 && percenTotalUnit <= 50) {

        $('#graphUnit').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("fifty");

    } else if (percenTotalUnit > 50 && percenTotalUnit <= 75) {

        $('#graphUnit').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("seventyfive");

    } else {

        $('#graphUnit').removeClass("progress-bar-info five twentyfive fifty seventyfive onehundred").addClass("onehundred");

    }

    var achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget,
        growthBahtTotal = ((currTotalBaht - oldTotalBaht) * 100) / oldTotalBaht,
        achieveBahtJanuary = (currBahtJanuary * 100) / (accounting.unformat(targetREMAMB.Amt01) + targetMTDAmt01),
        achieveBahtFebruary = (currBahtFebruary * 100) / (accounting.unformat(targetREMAMB.Amt02) + targetMTDAmt02),
        achieveBahtMarch = (currBahtMarch * 100) / (accounting.unformat(targetREMAMB.Amt03) + targetMTDAmt03),
        achieveBahtApril = (currBahtApril * 100) / (accounting.unformat(targetREMAMB.Amt04) + targetMTDAmt04),
        achieveBahtMay = (currBahtMay * 100) / (accounting.unformat(targetREMAMB.Amt05) + targetMTDAmt05),
        achieveBahtJune = (currBahtJune * 100) / (accounting.unformat(targetREMAMB.Amt06) + targetMTDAmt06),
        achieveBahtJuly = (currBahtJuly * 100) / (accounting.unformat(targetREMAMB.Amt07) + targetMTDAmt07),
        achieveBahtAugust = (currBahtAugust * 100) / (accounting.unformat(targetREMAMB.Amt08) + targetMTDAmt08),
        achieveBahtSeptember = (currBahtSeptember * 100) / (accounting.unformat(targetREMAMB.Amt09) + targetMTDAmt09),
        achieveBahtOctober = (currBahtOctober * 100) / (accounting.unformat(targetREMAMB.Amt10) + targetMTDAmt10),
        achieveBahtNovember = (currBahtNovember * 100) / (accounting.unformat(targetREMAMB.Amt11) + targetMTDAmt11),
        achieveBahtDecember = (currBahtDecember * 100) / (accounting.unformat(targetREMAMB.Amt12) + targetMTDAmt12),
        achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget,
        achieveUnitJanuary = (currUnitJanuary * 100) / (accounting.unformat(targetREMAMB.Unit01) + targetMTDUnit01),
        achieveUnitFebruary = (currUnitFebruary * 100) / (accounting.unformat(targetREMAMB.Unit02) + targetMTDUnit02),
        achieveUnitMarch = (currUnitMarch * 100) / (accounting.unformat(targetREMAMB.Unit03) + targetMTDUnit03),
        achieveUnitApril = (currUnitApril * 100) / (accounting.unformat(targetREMAMB.Unit04) + targetMTDUnit04),
        achieveUnitMay = (currUnitMay * 100) / (accounting.unformat(targetREMAMB.Unit05) + targetMTDUnit05),
        achieveUnitJune = (currUnitJune * 100) / (accounting.unformat(targetREMAMB.Unit06) + targetMTDUnit06),
        achieveUnitJuly = (currUnitJuly * 100) / (accounting.unformat(targetREMAMB.Unit07) + targetMTDUnit07),
        achieveUnitAugust = (currUnitAugust * 100) / (accounting.unformat(targetREMAMB.Unit08) + targetMTDUnit08),
        achieveUnitSeptember = (currUnitSeptember * 100) / (accounting.unformat(targetREMAMB.Unit09) + targetMTDUnit09),
        achieveUnitOctober = (currUnitOctober * 100) / (accounting.unformat(targetREMAMB.Unit10) + targetMTDUnit10),
        achieveUnitNovember = (currUnitNovember * 100) / (accounting.unformat(targetREMAMB.Unit11) + targetMTDUnit11),
        achieveUnitDecember = (currUnitDecember * 100) / (accounting.unformat(targetREMAMB.Unit12) + targetMTDUnit12),
        achieveUnitTotal = (currTotalUnit * 100) / totalUnitTarget,

        achieveAMBBahtJanuary = (currAMBBahtJanuary * 100) / targetAMBBahtJanuary,
        achieveAMBBahtFebruary = (currAMBBahtFebruary * 100) / targetAMBBahtFebruary,
        achieveAMBBahtMarch = (currAMBBahtMarch * 100) / targetAMBBahtMarch,
        achieveAMBBahtApril = (currAMBBahtApril * 100) / targetAMBBahtApril,
        achieveAMBBahtMay = (currAMBBahtMay * 100) / targetAMBBahtMay,
        achieveAMBBahtJune = (currAMBBahtJune * 100) / targetAMBBahtJune,
        achieveAMBBahtJuly = (currAMBBahtJuly * 100) / targetAMBBahtJuly,
        achieveAMBBahtAugust = (currAMBBahtAugust * 100) / targetAMBBahtAugust,
        achieveAMBBahtSeptember = (currAMBBahtSeptember * 100) / targetAMBBahtSeptember,
        achieveAMBBahtOctober = (currAMBBahtOctober * 100) / targetAMBBahtOctober,
        achieveAMBBahtNovember = (currAMBBahtNovember * 100) / targetAMBBahtNovember,
        achieveAMBBahtDecember = (currAMBBahtDecember * 100) / targetAMBBahtDecember,
        achieveAMBBahtTotal = (currAMBTotalBaht * 100) / targetAMBBahtTotal,
        achieveAMBUnitJanuary = (currAMBUnitJanuary * 100) / targetAMBUnitJanuary,
        achieveAMBUnitFebruary = (currAMBUnitFebruary * 100) / targetAMBUnitFebruary,
        achieveAMBUnitMarch = (currAMBUnitMarch * 100) / targetAMBUnitMarch,
        achieveAMBUnitApril = (currAMBUnitApril * 100) / targetAMBUnitApril,
        achieveAMBUnitMay = (currAMBUnitMay * 100) / targetAMBUnitMay,
        achieveAMBUnitJune = (currAMBUnitJune * 100) / targetAMBUnitJune,
        achieveAMBUnitJuly = (currAMBUnitJuly * 100) / targetAMBUnitJuly,
        achieveAMBUnitAugust = (currAMBUnitAugust * 100) / targetAMBUnitAugust,
        achieveAMBUnitSeptember = (currAMBUnitSeptember * 100) / targetAMBUnitSeptember,
        achieveAMBUnitOctober = (currAMBUnitOctober * 100) / targetAMBUnitOctober,
        achieveAMBUnitNovember = (currAMBUnitNovember * 100) / targetAMBUnitNovember,
        achieveAMBUnitDecember = (currAMBUnitDecember * 100) / targetAMBUnitDecember,
        achieveAMBUnitTotal = (currAMBTotalUnit * 100) / targetAMBUnitTotal,

        achieveMCBBahtJanuary = (currMCBBahtJanuary * 100) / targetMCBBahtJanuary,
        achieveMCBBahtFebruary = (currMCBBahtFebruary * 100) / targetMCBBahtFebruary,
        achieveMCBBahtMarch = (currMCBBahtMarch * 100) / targetMCBBahtMarch,
        achieveMCBBahtApril = (currMCBBahtApril * 100) / targetMCBBahtApril,
        achieveMCBBahtMay = (currMCBBahtMay * 100) / targetMCBBahtMay,
        achieveMCBBahtJune = (currMCBBahtJune * 100) / targetMCBBahtJune,
        achieveMCBBahtJuly = (currMCBBahtJuly * 100) / targetMCBBahtJuly,
        achieveMCBBahtAugust = (currMCBBahtAugust * 100) / targetMCBBahtAugust,
        achieveMCBBahtSeptember = (currMCBBahtSeptember * 100) / targetMCBBahtSeptember,
        achieveMCBBahtOctober = (currMCBBahtOctober * 100) / targetMCBBahtOctober,
        achieveMCBBahtNovember = (currMCBBahtNovember * 100) / targetMCBBahtNovember,
        achieveMCBBahtDecember = (currMCBBahtDecember * 100) / targetMCBBahtDecember,
        achieveMCBBahtTotal = (currMCBTotalBaht * 100) / targetMCBBahtTotal,
        achieveMCBUnitJanuary = (currMCBUnitJanuary * 100) / targetMCBUnitJanuary,
        achieveMCBUnitFebruary = (currMCBUnitFebruary * 100) / targetMCBUnitFebruary,
        achieveMCBUnitMarch = (currMCBUnitMarch * 100) / targetMCBUnitMarch,
        achieveMCBUnitApril = (currMCBUnitApril * 100) / targetMCBUnitApril,
        achieveMCBUnitMay = (currMCBUnitMay * 100) / targetMCBUnitMay,
        achieveMCBUnitJune = (currMCBUnitJune * 100) / targetMCBUnitJune,
        achieveMCBUnitJuly = (currMCBUnitJuly * 100) / targetMCBUnitJuly,
        achieveMCBUnitAugust = (currMCBUnitAugust * 100) / targetMCBUnitAugust,
        achieveMCBUnitSeptember = (currMCBUnitSeptember * 100) / targetMCBUnitSeptember,
        achieveMCBUnitOctober = (currMCBUnitOctober * 100) / targetMCBUnitOctober,
        achieveMCBUnitNovember = (currMCBUnitNovember * 100) / targetMCBUnitNovember,
        achieveMCBUnitDecember = (currMCBUnitDecember * 100) / targetMCBUnitDecember,
        achieveMCBUnitTotal = (currMCBTotalUnit * 100) / targetMCBUnitTotal,

        growthBahtJanuary = ((currBahtJanuary - oldBahtJanuary) * 100) / oldBahtJanuary,
        growthBahtFebruary = ((currBahtFebruary - oldBahtFebruary) * 100) / oldBahtFebruary,
        growthBahtMarch = ((currBahtMarch - oldBahtMarch) * 100) / oldBahtMarch,
        growthBahtApril = ((currBahtApril - oldBahtApril) * 100) / oldBahtApril,
        growthBahtMay = ((currBahtMay - oldBahtMay) * 100) / oldBahtMay,
        growthBahtJune = ((currBahtJune - oldBahtJune) * 100) / oldBahtJune,
        growthBahtJuly = ((currBahtJuly - oldBahtJuly) * 100) / oldBahtJuly,
        growthBahtAugust = ((currBahtAugust - oldBahtAugust) * 100) / oldBahtAugust,
        growthBahtSeptember = ((currBahtSeptember - oldBahtSeptember) * 100) / oldBahtSeptember,
        growthBahtOctober = ((currBahtOctober - oldBahtOctober) * 100) / oldBahtOctober,
        growthBahtNovember = ((currBahtNovember - oldBahtNovember) * 100) / oldBahtNovember,
        growthBahtDecember = ((currBahtDecember - oldBahtDecember) * 100) / oldBahtDecember,
        growthBahtTotal = ((currTotalBaht - oldTotalBaht) * 100) / oldTotalBaht,
        growthUnitJanuary = ((currUnitJanuary - oldUnitJanuary) * 100) / oldUnitJanuary,
        growthUnitFebruary = ((currUnitFebruary - oldUnitFebruary) * 100) / oldUnitFebruary,
        growthUnitMarch = ((currUnitMarch - oldUnitMarch) * 100) / oldUnitMarch,
        growthUnitApril = ((currUnitApril - oldUnitApril) * 100) / oldUnitApril,
        growthUnitMay = ((currUnitMay - oldUnitMay) * 100) / oldUnitMay,
        growthUnitJune = ((currUnitJune - oldUnitJune) * 100) / oldUnitJune,
        growthUnitJuly = ((currUnitJuly - oldUnitJuly) * 100) / oldUnitJuly,
        growthUnitAugust = ((currUnitAugust - oldUnitAugust) * 100) / oldUnitAugust,
        growthUnitSeptember = ((currUnitSeptember - oldUnitSeptember) * 100) / oldUnitSeptember,
        growthUnitOctober = ((currUnitOctober - oldUnitOctober) * 100) / oldUnitOctober,
        growthUnitNovember = ((currUnitNovember - oldUnitNovember) * 100) / oldUnitNovember,
        growthUnitDecember = ((currUnitDecember - oldUnitDecember) * 100) / oldUnitDecember,
        growthUnitTotal = ((currTotalUnit - oldTotalUnit) * 100) / oldTotalUnit,

        growthAMBBahtJanuary = ((currAMBBahtJanuary - oldAMBBahtJanuary) * 100) / oldAMBBahtJanuary,
        growthAMBBahtFebruary = ((currAMBBahtFebruary - oldAMBBahtFebruary) * 100) / oldAMBBahtFebruary,
        growthAMBBahtMarch = ((currAMBBahtMarch - oldAMBBahtMarch) * 100) / oldAMBBahtMarch,
        growthAMBBahtApril = ((currAMBBahtApril - oldAMBBahtApril) * 100) / oldAMBBahtApril,
        growthAMBBahtMay = ((currAMBBahtMay - oldAMBBahtMay) * 100) / oldAMBBahtMay,
        growthAMBBahtJune = ((currAMBBahtJune - oldAMBBahtJune) * 100) / oldAMBBahtJune,
        growthAMBBahtJuly = ((currAMBBahtJuly - oldAMBBahtJuly) * 100) / oldAMBBahtJuly,
        growthAMBBahtAugust = ((currAMBBahtAugust - oldAMBBahtAugust) * 100) / oldAMBBahtAugust,
        growthAMBBahtSeptember = ((currAMBBahtSeptember - oldAMBBahtSeptember) * 100) / oldAMBBahtSeptember,
        growthAMBBahtOctober = ((currAMBBahtOctober - oldAMBBahtOctober) * 100) / oldAMBBahtOctober,
        growthAMBBahtNovember = ((currAMBBahtNovember - oldAMBBahtNovember) * 100) / oldAMBBahtNovember,
        growthAMBBahtDecember = ((currAMBBahtDecember - oldAMBBahtDecember) * 100) / oldAMBBahtDecember,
        growthAMBBahtTotal = ((currAMBTotalBaht - oldAMBTotalBaht) * 100) / oldAMBTotalBaht,
        growthAMBUnitJanuary = ((currAMBUnitJanuary - oldAMBUnitJanuary) * 100) / oldAMBUnitJanuary,
        growthAMBUnitFebruary = ((currAMBUnitFebruary - oldAMBUnitFebruary) * 100) / oldAMBUnitFebruary,
        growthAMBUnitMarch = ((currAMBUnitMarch - oldAMBUnitMarch) * 100) / oldAMBUnitMarch,
        growthAMBUnitApril = ((currAMBUnitApril - oldAMBUnitApril) * 100) / oldAMBUnitApril,
        growthAMBUnitMay = ((currAMBUnitMay - oldAMBUnitMay) * 100) / oldAMBUnitMay,
        growthAMBUnitJune = ((currAMBUnitJune - oldAMBUnitJune) * 100) / oldAMBUnitJune,
        growthAMBUnitJuly = ((currAMBUnitJuly - oldAMBUnitJuly) * 100) / oldAMBUnitJuly,
        growthAMBUnitAugust = ((currAMBUnitAugust - oldAMBUnitAugust) * 100) / oldAMBUnitAugust,
        growthAMBUnitSeptember = ((currAMBUnitSeptember - oldAMBUnitSeptember) * 100) / oldAMBUnitSeptember,
        growthAMBUnitOctober = ((currAMBUnitOctober - oldAMBUnitOctober) * 100) / oldAMBUnitOctober,
        growthAMBUnitNovember = ((currAMBUnitNovember - oldAMBUnitNovember) * 100) / oldAMBUnitNovember,
        growthAMBUnitDecember = ((currAMBUnitDecember - oldAMBUnitDecember) * 100) / oldAMBUnitDecember,
        growthAMBUnitTotal = ((currAMBTotalUnit - oldAMBTotalUnit) * 100) / oldAMBTotalUnit;

    growthMCBBahtJanuary = ((currMCBBahtJanuary - oldMCBBahtJanuary) * 100) / oldMCBBahtJanuary,
        growthMCBBahtFebruary = ((currMCBBahtFebruary - oldMCBBahtFebruary) * 100) / oldMCBBahtFebruary,
        growthMCBBahtMarch = ((currMCBBahtMarch - oldMCBBahtMarch) * 100) / oldMCBBahtMarch,
        growthMCBBahtApril = ((currMCBBahtApril - oldMCBBahtApril) * 100) / oldMCBBahtApril,
        growthMCBBahtMay = ((currMCBBahtMay - oldMCBBahtMay) * 100) / oldMCBBahtMay,
        growthMCBBahtJune = ((currMCBBahtJune - oldMCBBahtJune) * 100) / oldMCBBahtJune,
        growthMCBBahtJuly = ((currMCBBahtJuly - oldMCBBahtJuly) * 100) / oldMCBBahtJuly,
        growthMCBBahtAugust = ((currMCBBahtAugust - oldMCBBahtAugust) * 100) / oldMCBBahtAugust,
        growthMCBBahtSeptember = ((currMCBBahtSeptember - oldMCBBahtSeptember) * 100) / oldMCBBahtSeptember,
        growthMCBBahtOctober = ((currMCBBahtOctober - oldMCBBahtOctober) * 100) / oldMCBBahtOctober,
        growthMCBBahtNovember = ((currMCBBahtNovember - oldMCBBahtNovember) * 100) / oldMCBBahtNovember,
        growthMCBBahtDecember = ((currMCBBahtDecember - oldMCBBahtDecember) * 100) / oldMCBBahtDecember,
        growthMCBBahtTotal = ((currMCBTotalBaht - oldMCBTotalBaht) * 100) / oldMCBTotalBaht,
        growthMCBUnitJanuary = ((currMCBUnitJanuary - oldMCBUnitJanuary) * 100) / oldMCBUnitJanuary,
        growthMCBUnitFebruary = ((currMCBUnitFebruary - oldMCBUnitFebruary) * 100) / oldMCBUnitFebruary,
        growthMCBUnitMarch = ((currMCBUnitMarch - oldMCBUnitMarch) * 100) / oldMCBUnitMarch,
        growthMCBUnitApril = ((currMCBUnitApril - oldMCBUnitApril) * 100) / oldMCBUnitApril,
        growthMCBUnitMay = ((currMCBUnitMay - oldMCBUnitMay) * 100) / oldMCBUnitMay,
        growthMCBUnitJune = ((currMCBUnitJune - oldMCBUnitJune) * 100) / oldMCBUnitJune,
        growthMCBUnitJuly = ((currMCBUnitJuly - oldMCBUnitJuly) * 100) / oldMCBUnitJuly,
        growthMCBUnitAugust = ((currMCBUnitAugust - oldMCBUnitAugust) * 100) / oldMCBUnitAugust,
        growthMCBUnitSeptember = ((currMCBUnitSeptember - oldMCBUnitSeptember) * 100) / oldMCBUnitSeptember,
        growthMCBUnitOctober = ((currMCBUnitOctober - oldMCBUnitOctober) * 100) / oldMCBUnitOctober,
        growthMCBUnitNovember = ((currMCBUnitNovember - oldMCBUnitNovember) * 100) / oldMCBUnitNovember,
        growthMCBUnitDecember = ((currMCBUnitDecember - oldMCBUnitDecember) * 100) / oldMCBUnitDecember,
        growthMCBUnitTotal = ((currMCBTotalUnit - oldMCBTotalUnit) * 100) / oldMCBTotalUnit;


    $('#BahtTarget1').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt01) + targetMTDAmt01) / 1000, 2));
    $('#BahtTarget2').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt02) + targetMTDAmt02) / 1000, 2));
    $('#BahtTarget3').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt03) + targetMTDAmt03) / 1000, 2));
    $('#BahtTarget4').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt04) + targetMTDAmt04) / 1000, 2));
    $('#BahtTarget5').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt05) + targetMTDAmt05) / 1000, 2));
    $('#BahtTarget6').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt06) + targetMTDAmt06) / 1000, 2));
    $('#BahtTarget7').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt07) + targetMTDAmt07) / 1000, 2));
    $('#BahtTarget8').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt08) + targetMTDAmt08) / 1000, 2));
    $('#BahtTarget9').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt09) + targetMTDAmt09) / 1000, 2));
    $('#BahtTarget10').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt10) + targetMTDAmt10) / 1000, 2));
    $('#BahtTarget11').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt11) + targetMTDAmt11) / 1000, 2));
    $('#BahtTarget12').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt12) + targetMTDAmt12) / 1000, 2));
    $('#BahtTargetTotal').html(accounting.formatNumber(totalBahtTarget / 1000, 2));

    $('#ambBahtTarget1').html(accounting.formatNumber(targetAMBBahtJanuary / 1000, 2));
    $('#ambBahtTarget2').html(accounting.formatNumber(targetAMBBahtFebruary / 1000, 2));
    $('#ambBahtTarget3').html(accounting.formatNumber(targetAMBBahtMarch / 1000, 2));
    $('#ambBahtTarget4').html(accounting.formatNumber(targetAMBBahtApril / 1000, 2));
    $('#ambBahtTarget5').html(accounting.formatNumber(targetAMBBahtMay / 1000, 2));
    $('#ambBahtTarget6').html(accounting.formatNumber(targetAMBBahtJune / 1000, 2));
    $('#ambBahtTarget7').html(accounting.formatNumber(targetAMBBahtJuly / 1000, 2));
    $('#ambBahtTarget8').html(accounting.formatNumber(targetAMBBahtAugust / 1000, 2));
    $('#ambBahtTarget9').html(accounting.formatNumber(targetAMBBahtSeptember / 1000, 2));
    $('#ambBahtTarget10').html(accounting.formatNumber(targetAMBBahtOctober / 1000, 2));
    $('#ambBahtTarget11').html(accounting.formatNumber(targetAMBBahtNovember / 1000, 2));
    $('#ambBahtTarget12').html(accounting.formatNumber(targetAMBBahtDecember / 1000, 2));
    $('#ambBahtTargetTotal').html(accounting.formatNumber(targetAMBBahtTotal / 1000, 2));

    $('#BahtAchieve1').html((isNaN(accounting.formatNumber(achieveBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJanuary, 2)) + "%");
    $('#BahtAchieve2').html((isNaN(accounting.formatNumber(achieveBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtFebruary, 2)) + "%");
    $('#BahtAchieve3').html((isNaN(accounting.formatNumber(achieveBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtMarch, 2)) + "%");
    $('#BahtAchieve4').html((isNaN(accounting.formatNumber(achieveBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtApril, 2)) + "%");
    $('#BahtAchieve5').html((isNaN(accounting.formatNumber(achieveBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtMay, 2)) + "%");
    $('#BahtAchieve6').html((isNaN(accounting.formatNumber(achieveBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJune, 2)) + "%");
    $('#BahtAchieve7').html((isNaN(accounting.formatNumber(achieveBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJuly, 2)) + "%");
    $('#BahtAchieve8').html((isNaN(accounting.formatNumber(achieveBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtAugust, 2)) + "%");
    $('#BahtAchieve9').html((isNaN(accounting.formatNumber(achieveBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtSeptember, 2)) + "%");
    $('#BahtAchieve10').html((isNaN(accounting.formatNumber(achieveBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtOctober, 2)) + "%");
    $('#BahtAchieve11').html((isNaN(accounting.formatNumber(achieveBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtNovember, 2)) + "%");
    $('#BahtAchieve12').html((isNaN(accounting.formatNumber(achieveBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtDecember, 2)) + "%");
    $('#BahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtTotal, 2)) + "%");

    $('#ambBahtAchieve1').html((isNaN(accounting.formatNumber(achieveAMBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtJanuary, 2)) + "%");
    $('#ambBahtAchieve2').html((isNaN(accounting.formatNumber(achieveAMBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtFebruary, 2)) + "%");
    $('#ambBahtAchieve3').html((isNaN(accounting.formatNumber(achieveAMBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtMarch, 2)) + "%");
    $('#ambBahtAchieve4').html((isNaN(accounting.formatNumber(achieveAMBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtApril, 2)) + "%");
    $('#ambBahtAchieve5').html((isNaN(accounting.formatNumber(achieveAMBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtMay, 2)) + "%");
    $('#ambBahtAchieve6').html((isNaN(accounting.formatNumber(achieveAMBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtJune, 2)) + "%");
    $('#ambBahtAchieve7').html((isNaN(accounting.formatNumber(achieveAMBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtJuly, 2)) + "%");
    $('#ambBahtAchieve8').html((isNaN(accounting.formatNumber(achieveAMBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtAugust, 2)) + "%");
    $('#ambBahtAchieve9').html((isNaN(accounting.formatNumber(achieveAMBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtSeptember, 2)) + "%");
    $('#ambBahtAchieve10').html((isNaN(accounting.formatNumber(achieveAMBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtOctober, 2)) + "%");
    $('#ambBahtAchieve11').html((isNaN(accounting.formatNumber(achieveAMBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtNovember, 2)) + "%");
    $('#ambBahtAchieve12').html((isNaN(accounting.formatNumber(achieveAMBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtDecember, 2)) + "%");
    $('#ambBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveAMBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtTotal, 2)) + "%");

    $('#BahtGrowth1').html((isNaN(accounting.formatNumber(growthBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJanuary, 2)) + "%");
    $('#BahtGrowth2').html((isNaN(accounting.formatNumber(growthBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtFebruary, 2)) + "%");
    $('#BahtGrowth3').html((isNaN(accounting.formatNumber(growthBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtMarch, 2)) + "%");
    $('#BahtGrowth4').html((isNaN(accounting.formatNumber(growthBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtApril, 2)) + "%");
    $('#BahtGrowth5').html((isNaN(accounting.formatNumber(growthBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtMay, 2)) + "%");
    $('#BahtGrowth6').html((isNaN(accounting.formatNumber(growthBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJune, 2)) + "%");
    $('#BahtGrowth7').html((isNaN(accounting.formatNumber(growthBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJuly, 2)) + "%");
    $('#BahtGrowth8').html((isNaN(accounting.formatNumber(growthBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtAugust, 2)) + "%");
    $('#BahtGrowth9').html((isNaN(accounting.formatNumber(growthBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtSeptember, 2)) + "%");
    $('#BahtGrowth10').html((isNaN(accounting.formatNumber(growthBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtOctober, 2)) + "%");
    $('#BahtGrowth11').html((isNaN(accounting.formatNumber(growthBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtNovember, 2)) + "%");
    $('#BahtGrowth12').html((isNaN(accounting.formatNumber(growthBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtDecember, 2)) + "%");
    $('#BahtGrowthTotal').html((isNaN(accounting.formatNumber(growthBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtTotal, 2)) + "%");

    $('#ambBahtGrowth1').html((isNaN(accounting.formatNumber(growthAMBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtJanuary, 2)) + "%");
    $('#ambBahtGrowth2').html((isNaN(accounting.formatNumber(growthAMBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtFebruary, 2)) + "%");
    $('#ambBahtGrowth3').html((isNaN(accounting.formatNumber(growthAMBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtMarch, 2)) + "%");
    $('#ambBahtGrowth4').html((isNaN(accounting.formatNumber(growthAMBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtApril, 2)) + "%");
    $('#ambBahtGrowth5').html((isNaN(accounting.formatNumber(growthAMBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtMay, 2)) + "%");
    $('#ambBahtGrowth6').html((isNaN(accounting.formatNumber(growthAMBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtJune, 2)) + "%");
    $('#ambBahtGrowth7').html((isNaN(accounting.formatNumber(growthAMBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtJuly, 2)) + "%");
    $('#ambBahtGrowth8').html((isNaN(accounting.formatNumber(growthAMBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtAugust, 2)) + "%");
    $('#ambBahtGrowth9').html((isNaN(accounting.formatNumber(growthAMBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtSeptember, 2)) + "%");
    $('#ambBahtGrowth10').html((isNaN(accounting.formatNumber(growthAMBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtOctober, 2)) + "%");
    $('#ambBahtGrowth11').html((isNaN(accounting.formatNumber(growthAMBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtNovember, 2)) + "%");
    $('#ambBahtGrowth12').html((isNaN(accounting.formatNumber(growthAMBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtDecember, 2)) + "%");
    $('#ambBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthAMBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtTotal, 2)) + "%");

    $('#UnitTarget1').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt01) + targetMTDAmt01)));
    $('#UnitTarget2').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt02) + targetMTDAmt02)));
    $('#UnitTarget3').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt03) + targetMTDAmt03)));
    $('#UnitTarget4').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt04) + targetMTDAmt04)));
    $('#UnitTarget5').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt05) + targetMTDAmt05)));
    $('#UnitTarget6').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt06) + targetMTDAmt06)));
    $('#UnitTarget7').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt07) + targetMTDAmt07)));
    $('#UnitTarget8').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt08) + targetMTDAmt08)));
    $('#UnitTarget9').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt09) + targetMTDAmt09)));
    $('#UnitTarget10').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt10) + targetMTDAmt10)));
    $('#UnitTarget11').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt11) + targetMTDAmt11)));
    $('#UnitTarget12').html(accounting.formatNumber((accounting.unformat(targetREMAMB.Amt12) + targetMTDAmt12)));
    $('#UnitTargetTotal').html(accounting.formatNumber(totalUnitTarget));

    $('#ambUnitTarget1').html(accounting.formatNumber(targetAMBUnitJanuary));
    $('#ambUnitTarget2').html(accounting.formatNumber(targetAMBUnitFebruary));
    $('#ambUnitTarget3').html(accounting.formatNumber(targetAMBUnitMarch));
    $('#ambUnitTarget4').html(accounting.formatNumber(targetAMBUnitApril));
    $('#ambUnitTarget5').html(accounting.formatNumber(targetAMBUnitMay));
    $('#ambUnitTarget6').html(accounting.formatNumber(targetAMBUnitJune));
    $('#ambUnitTarget7').html(accounting.formatNumber(targetAMBUnitJuly));
    $('#ambUnitTarget8').html(accounting.formatNumber(targetAMBUnitAugust));
    $('#ambUnitTarget9').html(accounting.formatNumber(targetAMBUnitSeptember));
    $('#ambUnitTarget10').html(accounting.formatNumber(targetAMBUnitOctober));
    $('#ambUnitTarget11').html(accounting.formatNumber(targetAMBUnitNovember));
    $('#ambUnitTarget12').html(accounting.formatNumber(targetAMBUnitDecember));
    $('#ambUnitTargetTotal').html(accounting.formatNumber(targetAMBUnitTotal));

    $('#UnitAchieve1').html((isNaN(accounting.formatNumber(achieveUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJanuary, 2)) + "%");
    $('#UnitAchieve2').html((isNaN(accounting.formatNumber(achieveUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitFebruary, 2)) + "%");
    $('#UnitAchieve3').html((isNaN(accounting.formatNumber(achieveUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitMarch, 2)) + "%");
    $('#UnitAchieve4').html((isNaN(accounting.formatNumber(achieveUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitApril, 2)) + "%");
    $('#UnitAchieve5').html((isNaN(accounting.formatNumber(achieveUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitMay, 2)) + "%");
    $('#UnitAchieve6').html((isNaN(accounting.formatNumber(achieveUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJune, 2)) + "%");
    $('#UnitAchieve7').html((isNaN(accounting.formatNumber(achieveUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJuly, 2)) + "%");
    $('#UnitAchieve8').html((isNaN(accounting.formatNumber(achieveUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitAugust, 2)) + "%");
    $('#UnitAchieve9').html((isNaN(accounting.formatNumber(achieveUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitSeptember, 2)) + "%");
    $('#UnitAchieve10').html((isNaN(accounting.formatNumber(achieveUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitOctober, 2)) + "%");
    $('#UnitAchieve11').html((isNaN(accounting.formatNumber(achieveUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitNovember, 2)) + "%");
    $('#UnitAchieve12').html((isNaN(accounting.formatNumber(achieveUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitDecember, 2)) + "%");
    $('#UnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitTotal, 2)) + "%");

    $('#ambUnitAchieve1').html((isNaN(accounting.formatNumber(achieveAMBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitJanuary, 2)) + "%");
    $('#ambUnitAchieve2').html((isNaN(accounting.formatNumber(achieveAMBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitFebruary, 2)) + "%");
    $('#ambUnitAchieve3').html((isNaN(accounting.formatNumber(achieveAMBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitMarch, 2)) + "%");
    $('#ambUnitAchieve4').html((isNaN(accounting.formatNumber(achieveAMBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitApril, 2)) + "%");
    $('#ambUnitAchieve5').html((isNaN(accounting.formatNumber(achieveAMBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitMay, 2)) + "%");
    $('#ambUnitAchieve6').html((isNaN(accounting.formatNumber(achieveAMBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitJune, 2)) + "%");
    $('#ambUnitAchieve7').html((isNaN(accounting.formatNumber(achieveAMBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitJuly, 2)) + "%");
    $('#ambUnitAchieve8').html((isNaN(accounting.formatNumber(achieveAMBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitAugust, 2)) + "%");
    $('#ambUnitAchieve9').html((isNaN(accounting.formatNumber(achieveAMBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitSeptember, 2)) + "%");
    $('#ambUnitAchieve10').html((isNaN(accounting.formatNumber(achieveAMBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitOctober, 2)) + "%");
    $('#ambUnitAchieve11').html((isNaN(accounting.formatNumber(achieveAMBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitNovember, 2)) + "%");
    $('#ambUnitAchieve12').html((isNaN(accounting.formatNumber(achieveAMBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitDecember, 2)) + "%");
    $('#ambUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveAMBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitTotal, 2)) + "%");

    $('#UnitGrowth1').html((isNaN(accounting.formatNumber(growthUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJanuary, 2)) + "%");
    $('#UnitGrowth2').html((isNaN(accounting.formatNumber(growthUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitFebruary, 2)) + "%");
    $('#UnitGrowth3').html((isNaN(accounting.formatNumber(growthUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitMarch, 2)) + "%");
    $('#UnitGrowth4').html((isNaN(accounting.formatNumber(growthUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitApril, 2)) + "%");
    $('#UnitGrowth5').html((isNaN(accounting.formatNumber(growthUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitMay, 2)) + "%");
    $('#UnitGrowth6').html((isNaN(accounting.formatNumber(growthUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJune, 2)) + "%");
    $('#UnitGrowth7').html((isNaN(accounting.formatNumber(growthUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJuly, 2)) + "%");
    $('#UnitGrowth8').html((isNaN(accounting.formatNumber(growthUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitAugust, 2)) + "%");
    $('#UnitGrowth9').html((isNaN(accounting.formatNumber(growthUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitSeptember, 2)) + "%");
    $('#UnitGrowth10').html((isNaN(accounting.formatNumber(growthUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitOctober, 2)) + "%");
    $('#UnitGrowth11').html((isNaN(accounting.formatNumber(growthUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitNovember, 2)) + "%");
    $('#UnitGrowth12').html((isNaN(accounting.formatNumber(growthUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitDecember, 2)) + "%");
    $('#UnitGrowthTotal').html((isNaN(accounting.formatNumber(growthUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitTotal, 2)) + "%");

    $('#ambUnitGrowth1').html((isNaN(accounting.formatNumber(growthAMBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitJanuary, 2)) + "%");
    $('#ambUnitGrowth2').html((isNaN(accounting.formatNumber(growthAMBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitFebruary, 2)) + "%");
    $('#ambUnitGrowth3').html((isNaN(accounting.formatNumber(growthAMBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitMarch, 2)) + "%");
    $('#ambUnitGrowth4').html((isNaN(accounting.formatNumber(growthAMBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitApril, 2)) + "%");
    $('#ambUnitGrowth5').html((isNaN(accounting.formatNumber(growthAMBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitMay, 2)) + "%");
    $('#ambUnitGrowth6').html((isNaN(accounting.formatNumber(growthAMBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitJune, 2)) + "%");
    $('#ambUnitGrowth7').html((isNaN(accounting.formatNumber(growthAMBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitJuly, 2)) + "%");
    $('#ambUnitGrowth8').html((isNaN(accounting.formatNumber(growthAMBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitAugust, 2)) + "%");
    $('#ambUnitGrowth9').html((isNaN(accounting.formatNumber(growthAMBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitSeptember, 2)) + "%");
    $('#ambUnitGrowth10').html((isNaN(accounting.formatNumber(growthAMBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitOctober, 2)) + "%");
    $('#ambUnitGrowth11').html((isNaN(accounting.formatNumber(growthAMBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitNovember, 2)) + "%");
    $('#ambUnitGrowth12').html((isNaN(accounting.formatNumber(growthAMBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitDecember, 2)) + "%");
    $('#ambUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthAMBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitTotal, 2)) + "%");

    $('#mcbBahtTarget1').html(accounting.formatNumber(targetMCBBahtJanuary / 1000, 2));
    $('#mcbBahtTarget2').html(accounting.formatNumber(targetMCBBahtFebruary / 1000, 2));
    $('#mcbBahtTarget3').html(accounting.formatNumber(targetMCBBahtMarch / 1000, 2));
    $('#mcbBahtTarget4').html(accounting.formatNumber(targetMCBBahtApril / 1000, 2));
    $('#mcbBahtTarget5').html(accounting.formatNumber(targetMCBBahtMay / 1000, 2));
    $('#mcbBahtTarget6').html(accounting.formatNumber(targetMCBBahtJune / 1000, 2));
    $('#mcbBahtTarget7').html(accounting.formatNumber(targetMCBBahtJuly / 1000, 2));
    $('#mcbBahtTarget8').html(accounting.formatNumber(targetMCBBahtAugust / 1000, 2));
    $('#mcbBahtTarget9').html(accounting.formatNumber(targetMCBBahtSeptember / 1000, 2));
    $('#mcbBahtTarget10').html(accounting.formatNumber(targetMCBBahtOctober / 1000, 2));
    $('#mcbBahtTarget11').html(accounting.formatNumber(targetMCBBahtNovember / 1000, 2));
    $('#mcbBahtTarget12').html(accounting.formatNumber(targetMCBBahtDecember / 1000, 2));
    $('#mcbBahtTargetTotal').html(accounting.formatNumber(targetMCBBahtTotal / 1000, 2));

    $('#mcbBahtAchieve1').html((isNaN(accounting.formatNumber(achieveMCBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtJanuary, 2)) + "%");
    $('#mcbBahtAchieve2').html((isNaN(accounting.formatNumber(achieveMCBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtFebruary, 2)) + "%");
    $('#mcbBahtAchieve3').html((isNaN(accounting.formatNumber(achieveMCBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtMarch, 2)) + "%");
    $('#mcbBahtAchieve4').html((isNaN(accounting.formatNumber(achieveMCBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtApril, 2)) + "%");
    $('#mcbBahtAchieve5').html((isNaN(accounting.formatNumber(achieveMCBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtMay, 2)) + "%");
    $('#mcbBahtAchieve6').html((isNaN(accounting.formatNumber(achieveMCBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtJune, 2)) + "%");
    $('#mcbBahtAchieve7').html((isNaN(accounting.formatNumber(achieveMCBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtJuly, 2)) + "%");
    $('#mcbBahtAchieve8').html((isNaN(accounting.formatNumber(achieveMCBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtAugust, 2)) + "%");
    $('#mcbBahtAchieve9').html((isNaN(accounting.formatNumber(achieveMCBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtSeptember, 2)) + "%");
    $('#mcbBahtAchieve10').html((isNaN(accounting.formatNumber(achieveMCBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtOctober, 2)) + "%");
    $('#mcbBahtAchieve11').html((isNaN(accounting.formatNumber(achieveMCBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtNovember, 2)) + "%");
    $('#mcbBahtAchieve12').html((isNaN(accounting.formatNumber(achieveMCBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtDecember, 2)) + "%");
    $('#mcbBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveMCBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtTotal, 2)) + "%");

    $('#mcbBahtGrowth1').html((isNaN(accounting.formatNumber(growthMCBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtJanuary, 2)) + "%");
    $('#mcbBahtGrowth2').html((isNaN(accounting.formatNumber(growthMCBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtFebruary, 2)) + "%");
    $('#mcbBahtGrowth3').html((isNaN(accounting.formatNumber(growthMCBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtMarch, 2)) + "%");
    $('#mcbBahtGrowth4').html((isNaN(accounting.formatNumber(growthMCBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtApril, 2)) + "%");
    $('#mcbBahtGrowth5').html((isNaN(accounting.formatNumber(growthMCBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtMay, 2)) + "%");
    $('#mcbBahtGrowth6').html((isNaN(accounting.formatNumber(growthMCBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtJune, 2)) + "%");
    $('#mcbBahtGrowth7').html((isNaN(accounting.formatNumber(growthMCBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtJuly, 2)) + "%");
    $('#mcbBahtGrowth8').html((isNaN(accounting.formatNumber(growthMCBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtAugust, 2)) + "%");
    $('#mcbBahtGrowth9').html((isNaN(accounting.formatNumber(growthMCBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtSeptember, 2)) + "%");
    $('#mcbBahtGrowth10').html((isNaN(accounting.formatNumber(growthMCBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtOctober, 2)) + "%");
    $('#mcbBahtGrowth11').html((isNaN(accounting.formatNumber(growthMCBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtNovember, 2)) + "%");
    $('#mcbBahtGrowth12').html((isNaN(accounting.formatNumber(growthMCBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtDecember, 2)) + "%");
    $('#mcbBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthMCBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtTotal, 2)) + "%");

    $('#mcbUnitTarget1').html(accounting.formatNumber(targetMCBUnitJanuary));
    $('#mcbUnitTarget2').html(accounting.formatNumber(targetMCBUnitFebruary));
    $('#mcbUnitTarget3').html(accounting.formatNumber(targetMCBUnitMarch));
    $('#mcbUnitTarget4').html(accounting.formatNumber(targetMCBUnitApril));
    $('#mcbUnitTarget5').html(accounting.formatNumber(targetMCBUnitMay));
    $('#mcbUnitTarget6').html(accounting.formatNumber(targetMCBUnitJune));
    $('#mcbUnitTarget7').html(accounting.formatNumber(targetMCBUnitJuly));
    $('#mcbUnitTarget8').html(accounting.formatNumber(targetMCBUnitAugust));
    $('#mcbUnitTarget9').html(accounting.formatNumber(targetMCBUnitSeptember));
    $('#mcbUnitTarget10').html(accounting.formatNumber(targetMCBUnitOctober));
    $('#mcbUnitTarget11').html(accounting.formatNumber(targetMCBUnitNovember));
    $('#mcbUnitTarget12').html(accounting.formatNumber(targetMCBUnitDecember));
    $('#mcbUnitTargetTotal').html(accounting.formatNumber(targetMCBUnitTotal));

    $('#mcbUnitAchieve1').html((isNaN(accounting.formatNumber(achieveMCBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitJanuary, 2)) + "%");
    $('#mcbUnitAchieve2').html((isNaN(accounting.formatNumber(achieveMCBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitFebruary, 2)) + "%");
    $('#mcbUnitAchieve3').html((isNaN(accounting.formatNumber(achieveMCBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitMarch, 2)) + "%");
    $('#mcbUnitAchieve4').html((isNaN(accounting.formatNumber(achieveMCBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitApril, 2)) + "%");
    $('#mcbUnitAchieve5').html((isNaN(accounting.formatNumber(achieveMCBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitMay, 2)) + "%");
    $('#mcbUnitAchieve6').html((isNaN(accounting.formatNumber(achieveMCBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitJune, 2)) + "%");
    $('#mcbUnitAchieve7').html((isNaN(accounting.formatNumber(achieveMCBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitJuly, 2)) + "%");
    $('#mcbUnitAchieve8').html((isNaN(accounting.formatNumber(achieveMCBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitAugust, 2)) + "%");
    $('#mcbUnitAchieve9').html((isNaN(accounting.formatNumber(achieveMCBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitSeptember, 2)) + "%");
    $('#mcbUnitAchieve10').html((isNaN(accounting.formatNumber(achieveMCBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitOctober, 2)) + "%");
    $('#mcbUnitAchieve11').html((isNaN(accounting.formatNumber(achieveMCBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitNovember, 2)) + "%");
    $('#mcbUnitAchieve12').html((isNaN(accounting.formatNumber(achieveMCBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitDecember, 2)) + "%");
    $('#mcbUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveMCBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitTotal, 2)) + "%");

    $('#mcbUnitGrowth1').html((isNaN(accounting.formatNumber(growthMCBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitJanuary, 2)) + "%");
    $('#mcbUnitGrowth2').html((isNaN(accounting.formatNumber(growthMCBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitFebruary, 2)) + "%");
    $('#mcbUnitGrowth3').html((isNaN(accounting.formatNumber(growthMCBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitMarch, 2)) + "%");
    $('#mcbUnitGrowth4').html((isNaN(accounting.formatNumber(growthMCBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitApril, 2)) + "%");
    $('#mcbUnitGrowth5').html((isNaN(accounting.formatNumber(growthMCBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitMay, 2)) + "%");
    $('#mcbUnitGrowth6').html((isNaN(accounting.formatNumber(growthMCBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitJune, 2)) + "%");
    $('#mcbUnitGrowth7').html((isNaN(accounting.formatNumber(growthMCBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitJuly, 2)) + "%");
    $('#mcbUnitGrowth8').html((isNaN(accounting.formatNumber(growthMCBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitAugust, 2)) + "%");
    $('#mcbUnitGrowth9').html((isNaN(accounting.formatNumber(growthMCBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitSeptember, 2)) + "%");
    $('#mcbUnitGrowth10').html((isNaN(accounting.formatNumber(growthMCBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitOctober, 2)) + "%");
    $('#mcbUnitGrowth11').html((isNaN(accounting.formatNumber(growthMCBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitNovember, 2)) + "%");
    $('#mcbUnitGrowth12').html((isNaN(accounting.formatNumber(growthMCBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitDecember, 2)) + "%");
    $('#mcbUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthMCBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitTotal, 2)) + "%");


    //achieveBaht
    if (achieveBahtJanuary >= 100) {
        $('#bahtAchieve1').removeClass().addClass('dotGreen');
    } else if (achieveBahtJanuary == 0) {
        $('#bahtAchieve1').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve1').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve1').attr('title', accounting.formatNumber(achieveBahtJanuary, 2) + "%");

    if (achieveBahtFebruary >= 100) {
        $('#bahtAchieve2').removeClass().addClass('dotGreen');
    } else if (achieveBahtFebruary == 0) {
        $('#bahtAchieve2').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve2').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve2').attr('title', accounting.formatNumber(achieveBahtFebruary, 2) + "%");

    if (achieveBahtMarch >= 100) {
        $('#bahtAchieve3').removeClass().addClass('dotGreen');
    } else if (achieveBahtMarch == 0) {
        $('#bahtAchieve3').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve3').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve3').attr('title', accounting.formatNumber(achieveBahtMarch, 2) + "%");

    if (achieveBahtApril >= 100) {
        $('#bahtAchieve4').removeClass().addClass('dotGreen');
    } else if (achieveBahtApril == 0) {
        $('#bahtAchieve4').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve4').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve4').attr('title', accounting.formatNumber(achieveBahtApril, 2) + "%");

    if (achieveBahtMay >= 100) {
        $('#bahtAchieve5').removeClass().addClass('dotGreen');
    } else if (achieveBahtMay == 0) {
        $('#bahtAchieve5').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve5').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve5').attr('title', accounting.formatNumber(achieveBahtMay, 2) + "%");

    if (achieveBahtJune >= 100) {
        $('#bahtAchieve6').removeClass().addClass('dotGreen');
    } else if (achieveBahtJune == 0) {
        $('#bahtAchieve6').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve6').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve6').attr('title', accounting.formatNumber(achieveBahtJune, 2) + "%");

    if (achieveBahtJuly >= 100) {
        $('#bahtAchieve7').removeClass().addClass('dotGreen');
    } else if (achieveBahtJuly == 0) {
        $('#bahtAchieve7').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve7').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve7').attr('title', accounting.formatNumber(achieveBahtJuly, 2) + "%");

    if (achieveBahtAugust >= 100) {
        $('#bahtAchieve8').removeClass().addClass('dotGreen');
    } else if (achieveBahtAugust == 0) {
        $('#bahtAchieve8').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve8').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve8').attr('title', accounting.formatNumber(achieveBahtAugust, 2) + "%");

    if (achieveBahtSeptember >= 100) {
        $('#bahtAchieve9').removeClass().addClass('dotGreen');
    } else if (achieveBahtSeptember == 0) {
        $('#bahtAchieve9').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve9').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve9').attr('title', accounting.formatNumber(achieveBahtSeptember, 2) + "%");

    if (achieveBahtOctober >= 100) {
        $('#bahtAchieve10').removeClass().addClass('dotGreen');
    } else if (achieveBahtOctober == 0) {
        $('#bahtAchieve10').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve10').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve10').attr('title', accounting.formatNumber(achieveBahtOctober, 2) + "%");

    if (achieveBahtNovember >= 100) {
        $('#bahtAchieve11').removeClass().addClass('dotGreen');
    } else if (achieveBahtNovember == 0) {
        $('#bahtAchieve11').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve11').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve11').attr('title', accounting.formatNumber(achieveBahtNovember, 2) + "%");

    if (achieveBahtDecember >= 100) {
        $('#bahtAchieve12').removeClass().addClass('dotGreen');
    } else if (achieveBahtDecember == 0) {
        $('#bahtAchieve12').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieve12').removeClass().addClass('dotRed');
    }
    $('#bahtAchieve12').attr('title', accounting.formatNumber(achieveBahtDecember, 2) + "%");

    if (achieveBahtTotal >= 100) {
        $('#bahtAchieveTotal').removeClass().addClass('dotGreen');
    } else if (achieveBahtTotal == 0) {
        $('#bahtAchieveTotal').removeClass().addClass('dotWhite');
    } else {
        $('#bahtAchieveTotal').removeClass().addClass('dotRed');
    }
    $('#bahtAchieveTotal').attr('title', accounting.formatNumber(achieveBahtTotal, 2) + "%");

    //growthBaht
    if (accounting.formatNumber(growthBahtJanuary) > 0) {
        $('#bahtGrowth1').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtJanuary) == -100) {
        $('#bahtGrowth1').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth1').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth1').attr('title', accounting.formatNumber(growthBahtJanuary, 2) + "%");

    if (accounting.formatNumber(growthBahtFebruary) > 0) {
        $('#bahtGrowth2').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtFebruary) == -100) {
        $('#bahtGrowth2').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth2').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth2').attr('title', accounting.formatNumber(growthBahtFebruary, 2) + "%");

    if (accounting.formatNumber(growthBahtMarch) > 0) {
        $('#bahtGrowth3').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtMarch) == -100) {
        $('#bahtGrowth3').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth3').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth3').attr('title', accounting.formatNumber(growthBahtMarch, 2) + "%");

    if (accounting.formatNumber(growthBahtApril) > 0) {
        $('#bahtGrowth4').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtApril) == -100) {
        $('#bahtGrowth4').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth4').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth4').attr('title', accounting.formatNumber(growthBahtApril, 2) + "%");

    if (accounting.formatNumber(growthBahtMay) > 0) {
        $('#bahtGrowth5').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtMay) == -100) {
        $('#bahtGrowth5').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth5').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth5').attr('title', accounting.formatNumber(growthBahtMay, 2) + "%");

    if (accounting.formatNumber(growthBahtJune) > 0) {
        $('#bahtGrowth6').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtJune) == -100) {
        $('#bahtGrowth6').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth6').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth6').attr('title', accounting.formatNumber(growthBahtJune, 2) + "%");

    if (accounting.formatNumber(growthBahtJuly) > 0) {
        $('#bahtGrowth7').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtJuly) == -100) {
        $('#bahtGrowth7').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth7').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth7').attr('title', accounting.formatNumber(growthBahtJuly, 2) + "%");

    if (accounting.formatNumber(growthBahtAugust) > 0) {
        $('#bahtGrowth8').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtAugust) == -100) {
        $('#bahtGrowth8').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth8').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth8').attr('title', accounting.formatNumber(growthBahtAugust, 2) + "%");

    if (accounting.formatNumber(growthBahtSeptember) > 0) {
        $('#bahtGrowth9').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtSeptember) == -100) {
        $('#bahtGrowth9').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth9').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth9').attr('title', accounting.formatNumber(growthBahtSeptember, 2) + "%");

    if (accounting.formatNumber(growthBahtOctober) > 0) {
        $('#bahtGrowth10').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtOctober) == -100) {
        $('#bahtGrowth10').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth10').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth10').attr('title', accounting.formatNumber(growthBahtOctober, 2) + "%");

    if (accounting.formatNumber(growthBahtNovember) > 0) {
        $('#bahtGrowth11').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtNovember) == -100) {
        $('#bahtGrowth11').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth11').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth11').attr('title', accounting.formatNumber(growthBahtNovember, 2) + "%");

    if (accounting.formatNumber(growthBahtDecember) > 0) {
        $('#bahtGrowth12').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtDecember) == -100) {
        $('#bahtGrowth12').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowth12').removeClass().addClass('dotRed');
    }
    $('#bahtGrowth12').attr('title', accounting.formatNumber(growthBahtDecember, 2) + "%");

    if (accounting.formatNumber(growthBahtTotal) > 0) {
        $('#bahtGrowthTotal').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthBahtTotal) == -100) {
        $('#bahtGrowthTotal').removeClass().addClass('dotWhite');
    } else {
        $('#bahtGrowthTotal').removeClass().addClass('dotRed');
    }
    $('#bahtGrowthTotal').attr('title', accounting.formatNumber(growthBahtTotal, 2) + "%");

    //achieveunit
    if (achieveUnitJanuary >= 100) {
        $('#unitAchieve1').removeClass().addClass('dotGreen');
    } else if (achieveUnitJanuary == 0) {
        $('#unitAchieve1').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve1').removeClass().addClass('dotRed');
    }
    $('#unitAchieve1').attr('title', accounting.formatNumber(achieveUnitJanuary, 2) + "%");

    if (achieveUnitFebruary >= 100) {
        $('#unitAchieve2').removeClass().addClass('dotGreen');
    } else if (achieveUnitFebruary == 0) {
        $('#unitAchieve2').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve2').removeClass().addClass('dotRed');
    }
    $('#unitAchieve2').attr('title', accounting.formatNumber(achieveUnitFebruary, 2) + "%");

    if (achieveUnitMarch >= 100) {
        $('#unitAchieve3').removeClass().addClass('dotGreen');
    } else if (achieveUnitMarch == 0) {
        $('#unitAchieve3').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve3').removeClass().addClass('dotRed');
    }
    $('#unitAchieve3').attr('title', accounting.formatNumber(achieveUnitMarch, 2) + "%");

    if (achieveUnitApril >= 100) {
        $('#unitAchieve4').removeClass().addClass('dotGreen');
    } else if (achieveUnitApril == 0) {
        $('#unitAchieve4').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve4').removeClass().addClass('dotRed');
    }
    $('#unitAchieve4').attr('title', accounting.formatNumber(achieveUnitApril, 2) + "%");

    if (achieveUnitMay >= 100) {
        $('#unitAchieve5').removeClass().addClass('dotGreen');
    } else if (achieveUnitMay == 0) {
        $('#unitAchieve5').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve5').removeClass().addClass('dotRed');
    }
    $('#unitAchieve5').attr('title', accounting.formatNumber(achieveUnitMay, 2) + "%");

    if (achieveUnitJune >= 100) {
        $('#unitAchieve6').removeClass().addClass('dotGreen');
    } else if (achieveUnitJune == 0) {
        $('#unitAchieve6').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve6').removeClass().addClass('dotRed');
    }
    $('#unitAchieve6').attr('title', accounting.formatNumber(achieveUnitJune, 2) + "%");

    if (achieveUnitJuly >= 100) {
        $('#unitAchieve7').removeClass().addClass('dotGreen');
    } else if (achieveUnitJuly == 0) {
        $('#unitAchieve7').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve7').removeClass().addClass('dotRed');
    }
    $('#unitAchieve7').attr('title', accounting.formatNumber(achieveUnitJuly, 2) + "%");

    if (achieveUnitAugust >= 100) {
        $('#unitAchieve8').removeClass().addClass('dotGreen');
    } else if (achieveUnitAugust == 0) {
        $('#unitAchieve8').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve8').removeClass().addClass('dotRed');
    }
    $('#unitAchieve8').attr('title', accounting.formatNumber(achieveUnitAugust, 2) + "%");

    if (achieveUnitSeptember >= 100) {
        $('#unitAchieve9').removeClass().addClass('dotGreen');
    } else if (achieveUnitSeptember == 0) {
        $('#unitAchieve9').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve9').removeClass().addClass('dotRed');
    }
    $('#unitAchieve9').attr('title', accounting.formatNumber(achieveUnitSeptember, 2) + "%");

    if (achieveUnitOctober >= 100) {
        $('#unitAchieve10').removeClass().addClass('dotGreen');
    } else if (achieveUnitOctober == 0) {
        $('#unitAchieve10').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve10').removeClass().addClass('dotRed');
    }
    $('#unitAchieve10').attr('title', accounting.formatNumber(achieveUnitOctober, 2) + "%");

    if (achieveUnitNovember >= 100) {
        $('#unitAchieve11').removeClass().addClass('dotGreen');
    } else if (achieveUnitNovember == 0) {
        $('#unitAchieve11').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve11').removeClass().addClass('dotRed');
    }
    $('#unitAchieve11').attr('title', accounting.formatNumber(achieveUnitNovember, 2) + "%");

    if (achieveUnitDecember >= 100) {
        $('#unitAchieve12').removeClass().addClass('dotGreen');
    } else if (achieveUnitDecember == 0) {
        $('#unitAchieve12').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieve12').removeClass().addClass('dotRed');
    }
    $('#unitAchieve12').attr('title', accounting.formatNumber(achieveUnitDecember, 2) + "%");

    if (achieveUnitTotal >= 100) {
        $('#unitAchieveTotal').removeClass().addClass('dotGreen');
    } else if (achieveUnitTotal == 0) {
        $('#unitAchieveTotal').removeClass().addClass('dotWhite');
    } else {
        $('#unitAchieveTotal').removeClass().addClass('dotRed');
    }
    $('#unitAchieveTotal').attr('title', accounting.formatNumber(achieveUnitTotal, 2) + "%");

    //growthUnit
    if (accounting.formatNumber(growthUnitJanuary) > 0) {
        $('#unitGrowth1').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitJanuary) == -100) {
        $('#unitGrowth1').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth1').removeClass().addClass('dotRed');
    }
    $('#unitGrowth1').attr('title', accounting.formatNumber(growthUnitJanuary, 2) + "%");

    if (accounting.formatNumber(growthUnitFebruary) > 0) {
        $('#unitGrowth2').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitFebruary) == -100) {
        $('#unitGrowth2').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth2').removeClass().addClass('dotRed');
    }
    $('#unitGrowth2').attr('title', accounting.formatNumber(growthUnitFebruary, 2) + "%");

    if (accounting.formatNumber(growthUnitMarch) > 0) {
        $('#unitGrowth3').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitMarch) == -100) {
        $('#unitGrowth3').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth3').removeClass().addClass('dotRed');
    }
    $('#unitGrowth3').attr('title', accounting.formatNumber(growthUnitMarch, 2) + "%");

    if (accounting.formatNumber(growthUnitApril) > 0) {
        $('#unitGrowth4').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitApril) == -100) {
        $('#unitGrowth4').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth4').removeClass().addClass('dotRed');
    }
    $('#unitGrowth4').attr('title', accounting.formatNumber(growthUnitApril, 2) + "%");

    if (accounting.formatNumber(growthUnitMay) > 0) {
        $('#unitGrowth5').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitMay) == -100) {
        $('#unitGrowth5').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth5').removeClass().addClass('dotRed');
    }
    $('#unitGrowth5').attr('title', accounting.formatNumber(growthUnitMay, 2) + "%");

    if (accounting.formatNumber(growthUnitJune) > 0) {
        $('#unitGrowth6').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitJune) == -100) {
        $('#unitGrowth6').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth6').removeClass().addClass('dotRed');
    }
    $('#unitGrowth6').attr('title', accounting.formatNumber(growthUnitJune, 2) + "%");

    if (accounting.formatNumber(growthUnitJuly) > 0) {
        $('#unitGrowth7').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitJuly) == -100) {
        $('#unitGrowth7').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth7').removeClass().addClass('dotRed');
    }
    $('#unitGrowth7').attr('title', accounting.formatNumber(growthUnitJuly, 2) + "%");

    if (accounting.formatNumber(growthUnitAugust) > 0) {
        $('#unitGrowth8').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitAugust) == -100) {
        $('#unitGrowth8').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth8').removeClass().addClass('dotRed');
    }
    $('#unitGrowth8').attr('title', accounting.formatNumber(growthUnitAugust, 2) + "%");

    if (accounting.formatNumber(growthUnitSeptember) > 0) {
        $('#unitGrowth9').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitSeptember) == -100) {
        $('#unitGrowth9').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth9').removeClass().addClass('dotRed');
    }
    $('#unitGrowth9').attr('title', accounting.formatNumber(growthUnitSeptember, 2) + "%");

    if (accounting.formatNumber(growthUnitOctober) > 0) {
        $('#unitGrowth10').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitOctober) == -100) {
        $('#unitGrowth10').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth10').removeClass().addClass('dotRed');
    }
    $('#unitGrowth10').attr('title', accounting.formatNumber(growthUnitOctober, 2) + "%");

    if (accounting.formatNumber(growthUnitNovember) > 0) {
        $('#unitGrowth11').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitNovember) == -100) {
        $('#unitGrowth11').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth11').removeClass().addClass('dotRed');
    }
    $('#unitGrowth11').attr('title', accounting.formatNumber(growthUnitNovember, 2) + "%");

    if (accounting.formatNumber(growthUnitDecember) > 0) {
        $('#unitGrowth12').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitDecember) == -100) {
        $('#unitGrowth12').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowth12').removeClass().addClass('dotRed');
    }
    $('#unitGrowth12').attr('title', accounting.formatNumber(growthUnitDecember, 2) + "%");

    if (accounting.formatNumber(growthUnitTotal) > 0) {
        $('#unitGrowthTotal').removeClass().addClass('dotGreen');
    } else if (accounting.formatNumber(growthUnitTotal) == -100) {
        $('#unitGrowthTotal').removeClass().addClass('dotWhite');
    } else {
        $('#unitGrowthTotal').removeClass().addClass('dotRed');
    }
    $('#unitGrowthTotal').attr('title', accounting.formatNumber(growthUnitTotal, 2) + "%");

    bahtGraph(year, accounting.unformat(targetREMAMB.Amt01), accounting.unformat(targetREMAMB.Amt02), accounting.unformat(targetREMAMB.Amt03), accounting.unformat(targetREMAMB.Amt04),
        accounting.unformat(targetREMAMB.Amt05), accounting.unformat(targetREMAMB.Amt06), accounting.unformat(targetREMAMB.Amt07), accounting.unformat(targetREMAMB.Amt08),
        accounting.unformat(targetREMAMB.Amt09), accounting.unformat(targetREMAMB.Amt10), accounting.unformat(targetREMAMB.Amt11), accounting.unformat(targetREMAMB.Amt12),
        accounting.unformat(totalREMBahtTarget), currREMBahtJanuary, currREMBahtFebruary, currREMBahtMarch, currREMBahtApril, currREMBahtMay, currREMBahtJune, currREMBahtJuly, currREMBahtAugust,
        currREMBahtSeptember, currREMBahtOctober, currREMBahtNovember, currREMBahtDecember, currREMTotalBaht, oldREMBahtJanuary, oldREMBahtFebruary, oldREMBahtMarch, oldREMBahtApril, oldREMBahtMay,
        oldREMBahtJune, oldREMBahtJuly, oldREMBahtAugust, oldREMBahtSeptember, oldREMBahtOctober, oldREMBahtNovember, oldREMBahtDecember, oldREMTotalBaht,
        targetMTDAmt01, targetMTDAmt02, targetMTDAmt03, targetMTDAmt04, targetMTDAmt05, targetMTDAmt06, targetMTDAmt07, targetMTDAmt08, targetMTDAmt09, targetMTDAmt10, targetMTDAmt11, targetMTDAmt12,
        accounting.unformat(totalMTDBahtTarget), currMTDBahtJanuary, currMTDBahtFebruary, currMTDBahtMarch, currMTDBahtApril, currMTDBahtMay, currMTDBahtJune, currMTDBahtJuly, currMTDBahtAugust,
        currMTDBahtSeptember, currMTDBahtOctober, currMTDBahtNovember, currMTDBahtDecember, currMTDTotalBaht, oldMTDBahtJanuary, oldMTDBahtFebruary, oldMTDBahtMarch, oldMTDBahtApril, oldMTDBahtMay,
        oldMTDBahtJune, oldMTDBahtJuly, oldMTDBahtAugust, oldMTDBahtSeptember, oldMTDBahtOctober, oldMTDBahtNovember, oldMTDBahtDecember, oldMTDTotalBaht);
    unitGraph(year, accounting.unformat(targetREMAMB.Unit01), accounting.unformat(targetREMAMB.Unit02), accounting.unformat(targetREMAMB.Unit03), accounting.unformat(targetREMAMB.Unit04),
        accounting.unformat(targetREMAMB.Unit05), accounting.unformat(targetREMAMB.Unit06), accounting.unformat(targetREMAMB.Unit07), accounting.unformat(targetREMAMB.Unit08),
        accounting.unformat(targetREMAMB.Unit09), accounting.unformat(targetREMAMB.Unit10), accounting.unformat(targetREMAMB.Unit11), accounting.unformat(targetREMAMB.Unit12),
        accounting.unformat(totalREMUnitTarget), currREMUnitJanuary, currREMUnitFebruary, currREMUnitMarch, currREMUnitApril, currREMUnitMay, currREMUnitJune, currREMUnitJuly, currREMUnitAugust,
        currREMUnitSeptember, currREMUnitOctober, currREMUnitNovember, currREMUnitDecember, currREMTotalUnit, oldREMUnitJanuary, oldREMUnitFebruary, oldREMUnitMarch, oldREMUnitApril, oldREMUnitMay,
        oldREMUnitJune, oldREMUnitJuly, oldREMUnitAugust, oldREMUnitSeptember, oldREMUnitOctober, oldREMUnitNovember, oldREMUnitDecember, oldREMTotalUnit,
        targetMTDUnit01, targetMTDUnit02, targetMTDUnit03, targetMTDUnit04, targetMTDUnit05, targetMTDUnit06, targetMTDUnit07, targetMTDUnit08, targetMTDUnit09, targetMTDUnit10, targetMTDUnit11, targetMTDUnit12,
        accounting.unformat(totalMTDUnitTarget), currMTDUnitJanuary, currMTDUnitFebruary, currMTDUnitMarch, currMTDUnitApril, currMTDUnitMay, currMTDUnitJune, currMTDUnitJuly, currMTDUnitAugust,
        currMTDUnitSeptember, currMTDUnitOctober, currMTDUnitNovember, currMTDUnitDecember, currMTDTotalUnit, oldMTDUnitJanuary, oldMTDUnitFebruary, oldMTDUnitMarch, oldMTDUnitApril, oldMTDUnitMay,
        oldMTDUnitJune, oldMTDUnitJuly, oldMTDUnitAugust, oldMTDUnitSeptember, oldMTDUnitOctober, oldMTDUnitNovember, oldMTDUnitDecember, oldMTDTotalUnit);

    var bahtPerREM = (currREMTotalBaht / (currREMTotalBaht + currMTDTotalBaht)) * 100;
    var bahtPerMTD = (currMTDTotalBaht / (currREMTotalBaht + currMTDTotalBaht)) * 100;
    var unitPerREM = (currREMTotalUnit / (currREMTotalUnit + currMTDTotalUnit)) * 100;
    var unitPerMTD = (currMTDTotalUnit / (currREMTotalUnit + currMTDTotalUnit)) * 100;

    var bahtPerAMBREM = (currREMAMBTotalBaht / (currREMAMBTotalBaht + currMTDAMBTotalBaht)) * 100;
    var bahtPerAMBMTD = (currMTDAMBTotalBaht / (currREMAMBTotalBaht + currMTDAMBTotalBaht)) * 100;
    var unitPerAMBREM = (currREMAMBTotalUnit / (currREMAMBTotalUnit + currMTDAMBTotalUnit)) * 100;
    var unitPerAMBMTD = (currMTDAMBTotalUnit / (currREMAMBTotalUnit + currMTDAMBTotalUnit)) * 100;
    var bahtPerMCBMTD = (currMTDMCBTotalBaht / (currMTDMCBTotalBaht)) * 100;
    var unitPerMCBMTD = (currMTDMCBTotalUnit / (currMTDMCBTotalUnit)) * 100;

    bahtYSD(year, bahtPerREM, bahtPerMTD, currREMTotalBaht, currMTDTotalBaht);
    unitYSD(year, unitPerREM, unitPerMTD, currREMTotalUnit, currMTDTotalUnit);
    bahtYSD2(year, bahtPerAMBREM, bahtPerAMBMTD, currREMAMBTotalBaht, currMTDAMBTotalBaht);
    unitYSD2(year, unitPerAMBREM, unitPerAMBMTD, currREMAMBTotalUnit, currMTDAMBTotalUnit);
    bahtYSD3(year, bahtPerMCBMTD, currMTDMCBTotalBaht);
    unitYSD3(year, unitPerMCBMTD, currMTDMCBTotalUnit);
}

function tableProduct(type, data) {

    var k = '<tbody>'
    for (i = 0; i < data.length; i++) {
        k += '<tr>';
        k += '<td style="text-align:center">' + (i + 1) + '</td>';
        k += '<td>' + data[i].Dscription + '</td>';
        k += '<td style="text-align:center">' + data[i].ItemGroupShort + '</td>';
        k += '<td>' + accounting.formatNumber(data[i].Quantity) + '</td>';
        k += '<td>' + accounting.formatNumber(data[i].Total) + '</td>';
        k += '</tr>';
    }
    k += '</tbody>';

    if (type == "REM") {
        document.getElementById('remProduct').innerHTML = k;
    } else {
        document.getElementById('mtdProduct').innerHTML = k;
    }

}

function tableCustomer(type, data) {

    var k = '<tbody>'
    for (i = 0; i < data.length; i++) {
        k += '<tr>';
        k += '<td style="text-align:center">' + (i + 1) + '</td>';
        k += '<td>' + data[i].CustName + '</td>';
        k += '<td>' + accounting.formatNumber(data[i].Quantity) + '</td>';
        k += '<td>' + accounting.formatNumber(data[i].Total) + '</td>';
        k += '</tr>';
    }
    k += '</tbody>';

    if (type == "REM") {
        document.getElementById('remCustomer').innerHTML = k;
    } else {
        document.getElementById('mtdCustomer').innerHTML = k;
    }

}

function bahtGraph(year, targetREM1, targetREM2, targetREM3, targetREM4, targetREM5, targetREM6, targetREM7, targetREM8, targetREM9, targetREM10, targetREM11, targetREM12, targetREMTotal, currREMJanuary, currREMFebruary, currREMMarch, currREMApril, currREMMay, currREMJune, currREMJuly, currREMAugust, currREMSeptember, currREMOctober, currREMNovember, currREMDecember, currREMTotal, oldREMJanuary, oldREMFebruary, oldREMMarch, oldREMApril, oldREMMay, oldREMJune, oldREMJuly, oldREMAugust, oldREMSeptember, oldREMOctober, oldREMNovember, oldREMDecember, oldREMTotal,
    targetMTD1, targetMTD2, targetMTD3, targetMTD4, targetMTD5, targetMTD6, targetMTD7, targetMTD8, targetMTD9, targetMTD10, targetMTD11, targetMTD12, targetMTDTotal, currMTDJanuary, currMTDFebruary, currMTDMarch, currMTDApril, currMTDMay, currMTDJune, currMTDJuly, currMTDAugust, currMTDSeptember, currMTDOctober, currMTDNovember, currMTDDecember, currMTDTotal, oldMTDJanuary, oldMTDFebruary, oldMTDMarch, oldMTDApril, oldMTDMay, oldMTDJune, oldMTDJuly, oldMTDAugust, oldMTDSeptember, oldMTDOctober, oldMTDNovember, oldMTDDecember, oldMTDTotal) {

    Highcharts.setOptions({
        colors: ['#DD4B39', '#222D32', '#69acde']
    });

    Highcharts.chart('Baht', {
        chart: {
            renderTo: 'Baht',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 40,
                viewDistance: 25,
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        var type = "M";
                        selectDataTable(nameMonth, month, year, type);
                    }
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        title: {
            text: 'Total Sales : ' + year + ' (Baht)'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
        yAxis: {
            min: 0
        },
        series: [{
            name: 'REM ' + (year - 1),
            data: [{
                y: oldREMJanuary,
                month: 1,
                value: accounting.formatMoney(oldREMJanuary, "฿")
            }, {
                y: oldREMFebruary,
                month: 2,
                value: accounting.formatMoney(oldREMFebruary, "฿")
            }, {
                y: oldREMMarch,
                month: 3,
                value: accounting.formatMoney(oldREMMarch, "฿")
            }, {
                y: oldREMApril,
                month: 4,
                value: accounting.formatMoney(oldREMApril, "฿")
            }, {
                y: oldREMMay,
                month: 5,
                value: accounting.formatMoney(oldREMMay, "฿")
            }, {
                y: oldREMJune,
                month: 6,
                value: accounting.formatMoney(oldREMJune, "฿")
            }, {
                y: oldREMJuly,
                month: 7,
                value: accounting.formatMoney(oldREMJuly, "฿")
            }, {
                y: oldREMAugust,
                month: 8,
                value: accounting.formatMoney(oldREMAugust, "฿")
            }, {
                y: oldREMSeptember,
                month: 9,
                value: accounting.formatMoney(oldREMSeptember, "฿")
            }, {
                y: oldREMOctober,
                month: 10,
                value: accounting.formatMoney(oldREMOctober, "฿")
            }, {
                y: oldREMNovember,
                month: 11,
                value: accounting.formatMoney(oldREMNovember, "฿")
            }, {
                y: oldREMDecember,
                month: 12,
                value: accounting.formatMoney(oldREMDecember, "฿")
            }],
            stack: 'old',
            color: '#ff7666'
        }, {
            name: 'MTD ' + (year - 1),
            data: [{
                y: oldMTDJanuary,
                month: 1,
                value: accounting.formatMoney(oldMTDJanuary, "฿")
            }, {
                y: oldMTDFebruary,
                month: 2,
                value: accounting.formatMoney(oldMTDFebruary, "฿")
            }, {
                y: oldMTDMarch,
                month: 3,
                value: accounting.formatMoney(oldMTDMarch, "฿")
            }, {
                y: oldMTDApril,
                month: 4,
                value: accounting.formatMoney(oldMTDApril, "฿")
            }, {
                y: oldMTDMay,
                month: 5,
                value: accounting.formatMoney(oldMTDMay, "฿")
            }, {
                y: oldMTDJune,
                month: 6,
                value: accounting.formatMoney(oldMTDJune, "฿")
            }, {
                y: oldMTDJuly,
                month: 7,
                value: accounting.formatMoney(oldMTDJuly, "฿")
            }, {
                y: oldMTDAugust,
                month: 8,
                value: accounting.formatMoney(oldMTDAugust, "฿")
            }, {
                y: oldMTDSeptember,
                month: 9,
                value: accounting.formatMoney(oldMTDSeptember, "฿")
            }, {
                y: oldMTDOctober,
                month: 10,
                value: accounting.formatMoney(oldMTDOctober, "฿")
            }, {
                y: oldMTDNovember,
                month: 11,
                value: accounting.formatMoney(oldMTDNovember, "฿")
            }, {
                y: oldMTDDecember,
                month: 12,
                value: accounting.formatMoney(oldMTDDecember, "฿")
            }],
            stack: 'old',
            color: '#737b7e'
        }, {
            name: 'REM ' + year,
            data: [{
                y: currREMJanuary,
                month: 1,
                value: accounting.formatMoney(currREMJanuary, "฿")
            }, {
                y: currREMFebruary,
                month: 2,
                value: accounting.formatMoney(currREMFebruary, "฿")
            }, {
                y: currREMMarch,
                month: 3,
                value: accounting.formatMoney(currREMMarch, "฿")
            }, {
                y: currREMApril,
                month: 4,
                value: accounting.formatMoney(currREMApril, "฿")
            }, {
                y: currREMMay,
                month: 5,
                value: accounting.formatMoney(currREMMay, "฿")
            }, {
                y: currREMJune,
                month: 6,
                value: accounting.formatMoney(currREMJune, "฿")
            }, {
                y: currREMJuly,
                month: 7,
                value: accounting.formatMoney(currREMJuly, "฿")
            }, {
                y: currREMAugust,
                month: 8,
                value: accounting.formatMoney(currREMAugust, "฿")
            }, {
                y: currREMSeptember,
                month: 9,
                value: accounting.formatMoney(currREMSeptember, "฿")
            }, {
                y: currREMOctober,
                month: 10,
                value: accounting.formatMoney(currREMOctober, "฿")
            }, {
                y: currREMNovember,
                month: 11,
                value: accounting.formatMoney(currREMNovember, "฿")
            }, {
                y: currREMDecember,
                month: 12,
                value: accounting.formatMoney(currREMDecember, "฿")
            }],
            stack: 'new',
            color: '#DD4B39'
        }, {
            name: 'MTD ' + year,
            data: [{
                y: currMTDJanuary,
                month: 1,
                value: accounting.formatMoney(currMTDJanuary, "฿")
            }, {
                y: currMTDFebruary,
                month: 2,
                value: accounting.formatMoney(currMTDFebruary, "฿")
            }, {
                y: currMTDMarch,
                month: 3,
                value: accounting.formatMoney(currMTDMarch, "฿")
            }, {
                y: currMTDApril,
                month: 4,
                value: accounting.formatMoney(currMTDApril, "฿")
            }, {
                y: currMTDMay,
                month: 5,
                value: accounting.formatMoney(currMTDMay, "฿")
            }, {
                y: currMTDJune,
                month: 6,
                value: accounting.formatMoney(currMTDJune, "฿")
            }, {
                y: currMTDJuly,
                month: 7,
                value: accounting.formatMoney(currMTDJuly, "฿")
            }, {
                y: currMTDAugust,
                month: 8,
                value: accounting.formatMoney(currMTDAugust, "฿")
            }, {
                y: currMTDSeptember,
                month: 9,
                value: accounting.formatMoney(currMTDSeptember, "฿")
            }, {
                y: currMTDOctober,
                month: 10,
                value: accounting.formatMoney(currMTDOctober, "฿")
            }, {
                y: currMTDNovember,
                month: 11,
                value: accounting.formatMoney(currMTDNovember, "฿")
            }, {
                y: currMTDDecember,
                month: 12,
                value: accounting.formatMoney(currMTDDecember, "฿")
            }],
            stack: 'new',
            color: '#222D32'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetREM1 + targetMTD1,
                month: 1,
                value: accounting.formatMoney(targetREM1 + targetMTD1, "฿")
            }, {
                y: targetREM2 + targetMTD2,
                month: 2,
                value: accounting.formatMoney(targetREM2 + targetMTD2, "฿")
            }, {
                y: targetREM3 + targetMTD3,
                month: 3,
                value: accounting.formatMoney(targetREM3 + targetMTD3, "฿")
            }, {
                y: targetREM4 + targetMTD4,
                month: 4,
                value: accounting.formatMoney(targetREM4 + targetMTD4, "฿")
            }, {
                y: targetREM5 + targetMTD4,
                month: 5,
                value: accounting.formatMoney(targetREM5 + targetMTD4, "฿")
            }, {
                y: targetREM6 + targetMTD6,
                month: 6,
                value: accounting.formatMoney(targetREM6 + targetMTD6, "฿")
            }, {
                y: targetREM7 + targetMTD7,
                month: 7,
                value: accounting.formatMoney(targetREM7 + targetMTD7, "฿")
            }, {
                y: targetREM8 + targetMTD8,
                month: 8,
                value: accounting.formatMoney(targetREM8 + targetMTD8, "฿")
            }, {
                y: targetREM9 + targetMTD9,
                month: 9,
                value: accounting.formatMoney(targetREM9 + targetMTD9, "฿")
            }, {
                y: targetREM10 + targetMTD10,
                month: 10,
                value: accounting.formatMoney(targetREM10 + targetMTD10, "฿")
            }, {
                y: targetREM11 + targetMTD11,
                month: 11,
                value: accounting.formatMoney(targetREM11 + targetMTD11, "฿")
            }, {
                y: targetREM12 + targetMTD12,
                month: 12,
                value: accounting.formatMoney(targetREM12 + targetMTD12, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });

}

function unitGraph(year, targetREM1, targetREM2, targetREM3, targetREM4, targetREM5, targetREM6, targetREM7, targetREM8, targetREM9, targetREM10, targetREM11, targetREM12, targetREMTotal, currREMJanuary, currREMFebruary, currREMMarch, currREMApril, currREMMay, currREMJune, currREMJuly, currREMAugust, currREMSeptember, currREMOctober, currREMNovember, currREMDecember, currREMTotal, oldREMJanuary, oldREMFebruary, oldREMMarch, oldREMApril, oldREMMay, oldREMJune, oldREMJuly, oldREMAugust, oldREMSeptember, oldREMOctober, oldREMNovember, oldREMDecember, oldREMTotal,
    targetMTD1, targetMTD2, targetMTD3, targetMTD4, targetMTD5, targetMTD6, targetMTD7, targetMTD8, targetMTD9, targetMTD10, targetMTD11, targetMTD12, targetMTDTotal, currMTDJanuary, currMTDFebruary, currMTDMarch, currMTDApril, currMTDMay, currMTDJune, currMTDJuly, currMTDAugust, currMTDSeptember, currMTDOctober, currMTDNovember, currMTDDecember, currMTDTotal, oldMTDJanuary, oldMTDFebruary, oldMTDMarch, oldMTDApril, oldMTDMay, oldMTDJune, oldMTDJuly, oldMTDAugust, oldMTDSeptember, oldMTDOctober, oldMTDNovember, oldMTDDecember, oldMTDTotal) {

    Highcharts.setOptions({
        colors: ['#DD4B39', '#222D32', '#69acde']
    });

    Highcharts.chart('Unit', {
        chart: {
            renderTo: 'Unit',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 40,
                viewDistance: 25,
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        var type = "M";
                        selectDataTable(nameMonth, month, year, type);
                    }
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        title: {
            text: 'Total Sales : ' + year + ' (Unit)'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
        yAxis: {
            min: 0
        },
        series: [{
            name: 'REM ' + (year - 1),
            data: [{
                y: oldREMJanuary,
                month: 1,
                value: accounting.formatNumber(oldREMJanuary, "฿")
            }, {
                y: oldREMFebruary,
                month: 2,
                value: accounting.formatNumber(oldREMFebruary, "฿")
            }, {
                y: oldREMMarch,
                month: 3,
                value: accounting.formatNumber(oldREMMarch, "฿")
            }, {
                y: oldREMApril,
                month: 4,
                value: accounting.formatNumber(oldREMApril, "฿")
            }, {
                y: oldREMMay,
                month: 5,
                value: accounting.formatNumber(oldREMMay, "฿")
            }, {
                y: oldREMJune,
                month: 6,
                value: accounting.formatNumber(oldREMJune, "฿")
            }, {
                y: oldREMJuly,
                month: 7,
                value: accounting.formatNumber(oldREMJuly, "฿")
            }, {
                y: oldREMAugust,
                month: 8,
                value: accounting.formatNumber(oldREMAugust, "฿")
            }, {
                y: oldREMSeptember,
                month: 9,
                value: accounting.formatNumber(oldREMSeptember, "฿")
            }, {
                y: oldREMOctober,
                month: 10,
                value: accounting.formatNumber(oldREMOctober, "฿")
            }, {
                y: oldREMNovember,
                month: 11,
                value: accounting.formatNumber(oldREMNovember, "฿")
            }, {
                y: oldREMDecember,
                month: 12,
                value: accounting.formatNumber(oldREMDecember, "฿")
            }],
            stack: 'old',
            color: '#ff7666'
        }, {
            name: 'MTD ' + (year - 1),
            data: [{
                y: oldMTDJanuary,
                month: 1,
                value: accounting.formatNumber(oldMTDJanuary, "฿")
            }, {
                y: oldMTDFebruary,
                month: 2,
                value: accounting.formatNumber(oldMTDFebruary, "฿")
            }, {
                y: oldMTDMarch,
                month: 3,
                value: accounting.formatNumber(oldMTDMarch, "฿")
            }, {
                y: oldMTDApril,
                month: 4,
                value: accounting.formatNumber(oldMTDApril, "฿")
            }, {
                y: oldMTDMay,
                month: 5,
                value: accounting.formatNumber(oldMTDMay, "฿")
            }, {
                y: oldMTDJune,
                month: 6,
                value: accounting.formatNumber(oldMTDJune, "฿")
            }, {
                y: oldMTDJuly,
                month: 7,
                value: accounting.formatNumber(oldMTDJuly, "฿")
            }, {
                y: oldMTDAugust,
                month: 8,
                value: accounting.formatNumber(oldMTDAugust, "฿")
            }, {
                y: oldMTDSeptember,
                month: 9,
                value: accounting.formatNumber(oldMTDSeptember, "฿")
            }, {
                y: oldMTDOctober,
                month: 10,
                value: accounting.formatNumber(oldMTDOctober, "฿")
            }, {
                y: oldMTDNovember,
                month: 11,
                value: accounting.formatNumber(oldMTDNovember, "฿")
            }, {
                y: oldMTDDecember,
                month: 12,
                value: accounting.formatNumber(oldMTDDecember, "฿")
            }],
            stack: 'old',
            color: '#737b7e'
        }, {
            name: 'REM ' + year,
            data: [{
                y: currREMJanuary,
                month: 1,
                value: accounting.formatNumber(currREMJanuary, "฿")
            }, {
                y: currREMFebruary,
                month: 2,
                value: accounting.formatNumber(currREMFebruary, "฿")
            }, {
                y: currREMMarch,
                month: 3,
                value: accounting.formatNumber(currREMMarch, "฿")
            }, {
                y: currREMApril,
                month: 4,
                value: accounting.formatNumber(currREMApril, "฿")
            }, {
                y: currREMMay,
                month: 5,
                value: accounting.formatNumber(currREMMay, "฿")
            }, {
                y: currREMJune,
                month: 6,
                value: accounting.formatNumber(currREMJune, "฿")
            }, {
                y: currREMJuly,
                month: 7,
                value: accounting.formatNumber(currREMJuly, "฿")
            }, {
                y: currREMAugust,
                month: 8,
                value: accounting.formatNumber(currREMAugust, "฿")
            }, {
                y: currREMSeptember,
                month: 9,
                value: accounting.formatNumber(currREMSeptember, "฿")
            }, {
                y: currREMOctober,
                month: 10,
                value: accounting.formatNumber(currREMOctober, "฿")
            }, {
                y: currREMNovember,
                month: 11,
                value: accounting.formatNumber(currREMNovember, "฿")
            }, {
                y: currREMDecember,
                month: 12,
                value: accounting.formatNumber(currREMDecember, "฿")
            }],
            stack: 'new',
            color: '#DD4B39'
        }, {
            name: 'MTD ' + year,
            data: [{
                y: currMTDJanuary,
                month: 1,
                value: accounting.formatNumber(currMTDJanuary, "฿")
            }, {
                y: currMTDFebruary,
                month: 2,
                value: accounting.formatNumber(currMTDFebruary, "฿")
            }, {
                y: currMTDMarch,
                month: 3,
                value: accounting.formatNumber(currMTDMarch, "฿")
            }, {
                y: currMTDApril,
                month: 4,
                value: accounting.formatNumber(currMTDApril, "฿")
            }, {
                y: currMTDMay,
                month: 5,
                value: accounting.formatNumber(currMTDMay, "฿")
            }, {
                y: currMTDJune,
                month: 6,
                value: accounting.formatNumber(currMTDJune, "฿")
            }, {
                y: currMTDJuly,
                month: 7,
                value: accounting.formatNumber(currMTDJuly, "฿")
            }, {
                y: currMTDAugust,
                month: 8,
                value: accounting.formatNumber(currMTDAugust, "฿")
            }, {
                y: currMTDSeptember,
                month: 9,
                value: accounting.formatNumber(currMTDSeptember, "฿")
            }, {
                y: currMTDOctober,
                month: 10,
                value: accounting.formatNumber(currMTDOctober, "฿")
            }, {
                y: currMTDNovember,
                month: 11,
                value: accounting.formatNumber(currMTDNovember, "฿")
            }, {
                y: currMTDDecember,
                month: 12,
                value: accounting.formatNumber(currMTDDecember, "฿")
            }],
            stack: 'new',
            color: '#222D32'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetREM1 + targetMTD1,
                month: 1,
                value: accounting.formatNumber(targetREM1 + targetMTD1, "฿")
            }, {
                y: targetREM2 + targetMTD2,
                month: 2,
                value: accounting.formatNumber(targetREM2 + targetMTD2, "฿")
            }, {
                y: targetREM3 + targetMTD3,
                month: 3,
                value: accounting.formatNumber(targetREM3 + targetMTD3, "฿")
            }, {
                y: targetREM4 + targetMTD4,
                month: 4,
                value: accounting.formatNumber(targetREM4 + targetMTD4, "฿")
            }, {
                y: targetREM5 + targetMTD4,
                month: 5,
                value: accounting.formatNumber(targetREM5 + targetMTD4, "฿")
            }, {
                y: targetREM6 + targetMTD6,
                month: 6,
                value: accounting.formatNumber(targetREM6 + targetMTD6, "฿")
            }, {
                y: targetREM7 + targetMTD7,
                month: 7,
                value: accounting.formatNumber(targetREM7 + targetMTD7, "฿")
            }, {
                y: targetREM8 + targetMTD8,
                month: 8,
                value: accounting.formatNumber(targetREM8 + targetMTD8, "฿")
            }, {
                y: targetREM9 + targetMTD9,
                month: 9,
                value: accounting.formatNumber(targetREM9 + targetMTD9, "฿")
            }, {
                y: targetREM10 + targetMTD10,
                month: 10,
                value: accounting.formatNumber(targetREM10 + targetMTD10, "฿")
            }, {
                y: targetREM11 + targetMTD11,
                month: 11,
                value: accounting.formatNumber(targetREM11 + targetMTD11, "฿")
            }, {
                y: targetREM12 + targetMTD12,
                month: 12,
                value: accounting.formatNumber(targetREM12 + targetMTD12, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });

}

function bahtYSD(year, BPerREM, BPerMTD, REMBahtResult, MTDBahtResult) {

    // Create the chart
    $('#bahtYSD').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'BAHT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                    name: 'REM',
                    code: 'REM',
                    y: BPerREM,
                    value: accounting.formatMoney(REMBahtResult, "฿")
                },
                {
                    name: 'MTD',
                    code: 'MTD',
                    y: BPerMTD,
                    value: accounting.formatMoney(MTDBahtResult, "฿")
                }
            ]
        }]
    })
}

function unitYSD(year, UPerREM, UPerMTD, REMUnitResult, MTDUnitResult) {

    // Create the chart
    $('#unitYSD').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'UNIT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                    name: 'REM',
                    code: 'REM',
                    y: UPerREM,
                    value: accounting.formatNumber(REMUnitResult)
                },
                {
                    name: 'MTD',
                    code: 'MTD',
                    y: UPerMTD,
                    value: accounting.formatNumber(MTDUnitResult)
                }
            ]
        }]
    })
}

function bahtYSD2(year, BPerREM, BPerMTD, REMBahtResult, MTDBahtResult) {

    // Create the chart
    $('#bahtYSD2').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'BAHT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                    name: 'REM',
                    code: 'REM',
                    y: BPerREM,
                    value: accounting.formatMoney(REMBahtResult, "฿")
                },
                {
                    name: 'MTD',
                    code: 'MTD',
                    y: BPerMTD,
                    value: accounting.formatMoney(MTDBahtResult, "฿")
                }
            ]
        }]
    })
}

function unitYSD2(year, UPerREM, UPerMTD, REMUnitResult, MTDUnitResult) {

    // Create the chart
    $('#unitYSD2').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'UNIT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                    name: 'REM',
                    code: 'REM',
                    y: UPerREM,
                    value: accounting.formatNumber(REMUnitResult)
                },
                {
                    name: 'MTD',
                    code: 'MTD',
                    y: UPerMTD,
                    value: accounting.formatNumber(MTDUnitResult)
                }
            ]
        }]
    })
}

function bahtYSD3(year, BPerMTD, MTDBahtResult) {

    // Create the chart
    $('#bahtYSD3').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'BAHT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                name: 'MTD',
                code: 'MTD',
                y: BPerMTD,
                value: accounting.formatMoney(MTDBahtResult, "฿")
            }]
        }]
    })
}

function unitYSD3(year, UPerMTD, MTDUnitResult) {

    // Create the chart
    $('#unitYSD3').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'UNIT'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                events: {

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                name: 'MTD',
                code: 'MTD',
                y: UPerMTD,
                value: accounting.formatNumber(MTDUnitResult)
            }]
        }]
    })
}