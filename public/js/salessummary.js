$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    addTable();
    selectData($("ul.sub-ysd > li.active").find('a').data("value"), $("a.date-picker-year").text());

    //Change Year
    $(".date-picker-year").datepicker({
        minViewMode: 2,
        format: 'yyyy'
    }).on("changeYear", function(e) {
        var currYear = String(e.date).split(" ")[3];
        $(".date-picker-year").text(currYear);
        selectData($("ul.sub-ysd > li.active").find('a').data("value"), $("a.date-picker-year").text());
    });

    //Change Company and Month
    var x = $("ul.pull-right").find("li.active").text();
    var y = $("ul.sub-ysd").find("li.active").text();
    var z = $("a.date-picker-year").text();
    $("#Company").text(x);
    $("#Month").text(y);
    $(document).on("click", "ul.pull-right > li.active", function() {
        if ($(this).text() == 'YSD') {
            $('#Company').text($(this).text());
            $("#Month").text($("ul.sub-ysd").find("li.active").text());
        } else {
            $('#Company').text($(this).text());
            $("#Month").text("");
        }
    });
    $(document).on("click", "ul.sub-ysd > li.active", function() {
        if ($(this).text() == 'Year to Date') {
            $('#Month').text("");
        } else {
            $('#Month').text($(this).text());
        }
        selectData($(this).find('a').data("value"), $("a.date-picker-year").text());
    });

    //Scroll down
    $("#click").click(function() {
        if ($("#pieSection").css('display') != 'none') {
            $('html, body').animate({
                scrollTop: $("#pieSection").offset().top
            }, 2000);
        }
    });

});

function addTable() {
    var x = 1;
    var newItem = $("table#YSDTable").clone();
    var tableCount = $("table#YSDTable").length;

    $("table#YSDTable").each(function(key, elm) {
        $(this).attr("id", "YSDTable_" + x++);
    });

    $("table[id^=YSDTable_]").each(function(key, elm1) {
        var index = parseFloat($(elm1).attr("id").split("_")[1]);
        $(this).find("td[id^=REM_]").each(function() {
            $(this).attr("id", this.id + "_" + index);
        });
        $(this).find("td[id^=MTD_]").each(function() {
            $(this).attr("id", this.id + "_" + index);
        });
        $(this).find("td[id^=SPD_]").each(function() {
            $(this).attr("id", this.id + "_" + index);
        });
        $(this).find("td[id^=ST_]").each(function() {
            $(this).attr("id", this.id + "_" + index);
        });
        $(this).find("td[id^=Total_]").each(function() {
            $(this).attr("id", this.id + "_" + index);
        });
    });

}

function findPie(month) {

    $("div[class^=loadPie]").attr("class", "loadPie_" + month);

    $("div[class^=loadPie_]").each(function(key, elm1) {
        var index = parseFloat($(elm1).attr("class").split("_")[1]);
        $(this).find("div[id^=container1]").each(function() {
            $(this).attr("id", "container1" + "_" + index);
        });
        $(this).find("div[id^=container2]").each(function() {
            $(this).attr("id", "container2" + "_" + index);
        });
        $(this).find("div[id^=container3]").each(function() {
            $(this).attr("id", "container3" + "_" + index);
        });
        $(this).find("div[id^=container4]").each(function() {
            $(this).attr("id", "container4" + "_" + index);
        });
    });

}


function selectData(month, year) {
    findPie(month);
    $.ajax({
        beforeSend: function() {
            $("#waitPie").css("opacity", 0.2);
            $(".loadTable").css("opacity", 0.2);
            $(".loading-img").show();
            $(".loading-img2").show();
        },
        url: '/sa/selectYSD',
        type: "POST",
        data: { "month": month, "year": year },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {
                calDisplay(month, year, data);
            }

            return false;

        },
        complete: function() {
            $("#waitPie").css("opacity", 1);
            $(".loadTable").css("opacity", 1);
            $(".loading-img").hide();
            $(".loading-img2").hide();
        }
    });
}

