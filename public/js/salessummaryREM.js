$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var year = $("a.date-picker-year").text();
    selectData(year);

    $('#BahtActualNow').text("Actual " + year);
    $('#BahtTargetNow').text("Target " + year);
    $('#UnitActualNow').text("Actual " + year);
    $('#UnitTargetNow').text("Target " + year);
    $('#BahtActualOld').text("Actual " + (year - 1));
    $('#UnitActualOld').text("Actual " + (year - 1));


    //Change Year
    $(".date-picker-year").datepicker({
        minViewMode: 2,
        format: 'yyyy'
    }).on("changeYear", function(e) {
        var currYear = String(e.date).split(" ")[3];
        $(".date-picker-year").text(currYear);
        $('#BahtActualNow').text("Actual " + currYear);
        $('#BahtTargetNow').text("Target " + currYear);
        $('#UnitActualNow').text("Actual " + currYear);
        $('#UnitTargetNow').text("Target " + currYear);
        $('#BahtActualOld').text("Actual " + (currYear - 1));
        $('#UnitActualOld').text("Actual " + (currYear - 1));

        selectData(currYear);
    });


});

function selectData(year) {
    $.ajax({
        beforeSend: function() {
            $(".loadGraph").css("opacity", 0.2);
            $(".loadTable").css("opacity", 0.2);
            $(".loading-img").show();
            $(".loading-img2").show();
        },
        url: '/rem/selectREM',
        type: "POST",
        data: { "year": year },
        success: function(data, statusText, resObject) {
            if (data[3] == "nullData" && data[4] == "") {
                swal({
                    title: "Data not found.",
                    text: "Please contact adminastrator!",
                    icon: 'info',
                    showConfirmButton: false
                });
                calData(year, data);
            } else if (data[3] == "" && data[4] == "nullTarget") {
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
            } else if (data[3] == "nullData" && data[4] == "nullTarget") {
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
            $(".loadGraph").css("opacity", 1);
            $(".loadTable").css("opacity", 1);
            $(".loading-img").hide();
            $(".loading-img2").hide();
        }
    });
}

function selectDataTable(nameMonth, month, year) {
    $.ajax({
        url: '/rem/selectDataTableREM',
        type: "POST",
        data: { "month": month, "year": year },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {

                var Item = data[0];
                var Cust = data[1];
                var Product = $("#Product");
                var Customer = $("#Customer");

                Product.dataTable().fnDestroy();
                var tableProduct = Product.dataTable({
                    data: Item,
                    columns: [{
                            data: "index",
                            render: function(data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: "ItemCode" },
                        { data: "Dscription" },
                        { data: "Commodity" },
                        {
                            data: "Quantity",
                            className: "uniqueClassName",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            className: "uniqueClassName",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        }
                    ],
                    "footerCallback": function(row, data, start, end, display) {
                        var api = this.api(),
                            data;

                        // converting to interger to find total
                        var intVal = function(i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                i : 0;
                        };

                        // computing column Total of the complete result 
                        // Total over all pages
                        Unit = api
                            .column(4)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageUnit = api
                            .column(4, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        Total = api
                            .column(5)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(5, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Update footer by showing the total with the reference of the column index 
                        $(api.column(3).footer()).html('Total');
                        $(api.column(4).footer()).html(
                            ' ' + accounting.formatNumber(pageUnit) + ' ( ' + accounting.formatNumber(Unit) + ' Unit)'
                        );
                        $(api.column(5).footer()).html(
                            ' ' + accounting.formatNumber(pageTotal) + ' ( ' + accounting.formatNumber(Total) + ' Total)'
                        );
                    },
                    "order": [
                        [5, "desc"]
                    ]
                }, );

                var buttonsProduct = new $.fn.dataTable.Buttons(tableProduct, {
                    /* buttons: [
                        'copy', 'print',
                        {
                            extend: 'excel',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'pdf',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'csv',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }
                    ] */
                    buttons: [{
                        extend: 'pdfHtml5',
                        text: 'Export PDF',
                        customize: function(doc) {
                            var rgbaStrToHex = function(str) {
                                var firstParens = str.split('('),
                                    nums = firstParens[1].split(')')[0].split(','),
                                    a = 1;
                                if (nums.length == 4) {
                                    a = parseFloat(nums[3]);
                                }
                                return '#' + nums.filter(function(x, ix) { return ix < 3; })
                                    .map(function(x) {
                                        x = Math.round(parseInt(x) * a, 0).toString(16);
                                        return ((x.length == 1) ? "0" + x : x);
                                    }).join("");
                            };
                            var tblBody = doc.content[1].table.body;
                            $(instance.tbl.context[0].nTable).find('tr').each(function(ix, row) {
                                var index = ix;
                                var rowElt = row;
                                $(row).find('th,td').each(function(ind, elt) {
                                    if (elt.tagName === "TH") return;
                                    var color = $(elt).css('background-color');
                                    if (color === 'rgba(0, 0, 0, 0)') {
                                        color = $(rowElt).css('background-color');
                                    }
                                    if (color !== 'rgba(0, 0, 0, 0)') {
                                        delete tblBody[index][ind].style;
                                        tblBody[index][ind].fillColor = rgbaStrToHex(color);
                                    }
                                });
                            });
                        }
                    }]
                }).container().appendTo($('#exportProduct'));


                Customer.dataTable().fnDestroy();
                var tableCustomer = Customer.dataTable({
                    data: Cust,
                    columns: [{
                            data: "index",
                            render: function(data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        { data: "CustCode" },
                        { data: "CustName" },
                        { data: "MasterDealer" },
                        {
                            data: "Quantity",
                            className: "uniqueClassName",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            className: "uniqueClassName",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        }
                    ],
                    "footerCallback": function(row, data, start, end, display) {
                        var api = this.api(),
                            data;

                        // converting to interger to find total
                        var intVal = function(i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                i : 0;
                        };

                        // computing column Total of the complete result 
                        // Total over all pages
                        Unit = api
                            .column(4)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageUnit = api
                            .column(4, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        Total = api
                            .column(5)
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(5, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Update footer by showing the total with the reference of the column index 
                        $(api.column(3).footer()).html('Total');
                        $(api.column(4).footer()).html(
                            ' ' + accounting.formatNumber(pageUnit) + ' ( ' + accounting.formatNumber(Unit) + ' Unit)'
                        );
                        $(api.column(5).footer()).html(
                            ' ' + accounting.formatNumber(pageTotal) + ' ( ' + accounting.formatNumber(Total) + ' Total)'
                        );
                    },
                    "order": [
                        [5, "desc"]
                    ]
                });

                var buttonsCustomer = new $.fn.dataTable.Buttons(tableCustomer, {
                    buttons: [
                        'copy', 'print',
                        {
                            extend: 'excel',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'pdf',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'csv',
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }
                    ]
                }).container().appendTo($('#exportCustomer'));

                $("#headModal").text("REM Sales Summary: " + nameMonth + " " + year);
                $("#rightModal").text("REM");
            }
            return false;

        },
        complete: function() {
            $("#modal-dataTable").modal("toggle");
        }
    });
}

function calData(year, data) {
    var currYear = data[0];
    var oldYear = data[1];
    var target = data[2][0];

    var currTotalBaht = 0,
        currTotalUnit = 0,
        oldTotalBaht = 0,
        oldTotalUnit = 0;
    var currUnitJanuary = 0,
        currUnitFebruary = 0,
        currUnitMarch = 0,
        currUnitApril = 0,
        currUnitMay = 0,
        currUnitJune = 0,
        currUnitJuly = 0,
        currUnitAugust = 0,
        currUnitSeptember = 0,
        currUnitOctober = 0,
        currUnitNovember = 0,
        currUnitDecember = 0,
        currBahtJanuary = 0,
        currBahtFebruary = 0,
        currBahtMarch = 0,
        currBahtApril = 0,
        currBahtMay = 0,
        currBahtJune = 0,
        currBahtJuly = 0,
        currBahtAugust = 0,
        currBahtSeptember = 0,
        currBahtOctober = 0,
        currBahtNovember = 0,
        currBahtDecember = 0,
        oldUnitJanuary = 0,
        oldUnitFebruary = 0,
        oldUnitMarch = 0,
        oldUnitApril = 0,
        oldUnitMay = 0,
        oldUnitJune = 0,
        oldUnitJuly = 0,
        oldUnitAugust = 0,
        oldUnitSeptember = 0,
        oldUnitOctober = 0,
        oldUnitNovember = 0,
        oldUnitDecember = 0,
        oldBahtJanuary = 0,
        oldBahtFebruary = 0,
        oldBahtMarch = 0,
        oldBahtApril = 0,
        oldBahtMay = 0,
        oldBahtJune = 0,
        oldBahtJuly = 0,
        oldBahtAugust = 0,
        oldBahtSeptember = 0,
        oldBahtOctober = 0,
        oldBahtNovember = 0,
        oldBahtDecember = 0,
        achieveBahtJanuary = 0,
        achieveBahtFebruary = 0,
        achieveBahtMarch = 0,
        achieveBahtApril = 0,
        achieveBahtMay = 0,
        achieveBahtJune = 0,
        achieveBahtJuly = 0,
        achieveBahtAugust = 0,
        achieveBahtSeptember = 0,
        achieveBahtOctober = 0,
        achieveBahtNovember = 0,
        achieveBahtDecember = 0,
        growthBahtJanuary = 0,
        growthBahtFebruary = 0,
        growthBahtMarch = 0,
        growthBahtApril = 0,
        growthBahtMay = 0,
        growthBahtJune = 0,
        growthBahtJuly = 0,
        growthBahtAugust = 0,
        growthBahtSeptember = 0,
        growthBahtOctober = 0,
        growthBahtNovember = 0,
        growthBahtDecember = 0,
        achieveUnitJanuary = 0,
        achieveUnitFebruary = 0,
        achieveUnitMarch = 0,
        achieveUnitApril = 0,
        achieveUnitMay = 0,
        achieveUnitJune = 0,
        achieveUnitJuly = 0,
        achieveUnitAugust = 0,
        achieveUnitSeptember = 0,
        achieveUnitOctober = 0,
        achieveUnitNovember = 0,
        achieveUnitDecember = 0,
        growthUnitJanuary = 0,
        growthUnitFebruary = 0,
        growthUnitMarch = 0,
        growthUnitApril = 0,
        growthUnitMay = 0,
        growthUnitJune = 0,
        growthUnitJuly = 0,
        growthUnitAugust = 0,
        growthUnitSeptember = 0,
        growthUnitOctober = 0,
        growthUnitNovember = 0,
        growthUnitDecember = 0;

    $.each(currYear, function() {
        if (this.DocMonth == '1') {
            currUnitJanuary += parseFloat(this.Quantity);
            currBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currUnitFebruary += parseFloat(this.Quantity);
            currBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currUnitMarch += parseFloat(this.Quantity);
            currBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currUnitApril += parseFloat(this.Quantity);
            currBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currUnitMay += parseFloat(this.Quantity);
            currBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currUnitJune += parseFloat(this.Quantity);
            currBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currUnitJuly += parseFloat(this.Quantity);
            currBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currUnitAugust += parseFloat(this.Quantity);
            currBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currUnitSeptember += parseFloat(this.Quantity);
            currBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currUnitOctober += parseFloat(this.Quantity);
            currBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currUnitNovember += parseFloat(this.Quantity);
            currBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currUnitDecember += parseFloat(this.Quantity);
            currBahtDecember += parseFloat(this.Total);
        }

        currTotalBaht += parseFloat(this.Total);
        currTotalUnit += parseFloat(this.Quantity);

    });

    $.each(oldYear, function() {
        if (this.DocMonth == '1') {
            oldUnitJanuary += parseFloat(this.Quantity);
            oldBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldUnitFebruary += parseFloat(this.Quantity);
            oldBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldUnitMarch += parseFloat(this.Quantity);
            oldBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldUnitApril += parseFloat(this.Quantity);
            oldBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldUnitMay += parseFloat(this.Quantity);
            oldBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldUnitJune += parseFloat(this.Quantity);
            oldBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldUnitJuly += parseFloat(this.Quantity);
            oldBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldUnitAugust += parseFloat(this.Quantity);
            oldBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldUnitSeptember += parseFloat(this.Quantity);
            oldBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldUnitOctober += parseFloat(this.Quantity);
            oldBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldUnitNovember += parseFloat(this.Quantity);
            oldBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldUnitDecember += parseFloat(this.Quantity);
            oldBahtDecember += parseFloat(this.Total);
        }

        oldTotalBaht += parseFloat(this.Total);
        oldTotalUnit += parseFloat(this.Quantity);

    });



    growthBahtJanuary = ((currBahtJanuary - oldBahtJanuary) * 100) / oldBahtJanuary;
    growthBahtFebruary = ((currBahtFebruary - oldBahtFebruary) * 100) / oldBahtFebruary;
    growthBahtMarch = ((currBahtMarch - oldBahtMarch) * 100) / oldBahtMarch;
    growthBahtApril = ((currBahtApril - oldBahtApril) * 100) / oldBahtApril;
    growthBahtMay = ((currBahtMay - oldBahtMay) * 100) / oldBahtMay;
    growthBahtJune = ((currBahtJune - oldBahtJune) * 100) / oldBahtJune;
    growthBahtJuly = ((currBahtJuly - oldBahtJuly) * 100) / oldBahtJuly;
    growthBahtAugust = ((currBahtAugust - oldBahtAugust) * 100) / oldBahtAugust;
    growthBahtSeptember = ((currBahtSeptember - oldBahtSeptember) * 100) / oldBahtSeptember;
    growthBahtOctober = ((currBahtOctober - oldBahtOctober) * 100) / oldBahtOctober;
    growthBahtNovember = ((currBahtNovember - oldBahtNovember) * 100) / oldBahtNovember;
    growthBahtDecember = ((currBahtDecember - oldBahtDecember) * 100) / oldBahtDecember;
    growthBahtTotal = ((currTotalBaht - oldTotalBaht) * 100) / oldTotalBaht;

    growthUnitJanuary = ((currUnitJanuary - oldUnitJanuary) * 100) / oldUnitJanuary;
    growthUnitFebruary = ((currUnitFebruary - oldUnitFebruary) * 100) / oldUnitFebruary;
    growthUnitMarch = ((currUnitMarch - oldUnitMarch) * 100) / oldUnitMarch;
    growthUnitApril = ((currUnitApril - oldUnitApril) * 100) / oldUnitApril;
    growthUnitMay = ((currUnitMay - oldUnitMay) * 100) / oldUnitMay;
    growthUnitJune = ((currUnitJune - oldUnitJune) * 100) / oldUnitJune;
    growthUnitJuly = ((currUnitJuly - oldUnitJuly) * 100) / oldUnitJuly;
    growthUnitAugust = ((currUnitAugust - oldUnitAugust) * 100) / oldUnitAugust;
    growthUnitSeptember = ((currUnitSeptember - oldUnitSeptember) * 100) / oldUnitSeptember;
    growthUnitOctober = ((currUnitOctober - oldUnitOctober) * 100) / oldUnitOctober;
    growthUnitNovember = ((currUnitNovember - oldUnitNovember) * 100) / oldUnitNovember;
    growthUnitDecember = ((currUnitDecember - oldUnitDecember) * 100) / oldUnitDecember;
    growthUnitTotal = ((currTotalUnit - oldTotalUnit) * 100) / oldTotalUnit;

    var totalBahtTarget = accounting.unformat(target.AmtQ1) + accounting.unformat(target.AmtQ2) + accounting.unformat(target.AmtQ3) + accounting.unformat(target.AmtQ4);
    var totalUnitTarget = accounting.unformat(target.UnitQ1) + accounting.unformat(target.UnitQ2) + accounting.unformat(target.UnitQ3) + accounting.unformat(target.UnitQ4);

    achieveBahtJanuary = (currBahtJanuary * 100) / accounting.unformat(target.Amt01);
    achieveBahtFebruary = (currBahtFebruary * 100) / accounting.unformat(target.Amt02);
    achieveBahtMarch = (currBahtMarch * 100) / accounting.unformat(target.Amt03);
    achieveBahtApril = (currBahtApril * 100) / accounting.unformat(target.Amt04);
    achieveBahtMay = (currBahtMay * 100) / accounting.unformat(target.Amt05);
    achieveBahtJune = (currBahtJune * 100) / accounting.unformat(target.Amt06);
    achieveBahtJuly = (currBahtJuly * 100) / accounting.unformat(target.Amt07);
    achieveBahtAugust = (currBahtAugust * 100) / accounting.unformat(target.Amt08);
    achieveBahtSeptember = (currBahtSeptember * 100) / accounting.unformat(target.Amt09);
    achieveBahtOctober = (currBahtOctober * 100) / accounting.unformat(target.Amt10);
    achieveBahtNovember = (currBahtNovember * 100) / accounting.unformat(target.Amt11);
    achieveBahtDecember = (currBahtDecember * 100) / accounting.unformat(target.Amt12);
    achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget;

    achieveUnitJanuary = (currUnitJanuary * 100) / accounting.unformat(target.Unit01);
    achieveUnitFebruary = (currUnitFebruary * 100) / accounting.unformat(target.Unit02);
    achieveUnitMarch = (currUnitMarch * 100) / accounting.unformat(target.Unit03);
    achieveUnitApril = (currUnitApril * 100) / accounting.unformat(target.Unit04);
    achieveUnitMay = (currUnitMay * 100) / accounting.unformat(target.Unit05);
    achieveUnitJune = (currUnitJune * 100) / accounting.unformat(target.Unit06);
    achieveUnitJuly = (currUnitJuly * 100) / accounting.unformat(target.Unit07);
    achieveUnitAugust = (currUnitAugust * 100) / accounting.unformat(target.Unit08);
    achieveUnitSeptember = (currUnitSeptember * 100) / accounting.unformat(target.Unit09);
    achieveUnitOctober = (currUnitOctober * 100) / accounting.unformat(target.Unit10);
    achieveUnitNovember = (currUnitNovember * 100) / accounting.unformat(target.Unit11);
    achieveUnitDecember = (currUnitDecember * 100) / accounting.unformat(target.Unit12);
    achieveUnitTotal = (currTotalUnit * 100) / totalUnitTarget;

    $('#BahtActualNow1').html(accounting.formatNumber(currBahtJanuary));
    $('#BahtActualNow2').html(accounting.formatNumber(currBahtFebruary));
    $('#BahtActualNow3').html(accounting.formatNumber(currBahtMarch));
    $('#BahtActualNow4').html(accounting.formatNumber(currBahtApril));
    $('#BahtActualNow5').html(accounting.formatNumber(currBahtMay));
    $('#BahtActualNow6').html(accounting.formatNumber(currBahtJune));
    $('#BahtActualNow7').html(accounting.formatNumber(currBahtJuly));
    $('#BahtActualNow8').html(accounting.formatNumber(currBahtAugust));
    $('#BahtActualNow9').html(accounting.formatNumber(currBahtSeptember));
    $('#BahtActualNow10').html(accounting.formatNumber(currBahtOctober));
    $('#BahtActualNow11').html(accounting.formatNumber(currBahtNovember));
    $('#BahtActualNow12').html(accounting.formatNumber(currBahtDecember));
    $('#BahtActualNowTotal').html(accounting.formatNumber(currTotalBaht));

    $('#BahtTargetNow1').html(accounting.formatNumber(accounting.unformat(target.Amt01)));
    $('#BahtTargetNow2').html(accounting.formatNumber(accounting.unformat(target.Amt02)));
    $('#BahtTargetNow3').html(accounting.formatNumber(accounting.unformat(target.Amt03)));
    $('#BahtTargetNow4').html(accounting.formatNumber(accounting.unformat(target.Amt04)));
    $('#BahtTargetNow5').html(accounting.formatNumber(accounting.unformat(target.Amt05)));
    $('#BahtTargetNow6').html(accounting.formatNumber(accounting.unformat(target.Amt06)));
    $('#BahtTargetNow7').html(accounting.formatNumber(accounting.unformat(target.Amt07)));
    $('#BahtTargetNow8').html(accounting.formatNumber(accounting.unformat(target.Amt08)));
    $('#BahtTargetNow9').html(accounting.formatNumber(accounting.unformat(target.Amt09)));
    $('#BahtTargetNow10').html(accounting.formatNumber(accounting.unformat(target.Amt10)));
    $('#BahtTargetNow11').html(accounting.formatNumber(accounting.unformat(target.Amt11)));
    $('#BahtTargetNow12').html(accounting.formatNumber(accounting.unformat(target.Amt12)));
    $('#BahtTargetNowTotal').html(accounting.formatNumber(totalBahtTarget));

    $('#BahtActualOld1').html(accounting.formatNumber(oldBahtJanuary));
    $('#BahtActualOld2').html(accounting.formatNumber(oldBahtFebruary));
    $('#BahtActualOld3').html(accounting.formatNumber(oldBahtMarch));
    $('#BahtActualOld4').html(accounting.formatNumber(oldBahtApril));
    $('#BahtActualOld5').html(accounting.formatNumber(oldBahtMay));
    $('#BahtActualOld6').html(accounting.formatNumber(oldBahtJune));
    $('#BahtActualOld7').html(accounting.formatNumber(oldBahtJuly));
    $('#BahtActualOld8').html(accounting.formatNumber(oldBahtAugust));
    $('#BahtActualOld9').html(accounting.formatNumber(oldBahtSeptember));
    $('#BahtActualOld10').html(accounting.formatNumber(oldBahtOctober));
    $('#BahtActualOld11').html(accounting.formatNumber(oldBahtNovember));
    $('#BahtActualOld12').html(accounting.formatNumber(oldBahtDecember));
    $('#BahtActualOldTotal').html(accounting.formatNumber(oldTotalBaht));

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

    $('#UnitActualNow1').html(accounting.formatNumber(currUnitJanuary));
    $('#UnitActualNow2').html(accounting.formatNumber(currUnitFebruary));
    $('#UnitActualNow3').html(accounting.formatNumber(currUnitMarch));
    $('#UnitActualNow4').html(accounting.formatNumber(currUnitApril));
    $('#UnitActualNow5').html(accounting.formatNumber(currUnitMay));
    $('#UnitActualNow6').html(accounting.formatNumber(currUnitJune));
    $('#UnitActualNow7').html(accounting.formatNumber(currUnitJuly));
    $('#UnitActualNow8').html(accounting.formatNumber(currUnitAugust));
    $('#UnitActualNow9').html(accounting.formatNumber(currUnitSeptember));
    $('#UnitActualNow10').html(accounting.formatNumber(currUnitOctober));
    $('#UnitActualNow11').html(accounting.formatNumber(currUnitNovember));
    $('#UnitActualNow12').html(accounting.formatNumber(currUnitDecember));
    $('#UnitActualNowTotal').html(accounting.formatNumber(currTotalUnit));

    $('#UnitTargetNow1').html(accounting.formatNumber(accounting.unformat(target.Unit01)));
    $('#UnitTargetNow2').html(accounting.formatNumber(accounting.unformat(target.Unit02)));
    $('#UnitTargetNow3').html(accounting.formatNumber(accounting.unformat(target.Unit03)));
    $('#UnitTargetNow4').html(accounting.formatNumber(accounting.unformat(target.Unit04)));
    $('#UnitTargetNow5').html(accounting.formatNumber(accounting.unformat(target.Unit05)));
    $('#UnitTargetNow6').html(accounting.formatNumber(accounting.unformat(target.Unit06)));
    $('#UnitTargetNow7').html(accounting.formatNumber(accounting.unformat(target.Unit07)));
    $('#UnitTargetNow8').html(accounting.formatNumber(accounting.unformat(target.Unit08)));
    $('#UnitTargetNow9').html(accounting.formatNumber(accounting.unformat(target.Unit09)));
    $('#UnitTargetNow10').html(accounting.formatNumber(accounting.unformat(target.Unit10)));
    $('#UnitTargetNow11').html(accounting.formatNumber(accounting.unformat(target.Unit11)));
    $('#UnitTargetNow12').html(accounting.formatNumber(accounting.unformat(target.Unit12)));
    $('#UnitTargetNowTotal').html(accounting.formatNumber(totalUnitTarget));

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

    unitGraph(year, accounting.unformat(target.Unit01), accounting.unformat(target.Unit02), accounting.unformat(target.Unit03), accounting.unformat(target.Unit04),
        accounting.unformat(target.Unit05), accounting.unformat(target.Unit06), accounting.unformat(target.Unit07), accounting.unformat(target.Unit08),
        accounting.unformat(target.Unit09), accounting.unformat(target.Unit10), accounting.unformat(target.Unit11), accounting.unformat(target.Unit12),
        accounting.unformat(totalUnitTarget), currUnitJanuary, currUnitFebruary, currUnitMarch, currUnitApril, currUnitMay, currUnitJune, currUnitJuly, currUnitAugust,
        currUnitSeptember, currUnitOctober, currUnitNovember, currUnitDecember, currTotalUnit, oldUnitJanuary, oldUnitFebruary, oldUnitMarch, oldUnitApril, oldUnitMay,
        oldUnitJune, oldUnitJuly, oldUnitAugust, oldUnitSeptember, oldUnitOctober, oldUnitNovember, oldUnitDecember, oldTotalUnit);
    bahtGraph(year, accounting.unformat(target.Amt01), accounting.unformat(target.Amt02), accounting.unformat(target.Amt03), accounting.unformat(target.Amt04),
        accounting.unformat(target.Amt05), accounting.unformat(target.Amt06), accounting.unformat(target.Amt07), accounting.unformat(target.Amt08),
        accounting.unformat(target.Amt09), accounting.unformat(target.Amt10), accounting.unformat(target.Amt11), accounting.unformat(target.Amt12), accounting.unformat(totalBahtTarget),
        currBahtJanuary, currBahtFebruary, currBahtMarch, currBahtApril, currBahtMay, currBahtJune, currBahtJuly, currBahtAugust,
        currBahtSeptember, currBahtOctober, currBahtNovember, currBahtDecember, currTotalBaht, oldBahtJanuary, oldBahtFebruary, oldBahtMarch, oldBahtApril, oldBahtMay,
        oldBahtJune, oldBahtJuly, oldBahtAugust, oldBahtSeptember, oldBahtOctober, oldBahtNovember, oldBahtDecember, oldTotalBaht);

}

function unitGraph(year, target1, target2, target3, target4, target5, target6, target7, target8, target9, target10, target11, target12, targetTotal, currJanuary, currFebruary, currMarch, currApril, currMay, currJune, currJuly, currAugust, currSeptember, currOctober, currNovember, currDecember, currTotal, oldJanuary, oldFebruary, oldMarch, oldApril, oldMay, oldJune, oldJuly, oldAugust, oldSeptember, oldOctober, oldNovember, oldDecember, oldTotal) {

    Highcharts.setOptions({
        colors: ['#BFD641', '#ECDB54', '#69acde']
    });

    Highcharts.chart('Unit', {
        chart: {
            renderTo: 'Unit',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 100
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        selectDataTable(nameMonth, month, year);
                    }
                }
            }
        },
        title: {
            text: 'REM Sales Summary Report : ' + year + ' (Unit)'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        series: [{
            type: 'column',
            name: year - 1,
            data: [{
                y: oldJanuary,
                month: 1,
                value: accounting.formatNumber(oldJanuary)
            }, {
                y: oldFebruary,
                month: 2,
                value: accounting.formatNumber(oldFebruary)
            }, {
                y: oldMarch,
                month: 3,
                value: accounting.formatNumber(oldMarch)
            }, {
                y: oldApril,
                month: 4,
                value: accounting.formatNumber(oldApril)
            }, {
                y: oldMay,
                month: 5,
                value: accounting.formatNumber(oldMay)
            }, {
                y: oldJune,
                month: 6,
                value: accounting.formatNumber(oldJune)
            }, {
                y: oldJuly,
                month: 7,
                value: accounting.formatNumber(oldJuly)
            }, {
                y: oldAugust,
                month: 8,
                value: accounting.formatNumber(oldAugust)
            }, {
                y: oldSeptember,
                month: 9,
                value: accounting.formatNumber(oldSeptember)
            }, {
                y: oldOctober,
                month: 10,
                value: accounting.formatNumber(oldOctober)
            }, {
                y: oldNovember,
                month: 11,
                value: accounting.formatNumber(oldNovember)
            }, {
                y: oldDecember,
                month: 12,
                value: accounting.formatNumber(oldDecember)
            }]
        }, {
            type: 'column',
            name: year,
            data: [{
                y: currJanuary,
                month: 1,
                value: accounting.formatNumber(currJanuary)
            }, {
                y: currFebruary,
                month: 2,
                value: accounting.formatNumber(currFebruary)
            }, {
                y: currMarch,
                month: 3,
                value: accounting.formatNumber(currMarch)
            }, {
                y: currApril,
                month: 4,
                value: accounting.formatNumber(currApril)
            }, {
                y: currMay,
                month: 5,
                value: accounting.formatNumber(currMay)
            }, {
                y: currJune,
                month: 6,
                value: accounting.formatNumber(currJune)
            }, {
                y: currJuly,
                month: 7,
                value: accounting.formatNumber(currJuly)
            }, {
                y: currAugust,
                month: 8,
                value: accounting.formatNumber(currAugust)
            }, {
                y: currSeptember,
                month: 9,
                value: accounting.formatNumber(currSeptember)
            }, {
                y: currOctober,
                month: 10,
                value: accounting.formatNumber(currOctober)
            }, {
                y: currNovember,
                month: 11,
                value: accounting.formatNumber(currNovember)
            }, {
                y: currDecember,
                month: 12,
                value: accounting.formatNumber(currDecember)
            }]
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: target1,
                month: 1,
                value: accounting.formatNumber(target1)
            }, {
                y: target2,
                month: 2,
                value: accounting.formatNumber(target2)
            }, {
                y: target3,
                month: 3,
                value: accounting.formatNumber(target3)
            }, {
                y: target4,
                month: 4,
                value: accounting.formatNumber(target4)
            }, {
                y: target5,
                month: 5,
                value: accounting.formatNumber(target5)
            }, {
                y: target6,
                month: 6,
                value: accounting.formatNumber(target6)
            }, {
                y: target7,
                month: 7,
                value: accounting.formatNumber(target7)
            }, {
                y: target8,
                month: 8,
                value: accounting.formatNumber(target8)
            }, {
                y: target9,
                month: 9,
                value: accounting.formatNumber(target9)
            }, {
                y: target10,
                month: 10,
                value: accounting.formatNumber(target10)
            }, {
                y: target11,
                month: 11,
                value: accounting.formatNumber(target11)
            }, {
                y: target12,
                month: 12,
                value: accounting.formatNumber(target12)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot'
        }]
    });
}

function bahtGraph(year, target1, target2, target3, target4, target5, target6, target7, target8, target9, target10, target11, target12, targetTotal, currJanuary, currFebruary, currMarch, currApril, currMay, currJune, currJuly, currAugust, currSeptember, currOctober, currNovember, currDecember, currTotal, oldJanuary, oldFebruary, oldMarch, oldApril, oldMay, oldJune, oldJuly, oldAugust, oldSeptember, oldOctober, oldNovember, oldDecember, oldTotal) {

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
                depth: 50,
                viewDistance: 100
            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        selectDataTable(nameMonth, month, year);
                    }
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        title: {
            text: 'REM Sales Summary Report : ' + year + ' (Baht)'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        series: [{
            type: 'column',
            name: year - 1,
            data: [{
                y: oldJanuary,
                month: 1,
                value: accounting.formatMoney(oldJanuary, "฿")
            }, {
                y: oldFebruary,
                month: 2,
                value: accounting.formatMoney(oldFebruary, "฿")
            }, {
                y: oldMarch,
                month: 3,
                value: accounting.formatMoney(oldMarch, "฿")
            }, {
                y: oldApril,
                month: 4,
                value: accounting.formatMoney(oldApril, "฿")
            }, {
                y: oldMay,
                month: 5,
                value: accounting.formatMoney(oldMay, "฿")
            }, {
                y: oldJune,
                month: 6,
                value: accounting.formatMoney(oldJune, "฿")
            }, {
                y: oldJuly,
                month: 7,
                value: accounting.formatMoney(oldJuly, "฿")
            }, {
                y: oldAugust,
                month: 8,
                value: accounting.formatMoney(oldAugust, "฿")
            }, {
                y: oldSeptember,
                month: 9,
                value: accounting.formatMoney(oldSeptember, "฿")
            }, {
                y: oldOctober,
                month: 10,
                value: accounting.formatMoney(oldOctober, "฿")
            }, {
                y: oldNovember,
                month: 11,
                value: accounting.formatMoney(oldNovember, "฿")
            }, {
                y: oldDecember,
                month: 12,
                value: accounting.formatMoney(oldDecember, "฿")
            }]
        }, {
            type: 'column',
            name: year,
            data: [{
                y: currJanuary,
                month: 1,
                value: accounting.formatMoney(currJanuary, "฿")
            }, {
                y: currFebruary,
                month: 2,
                value: accounting.formatMoney(currFebruary, "฿")
            }, {
                y: currMarch,
                month: 3,
                value: accounting.formatMoney(currMarch, "฿")
            }, {
                y: currApril,
                month: 4,
                value: accounting.formatMoney(currApril, "฿")
            }, {
                y: currMay,
                month: 5,
                value: accounting.formatMoney(currMay, "฿")
            }, {
                y: currJune,
                month: 6,
                value: accounting.formatMoney(currJune, "฿")
            }, {
                y: currJuly,
                month: 7,
                value: accounting.formatMoney(currJuly, "฿")
            }, {
                y: currAugust,
                month: 8,
                value: accounting.formatMoney(currAugust, "฿")
            }, {
                y: currSeptember,
                month: 9,
                value: accounting.formatMoney(currSeptember, "฿")
            }, {
                y: currOctober,
                month: 10,
                value: accounting.formatMoney(currOctober, "฿")
            }, {
                y: currNovember,
                month: 11,
                value: accounting.formatMoney(currNovember, "฿")
            }, {
                y: currDecember,
                month: 12,
                value: accounting.formatMoney(currDecember, "฿")
            }]
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: target1,
                month: 1,
                value: accounting.formatMoney(target1, "฿")
            }, {
                y: target2,
                month: 2,
                value: accounting.formatMoney(target2, "฿")
            }, {
                y: target3,
                month: 3,
                value: accounting.formatMoney(target3, "฿")
            }, {
                y: target4,
                month: 4,
                value: accounting.formatMoney(target4, "฿")
            }, {
                y: target5,
                month: 5,
                value: accounting.formatMoney(target5, "฿")
            }, {
                y: target6,
                month: 6,
                value: accounting.formatMoney(target6, "฿")
            }, {
                y: target7,
                month: 7,
                value: accounting.formatMoney(target7, "฿")
            }, {
                y: target8,
                month: 8,
                value: accounting.formatMoney(target8, "฿")
            }, {
                y: target9,
                month: 9,
                value: accounting.formatMoney(target9, "฿")
            }, {
                y: target10,
                month: 10,
                value: accounting.formatMoney(target10, "฿")
            }, {
                y: target11,
                month: 11,
                value: accounting.formatMoney(target11, "฿")
            }, {
                y: target12,
                month: 12,
                value: accounting.formatMoney(target12, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot'
        }]
    });
}