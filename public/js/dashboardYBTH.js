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
    $('#headModal4').text("Total Sales " + year + " : NP");
    $('#headModal5').text("Total Sales " + year + " : EB");
    $('#headModal6').text("Total Sales " + year + " : IND");
    $('#headModal7').text("Total Sales " + year + " : OTH");
    $('#BahtYearOld').text(year - 1);
    $('#UnitYearOld').text(year - 1);
    $('#ambBahtYearOld').text(year - 1);
    $('#ambUnitYearOld').text(year - 1);
    $('#mcbBahtYearOld').text(year - 1);
    $('#mcbUnitYearOld').text(year - 1);
    $('#npBahtYearOld').text(year - 1);
    $('#npUnitYearOld').text(year - 1);
    $('#ebBahtYearOld').text(year - 1);
    $('#ebUnitYearOld').text(year - 1);
    $('#indBahtYearOld').text(year - 1);
    $('#indUnitYearOld').text(year - 1);
    $('#othBahtYearOld').text(year - 1);
    $('#othUnitYearOld').text(year - 1);

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
        $('#npBahtYearOld').text(currYear - 1);
        $('#npUnitYearOld').text(currYear - 1);
        $('#ebBahtYearOld').text(currYear - 1);
        $('#ebUnitYearOld').text(currYear - 1);
        $('#indBahtYearOld').text(currYear - 1);
        $('#indUnitYearOld').text(currYear - 1);
        $('#othBahtYearOld').text(currYear - 1);
        $('#othUnitYearOld').text(currYear - 1);
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

    $("#F").click(function() {
        $("#modal-npTotalSales").modal("toggle");
    });

    $("#G").click(function() {
        $("#modal-ebTotalSales").modal("toggle");
    });

    $("#H").click(function() {
        $("#modal-indTotalSales").modal("toggle");
    });

    $("#I").click(function() {
        $("#modal-othTotalSales").modal("toggle");
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
        url: 'selectYBTH',
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

function calData(year, data) {

    var currYear = data[0];
    var oldYear = data[1];
    var targetOEM = data[2];
    var targetSPD = data[3];
    var targetEXP = data[4];
    var targetOEX = data[5];


    var groupedOEMItem = _.groupBy(targetOEM, function(targetOEM) {
        return targetOEM.ItemGroup;
    });
    var targetOEMAMB = groupedOEMItem.AMB[0];
    var targetOEMMCB = groupedOEMItem.MCB[0];

    var groupedSPDItem = _.groupBy(targetSPD, function(targetSPD) {
        return targetSPD.ItemGroup;
    });
    var targetSPDNP = groupedSPDItem.NP[0];
    var targetSPDEB = groupedSPDItem.EB[0];
    var targetSPDIND = groupedSPDItem.IND[0];
    var targetSPDOTH = groupedSPDItem.Retifier[0];

    var groupedEXPItem = _.groupBy(targetEXP, function(targetEXP) {
        return targetEXP.ItemGroup;
    });
    var targetEXPAMB = groupedEXPItem.AMB[0];
    var targetEXPMCB = groupedEXPItem.MCB[0];

    var groupedOEXItem = _.groupBy(targetOEX, function(targetOEX) {
        return targetOEX.ItemGroup;
    });
    var targetOEXAMB = groupedOEXItem.AMB[0];
    var targetOEXMCB = groupedOEXItem.MCB[0];

    var topEXPProduct = data[6];
    var topSPDProduct = data[7];
    var topOEMProduct = data[8];
    var topOEXProduct = data[9];
    var topEXPCustomer = data[10];
    var topSPDCustomer = data[11];
    var topOEMCustomer = data[12];
    var topOEXCustomer = data[13];

    var currEXPAMBTotalBaht = 0,
        currEXPAMBTotalUnit = 0,
        currEXPMCBTotalBaht = 0,
        currEXPMCBTotalUnit = 0,
        currOEMAMBTotalBaht = 0,
        currOEMAMBTotalUnit = 0,
        currOEMMCBTotalBaht = 0,
        currOEMMCBTotalUnit = 0,
        currOEXAMBTotalBaht = 0,
        currOEXAMBTotalUnit = 0,
        currOEXMCBTotalBaht = 0,
        currOEXMCBTotalUnit = 0,
        currSPDNPTotalBaht = 0,
        currSPDNPTotalUnit = 0,
        currSPDEBTotalBaht = 0,
        currSPDEBTotalUnit = 0,
        currSPDINDTotalBaht = 0,
        currSPDINDTotalUnit = 0,
        currSPDOTHTotalBaht = 0,
        currSPDOTHTotalUnit = 0,

        oldEXPAMBTotalBaht = 0,
        oldEXPAMBTotalUnit = 0,
        oldEXPMCBTotalBaht = 0,
        oldEXPMCBTotalUnit = 0,
        oldOEMAMBTotalBaht = 0,
        oldOEMAMBTotalUnit = 0,
        oldOEMMCBTotalBaht = 0,
        oldOEMMCBTotalUnit = 0,
        oldOEXAMBTotalBaht = 0,
        oldOEXAMBTotalUnit = 0,
        oldOEXMCBTotalBaht = 0,
        oldOEXMCBTotalUnit = 0,
        oldSPDNPTotalBaht = 0,
        oldSPDNPTotalUnit = 0,
        oldSPDEBTotalBaht = 0,
        oldSPDEBTotalUnit = 0,
        oldSPDINDTotalBaht = 0,
        oldSPDINDTotalUnit = 0,
        oldSPDOTHTotalBaht = 0,
        oldSPDOTHTotalUnit = 0,

        currEXPTotalBaht = 0,
        currEXPTotalUnit = 0,
        oldEXPTotalBaht = 0,
        oldEXPTotalUnit = 0,
        currEXPUnitJanuary = 0,
        currEXPUnitFebruary = 0,
        currEXPUnitMarch = 0,
        currEXPUnitApril = 0,
        currEXPUnitMay = 0,
        currEXPUnitJune = 0,
        currEXPUnitJuly = 0,
        currEXPUnitAugust = 0,
        currEXPUnitSeptember = 0,
        currEXPUnitOctober = 0,
        currEXPUnitNovember = 0,
        currEXPUnitDecember = 0,
        currEXPBahtJanuary = 0,
        currEXPBahtFebruary = 0,
        currEXPBahtMarch = 0,
        currEXPBahtApril = 0,
        currEXPBahtMay = 0,
        currEXPBahtJune = 0,
        currEXPBahtJuly = 0,
        currEXPBahtAugust = 0,
        currEXPBahtSeptember = 0,
        currEXPBahtOctober = 0,
        currEXPBahtNovember = 0,
        currEXPBahtDecember = 0,
        currEXPUnitQ1 = 0,
        currEXPBahtQ1 = 0,
        currEXPUnitQ2 = 0,
        currEXPBahtQ2 = 0,
        currEXPUnitQ3 = 0,
        currEXPBahtQ3 = 0,
        currEXPUnitQ4 = 0,
        currEXPBahtQ4 = 0,
        oldEXPUnitJanuary = 0,
        oldEXPUnitFebruary = 0,
        oldEXPUnitMarch = 0,
        oldEXPUnitApril = 0,
        oldEXPUnitMay = 0,
        oldEXPUnitJune = 0,
        oldEXPUnitJuly = 0,
        oldEXPUnitAugust = 0,
        oldEXPUnitSeptember = 0,
        oldEXPUnitOctober = 0,
        oldEXPUnitNovember = 0,
        oldEXPUnitDecember = 0,
        oldEXPBahtJanuary = 0,
        oldEXPBahtFebruary = 0,
        oldEXPBahtMarch = 0,
        oldEXPBahtApril = 0,
        oldEXPBahtMay = 0,
        oldEXPBahtJune = 0,
        oldEXPBahtJuly = 0,
        oldEXPBahtAugust = 0,
        oldEXPBahtSeptember = 0,
        oldEXPBahtOctober = 0,
        oldEXPBahtNovember = 0,
        oldEXPBahtDecember = 0,
        oldEXPUnitQ1 = 0,
        oldEXPBahtQ1 = 0,
        oldEXPUnitQ2 = 0,
        oldEXPBahtQ2 = 0,
        oldEXPUnitQ3 = 0,
        oldEXPBahtQ3 = 0,
        oldEXPUnitQ4 = 0,
        oldEXPBahtQ4 = 0,
        achieveEXPBahtJanuary = 0,
        achieveEXPBahtFebruary = 0,
        achieveEXPBahtMarch = 0,
        achieveEXPBahtApril = 0,
        achieveEXPBahtMay = 0,
        achieveEXPBahtJune = 0,
        achieveEXPBahtJuly = 0,
        achieveEXPBahtAugust = 0,
        achieveEXPBahtSeptember = 0,
        achieveEXPBahtOctober = 0,
        achieveEXPBahtNovember = 0,
        achieveEXPBahtDecember = 0,
        achieveEXPBahtQ1 = 0,
        achieveEXPUnitQ1 = 0,
        achieveEXPBahtQ2 = 0,
        achieveEXPUnitQ2 = 0,
        achieveEXPBahtQ3 = 0,
        achieveEXPUnitQ3 = 0,
        achieveEXPBahtQ4 = 0,
        achieveEXPUnitQ4 = 0,
        growthEXPBahtJanuary = 0,
        growthEXPBahtFebruary = 0,
        growthEXPBahtMarch = 0,
        growthEXPBahtApril = 0,
        growthEXPBahtMay = 0,
        growthEXPBahtJune = 0,
        growthEXPBahtJuly = 0,
        growthEXPBahtAugust = 0,
        growthEXPBahtSeptember = 0,
        growthEXPBahtOctober = 0,
        growthEXPBahtNovember = 0,
        growthEXPBahtDecember = 0,
        achieveEXPUnitJanuary = 0,
        achieveEXPUnitFebruary = 0,
        achieveEXPUnitMarch = 0,
        achieveEXPUnitApril = 0,
        achieveEXPUnitMay = 0,
        achieveEXPUnitJune = 0,
        achieveEXPUnitJuly = 0,
        achieveEXPUnitAugust = 0,
        achieveEXPUnitSeptember = 0,
        achieveEXPUnitOctober = 0,
        achieveEXPUnitNovember = 0,
        achieveEXPUnitDecember = 0,
        growthEXPUnitJanuary = 0,
        growthEXPUnitFebruary = 0,
        growthEXPUnitMarch = 0,
        growthEXPUnitApril = 0,
        growthEXPUnitMay = 0,
        growthEXPUnitJune = 0,
        growthEXPUnitJuly = 0,
        growthEXPUnitAugust = 0,
        growthEXPUnitSeptember = 0,
        growthEXPUnitOctober = 0,
        growthEXPUnitNovember = 0,
        growthEXPUnitDecember = 0,
        growthEXPBahtQ1 = 0,
        growthEXPUnitQ1 = 0,
        growthEXPBahtQ2 = 0,
        growthEXPUnitQ2 = 0,
        growthEXPBahtQ3 = 0,
        growthEXPUnitQ3 = 0,
        growthEXPBahtQ4 = 0,
        growthEXPUnitQ4 = 0,
        currOEMTotalBaht = 0,
        currOEMTotalUnit = 0,
        oldOEMTotalBaht = 0,
        oldOEMTotalUnit = 0,
        currOEMUnitJanuary = 0,
        currOEMUnitFebruary = 0,
        currOEMUnitMarch = 0,
        currOEMUnitApril = 0,
        currOEMUnitMay = 0,
        currOEMUnitJune = 0,
        currOEMUnitJuly = 0,
        currOEMUnitAugust = 0,
        currOEMUnitSeptember = 0,
        currOEMUnitOctober = 0,
        currOEMUnitNovember = 0,
        currOEMUnitDecember = 0,
        currOEMBahtJanuary = 0,
        currOEMBahtFebruary = 0,
        currOEMBahtMarch = 0,
        currOEMBahtApril = 0,
        currOEMBahtMay = 0,
        currOEMBahtJune = 0,
        currOEMBahtJuly = 0,
        currOEMBahtAugust = 0,
        currOEMBahtSeptember = 0,
        currOEMBahtOctober = 0,
        currOEMBahtNovember = 0,
        currOEMBahtDecember = 0,
        currOEMUnitQ1 = 0,
        currOEMBahtQ1 = 0,
        currOEMUnitQ2 = 0,
        currOEMBahtQ2 = 0,
        currOEMUnitQ3 = 0,
        currOEMBahtQ3 = 0,
        currOEMUnitQ4 = 0,
        currOEMBahtQ4 = 0,
        oldOEMUnitJanuary = 0,
        oldOEMUnitFebruary = 0,
        oldOEMUnitMarch = 0,
        oldOEMUnitApril = 0,
        oldOEMUnitMay = 0,
        oldOEMUnitJune = 0,
        oldOEMUnitJuly = 0,
        oldOEMUnitAugust = 0,
        oldOEMUnitSeptember = 0,
        oldOEMUnitOctober = 0,
        oldOEMUnitNovember = 0,
        oldOEMUnitDecember = 0,
        oldOEMBahtJanuary = 0,
        oldOEMBahtFebruary = 0,
        oldOEMBahtMarch = 0,
        oldOEMBahtApril = 0,
        oldOEMBahtMay = 0,
        oldOEMBahtJune = 0,
        oldOEMBahtJuly = 0,
        oldOEMBahtAugust = 0,
        oldOEMBahtSeptember = 0,
        oldOEMBahtOctober = 0,
        oldOEMBahtNovember = 0,
        oldOEMBahtDecember = 0,
        oldOEMUnitQ1 = 0,
        oldOEMBahtQ1 = 0,
        oldOEMUnitQ2 = 0,
        oldOEMBahtQ2 = 0,
        oldOEMUnitQ3 = 0,
        oldOEMBahtQ3 = 0,
        oldOEMUnitQ4 = 0,
        oldOEMBahtQ4 = 0,
        achieveOEMBahtJanuary = 0,
        achieveOEMBahtFebruary = 0,
        achieveOEMBahtMarch = 0,
        achieveOEMBahtApril = 0,
        achieveOEMBahtMay = 0,
        achieveOEMBahtJune = 0,
        achieveOEMBahtJuly = 0,
        achieveOEMBahtAugust = 0,
        achieveOEMBahtSeptember = 0,
        achieveOEMBahtOctober = 0,
        achieveOEMBahtNovember = 0,
        achieveOEMBahtDecember = 0,
        achieveOEMBahtQ1 = 0,
        achieveOEMUnitQ1 = 0,
        achieveOEMBahtQ2 = 0,
        achieveOEMUnitQ2 = 0,
        achieveOEMBahtQ3 = 0,
        achieveOEMUnitQ3 = 0,
        achieveOEMBahtQ4 = 0,
        achieveOEMUnitQ4 = 0,
        growthOEMBahtJanuary = 0,
        growthOEMBahtFebruary = 0,
        growthOEMBahtMarch = 0,
        growthOEMBahtApril = 0,
        growthOEMBahtMay = 0,
        growthOEMBahtJune = 0,
        growthOEMBahtJuly = 0,
        growthOEMBahtAugust = 0,
        growthOEMBahtSeptember = 0,
        growthOEMBahtOctober = 0,
        growthOEMBahtNovember = 0,
        growthOEMBahtDecember = 0,
        achieveOEMUnitJanuary = 0,
        achieveOEMUnitFebruary = 0,
        achieveOEMUnitMarch = 0,
        achieveOEMUnitApril = 0,
        achieveOEMUnitMay = 0,
        achieveOEMUnitJune = 0,
        achieveOEMUnitJuly = 0,
        achieveOEMUnitAugust = 0,
        achieveOEMUnitSeptember = 0,
        achieveOEMUnitOctober = 0,
        achieveOEMUnitNovember = 0,
        achieveOEMUnitDecember = 0,
        growthOEMUnitJanuary = 0,
        growthOEMUnitFebruary = 0,
        growthOEMUnitMarch = 0,
        growthOEMUnitApril = 0,
        growthOEMUnitMay = 0,
        growthOEMUnitJune = 0,
        growthOEMUnitJuly = 0,
        growthOEMUnitAugust = 0,
        growthOEMUnitSeptember = 0,
        growthOEMUnitOctober = 0,
        growthOEMUnitNovember = 0,
        growthOEMUnitDecember = 0,
        growthOEMBahtQ1 = 0,
        growthOEMUnitQ1 = 0,
        growthOEMBahtQ2 = 0,
        growthOEMUnitQ2 = 0,
        growthOEMBahtQ3 = 0,
        growthOEMUnitQ3 = 0,
        growthOEMBahtQ4 = 0,
        growthOEMUnitQ4 = 0,
        currOEXTotalBaht = 0,
        currOEXTotalUnit = 0,
        oldOEXTotalBaht = 0,
        oldOEXTotalUnit = 0,
        currOEXUnitJanuary = 0,
        currOEXUnitFebruary = 0,
        currOEXUnitMarch = 0,
        currOEXUnitApril = 0,
        currOEXUnitMay = 0,
        currOEXUnitJune = 0,
        currOEXUnitJuly = 0,
        currOEXUnitAugust = 0,
        currOEXUnitSeptember = 0,
        currOEXUnitOctober = 0,
        currOEXUnitNovember = 0,
        currOEXUnitDecember = 0,
        currOEXBahtJanuary = 0,
        currOEXBahtFebruary = 0,
        currOEXBahtMarch = 0,
        currOEXBahtApril = 0,
        currOEXBahtMay = 0,
        currOEXBahtJune = 0,
        currOEXBahtJuly = 0,
        currOEXBahtAugust = 0,
        currOEXBahtSeptember = 0,
        currOEXBahtOctober = 0,
        currOEXBahtNovember = 0,
        currOEXBahtDecember = 0,
        currOEXUnitQ1 = 0,
        currOEXBahtQ1 = 0,
        currOEXUnitQ2 = 0,
        currOEXBahtQ2 = 0,
        currOEXUnitQ3 = 0,
        currOEXBahtQ3 = 0,
        currOEXUnitQ4 = 0,
        currOEXBahtQ4 = 0,
        oldOEXUnitJanuary = 0,
        oldOEXUnitFebruary = 0,
        oldOEXUnitMarch = 0,
        oldOEXUnitApril = 0,
        oldOEXUnitMay = 0,
        oldOEXUnitJune = 0,
        oldOEXUnitJuly = 0,
        oldOEXUnitAugust = 0,
        oldOEXUnitSeptember = 0,
        oldOEXUnitOctober = 0,
        oldOEXUnitNovember = 0,
        oldOEXUnitDecember = 0,
        oldOEXBahtJanuary = 0,
        oldOEXBahtFebruary = 0,
        oldOEXBahtMarch = 0,
        oldOEXBahtApril = 0,
        oldOEXBahtMay = 0,
        oldOEXBahtJune = 0,
        oldOEXBahtJuly = 0,
        oldOEXBahtAugust = 0,
        oldOEXBahtSeptember = 0,
        oldOEXBahtOctober = 0,
        oldOEXBahtNovember = 0,
        oldOEXBahtDecember = 0,
        oldOEXUnitQ1 = 0,
        oldOEXBahtQ1 = 0,
        oldOEXUnitQ2 = 0,
        oldOEXBahtQ2 = 0,
        oldOEXUnitQ3 = 0,
        oldOEXBahtQ3 = 0,
        oldOEXUnitQ4 = 0,
        oldOEXBahtQ4 = 0,
        achieveOEXBahtJanuary = 0,
        achieveOEXBahtFebruary = 0,
        achieveOEXBahtMarch = 0,
        achieveOEXBahtApril = 0,
        achieveOEXBahtMay = 0,
        achieveOEXBahtJune = 0,
        achieveOEXBahtJuly = 0,
        achieveOEXBahtAugust = 0,
        achieveOEXBahtSeptember = 0,
        achieveOEXBahtOctober = 0,
        achieveOEXBahtNovember = 0,
        achieveOEXBahtDecember = 0,
        achieveOEXBahtQ1 = 0,
        achieveOEXUnitQ1 = 0,
        achieveOEXBahtQ2 = 0,
        achieveOEXUnitQ2 = 0,
        achieveOEXBahtQ3 = 0,
        achieveOEXUnitQ3 = 0,
        achieveOEXBahtQ4 = 0,
        achieveOEXUnitQ4 = 0,
        growthOEXBahtJanuary = 0,
        growthOEXBahtFebruary = 0,
        growthOEXBahtMarch = 0,
        growthOEXBahtApril = 0,
        growthOEXBahtMay = 0,
        growthOEXBahtJune = 0,
        growthOEXBahtJuly = 0,
        growthOEXBahtAugust = 0,
        growthOEXBahtSeptember = 0,
        growthOEXBahtOctober = 0,
        growthOEXBahtNovember = 0,
        growthOEXBahtDecember = 0,
        achieveOEXUnitJanuary = 0,
        achieveOEXUnitFebruary = 0,
        achieveOEXUnitMarch = 0,
        achieveOEXUnitApril = 0,
        achieveOEXUnitMay = 0,
        achieveOEXUnitJune = 0,
        achieveOEXUnitJuly = 0,
        achieveOEXUnitAugust = 0,
        achieveOEXUnitSeptember = 0,
        achieveOEXUnitOctober = 0,
        achieveOEXUnitNovember = 0,
        achieveOEXUnitDecember = 0,
        growthOEXUnitJanuary = 0,
        growthOEXUnitFebruary = 0,
        growthOEXUnitMarch = 0,
        growthOEXUnitApril = 0,
        growthOEXUnitMay = 0,
        growthOEXUnitJune = 0,
        growthOEXUnitJuly = 0,
        growthOEXUnitAugust = 0,
        growthOEXUnitSeptember = 0,
        growthOEXUnitOctober = 0,
        growthOEXUnitNovember = 0,
        growthOEXUnitDecember = 0,
        growthOEXBahtQ1 = 0,
        growthOEXUnitQ1 = 0,
        growthOEXBahtQ2 = 0,
        growthOEXUnitQ2 = 0,
        growthOEXBahtQ3 = 0,
        growthOEXUnitQ3 = 0,
        growthOEXBahtQ4 = 0,
        growthOEXUnitQ4 = 0,
        currSPDTotalBaht = 0,
        currSPDTotalUnit = 0,
        oldSPDTotalBaht = 0,
        oldSPDTotalUnit = 0,
        currSPDUnitJanuary = 0,
        currSPDUnitFebruary = 0,
        currSPDUnitMarch = 0,
        currSPDUnitApril = 0,
        currSPDUnitMay = 0,
        currSPDUnitJune = 0,
        currSPDUnitJuly = 0,
        currSPDUnitAugust = 0,
        currSPDUnitSeptember = 0,
        currSPDUnitOctober = 0,
        currSPDUnitNovember = 0,
        currSPDUnitDecember = 0,
        currSPDBahtJanuary = 0,
        currSPDBahtFebruary = 0,
        currSPDBahtMarch = 0,
        currSPDBahtApril = 0,
        currSPDBahtMay = 0,
        currSPDBahtJune = 0,
        currSPDBahtJuly = 0,
        currSPDBahtAugust = 0,
        currSPDBahtSeptember = 0,
        currSPDBahtOctober = 0,
        currSPDBahtNovember = 0,
        currSPDBahtDecember = 0,
        currSPDUnitQ1 = 0,
        currSPDBahtQ1 = 0,
        currSPDUnitQ2 = 0,
        currSPDBahtQ2 = 0,
        currSPDUnitQ3 = 0,
        currSPDBahtQ3 = 0,
        currSPDUnitQ4 = 0,
        currSPDBahtQ4 = 0,
        oldSPDUnitJanuary = 0,
        oldSPDUnitFebruary = 0,
        oldSPDUnitMarch = 0,
        oldSPDUnitApril = 0,
        oldSPDUnitMay = 0,
        oldSPDUnitJune = 0,
        oldSPDUnitJuly = 0,
        oldSPDUnitAugust = 0,
        oldSPDUnitSeptember = 0,
        oldSPDUnitOctober = 0,
        oldSPDUnitNovember = 0,
        oldSPDUnitDecember = 0,
        oldSPDBahtJanuary = 0,
        oldSPDBahtFebruary = 0,
        oldSPDBahtMarch = 0,
        oldSPDBahtApril = 0,
        oldSPDBahtMay = 0,
        oldSPDBahtJune = 0,
        oldSPDBahtJuly = 0,
        oldSPDBahtAugust = 0,
        oldSPDBahtSeptember = 0,
        oldSPDBahtOctober = 0,
        oldSPDBahtNovember = 0,
        oldSPDBahtDecember = 0,
        oldSPDUnitQ1 = 0,
        oldSPDBahtQ1 = 0,
        oldSPDUnitQ2 = 0,
        oldSPDBahtQ2 = 0,
        oldSPDUnitQ3 = 0,
        oldSPDBahtQ3 = 0,
        oldSPDUnitQ4 = 0,
        oldSPDBahtQ4 = 0,
        achieveSPDBahtJanuary = 0,
        achieveSPDBahtFebruary = 0,
        achieveSPDBahtMarch = 0,
        achieveSPDBahtApril = 0,
        achieveSPDBahtMay = 0,
        achieveSPDBahtJune = 0,
        achieveSPDBahtJuly = 0,
        achieveSPDBahtAugust = 0,
        achieveSPDBahtSeptember = 0,
        achieveSPDBahtOctober = 0,
        achieveSPDBahtNovember = 0,
        achieveSPDBahtDecember = 0,
        achieveSPDBahtQ1 = 0,
        achieveSPDUnitQ1 = 0,
        achieveSPDBahtQ2 = 0,
        achieveSPDUnitQ2 = 0,
        achieveSPDBahtQ3 = 0,
        achieveSPDUnitQ3 = 0,
        achieveSPDBahtQ4 = 0,
        achieveSPDUnitQ4 = 0,
        growthSPDBahtJanuary = 0,
        growthSPDBahtFebruary = 0,
        growthSPDBahtMarch = 0,
        growthSPDBahtApril = 0,
        growthSPDBahtMay = 0,
        growthSPDBahtJune = 0,
        growthSPDBahtJuly = 0,
        growthSPDBahtAugust = 0,
        growthSPDBahtSeptember = 0,
        growthSPDBahtOctober = 0,
        growthSPDBahtNovember = 0,
        growthSPDBahtDecember = 0,
        achieveSPDUnitJanuary = 0,
        achieveSPDUnitFebruary = 0,
        achieveSPDUnitMarch = 0,
        achieveSPDUnitApril = 0,
        achieveSPDUnitMay = 0,
        achieveSPDUnitJune = 0,
        achieveSPDUnitJuly = 0,
        achieveSPDUnitAugust = 0,
        achieveSPDUnitSeptember = 0,
        achieveSPDUnitOctober = 0,
        achieveSPDUnitNovember = 0,
        achieveSPDUnitDecember = 0,
        growthSPDUnitJanuary = 0,
        growthSPDUnitFebruary = 0,
        growthSPDUnitMarch = 0,
        growthSPDUnitApril = 0,
        growthSPDUnitMay = 0,
        growthSPDUnitJune = 0,
        growthSPDUnitJuly = 0,
        growthSPDUnitAugust = 0,
        growthSPDUnitSeptember = 0,
        growthSPDUnitOctober = 0,
        growthSPDUnitNovember = 0,
        growthSPDUnitDecember = 0,
        growthSPDBahtQ1 = 0,
        growthSPDUnitQ1 = 0,
        growthSPDBahtQ2 = 0,
        growthSPDUnitQ2 = 0,
        growthSPDBahtQ3 = 0,
        growthSPDUnitQ3 = 0,
        growthSPDBahtQ4 = 0,
        growthSPDUnitQ4 = 0,

        currAMBOEMUnitJanuary = 0,
        currAMBOEMUnitFebruary = 0,
        currAMBOEMUnitMarch = 0,
        currAMBOEMUnitApril = 0,
        currAMBOEMUnitMay = 0,
        currAMBOEMUnitJune = 0,
        currAMBOEMUnitJuly = 0,
        currAMBOEMUnitAugust = 0,
        currAMBOEMUnitSeptember = 0,
        currAMBOEMUnitOctober = 0,
        currAMBOEMUnitNovember = 0,
        currAMBOEMUnitDecember = 0,
        currAMBOEMBahtJanuary = 0,
        currAMBOEMBahtFebruary = 0,
        currAMBOEMBahtMarch = 0,
        currAMBOEMBahtApril = 0,
        currAMBOEMBahtMay = 0,
        currAMBOEMBahtJune = 0,
        currAMBOEMBahtJuly = 0,
        currAMBOEMBahtAugust = 0,
        currAMBOEMBahtSeptember = 0,
        currAMBOEMBahtOctober = 0,
        currAMBOEMBahtNovember = 0,
        currAMBOEMBahtDecember = 0,
        currAMBOEXUnitJanuary = 0,
        currAMBOEXUnitFebruary = 0,
        currAMBOEXUnitMarch = 0,
        currAMBOEXUnitApril = 0,
        currAMBOEXUnitMay = 0,
        currAMBOEXUnitJune = 0,
        currAMBOEXUnitJuly = 0,
        currAMBOEXUnitAugust = 0,
        currAMBOEXUnitSeptember = 0,
        currAMBOEXUnitOctober = 0,
        currAMBOEXUnitNovember = 0,
        currAMBOEXUnitDecember = 0,
        currAMBOEXBahtJanuary = 0,
        currAMBOEXBahtFebruary = 0,
        currAMBOEXBahtMarch = 0,
        currAMBOEXBahtApril = 0,
        currAMBOEXBahtMay = 0,
        currAMBOEXBahtJune = 0,
        currAMBOEXBahtJuly = 0,
        currAMBOEXBahtAugust = 0,
        currAMBOEXBahtSeptember = 0,
        currAMBOEXBahtOctober = 0,
        currAMBOEXBahtNovember = 0,
        currAMBOEXBahtDecember = 0,
        currAMBEXPUnitJanuary = 0,
        currAMBEXPUnitFebruary = 0,
        currAMBEXPUnitMarch = 0,
        currAMBEXPUnitApril = 0,
        currAMBEXPUnitMay = 0,
        currAMBEXPUnitJune = 0,
        currAMBEXPUnitJuly = 0,
        currAMBEXPUnitAugust = 0,
        currAMBEXPUnitSeptember = 0,
        currAMBEXPUnitOctober = 0,
        currAMBEXPUnitNovember = 0,
        currAMBEXPUnitDecember = 0,
        currAMBEXPBahtJanuary = 0,
        currAMBEXPBahtFebruary = 0,
        currAMBEXPBahtMarch = 0,
        currAMBEXPBahtApril = 0,
        currAMBEXPBahtMay = 0,
        currAMBEXPBahtJune = 0,
        currAMBEXPBahtJuly = 0,
        currAMBEXPBahtAugust = 0,
        currAMBEXPBahtSeptember = 0,
        currAMBEXPBahtOctober = 0,
        currAMBEXPBahtNovember = 0,
        currAMBEXPBahtDecember = 0,

        currMCBOEMUnitJanuary = 0,
        currMCBOEMUnitFebruary = 0,
        currMCBOEMUnitMarch = 0,
        currMCBOEMUnitApril = 0,
        currMCBOEMUnitMay = 0,
        currMCBOEMUnitJune = 0,
        currMCBOEMUnitJuly = 0,
        currMCBOEMUnitAugust = 0,
        currMCBOEMUnitSeptember = 0,
        currMCBOEMUnitOctober = 0,
        currMCBOEMUnitNovember = 0,
        currMCBOEMUnitDecember = 0,
        currMCBOEMBahtJanuary = 0,
        currMCBOEMBahtFebruary = 0,
        currMCBOEMBahtMarch = 0,
        currMCBOEMBahtApril = 0,
        currMCBOEMBahtMay = 0,
        currMCBOEMBahtJune = 0,
        currMCBOEMBahtJuly = 0,
        currMCBOEMBahtAugust = 0,
        currMCBOEMBahtSeptember = 0,
        currMCBOEMBahtOctober = 0,
        currMCBOEMBahtNovember = 0,
        currMCBOEMBahtDecember = 0,
        currMCBOEXUnitJanuary = 0,
        currMCBOEXUnitFebruary = 0,
        currMCBOEXUnitMarch = 0,
        currMCBOEXUnitApril = 0,
        currMCBOEXUnitMay = 0,
        currMCBOEXUnitJune = 0,
        currMCBOEXUnitJuly = 0,
        currMCBOEXUnitAugust = 0,
        currMCBOEXUnitSeptember = 0,
        currMCBOEXUnitOctober = 0,
        currMCBOEXUnitNovember = 0,
        currMCBOEXUnitDecember = 0,
        currMCBOEXBahtJanuary = 0,
        currMCBOEXBahtFebruary = 0,
        currMCBOEXBahtMarch = 0,
        currMCBOEXBahtApril = 0,
        currMCBOEXBahtMay = 0,
        currMCBOEXBahtJune = 0,
        currMCBOEXBahtJuly = 0,
        currMCBOEXBahtAugust = 0,
        currMCBOEXBahtSeptember = 0,
        currMCBOEXBahtOctober = 0,
        currMCBOEXBahtNovember = 0,
        currMCBOEXBahtDecember = 0,
        currMCBEXPUnitJanuary = 0,
        currMCBEXPUnitFebruary = 0,
        currMCBEXPUnitMarch = 0,
        currMCBEXPUnitApril = 0,
        currMCBEXPUnitMay = 0,
        currMCBEXPUnitJune = 0,
        currMCBEXPUnitJuly = 0,
        currMCBEXPUnitAugust = 0,
        currMCBEXPUnitSeptember = 0,
        currMCBEXPUnitOctober = 0,
        currMCBEXPUnitNovember = 0,
        currMCBEXPUnitDecember = 0,
        currMCBEXPBahtJanuary = 0,
        currMCBEXPBahtFebruary = 0,
        currMCBEXPBahtMarch = 0,
        currMCBEXPBahtApril = 0,
        currMCBEXPBahtMay = 0,
        currMCBEXPBahtJune = 0,
        currMCBEXPBahtJuly = 0,
        currMCBEXPBahtAugust = 0,
        currMCBEXPBahtSeptember = 0,
        currMCBEXPBahtOctober = 0,
        currMCBEXPBahtNovember = 0,
        currMCBEXPBahtDecember = 0,

        currEBEXPUnitJanuary = 0,
        currEBEXPUnitFebruary = 0,
        currEBEXPUnitMarch = 0,
        currEBEXPUnitApril = 0,
        currEBEXPUnitMay = 0,
        currEBEXPUnitJune = 0,
        currEBEXPUnitJuly = 0,
        currEBEXPUnitAugust = 0,
        currEBEXPUnitSeptember = 0,
        currEBEXPUnitOctober = 0,
        currEBEXPUnitNovember = 0,
        currEBEXPUnitDecember = 0,
        currEBEXPBahtJanuary = 0,
        currEBEXPBahtFebruary = 0,
        currEBEXPBahtMarch = 0,
        currEBEXPBahtApril = 0,
        currEBEXPBahtMay = 0,
        currEBEXPBahtJune = 0,
        currEBEXPBahtJuly = 0,
        currEBEXPBahtAugust = 0,
        currEBEXPBahtSeptember = 0,
        currEBEXPBahtOctober = 0,
        currEBEXPBahtNovember = 0,
        currEBEXPBahtDecember = 0,
        currEBSPDUnitJanuary = 0,
        currEBSPDUnitFebruary = 0,
        currEBSPDUnitMarch = 0,
        currEBSPDUnitApril = 0,
        currEBSPDUnitMay = 0,
        currEBSPDUnitJune = 0,
        currEBSPDUnitJuly = 0,
        currEBSPDUnitAugust = 0,
        currEBSPDUnitSeptember = 0,
        currEBSPDUnitOctober = 0,
        currEBSPDUnitNovember = 0,
        currEBSPDUnitDecember = 0,
        currEBSPDBahtJanuary = 0,
        currEBSPDBahtFebruary = 0,
        currEBSPDBahtMarch = 0,
        currEBSPDBahtApril = 0,
        currEBSPDBahtMay = 0,
        currEBSPDBahtJune = 0,
        currEBSPDBahtJuly = 0,
        currEBSPDBahtAugust = 0,
        currEBSPDBahtSeptember = 0,
        currEBSPDBahtOctober = 0,
        currEBSPDBahtNovember = 0,
        currEBSPDBahtDecember = 0,

        currNPSPDUnitJanuary = 0,
        currNPSPDUnitFebruary = 0,
        currNPSPDUnitMarch = 0,
        currNPSPDUnitApril = 0,
        currNPSPDUnitMay = 0,
        currNPSPDUnitJune = 0,
        currNPSPDUnitJuly = 0,
        currNPSPDUnitAugust = 0,
        currNPSPDUnitSeptember = 0,
        currNPSPDUnitOctober = 0,
        currNPSPDUnitNovember = 0,
        currNPSPDUnitDecember = 0,
        currNPSPDBahtJanuary = 0,
        currNPSPDBahtFebruary = 0,
        currNPSPDBahtMarch = 0,
        currNPSPDBahtApril = 0,
        currNPSPDBahtMay = 0,
        currNPSPDBahtJune = 0,
        currNPSPDBahtJuly = 0,
        currNPSPDBahtAugust = 0,
        currNPSPDBahtSeptember = 0,
        currNPSPDBahtOctober = 0,
        currNPSPDBahtNovember = 0,
        currNPSPDBahtDecember = 0,

        currINDSPDUnitJanuary = 0,
        currINDSPDUnitFebruary = 0,
        currINDSPDUnitMarch = 0,
        currINDSPDUnitApril = 0,
        currINDSPDUnitMay = 0,
        currINDSPDUnitJune = 0,
        currINDSPDUnitJuly = 0,
        currINDSPDUnitAugust = 0,
        currINDSPDUnitSeptember = 0,
        currINDSPDUnitOctober = 0,
        currINDSPDUnitNovember = 0,
        currINDSPDUnitDecember = 0,
        currINDSPDBahtJanuary = 0,
        currINDSPDBahtFebruary = 0,
        currINDSPDBahtMarch = 0,
        currINDSPDBahtApril = 0,
        currINDSPDBahtMay = 0,
        currINDSPDBahtJune = 0,
        currINDSPDBahtJuly = 0,
        currINDSPDBahtAugust = 0,
        currINDSPDBahtSeptember = 0,
        currINDSPDBahtOctober = 0,
        currINDSPDBahtNovember = 0,
        currINDSPDBahtDecember = 0,

        currOTHSPDUnitJanuary = 0,
        currOTHSPDUnitFebruary = 0,
        currOTHSPDUnitMarch = 0,
        currOTHSPDUnitApril = 0,
        currOTHSPDUnitMay = 0,
        currOTHSPDUnitJune = 0,
        currOTHSPDUnitJuly = 0,
        currOTHSPDUnitAugust = 0,
        currOTHSPDUnitSeptember = 0,
        currOTHSPDUnitOctober = 0,
        currOTHSPDUnitNovember = 0,
        currOTHSPDUnitDecember = 0,
        currOTHSPDBahtJanuary = 0,
        currOTHSPDBahtFebruary = 0,
        currOTHSPDBahtMarch = 0,
        currOTHSPDBahtApril = 0,
        currOTHSPDBahtMay = 0,
        currOTHSPDBahtJune = 0,
        currOTHSPDBahtJuly = 0,
        currOTHSPDBahtAugust = 0,
        currOTHSPDBahtSeptember = 0,
        currOTHSPDBahtOctober = 0,
        currOTHSPDBahtNovember = 0,
        currOTHSPDBahtDecember = 0,

        currAMBTotalBaht = 0,
        currAMBTotalUnit = 0,
        currMCBTotalBaht = 0,
        currMCBTotalUnit = 0,
        currEBTotalBaht = 0,
        currEBTotalUnit = 0,
        currNPTotalBaht = 0,
        currNPTotalUnit = 0,
        currINDTotalBaht = 0,
        currINDTotalUnit = 0,
        currOTHTotalBaht = 0,
        currOTHTotalUnit = 0,

        oldAMBOEMUnitJanuary = 0,
        oldAMBOEMUnitFebruary = 0,
        oldAMBOEMUnitMarch = 0,
        oldAMBOEMUnitApril = 0,
        oldAMBOEMUnitMay = 0,
        oldAMBOEMUnitJune = 0,
        oldAMBOEMUnitJuly = 0,
        oldAMBOEMUnitAugust = 0,
        oldAMBOEMUnitSeptember = 0,
        oldAMBOEMUnitOctober = 0,
        oldAMBOEMUnitNovember = 0,
        oldAMBOEMUnitDecember = 0,
        oldAMBOEMBahtJanuary = 0,
        oldAMBOEMBahtFebruary = 0,
        oldAMBOEMBahtMarch = 0,
        oldAMBOEMBahtApril = 0,
        oldAMBOEMBahtMay = 0,
        oldAMBOEMBahtJune = 0,
        oldAMBOEMBahtJuly = 0,
        oldAMBOEMBahtAugust = 0,
        oldAMBOEMBahtSeptember = 0,
        oldAMBOEMBahtOctober = 0,
        oldAMBOEMBahtNovember = 0,
        oldAMBOEMBahtDecember = 0,
        oldAMBOEXUnitJanuary = 0,
        oldAMBOEXUnitFebruary = 0,
        oldAMBOEXUnitMarch = 0,
        oldAMBOEXUnitApril = 0,
        oldAMBOEXUnitMay = 0,
        oldAMBOEXUnitJune = 0,
        oldAMBOEXUnitJuly = 0,
        oldAMBOEXUnitAugust = 0,
        oldAMBOEXUnitSeptember = 0,
        oldAMBOEXUnitOctober = 0,
        oldAMBOEXUnitNovember = 0,
        oldAMBOEXUnitDecember = 0,
        oldAMBOEXBahtJanuary = 0,
        oldAMBOEXBahtFebruary = 0,
        oldAMBOEXBahtMarch = 0,
        oldAMBOEXBahtApril = 0,
        oldAMBOEXBahtMay = 0,
        oldAMBOEXBahtJune = 0,
        oldAMBOEXBahtJuly = 0,
        oldAMBOEXBahtAugust = 0,
        oldAMBOEXBahtSeptember = 0,
        oldAMBOEXBahtOctober = 0,
        oldAMBOEXBahtNovember = 0,
        oldAMBOEXBahtDecember = 0,
        oldAMBEXPUnitJanuary = 0,
        oldAMBEXPUnitFebruary = 0,
        oldAMBEXPUnitMarch = 0,
        oldAMBEXPUnitApril = 0,
        oldAMBEXPUnitMay = 0,
        oldAMBEXPUnitJune = 0,
        oldAMBEXPUnitJuly = 0,
        oldAMBEXPUnitAugust = 0,
        oldAMBEXPUnitSeptember = 0,
        oldAMBEXPUnitOctober = 0,
        oldAMBEXPUnitNovember = 0,
        oldAMBEXPUnitDecember = 0,
        oldAMBEXPBahtJanuary = 0,
        oldAMBEXPBahtFebruary = 0,
        oldAMBEXPBahtMarch = 0,
        oldAMBEXPBahtApril = 0,
        oldAMBEXPBahtMay = 0,
        oldAMBEXPBahtJune = 0,
        oldAMBEXPBahtJuly = 0,
        oldAMBEXPBahtAugust = 0,
        oldAMBEXPBahtSeptember = 0,
        oldAMBEXPBahtOctober = 0,
        oldAMBEXPBahtNovember = 0,
        oldAMBEXPBahtDecember = 0,

        oldMCBOEMUnitJanuary = 0,
        oldMCBOEMUnitFebruary = 0,
        oldMCBOEMUnitMarch = 0,
        oldMCBOEMUnitApril = 0,
        oldMCBOEMUnitMay = 0,
        oldMCBOEMUnitJune = 0,
        oldMCBOEMUnitJuly = 0,
        oldMCBOEMUnitAugust = 0,
        oldMCBOEMUnitSeptember = 0,
        oldMCBOEMUnitOctober = 0,
        oldMCBOEMUnitNovember = 0,
        oldMCBOEMUnitDecember = 0,
        oldMCBOEMBahtJanuary = 0,
        oldMCBOEMBahtFebruary = 0,
        oldMCBOEMBahtMarch = 0,
        oldMCBOEMBahtApril = 0,
        oldMCBOEMBahtMay = 0,
        oldMCBOEMBahtJune = 0,
        oldMCBOEMBahtJuly = 0,
        oldMCBOEMBahtAugust = 0,
        oldMCBOEMBahtSeptember = 0,
        oldMCBOEMBahtOctober = 0,
        oldMCBOEMBahtNovember = 0,
        oldMCBOEMBahtDecember = 0,
        oldMCBOEXUnitJanuary = 0,
        oldMCBOEXUnitFebruary = 0,
        oldMCBOEXUnitMarch = 0,
        oldMCBOEXUnitApril = 0,
        oldMCBOEXUnitMay = 0,
        oldMCBOEXUnitJune = 0,
        oldMCBOEXUnitJuly = 0,
        oldMCBOEXUnitAugust = 0,
        oldMCBOEXUnitSeptember = 0,
        oldMCBOEXUnitOctober = 0,
        oldMCBOEXUnitNovember = 0,
        oldMCBOEXUnitDecember = 0,
        oldMCBOEXBahtJanuary = 0,
        oldMCBOEXBahtFebruary = 0,
        oldMCBOEXBahtMarch = 0,
        oldMCBOEXBahtApril = 0,
        oldMCBOEXBahtMay = 0,
        oldMCBOEXBahtJune = 0,
        oldMCBOEXBahtJuly = 0,
        oldMCBOEXBahtAugust = 0,
        oldMCBOEXBahtSeptember = 0,
        oldMCBOEXBahtOctober = 0,
        oldMCBOEXBahtNovember = 0,
        oldMCBOEXBahtDecember = 0,
        oldMCBEXPUnitJanuary = 0,
        oldMCBEXPUnitFebruary = 0,
        oldMCBEXPUnitMarch = 0,
        oldMCBEXPUnitApril = 0,
        oldMCBEXPUnitMay = 0,
        oldMCBEXPUnitJune = 0,
        oldMCBEXPUnitJuly = 0,
        oldMCBEXPUnitAugust = 0,
        oldMCBEXPUnitSeptember = 0,
        oldMCBEXPUnitOctober = 0,
        oldMCBEXPUnitNovember = 0,
        oldMCBEXPUnitDecember = 0,
        oldMCBEXPBahtJanuary = 0,
        oldMCBEXPBahtFebruary = 0,
        oldMCBEXPBahtMarch = 0,
        oldMCBEXPBahtApril = 0,
        oldMCBEXPBahtMay = 0,
        oldMCBEXPBahtJune = 0,
        oldMCBEXPBahtJuly = 0,
        oldMCBEXPBahtAugust = 0,
        oldMCBEXPBahtSeptember = 0,
        oldMCBEXPBahtOctober = 0,
        oldMCBEXPBahtNovember = 0,
        oldMCBEXPBahtDecember = 0,

        oldEBEXPUnitJanuary = 0,
        oldEBEXPUnitFebruary = 0,
        oldEBEXPUnitMarch = 0,
        oldEBEXPUnitApril = 0,
        oldEBEXPUnitMay = 0,
        oldEBEXPUnitJune = 0,
        oldEBEXPUnitJuly = 0,
        oldEBEXPUnitAugust = 0,
        oldEBEXPUnitSeptember = 0,
        oldEBEXPUnitOctober = 0,
        oldEBEXPUnitNovember = 0,
        oldEBEXPUnitDecember = 0,
        oldEBEXPBahtJanuary = 0,
        oldEBEXPBahtFebruary = 0,
        oldEBEXPBahtMarch = 0,
        oldEBEXPBahtApril = 0,
        oldEBEXPBahtMay = 0,
        oldEBEXPBahtJune = 0,
        oldEBEXPBahtJuly = 0,
        oldEBEXPBahtAugust = 0,
        oldEBEXPBahtSeptember = 0,
        oldEBEXPBahtOctober = 0,
        oldEBEXPBahtNovember = 0,
        oldEBEXPBahtDecember = 0,
        oldEBSPDUnitJanuary = 0,
        oldEBSPDUnitFebruary = 0,
        oldEBSPDUnitMarch = 0,
        oldEBSPDUnitApril = 0,
        oldEBSPDUnitMay = 0,
        oldEBSPDUnitJune = 0,
        oldEBSPDUnitJuly = 0,
        oldEBSPDUnitAugust = 0,
        oldEBSPDUnitSeptember = 0,
        oldEBSPDUnitOctober = 0,
        oldEBSPDUnitNovember = 0,
        oldEBSPDUnitDecember = 0,
        oldEBSPDBahtJanuary = 0,
        oldEBSPDBahtFebruary = 0,
        oldEBSPDBahtMarch = 0,
        oldEBSPDBahtApril = 0,
        oldEBSPDBahtMay = 0,
        oldEBSPDBahtJune = 0,
        oldEBSPDBahtJuly = 0,
        oldEBSPDBahtAugust = 0,
        oldEBSPDBahtSeptember = 0,
        oldEBSPDBahtOctober = 0,
        oldEBSPDBahtNovember = 0,
        oldEBSPDBahtDecember = 0,

        oldNPSPDUnitJanuary = 0,
        oldNPSPDUnitFebruary = 0,
        oldNPSPDUnitMarch = 0,
        oldNPSPDUnitApril = 0,
        oldNPSPDUnitMay = 0,
        oldNPSPDUnitJune = 0,
        oldNPSPDUnitJuly = 0,
        oldNPSPDUnitAugust = 0,
        oldNPSPDUnitSeptember = 0,
        oldNPSPDUnitOctober = 0,
        oldNPSPDUnitNovember = 0,
        oldNPSPDUnitDecember = 0,
        oldNPSPDBahtJanuary = 0,
        oldNPSPDBahtFebruary = 0,
        oldNPSPDBahtMarch = 0,
        oldNPSPDBahtApril = 0,
        oldNPSPDBahtMay = 0,
        oldNPSPDBahtJune = 0,
        oldNPSPDBahtJuly = 0,
        oldNPSPDBahtAugust = 0,
        oldNPSPDBahtSeptember = 0,
        oldNPSPDBahtOctober = 0,
        oldNPSPDBahtNovember = 0,
        oldNPSPDBahtDecember = 0,

        oldINDSPDUnitJanuary = 0,
        oldINDSPDUnitFebruary = 0,
        oldINDSPDUnitMarch = 0,
        oldINDSPDUnitApril = 0,
        oldINDSPDUnitMay = 0,
        oldINDSPDUnitJune = 0,
        oldINDSPDUnitJuly = 0,
        oldINDSPDUnitAugust = 0,
        oldINDSPDUnitSeptember = 0,
        oldINDSPDUnitOctober = 0,
        oldINDSPDUnitNovember = 0,
        oldINDSPDUnitDecember = 0,
        oldINDSPDBahtJanuary = 0,
        oldINDSPDBahtFebruary = 0,
        oldINDSPDBahtMarch = 0,
        oldINDSPDBahtApril = 0,
        oldINDSPDBahtMay = 0,
        oldINDSPDBahtJune = 0,
        oldINDSPDBahtJuly = 0,
        oldINDSPDBahtAugust = 0,
        oldINDSPDBahtSeptember = 0,
        oldINDSPDBahtOctober = 0,
        oldINDSPDBahtNovember = 0,
        oldINDSPDBahtDecember = 0,

        oldOTHSPDUnitJanuary = 0,
        oldOTHSPDUnitFebruary = 0,
        oldOTHSPDUnitMarch = 0,
        oldOTHSPDUnitApril = 0,
        oldOTHSPDUnitMay = 0,
        oldOTHSPDUnitJune = 0,
        oldOTHSPDUnitJuly = 0,
        oldOTHSPDUnitAugust = 0,
        oldOTHSPDUnitSeptember = 0,
        oldOTHSPDUnitOctober = 0,
        oldOTHSPDUnitNovember = 0,
        oldOTHSPDUnitDecember = 0,
        oldOTHSPDBahtJanuary = 0,
        oldOTHSPDBahtFebruary = 0,
        oldOTHSPDBahtMarch = 0,
        oldOTHSPDBahtApril = 0,
        oldOTHSPDBahtMay = 0,
        oldOTHSPDBahtJune = 0,
        oldOTHSPDBahtJuly = 0,
        oldOTHSPDBahtAugust = 0,
        oldOTHSPDBahtSeptember = 0,
        oldOTHSPDBahtOctober = 0,
        oldOTHSPDBahtNovember = 0,
        oldOTHSPDBahtDecember = 0,

        oldAMBTotalBaht = 0,
        oldAMBTotalUnit = 0,
        oldMCBTotalBaht = 0,
        oldMCBTotalUnit = 0,
        oldEBTotalBaht = 0,
        oldEBTotalUnit = 0,
        oldNPTotalBaht = 0,
        oldNPTotalUnit = 0,
        oldINDTotalBaht = 0,
        oldINDTotalUnit = 0,
        oldOTHTotalBaht = 0,
        oldOTHTotalUnit = 0;

    var groupedCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.SalesPersonGroup;
    });

    var groupedOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.SalesPersonGroup;
    });

    var groupedItemCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.ItemGroupShort;
    });

    var groupedItemOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.ItemGroupShort;
    });

    $.each(groupedItemCurrYear.AMB, function() {
        if (this.SalesPersonGroup == 'OEM') {

            if (this.DocMonth == '1') {
                currAMBOEMUnitJanuary += parseFloat(this.Quantity);
                currAMBOEMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currAMBOEMUnitFebruary += parseFloat(this.Quantity);
                currAMBOEMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currAMBOEMUnitMarch += parseFloat(this.Quantity);
                currAMBOEMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currAMBOEMUnitApril += parseFloat(this.Quantity);
                currAMBOEMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currAMBOEMUnitMay += parseFloat(this.Quantity);
                currAMBOEMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currAMBOEMUnitJune += parseFloat(this.Quantity);
                currAMBOEMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currAMBOEMUnitJuly += parseFloat(this.Quantity);
                currAMBOEMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currAMBOEMUnitAugust += parseFloat(this.Quantity);
                currAMBOEMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currAMBOEMUnitSeptember += parseFloat(this.Quantity);
                currAMBOEMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currAMBOEMUnitOctober += parseFloat(this.Quantity);
                currAMBOEMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currAMBOEMUnitNovember += parseFloat(this.Quantity);
                currAMBOEMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currAMBOEMUnitDecember += parseFloat(this.Quantity);
                currAMBOEMBahtDecember += parseFloat(this.Total);
            }
            currOEMAMBTotalUnit += parseFloat(this.Quantity);
            currOEMAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'OEMExport') {

            if (this.DocMonth == '1') {
                currAMBOEXUnitJanuary += parseFloat(this.Quantity);
                currAMBOEXBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currAMBOEXUnitFebruary += parseFloat(this.Quantity);
                currAMBOEXBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currAMBOEXUnitMarch += parseFloat(this.Quantity);
                currAMBOEXBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currAMBOEXUnitApril += parseFloat(this.Quantity);
                currAMBOEXBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currAMBOEXUnitMay += parseFloat(this.Quantity);
                currAMBOEXBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currAMBOEXUnitJune += parseFloat(this.Quantity);
                currAMBOEXBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currAMBOEXUnitJuly += parseFloat(this.Quantity);
                currAMBOEXBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currAMBOEXUnitAugust += parseFloat(this.Quantity);
                currAMBOEXBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currAMBOEXUnitSeptember += parseFloat(this.Quantity);
                currAMBOEXBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currAMBOEXUnitOctober += parseFloat(this.Quantity);
                currAMBOEXBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currAMBOEXUnitNovember += parseFloat(this.Quantity);
                currAMBOEXBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currAMBOEXUnitDecember += parseFloat(this.Quantity);
                currAMBOEXBahtDecember += parseFloat(this.Total);
            }

            currOEXAMBTotalUnit += parseFloat(this.Quantity);
            currOEXAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'Export') {

            if (this.DocMonth == '1') {
                currAMBEXPUnitJanuary += parseFloat(this.Quantity);
                currAMBEXPBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currAMBEXPUnitFebruary += parseFloat(this.Quantity);
                currAMBEXPBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currAMBEXPUnitMarch += parseFloat(this.Quantity);
                currAMBEXPBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currAMBEXPUnitApril += parseFloat(this.Quantity);
                currAMBEXPBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currAMBEXPUnitMay += parseFloat(this.Quantity);
                currAMBEXPBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currAMBEXPUnitJune += parseFloat(this.Quantity);
                currAMBEXPBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currAMBEXPUnitJuly += parseFloat(this.Quantity);
                currAMBEXPBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currAMBEXPUnitAugust += parseFloat(this.Quantity);
                currAMBEXPBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currAMBEXPUnitSeptember += parseFloat(this.Quantity);
                currAMBEXPBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currAMBEXPUnitOctober += parseFloat(this.Quantity);
                currAMBEXPBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currAMBEXPUnitNovember += parseFloat(this.Quantity);
                currAMBEXPBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currAMBEXPUnitDecember += parseFloat(this.Quantity);
                currAMBEXPBahtDecember += parseFloat(this.Total);
            }

            currEXPAMBTotalUnit += parseFloat(this.Quantity);
            currEXPAMBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.MCB, function() {
        if (this.SalesPersonGroup == 'OEM') {

            if (this.DocMonth == '1') {
                currMCBOEMUnitJanuary += parseFloat(this.Quantity);
                currMCBOEMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currMCBOEMUnitFebruary += parseFloat(this.Quantity);
                currMCBOEMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currMCBOEMUnitMarch += parseFloat(this.Quantity);
                currMCBOEMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currMCBOEMUnitApril += parseFloat(this.Quantity);
                currMCBOEMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currMCBOEMUnitMay += parseFloat(this.Quantity);
                currMCBOEMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currMCBOEMUnitJune += parseFloat(this.Quantity);
                currMCBOEMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currMCBOEMUnitJuly += parseFloat(this.Quantity);
                currMCBOEMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currMCBOEMUnitAugust += parseFloat(this.Quantity);
                currMCBOEMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currMCBOEMUnitSeptember += parseFloat(this.Quantity);
                currMCBOEMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currMCBOEMUnitOctober += parseFloat(this.Quantity);
                currMCBOEMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currMCBOEMUnitNovember += parseFloat(this.Quantity);
                currMCBOEMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currMCBOEMUnitDecember += parseFloat(this.Quantity);
                currMCBOEMBahtDecember += parseFloat(this.Total);
            }
            currOEMMCBTotalUnit += parseFloat(this.Quantity);
            currOEMMCBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'OEMExport') {

            if (this.DocMonth == '1') {
                currMCBOEXUnitJanuary += parseFloat(this.Quantity);
                currMCBOEXBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currMCBOEXUnitFebruary += parseFloat(this.Quantity);
                currMCBOEXBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currMCBOEXUnitMarch += parseFloat(this.Quantity);
                currMCBOEXBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currMCBOEXUnitApril += parseFloat(this.Quantity);
                currMCBOEXBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currMCBOEXUnitMay += parseFloat(this.Quantity);
                currMCBOEXBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currMCBOEXUnitJune += parseFloat(this.Quantity);
                currMCBOEXBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currMCBOEXUnitJuly += parseFloat(this.Quantity);
                currMCBOEXBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currMCBOEXUnitAugust += parseFloat(this.Quantity);
                currMCBOEXBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currMCBOEXUnitSeptember += parseFloat(this.Quantity);
                currMCBOEXBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currMCBOEXUnitOctober += parseFloat(this.Quantity);
                currMCBOEXBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currMCBOEXUnitNovember += parseFloat(this.Quantity);
                currMCBOEXBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currMCBOEXUnitDecember += parseFloat(this.Quantity);
                currMCBOEXBahtDecember += parseFloat(this.Total);
            }

            currOEXMCBTotalUnit += parseFloat(this.Quantity);
            currOEXMCBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'Export') {

            if (this.DocMonth == '1') {
                currMCBEXPUnitJanuary += parseFloat(this.Quantity);
                currMCBEXPBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currMCBEXPUnitFebruary += parseFloat(this.Quantity);
                currMCBEXPBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currMCBEXPUnitMarch += parseFloat(this.Quantity);
                currMCBEXPBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currMCBEXPUnitApril += parseFloat(this.Quantity);
                currMCBEXPBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currMCBEXPUnitMay += parseFloat(this.Quantity);
                currMCBEXPBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currMCBEXPUnitJune += parseFloat(this.Quantity);
                currMCBEXPBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currMCBEXPUnitJuly += parseFloat(this.Quantity);
                currMCBEXPBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currMCBEXPUnitAugust += parseFloat(this.Quantity);
                currMCBEXPBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currMCBEXPUnitSeptember += parseFloat(this.Quantity);
                currMCBEXPBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currMCBEXPUnitOctober += parseFloat(this.Quantity);
                currMCBEXPBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currMCBEXPUnitNovember += parseFloat(this.Quantity);
                currMCBEXPBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currMCBEXPUnitDecember += parseFloat(this.Quantity);
                currMCBEXPBahtDecember += parseFloat(this.Total);
            }

            currEXPMCBTotalUnit += parseFloat(this.Quantity);
            currEXPMCBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.EB, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                currEBSPDUnitJanuary += parseFloat(this.Quantity);
                currEBSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currEBSPDUnitFebruary += parseFloat(this.Quantity);
                currEBSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currEBSPDUnitMarch += parseFloat(this.Quantity);
                currEBSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currEBSPDUnitApril += parseFloat(this.Quantity);
                currEBSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currEBSPDUnitMay += parseFloat(this.Quantity);
                currEBSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currEBSPDUnitJune += parseFloat(this.Quantity);
                currEBSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currEBSPDUnitJuly += parseFloat(this.Quantity);
                currEBSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currEBSPDUnitAugust += parseFloat(this.Quantity);
                currEBSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currEBSPDUnitSeptember += parseFloat(this.Quantity);
                currEBSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currEBSPDUnitOctober += parseFloat(this.Quantity);
                currEBSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currEBSPDUnitNovember += parseFloat(this.Quantity);
                currEBSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currEBSPDUnitDecember += parseFloat(this.Quantity);
                currEBSPDBahtDecember += parseFloat(this.Total);
            }

            currSPDEBTotalUnit += parseFloat(this.Quantity);
            currSPDEBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.NP, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                currNPSPDUnitJanuary += parseFloat(this.Quantity);
                currNPSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currNPSPDUnitFebruary += parseFloat(this.Quantity);
                currNPSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currNPSPDUnitMarch += parseFloat(this.Quantity);
                currNPSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currNPSPDUnitApril += parseFloat(this.Quantity);
                currNPSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currNPSPDUnitMay += parseFloat(this.Quantity);
                currNPSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currNPSPDUnitJune += parseFloat(this.Quantity);
                currNPSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currNPSPDUnitJuly += parseFloat(this.Quantity);
                currNPSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currNPSPDUnitAugust += parseFloat(this.Quantity);
                currNPSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currNPSPDUnitSeptember += parseFloat(this.Quantity);
                currNPSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currNPSPDUnitOctober += parseFloat(this.Quantity);
                currNPSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currNPSPDUnitNovember += parseFloat(this.Quantity);
                currNPSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currNPSPDUnitDecember += parseFloat(this.Quantity);
                currNPSPDBahtDecember += parseFloat(this.Total);
            }

            currSPDNPTotalUnit += parseFloat(this.Quantity);
            currSPDNPTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.IND, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                currINDSPDUnitJanuary += parseFloat(this.Quantity);
                currINDSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currINDSPDUnitFebruary += parseFloat(this.Quantity);
                currINDSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currINDSPDUnitMarch += parseFloat(this.Quantity);
                currINDSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currINDSPDUnitApril += parseFloat(this.Quantity);
                currINDSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currINDSPDUnitMay += parseFloat(this.Quantity);
                currINDSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currINDSPDUnitJune += parseFloat(this.Quantity);
                currINDSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currINDSPDUnitJuly += parseFloat(this.Quantity);
                currINDSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currINDSPDUnitAugust += parseFloat(this.Quantity);
                currINDSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currINDSPDUnitSeptember += parseFloat(this.Quantity);
                currINDSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currINDSPDUnitOctober += parseFloat(this.Quantity);
                currINDSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currINDSPDUnitNovember += parseFloat(this.Quantity);
                currINDSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currINDSPDUnitDecember += parseFloat(this.Quantity);
                currINDSPDBahtDecember += parseFloat(this.Total);
            }

            currSPDINDTotalUnit += parseFloat(this.Quantity);
            currSPDINDTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemCurrYear.OTH, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                currOTHSPDUnitJanuary += parseFloat(this.Quantity);
                currOTHSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                currOTHSPDUnitFebruary += parseFloat(this.Quantity);
                currOTHSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                currOTHSPDUnitMarch += parseFloat(this.Quantity);
                currOTHSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                currOTHSPDUnitApril += parseFloat(this.Quantity);
                currOTHSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                currOTHSPDUnitMay += parseFloat(this.Quantity);
                currOTHSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                currOTHSPDUnitJune += parseFloat(this.Quantity);
                currOTHSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                currOTHSPDUnitJuly += parseFloat(this.Quantity);
                currOTHSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                currOTHSPDUnitAugust += parseFloat(this.Quantity);
                currOTHSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                currOTHSPDUnitSeptember += parseFloat(this.Quantity);
                currOTHSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                currOTHSPDUnitOctober += parseFloat(this.Quantity);
                currOTHSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                currOTHSPDUnitNovember += parseFloat(this.Quantity);
                currOTHSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                currOTHSPDUnitDecember += parseFloat(this.Quantity);
                currOTHSPDBahtDecember += parseFloat(this.Total);
            }

            currSPDOTHTotalUnit += parseFloat(this.Quantity);
            currSPDOTHTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.AMB, function() {
        if (this.SalesPersonGroup == 'OEM') {

            if (this.DocMonth == '1') {
                oldAMBOEMUnitJanuary += parseFloat(this.Quantity);
                oldAMBOEMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBOEMUnitFebruary += parseFloat(this.Quantity);
                oldAMBOEMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBOEMUnitMarch += parseFloat(this.Quantity);
                oldAMBOEMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBOEMUnitApril += parseFloat(this.Quantity);
                oldAMBOEMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBOEMUnitMay += parseFloat(this.Quantity);
                oldAMBOEMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBOEMUnitJune += parseFloat(this.Quantity);
                oldAMBOEMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBOEMUnitJuly += parseFloat(this.Quantity);
                oldAMBOEMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBOEMUnitAugust += parseFloat(this.Quantity);
                oldAMBOEMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBOEMUnitSeptember += parseFloat(this.Quantity);
                oldAMBOEMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBOEMUnitOctober += parseFloat(this.Quantity);
                oldAMBOEMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBOEMUnitNovember += parseFloat(this.Quantity);
                oldAMBOEMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBOEMUnitDecember += parseFloat(this.Quantity);
                oldAMBOEMBahtDecember += parseFloat(this.Total);
            }
            oldOEMAMBTotalUnit += parseFloat(this.Quantity);
            oldOEMAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'OEMExport') {

            if (this.DocMonth == '1') {
                oldAMBOEXUnitJanuary += parseFloat(this.Quantity);
                oldAMBOEXBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBOEXUnitFebruary += parseFloat(this.Quantity);
                oldAMBOEXBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBOEXUnitMarch += parseFloat(this.Quantity);
                oldAMBOEXBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBOEXUnitApril += parseFloat(this.Quantity);
                oldAMBOEXBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBOEXUnitMay += parseFloat(this.Quantity);
                oldAMBOEXBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBOEXUnitJune += parseFloat(this.Quantity);
                oldAMBOEXBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBOEXUnitJuly += parseFloat(this.Quantity);
                oldAMBOEXBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBOEXUnitAugust += parseFloat(this.Quantity);
                oldAMBOEXBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBOEXUnitSeptember += parseFloat(this.Quantity);
                oldAMBOEXBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBOEXUnitOctober += parseFloat(this.Quantity);
                oldAMBOEXBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBOEXUnitNovember += parseFloat(this.Quantity);
                oldAMBOEXBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBOEXUnitDecember += parseFloat(this.Quantity);
                oldAMBOEXBahtDecember += parseFloat(this.Total);
            }

            oldOEXAMBTotalUnit += parseFloat(this.Quantity);
            oldOEXAMBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'Export') {

            if (this.DocMonth == '1') {
                oldAMBEXPUnitJanuary += parseFloat(this.Quantity);
                oldAMBEXPBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBEXPUnitFebruary += parseFloat(this.Quantity);
                oldAMBEXPBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBEXPUnitMarch += parseFloat(this.Quantity);
                oldAMBEXPBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBEXPUnitApril += parseFloat(this.Quantity);
                oldAMBEXPBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBEXPUnitMay += parseFloat(this.Quantity);
                oldAMBEXPBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBEXPUnitJune += parseFloat(this.Quantity);
                oldAMBEXPBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBEXPUnitJuly += parseFloat(this.Quantity);
                oldAMBEXPBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBEXPUnitAugust += parseFloat(this.Quantity);
                oldAMBEXPBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBEXPUnitSeptember += parseFloat(this.Quantity);
                oldAMBEXPBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBEXPUnitOctober += parseFloat(this.Quantity);
                oldAMBEXPBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBEXPUnitNovember += parseFloat(this.Quantity);
                oldAMBEXPBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBEXPUnitDecember += parseFloat(this.Quantity);
                oldAMBEXPBahtDecember += parseFloat(this.Total);
            }

            oldEXPAMBTotalUnit += parseFloat(this.Quantity);
            oldEXPAMBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.MCB, function() {
        if (this.SalesPersonGroup == 'OEM') {

            if (this.DocMonth == '1') {
                oldMCBOEMUnitJanuary += parseFloat(this.Quantity);
                oldMCBOEMBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldMCBOEMUnitFebruary += parseFloat(this.Quantity);
                oldMCBOEMBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldMCBOEMUnitMarch += parseFloat(this.Quantity);
                oldMCBOEMBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldMCBOEMUnitApril += parseFloat(this.Quantity);
                oldMCBOEMBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldMCBOEMUnitMay += parseFloat(this.Quantity);
                oldMCBOEMBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldMCBOEMUnitJune += parseFloat(this.Quantity);
                oldMCBOEMBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldMCBOEMUnitJuly += parseFloat(this.Quantity);
                oldMCBOEMBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldMCBOEMUnitAugust += parseFloat(this.Quantity);
                oldMCBOEMBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldMCBOEMUnitSeptember += parseFloat(this.Quantity);
                oldMCBOEMBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldMCBOEMUnitOctober += parseFloat(this.Quantity);
                oldMCBOEMBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldMCBOEMUnitNovember += parseFloat(this.Quantity);
                oldMCBOEMBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldMCBOEMUnitDecember += parseFloat(this.Quantity);
                oldMCBOEMBahtDecember += parseFloat(this.Total);
            }
            oldOEMMCBTotalUnit += parseFloat(this.Quantity);
            oldOEMMCBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'OEMExport') {

            if (this.DocMonth == '1') {
                oldMCBOEXUnitJanuary += parseFloat(this.Quantity);
                oldMCBOEXBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldMCBOEXUnitFebruary += parseFloat(this.Quantity);
                oldMCBOEXBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldMCBOEXUnitMarch += parseFloat(this.Quantity);
                oldMCBOEXBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldMCBOEXUnitApril += parseFloat(this.Quantity);
                oldMCBOEXBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldMCBOEXUnitMay += parseFloat(this.Quantity);
                oldMCBOEXBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldMCBOEXUnitJune += parseFloat(this.Quantity);
                oldMCBOEXBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldMCBOEXUnitJuly += parseFloat(this.Quantity);
                oldMCBOEXBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldMCBOEXUnitAugust += parseFloat(this.Quantity);
                oldMCBOEXBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldMCBOEXUnitSeptember += parseFloat(this.Quantity);
                oldMCBOEXBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldMCBOEXUnitOctober += parseFloat(this.Quantity);
                oldMCBOEXBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldMCBOEXUnitNovember += parseFloat(this.Quantity);
                oldMCBOEXBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldMCBOEXUnitDecember += parseFloat(this.Quantity);
                oldMCBOEXBahtDecember += parseFloat(this.Total);
            }

            oldOEXMCBTotalUnit += parseFloat(this.Quantity);
            oldOEXMCBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'Export') {

            if (this.DocMonth == '1') {
                oldMCBEXPUnitJanuary += parseFloat(this.Quantity);
                oldMCBEXPBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldMCBEXPUnitFebruary += parseFloat(this.Quantity);
                oldMCBEXPBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldMCBEXPUnitMarch += parseFloat(this.Quantity);
                oldMCBEXPBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldMCBEXPUnitApril += parseFloat(this.Quantity);
                oldMCBEXPBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldMCBEXPUnitMay += parseFloat(this.Quantity);
                oldMCBEXPBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldMCBEXPUnitJune += parseFloat(this.Quantity);
                oldMCBEXPBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldMCBEXPUnitJuly += parseFloat(this.Quantity);
                oldMCBEXPBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldMCBEXPUnitAugust += parseFloat(this.Quantity);
                oldMCBEXPBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldMCBEXPUnitSeptember += parseFloat(this.Quantity);
                oldMCBEXPBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldMCBEXPUnitOctober += parseFloat(this.Quantity);
                oldMCBEXPBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldMCBEXPUnitNovember += parseFloat(this.Quantity);
                oldMCBEXPBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldMCBEXPUnitDecember += parseFloat(this.Quantity);
                oldMCBEXPBahtDecember += parseFloat(this.Total);
            }

            oldEXPMCBTotalUnit += parseFloat(this.Quantity);
            oldEXPMCBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.EB, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                oldEBSPDUnitJanuary += parseFloat(this.Quantity);
                oldEBSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldEBSPDUnitFebruary += parseFloat(this.Quantity);
                oldEBSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldEBSPDUnitMarch += parseFloat(this.Quantity);
                oldEBSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldEBSPDUnitApril += parseFloat(this.Quantity);
                oldEBSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldEBSPDUnitMay += parseFloat(this.Quantity);
                oldEBSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldEBSPDUnitJune += parseFloat(this.Quantity);
                oldEBSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldEBSPDUnitJuly += parseFloat(this.Quantity);
                oldEBSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldEBSPDUnitAugust += parseFloat(this.Quantity);
                oldEBSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldEBSPDUnitSeptember += parseFloat(this.Quantity);
                oldEBSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldEBSPDUnitOctober += parseFloat(this.Quantity);
                oldEBSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldEBSPDUnitNovember += parseFloat(this.Quantity);
                oldEBSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldEBSPDUnitDecember += parseFloat(this.Quantity);
                oldEBSPDBahtDecember += parseFloat(this.Total);
            }

            oldSPDEBTotalUnit += parseFloat(this.Quantity);
            oldSPDEBTotalBaht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'Export') {

            if (this.DocMonth == '1') {
                oldAMBEXPUnitJanuary += parseFloat(this.Quantity);
                oldAMBEXPBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldAMBEXPUnitFebruary += parseFloat(this.Quantity);
                oldAMBEXPBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldAMBEXPUnitMarch += parseFloat(this.Quantity);
                oldAMBEXPBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldAMBEXPUnitApril += parseFloat(this.Quantity);
                oldAMBEXPBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldAMBEXPUnitMay += parseFloat(this.Quantity);
                oldAMBEXPBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldAMBEXPUnitJune += parseFloat(this.Quantity);
                oldAMBEXPBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldAMBEXPUnitJuly += parseFloat(this.Quantity);
                oldAMBEXPBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldAMBEXPUnitAugust += parseFloat(this.Quantity);
                oldAMBEXPBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldAMBEXPUnitSeptember += parseFloat(this.Quantity);
                oldAMBEXPBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldAMBEXPUnitOctober += parseFloat(this.Quantity);
                oldAMBEXPBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldAMBEXPUnitNovember += parseFloat(this.Quantity);
                oldAMBEXPBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldAMBEXPUnitDecember += parseFloat(this.Quantity);
                oldAMBEXPBahtDecember += parseFloat(this.Total);
            }

            oldEXPAMBTotalUnit += parseFloat(this.Quantity);
            oldEXPAMBTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.NP, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                oldNPSPDUnitJanuary += parseFloat(this.Quantity);
                oldNPSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldNPSPDUnitFebruary += parseFloat(this.Quantity);
                oldNPSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldNPSPDUnitMarch += parseFloat(this.Quantity);
                oldNPSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldNPSPDUnitApril += parseFloat(this.Quantity);
                oldNPSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldNPSPDUnitMay += parseFloat(this.Quantity);
                oldNPSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldNPSPDUnitJune += parseFloat(this.Quantity);
                oldNPSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldNPSPDUnitJuly += parseFloat(this.Quantity);
                oldNPSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldNPSPDUnitAugust += parseFloat(this.Quantity);
                oldNPSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldNPSPDUnitSeptember += parseFloat(this.Quantity);
                oldNPSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldNPSPDUnitOctober += parseFloat(this.Quantity);
                oldNPSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldNPSPDUnitNovember += parseFloat(this.Quantity);
                oldNPSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldNPSPDUnitDecember += parseFloat(this.Quantity);
                oldNPSPDBahtDecember += parseFloat(this.Total);
            }

            oldSPDNPTotalUnit += parseFloat(this.Quantity);
            oldSPDNPTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.IND, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                oldINDSPDUnitJanuary += parseFloat(this.Quantity);
                oldINDSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldINDSPDUnitFebruary += parseFloat(this.Quantity);
                oldINDSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldINDSPDUnitMarch += parseFloat(this.Quantity);
                oldINDSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldINDSPDUnitApril += parseFloat(this.Quantity);
                oldINDSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldINDSPDUnitMay += parseFloat(this.Quantity);
                oldINDSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldINDSPDUnitJune += parseFloat(this.Quantity);
                oldINDSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldINDSPDUnitJuly += parseFloat(this.Quantity);
                oldINDSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldINDSPDUnitAugust += parseFloat(this.Quantity);
                oldINDSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldINDSPDUnitSeptember += parseFloat(this.Quantity);
                oldINDSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldINDSPDUnitOctober += parseFloat(this.Quantity);
                oldINDSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldINDSPDUnitNovember += parseFloat(this.Quantity);
                oldINDSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldINDSPDUnitDecember += parseFloat(this.Quantity);
                oldINDSPDBahtDecember += parseFloat(this.Total);
            }

            oldSPDINDTotalUnit += parseFloat(this.Quantity);
            oldSPDINDTotalBaht += parseFloat(this.Total);
        }
    });

    $.each(groupedItemOldYear.OTH, function() {
        if (this.SalesPersonGroup == 'SPD') {

            if (this.DocMonth == '1') {
                oldOTHSPDUnitJanuary += parseFloat(this.Quantity);
                oldOTHSPDBahtJanuary += parseFloat(this.Total);
            } else if (this.DocMonth == '2') {
                oldOTHSPDUnitFebruary += parseFloat(this.Quantity);
                oldOTHSPDBahtFebruary += parseFloat(this.Total);
            } else if (this.DocMonth == '3') {
                oldOTHSPDUnitMarch += parseFloat(this.Quantity);
                oldOTHSPDBahtMarch += parseFloat(this.Total);
            } else if (this.DocMonth == '4') {
                oldOTHSPDUnitApril += parseFloat(this.Quantity);
                oldOTHSPDBahtApril += parseFloat(this.Total);
            } else if (this.DocMonth == '5') {
                oldOTHSPDUnitMay += parseFloat(this.Quantity);
                oldOTHSPDBahtMay += parseFloat(this.Total);
            } else if (this.DocMonth == '6') {
                oldOTHSPDUnitJune += parseFloat(this.Quantity);
                oldOTHSPDBahtJune += parseFloat(this.Total);
            } else if (this.DocMonth == '7') {
                oldOTHSPDUnitJuly += parseFloat(this.Quantity);
                oldOTHSPDBahtJuly += parseFloat(this.Total);
            } else if (this.DocMonth == '8') {
                oldOTHSPDUnitAugust += parseFloat(this.Quantity);
                oldOTHSPDBahtAugust += parseFloat(this.Total);
            } else if (this.DocMonth == '9') {
                oldOTHSPDUnitSeptember += parseFloat(this.Quantity);
                oldOTHSPDBahtSeptember += parseFloat(this.Total);
            } else if (this.DocMonth == '10') {
                oldOTHSPDUnitOctober += parseFloat(this.Quantity);
                oldOTHSPDBahtOctober += parseFloat(this.Total);
            } else if (this.DocMonth == '11') {
                oldOTHSPDUnitNovember += parseFloat(this.Quantity);
                oldOTHSPDBahtNovember += parseFloat(this.Total);
            } else if (this.DocMonth == '12') {
                oldOTHSPDUnitDecember += parseFloat(this.Quantity);
                oldOTHSPDBahtDecember += parseFloat(this.Total);
            }

            oldSPDOTHTotalUnit += parseFloat(this.Quantity);
            oldSPDOTHTotalBaht += parseFloat(this.Total);
        }
    });


    $.each(groupedCurrYear.OEM, function() {
        if (this.DocMonth == '1') {
            currOEMUnitJanuary += parseFloat(this.Quantity);
            currOEMBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currOEMUnitFebruary += parseFloat(this.Quantity);
            currOEMBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currOEMUnitMarch += parseFloat(this.Quantity);
            currOEMBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currOEMUnitApril += parseFloat(this.Quantity);
            currOEMBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currOEMUnitMay += parseFloat(this.Quantity);
            currOEMBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currOEMUnitJune += parseFloat(this.Quantity);
            currOEMBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currOEMUnitJuly += parseFloat(this.Quantity);
            currOEMBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currOEMUnitAugust += parseFloat(this.Quantity);
            currOEMBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currOEMUnitSeptember += parseFloat(this.Quantity);
            currOEMBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currOEMUnitOctober += parseFloat(this.Quantity);
            currOEMBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currOEMUnitNovember += parseFloat(this.Quantity);
            currOEMBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currOEMUnitDecember += parseFloat(this.Quantity);
            currOEMBahtDecember += parseFloat(this.Total);
        }

        currOEMTotalBaht += parseFloat(this.Total);
        currOEMTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.OEMExport, function() {
        if (this.DocMonth == '1') {
            currOEXUnitJanuary += parseFloat(this.Quantity);
            currOEXBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currOEXUnitFebruary += parseFloat(this.Quantity);
            currOEXBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currOEXUnitMarch += parseFloat(this.Quantity);
            currOEXBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currOEXUnitApril += parseFloat(this.Quantity);
            currOEXBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currOEXUnitMay += parseFloat(this.Quantity);
            currOEXBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currOEXUnitJune += parseFloat(this.Quantity);
            currOEXBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currOEXUnitJuly += parseFloat(this.Quantity);
            currOEXBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currOEXUnitAugust += parseFloat(this.Quantity);
            currOEXBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currOEXUnitSeptember += parseFloat(this.Quantity);
            currOEXBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currOEXUnitOctober += parseFloat(this.Quantity);
            currOEXBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currOEXUnitNovember += parseFloat(this.Quantity);
            currOEXBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currOEXUnitDecember += parseFloat(this.Quantity);
            currOEXBahtDecember += parseFloat(this.Total);
        }

        currOEXTotalBaht += parseFloat(this.Total);
        currOEXTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.Export, function() {
        if (this.DocMonth == '1') {
            currEXPUnitJanuary += parseFloat(this.Quantity);
            currEXPBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currEXPUnitFebruary += parseFloat(this.Quantity);
            currEXPBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currEXPUnitMarch += parseFloat(this.Quantity);
            currEXPBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currEXPUnitApril += parseFloat(this.Quantity);
            currEXPBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currEXPUnitMay += parseFloat(this.Quantity);
            currEXPBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currEXPUnitJune += parseFloat(this.Quantity);
            currEXPBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currEXPUnitJuly += parseFloat(this.Quantity);
            currEXPBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currEXPUnitAugust += parseFloat(this.Quantity);
            currEXPBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currEXPUnitSeptember += parseFloat(this.Quantity);
            currEXPBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currEXPUnitOctober += parseFloat(this.Quantity);
            currEXPBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currEXPUnitNovember += parseFloat(this.Quantity);
            currEXPBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currEXPUnitDecember += parseFloat(this.Quantity);
            currEXPBahtDecember += parseFloat(this.Total);
        }

        currEXPTotalBaht += parseFloat(this.Total);
        currEXPTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.SPD, function() {
        if (this.DocMonth == '1') {
            currSPDUnitJanuary += parseFloat(this.Quantity);
            currSPDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currSPDUnitFebruary += parseFloat(this.Quantity);
            currSPDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currSPDUnitMarch += parseFloat(this.Quantity);
            currSPDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currSPDUnitApril += parseFloat(this.Quantity);
            currSPDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currSPDUnitMay += parseFloat(this.Quantity);
            currSPDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currSPDUnitJune += parseFloat(this.Quantity);
            currSPDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currSPDUnitJuly += parseFloat(this.Quantity);
            currSPDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currSPDUnitAugust += parseFloat(this.Quantity);
            currSPDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currSPDUnitSeptember += parseFloat(this.Quantity);
            currSPDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currSPDUnitOctober += parseFloat(this.Quantity);
            currSPDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currSPDUnitNovember += parseFloat(this.Quantity);
            currSPDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currSPDUnitDecember += parseFloat(this.Quantity);
            currSPDBahtDecember += parseFloat(this.Total);
        }

        currSPDTotalBaht += parseFloat(this.Total);
        currSPDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.OEM, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currOEMUnitQ1 += parseFloat(this.Quantity);
            currOEMBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currOEMUnitQ2 += parseFloat(this.Quantity);
            currOEMBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currOEMUnitQ3 += parseFloat(this.Quantity);
            currOEMBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currOEMUnitQ4 += parseFloat(this.Quantity);
            currOEMBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.OEMExport, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currOEXUnitQ1 += parseFloat(this.Quantity);
            currOEXBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currOEXUnitQ2 += parseFloat(this.Quantity);
            currOEXBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currOEXUnitQ3 += parseFloat(this.Quantity);
            currOEXBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currOEXUnitQ4 += parseFloat(this.Quantity);
            currOEXBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.Export, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currEXPUnitQ1 += parseFloat(this.Quantity);
            currEXPBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currEXPUnitQ2 += parseFloat(this.Quantity);
            currEXPBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currEXPUnitQ3 += parseFloat(this.Quantity);
            currEXPBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currEXPUnitQ4 += parseFloat(this.Quantity);
            currEXPBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.SPD, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currSPDUnitQ1 += parseFloat(this.Quantity);
            currSPDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currSPDUnitQ2 += parseFloat(this.Quantity);
            currSPDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currSPDUnitQ3 += parseFloat(this.Quantity);
            currSPDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currSPDUnitQ4 += parseFloat(this.Quantity);
            currSPDBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.OEM, function() {
        if (this.DocMonth == '1') {
            oldOEMUnitJanuary += parseFloat(this.Quantity);
            oldOEMBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldOEMUnitFebruary += parseFloat(this.Quantity);
            oldOEMBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldOEMUnitMarch += parseFloat(this.Quantity);
            oldOEMBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldOEMUnitApril += parseFloat(this.Quantity);
            oldOEMBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldOEMUnitMay += parseFloat(this.Quantity);
            oldOEMBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldOEMUnitJune += parseFloat(this.Quantity);
            oldOEMBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldOEMUnitJuly += parseFloat(this.Quantity);
            oldOEMBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldOEMUnitAugust += parseFloat(this.Quantity);
            oldOEMBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldOEMUnitSeptember += parseFloat(this.Quantity);
            oldOEMBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldOEMUnitOctober += parseFloat(this.Quantity);
            oldOEMBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldOEMUnitNovember += parseFloat(this.Quantity);
            oldOEMBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldOEMUnitDecember += parseFloat(this.Quantity);
            oldOEMBahtDecember += parseFloat(this.Total);
        }

        oldOEMTotalBaht += parseFloat(this.Total);
        oldOEMTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.OEMExport, function() {
        if (this.DocMonth == '1') {
            oldOEXUnitJanuary += parseFloat(this.Quantity);
            oldOEXBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldOEXUnitFebruary += parseFloat(this.Quantity);
            oldOEXBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldOEXUnitMarch += parseFloat(this.Quantity);
            oldOEXBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldOEXUnitApril += parseFloat(this.Quantity);
            oldOEXBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldOEXUnitMay += parseFloat(this.Quantity);
            oldOEXBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldOEXUnitJune += parseFloat(this.Quantity);
            oldOEXBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldOEXUnitJuly += parseFloat(this.Quantity);
            oldOEXBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldOEXUnitAugust += parseFloat(this.Quantity);
            oldOEXBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldOEXUnitSeptember += parseFloat(this.Quantity);
            oldOEXBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldOEXUnitOctober += parseFloat(this.Quantity);
            oldOEXBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldOEXUnitNovember += parseFloat(this.Quantity);
            oldOEXBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldOEXUnitDecember += parseFloat(this.Quantity);
            oldOEXBahtDecember += parseFloat(this.Total);
        }

        oldOEXTotalBaht += parseFloat(this.Total);
        oldOEXTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.Export, function() {
        if (this.DocMonth == '1') {
            oldEXPUnitJanuary += parseFloat(this.Quantity);
            oldEXPBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldEXPUnitFebruary += parseFloat(this.Quantity);
            oldEXPBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldEXPUnitMarch += parseFloat(this.Quantity);
            oldEXPBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldEXPUnitApril += parseFloat(this.Quantity);
            oldEXPBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldEXPUnitMay += parseFloat(this.Quantity);
            oldEXPBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldEXPUnitJune += parseFloat(this.Quantity);
            oldEXPBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldEXPUnitJuly += parseFloat(this.Quantity);
            oldEXPBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldEXPUnitAugust += parseFloat(this.Quantity);
            oldEXPBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldEXPUnitSeptember += parseFloat(this.Quantity);
            oldEXPBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldEXPUnitOctober += parseFloat(this.Quantity);
            oldEXPBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldEXPUnitNovember += parseFloat(this.Quantity);
            oldEXPBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldEXPUnitDecember += parseFloat(this.Quantity);
            oldEXPBahtDecember += parseFloat(this.Total);
        }

        oldEXPTotalBaht += parseFloat(this.Total);
        oldEXPTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.SPD, function() {
        if (this.DocMonth == '1') {
            oldSPDUnitJanuary += parseFloat(this.Quantity);
            oldSPDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldSPDUnitFebruary += parseFloat(this.Quantity);
            oldSPDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldSPDUnitMarch += parseFloat(this.Quantity);
            oldSPDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldSPDUnitApril += parseFloat(this.Quantity);
            oldSPDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldSPDUnitMay += parseFloat(this.Quantity);
            oldSPDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldSPDUnitJune += parseFloat(this.Quantity);
            oldSPDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldSPDUnitJuly += parseFloat(this.Quantity);
            oldSPDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldSPDUnitAugust += parseFloat(this.Quantity);
            oldSPDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldSPDUnitSeptember += parseFloat(this.Quantity);
            oldSPDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldSPDUnitOctober += parseFloat(this.Quantity);
            oldSPDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldSPDUnitNovember += parseFloat(this.Quantity);
            oldSPDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldSPDUnitDecember += parseFloat(this.Quantity);
            oldSPDBahtDecember += parseFloat(this.Total);
        }

        oldSPDTotalBaht += parseFloat(this.Total);
        oldSPDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.OEM, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldOEMUnitQ1 += parseFloat(this.Quantity);
            oldOEMBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldOEMUnitQ2 += parseFloat(this.Quantity);
            oldOEMBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldOEMUnitQ3 += parseFloat(this.Quantity);
            oldOEMBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldOEMUnitQ4 += parseFloat(this.Quantity);
            oldOEMBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.OEMExport, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldOEXUnitQ1 += parseFloat(this.Quantity);
            oldOEXBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldOEXUnitQ2 += parseFloat(this.Quantity);
            oldOEXBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldOEXUnitQ3 += parseFloat(this.Quantity);
            oldOEXBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldOEXUnitQ4 += parseFloat(this.Quantity);
            oldOEXBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.Export, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldEXPUnitQ1 += parseFloat(this.Quantity);
            oldEXPBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldEXPUnitQ2 += parseFloat(this.Quantity);
            oldEXPBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldEXPUnitQ3 += parseFloat(this.Quantity);
            oldEXPBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldEXPUnitQ4 += parseFloat(this.Quantity);
            oldEXPBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.SPD, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldSPDUnitQ1 += parseFloat(this.Quantity);
            oldSPDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldSPDUnitQ2 += parseFloat(this.Quantity);
            oldSPDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldSPDUnitQ3 += parseFloat(this.Quantity);
            oldSPDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldSPDUnitQ4 += parseFloat(this.Quantity);
            oldSPDBahtQ4 += parseFloat(this.Total);
        }

    });

    var currAMBUnitJanuary = currAMBOEMUnitJanuary + currAMBOEXUnitJanuary + currAMBEXPUnitJanuary,
        currAMBUnitFebruary = currAMBOEMUnitFebruary + currAMBOEXUnitFebruary + currAMBEXPUnitFebruary,
        currAMBUnitMarch = currAMBOEMUnitMarch + currAMBOEXUnitMarch + currAMBEXPUnitMarch,
        currAMBUnitApril = currAMBOEMUnitApril + currAMBOEXUnitApril + currAMBEXPUnitApril,
        currAMBUnitMay = currAMBOEMUnitMay + currAMBOEXUnitMay + currAMBEXPUnitMay,
        currAMBUnitJune = currAMBOEMUnitJune + currAMBOEXUnitJune + currAMBEXPUnitJune,
        currAMBUnitJuly = currAMBOEMUnitJuly + currAMBOEXUnitJuly + currAMBEXPUnitJuly,
        currAMBUnitAugust = currAMBOEMUnitAugust + currAMBOEXUnitAugust + currAMBEXPUnitAugust,
        currAMBUnitSeptember = currAMBOEMUnitSeptember + currAMBOEXUnitSeptember + currAMBEXPUnitSeptember,
        currAMBUnitOctober = currAMBOEMUnitOctober + currAMBOEXUnitOctober + currAMBEXPUnitOctober,
        currAMBUnitNovember = currAMBOEMUnitNovember + currAMBOEXUnitNovember + currAMBEXPUnitNovember,
        currAMBUnitDecember = currAMBOEMUnitDecember + currAMBOEXUnitDecember + currAMBEXPUnitDecember,
        currAMBBahtJanuary = currAMBOEMBahtJanuary + currAMBOEXBahtJanuary + currAMBEXPBahtJanuary,
        currAMBBahtFebruary = currAMBOEMBahtFebruary + currAMBOEXBahtFebruary + currAMBEXPBahtFebruary,
        currAMBBahtMarch = currAMBOEMBahtMarch + currAMBOEXBahtMarch + currAMBEXPBahtMarch,
        currAMBBahtApril = currAMBOEMBahtApril + currAMBOEXBahtApril + currAMBEXPBahtApril,
        currAMBBahtMay = currAMBOEMBahtMay + currAMBOEXBahtMay + currAMBEXPBahtMay,
        currAMBBahtJune = currAMBOEMBahtJune + currAMBOEXBahtJune + currAMBEXPBahtJune,
        currAMBBahtJuly = currAMBOEMBahtJuly + currAMBOEXBahtJuly + currAMBEXPBahtJuly,
        currAMBBahtAugust = currAMBOEMBahtAugust + currAMBOEXBahtAugust + currAMBEXPBahtAugust,
        currAMBBahtSeptember = currAMBOEMBahtSeptember + currAMBOEXBahtSeptember + currAMBEXPBahtSeptember,
        currAMBBahtOctober = currAMBOEMBahtOctober + currAMBOEXBahtOctober + currAMBEXPBahtOctober,
        currAMBBahtNovember = currAMBOEMBahtNovember + currAMBOEXBahtNovember + currAMBEXPBahtNovember,
        currAMBBahtDecember = currAMBOEMBahtDecember + currAMBOEXBahtDecember + currAMBEXPBahtDecember,
        currAMBTotalBaht = currOEMAMBTotalBaht + currOEXAMBTotalBaht + currEXPAMBTotalBaht,
        currAMBTotalUnit = currOEMAMBTotalUnit + currOEXAMBTotalUnit + currEXPAMBTotalUnit,
        oldAMBUnitJanuary = oldAMBOEMUnitJanuary + oldAMBOEXUnitJanuary + oldAMBEXPUnitJanuary,
        oldAMBUnitFebruary = oldAMBOEMUnitFebruary + oldAMBOEXUnitFebruary + oldAMBEXPUnitFebruary,
        oldAMBUnitMarch = oldAMBOEMUnitMarch + oldAMBOEXUnitMarch + oldAMBEXPUnitMarch,
        oldAMBUnitApril = oldAMBOEMUnitApril + oldAMBOEXUnitApril + oldAMBEXPUnitApril,
        oldAMBUnitMay = oldAMBOEMUnitMay + oldAMBOEXUnitMay + oldAMBEXPUnitMay,
        oldAMBUnitJune = oldAMBOEMUnitJune + oldAMBOEXUnitJune + oldAMBEXPUnitJune,
        oldAMBUnitJuly = oldAMBOEMUnitJuly + oldAMBOEXUnitJuly + oldAMBEXPUnitJuly,
        oldAMBUnitAugust = oldAMBOEMUnitAugust + oldAMBOEXUnitAugust + oldAMBEXPUnitAugust,
        oldAMBUnitSeptember = oldAMBOEMUnitSeptember + oldAMBOEXUnitSeptember + oldAMBEXPUnitSeptember,
        oldAMBUnitOctober = oldAMBOEMUnitOctober + oldAMBOEXUnitOctober + oldAMBEXPUnitOctober,
        oldAMBUnitNovember = oldAMBOEMUnitNovember + oldAMBOEXUnitNovember + oldAMBEXPUnitNovember,
        oldAMBUnitDecember = oldAMBOEMUnitDecember + oldAMBOEXUnitDecember + oldAMBEXPUnitDecember,
        oldAMBBahtJanuary = oldAMBOEMBahtJanuary + oldAMBOEXBahtJanuary + oldAMBEXPBahtJanuary,
        oldAMBBahtFebruary = oldAMBOEMBahtFebruary + oldAMBOEXBahtFebruary + oldAMBEXPBahtFebruary,
        oldAMBBahtMarch = oldAMBOEMBahtMarch + oldAMBOEXBahtMarch + oldAMBEXPBahtMarch,
        oldAMBBahtApril = oldAMBOEMBahtApril + oldAMBOEXBahtApril + oldAMBEXPBahtApril,
        oldAMBBahtMay = oldAMBOEMBahtMay + oldAMBOEXBahtMay + oldAMBEXPBahtMay,
        oldAMBBahtJune = oldAMBOEMBahtJune + oldAMBOEXBahtJune + oldAMBEXPBahtJune,
        oldAMBBahtJuly = oldAMBOEMBahtJuly + oldAMBOEXBahtJuly + oldAMBEXPBahtJuly,
        oldAMBBahtAugust = oldAMBOEMBahtAugust + oldAMBOEXBahtAugust + oldAMBEXPBahtAugust,
        oldAMBBahtSeptember = oldAMBOEMBahtSeptember + oldAMBOEXBahtSeptember + oldAMBEXPBahtSeptember,
        oldAMBBahtOctober = oldAMBOEMBahtOctober + oldAMBOEXBahtOctober + oldAMBEXPBahtOctober,
        oldAMBBahtNovember = oldAMBOEMBahtNovember + oldAMBOEXBahtNovember + oldAMBEXPBahtNovember,
        oldAMBBahtDecember = oldAMBOEMBahtDecember + oldAMBOEXBahtDecember + oldAMBEXPBahtDecember,
        oldAMBTotalBaht = oldOEMAMBTotalBaht + oldOEXAMBTotalBaht + oldEXPAMBTotalBaht,
        oldAMBTotalUnit = oldOEMAMBTotalUnit + oldOEXAMBTotalUnit + oldEXPAMBTotalUnit,

        currMCBUnitJanuary = currMCBOEMUnitJanuary + currMCBOEXUnitJanuary + currMCBEXPUnitJanuary,
        currMCBUnitFebruary = currMCBOEMUnitFebruary + currMCBOEXUnitFebruary + currMCBEXPUnitFebruary,
        currMCBUnitMarch = currMCBOEMUnitMarch + currMCBOEXUnitMarch + currMCBEXPUnitMarch,
        currMCBUnitApril = currMCBOEMUnitApril + currMCBOEXUnitApril + currMCBEXPUnitApril,
        currMCBUnitMay = currMCBOEMUnitMay + currMCBOEXUnitMay + currMCBEXPUnitMay,
        currMCBUnitJune = currMCBOEMUnitJune + currMCBOEXUnitJune + currMCBEXPUnitJune,
        currMCBUnitJuly = currMCBOEMUnitJuly + currMCBOEXUnitJuly + currMCBEXPUnitJuly,
        currMCBUnitAugust = currMCBOEMUnitAugust + currMCBOEXUnitAugust + currMCBEXPUnitAugust,
        currMCBUnitSeptember = currMCBOEMUnitSeptember + currMCBOEXUnitSeptember + currMCBEXPUnitSeptember,
        currMCBUnitOctober = currMCBOEMUnitOctober + currMCBOEXUnitOctober + currMCBEXPUnitOctober,
        currMCBUnitNovember = currMCBOEMUnitNovember + currMCBOEXUnitNovember + currMCBEXPUnitNovember,
        currMCBUnitDecember = currMCBOEMUnitDecember + currMCBOEXUnitDecember + currMCBEXPUnitDecember,
        currMCBBahtJanuary = currMCBOEMBahtJanuary + currMCBOEXBahtJanuary + currMCBEXPBahtJanuary,
        currMCBBahtFebruary = currMCBOEMBahtFebruary + currMCBOEXBahtFebruary + currMCBEXPBahtFebruary,
        currMCBBahtMarch = currMCBOEMBahtMarch + currMCBOEXBahtMarch + currMCBEXPBahtMarch,
        currMCBBahtApril = currMCBOEMBahtApril + currMCBOEXBahtApril + currMCBEXPBahtApril,
        currMCBBahtMay = currMCBOEMBahtMay + currMCBOEXBahtMay + currMCBEXPBahtMay,
        currMCBBahtJune = currMCBOEMBahtJune + currMCBOEXBahtJune + currMCBEXPBahtJune,
        currMCBBahtJuly = currMCBOEMBahtJuly + currMCBOEXBahtJuly + currMCBEXPBahtJuly,
        currMCBBahtAugust = currMCBOEMBahtAugust + currMCBOEXBahtAugust + currMCBEXPBahtAugust,
        currMCBBahtSeptember = currMCBOEMBahtSeptember + currMCBOEXBahtSeptember + currMCBEXPBahtSeptember,
        currMCBBahtOctober = currMCBOEMBahtOctober + currMCBOEXBahtOctober + currMCBEXPBahtOctober,
        currMCBBahtNovember = currMCBOEMBahtNovember + currMCBOEXBahtNovember + currMCBEXPBahtNovember,
        currMCBBahtDecember = currMCBOEMBahtDecember + currMCBOEXBahtDecember + currMCBEXPBahtDecember,
        currMCBTotalBaht = currOEMMCBTotalBaht + currOEXMCBTotalBaht + currEXPMCBTotalBaht,
        currMCBTotalUnit = currOEMMCBTotalUnit + currOEXMCBTotalUnit + currEXPMCBTotalUnit,
        oldMCBUnitJanuary = oldMCBOEMUnitJanuary + oldMCBOEXUnitJanuary + oldMCBEXPUnitJanuary,
        oldMCBUnitFebruary = oldMCBOEMUnitFebruary + oldMCBOEXUnitFebruary + oldMCBEXPUnitFebruary,
        oldMCBUnitMarch = oldMCBOEMUnitMarch + oldMCBOEXUnitMarch + oldMCBEXPUnitMarch,
        oldMCBUnitApril = oldMCBOEMUnitApril + oldMCBOEXUnitApril + oldMCBEXPUnitApril,
        oldMCBUnitMay = oldMCBOEMUnitMay + oldMCBOEXUnitMay + oldMCBEXPUnitMay,
        oldMCBUnitJune = oldMCBOEMUnitJune + oldMCBOEXUnitJune + oldMCBEXPUnitJune,
        oldMCBUnitJuly = oldMCBOEMUnitJuly + oldMCBOEXUnitJuly + oldMCBEXPUnitJuly,
        oldMCBUnitAugust = oldMCBOEMUnitAugust + oldMCBOEXUnitAugust + oldMCBEXPUnitAugust,
        oldMCBUnitSeptember = oldMCBOEMUnitSeptember + oldMCBOEXUnitSeptember + oldMCBEXPUnitSeptember,
        oldMCBUnitOctober = oldMCBOEMUnitOctober + oldMCBOEXUnitOctober + oldMCBEXPUnitOctober,
        oldMCBUnitNovember = oldMCBOEMUnitNovember + oldMCBOEXUnitNovember + oldMCBEXPUnitNovember,
        oldMCBUnitDecember = oldMCBOEMUnitDecember + oldMCBOEXUnitDecember + oldMCBEXPUnitDecember,
        oldMCBBahtJanuary = oldMCBOEMBahtJanuary + oldMCBOEXBahtJanuary + oldMCBEXPBahtJanuary,
        oldMCBBahtFebruary = oldMCBOEMBahtFebruary + oldMCBOEXBahtFebruary + oldMCBEXPBahtFebruary,
        oldMCBBahtMarch = oldMCBOEMBahtMarch + oldMCBOEXBahtMarch + oldMCBEXPBahtMarch,
        oldMCBBahtApril = oldMCBOEMBahtApril + oldMCBOEXBahtApril + oldMCBEXPBahtApril,
        oldMCBBahtMay = oldMCBOEMBahtMay + oldMCBOEXBahtMay + oldMCBEXPBahtMay,
        oldMCBBahtJune = oldMCBOEMBahtJune + oldMCBOEXBahtJune + oldMCBEXPBahtJune,
        oldMCBBahtJuly = oldMCBOEMBahtJuly + oldMCBOEXBahtJuly + oldMCBEXPBahtJuly,
        oldMCBBahtAugust = oldMCBOEMBahtAugust + oldMCBOEXBahtAugust + oldMCBEXPBahtAugust,
        oldMCBBahtSeptember = oldMCBOEMBahtSeptember + oldMCBOEXBahtSeptember + oldMCBEXPBahtSeptember,
        oldMCBBahtOctober = oldMCBOEMBahtOctober + oldMCBOEXBahtOctober + oldMCBEXPBahtOctober,
        oldMCBBahtNovember = oldMCBOEMBahtNovember + oldMCBOEXBahtNovember + oldMCBEXPBahtNovember,
        oldMCBBahtDecember = oldMCBOEMBahtDecember + oldMCBOEXBahtDecember + oldMCBEXPBahtDecember,
        oldMCBTotalBaht = oldOEMMCBTotalBaht + oldOEXMCBTotalBaht + oldEXPMCBTotalBaht,
        oldMCBTotalUnit = oldOEMMCBTotalUnit + oldOEXMCBTotalUnit + oldEXPMCBTotalUnit,

        currEBUnitJanuary = currEBSPDUnitJanuary,
        currEBUnitFebruary = currEBSPDUnitFebruary,
        currEBUnitMarch = currEBSPDUnitMarch,
        currEBUnitApril = currEBSPDUnitApril,
        currEBUnitMay = currEBSPDUnitMay,
        currEBUnitJune = currEBSPDUnitJune,
        currEBUnitJuly = currEBSPDUnitJuly,
        currEBUnitAugust = currEBSPDUnitAugust,
        currEBUnitSeptember = currEBSPDUnitSeptember,
        currEBUnitOctober = currEBSPDUnitOctober,
        currEBUnitNovember = currEBSPDUnitNovember,
        currEBUnitDecember = currEBSPDUnitDecember,
        currEBBahtJanuary = currEBSPDBahtJanuary,
        currEBBahtFebruary = currEBSPDBahtFebruary,
        currEBBahtMarch = currEBSPDBahtMarch,
        currEBBahtApril = currEBSPDBahtApril,
        currEBBahtMay = currEBSPDBahtMay,
        currEBBahtJune = currEBSPDBahtJune,
        currEBBahtJuly = currEBSPDBahtJuly,
        currEBBahtAugust = currEBSPDBahtAugust,
        currEBBahtSeptember = currEBSPDBahtSeptember,
        currEBBahtOctober = currEBSPDBahtOctober,
        currEBBahtNovember = currEBSPDBahtNovember,
        currEBBahtDecember = currEBSPDBahtDecember,
        currEBTotalBaht = currSPDEBTotalBaht,
        currEBTotalUnit = currSPDEBTotalUnit,
        oldEBUnitJanuary = oldEBSPDUnitJanuary,
        oldEBUnitFebruary = oldEBSPDUnitFebruary,
        oldEBUnitMarch = oldEBSPDUnitMarch,
        oldEBUnitApril = oldEBSPDUnitApril,
        oldEBUnitMay = oldEBSPDUnitMay,
        oldEBUnitJune = oldEBSPDUnitJune,
        oldEBUnitJuly = oldEBSPDUnitJuly,
        oldEBUnitAugust = oldEBSPDUnitAugust,
        oldEBUnitSeptember = oldEBSPDUnitSeptember,
        oldEBUnitOctober = oldEBSPDUnitOctober,
        oldEBUnitNovember = oldEBSPDUnitNovember,
        oldEBUnitDecember = oldEBSPDUnitDecember,
        oldEBBahtJanuary = oldEBSPDBahtJanuary,
        oldEBBahtFebruary = oldEBSPDBahtFebruary,
        oldEBBahtMarch = oldEBSPDBahtMarch,
        oldEBBahtApril = oldEBSPDBahtApril,
        oldEBBahtMay = oldEBSPDBahtMay,
        oldEBBahtJune = oldEBSPDBahtJune,
        oldEBBahtJuly = oldEBSPDBahtJuly,
        oldEBBahtAugust = oldEBSPDBahtAugust,
        oldEBBahtSeptember = oldEBSPDBahtSeptember,
        oldEBBahtOctober = oldEBSPDBahtOctober,
        oldEBBahtNovember = oldEBSPDBahtNovember,
        oldEBBahtDecember = oldEBSPDBahtDecember,
        oldEBTotalBaht = oldSPDEBTotalBaht,
        oldEBTotalUnit = oldSPDEBTotalUnit,

        currNPUnitJanuary = currNPSPDUnitJanuary,
        currNPUnitFebruary = currNPSPDUnitFebruary,
        currNPUnitMarch = currNPSPDUnitMarch,
        currNPUnitApril = currNPSPDUnitApril,
        currNPUnitMay = currNPSPDUnitMay,
        currNPUnitJune = currNPSPDUnitJune,
        currNPUnitJuly = currNPSPDUnitJuly,
        currNPUnitAugust = currNPSPDUnitAugust,
        currNPUnitSeptember = currNPSPDUnitSeptember,
        currNPUnitOctober = currNPSPDUnitOctober,
        currNPUnitNovember = currNPSPDUnitNovember,
        currNPUnitDecember = currNPSPDUnitDecember,
        currNPBahtJanuary = currNPSPDBahtJanuary,
        currNPBahtFebruary = currNPSPDBahtFebruary,
        currNPBahtMarch = currNPSPDBahtMarch,
        currNPBahtApril = currNPSPDBahtApril,
        currNPBahtMay = currNPSPDBahtMay,
        currNPBahtJune = currNPSPDBahtJune,
        currNPBahtJuly = currNPSPDBahtJuly,
        currNPBahtAugust = currNPSPDBahtAugust,
        currNPBahtSeptember = currNPSPDBahtSeptember,
        currNPBahtOctober = currNPSPDBahtOctober,
        currNPBahtNovember = currNPSPDBahtNovember,
        currNPBahtDecember = currNPSPDBahtDecember,
        currNPTotalBaht = currSPDNPTotalBaht,
        currNPTotalUnit = currSPDNPTotalUnit,
        oldNPUnitJanuary = oldNPSPDUnitJanuary,
        oldNPUnitFebruary = oldNPSPDUnitFebruary,
        oldNPUnitMarch = oldNPSPDUnitMarch,
        oldNPUnitApril = oldNPSPDUnitApril,
        oldNPUnitMay = oldNPSPDUnitMay,
        oldNPUnitJune = oldNPSPDUnitJune,
        oldNPUnitJuly = oldNPSPDUnitJuly,
        oldNPUnitAugust = oldNPSPDUnitAugust,
        oldNPUnitSeptember = oldNPSPDUnitSeptember,
        oldNPUnitOctober = oldNPSPDUnitOctober,
        oldNPUnitNovember = oldNPSPDUnitNovember,
        oldNPUnitDecember = oldNPSPDUnitDecember,
        oldNPBahtJanuary = oldNPSPDBahtJanuary,
        oldNPBahtFebruary = oldNPSPDBahtFebruary,
        oldNPBahtMarch = oldNPSPDBahtMarch,
        oldNPBahtApril = oldNPSPDBahtApril,
        oldNPBahtMay = oldNPSPDBahtMay,
        oldNPBahtJune = oldNPSPDBahtJune,
        oldNPBahtJuly = oldNPSPDBahtJuly,
        oldNPBahtAugust = oldNPSPDBahtAugust,
        oldNPBahtSeptember = oldNPSPDBahtSeptember,
        oldNPBahtOctober = oldNPSPDBahtOctober,
        oldNPBahtNovember = oldNPSPDBahtNovember,
        oldNPBahtDecember = oldNPSPDBahtDecember,
        oldNPTotalBaht = oldSPDNPTotalBaht,
        oldNPTotalUnit = oldSPDNPTotalUnit,

        currINDUnitJanuary = currINDSPDUnitJanuary,
        currINDUnitFebruary = currINDSPDUnitFebruary,
        currINDUnitMarch = currINDSPDUnitMarch,
        currINDUnitApril = currINDSPDUnitApril,
        currINDUnitMay = currINDSPDUnitMay,
        currINDUnitJune = currINDSPDUnitJune,
        currINDUnitJuly = currINDSPDUnitJuly,
        currINDUnitAugust = currINDSPDUnitAugust,
        currINDUnitSeptember = currINDSPDUnitSeptember,
        currINDUnitOctober = currINDSPDUnitOctober,
        currINDUnitNovember = currINDSPDUnitNovember,
        currINDUnitDecember = currINDSPDUnitDecember,
        currINDBahtJanuary = currINDSPDBahtJanuary,
        currINDBahtFebruary = currINDSPDBahtFebruary,
        currINDBahtMarch = currINDSPDBahtMarch,
        currINDBahtApril = currINDSPDBahtApril,
        currINDBahtMay = currINDSPDBahtMay,
        currINDBahtJune = currINDSPDBahtJune,
        currINDBahtJuly = currINDSPDBahtJuly,
        currINDBahtAugust = currINDSPDBahtAugust,
        currINDBahtSeptember = currINDSPDBahtSeptember,
        currINDBahtOctober = currINDSPDBahtOctober,
        currINDBahtNovember = currINDSPDBahtNovember,
        currINDBahtDecember = currINDSPDBahtDecember,
        currINDTotalBaht = currSPDINDTotalBaht,
        currINDTotalUnit = currSPDINDTotalUnit,
        oldINDUnitJanuary = oldINDSPDUnitJanuary,
        oldINDUnitFebruary = oldINDSPDUnitFebruary,
        oldINDUnitMarch = oldINDSPDUnitMarch,
        oldINDUnitApril = oldINDSPDUnitApril,
        oldINDUnitMay = oldINDSPDUnitMay,
        oldINDUnitJune = oldINDSPDUnitJune,
        oldINDUnitJuly = oldINDSPDUnitJuly,
        oldINDUnitAugust = oldINDSPDUnitAugust,
        oldINDUnitSeptember = oldINDSPDUnitSeptember,
        oldINDUnitOctober = oldINDSPDUnitOctober,
        oldINDUnitNovember = oldINDSPDUnitNovember,
        oldINDUnitDecember = oldINDSPDUnitDecember,
        oldINDBahtJanuary = oldINDSPDBahtJanuary,
        oldINDBahtFebruary = oldINDSPDBahtFebruary,
        oldINDBahtMarch = oldINDSPDBahtMarch,
        oldINDBahtApril = oldINDSPDBahtApril,
        oldINDBahtMay = oldINDSPDBahtMay,
        oldINDBahtJune = oldINDSPDBahtJune,
        oldINDBahtJuly = oldINDSPDBahtJuly,
        oldINDBahtAugust = oldINDSPDBahtAugust,
        oldINDBahtSeptember = oldINDSPDBahtSeptember,
        oldINDBahtOctober = oldINDSPDBahtOctober,
        oldINDBahtNovember = oldINDSPDBahtNovember,
        oldINDBahtDecember = oldINDSPDBahtDecember,
        oldINDTotalBaht = oldSPDINDTotalBaht,
        oldINDTotalUnit = oldSPDINDTotalUnit,

        currOTHUnitJanuary = currOTHSPDUnitJanuary,
        currOTHUnitFebruary = currOTHSPDUnitFebruary,
        currOTHUnitMarch = currOTHSPDUnitMarch,
        currOTHUnitApril = currOTHSPDUnitApril,
        currOTHUnitMay = currOTHSPDUnitMay,
        currOTHUnitJune = currOTHSPDUnitJune,
        currOTHUnitJuly = currOTHSPDUnitJuly,
        currOTHUnitAugust = currOTHSPDUnitAugust,
        currOTHUnitSeptember = currOTHSPDUnitSeptember,
        currOTHUnitOctober = currOTHSPDUnitOctober,
        currOTHUnitNovember = currOTHSPDUnitNovember,
        currOTHUnitDecember = currOTHSPDUnitDecember,
        currOTHBahtJanuary = currOTHSPDBahtJanuary,
        currOTHBahtFebruary = currOTHSPDBahtFebruary,
        currOTHBahtMarch = currOTHSPDBahtMarch,
        currOTHBahtApril = currOTHSPDBahtApril,
        currOTHBahtMay = currOTHSPDBahtMay,
        currOTHBahtJune = currOTHSPDBahtJune,
        currOTHBahtJuly = currOTHSPDBahtJuly,
        currOTHBahtAugust = currOTHSPDBahtAugust,
        currOTHBahtSeptember = currOTHSPDBahtSeptember,
        currOTHBahtOctober = currOTHSPDBahtOctober,
        currOTHBahtNovember = currOTHSPDBahtNovember,
        currOTHBahtDecember = currOTHSPDBahtDecember,
        currOTHTotalBaht = currSPDOTHTotalBaht,
        currOTHTotalUnit = currSPDOTHTotalUnit,
        oldOTHUnitJanuary = oldOTHSPDUnitJanuary,
        oldOTHUnitFebruary = oldOTHSPDUnitFebruary,
        oldOTHUnitMarch = oldOTHSPDUnitMarch,
        oldOTHUnitApril = oldOTHSPDUnitApril,
        oldOTHUnitMay = oldOTHSPDUnitMay,
        oldOTHUnitJune = oldOTHSPDUnitJune,
        oldOTHUnitJuly = oldOTHSPDUnitJuly,
        oldOTHUnitAugust = oldOTHSPDUnitAugust,
        oldOTHUnitSeptember = oldOTHSPDUnitSeptember,
        oldOTHUnitOctober = oldOTHSPDUnitOctober,
        oldOTHUnitNovember = oldOTHSPDUnitNovember,
        oldOTHUnitDecember = oldOTHSPDUnitDecember,
        oldOTHBahtJanuary = oldOTHSPDBahtJanuary,
        oldOTHBahtFebruary = oldOTHSPDBahtFebruary,
        oldOTHBahtMarch = oldOTHSPDBahtMarch,
        oldOTHBahtApril = oldOTHSPDBahtApril,
        oldOTHBahtMay = oldOTHSPDBahtMay,
        oldOTHBahtJune = oldOTHSPDBahtJune,
        oldOTHBahtJuly = oldOTHSPDBahtJuly,
        oldOTHBahtAugust = oldOTHSPDBahtAugust,
        oldOTHBahtSeptember = oldOTHSPDBahtSeptember,
        oldOTHBahtOctober = oldOTHSPDBahtOctober,
        oldOTHBahtNovember = oldOTHSPDBahtNovember,
        oldOTHBahtDecember = oldOTHSPDBahtDecember,
        oldOTHTotalBaht = oldSPDOTHTotalBaht,
        oldOTHTotalUnit = oldSPDOTHTotalUnit;

    growthOEMBahtJanuary = ((currOEMBahtJanuary - oldOEMBahtJanuary) * 100) / oldOEMBahtJanuary;
    growthOEMBahtFebruary = ((currOEMBahtFebruary - oldOEMBahtFebruary) * 100) / oldOEMBahtFebruary;
    growthOEMBahtMarch = ((currOEMBahtMarch - oldOEMBahtMarch) * 100) / oldOEMBahtMarch;
    growthOEMBahtApril = ((currOEMBahtApril - oldOEMBahtApril) * 100) / oldOEMBahtApril;
    growthOEMBahtMay = ((currOEMBahtMay - oldOEMBahtMay) * 100) / oldOEMBahtMay;
    growthOEMBahtJune = ((currOEMBahtJune - oldOEMBahtJune) * 100) / oldOEMBahtJune;
    growthOEMBahtJuly = ((currOEMBahtJuly - oldOEMBahtJuly) * 100) / oldOEMBahtJuly;
    growthOEMBahtAugust = ((currOEMBahtAugust - oldOEMBahtAugust) * 100) / oldOEMBahtAugust;
    growthOEMBahtSeptember = ((currOEMBahtSeptember - oldOEMBahtSeptember) * 100) / oldOEMBahtSeptember;
    growthOEMBahtOctober = ((currOEMBahtOctober - oldOEMBahtOctober) * 100) / oldOEMBahtOctober;
    growthOEMBahtNovember = ((currOEMBahtNovember - oldOEMBahtNovember) * 100) / oldOEMBahtNovember;
    growthOEMBahtDecember = ((currOEMBahtDecember - oldOEMBahtDecember) * 100) / oldOEMBahtDecember;
    growthOEMBahtTotal = ((currOEMTotalBaht - oldOEMTotalBaht) * 100) / oldOEMTotalBaht;
    growthOEMBahtQ1 = ((currOEMBahtQ1 - oldOEMBahtQ1) * 100) / oldOEMBahtQ1;
    growthOEMBahtQ2 = ((currOEMBahtQ2 - oldOEMBahtQ2) * 100) / oldOEMBahtQ2;
    growthOEMBahtQ3 = ((currOEMBahtQ3 - oldOEMBahtQ3) * 100) / oldOEMBahtQ3;
    growthOEMBahtQ4 = ((currOEMBahtQ4 - oldOEMBahtQ4) * 100) / oldOEMBahtQ4;

    growthOEMUnitJanuary = ((currOEMUnitJanuary - oldOEMUnitJanuary) * 100) / oldOEMUnitJanuary;
    growthOEMUnitFebruary = ((currOEMUnitFebruary - oldOEMUnitFebruary) * 100) / oldOEMUnitFebruary;
    growthOEMUnitMarch = ((currOEMUnitMarch - oldOEMUnitMarch) * 100) / oldOEMUnitMarch;
    growthOEMUnitApril = ((currOEMUnitApril - oldOEMUnitApril) * 100) / oldOEMUnitApril;
    growthOEMUnitMay = ((currOEMUnitMay - oldOEMUnitMay) * 100) / oldOEMUnitMay;
    growthOEMUnitJune = ((currOEMUnitJune - oldOEMUnitJune) * 100) / oldOEMUnitJune;
    growthOEMUnitJuly = ((currOEMUnitJuly - oldOEMUnitJuly) * 100) / oldOEMUnitJuly;
    growthOEMUnitAugust = ((currOEMUnitAugust - oldOEMUnitAugust) * 100) / oldOEMUnitAugust;
    growthOEMUnitSeptember = ((currOEMUnitSeptember - oldOEMUnitSeptember) * 100) / oldOEMUnitSeptember;
    growthOEMUnitOctober = ((currOEMUnitOctober - oldOEMUnitOctober) * 100) / oldOEMUnitOctober;
    growthOEMUnitNovember = ((currOEMUnitNovember - oldOEMUnitNovember) * 100) / oldOEMUnitNovember;
    growthOEMUnitDecember = ((currOEMUnitDecember - oldOEMUnitDecember) * 100) / oldOEMUnitDecember;
    growthOEMUnitTotal = ((currOEMTotalUnit - oldOEMTotalUnit) * 100) / oldOEMTotalUnit;
    growthOEMUnitQ1 = ((currOEMUnitQ1 - oldOEMUnitQ1) * 100) / oldOEMUnitQ1;
    growthOEMUnitQ2 = ((currOEMUnitQ2 - oldOEMUnitQ2) * 100) / oldOEMUnitQ2;
    growthOEMUnitQ3 = ((currOEMUnitQ3 - oldOEMUnitQ3) * 100) / oldOEMUnitQ3;
    growthOEMUnitQ4 = ((currOEMUnitQ4 - oldOEMUnitQ4) * 100) / oldOEMUnitQ4;

    growthOEXBahtJanuary = ((currOEXBahtJanuary - oldOEXBahtJanuary) * 100) / oldOEXBahtJanuary;
    growthOEXBahtFebruary = ((currOEXBahtFebruary - oldOEXBahtFebruary) * 100) / oldOEXBahtFebruary;
    growthOEXBahtMarch = ((currOEXBahtMarch - oldOEXBahtMarch) * 100) / oldOEXBahtMarch;
    growthOEXBahtApril = ((currOEXBahtApril - oldOEXBahtApril) * 100) / oldOEXBahtApril;
    growthOEXBahtMay = ((currOEXBahtMay - oldOEXBahtMay) * 100) / oldOEXBahtMay;
    growthOEXBahtJune = ((currOEXBahtJune - oldOEXBahtJune) * 100) / oldOEXBahtJune;
    growthOEXBahtJuly = ((currOEXBahtJuly - oldOEXBahtJuly) * 100) / oldOEXBahtJuly;
    growthOEXBahtAugust = ((currOEXBahtAugust - oldOEXBahtAugust) * 100) / oldOEXBahtAugust;
    growthOEXBahtSeptember = ((currOEXBahtSeptember - oldOEXBahtSeptember) * 100) / oldOEXBahtSeptember;
    growthOEXBahtOctober = ((currOEXBahtOctober - oldOEXBahtOctober) * 100) / oldOEXBahtOctober;
    growthOEXBahtNovember = ((currOEXBahtNovember - oldOEXBahtNovember) * 100) / oldOEXBahtNovember;
    growthOEXBahtDecember = ((currOEXBahtDecember - oldOEXBahtDecember) * 100) / oldOEXBahtDecember;
    growthOEXBahtTotal = ((currOEXTotalBaht - oldOEXTotalBaht) * 100) / oldOEXTotalBaht;
    growthOEXBahtQ1 = ((currOEXBahtQ1 - oldOEXBahtQ1) * 100) / oldOEXBahtQ1;
    growthOEXBahtQ2 = ((currOEXBahtQ2 - oldOEXBahtQ2) * 100) / oldOEXBahtQ2;
    growthOEXBahtQ3 = ((currOEXBahtQ3 - oldOEXBahtQ3) * 100) / oldOEXBahtQ3;
    growthOEXBahtQ4 = ((currOEXBahtQ4 - oldOEXBahtQ4) * 100) / oldOEXBahtQ4;

    growthOEXUnitJanuary = ((currOEXUnitJanuary - oldOEXUnitJanuary) * 100) / oldOEXUnitJanuary;
    growthOEXUnitFebruary = ((currOEXUnitFebruary - oldOEXUnitFebruary) * 100) / oldOEXUnitFebruary;
    growthOEXUnitMarch = ((currOEXUnitMarch - oldOEXUnitMarch) * 100) / oldOEXUnitMarch;
    growthOEXUnitApril = ((currOEXUnitApril - oldOEXUnitApril) * 100) / oldOEXUnitApril;
    growthOEXUnitMay = ((currOEXUnitMay - oldOEXUnitMay) * 100) / oldOEXUnitMay;
    growthOEXUnitJune = ((currOEXUnitJune - oldOEXUnitJune) * 100) / oldOEXUnitJune;
    growthOEXUnitJuly = ((currOEXUnitJuly - oldOEXUnitJuly) * 100) / oldOEXUnitJuly;
    growthOEXUnitAugust = ((currOEXUnitAugust - oldOEXUnitAugust) * 100) / oldOEXUnitAugust;
    growthOEXUnitSeptember = ((currOEXUnitSeptember - oldOEXUnitSeptember) * 100) / oldOEXUnitSeptember;
    growthOEXUnitOctober = ((currOEXUnitOctober - oldOEXUnitOctober) * 100) / oldOEXUnitOctober;
    growthOEXUnitNovember = ((currOEXUnitNovember - oldOEXUnitNovember) * 100) / oldOEXUnitNovember;
    growthOEXUnitDecember = ((currOEXUnitDecember - oldOEXUnitDecember) * 100) / oldOEXUnitDecember;
    growthOEXUnitTotal = ((currOEXTotalUnit - oldOEXTotalUnit) * 100) / oldOEXTotalUnit;
    growthOEXUnitQ1 = ((currOEXUnitQ1 - oldOEXUnitQ1) * 100) / oldOEXUnitQ1;
    growthOEXUnitQ2 = ((currOEXUnitQ2 - oldOEXUnitQ2) * 100) / oldOEXUnitQ2;
    growthOEXUnitQ3 = ((currOEXUnitQ3 - oldOEXUnitQ3) * 100) / oldOEXUnitQ3;
    growthOEXUnitQ4 = ((currOEXUnitQ4 - oldOEXUnitQ4) * 100) / oldOEXUnitQ4;

    growthEXPBahtJanuary = ((currEXPBahtJanuary - oldEXPBahtJanuary) * 100) / oldEXPBahtJanuary;
    growthEXPBahtFebruary = ((currEXPBahtFebruary - oldEXPBahtFebruary) * 100) / oldEXPBahtFebruary;
    growthEXPBahtMarch = ((currEXPBahtMarch - oldEXPBahtMarch) * 100) / oldEXPBahtMarch;
    growthEXPBahtApril = ((currEXPBahtApril - oldEXPBahtApril) * 100) / oldEXPBahtApril;
    growthEXPBahtMay = ((currEXPBahtMay - oldEXPBahtMay) * 100) / oldEXPBahtMay;
    growthEXPBahtJune = ((currEXPBahtJune - oldEXPBahtJune) * 100) / oldEXPBahtJune;
    growthEXPBahtJuly = ((currEXPBahtJuly - oldEXPBahtJuly) * 100) / oldEXPBahtJuly;
    growthEXPBahtAugust = ((currEXPBahtAugust - oldEXPBahtAugust) * 100) / oldEXPBahtAugust;
    growthEXPBahtSeptember = ((currEXPBahtSeptember - oldEXPBahtSeptember) * 100) / oldEXPBahtSeptember;
    growthEXPBahtOctober = ((currEXPBahtOctober - oldEXPBahtOctober) * 100) / oldEXPBahtOctober;
    growthEXPBahtNovember = ((currEXPBahtNovember - oldEXPBahtNovember) * 100) / oldEXPBahtNovember;
    growthEXPBahtDecember = ((currEXPBahtDecember - oldEXPBahtDecember) * 100) / oldEXPBahtDecember;
    growthEXPBahtTotal = ((currEXPTotalBaht - oldEXPTotalBaht) * 100) / oldEXPTotalBaht;
    growthEXPBahtQ1 = ((currEXPBahtQ1 - oldEXPBahtQ1) * 100) / oldEXPBahtQ1;
    growthEXPBahtQ2 = ((currEXPBahtQ2 - oldEXPBahtQ2) * 100) / oldEXPBahtQ2;
    growthEXPBahtQ3 = ((currEXPBahtQ3 - oldEXPBahtQ3) * 100) / oldEXPBahtQ3;
    growthEXPBahtQ4 = ((currEXPBahtQ4 - oldEXPBahtQ4) * 100) / oldEXPBahtQ4;

    growthEXPUnitJanuary = ((currEXPUnitJanuary - oldEXPUnitJanuary) * 100) / oldEXPUnitJanuary;
    growthEXPUnitFebruary = ((currEXPUnitFebruary - oldEXPUnitFebruary) * 100) / oldEXPUnitFebruary;
    growthEXPUnitMarch = ((currEXPUnitMarch - oldEXPUnitMarch) * 100) / oldEXPUnitMarch;
    growthEXPUnitApril = ((currEXPUnitApril - oldEXPUnitApril) * 100) / oldEXPUnitApril;
    growthEXPUnitMay = ((currEXPUnitMay - oldEXPUnitMay) * 100) / oldEXPUnitMay;
    growthEXPUnitJune = ((currEXPUnitJune - oldEXPUnitJune) * 100) / oldEXPUnitJune;
    growthEXPUnitJuly = ((currEXPUnitJuly - oldEXPUnitJuly) * 100) / oldEXPUnitJuly;
    growthEXPUnitAugust = ((currEXPUnitAugust - oldEXPUnitAugust) * 100) / oldEXPUnitAugust;
    growthEXPUnitSeptember = ((currEXPUnitSeptember - oldEXPUnitSeptember) * 100) / oldEXPUnitSeptember;
    growthEXPUnitOctober = ((currEXPUnitOctober - oldEXPUnitOctober) * 100) / oldEXPUnitOctober;
    growthEXPUnitNovember = ((currEXPUnitNovember - oldEXPUnitNovember) * 100) / oldEXPUnitNovember;
    growthEXPUnitDecember = ((currEXPUnitDecember - oldEXPUnitDecember) * 100) / oldEXPUnitDecember;
    growthEXPUnitTotal = ((currEXPTotalUnit - oldEXPTotalUnit) * 100) / oldEXPTotalUnit;
    growthEXPUnitQ1 = ((currEXPUnitQ1 - oldEXPUnitQ1) * 100) / oldEXPUnitQ1;
    growthEXPUnitQ2 = ((currEXPUnitQ2 - oldEXPUnitQ2) * 100) / oldEXPUnitQ2;
    growthEXPUnitQ3 = ((currEXPUnitQ3 - oldEXPUnitQ3) * 100) / oldEXPUnitQ3;
    growthEXPUnitQ4 = ((currEXPUnitQ4 - oldEXPUnitQ4) * 100) / oldEXPUnitQ4;

    growthSPDBahtJanuary = ((currSPDBahtJanuary - oldSPDBahtJanuary) * 100) / oldSPDBahtJanuary;
    growthSPDBahtFebruary = ((currSPDBahtFebruary - oldSPDBahtFebruary) * 100) / oldSPDBahtFebruary;
    growthSPDBahtMarch = ((currSPDBahtMarch - oldSPDBahtMarch) * 100) / oldSPDBahtMarch;
    growthSPDBahtApril = ((currSPDBahtApril - oldSPDBahtApril) * 100) / oldSPDBahtApril;
    growthSPDBahtMay = ((currSPDBahtMay - oldSPDBahtMay) * 100) / oldSPDBahtMay;
    growthSPDBahtJune = ((currSPDBahtJune - oldSPDBahtJune) * 100) / oldSPDBahtJune;
    growthSPDBahtJuly = ((currSPDBahtJuly - oldSPDBahtJuly) * 100) / oldSPDBahtJuly;
    growthSPDBahtAugust = ((currSPDBahtAugust - oldSPDBahtAugust) * 100) / oldSPDBahtAugust;
    growthSPDBahtSeptember = ((currSPDBahtSeptember - oldSPDBahtSeptember) * 100) / oldSPDBahtSeptember;
    growthSPDBahtOctober = ((currSPDBahtOctober - oldSPDBahtOctober) * 100) / oldSPDBahtOctober;
    growthSPDBahtNovember = ((currSPDBahtNovember - oldSPDBahtNovember) * 100) / oldSPDBahtNovember;
    growthSPDBahtDecember = ((currSPDBahtDecember - oldSPDBahtDecember) * 100) / oldSPDBahtDecember;
    growthSPDBahtTotal = ((currSPDTotalBaht - oldSPDTotalBaht) * 100) / oldSPDTotalBaht;
    growthSPDBahtQ1 = ((currSPDBahtQ1 - oldSPDBahtQ1) * 100) / oldSPDBahtQ1;
    growthSPDBahtQ2 = ((currSPDBahtQ2 - oldSPDBahtQ2) * 100) / oldSPDBahtQ2;
    growthSPDBahtQ3 = ((currSPDBahtQ3 - oldSPDBahtQ3) * 100) / oldSPDBahtQ3;
    growthSPDBahtQ4 = ((currSPDBahtQ4 - oldSPDBahtQ4) * 100) / oldSPDBahtQ4;

    growthSPDUnitJanuary = ((currSPDUnitJanuary - oldSPDUnitJanuary) * 100) / oldSPDUnitJanuary;
    growthSPDUnitFebruary = ((currSPDUnitFebruary - oldSPDUnitFebruary) * 100) / oldSPDUnitFebruary;
    growthSPDUnitMarch = ((currSPDUnitMarch - oldSPDUnitMarch) * 100) / oldSPDUnitMarch;
    growthSPDUnitApril = ((currSPDUnitApril - oldSPDUnitApril) * 100) / oldSPDUnitApril;
    growthSPDUnitMay = ((currSPDUnitMay - oldSPDUnitMay) * 100) / oldSPDUnitMay;
    growthSPDUnitJune = ((currSPDUnitJune - oldSPDUnitJune) * 100) / oldSPDUnitJune;
    growthSPDUnitJuly = ((currSPDUnitJuly - oldSPDUnitJuly) * 100) / oldSPDUnitJuly;
    growthSPDUnitAugust = ((currSPDUnitAugust - oldSPDUnitAugust) * 100) / oldSPDUnitAugust;
    growthSPDUnitSeptember = ((currSPDUnitSeptember - oldSPDUnitSeptember) * 100) / oldSPDUnitSeptember;
    growthSPDUnitOctober = ((currSPDUnitOctober - oldSPDUnitOctober) * 100) / oldSPDUnitOctober;
    growthSPDUnitNovember = ((currSPDUnitNovember - oldSPDUnitNovember) * 100) / oldSPDUnitNovember;
    growthSPDUnitDecember = ((currSPDUnitDecember - oldSPDUnitDecember) * 100) / oldSPDUnitDecember;
    growthSPDUnitTotal = ((currSPDTotalUnit - oldSPDTotalUnit) * 100) / oldSPDTotalUnit;
    growthSPDUnitQ1 = ((currSPDUnitQ1 - oldSPDUnitQ1) * 100) / oldSPDUnitQ1;
    growthSPDUnitQ2 = ((currSPDUnitQ2 - oldSPDUnitQ2) * 100) / oldSPDUnitQ2;
    growthSPDUnitQ3 = ((currSPDUnitQ3 - oldSPDUnitQ3) * 100) / oldSPDUnitQ3;
    growthSPDUnitQ4 = ((currSPDUnitQ4 - oldSPDUnitQ4) * 100) / oldSPDUnitQ4;

    targetAMBBahtJanuary = accounting.unformat(targetOEMAMB.Amt01) + accounting.unformat(targetOEXAMB.Amt01) + accounting.unformat(targetEXPAMB.Amt01);
    targetAMBBahtFebruary = accounting.unformat(targetOEMAMB.Amt02) + accounting.unformat(targetOEXAMB.Amt02) + accounting.unformat(targetEXPAMB.Amt02);
    targetAMBBahtMarch = accounting.unformat(targetOEMAMB.Amt03) + accounting.unformat(targetOEXAMB.Amt03) + accounting.unformat(targetEXPAMB.Amt03);
    targetAMBBahtApril = accounting.unformat(targetOEMAMB.Amt04) + accounting.unformat(targetOEXAMB.Amt04) + accounting.unformat(targetEXPAMB.Amt04);
    targetAMBBahtMay = accounting.unformat(targetOEMAMB.Amt05) + accounting.unformat(targetOEXAMB.Amt05) + accounting.unformat(targetEXPAMB.Amt05);
    targetAMBBahtJune = accounting.unformat(targetOEMAMB.Amt06) + accounting.unformat(targetOEXAMB.Amt06) + accounting.unformat(targetEXPAMB.Amt06);
    targetAMBBahtJuly = accounting.unformat(targetOEMAMB.Amt07) + accounting.unformat(targetOEXAMB.Amt07) + accounting.unformat(targetEXPAMB.Amt07);
    targetAMBBahtAugust = accounting.unformat(targetOEMAMB.Amt08) + accounting.unformat(targetOEXAMB.Amt08) + accounting.unformat(targetEXPAMB.Amt08);
    targetAMBBahtSeptember = accounting.unformat(targetOEMAMB.Amt09) + accounting.unformat(targetOEXAMB.Amt09) + accounting.unformat(targetEXPAMB.Amt09);
    targetAMBBahtOctober = accounting.unformat(targetOEMAMB.Amt10) + accounting.unformat(targetOEXAMB.Amt10) + accounting.unformat(targetEXPAMB.Amt10);
    targetAMBBahtNovember = accounting.unformat(targetOEMAMB.Amt11) + accounting.unformat(targetOEXAMB.Amt11) + accounting.unformat(targetEXPAMB.Amt11);
    targetAMBBahtDecember = accounting.unformat(targetOEMAMB.Amt12) + accounting.unformat(targetOEXAMB.Amt12) + accounting.unformat(targetEXPAMB.Amt12);
    targetAMBBahtTotal = targetAMBBahtJanuary + targetAMBBahtFebruary + targetAMBBahtMarch + targetAMBBahtApril + targetAMBBahtMay + targetAMBBahtJune + targetAMBBahtJuly + targetAMBBahtAugust + targetAMBBahtSeptember + targetAMBBahtOctober + targetAMBBahtNovember + targetAMBBahtDecember;
    targetAMBUnitJanuary = accounting.unformat(targetOEMAMB.Unit01) + accounting.unformat(targetOEXAMB.Unit01) + accounting.unformat(targetEXPAMB.Unit01);
    targetAMBUnitFebruary = accounting.unformat(targetOEMAMB.Unit02) + accounting.unformat(targetOEXAMB.Unit02) + accounting.unformat(targetEXPAMB.Unit02);
    targetAMBUnitMarch = accounting.unformat(targetOEMAMB.Unit03) + accounting.unformat(targetOEXAMB.Unit03) + accounting.unformat(targetEXPAMB.Unit03);
    targetAMBUnitApril = accounting.unformat(targetOEMAMB.Unit04) + accounting.unformat(targetOEXAMB.Unit04) + accounting.unformat(targetEXPAMB.Unit04);
    targetAMBUnitMay = accounting.unformat(targetOEMAMB.Unit05) + accounting.unformat(targetOEXAMB.Unit05) + accounting.unformat(targetEXPAMB.Unit05);
    targetAMBUnitJune = accounting.unformat(targetOEMAMB.Unit06) + accounting.unformat(targetOEXAMB.Unit06) + accounting.unformat(targetEXPAMB.Unit06);
    targetAMBUnitJuly = accounting.unformat(targetOEMAMB.Unit07) + accounting.unformat(targetOEXAMB.Unit07) + accounting.unformat(targetEXPAMB.Unit07);
    targetAMBUnitAugust = accounting.unformat(targetOEMAMB.Unit08) + accounting.unformat(targetOEXAMB.Unit08) + accounting.unformat(targetEXPAMB.Unit08);
    targetAMBUnitSeptember = accounting.unformat(targetOEMAMB.Unit09) + accounting.unformat(targetOEXAMB.Unit09) + accounting.unformat(targetEXPAMB.Unit09);
    targetAMBUnitOctober = accounting.unformat(targetOEMAMB.Unit10) + accounting.unformat(targetOEXAMB.Unit10) + accounting.unformat(targetEXPAMB.Unit10);
    targetAMBUnitNovember = accounting.unformat(targetOEMAMB.Unit11) + accounting.unformat(targetOEXAMB.Unit11) + accounting.unformat(targetEXPAMB.Unit11);
    targetAMBUnitDecember = accounting.unformat(targetOEMAMB.Unit12) + accounting.unformat(targetOEXAMB.Unit12) + accounting.unformat(targetEXPAMB.Unit12);
    targetAMBUnitTotal = targetAMBUnitJanuary + targetAMBUnitFebruary + targetAMBUnitMarch + targetAMBUnitApril + targetAMBUnitMay + targetAMBUnitJune + targetAMBUnitJuly + targetAMBUnitAugust + targetAMBUnitSeptember + targetAMBUnitOctober + targetAMBUnitNovember + targetAMBUnitDecember;

    targetMCBBahtJanuary = accounting.unformat(targetOEMMCB.Amt01) + accounting.unformat(targetOEXMCB.Amt01) + accounting.unformat(targetEXPMCB.Amt01);
    targetMCBBahtFebruary = accounting.unformat(targetOEMMCB.Amt02) + accounting.unformat(targetOEXMCB.Amt02) + accounting.unformat(targetEXPMCB.Amt02);
    targetMCBBahtMarch = accounting.unformat(targetOEMMCB.Amt03) + accounting.unformat(targetOEXMCB.Amt03) + accounting.unformat(targetEXPMCB.Amt03);
    targetMCBBahtApril = accounting.unformat(targetOEMMCB.Amt04) + accounting.unformat(targetOEXMCB.Amt04) + accounting.unformat(targetEXPMCB.Amt04);
    targetMCBBahtMay = accounting.unformat(targetOEMMCB.Amt05) + accounting.unformat(targetOEXMCB.Amt05) + accounting.unformat(targetEXPMCB.Amt05);
    targetMCBBahtJune = accounting.unformat(targetOEMMCB.Amt06) + accounting.unformat(targetOEXMCB.Amt06) + accounting.unformat(targetEXPMCB.Amt06);
    targetMCBBahtJuly = accounting.unformat(targetOEMMCB.Amt07) + accounting.unformat(targetOEXMCB.Amt07) + accounting.unformat(targetEXPMCB.Amt07);
    targetMCBBahtAugust = accounting.unformat(targetOEMMCB.Amt08) + accounting.unformat(targetOEXMCB.Amt08) + accounting.unformat(targetEXPMCB.Amt08);
    targetMCBBahtSeptember = accounting.unformat(targetOEMMCB.Amt09) + accounting.unformat(targetOEXMCB.Amt09) + accounting.unformat(targetEXPMCB.Amt09);
    targetMCBBahtOctober = accounting.unformat(targetOEMMCB.Amt10) + accounting.unformat(targetOEXMCB.Amt10) + accounting.unformat(targetEXPMCB.Amt10);
    targetMCBBahtNovember = accounting.unformat(targetOEMMCB.Amt11) + accounting.unformat(targetOEXMCB.Amt11) + accounting.unformat(targetEXPMCB.Amt11);
    targetMCBBahtDecember = accounting.unformat(targetOEMMCB.Amt12) + accounting.unformat(targetOEXMCB.Amt12) + accounting.unformat(targetEXPMCB.Amt12);
    targetMCBBahtTotal = targetMCBBahtJanuary + targetMCBBahtFebruary + targetMCBBahtMarch + targetMCBBahtApril + targetMCBBahtMay + targetMCBBahtJune + targetMCBBahtJuly + targetMCBBahtAugust + targetMCBBahtSeptember + targetMCBBahtOctober + targetMCBBahtNovember + targetMCBBahtDecember;
    targetMCBUnitJanuary = accounting.unformat(targetOEMMCB.Unit01) + accounting.unformat(targetOEXMCB.Unit01) + accounting.unformat(targetEXPMCB.Unit01);
    targetMCBUnitFebruary = accounting.unformat(targetOEMMCB.Unit02) + accounting.unformat(targetOEXMCB.Unit02) + accounting.unformat(targetEXPMCB.Unit02);
    targetMCBUnitMarch = accounting.unformat(targetOEMMCB.Unit03) + accounting.unformat(targetOEXMCB.Unit03) + accounting.unformat(targetEXPMCB.Unit03);
    targetMCBUnitApril = accounting.unformat(targetOEMMCB.Unit04) + accounting.unformat(targetOEXMCB.Unit04) + accounting.unformat(targetEXPMCB.Unit04);
    targetMCBUnitMay = accounting.unformat(targetOEMMCB.Unit05) + accounting.unformat(targetOEXMCB.Unit05) + accounting.unformat(targetEXPMCB.Unit05);
    targetMCBUnitJune = accounting.unformat(targetOEMMCB.Unit06) + accounting.unformat(targetOEXMCB.Unit06) + accounting.unformat(targetEXPMCB.Unit06);
    targetMCBUnitJuly = accounting.unformat(targetOEMMCB.Unit07) + accounting.unformat(targetOEXMCB.Unit07) + accounting.unformat(targetEXPMCB.Unit07);
    targetMCBUnitAugust = accounting.unformat(targetOEMMCB.Unit08) + accounting.unformat(targetOEXMCB.Unit08) + accounting.unformat(targetEXPMCB.Unit08);
    targetMCBUnitSeptember = accounting.unformat(targetOEMMCB.Unit09) + accounting.unformat(targetOEXMCB.Unit09) + accounting.unformat(targetEXPMCB.Unit09);
    targetMCBUnitOctober = accounting.unformat(targetOEMMCB.Unit10) + accounting.unformat(targetOEXMCB.Unit10) + accounting.unformat(targetEXPMCB.Unit10);
    targetMCBUnitNovember = accounting.unformat(targetOEMMCB.Unit11) + accounting.unformat(targetOEXMCB.Unit11) + accounting.unformat(targetEXPMCB.Unit11);
    targetMCBUnitDecember = accounting.unformat(targetOEMMCB.Unit12) + accounting.unformat(targetOEXMCB.Unit12) + accounting.unformat(targetEXPMCB.Unit12);
    targetMCBUnitTotal = targetMCBUnitJanuary + targetMCBUnitFebruary + targetMCBUnitMarch + targetMCBUnitApril + targetMCBUnitMay + targetMCBUnitJune + targetMCBUnitJuly + targetMCBUnitAugust + targetMCBUnitSeptember + targetMCBUnitOctober + targetMCBUnitNovember + targetMCBUnitDecember;

    targetEBBahtJanuary = accounting.unformat(targetSPDEB.Amt01);
    targetEBBahtFebruary = accounting.unformat(targetSPDEB.Amt02);
    targetEBBahtMarch = accounting.unformat(targetSPDEB.Amt03);
    targetEBBahtApril = accounting.unformat(targetSPDEB.Amt04);
    targetEBBahtMay = accounting.unformat(targetSPDEB.Amt05);
    targetEBBahtJune = accounting.unformat(targetSPDEB.Amt06);
    targetEBBahtJuly = accounting.unformat(targetSPDEB.Amt07);
    targetEBBahtAugust = accounting.unformat(targetSPDEB.Amt08);
    targetEBBahtSeptember = accounting.unformat(targetSPDEB.Amt09);
    targetEBBahtOctober = accounting.unformat(targetSPDEB.Amt10);
    targetEBBahtNovember = accounting.unformat(targetSPDEB.Amt11);
    targetEBBahtDecember = accounting.unformat(targetSPDEB.Amt12);
    targetEBBahtTotal = targetEBBahtJanuary + targetEBBahtFebruary + targetEBBahtMarch + targetEBBahtApril + targetEBBahtMay + targetEBBahtJune + targetEBBahtJuly + targetEBBahtAugust + targetEBBahtSeptember + targetEBBahtOctober + targetEBBahtNovember + targetEBBahtDecember;
    targetEBUnitJanuary = accounting.unformat(targetSPDEB.Unit01);
    targetEBUnitFebruary = accounting.unformat(targetSPDEB.Unit02);
    targetEBUnitMarch = accounting.unformat(targetSPDEB.Unit03);
    targetEBUnitApril = accounting.unformat(targetSPDEB.Unit04);
    targetEBUnitMay = accounting.unformat(targetSPDEB.Unit05);
    targetEBUnitJune = accounting.unformat(targetSPDEB.Unit06);
    targetEBUnitJuly = accounting.unformat(targetSPDEB.Unit07);
    targetEBUnitAugust = accounting.unformat(targetSPDEB.Unit08);
    targetEBUnitSeptember = accounting.unformat(targetSPDEB.Unit09);
    targetEBUnitOctober = accounting.unformat(targetSPDEB.Unit10);
    targetEBUnitNovember = accounting.unformat(targetSPDEB.Unit11);
    targetEBUnitDecember = accounting.unformat(targetSPDEB.Unit12);
    targetEBUnitTotal = targetEBUnitJanuary + targetEBUnitFebruary + targetEBUnitMarch + targetEBUnitApril + targetEBUnitMay + targetEBUnitJune + targetEBUnitJuly + targetEBUnitAugust + targetEBUnitSeptember + targetEBUnitOctober + targetEBUnitNovember + targetEBUnitDecember;

    targetNPBahtJanuary = accounting.unformat(targetSPDNP.Amt01);
    targetNPBahtFebruary = accounting.unformat(targetSPDNP.Amt02);
    targetNPBahtMarch = accounting.unformat(targetSPDNP.Amt03);
    targetNPBahtApril = accounting.unformat(targetSPDNP.Amt04);
    targetNPBahtMay = accounting.unformat(targetSPDNP.Amt05);
    targetNPBahtJune = accounting.unformat(targetSPDNP.Amt06);
    targetNPBahtJuly = accounting.unformat(targetSPDNP.Amt07);
    targetNPBahtAugust = accounting.unformat(targetSPDNP.Amt08);
    targetNPBahtSeptember = accounting.unformat(targetSPDNP.Amt09);
    targetNPBahtOctober = accounting.unformat(targetSPDNP.Amt10);
    targetNPBahtNovember = accounting.unformat(targetSPDNP.Amt11);
    targetNPBahtDecember = accounting.unformat(targetSPDNP.Amt12);
    targetNPBahtTotal = targetNPBahtJanuary + targetNPBahtFebruary + targetNPBahtMarch + targetNPBahtApril + targetNPBahtMay + targetNPBahtJune + targetNPBahtJuly + targetNPBahtAugust + targetNPBahtSeptember + targetNPBahtOctober + targetNPBahtNovember + targetNPBahtDecember;
    targetNPUnitJanuary = accounting.unformat(targetSPDNP.Unit01);
    targetNPUnitFebruary = accounting.unformat(targetSPDNP.Unit02);
    targetNPUnitMarch = accounting.unformat(targetSPDNP.Unit03);
    targetNPUnitApril = accounting.unformat(targetSPDNP.Unit04);
    targetNPUnitMay = accounting.unformat(targetSPDNP.Unit05);
    targetNPUnitJune = accounting.unformat(targetSPDNP.Unit06);
    targetNPUnitJuly = accounting.unformat(targetSPDNP.Unit07);
    targetNPUnitAugust = accounting.unformat(targetSPDNP.Unit08);
    targetNPUnitSeptember = accounting.unformat(targetSPDNP.Unit09);
    targetNPUnitOctober = accounting.unformat(targetSPDNP.Unit10);
    targetNPUnitNovember = accounting.unformat(targetSPDNP.Unit11);
    targetNPUnitDecember = accounting.unformat(targetSPDNP.Unit12);
    targetNPUnitTotal = targetNPUnitJanuary + targetNPUnitFebruary + targetNPUnitMarch + targetNPUnitApril + targetNPUnitMay + targetNPUnitJune + targetNPUnitJuly + targetNPUnitAugust + targetNPUnitSeptember + targetNPUnitOctober + targetNPUnitNovember + targetNPUnitDecember;

    targetINDBahtJanuary = accounting.unformat(targetSPDIND.Amt01);
    targetINDBahtFebruary = accounting.unformat(targetSPDIND.Amt02);
    targetINDBahtMarch = accounting.unformat(targetSPDIND.Amt03);
    targetINDBahtApril = accounting.unformat(targetSPDIND.Amt04);
    targetINDBahtMay = accounting.unformat(targetSPDIND.Amt05);
    targetINDBahtJune = accounting.unformat(targetSPDIND.Amt06);
    targetINDBahtJuly = accounting.unformat(targetSPDIND.Amt07);
    targetINDBahtAugust = accounting.unformat(targetSPDIND.Amt08);
    targetINDBahtSeptember = accounting.unformat(targetSPDIND.Amt09);
    targetINDBahtOctober = accounting.unformat(targetSPDIND.Amt10);
    targetINDBahtNovember = accounting.unformat(targetSPDIND.Amt11);
    targetINDBahtDecember = accounting.unformat(targetSPDIND.Amt12);
    targetINDBahtTotal = targetINDBahtJanuary + targetINDBahtFebruary + targetINDBahtMarch + targetINDBahtApril + targetINDBahtMay + targetINDBahtJune + targetINDBahtJuly + targetINDBahtAugust + targetINDBahtSeptember + targetINDBahtOctober + targetINDBahtNovember + targetINDBahtDecember;
    targetINDUnitJanuary = accounting.unformat(targetSPDIND.Unit01);
    targetINDUnitFebruary = accounting.unformat(targetSPDIND.Unit02);
    targetINDUnitMarch = accounting.unformat(targetSPDIND.Unit03);
    targetINDUnitApril = accounting.unformat(targetSPDIND.Unit04);
    targetINDUnitMay = accounting.unformat(targetSPDIND.Unit05);
    targetINDUnitJune = accounting.unformat(targetSPDIND.Unit06);
    targetINDUnitJuly = accounting.unformat(targetSPDIND.Unit07);
    targetINDUnitAugust = accounting.unformat(targetSPDIND.Unit08);
    targetINDUnitSeptember = accounting.unformat(targetSPDIND.Unit09);
    targetINDUnitOctober = accounting.unformat(targetSPDIND.Unit10);
    targetINDUnitNovember = accounting.unformat(targetSPDIND.Unit11);
    targetINDUnitDecember = accounting.unformat(targetSPDIND.Unit12);
    targetINDUnitTotal = targetINDUnitJanuary + targetINDUnitFebruary + targetINDUnitMarch + targetINDUnitApril + targetINDUnitMay + targetINDUnitJune + targetINDUnitJuly + targetINDUnitAugust + targetINDUnitSeptember + targetINDUnitOctober + targetINDUnitNovember + targetINDUnitDecember;

    targetOTHBahtJanuary = accounting.unformat(targetSPDOTH.Amt01);
    targetOTHBahtFebruary = accounting.unformat(targetSPDOTH.Amt02);
    targetOTHBahtMarch = accounting.unformat(targetSPDOTH.Amt03);
    targetOTHBahtApril = accounting.unformat(targetSPDOTH.Amt04);
    targetOTHBahtMay = accounting.unformat(targetSPDOTH.Amt05);
    targetOTHBahtJune = accounting.unformat(targetSPDOTH.Amt06);
    targetOTHBahtJuly = accounting.unformat(targetSPDOTH.Amt07);
    targetOTHBahtAugust = accounting.unformat(targetSPDOTH.Amt08);
    targetOTHBahtSeptember = accounting.unformat(targetSPDOTH.Amt09);
    targetOTHBahtOctober = accounting.unformat(targetSPDOTH.Amt10);
    targetOTHBahtNovember = accounting.unformat(targetSPDOTH.Amt11);
    targetOTHBahtDecember = accounting.unformat(targetSPDOTH.Amt12);
    targetOTHBahtTotal = targetOTHBahtJanuary + targetOTHBahtFebruary + targetOTHBahtMarch + targetOTHBahtApril + targetOTHBahtMay + targetOTHBahtJune + targetOTHBahtJuly + targetOTHBahtAugust + targetOTHBahtSeptember + targetOTHBahtOctober + targetOTHBahtNovember + targetOTHBahtDecember;
    targetOTHUnitJanuary = accounting.unformat(targetSPDOTH.Unit01);
    targetOTHUnitFebruary = accounting.unformat(targetSPDOTH.Unit02);
    targetOTHUnitMarch = accounting.unformat(targetSPDOTH.Unit03);
    targetOTHUnitApril = accounting.unformat(targetSPDOTH.Unit04);
    targetOTHUnitMay = accounting.unformat(targetSPDOTH.Unit05);
    targetOTHUnitJune = accounting.unformat(targetSPDOTH.Unit06);
    targetOTHUnitJuly = accounting.unformat(targetSPDOTH.Unit07);
    targetOTHUnitAugust = accounting.unformat(targetSPDOTH.Unit08);
    targetOTHUnitSeptember = accounting.unformat(targetSPDOTH.Unit09);
    targetOTHUnitOctober = accounting.unformat(targetSPDOTH.Unit10);
    targetOTHUnitNovember = accounting.unformat(targetSPDOTH.Unit11);
    targetOTHUnitDecember = accounting.unformat(targetSPDOTH.Unit12);
    targetOTHUnitTotal = targetOTHUnitJanuary + targetOTHUnitFebruary + targetOTHUnitMarch + targetOTHUnitApril + targetOTHUnitMay + targetOTHUnitJune + targetOTHUnitJuly + targetOTHUnitAugust + targetOTHUnitSeptember + targetOTHUnitOctober + targetOTHUnitNovember + targetOTHUnitDecember;

    var totalOEMAMBBahtTarget = accounting.unformat(targetOEMAMB.AmtQ1) + accounting.unformat(targetOEMAMB.AmtQ2) + accounting.unformat(targetOEMAMB.AmtQ3) + accounting.unformat(targetOEMAMB.AmtQ4);
    var totalOEMAMBUnitTarget = accounting.unformat(targetOEMAMB.UnitQ1) + accounting.unformat(targetOEMAMB.UnitQ2) + accounting.unformat(targetOEMAMB.UnitQ3) + accounting.unformat(targetOEMAMB.UnitQ4);
    var totalOEMMCBBahtTarget = accounting.unformat(targetOEMMCB.AmtQ1) + accounting.unformat(targetOEMMCB.AmtQ2) + accounting.unformat(targetOEMMCB.AmtQ3) + accounting.unformat(targetOEMMCB.AmtQ4);
    var totalOEMMCBUnitTarget = accounting.unformat(targetOEMMCB.UnitQ1) + accounting.unformat(targetOEMMCB.UnitQ2) + accounting.unformat(targetOEMMCB.UnitQ3) + accounting.unformat(targetOEMMCB.UnitQ4);

    var totalOEXAMBBahtTarget = accounting.unformat(targetOEXAMB.AmtQ1) + accounting.unformat(targetOEXAMB.AmtQ2) + accounting.unformat(targetOEXAMB.AmtQ3) + accounting.unformat(targetOEXAMB.AmtQ4);
    var totalOEXAMBUnitTarget = accounting.unformat(targetOEXAMB.UnitQ1) + accounting.unformat(targetOEXAMB.UnitQ2) + accounting.unformat(targetOEXAMB.UnitQ3) + accounting.unformat(targetOEXAMB.UnitQ4);
    var totalOEXMCBBahtTarget = accounting.unformat(targetOEXMCB.AmtQ1) + accounting.unformat(targetOEXMCB.AmtQ2) + accounting.unformat(targetOEXMCB.AmtQ3) + accounting.unformat(targetOEXMCB.AmtQ4);
    var totalOEXMCBUnitTarget = accounting.unformat(targetOEXMCB.UnitQ1) + accounting.unformat(targetOEXMCB.UnitQ2) + accounting.unformat(targetOEXMCB.UnitQ3) + accounting.unformat(targetOEXMCB.UnitQ4);

    var totalEXPAMBBahtTarget = accounting.unformat(targetEXPAMB.AmtQ1) + accounting.unformat(targetEXPAMB.AmtQ2) + accounting.unformat(targetEXPAMB.AmtQ3) + accounting.unformat(targetEXPAMB.AmtQ4);
    var totalEXPAMBUnitTarget = accounting.unformat(targetEXPAMB.UnitQ1) + accounting.unformat(targetEXPAMB.UnitQ2) + accounting.unformat(targetEXPAMB.UnitQ3) + accounting.unformat(targetEXPAMB.UnitQ4);
    var totalEXPMCBBahtTarget = accounting.unformat(targetEXPMCB.AmtQ1) + accounting.unformat(targetEXPMCB.AmtQ2) + accounting.unformat(targetEXPMCB.AmtQ3) + accounting.unformat(targetEXPMCB.AmtQ4);
    var totalEXPMCBUnitTarget = accounting.unformat(targetEXPMCB.UnitQ1) + accounting.unformat(targetEXPMCB.UnitQ2) + accounting.unformat(targetEXPMCB.UnitQ3) + accounting.unformat(targetEXPMCB.UnitQ4);

    var totalSPDEBBahtTarget = accounting.unformat(targetSPDEB.AmtQ1) + accounting.unformat(targetSPDEB.AmtQ2) + accounting.unformat(targetSPDEB.AmtQ3) + accounting.unformat(targetSPDEB.AmtQ4);
    var totalSPDEBUnitTarget = accounting.unformat(targetSPDEB.UnitQ1) + accounting.unformat(targetSPDEB.UnitQ2) + accounting.unformat(targetSPDEB.UnitQ3) + accounting.unformat(targetSPDEB.UnitQ4);
    var totalSPDNPBahtTarget = accounting.unformat(targetSPDNP.AmtQ1) + accounting.unformat(targetSPDNP.AmtQ2) + accounting.unformat(targetSPDNP.AmtQ3) + accounting.unformat(targetSPDNP.AmtQ4);
    var totalSPDNPUnitTarget = accounting.unformat(targetSPDNP.UnitQ1) + accounting.unformat(targetSPDNP.UnitQ2) + accounting.unformat(targetSPDNP.UnitQ3) + accounting.unformat(targetSPDNP.UnitQ4);
    var totalSPDINDBahtTarget = accounting.unformat(targetSPDIND.AmtQ1) + accounting.unformat(targetSPDIND.AmtQ2) + accounting.unformat(targetSPDIND.AmtQ3) + accounting.unformat(targetSPDIND.AmtQ4);
    var totalSPDINDUnitTarget = accounting.unformat(targetSPDIND.UnitQ1) + accounting.unformat(targetSPDIND.UnitQ2) + accounting.unformat(targetSPDIND.UnitQ3) + accounting.unformat(targetSPDIND.UnitQ4);
    var totalSPDOTHBahtTarget = accounting.unformat(targetSPDOTH.AmtQ1) + accounting.unformat(targetSPDOTH.AmtQ2) + accounting.unformat(targetSPDOTH.AmtQ3) + accounting.unformat(targetSPDOTH.AmtQ4);
    var totalSPDOTHUnitTarget = accounting.unformat(targetSPDOTH.UnitQ1) + accounting.unformat(targetSPDOTH.UnitQ2) + accounting.unformat(targetSPDOTH.UnitQ3) + accounting.unformat(targetSPDOTH.UnitQ4);

    var totalOEMBahtTarget = totalOEMAMBBahtTarget + totalOEMMCBBahtTarget;
    var totalOEMUnitTarget = totalOEMAMBUnitTarget + totalOEMMCBUnitTarget;
    var totalOEXBahtTarget = totalOEXAMBBahtTarget + totalOEXMCBBahtTarget;
    var totalOEXUnitTarget = totalOEXAMBUnitTarget + totalOEXMCBUnitTarget;
    var totalEXPBahtTarget = totalEXPAMBBahtTarget + totalEXPMCBBahtTarget;
    var totalEXPUnitTarget = totalEXPAMBUnitTarget + totalEXPMCBUnitTarget;
    var totalSPDBahtTarget = totalSPDNPBahtTarget + totalSPDEBBahtTarget + totalSPDINDBahtTarget + totalSPDOTHBahtTarget;
    var totalSPDUnitTarget = totalSPDNPUnitTarget + totalSPDEBUnitTarget + totalSPDINDUnitTarget + totalSPDOTHUnitTarget;

    targetOEMAmt01 = (accounting.unformat(targetOEMAMB.Amt01) + accounting.unformat(targetOEMMCB.Amt01));
    targetOEMAmt02 = (accounting.unformat(targetOEMAMB.Amt02) + accounting.unformat(targetOEMMCB.Amt02));
    targetOEMAmt03 = (accounting.unformat(targetOEMAMB.Amt03) + accounting.unformat(targetOEMMCB.Amt03));
    targetOEMAmt04 = (accounting.unformat(targetOEMAMB.Amt04) + accounting.unformat(targetOEMMCB.Amt04));
    targetOEMAmt05 = (accounting.unformat(targetOEMAMB.Amt05) + accounting.unformat(targetOEMMCB.Amt05));
    targetOEMAmt06 = (accounting.unformat(targetOEMAMB.Amt06) + accounting.unformat(targetOEMMCB.Amt06));
    targetOEMAmt07 = (accounting.unformat(targetOEMAMB.Amt07) + accounting.unformat(targetOEMMCB.Amt07));
    targetOEMAmt08 = (accounting.unformat(targetOEMAMB.Amt08) + accounting.unformat(targetOEMMCB.Amt08));
    targetOEMAmt09 = (accounting.unformat(targetOEMAMB.Amt09) + accounting.unformat(targetOEMMCB.Amt09));
    targetOEMAmt10 = (accounting.unformat(targetOEMAMB.Amt10) + accounting.unformat(targetOEMMCB.Amt10));
    targetOEMAmt11 = (accounting.unformat(targetOEMAMB.Amt11) + accounting.unformat(targetOEMMCB.Amt11));
    targetOEMAmt12 = (accounting.unformat(targetOEMAMB.Amt12) + accounting.unformat(targetOEMMCB.Amt12));
    targetOEMAmtQ1 = (accounting.unformat(targetOEMAMB.AmtQ1) + accounting.unformat(targetOEMMCB.AmtQ1));
    targetOEMAmtQ2 = (accounting.unformat(targetOEMAMB.AmtQ2) + accounting.unformat(targetOEMMCB.AmtQ2));
    targetOEMAmtQ3 = (accounting.unformat(targetOEMAMB.AmtQ3) + accounting.unformat(targetOEMMCB.AmtQ3));
    targetOEMAmtQ4 = (accounting.unformat(targetOEMAMB.AmtQ4) + accounting.unformat(targetOEMMCB.AmtQ4));

    targetOEMUnit01 = (accounting.unformat(targetOEMAMB.Unit01) + accounting.unformat(targetOEMMCB.Unit01));
    targetOEMUnit02 = (accounting.unformat(targetOEMAMB.Unit02) + accounting.unformat(targetOEMMCB.Unit02));
    targetOEMUnit03 = (accounting.unformat(targetOEMAMB.Unit03) + accounting.unformat(targetOEMMCB.Unit03));
    targetOEMUnit04 = (accounting.unformat(targetOEMAMB.Unit04) + accounting.unformat(targetOEMMCB.Unit04));
    targetOEMUnit05 = (accounting.unformat(targetOEMAMB.Unit05) + accounting.unformat(targetOEMMCB.Unit05));
    targetOEMUnit06 = (accounting.unformat(targetOEMAMB.Unit06) + accounting.unformat(targetOEMMCB.Unit06));
    targetOEMUnit07 = (accounting.unformat(targetOEMAMB.Unit07) + accounting.unformat(targetOEMMCB.Unit07));
    targetOEMUnit08 = (accounting.unformat(targetOEMAMB.Unit08) + accounting.unformat(targetOEMMCB.Unit08));
    targetOEMUnit09 = (accounting.unformat(targetOEMAMB.Unit09) + accounting.unformat(targetOEMMCB.Unit09));
    targetOEMUnit10 = (accounting.unformat(targetOEMAMB.Unit10) + accounting.unformat(targetOEMMCB.Unit10));
    targetOEMUnit11 = (accounting.unformat(targetOEMAMB.Unit11) + accounting.unformat(targetOEMMCB.Unit11));
    targetOEMUnit12 = (accounting.unformat(targetOEMAMB.Unit12) + accounting.unformat(targetOEMMCB.Unit12));
    targetOEMUnitQ1 = (accounting.unformat(targetOEMAMB.UnitQ1) + accounting.unformat(targetOEMMCB.UnitQ1));
    targetOEMUnitQ2 = (accounting.unformat(targetOEMAMB.UnitQ2) + accounting.unformat(targetOEMMCB.UnitQ2));
    targetOEMUnitQ3 = (accounting.unformat(targetOEMAMB.UnitQ3) + accounting.unformat(targetOEMMCB.UnitQ3));
    targetOEMUnitQ4 = (accounting.unformat(targetOEMAMB.UnitQ4) + accounting.unformat(targetOEMMCB.UnitQ4));

    achieveOEMBahtJanuary = (currOEMBahtJanuary * 100) / targetOEMAmt01;
    achieveOEMBahtFebruary = (currOEMBahtFebruary * 100) / targetOEMAmt02;
    achieveOEMBahtMarch = (currOEMBahtMarch * 100) / targetOEMAmt03;
    achieveOEMBahtApril = (currOEMBahtApril * 100) / targetOEMAmt04;
    achieveOEMBahtMay = (currOEMBahtMay * 100) / targetOEMAmt05;
    achieveOEMBahtJune = (currOEMBahtJune * 100) / targetOEMAmt06;
    achieveOEMBahtJuly = (currOEMBahtJuly * 100) / targetOEMAmt07;
    achieveOEMBahtAugust = (currOEMBahtAugust * 100) / targetOEMAmt08;
    achieveOEMBahtSeptember = (currOEMBahtSeptember * 100) / targetOEMAmt09;
    achieveOEMBahtOctober = (currOEMBahtOctober * 100) / targetOEMAmt10;
    achieveOEMBahtNovember = (currOEMBahtNovember * 100) / targetOEMAmt11;
    achieveOEMBahtDecember = (currOEMBahtDecember * 100) / targetOEMAmt12;
    achieveOEMBahtTotal = (currOEMTotalBaht * 100) / totalOEMBahtTarget;
    achieveOEMBahtQ1 = (currOEMBahtQ1 * 100) / targetOEMAmtQ1;
    achieveOEMBahtQ2 = (currOEMBahtQ2 * 100) / targetOEMAmtQ2;
    achieveOEMBahtQ3 = (currOEMBahtQ3 * 100) / targetOEMAmtQ3;
    achieveOEMBahtQ4 = (currOEMBahtQ4 * 100) / targetOEMAmtQ4;

    achieveOEMUnitJanuary = (currOEMUnitJanuary * 100) / targetOEMUnit01;
    achieveOEMUnitFebruary = (currOEMUnitFebruary * 100) / targetOEMUnit02;
    achieveOEMUnitMarch = (currOEMUnitMarch * 100) / targetOEMUnit03;
    achieveOEMUnitApril = (currOEMUnitApril * 100) / targetOEMUnit04;
    achieveOEMUnitMay = (currOEMUnitMay * 100) / targetOEMUnit05;
    achieveOEMUnitJune = (currOEMUnitJune * 100) / targetOEMUnit06;
    achieveOEMUnitJuly = (currOEMUnitJuly * 100) / targetOEMUnit07;
    achieveOEMUnitAugust = (currOEMUnitAugust * 100) / targetOEMUnit08;
    achieveOEMUnitSeptember = (currOEMUnitSeptember * 100) / targetOEMUnit09;
    achieveOEMUnitOctober = (currOEMUnitOctober * 100) / targetOEMUnit10;
    achieveOEMUnitNovember = (currOEMUnitNovember * 100) / targetOEMUnit11;
    achieveOEMUnitDecember = (currOEMUnitDecember * 100) / targetOEMUnit12;
    achieveOEMUnitTotal = (currOEMTotalUnit * 100) / totalOEMUnitTarget;
    achieveOEMUnitQ1 = (currOEMUnitQ1 * 100) / targetOEMUnitQ1;
    achieveOEMUnitQ2 = (currOEMUnitQ2 * 100) / targetOEMUnitQ2;
    achieveOEMUnitQ3 = (currOEMUnitQ3 * 100) / targetOEMUnitQ3;
    achieveOEMUnitQ4 = (currOEMUnitQ4 * 100) / targetOEMUnitQ4;

    targetOEXAmt01 = (accounting.unformat(targetOEXAMB.Amt01) + accounting.unformat(targetOEXMCB.Amt01));
    targetOEXAmt02 = (accounting.unformat(targetOEXAMB.Amt02) + accounting.unformat(targetOEXMCB.Amt02));
    targetOEXAmt03 = (accounting.unformat(targetOEXAMB.Amt03) + accounting.unformat(targetOEXMCB.Amt03));
    targetOEXAmt04 = (accounting.unformat(targetOEXAMB.Amt04) + accounting.unformat(targetOEXMCB.Amt04));
    targetOEXAmt05 = (accounting.unformat(targetOEXAMB.Amt05) + accounting.unformat(targetOEXMCB.Amt05));
    targetOEXAmt06 = (accounting.unformat(targetOEXAMB.Amt06) + accounting.unformat(targetOEXMCB.Amt06));
    targetOEXAmt07 = (accounting.unformat(targetOEXAMB.Amt07) + accounting.unformat(targetOEXMCB.Amt07));
    targetOEXAmt08 = (accounting.unformat(targetOEXAMB.Amt08) + accounting.unformat(targetOEXMCB.Amt08));
    targetOEXAmt09 = (accounting.unformat(targetOEXAMB.Amt09) + accounting.unformat(targetOEXMCB.Amt09));
    targetOEXAmt10 = (accounting.unformat(targetOEXAMB.Amt10) + accounting.unformat(targetOEXMCB.Amt10));
    targetOEXAmt11 = (accounting.unformat(targetOEXAMB.Amt11) + accounting.unformat(targetOEXMCB.Amt11));
    targetOEXAmt12 = (accounting.unformat(targetOEXAMB.Amt12) + accounting.unformat(targetOEXMCB.Amt12));
    targetOEXAmtQ1 = (accounting.unformat(targetOEXAMB.AmtQ1) + accounting.unformat(targetOEXMCB.AmtQ1));
    targetOEXAmtQ2 = (accounting.unformat(targetOEXAMB.AmtQ2) + accounting.unformat(targetOEXMCB.AmtQ2));
    targetOEXAmtQ3 = (accounting.unformat(targetOEXAMB.AmtQ3) + accounting.unformat(targetOEXMCB.AmtQ3));
    targetOEXAmtQ4 = (accounting.unformat(targetOEXAMB.AmtQ4) + accounting.unformat(targetOEXMCB.AmtQ4));

    targetOEXUnit01 = (accounting.unformat(targetOEXAMB.Unit01) + accounting.unformat(targetOEXMCB.Unit01));
    targetOEXUnit02 = (accounting.unformat(targetOEXAMB.Unit02) + accounting.unformat(targetOEXMCB.Unit02));
    targetOEXUnit03 = (accounting.unformat(targetOEXAMB.Unit03) + accounting.unformat(targetOEXMCB.Unit03));
    targetOEXUnit04 = (accounting.unformat(targetOEXAMB.Unit04) + accounting.unformat(targetOEXMCB.Unit04));
    targetOEXUnit05 = (accounting.unformat(targetOEXAMB.Unit05) + accounting.unformat(targetOEXMCB.Unit05));
    targetOEXUnit06 = (accounting.unformat(targetOEXAMB.Unit06) + accounting.unformat(targetOEXMCB.Unit06));
    targetOEXUnit07 = (accounting.unformat(targetOEXAMB.Unit07) + accounting.unformat(targetOEXMCB.Unit07));
    targetOEXUnit08 = (accounting.unformat(targetOEXAMB.Unit08) + accounting.unformat(targetOEXMCB.Unit08));
    targetOEXUnit09 = (accounting.unformat(targetOEXAMB.Unit09) + accounting.unformat(targetOEXMCB.Unit09));
    targetOEXUnit10 = (accounting.unformat(targetOEXAMB.Unit10) + accounting.unformat(targetOEXMCB.Unit10));
    targetOEXUnit11 = (accounting.unformat(targetOEXAMB.Unit11) + accounting.unformat(targetOEXMCB.Unit11));
    targetOEXUnit12 = (accounting.unformat(targetOEXAMB.Unit12) + accounting.unformat(targetOEXMCB.Unit12));
    targetOEXUnitQ1 = (accounting.unformat(targetOEXAMB.UnitQ1) + accounting.unformat(targetOEXMCB.UnitQ1));
    targetOEXUnitQ2 = (accounting.unformat(targetOEXAMB.UnitQ2) + accounting.unformat(targetOEXMCB.UnitQ2));
    targetOEXUnitQ3 = (accounting.unformat(targetOEXAMB.UnitQ3) + accounting.unformat(targetOEXMCB.UnitQ3));
    targetOEXUnitQ4 = (accounting.unformat(targetOEXAMB.UnitQ4) + accounting.unformat(targetOEXMCB.UnitQ4));

    achieveOEXBahtJanuary = (currOEXBahtJanuary * 100) / targetOEXAmt01;
    achieveOEXBahtFebruary = (currOEXBahtFebruary * 100) / targetOEXAmt02;
    achieveOEXBahtMarch = (currOEXBahtMarch * 100) / targetOEXAmt03;
    achieveOEXBahtApril = (currOEXBahtApril * 100) / targetOEXAmt04;
    achieveOEXBahtMay = (currOEXBahtMay * 100) / targetOEXAmt05;
    achieveOEXBahtJune = (currOEXBahtJune * 100) / targetOEXAmt06;
    achieveOEXBahtJuly = (currOEXBahtJuly * 100) / targetOEXAmt07;
    achieveOEXBahtAugust = (currOEXBahtAugust * 100) / targetOEXAmt08;
    achieveOEXBahtSeptember = (currOEXBahtSeptember * 100) / targetOEXAmt09;
    achieveOEXBahtOctober = (currOEXBahtOctober * 100) / targetOEXAmt10;
    achieveOEXBahtNovember = (currOEXBahtNovember * 100) / targetOEXAmt11;
    achieveOEXBahtDecember = (currOEXBahtDecember * 100) / targetOEXAmt12;
    achieveOEXBahtTotal = (currOEXTotalBaht * 100) / totalOEXBahtTarget;
    achieveOEXBahtQ1 = (currOEXBahtQ1 * 100) / targetOEXAmtQ1;
    achieveOEXBahtQ2 = (currOEXBahtQ2 * 100) / targetOEXAmtQ2;
    achieveOEXBahtQ3 = (currOEXBahtQ3 * 100) / targetOEXAmtQ3;
    achieveOEXBahtQ4 = (currOEXBahtQ4 * 100) / targetOEXAmtQ4;

    achieveOEXUnitJanuary = (currOEXUnitJanuary * 100) / targetOEXUnit01;
    achieveOEXUnitFebruary = (currOEXUnitFebruary * 100) / targetOEXUnit02;
    achieveOEXUnitMarch = (currOEXUnitMarch * 100) / targetOEXUnit03;
    achieveOEXUnitApril = (currOEXUnitApril * 100) / targetOEXUnit04;
    achieveOEXUnitMay = (currOEXUnitMay * 100) / targetOEXUnit05;
    achieveOEXUnitJune = (currOEXUnitJune * 100) / targetOEXUnit06;
    achieveOEXUnitJuly = (currOEXUnitJuly * 100) / targetOEXUnit07;
    achieveOEXUnitAugust = (currOEXUnitAugust * 100) / targetOEXUnit08;
    achieveOEXUnitSeptember = (currOEXUnitSeptember * 100) / targetOEXUnit09;
    achieveOEXUnitOctober = (currOEXUnitOctober * 100) / targetOEXUnit10;
    achieveOEXUnitNovember = (currOEXUnitNovember * 100) / targetOEXUnit11;
    achieveOEXUnitDecember = (currOEXUnitDecember * 100) / targetOEXUnit12;
    achieveOEXUnitTotal = (currOEXTotalUnit * 100) / totalOEXUnitTarget;
    achieveOEXUnitQ1 = (currOEXUnitQ1 * 100) / targetOEXUnitQ1;
    achieveOEXUnitQ2 = (currOEXUnitQ2 * 100) / targetOEXUnitQ2;
    achieveOEXUnitQ3 = (currOEXUnitQ3 * 100) / targetOEXUnitQ3;
    achieveOEXUnitQ4 = (currOEXUnitQ4 * 100) / targetOEXUnitQ4;

    targetEXPAmt01 = (accounting.unformat(targetEXPAMB.Amt01) + accounting.unformat(targetEXPMCB.Amt01));
    targetEXPAmt02 = (accounting.unformat(targetEXPAMB.Amt02) + accounting.unformat(targetEXPMCB.Amt02));
    targetEXPAmt03 = (accounting.unformat(targetEXPAMB.Amt03) + accounting.unformat(targetEXPMCB.Amt03));
    targetEXPAmt04 = (accounting.unformat(targetEXPAMB.Amt04) + accounting.unformat(targetEXPMCB.Amt04));
    targetEXPAmt05 = (accounting.unformat(targetEXPAMB.Amt05) + accounting.unformat(targetEXPMCB.Amt05));
    targetEXPAmt06 = (accounting.unformat(targetEXPAMB.Amt06) + accounting.unformat(targetEXPMCB.Amt06));
    targetEXPAmt07 = (accounting.unformat(targetEXPAMB.Amt07) + accounting.unformat(targetEXPMCB.Amt07));
    targetEXPAmt08 = (accounting.unformat(targetEXPAMB.Amt08) + accounting.unformat(targetEXPMCB.Amt08));
    targetEXPAmt09 = (accounting.unformat(targetEXPAMB.Amt09) + accounting.unformat(targetEXPMCB.Amt09));
    targetEXPAmt10 = (accounting.unformat(targetEXPAMB.Amt10) + accounting.unformat(targetEXPMCB.Amt10));
    targetEXPAmt11 = (accounting.unformat(targetEXPAMB.Amt11) + accounting.unformat(targetEXPMCB.Amt11));
    targetEXPAmt12 = (accounting.unformat(targetEXPAMB.Amt12) + accounting.unformat(targetEXPMCB.Amt12));
    targetEXPAmtQ1 = (accounting.unformat(targetEXPAMB.AmtQ1) + accounting.unformat(targetEXPMCB.AmtQ1));
    targetEXPAmtQ2 = (accounting.unformat(targetEXPAMB.AmtQ2) + accounting.unformat(targetEXPMCB.AmtQ2));
    targetEXPAmtQ3 = (accounting.unformat(targetEXPAMB.AmtQ3) + accounting.unformat(targetEXPMCB.AmtQ3));
    targetEXPAmtQ4 = (accounting.unformat(targetEXPAMB.AmtQ4) + accounting.unformat(targetEXPMCB.AmtQ4));

    targetEXPUnit01 = (accounting.unformat(targetEXPAMB.Unit01) + accounting.unformat(targetEXPMCB.Unit01));
    targetEXPUnit02 = (accounting.unformat(targetEXPAMB.Unit02) + accounting.unformat(targetEXPMCB.Unit02));
    targetEXPUnit03 = (accounting.unformat(targetEXPAMB.Unit03) + accounting.unformat(targetEXPMCB.Unit03));
    targetEXPUnit04 = (accounting.unformat(targetEXPAMB.Unit04) + accounting.unformat(targetEXPMCB.Unit04));
    targetEXPUnit05 = (accounting.unformat(targetEXPAMB.Unit05) + accounting.unformat(targetEXPMCB.Unit05));
    targetEXPUnit06 = (accounting.unformat(targetEXPAMB.Unit06) + accounting.unformat(targetEXPMCB.Unit06));
    targetEXPUnit07 = (accounting.unformat(targetEXPAMB.Unit07) + accounting.unformat(targetEXPMCB.Unit07));
    targetEXPUnit08 = (accounting.unformat(targetEXPAMB.Unit08) + accounting.unformat(targetEXPMCB.Unit08));
    targetEXPUnit09 = (accounting.unformat(targetEXPAMB.Unit09) + accounting.unformat(targetEXPMCB.Unit09));
    targetEXPUnit10 = (accounting.unformat(targetEXPAMB.Unit10) + accounting.unformat(targetEXPMCB.Unit10));
    targetEXPUnit11 = (accounting.unformat(targetEXPAMB.Unit11) + accounting.unformat(targetEXPMCB.Unit11));
    targetEXPUnit12 = (accounting.unformat(targetEXPAMB.Unit12) + accounting.unformat(targetEXPMCB.Unit12));
    targetEXPUnitQ1 = (accounting.unformat(targetEXPAMB.UnitQ1) + accounting.unformat(targetEXPMCB.UnitQ1));
    targetEXPUnitQ2 = (accounting.unformat(targetEXPAMB.UnitQ2) + accounting.unformat(targetEXPMCB.UnitQ2));
    targetEXPUnitQ3 = (accounting.unformat(targetEXPAMB.UnitQ3) + accounting.unformat(targetEXPMCB.UnitQ3));
    targetEXPUnitQ4 = (accounting.unformat(targetEXPAMB.UnitQ4) + accounting.unformat(targetEXPMCB.UnitQ4));

    achieveEXPBahtJanuary = (currEXPBahtJanuary * 100) / targetEXPAmt01;
    achieveEXPBahtFebruary = (currEXPBahtFebruary * 100) / targetEXPAmt02;
    achieveEXPBahtMarch = (currEXPBahtMarch * 100) / targetEXPAmt03;
    achieveEXPBahtApril = (currEXPBahtApril * 100) / targetEXPAmt04;
    achieveEXPBahtMay = (currEXPBahtMay * 100) / targetEXPAmt05;
    achieveEXPBahtJune = (currEXPBahtJune * 100) / targetEXPAmt06;
    achieveEXPBahtJuly = (currEXPBahtJuly * 100) / targetEXPAmt07;
    achieveEXPBahtAugust = (currEXPBahtAugust * 100) / targetEXPAmt08;
    achieveEXPBahtSeptember = (currEXPBahtSeptember * 100) / targetEXPAmt09;
    achieveEXPBahtOctober = (currEXPBahtOctober * 100) / targetEXPAmt10;
    achieveEXPBahtNovember = (currEXPBahtNovember * 100) / targetEXPAmt11;
    achieveEXPBahtDecember = (currEXPBahtDecember * 100) / targetEXPAmt12;
    achieveEXPBahtTotal = (currEXPTotalBaht * 100) / totalEXPBahtTarget;
    achieveEXPBahtQ1 = (currEXPBahtQ1 * 100) / targetEXPAmtQ1;
    achieveEXPBahtQ2 = (currEXPBahtQ2 * 100) / targetEXPAmtQ2;
    achieveEXPBahtQ3 = (currEXPBahtQ3 * 100) / targetEXPAmtQ3;
    achieveEXPBahtQ4 = (currEXPBahtQ4 * 100) / targetEXPAmtQ4;

    achieveEXPUnitJanuary = (currEXPUnitJanuary * 100) / targetEXPUnit01;
    achieveEXPUnitFebruary = (currEXPUnitFebruary * 100) / targetEXPUnit02;
    achieveEXPUnitMarch = (currEXPUnitMarch * 100) / targetEXPUnit03;
    achieveEXPUnitApril = (currEXPUnitApril * 100) / targetEXPUnit04;
    achieveEXPUnitMay = (currEXPUnitMay * 100) / targetEXPUnit05;
    achieveEXPUnitJune = (currEXPUnitJune * 100) / targetEXPUnit06;
    achieveEXPUnitJuly = (currEXPUnitJuly * 100) / targetEXPUnit07;
    achieveEXPUnitAugust = (currEXPUnitAugust * 100) / targetEXPUnit08;
    achieveEXPUnitSeptember = (currEXPUnitSeptember * 100) / targetEXPUnit09;
    achieveEXPUnitOctober = (currEXPUnitOctober * 100) / targetEXPUnit10;
    achieveEXPUnitNovember = (currEXPUnitNovember * 100) / targetEXPUnit11;
    achieveEXPUnitDecember = (currEXPUnitDecember * 100) / targetEXPUnit12;
    achieveEXPUnitTotal = (currEXPTotalUnit * 100) / totalEXPUnitTarget;
    achieveEXPUnitQ1 = (currEXPUnitQ1 * 100) / targetEXPUnitQ1;
    achieveEXPUnitQ2 = (currEXPUnitQ2 * 100) / targetEXPUnitQ2;
    achieveEXPUnitQ3 = (currEXPUnitQ3 * 100) / targetEXPUnitQ3;
    achieveEXPUnitQ4 = (currEXPUnitQ4 * 100) / targetEXPUnitQ4;

    targetSPDAmt01 = (accounting.unformat(targetSPDNP.Amt01) + accounting.unformat(targetSPDEB.Amt01) + accounting.unformat(targetSPDIND.Amt01) + accounting.unformat(targetSPDOTH.Amt01));
    targetSPDAmt02 = (accounting.unformat(targetSPDNP.Amt02) + accounting.unformat(targetSPDEB.Amt02) + accounting.unformat(targetSPDIND.Amt02) + accounting.unformat(targetSPDOTH.Amt02));
    targetSPDAmt03 = (accounting.unformat(targetSPDNP.Amt03) + accounting.unformat(targetSPDEB.Amt03) + accounting.unformat(targetSPDIND.Amt03) + accounting.unformat(targetSPDOTH.Amt03));
    targetSPDAmt04 = (accounting.unformat(targetSPDNP.Amt04) + accounting.unformat(targetSPDEB.Amt04) + accounting.unformat(targetSPDIND.Amt04) + accounting.unformat(targetSPDOTH.Amt04));
    targetSPDAmt05 = (accounting.unformat(targetSPDNP.Amt05) + accounting.unformat(targetSPDEB.Amt05) + accounting.unformat(targetSPDIND.Amt05) + accounting.unformat(targetSPDOTH.Amt05));
    targetSPDAmt06 = (accounting.unformat(targetSPDNP.Amt06) + accounting.unformat(targetSPDEB.Amt06) + accounting.unformat(targetSPDIND.Amt06) + accounting.unformat(targetSPDOTH.Amt06));
    targetSPDAmt07 = (accounting.unformat(targetSPDNP.Amt07) + accounting.unformat(targetSPDEB.Amt07) + accounting.unformat(targetSPDIND.Amt07) + accounting.unformat(targetSPDOTH.Amt07));
    targetSPDAmt08 = (accounting.unformat(targetSPDNP.Amt08) + accounting.unformat(targetSPDEB.Amt08) + accounting.unformat(targetSPDIND.Amt08) + accounting.unformat(targetSPDOTH.Amt08));
    targetSPDAmt09 = (accounting.unformat(targetSPDNP.Amt09) + accounting.unformat(targetSPDEB.Amt09) + accounting.unformat(targetSPDIND.Amt09) + accounting.unformat(targetSPDOTH.Amt09));
    targetSPDAmt10 = (accounting.unformat(targetSPDNP.Amt10) + accounting.unformat(targetSPDEB.Amt10) + accounting.unformat(targetSPDIND.Amt10) + accounting.unformat(targetSPDOTH.Amt10));
    targetSPDAmt11 = (accounting.unformat(targetSPDNP.Amt11) + accounting.unformat(targetSPDEB.Amt11) + accounting.unformat(targetSPDIND.Amt11) + accounting.unformat(targetSPDOTH.Amt11));
    targetSPDAmt12 = (accounting.unformat(targetSPDNP.Amt12) + accounting.unformat(targetSPDEB.Amt12) + accounting.unformat(targetSPDIND.Amt12) + accounting.unformat(targetSPDOTH.Amt12));
    targetSPDAmtQ1 = (accounting.unformat(targetSPDNP.AmtQ1) + accounting.unformat(targetSPDEB.AmtQ1) + accounting.unformat(targetSPDIND.AmtQ1) + accounting.unformat(targetSPDOTH.AmtQ1));
    targetSPDAmtQ2 = (accounting.unformat(targetSPDNP.AmtQ2) + accounting.unformat(targetSPDEB.AmtQ2) + accounting.unformat(targetSPDIND.AmtQ2) + accounting.unformat(targetSPDOTH.AmtQ2));
    targetSPDAmtQ3 = (accounting.unformat(targetSPDNP.AmtQ3) + accounting.unformat(targetSPDEB.AmtQ3) + accounting.unformat(targetSPDIND.AmtQ3) + accounting.unformat(targetSPDOTH.AmtQ3));
    targetSPDAmtQ4 = (accounting.unformat(targetSPDNP.AmtQ4) + accounting.unformat(targetSPDEB.AmtQ4) + accounting.unformat(targetSPDIND.AmtQ4) + accounting.unformat(targetSPDOTH.AmtQ4));

    targetSPDUnit01 = (accounting.unformat(targetSPDNP.Unit01) + accounting.unformat(targetSPDEB.Unit01) + accounting.unformat(targetSPDIND.Unit01) + accounting.unformat(targetSPDOTH.Unit01));
    targetSPDUnit02 = (accounting.unformat(targetSPDNP.Unit02) + accounting.unformat(targetSPDEB.Unit02) + accounting.unformat(targetSPDIND.Unit02) + accounting.unformat(targetSPDOTH.Unit02));
    targetSPDUnit03 = (accounting.unformat(targetSPDNP.Unit03) + accounting.unformat(targetSPDEB.Unit03) + accounting.unformat(targetSPDIND.Unit03) + accounting.unformat(targetSPDOTH.Unit03));
    targetSPDUnit04 = (accounting.unformat(targetSPDNP.Unit04) + accounting.unformat(targetSPDEB.Unit04) + accounting.unformat(targetSPDIND.Unit04) + accounting.unformat(targetSPDOTH.Unit04));
    targetSPDUnit05 = (accounting.unformat(targetSPDNP.Unit05) + accounting.unformat(targetSPDEB.Unit05) + accounting.unformat(targetSPDIND.Unit05) + accounting.unformat(targetSPDOTH.Unit05));
    targetSPDUnit06 = (accounting.unformat(targetSPDNP.Unit06) + accounting.unformat(targetSPDEB.Unit06) + accounting.unformat(targetSPDIND.Unit06) + accounting.unformat(targetSPDOTH.Unit06));
    targetSPDUnit07 = (accounting.unformat(targetSPDNP.Unit07) + accounting.unformat(targetSPDEB.Unit07) + accounting.unformat(targetSPDIND.Unit07) + accounting.unformat(targetSPDOTH.Unit07));
    targetSPDUnit08 = (accounting.unformat(targetSPDNP.Unit08) + accounting.unformat(targetSPDEB.Unit08) + accounting.unformat(targetSPDIND.Unit08) + accounting.unformat(targetSPDOTH.Unit08));
    targetSPDUnit09 = (accounting.unformat(targetSPDNP.Unit09) + accounting.unformat(targetSPDEB.Unit09) + accounting.unformat(targetSPDIND.Unit09) + accounting.unformat(targetSPDOTH.Unit09));
    targetSPDUnit10 = (accounting.unformat(targetSPDNP.Unit10) + accounting.unformat(targetSPDEB.Unit10) + accounting.unformat(targetSPDIND.Unit10) + accounting.unformat(targetSPDOTH.Unit10));
    targetSPDUnit11 = (accounting.unformat(targetSPDNP.Unit11) + accounting.unformat(targetSPDEB.Unit11) + accounting.unformat(targetSPDIND.Unit11) + accounting.unformat(targetSPDOTH.Unit11));
    targetSPDUnit12 = (accounting.unformat(targetSPDNP.Unit12) + accounting.unformat(targetSPDEB.Unit12) + accounting.unformat(targetSPDIND.Unit12) + accounting.unformat(targetSPDOTH.Unit12));
    targetSPDUnitQ1 = (accounting.unformat(targetSPDNP.UnitQ1) + accounting.unformat(targetSPDEB.UnitQ1) + accounting.unformat(targetSPDIND.UnitQ1) + accounting.unformat(targetSPDOTH.UnitQ1));
    targetSPDUnitQ2 = (accounting.unformat(targetSPDNP.UnitQ2) + accounting.unformat(targetSPDEB.UnitQ2) + accounting.unformat(targetSPDIND.UnitQ2) + accounting.unformat(targetSPDOTH.UnitQ2));
    targetSPDUnitQ3 = (accounting.unformat(targetSPDNP.UnitQ3) + accounting.unformat(targetSPDEB.UnitQ3) + accounting.unformat(targetSPDIND.UnitQ3) + accounting.unformat(targetSPDOTH.UnitQ3));
    targetSPDUnitQ4 = (accounting.unformat(targetSPDNP.UnitQ4) + accounting.unformat(targetSPDEB.UnitQ4) + accounting.unformat(targetSPDIND.UnitQ4) + accounting.unformat(targetSPDOTH.UnitQ4));

    achieveSPDBahtJanuary = (currSPDBahtJanuary * 100) / targetSPDAmt01;
    achieveSPDBahtFebruary = (currSPDBahtFebruary * 100) / targetSPDAmt02;
    achieveSPDBahtMarch = (currSPDBahtMarch * 100) / targetSPDAmt03;
    achieveSPDBahtApril = (currSPDBahtApril * 100) / targetSPDAmt04;
    achieveSPDBahtMay = (currSPDBahtMay * 100) / targetSPDAmt05;
    achieveSPDBahtJune = (currSPDBahtJune * 100) / targetSPDAmt06;
    achieveSPDBahtJuly = (currSPDBahtJuly * 100) / targetSPDAmt07;
    achieveSPDBahtAugust = (currSPDBahtAugust * 100) / targetSPDAmt08;
    achieveSPDBahtSeptember = (currSPDBahtSeptember * 100) / targetSPDAmt09;
    achieveSPDBahtOctober = (currSPDBahtOctober * 100) / targetSPDAmt10;
    achieveSPDBahtNovember = (currSPDBahtNovember * 100) / targetSPDAmt11;
    achieveSPDBahtDecember = (currSPDBahtDecember * 100) / targetSPDAmt12;
    achieveSPDBahtTotal = (currSPDTotalBaht * 100) / totalSPDBahtTarget;
    achieveSPDBahtQ1 = (currSPDBahtQ1 * 100) / targetSPDAmtQ1;
    achieveSPDBahtQ2 = (currSPDBahtQ2 * 100) / targetSPDAmtQ2;
    achieveSPDBahtQ3 = (currSPDBahtQ3 * 100) / targetSPDAmtQ3;
    achieveSPDBahtQ4 = (currSPDBahtQ4 * 100) / targetSPDAmtQ4;

    achieveSPDUnitJanuary = (currSPDUnitJanuary * 100) / targetSPDUnit01;
    achieveSPDUnitFebruary = (currSPDUnitFebruary * 100) / targetSPDUnit02;
    achieveSPDUnitMarch = (currSPDUnitMarch * 100) / targetSPDUnit03;
    achieveSPDUnitApril = (currSPDUnitApril * 100) / targetSPDUnit04;
    achieveSPDUnitMay = (currSPDUnitMay * 100) / targetSPDUnit05;
    achieveSPDUnitJune = (currSPDUnitJune * 100) / targetSPDUnit06;
    achieveSPDUnitJuly = (currSPDUnitJuly * 100) / targetSPDUnit07;
    achieveSPDUnitAugust = (currSPDUnitAugust * 100) / targetSPDUnit08;
    achieveSPDUnitSeptember = (currSPDUnitSeptember * 100) / targetSPDUnit09;
    achieveSPDUnitOctober = (currSPDUnitOctober * 100) / targetSPDUnit10;
    achieveSPDUnitNovember = (currSPDUnitNovember * 100) / targetSPDUnit11;
    achieveSPDUnitDecember = (currSPDUnitDecember * 100) / targetSPDUnit12;
    achieveSPDUnitTotal = (currSPDTotalUnit * 100) / totalSPDUnitTarget;
    achieveSPDUnitQ1 = (currSPDUnitQ1 * 100) / targetSPDUnitQ1;
    achieveSPDUnitQ2 = (currSPDUnitQ2 * 100) / targetSPDUnitQ2;
    achieveSPDUnitQ3 = (currSPDUnitQ3 * 100) / targetSPDUnitQ3;
    achieveSPDUnitQ4 = (currSPDUnitQ4 * 100) / targetSPDUnitQ4;

    var currTotalBaht = currOEMTotalBaht + currOEXTotalBaht + currEXPTotalBaht + currSPDTotalBaht,
        currTotalUnit = currOEMTotalUnit + currOEXTotalUnit + currEXPTotalUnit + currSPDTotalUnit,
        oldTotalBaht = oldOEMTotalBaht + oldOEXTotalBaht + oldEXPTotalBaht + oldSPDTotalBaht,
        oldTotalUnit = oldOEMTotalUnit + oldOEXTotalUnit + oldEXPTotalUnit + oldSPDTotalUnit,
        currUnitJanuary = currOEMUnitJanuary + currOEXUnitJanuary + currEXPUnitJanuary + currSPDUnitJanuary,
        currUnitFebruary = currOEMUnitFebruary + currOEXUnitFebruary + currEXPUnitFebruary + currSPDUnitFebruary,
        currUnitMarch = currOEMUnitMarch + currOEXUnitMarch + currEXPUnitMarch + currSPDUnitMarch,
        currUnitApril = currOEMUnitApril + currOEXUnitApril + currEXPUnitApril + currSPDUnitApril,
        currUnitMay = currOEMUnitMay + currOEXUnitMay + currEXPUnitMay + currSPDUnitMay,
        currUnitJune = currOEMUnitJune + currOEXUnitJune + currEXPUnitJune + currSPDUnitJune,
        currUnitJuly = currOEMUnitJuly + currOEXUnitJuly + currEXPUnitJuly + currSPDUnitJuly,
        currUnitAugust = currOEMUnitAugust + currOEXUnitAugust + currEXPUnitAugust + currSPDUnitAugust,
        currUnitSeptember = currOEMUnitSeptember + currOEXUnitSeptember + currEXPUnitSeptember + currSPDUnitSeptember,
        currUnitOctober = currOEMUnitOctober + currOEXUnitOctober + currEXPUnitOctober + currSPDUnitOctober,
        currUnitNovember = currOEMUnitNovember + currOEXUnitNovember + currEXPUnitNovember + currSPDUnitNovember,
        currUnitDecember = currOEMUnitDecember + currOEXUnitDecember + currEXPUnitDecember + currSPDUnitDecember,
        currBahtJanuary = currOEMBahtJanuary + currOEXBahtJanuary + currEXPBahtJanuary + currSPDBahtJanuary,
        currBahtFebruary = currOEMBahtFebruary + currOEXBahtFebruary + currEXPBahtFebruary + currSPDBahtFebruary,
        currBahtMarch = currOEMBahtMarch + currOEXBahtMarch + currEXPBahtMarch + currSPDBahtMarch,
        currBahtApril = currOEMBahtApril + currOEXBahtApril + currEXPBahtApril + currSPDBahtApril,
        currBahtMay = currOEMBahtMay + currOEXBahtMay + currEXPBahtMay + currSPDBahtMay,
        currBahtJune = currOEMBahtJune + currOEXBahtJune + currEXPBahtJune + currSPDBahtJune,
        currBahtJuly = currOEMBahtJuly + currOEXBahtJuly + currEXPBahtJuly + currSPDBahtJuly,
        currBahtAugust = currOEMBahtAugust + currOEXBahtAugust + currEXPBahtAugust + currSPDBahtAugust,
        currBahtSeptember = currOEMBahtSeptember + currOEXBahtSeptember + currEXPBahtSeptember + currSPDBahtSeptember,
        currBahtOctober = currOEMBahtOctober + currOEXBahtOctober + currEXPBahtOctober + currSPDBahtOctober,
        currBahtNovember = currOEMBahtNovember + currOEXBahtNovember + currEXPBahtNovember + currSPDBahtNovember,
        currBahtDecember = currOEMBahtDecember + currOEXBahtDecember + currEXPBahtDecember + currSPDBahtDecember,

        currUnitQ1 = currOEMUnitQ1 + currOEXUnitQ1 + currEXPUnitQ1 + currSPDUnitQ1,
        currBahtQ1 = currOEMBahtQ1 + currOEXBahtQ1 + currEXPBahtQ1 + currSPDBahtQ1,
        currUnitQ2 = currOEMUnitQ2 + currOEXUnitQ2 + currEXPUnitQ2 + currSPDUnitQ2,
        currBahtQ2 = currOEMBahtQ2 + currOEXBahtQ2 + currEXPBahtQ2 + currSPDBahtQ2,
        currUnitQ3 = currOEMUnitQ3 + currOEXUnitQ3 + currEXPUnitQ3 + currSPDUnitQ3,
        currBahtQ3 = currOEMBahtQ3 + currOEXBahtQ3 + currEXPBahtQ3 + currSPDBahtQ3,
        currUnitQ4 = currOEMUnitQ4 + currOEXUnitQ4 + currEXPUnitQ4 + currSPDUnitQ4,
        currBahtQ4 = currOEMBahtQ4 + currOEXBahtQ4 + currEXPBahtQ4 + currSPDBahtQ4,

        oldUnitJanuary = oldOEMUnitJanuary + oldOEXUnitJanuary + oldEXPUnitJanuary + oldSPDUnitJanuary,
        oldUnitFebruary = oldOEMUnitFebruary + oldOEXUnitFebruary + oldEXPUnitFebruary + oldSPDUnitFebruary,
        oldUnitMarch = oldOEMUnitMarch + oldOEXUnitMarch + oldEXPUnitMarch + oldSPDUnitMarch,
        oldUnitApril = oldOEMUnitApril + oldOEXUnitApril + oldEXPUnitApril + oldSPDUnitApril,
        oldUnitMay = oldOEMUnitMay + oldOEXUnitMay + oldEXPUnitMay + oldSPDUnitMay,
        oldUnitJune = oldOEMUnitJune + oldOEXUnitJune + oldEXPUnitJune + oldSPDUnitJune,
        oldUnitJuly = oldOEMUnitJuly + oldOEXUnitJuly + oldEXPUnitJuly + oldSPDUnitJuly,
        oldUnitAugust = oldOEMUnitAugust + oldOEXUnitAugust + oldEXPUnitAugust + oldSPDUnitAugust,
        oldUnitSeptember = oldOEMUnitSeptember + oldOEXUnitSeptember + oldEXPUnitSeptember + oldSPDUnitSeptember,
        oldUnitOctober = oldOEMUnitOctober + oldOEXUnitOctober + oldEXPUnitOctober + oldSPDUnitOctober,
        oldUnitNovember = oldOEMUnitNovember + oldOEXUnitNovember + oldEXPUnitNovember + oldSPDUnitNovember,
        oldUnitDecember = oldOEMUnitDecember + oldOEXUnitDecember + oldEXPUnitDecember + oldSPDUnitDecember,
        oldBahtJanuary = oldOEMBahtJanuary + oldOEXBahtJanuary + oldEXPBahtJanuary + oldSPDBahtJanuary,
        oldBahtFebruary = oldOEMBahtFebruary + oldOEXBahtFebruary + oldEXPBahtFebruary + oldSPDBahtFebruary,
        oldBahtMarch = oldOEMBahtMarch + oldOEXBahtMarch + oldEXPBahtMarch + oldSPDBahtMarch,
        oldBahtApril = oldOEMBahtApril + oldOEXBahtApril + oldEXPBahtApril + oldSPDBahtApril,
        oldBahtMay = oldOEMBahtMay + oldOEXBahtMay + oldEXPBahtMay + oldSPDBahtMay,
        oldBahtJune = oldOEMBahtJune + oldOEXBahtJune + oldEXPBahtJune + oldSPDBahtJune,
        oldBahtJuly = oldOEMBahtJuly + oldOEXBahtJuly + oldEXPBahtJuly + oldSPDBahtJuly,
        oldBahtAugust = oldOEMBahtAugust + oldOEXBahtAugust + oldEXPBahtAugust + oldSPDBahtAugust,
        oldBahtSeptember = oldOEMBahtSeptember + oldOEXBahtSeptember + oldEXPBahtSeptember + oldSPDBahtSeptember,
        oldBahtOctober = oldOEMBahtOctober + oldOEXBahtOctober + oldEXPBahtOctober + oldSPDBahtOctober,
        oldBahtNovember = oldOEMBahtNovember + oldOEXBahtNovember + oldEXPBahtNovember + oldSPDBahtNovember,
        oldBahtDecember = oldOEMBahtDecember + oldOEXBahtDecember + oldEXPBahtDecember + oldSPDBahtDecember,

        oldUnitQ1 = oldOEMUnitQ1 + oldOEXUnitQ1 + oldEXPUnitQ1 + oldSPDUnitQ1,
        oldBahtQ1 = oldOEMBahtQ1 + oldOEXBahtQ1 + oldEXPBahtQ1 + oldSPDBahtQ1,
        oldUnitQ2 = oldOEMUnitQ2 + oldOEXUnitQ2 + oldEXPUnitQ2 + oldSPDUnitQ2,
        oldBahtQ2 = oldOEMBahtQ2 + oldOEXBahtQ2 + oldEXPBahtQ2 + oldSPDBahtQ2,
        oldUnitQ3 = oldOEMUnitQ3 + oldOEXUnitQ3 + oldEXPUnitQ3 + oldSPDUnitQ3,
        oldBahtQ3 = oldOEMBahtQ3 + oldOEXBahtQ3 + oldEXPBahtQ3 + oldSPDBahtQ3,
        oldUnitQ4 = oldOEMUnitQ4 + oldOEXUnitQ4 + oldEXPUnitQ4 + oldSPDUnitQ4,
        oldBahtQ4 = oldOEMBahtQ4 + oldOEXBahtQ4 + oldEXPBahtQ4 + oldSPDBahtQ4;

    $('#BahtOEM1').html(accounting.formatNumber(currOEMBahtJanuary / 1000, 2));
    $('#BahtOEM2').html(accounting.formatNumber(currOEMBahtFebruary / 1000, 2));
    $('#BahtOEM3').html(accounting.formatNumber(currOEMBahtMarch / 1000, 2));
    $('#BahtOEM4').html(accounting.formatNumber(currOEMBahtApril / 1000, 2));
    $('#BahtOEM5').html(accounting.formatNumber(currOEMBahtMay / 1000, 2));
    $('#BahtOEM6').html(accounting.formatNumber(currOEMBahtJune / 1000, 2));
    $('#BahtOEM7').html(accounting.formatNumber(currOEMBahtJuly / 1000, 2));
    $('#BahtOEM8').html(accounting.formatNumber(currOEMBahtAugust / 1000, 2));
    $('#BahtOEM9').html(accounting.formatNumber(currOEMBahtSeptember / 1000, 2));
    $('#BahtOEM10').html(accounting.formatNumber(currOEMBahtOctober / 1000, 2));
    $('#BahtOEM11').html(accounting.formatNumber(currOEMBahtNovember / 1000, 2));
    $('#BahtOEM12').html(accounting.formatNumber(currOEMBahtDecember / 1000, 2));
    $('#BahtOEMTotal').html(accounting.formatNumber(currOEMTotalBaht / 1000, 2));

    $('#BahtOEX1').html(accounting.formatNumber(currOEXBahtJanuary / 1000, 2));
    $('#BahtOEX2').html(accounting.formatNumber(currOEXBahtFebruary / 1000, 2));
    $('#BahtOEX3').html(accounting.formatNumber(currOEXBahtMarch / 1000, 2));
    $('#BahtOEX4').html(accounting.formatNumber(currOEXBahtApril / 1000, 2));
    $('#BahtOEX5').html(accounting.formatNumber(currOEXBahtMay / 1000, 2));
    $('#BahtOEX6').html(accounting.formatNumber(currOEXBahtJune / 1000, 2));
    $('#BahtOEX7').html(accounting.formatNumber(currOEXBahtJuly / 1000, 2));
    $('#BahtOEX8').html(accounting.formatNumber(currOEXBahtAugust / 1000, 2));
    $('#BahtOEX9').html(accounting.formatNumber(currOEXBahtSeptember / 1000, 2));
    $('#BahtOEX10').html(accounting.formatNumber(currOEXBahtOctober / 1000, 2));
    $('#BahtOEX11').html(accounting.formatNumber(currOEXBahtNovember / 1000, 2));
    $('#BahtOEX12').html(accounting.formatNumber(currOEXBahtDecember / 1000, 2));
    $('#BahtOEXTotal').html(accounting.formatNumber(currOEXTotalBaht / 1000, 2));

    $('#BahtEXP1').html(accounting.formatNumber(currEXPBahtJanuary / 1000, 2));
    $('#BahtEXP2').html(accounting.formatNumber(currEXPBahtFebruary / 1000, 2));
    $('#BahtEXP3').html(accounting.formatNumber(currEXPBahtMarch / 1000, 2));
    $('#BahtEXP4').html(accounting.formatNumber(currEXPBahtApril / 1000, 2));
    $('#BahtEXP5').html(accounting.formatNumber(currEXPBahtMay / 1000, 2));
    $('#BahtEXP6').html(accounting.formatNumber(currEXPBahtJune / 1000, 2));
    $('#BahtEXP7').html(accounting.formatNumber(currEXPBahtJuly / 1000, 2));
    $('#BahtEXP8').html(accounting.formatNumber(currEXPBahtAugust / 1000, 2));
    $('#BahtEXP9').html(accounting.formatNumber(currEXPBahtSeptember / 1000, 2));
    $('#BahtEXP10').html(accounting.formatNumber(currEXPBahtOctober / 1000, 2));
    $('#BahtEXP11').html(accounting.formatNumber(currEXPBahtNovember / 1000, 2));
    $('#BahtEXP12').html(accounting.formatNumber(currEXPBahtDecember / 1000, 2));
    $('#BahtEXPTotal').html(accounting.formatNumber(currEXPTotalBaht / 1000, 2));

    $('#BahtSPD1').html(accounting.formatNumber(currSPDBahtJanuary / 1000, 2));
    $('#BahtSPD2').html(accounting.formatNumber(currSPDBahtFebruary / 1000, 2));
    $('#BahtSPD3').html(accounting.formatNumber(currSPDBahtMarch / 1000, 2));
    $('#BahtSPD4').html(accounting.formatNumber(currSPDBahtApril / 1000, 2));
    $('#BahtSPD5').html(accounting.formatNumber(currSPDBahtMay / 1000, 2));
    $('#BahtSPD6').html(accounting.formatNumber(currSPDBahtJune / 1000, 2));
    $('#BahtSPD7').html(accounting.formatNumber(currSPDBahtJuly / 1000, 2));
    $('#BahtSPD8').html(accounting.formatNumber(currSPDBahtAugust / 1000, 2));
    $('#BahtSPD9').html(accounting.formatNumber(currSPDBahtSeptember / 1000, 2));
    $('#BahtSPD10').html(accounting.formatNumber(currSPDBahtOctober / 1000, 2));
    $('#BahtSPD11').html(accounting.formatNumber(currSPDBahtNovember / 1000, 2));
    $('#BahtSPD12').html(accounting.formatNumber(currSPDBahtDecember / 1000, 2));
    $('#BahtSPDTotal').html(accounting.formatNumber(currSPDTotalBaht / 1000, 2));

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

    $('#UnitOEM1').html(accounting.formatNumber(currOEMUnitJanuary));
    $('#UnitOEM2').html(accounting.formatNumber(currOEMUnitFebruary));
    $('#UnitOEM3').html(accounting.formatNumber(currOEMUnitMarch));
    $('#UnitOEM4').html(accounting.formatNumber(currOEMUnitApril));
    $('#UnitOEM5').html(accounting.formatNumber(currOEMUnitMay));
    $('#UnitOEM6').html(accounting.formatNumber(currOEMUnitJune));
    $('#UnitOEM7').html(accounting.formatNumber(currOEMUnitJuly));
    $('#UnitOEM8').html(accounting.formatNumber(currOEMUnitAugust));
    $('#UnitOEM9').html(accounting.formatNumber(currOEMUnitSeptember));
    $('#UnitOEM10').html(accounting.formatNumber(currOEMUnitOctober));
    $('#UnitOEM11').html(accounting.formatNumber(currOEMUnitNovember));
    $('#UnitOEM12').html(accounting.formatNumber(currOEMUnitDecember));
    $('#UnitOEMTotal').html(accounting.formatNumber(currOEMTotalUnit));

    $('#UnitOEX1').html(accounting.formatNumber(currOEXUnitJanuary));
    $('#UnitOEX2').html(accounting.formatNumber(currOEXUnitFebruary));
    $('#UnitOEX3').html(accounting.formatNumber(currOEXUnitMarch));
    $('#UnitOEX4').html(accounting.formatNumber(currOEXUnitApril));
    $('#UnitOEX5').html(accounting.formatNumber(currOEXUnitMay));
    $('#UnitOEX6').html(accounting.formatNumber(currOEXUnitJune));
    $('#UnitOEX7').html(accounting.formatNumber(currOEXUnitJuly));
    $('#UnitOEX8').html(accounting.formatNumber(currOEXUnitAugust));
    $('#UnitOEX9').html(accounting.formatNumber(currOEXUnitSeptember));
    $('#UnitOEX10').html(accounting.formatNumber(currOEXUnitOctober));
    $('#UnitOEX11').html(accounting.formatNumber(currOEXUnitNovember));
    $('#UnitOEX12').html(accounting.formatNumber(currOEXUnitDecember));
    $('#UnitOEXTotal').html(accounting.formatNumber(currOEXTotalUnit));

    $('#UnitEXP1').html(accounting.formatNumber(currEXPUnitJanuary));
    $('#UnitEXP2').html(accounting.formatNumber(currEXPUnitFebruary));
    $('#UnitEXP3').html(accounting.formatNumber(currEXPUnitMarch));
    $('#UnitEXP4').html(accounting.formatNumber(currEXPUnitApril));
    $('#UnitEXP5').html(accounting.formatNumber(currEXPUnitMay));
    $('#UnitEXP6').html(accounting.formatNumber(currEXPUnitJune));
    $('#UnitEXP7').html(accounting.formatNumber(currEXPUnitJuly));
    $('#UnitEXP8').html(accounting.formatNumber(currEXPUnitAugust));
    $('#UnitEXP9').html(accounting.formatNumber(currEXPUnitSeptember));
    $('#UnitEXP10').html(accounting.formatNumber(currEXPUnitOctober));
    $('#UnitEXP11').html(accounting.formatNumber(currEXPUnitNovember));
    $('#UnitEXP12').html(accounting.formatNumber(currEXPUnitDecember));
    $('#UnitEXPTotal').html(accounting.formatNumber(currEXPTotalUnit));

    $('#UnitSPD1').html(accounting.formatNumber(currSPDUnitJanuary));
    $('#UnitSPD2').html(accounting.formatNumber(currSPDUnitFebruary));
    $('#UnitSPD3').html(accounting.formatNumber(currSPDUnitMarch));
    $('#UnitSPD4').html(accounting.formatNumber(currSPDUnitApril));
    $('#UnitSPD5').html(accounting.formatNumber(currSPDUnitMay));
    $('#UnitSPD6').html(accounting.formatNumber(currSPDUnitJune));
    $('#UnitSPD7').html(accounting.formatNumber(currSPDUnitJuly));
    $('#UnitSPD8').html(accounting.formatNumber(currSPDUnitAugust));
    $('#UnitSPD9').html(accounting.formatNumber(currSPDUnitSeptember));
    $('#UnitSPD10').html(accounting.formatNumber(currSPDUnitOctober));
    $('#UnitSPD11').html(accounting.formatNumber(currSPDUnitNovember));
    $('#UnitSPD12').html(accounting.formatNumber(currSPDUnitDecember));
    $('#UnitSPDTotal').html(accounting.formatNumber(currSPDTotalUnit));

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

    $('#ambBahtOEM1').html(accounting.formatNumber(currAMBOEMBahtJanuary / 1000, 2));
    $('#ambBahtOEM2').html(accounting.formatNumber(currAMBOEMBahtFebruary / 1000, 2));
    $('#ambBahtOEM3').html(accounting.formatNumber(currAMBOEMBahtMarch / 1000, 2));
    $('#ambBahtOEM4').html(accounting.formatNumber(currAMBOEMBahtApril / 1000, 2));
    $('#ambBahtOEM5').html(accounting.formatNumber(currAMBOEMBahtMay / 1000, 2));
    $('#ambBahtOEM6').html(accounting.formatNumber(currAMBOEMBahtJune / 1000, 2));
    $('#ambBahtOEM7').html(accounting.formatNumber(currAMBOEMBahtJuly / 1000, 2));
    $('#ambBahtOEM8').html(accounting.formatNumber(currAMBOEMBahtAugust / 1000, 2));
    $('#ambBahtOEM9').html(accounting.formatNumber(currAMBOEMBahtSeptember / 1000, 2));
    $('#ambBahtOEM10').html(accounting.formatNumber(currAMBOEMBahtOctober / 1000, 2));
    $('#ambBahtOEM11').html(accounting.formatNumber(currAMBOEMBahtNovember / 1000, 2));
    $('#ambBahtOEM12').html(accounting.formatNumber(currAMBOEMBahtDecember / 1000, 2));
    $('#ambBahtOEMTotal').html(accounting.formatNumber(currOEMAMBTotalBaht / 1000, 2));

    $('#ambBahtOEX1').html(accounting.formatNumber(currAMBOEXBahtJanuary / 1000, 2));
    $('#ambBahtOEX2').html(accounting.formatNumber(currAMBOEXBahtFebruary / 1000, 2));
    $('#ambBahtOEX3').html(accounting.formatNumber(currAMBOEXBahtMarch / 1000, 2));
    $('#ambBahtOEX4').html(accounting.formatNumber(currAMBOEXBahtApril / 1000, 2));
    $('#ambBahtOEX5').html(accounting.formatNumber(currAMBOEXBahtMay / 1000, 2));
    $('#ambBahtOEX6').html(accounting.formatNumber(currAMBOEXBahtJune / 1000, 2));
    $('#ambBahtOEX7').html(accounting.formatNumber(currAMBOEXBahtJuly / 1000, 2));
    $('#ambBahtOEX8').html(accounting.formatNumber(currAMBOEXBahtAugust / 1000, 2));
    $('#ambBahtOEX9').html(accounting.formatNumber(currAMBOEXBahtSeptember / 1000, 2));
    $('#ambBahtOEX10').html(accounting.formatNumber(currAMBOEXBahtOctober / 1000, 2));
    $('#ambBahtOEX11').html(accounting.formatNumber(currAMBOEXBahtNovember / 1000, 2));
    $('#ambBahtOEX12').html(accounting.formatNumber(currAMBOEXBahtDecember / 1000, 2));
    $('#ambBahtOEXTotal').html(accounting.formatNumber(currOEXAMBTotalBaht / 1000, 2));

    $('#ambBahtEXP1').html(accounting.formatNumber(currAMBEXPBahtJanuary / 1000, 2));
    $('#ambBahtEXP2').html(accounting.formatNumber(currAMBEXPBahtFebruary / 1000, 2));
    $('#ambBahtEXP3').html(accounting.formatNumber(currAMBEXPBahtMarch / 1000, 2));
    $('#ambBahtEXP4').html(accounting.formatNumber(currAMBEXPBahtApril / 1000, 2));
    $('#ambBahtEXP5').html(accounting.formatNumber(currAMBEXPBahtMay / 1000, 2));
    $('#ambBahtEXP6').html(accounting.formatNumber(currAMBEXPBahtJune / 1000, 2));
    $('#ambBahtEXP7').html(accounting.formatNumber(currAMBEXPBahtJuly / 1000, 2));
    $('#ambBahtEXP8').html(accounting.formatNumber(currAMBEXPBahtAugust / 1000, 2));
    $('#ambBahtEXP9').html(accounting.formatNumber(currAMBEXPBahtSeptember / 1000, 2));
    $('#ambBahtEXP10').html(accounting.formatNumber(currAMBEXPBahtOctober / 1000, 2));
    $('#ambBahtEXP11').html(accounting.formatNumber(currAMBEXPBahtNovember / 1000, 2));
    $('#ambBahtEXP12').html(accounting.formatNumber(currAMBEXPBahtDecember / 1000, 2));
    $('#ambBahtEXPTotal').html(accounting.formatNumber(currEXPAMBTotalBaht / 1000, 2));

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

    $('#ambUnitOEM1').html(accounting.formatNumber(currAMBOEMUnitJanuary));
    $('#ambUnitOEM2').html(accounting.formatNumber(currAMBOEMUnitFebruary));
    $('#ambUnitOEM3').html(accounting.formatNumber(currAMBOEMUnitMarch));
    $('#ambUnitOEM4').html(accounting.formatNumber(currAMBOEMUnitApril));
    $('#ambUnitOEM5').html(accounting.formatNumber(currAMBOEMUnitMay));
    $('#ambUnitOEM6').html(accounting.formatNumber(currAMBOEMUnitJune));
    $('#ambUnitOEM7').html(accounting.formatNumber(currAMBOEMUnitJuly));
    $('#ambUnitOEM8').html(accounting.formatNumber(currAMBOEMUnitAugust));
    $('#ambUnitOEM9').html(accounting.formatNumber(currAMBOEMUnitSeptember));
    $('#ambUnitOEM10').html(accounting.formatNumber(currAMBOEMUnitOctober));
    $('#ambUnitOEM11').html(accounting.formatNumber(currAMBOEMUnitNovember));
    $('#ambUnitOEM12').html(accounting.formatNumber(currAMBOEMUnitDecember));
    $('#ambUnitOEMTotal').html(accounting.formatNumber(currOEMAMBTotalUnit));

    $('#ambUnitOEX1').html(accounting.formatNumber(currAMBOEXUnitJanuary));
    $('#ambUnitOEX2').html(accounting.formatNumber(currAMBOEXUnitFebruary));
    $('#ambUnitOEX3').html(accounting.formatNumber(currAMBOEXUnitMarch));
    $('#ambUnitOEX4').html(accounting.formatNumber(currAMBOEXUnitApril));
    $('#ambUnitOEX5').html(accounting.formatNumber(currAMBOEXUnitMay));
    $('#ambUnitOEX6').html(accounting.formatNumber(currAMBOEXUnitJune));
    $('#ambUnitOEX7').html(accounting.formatNumber(currAMBOEXUnitJuly));
    $('#ambUnitOEX8').html(accounting.formatNumber(currAMBOEXUnitAugust));
    $('#ambUnitOEX9').html(accounting.formatNumber(currAMBOEXUnitSeptember));
    $('#ambUnitOEX10').html(accounting.formatNumber(currAMBOEXUnitOctober));
    $('#ambUnitOEX11').html(accounting.formatNumber(currAMBOEXUnitNovember));
    $('#ambUnitOEX12').html(accounting.formatNumber(currAMBOEXUnitDecember));
    $('#ambUnitOEXTotal').html(accounting.formatNumber(currOEXAMBTotalUnit));

    $('#ambUnitEXP1').html(accounting.formatNumber(currAMBEXPUnitJanuary));
    $('#ambUnitEXP2').html(accounting.formatNumber(currAMBEXPUnitFebruary));
    $('#ambUnitEXP3').html(accounting.formatNumber(currAMBEXPUnitMarch));
    $('#ambUnitEXP4').html(accounting.formatNumber(currAMBEXPUnitApril));
    $('#ambUnitEXP5').html(accounting.formatNumber(currAMBEXPUnitMay));
    $('#ambUnitEXP6').html(accounting.formatNumber(currAMBEXPUnitJune));
    $('#ambUnitEXP7').html(accounting.formatNumber(currAMBEXPUnitJuly));
    $('#ambUnitEXP8').html(accounting.formatNumber(currAMBEXPUnitAugust));
    $('#ambUnitEXP9').html(accounting.formatNumber(currAMBEXPUnitSeptember));
    $('#ambUnitEXP10').html(accounting.formatNumber(currAMBEXPUnitOctober));
    $('#ambUnitEXP11').html(accounting.formatNumber(currAMBEXPUnitNovember));
    $('#ambUnitEXP12').html(accounting.formatNumber(currAMBEXPUnitDecember));
    $('#ambUnitEXPTotal').html(accounting.formatNumber(currEXPAMBTotalUnit));

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

    $('#mcbBahtOEM1').html(accounting.formatNumber(currMCBOEMBahtJanuary / 1000, 2));
    $('#mcbBahtOEM2').html(accounting.formatNumber(currMCBOEMBahtFebruary / 1000, 2));
    $('#mcbBahtOEM3').html(accounting.formatNumber(currMCBOEMBahtMarch / 1000, 2));
    $('#mcbBahtOEM4').html(accounting.formatNumber(currMCBOEMBahtApril / 1000, 2));
    $('#mcbBahtOEM5').html(accounting.formatNumber(currMCBOEMBahtMay / 1000, 2));
    $('#mcbBahtOEM6').html(accounting.formatNumber(currMCBOEMBahtJune / 1000, 2));
    $('#mcbBahtOEM7').html(accounting.formatNumber(currMCBOEMBahtJuly / 1000, 2));
    $('#mcbBahtOEM8').html(accounting.formatNumber(currMCBOEMBahtAugust / 1000, 2));
    $('#mcbBahtOEM9').html(accounting.formatNumber(currMCBOEMBahtSeptember / 1000, 2));
    $('#mcbBahtOEM10').html(accounting.formatNumber(currMCBOEMBahtOctober / 1000, 2));
    $('#mcbBahtOEM11').html(accounting.formatNumber(currMCBOEMBahtNovember / 1000, 2));
    $('#mcbBahtOEM12').html(accounting.formatNumber(currMCBOEMBahtDecember / 1000, 2));
    $('#mcbBahtOEMTotal').html(accounting.formatNumber(currOEMMCBTotalBaht / 1000, 2));

    $('#mcbBahtOEX1').html(accounting.formatNumber(currMCBOEXBahtJanuary / 1000, 2));
    $('#mcbBahtOEX2').html(accounting.formatNumber(currMCBOEXBahtFebruary / 1000, 2));
    $('#mcbBahtOEX3').html(accounting.formatNumber(currMCBOEXBahtMarch / 1000, 2));
    $('#mcbBahtOEX4').html(accounting.formatNumber(currMCBOEXBahtApril / 1000, 2));
    $('#mcbBahtOEX5').html(accounting.formatNumber(currMCBOEXBahtMay / 1000, 2));
    $('#mcbBahtOEX6').html(accounting.formatNumber(currMCBOEXBahtJune / 1000, 2));
    $('#mcbBahtOEX7').html(accounting.formatNumber(currMCBOEXBahtJuly / 1000, 2));
    $('#mcbBahtOEX8').html(accounting.formatNumber(currMCBOEXBahtAugust / 1000, 2));
    $('#mcbBahtOEX9').html(accounting.formatNumber(currMCBOEXBahtSeptember / 1000, 2));
    $('#mcbBahtOEX10').html(accounting.formatNumber(currMCBOEXBahtOctober / 1000, 2));
    $('#mcbBahtOEX11').html(accounting.formatNumber(currMCBOEXBahtNovember / 1000, 2));
    $('#mcbBahtOEX12').html(accounting.formatNumber(currMCBOEXBahtDecember / 1000, 2));
    $('#mcbBahtOEXTotal').html(accounting.formatNumber(currOEXMCBTotalBaht / 1000, 2));

    $('#mcbBahtEXP1').html(accounting.formatNumber(currMCBEXPBahtJanuary / 1000, 2));
    $('#mcbBahtEXP2').html(accounting.formatNumber(currMCBEXPBahtFebruary / 1000, 2));
    $('#mcbBahtEXP3').html(accounting.formatNumber(currMCBEXPBahtMarch / 1000, 2));
    $('#mcbBahtEXP4').html(accounting.formatNumber(currMCBEXPBahtApril / 1000, 2));
    $('#mcbBahtEXP5').html(accounting.formatNumber(currMCBEXPBahtMay / 1000, 2));
    $('#mcbBahtEXP6').html(accounting.formatNumber(currMCBEXPBahtJune / 1000, 2));
    $('#mcbBahtEXP7').html(accounting.formatNumber(currMCBEXPBahtJuly / 1000, 2));
    $('#mcbBahtEXP8').html(accounting.formatNumber(currMCBEXPBahtAugust / 1000, 2));
    $('#mcbBahtEXP9').html(accounting.formatNumber(currMCBEXPBahtSeptember / 1000, 2));
    $('#mcbBahtEXP10').html(accounting.formatNumber(currMCBEXPBahtOctober / 1000, 2));
    $('#mcbBahtEXP11').html(accounting.formatNumber(currMCBEXPBahtNovember / 1000, 2));
    $('#mcbBahtEXP12').html(accounting.formatNumber(currMCBEXPBahtDecember / 1000, 2));
    $('#mcbBahtEXPTotal').html(accounting.formatNumber(currEXPMCBTotalBaht / 1000, 2));

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

    $('#mcbUnitOEM1').html(accounting.formatNumber(currMCBOEMUnitJanuary));
    $('#mcbUnitOEM2').html(accounting.formatNumber(currMCBOEMUnitFebruary));
    $('#mcbUnitOEM3').html(accounting.formatNumber(currMCBOEMUnitMarch));
    $('#mcbUnitOEM4').html(accounting.formatNumber(currMCBOEMUnitApril));
    $('#mcbUnitOEM5').html(accounting.formatNumber(currMCBOEMUnitMay));
    $('#mcbUnitOEM6').html(accounting.formatNumber(currMCBOEMUnitJune));
    $('#mcbUnitOEM7').html(accounting.formatNumber(currMCBOEMUnitJuly));
    $('#mcbUnitOEM8').html(accounting.formatNumber(currMCBOEMUnitAugust));
    $('#mcbUnitOEM9').html(accounting.formatNumber(currMCBOEMUnitSeptember));
    $('#mcbUnitOEM10').html(accounting.formatNumber(currMCBOEMUnitOctober));
    $('#mcbUnitOEM11').html(accounting.formatNumber(currMCBOEMUnitNovember));
    $('#mcbUnitOEM12').html(accounting.formatNumber(currMCBOEMUnitDecember));
    $('#mcbUnitOEMTotal').html(accounting.formatNumber(currOEMMCBTotalUnit));

    $('#mcbUnitOEX1').html(accounting.formatNumber(currMCBOEXUnitJanuary));
    $('#mcbUnitOEX2').html(accounting.formatNumber(currMCBOEXUnitFebruary));
    $('#mcbUnitOEX3').html(accounting.formatNumber(currMCBOEXUnitMarch));
    $('#mcbUnitOEX4').html(accounting.formatNumber(currMCBOEXUnitApril));
    $('#mcbUnitOEX5').html(accounting.formatNumber(currMCBOEXUnitMay));
    $('#mcbUnitOEX6').html(accounting.formatNumber(currMCBOEXUnitJune));
    $('#mcbUnitOEX7').html(accounting.formatNumber(currMCBOEXUnitJuly));
    $('#mcbUnitOEX8').html(accounting.formatNumber(currMCBOEXUnitAugust));
    $('#mcbUnitOEX9').html(accounting.formatNumber(currMCBOEXUnitSeptember));
    $('#mcbUnitOEX10').html(accounting.formatNumber(currMCBOEXUnitOctober));
    $('#mcbUnitOEX11').html(accounting.formatNumber(currMCBOEXUnitNovember));
    $('#mcbUnitOEX12').html(accounting.formatNumber(currMCBOEXUnitDecember));
    $('#mcbUnitOEXTotal').html(accounting.formatNumber(currOEXMCBTotalUnit));

    $('#mcbUnitEXP1').html(accounting.formatNumber(currMCBEXPUnitJanuary));
    $('#mcbUnitEXP2').html(accounting.formatNumber(currMCBEXPUnitFebruary));
    $('#mcbUnitEXP3').html(accounting.formatNumber(currMCBEXPUnitMarch));
    $('#mcbUnitEXP4').html(accounting.formatNumber(currMCBEXPUnitApril));
    $('#mcbUnitEXP5').html(accounting.formatNumber(currMCBEXPUnitMay));
    $('#mcbUnitEXP6').html(accounting.formatNumber(currMCBEXPUnitJune));
    $('#mcbUnitEXP7').html(accounting.formatNumber(currMCBEXPUnitJuly));
    $('#mcbUnitEXP8').html(accounting.formatNumber(currMCBEXPUnitAugust));
    $('#mcbUnitEXP9').html(accounting.formatNumber(currMCBEXPUnitSeptember));
    $('#mcbUnitEXP10').html(accounting.formatNumber(currMCBEXPUnitOctober));
    $('#mcbUnitEXP11').html(accounting.formatNumber(currMCBEXPUnitNovember));
    $('#mcbUnitEXP12').html(accounting.formatNumber(currMCBEXPUnitDecember));
    $('#mcbUnitEXPTotal').html(accounting.formatNumber(currEXPMCBTotalUnit));

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

    $('#ebBahtSPD1').html(accounting.formatNumber(currEBSPDBahtJanuary / 1000, 2));
    $('#ebBahtSPD2').html(accounting.formatNumber(currEBSPDBahtFebruary / 1000, 2));
    $('#ebBahtSPD3').html(accounting.formatNumber(currEBSPDBahtMarch / 1000, 2));
    $('#ebBahtSPD4').html(accounting.formatNumber(currEBSPDBahtApril / 1000, 2));
    $('#ebBahtSPD5').html(accounting.formatNumber(currEBSPDBahtMay / 1000, 2));
    $('#ebBahtSPD6').html(accounting.formatNumber(currEBSPDBahtJune / 1000, 2));
    $('#ebBahtSPD7').html(accounting.formatNumber(currEBSPDBahtJuly / 1000, 2));
    $('#ebBahtSPD8').html(accounting.formatNumber(currEBSPDBahtAugust / 1000, 2));
    $('#ebBahtSPD9').html(accounting.formatNumber(currEBSPDBahtSeptember / 1000, 2));
    $('#ebBahtSPD10').html(accounting.formatNumber(currEBSPDBahtOctober / 1000, 2));
    $('#ebBahtSPD11').html(accounting.formatNumber(currEBSPDBahtNovember / 1000, 2));
    $('#ebBahtSPD12').html(accounting.formatNumber(currEBSPDBahtDecember / 1000, 2));
    $('#ebBahtSPDTotal').html(accounting.formatNumber(currSPDEBTotalBaht / 1000, 2));

    $('#ebBaht1').html(accounting.formatNumber(currEBBahtJanuary / 1000, 2));
    $('#ebBaht2').html(accounting.formatNumber(currEBBahtFebruary / 1000, 2));
    $('#ebBaht3').html(accounting.formatNumber(currEBBahtMarch / 1000, 2));
    $('#ebBaht4').html(accounting.formatNumber(currEBBahtApril / 1000, 2));
    $('#ebBaht5').html(accounting.formatNumber(currEBBahtMay / 1000, 2));
    $('#ebBaht6').html(accounting.formatNumber(currEBBahtJune / 1000, 2));
    $('#ebBaht7').html(accounting.formatNumber(currEBBahtJuly / 1000, 2));
    $('#ebBaht8').html(accounting.formatNumber(currEBBahtAugust / 1000, 2));
    $('#ebBaht9').html(accounting.formatNumber(currEBBahtSeptember / 1000, 2));
    $('#ebBaht10').html(accounting.formatNumber(currEBBahtOctober / 1000, 2));
    $('#ebBaht11').html(accounting.formatNumber(currEBBahtNovember / 1000, 2));
    $('#ebBaht12').html(accounting.formatNumber(currEBBahtDecember / 1000, 2));
    $('#ebBahtTotal').html(accounting.formatNumber(currEBTotalBaht / 1000, 2));

    $('#ebBahtActualOld1').html(accounting.formatNumber(oldEBBahtJanuary / 1000, 2));
    $('#ebBahtActualOld2').html(accounting.formatNumber(oldEBBahtFebruary / 1000, 2));
    $('#ebBahtActualOld3').html(accounting.formatNumber(oldEBBahtMarch / 1000, 2));
    $('#ebBahtActualOld4').html(accounting.formatNumber(oldEBBahtApril / 1000, 2));
    $('#ebBahtActualOld5').html(accounting.formatNumber(oldEBBahtMay / 1000, 2));
    $('#ebBahtActualOld6').html(accounting.formatNumber(oldEBBahtJune / 1000, 2));
    $('#ebBahtActualOld7').html(accounting.formatNumber(oldEBBahtJuly / 1000, 2));
    $('#ebBahtActualOld8').html(accounting.formatNumber(oldEBBahtAugust / 1000, 2));
    $('#ebBahtActualOld9').html(accounting.formatNumber(oldEBBahtSeptember / 1000, 2));
    $('#ebBahtActualOld10').html(accounting.formatNumber(oldEBBahtOctober / 1000, 2));
    $('#ebBahtActualOld11').html(accounting.formatNumber(oldEBBahtNovember / 1000, 2));
    $('#ebBahtActualOld12').html(accounting.formatNumber(oldEBBahtDecember / 1000, 2));
    $('#ebBahtActualOldTotal').html(accounting.formatNumber(oldEBTotalBaht / 1000, 2));

    $('#ebUnitSPD1').html(accounting.formatNumber(currEBSPDUnitJanuary / 1000, 2));
    $('#ebUnitSPD2').html(accounting.formatNumber(currEBSPDUnitFebruary / 1000, 2));
    $('#ebUnitSPD3').html(accounting.formatNumber(currEBSPDUnitMarch / 1000, 2));
    $('#ebUnitSPD4').html(accounting.formatNumber(currEBSPDUnitApril / 1000, 2));
    $('#ebUnitSPD5').html(accounting.formatNumber(currEBSPDUnitMay / 1000, 2));
    $('#ebUnitSPD6').html(accounting.formatNumber(currEBSPDUnitJune / 1000, 2));
    $('#ebUnitSPD7').html(accounting.formatNumber(currEBSPDUnitJuly / 1000, 2));
    $('#ebUnitSPD8').html(accounting.formatNumber(currEBSPDUnitAugust / 1000, 2));
    $('#ebUnitSPD9').html(accounting.formatNumber(currEBSPDUnitSeptember / 1000, 2));
    $('#ebUnitSPD10').html(accounting.formatNumber(currEBSPDUnitOctober / 1000, 2));
    $('#ebUnitSPD11').html(accounting.formatNumber(currEBSPDUnitNovember / 1000, 2));
    $('#ebUnitSPD12').html(accounting.formatNumber(currEBSPDUnitDecember / 1000, 2));
    $('#ebUnitSPDTotal').html(accounting.formatNumber(currSPDEBTotalUnit / 1000, 2));

    $('#ebUnit1').html(accounting.formatNumber(currEBUnitJanuary));
    $('#ebUnit2').html(accounting.formatNumber(currEBUnitFebruary));
    $('#ebUnit3').html(accounting.formatNumber(currEBUnitMarch));
    $('#ebUnit4').html(accounting.formatNumber(currEBUnitApril));
    $('#ebUnit5').html(accounting.formatNumber(currEBUnitMay));
    $('#ebUnit6').html(accounting.formatNumber(currEBUnitJune));
    $('#ebUnit7').html(accounting.formatNumber(currEBUnitJuly));
    $('#ebUnit8').html(accounting.formatNumber(currEBUnitAugust));
    $('#ebUnit9').html(accounting.formatNumber(currEBUnitSeptember));
    $('#ebUnit10').html(accounting.formatNumber(currEBUnitOctober));
    $('#ebUnit11').html(accounting.formatNumber(currEBUnitNovember));
    $('#ebUnit12').html(accounting.formatNumber(currEBUnitDecember));
    $('#ebUnitTotal').html(accounting.formatNumber(currEBTotalUnit));

    $('#ebUnitActualOld1').html(accounting.formatNumber(oldEBUnitJanuary));
    $('#ebUnitActualOld2').html(accounting.formatNumber(oldEBUnitFebruary));
    $('#ebUnitActualOld3').html(accounting.formatNumber(oldEBUnitMarch));
    $('#ebUnitActualOld4').html(accounting.formatNumber(oldEBUnitApril));
    $('#ebUnitActualOld5').html(accounting.formatNumber(oldEBUnitMay));
    $('#ebUnitActualOld6').html(accounting.formatNumber(oldEBUnitJune));
    $('#ebUnitActualOld7').html(accounting.formatNumber(oldEBUnitJuly));
    $('#ebUnitActualOld8').html(accounting.formatNumber(oldEBUnitAugust));
    $('#ebUnitActualOld9').html(accounting.formatNumber(oldEBUnitSeptember));
    $('#ebUnitActualOld10').html(accounting.formatNumber(oldEBUnitOctober));
    $('#ebUnitActualOld11').html(accounting.formatNumber(oldEBUnitNovember));
    $('#ebUnitActualOld12').html(accounting.formatNumber(oldEBUnitDecember));
    $('#ebUnitActualOldTotal').html(accounting.formatNumber(oldEBTotalUnit));

    $('#npBahtSPD1').html(accounting.formatNumber(currNPSPDBahtJanuary / 1000, 2));
    $('#npBahtSPD2').html(accounting.formatNumber(currNPSPDBahtFebruary / 1000, 2));
    $('#npBahtSPD3').html(accounting.formatNumber(currNPSPDBahtMarch / 1000, 2));
    $('#npBahtSPD4').html(accounting.formatNumber(currNPSPDBahtApril / 1000, 2));
    $('#npBahtSPD5').html(accounting.formatNumber(currNPSPDBahtMay / 1000, 2));
    $('#npBahtSPD6').html(accounting.formatNumber(currNPSPDBahtJune / 1000, 2));
    $('#npBahtSPD7').html(accounting.formatNumber(currNPSPDBahtJuly / 1000, 2));
    $('#npBahtSPD8').html(accounting.formatNumber(currNPSPDBahtAugust / 1000, 2));
    $('#npBahtSPD9').html(accounting.formatNumber(currNPSPDBahtSeptember / 1000, 2));
    $('#npBahtSPD10').html(accounting.formatNumber(currNPSPDBahtOctober / 1000, 2));
    $('#npBahtSPD11').html(accounting.formatNumber(currNPSPDBahtNovember / 1000, 2));
    $('#npBahtSPD12').html(accounting.formatNumber(currNPSPDBahtDecember / 1000, 2));
    $('#npBahtSPDTotal').html(accounting.formatNumber(currSPDNPTotalBaht / 1000, 2));

    $('#npBaht1').html(accounting.formatNumber(currNPBahtJanuary / 1000, 2));
    $('#npBaht2').html(accounting.formatNumber(currNPBahtFebruary / 1000, 2));
    $('#npBaht3').html(accounting.formatNumber(currNPBahtMarch / 1000, 2));
    $('#npBaht4').html(accounting.formatNumber(currNPBahtApril / 1000, 2));
    $('#npBaht5').html(accounting.formatNumber(currNPBahtMay / 1000, 2));
    $('#npBaht6').html(accounting.formatNumber(currNPBahtJune / 1000, 2));
    $('#npBaht7').html(accounting.formatNumber(currNPBahtJuly / 1000, 2));
    $('#npBaht8').html(accounting.formatNumber(currNPBahtAugust / 1000, 2));
    $('#npBaht9').html(accounting.formatNumber(currNPBahtSeptember / 1000, 2));
    $('#npBaht10').html(accounting.formatNumber(currNPBahtOctober / 1000, 2));
    $('#npBaht11').html(accounting.formatNumber(currNPBahtNovember / 1000, 2));
    $('#npBaht12').html(accounting.formatNumber(currNPBahtDecember / 1000, 2));
    $('#npBahtTotal').html(accounting.formatNumber(currNPTotalBaht / 1000, 2));

    $('#npBahtActualOld1').html(accounting.formatNumber(oldNPBahtJanuary / 1000, 2));
    $('#npBahtActualOld2').html(accounting.formatNumber(oldNPBahtFebruary / 1000, 2));
    $('#npBahtActualOld3').html(accounting.formatNumber(oldNPBahtMarch / 1000, 2));
    $('#npBahtActualOld4').html(accounting.formatNumber(oldNPBahtApril / 1000, 2));
    $('#npBahtActualOld5').html(accounting.formatNumber(oldNPBahtMay / 1000, 2));
    $('#npBahtActualOld6').html(accounting.formatNumber(oldNPBahtJune / 1000, 2));
    $('#npBahtActualOld7').html(accounting.formatNumber(oldNPBahtJuly / 1000, 2));
    $('#npBahtActualOld8').html(accounting.formatNumber(oldNPBahtAugust / 1000, 2));
    $('#npBahtActualOld9').html(accounting.formatNumber(oldNPBahtSeptember / 1000, 2));
    $('#npBahtActualOld10').html(accounting.formatNumber(oldNPBahtOctober / 1000, 2));
    $('#npBahtActualOld11').html(accounting.formatNumber(oldNPBahtNovember / 1000, 2));
    $('#npBahtActualOld12').html(accounting.formatNumber(oldNPBahtDecember / 1000, 2));
    $('#npBahtActualOldTotal').html(accounting.formatNumber(oldNPTotalBaht / 1000, 2));

    $('#npUnitSPD1').html(accounting.formatNumber(currNPSPDUnitJanuary));
    $('#npUnitSPD2').html(accounting.formatNumber(currNPSPDUnitFebruary));
    $('#npUnitSPD3').html(accounting.formatNumber(currNPSPDUnitMarch));
    $('#npUnitSPD4').html(accounting.formatNumber(currNPSPDUnitApril));
    $('#npUnitSPD5').html(accounting.formatNumber(currNPSPDUnitMay));
    $('#npUnitSPD6').html(accounting.formatNumber(currNPSPDUnitJune));
    $('#npUnitSPD7').html(accounting.formatNumber(currNPSPDUnitJuly));
    $('#npUnitSPD8').html(accounting.formatNumber(currNPSPDUnitAugust));
    $('#npUnitSPD9').html(accounting.formatNumber(currNPSPDUnitSeptember));
    $('#npUnitSPD10').html(accounting.formatNumber(currNPSPDUnitOctober));
    $('#npUnitSPD11').html(accounting.formatNumber(currNPSPDUnitNovember));
    $('#npUnitSPD12').html(accounting.formatNumber(currNPSPDUnitDecember));
    $('#npUnitSPDTotal').html(accounting.formatNumber(currSPDNPTotalUnit));

    $('#npUnit1').html(accounting.formatNumber(currNPUnitJanuary));
    $('#npUnit2').html(accounting.formatNumber(currNPUnitFebruary));
    $('#npUnit3').html(accounting.formatNumber(currNPUnitMarch));
    $('#npUnit4').html(accounting.formatNumber(currNPUnitApril));
    $('#npUnit5').html(accounting.formatNumber(currNPUnitMay));
    $('#npUnit6').html(accounting.formatNumber(currNPUnitJune));
    $('#npUnit7').html(accounting.formatNumber(currNPUnitJuly));
    $('#npUnit8').html(accounting.formatNumber(currNPUnitAugust));
    $('#npUnit9').html(accounting.formatNumber(currNPUnitSeptember));
    $('#npUnit10').html(accounting.formatNumber(currNPUnitOctober));
    $('#npUnit11').html(accounting.formatNumber(currNPUnitNovember));
    $('#npUnit12').html(accounting.formatNumber(currNPUnitDecember));
    $('#npUnitTotal').html(accounting.formatNumber(currNPTotalUnit));

    $('#npUnitActualOld1').html(accounting.formatNumber(oldNPUnitJanuary));
    $('#npUnitActualOld2').html(accounting.formatNumber(oldNPUnitFebruary));
    $('#npUnitActualOld3').html(accounting.formatNumber(oldNPUnitMarch));
    $('#npUnitActualOld4').html(accounting.formatNumber(oldNPUnitApril));
    $('#npUnitActualOld5').html(accounting.formatNumber(oldNPUnitMay));
    $('#npUnitActualOld6').html(accounting.formatNumber(oldNPUnitJune));
    $('#npUnitActualOld7').html(accounting.formatNumber(oldNPUnitJuly));
    $('#npUnitActualOld8').html(accounting.formatNumber(oldNPUnitAugust));
    $('#npUnitActualOld9').html(accounting.formatNumber(oldNPUnitSeptember));
    $('#npUnitActualOld10').html(accounting.formatNumber(oldNPUnitOctober));
    $('#npUnitActualOld11').html(accounting.formatNumber(oldNPUnitNovember));
    $('#npUnitActualOld12').html(accounting.formatNumber(oldNPUnitDecember));
    $('#npUnitActualOldTotal').html(accounting.formatNumber(oldNPTotalUnit));

    $('#indBahtSPD1').html(accounting.formatNumber(currINDSPDBahtJanuary / 1000, 2));
    $('#indBahtSPD2').html(accounting.formatNumber(currINDSPDBahtFebruary / 1000, 2));
    $('#indBahtSPD3').html(accounting.formatNumber(currINDSPDBahtMarch / 1000, 2));
    $('#indBahtSPD4').html(accounting.formatNumber(currINDSPDBahtApril / 1000, 2));
    $('#indBahtSPD5').html(accounting.formatNumber(currINDSPDBahtMay / 1000, 2));
    $('#indBahtSPD6').html(accounting.formatNumber(currINDSPDBahtJune / 1000, 2));
    $('#indBahtSPD7').html(accounting.formatNumber(currINDSPDBahtJuly / 1000, 2));
    $('#indBahtSPD8').html(accounting.formatNumber(currINDSPDBahtAugust / 1000, 2));
    $('#indBahtSPD9').html(accounting.formatNumber(currINDSPDBahtSeptember / 1000, 2));
    $('#indBahtSPD10').html(accounting.formatNumber(currINDSPDBahtOctober / 1000, 2));
    $('#indBahtSPD11').html(accounting.formatNumber(currINDSPDBahtNovember / 1000, 2));
    $('#indBahtSPD12').html(accounting.formatNumber(currINDSPDBahtDecember / 1000, 2));
    $('#indBahtSPDTotal').html(accounting.formatNumber(currSPDINDTotalBaht / 1000, 2));

    $('#indBaht1').html(accounting.formatNumber(currINDBahtJanuary / 1000, 2));
    $('#indBaht2').html(accounting.formatNumber(currINDBahtFebruary / 1000, 2));
    $('#indBaht3').html(accounting.formatNumber(currINDBahtMarch / 1000, 2));
    $('#indBaht4').html(accounting.formatNumber(currINDBahtApril / 1000, 2));
    $('#indBaht5').html(accounting.formatNumber(currINDBahtMay / 1000, 2));
    $('#indBaht6').html(accounting.formatNumber(currINDBahtJune / 1000, 2));
    $('#indBaht7').html(accounting.formatNumber(currINDBahtJuly / 1000, 2));
    $('#indBaht8').html(accounting.formatNumber(currINDBahtAugust / 1000, 2));
    $('#indBaht9').html(accounting.formatNumber(currINDBahtSeptember / 1000, 2));
    $('#indBaht10').html(accounting.formatNumber(currINDBahtOctober / 1000, 2));
    $('#indBaht11').html(accounting.formatNumber(currINDBahtNovember / 1000, 2));
    $('#indBaht12').html(accounting.formatNumber(currINDBahtDecember / 1000, 2));
    $('#indBahtTotal').html(accounting.formatNumber(currINDTotalBaht / 1000, 2));

    $('#indBahtActualOld1').html(accounting.formatNumber(oldINDBahtJanuary / 1000, 2));
    $('#indBahtActualOld2').html(accounting.formatNumber(oldINDBahtFebruary / 1000, 2));
    $('#indBahtActualOld3').html(accounting.formatNumber(oldINDBahtMarch / 1000, 2));
    $('#indBahtActualOld4').html(accounting.formatNumber(oldINDBahtApril / 1000, 2));
    $('#indBahtActualOld5').html(accounting.formatNumber(oldINDBahtMay / 1000, 2));
    $('#indBahtActualOld6').html(accounting.formatNumber(oldINDBahtJune / 1000, 2));
    $('#indBahtActualOld7').html(accounting.formatNumber(oldINDBahtJuly / 1000, 2));
    $('#indBahtActualOld8').html(accounting.formatNumber(oldINDBahtAugust / 1000, 2));
    $('#indBahtActualOld9').html(accounting.formatNumber(oldINDBahtSeptember / 1000, 2));
    $('#indBahtActualOld10').html(accounting.formatNumber(oldINDBahtOctober / 1000, 2));
    $('#indBahtActualOld11').html(accounting.formatNumber(oldINDBahtNovember / 1000, 2));
    $('#indBahtActualOld12').html(accounting.formatNumber(oldINDBahtDecember / 1000, 2));
    $('#indBahtActualOldTotal').html(accounting.formatNumber(oldINDTotalBaht / 1000, 2));

    $('#indUnitSPD1').html(accounting.formatNumber(currINDSPDUnitJanuary));
    $('#indUnitSPD2').html(accounting.formatNumber(currINDSPDUnitFebruary));
    $('#indUnitSPD3').html(accounting.formatNumber(currINDSPDUnitMarch));
    $('#indUnitSPD4').html(accounting.formatNumber(currINDSPDUnitApril));
    $('#indUnitSPD5').html(accounting.formatNumber(currINDSPDUnitMay));
    $('#indUnitSPD6').html(accounting.formatNumber(currINDSPDUnitJune));
    $('#indUnitSPD7').html(accounting.formatNumber(currINDSPDUnitJuly));
    $('#indUnitSPD8').html(accounting.formatNumber(currINDSPDUnitAugust));
    $('#indUnitSPD9').html(accounting.formatNumber(currINDSPDUnitSeptember));
    $('#indUnitSPD10').html(accounting.formatNumber(currINDSPDUnitOctober));
    $('#indUnitSPD11').html(accounting.formatNumber(currINDSPDUnitNovember));
    $('#indUnitSPD12').html(accounting.formatNumber(currINDSPDUnitDecember));
    $('#indUnitSPDTotal').html(accounting.formatNumber(currSPDINDTotalUnit));

    $('#indUnit1').html(accounting.formatNumber(currINDUnitJanuary));
    $('#indUnit2').html(accounting.formatNumber(currINDUnitFebruary));
    $('#indUnit3').html(accounting.formatNumber(currINDUnitMarch));
    $('#indUnit4').html(accounting.formatNumber(currINDUnitApril));
    $('#indUnit5').html(accounting.formatNumber(currINDUnitMay));
    $('#indUnit6').html(accounting.formatNumber(currINDUnitJune));
    $('#indUnit7').html(accounting.formatNumber(currINDUnitJuly));
    $('#indUnit8').html(accounting.formatNumber(currINDUnitAugust));
    $('#indUnit9').html(accounting.formatNumber(currINDUnitSeptember));
    $('#indUnit10').html(accounting.formatNumber(currINDUnitOctober));
    $('#indUnit11').html(accounting.formatNumber(currINDUnitNovember));
    $('#indUnit12').html(accounting.formatNumber(currINDUnitDecember));
    $('#indUnitTotal').html(accounting.formatNumber(currINDTotalUnit));

    $('#indUnitActualOld1').html(accounting.formatNumber(oldINDUnitJanuary));
    $('#indUnitActualOld2').html(accounting.formatNumber(oldINDUnitFebruary));
    $('#indUnitActualOld3').html(accounting.formatNumber(oldINDUnitMarch));
    $('#indUnitActualOld4').html(accounting.formatNumber(oldINDUnitApril));
    $('#indUnitActualOld5').html(accounting.formatNumber(oldINDUnitMay));
    $('#indUnitActualOld6').html(accounting.formatNumber(oldINDUnitJune));
    $('#indUnitActualOld7').html(accounting.formatNumber(oldINDUnitJuly));
    $('#indUnitActualOld8').html(accounting.formatNumber(oldINDUnitAugust));
    $('#indUnitActualOld9').html(accounting.formatNumber(oldINDUnitSeptember));
    $('#indUnitActualOld10').html(accounting.formatNumber(oldINDUnitOctober));
    $('#indUnitActualOld11').html(accounting.formatNumber(oldINDUnitNovember));
    $('#indUnitActualOld12').html(accounting.formatNumber(oldINDUnitDecember));
    $('#indUnitActualOldTotal').html(accounting.formatNumber(oldINDTotalUnit));

    $('#othBahtSPD1').html(accounting.formatNumber(currOTHSPDBahtJanuary / 1000, 2));
    $('#othBahtSPD2').html(accounting.formatNumber(currOTHSPDBahtFebruary / 1000, 2));
    $('#othBahtSPD3').html(accounting.formatNumber(currOTHSPDBahtMarch / 1000, 2));
    $('#othBahtSPD4').html(accounting.formatNumber(currOTHSPDBahtApril / 1000, 2));
    $('#othBahtSPD5').html(accounting.formatNumber(currOTHSPDBahtMay / 1000, 2));
    $('#othBahtSPD6').html(accounting.formatNumber(currOTHSPDBahtJune / 1000, 2));
    $('#othBahtSPD7').html(accounting.formatNumber(currOTHSPDBahtJuly / 1000, 2));
    $('#othBahtSPD8').html(accounting.formatNumber(currOTHSPDBahtAugust / 1000, 2));
    $('#othBahtSPD9').html(accounting.formatNumber(currOTHSPDBahtSeptember / 1000, 2));
    $('#othBahtSPD10').html(accounting.formatNumber(currOTHSPDBahtOctober / 1000, 2));
    $('#othBahtSPD11').html(accounting.formatNumber(currOTHSPDBahtNovember / 1000, 2));
    $('#othBahtSPD12').html(accounting.formatNumber(currOTHSPDBahtDecember / 1000, 2));
    $('#othBahtSPDTotal').html(accounting.formatNumber(currSPDOTHTotalBaht / 1000, 2));

    $('#othBaht1').html(accounting.formatNumber(currOTHBahtJanuary / 1000, 2));
    $('#othBaht2').html(accounting.formatNumber(currOTHBahtFebruary / 1000, 2));
    $('#othBaht3').html(accounting.formatNumber(currOTHBahtMarch / 1000, 2));
    $('#othBaht4').html(accounting.formatNumber(currOTHBahtApril / 1000, 2));
    $('#othBaht5').html(accounting.formatNumber(currOTHBahtMay / 1000, 2));
    $('#othBaht6').html(accounting.formatNumber(currOTHBahtJune / 1000, 2));
    $('#othBaht7').html(accounting.formatNumber(currOTHBahtJuly / 1000, 2));
    $('#othBaht8').html(accounting.formatNumber(currOTHBahtAugust / 1000, 2));
    $('#othBaht9').html(accounting.formatNumber(currOTHBahtSeptember / 1000, 2));
    $('#othBaht10').html(accounting.formatNumber(currOTHBahtOctober / 1000, 2));
    $('#othBaht11').html(accounting.formatNumber(currOTHBahtNovember / 1000, 2));
    $('#othBaht12').html(accounting.formatNumber(currOTHBahtDecember / 1000, 2));
    $('#othBahtTotal').html(accounting.formatNumber(currOTHTotalBaht / 1000, 2));

    $('#othBahtActualOld1').html(accounting.formatNumber(oldOTHBahtJanuary / 1000, 2));
    $('#othBahtActualOld2').html(accounting.formatNumber(oldOTHBahtFebruary / 1000, 2));
    $('#othBahtActualOld3').html(accounting.formatNumber(oldOTHBahtMarch / 1000, 2));
    $('#othBahtActualOld4').html(accounting.formatNumber(oldOTHBahtApril / 1000, 2));
    $('#othBahtActualOld5').html(accounting.formatNumber(oldOTHBahtMay / 1000, 2));
    $('#othBahtActualOld6').html(accounting.formatNumber(oldOTHBahtJune / 1000, 2));
    $('#othBahtActualOld7').html(accounting.formatNumber(oldOTHBahtJuly / 1000, 2));
    $('#othBahtActualOld8').html(accounting.formatNumber(oldOTHBahtAugust / 1000, 2));
    $('#othBahtActualOld9').html(accounting.formatNumber(oldOTHBahtSeptember / 1000, 2));
    $('#othBahtActualOld10').html(accounting.formatNumber(oldOTHBahtOctober / 1000, 2));
    $('#othBahtActualOld11').html(accounting.formatNumber(oldOTHBahtNovember / 1000, 2));
    $('#othBahtActualOld12').html(accounting.formatNumber(oldOTHBahtDecember / 1000, 2));
    $('#othBahtActualOldTotal').html(accounting.formatNumber(oldOTHTotalBaht / 1000, 2));

    $('#othUnitSPD1').html(accounting.formatNumber(currOTHSPDUnitJanuary));
    $('#othUnitSPD2').html(accounting.formatNumber(currOTHSPDUnitFebruary));
    $('#othUnitSPD3').html(accounting.formatNumber(currOTHSPDUnitMarch));
    $('#othUnitSPD4').html(accounting.formatNumber(currOTHSPDUnitApril));
    $('#othUnitSPD5').html(accounting.formatNumber(currOTHSPDUnitMay));
    $('#othUnitSPD6').html(accounting.formatNumber(currOTHSPDUnitJune));
    $('#othUnitSPD7').html(accounting.formatNumber(currOTHSPDUnitJuly));
    $('#othUnitSPD8').html(accounting.formatNumber(currOTHSPDUnitAugust));
    $('#othUnitSPD9').html(accounting.formatNumber(currOTHSPDUnitSeptember));
    $('#othUnitSPD10').html(accounting.formatNumber(currOTHSPDUnitOctober));
    $('#othUnitSPD11').html(accounting.formatNumber(currOTHSPDUnitNovember));
    $('#othUnitSPD12').html(accounting.formatNumber(currOTHSPDUnitDecember));
    $('#othUnitSPDTotal').html(accounting.formatNumber(currSPDOTHTotalUnit));

    $('#othUnit1').html(accounting.formatNumber(currOTHUnitJanuary));
    $('#othUnit2').html(accounting.formatNumber(currOTHUnitFebruary));
    $('#othUnit3').html(accounting.formatNumber(currOTHUnitMarch));
    $('#othUnit4').html(accounting.formatNumber(currOTHUnitApril));
    $('#othUnit5').html(accounting.formatNumber(currOTHUnitMay));
    $('#othUnit6').html(accounting.formatNumber(currOTHUnitJune));
    $('#othUnit7').html(accounting.formatNumber(currOTHUnitJuly));
    $('#othUnit8').html(accounting.formatNumber(currOTHUnitAugust));
    $('#othUnit9').html(accounting.formatNumber(currOTHUnitSeptember));
    $('#othUnit10').html(accounting.formatNumber(currOTHUnitOctober));
    $('#othUnit11').html(accounting.formatNumber(currOTHUnitNovember));
    $('#othUnit12').html(accounting.formatNumber(currOTHUnitDecember));
    $('#othUnitTotal').html(accounting.formatNumber(currOTHTotalUnit));

    $('#othUnitActualOld1').html(accounting.formatNumber(oldOTHUnitJanuary));
    $('#othUnitActualOld2').html(accounting.formatNumber(oldOTHUnitFebruary));
    $('#othUnitActualOld3').html(accounting.formatNumber(oldOTHUnitMarch));
    $('#othUnitActualOld4').html(accounting.formatNumber(oldOTHUnitApril));
    $('#othUnitActualOld5').html(accounting.formatNumber(oldOTHUnitMay));
    $('#othUnitActualOld6').html(accounting.formatNumber(oldOTHUnitJune));
    $('#othUnitActualOld7').html(accounting.formatNumber(oldOTHUnitJuly));
    $('#othUnitActualOld8').html(accounting.formatNumber(oldOTHUnitAugust));
    $('#othUnitActualOld9').html(accounting.formatNumber(oldOTHUnitSeptember));
    $('#othUnitActualOld10').html(accounting.formatNumber(oldOTHUnitOctober));
    $('#othUnitActualOld11').html(accounting.formatNumber(oldOTHUnitNovember));
    $('#othUnitActualOld12').html(accounting.formatNumber(oldOTHUnitDecember));
    $('#othUnitActualOldTotal').html(accounting.formatNumber(oldOTHTotalUnit));

    var totalBahtTarget = totalOEMBahtTarget + totalOEXBahtTarget + totalEXPBahtTarget + totalSPDBahtTarget;
    $('#targetBaht').html(accounting.formatNumber(totalBahtTarget));
    var totalUnitTarget = totalOEMUnitTarget + totalOEXUnitTarget + totalEXPUnitTarget + totalSPDUnitTarget;
    $('#targetUnit').html(accounting.formatNumber(totalUnitTarget));

    $('#totalBaht').text(accounting.formatNumber(currTotalBaht));
    $('#totalUnit').text(accounting.formatNumber(currTotalUnit));
    var percenTotalBaht = (currTotalBaht / totalBahtTarget) * 100;
    var percenTotalUnit = (currTotalUnit / totalUnitTarget) * 100;
    $('#graphBaht').attr("data-transitiongoal", accounting.formatNumber(percenTotalBaht)).progressbar();
    $('#graphUnit').attr("data-transitiongoal", accounting.formatNumber(percenTotalUnit)).progressbar();

    tableProduct(type = "OEM", topOEMProduct);
    tableProduct(type = "OEX", topOEXProduct);
    tableProduct(type = "EXP", topEXPProduct);
    tableProduct(type = "SPD", topSPDProduct);
    tableCustomer(type = "OEM", topOEMCustomer);
    tableCustomer(type = "OEX", topOEXCustomer);
    tableCustomer(type = "EXP", topEXPCustomer);
    tableCustomer(type = "SPD", topSPDCustomer);

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
        achieveBahtJanuary = (currBahtJanuary * 100) / (targetOEMAmt01 + targetOEXAmt01 + targetEXPAmt01 + targetSPDAmt01),
        achieveBahtFebruary = (currBahtFebruary * 100) / (targetOEMAmt02 + targetOEXAmt02 + targetEXPAmt02 + targetSPDAmt02),
        achieveBahtMarch = (currBahtMarch * 100) / (targetOEMAmt03 + targetOEXAmt03 + targetEXPAmt03 + targetSPDAmt03),
        achieveBahtApril = (currBahtApril * 100) / (targetOEMAmt04 + targetOEXAmt04 + targetEXPAmt04 + targetSPDAmt04),
        achieveBahtMay = (currBahtMay * 100) / (targetOEMAmt05 + targetOEXAmt05 + targetEXPAmt05 + targetSPDAmt05),
        achieveBahtJune = (currBahtJune * 100) / (targetOEMAmt06 + targetOEXAmt06 + targetEXPAmt06 + targetSPDAmt06),
        achieveBahtJuly = (currBahtJuly * 100) / (targetOEMAmt07 + targetOEXAmt07 + targetEXPAmt07 + targetSPDAmt07),
        achieveBahtAugust = (currBahtAugust * 100) / (targetOEMAmt08 + targetOEXAmt08 + targetEXPAmt08 + targetSPDAmt08),
        achieveBahtSeptember = (currBahtSeptember * 100) / (targetOEMAmt09 + targetOEXAmt09 + targetEXPAmt09 + targetSPDAmt09),
        achieveBahtOctober = (currBahtOctober * 100) / (targetOEMAmt10 + targetOEXAmt10 + targetEXPAmt10 + targetSPDAmt10),
        achieveBahtNovember = (currBahtNovember * 100) / (targetOEMAmt11 + targetOEXAmt11 + targetEXPAmt11 + targetSPDAmt11),
        achieveBahtDecember = (currBahtDecember * 100) / (targetOEMAmt12 + targetOEXAmt12 + targetEXPAmt12 + targetSPDAmt12),
        achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget,
        achieveUnitJanuary = (currUnitJanuary * 100) / (targetOEMUnit01 + targetOEXUnit01 + targetEXPUnit01 + targetSPDUnit01),
        achieveUnitFebruary = (currUnitFebruary * 100) / (targetOEMUnit02 + targetOEXUnit02 + targetEXPUnit02 + targetSPDUnit02),
        achieveUnitMarch = (currUnitMarch * 100) / (targetOEMUnit03 + targetOEXUnit03 + targetEXPUnit03 + targetSPDUnit03),
        achieveUnitApril = (currUnitApril * 100) / (targetOEMUnit04 + targetOEXUnit04 + targetEXPUnit04 + targetSPDUnit04),
        achieveUnitMay = (currUnitMay * 100) / (targetOEMUnit05 + targetOEXUnit05 + targetEXPUnit05 + targetSPDUnit05),
        achieveUnitJune = (currUnitJune * 100) / (targetOEMUnit06 + targetOEXUnit06 + targetEXPUnit06 + targetSPDUnit06),
        achieveUnitJuly = (currUnitJuly * 100) / (targetOEMUnit07 + targetOEXUnit07 + targetEXPUnit07 + targetSPDUnit07),
        achieveUnitAugust = (currUnitAugust * 100) / (targetOEMUnit08 + targetOEXUnit08 + targetEXPUnit08 + targetSPDUnit08),
        achieveUnitSeptember = (currUnitSeptember * 100) / (targetOEMUnit09 + targetOEXUnit09 + targetEXPUnit09 + targetSPDUnit09),
        achieveUnitOctober = (currUnitOctober * 100) / (targetOEMUnit10 + targetOEXUnit10 + targetEXPUnit10 + targetSPDUnit10),
        achieveUnitNovember = (currUnitNovember * 100) / (targetOEMUnit11 + targetOEXUnit11 + targetEXPUnit11 + targetSPDUnit11),
        achieveUnitDecember = (currUnitDecember * 100) / (targetOEMUnit12 + targetOEXUnit12 + targetEXPUnit12 + targetSPDUnit12),
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

        achieveEBBahtJanuary = (currEBBahtJanuary * 100) / targetEBBahtJanuary,
        achieveEBBahtFebruary = (currEBBahtFebruary * 100) / targetEBBahtFebruary,
        achieveEBBahtMarch = (currEBBahtMarch * 100) / targetEBBahtMarch,
        achieveEBBahtApril = (currEBBahtApril * 100) / targetEBBahtApril,
        achieveEBBahtMay = (currEBBahtMay * 100) / targetEBBahtMay,
        achieveEBBahtJune = (currEBBahtJune * 100) / targetEBBahtJune,
        achieveEBBahtJuly = (currEBBahtJuly * 100) / targetEBBahtJuly,
        achieveEBBahtAugust = (currEBBahtAugust * 100) / targetEBBahtAugust,
        achieveEBBahtSeptember = (currEBBahtSeptember * 100) / targetEBBahtSeptember,
        achieveEBBahtOctober = (currEBBahtOctober * 100) / targetEBBahtOctober,
        achieveEBBahtNovember = (currEBBahtNovember * 100) / targetEBBahtNovember,
        achieveEBBahtDecember = (currEBBahtDecember * 100) / targetEBBahtDecember,
        achieveEBBahtTotal = (currEBTotalBaht * 100) / targetEBBahtTotal,
        achieveEBUnitJanuary = (currEBUnitJanuary * 100) / targetEBUnitJanuary,
        achieveEBUnitFebruary = (currEBUnitFebruary * 100) / targetEBUnitFebruary,
        achieveEBUnitMarch = (currEBUnitMarch * 100) / targetEBUnitMarch,
        achieveEBUnitApril = (currEBUnitApril * 100) / targetEBUnitApril,
        achieveEBUnitMay = (currEBUnitMay * 100) / targetEBUnitMay,
        achieveEBUnitJune = (currEBUnitJune * 100) / targetEBUnitJune,
        achieveEBUnitJuly = (currEBUnitJuly * 100) / targetEBUnitJuly,
        achieveEBUnitAugust = (currEBUnitAugust * 100) / targetEBUnitAugust,
        achieveEBUnitSeptember = (currEBUnitSeptember * 100) / targetEBUnitSeptember,
        achieveEBUnitOctober = (currEBUnitOctober * 100) / targetEBUnitOctober,
        achieveEBUnitNovember = (currEBUnitNovember * 100) / targetEBUnitNovember,
        achieveEBUnitDecember = (currEBUnitDecember * 100) / targetEBUnitDecember,
        achieveEBUnitTotal = (currEBTotalUnit * 100) / targetEBUnitTotal,

        achieveNPBahtJanuary = (currNPBahtJanuary * 100) / targetNPBahtJanuary,
        achieveNPBahtFebruary = (currNPBahtFebruary * 100) / targetNPBahtFebruary,
        achieveNPBahtMarch = (currNPBahtMarch * 100) / targetNPBahtMarch,
        achieveNPBahtApril = (currNPBahtApril * 100) / targetNPBahtApril,
        achieveNPBahtMay = (currNPBahtMay * 100) / targetNPBahtMay,
        achieveNPBahtJune = (currNPBahtJune * 100) / targetNPBahtJune,
        achieveNPBahtJuly = (currNPBahtJuly * 100) / targetNPBahtJuly,
        achieveNPBahtAugust = (currNPBahtAugust * 100) / targetNPBahtAugust,
        achieveNPBahtSeptember = (currNPBahtSeptember * 100) / targetNPBahtSeptember,
        achieveNPBahtOctober = (currNPBahtOctober * 100) / targetNPBahtOctober,
        achieveNPBahtNovember = (currNPBahtNovember * 100) / targetNPBahtNovember,
        achieveNPBahtDecember = (currNPBahtDecember * 100) / targetNPBahtDecember,
        achieveNPBahtTotal = (currNPTotalBaht * 100) / targetNPBahtTotal,
        achieveNPUnitJanuary = (currNPUnitJanuary * 100) / targetNPUnitJanuary,
        achieveNPUnitFebruary = (currNPUnitFebruary * 100) / targetNPUnitFebruary,
        achieveNPUnitMarch = (currNPUnitMarch * 100) / targetNPUnitMarch,
        achieveNPUnitApril = (currNPUnitApril * 100) / targetNPUnitApril,
        achieveNPUnitMay = (currNPUnitMay * 100) / targetNPUnitMay,
        achieveNPUnitJune = (currNPUnitJune * 100) / targetNPUnitJune,
        achieveNPUnitJuly = (currNPUnitJuly * 100) / targetNPUnitJuly,
        achieveNPUnitAugust = (currNPUnitAugust * 100) / targetNPUnitAugust,
        achieveNPUnitSeptember = (currNPUnitSeptember * 100) / targetNPUnitSeptember,
        achieveNPUnitOctober = (currNPUnitOctober * 100) / targetNPUnitOctober,
        achieveNPUnitNovember = (currNPUnitNovember * 100) / targetNPUnitNovember,
        achieveNPUnitDecember = (currNPUnitDecember * 100) / targetNPUnitDecember,
        achieveNPUnitTotal = (currNPTotalUnit * 100) / targetNPUnitTotal,

        achieveINDBahtJanuary = (currINDBahtJanuary * 100) / targetINDBahtJanuary,
        achieveINDBahtFebruary = (currINDBahtFebruary * 100) / targetINDBahtFebruary,
        achieveINDBahtMarch = (currINDBahtMarch * 100) / targetINDBahtMarch,
        achieveINDBahtApril = (currINDBahtApril * 100) / targetINDBahtApril,
        achieveINDBahtMay = (currINDBahtMay * 100) / targetINDBahtMay,
        achieveINDBahtJune = (currINDBahtJune * 100) / targetINDBahtJune,
        achieveINDBahtJuly = (currINDBahtJuly * 100) / targetINDBahtJuly,
        achieveINDBahtAugust = (currINDBahtAugust * 100) / targetINDBahtAugust,
        achieveINDBahtSeptember = (currINDBahtSeptember * 100) / targetINDBahtSeptember,
        achieveINDBahtOctober = (currINDBahtOctober * 100) / targetINDBahtOctober,
        achieveINDBahtNovember = (currINDBahtNovember * 100) / targetINDBahtNovember,
        achieveINDBahtDecember = (currINDBahtDecember * 100) / targetINDBahtDecember,
        achieveINDBahtTotal = (currINDTotalBaht * 100) / targetINDBahtTotal,
        achieveINDUnitJanuary = (currINDUnitJanuary * 100) / targetINDUnitJanuary,
        achieveINDUnitFebruary = (currINDUnitFebruary * 100) / targetINDUnitFebruary,
        achieveINDUnitMarch = (currINDUnitMarch * 100) / targetINDUnitMarch,
        achieveINDUnitApril = (currINDUnitApril * 100) / targetINDUnitApril,
        achieveINDUnitMay = (currINDUnitMay * 100) / targetINDUnitMay,
        achieveINDUnitJune = (currINDUnitJune * 100) / targetINDUnitJune,
        achieveINDUnitJuly = (currINDUnitJuly * 100) / targetINDUnitJuly,
        achieveINDUnitAugust = (currINDUnitAugust * 100) / targetINDUnitAugust,
        achieveINDUnitSeptember = (currINDUnitSeptember * 100) / targetINDUnitSeptember,
        achieveINDUnitOctober = (currINDUnitOctober * 100) / targetINDUnitOctober,
        achieveINDUnitNovember = (currINDUnitNovember * 100) / targetINDUnitNovember,
        achieveINDUnitDecember = (currINDUnitDecember * 100) / targetINDUnitDecember,
        achieveINDUnitTotal = (currINDTotalUnit * 100) / targetINDUnitTotal,

        achieveOTHBahtJanuary = (currOTHBahtJanuary * 100) / targetOTHBahtJanuary,
        achieveOTHBahtFebruary = (currOTHBahtFebruary * 100) / targetOTHBahtFebruary,
        achieveOTHBahtMarch = (currOTHBahtMarch * 100) / targetOTHBahtMarch,
        achieveOTHBahtApril = (currOTHBahtApril * 100) / targetOTHBahtApril,
        achieveOTHBahtMay = (currOTHBahtMay * 100) / targetOTHBahtMay,
        achieveOTHBahtJune = (currOTHBahtJune * 100) / targetOTHBahtJune,
        achieveOTHBahtJuly = (currOTHBahtJuly * 100) / targetOTHBahtJuly,
        achieveOTHBahtAugust = (currOTHBahtAugust * 100) / targetOTHBahtAugust,
        achieveOTHBahtSeptember = (currOTHBahtSeptember * 100) / targetOTHBahtSeptember,
        achieveOTHBahtOctober = (currOTHBahtOctober * 100) / targetOTHBahtOctober,
        achieveOTHBahtNovember = (currOTHBahtNovember * 100) / targetOTHBahtNovember,
        achieveOTHBahtDecember = (currOTHBahtDecember * 100) / targetOTHBahtDecember,
        achieveOTHBahtTotal = (currOTHTotalBaht * 100) / targetOTHBahtTotal,
        achieveOTHUnitJanuary = (currOTHUnitJanuary * 100) / targetOTHUnitJanuary,
        achieveOTHUnitFebruary = (currOTHUnitFebruary * 100) / targetOTHUnitFebruary,
        achieveOTHUnitMarch = (currOTHUnitMarch * 100) / targetOTHUnitMarch,
        achieveOTHUnitApril = (currOTHUnitApril * 100) / targetOTHUnitApril,
        achieveOTHUnitMay = (currOTHUnitMay * 100) / targetOTHUnitMay,
        achieveOTHUnitJune = (currOTHUnitJune * 100) / targetOTHUnitJune,
        achieveOTHUnitJuly = (currOTHUnitJuly * 100) / targetOTHUnitJuly,
        achieveOTHUnitAugust = (currOTHUnitAugust * 100) / targetOTHUnitAugust,
        achieveOTHUnitSeptember = (currOTHUnitSeptember * 100) / targetOTHUnitSeptember,
        achieveOTHUnitOctober = (currOTHUnitOctober * 100) / targetOTHUnitOctober,
        achieveOTHUnitNovember = (currOTHUnitNovember * 100) / targetOTHUnitNovember,
        achieveOTHUnitDecember = (currOTHUnitDecember * 100) / targetOTHUnitDecember,
        achieveOTHUnitTotal = (currOTHTotalUnit * 100) / targetOTHUnitTotal,

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
        growthAMBUnitTotal = ((currAMBTotalUnit - oldAMBTotalUnit) * 100) / oldAMBTotalUnit,

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
        growthMCBUnitTotal = ((currMCBTotalUnit - oldMCBTotalUnit) * 100) / oldMCBTotalUnit,

        growthEBBahtJanuary = ((currEBBahtJanuary - oldEBBahtJanuary) * 100) / oldEBBahtJanuary,
        growthEBBahtFebruary = ((currEBBahtFebruary - oldEBBahtFebruary) * 100) / oldEBBahtFebruary,
        growthEBBahtMarch = ((currEBBahtMarch - oldEBBahtMarch) * 100) / oldEBBahtMarch,
        growthEBBahtApril = ((currEBBahtApril - oldEBBahtApril) * 100) / oldEBBahtApril,
        growthEBBahtMay = ((currEBBahtMay - oldEBBahtMay) * 100) / oldEBBahtMay,
        growthEBBahtJune = ((currEBBahtJune - oldEBBahtJune) * 100) / oldEBBahtJune,
        growthEBBahtJuly = ((currEBBahtJuly - oldEBBahtJuly) * 100) / oldEBBahtJuly,
        growthEBBahtAugust = ((currEBBahtAugust - oldEBBahtAugust) * 100) / oldEBBahtAugust,
        growthEBBahtSeptember = ((currEBBahtSeptember - oldEBBahtSeptember) * 100) / oldEBBahtSeptember,
        growthEBBahtOctober = ((currEBBahtOctober - oldEBBahtOctober) * 100) / oldEBBahtOctober,
        growthEBBahtNovember = ((currEBBahtNovember - oldEBBahtNovember) * 100) / oldEBBahtNovember,
        growthEBBahtDecember = ((currEBBahtDecember - oldEBBahtDecember) * 100) / oldEBBahtDecember,
        growthEBBahtTotal = ((currEBTotalBaht - oldEBTotalBaht) * 100) / oldEBTotalBaht,
        growthEBUnitJanuary = ((currEBUnitJanuary - oldEBUnitJanuary) * 100) / oldEBUnitJanuary,
        growthEBUnitFebruary = ((currEBUnitFebruary - oldEBUnitFebruary) * 100) / oldEBUnitFebruary,
        growthEBUnitMarch = ((currEBUnitMarch - oldEBUnitMarch) * 100) / oldEBUnitMarch,
        growthEBUnitApril = ((currEBUnitApril - oldEBUnitApril) * 100) / oldEBUnitApril,
        growthEBUnitMay = ((currEBUnitMay - oldEBUnitMay) * 100) / oldEBUnitMay,
        growthEBUnitJune = ((currEBUnitJune - oldEBUnitJune) * 100) / oldEBUnitJune,
        growthEBUnitJuly = ((currEBUnitJuly - oldEBUnitJuly) * 100) / oldEBUnitJuly,
        growthEBUnitAugust = ((currEBUnitAugust - oldEBUnitAugust) * 100) / oldEBUnitAugust,
        growthEBUnitSeptember = ((currEBUnitSeptember - oldEBUnitSeptember) * 100) / oldEBUnitSeptember,
        growthEBUnitOctober = ((currEBUnitOctober - oldEBUnitOctober) * 100) / oldEBUnitOctober,
        growthEBUnitNovember = ((currEBUnitNovember - oldEBUnitNovember) * 100) / oldEBUnitNovember,
        growthEBUnitDecember = ((currEBUnitDecember - oldEBUnitDecember) * 100) / oldEBUnitDecember,
        growthEBUnitTotal = ((currEBTotalUnit - oldEBTotalUnit) * 100) / oldEBTotalUnit,

        growthNPBahtJanuary = ((currNPBahtJanuary - oldNPBahtJanuary) * 100) / oldNPBahtJanuary,
        growthNPBahtFebruary = ((currNPBahtFebruary - oldNPBahtFebruary) * 100) / oldNPBahtFebruary,
        growthNPBahtMarch = ((currNPBahtMarch - oldNPBahtMarch) * 100) / oldNPBahtMarch,
        growthNPBahtApril = ((currNPBahtApril - oldNPBahtApril) * 100) / oldNPBahtApril,
        growthNPBahtMay = ((currNPBahtMay - oldNPBahtMay) * 100) / oldNPBahtMay,
        growthNPBahtJune = ((currNPBahtJune - oldNPBahtJune) * 100) / oldNPBahtJune,
        growthNPBahtJuly = ((currNPBahtJuly - oldNPBahtJuly) * 100) / oldNPBahtJuly,
        growthNPBahtAugust = ((currNPBahtAugust - oldNPBahtAugust) * 100) / oldNPBahtAugust,
        growthNPBahtSeptember = ((currNPBahtSeptember - oldNPBahtSeptember) * 100) / oldNPBahtSeptember,
        growthNPBahtOctober = ((currNPBahtOctober - oldNPBahtOctober) * 100) / oldNPBahtOctober,
        growthNPBahtNovember = ((currNPBahtNovember - oldNPBahtNovember) * 100) / oldNPBahtNovember,
        growthNPBahtDecember = ((currNPBahtDecember - oldNPBahtDecember) * 100) / oldNPBahtDecember,
        growthNPBahtTotal = ((currNPTotalBaht - oldNPTotalBaht) * 100) / oldNPTotalBaht,
        growthNPUnitJanuary = ((currNPUnitJanuary - oldNPUnitJanuary) * 100) / oldNPUnitJanuary,
        growthNPUnitFebruary = ((currNPUnitFebruary - oldNPUnitFebruary) * 100) / oldNPUnitFebruary,
        growthNPUnitMarch = ((currNPUnitMarch - oldNPUnitMarch) * 100) / oldNPUnitMarch,
        growthNPUnitApril = ((currNPUnitApril - oldNPUnitApril) * 100) / oldNPUnitApril,
        growthNPUnitMay = ((currNPUnitMay - oldNPUnitMay) * 100) / oldNPUnitMay,
        growthNPUnitJune = ((currNPUnitJune - oldNPUnitJune) * 100) / oldNPUnitJune,
        growthNPUnitJuly = ((currNPUnitJuly - oldNPUnitJuly) * 100) / oldNPUnitJuly,
        growthNPUnitAugust = ((currNPUnitAugust - oldNPUnitAugust) * 100) / oldNPUnitAugust,
        growthNPUnitSeptember = ((currNPUnitSeptember - oldNPUnitSeptember) * 100) / oldNPUnitSeptember,
        growthNPUnitOctober = ((currNPUnitOctober - oldNPUnitOctober) * 100) / oldNPUnitOctober,
        growthNPUnitNovember = ((currNPUnitNovember - oldNPUnitNovember) * 100) / oldNPUnitNovember,
        growthNPUnitDecember = ((currNPUnitDecember - oldNPUnitDecember) * 100) / oldNPUnitDecember,
        growthNPUnitTotal = ((currNPTotalUnit - oldNPTotalUnit) * 100) / oldNPTotalUnit,

        growthINDBahtJanuary = ((currINDBahtJanuary - oldINDBahtJanuary) * 100) / oldINDBahtJanuary,
        growthINDBahtFebruary = ((currINDBahtFebruary - oldINDBahtFebruary) * 100) / oldINDBahtFebruary,
        growthINDBahtMarch = ((currINDBahtMarch - oldINDBahtMarch) * 100) / oldINDBahtMarch,
        growthINDBahtApril = ((currINDBahtApril - oldINDBahtApril) * 100) / oldINDBahtApril,
        growthINDBahtMay = ((currINDBahtMay - oldINDBahtMay) * 100) / oldINDBahtMay,
        growthINDBahtJune = ((currINDBahtJune - oldINDBahtJune) * 100) / oldINDBahtJune,
        growthINDBahtJuly = ((currINDBahtJuly - oldINDBahtJuly) * 100) / oldINDBahtJuly,
        growthINDBahtAugust = ((currINDBahtAugust - oldINDBahtAugust) * 100) / oldINDBahtAugust,
        growthINDBahtSeptember = ((currINDBahtSeptember - oldINDBahtSeptember) * 100) / oldINDBahtSeptember,
        growthINDBahtOctober = ((currINDBahtOctober - oldINDBahtOctober) * 100) / oldINDBahtOctober,
        growthINDBahtNovember = ((currINDBahtNovember - oldINDBahtNovember) * 100) / oldINDBahtNovember,
        growthINDBahtDecember = ((currINDBahtDecember - oldINDBahtDecember) * 100) / oldINDBahtDecember,
        growthINDBahtTotal = ((currINDTotalBaht - oldINDTotalBaht) * 100) / oldINDTotalBaht,
        growthINDUnitJanuary = ((currINDUnitJanuary - oldINDUnitJanuary) * 100) / oldINDUnitJanuary,
        growthINDUnitFebruary = ((currINDUnitFebruary - oldINDUnitFebruary) * 100) / oldINDUnitFebruary,
        growthINDUnitMarch = ((currINDUnitMarch - oldINDUnitMarch) * 100) / oldINDUnitMarch,
        growthINDUnitApril = ((currINDUnitApril - oldINDUnitApril) * 100) / oldINDUnitApril,
        growthINDUnitMay = ((currINDUnitMay - oldINDUnitMay) * 100) / oldINDUnitMay,
        growthINDUnitJune = ((currINDUnitJune - oldINDUnitJune) * 100) / oldINDUnitJune,
        growthINDUnitJuly = ((currINDUnitJuly - oldINDUnitJuly) * 100) / oldINDUnitJuly,
        growthINDUnitAugust = ((currINDUnitAugust - oldINDUnitAugust) * 100) / oldINDUnitAugust,
        growthINDUnitSeptember = ((currINDUnitSeptember - oldINDUnitSeptember) * 100) / oldINDUnitSeptember,
        growthINDUnitOctober = ((currINDUnitOctober - oldINDUnitOctober) * 100) / oldINDUnitOctober,
        growthINDUnitNovember = ((currINDUnitNovember - oldINDUnitNovember) * 100) / oldINDUnitNovember,
        growthINDUnitDecember = ((currINDUnitDecember - oldINDUnitDecember) * 100) / oldINDUnitDecember,
        growthINDUnitTotal = ((currINDTotalUnit - oldINDTotalUnit) * 100) / oldINDTotalUnit,

        growthOTHBahtJanuary = ((currOTHBahtJanuary - oldOTHBahtJanuary) * 100) / oldOTHBahtJanuary,
        growthOTHBahtFebruary = ((currOTHBahtFebruary - oldOTHBahtFebruary) * 100) / oldOTHBahtFebruary,
        growthOTHBahtMarch = ((currOTHBahtMarch - oldOTHBahtMarch) * 100) / oldOTHBahtMarch,
        growthOTHBahtApril = ((currOTHBahtApril - oldOTHBahtApril) * 100) / oldOTHBahtApril,
        growthOTHBahtMay = ((currOTHBahtMay - oldOTHBahtMay) * 100) / oldOTHBahtMay,
        growthOTHBahtJune = ((currOTHBahtJune - oldOTHBahtJune) * 100) / oldOTHBahtJune,
        growthOTHBahtJuly = ((currOTHBahtJuly - oldOTHBahtJuly) * 100) / oldOTHBahtJuly,
        growthOTHBahtAugust = ((currOTHBahtAugust - oldOTHBahtAugust) * 100) / oldOTHBahtAugust,
        growthOTHBahtSeptember = ((currOTHBahtSeptember - oldOTHBahtSeptember) * 100) / oldOTHBahtSeptember,
        growthOTHBahtOctober = ((currOTHBahtOctober - oldOTHBahtOctober) * 100) / oldOTHBahtOctober,
        growthOTHBahtNovember = ((currOTHBahtNovember - oldOTHBahtNovember) * 100) / oldOTHBahtNovember,
        growthOTHBahtDecember = ((currOTHBahtDecember - oldOTHBahtDecember) * 100) / oldOTHBahtDecember,
        growthOTHBahtTotal = ((currOTHTotalBaht - oldOTHTotalBaht) * 100) / oldOTHTotalBaht,
        growthOTHUnitJanuary = ((currOTHUnitJanuary - oldOTHUnitJanuary) * 100) / oldOTHUnitJanuary,
        growthOTHUnitFebruary = ((currOTHUnitFebruary - oldOTHUnitFebruary) * 100) / oldOTHUnitFebruary,
        growthOTHUnitMarch = ((currOTHUnitMarch - oldOTHUnitMarch) * 100) / oldOTHUnitMarch,
        growthOTHUnitApril = ((currOTHUnitApril - oldOTHUnitApril) * 100) / oldOTHUnitApril,
        growthOTHUnitMay = ((currOTHUnitMay - oldOTHUnitMay) * 100) / oldOTHUnitMay,
        growthOTHUnitJune = ((currOTHUnitJune - oldOTHUnitJune) * 100) / oldOTHUnitJune,
        growthOTHUnitJuly = ((currOTHUnitJuly - oldOTHUnitJuly) * 100) / oldOTHUnitJuly,
        growthOTHUnitAugust = ((currOTHUnitAugust - oldOTHUnitAugust) * 100) / oldOTHUnitAugust,
        growthOTHUnitSeptember = ((currOTHUnitSeptember - oldOTHUnitSeptember) * 100) / oldOTHUnitSeptember,
        growthOTHUnitOctober = ((currOTHUnitOctober - oldOTHUnitOctober) * 100) / oldOTHUnitOctober,
        growthOTHUnitNovember = ((currOTHUnitNovember - oldOTHUnitNovember) * 100) / oldOTHUnitNovember,
        growthOTHUnitDecember = ((currOTHUnitDecember - oldOTHUnitDecember) * 100) / oldOTHUnitDecember,
        growthOTHUnitTotal = ((currOTHTotalUnit - oldOTHTotalUnit) * 100) / oldOTHTotalUnit;

    $('#BahtTarget1').html(accounting.formatNumber((targetOEMAmt01 + targetOEXAmt01 + targetEXPAmt01 + targetSPDAmt01) / 1000, 2));
    $('#BahtTarget2').html(accounting.formatNumber((targetOEMAmt02 + targetOEXAmt02 + targetEXPAmt02 + targetSPDAmt02) / 1000, 2));
    $('#BahtTarget3').html(accounting.formatNumber((targetOEMAmt03 + targetOEXAmt03 + targetEXPAmt03 + targetSPDAmt03) / 1000, 2));
    $('#BahtTarget4').html(accounting.formatNumber((targetOEMAmt04 + targetOEXAmt04 + targetEXPAmt04 + targetSPDAmt04) / 1000, 2));
    $('#BahtTarget5').html(accounting.formatNumber((targetOEMAmt05 + targetOEXAmt05 + targetEXPAmt05 + targetSPDAmt05) / 1000, 2));
    $('#BahtTarget6').html(accounting.formatNumber((targetOEMAmt06 + targetOEXAmt06 + targetEXPAmt06 + targetSPDAmt06) / 1000, 2));
    $('#BahtTarget7').html(accounting.formatNumber((targetOEMAmt07 + targetOEXAmt07 + targetEXPAmt07 + targetSPDAmt07) / 1000, 2));
    $('#BahtTarget8').html(accounting.formatNumber((targetOEMAmt08 + targetOEXAmt08 + targetEXPAmt08 + targetSPDAmt08) / 1000, 2));
    $('#BahtTarget9').html(accounting.formatNumber((targetOEMAmt09 + targetOEXAmt09 + targetEXPAmt09 + targetSPDAmt09) / 1000, 2));
    $('#BahtTarget10').html(accounting.formatNumber((targetOEMAmt10 + targetOEXAmt10 + targetEXPAmt10 + targetSPDAmt10) / 1000, 2));
    $('#BahtTarget11').html(accounting.formatNumber((targetOEMAmt11 + targetOEXAmt11 + targetEXPAmt11 + targetSPDAmt11) / 1000, 2));
    $('#BahtTarget12').html(accounting.formatNumber((targetOEMAmt12 + targetOEXAmt12 + targetEXPAmt12 + targetSPDAmt12) / 1000, 2));
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

    $('#npBahtTarget1').html(accounting.formatNumber(targetNPBahtJanuary / 1000, 2));
    $('#npBahtTarget2').html(accounting.formatNumber(targetNPBahtFebruary / 1000, 2));
    $('#npBahtTarget3').html(accounting.formatNumber(targetNPBahtMarch / 1000, 2));
    $('#npBahtTarget4').html(accounting.formatNumber(targetNPBahtApril / 1000, 2));
    $('#npBahtTarget5').html(accounting.formatNumber(targetNPBahtMay / 1000, 2));
    $('#npBahtTarget6').html(accounting.formatNumber(targetNPBahtJune / 1000, 2));
    $('#npBahtTarget7').html(accounting.formatNumber(targetNPBahtJuly / 1000, 2));
    $('#npBahtTarget8').html(accounting.formatNumber(targetNPBahtAugust / 1000, 2));
    $('#npBahtTarget9').html(accounting.formatNumber(targetNPBahtSeptember / 1000, 2));
    $('#npBahtTarget10').html(accounting.formatNumber(targetNPBahtOctober / 1000, 2));
    $('#npBahtTarget11').html(accounting.formatNumber(targetNPBahtNovember / 1000, 2));
    $('#npBahtTarget12').html(accounting.formatNumber(targetNPBahtDecember / 1000, 2));
    $('#npBahtTargetTotal').html(accounting.formatNumber(targetNPBahtTotal / 1000, 2));

    $('#ebBahtTarget1').html(accounting.formatNumber(targetEBBahtJanuary / 1000, 2));
    $('#ebBahtTarget2').html(accounting.formatNumber(targetEBBahtFebruary / 1000, 2));
    $('#ebBahtTarget3').html(accounting.formatNumber(targetEBBahtMarch / 1000, 2));
    $('#ebBahtTarget4').html(accounting.formatNumber(targetEBBahtApril / 1000, 2));
    $('#ebBahtTarget5').html(accounting.formatNumber(targetEBBahtMay / 1000, 2));
    $('#ebBahtTarget6').html(accounting.formatNumber(targetEBBahtJune / 1000, 2));
    $('#ebBahtTarget7').html(accounting.formatNumber(targetEBBahtJuly / 1000, 2));
    $('#ebBahtTarget8').html(accounting.formatNumber(targetEBBahtAugust / 1000, 2));
    $('#ebBahtTarget9').html(accounting.formatNumber(targetEBBahtSeptember / 1000, 2));
    $('#ebBahtTarget10').html(accounting.formatNumber(targetEBBahtOctober / 1000, 2));
    $('#ebBahtTarget11').html(accounting.formatNumber(targetEBBahtNovember / 1000, 2));
    $('#ebBahtTarget12').html(accounting.formatNumber(targetEBBahtDecember / 1000, 2));
    $('#ebBahtTargetTotal').html(accounting.formatNumber(targetEBBahtTotal / 1000, 2));

    $('#indBahtTarget1').html(accounting.formatNumber(targetINDBahtJanuary / 1000, 2));
    $('#indBahtTarget2').html(accounting.formatNumber(targetINDBahtFebruary / 1000, 2));
    $('#indBahtTarget3').html(accounting.formatNumber(targetINDBahtMarch / 1000, 2));
    $('#indBahtTarget4').html(accounting.formatNumber(targetINDBahtApril / 1000, 2));
    $('#indBahtTarget5').html(accounting.formatNumber(targetINDBahtMay / 1000, 2));
    $('#indBahtTarget6').html(accounting.formatNumber(targetINDBahtJune / 1000, 2));
    $('#indBahtTarget7').html(accounting.formatNumber(targetINDBahtJuly / 1000, 2));
    $('#indBahtTarget8').html(accounting.formatNumber(targetINDBahtAugust / 1000, 2));
    $('#indBahtTarget9').html(accounting.formatNumber(targetINDBahtSeptember / 1000, 2));
    $('#indBahtTarget10').html(accounting.formatNumber(targetINDBahtOctober / 1000, 2));
    $('#indBahtTarget11').html(accounting.formatNumber(targetINDBahtNovember / 1000, 2));
    $('#indBahtTarget12').html(accounting.formatNumber(targetINDBahtDecember / 1000, 2));
    $('#indBahtTargetTotal').html(accounting.formatNumber(targetINDBahtTotal / 1000, 2));

    $('#othBahtTarget1').html(accounting.formatNumber(targetOTHBahtJanuary / 1000, 2));
    $('#othBahtTarget2').html(accounting.formatNumber(targetOTHBahtFebruary / 1000, 2));
    $('#othBahtTarget3').html(accounting.formatNumber(targetOTHBahtMarch / 1000, 2));
    $('#othBahtTarget4').html(accounting.formatNumber(targetOTHBahtApril / 1000, 2));
    $('#othBahtTarget5').html(accounting.formatNumber(targetOTHBahtMay / 1000, 2));
    $('#othBahtTarget6').html(accounting.formatNumber(targetOTHBahtJune / 1000, 2));
    $('#othBahtTarget7').html(accounting.formatNumber(targetOTHBahtJuly / 1000, 2));
    $('#othBahtTarget8').html(accounting.formatNumber(targetOTHBahtAugust / 1000, 2));
    $('#othBahtTarget9').html(accounting.formatNumber(targetOTHBahtSeptember / 1000, 2));
    $('#othBahtTarget10').html(accounting.formatNumber(targetOTHBahtOctober / 1000, 2));
    $('#othBahtTarget11').html(accounting.formatNumber(targetOTHBahtNovember / 1000, 2));
    $('#othBahtTarget12').html(accounting.formatNumber(targetOTHBahtDecember / 1000, 2));
    $('#othBahtTargetTotal').html(accounting.formatNumber(targetOTHBahtTotal / 1000, 2));

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

    $('#npBahtAchieve1').html((isNaN(accounting.formatNumber(achieveNPBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtJanuary, 2)) + "%");
    $('#npBahtAchieve2').html((isNaN(accounting.formatNumber(achieveNPBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtFebruary, 2)) + "%");
    $('#npBahtAchieve3').html((isNaN(accounting.formatNumber(achieveNPBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtMarch, 2)) + "%");
    $('#npBahtAchieve4').html((isNaN(accounting.formatNumber(achieveNPBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtApril, 2)) + "%");
    $('#npBahtAchieve5').html((isNaN(accounting.formatNumber(achieveNPBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtMay, 2)) + "%");
    $('#npBahtAchieve6').html((isNaN(accounting.formatNumber(achieveNPBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtJune, 2)) + "%");
    $('#npBahtAchieve7').html((isNaN(accounting.formatNumber(achieveNPBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtJuly, 2)) + "%");
    $('#npBahtAchieve8').html((isNaN(accounting.formatNumber(achieveNPBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtAugust, 2)) + "%");
    $('#npBahtAchieve9').html((isNaN(accounting.formatNumber(achieveNPBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtSeptember, 2)) + "%");
    $('#npBahtAchieve10').html((isNaN(accounting.formatNumber(achieveNPBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtOctober, 2)) + "%");
    $('#npBahtAchieve11').html((isNaN(accounting.formatNumber(achieveNPBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtNovember, 2)) + "%");
    $('#npBahtAchieve12').html((isNaN(accounting.formatNumber(achieveNPBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtDecember, 2)) + "%");
    $('#npBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveNPBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtTotal, 2)) + "%");

    $('#ebBahtAchieve1').html((isNaN(accounting.formatNumber(achieveEBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtJanuary, 2)) + "%");
    $('#ebBahtAchieve2').html((isNaN(accounting.formatNumber(achieveEBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtFebruary, 2)) + "%");
    $('#ebBahtAchieve3').html((isNaN(accounting.formatNumber(achieveEBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtMarch, 2)) + "%");
    $('#ebBahtAchieve4').html((isNaN(accounting.formatNumber(achieveEBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtApril, 2)) + "%");
    $('#ebBahtAchieve5').html((isNaN(accounting.formatNumber(achieveEBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtMay, 2)) + "%");
    $('#ebBahtAchieve6').html((isNaN(accounting.formatNumber(achieveEBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtJune, 2)) + "%");
    $('#ebBahtAchieve7').html((isNaN(accounting.formatNumber(achieveEBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtJuly, 2)) + "%");
    $('#ebBahtAchieve8').html((isNaN(accounting.formatNumber(achieveEBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtAugust, 2)) + "%");
    $('#ebBahtAchieve9').html((isNaN(accounting.formatNumber(achieveEBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtSeptember, 2)) + "%");
    $('#ebBahtAchieve10').html((isNaN(accounting.formatNumber(achieveEBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtOctober, 2)) + "%");
    $('#ebBahtAchieve11').html((isNaN(accounting.formatNumber(achieveEBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtNovember, 2)) + "%");
    $('#ebBahtAchieve12').html((isNaN(accounting.formatNumber(achieveEBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtDecember, 2)) + "%");
    $('#ebBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveEBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtTotal, 2)) + "%");

    $('#indBahtAchieve1').html((isNaN(accounting.formatNumber(achieveINDBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtJanuary, 2)) + "%");
    $('#indBahtAchieve2').html((isNaN(accounting.formatNumber(achieveINDBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtFebruary, 2)) + "%");
    $('#indBahtAchieve3').html((isNaN(accounting.formatNumber(achieveINDBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtMarch, 2)) + "%");
    $('#indBahtAchieve4').html((isNaN(accounting.formatNumber(achieveINDBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtApril, 2)) + "%");
    $('#indBahtAchieve5').html((isNaN(accounting.formatNumber(achieveINDBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtMay, 2)) + "%");
    $('#indBahtAchieve6').html((isNaN(accounting.formatNumber(achieveINDBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtJune, 2)) + "%");
    $('#indBahtAchieve7').html((isNaN(accounting.formatNumber(achieveINDBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtJuly, 2)) + "%");
    $('#indBahtAchieve8').html((isNaN(accounting.formatNumber(achieveINDBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtAugust, 2)) + "%");
    $('#indBahtAchieve9').html((isNaN(accounting.formatNumber(achieveINDBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtSeptember, 2)) + "%");
    $('#indBahtAchieve10').html((isNaN(accounting.formatNumber(achieveINDBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtOctober, 2)) + "%");
    $('#indBahtAchieve11').html((isNaN(accounting.formatNumber(achieveINDBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtNovember, 2)) + "%");
    $('#indBahtAchieve12').html((isNaN(accounting.formatNumber(achieveINDBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtDecember, 2)) + "%");
    $('#indBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveINDBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtTotal, 2)) + "%");

    $('#othBahtAchieve1').html((isNaN(accounting.formatNumber(achieveOTHBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtJanuary, 2)) + "%");
    $('#othBahtAchieve2').html((isNaN(accounting.formatNumber(achieveOTHBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtFebruary, 2)) + "%");
    $('#othBahtAchieve3').html((isNaN(accounting.formatNumber(achieveOTHBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtMarch, 2)) + "%");
    $('#othBahtAchieve4').html((isNaN(accounting.formatNumber(achieveOTHBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtApril, 2)) + "%");
    $('#othBahtAchieve5').html((isNaN(accounting.formatNumber(achieveOTHBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtMay, 2)) + "%");
    $('#othBahtAchieve6').html((isNaN(accounting.formatNumber(achieveOTHBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtJune, 2)) + "%");
    $('#othBahtAchieve7').html((isNaN(accounting.formatNumber(achieveOTHBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtJuly, 2)) + "%");
    $('#othBahtAchieve8').html((isNaN(accounting.formatNumber(achieveOTHBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtAugust, 2)) + "%");
    $('#othBahtAchieve9').html((isNaN(accounting.formatNumber(achieveOTHBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtSeptember, 2)) + "%");
    $('#othBahtAchieve10').html((isNaN(accounting.formatNumber(achieveOTHBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtOctober, 2)) + "%");
    $('#othBahtAchieve11').html((isNaN(accounting.formatNumber(achieveOTHBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtNovember, 2)) + "%");
    $('#othBahtAchieve12').html((isNaN(accounting.formatNumber(achieveOTHBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtDecember, 2)) + "%");
    $('#othBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveOTHBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtTotal, 2)) + "%");

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

    $('#npBahtGrowth1').html((isNaN(accounting.formatNumber(growthNPBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtJanuary, 2)) + "%");
    $('#npBahtGrowth2').html((isNaN(accounting.formatNumber(growthNPBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtFebruary, 2)) + "%");
    $('#npBahtGrowth3').html((isNaN(accounting.formatNumber(growthNPBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtMarch, 2)) + "%");
    $('#npBahtGrowth4').html((isNaN(accounting.formatNumber(growthNPBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtApril, 2)) + "%");
    $('#npBahtGrowth5').html((isNaN(accounting.formatNumber(growthNPBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtMay, 2)) + "%");
    $('#npBahtGrowth6').html((isNaN(accounting.formatNumber(growthNPBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtJune, 2)) + "%");
    $('#npBahtGrowth7').html((isNaN(accounting.formatNumber(growthNPBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtJuly, 2)) + "%");
    $('#npBahtGrowth8').html((isNaN(accounting.formatNumber(growthNPBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtAugust, 2)) + "%");
    $('#npBahtGrowth9').html((isNaN(accounting.formatNumber(growthNPBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtSeptember, 2)) + "%");
    $('#npBahtGrowth10').html((isNaN(accounting.formatNumber(growthNPBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtOctober, 2)) + "%");
    $('#npBahtGrowth11').html((isNaN(accounting.formatNumber(growthNPBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtNovember, 2)) + "%");
    $('#npBahtGrowth12').html((isNaN(accounting.formatNumber(growthNPBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtDecember, 2)) + "%");
    $('#npBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthNPBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtTotal, 2)) + "%");

    $('#ebBahtGrowth1').html((isNaN(accounting.formatNumber(growthEBBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtJanuary, 2)) + "%");
    $('#ebBahtGrowth2').html((isNaN(accounting.formatNumber(growthEBBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtFebruary, 2)) + "%");
    $('#ebBahtGrowth3').html((isNaN(accounting.formatNumber(growthEBBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtMarch, 2)) + "%");
    $('#ebBahtGrowth4').html((isNaN(accounting.formatNumber(growthEBBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtApril, 2)) + "%");
    $('#ebBahtGrowth5').html((isNaN(accounting.formatNumber(growthEBBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtMay, 2)) + "%");
    $('#ebBahtGrowth6').html((isNaN(accounting.formatNumber(growthEBBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtJune, 2)) + "%");
    $('#ebBahtGrowth7').html((isNaN(accounting.formatNumber(growthEBBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtJuly, 2)) + "%");
    $('#ebBahtGrowth8').html((isNaN(accounting.formatNumber(growthEBBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtAugust, 2)) + "%");
    $('#ebBahtGrowth9').html((isNaN(accounting.formatNumber(growthEBBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtSeptember, 2)) + "%");
    $('#ebBahtGrowth10').html((isNaN(accounting.formatNumber(growthEBBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtOctober, 2)) + "%");
    $('#ebBahtGrowth11').html((isNaN(accounting.formatNumber(growthEBBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtNovember, 2)) + "%");
    $('#ebBahtGrowth12').html((isNaN(accounting.formatNumber(growthEBBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtDecember, 2)) + "%");
    $('#ebBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthEBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtTotal, 2)) + "%");

    $('#indBahtGrowth1').html((isNaN(accounting.formatNumber(growthINDBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtJanuary, 2)) + "%");
    $('#indBahtGrowth2').html((isNaN(accounting.formatNumber(growthINDBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtFebruary, 2)) + "%");
    $('#indBahtGrowth3').html((isNaN(accounting.formatNumber(growthINDBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtMarch, 2)) + "%");
    $('#indBahtGrowth4').html((isNaN(accounting.formatNumber(growthINDBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtApril, 2)) + "%");
    $('#indBahtGrowth5').html((isNaN(accounting.formatNumber(growthINDBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtMay, 2)) + "%");
    $('#indBahtGrowth6').html((isNaN(accounting.formatNumber(growthINDBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtJune, 2)) + "%");
    $('#indBahtGrowth7').html((isNaN(accounting.formatNumber(growthINDBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtJuly, 2)) + "%");
    $('#indBahtGrowth8').html((isNaN(accounting.formatNumber(growthINDBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtAugust, 2)) + "%");
    $('#indBahtGrowth9').html((isNaN(accounting.formatNumber(growthINDBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtSeptember, 2)) + "%");
    $('#indBahtGrowth10').html((isNaN(accounting.formatNumber(growthINDBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtOctober, 2)) + "%");
    $('#indBahtGrowth11').html((isNaN(accounting.formatNumber(growthINDBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtNovember, 2)) + "%");
    $('#indBahtGrowth12').html((isNaN(accounting.formatNumber(growthINDBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtDecember, 2)) + "%");
    $('#indBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthINDBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtTotal, 2)) + "%");

    $('#othBahtGrowth1').html((isNaN(accounting.formatNumber(growthOTHBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtJanuary, 2)) + "%");
    $('#othBahtGrowth2').html((isNaN(accounting.formatNumber(growthOTHBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtFebruary, 2)) + "%");
    $('#othBahtGrowth3').html((isNaN(accounting.formatNumber(growthOTHBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtMarch, 2)) + "%");
    $('#othBahtGrowth4').html((isNaN(accounting.formatNumber(growthOTHBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtApril, 2)) + "%");
    $('#othBahtGrowth5').html((isNaN(accounting.formatNumber(growthOTHBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtMay, 2)) + "%");
    $('#othBahtGrowth6').html((isNaN(accounting.formatNumber(growthOTHBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtJune, 2)) + "%");
    $('#othBahtGrowth7').html((isNaN(accounting.formatNumber(growthOTHBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtJuly, 2)) + "%");
    $('#othBahtGrowth8').html((isNaN(accounting.formatNumber(growthOTHBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtAugust, 2)) + "%");
    $('#othBahtGrowth9').html((isNaN(accounting.formatNumber(growthOTHBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtSeptember, 2)) + "%");
    $('#othBahtGrowth10').html((isNaN(accounting.formatNumber(growthOTHBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtOctober, 2)) + "%");
    $('#othBahtGrowth11').html((isNaN(accounting.formatNumber(growthOTHBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtNovember, 2)) + "%");
    $('#othBahtGrowth12').html((isNaN(accounting.formatNumber(growthOTHBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtDecember, 2)) + "%");
    $('#othBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthOTHBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtTotal, 2)) + "%");

    $('#UnitTarget1').html(accounting.formatNumber((targetOEMUnit01 + targetOEXUnit01 + targetEXPUnit01 + targetSPDUnit01)));
    $('#UnitTarget2').html(accounting.formatNumber((targetOEMUnit02 + targetOEXUnit02 + targetEXPUnit02 + targetSPDUnit02)));
    $('#UnitTarget3').html(accounting.formatNumber((targetOEMUnit03 + targetOEXUnit03 + targetEXPUnit03 + targetSPDUnit03)));
    $('#UnitTarget4').html(accounting.formatNumber((targetOEMUnit04 + targetOEXUnit04 + targetEXPUnit04 + targetSPDUnit04)));
    $('#UnitTarget5').html(accounting.formatNumber((targetOEMUnit05 + targetOEXUnit05 + targetEXPUnit05 + targetSPDUnit05)));
    $('#UnitTarget6').html(accounting.formatNumber((targetOEMUnit06 + targetOEXUnit06 + targetEXPUnit06 + targetSPDUnit06)));
    $('#UnitTarget7').html(accounting.formatNumber((targetOEMUnit07 + targetOEXUnit07 + targetEXPUnit07 + targetSPDUnit07)));
    $('#UnitTarget8').html(accounting.formatNumber((targetOEMUnit08 + targetOEXUnit08 + targetEXPUnit08 + targetSPDUnit08)));
    $('#UnitTarget9').html(accounting.formatNumber((targetOEMUnit09 + targetOEXUnit09 + targetEXPUnit09 + targetSPDUnit09)));
    $('#UnitTarget10').html(accounting.formatNumber((targetOEMUnit10 + targetOEXUnit10 + targetEXPUnit10 + targetSPDUnit10)));
    $('#UnitTarget11').html(accounting.formatNumber((targetOEMUnit11 + targetOEXUnit11 + targetEXPUnit11 + targetSPDUnit11)));
    $('#UnitTarget12').html(accounting.formatNumber((targetOEMUnit12 + targetOEXUnit12 + targetEXPUnit12 + targetSPDUnit12)));
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

    $('#npUnitTarget1').html(accounting.formatNumber(targetNPUnitJanuary));
    $('#npUnitTarget2').html(accounting.formatNumber(targetNPUnitFebruary));
    $('#npUnitTarget3').html(accounting.formatNumber(targetNPUnitMarch));
    $('#npUnitTarget4').html(accounting.formatNumber(targetNPUnitApril));
    $('#npUnitTarget5').html(accounting.formatNumber(targetNPUnitMay));
    $('#npUnitTarget6').html(accounting.formatNumber(targetNPUnitJune));
    $('#npUnitTarget7').html(accounting.formatNumber(targetNPUnitJuly));
    $('#npUnitTarget8').html(accounting.formatNumber(targetNPUnitAugust));
    $('#npUnitTarget9').html(accounting.formatNumber(targetNPUnitSeptember));
    $('#npUnitTarget10').html(accounting.formatNumber(targetNPUnitOctober));
    $('#npUnitTarget11').html(accounting.formatNumber(targetNPUnitNovember));
    $('#npUnitTarget12').html(accounting.formatNumber(targetNPUnitDecember));
    $('#npUnitTargetTotal').html(accounting.formatNumber(targetNPUnitTotal));

    $('#ebUnitTarget1').html(accounting.formatNumber(targetEBUnitJanuary));
    $('#ebUnitTarget2').html(accounting.formatNumber(targetEBUnitFebruary));
    $('#ebUnitTarget3').html(accounting.formatNumber(targetEBUnitMarch));
    $('#ebUnitTarget4').html(accounting.formatNumber(targetEBUnitApril));
    $('#ebUnitTarget5').html(accounting.formatNumber(targetEBUnitMay));
    $('#ebUnitTarget6').html(accounting.formatNumber(targetEBUnitJune));
    $('#ebUnitTarget7').html(accounting.formatNumber(targetEBUnitJuly));
    $('#ebUnitTarget8').html(accounting.formatNumber(targetEBUnitAugust));
    $('#ebUnitTarget9').html(accounting.formatNumber(targetEBUnitSeptember));
    $('#ebUnitTarget10').html(accounting.formatNumber(targetEBUnitOctober));
    $('#ebUnitTarget11').html(accounting.formatNumber(targetEBUnitNovember));
    $('#ebUnitTarget12').html(accounting.formatNumber(targetEBUnitDecember));
    $('#ebUnitTargetTotal').html(accounting.formatNumber(targetEBUnitTotal));

    $('#indUnitTarget1').html(accounting.formatNumber(targetINDUnitJanuary));
    $('#indUnitTarget2').html(accounting.formatNumber(targetINDUnitFebruary));
    $('#indUnitTarget3').html(accounting.formatNumber(targetINDUnitMarch));
    $('#indUnitTarget4').html(accounting.formatNumber(targetINDUnitApril));
    $('#indUnitTarget5').html(accounting.formatNumber(targetINDUnitMay));
    $('#indUnitTarget6').html(accounting.formatNumber(targetINDUnitJune));
    $('#indUnitTarget7').html(accounting.formatNumber(targetINDUnitJuly));
    $('#indUnitTarget8').html(accounting.formatNumber(targetINDUnitAugust));
    $('#indUnitTarget9').html(accounting.formatNumber(targetINDUnitSeptember));
    $('#indUnitTarget10').html(accounting.formatNumber(targetINDUnitOctober));
    $('#indUnitTarget11').html(accounting.formatNumber(targetINDUnitNovember));
    $('#indUnitTarget12').html(accounting.formatNumber(targetINDUnitDecember));
    $('#indUnitTargetTotal').html(accounting.formatNumber(targetINDUnitTotal));

    $('#othUnitTarget1').html(accounting.formatNumber(targetOTHUnitJanuary));
    $('#othUnitTarget2').html(accounting.formatNumber(targetOTHUnitFebruary));
    $('#othUnitTarget3').html(accounting.formatNumber(targetOTHUnitMarch));
    $('#othUnitTarget4').html(accounting.formatNumber(targetOTHUnitApril));
    $('#othUnitTarget5').html(accounting.formatNumber(targetOTHUnitMay));
    $('#othUnitTarget6').html(accounting.formatNumber(targetOTHUnitJune));
    $('#othUnitTarget7').html(accounting.formatNumber(targetOTHUnitJuly));
    $('#othUnitTarget8').html(accounting.formatNumber(targetOTHUnitAugust));
    $('#othUnitTarget9').html(accounting.formatNumber(targetOTHUnitSeptember));
    $('#othUnitTarget10').html(accounting.formatNumber(targetOTHUnitOctober));
    $('#othUnitTarget11').html(accounting.formatNumber(targetOTHUnitNovember));
    $('#othUnitTarget12').html(accounting.formatNumber(targetOTHUnitDecember));
    $('#othUnitTargetTotal').html(accounting.formatNumber(targetOTHUnitTotal));

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

    $('#npUnitAchieve1').html((isNaN(accounting.formatNumber(achieveNPUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitJanuary, 2)) + "%");
    $('#npUnitAchieve2').html((isNaN(accounting.formatNumber(achieveNPUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitFebruary, 2)) + "%");
    $('#npUnitAchieve3').html((isNaN(accounting.formatNumber(achieveNPUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitMarch, 2)) + "%");
    $('#npUnitAchieve4').html((isNaN(accounting.formatNumber(achieveNPUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitApril, 2)) + "%");
    $('#npUnitAchieve5').html((isNaN(accounting.formatNumber(achieveNPUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitMay, 2)) + "%");
    $('#npUnitAchieve6').html((isNaN(accounting.formatNumber(achieveNPUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitJune, 2)) + "%");
    $('#npUnitAchieve7').html((isNaN(accounting.formatNumber(achieveNPUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitJuly, 2)) + "%");
    $('#npUnitAchieve8').html((isNaN(accounting.formatNumber(achieveNPUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitAugust, 2)) + "%");
    $('#npUnitAchieve9').html((isNaN(accounting.formatNumber(achieveNPUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitSeptember, 2)) + "%");
    $('#npUnitAchieve10').html((isNaN(accounting.formatNumber(achieveNPUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitOctober, 2)) + "%");
    $('#npUnitAchieve11').html((isNaN(accounting.formatNumber(achieveNPUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitNovember, 2)) + "%");
    $('#npUnitAchieve12').html((isNaN(accounting.formatNumber(achieveNPUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitDecember, 2)) + "%");
    $('#npUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveNPUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitTotal, 2)) + "%");

    $('#ebUnitAchieve1').html((isNaN(accounting.formatNumber(achieveEBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitJanuary, 2)) + "%");
    $('#ebUnitAchieve2').html((isNaN(accounting.formatNumber(achieveEBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitFebruary, 2)) + "%");
    $('#ebUnitAchieve3').html((isNaN(accounting.formatNumber(achieveEBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitMarch, 2)) + "%");
    $('#ebUnitAchieve4').html((isNaN(accounting.formatNumber(achieveEBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitApril, 2)) + "%");
    $('#ebUnitAchieve5').html((isNaN(accounting.formatNumber(achieveEBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitMay, 2)) + "%");
    $('#ebUnitAchieve6').html((isNaN(accounting.formatNumber(achieveEBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitJune, 2)) + "%");
    $('#ebUnitAchieve7').html((isNaN(accounting.formatNumber(achieveEBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitJuly, 2)) + "%");
    $('#ebUnitAchieve8').html((isNaN(accounting.formatNumber(achieveEBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitAugust, 2)) + "%");
    $('#ebUnitAchieve9').html((isNaN(accounting.formatNumber(achieveEBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitSeptember, 2)) + "%");
    $('#ebUnitAchieve10').html((isNaN(accounting.formatNumber(achieveEBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitOctober, 2)) + "%");
    $('#ebUnitAchieve11').html((isNaN(accounting.formatNumber(achieveEBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitNovember, 2)) + "%");
    $('#ebUnitAchieve12').html((isNaN(accounting.formatNumber(achieveEBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitDecember, 2)) + "%");
    $('#ebUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveEBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitTotal, 2)) + "%");

    $('#indUnitAchieve1').html((isNaN(accounting.formatNumber(achieveINDUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitJanuary, 2)) + "%");
    $('#indUnitAchieve2').html((isNaN(accounting.formatNumber(achieveINDUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitFebruary, 2)) + "%");
    $('#indUnitAchieve3').html((isNaN(accounting.formatNumber(achieveINDUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitMarch, 2)) + "%");
    $('#indUnitAchieve4').html((isNaN(accounting.formatNumber(achieveINDUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitApril, 2)) + "%");
    $('#indUnitAchieve5').html((isNaN(accounting.formatNumber(achieveINDUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitMay, 2)) + "%");
    $('#indUnitAchieve6').html((isNaN(accounting.formatNumber(achieveINDUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitJune, 2)) + "%");
    $('#indUnitAchieve7').html((isNaN(accounting.formatNumber(achieveINDUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitJuly, 2)) + "%");
    $('#indUnitAchieve8').html((isNaN(accounting.formatNumber(achieveINDUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitAugust, 2)) + "%");
    $('#indUnitAchieve9').html((isNaN(accounting.formatNumber(achieveINDUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitSeptember, 2)) + "%");
    $('#indUnitAchieve10').html((isNaN(accounting.formatNumber(achieveINDUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitOctober, 2)) + "%");
    $('#indUnitAchieve11').html((isNaN(accounting.formatNumber(achieveINDUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitNovember, 2)) + "%");
    $('#indUnitAchieve12').html((isNaN(accounting.formatNumber(achieveINDUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitDecember, 2)) + "%");
    $('#indUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveINDUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitTotal, 2)) + "%");

    $('#othUnitAchieve1').html((isNaN(accounting.formatNumber(achieveOTHUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitJanuary, 2)) + "%");
    $('#othUnitAchieve2').html((isNaN(accounting.formatNumber(achieveOTHUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitFebruary, 2)) + "%");
    $('#othUnitAchieve3').html((isNaN(accounting.formatNumber(achieveOTHUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitMarch, 2)) + "%");
    $('#othUnitAchieve4').html((isNaN(accounting.formatNumber(achieveOTHUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitApril, 2)) + "%");
    $('#othUnitAchieve5').html((isNaN(accounting.formatNumber(achieveOTHUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitMay, 2)) + "%");
    $('#othUnitAchieve6').html((isNaN(accounting.formatNumber(achieveOTHUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitJune, 2)) + "%");
    $('#othUnitAchieve7').html((isNaN(accounting.formatNumber(achieveOTHUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitJuly, 2)) + "%");
    $('#othUnitAchieve8').html((isNaN(accounting.formatNumber(achieveOTHUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitAugust, 2)) + "%");
    $('#othUnitAchieve9').html((isNaN(accounting.formatNumber(achieveOTHUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitSeptember, 2)) + "%");
    $('#othUnitAchieve10').html((isNaN(accounting.formatNumber(achieveOTHUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitOctober, 2)) + "%");
    $('#othUnitAchieve11').html((isNaN(accounting.formatNumber(achieveOTHUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitNovember, 2)) + "%");
    $('#othUnitAchieve12').html((isNaN(accounting.formatNumber(achieveOTHUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitDecember, 2)) + "%");
    $('#othUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveOTHUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitTotal, 2)) + "%");

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

    $('#npUnitGrowth1').html((isNaN(accounting.formatNumber(growthNPUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitJanuary, 2)) + "%");
    $('#npUnitGrowth2').html((isNaN(accounting.formatNumber(growthNPUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitFebruary, 2)) + "%");
    $('#npUnitGrowth3').html((isNaN(accounting.formatNumber(growthNPUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitMarch, 2)) + "%");
    $('#npUnitGrowth4').html((isNaN(accounting.formatNumber(growthNPUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitApril, 2)) + "%");
    $('#npUnitGrowth5').html((isNaN(accounting.formatNumber(growthNPUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitMay, 2)) + "%");
    $('#npUnitGrowth6').html((isNaN(accounting.formatNumber(growthNPUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitJune, 2)) + "%");
    $('#npUnitGrowth7').html((isNaN(accounting.formatNumber(growthNPUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitJuly, 2)) + "%");
    $('#npUnitGrowth8').html((isNaN(accounting.formatNumber(growthNPUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitAugust, 2)) + "%");
    $('#npUnitGrowth9').html((isNaN(accounting.formatNumber(growthNPUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitSeptember, 2)) + "%");
    $('#npUnitGrowth10').html((isNaN(accounting.formatNumber(growthNPUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitOctober, 2)) + "%");
    $('#npUnitGrowth11').html((isNaN(accounting.formatNumber(growthNPUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitNovember, 2)) + "%");
    $('#npUnitGrowth12').html((isNaN(accounting.formatNumber(growthNPUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitDecember, 2)) + "%");
    $('#npUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthNPUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitTotal, 2)) + "%");

    $('#ebUnitGrowth1').html((isNaN(accounting.formatNumber(growthEBUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitJanuary, 2)) + "%");
    $('#ebUnitGrowth2').html((isNaN(accounting.formatNumber(growthEBUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitFebruary, 2)) + "%");
    $('#ebUnitGrowth3').html((isNaN(accounting.formatNumber(growthEBUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitMarch, 2)) + "%");
    $('#ebUnitGrowth4').html((isNaN(accounting.formatNumber(growthEBUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitApril, 2)) + "%");
    $('#ebUnitGrowth5').html((isNaN(accounting.formatNumber(growthEBUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitMay, 2)) + "%");
    $('#ebUnitGrowth6').html((isNaN(accounting.formatNumber(growthEBUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitJune, 2)) + "%");
    $('#ebUnitGrowth7').html((isNaN(accounting.formatNumber(growthEBUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitJuly, 2)) + "%");
    $('#ebUnitGrowth8').html((isNaN(accounting.formatNumber(growthEBUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitAugust, 2)) + "%");
    $('#ebUnitGrowth9').html((isNaN(accounting.formatNumber(growthEBUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitSeptember, 2)) + "%");
    $('#ebUnitGrowth10').html((isNaN(accounting.formatNumber(growthEBUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitOctober, 2)) + "%");
    $('#ebUnitGrowth11').html((isNaN(accounting.formatNumber(growthEBUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitNovember, 2)) + "%");
    $('#ebUnitGrowth12').html((isNaN(accounting.formatNumber(growthEBUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitDecember, 2)) + "%");
    $('#ebUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthEBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitTotal, 2)) + "%");

    $('#indUnitGrowth1').html((isNaN(accounting.formatNumber(growthINDUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitJanuary, 2)) + "%");
    $('#indUnitGrowth2').html((isNaN(accounting.formatNumber(growthINDUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitFebruary, 2)) + "%");
    $('#indUnitGrowth3').html((isNaN(accounting.formatNumber(growthINDUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitMarch, 2)) + "%");
    $('#indUnitGrowth4').html((isNaN(accounting.formatNumber(growthINDUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitApril, 2)) + "%");
    $('#indUnitGrowth5').html((isNaN(accounting.formatNumber(growthINDUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitMay, 2)) + "%");
    $('#indUnitGrowth6').html((isNaN(accounting.formatNumber(growthINDUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitJune, 2)) + "%");
    $('#indUnitGrowth7').html((isNaN(accounting.formatNumber(growthINDUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitJuly, 2)) + "%");
    $('#indUnitGrowth8').html((isNaN(accounting.formatNumber(growthINDUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitAugust, 2)) + "%");
    $('#indUnitGrowth9').html((isNaN(accounting.formatNumber(growthINDUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitSeptember, 2)) + "%");
    $('#indUnitGrowth10').html((isNaN(accounting.formatNumber(growthINDUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitOctober, 2)) + "%");
    $('#indUnitGrowth11').html((isNaN(accounting.formatNumber(growthINDUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitNovember, 2)) + "%");
    $('#indUnitGrowth12').html((isNaN(accounting.formatNumber(growthINDUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitDecember, 2)) + "%");
    $('#indUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthINDUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitTotal, 2)) + "%");

    $('#othUnitGrowth1').html((isNaN(accounting.formatNumber(growthOTHUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitJanuary, 2)) + "%");
    $('#othUnitGrowth2').html((isNaN(accounting.formatNumber(growthOTHUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitFebruary, 2)) + "%");
    $('#othUnitGrowth3').html((isNaN(accounting.formatNumber(growthOTHUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitMarch, 2)) + "%");
    $('#othUnitGrowth4').html((isNaN(accounting.formatNumber(growthOTHUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitApril, 2)) + "%");
    $('#othUnitGrowth5').html((isNaN(accounting.formatNumber(growthOTHUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitMay, 2)) + "%");
    $('#othUnitGrowth6').html((isNaN(accounting.formatNumber(growthOTHUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitJune, 2)) + "%");
    $('#othUnitGrowth7').html((isNaN(accounting.formatNumber(growthOTHUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitJuly, 2)) + "%");
    $('#othUnitGrowth8').html((isNaN(accounting.formatNumber(growthOTHUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitAugust, 2)) + "%");
    $('#othUnitGrowth9').html((isNaN(accounting.formatNumber(growthOTHUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitSeptember, 2)) + "%");
    $('#othUnitGrowth10').html((isNaN(accounting.formatNumber(growthOTHUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitOctober, 2)) + "%");
    $('#othUnitGrowth11').html((isNaN(accounting.formatNumber(growthOTHUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitNovember, 2)) + "%");
    $('#othUnitGrowth12').html((isNaN(accounting.formatNumber(growthOTHUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitDecember, 2)) + "%");
    $('#othUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthOTHUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitTotal, 2)) + "%");

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

    bahtGraph(year, targetOEMAmt01, targetOEMAmt02, targetOEMAmt03, targetOEMAmt04, targetOEMAmt05, targetOEMAmt06, targetOEMAmt07, targetOEMAmt08, targetOEMAmt09, targetOEMAmt10, targetOEMAmt11, targetOEMAmt12,
        accounting.unformat(totalOEMBahtTarget), currOEMBahtJanuary, currOEMBahtFebruary, currOEMBahtMarch, currOEMBahtApril, currOEMBahtMay, currOEMBahtJune, currOEMBahtJuly, currOEMBahtAugust,
        currOEMBahtSeptember, currOEMBahtOctober, currOEMBahtNovember, currOEMBahtDecember, currOEMTotalBaht, oldOEMBahtJanuary, oldOEMBahtFebruary, oldOEMBahtMarch, oldOEMBahtApril, oldOEMBahtMay,
        oldOEMBahtJune, oldOEMBahtJuly, oldOEMBahtAugust, oldOEMBahtSeptember, oldOEMBahtOctober, oldOEMBahtNovember, oldOEMBahtDecember, oldOEMTotalBaht,
        targetOEXAmt01, targetOEXAmt02, targetOEXAmt03, targetOEXAmt04, targetOEXAmt05, targetOEXAmt06, targetOEXAmt07, targetOEXAmt08, targetOEXAmt09, targetOEXAmt10, targetOEXAmt11, targetOEXAmt12,
        accounting.unformat(totalOEXBahtTarget), currOEXBahtJanuary, currOEXBahtFebruary, currOEXBahtMarch, currOEXBahtApril, currOEXBahtMay, currOEXBahtJune, currOEXBahtJuly, currOEXBahtAugust,
        currOEXBahtSeptember, currOEXBahtOctober, currOEXBahtNovember, currOEXBahtDecember, currOEXTotalBaht, oldOEXBahtJanuary, oldOEXBahtFebruary, oldOEXBahtMarch, oldOEXBahtApril, oldOEXBahtMay,
        oldOEXBahtJune, oldOEXBahtJuly, oldOEXBahtAugust, oldOEXBahtSeptember, oldOEXBahtOctober, oldOEXBahtNovember, oldOEXBahtDecember, oldOEXTotalBaht,
        targetEXPAmt01, targetEXPAmt02, targetEXPAmt03, targetEXPAmt04, targetEXPAmt05, targetEXPAmt06, targetEXPAmt07, targetEXPAmt08, targetEXPAmt09, targetEXPAmt10, targetEXPAmt11, targetEXPAmt12,
        accounting.unformat(totalEXPBahtTarget), currEXPBahtJanuary, currEXPBahtFebruary, currEXPBahtMarch, currEXPBahtApril, currEXPBahtMay, currEXPBahtJune, currEXPBahtJuly, currEXPBahtAugust,
        currEXPBahtSeptember, currEXPBahtOctober, currEXPBahtNovember, currEXPBahtDecember, currEXPTotalBaht, oldEXPBahtJanuary, oldEXPBahtFebruary, oldEXPBahtMarch, oldEXPBahtApril, oldEXPBahtMay,
        oldEXPBahtJune, oldEXPBahtJuly, oldEXPBahtAugust, oldEXPBahtSeptember, oldEXPBahtOctober, oldEXPBahtNovember, oldEXPBahtDecember, oldEXPTotalBaht,
        targetSPDAmt01, targetSPDAmt02, targetSPDAmt03, targetSPDAmt04, targetSPDAmt05, targetSPDAmt06, targetSPDAmt07, targetSPDAmt08, targetSPDAmt09, targetSPDAmt10, targetSPDAmt11, targetSPDAmt12,
        accounting.unformat(totalSPDBahtTarget), currSPDBahtJanuary, currSPDBahtFebruary, currSPDBahtMarch, currSPDBahtApril, currSPDBahtMay, currSPDBahtJune, currSPDBahtJuly, currSPDBahtAugust,
        currSPDBahtSeptember, currSPDBahtOctober, currSPDBahtNovember, currSPDBahtDecember, currSPDTotalBaht, oldSPDBahtJanuary, oldSPDBahtFebruary, oldSPDBahtMarch, oldSPDBahtApril, oldSPDBahtMay,
        oldSPDBahtJune, oldSPDBahtJuly, oldSPDBahtAugust, oldSPDBahtSeptember, oldSPDBahtOctober, oldSPDBahtNovember, oldSPDBahtDecember, oldSPDTotalBaht);
    unitGraph(year, targetOEMUnit01, targetOEMUnit02, targetOEMUnit03, targetOEMUnit04, targetOEMUnit05, targetOEMUnit06, targetOEMUnit07, targetOEMUnit08, targetOEMUnit09, targetOEMUnit10, targetOEMUnit11, targetOEMUnit12,
        accounting.unformat(totalOEMUnitTarget), currOEMUnitJanuary, currOEMUnitFebruary, currOEMUnitMarch, currOEMUnitApril, currOEMUnitMay, currOEMUnitJune, currOEMUnitJuly, currOEMUnitAugust,
        currOEMUnitSeptember, currOEMUnitOctober, currOEMUnitNovember, currOEMUnitDecember, currOEMTotalUnit, oldOEMUnitJanuary, oldOEMUnitFebruary, oldOEMUnitMarch, oldOEMUnitApril, oldOEMUnitMay,
        oldOEMUnitJune, oldOEMUnitJuly, oldOEMUnitAugust, oldOEMUnitSeptember, oldOEMUnitOctober, oldOEMUnitNovember, oldOEMUnitDecember, oldOEMTotalUnit,
        targetOEXUnit01, targetOEXUnit02, targetOEXUnit03, targetOEXUnit04, targetOEXUnit05, targetOEXUnit06, targetOEXUnit07, targetOEXUnit08, targetOEXUnit09, targetOEXUnit10, targetOEXUnit11, targetOEXUnit12,
        accounting.unformat(totalOEXUnitTarget), currOEXUnitJanuary, currOEXUnitFebruary, currOEXUnitMarch, currOEXUnitApril, currOEXUnitMay, currOEXUnitJune, currOEXUnitJuly, currOEXUnitAugust,
        currOEXUnitSeptember, currOEXUnitOctober, currOEXUnitNovember, currOEXUnitDecember, currOEXTotalUnit, oldOEXUnitJanuary, oldOEXUnitFebruary, oldOEXUnitMarch, oldOEXUnitApril, oldOEXUnitMay,
        oldOEXUnitJune, oldOEXUnitJuly, oldOEXUnitAugust, oldOEXUnitSeptember, oldOEXUnitOctober, oldOEXUnitNovember, oldOEXUnitDecember, oldOEXTotalUnit,
        targetEXPUnit01, targetEXPUnit02, targetEXPUnit03, targetEXPUnit04, targetEXPUnit05, targetEXPUnit06, targetEXPUnit07, targetEXPUnit08, targetEXPUnit09, targetEXPUnit10, targetEXPUnit11, targetEXPUnit12,
        accounting.unformat(totalEXPUnitTarget), currEXPUnitJanuary, currEXPUnitFebruary, currEXPUnitMarch, currEXPUnitApril, currEXPUnitMay, currEXPUnitJune, currEXPUnitJuly, currEXPUnitAugust,
        currEXPUnitSeptember, currEXPUnitOctober, currEXPUnitNovember, currEXPUnitDecember, currEXPTotalUnit, oldEXPUnitJanuary, oldEXPUnitFebruary, oldEXPUnitMarch, oldEXPUnitApril, oldEXPUnitMay,
        oldEXPUnitJune, oldEXPUnitJuly, oldEXPUnitAugust, oldEXPUnitSeptember, oldEXPUnitOctober, oldEXPUnitNovember, oldEXPUnitDecember, oldEXPTotalUnit,
        targetSPDUnit01, targetSPDUnit02, targetSPDUnit03, targetSPDUnit04, targetSPDUnit05, targetSPDUnit06, targetSPDUnit07, targetSPDUnit08, targetSPDUnit09, targetSPDUnit10, targetSPDUnit11, targetSPDUnit12,
        accounting.unformat(totalSPDUnitTarget), currSPDUnitJanuary, currSPDUnitFebruary, currSPDUnitMarch, currSPDUnitApril, currSPDUnitMay, currSPDUnitJune, currSPDUnitJuly, currSPDUnitAugust,
        currSPDUnitSeptember, currSPDUnitOctober, currSPDUnitNovember, currSPDUnitDecember, currSPDTotalUnit, oldSPDUnitJanuary, oldSPDUnitFebruary, oldSPDUnitMarch, oldSPDUnitApril, oldSPDUnitMay,
        oldSPDUnitJune, oldSPDUnitJuly, oldSPDUnitAugust, oldSPDUnitSeptember, oldSPDUnitOctober, oldSPDUnitNovember, oldSPDUnitDecember, oldSPDTotalUnit);

    var bahtPerOEM = (currOEMTotalBaht / (currOEMTotalBaht + currOEXTotalBaht + currEXPTotalBaht + currSPDTotalBaht)) * 100;
    var bahtPerOEX = (currOEXTotalBaht / (currOEMTotalBaht + currOEXTotalBaht + currEXPTotalBaht + currSPDTotalBaht)) * 100;
    var bahtPerEXP = (currEXPTotalBaht / (currOEMTotalBaht + currOEXTotalBaht + currEXPTotalBaht + currSPDTotalBaht)) * 100;
    var bahtPerSPD = (currSPDTotalBaht / (currOEMTotalBaht + currOEXTotalBaht + currEXPTotalBaht + currSPDTotalBaht)) * 100;
    var unitPerOEM = (currOEMTotalUnit / (currOEMTotalUnit + currOEXTotalUnit + currEXPTotalUnit + currSPDTotalUnit)) * 100;
    var unitPerOEX = (currOEXTotalUnit / (currOEMTotalUnit + currOEXTotalUnit + currEXPTotalUnit + currSPDTotalUnit)) * 100;
    var unitPerEXP = (currEXPTotalUnit / (currOEMTotalUnit + currOEXTotalUnit + currEXPTotalUnit + currSPDTotalUnit)) * 100;
    var unitPerSPD = (currSPDTotalUnit / (currOEMTotalUnit + currOEXTotalUnit + currEXPTotalUnit + currSPDTotalUnit)) * 100;

    var bahtPerAMBOEM = (currOEMAMBTotalBaht / (currOEMAMBTotalBaht + currOEXAMBTotalBaht + currEXPAMBTotalBaht)) * 100;
    var bahtPerAMBOEX = (currOEXAMBTotalBaht / (currOEMAMBTotalBaht + currOEXAMBTotalBaht + currEXPAMBTotalBaht)) * 100;
    var bahtPerAMBEXP = (currEXPAMBTotalBaht / (currOEMAMBTotalBaht + currOEXAMBTotalBaht + currEXPAMBTotalBaht)) * 100;
    var unitPerAMBOEM = (currOEMAMBTotalUnit / (currOEMAMBTotalUnit + currOEXAMBTotalUnit + currEXPAMBTotalUnit)) * 100;
    var unitPerAMBOEX = (currOEXAMBTotalUnit / (currOEMAMBTotalUnit + currOEXAMBTotalUnit + currEXPAMBTotalUnit)) * 100;
    var unitPerAMBEXP = (currEXPAMBTotalUnit / (currOEMAMBTotalUnit + currOEXAMBTotalUnit + currEXPAMBTotalUnit)) * 100;

    var bahtPerMCBOEM = (currOEMMCBTotalBaht / (currOEMMCBTotalBaht + currOEXMCBTotalBaht + currEXPMCBTotalBaht)) * 100;
    var bahtPerMCBOEX = (currOEXMCBTotalBaht / (currOEMMCBTotalBaht + currOEXMCBTotalBaht + currEXPMCBTotalBaht)) * 100;
    var bahtPerMCBEXP = (currEXPMCBTotalBaht / (currOEMMCBTotalBaht + currOEXMCBTotalBaht + currEXPMCBTotalBaht)) * 100;
    var unitPerMCBOEM = (currOEMMCBTotalUnit / (currOEMMCBTotalUnit + currOEXMCBTotalUnit + currEXPMCBTotalUnit)) * 100;
    var unitPerMCBOEX = (currOEXMCBTotalUnit / (currOEMMCBTotalUnit + currOEXMCBTotalUnit + currEXPMCBTotalUnit)) * 100;
    var unitPerMCBEXP = (currEXPMCBTotalUnit / (currOEMMCBTotalUnit + currOEXMCBTotalUnit + currEXPMCBTotalUnit)) * 100;
    var bahtPerNPSPD = (currSPDNPTotalBaht / (currSPDNPTotalBaht)) * 100;
    var unitPerNPSPD = (currSPDNPTotalUnit / (currSPDNPTotalUnit)) * 100;
    var bahtPerEBSPD = (currSPDEBTotalBaht / (currSPDEBTotalBaht)) * 100;
    var unitPerEBSPD = (currSPDEBTotalUnit / (currSPDEBTotalUnit)) * 100;
    var bahtPerINDSPD = (currSPDINDTotalBaht / (currSPDINDTotalBaht)) * 100;
    var unitPerINDSPD = (currSPDINDTotalUnit / (currSPDINDTotalUnit)) * 100;
    var bahtPerOTHSPD = (currSPDOTHTotalBaht / (currSPDOTHTotalBaht)) * 100;
    var unitPerOTHSPD = (currSPDOTHTotalUnit / (currSPDOTHTotalUnit)) * 100;

    bahtYBTH(year, bahtPerOEM, bahtPerOEX, bahtPerEXP, bahtPerSPD, currOEMTotalBaht, currOEXTotalBaht, currEXPTotalBaht, currSPDTotalBaht);
    unitYBTH(year, unitPerOEM, unitPerOEX, unitPerEXP, unitPerSPD, currOEMTotalUnit, currOEXTotalUnit, currEXPTotalUnit, currSPDTotalUnit);
    bahtYBTH2(year, bahtPerAMBOEM, bahtPerAMBOEX, bahtPerAMBEXP, currOEMAMBTotalBaht, currOEXAMBTotalBaht, currEXPAMBTotalBaht);
    unitYBTH2(year, unitPerAMBOEM, unitPerAMBOEX, unitPerAMBEXP, currOEMAMBTotalUnit, currOEXAMBTotalUnit, currEXPAMBTotalUnit);
    bahtYBTH3(year, bahtPerMCBOEM, bahtPerMCBOEX, bahtPerMCBEXP, currOEMMCBTotalBaht, currOEXMCBTotalBaht, currEXPMCBTotalBaht);
    unitYBTH3(year, unitPerMCBOEM, unitPerMCBOEX, unitPerMCBEXP, currOEMMCBTotalUnit, currOEXMCBTotalUnit, currEXPMCBTotalUnit);
    bahtYBTH4(year, bahtPerNPSPD, currSPDNPTotalBaht);
    unitYBTH4(year, unitPerNPSPD, currSPDNPTotalUnit);
    bahtYBTH5(year, bahtPerEBSPD, currSPDEBTotalBaht);
    unitYBTH5(year, unitPerEBSPD, currSPDEBTotalUnit);
    bahtYBTH6(year, bahtPerINDSPD, currSPDINDTotalBaht);
    unitYBTH6(year, unitPerINDSPD, currSPDINDTotalUnit);
    bahtYBTH7(year, bahtPerOTHSPD, currSPDOTHTotalBaht);
    unitYBTH7(year, unitPerOTHSPD, currSPDOTHTotalUnit);
}

function tableProduct(type, data) {

    var k = '<tbody>'
    for (i = 0; i < data.length; i++) {
        k += '<tr>';
        k += '<td style="text-align:center">' + (i + 1) + '</td>';
        k += '<td>' + data[i].ItemShortName + '</td>';
        k += '<td style="text-align:center">' + data[i].ItemGroupShort + '</td>';
        k += '<td style="text-align:right">' + accounting.formatNumber(data[i].Quantity) + '</td>';
        k += '<td style="text-align:right">' + accounting.formatNumber(data[i].Total) + '</td>';
        k += '</tr>';
    }
    k += '</tbody>';

    if (type == "OEM") {
        document.getElementById('oemProduct').innerHTML = k;
    } else if (type == "OEX") {
        document.getElementById('oexProduct').innerHTML = k;
    } else if (type == "EXP") {
        document.getElementById('expProduct').innerHTML = k;
    } else if (type == "SPD") {
        document.getElementById('spdProduct').innerHTML = k;
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

    if (type == "OEM") {
        document.getElementById('oemCustomer').innerHTML = k;
    } else if (type == "OEX") {
        document.getElementById('oexCustomer').innerHTML = k;
    } else if (type == "EXP") {
        document.getElementById('expCustomer').innerHTML = k;
    } else if (type == "SPD") {
        document.getElementById('spdCustomer').innerHTML = k;
    }

}

function bahtGraph(year, targetOEM1, targetOEM2, targetOEM3, targetOEM4, targetOEM5, targetOEM6, targetOEM7, targetOEM8, targetOEM9, targetOEM10, targetOEM11, targetOEM12, targetOEMTotal,
    currOEMJanuary, currOEMFebruary, currOEMMarch, currOEMApril, currOEMMay, currOEMJune, currOEMJuly, currOEMAugust, currOEMSeptember, currOEMOctober, currOEMNovember, currOEMDecember, currOEMTotal,
    oldOEMJanuary, oldOEMFebruary, oldOEMMarch, oldOEMApril, oldOEMMay, oldOEMJune, oldOEMJuly, oldOEMAugust, oldOEMSeptember, oldOEMOctober, oldOEMNovember, oldOEMDecember, oldOEMTotal,
    targetOEX1, targetOEX2, targetOEX3, targetOEX4, targetOEX5, targetOEX6, targetOEX7, targetOEX8, targetOEX9, targetOEX10, targetOEX11, targetOEX12, targetOEXTotal,
    currOEXJanuary, currOEXFebruary, currOEXMarch, currOEXApril, currOEXMay, currOEXJune, currOEXJuly, currOEXAugust, currOEXSeptember, currOEXOctober, currOEXNovember, currOEXDecember, currOEXTotal,
    oldOEXJanuary, oldOEXFebruary, oldOEXMarch, oldOEXApril, oldOEXMay, oldOEXJune, oldOEXJuly, oldOEXAugust, oldOEXSeptember, oldOEXOctober, oldOEXNovember, oldOEXDecember, oldOEXTotal,
    targetEXP1, targetEXP2, targetEXP3, targetEXP4, targetEXP5, targetEXP6, targetEXP7, targetEXP8, targetEXP9, targetEXP10, targetEXP11, targetEXP12, targetEXPTotal,
    currEXPJanuary, currEXPFebruary, currEXPMarch, currEXPApril, currEXPMay, currEXPJune, currEXPJuly, currEXPAugust, currEXPSeptember, currEXPOctober, currEXPNovember, currEXPDecember, currEXPTotal,
    oldEXPJanuary, oldEXPFebruary, oldEXPMarch, oldEXPApril, oldEXPMay, oldEXPJune, oldEXPJuly, oldEXPAugust, oldEXPSeptember, oldEXPOctober, oldEXPNovember, oldEXPDecember, oldEXPTotal,
    targetSPD1, targetSPD2, targetSPD3, targetSPD4, targetSPD5, targetSPD6, targetSPD7, targetSPD8, targetSPD9, targetSPD10, targetSPD11, targetSPD12, targetSPDTotal,
    currSPDJanuary, currSPDFebruary, currSPDMarch, currSPDApril, currSPDMay, currSPDJune, currSPDJuly, currSPDAugust, currSPDSeptember, currSPDOctober, currSPDNovember, currSPDDecember, currSPDTotal,
    oldSPDJanuary, oldSPDFebruary, oldSPDMarch, oldSPDApril, oldSPDMay, oldSPDJune, oldSPDJuly, oldSPDAugust, oldSPDSeptember, oldSPDOctober, oldSPDNovember, oldSPDDecember, oldSPDTotal) {

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
                name: 'OEM ' + (year - 1),
                data: [{
                    y: oldOEMJanuary,
                    month: 1,
                    value: accounting.formatMoney(oldOEMJanuary, "฿")
                }, {
                    y: oldOEMFebruary,
                    month: 2,
                    value: accounting.formatMoney(oldOEMFebruary, "฿")
                }, {
                    y: oldOEMMarch,
                    month: 3,
                    value: accounting.formatMoney(oldOEMMarch, "฿")
                }, {
                    y: oldOEMApril,
                    month: 4,
                    value: accounting.formatMoney(oldOEMApril, "฿")
                }, {
                    y: oldOEMMay,
                    month: 5,
                    value: accounting.formatMoney(oldOEMMay, "฿")
                }, {
                    y: oldOEMJune,
                    month: 6,
                    value: accounting.formatMoney(oldOEMJune, "฿")
                }, {
                    y: oldOEMJuly,
                    month: 7,
                    value: accounting.formatMoney(oldOEMJuly, "฿")
                }, {
                    y: oldOEMAugust,
                    month: 8,
                    value: accounting.formatMoney(oldOEMAugust, "฿")
                }, {
                    y: oldOEMSeptember,
                    month: 9,
                    value: accounting.formatMoney(oldOEMSeptember, "฿")
                }, {
                    y: oldOEMOctober,
                    month: 10,
                    value: accounting.formatMoney(oldOEMOctober, "฿")
                }, {
                    y: oldOEMNovember,
                    month: 11,
                    value: accounting.formatMoney(oldOEMNovember, "฿")
                }, {
                    y: oldOEMDecember,
                    month: 12,
                    value: accounting.formatMoney(oldOEMDecember, "฿")
                }],
                stack: 'old',
                color: '#4285F4'
            }, {
                name: 'OEX ' + (year - 1),
                data: [{
                    y: oldOEXJanuary,
                    month: 1,
                    value: accounting.formatMoney(oldOEXJanuary, "฿")
                }, {
                    y: oldOEXFebruary,
                    month: 2,
                    value: accounting.formatMoney(oldOEXFebruary, "฿")
                }, {
                    y: oldOEXMarch,
                    month: 3,
                    value: accounting.formatMoney(oldOEXMarch, "฿")
                }, {
                    y: oldOEXApril,
                    month: 4,
                    value: accounting.formatMoney(oldOEXApril, "฿")
                }, {
                    y: oldOEXMay,
                    month: 5,
                    value: accounting.formatMoney(oldOEXMay, "฿")
                }, {
                    y: oldOEXJune,
                    month: 6,
                    value: accounting.formatMoney(oldOEXJune, "฿")
                }, {
                    y: oldOEXJuly,
                    month: 7,
                    value: accounting.formatMoney(oldOEXJuly, "฿")
                }, {
                    y: oldOEXAugust,
                    month: 8,
                    value: accounting.formatMoney(oldOEXAugust, "฿")
                }, {
                    y: oldOEXSeptember,
                    month: 9,
                    value: accounting.formatMoney(oldOEXSeptember, "฿")
                }, {
                    y: oldOEXOctober,
                    month: 10,
                    value: accounting.formatMoney(oldOEXOctober, "฿")
                }, {
                    y: oldOEXNovember,
                    month: 11,
                    value: accounting.formatMoney(oldOEXNovember, "฿")
                }, {
                    y: oldOEXDecember,
                    month: 12,
                    value: accounting.formatMoney(oldOEXDecember, "฿")
                }],
                stack: 'old',
                color: '#FBBC05'
            }, {
                name: 'EXP ' + (year - 1),
                data: [{
                    y: oldEXPJanuary,
                    month: 1,
                    value: accounting.formatMoney(oldEXPJanuary, "฿")
                }, {
                    y: oldEXPFebruary,
                    month: 2,
                    value: accounting.formatMoney(oldEXPFebruary, "฿")
                }, {
                    y: oldEXPMarch,
                    month: 3,
                    value: accounting.formatMoney(oldEXPMarch, "฿")
                }, {
                    y: oldEXPApril,
                    month: 4,
                    value: accounting.formatMoney(oldEXPApril, "฿")
                }, {
                    y: oldEXPMay,
                    month: 5,
                    value: accounting.formatMoney(oldEXPMay, "฿")
                }, {
                    y: oldEXPJune,
                    month: 6,
                    value: accounting.formatMoney(oldEXPJune, "฿")
                }, {
                    y: oldEXPJuly,
                    month: 7,
                    value: accounting.formatMoney(oldEXPJuly, "฿")
                }, {
                    y: oldEXPAugust,
                    month: 8,
                    value: accounting.formatMoney(oldEXPAugust, "฿")
                }, {
                    y: oldEXPSeptember,
                    month: 9,
                    value: accounting.formatMoney(oldEXPSeptember, "฿")
                }, {
                    y: oldEXPOctober,
                    month: 10,
                    value: accounting.formatMoney(oldEXPOctober, "฿")
                }, {
                    y: oldEXPNovember,
                    month: 11,
                    value: accounting.formatMoney(oldEXPNovember, "฿")
                }, {
                    y: oldEXPDecember,
                    month: 12,
                    value: accounting.formatMoney(oldEXPDecember, "฿")
                }],
                stack: 'old',
                color: '#34A853'
            }, {
                name: 'SPD ' + (year - 1),
                data: [{
                    y: oldSPDJanuary,
                    month: 1,
                    value: accounting.formatMoney(oldSPDJanuary, "฿")
                }, {
                    y: oldSPDFebruary,
                    month: 2,
                    value: accounting.formatMoney(oldSPDFebruary, "฿")
                }, {
                    y: oldSPDMarch,
                    month: 3,
                    value: accounting.formatMoney(oldSPDMarch, "฿")
                }, {
                    y: oldSPDApril,
                    month: 4,
                    value: accounting.formatMoney(oldSPDApril, "฿")
                }, {
                    y: oldSPDMay,
                    month: 5,
                    value: accounting.formatMoney(oldSPDMay, "฿")
                }, {
                    y: oldSPDJune,
                    month: 6,
                    value: accounting.formatMoney(oldSPDJune, "฿")
                }, {
                    y: oldSPDJuly,
                    month: 7,
                    value: accounting.formatMoney(oldSPDJuly, "฿")
                }, {
                    y: oldSPDAugust,
                    month: 8,
                    value: accounting.formatMoney(oldSPDAugust, "฿")
                }, {
                    y: oldSPDSeptember,
                    month: 9,
                    value: accounting.formatMoney(oldSPDSeptember, "฿")
                }, {
                    y: oldSPDOctober,
                    month: 10,
                    value: accounting.formatMoney(oldSPDOctober, "฿")
                }, {
                    y: oldSPDNovember,
                    month: 11,
                    value: accounting.formatMoney(oldSPDNovember, "฿")
                }, {
                    y: oldSPDDecember,
                    month: 12,
                    value: accounting.formatMoney(oldSPDDecember, "฿")
                }],
                stack: 'old',
                color: '#EA4335'
            },
            {
                name: 'OEM ' + year,
                data: [{
                    y: currOEMJanuary,
                    month: 1,
                    value: accounting.formatMoney(currOEMJanuary, "฿")
                }, {
                    y: currOEMFebruary,
                    month: 2,
                    value: accounting.formatMoney(currOEMFebruary, "฿")
                }, {
                    y: currOEMMarch,
                    month: 3,
                    value: accounting.formatMoney(currOEMMarch, "฿")
                }, {
                    y: currOEMApril,
                    month: 4,
                    value: accounting.formatMoney(currOEMApril, "฿")
                }, {
                    y: currOEMMay,
                    month: 5,
                    value: accounting.formatMoney(currOEMMay, "฿")
                }, {
                    y: currOEMJune,
                    month: 6,
                    value: accounting.formatMoney(currOEMJune, "฿")
                }, {
                    y: currOEMJuly,
                    month: 7,
                    value: accounting.formatMoney(currOEMJuly, "฿")
                }, {
                    y: currOEMAugust,
                    month: 8,
                    value: accounting.formatMoney(currOEMAugust, "฿")
                }, {
                    y: currOEMSeptember,
                    month: 9,
                    value: accounting.formatMoney(currOEMSeptember, "฿")
                }, {
                    y: currOEMOctober,
                    month: 10,
                    value: accounting.formatMoney(currOEMOctober, "฿")
                }, {
                    y: currOEMNovember,
                    month: 11,
                    value: accounting.formatMoney(currOEMNovember, "฿")
                }, {
                    y: currOEMDecember,
                    month: 12,
                    value: accounting.formatMoney(currOEMDecember, "฿")
                }],
                stack: 'new',
                color: '#b7d1fb'
            }, {
                name: 'OEX ' + year,
                data: [{
                    y: currOEXJanuary,
                    month: 1,
                    value: accounting.formatMoney(currOEXJanuary, "฿")
                }, {
                    y: currOEXFebruary,
                    month: 2,
                    value: accounting.formatMoney(currOEXFebruary, "฿")
                }, {
                    y: currOEXMarch,
                    month: 3,
                    value: accounting.formatMoney(currOEXMarch, "฿")
                }, {
                    y: currOEXApril,
                    month: 4,
                    value: accounting.formatMoney(currOEXApril, "฿")
                }, {
                    y: currOEXMay,
                    month: 5,
                    value: accounting.formatMoney(currOEXMay, "฿")
                }, {
                    y: currOEXJune,
                    month: 6,
                    value: accounting.formatMoney(currOEXJune, "฿")
                }, {
                    y: currOEXJuly,
                    month: 7,
                    value: accounting.formatMoney(currOEXJuly, "฿")
                }, {
                    y: currOEXAugust,
                    month: 8,
                    value: accounting.formatMoney(currOEXAugust, "฿")
                }, {
                    y: currOEXSeptember,
                    month: 9,
                    value: accounting.formatMoney(currOEXSeptember, "฿")
                }, {
                    y: currOEXOctober,
                    month: 10,
                    value: accounting.formatMoney(currOEXOctober, "฿")
                }, {
                    y: currOEXNovember,
                    month: 11,
                    value: accounting.formatMoney(currOEXNovember, "฿")
                }, {
                    y: currOEXDecember,
                    month: 12,
                    value: accounting.formatMoney(currOEXDecember, "฿")
                }],
                stack: 'new',
                color: '#feebb4'
            }, {
                name: 'EXP ' + year,
                data: [{
                    y: currEXPJanuary,
                    month: 1,
                    value: accounting.formatMoney(currEXPJanuary, "฿")
                }, {
                    y: currEXPFebruary,
                    month: 2,
                    value: accounting.formatMoney(currEXPFebruary, "฿")
                }, {
                    y: currEXPMarch,
                    month: 3,
                    value: accounting.formatMoney(currEXPMarch, "฿")
                }, {
                    y: currEXPApril,
                    month: 4,
                    value: accounting.formatMoney(currEXPApril, "฿")
                }, {
                    y: currEXPMay,
                    month: 5,
                    value: accounting.formatMoney(currEXPMay, "฿")
                }, {
                    y: currEXPJune,
                    month: 6,
                    value: accounting.formatMoney(currEXPJune, "฿")
                }, {
                    y: currEXPJuly,
                    month: 7,
                    value: accounting.formatMoney(currEXPJuly, "฿")
                }, {
                    y: currEXPAugust,
                    month: 8,
                    value: accounting.formatMoney(currEXPAugust, "฿")
                }, {
                    y: currEXPSeptember,
                    month: 9,
                    value: accounting.formatMoney(currEXPSeptember, "฿")
                }, {
                    y: currEXPOctober,
                    month: 10,
                    value: accounting.formatMoney(currEXPOctober, "฿")
                }, {
                    y: currEXPNovember,
                    month: 11,
                    value: accounting.formatMoney(currEXPNovember, "฿")
                }, {
                    y: currEXPDecember,
                    month: 12,
                    value: accounting.formatMoney(currEXPDecember, "฿")
                }],
                stack: 'new',
                color: '#c4edcf'
            }, {
                name: 'SPD ' + year,
                data: [{
                    y: currSPDJanuary,
                    month: 1,
                    value: accounting.formatMoney(currSPDJanuary, "฿")
                }, {
                    y: currSPDFebruary,
                    month: 2,
                    value: accounting.formatMoney(currSPDFebruary, "฿")
                }, {
                    y: currSPDMarch,
                    month: 3,
                    value: accounting.formatMoney(currSPDMarch, "฿")
                }, {
                    y: currSPDApril,
                    month: 4,
                    value: accounting.formatMoney(currSPDApril, "฿")
                }, {
                    y: currSPDMay,
                    month: 5,
                    value: accounting.formatMoney(currSPDMay, "฿")
                }, {
                    y: currSPDJune,
                    month: 6,
                    value: accounting.formatMoney(currSPDJune, "฿")
                }, {
                    y: currSPDJuly,
                    month: 7,
                    value: accounting.formatMoney(currSPDJuly, "฿")
                }, {
                    y: currSPDAugust,
                    month: 8,
                    value: accounting.formatMoney(currSPDAugust, "฿")
                }, {
                    y: currSPDSeptember,
                    month: 9,
                    value: accounting.formatMoney(currSPDSeptember, "฿")
                }, {
                    y: currSPDOctober,
                    month: 10,
                    value: accounting.formatMoney(currSPDOctober, "฿")
                }, {
                    y: currSPDNovember,
                    month: 11,
                    value: accounting.formatMoney(currSPDNovember, "฿")
                }, {
                    y: currSPDDecember,
                    month: 12,
                    value: accounting.formatMoney(currSPDDecember, "฿")
                }],
                stack: 'new',
                color: '#f8bfba'
            }, {
                type: 'spline',
                name: 'Target ' + year,
                data: [{
                    y: targetOEM1 + targetOEX1 + targetEXP1 + targetSPD1,
                    month: 1,
                    value: accounting.formatMoney(targetOEM1 + targetOEX1 + targetEXP1 + targetSPD1, "฿")
                }, {
                    y: targetOEM2 + targetOEX2 + targetEXP2 + targetSPD2,
                    month: 2,
                    value: accounting.formatMoney(targetOEM2 + targetOEX2 + targetEXP2 + targetSPD2, "฿")
                }, {
                    y: targetOEM3 + targetOEX3 + targetEXP3 + targetSPD3,
                    month: 3,
                    value: accounting.formatMoney(targetOEM3 + targetOEX3 + targetEXP3 + targetSPD3, "฿")
                }, {
                    y: targetOEM4 + targetOEX4 + targetEXP4 + targetSPD4,
                    month: 4,
                    value: accounting.formatMoney(targetOEM4 + targetOEX4 + targetEXP4 + targetSPD4, "฿")
                }, {
                    y: targetOEM5 + targetOEX5 + targetEXP5 + targetSPD5,
                    month: 5,
                    value: accounting.formatMoney(targetOEM5 + targetOEX5 + targetEXP5 + targetSPD5, "฿")
                }, {
                    y: targetOEM6 + targetOEX6 + targetEXP6 + targetSPD6,
                    month: 6,
                    value: accounting.formatMoney(targetOEM6 + targetOEX6 + targetEXP6 + targetSPD6, "฿")
                }, {
                    y: targetOEM7 + targetOEX7 + targetEXP7 + targetSPD7,
                    month: 7,
                    value: accounting.formatMoney(targetOEM7 + targetOEX7 + targetEXP7 + targetSPD7, "฿")
                }, {
                    y: targetOEM8 + targetOEX8 + targetEXP8 + targetSPD8,
                    month: 8,
                    value: accounting.formatMoney(targetOEM8 + targetOEX8 + targetEXP8 + targetSPD8, "฿")
                }, {
                    y: targetOEM9 + targetOEX9 + targetEXP9 + targetSPD9,
                    month: 9,
                    value: accounting.formatMoney(targetOEM9 + targetOEX9 + targetEXP9 + targetSPD9, "฿")
                }, {
                    y: targetOEM10 + targetOEX10 + targetEXP10 + targetSPD10,
                    month: 10,
                    value: accounting.formatMoney(targetOEM10 + targetOEX10 + targetEXP10 + targetSPD10, "฿")
                }, {
                    y: targetOEM11 + targetOEX11 + targetEXP11 + targetSPD11,
                    month: 11,
                    value: accounting.formatMoney(targetOEM11 + targetOEX11 + targetEXP11 + targetSPD11, "฿")
                }, {
                    y: targetOEM12 + targetOEX12 + targetEXP12 + targetSPD12,
                    month: 12,
                    value: accounting.formatMoney(targetOEM12 + targetOEX12 + targetEXP12 + targetSPD12, "฿")
                }],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                color: '#69acde'
            }
        ]
    });

}

function unitGraph(year, targetOEM1, targetOEM2, targetOEM3, targetOEM4, targetOEM5, targetOEM6, targetOEM7, targetOEM8, targetOEM9, targetOEM10, targetOEM11, targetOEM12, targetOEMTotal,
    currOEMJanuary, currOEMFebruary, currOEMMarch, currOEMApril, currOEMMay, currOEMJune, currOEMJuly, currOEMAugust, currOEMSeptember, currOEMOctober, currOEMNovember, currOEMDecember, currOEMTotal,
    oldOEMJanuary, oldOEMFebruary, oldOEMMarch, oldOEMApril, oldOEMMay, oldOEMJune, oldOEMJuly, oldOEMAugust, oldOEMSeptember, oldOEMOctober, oldOEMNovember, oldOEMDecember, oldOEMTotal,
    targetOEX1, targetOEX2, targetOEX3, targetOEX4, targetOEX5, targetOEX6, targetOEX7, targetOEX8, targetOEX9, targetOEX10, targetOEX11, targetOEX12, targetOEXTotal,
    currOEXJanuary, currOEXFebruary, currOEXMarch, currOEXApril, currOEXMay, currOEXJune, currOEXJuly, currOEXAugust, currOEXSeptember, currOEXOctober, currOEXNovember, currOEXDecember, currOEXTotal,
    oldOEXJanuary, oldOEXFebruary, oldOEXMarch, oldOEXApril, oldOEXMay, oldOEXJune, oldOEXJuly, oldOEXAugust, oldOEXSeptember, oldOEXOctober, oldOEXNovember, oldOEXDecember, oldOEXTotal,
    targetEXP1, targetEXP2, targetEXP3, targetEXP4, targetEXP5, targetEXP6, targetEXP7, targetEXP8, targetEXP9, targetEXP10, targetEXP11, targetEXP12, targetEXPTotal,
    currEXPJanuary, currEXPFebruary, currEXPMarch, currEXPApril, currEXPMay, currEXPJune, currEXPJuly, currEXPAugust, currEXPSeptember, currEXPOctober, currEXPNovember, currEXPDecember, currEXPTotal,
    oldEXPJanuary, oldEXPFebruary, oldEXPMarch, oldEXPApril, oldEXPMay, oldEXPJune, oldEXPJuly, oldEXPAugust, oldEXPSeptember, oldEXPOctober, oldEXPNovember, oldEXPDecember, oldEXPTotal,
    targetSPD1, targetSPD2, targetSPD3, targetSPD4, targetSPD5, targetSPD6, targetSPD7, targetSPD8, targetSPD9, targetSPD10, targetSPD11, targetSPD12, targetSPDTotal,
    currSPDJanuary, currSPDFebruary, currSPDMarch, currSPDApril, currSPDMay, currSPDJune, currSPDJuly, currSPDAugust, currSPDSeptember, currSPDOctober, currSPDNovember, currSPDDecember, currSPDTotal,
    oldSPDJanuary, oldSPDFebruary, oldSPDMarch, oldSPDApril, oldSPDMay, oldSPDJune, oldSPDJuly, oldSPDAugust, oldSPDSeptember, oldSPDOctober, oldSPDNovember, oldSPDDecember, oldSPDTotal) {

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
                name: 'OEM ' + (year - 1),
                data: [{
                    y: oldOEMJanuary,
                    month: 1,
                    value: accounting.formatNumber(oldOEMJanuary)
                }, {
                    y: oldOEMFebruary,
                    month: 2,
                    value: accounting.formatNumber(oldOEMFebruary)
                }, {
                    y: oldOEMMarch,
                    month: 3,
                    value: accounting.formatNumber(oldOEMMarch)
                }, {
                    y: oldOEMApril,
                    month: 4,
                    value: accounting.formatNumber(oldOEMApril)
                }, {
                    y: oldOEMMay,
                    month: 5,
                    value: accounting.formatNumber(oldOEMMay)
                }, {
                    y: oldOEMJune,
                    month: 6,
                    value: accounting.formatNumber(oldOEMJune)
                }, {
                    y: oldOEMJuly,
                    month: 7,
                    value: accounting.formatNumber(oldOEMJuly)
                }, {
                    y: oldOEMAugust,
                    month: 8,
                    value: accounting.formatNumber(oldOEMAugust)
                }, {
                    y: oldOEMSeptember,
                    month: 9,
                    value: accounting.formatNumber(oldOEMSeptember)
                }, {
                    y: oldOEMOctober,
                    month: 10,
                    value: accounting.formatNumber(oldOEMOctober)
                }, {
                    y: oldOEMNovember,
                    month: 11,
                    value: accounting.formatNumber(oldOEMNovember)
                }, {
                    y: oldOEMDecember,
                    month: 12,
                    value: accounting.formatNumber(oldOEMDecember)
                }],
                stack: 'old',
                color: '#4285F4'
            }, {
                name: 'OEX ' + (year - 1),
                data: [{
                    y: oldOEXJanuary,
                    month: 1,
                    value: accounting.formatNumber(oldOEXJanuary)
                }, {
                    y: oldOEXFebruary,
                    month: 2,
                    value: accounting.formatNumber(oldOEXFebruary)
                }, {
                    y: oldOEXMarch,
                    month: 3,
                    value: accounting.formatNumber(oldOEXMarch)
                }, {
                    y: oldOEXApril,
                    month: 4,
                    value: accounting.formatNumber(oldOEXApril)
                }, {
                    y: oldOEXMay,
                    month: 5,
                    value: accounting.formatNumber(oldOEXMay)
                }, {
                    y: oldOEXJune,
                    month: 6,
                    value: accounting.formatNumber(oldOEXJune)
                }, {
                    y: oldOEXJuly,
                    month: 7,
                    value: accounting.formatNumber(oldOEXJuly)
                }, {
                    y: oldOEXAugust,
                    month: 8,
                    value: accounting.formatNumber(oldOEXAugust)
                }, {
                    y: oldOEXSeptember,
                    month: 9,
                    value: accounting.formatNumber(oldOEXSeptember)
                }, {
                    y: oldOEXOctober,
                    month: 10,
                    value: accounting.formatNumber(oldOEXOctober)
                }, {
                    y: oldOEXNovember,
                    month: 11,
                    value: accounting.formatNumber(oldOEXNovember)
                }, {
                    y: oldOEXDecember,
                    month: 12,
                    value: accounting.formatNumber(oldOEXDecember)
                }],
                stack: 'old',
                color: '#FBBC05'
            }, {
                name: 'EXP ' + (year - 1),
                data: [{
                    y: oldEXPJanuary,
                    month: 1,
                    value: accounting.formatNumber(oldEXPJanuary)
                }, {
                    y: oldEXPFebruary,
                    month: 2,
                    value: accounting.formatNumber(oldEXPFebruary)
                }, {
                    y: oldEXPMarch,
                    month: 3,
                    value: accounting.formatNumber(oldEXPMarch)
                }, {
                    y: oldEXPApril,
                    month: 4,
                    value: accounting.formatNumber(oldEXPApril)
                }, {
                    y: oldEXPMay,
                    month: 5,
                    value: accounting.formatNumber(oldEXPMay)
                }, {
                    y: oldEXPJune,
                    month: 6,
                    value: accounting.formatNumber(oldEXPJune)
                }, {
                    y: oldEXPJuly,
                    month: 7,
                    value: accounting.formatNumber(oldEXPJuly)
                }, {
                    y: oldEXPAugust,
                    month: 8,
                    value: accounting.formatNumber(oldEXPAugust)
                }, {
                    y: oldEXPSeptember,
                    month: 9,
                    value: accounting.formatNumber(oldEXPSeptember)
                }, {
                    y: oldEXPOctober,
                    month: 10,
                    value: accounting.formatNumber(oldEXPOctober)
                }, {
                    y: oldEXPNovember,
                    month: 11,
                    value: accounting.formatNumber(oldEXPNovember)
                }, {
                    y: oldEXPDecember,
                    month: 12,
                    value: accounting.formatNumber(oldEXPDecember)
                }],
                stack: 'old',
                color: '#34A853'
            }, {
                name: 'SPD ' + (year - 1),
                data: [{
                    y: oldSPDJanuary,
                    month: 1,
                    value: accounting.formatNumber(oldSPDJanuary)
                }, {
                    y: oldSPDFebruary,
                    month: 2,
                    value: accounting.formatNumber(oldSPDFebruary)
                }, {
                    y: oldSPDMarch,
                    month: 3,
                    value: accounting.formatNumber(oldSPDMarch)
                }, {
                    y: oldSPDApril,
                    month: 4,
                    value: accounting.formatNumber(oldSPDApril)
                }, {
                    y: oldSPDMay,
                    month: 5,
                    value: accounting.formatNumber(oldSPDMay)
                }, {
                    y: oldSPDJune,
                    month: 6,
                    value: accounting.formatNumber(oldSPDJune)
                }, {
                    y: oldSPDJuly,
                    month: 7,
                    value: accounting.formatNumber(oldSPDJuly)
                }, {
                    y: oldSPDAugust,
                    month: 8,
                    value: accounting.formatNumber(oldSPDAugust)
                }, {
                    y: oldSPDSeptember,
                    month: 9,
                    value: accounting.formatNumber(oldSPDSeptember)
                }, {
                    y: oldSPDOctober,
                    month: 10,
                    value: accounting.formatNumber(oldSPDOctober)
                }, {
                    y: oldSPDNovember,
                    month: 11,
                    value: accounting.formatNumber(oldSPDNovember)
                }, {
                    y: oldSPDDecember,
                    month: 12,
                    value: accounting.formatNumber(oldSPDDecember)
                }],
                stack: 'old',
                color: '#EA4335'
            },
            {
                name: 'OEM ' + year,
                data: [{
                    y: currOEMJanuary,
                    month: 1,
                    value: accounting.formatNumber(currOEMJanuary)
                }, {
                    y: currOEMFebruary,
                    month: 2,
                    value: accounting.formatNumber(currOEMFebruary)
                }, {
                    y: currOEMMarch,
                    month: 3,
                    value: accounting.formatNumber(currOEMMarch)
                }, {
                    y: currOEMApril,
                    month: 4,
                    value: accounting.formatNumber(currOEMApril)
                }, {
                    y: currOEMMay,
                    month: 5,
                    value: accounting.formatNumber(currOEMMay)
                }, {
                    y: currOEMJune,
                    month: 6,
                    value: accounting.formatNumber(currOEMJune)
                }, {
                    y: currOEMJuly,
                    month: 7,
                    value: accounting.formatNumber(currOEMJuly)
                }, {
                    y: currOEMAugust,
                    month: 8,
                    value: accounting.formatNumber(currOEMAugust)
                }, {
                    y: currOEMSeptember,
                    month: 9,
                    value: accounting.formatNumber(currOEMSeptember)
                }, {
                    y: currOEMOctober,
                    month: 10,
                    value: accounting.formatNumber(currOEMOctober)
                }, {
                    y: currOEMNovember,
                    month: 11,
                    value: accounting.formatNumber(currOEMNovember)
                }, {
                    y: currOEMDecember,
                    month: 12,
                    value: accounting.formatNumber(currOEMDecember)
                }],
                stack: 'new',
                color: '#b7d1fb'
            }, {
                name: 'OEX ' + year,
                data: [{
                    y: currOEXJanuary,
                    month: 1,
                    value: accounting.formatNumber(currOEXJanuary)
                }, {
                    y: currOEXFebruary,
                    month: 2,
                    value: accounting.formatNumber(currOEXFebruary)
                }, {
                    y: currOEXMarch,
                    month: 3,
                    value: accounting.formatNumber(currOEXMarch)
                }, {
                    y: currOEXApril,
                    month: 4,
                    value: accounting.formatNumber(currOEXApril)
                }, {
                    y: currOEXMay,
                    month: 5,
                    value: accounting.formatNumber(currOEXMay)
                }, {
                    y: currOEXJune,
                    month: 6,
                    value: accounting.formatNumber(currOEXJune)
                }, {
                    y: currOEXJuly,
                    month: 7,
                    value: accounting.formatNumber(currOEXJuly)
                }, {
                    y: currOEXAugust,
                    month: 8,
                    value: accounting.formatNumber(currOEXAugust)
                }, {
                    y: currOEXSeptember,
                    month: 9,
                    value: accounting.formatNumber(currOEXSeptember)
                }, {
                    y: currOEXOctober,
                    month: 10,
                    value: accounting.formatNumber(currOEXOctober)
                }, {
                    y: currOEXNovember,
                    month: 11,
                    value: accounting.formatNumber(currOEXNovember)
                }, {
                    y: currOEXDecember,
                    month: 12,
                    value: accounting.formatNumber(currOEXDecember)
                }],
                stack: 'new',
                color: '#feebb4'
            }, {
                name: 'EXP ' + year,
                data: [{
                    y: currEXPJanuary,
                    month: 1,
                    value: accounting.formatNumber(currEXPJanuary)
                }, {
                    y: currEXPFebruary,
                    month: 2,
                    value: accounting.formatNumber(currEXPFebruary)
                }, {
                    y: currEXPMarch,
                    month: 3,
                    value: accounting.formatNumber(currEXPMarch)
                }, {
                    y: currEXPApril,
                    month: 4,
                    value: accounting.formatNumber(currEXPApril)
                }, {
                    y: currEXPMay,
                    month: 5,
                    value: accounting.formatNumber(currEXPMay)
                }, {
                    y: currEXPJune,
                    month: 6,
                    value: accounting.formatNumber(currEXPJune)
                }, {
                    y: currEXPJuly,
                    month: 7,
                    value: accounting.formatNumber(currEXPJuly)
                }, {
                    y: currEXPAugust,
                    month: 8,
                    value: accounting.formatNumber(currEXPAugust)
                }, {
                    y: currEXPSeptember,
                    month: 9,
                    value: accounting.formatNumber(currEXPSeptember)
                }, {
                    y: currEXPOctober,
                    month: 10,
                    value: accounting.formatNumber(currEXPOctober)
                }, {
                    y: currEXPNovember,
                    month: 11,
                    value: accounting.formatNumber(currEXPNovember)
                }, {
                    y: currEXPDecember,
                    month: 12,
                    value: accounting.formatNumber(currEXPDecember)
                }],
                stack: 'new',
                color: '#c4edcf'
            }, {
                name: 'SPD ' + year,
                data: [{
                    y: currSPDJanuary,
                    month: 1,
                    value: accounting.formatNumber(currSPDJanuary)
                }, {
                    y: currSPDFebruary,
                    month: 2,
                    value: accounting.formatNumber(currSPDFebruary)
                }, {
                    y: currSPDMarch,
                    month: 3,
                    value: accounting.formatNumber(currSPDMarch)
                }, {
                    y: currSPDApril,
                    month: 4,
                    value: accounting.formatNumber(currSPDApril)
                }, {
                    y: currSPDMay,
                    month: 5,
                    value: accounting.formatNumber(currSPDMay)
                }, {
                    y: currSPDJune,
                    month: 6,
                    value: accounting.formatNumber(currSPDJune)
                }, {
                    y: currSPDJuly,
                    month: 7,
                    value: accounting.formatNumber(currSPDJuly)
                }, {
                    y: currSPDAugust,
                    month: 8,
                    value: accounting.formatNumber(currSPDAugust)
                }, {
                    y: currSPDSeptember,
                    month: 9,
                    value: accounting.formatNumber(currSPDSeptember)
                }, {
                    y: currSPDOctober,
                    month: 10,
                    value: accounting.formatNumber(currSPDOctober)
                }, {
                    y: currSPDNovember,
                    month: 11,
                    value: accounting.formatNumber(currSPDNovember)
                }, {
                    y: currSPDDecember,
                    month: 12,
                    value: accounting.formatNumber(currSPDDecember)
                }],
                stack: 'new',
                color: '#f8bfba'
            }, {
                type: 'spline',
                name: 'Target ' + year,
                data: [{
                    y: targetOEM1 + targetOEX1 + targetEXP1 + targetSPD1,
                    month: 1,
                    value: accounting.formatNumber(targetOEM1 + targetOEX1 + targetEXP1 + targetSPD1)
                }, {
                    y: targetOEM2 + targetOEX2 + targetEXP2 + targetSPD2,
                    month: 2,
                    value: accounting.formatNumber(targetOEM2 + targetOEX2 + targetEXP2 + targetSPD2)
                }, {
                    y: targetOEM3 + targetOEX3 + targetEXP3 + targetSPD3,
                    month: 3,
                    value: accounting.formatNumber(targetOEM3 + targetOEX3 + targetEXP3 + targetSPD3)
                }, {
                    y: targetOEM4 + targetOEX4 + targetEXP4 + targetSPD4,
                    month: 4,
                    value: accounting.formatNumber(targetOEM4 + targetOEX4 + targetEXP4 + targetSPD4)
                }, {
                    y: targetOEM5 + targetOEX5 + targetEXP5 + targetSPD5,
                    month: 5,
                    value: accounting.formatNumber(targetOEM5 + targetOEX5 + targetEXP5 + targetSPD5)
                }, {
                    y: targetOEM6 + targetOEX6 + targetEXP6 + targetSPD6,
                    month: 6,
                    value: accounting.formatNumber(targetOEM6 + targetOEX6 + targetEXP6 + targetSPD6)
                }, {
                    y: targetOEM7 + targetOEX7 + targetEXP7 + targetSPD7,
                    month: 7,
                    value: accounting.formatNumber(targetOEM7 + targetOEX7 + targetEXP7 + targetSPD7)
                }, {
                    y: targetOEM8 + targetOEX8 + targetEXP8 + targetSPD8,
                    month: 8,
                    value: accounting.formatNumber(targetOEM8 + targetOEX8 + targetEXP8 + targetSPD8)
                }, {
                    y: targetOEM9 + targetOEX9 + targetEXP9 + targetSPD9,
                    month: 9,
                    value: accounting.formatNumber(targetOEM9 + targetOEX9 + targetEXP9 + targetSPD9)
                }, {
                    y: targetOEM10 + targetOEX10 + targetEXP10 + targetSPD10,
                    month: 10,
                    value: accounting.formatNumber(targetOEM10 + targetOEX10 + targetEXP10 + targetSPD10)
                }, {
                    y: targetOEM11 + targetOEX11 + targetEXP11 + targetSPD11,
                    month: 11,
                    value: accounting.formatNumber(targetOEM11 + targetOEX11 + targetEXP11 + targetSPD11)
                }, {
                    y: targetOEM12 + targetOEX12 + targetEXP12 + targetSPD12,
                    month: 12,
                    value: accounting.formatNumber(targetOEM12 + targetOEX12 + targetEXP12 + targetSPD12)
                }],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                color: '#69acde'
            }
        ]
    });

}

function bahtYBTH(year, BPerOEM, BPerOEX, BPerEXP, BPerSPD, OEMBahtResult, OEXBahtResult, EXPBahtResult, SPDBahtResult) {

    // Create the chart
    $('#bahtYBTH').highcharts({
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
                cursor: 'pointer'
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
            colorByPoint: true,
            data: [{
                    name: 'OEM',
                    code: 'OEM',
                    y: BPerOEM,
                    value: accounting.formatMoney(OEMBahtResult, "฿"),
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: BPerOEX,
                    value: accounting.formatMoney(OEXBahtResult, "฿")
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: BPerEXP,
                    value: accounting.formatMoney(EXPBahtResult, "฿")
                },
                {
                    name: 'SPD',
                    code: 'SPD',
                    y: BPerSPD,
                    value: accounting.formatMoney(SPDBahtResult, "฿")
                }
            ]
        }]
    })
}

function unitYBTH(year, UPerOEM, UPerOEX, UPerEXP, UPerSPD, OEMUnitResult, OEXUnitResult, EXPUnitResult, SPDUnitResult) {

    // Create the chart
    $('#unitYBTH').highcharts({
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
                    name: 'OEM',
                    code: 'OEM',
                    y: UPerOEM,
                    value: accounting.formatNumber(OEMUnitResult)
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: UPerOEX,
                    value: accounting.formatNumber(OEXUnitResult)
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: UPerEXP,
                    value: accounting.formatNumber(EXPUnitResult)
                },
                {
                    name: 'SPD',
                    code: 'SPD',
                    y: UPerSPD,
                    value: accounting.formatNumber(SPDUnitResult)
                }
            ]
        }]
    })
}

function bahtYBTH2(year, BPerOEM, BPerOEX, BPerEXP, OEMBahtResult, OEXBahtResult, EXPBahtResult) {

    // Create the chart
    $('#bahtYBTH2').highcharts({
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
                    name: 'OEM',
                    code: 'OEM',
                    y: BPerOEM,
                    value: accounting.formatMoney(OEMBahtResult, "฿")
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: BPerOEX,
                    value: accounting.formatMoney(OEXBahtResult, "฿")
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: BPerEXP,
                    value: accounting.formatMoney(EXPBahtResult, "฿")
                }
            ]
        }]
    })
}

function unitYBTH2(year, UPerOEM, UPerOEX, UPerEXP, OEMUnitResult, OEXUnitResult, EXPUnitResult) {

    // Create the chart
    $('#unitYBTH2').highcharts({
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
                    name: 'OEM',
                    code: 'OEM',
                    y: UPerOEM,
                    value: accounting.formatNumber(OEMUnitResult)
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: UPerOEX,
                    value: accounting.formatNumber(OEXUnitResult)
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: UPerEXP,
                    value: accounting.formatNumber(EXPUnitResult)
                }
            ]
        }]
    })
}

function bahtYBTH3(year, BPerOEM, BPerOEX, BPerEXP, OEMBahtResult, OEXBahtResult, EXPBahtResult) {

    // Create the chart
    $('#bahtYBTH3').highcharts({
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
                    name: 'OEM',
                    code: 'OEM',
                    y: BPerOEM,
                    value: accounting.formatMoney(OEMBahtResult, "฿")
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: BPerOEX,
                    value: accounting.formatMoney(OEXBahtResult, "฿")
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: BPerEXP,
                    value: accounting.formatMoney(EXPBahtResult, "฿")
                }
            ]
        }]
    })
}

function unitYBTH3(year, UPerOEM, UPerOEX, UPerEXP, OEMUnitResult, OEXUnitResult, EXPUnitResult) {

    // Create the chart
    $('#unitYBTH3').highcharts({
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
                    name: 'OEM',
                    code: 'OEM',
                    y: UPerOEM,
                    value: accounting.formatNumber(OEMUnitResult)
                },
                {
                    name: 'OEX',
                    code: 'OEX',
                    y: UPerOEX,
                    value: accounting.formatNumber(OEXUnitResult)
                },
                {
                    name: 'EXP',
                    code: 'EXP',
                    y: UPerEXP,
                    value: accounting.formatNumber(EXPUnitResult)
                }
            ]
        }]
    })
}

function bahtYBTH4(year, BPerSPD, SPDBahtResult) {

    // Create the chart
    $('#bahtYBTH4').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: BPerSPD,
                value: accounting.formatMoney(SPDBahtResult, "฿")
            }]
        }]
    })
}

function unitYBTH4(year, UPerSPD, SPDUnitResult) {

    // Create the chart
    $('#unitYBTH4').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: UPerSPD,
                value: accounting.formatNumber(SPDUnitResult)
            }]
        }]
    })
}

function bahtYBTH5(year, BPerSPD, SPDBahtResult) {

    // Create the chart
    $('#bahtYBTH5').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: BPerSPD,
                value: accounting.formatMoney(SPDBahtResult, "฿")
            }]
        }]
    })
}

function unitYBTH5(year, UPerSPD, SPDUnitResult) {

    // Create the chart
    $('#unitYBTH5').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: UPerSPD,
                value: accounting.formatNumber(SPDUnitResult)
            }]
        }]
    })
}

function bahtYBTH6(year, BPerSPD, SPDBahtResult) {

    // Create the chart
    $('#bahtYBTH6').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: BPerSPD,
                value: accounting.formatMoney(SPDBahtResult, "฿")
            }]
        }]
    })
}

function unitYBTH6(year, UPerSPD, SPDUnitResult) {

    // Create the chart
    $('#unitYBTH6').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: UPerSPD,
                value: accounting.formatNumber(SPDUnitResult)
            }]
        }]
    })
}

function bahtYBTH7(year, BPerSPD, SPDBahtResult) {

    // Create the chart
    $('#bahtYBTH7').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: BPerSPD,
                value: accounting.formatMoney(SPDBahtResult, "฿")
            }]
        }]
    })
}

function unitYBTH7(year, UPerSPD, SPDUnitResult) {

    // Create the chart
    $('#unitYBTH7').highcharts({
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
                name: 'SPD',
                code: 'SPD',
                y: UPerSPD,
                value: accounting.formatNumber(SPDUnitResult)
            }]
        }]
    })
}