function selectDataTable(month, year, sort, type) {
    findPie(month);
    $.ajax({
        url: '/sa/selectDataTableYSD',
        type: "POST",
        data: { "month": month, "year": year, "sort": sort, "type": type },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {

                var Item = data[0];
                var Cust = data[1];
                var Product = $("#Product");
                var Customer = $("#Customer");

                Product.dataTable().fnDestroy();
                var t = Product.dataTable({
                    data: Item,
                    columns: [{
                            data: "index",
                            render: function(data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: "ItemCode" },
                        { data: "Dscription" },
                        {
                            data: "Quantity",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            render: function(data, type, full) {
                                return accounting.formatMoney(data, "฿");
                            }
                        }
                    ]
                });

                Customer.dataTable().fnDestroy();
                Customer.dataTable({
                    data: Cust,
                    columns: [{
                            data: "index",
                            render: function(data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: "CustName" },
                        {
                            data: "Quantity",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            render: function(data, type, full) {
                                return accounting.formatMoney(data, "฿");
                            }
                        }
                    ]
                });

                var nameMonth = $("ul.sub-ysd > li.active").text();
                if (nameMonth == 'Year to Date') {
                    $("#headModal").text("Sales Summary: " + year);
                } else {
                    $("#headModal").text("Sales Summary: " + nameMonth + " " + year);
                }
                $("#rightModal").text(type);
            }
            return false;

        },
        complete: function() {
            $("#modal-dataTable").modal("toggle");
        }
    });
}

function calDisplay(month, year, data) {
    var results = data[0];
    var totalUnit = 0,
        totalBaht = 0;
    var REM_AB_Unit = 0,
        REM_MB_Unit = 0,
        REM_EB_Unit = 0,
        REM_OT_Unit = 0;
    var MTD_AB_Unit = 0,
        MTD_MB_Unit = 0,
        MTD_EB_Unit = 0,
        MTD_OT_Unit = 0;
    var SPD_AB_Unit = 0,
        SPD_MB_Unit = 0,
        SPD_EB_Unit = 0,
        SPD_OT_Unit = 0;
    var ST_AB_Unit = 0,
        ST_MB_Unit = 0,
        ST_EB_Unit = 0,
        ST_OT_Unit = 0;
    var REM_AB_Baht = 0,
        REM_MB_Baht = 0,
        REM_EB_Baht = 0,
        REM_OT_Baht = 0;
    var MTD_AB_Baht = 0,
        MTD_MB_Baht = 0,
        MTD_EB_Baht = 0,
        MTD_OT_Baht = 0;
    var SPD_AB_Baht = 0,
        SPD_MB_Baht = 0,
        SPD_EB_Baht = 0,
        SPD_OT_Baht = 0;
    var ST_AB_Baht = 0,
        ST_MB_Baht = 0,
        ST_EB_Baht = 0,
        ST_OT_Baht = 0;

    $.each(results, function() {

        if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Automotive Battery') {
            REM_AB_Unit += parseInt(this.Quantity);
            REM_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Motorcycle Battery') {
            REM_MB_Unit += parseInt(this.Quantity);
            REM_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Electric Battery') {
            REM_EB_Unit += parseInt(this.Quantity);
            REM_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'REM' && this.ItemGroupName == 'Others') {
            REM_OT_Unit += parseInt(this.Quantity);
            REM_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Automotive Battery') {
            MTD_AB_Unit += parseInt(this.Quantity);
            MTD_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Motorcycle Battery') {
            MTD_MB_Unit += parseInt(this.Quantity);
            MTD_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Electric Battery') {
            MTD_EB_Unit += parseInt(this.Quantity);
            MTD_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'MTD' && this.ItemGroupName == 'Others') {
            MTD_OT_Unit += parseInt(this.Quantity);
            MTD_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Automotive Battery') {
            SPD_AB_Unit += parseInt(this.Quantity);
            SPD_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Motorcycle Battery') {
            SPD_MB_Unit += parseInt(this.Quantity);
            SPD_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Electric Battery') {
            SPD_EB_Unit += parseInt(this.Quantity);
            SPD_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'SPD' && this.ItemGroupName == 'Others') {
            SPD_OT_Unit += parseInt(this.Quantity);
            SPD_OT_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Automotive Battery') {
            ST_AB_Unit += parseInt(this.Quantity);
            ST_AB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Motorcycle Battery') {
            ST_MB_Unit += parseInt(this.Quantity);
            ST_MB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Electric Battery') {
            ST_EB_Unit += parseInt(this.Quantity);
            ST_EB_Baht += parseFloat(this.Total);
        } else if (this.SalesPersonGroup == 'ST' && this.ItemGroupName == 'Others') {
            ST_OT_Unit += parseInt(this.Quantity);
            ST_OT_Baht += parseFloat(this.Total);
        }

        totalUnit += parseInt(this.Quantity);
        totalBaht += parseFloat(this.Total);
    });

    $('#REM_AB_Unit_' + month).html(accounting.formatNumber(REM_AB_Unit));
    $('#REM_AB_Baht_' + month).html(accounting.formatMoney(REM_AB_Baht, "฿"));
    $('#REM_MB_Unit_' + month).html(accounting.formatNumber(REM_MB_Unit));
    $('#REM_MB_Baht_' + month).html(accounting.formatMoney(REM_MB_Baht, "฿"));
    $('#REM_EB_Unit_' + month).html(accounting.formatNumber(REM_EB_Unit));
    $('#REM_EB_Baht_' + month).html(accounting.formatMoney(REM_EB_Baht, "฿"));
    $('#REM_OT_Unit_' + month).html(accounting.formatNumber(REM_OT_Unit));
    $('#REM_OT_Baht_' + month).html(accounting.formatMoney(REM_OT_Baht, "฿"));
    $('#MTD_AB_Unit_' + month).html(accounting.formatNumber(MTD_AB_Unit));
    $('#MTD_AB_Baht_' + month).html(accounting.formatMoney(MTD_AB_Baht, "฿"));
    $('#MTD_MB_Unit_' + month).html(accounting.formatNumber(MTD_MB_Unit));
    $('#MTD_MB_Baht_' + month).html(accounting.formatMoney(MTD_MB_Baht, "฿"));
    $('#MTD_EB_Unit_' + month).html(accounting.formatNumber(MTD_EB_Unit));
    $('#MTD_EB_Baht_' + month).html(accounting.formatMoney(MTD_EB_Baht, "฿"));
    $('#MTD_OT_Unit_' + month).html(accounting.formatNumber(MTD_OT_Unit));
    $('#MTD_OT_Baht_' + month).html(accounting.formatMoney(MTD_OT_Baht, "฿"));
    $('#SPD_AB_Unit_' + month).html(accounting.formatNumber(SPD_AB_Unit));
    $('#SPD_AB_Baht_' + month).html(accounting.formatMoney(SPD_AB_Baht, "฿"));
    $('#SPD_MB_Unit_' + month).html(accounting.formatNumber(SPD_MB_Unit));
    $('#SPD_MB_Baht_' + month).html(accounting.formatMoney(SPD_MB_Baht, "฿"));
    $('#SPD_EB_Unit_' + month).html(accounting.formatNumber(SPD_EB_Unit));
    $('#SPD_EB_Baht_' + month).html(accounting.formatMoney(SPD_EB_Baht, "฿"));
    $('#SPD_OT_Unit_' + month).html(accounting.formatNumber(SPD_OT_Unit));
    $('#SPD_OT_Baht_' + month).html(accounting.formatMoney(SPD_OT_Baht, "฿"));
    $('#ST_AB_Unit_' + month).html(accounting.formatNumber(ST_AB_Unit));
    $('#ST_AB_Baht_' + month).html(accounting.formatMoney(ST_AB_Baht, "฿"));
    $('#ST_MB_Unit_' + month).html(accounting.formatNumber(ST_MB_Unit));
    $('#ST_MB_Baht_' + month).html(accounting.formatMoney(ST_MB_Baht, "฿"));
    $('#ST_EB_Unit_' + month).html(accounting.formatNumber(ST_EB_Unit));
    $('#ST_EB_Baht_' + month).html(accounting.formatMoney(ST_EB_Baht, "฿"));
    $('#ST_OT_Unit_' + month).html(accounting.formatNumber(ST_OT_Unit));
    $('#ST_OT_Baht_' + month).html(accounting.formatMoney(ST_OT_Baht, "฿"));

    //Total Right
    var ABUnitResult = REM_AB_Unit + MTD_AB_Unit + SPD_AB_Unit + ST_AB_Unit;
    var ABBahtResult = REM_AB_Baht + MTD_AB_Baht + SPD_AB_Baht + ST_AB_Baht;
    var MBUnitResult = REM_MB_Unit + MTD_MB_Unit + SPD_MB_Unit + ST_MB_Unit;
    var MBBahtResult = REM_MB_Baht + MTD_MB_Baht + SPD_MB_Baht + ST_MB_Baht;
    var EBUnitResult = REM_EB_Unit + MTD_EB_Unit + SPD_EB_Unit + ST_EB_Unit;
    var EBBahtResult = REM_EB_Baht + MTD_EB_Baht + SPD_EB_Baht + ST_EB_Baht;
    var OTUnitResult = REM_OT_Unit + MTD_OT_Unit + SPD_OT_Unit + ST_OT_Unit;
    var OTBahtResult = REM_OT_Baht + MTD_OT_Baht + SPD_OT_Baht + ST_OT_Baht;
    $('#Total_AB_Unit_' + month).html(accounting.formatNumber(ABUnitResult));
    $('#Total_AB_Baht_' + month).html(accounting.formatMoney(ABBahtResult, "฿"));
    $('#Total_MB_Unit_' + month).html(accounting.formatNumber(MBUnitResult));
    $('#Total_MB_Baht_' + month).html(accounting.formatMoney(MBBahtResult, "฿"));
    $('#Total_EB_Unit_' + month).html(accounting.formatNumber(EBUnitResult));
    $('#Total_EB_Baht_' + month).html(accounting.formatMoney(EBBahtResult, "฿"));
    $('#Total_OT_Unit_' + month).html(accounting.formatNumber(OTUnitResult));
    $('#Total_OT_Baht_' + month).html(accounting.formatMoney(OTBahtResult, "฿"));

    //Total Bottom
    var REMUnitResult = REM_AB_Unit + REM_MB_Unit + REM_EB_Unit + REM_OT_Unit;
    var REMBahtResult = REM_AB_Baht + REM_MB_Baht + REM_EB_Baht + REM_OT_Baht;
    var MTDUnitResult = MTD_AB_Unit + MTD_MB_Unit + MTD_EB_Unit + MTD_OT_Unit;
    var MTDBahtResult = MTD_AB_Baht + MTD_MB_Baht + MTD_EB_Baht + MTD_OT_Baht;
    var SPDUnitResult = SPD_AB_Unit + SPD_MB_Unit + SPD_EB_Unit + SPD_OT_Unit;
    var SPDBahtResult = SPD_AB_Baht + SPD_MB_Baht + SPD_EB_Baht + SPD_OT_Baht;
    var STUnitResult = ST_AB_Unit + ST_MB_Unit + ST_EB_Unit + ST_OT_Unit;
    var STBahtResult = ST_AB_Baht + ST_MB_Baht + ST_EB_Baht + ST_OT_Baht;
    $('#REM_Total_Unit_' + month).html(accounting.formatNumber(REMUnitResult));
    $('#REM_Total_Baht_' + month).html(accounting.formatMoney(REMBahtResult, "฿"));
    $('#MTD_Total_Unit_' + month).html(accounting.formatNumber(MTDUnitResult));
    $('#MTD_Total_Baht_' + month).html(accounting.formatMoney(MTDBahtResult, "฿"));
    $('#SPD_Total_Unit_' + month).html(accounting.formatNumber(SPDUnitResult));
    $('#SPD_Total_Baht_' + month).html(accounting.formatMoney(SPDBahtResult, "฿"));
    $('#ST_Total_Unit_' + month).html(accounting.formatNumber(STUnitResult));
    $('#ST_Total_Baht_' + month).html(accounting.formatMoney(STBahtResult, "฿"));

    //Total Amount
    $('#Total_Unit_' + month).html(accounting.formatNumber(totalUnit));
    $('#Total_Baht_' + month).html(accounting.formatMoney(totalBaht, "฿"));

    if (totalUnit == 0 && totalBaht == 0) {
        //Hide Pie Charts
        $('#pieSection').css("display", "none");
    } else {
        //Show Pie Charts
        $('#pieSection').css("display", "block");

        //Cal Pie Charts
        calPie(month, year, data, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult,
            REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult);
    }

}

