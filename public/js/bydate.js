$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#reservation').daterangepicker({
        startDate: moment().subtract(6, 'days'),
        endDate: moment(),
        minDate: "01/01/2017",
        maxDate: moment()
    });

    var market = $('#market').val();
    var itemGroup = $('#itemGroup').val();
    var startDate = $('#reservation').data('daterangepicker').startDate;
    var endDate = $('#reservation').data('daterangepicker').endDate;
    selectData(market, itemGroup, startDate.format('YYYY'), endDate.format('YYYY'), startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));


    $('#reservation').on('apply.daterangepicker', function(ev, picker) {
        var market = $('#market').val();
        var itemGroup = $('#itemGroup').val();
        var startDate = picker.startDate;
        var endDate = picker.endDate;
        selectData(market, itemGroup, startDate.format('YYYY'), endDate.format('YYYY'), startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));
    });

    $("#market").change(function() {
        var market = $(this).val();
        var itemGroup = $('#itemGroup').val();
        var startDate = $('#reservation').data('daterangepicker').startDate;
        var endDate = $('#reservation').data('daterangepicker').endDate;
        selectData(market, itemGroup, startDate.format('YYYY'), endDate.format('YYYY'), startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));

    });

    $("#itemGroup").change(function() {
        var itemGroup = $(this).val();
        var market = $('#market').val();
        var startDate = $('#reservation').data('daterangepicker').startDate;
        var endDate = $('#reservation').data('daterangepicker').endDate;
        selectData(market, itemGroup, startDate.format('YYYY'), endDate.format('YYYY'), startDate.format('DD/MM/YYYY'), endDate.format('DD/MM/YYYY'));
    });

});

function selectData(market, itemGroup, startYear, endYear, startDate, endDate) {
    $.ajax({
        beforeSend: function() {
            $("#chartsSection").css("opacity", 0.2);
            $(".loading-img").show();
        },
        url: '/SalesAnalysis/sa/selectByDate',
        type: "POST",
        data: { "market": market, "itemGroup": itemGroup, "startYear": startYear, "endYear": endYear, "startDate": startDate, "endDate": endDate },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {

                calData(data, startDate, endDate, market, itemGroup);
            }

            return false;

        },
        complete: function() {
            $("#chartsSection").css("opacity", 1);
            $(".loading-img").hide();
        }
    });
}