function calPie(month, year, data, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult,
    REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult) {

    var BMarket = 0,
        UMarket = 0,
        BType = 0,
        UType = 0;
    var BPerREM, BPerMTD, BPerSPD, BPerST, UPerREM, UPerMTD, UPerSPD, UPerST, BPerAB, BPerMB, BPerEB, BPerOT, UPerAB, UPerMB, UPerEB, UPerOT
    BMarket = REMBahtResult + MTDBahtResult + SPDBahtResult + STBahtResult;
    UMarket = REMUnitResult + MTDUnitResult + SPDUnitResult + STUnitResult;
    BType = ABBahtResult + MBBahtResult + EBBahtResult + OTBahtResult;
    UType = ABUnitResult + MBUnitResult + EBUnitResult + OTUnitResult;

    if (BMarket == 0) {
        BPerREM = 0;
        BPerMTD = 0;
        BPerSPD = 0;
        BPerST = 0;
    } else {
        BPerREM = (REMBahtResult / BMarket) * 100;
        BPerMTD = (MTDBahtResult / BMarket) * 100;
        BPerSPD = (SPDBahtResult / BMarket) * 100;
        BPerST = (STBahtResult / BMarket) * 100;
        BahtMarket(month, year, BPerREM, BPerMTD, BPerSPD, BPerST, REMBahtResult, MTDBahtResult, SPDBahtResult, STBahtResult);
    }

    if (UMarket == 0) {
        UPerREM = 0;
        UPerMTD = 0;
        UPerSPD = 0;
        UPerST = 0;
    } else {
        UPerREM = (REMUnitResult / UMarket) * 100;
        UPerMTD = (MTDUnitResult / UMarket) * 100;
        UPerSPD = (SPDUnitResult / UMarket) * 100;
        UPerST = (STUnitResult / UMarket) * 100;
        UnitMarket(month, year, UPerREM, UPerMTD, UPerSPD, UPerST, REMUnitResult, MTDUnitResult, SPDUnitResult, STUnitResult);
    }

    if (BType == 0) {
        BPerAB = 0;
        BPerMB = 0;
        BPerEB = 0;
        BPerOT = 0;
    } else {
        BPerAB = (ABBahtResult / BType) * 100;
        BPerMB = (MBBahtResult / BType) * 100;
        BPerEB = (EBBahtResult / BType) * 100;
        BPerOT = (OTBahtResult / BType) * 100;
        BahtType(month, year, BPerAB, BPerMB, BPerEB, BPerOT, ABBahtResult, MBBahtResult, EBBahtResult, OTBahtResult);
    }

    if (UType == 0) {
        UPerAB = 0;
        UPerMB = 0;
        UPerEB = 0;
        UPerOT = 0;
    } else {
        UPerAB = (ABUnitResult / UType) * 100;
        UPerMB = (MBUnitResult / UType) * 100;
        UPerEB = (EBUnitResult / UType) * 100;
        UPerOT = (OTUnitResult / UType) * 100;
        UnitType(month, year, UPerAB, UPerMB, UPerEB, UPerOT, ABUnitResult, MBUnitResult, EBUnitResult, OTUnitResult);
    }

}

function BahtMarket(month, year, BPerREM, BPerMTD, BPerSPD, BPerST, REMBahtResult, MTDBahtResult, SPDBahtResult, STBahtResult) {

    // Create the chart
    $('#container1_' + month).highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Baht'
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
                    click: function(event) {
                        var sort = 'Market';
                        var type = event.point.code;
                        selectDataTable(month, year, sort, type);
                    }
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
                },
                {
                    name: 'SPD',
                    code: 'SPD',
                    y: BPerSPD,
                    value: accounting.formatMoney(SPDBahtResult, "฿")
                },
                {
                    name: 'Staff',
                    code: 'ST',
                    y: BPerST,
                    value: accounting.formatMoney(STBahtResult, "฿")
                }
            ]
        }]
    })
}

function UnitMarket(month, year, UPerREM, UPerMTD, UPerSPD, UPerST, REMUnitResult, MTDUnitResult, SPDUnitResult, STUnitResult) {
    // Create the chart
    $('#container2_' + month).highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Unit'
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
                    format: '{point.name}'
                }
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var sort = 'Market';
                        var type = event.point.code;
                        selectDataTable(month, year, sort, type);
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Market share',
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
                },
                {
                    name: 'SPD',
                    code: 'SPD',
                    y: UPerSPD,
                    value: accounting.formatNumber(SPDUnitResult)
                },
                {
                    name: 'Staff',
                    code: 'ST',
                    y: UPerST,
                    value: accounting.formatNumber(STUnitResult)
                }
            ]
        }]
    })
}