function calData(data, startDate, endDate, market, itemGroup) {
    var results = data[0];
    var totalUnit = 0,
        totalBaht = 0;
    var REM_AB_Unit = 0,
        REM_MB_Unit = 0,
        REM_EB_Unit = 0,
        REM_OT_Unit = 0,
        REM_PR_Unit = 0;
    var MTD_AB_Unit = 0,
        MTD_MB_Unit = 0,
        MTD_EB_Unit = 0,
        MTD_OT_Unit = 0,
        MTD_PR_Unit = 0;
    var SPD_AB_Unit = 0,
        SPD_MB_Unit = 0,
        SPD_EB_Unit = 0,
        SPD_OT_Unit = 0,
        SPD_PR_Unit = 0;
    var ST_AB_Unit = 0,
        ST_MB_Unit = 0,
        ST_EB_Unit = 0,
        ST_OT_Unit = 0,
        ST_PR_Unit = 0;
    var REM_AB_Baht = 0,
        REM_MB_Baht = 0,
        REM_EB_Baht = 0,
        REM_OT_Baht = 0,
        REM_PR_Baht = 0;
    var MTD_AB_Baht = 0,
        MTD_MB_Baht = 0,
        MTD_EB_Baht = 0,
        MTD_OT_Baht = 0,
        MTD_PR_Baht = 0;
    var SPD_AB_Baht = 0,
        SPD_MB_Baht = 0,
        SPD_EB_Baht = 0,
        SPD_OT_Baht = 0,
        SPD_PR_Baht = 0;
    var ST_AB_Baht = 0,
        ST_MB_Baht = 0,
        ST_EB_Baht = 0,
        ST_OT_Baht = 0,
        ST_PR_Baht = 0;

    $.each(results, function() {

        if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Automotive Battery') {
            REM_AB_Unit += parseFloat(this.Quantity);
            REM_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Motorcycle Battery') {
            REM_MB_Unit += parseFloat(this.Quantity);
            REM_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Electric Battery') {
            REM_EB_Unit += parseFloat(this.Quantity);
            REM_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Premium') {
            REM_PR_Unit += parseFloat(this.Quantity);
            REM_PR_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Others') {
            REM_OT_Unit += parseFloat(this.Quantity);
            REM_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Automotive Battery') {
            MTD_AB_Unit += parseFloat(this.Quantity);
            MTD_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Motorcycle Battery') {
            MTD_MB_Unit += parseFloat(this.Quantity);
            MTD_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Electric Battery') {
            MTD_EB_Unit += parseFloat(this.Quantity);
            MTD_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Premium') {
            MTD_PR_Unit += parseFloat(this.Quantity);
            MTD_PR_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Others') {
            MTD_OT_Unit += parseFloat(this.Quantity);
            MTD_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Automotive Battery') {
            SPD_AB_Unit += parseFloat(this.Quantity);
            SPD_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Motorcycle Battery') {
            SPD_MB_Unit += parseFloat(this.Quantity);
            SPD_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Electric Battery') {
            SPD_EB_Unit += parseFloat(this.Quantity);
            SPD_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Premium') {
            SPD_PR_Unit += parseFloat(this.Quantity);
            SPD_PR_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Others') {
            SPD_OT_Unit += parseFloat(this.Quantity);
            SPD_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Automotive Battery') {
            ST_AB_Unit += parseFloat(this.Quantity);
            ST_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Motorcycle Battery') {
            ST_MB_Unit += parseFloat(this.Quantity);
            ST_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Electric Battery') {
            ST_EB_Unit += parseFloat(this.Quantity);
            ST_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Premium') {
            ST_PR_Unit += parseFloat(this.Quantity);
            ST_PR_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Others') {
            ST_OT_Unit += parseFloat(this.Quantity);
            ST_OT_Baht += parseFloat(this.Total);
        }

        totalUnit += parseFloat(this.Quantity);
        totalBaht += parseFloat(this.Total);
    });

    //Total Right
    var ABUnitResult = REM_AB_Unit + MTD_AB_Unit + SPD_AB_Unit + ST_AB_Unit;
    var ABBahtResult = REM_AB_Baht + MTD_AB_Baht + SPD_AB_Baht + ST_AB_Baht;
    var MBUnitResult = REM_MB_Unit + MTD_MB_Unit + SPD_MB_Unit + ST_MB_Unit;
    var MBBahtResult = REM_MB_Baht + MTD_MB_Baht + SPD_MB_Baht + ST_MB_Baht;
    var EBUnitResult = REM_EB_Unit + MTD_EB_Unit + SPD_EB_Unit + ST_EB_Unit;
    var EBBahtResult = REM_EB_Baht + MTD_EB_Baht + SPD_EB_Baht + ST_EB_Baht;
    var OTUnitResult = REM_OT_Unit + MTD_OT_Unit + SPD_OT_Unit + ST_OT_Unit;
    var OTBahtResult = REM_OT_Baht + MTD_OT_Baht + SPD_OT_Baht + ST_OT_Baht;
    var PRUnitResult = REM_PR_Unit + MTD_PR_Unit + SPD_PR_Unit + ST_PR_Unit;
    var PRBahtResult = REM_PR_Baht + MTD_PR_Baht + SPD_PR_Baht + ST_PR_Baht;

    //Total Bottom
    var REMUnitResult = REM_AB_Unit + REM_MB_Unit + REM_EB_Unit + REM_PR_Unit + REM_OT_Unit;
    var REMBahtResult = REM_AB_Baht + REM_MB_Baht + REM_EB_Baht + REM_PR_Baht + REM_OT_Baht;
    var MTDUnitResult = MTD_AB_Unit + MTD_MB_Unit + MTD_EB_Unit + MTD_PR_Unit + MTD_OT_Unit;
    var MTDBahtResult = MTD_AB_Baht + MTD_MB_Baht + MTD_EB_Baht + MTD_PR_Baht + MTD_OT_Baht;
    var SPDUnitResult = SPD_AB_Unit + SPD_MB_Unit + SPD_EB_Unit + SPD_PR_Unit + SPD_OT_Unit;
    var SPDBahtResult = SPD_AB_Baht + SPD_MB_Baht + SPD_EB_Baht + SPD_PR_Baht + SPD_OT_Baht;
    var STUnitResult = ST_AB_Unit + ST_MB_Unit + ST_EB_Unit + ST_PR_Unit + ST_OT_Unit;
    var STBahtResult = ST_AB_Baht + ST_MB_Baht + ST_EB_Baht + ST_PR_Baht + ST_OT_Baht;

    if (totalUnit == 0 && totalBaht == 0) {
        //Hide Charts
        $('#chartsSection').css("display", "none");
    } else {
        //Show Charts
        $('#chartsSection').css("display", "block");
        tableCreate(market, itemGroup, REM_AB_Unit, MTD_AB_Unit, SPD_AB_Unit, ST_AB_Unit, REM_MB_Unit, MTD_MB_Unit, SPD_MB_Unit, ST_MB_Unit, REM_EB_Unit, MTD_EB_Unit, SPD_EB_Unit, ST_EB_Unit, REM_OT_Unit, MTD_OT_Unit, SPD_OT_Unit, ST_OT_Unit, REM_PR_Unit, MTD_PR_Unit, SPD_PR_Unit, ST_PR_Unit, REM_OT_Baht, MTD_OT_Baht, SPD_OT_Baht, ST_OT_Baht, REM_PR_Baht, MTD_PR_Baht, SPD_PR_Baht, ST_PR_Baht, REM_EB_Baht, MTD_EB_Baht, SPD_EB_Baht, ST_EB_Baht, REM_MB_Baht, MTD_MB_Baht, SPD_MB_Baht, ST_MB_Baht, REM_AB_Baht, MTD_AB_Baht, SPD_AB_Baht, ST_AB_Baht, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult, PRUnitResult, PRBahtResult, REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult, totalUnit, totalBaht);
    }
}

function tableCreate(market, itemGroup, REM_AB_Unit, MTD_AB_Unit, SPD_AB_Unit, ST_AB_Unit, REM_MB_Unit, MTD_MB_Unit, SPD_MB_Unit, ST_MB_Unit, REM_EB_Unit, MTD_EB_Unit, SPD_EB_Unit, ST_EB_Unit, REM_OT_Unit, MTD_OT_Unit, SPD_OT_Unit, ST_OT_Unit, REM_PR_Unit, MTD_PR_Unit, SPD_PR_Unit, ST_PR_Unit, REM_OT_Baht, MTD_OT_Baht, SPD_OT_Baht, ST_OT_Baht, REM_PR_Baht, MTD_PR_Baht, SPD_PR_Baht, ST_PR_Baht, REM_EB_Baht, MTD_EB_Baht, SPD_EB_Baht, ST_EB_Baht, REM_MB_Baht, MTD_MB_Baht, SPD_MB_Baht, ST_MB_Baht, REM_AB_Baht, MTD_AB_Baht, SPD_AB_Baht, ST_AB_Baht, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult, PRUnitResult, PRBahtResult, REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult, totalUnit, totalBaht) {

    $("#createtable").empty();

    var table = '<table class="table table-bordered" style="font-size: 16px; height: 360px;"><thead><tr style="text-align:center;" bgcolor="#b6dde8"><th rowspan="2" style="vertical-align:middle; text-align:center;" >Type</th>';

    if (market == "REM") {
        table += '<th colspan="2" style="text-align:center;">REM</th>';
    } else if (market == "MTD") {
        table += '<th colspan="2" style="text-align:center;">MTD</th>';
    } else if (market == "SPD") {
        table += '<th colspan="2" style="text-align:center;">SPD</th>';
    } else if (market == "ST") {
        table += '<th colspan="2" style="text-align:center;">Staff</th>';
    } else if (market == "All") {
        table += '<th colspan="2" style="text-align:center;">REM</th>';
        table += '<th colspan="2" style="text-align:center;">MTD</th>';
        table += '<th colspan="2" style="text-align:center;">SPD</th>';
        table += '<th colspan="2" style="text-align:center;">Staff</th>';
    }

    table += '<th colspan="2" style="text-align:center;">Total</th> </tr>';
    table += '<tr style="text-align:center;" bgcolor="#b6dde8">';

    if (market == "REM") {
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
    } else if (market == "MTD") {
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
    } else if (market == "SPD") {
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
    } else if (market == "ST") {
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
    } else if (market == "All") {
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
        table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th>';
    }

    table += '<th style="text-align:center;">Unit</th><th style="text-align:center;">Baht</th> </tr> </thead>';
    table += '<tfoot> <tr style="text-align:center;" bgcolor="#b6dde8"><td bgcolor="#b6dde8"><b>Total</b></td>';

    if (market == "REM") {
        table += '<td id="REM_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(REMUnitResult) + '</td> <td id="REM_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(REMBahtResult, "฿") + '</td>';
    } else if (market == "MTD") {
        table += '<td id="MTD_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MTDUnitResult) + '</td> <td id="MTD_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MTDBahtResult, "฿") + '</td>';
    } else if (market == "SPD") {
        table += '<td id="SPD_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(SPDUnitResult) + '</td> <td id="SPD_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(SPDBahtResult, "฿") + '</td>';
    } else if (market == "ST") {
        table += '<td id="ST_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(STUnitResult) + '</td> <td id="ST_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(STBahtResult, "฿") + '</td>';
    } else if (market == "All") {
        table += '<td id="REM_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(REMUnitResult) + '</td> <td id="REM_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(REMBahtResult, "฿") + '</td>';
        table += '<td id="MTD_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MTDUnitResult) + '</td> <td id="MTD_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MTDBahtResult, "฿") + '</td>';
        table += '<td id="SPD_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(SPDUnitResult) + '</td> <td id="SPD_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(SPDBahtResult, "฿") + '</td>';
        table += '<td id="ST_Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(STUnitResult) + '</td> <td id="ST_Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(STBahtResult, "฿") + '</td>';
    }

    table += '<td id="Total_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(totalUnit) + '</td> <td id="Total_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(totalBaht, "฿") + '</td> </tr> </tfoot>';
    table += '<tbody>';

    if (itemGroup == 'Automotive Battery') {
        table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';

        if (market == "REM") {
            table += '<td id="REM_AB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_AB_Unit) + '</td> <td id="REM_AB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_AB_Baht, "฿") + '</td>';
        } else if (market == "MTD") {
            table += '<td id="MTD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_AB_Unit) + '</td> <td id="MTD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_AB_Baht, "฿") + '</td>';
        } else if (market == "SPD") {
            table += '<td id="SPD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_AB_Unit) + '</td> <td id="SPD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_AB_Baht, "฿") + '</td>';
        } else if (market == "ST") {
            table += '<td id="ST_AB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_AB_Unit) + '</td> <td id="ST_AB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_AB_Baht, "฿") + '</td>';
        } else if (market == "All") {
            table += '<td id="REM_AB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_AB_Unit) + '</td> <td id="REM_AB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_AB_Baht, "฿") + '</td>';
            table += '<td id="MTD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_AB_Unit) + '</td> <td id="MTD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_AB_Baht, "฿") + '</td>';
            table += '<td id="SPD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_AB_Unit) + '</td> <td id="SPD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_AB_Baht, "฿") + '</td>';
            table += '<td id="ST_AB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_AB_Unit) + '</td> <td id="ST_AB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_AB_Baht, "฿") + '</td>';
        }

        table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(ABBahtResult, "฿") + '</td> </tr>';
    } else if (itemGroup == 'Motorcycle Battery') {
        table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';

        if (market == "REM") {
            table += '<td id="REM_MB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_MB_Unit) + '</td> <td id="REM_MB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_MB_Baht, "฿") + '</td>';
        } else if (market == "MTD") {
            table += '<td id="MTD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_MB_Unit) + '</td> <td id="MTD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_MB_Baht, "฿") + '</td>';
        } else if (market == "SPD") {
            table += '<td id="SPD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_MB_Unit) + '</td> <td id="SPD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_MB_Baht, "฿") + '</td>';
        } else if (market == "ST") {
            table += ' <td id="ST_MB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_MB_Unit) + '</td> <td id="ST_MB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_MB_Baht, "฿") + '</td>';
        } else if (market == "All") {
            table += '<td id="REM_MB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_MB_Unit) + '</td> <td id="REM_MB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_MB_Baht, "฿") + '</td>';
            table += '<td id="MTD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_MB_Unit) + '</td> <td id="MTD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_MB_Baht, "฿") + '</td>';
            table += '<td id="SPD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_MB_Unit) + '</td> <td id="SPD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_MB_Baht, "฿") + '</td>';
            table += ' <td id="ST_MB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_MB_Unit) + '</td> <td id="ST_MB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_MB_Baht, "฿") + '</td>';
        }

        table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';
    } else if (itemGroup == 'Electric Battery') {
        table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';

        if (market == "REM") {
            table += '<td id="REM_EB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_EB_Unit) + '</td> <td id="REM_EB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_EB_Baht, "฿") + '</td>';
        } else if (market == "MTD") {
            table += '<td id="MTD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_EB_Unit) + '</td> <td id="MTD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_EB_Baht, "฿") + '</td>';
        } else if (market == "SPD") {
            table += '<td id="SPD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_EB_Unit) + '</td> <td id="SPD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_EB_Baht, "฿") + '</td>';
        } else if (market == "ST") {
            table += '<td id="ST_EB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_EB_Unit) + '</td> <td id="ST_EB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_EB_Baht, "฿") + '</td>';
        } else if (market == "All") {
            table += '<td id="REM_EB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_EB_Unit) + '</td> <td id="REM_EB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_EB_Baht, "฿") + '</td>';
            table += '<td id="MTD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_EB_Unit) + '</td> <td id="MTD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_EB_Baht, "฿") + '</td>';
            table += '<td id="SPD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_EB_Unit) + '</td> <td id="SPD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_EB_Baht, "฿") + '</td>';
            table += '<td id="ST_EB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_EB_Unit) + '</td> <td id="ST_EB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_EB_Baht, "฿") + '</td>';
        }

        table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';
    } else if (itemGroup == 'Premium') {
        table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';

        if (market == "REM") {
            table += '<td id="REM_PR_Unit" style="text-align: right;">' + accounting.formatNumber(REM_PR_Unit) + '</td> <td id="REM_PR_Baht" style="text-align: right;">' + accounting.formatMoney(REM_PR_Baht, "฿") + '</td>';
        } else if (market == "MTD") {
            table += '<td id="MTD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_PR_Unit) + '</td> <td id="MTD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_PR_Baht, "฿") + '</td>';
        } else if (market == "SPD") {
            table += '<td id="SPD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="SPD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_PR_Baht, "฿") + '</td>';
        } else if (market == "ST") {
            table += ' <td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatMoney(SPD_PR_Baht, "฿") + '</td>';
        } else if (market == "All") {
            table += '<td id="REM_PR_Unit" style="text-align: right;">' + accounting.formatNumber(REM_PR_Unit) + '</td> <td id="REM_PR_Baht" style="text-align: right;">' + accounting.formatMoney(REM_PR_Baht, "฿") + '</td>';
            table += '<td id="MTD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_PR_Unit) + '</td> <td id="MTD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_PR_Baht, "฿") + '</td>';
            table += '<td id="SPD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="SPD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_PR_Baht, "฿") + '</td>';
            table += '<td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatNumber(ST_PR_Unit) + '</td> <td id="ST_PR_Baht" style="text-align: right;">' + accounting.formatMoney(ST_PR_Baht, "฿") + '</td>';
        }

        table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';
    } else if (itemGroup == 'Others') {

        table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';

        if (market == "REM") {
            table += '<td id="REM_OT_Unit" style="text-align: right;">' + accounting.formatNumber(REM_OT_Unit) + '</td> <td id="REM_OT_Baht" style="text-align: right;">' + accounting.formatMoney(REM_OT_Baht, "฿") + '</td>';
        } else if (market == "MTD") {
            table += '<td id="MTD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_OT_Unit) + '</td> <td id="MTD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_OT_Baht, "฿") + '</td>';
        } else if (market == "SPD") {
            table += '<td id="SPD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_OT_Unit) + '</td> <td id="SPD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_OT_Baht, "฿") + '</td>';
        } else if (market == "ST") {
            table += '<td id="ST_OT_Unit" style="text-align: right;">' + accounting.formatNumber(ST_OT_Unit) + '</td> <td id="ST_OT_Baht" style="text-align: right;">' + accounting.formatMoney(ST_OT_Baht, "฿") + '</td>';
        } else if (market == "All") {
            table += '<td id="REM_OT_Unit" style="text-align: right;">' + accounting.formatNumber(REM_OT_Unit) + '</td> <td id="REM_OT_Baht" style="text-align: right;">' + accounting.formatMoney(REM_OT_Baht, "฿") + '</td>';
            table += '<td id="MTD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_OT_Unit) + '</td> <td id="MTD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_OT_Baht, "฿") + '</td>';
            table += '<td id="SPD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_OT_Unit) + '</td> <td id="SPD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_OT_Baht, "฿") + '</td>';
            table += '<td id="ST_OT_Unit" style="text-align: right;">' + accounting.formatNumber(ST_OT_Unit) + '</td> <td id="ST_OT_Baht" style="text-align: right;">' + accounting.formatMoney(ST_OT_Baht, "฿") + '</td>';
        }

        table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
    } else if (itemGroup == 'All') {

        if (market == "REM") {
            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';
            table += '<td id="REM_AB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_AB_Unit) + '</td> <td id="REM_AB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_AB_Baht, "฿") + '</td>';
            table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABBahtResult) + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';
            table += '<td id="REM_MB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_MB_Unit) + '</td> <td id="REM_MB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_MB_Baht, "฿") + '</td>';
            table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';
            table += '<td id="REM_EB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_EB_Unit) + '</td> <td id="REM_EB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_EB_Baht, "฿") + '</td>';
            table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';
            table += '<td id="REM_PR_Unit" style="text-align: right;">' + accounting.formatNumber(REM_PR_Unit) + '</td> <td id="REM_PR_Baht" style="text-align: right;">' + accounting.formatMoney(REM_PR_Baht, "฿") + '</td>';
            table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';
            table += '<td id="REM_OT_Unit" style="text-align: right;">' + accounting.formatNumber(REM_OT_Unit) + '</td> <td id="REM_OT_Baht" style="text-align: right;">' + accounting.formatMoney(REM_OT_Baht, "฿") + '</td>';
            table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
        } else if (market == "MTD") {
            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';
            table += '<td id="MTD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_AB_Unit) + '</td> <td id="MTD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_AB_Baht, "฿") + '</td>';
            table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABBahtResult) + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';
            table += '<td id="MTD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_MB_Unit) + '</td> <td id="MTD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_MB_Baht, "฿") + '</td>';
            table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';
            table += '<td id="MTD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_EB_Unit) + '</td> <td id="MTD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_EB_Baht, "฿") + '</td>';
            table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';
            table += '<td id="MTD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_PR_Unit) + '</td> <td id="MTD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_PR_Baht, "฿") + '</td>';
            table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';
            table += '<td id="MTD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_OT_Unit) + '</td> <td id="MTD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_OT_Baht, "฿") + '</td>';
            table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
        } else if (market == "SPD") {
            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';
            table += '<td id="SPD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_AB_Unit) + '</td> <td id="SPD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_AB_Baht, "฿") + '</td>';
            table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABBahtResult) + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';
            table += '<td id="SPD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_MB_Unit) + '</td> <td id="SPD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_MB_Baht, "฿") + '</td>';
            table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';
            table += '<td id="SPD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_EB_Unit) + '</td> <td id="SPD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_EB_Baht, "฿") + '</td>';
            table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';
            table += '<td id="SPD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="SPD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_PR_Baht, "฿") + '</td>';
            table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';
            table += '<td id="SPD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_OT_Unit) + '</td> <td id="SPD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_OT_Baht, "฿") + '</td>';
            table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
        } else if (market == "ST") {
            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';
            table += '<td id="ST_AB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_AB_Unit) + '</td> <td id="ST_AB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_AB_Baht, "฿") + '</td>';
            table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABBahtResult) + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';
            table += ' <td id="ST_MB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_MB_Unit) + '</td> <td id="ST_MB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_MB_Baht, "฿") + '</td>';
            table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';
            table += '<td id="ST_EB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_EB_Unit) + '</td> <td id="ST_EB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_EB_Baht, "฿") + '</td>';
            table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';
            table += ' <td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatNumber(ST_PR_Unit) + '</td> <td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatMoney(ST_PR_Baht, "฿") + '</td>';
            table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';
            table += '<td id="ST_OT_Unit" style="text-align: right;">' + accounting.formatNumber(ST_OT_Unit) + '</td> <td id="ST_OT_Baht" style="text-align: right;">' + accounting.formatMoney(ST_OT_Baht, "฿") + '</td>';
            table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
        } else if (market == "All") {
            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>AB</b></td>';
            table += '<td id="REM_AB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_AB_Unit) + '</td> <td id="REM_AB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_AB_Baht, "฿") + '</td>';
            table += '<td id="MTD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_AB_Unit) + '</td> <td id="MTD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_AB_Baht, "฿") + '</td>';
            table += '<td id="SPD_AB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_AB_Unit) + '</td> <td id="SPD_AB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_AB_Baht, "฿") + '</td>';
            table += '<td id="ST_AB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_AB_Unit) + '</td> <td id="ST_AB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_AB_Baht, "฿") + '</td>';
            table += '<td id="Total_AB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABUnitResult) + '</td> <td id="Total_AB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(ABBahtResult) + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>MB</b></td>';
            table += '<td id="REM_MB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_MB_Unit) + '</td> <td id="REM_MB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_MB_Baht, "฿") + '</td>';
            table += '<td id="MTD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_MB_Unit) + '</td> <td id="MTD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_MB_Baht, "฿") + '</td>';
            table += '<td id="SPD_MB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_MB_Unit) + '</td> <td id="SPD_MB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_MB_Baht, "฿") + '</td>';
            table += ' <td id="ST_MB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_MB_Unit) + '</td> <td id="ST_MB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_MB_Baht, "฿") + '</td>';
            table += '<td id="Total_MB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(MBUnitResult) + '</td> <td id="Total_MB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(MBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>EB</b></td>';
            table += '<td id="REM_EB_Unit" style="text-align: right;">' + accounting.formatNumber(REM_EB_Unit) + '</td> <td id="REM_EB_Baht" style="text-align: right;">' + accounting.formatMoney(REM_EB_Baht, "฿") + '</td>';
            table += '<td id="MTD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_EB_Unit) + '</td> <td id="MTD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_EB_Baht, "฿") + '</td>';
            table += '<td id="SPD_EB_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_EB_Unit) + '</td> <td id="SPD_EB_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_EB_Baht, "฿") + '</td>';
            table += '<td id="ST_EB_Unit" style="text-align: right;">' + accounting.formatNumber(ST_EB_Unit) + '</td> <td id="ST_EB_Baht" style="text-align: right;">' + accounting.formatMoney(ST_EB_Baht, "฿") + '</td>';
            table += '<td id="Total_EB_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(EBUnitResult) + '</td> <td id="Total_EB_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(EBBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Premium</b></td>';
            table += '<td id="REM_PR_Unit" style="text-align: right;">' + accounting.formatNumber(REM_PR_Unit) + '</td> <td id="REM_PR_Baht" style="text-align: right;">' + accounting.formatMoney(REM_PR_Baht, "฿") + '</td>';
            table += '<td id="MTD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_PR_Unit) + '</td> <td id="MTD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_PR_Baht, "฿") + '</td>';
            table += '<td id="SPD_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="SPD_PR_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_PR_Baht, "฿") + '</td>';
            table += ' <td id="ST_PR_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_PR_Unit) + '</td> <td id="ST_PR_Baht" style="text-align: right;">' + accounting.formatMoney(ST_PR_Baht, "฿") + '</td>';
            table += '<td id="Total_PR_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(PRUnitResult) + '</td> <td id="Total_PR_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(PRBahtResult, "฿") + '</td> </tr>';

            table += '<tr style="text-align:center;" bgcolor="#ffd699"> <td bgcolor="#b6dde8"><b>Others</b></td>';
            table += '<td id="REM_OT_Unit" style="text-align: right;">' + accounting.formatNumber(REM_OT_Unit) + '</td> <td id="REM_OT_Baht" style="text-align: right;">' + accounting.formatMoney(REM_OT_Baht, "฿") + '</td>';
            table += '<td id="MTD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(MTD_OT_Unit) + '</td> <td id="MTD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(MTD_OT_Baht, "฿") + '</td>';
            table += '<td id="SPD_OT_Unit" style="text-align: right;">' + accounting.formatNumber(SPD_OT_Unit) + '</td> <td id="SPD_OT_Baht" style="text-align: right;">' + accounting.formatMoney(SPD_OT_Baht, "฿") + '</td>';
            table += '<td id="ST_OT_Unit" style="text-align: right;">' + accounting.formatNumber(ST_OT_Unit) + '</td> <td id="ST_OT_Baht" style="text-align: right;">' + accounting.formatMoney(ST_OT_Baht, "฿") + '</td>';
            table += '<td id="Total_OT_Unit" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatNumber(OTUnitResult) + '</td> <td id="Total_OT_Baht" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">' + accounting.formatMoney(OTBahtResult, "฿") + '</td> </tr>';
        }



    }


    table += '</tbody> </table> ';

    $("#createtable").append(table);

}