function BahtType(month, year, BPerAB, BPerMB, BPerEB, BPerOT, ABBahtResult, MBBahtResult, EBBahtResult, OTBahtResult) {
    // Create the chart
    $('#container3_' + month).highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Baht'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var sort = 'Type';
                        var type = event.point.code;
                        selectDataTable(month, year, sort, type);
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Type share',
            data: [{
                    name: 'AB',
                    code: 'Automotive Battery',
                    y: BPerAB,
                    value: accounting.formatMoney(ABBahtResult, "฿")
                },
                {
                    name: 'MB',
                    code: 'Motorcycle Battery',
                    y: BPerMB,
                    value: accounting.formatMoney(MBBahtResult, "฿")
                },
                {
                    name: 'EB',
                    code: 'Electric Battery',
                    y: BPerEB,
                    value: accounting.formatMoney(EBBahtResult, "฿")
                },
                {
                    name: 'Others',
                    code: 'Others',
                    y: BPerOT,
                    value: accounting.formatMoney(OTBahtResult, "฿")
                }
            ]
        }]
    })
}

function UnitType(month, year, UPerAB, UPerMB, UPerEB, UPerOT, ABUnitResult, MBUnitResult, EBUnitResult, OTUnitResult) {
    // Create the chart
    $('#container4_' + month).highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Unit'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>Total: <b>{point.value}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var sort = 'Type';
                        var type = event.point.code;
                        selectDataTable(month, year, sort, type);
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Type share',
            data: [{
                    name: 'AB',
                    code: 'Automotive Battery',
                    y: UPerAB,
                    value: accounting.formatNumber(ABUnitResult)
                },
                {
                    name: 'MB',
                    code: 'Motorcycle Battery',
                    y: UPerMB,
                    value: accounting.formatNumber(MBUnitResult)
                },
                {
                    name: 'EB',
                    code: 'Electric Battery',
                    y: UPerEB,
                    value: accounting.formatNumber(EBUnitResult)
                },
                {
                    name: 'Others',
                    code: 'Others',
                    y: UPerOT,
                    value: accounting.formatNumber(OTUnitResult)
                }
            ]
        }]
    })
}