function calCharts(startDate, endDate, REM_AB_Baht, REM_MB_Baht, REM_EB_Baht, REM_PR_Baht, REM_OT_Baht, MTD_AB_Baht, MTD_MB_Baht, MTD_EB_Baht, MTD_PR_Baht, MTD_OT_Baht, SPD_AB_Baht, SPD_MB_Baht, SPD_EB_Baht, SPD_PR_Baht, SPD_OT_Baht, ST_AB_Baht, ST_MB_Baht, ST_EB_Baht, ST_PR_Baht, ST_OT_Baht) {

    Highcharts.chart('container1', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },

        title: {
            text: 'Summary Report group by Market(Baht) <br> ' + startDate + " - " + endDate
        },

        xAxis: {
            categories: ['MTD', 'REM', 'SPD', 'ST'],
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of fruits',
                skew3d: true
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.value} '
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Automotive Battery',
            data: [{
                y: (MTD_AB_Baht == 0) ? null : MTD_AB_Baht,
                value: accounting.formatMoney(MTD_AB_Baht, "฿")
            }, {
                y: (REM_AB_Baht == 0) ? null : REM_AB_Baht,
                value: accounting.formatMoney(REM_AB_Baht, "฿")
            }, {
                y: (SPD_AB_Baht == 0) ? null : SPD_AB_Baht,
                value: accounting.formatMoney(SPD_AB_Baht, "฿")
            }, {
                y: (ST_AB_Baht == 0) ? null : ST_AB_Baht,
                value: accounting.formatMoney(ST_AB_Baht, "฿")
            }],
            stack: 'group1'
        }, {
            name: 'Motorcycle Battery',
            data: [{
                y: (MTD_MB_Baht == 0) ? null : MTD_MB_Baht,
                value: accounting.formatMoney(MTD_MB_Baht, "฿")
            }, {
                y: (REM_MB_Baht == 0) ? null : REM_MB_Baht,
                value: accounting.formatMoney(REM_MB_Baht, "฿")
            }, {
                y: (SPD_MB_Baht == 0) ? null : SPD_MB_Baht,
                value: accounting.formatMoney(SPD_MB_Baht, "฿")
            }, {
                y: (ST_MB_Baht == 0) ? null : ST_MB_Baht,
                value: accounting.formatMoney(ST_MB_Baht, "฿")
            }],
            stack: 'group2'
        }, {
            name: 'Electric Battery',
            data: [{
                y: (MTD_EB_Baht == 0) ? null : MTD_EB_Baht,
                value: accounting.formatMoney(MTD_EB_Baht, "฿")
            }, {
                y: (REM_EB_Baht == 0) ? null : REM_EB_Baht,
                value: accounting.formatMoney(REM_EB_Baht, "฿")
            }, {
                y: (SPD_EB_Baht == 0) ? null : SPD_EB_Baht,
                value: accounting.formatMoney(SPD_EB_Baht, "฿")
            }, {
                y: (ST_EB_Baht == 0) ? null : ST_EB_Baht,
                value: accounting.formatMoney(ST_EB_Baht, "฿")
            }],
            stack: 'group3'
        }, {
            name: 'Premium',
            data: [{
                y: (MTD_PR_Baht == 0) ? null : MTD_PR_Baht,
                value: accounting.formatMoney(MTD_PR_Baht, "฿")
            }, {
                y: (REM_PR_Baht == 0) ? null : REM_PR_Baht,
                value: accounting.formatMoney(REM_PR_Baht, "฿")
            }, {
                y: (SPD_PR_Baht == 0) ? null : SPD_PR_Baht,
                value: accounting.formatMoney(SPD_PR_Baht, "฿")
            }, {
                y: (ST_PR_Baht == 0) ? null : ST_PR_Baht,
                value: accounting.formatMoney(ST_PR_Baht, "฿")
            }],
            stack: 'group4'
        }, {
            name: 'Others',
            data: [{
                y: (MTD_OT_Baht == 0) ? null : MTD_OT_Baht,
                value: accounting.formatMoney(MTD_OT_Baht, "฿")
            }, {
                y: (REM_OT_Baht == 0) ? null : REM_OT_Baht,
                value: accounting.formatMoney(REM_OT_Baht, "฿")
            }, {
                y: (SPD_OT_Baht == 0) ? null : SPD_OT_Baht,
                value: accounting.formatMoney(SPD_OT_Baht, "฿")
            }, {
                y: (ST_OT_Baht == 0) ? null : ST_OT_Baht,
                value: accounting.formatMoney(ST_OT_Baht, "฿")
            }],
            stack: 'group5'
        }]
    });

}