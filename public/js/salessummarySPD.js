$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Hide Yearly Table
    $('#Quarterly').hide();

    // Set Year and Select Data
    var year = $("a.date-picker-year").text();
    selectData(year);

    // Text in Table
    $('#allBahtActualNow').text("Actual " + year);
    $('#allBahtTargetNow').text("Target " + year);
    $('#allUnitActualNow').text("Actual " + year);
    $('#allUnitTargetNow').text("Target " + year);
    $('#allBahtActualOld').text("Actual " + (year - 1));
    $('#allUnitActualOld').text("Actual " + (year - 1));
    $('#ambBahtActualNow').text("Actual " + year);
    $('#ambBahtTargetNow').text("Target " + year);
    $('#ambUnitActualNow').text("Actual " + year);
    $('#ambUnitTargetNow').text("Target " + year);
    $('#ambBahtActualOld').text("Actual " + (year - 1));
    $('#ambUnitActualOld').text("Actual " + (year - 1));
    $('#mcbBahtActualNow').text("Actual " + year);
    $('#mcbBahtTargetNow').text("Target " + year);
    $('#mcbUnitActualNow').text("Actual " + year);
    $('#mcbUnitTargetNow').text("Target " + year);
    $('#mcbBahtActualOld').text("Actual " + (year - 1));
    $('#mcbUnitActualOld').text("Actual " + (year - 1));
    $('#allBahtActualQNow').text("Actual " + year);
    $('#allBahtTargetQNow').text("Target " + year);
    $('#allUnitActualQNow').text("Actual " + year);
    $('#allUnitTargetQNow').text("Target " + year);
    $('#allBahtActualQOld').text("Actual " + (year - 1));
    $('#allUnitActualQOld').text("Actual " + (year - 1));
    $('#ambBahtActualQNow').text("Actual " + year);
    $('#ambBahtTargetQNow').text("Target " + year);
    $('#ambUnitActualQNow').text("Actual " + year);
    $('#ambUnitTargetQNow').text("Target " + year);
    $('#ambBahtActualQOld').text("Actual " + (year - 1));
    $('#ambUnitActualQOld').text("Actual " + (year - 1));
    $('#mcbBahtActualQNow').text("Actual " + year);
    $('#mcbBahtTargetQNow').text("Target " + year);
    $('#mcbUnitActualQNow').text("Actual " + year);
    $('#mcbUnitTargetQNow').text("Target " + year);
    $('#mcbBahtActualQOld').text("Actual " + (year - 1));
    $('#mcbUnitActualQOld').text("Actual " + (year - 1));

    //Change Year
    $(".date-picker-year").datepicker({
        minViewMode: 2,
        format: 'yyyy',
        autoclose: true,
        startDate: '-1y',
        endDate: 'y',
    }).on("changeYear", function(e) {
        var currYear = String(e.date).split(" ")[3];
        $(".date-picker-year").text(currYear);
        $('#allBahtActualNow').text("Actual " + currYear);
        $('#allBahtTargetNow').text("Target " + currYear);
        $('#allUnitActualNow').text("Actual " + currYear);
        $('#allUnitTargetNow').text("Target " + currYear);
        $('#allBahtActualOld').text("Actual " + (currYear - 1));
        $('#allUnitActualOld').text("Actual " + (currYear - 1));
        $('#ambBahtActualNow').text("Actual " + currYear);
        $('#ambBahtTargetNow').text("Target " + currYear);
        $('#ambUnitActualNow').text("Actual " + currYear);
        $('#ambUnitTargetNow').text("Target " + currYear);
        $('#ambBahtActualOld').text("Actual " + (currYear - 1));
        $('#ambUnitActualOld').text("Actual " + (currYear - 1));
        $('#mcbBahtActualNow').text("Actual " + currYear);
        $('#mcbBahtTargetNow').text("Target " + currYear);
        $('#mcbUnitActualNow').text("Actual " + currYear);
        $('#mcbUnitTargetNow').text("Target " + currYear);
        $('#mcbBahtActualOld').text("Actual " + (currYear - 1));
        $('#mcbUnitActualOld').text("Actual " + (currYear - 1));
        $('#allBahtActualQNow').text("Actual " + currYear);
        $('#allBahtTargetQNow').text("Target " + currYear);
        $('#allUnitActualQNow').text("Actual " + currYear);
        $('#allUnitTargetQNow').text("Target " + currYear);
        $('#allBahtActualQOld').text("Actual " + (currYear - 1));
        $('#allUnitActualQOld').text("Actual " + (currYear - 1));
        $('#ambBahtActualQNow').text("Actual " + currYear);
        $('#ambBahtTargetQNow').text("Target " + currYear);
        $('#ambUnitActualQNow').text("Actual " + currYear);
        $('#ambUnitTargetQNow').text("Target " + currYear);
        $('#ambBahtActualQOld').text("Actual " + (currYear - 1));
        $('#ambUnitActualQOld').text("Actual " + (currYear - 1));
        $('#mcbBahtActualQNow').text("Actual " + currYear);
        $('#mcbBahtTargetQNow').text("Target " + currYear);
        $('#mcbUnitActualQNow').text("Actual " + currYear);
        $('#mcbUnitTargetQNow').text("Target " + currYear);
        $('#mcbBahtActualQOld').text("Actual " + (currYear - 1));
        $('#mcbUnitActualQOld').text("Actual " + (currYear - 1));
        selectData(currYear);
    });

    //Hide Table
    $('#AMBBAHTTable').hide();
    $('#AMBUNITTable').hide();
    $('#MCBBAHTTable').hide();
    $('#MCBUNITTable').hide();
    $('#AMBQBAHTTable').hide();
    $('#AMBQUNITTable').hide();
    $('#MCBQBAHTTable').hide();
    $('#MCBQUNITTable').hide();

    $(document).on("click", "#pdf", function() {

        if ($("#Quarterly").css('display') == 'none') {
            var Ytype = $("ul.typeY > li.active").text();
            if (Ytype == "Graph") {
                var arr = new Array();
                $("#modeHidden").val("Yearly");
                $("#typeHidden").val("Graph");
                $("#currYear").val($("a.date-picker-year").text());
                arr.push($('#Baht').highcharts());
                arr.push($('#Unit').highcharts());

                save_chart(arr, function(result) {
                    $('#downloadPDF').submit();
                });

            } else {
                $("#modeHidden").val("Yearly");
                $("#typeHidden").val("Table");
                $("#currYear").val($("a.date-picker-year").text());
                $('#downloadPDF').submit();
            }
        } else {
            var Qtype = $("ul.typeQ > li.active").text();
            if (Qtype == "Graph") {
                var arr = new Array();
                $("#modeHidden").val("Quarterly");
                $("#typeHidden").val("Graph");
                $("#currYear").val($("a.date-picker-year").text());
                arr.push($('#BahtQ').highcharts());
                arr.push($('#UnitQ').highcharts());

                save_chart(arr, function(result) {
                    $('#downloadPDF').submit();
                });

            } else {
                $("#modeHidden").val("Quarterly");
                $("#typeHidden").val("Table");
                $("#currYear").val($("a.date-picker-year").text());
                $('#downloadPDF').submit();
            }
        }

    });

    $(document).on("click", "#mode", function() {

        var changMode = $(this).html();
        if (changMode == '<i class="fa fa-bar-chart"></i> Quarterly') {
            $(this).html('<i class="fa fa-bar-chart"></i> Year');
            $('#Yearly').removeClass('animated fadeIn');
            $('#Quarterly').addClass('animated fadeIn');
            $('#Quarterly').show();
            $('#Yearly').hide();
        } else {
            $(this).html('<i class="fa fa-bar-chart"></i> Quarterly');
            $('#Quarterly').removeClass('animated fadeIn');
            $('#Yearly').addClass('animated fadeIn');
            $('#Yearly').show();
            $('#Quarterly').hide();
        }

    });

    $(document).on("click", "#itemGroup", function() {

        var itemGroup = $(this).val();
        if (itemGroup == "AMB") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#AMBBAHTTable').show();
            $('#AMBUNITTable').show();
            $('#MCBBAHTTable').hide();
            $('#MCBUNITTable').hide();
        } else if (itemGroup == "MCB") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#AMBBAHTTable').hide();
            $('#AMBUNITTable').hide();
            $('#MCBBAHTTable').show();
            $('#MCBUNITTable').show();
        } else {
            $('#allBAHTTable').show();
            $('#allUNITTable').show();
            $('#AMBBAHTTable').hide();
            $('#AMBUNITTable').hide();
            $('#MCBBAHTTable').hide();
            $('#MCBUNITTable').hide();
        }

    });

    $(document).on("click", "#itemGroupQ", function() {

        var itemGroup = $(this).val();
        if (itemGroup == "AMB") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#AMBQBAHTTable').show();
            $('#AMBQUNITTable').show();
            $('#MCBQBAHTTable').hide();
            $('#MCBQUNITTable').hide();
        } else if (itemGroup == "MCB") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#AMBQBAHTTable').hide();
            $('#AMBQUNITTable').hide();
            $('#MCBQBAHTTable').show();
            $('#MCBQUNITTable').show();
        } else {
            $('#allQBAHTTable').show();
            $('#allQUNITTable').show();
            $('#AMBQBAHTTable').hide();
            $('#AMBQUNITTable').hide();
            $('#MCBQBAHTTable').hide();
            $('#MCBQUNITTable').hide();
        }

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
            $(".loadGraph").css("opacity", 0.2);
            $(".loadTable").css("opacity", 0.2);
            $(".loadGraphQ").css("opacity", 0.2);
            $(".loadTableQ").css("opacity", 0.2);
            $(".loading-img").show();
            $(".loading-img2").show();
        },
        url: '/SalesAnalysis/spd/selectSPD',
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
                var route = '/SalesAnalysis/system/targetmaster/create';
                swal({
                    title: "Target Year " + year + " not found.",
                    text: "Please Create Target Master!",
                    icon: 'info',
                    showConfirmButton: false
                });
                calData(year, data);
            } else if (data[3] == "nullData" && data[4] == "nullTarget") {
                var base = window.location.origin
                var route = '/SalesAnalysis/system/targetmaster/create';
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
            $(".loadGraphQ").css("opacity", 1);
            $(".loadTableQ").css("opacity", 1);
            $(".loading-img").hide();
            $(".loading-img2").hide();
        }
    });
}

function selectDataTable(nameMonth, month, year, type) {
    $.ajax({
        url: '/SalesAnalysis/spd/selectDataTableSPD',
        type: "POST",
        data: { "month": month, "year": year, "type": type },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {

                var Item = data[0];
                var Cust = data[1];
                var Product = $("#Product");
                var Customer = $("#Customer");

                Product.DataTable().destroy();
                var tableProduct = Product.DataTable({
                    dom: 'Bfrtip',
                    buttons: [{
                        text: 'All',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Product.DataTable().column(3).search('').draw();
                        }
                    }, {
                        text: 'AMB',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Product.DataTable().column(3).search('AMB').draw();
                        }
                    }, {
                        text: 'MCB',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Product.DataTable().column(3).search('MCB').draw();
                        }
                    }],
                    data: Item,
                    columns: [{
                            data: "index",
                            defaultContent: ''
                        },
                        { data: "ItemCode" },
                        { data: "Dscription" },
                        { data: "ItemGroupShort" },
                        { data: "Brand" },
                        { data: "Commodity" },
                        {
                            data: "Quantity",
                            className: "uniqueClassName text-right",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            className: "uniqueClassName text-right",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data, 2);
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
                            .column(6, { search: 'applied' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageUnit = api
                            .column(6, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        Total = api
                            .column(7, { search: 'applied' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(7, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Update footer by showing the total with the reference of the column index 
                        $(api.column(5).footer()).html('Grand Total');
                        $(api.column(6).footer()).html(
                            accounting.formatNumber(Unit)
                        );
                        $(api.column(7).footer()).html(
                            accounting.formatNumber(Total, 2)
                        );
                    },
                    "order": [
                        [7, "desc"]
                    ],
                    'columnDefs': [{
                            "targets": 0,
                            "searchable": false,
                            "orderable": false,
                            "className": "text-center",
                            "width": "5%"
                        }, {
                            "targets": 1, // your case first column
                            "className": "text-center",
                            "width": "10%"
                        },
                        {
                            "targets": 2,
                            "className": "text-left",
                            "width": "21%"
                        },
                        {
                            "targets": 3,
                            "visible": false
                        },
                        {
                            "targets": 4,
                            "className": "text-center",
                            "width": "10%"
                        },
                        {
                            "targets": 5,
                            "className": "text-center",
                            "width": "11%"
                        },
                        {
                            "targets": 6,
                            "className": "text-right",
                            "width": "15%"
                        },
                        {
                            "targets": 7,
                            "className": "text-right",
                            "width": "15%"
                        }
                    ],
                    "lengthMenu": [
                        [5, 10, 25, 50, -1],
                        [5, 10, 25, 50, "All"]
                    ]
                });

                tableProduct.on('order.dt search.dt', function() {
                    tableProduct.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                        tableProduct.cell(cell).invalidate('dom');
                    });
                }).draw();

                new $.fn.dataTable.Buttons(tableProduct, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            footer: true,
                            title: "SPD Sales Summary by Product : " + nameMonth + " " + year
                        }, {
                            extend: 'pdf',
                            footer: true,
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: "RSS" + nameMonth + year,
                            title: "SPD Sales Summary by Product : " + nameMonth + " " + year,
                            exportOptions: {
                                columns: [0, 1, 2, 4, 5, 6, 7],
                                search: 'applied',
                                order: 'applied'
                            },
                            customize: function(doc) {
                                //Remove the title created by datatTables
                                doc.content.splice(0, 1);
                                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                var dataDate = moment().subtract(1, 'days').format("DD/MM/YYYY");
                                var jsDate = moment().format("DD/MM/YYYY h:mm:ss");
                                // Logo converted to base64
                                // var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
                                // The above call should work, but not when called from codepen.io
                                // So we use a online converter and paste the string in.
                                // Done on http://codebeautify.org/image-to-base64-converter
                                // It's a LONG string scroll down to see the rest of the code !!!
                                var logo = 'data:image/jpeg;base64,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';
                                // A documentation reference can be found at
                                // https://github.com/bpampuch/pdfmake#getting-started
                                // Set page margins [left,top,right,bottom] or [horizontal,vertical]
                                // or one number for equal spread
                                // It's important to create enough space at the top for a header !!!
                                doc.pageMargins = [20, 85, 20, 40];
                                // Set the font size fot the entire document
                                doc.defaultStyle.fontSize = 10;
                                // Set the fontsize for the table header
                                doc.styles.tableHeader.fontSize = 12;
                                // Create a header object with 3 columns
                                // Left side: Logo
                                // Middle: brandname
                                // Right side: A document title

                                var userName = $('span#userName').text();
                                var userRoles = $('span#roles').text();

                                doc['header'] = (function() {
                                    return {
                                        margin: 20,
                                        table: {
                                            widths: ["auto", 250, "*"],
                                            body: [
                                                [{ rowSpan: 2, image: logo, width: 40 }, { text: 'Sales Analysis Portal V.1.0', alignment: 'left', bold: true, fontSize: 11 },
                                                    { text: 'Data as of: ' + dataDate.toString(), alignment: 'right', bold: true, fontSize: 11 }
                                                ],
                                                [{}, { text: 'Yuasa Battery (Thailand) Public Company Limited', alignment: 'left', bold: true, fontSize: 11 },
                                                    { text: userName + " - " + userRoles, alignment: 'right', bold: true, fontSize: 11 }
                                                ],
                                                [{ colSpan: 3, text: "SPD Sales Summary by Product : " + nameMonth + " " + year, alignment: 'center', bold: true, fontSize: 11 }]
                                            ]

                                        },
                                        layout: 'noBorders'
                                    }
                                });
                                // Create a footer object with 2 columns
                                // Left side: report creation date
                                // Right side: current page and total pages
                                doc['footer'] = (function(page, pages) {
                                    return {
                                        columns: [{
                                                alignment: 'left',
                                                text: ['Created on : ', { text: jsDate.toString() }]
                                            },
                                            {
                                                alignment: 'right',
                                                text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                            }
                                        ],
                                        margin: 20
                                    }
                                });
                                // Change dataTable layout (Table styling)
                                // To use predefined layouts uncomment the line below and comment the custom lines below
                                // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
                                var objLayout = {};
                                objLayout['hLineWidth'] = function(i) { return .5; };
                                objLayout['vLineWidth'] = function(i) { return .5; };
                                objLayout['hLineColor'] = function(i) { return '#aaa'; };
                                objLayout['vLineColor'] = function(i) { return '#aaa'; };
                                objLayout['paddingLeft'] = function(i) { return 4; };
                                objLayout['paddingRight'] = function(i) { return 4; };
                                doc.content[0].layout = objLayout;
                                doc.content[0].table.widths = [30, 70, "*", 45, 65, 60, 80];
                                var rowCount = doc.content[0].table.body.length;
                                for (i = 1; i < rowCount; i++) {
                                    doc.content[0].table.body[i][0].alignment = 'center';
                                    doc.content[0].table.body[i][3].alignment = 'center';
                                    doc.content[0].table.body[i][4].alignment = 'center';
                                    doc.content[0].table.body[i][5].alignment = 'right';
                                    doc.content[0].table.body[i][6].alignment = 'right';
                                };

                            }
                        }, {
                            extend: 'csv',
                            footer: true,
                            title: "SPD Sales Summary by Product : " + nameMonth + " " + year,
                        }
                    ]
                });

                tableProduct.buttons(1, null).container().appendTo(
                    tableProduct.table().container()
                );


                Customer.DataTable().destroy();
                var tableCustomer = Customer.DataTable({
                    dom: 'Bfrtip',
                    buttons: [{
                        text: 'All',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Customer.DataTable().column(4).search('').draw();
                        }
                    }, {
                        text: 'AMB',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Customer.DataTable().column(4).search('AMB').draw();
                        }
                    }, {
                        text: 'MCB',
                        className: "btn-xs margin",
                        action: function(e, dt, node, config) {
                            Customer.DataTable().column(4).search('MCB').draw();
                        }
                    }],
                    data: Cust,
                    columns: [{
                            data: "index",
                            defaultContent: ''
                        },
                        { data: "CustCode" },
                        { data: "CustName" },
                        { data: "MasterDealer" },
                        { data: "ItemGroupShort" },
                        {
                            data: "Quantity",
                            className: "uniqueClassName text-right",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data);
                            }
                        },
                        {
                            data: "Total",
                            className: "uniqueClassName text-right",
                            render: function(data, type, full) {
                                return accounting.formatNumber(data, 2);
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
                            .column(5, { search: 'applied' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageUnit = api
                            .column(5, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over all pages
                        Total = api
                            .column(6, { search: 'applied' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Total over this page
                        pageTotal = api
                            .column(6, { page: 'current' })
                            .data()
                            .reduce(function(a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);

                        // Update footer by showing the total with the reference of the column index 
                        $(api.column(3).footer()).html('Grand Total');
                        $(api.column(5).footer()).html(
                            accounting.formatNumber(Unit)
                        );
                        $(api.column(6).footer()).html(
                            accounting.formatNumber(Total, 2)
                        );
                    },
                    "order": [
                        [6, "desc"]
                    ],
                    'columnDefs': [{
                            "targets": 0,
                            "className": "text-center",
                            "width": "5%"
                        }, {
                            "targets": 1,
                            "className": "text-center",
                            "width": "10%"
                        },
                        {
                            "targets": 2,
                            "className": "text-left",
                            "width": "28%"
                        },
                        {
                            "targets": 3,
                            "className": "text-center",
                            "width": "14%"
                        },
                        {
                            "targets": 4,
                            "visible": false
                        },
                        {
                            "targets": 5,
                            "width": "15%"
                        },
                        {
                            "targets": 6,
                            "width": "15%"
                        }
                    ],
                    "lengthMenu": [
                        [5, 10, 25, 50, -1],
                        [5, 10, 25, 50, "All"]
                    ]
                });

                tableCustomer.on('order.dt search.dt', function() {
                    tableCustomer.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
                        cell.innerHTML = i + 1;
                        tableCustomer.cell(cell).invalidate('dom');
                    });
                }).draw();

                new $.fn.dataTable.Buttons(tableCustomer, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            footer: true,
                            title: "SPD Sales Summary by Customer : " + nameMonth + " " + year,
                        }, {
                            extend: 'pdf',
                            footer: true,
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: "RSS" + nameMonth + year,
                            title: "SPD Sales Summary by Customer : " + nameMonth + " " + year,
                            exportOptions: {
                                columns: [0, 1, 2, 3, 5, 6],
                                search: 'applied',
                                order: 'applied'
                            },
                            customize: function(doc) {
                                //Remove the title created by datatTables
                                doc.content.splice(0, 1);
                                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                                var dataDate = moment().subtract(1, 'days').format("DD/MM/YYYY");
                                var jsDate = moment().format("DD/MM/YYYY h:mm:ss");
                                // Logo converted to base64
                                // var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
                                // The above call should work, but not when called from codepen.io
                                // So we use a online converter and paste the string in.
                                // Done on http://codebeautify.org/image-to-base64-converter
                                // It's a LONG string scroll down to see the rest of the code !!!
                                var logo = 'data:image/jpeg;base64,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';
                                // A documentation reference can be found at
                                // https://github.com/bpampuch/pdfmake#getting-started
                                // Set page margins [left,top,right,bottom] or [horizontal,vertical]
                                // or one number for equal spread
                                // It's important to create enough space at the top for a header !!!
                                doc.pageMargins = [20, 85, 20, 40];
                                // Set the font size fot the entire document
                                doc.defaultStyle.fontSize = 10;
                                // Set the fontsize for the table header
                                doc.styles.tableHeader.fontSize = 12;
                                // Create a header object with 3 columns
                                // Left side: Logo
                                // Middle: brandname
                                // Right side: A document title

                                var userName = $('span#userName').text();
                                var userRoles = $('span#roles').text();

                                doc['header'] = (function() {
                                    return {
                                        margin: 20,
                                        table: {
                                            widths: ["auto", 250, "*"],
                                            body: [
                                                [{ rowSpan: 2, image: logo, width: 40 }, { text: 'Sales Analysis Portal V.1.0', alignment: 'left', bold: true, fontSize: 11 },
                                                    { text: 'Data as of: ' + dataDate.toString(), alignment: 'right', bold: true, fontSize: 11 }
                                                ],
                                                [{}, { text: 'Yuasa Battery (Thailand) Public Company Limited', alignment: 'left', bold: true, fontSize: 11 },
                                                    { text: userName + " - " + userRoles, alignment: 'right', bold: true, fontSize: 11 }
                                                ],
                                                [{ colSpan: 3, text: "SPD Sales Summary by Customer : " + nameMonth + " " + year, alignment: 'center', bold: true, fontSize: 11 }]
                                            ]

                                        },
                                        layout: 'noBorders'
                                    }
                                });
                                // Create a footer object with 2 columns
                                // Left side: report creation date
                                // Right side: current page and total pages
                                doc['footer'] = (function(page, pages) {
                                    return {
                                        columns: [{
                                                alignment: 'left',
                                                text: ['Created on : ', { text: jsDate.toString() }]
                                            },
                                            {
                                                alignment: 'right',
                                                text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                            }
                                        ],
                                        margin: 20
                                    }
                                });
                                // Change dataTable layout (Table styling)
                                // To use predefined layouts uncomment the line below and comment the custom lines below
                                // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
                                var objLayout = {};
                                objLayout['hLineWidth'] = function(i) { return .5; };
                                objLayout['vLineWidth'] = function(i) { return .5; };
                                objLayout['hLineColor'] = function(i) { return '#aaa'; };
                                objLayout['vLineColor'] = function(i) { return '#aaa'; };
                                objLayout['paddingLeft'] = function(i) { return 4; };
                                objLayout['paddingRight'] = function(i) { return 4; };
                                doc.content[0].layout = objLayout;
                                doc.content[0].table.widths = [30, 80, "*", 70, 60, 80];
                                var rowCount = doc.content[0].table.body.length;
                                for (i = 1; i < rowCount; i++) {
                                    doc.content[0].table.body[i][0].alignment = 'center';
                                    doc.content[0].table.body[i][4].alignment = 'right';
                                    doc.content[0].table.body[i][5].alignment = 'right';
                                };

                            }
                        }, {
                            extend: 'csv',
                            footer: true,
                            title: "SPD Sales Summary by Customer : " + nameMonth + " " + year,
                        }
                    ]
                });

                tableCustomer.buttons(1, null).container().appendTo(
                    tableCustomer.table().container()
                );

                if (type == "M") {
                    $("#headModal").text("SPD Sales Summary: " + nameMonth + " " + year);
                } else {
                    $("#headModal").text("SPD Sales Summary: " + nameMonth + " of year " + year);
                }
                $("#rightModal").text("SPD");
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

    if (data[2][0].ItemGroup == 'AMB') {
        var targetAMB = data[2][0];
        var targetMCB = data[2][1];
    } else {
        var targetMCB = data[2][0];
        var targetAMB = data[2][1];
    }

    var currAMBTotalBaht = 0,
        currAMBTotalUnit = 0,
        oldAMBTotalBaht = 0,
        oldAMBTotalUnit = 0,
        currAMBUnitJanuary = 0,
        currAMBUnitFebruary = 0,
        currAMBUnitMarch = 0,
        currAMBUnitApril = 0,
        currAMBUnitMay = 0,
        currAMBUnitJune = 0,
        currAMBUnitJuly = 0,
        currAMBUnitAugust = 0,
        currAMBUnitSeptember = 0,
        currAMBUnitOctober = 0,
        currAMBUnitNovember = 0,
        currAMBUnitDecember = 0,
        currAMBBahtJanuary = 0,
        currAMBBahtFebruary = 0,
        currAMBBahtMarch = 0,
        currAMBBahtApril = 0,
        currAMBBahtMay = 0,
        currAMBBahtJune = 0,
        currAMBBahtJuly = 0,
        currAMBBahtAugust = 0,
        currAMBBahtSeptember = 0,
        currAMBBahtOctober = 0,
        currAMBBahtNovember = 0,
        currAMBBahtDecember = 0,
        currAMBUnitQ1 = 0,
        currAMBBahtQ1 = 0,
        currAMBUnitQ2 = 0,
        currAMBBahtQ2 = 0,
        currAMBUnitQ3 = 0,
        currAMBBahtQ3 = 0,
        currAMBUnitQ4 = 0,
        currAMBBahtQ4 = 0,
        oldAMBUnitJanuary = 0,
        oldAMBUnitFebruary = 0,
        oldAMBUnitMarch = 0,
        oldAMBUnitApril = 0,
        oldAMBUnitMay = 0,
        oldAMBUnitJune = 0,
        oldAMBUnitJuly = 0,
        oldAMBUnitAugust = 0,
        oldAMBUnitSeptember = 0,
        oldAMBUnitOctober = 0,
        oldAMBUnitNovember = 0,
        oldAMBUnitDecember = 0,
        oldAMBBahtJanuary = 0,
        oldAMBBahtFebruary = 0,
        oldAMBBahtMarch = 0,
        oldAMBBahtApril = 0,
        oldAMBBahtMay = 0,
        oldAMBBahtJune = 0,
        oldAMBBahtJuly = 0,
        oldAMBBahtAugust = 0,
        oldAMBBahtSeptember = 0,
        oldAMBBahtOctober = 0,
        oldAMBBahtNovember = 0,
        oldAMBBahtDecember = 0,
        oldAMBUnitQ1 = 0,
        oldAMBBahtQ1 = 0,
        oldAMBUnitQ2 = 0,
        oldAMBBahtQ2 = 0,
        oldAMBUnitQ3 = 0,
        oldAMBBahtQ3 = 0,
        oldAMBUnitQ4 = 0,
        oldAMBBahtQ4 = 0,
        achieveAMBBahtJanuary = 0,
        achieveAMBBahtFebruary = 0,
        achieveAMBBahtMarch = 0,
        achieveAMBBahtApril = 0,
        achieveAMBBahtMay = 0,
        achieveAMBBahtJune = 0,
        achieveAMBBahtJuly = 0,
        achieveAMBBahtAugust = 0,
        achieveAMBBahtSeptember = 0,
        achieveAMBBahtOctober = 0,
        achieveAMBBahtNovember = 0,
        achieveAMBBahtDecember = 0,
        achieveAMBBahtQ1 = 0,
        achieveAMBUnitQ1 = 0,
        achieveAMBBahtQ2 = 0,
        achieveAMBUnitQ2 = 0,
        achieveAMBBahtQ3 = 0,
        achieveAMBUnitQ3 = 0,
        achieveAMBBahtQ4 = 0,
        achieveAMBUnitQ4 = 0,
        growthAMBBahtJanuary = 0,
        growthAMBBahtFebruary = 0,
        growthAMBBahtMarch = 0,
        growthAMBBahtApril = 0,
        growthAMBBahtMay = 0,
        growthAMBBahtJune = 0,
        growthAMBBahtJuly = 0,
        growthAMBBahtAugust = 0,
        growthAMBBahtSeptember = 0,
        growthAMBBahtOctober = 0,
        growthAMBBahtNovember = 0,
        growthAMBBahtDecember = 0,
        achieveAMBUnitJanuary = 0,
        achieveAMBUnitFebruary = 0,
        achieveAMBUnitMarch = 0,
        achieveAMBUnitApril = 0,
        achieveAMBUnitMay = 0,
        achieveAMBUnitJune = 0,
        achieveAMBUnitJuly = 0,
        achieveAMBUnitAugust = 0,
        achieveAMBUnitSeptember = 0,
        achieveAMBUnitOctober = 0,
        achieveAMBUnitNovember = 0,
        achieveAMBUnitDecember = 0,
        growthAMBUnitJanuary = 0,
        growthAMBUnitFebruary = 0,
        growthAMBUnitMarch = 0,
        growthAMBUnitApril = 0,
        growthAMBUnitMay = 0,
        growthAMBUnitJune = 0,
        growthAMBUnitJuly = 0,
        growthAMBUnitAugust = 0,
        growthAMBUnitSeptember = 0,
        growthAMBUnitOctober = 0,
        growthAMBUnitNovember = 0,
        growthAMBUnitDecember = 0,
        growthAMBBahtQ1 = 0,
        growthAMBUnitQ1 = 0,
        growthAMBBahtQ2 = 0,
        growthAMBUnitQ2 = 0,
        growthAMBBahtQ3 = 0,
        growthAMBUnitQ3 = 0,
        growthAMBBahtQ4 = 0,
        growthAMBUnitQ4 = 0,
        currMCBTotalBaht = 0,
        currMCBTotalUnit = 0,
        oldMCBTotalBaht = 0,
        oldMCBTotalUnit = 0,
        currMCBUnitJanuary = 0,
        currMCBUnitFebruary = 0,
        currMCBUnitMarch = 0,
        currMCBUnitApril = 0,
        currMCBUnitMay = 0,
        currMCBUnitJune = 0,
        currMCBUnitJuly = 0,
        currMCBUnitAugust = 0,
        currMCBUnitSeptember = 0,
        currMCBUnitOctober = 0,
        currMCBUnitNovember = 0,
        currMCBUnitDecember = 0,
        currMCBBahtJanuary = 0,
        currMCBBahtFebruary = 0,
        currMCBBahtMarch = 0,
        currMCBBahtApril = 0,
        currMCBBahtMay = 0,
        currMCBBahtJune = 0,
        currMCBBahtJuly = 0,
        currMCBBahtAugust = 0,
        currMCBBahtSeptember = 0,
        currMCBBahtOctober = 0,
        currMCBBahtNovember = 0,
        currMCBBahtDecember = 0,
        currMCBUnitQ1 = 0,
        currMCBBahtQ1 = 0,
        currMCBUnitQ2 = 0,
        currMCBBahtQ2 = 0,
        currMCBUnitQ3 = 0,
        currMCBBahtQ3 = 0,
        currMCBUnitQ4 = 0,
        currMCBBahtQ4 = 0,
        oldMCBUnitJanuary = 0,
        oldMCBUnitFebruary = 0,
        oldMCBUnitMarch = 0,
        oldMCBUnitApril = 0,
        oldMCBUnitMay = 0,
        oldMCBUnitJune = 0,
        oldMCBUnitJuly = 0,
        oldMCBUnitAugust = 0,
        oldMCBUnitSeptember = 0,
        oldMCBUnitOctober = 0,
        oldMCBUnitNovember = 0,
        oldMCBUnitDecember = 0,
        oldMCBBahtJanuary = 0,
        oldMCBBahtFebruary = 0,
        oldMCBBahtMarch = 0,
        oldMCBBahtApril = 0,
        oldMCBBahtMay = 0,
        oldMCBBahtJune = 0,
        oldMCBBahtJuly = 0,
        oldMCBBahtAugust = 0,
        oldMCBBahtSeptember = 0,
        oldMCBBahtOctober = 0,
        oldMCBBahtNovember = 0,
        oldMCBBahtDecember = 0,
        oldMCBUnitQ1 = 0,
        oldMCBBahtQ1 = 0,
        oldMCBUnitQ2 = 0,
        oldMCBBahtQ2 = 0,
        oldMCBUnitQ3 = 0,
        oldMCBBahtQ3 = 0,
        oldMCBUnitQ4 = 0,
        oldMCBBahtQ4 = 0,
        achieveMCBBahtJanuary = 0,
        achieveMCBBahtFebruary = 0,
        achieveMCBBahtMarch = 0,
        achieveMCBBahtApril = 0,
        achieveMCBBahtMay = 0,
        achieveMCBBahtJune = 0,
        achieveMCBBahtJuly = 0,
        achieveMCBBahtAugust = 0,
        achieveMCBBahtSeptember = 0,
        achieveMCBBahtOctober = 0,
        achieveMCBBahtNovember = 0,
        achieveMCBBahtDecember = 0,
        achieveMCBBahtQ1 = 0,
        achieveMCBUnitQ1 = 0,
        achieveMCBBahtQ2 = 0,
        achieveMCBUnitQ2 = 0,
        achieveMCBBahtQ3 = 0,
        achieveMCBUnitQ3 = 0,
        achieveMCBBahtQ4 = 0,
        achieveMCBUnitQ4 = 0,
        growthMCBBahtJanuary = 0,
        growthMCBBahtFebruary = 0,
        growthMCBBahtMarch = 0,
        growthMCBBahtApril = 0,
        growthMCBBahtMay = 0,
        growthMCBBahtJune = 0,
        growthMCBBahtJuly = 0,
        growthMCBBahtAugust = 0,
        growthMCBBahtSeptember = 0,
        growthMCBBahtOctober = 0,
        growthMCBBahtNovember = 0,
        growthMCBBahtDecember = 0,
        achieveMCBUnitJanuary = 0,
        achieveMCBUnitFebruary = 0,
        achieveMCBUnitMarch = 0,
        achieveMCBUnitApril = 0,
        achieveMCBUnitMay = 0,
        achieveMCBUnitJune = 0,
        achieveMCBUnitJuly = 0,
        achieveMCBUnitAugust = 0,
        achieveMCBUnitSeptember = 0,
        achieveMCBUnitOctober = 0,
        achieveMCBUnitNovember = 0,
        achieveMCBUnitDecember = 0,
        growthMCBUnitJanuary = 0,
        growthMCBUnitFebruary = 0,
        growthMCBUnitMarch = 0,
        growthMCBUnitApril = 0,
        growthMCBUnitMay = 0,
        growthMCBUnitJune = 0,
        growthMCBUnitJuly = 0,
        growthMCBUnitAugust = 0,
        growthMCBUnitSeptember = 0,
        growthMCBUnitOctober = 0,
        growthMCBUnitNovember = 0,
        growthMCBUnitDecember = 0,
        growthMCBBahtQ1 = 0,
        growthMCBUnitQ1 = 0,
        growthMCBBahtQ2 = 0,
        growthMCBUnitQ2 = 0,
        growthMCBBahtQ3 = 0,
        growthMCBUnitQ3 = 0,
        growthMCBBahtQ4 = 0,
        growthMCBUnitQ4 = 0;

    var groupedCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.ItemGroupShort;
    });

    var groupedOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.ItemGroupShort;
    });

    $.each(groupedCurrYear.AMB, function() {
        if (this.DocMonth == '1') {
            currAMBUnitJanuary += parseFloat(this.Quantity);
            currAMBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currAMBUnitFebruary += parseFloat(this.Quantity);
            currAMBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currAMBUnitMarch += parseFloat(this.Quantity);
            currAMBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currAMBUnitApril += parseFloat(this.Quantity);
            currAMBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currAMBUnitMay += parseFloat(this.Quantity);
            currAMBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currAMBUnitJune += parseFloat(this.Quantity);
            currAMBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currAMBUnitJuly += parseFloat(this.Quantity);
            currAMBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currAMBUnitAugust += parseFloat(this.Quantity);
            currAMBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currAMBUnitSeptember += parseFloat(this.Quantity);
            currAMBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currAMBUnitOctober += parseFloat(this.Quantity);
            currAMBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currAMBUnitNovember += parseFloat(this.Quantity);
            currAMBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currAMBUnitDecember += parseFloat(this.Quantity);
            currAMBBahtDecember += parseFloat(this.Total);
        }

        currAMBTotalBaht += parseFloat(this.Total);
        currAMBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.MCB, function() {
        if (this.DocMonth == '1') {
            currMCBUnitJanuary += parseFloat(this.Quantity);
            currMCBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currMCBUnitFebruary += parseFloat(this.Quantity);
            currMCBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currMCBUnitMarch += parseFloat(this.Quantity);
            currMCBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currMCBUnitApril += parseFloat(this.Quantity);
            currMCBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currMCBUnitMay += parseFloat(this.Quantity);
            currMCBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currMCBUnitJune += parseFloat(this.Quantity);
            currMCBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currMCBUnitJuly += parseFloat(this.Quantity);
            currMCBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currMCBUnitAugust += parseFloat(this.Quantity);
            currMCBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currMCBUnitSeptember += parseFloat(this.Quantity);
            currMCBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currMCBUnitOctober += parseFloat(this.Quantity);
            currMCBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currMCBUnitNovember += parseFloat(this.Quantity);
            currMCBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currMCBUnitDecember += parseFloat(this.Quantity);
            currMCBBahtDecember += parseFloat(this.Total);
        }

        currMCBTotalBaht += parseFloat(this.Total);
        currMCBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.AMB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currAMBUnitQ1 += parseFloat(this.Quantity);
            currAMBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currAMBUnitQ2 += parseFloat(this.Quantity);
            currAMBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currAMBUnitQ3 += parseFloat(this.Quantity);
            currAMBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currAMBUnitQ4 += parseFloat(this.Quantity);
            currAMBBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.MCB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currMCBUnitQ1 += parseFloat(this.Quantity);
            currMCBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currMCBUnitQ2 += parseFloat(this.Quantity);
            currMCBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currMCBUnitQ3 += parseFloat(this.Quantity);
            currMCBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currMCBUnitQ4 += parseFloat(this.Quantity);
            currMCBBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.AMB, function() {
        if (this.DocMonth == '1') {
            oldAMBUnitJanuary += parseFloat(this.Quantity);
            oldAMBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldAMBUnitFebruary += parseFloat(this.Quantity);
            oldAMBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldAMBUnitMarch += parseFloat(this.Quantity);
            oldAMBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldAMBUnitApril += parseFloat(this.Quantity);
            oldAMBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldAMBUnitMay += parseFloat(this.Quantity);
            oldAMBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldAMBUnitJune += parseFloat(this.Quantity);
            oldAMBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldAMBUnitJuly += parseFloat(this.Quantity);
            oldAMBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldAMBUnitAugust += parseFloat(this.Quantity);
            oldAMBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldAMBUnitSeptember += parseFloat(this.Quantity);
            oldAMBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldAMBUnitOctober += parseFloat(this.Quantity);
            oldAMBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldAMBUnitNovember += parseFloat(this.Quantity);
            oldAMBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldAMBUnitDecember += parseFloat(this.Quantity);
            oldAMBBahtDecember += parseFloat(this.Total);
        }

        oldAMBTotalBaht += parseFloat(this.Total);
        oldAMBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.MCB, function() {
        if (this.DocMonth == '1') {
            oldMCBUnitJanuary += parseFloat(this.Quantity);
            oldMCBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldMCBUnitFebruary += parseFloat(this.Quantity);
            oldMCBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldMCBUnitMarch += parseFloat(this.Quantity);
            oldMCBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldMCBUnitApril += parseFloat(this.Quantity);
            oldMCBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldMCBUnitMay += parseFloat(this.Quantity);
            oldMCBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldMCBUnitJune += parseFloat(this.Quantity);
            oldMCBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldMCBUnitJuly += parseFloat(this.Quantity);
            oldMCBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldMCBUnitAugust += parseFloat(this.Quantity);
            oldMCBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldMCBUnitSeptember += parseFloat(this.Quantity);
            oldMCBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldMCBUnitOctober += parseFloat(this.Quantity);
            oldMCBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldMCBUnitNovember += parseFloat(this.Quantity);
            oldMCBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldMCBUnitDecember += parseFloat(this.Quantity);
            oldMCBBahtDecember += parseFloat(this.Total);
        }

        oldMCBTotalBaht += parseFloat(this.Total);
        oldMCBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.AMB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldAMBUnitQ1 += parseFloat(this.Quantity);
            oldAMBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldAMBUnitQ2 += parseFloat(this.Quantity);
            oldAMBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldAMBUnitQ3 += parseFloat(this.Quantity);
            oldAMBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldAMBUnitQ4 += parseFloat(this.Quantity);
            oldAMBBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.MCB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldMCBUnitQ1 += parseFloat(this.Quantity);
            oldMCBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldMCBUnitQ2 += parseFloat(this.Quantity);
            oldMCBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldMCBUnitQ3 += parseFloat(this.Quantity);
            oldMCBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldMCBUnitQ4 += parseFloat(this.Quantity);
            oldMCBBahtQ4 += parseFloat(this.Total);
        }

    });

    growthAMBBahtJanuary = ((currAMBBahtJanuary - oldAMBBahtJanuary) * 100) / oldAMBBahtJanuary;
    growthAMBBahtFebruary = ((currAMBBahtFebruary - oldAMBBahtFebruary) * 100) / oldAMBBahtFebruary;
    growthAMBBahtMarch = ((currAMBBahtMarch - oldAMBBahtMarch) * 100) / oldAMBBahtMarch;
    growthAMBBahtApril = ((currAMBBahtApril - oldAMBBahtApril) * 100) / oldAMBBahtApril;
    growthAMBBahtMay = ((currAMBBahtMay - oldAMBBahtMay) * 100) / oldAMBBahtMay;
    growthAMBBahtJune = ((currAMBBahtJune - oldAMBBahtJune) * 100) / oldAMBBahtJune;
    growthAMBBahtJuly = ((currAMBBahtJuly - oldAMBBahtJuly) * 100) / oldAMBBahtJuly;
    growthAMBBahtAugust = ((currAMBBahtAugust - oldAMBBahtAugust) * 100) / oldAMBBahtAugust;
    growthAMBBahtSeptember = ((currAMBBahtSeptember - oldAMBBahtSeptember) * 100) / oldAMBBahtSeptember;
    growthAMBBahtOctober = ((currAMBBahtOctober - oldAMBBahtOctober) * 100) / oldAMBBahtOctober;
    growthAMBBahtNovember = ((currAMBBahtNovember - oldAMBBahtNovember) * 100) / oldAMBBahtNovember;
    growthAMBBahtDecember = ((currAMBBahtDecember - oldAMBBahtDecember) * 100) / oldAMBBahtDecember;
    growthAMBBahtTotal = ((currAMBTotalBaht - oldAMBTotalBaht) * 100) / oldAMBTotalBaht;
    growthAMBBahtQ1 = ((currAMBBahtQ1 - oldAMBBahtQ1) * 100) / oldAMBBahtQ1;
    growthAMBBahtQ2 = ((currAMBBahtQ2 - oldAMBBahtQ2) * 100) / oldAMBBahtQ2;
    growthAMBBahtQ3 = ((currAMBBahtQ3 - oldAMBBahtQ3) * 100) / oldAMBBahtQ3;
    growthAMBBahtQ4 = ((currAMBBahtQ4 - oldAMBBahtQ4) * 100) / oldAMBBahtQ4;

    growthAMBUnitJanuary = ((currAMBUnitJanuary - oldAMBUnitJanuary) * 100) / oldAMBUnitJanuary;
    growthAMBUnitFebruary = ((currAMBUnitFebruary - oldAMBUnitFebruary) * 100) / oldAMBUnitFebruary;
    growthAMBUnitMarch = ((currAMBUnitMarch - oldAMBUnitMarch) * 100) / oldAMBUnitMarch;
    growthAMBUnitApril = ((currAMBUnitApril - oldAMBUnitApril) * 100) / oldAMBUnitApril;
    growthAMBUnitMay = ((currAMBUnitMay - oldAMBUnitMay) * 100) / oldAMBUnitMay;
    growthAMBUnitJune = ((currAMBUnitJune - oldAMBUnitJune) * 100) / oldAMBUnitJune;
    growthAMBUnitJuly = ((currAMBUnitJuly - oldAMBUnitJuly) * 100) / oldAMBUnitJuly;
    growthAMBUnitAugust = ((currAMBUnitAugust - oldAMBUnitAugust) * 100) / oldAMBUnitAugust;
    growthAMBUnitSeptember = ((currAMBUnitSeptember - oldAMBUnitSeptember) * 100) / oldAMBUnitSeptember;
    growthAMBUnitOctober = ((currAMBUnitOctober - oldAMBUnitOctober) * 100) / oldAMBUnitOctober;
    growthAMBUnitNovember = ((currAMBUnitNovember - oldAMBUnitNovember) * 100) / oldAMBUnitNovember;
    growthAMBUnitDecember = ((currAMBUnitDecember - oldAMBUnitDecember) * 100) / oldAMBUnitDecember;
    growthAMBUnitTotal = ((currAMBTotalUnit - oldAMBTotalUnit) * 100) / oldAMBTotalUnit;
    growthAMBUnitQ1 = ((currAMBUnitQ1 - oldAMBUnitQ1) * 100) / oldAMBUnitQ1;
    growthAMBUnitQ2 = ((currAMBUnitQ2 - oldAMBUnitQ2) * 100) / oldAMBUnitQ2;
    growthAMBUnitQ3 = ((currAMBUnitQ3 - oldAMBUnitQ3) * 100) / oldAMBUnitQ3;
    growthAMBUnitQ4 = ((currAMBUnitQ4 - oldAMBUnitQ4) * 100) / oldAMBUnitQ4;

    growthMCBBahtJanuary = ((currMCBBahtJanuary - oldMCBBahtJanuary) * 100) / oldMCBBahtJanuary;
    growthMCBBahtFebruary = ((currMCBBahtFebruary - oldMCBBahtFebruary) * 100) / oldMCBBahtFebruary;
    growthMCBBahtMarch = ((currMCBBahtMarch - oldMCBBahtMarch) * 100) / oldMCBBahtMarch;
    growthMCBBahtApril = ((currMCBBahtApril - oldMCBBahtApril) * 100) / oldMCBBahtApril;
    growthMCBBahtMay = ((currMCBBahtMay - oldMCBBahtMay) * 100) / oldMCBBahtMay;
    growthMCBBahtJune = ((currMCBBahtJune - oldMCBBahtJune) * 100) / oldMCBBahtJune;
    growthMCBBahtJuly = ((currMCBBahtJuly - oldMCBBahtJuly) * 100) / oldMCBBahtJuly;
    growthMCBBahtAugust = ((currMCBBahtAugust - oldMCBBahtAugust) * 100) / oldMCBBahtAugust;
    growthMCBBahtSeptember = ((currMCBBahtSeptember - oldMCBBahtSeptember) * 100) / oldMCBBahtSeptember;
    growthMCBBahtOctober = ((currMCBBahtOctober - oldMCBBahtOctober) * 100) / oldMCBBahtOctober;
    growthMCBBahtNovember = ((currMCBBahtNovember - oldMCBBahtNovember) * 100) / oldMCBBahtNovember;
    growthMCBBahtDecember = ((currMCBBahtDecember - oldMCBBahtDecember) * 100) / oldMCBBahtDecember;
    growthMCBBahtTotal = ((currMCBTotalBaht - oldMCBTotalBaht) * 100) / oldMCBTotalBaht;
    growthMCBBahtQ1 = ((currMCBBahtQ1 - oldMCBBahtQ1) * 100) / oldMCBBahtQ1;
    growthMCBBahtQ2 = ((currMCBBahtQ2 - oldMCBBahtQ2) * 100) / oldMCBBahtQ2;
    growthMCBBahtQ3 = ((currMCBBahtQ3 - oldMCBBahtQ3) * 100) / oldMCBBahtQ3;
    growthMCBBahtQ4 = ((currMCBBahtQ4 - oldMCBBahtQ4) * 100) / oldMCBBahtQ4;

    growthMCBUnitJanuary = ((currMCBUnitJanuary - oldMCBUnitJanuary) * 100) / oldMCBUnitJanuary;
    growthMCBUnitFebruary = ((currMCBUnitFebruary - oldMCBUnitFebruary) * 100) / oldMCBUnitFebruary;
    growthMCBUnitMarch = ((currMCBUnitMarch - oldMCBUnitMarch) * 100) / oldMCBUnitMarch;
    growthMCBUnitApril = ((currMCBUnitApril - oldMCBUnitApril) * 100) / oldMCBUnitApril;
    growthMCBUnitMay = ((currMCBUnitMay - oldMCBUnitMay) * 100) / oldMCBUnitMay;
    growthMCBUnitJune = ((currMCBUnitJune - oldMCBUnitJune) * 100) / oldMCBUnitJune;
    growthMCBUnitJuly = ((currMCBUnitJuly - oldMCBUnitJuly) * 100) / oldMCBUnitJuly;
    growthMCBUnitAugust = ((currMCBUnitAugust - oldMCBUnitAugust) * 100) / oldMCBUnitAugust;
    growthMCBUnitSeptember = ((currMCBUnitSeptember - oldMCBUnitSeptember) * 100) / oldMCBUnitSeptember;
    growthMCBUnitOctober = ((currMCBUnitOctober - oldMCBUnitOctober) * 100) / oldMCBUnitOctober;
    growthMCBUnitNovember = ((currMCBUnitNovember - oldMCBUnitNovember) * 100) / oldMCBUnitNovember;
    growthMCBUnitDecember = ((currMCBUnitDecember - oldMCBUnitDecember) * 100) / oldMCBUnitDecember;
    growthMCBUnitTotal = ((currMCBTotalUnit - oldMCBTotalUnit) * 100) / oldMCBTotalUnit;
    growthMCBUnitQ1 = ((currMCBUnitQ1 - oldMCBUnitQ1) * 100) / oldMCBUnitQ1;
    growthMCBUnitQ2 = ((currMCBUnitQ2 - oldMCBUnitQ2) * 100) / oldMCBUnitQ2;
    growthMCBUnitQ3 = ((currMCBUnitQ3 - oldMCBUnitQ3) * 100) / oldMCBUnitQ3;
    growthMCBUnitQ4 = ((currMCBUnitQ4 - oldMCBUnitQ4) * 100) / oldMCBUnitQ4;

    var totalAMBBahtTarget = accounting.unformat(targetAMB.AmtQ1) + accounting.unformat(targetAMB.AmtQ2) + accounting.unformat(targetAMB.AmtQ3) + accounting.unformat(targetAMB.AmtQ4);
    var totalAMBUnitTarget = accounting.unformat(targetAMB.UnitQ1) + accounting.unformat(targetAMB.UnitQ2) + accounting.unformat(targetAMB.UnitQ3) + accounting.unformat(targetAMB.UnitQ4);
    var totalMCBBahtTarget = accounting.unformat(targetMCB.AmtQ1) + accounting.unformat(targetMCB.AmtQ2) + accounting.unformat(targetMCB.AmtQ3) + accounting.unformat(targetMCB.AmtQ4);
    var totalMCBUnitTarget = accounting.unformat(targetMCB.UnitQ1) + accounting.unformat(targetMCB.UnitQ2) + accounting.unformat(targetMCB.UnitQ3) + accounting.unformat(targetMCB.UnitQ4);

    achieveAMBBahtJanuary = (currAMBBahtJanuary * 100) / accounting.unformat(targetAMB.Amt01);
    achieveAMBBahtFebruary = (currAMBBahtFebruary * 100) / accounting.unformat(targetAMB.Amt02);
    achieveAMBBahtMarch = (currAMBBahtMarch * 100) / accounting.unformat(targetAMB.Amt03);
    achieveAMBBahtApril = (currAMBBahtApril * 100) / accounting.unformat(targetAMB.Amt04);
    achieveAMBBahtMay = (currAMBBahtMay * 100) / accounting.unformat(targetAMB.Amt05);
    achieveAMBBahtJune = (currAMBBahtJune * 100) / accounting.unformat(targetAMB.Amt06);
    achieveAMBBahtJuly = (currAMBBahtJuly * 100) / accounting.unformat(targetAMB.Amt07);
    achieveAMBBahtAugust = (currAMBBahtAugust * 100) / accounting.unformat(targetAMB.Amt08);
    achieveAMBBahtSeptember = (currAMBBahtSeptember * 100) / accounting.unformat(targetAMB.Amt09);
    achieveAMBBahtOctober = (currAMBBahtOctober * 100) / accounting.unformat(targetAMB.Amt10);
    achieveAMBBahtNovember = (currAMBBahtNovember * 100) / accounting.unformat(targetAMB.Amt11);
    achieveAMBBahtDecember = (currAMBBahtDecember * 100) / accounting.unformat(targetAMB.Amt12);
    achieveAMBBahtTotal = (currAMBTotalBaht * 100) / totalAMBBahtTarget;
    achieveAMBBahtQ1 = (currAMBBahtQ1 * 100) / accounting.unformat(targetAMB.AmtQ1);
    achieveAMBBahtQ2 = (currAMBBahtQ2 * 100) / accounting.unformat(targetAMB.AmtQ2);
    achieveAMBBahtQ3 = (currAMBBahtQ3 * 100) / accounting.unformat(targetAMB.AmtQ3);
    achieveAMBBahtQ4 = (currAMBBahtQ4 * 100) / accounting.unformat(targetAMB.AmtQ4);

    achieveAMBUnitJanuary = (currAMBUnitJanuary * 100) / accounting.unformat(targetAMB.Unit01);
    achieveAMBUnitFebruary = (currAMBUnitFebruary * 100) / accounting.unformat(targetAMB.Unit02);
    achieveAMBUnitMarch = (currAMBUnitMarch * 100) / accounting.unformat(targetAMB.Unit03);
    achieveAMBUnitApril = (currAMBUnitApril * 100) / accounting.unformat(targetAMB.Unit04);
    achieveAMBUnitMay = (currAMBUnitMay * 100) / accounting.unformat(targetAMB.Unit05);
    achieveAMBUnitJune = (currAMBUnitJune * 100) / accounting.unformat(targetAMB.Unit06);
    achieveAMBUnitJuly = (currAMBUnitJuly * 100) / accounting.unformat(targetAMB.Unit07);
    achieveAMBUnitAugust = (currAMBUnitAugust * 100) / accounting.unformat(targetAMB.Unit08);
    achieveAMBUnitSeptember = (currAMBUnitSeptember * 100) / accounting.unformat(targetAMB.Unit09);
    achieveAMBUnitOctober = (currAMBUnitOctober * 100) / accounting.unformat(targetAMB.Unit10);
    achieveAMBUnitNovember = (currAMBUnitNovember * 100) / accounting.unformat(targetAMB.Unit11);
    achieveAMBUnitDecember = (currAMBUnitDecember * 100) / accounting.unformat(targetAMB.Unit12);
    achieveAMBUnitTotal = (currAMBTotalUnit * 100) / totalAMBUnitTarget;
    achieveAMBUnitQ1 = (currAMBUnitQ1 * 100) / accounting.unformat(targetAMB.UnitQ1);
    achieveAMBUnitQ2 = (currAMBUnitQ2 * 100) / accounting.unformat(targetAMB.UnitQ2);
    achieveAMBUnitQ3 = (currAMBUnitQ3 * 100) / accounting.unformat(targetAMB.UnitQ3);
    achieveAMBUnitQ4 = (currAMBUnitQ4 * 100) / accounting.unformat(targetAMB.UnitQ4);

    achieveMCBBahtJanuary = (currMCBBahtJanuary * 100) / accounting.unformat(targetMCB.Amt01);
    achieveMCBBahtFebruary = (currMCBBahtFebruary * 100) / accounting.unformat(targetMCB.Amt02);
    achieveMCBBahtMarch = (currMCBBahtMarch * 100) / accounting.unformat(targetMCB.Amt03);
    achieveMCBBahtApril = (currMCBBahtApril * 100) / accounting.unformat(targetMCB.Amt04);
    achieveMCBBahtMay = (currMCBBahtMay * 100) / accounting.unformat(targetMCB.Amt05);
    achieveMCBBahtJune = (currMCBBahtJune * 100) / accounting.unformat(targetMCB.Amt06);
    achieveMCBBahtJuly = (currMCBBahtJuly * 100) / accounting.unformat(targetMCB.Amt07);
    achieveMCBBahtAugust = (currMCBBahtAugust * 100) / accounting.unformat(targetMCB.Amt08);
    achieveMCBBahtSeptember = (currMCBBahtSeptember * 100) / accounting.unformat(targetMCB.Amt09);
    achieveMCBBahtOctober = (currMCBBahtOctober * 100) / accounting.unformat(targetMCB.Amt10);
    achieveMCBBahtNovember = (currMCBBahtNovember * 100) / accounting.unformat(targetMCB.Amt11);
    achieveMCBBahtDecember = (currMCBBahtDecember * 100) / accounting.unformat(targetMCB.Amt12);
    achieveMCBBahtTotal = (currMCBTotalBaht * 100) / totalMCBBahtTarget;
    achieveMCBBahtQ1 = (currMCBBahtQ1 * 100) / accounting.unformat(targetMCB.AmtQ1);
    achieveMCBBahtQ2 = (currMCBBahtQ2 * 100) / accounting.unformat(targetMCB.AmtQ2);
    achieveMCBBahtQ3 = (currMCBBahtQ3 * 100) / accounting.unformat(targetMCB.AmtQ3);
    achieveMCBBahtQ4 = (currMCBBahtQ4 * 100) / accounting.unformat(targetMCB.AmtQ4);

    achieveMCBUnitJanuary = (currMCBUnitJanuary * 100) / accounting.unformat(targetMCB.Unit01);
    achieveMCBUnitFebruary = (currMCBUnitFebruary * 100) / accounting.unformat(targetMCB.Unit02);
    achieveMCBUnitMarch = (currMCBUnitMarch * 100) / accounting.unformat(targetMCB.Unit03);
    achieveMCBUnitApril = (currMCBUnitApril * 100) / accounting.unformat(targetMCB.Unit04);
    achieveMCBUnitMay = (currMCBUnitMay * 100) / accounting.unformat(targetMCB.Unit05);
    achieveMCBUnitJune = (currMCBUnitJune * 100) / accounting.unformat(targetMCB.Unit06);
    achieveMCBUnitJuly = (currMCBUnitJuly * 100) / accounting.unformat(targetMCB.Unit07);
    achieveMCBUnitAugust = (currMCBUnitAugust * 100) / accounting.unformat(targetMCB.Unit08);
    achieveMCBUnitSeptember = (currMCBUnitSeptember * 100) / accounting.unformat(targetMCB.Unit09);
    achieveMCBUnitOctober = (currMCBUnitOctober * 100) / accounting.unformat(targetMCB.Unit10);
    achieveMCBUnitNovember = (currMCBUnitNovember * 100) / accounting.unformat(targetMCB.Unit11);
    achieveMCBUnitDecember = (currMCBUnitDecember * 100) / accounting.unformat(targetMCB.Unit12);
    achieveMCBUnitTotal = (currMCBTotalUnit * 100) / totalMCBUnitTarget;
    achieveMCBUnitQ1 = (currMCBUnitQ1 * 100) / accounting.unformat(targetMCB.UnitQ1);
    achieveMCBUnitQ2 = (currMCBUnitQ2 * 100) / accounting.unformat(targetMCB.UnitQ2);
    achieveMCBUnitQ3 = (currMCBUnitQ3 * 100) / accounting.unformat(targetMCB.UnitQ3);
    achieveMCBUnitQ4 = (currMCBUnitQ4 * 100) / accounting.unformat(targetMCB.UnitQ4);

    var currTotalBaht = currAMBTotalBaht + currMCBTotalBaht,
        currTotalUnit = currAMBTotalUnit + currMCBTotalUnit,
        oldTotalBaht = oldAMBTotalBaht + oldMCBTotalBaht,
        oldTotalUnit = oldAMBTotalUnit + oldMCBTotalUnit,
        currUnitJanuary = currAMBUnitJanuary + currMCBUnitJanuary,
        currUnitFebruary = currAMBUnitFebruary + currMCBUnitFebruary,
        currUnitMarch = currAMBUnitMarch + currMCBUnitMarch,
        currUnitApril = currAMBUnitApril + currMCBUnitApril,
        currUnitMay = currAMBUnitMay + currMCBUnitMay,
        currUnitJune = currAMBUnitJune + currMCBUnitJune,
        currUnitJuly = currAMBUnitJuly + currMCBUnitJuly,
        currUnitAugust = currAMBUnitAugust + currMCBUnitAugust,
        currUnitSeptember = currAMBUnitSeptember + currMCBUnitSeptember,
        currUnitOctober = currAMBUnitOctober + currMCBUnitOctober,
        currUnitNovember = currAMBUnitNovember + currMCBUnitNovember,
        currUnitDecember = currAMBUnitDecember + currMCBUnitDecember,
        currBahtJanuary = currAMBBahtJanuary + currMCBBahtJanuary,
        currBahtFebruary = currAMBBahtFebruary + currMCBBahtFebruary,
        currBahtMarch = currAMBBahtMarch + currMCBBahtMarch,
        currBahtApril = currAMBBahtApril + currMCBBahtApril,
        currBahtMay = currAMBBahtMay + currMCBBahtMay,
        currBahtJune = currAMBBahtJune + currMCBBahtJune,
        currBahtJuly = currAMBBahtJuly + currMCBBahtJuly,
        currBahtAugust = currAMBBahtAugust + currMCBBahtAugust,
        currBahtSeptember = currAMBBahtSeptember + currMCBBahtSeptember,
        currBahtOctober = currAMBBahtOctober + currMCBBahtOctober,
        currBahtNovember = currAMBBahtNovember + currMCBBahtNovember,
        currBahtDecember = currAMBBahtDecember + currMCBBahtDecember,
        currUnitQ1 = currAMBUnitQ1 + currMCBUnitQ1,
        currBahtQ1 = currAMBBahtQ1 + currMCBBahtQ1,
        currUnitQ2 = currAMBUnitQ2 + currMCBUnitQ2,
        currBahtQ2 = currAMBBahtQ2 + currMCBBahtQ2,
        currUnitQ3 = currAMBUnitQ3 + currMCBUnitQ3,
        currBahtQ3 = currAMBBahtQ3 + currMCBBahtQ3,
        currUnitQ4 = currAMBUnitQ4 + currMCBUnitQ4,
        currBahtQ4 = currAMBBahtQ4 + currMCBBahtQ4,
        oldUnitJanuary = oldAMBUnitJanuary + oldMCBUnitJanuary,
        oldUnitFebruary = oldAMBUnitFebruary + oldMCBUnitFebruary,
        oldUnitMarch = oldAMBUnitMarch + oldMCBUnitMarch,
        oldUnitApril = oldAMBUnitApril + oldMCBUnitApril,
        oldUnitMay = oldAMBUnitMay + oldMCBUnitMay,
        oldUnitJune = oldAMBUnitJune + oldMCBUnitJune,
        oldUnitJuly = oldAMBUnitJuly + oldMCBUnitJuly,
        oldUnitAugust = oldAMBUnitAugust + oldMCBUnitAugust,
        oldUnitSeptember = oldAMBUnitSeptember + oldMCBUnitSeptember,
        oldUnitOctober = oldAMBUnitOctober + oldMCBUnitOctober,
        oldUnitNovember = oldAMBUnitNovember + oldMCBUnitNovember,
        oldUnitDecember = oldAMBUnitDecember + oldMCBUnitDecember,
        oldBahtJanuary = oldAMBBahtJanuary + oldMCBBahtJanuary,
        oldBahtFebruary = oldAMBBahtFebruary + oldMCBBahtFebruary,
        oldBahtMarch = oldAMBBahtMarch + oldMCBBahtMarch,
        oldBahtApril = oldAMBBahtApril + oldMCBBahtApril,
        oldBahtMay = oldAMBBahtMay + oldMCBBahtMay,
        oldBahtJune = oldAMBBahtJune + oldMCBBahtJune,
        oldBahtJuly = oldAMBBahtJuly + oldMCBBahtJuly,
        oldBahtAugust = oldAMBBahtAugust + oldMCBBahtAugust,
        oldBahtSeptember = oldAMBBahtSeptember + oldMCBBahtSeptember,
        oldBahtOctober = oldAMBBahtOctober + oldMCBBahtOctober,
        oldBahtNovember = oldAMBBahtNovember + oldMCBBahtNovember,
        oldBahtDecember = oldAMBBahtDecember + oldMCBBahtDecember,
        oldUnitQ1 = oldAMBUnitQ1 + oldMCBUnitQ1,
        oldBahtQ1 = oldAMBBahtQ1 + oldMCBBahtQ1,
        oldUnitQ2 = oldAMBUnitQ2 + oldMCBUnitQ2,
        oldBahtQ2 = oldAMBBahtQ2 + oldMCBBahtQ2,
        oldUnitQ3 = oldAMBUnitQ3 + oldMCBUnitQ3,
        oldBahtQ3 = oldAMBBahtQ3 + oldMCBBahtQ3,
        oldUnitQ4 = oldAMBUnitQ4 + oldMCBUnitQ4,
        oldBahtQ4 = oldAMBBahtQ4 + oldMCBBahtQ4;

    var totalBahtTarget = (accounting.unformat(targetAMB.AmtQ1) + accounting.unformat(targetAMB.AmtQ2) + accounting.unformat(targetAMB.AmtQ3) + accounting.unformat(targetAMB.AmtQ4) + accounting.unformat(targetMCB.AmtQ1) + accounting.unformat(targetMCB.AmtQ2) + accounting.unformat(targetMCB.AmtQ3) + accounting.unformat(targetMCB.AmtQ4));
    var totalUnitTarget = (accounting.unformat(targetAMB.UnitQ1) + accounting.unformat(targetAMB.UnitQ2) + accounting.unformat(targetAMB.UnitQ3) + accounting.unformat(targetAMB.UnitQ4) + accounting.unformat(targetMCB.UnitQ1) + accounting.unformat(targetMCB.UnitQ2) + accounting.unformat(targetMCB.UnitQ3) + accounting.unformat(targetMCB.UnitQ4));

    var achieveBahtJanuary = achieveAMBBahtJanuary + achieveMCBBahtJanuary,
        achieveBahtFebruary = achieveAMBBahtFebruary + achieveMCBBahtFebruary,
        achieveBahtMarch = achieveAMBBahtMarch + achieveMCBBahtMarch,
        achieveBahtApril = achieveAMBBahtApril + achieveMCBBahtApril,
        achieveBahtMay = achieveAMBBahtMay + achieveMCBBahtMay,
        achieveBahtJune = achieveAMBBahtJune + achieveMCBBahtJune,
        achieveBahtJuly = achieveAMBBahtJuly + achieveMCBBahtJuly,
        achieveBahtAugust = achieveAMBBahtAugust + achieveMCBBahtAugust,
        achieveBahtSeptember = achieveAMBBahtSeptember + achieveMCBBahtSeptember,
        achieveBahtOctober = achieveAMBBahtOctober + achieveMCBBahtOctober,
        achieveBahtNovember = achieveAMBBahtNovember + achieveMCBBahtNovember,
        achieveBahtDecember = achieveAMBBahtDecember + achieveMCBBahtDecember,
        achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget,
        achieveBahtQ1 = achieveAMBBahtQ1 + achieveMCBBahtQ1,
        achieveUnitQ1 = achieveAMBUnitQ1 + achieveMCBUnitQ1,
        achieveBahtQ2 = achieveAMBBahtQ2 + achieveMCBBahtQ2,
        achieveUnitQ2 = achieveAMBUnitQ2 + achieveMCBUnitQ2,
        achieveBahtQ3 = achieveAMBBahtQ3 + achieveMCBBahtQ3,
        achieveUnitQ3 = achieveAMBUnitQ3 + achieveMCBUnitQ3,
        achieveBahtQ4 = achieveAMBBahtQ4 + achieveMCBBahtQ4,
        achieveUnitQ4 = achieveAMBUnitQ4 + achieveMCBUnitQ4,
        growthBahtJanuary = growthAMBBahtJanuary + growthMCBBahtJanuary,
        growthBahtFebruary = growthAMBBahtFebruary + growthMCBBahtFebruary,
        growthBahtMarch = growthAMBBahtMarch + growthMCBBahtMarch,
        growthBahtApril = growthAMBBahtApril + growthMCBBahtApril,
        growthBahtMay = growthAMBBahtMay + growthMCBBahtMay,
        growthBahtJune = growthAMBBahtJune + growthMCBBahtJune,
        growthBahtJuly = growthAMBBahtJuly + growthMCBBahtJuly,
        growthBahtAugust = growthAMBBahtAugust + growthMCBBahtAugust,
        growthBahtSeptember = growthAMBBahtSeptember + growthMCBBahtSeptember,
        growthBahtOctober = growthAMBBahtOctober + growthMCBBahtOctober,
        growthBahtNovember = growthAMBBahtNovember + growthMCBBahtNovember,
        growthBahtDecember = growthAMBBahtDecember + growthMCBBahtDecember,
        growthBahtTotal = ((currTotalBaht - oldTotalBaht) * 100) / oldTotalBaht,
        achieveUnitJanuary = achieveAMBUnitJanuary + achieveMCBUnitJanuary,
        achieveUnitFebruary = achieveAMBUnitFebruary + achieveMCBUnitFebruary,
        achieveUnitMarch = achieveAMBUnitMarch + achieveMCBUnitMarch,
        achieveUnitApril = achieveAMBUnitApril + achieveMCBUnitApril,
        achieveUnitMay = achieveAMBUnitMay + achieveMCBUnitMay,
        achieveUnitJune = achieveAMBUnitJune + achieveMCBUnitJune,
        achieveUnitJuly = achieveAMBUnitJuly + achieveMCBUnitJuly,
        achieveUnitAugust = achieveAMBUnitAugust + achieveMCBUnitAugust,
        achieveUnitSeptember = achieveAMBUnitSeptember + achieveMCBUnitSeptember,
        achieveUnitOctober = achieveAMBUnitOctober + achieveMCBUnitOctober,
        achieveUnitNovember = achieveAMBUnitNovember + achieveMCBUnitNovember,
        achieveUnitDecember = achieveAMBUnitDecember + achieveMCBUnitDecember,
        achieveUnitTotal = (currTotalUnit * 100) / totalUnitTarget,
        growthUnitJanuary = growthAMBUnitJanuary + growthMCBUnitJanuary,
        growthUnitFebruary = growthAMBUnitFebruary + growthMCBUnitFebruary,
        growthUnitMarch = growthAMBUnitMarch + growthMCBUnitMarch,
        growthUnitApril = growthAMBUnitApril + growthMCBUnitApril,
        growthUnitMay = growthAMBUnitMay + growthMCBUnitMay,
        growthUnitJune = growthAMBUnitJune + growthMCBUnitJune,
        growthUnitJuly = growthAMBUnitJuly + growthMCBUnitJuly,
        growthUnitAugust = growthAMBUnitAugust + growthMCBUnitAugust,
        growthUnitSeptember = growthAMBUnitSeptember + growthMCBUnitSeptember,
        growthUnitOctober = growthAMBUnitOctober + growthMCBUnitOctober,
        growthUnitNovember = growthAMBUnitNovember + growthMCBUnitNovember,
        growthUnitDecember = growthAMBUnitDecember + growthMCBUnitDecember,
        growthUnitTotal = ((currTotalUnit - oldTotalUnit) * 100) / oldTotalUnit,
        growthBahtQ1 = growthAMBBahtQ1 + growthMCBBahtQ1,
        growthUnitQ1 = growthAMBUnitQ1 + growthMCBUnitQ1,
        growthBahtQ2 = growthAMBBahtQ2 + growthMCBBahtQ2,
        growthUnitQ2 = growthAMBUnitQ2 + growthMCBUnitQ2,
        growthBahtQ3 = growthAMBBahtQ3 + growthMCBBahtQ3,
        growthUnitQ3 = growthAMBUnitQ3 + growthMCBUnitQ3,
        growthBahtQ4 = growthAMBBahtQ4 + growthMCBBahtQ4,
        growthUnitQ4 = growthAMBUnitQ4 + growthMCBUnitQ4;

    var percentBaht = (currTotalBaht / totalBahtTarget) * 100;
    var percentUnit = (currTotalUnit / totalUnitTarget) * 100;

    if (percentBaht === Infinity) {
        percentBaht = 0;
    }

    if (percentUnit === Infinity) {
        percentUnit = 0;
    }

    $('#totalBaht').text(accounting.formatNumber(currTotalBaht, 2) + " (" + accounting.formatNumber(percentBaht, 1) + "%)");
    $('#totalUnit').text(accounting.formatNumber(currTotalUnit) + " (" + accounting.formatNumber(percentUnit, 1) + "%)");
    $('#despTotalBaht').text(accounting.formatNumber(currTotalBaht, 2) + " / " + accounting.formatNumber(totalBahtTarget, 2));
    $('#despTotalUnit').text(accounting.formatNumber(currTotalUnit) + " / " + accounting.formatNumber(totalUnitTarget));
    $('#percentBaht').css("width", accounting.formatNumber(percentBaht) + "%");
    $('#percentUnit').css("width", accounting.formatNumber(percentUnit) + "%");

    //AMB        
    $('#ambBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetAMB.AmtQ1), 2));
    $('#ambBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetAMB.AmtQ2), 2));
    $('#ambBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetAMB.AmtQ3), 2));
    $('#ambBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetAMB.AmtQ4), 2));
    $('#ambBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt01) / 1000, 2));
    $('#ambBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt02) / 1000, 2));
    $('#ambBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt03) / 1000, 2));
    $('#ambBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt04) / 1000, 2));
    $('#ambBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt05) / 1000, 2));
    $('#ambBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt06) / 1000, 2));
    $('#ambBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt07) / 1000, 2));
    $('#ambBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt08) / 1000, 2));
    $('#ambBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt09) / 1000, 2));
    $('#ambBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt10) / 1000, 2));
    $('#ambBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt11) / 1000, 2));
    $('#ambBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetAMB.Amt12) / 1000, 2));
    $('#ambBahtTargetNowTotal').html(accounting.formatNumber(totalAMBBahtTarget / 1000, 2));
    $('#ambBahtTargetNowQTotal').html(accounting.formatNumber(totalAMBBahtTarget, 2));

    $('#ambUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetAMB.UnitQ1)));
    $('#ambUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetAMB.UnitQ2)));
    $('#ambUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetAMB.UnitQ3)));
    $('#ambUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetAMB.UnitQ4)));
    $('#ambUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit01)));
    $('#ambUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit02)));
    $('#ambUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit03)));
    $('#ambUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit04)));
    $('#ambUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit05)));
    $('#ambUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit06)));
    $('#ambUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit07)));
    $('#ambUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit08)));
    $('#ambUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit09)));
    $('#ambUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit10)));
    $('#ambUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit11)));
    $('#ambUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetAMB.Unit12)));
    $('#ambUnitTargetNowTotal').html(accounting.formatNumber(totalAMBUnitTarget));
    $('#ambUnitTargetNowQTotal').html(accounting.formatNumber(totalAMBUnitTarget));

    $('#ambBahtActualNowQ1').html(accounting.formatNumber(currAMBBahtQ1, 2));
    $('#ambBahtActualNowQ2').html(accounting.formatNumber(currAMBBahtQ2, 2));
    $('#ambBahtActualNowQ3').html(accounting.formatNumber(currAMBBahtQ3, 2));
    $('#ambBahtActualNowQ4').html(accounting.formatNumber(currAMBBahtQ4, 2));
    $('#ambBahtActualNow1').html(accounting.formatNumber(currAMBBahtJanuary / 1000, 2));
    $('#ambBahtActualNow2').html(accounting.formatNumber(currAMBBahtFebruary / 1000, 2));
    $('#ambBahtActualNow3').html(accounting.formatNumber(currAMBBahtMarch / 1000, 2));
    $('#ambBahtActualNow4').html(accounting.formatNumber(currAMBBahtApril / 1000, 2));
    $('#ambBahtActualNow5').html(accounting.formatNumber(currAMBBahtMay / 1000, 2));
    $('#ambBahtActualNow6').html(accounting.formatNumber(currAMBBahtJune / 1000, 2));
    $('#ambBahtActualNow7').html(accounting.formatNumber(currAMBBahtJuly / 1000, 2));
    $('#ambBahtActualNow8').html(accounting.formatNumber(currAMBBahtAugust / 1000, 2));
    $('#ambBahtActualNow9').html(accounting.formatNumber(currAMBBahtSeptember / 1000, 2));
    $('#ambBahtActualNow10').html(accounting.formatNumber(currAMBBahtOctober / 1000, 2));
    $('#ambBahtActualNow11').html(accounting.formatNumber(currAMBBahtNovember / 1000, 2));
    $('#ambBahtActualNow12').html(accounting.formatNumber(currAMBBahtDecember / 1000, 2));
    $('#ambBahtActualNowTotal').html(accounting.formatNumber(currAMBTotalBaht / 1000, 2));
    $('#ambBahtActualNowQTotal').html(accounting.formatNumber(currAMBTotalBaht, 2));

    $('#ambBahtActualOldQ1').html(accounting.formatNumber(oldAMBBahtQ1, 2));
    $('#ambBahtActualOldQ2').html(accounting.formatNumber(oldAMBBahtQ2, 2));
    $('#ambBahtActualOldQ3').html(accounting.formatNumber(oldAMBBahtQ3, 2));
    $('#ambBahtActualOldQ4').html(accounting.formatNumber(oldAMBBahtQ4, 2));
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
    $('#ambBahtActualOldQTotal').html(accounting.formatNumber(oldAMBTotalBaht, 2));

    $('#ambBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthAMBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtQ1, 2)) + "%");
    $('#ambBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthAMBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtQ2, 2)) + "%");
    $('#ambBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthAMBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtQ3, 2)) + "%");
    $('#ambBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthAMBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtQ4, 2)) + "%");
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
    $('#ambBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthAMBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBBahtTotal, 2)) + "%");

    $('#ambBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveAMBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtQ1, 2)) + "%");
    $('#ambBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveAMBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtQ2, 2)) + "%");
    $('#ambBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveAMBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtQ3, 2)) + "%");
    $('#ambBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveAMBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtQ4, 2)) + "%");
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
    $('#ambBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveAMBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBBahtTotal, 2)) + "%");

    $('#ambUnitActualNowQ1').html(accounting.formatNumber(currAMBUnitQ1));
    $('#ambUnitActualNowQ2').html(accounting.formatNumber(currAMBUnitQ2));
    $('#ambUnitActualNowQ3').html(accounting.formatNumber(currAMBUnitQ3));
    $('#ambUnitActualNowQ4').html(accounting.formatNumber(currAMBUnitQ4));
    $('#ambUnitActualNow1').html(accounting.formatNumber(currAMBUnitJanuary));
    $('#ambUnitActualNow2').html(accounting.formatNumber(currAMBUnitFebruary));
    $('#ambUnitActualNow3').html(accounting.formatNumber(currAMBUnitMarch));
    $('#ambUnitActualNow4').html(accounting.formatNumber(currAMBUnitApril));
    $('#ambUnitActualNow5').html(accounting.formatNumber(currAMBUnitMay));
    $('#ambUnitActualNow6').html(accounting.formatNumber(currAMBUnitJune));
    $('#ambUnitActualNow7').html(accounting.formatNumber(currAMBUnitJuly));
    $('#ambUnitActualNow8').html(accounting.formatNumber(currAMBUnitAugust));
    $('#ambUnitActualNow9').html(accounting.formatNumber(currAMBUnitSeptember));
    $('#ambUnitActualNow10').html(accounting.formatNumber(currAMBUnitOctober));
    $('#ambUnitActualNow11').html(accounting.formatNumber(currAMBUnitNovember));
    $('#ambUnitActualNow12').html(accounting.formatNumber(currAMBUnitDecember));
    $('#ambUnitActualNowTotal').html(accounting.formatNumber(currAMBTotalUnit));
    $('#ambUnitActualNowQTotal').html(accounting.formatNumber(currAMBTotalUnit));

    $('#ambUnitActualOldQ1').html(accounting.formatNumber(oldAMBUnitQ1));
    $('#ambUnitActualOldQ2').html(accounting.formatNumber(oldAMBUnitQ2));
    $('#ambUnitActualOldQ3').html(accounting.formatNumber(oldAMBUnitQ3));
    $('#ambUnitActualOldQ4').html(accounting.formatNumber(oldAMBUnitQ4));
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
    $('#ambUnitActualOldQTotal').html(accounting.formatNumber(oldAMBTotalUnit));

    $('#ambUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthAMBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitQ1, 2)) + "%");
    $('#ambUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthAMBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitQ2, 2)) + "%");
    $('#ambUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthAMBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitQ3, 2)) + "%");
    $('#ambUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthAMBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitQ4, 2)) + "%");
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
    $('#ambUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthAMBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthAMBUnitTotal, 2)) + "%");

    $('#ambUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveAMBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitQ1, 2)) + "%");
    $('#ambUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveAMBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitQ2, 2)) + "%");
    $('#ambUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveAMBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitQ3, 2)) + "%");
    $('#ambUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveAMBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitQ4, 2)) + "%");
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
    $('#ambUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveAMBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveAMBUnitTotal, 2)) + "%");

    //MCB
    $('#mcbBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetMCB.AmtQ1), 2));
    $('#mcbBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetMCB.AmtQ2), 2));
    $('#mcbBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetMCB.AmtQ3), 2));
    $('#mcbBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetMCB.AmtQ4), 2));
    $('#mcbBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt01) / 1000, 2));
    $('#mcbBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt02) / 1000, 2));
    $('#mcbBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt03) / 1000, 2));
    $('#mcbBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt04) / 1000, 2));
    $('#mcbBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt05) / 1000, 2));
    $('#mcbBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt06) / 1000, 2));
    $('#mcbBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt07) / 1000, 2));
    $('#mcbBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt08) / 1000, 2));
    $('#mcbBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt09) / 1000, 2));
    $('#mcbBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt10) / 1000, 2));
    $('#mcbBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt11) / 1000, 2));
    $('#mcbBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetMCB.Amt12) / 1000, 2));
    $('#mcbBahtTargetNowTotal').html(accounting.formatNumber(totalMCBBahtTarget / 1000, 2));
    $('#mcbBahtTargetNowQTotal').html(accounting.formatNumber(totalMCBBahtTarget, 2));

    $('#mcbUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetMCB.UnitQ1)));
    $('#mcbUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetMCB.UnitQ2)));
    $('#mcbUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetMCB.UnitQ3)));
    $('#mcbUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetMCB.UnitQ4)));
    $('#mcbUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit01)));
    $('#mcbUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit02)));
    $('#mcbUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit03)));
    $('#mcbUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit04)));
    $('#mcbUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit05)));
    $('#mcbUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit06)));
    $('#mcbUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit07)));
    $('#mcbUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit08)));
    $('#mcbUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit09)));
    $('#mcbUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit10)));
    $('#mcbUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit11)));
    $('#mcbUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetMCB.Unit12)));
    $('#mcbUnitTargetNowTotal').html(accounting.formatNumber(totalMCBUnitTarget));
    $('#mcbUnitTargetNowQTotal').html(accounting.formatNumber(totalMCBUnitTarget));

    $('#mcbBahtActualNowQ1').html(accounting.formatNumber(currMCBBahtQ1, 2));
    $('#mcbBahtActualNowQ2').html(accounting.formatNumber(currMCBBahtQ2, 2));
    $('#mcbBahtActualNowQ3').html(accounting.formatNumber(currMCBBahtQ3, 2));
    $('#mcbBahtActualNowQ4').html(accounting.formatNumber(currMCBBahtQ4, 2));
    $('#mcbBahtActualNow1').html(accounting.formatNumber(currMCBBahtJanuary / 1000, 2));
    $('#mcbBahtActualNow2').html(accounting.formatNumber(currMCBBahtFebruary / 1000, 2));
    $('#mcbBahtActualNow3').html(accounting.formatNumber(currMCBBahtMarch / 1000, 2));
    $('#mcbBahtActualNow4').html(accounting.formatNumber(currMCBBahtApril / 1000, 2));
    $('#mcbBahtActualNow5').html(accounting.formatNumber(currMCBBahtMay / 1000, 2));
    $('#mcbBahtActualNow6').html(accounting.formatNumber(currMCBBahtJune / 1000, 2));
    $('#mcbBahtActualNow7').html(accounting.formatNumber(currMCBBahtJuly / 1000, 2));
    $('#mcbBahtActualNow8').html(accounting.formatNumber(currMCBBahtAugust / 1000, 2));
    $('#mcbBahtActualNow9').html(accounting.formatNumber(currMCBBahtSeptember / 1000, 2));
    $('#mcbBahtActualNow10').html(accounting.formatNumber(currMCBBahtOctober / 1000, 2));
    $('#mcbBahtActualNow11').html(accounting.formatNumber(currMCBBahtNovember / 1000, 2));
    $('#mcbBahtActualNow12').html(accounting.formatNumber(currMCBBahtDecember / 1000, 2));
    $('#mcbBahtActualNowTotal').html(accounting.formatNumber(currMCBTotalBaht / 1000, 2));
    $('#mcbBahtActualNowQTotal').html(accounting.formatNumber(currMCBTotalBaht, 2));

    $('#mcbBahtActualOldQ1').html(accounting.formatNumber(oldMCBBahtQ1, 2));
    $('#mcbBahtActualOldQ2').html(accounting.formatNumber(oldMCBBahtQ2, 2));
    $('#mcbBahtActualOldQ3').html(accounting.formatNumber(oldMCBBahtQ3, 2));
    $('#mcbBahtActualOldQ4').html(accounting.formatNumber(oldMCBBahtQ4, 2));
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
    $('#mcbBahtActualOldQTotal').html(accounting.formatNumber(oldMCBTotalBaht, 2));

    $('#mcbBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthMCBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtQ1, 2)) + "%");
    $('#mcbBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthMCBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtQ2, 2)) + "%");
    $('#mcbBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthMCBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtQ3, 2)) + "%");
    $('#mcbBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthMCBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtQ4, 2)) + "%");
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
    $('#mcbBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthMCBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBBahtTotal, 2)) + "%");

    $('#mcbBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveMCBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtQ1, 2)) + "%");
    $('#mcbBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveMCBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtQ2, 2)) + "%");
    $('#mcbBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveMCBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtQ3, 2)) + "%");
    $('#mcbBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveMCBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtQ4, 2)) + "%");
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
    $('#mcbBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveMCBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBBahtTotal, 2)) + "%");

    $('#mcbUnitActualNowQ1').html(accounting.formatNumber(currMCBUnitQ1));
    $('#mcbUnitActualNowQ2').html(accounting.formatNumber(currMCBUnitQ2));
    $('#mcbUnitActualNowQ3').html(accounting.formatNumber(currMCBUnitQ3));
    $('#mcbUnitActualNowQ4').html(accounting.formatNumber(currMCBUnitQ4));
    $('#mcbUnitActualNow1').html(accounting.formatNumber(currMCBUnitJanuary));
    $('#mcbUnitActualNow2').html(accounting.formatNumber(currMCBUnitFebruary));
    $('#mcbUnitActualNow3').html(accounting.formatNumber(currMCBUnitMarch));
    $('#mcbUnitActualNow4').html(accounting.formatNumber(currMCBUnitApril));
    $('#mcbUnitActualNow5').html(accounting.formatNumber(currMCBUnitMay));
    $('#mcbUnitActualNow6').html(accounting.formatNumber(currMCBUnitJune));
    $('#mcbUnitActualNow7').html(accounting.formatNumber(currMCBUnitJuly));
    $('#mcbUnitActualNow8').html(accounting.formatNumber(currMCBUnitAugust));
    $('#mcbUnitActualNow9').html(accounting.formatNumber(currMCBUnitSeptember));
    $('#mcbUnitActualNow10').html(accounting.formatNumber(currMCBUnitOctober));
    $('#mcbUnitActualNow11').html(accounting.formatNumber(currMCBUnitNovember));
    $('#mcbUnitActualNow12').html(accounting.formatNumber(currMCBUnitDecember));
    $('#mcbUnitActualNowTotal').html(accounting.formatNumber(currMCBTotalUnit));
    $('#mcbUnitActualNowQTotal').html(accounting.formatNumber(currMCBTotalUnit));

    $('#mcbUnitActualOldQ1').html(accounting.formatNumber(oldMCBUnitQ1));
    $('#mcbUnitActualOldQ2').html(accounting.formatNumber(oldMCBUnitQ2));
    $('#mcbUnitActualOldQ3').html(accounting.formatNumber(oldMCBUnitQ3));
    $('#mcbUnitActualOldQ4').html(accounting.formatNumber(oldMCBUnitQ4));
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
    $('#mcbUnitActualOldQTotal').html(accounting.formatNumber(oldMCBTotalUnit));

    $('#mcbUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthMCBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitQ1, 2)) + "%");
    $('#mcbUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthMCBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitQ2, 2)) + "%");
    $('#mcbUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthMCBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitQ3, 2)) + "%");
    $('#mcbUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthMCBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitQ4, 2)) + "%");
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
    $('#mcbUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthMCBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthMCBUnitTotal, 2)) + "%");

    $('#mcbUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveMCBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitQ1, 2)) + "%");
    $('#mcbUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveMCBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitQ2, 2)) + "%");
    $('#mcbUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveMCBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitQ3, 2)) + "%");
    $('#mcbUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveMCBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitQ4, 2)) + "%");
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
    $('#mcbUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveMCBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveMCBUnitTotal, 2)) + "%");

    //All
    $('#allBahtTargetNowQ1').html(accounting.formatNumber((accounting.unformat(targetAMB.AmtQ1) + accounting.unformat(targetMCB.AmtQ1)), 2));
    $('#allBahtTargetNowQ2').html(accounting.formatNumber((accounting.unformat(targetAMB.AmtQ2) + accounting.unformat(targetMCB.AmtQ2)), 2));
    $('#allBahtTargetNowQ3').html(accounting.formatNumber((accounting.unformat(targetAMB.AmtQ3) + accounting.unformat(targetMCB.AmtQ3)), 2));
    $('#allBahtTargetNowQ4').html(accounting.formatNumber((accounting.unformat(targetAMB.AmtQ4) + accounting.unformat(targetMCB.AmtQ4)), 2));
    $('#allBahtTargetNow1').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt01) + accounting.unformat(targetMCB.Amt01)) / 1000, 2));
    $('#allBahtTargetNow2').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt02) + accounting.unformat(targetMCB.Amt02)) / 1000, 2));
    $('#allBahtTargetNow3').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt03) + accounting.unformat(targetMCB.Amt03)) / 1000, 2));
    $('#allBahtTargetNow4').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt04) + accounting.unformat(targetMCB.Amt04)) / 1000, 2));
    $('#allBahtTargetNow5').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt05) + accounting.unformat(targetMCB.Amt05)) / 1000, 2));
    $('#allBahtTargetNow6').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt06) + accounting.unformat(targetMCB.Amt06)) / 1000, 2));
    $('#allBahtTargetNow7').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt07) + accounting.unformat(targetMCB.Amt07)) / 1000, 2));
    $('#allBahtTargetNow8').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt08) + accounting.unformat(targetMCB.Amt08)) / 1000, 2));
    $('#allBahtTargetNow9').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt09) + accounting.unformat(targetMCB.Amt09)) / 1000, 2));
    $('#allBahtTargetNow10').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt10) + accounting.unformat(targetMCB.Amt10)) / 1000, 2));
    $('#allBahtTargetNow11').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt11) + accounting.unformat(targetMCB.Amt11)) / 1000, 2));
    $('#allBahtTargetNow12').html(accounting.formatNumber((accounting.unformat(targetAMB.Amt12) + accounting.unformat(targetMCB.Amt12)) / 1000, 2));
    $('#allBahtTargetNowTotal').html(accounting.formatNumber(totalAMBBahtTarget / 1000, 2));
    $('#allBahtTargetNowQTotal').html(accounting.formatNumber(totalAMBBahtTarget, 2));

    $('#allUnitTargetNowQ1').html(accounting.formatNumber((accounting.unformat(targetAMB.UnitQ1) + accounting.unformat(targetMCB.UnitQ1))));
    $('#allUnitTargetNowQ2').html(accounting.formatNumber((accounting.unformat(targetAMB.UnitQ2) + accounting.unformat(targetMCB.UnitQ2))));
    $('#allUnitTargetNowQ3').html(accounting.formatNumber((accounting.unformat(targetAMB.UnitQ3) + accounting.unformat(targetMCB.UnitQ3))));
    $('#allUnitTargetNowQ4').html(accounting.formatNumber((accounting.unformat(targetAMB.UnitQ4) + accounting.unformat(targetMCB.UnitQ4))));
    $('#allUnitTargetNow1').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit01) + accounting.unformat(targetMCB.Unit01))));
    $('#allUnitTargetNow2').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit02) + accounting.unformat(targetMCB.Unit02))));
    $('#allUnitTargetNow3').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit03) + accounting.unformat(targetMCB.Unit03))));
    $('#allUnitTargetNow4').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit04) + accounting.unformat(targetMCB.Unit04))));
    $('#allUnitTargetNow5').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit05) + accounting.unformat(targetMCB.Unit05))));
    $('#allUnitTargetNow6').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit06) + accounting.unformat(targetMCB.Unit06))));
    $('#allUnitTargetNow7').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit07) + accounting.unformat(targetMCB.Unit07))));
    $('#allUnitTargetNow8').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit08) + accounting.unformat(targetMCB.Unit08))));
    $('#allUnitTargetNow9').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit09) + accounting.unformat(targetMCB.Unit09))));
    $('#allUnitTargetNow10').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit10) + accounting.unformat(targetMCB.Unit10))));
    $('#allUnitTargetNow11').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit11) + accounting.unformat(targetMCB.Unit11))));
    $('#allUnitTargetNow12').html(accounting.formatNumber((accounting.unformat(targetAMB.Unit12) + accounting.unformat(targetMCB.Unit12))));
    $('#allUnitTargetNowTotal').html(accounting.formatNumber(totalAMBUnitTarget));
    $('#allUnitTargetNowQTotal').html(accounting.formatNumber(totalAMBUnitTarget));

    $('#allBahtActualNowQ1').html(accounting.formatNumber(currBahtQ1, 2));
    $('#allBahtActualNowQ2').html(accounting.formatNumber(currBahtQ2, 2));
    $('#allBahtActualNowQ3').html(accounting.formatNumber(currBahtQ3, 2));
    $('#allBahtActualNowQ4').html(accounting.formatNumber(currBahtQ4, 2));
    $('#allBahtActualNow1').html(accounting.formatNumber(currBahtJanuary / 1000, 2));
    $('#allBahtActualNow2').html(accounting.formatNumber(currBahtFebruary / 1000, 2));
    $('#allBahtActualNow3').html(accounting.formatNumber(currBahtMarch / 1000, 2));
    $('#allBahtActualNow4').html(accounting.formatNumber(currBahtApril / 1000, 2));
    $('#allBahtActualNow5').html(accounting.formatNumber(currBahtMay / 1000, 2));
    $('#allBahtActualNow6').html(accounting.formatNumber(currBahtJune / 1000, 2));
    $('#allBahtActualNow7').html(accounting.formatNumber(currBahtJuly / 1000, 2));
    $('#allBahtActualNow8').html(accounting.formatNumber(currBahtAugust / 1000, 2));
    $('#allBahtActualNow9').html(accounting.formatNumber(currBahtSeptember / 1000, 2));
    $('#allBahtActualNow10').html(accounting.formatNumber(currBahtOctober / 1000, 2));
    $('#allBahtActualNow11').html(accounting.formatNumber(currBahtNovember / 1000, 2));
    $('#allBahtActualNow12').html(accounting.formatNumber(currBahtDecember / 1000, 2));
    $('#allBahtActualNowTotal').html(accounting.formatNumber(currTotalBaht / 1000, 2));
    $('#allBahtActualNowQTotal').html(accounting.formatNumber(currTotalBaht, 2));

    $('#allBahtActualOldQ1').html(accounting.formatNumber(oldBahtQ1, 2));
    $('#allBahtActualOldQ2').html(accounting.formatNumber(oldBahtQ2, 2));
    $('#allBahtActualOldQ3').html(accounting.formatNumber(oldBahtQ3, 2));
    $('#allBahtActualOldQ4').html(accounting.formatNumber(oldBahtQ4, 2));
    $('#allBahtActualOld1').html(accounting.formatNumber(oldBahtJanuary / 1000, 2));
    $('#allBahtActualOld2').html(accounting.formatNumber(oldBahtFebruary / 1000, 2));
    $('#allBahtActualOld3').html(accounting.formatNumber(oldBahtMarch / 1000, 2));
    $('#allBahtActualOld4').html(accounting.formatNumber(oldBahtApril / 1000, 2));
    $('#allBahtActualOld5').html(accounting.formatNumber(oldBahtMay / 1000, 2));
    $('#allBahtActualOld6').html(accounting.formatNumber(oldBahtJune / 1000, 2));
    $('#allBahtActualOld7').html(accounting.formatNumber(oldBahtJuly / 1000, 2));
    $('#allBahtActualOld8').html(accounting.formatNumber(oldBahtAugust / 1000, 2));
    $('#allBahtActualOld9').html(accounting.formatNumber(oldBahtSeptember / 1000, 2));
    $('#allBahtActualOld10').html(accounting.formatNumber(oldBahtOctober / 1000, 2));
    $('#allBahtActualOld11').html(accounting.formatNumber(oldBahtNovember / 1000, 2));
    $('#allBahtActualOld12').html(accounting.formatNumber(oldBahtDecember / 1000, 2));
    $('#allBahtActualOldTotal').html(accounting.formatNumber(oldTotalBaht / 1000, 2));
    $('#allBahtActualOldQTotal').html(accounting.formatNumber(oldTotalBaht, 2));

    $('#allBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ1, 2)) + "%");
    $('#allBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ2, 2)) + "%");
    $('#allBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ3, 2)) + "%");
    $('#allBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ4, 2)) + "%");
    $('#allBahtGrowth1').html((isNaN(accounting.formatNumber(growthBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJanuary, 2)) + "%");
    $('#allBahtGrowth2').html((isNaN(accounting.formatNumber(growthBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtFebruary, 2)) + "%");
    $('#allBahtGrowth3').html((isNaN(accounting.formatNumber(growthBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtMarch, 2)) + "%");
    $('#allBahtGrowth4').html((isNaN(accounting.formatNumber(growthBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtApril, 2)) + "%");
    $('#allBahtGrowth5').html((isNaN(accounting.formatNumber(growthBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtMay, 2)) + "%");
    $('#allBahtGrowth6').html((isNaN(accounting.formatNumber(growthBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJune, 2)) + "%");
    $('#allBahtGrowth7').html((isNaN(accounting.formatNumber(growthBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtJuly, 2)) + "%");
    $('#allBahtGrowth8').html((isNaN(accounting.formatNumber(growthBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtAugust, 2)) + "%");
    $('#allBahtGrowth9').html((isNaN(accounting.formatNumber(growthBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtSeptember, 2)) + "%");
    $('#allBahtGrowth10').html((isNaN(accounting.formatNumber(growthBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtOctober, 2)) + "%");
    $('#allBahtGrowth11').html((isNaN(accounting.formatNumber(growthBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtNovember, 2)) + "%");
    $('#allBahtGrowth12').html((isNaN(accounting.formatNumber(growthBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtDecember, 2)) + "%");
    $('#allBahtGrowthTotal').html((isNaN(accounting.formatNumber(growthBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtTotal, 2)) + "%");
    $('#allBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtTotal, 2)) + "%");

    $('#allBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ1, 2)) + "%");
    $('#allBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ2, 2)) + "%");
    $('#allBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ3, 2)) + "%");
    $('#allBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ4, 2)) + "%");
    $('#allBahtAchieve1').html((isNaN(accounting.formatNumber(achieveBahtJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJanuary, 2)) + "%");
    $('#allBahtAchieve2').html((isNaN(accounting.formatNumber(achieveBahtFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtFebruary, 2)) + "%");
    $('#allBahtAchieve3').html((isNaN(accounting.formatNumber(achieveBahtMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtMarch, 2)) + "%");
    $('#allBahtAchieve4').html((isNaN(accounting.formatNumber(achieveBahtApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtApril, 2)) + "%");
    $('#allBahtAchieve5').html((isNaN(accounting.formatNumber(achieveBahtMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtMay, 2)) + "%");
    $('#allBahtAchieve6').html((isNaN(accounting.formatNumber(achieveBahtJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJune, 2)) + "%");
    $('#allBahtAchieve7').html((isNaN(accounting.formatNumber(achieveBahtJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtJuly, 2)) + "%");
    $('#allBahtAchieve8').html((isNaN(accounting.formatNumber(achieveBahtAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtAugust, 2)) + "%");
    $('#allBahtAchieve9').html((isNaN(accounting.formatNumber(achieveBahtSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtSeptember, 2)) + "%");
    $('#allBahtAchieve10').html((isNaN(accounting.formatNumber(achieveBahtOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtOctober, 2)) + "%");
    $('#allBahtAchieve11').html((isNaN(accounting.formatNumber(achieveBahtNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtNovember, 2)) + "%");
    $('#allBahtAchieve12').html((isNaN(accounting.formatNumber(achieveBahtDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtDecember, 2)) + "%");
    $('#allBahtAchieveTotal').html((isNaN(accounting.formatNumber(achieveBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtTotal, 2)) + "%");
    $('#allBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtTotal, 2)) + "%");

    $('#allUnitActualNowQ1').html(accounting.formatNumber(currUnitQ1));
    $('#allUnitActualNowQ2').html(accounting.formatNumber(currUnitQ2));
    $('#allUnitActualNowQ3').html(accounting.formatNumber(currUnitQ3));
    $('#allUnitActualNowQ4').html(accounting.formatNumber(currUnitQ4));
    $('#allUnitActualNow1').html(accounting.formatNumber(currUnitJanuary));
    $('#allUnitActualNow2').html(accounting.formatNumber(currUnitFebruary));
    $('#allUnitActualNow3').html(accounting.formatNumber(currUnitMarch));
    $('#allUnitActualNow4').html(accounting.formatNumber(currUnitApril));
    $('#allUnitActualNow5').html(accounting.formatNumber(currUnitMay));
    $('#allUnitActualNow6').html(accounting.formatNumber(currUnitJune));
    $('#allUnitActualNow7').html(accounting.formatNumber(currUnitJuly));
    $('#allUnitActualNow8').html(accounting.formatNumber(currUnitAugust));
    $('#allUnitActualNow9').html(accounting.formatNumber(currUnitSeptember));
    $('#allUnitActualNow10').html(accounting.formatNumber(currUnitOctober));
    $('#allUnitActualNow11').html(accounting.formatNumber(currUnitNovember));
    $('#allUnitActualNow12').html(accounting.formatNumber(currUnitDecember));
    $('#allUnitActualNowTotal').html(accounting.formatNumber(currTotalUnit));
    $('#allUnitActualNowQTotal').html(accounting.formatNumber(currTotalUnit));

    $('#allUnitActualOldQ1').html(accounting.formatNumber(oldUnitQ1));
    $('#allUnitActualOldQ2').html(accounting.formatNumber(oldUnitQ2));
    $('#allUnitActualOldQ3').html(accounting.formatNumber(oldUnitQ3));
    $('#allUnitActualOldQ4').html(accounting.formatNumber(oldUnitQ4));
    $('#allUnitActualOld1').html(accounting.formatNumber(oldUnitJanuary));
    $('#allUnitActualOld2').html(accounting.formatNumber(oldUnitFebruary));
    $('#allUnitActualOld3').html(accounting.formatNumber(oldUnitMarch));
    $('#allUnitActualOld4').html(accounting.formatNumber(oldUnitApril));
    $('#allUnitActualOld5').html(accounting.formatNumber(oldUnitMay));
    $('#allUnitActualOld6').html(accounting.formatNumber(oldUnitJune));
    $('#allUnitActualOld7').html(accounting.formatNumber(oldUnitJuly));
    $('#allUnitActualOld8').html(accounting.formatNumber(oldUnitAugust));
    $('#allUnitActualOld9').html(accounting.formatNumber(oldUnitSeptember));
    $('#allUnitActualOld10').html(accounting.formatNumber(oldUnitOctober));
    $('#allUnitActualOld11').html(accounting.formatNumber(oldUnitNovember));
    $('#allUnitActualOld12').html(accounting.formatNumber(oldUnitDecember));
    $('#allUnitActualOldTotal').html(accounting.formatNumber(oldTotalUnit));
    $('#allUnitActualOldQTotal').html(accounting.formatNumber(oldTotalUnit));

    $('#allUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ1, 2)) + "%");
    $('#allUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ2, 2)) + "%");
    $('#allUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ3, 2)) + "%");
    $('#allUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ4, 2)) + "%");
    $('#allUnitGrowth1').html((isNaN(accounting.formatNumber(growthUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJanuary, 2)) + "%");
    $('#allUnitGrowth2').html((isNaN(accounting.formatNumber(growthUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitFebruary, 2)) + "%");
    $('#allUnitGrowth3').html((isNaN(accounting.formatNumber(growthUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitMarch, 2)) + "%");
    $('#allUnitGrowth4').html((isNaN(accounting.formatNumber(growthUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitApril, 2)) + "%");
    $('#allUnitGrowth5').html((isNaN(accounting.formatNumber(growthUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitMay, 2)) + "%");
    $('#allUnitGrowth6').html((isNaN(accounting.formatNumber(growthUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJune, 2)) + "%");
    $('#allUnitGrowth7').html((isNaN(accounting.formatNumber(growthUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitJuly, 2)) + "%");
    $('#allUnitGrowth8').html((isNaN(accounting.formatNumber(growthUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitAugust, 2)) + "%");
    $('#allUnitGrowth9').html((isNaN(accounting.formatNumber(growthUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitSeptember, 2)) + "%");
    $('#allUnitGrowth10').html((isNaN(accounting.formatNumber(growthUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitOctober, 2)) + "%");
    $('#allUnitGrowth11').html((isNaN(accounting.formatNumber(growthUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitNovember, 2)) + "%");
    $('#allUnitGrowth12').html((isNaN(accounting.formatNumber(growthUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitDecember, 2)) + "%");
    $('#allUnitGrowthTotal').html((isNaN(accounting.formatNumber(growthUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitTotal, 2)) + "%");
    $('#allUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitTotal, 2)) + "%");

    $('#allUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ1, 2)) + "%");
    $('#allUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ2, 2)) + "%");
    $('#allUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ3, 2)) + "%");
    $('#allUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ4, 2)) + "%");
    $('#allUnitAchieve1').html((isNaN(accounting.formatNumber(achieveUnitJanuary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJanuary, 2)) + "%");
    $('#allUnitAchieve2').html((isNaN(accounting.formatNumber(achieveUnitFebruary, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitFebruary, 2)) + "%");
    $('#allUnitAchieve3').html((isNaN(accounting.formatNumber(achieveUnitMarch, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitMarch, 2)) + "%");
    $('#allUnitAchieve4').html((isNaN(accounting.formatNumber(achieveUnitApril, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitApril, 2)) + "%");
    $('#allUnitAchieve5').html((isNaN(accounting.formatNumber(achieveUnitMay, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitMay, 2)) + "%");
    $('#allUnitAchieve6').html((isNaN(accounting.formatNumber(achieveUnitJune, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJune, 2)) + "%");
    $('#allUnitAchieve7').html((isNaN(accounting.formatNumber(achieveUnitJuly, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitJuly, 2)) + "%");
    $('#allUnitAchieve8').html((isNaN(accounting.formatNumber(achieveUnitAugust, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitAugust, 2)) + "%");
    $('#allUnitAchieve9').html((isNaN(accounting.formatNumber(achieveUnitSeptember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitSeptember, 2)) + "%");
    $('#allUnitAchieve10').html((isNaN(accounting.formatNumber(achieveUnitOctober, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitOctober, 2)) + "%");
    $('#allUnitAchieve11').html((isNaN(accounting.formatNumber(achieveUnitNovember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitNovember, 2)) + "%");
    $('#allUnitAchieve12').html((isNaN(accounting.formatNumber(achieveUnitDecember, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitDecember, 2)) + "%");
    $('#allUnitAchieveTotal').html((isNaN(accounting.formatNumber(achieveUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitTotal, 2)) + "%");
    $('#allUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitTotal, 2)) + "%");

    unitGraph(year, accounting.unformat(targetAMB.Unit01), accounting.unformat(targetAMB.Unit02), accounting.unformat(targetAMB.Unit03), accounting.unformat(targetAMB.Unit04),
        accounting.unformat(targetAMB.Unit05), accounting.unformat(targetAMB.Unit06), accounting.unformat(targetAMB.Unit07), accounting.unformat(targetAMB.Unit08),
        accounting.unformat(targetAMB.Unit09), accounting.unformat(targetAMB.Unit10), accounting.unformat(targetAMB.Unit11), accounting.unformat(targetAMB.Unit12),
        accounting.unformat(totalAMBUnitTarget), currAMBUnitJanuary, currAMBUnitFebruary, currAMBUnitMarch, currAMBUnitApril, currAMBUnitMay, currAMBUnitJune, currAMBUnitJuly, currAMBUnitAugust,
        currAMBUnitSeptember, currAMBUnitOctober, currAMBUnitNovember, currAMBUnitDecember, currAMBTotalUnit, oldAMBUnitJanuary, oldAMBUnitFebruary, oldAMBUnitMarch, oldAMBUnitApril, oldAMBUnitMay,
        oldAMBUnitJune, oldAMBUnitJuly, oldAMBUnitAugust, oldAMBUnitSeptember, oldAMBUnitOctober, oldAMBUnitNovember, oldAMBUnitDecember, oldAMBTotalUnit,
        accounting.unformat(targetMCB.Unit01), accounting.unformat(targetMCB.Unit02), accounting.unformat(targetMCB.Unit03), accounting.unformat(targetMCB.Unit04),
        accounting.unformat(targetMCB.Unit05), accounting.unformat(targetMCB.Unit06), accounting.unformat(targetMCB.Unit07), accounting.unformat(targetMCB.Unit08),
        accounting.unformat(targetMCB.Unit09), accounting.unformat(targetMCB.Unit10), accounting.unformat(targetMCB.Unit11), accounting.unformat(targetMCB.Unit12),
        accounting.unformat(totalMCBUnitTarget), currMCBUnitJanuary, currMCBUnitFebruary, currMCBUnitMarch, currMCBUnitApril, currMCBUnitMay, currMCBUnitJune, currMCBUnitJuly, currMCBUnitAugust,
        currMCBUnitSeptember, currMCBUnitOctober, currMCBUnitNovember, currMCBUnitDecember, currMCBTotalUnit, oldMCBUnitJanuary, oldMCBUnitFebruary, oldMCBUnitMarch, oldMCBUnitApril, oldMCBUnitMay,
        oldMCBUnitJune, oldMCBUnitJuly, oldMCBUnitAugust, oldMCBUnitSeptember, oldMCBUnitOctober, oldMCBUnitNovember, oldMCBUnitDecember, oldMCBTotalUnit);
    unitGraphQ(year, accounting.unformat(targetAMB.UnitQ1), accounting.unformat(targetAMB.UnitQ2), accounting.unformat(targetAMB.UnitQ3), accounting.unformat(targetAMB.UnitQ4),
        accounting.unformat(totalAMBUnitTarget), currAMBUnitQ1, currAMBUnitQ2, currAMBUnitQ3, currAMBUnitQ4, currAMBTotalUnit, oldAMBUnitQ1, oldAMBUnitQ2, oldAMBUnitQ3, oldAMBUnitQ4, oldAMBTotalUnit,
        accounting.unformat(targetMCB.UnitQ1), accounting.unformat(targetMCB.UnitQ2), accounting.unformat(targetMCB.UnitQ3), accounting.unformat(targetMCB.UnitQ4),
        accounting.unformat(totalMCBUnitTarget), currMCBUnitQ1, currMCBUnitQ2, currMCBUnitQ3, currMCBUnitQ4, currMCBTotalUnit, oldMCBUnitQ1, oldMCBUnitQ2, oldMCBUnitQ3, oldMCBUnitQ4, oldMCBTotalUnit);
    bahtGraph(year, accounting.unformat(targetAMB.Amt01), accounting.unformat(targetAMB.Amt02), accounting.unformat(targetAMB.Amt03), accounting.unformat(targetAMB.Amt04),
        accounting.unformat(targetAMB.Amt05), accounting.unformat(targetAMB.Amt06), accounting.unformat(targetAMB.Amt07), accounting.unformat(targetAMB.Amt08),
        accounting.unformat(targetAMB.Amt09), accounting.unformat(targetAMB.Amt10), accounting.unformat(targetAMB.Amt11), accounting.unformat(targetAMB.Amt12),
        accounting.unformat(totalAMBBahtTarget), currAMBBahtJanuary, currAMBBahtFebruary, currAMBBahtMarch, currAMBBahtApril, currAMBBahtMay, currAMBBahtJune, currAMBBahtJuly, currAMBBahtAugust,
        currAMBBahtSeptember, currAMBBahtOctober, currAMBBahtNovember, currAMBBahtDecember, currAMBTotalBaht, oldAMBBahtJanuary, oldAMBBahtFebruary, oldAMBBahtMarch, oldAMBBahtApril, oldAMBBahtMay,
        oldAMBBahtJune, oldAMBBahtJuly, oldAMBBahtAugust, oldAMBBahtSeptember, oldAMBBahtOctober, oldAMBBahtNovember, oldAMBBahtDecember, oldAMBTotalBaht,
        accounting.unformat(targetMCB.Amt01), accounting.unformat(targetMCB.Amt02), accounting.unformat(targetMCB.Amt03), accounting.unformat(targetMCB.Amt04),
        accounting.unformat(targetMCB.Amt05), accounting.unformat(targetMCB.Amt06), accounting.unformat(targetMCB.Amt07), accounting.unformat(targetMCB.Amt08),
        accounting.unformat(targetMCB.Amt09), accounting.unformat(targetMCB.Amt10), accounting.unformat(targetMCB.Amt11), accounting.unformat(targetMCB.Amt12),
        accounting.unformat(totalMCBBahtTarget), currMCBBahtJanuary, currMCBBahtFebruary, currMCBBahtMarch, currMCBBahtApril, currMCBBahtMay, currMCBBahtJune, currMCBBahtJuly, currMCBBahtAugust,
        currMCBBahtSeptember, currMCBBahtOctober, currMCBBahtNovember, currMCBBahtDecember, currMCBTotalBaht, oldMCBBahtJanuary, oldMCBBahtFebruary, oldMCBBahtMarch, oldMCBBahtApril, oldMCBBahtMay,
        oldMCBBahtJune, oldMCBBahtJuly, oldMCBBahtAugust, oldMCBBahtSeptember, oldMCBBahtOctober, oldMCBBahtNovember, oldMCBBahtDecember, oldMCBTotalBaht);
    bahtGraphQ(year, accounting.unformat(targetAMB.AmtQ1), accounting.unformat(targetAMB.AmtQ2), accounting.unformat(targetAMB.AmtQ3), accounting.unformat(targetAMB.AmtQ4),
        accounting.unformat(totalAMBBahtTarget), currAMBBahtQ1, currAMBBahtQ2, currAMBBahtQ3, currAMBBahtQ4, currAMBTotalBaht, oldAMBBahtQ1, oldAMBBahtQ2, oldAMBBahtQ3, oldAMBBahtQ4, oldAMBTotalBaht,
        accounting.unformat(targetMCB.AmtQ1), accounting.unformat(targetMCB.AmtQ2), accounting.unformat(targetMCB.AmtQ3), accounting.unformat(targetMCB.AmtQ4),
        accounting.unformat(totalMCBBahtTarget), currMCBBahtQ1, currMCBBahtQ2, currMCBBahtQ3, currMCBBahtQ4, currMCBTotalBaht, oldMCBBahtQ1, oldMCBBahtQ2, oldMCBBahtQ3, oldMCBBahtQ4, oldMCBTotalBaht);

}

function unitGraph(year, targetAMB1, targetAMB2, targetAMB3, targetAMB4, targetAMB5, targetAMB6, targetAMB7, targetAMB8, targetAMB9, targetAMB10, targetAMB11, targetAMB12, targetAMBTotal, currAMBJanuary, currAMBFebruary, currAMBMarch, currAMBApril, currAMBMay, currAMBJune, currAMBJuly, currAMBAugust, currAMBSeptember, currAMBOctober, currAMBNovember, currAMBDecember, currAMBTotal, oldAMBJanuary, oldAMBFebruary, oldAMBMarch, oldAMBApril, oldAMBMay, oldAMBJune, oldAMBJuly, oldAMBAugust, oldAMBSeptember, oldAMBOctober, oldAMBNovember, oldAMBDecember, oldAMBTotal,
    targetMCB1, targetMCB2, targetMCB3, targetMCB4, targetMCB5, targetMCB6, targetMCB7, targetMCB8, targetMCB9, targetMCB10, targetMCB11, targetMCB12, targetMCBTotal, currMCBJanuary, currMCBFebruary, currMCBMarch, currMCBApril, currMCBMay, currMCBJune, currMCBJuly, currMCBAugust, currMCBSeptember, currMCBOctober, currMCBNovember, currMCBDecember, currMCBTotal, oldMCBJanuary, oldMCBFebruary, oldMCBMarch, oldMCBApril, oldMCBMay, oldMCBJune, oldMCBJuly, oldMCBAugust, oldMCBSeptember, oldMCBOctober, oldMCBNovember, oldMCBDecember, oldMCBTotal) {

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
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        yAxis: {
            min: 0
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
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
        title: {
            text: 'SPD Sales Summary Report : ' + year + ' (Unit)'
        },
        series: [{
            name: 'AMB ' + (year - 1),
            data: [{
                y: oldAMBJanuary,
                month: 1,
                value: accounting.formatNumber(oldAMBJanuary)
            }, {
                y: oldAMBFebruary,
                month: 2,
                value: accounting.formatNumber(oldAMBFebruary)
            }, {
                y: oldAMBMarch,
                month: 3,
                value: accounting.formatNumber(oldAMBMarch)
            }, {
                y: oldAMBApril,
                month: 4,
                value: accounting.formatNumber(oldAMBApril)
            }, {
                y: oldAMBMay,
                month: 5,
                value: accounting.formatNumber(oldAMBMay)
            }, {
                y: oldAMBJune,
                month: 6,
                value: accounting.formatNumber(oldAMBJune)
            }, {
                y: oldAMBJuly,
                month: 7,
                value: accounting.formatNumber(oldAMBJuly)
            }, {
                y: oldAMBAugust,
                month: 8,
                value: accounting.formatNumber(oldAMBAugust)
            }, {
                y: oldAMBSeptember,
                month: 9,
                value: accounting.formatNumber(oldAMBSeptember)
            }, {
                y: oldAMBOctober,
                month: 10,
                value: accounting.formatNumber(oldAMBOctober)
            }, {
                y: oldAMBNovember,
                month: 11,
                value: accounting.formatNumber(oldAMBNovember)
            }, {
                y: oldAMBDecember,
                month: 12,
                value: accounting.formatNumber(oldAMBDecember)
            }],
            stack: 'old',
            color: '#7ab9de'
        }, {
            name: 'MCB ' + (year - 1),
            data: [{
                y: oldMCBJanuary,
                month: 1,
                value: accounting.formatNumber(oldMCBJanuary)
            }, {
                y: oldMCBFebruary,
                month: 2,
                value: accounting.formatNumber(oldMCBFebruary)
            }, {
                y: oldMCBMarch,
                month: 3,
                value: accounting.formatNumber(oldMCBMarch)
            }, {
                y: oldMCBApril,
                month: 4,
                value: accounting.formatNumber(oldMCBApril)
            }, {
                y: oldMCBMay,
                month: 5,
                value: accounting.formatNumber(oldMCBMay)
            }, {
                y: oldMCBJune,
                month: 6,
                value: accounting.formatNumber(oldMCBJune)
            }, {
                y: oldMCBJuly,
                month: 7,
                value: accounting.formatNumber(oldMCBJuly)
            }, {
                y: oldMCBAugust,
                month: 8,
                value: accounting.formatNumber(oldMCBAugust)
            }, {
                y: oldMCBSeptember,
                month: 9,
                value: accounting.formatNumber(oldMCBSeptember)
            }, {
                y: oldMCBOctober,
                month: 10,
                value: accounting.formatNumber(oldMCBOctober)
            }, {
                y: oldMCBNovember,
                month: 11,
                value: accounting.formatNumber(oldMCBNovember)
            }, {
                y: oldMCBDecember,
                month: 12,
                value: accounting.formatNumber(oldMCBDecember)
            }],
            stack: 'old',
            color: '#eed1d2'
        }, {
            name: 'AMB ' + year,
            data: [{
                y: currAMBJanuary,
                month: 1,
                value: accounting.formatNumber(currAMBJanuary)
            }, {
                y: currAMBFebruary,
                month: 2,
                value: accounting.formatNumber(currAMBFebruary)
            }, {
                y: currAMBMarch,
                month: 3,
                value: accounting.formatNumber(currAMBMarch)
            }, {
                y: currAMBApril,
                month: 4,
                value: accounting.formatNumber(currAMBApril)
            }, {
                y: currAMBMay,
                month: 5,
                value: accounting.formatNumber(currAMBMay)
            }, {
                y: currAMBJune,
                month: 6,
                value: accounting.formatNumber(currAMBJune)
            }, {
                y: currAMBJuly,
                month: 7,
                value: accounting.formatNumber(currAMBJuly)
            }, {
                y: currAMBAugust,
                month: 8,
                value: accounting.formatNumber(currAMBAugust)
            }, {
                y: currAMBSeptember,
                month: 9,
                value: accounting.formatNumber(currAMBSeptember)
            }, {
                y: currAMBOctober,
                month: 10,
                value: accounting.formatNumber(currAMBOctober)
            }, {
                y: currAMBNovember,
                month: 11,
                value: accounting.formatNumber(currAMBNovember)
            }, {
                y: currAMBDecember,
                month: 12,
                value: accounting.formatNumber(currAMBDecember)
            }],
            stack: 'new',
            color: '#2988bc'
        }, {
            name: 'MCB ' + year,
            data: [{
                y: currMCBJanuary,
                month: 1,
                value: accounting.formatNumber(currMCBJanuary)
            }, {
                y: currMCBFebruary,
                month: 2,
                value: accounting.formatNumber(currMCBFebruary)
            }, {
                y: currMCBMarch,
                month: 3,
                value: accounting.formatNumber(currMCBMarch)
            }, {
                y: currMCBApril,
                month: 4,
                value: accounting.formatNumber(currMCBApril)
            }, {
                y: currMCBMay,
                month: 5,
                value: accounting.formatNumber(currMCBMay)
            }, {
                y: currMCBJune,
                month: 6,
                value: accounting.formatNumber(currMCBJune)
            }, {
                y: currMCBJuly,
                month: 7,
                value: accounting.formatNumber(currMCBJuly)
            }, {
                y: currMCBAugust,
                month: 8,
                value: accounting.formatNumber(currMCBAugust)
            }, {
                y: currMCBSeptember,
                month: 9,
                value: accounting.formatNumber(currMCBSeptember)
            }, {
                y: currMCBOctober,
                month: 10,
                value: accounting.formatNumber(currMCBOctober)
            }, {
                y: currMCBNovember,
                month: 11,
                value: accounting.formatNumber(currMCBNovember)
            }, {
                y: currMCBDecember,
                month: 12,
                value: accounting.formatNumber(currMCBDecember)
            }],
            stack: 'new',
            color: '#ffb6b9'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetAMB1 + targetMCB1,
                month: 1,
                value: accounting.formatNumber(targetAMB1 + targetMCB1)
            }, {
                y: targetAMB2 + targetMCB2,
                month: 2,
                value: accounting.formatNumber(targetAMB2 + targetMCB2)
            }, {
                y: targetAMB3 + targetMCB3,
                month: 3,
                value: accounting.formatNumber(targetAMB3 + targetMCB3)
            }, {
                y: targetAMB4 + targetMCB4,
                month: 4,
                value: accounting.formatNumber(targetAMB4 + targetMCB4)
            }, {
                y: targetAMB5 + targetMCB4,
                month: 5,
                value: accounting.formatNumber(targetAMB5 + targetMCB4)
            }, {
                y: targetAMB6 + targetMCB6,
                month: 6,
                value: accounting.formatNumber(targetAMB6 + targetMCB6)
            }, {
                y: targetAMB7 + targetMCB7,
                month: 7,
                value: accounting.formatNumber(targetAMB7 + targetMCB7)
            }, {
                y: targetAMB8 + targetMCB8,
                month: 8,
                value: accounting.formatNumber(targetAMB8 + targetMCB8)
            }, {
                y: targetAMB9 + targetMCB9,
                month: 9,
                value: accounting.formatNumber(targetAMB9 + targetMCB9)
            }, {
                y: targetAMB10 + targetMCB10,
                month: 10,
                value: accounting.formatNumber(targetAMB10 + targetMCB10)
            }, {
                y: targetAMB11 + targetMCB11,
                month: 11,
                value: accounting.formatNumber(targetAMB11 + targetMCB11)
            }, {
                y: targetAMB12 + targetMCB12,
                month: 12,
                value: accounting.formatNumber(targetAMB12 + targetMCB12)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });
}

function bahtGraph(year, targetAMB1, targetAMB2, targetAMB3, targetAMB4, targetAMB5, targetAMB6, targetAMB7, targetAMB8, targetAMB9, targetAMB10, targetAMB11, targetAMB12, targetAMBTotal, currAMBJanuary, currAMBFebruary, currAMBMarch, currAMBApril, currAMBMay, currAMBJune, currAMBJuly, currAMBAugust, currAMBSeptember, currAMBOctober, currAMBNovember, currAMBDecember, currAMBTotal, oldAMBJanuary, oldAMBFebruary, oldAMBMarch, oldAMBApril, oldAMBMay, oldAMBJune, oldAMBJuly, oldAMBAugust, oldAMBSeptember, oldAMBOctober, oldAMBNovember, oldAMBDecember, oldAMBTotal,
    targetMCB1, targetMCB2, targetMCB3, targetMCB4, targetMCB5, targetMCB6, targetMCB7, targetMCB8, targetMCB9, targetMCB10, targetMCB11, targetMCB12, targetMCBTotal, currMCBJanuary, currMCBFebruary, currMCBMarch, currMCBApril, currMCBMay, currMCBJune, currMCBJuly, currMCBAugust, currMCBSeptember, currMCBOctober, currMCBNovember, currMCBDecember, currMCBTotal, oldMCBJanuary, oldMCBFebruary, oldMCBMarch, oldMCBApril, oldMCBMay, oldMCBJune, oldMCBJuly, oldMCBAugust, oldMCBSeptember, oldMCBOctober, oldMCBNovember, oldMCBDecember, oldMCBTotal) {

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
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        title: {
            text: 'SPD Sales Summary Report : ' + year + ' (Baht)'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        yAxis: {
            min: 0
        },
        series: [{
            name: 'AMB ' + (year - 1),
            data: [{
                y: oldAMBJanuary,
                month: 1,
                value: accounting.formatMoney(oldAMBJanuary, "฿")
            }, {
                y: oldAMBFebruary,
                month: 2,
                value: accounting.formatMoney(oldAMBFebruary, "฿")
            }, {
                y: oldAMBMarch,
                month: 3,
                value: accounting.formatMoney(oldAMBMarch, "฿")
            }, {
                y: oldAMBApril,
                month: 4,
                value: accounting.formatMoney(oldAMBApril, "฿")
            }, {
                y: oldAMBMay,
                month: 5,
                value: accounting.formatMoney(oldAMBMay, "฿")
            }, {
                y: oldAMBJune,
                month: 6,
                value: accounting.formatMoney(oldAMBJune, "฿")
            }, {
                y: oldAMBJuly,
                month: 7,
                value: accounting.formatMoney(oldAMBJuly, "฿")
            }, {
                y: oldAMBAugust,
                month: 8,
                value: accounting.formatMoney(oldAMBAugust, "฿")
            }, {
                y: oldAMBSeptember,
                month: 9,
                value: accounting.formatMoney(oldAMBSeptember, "฿")
            }, {
                y: oldAMBOctober,
                month: 10,
                value: accounting.formatMoney(oldAMBOctober, "฿")
            }, {
                y: oldAMBNovember,
                month: 11,
                value: accounting.formatMoney(oldAMBNovember, "฿")
            }, {
                y: oldAMBDecember,
                month: 12,
                value: accounting.formatMoney(oldAMBDecember, "฿")
            }],
            stack: 'old',
            color: '#ff7666'
        }, {
            name: 'MCB ' + (year - 1),
            data: [{
                y: oldMCBJanuary,
                month: 1,
                value: accounting.formatMoney(oldMCBJanuary, "฿")
            }, {
                y: oldMCBFebruary,
                month: 2,
                value: accounting.formatMoney(oldMCBFebruary, "฿")
            }, {
                y: oldMCBMarch,
                month: 3,
                value: accounting.formatMoney(oldMCBMarch, "฿")
            }, {
                y: oldMCBApril,
                month: 4,
                value: accounting.formatMoney(oldMCBApril, "฿")
            }, {
                y: oldMCBMay,
                month: 5,
                value: accounting.formatMoney(oldMCBMay, "฿")
            }, {
                y: oldMCBJune,
                month: 6,
                value: accounting.formatMoney(oldMCBJune, "฿")
            }, {
                y: oldMCBJuly,
                month: 7,
                value: accounting.formatMoney(oldMCBJuly, "฿")
            }, {
                y: oldMCBAugust,
                month: 8,
                value: accounting.formatMoney(oldMCBAugust, "฿")
            }, {
                y: oldMCBSeptember,
                month: 9,
                value: accounting.formatMoney(oldMCBSeptember, "฿")
            }, {
                y: oldMCBOctober,
                month: 10,
                value: accounting.formatMoney(oldMCBOctober, "฿")
            }, {
                y: oldMCBNovember,
                month: 11,
                value: accounting.formatMoney(oldMCBNovember, "฿")
            }, {
                y: oldMCBDecember,
                month: 12,
                value: accounting.formatMoney(oldMCBDecember, "฿")
            }],
            stack: 'old',
            color: '#737b7e'
        }, {
            name: 'AMB ' + year,
            data: [{
                y: currAMBJanuary,
                month: 1,
                value: accounting.formatMoney(currAMBJanuary, "฿")
            }, {
                y: currAMBFebruary,
                month: 2,
                value: accounting.formatMoney(currAMBFebruary, "฿")
            }, {
                y: currAMBMarch,
                month: 3,
                value: accounting.formatMoney(currAMBMarch, "฿")
            }, {
                y: currAMBApril,
                month: 4,
                value: accounting.formatMoney(currAMBApril, "฿")
            }, {
                y: currAMBMay,
                month: 5,
                value: accounting.formatMoney(currAMBMay, "฿")
            }, {
                y: currAMBJune,
                month: 6,
                value: accounting.formatMoney(currAMBJune, "฿")
            }, {
                y: currAMBJuly,
                month: 7,
                value: accounting.formatMoney(currAMBJuly, "฿")
            }, {
                y: currAMBAugust,
                month: 8,
                value: accounting.formatMoney(currAMBAugust, "฿")
            }, {
                y: currAMBSeptember,
                month: 9,
                value: accounting.formatMoney(currAMBSeptember, "฿")
            }, {
                y: currAMBOctober,
                month: 10,
                value: accounting.formatMoney(currAMBOctober, "฿")
            }, {
                y: currAMBNovember,
                month: 11,
                value: accounting.formatMoney(currAMBNovember, "฿")
            }, {
                y: currAMBDecember,
                month: 12,
                value: accounting.formatMoney(currAMBDecember, "฿")
            }],
            stack: 'new',
            color: '#DD4B39'
        }, {
            name: 'MCB ' + year,
            data: [{
                y: currMCBJanuary,
                month: 1,
                value: accounting.formatMoney(currMCBJanuary, "฿")
            }, {
                y: currMCBFebruary,
                month: 2,
                value: accounting.formatMoney(currMCBFebruary, "฿")
            }, {
                y: currMCBMarch,
                month: 3,
                value: accounting.formatMoney(currMCBMarch, "฿")
            }, {
                y: currMCBApril,
                month: 4,
                value: accounting.formatMoney(currMCBApril, "฿")
            }, {
                y: currMCBMay,
                month: 5,
                value: accounting.formatMoney(currMCBMay, "฿")
            }, {
                y: currMCBJune,
                month: 6,
                value: accounting.formatMoney(currMCBJune, "฿")
            }, {
                y: currMCBJuly,
                month: 7,
                value: accounting.formatMoney(currMCBJuly, "฿")
            }, {
                y: currMCBAugust,
                month: 8,
                value: accounting.formatMoney(currMCBAugust, "฿")
            }, {
                y: currMCBSeptember,
                month: 9,
                value: accounting.formatMoney(currMCBSeptember, "฿")
            }, {
                y: currMCBOctober,
                month: 10,
                value: accounting.formatMoney(currMCBOctober, "฿")
            }, {
                y: currMCBNovember,
                month: 11,
                value: accounting.formatMoney(currMCBNovember, "฿")
            }, {
                y: currMCBDecember,
                month: 12,
                value: accounting.formatMoney(currMCBDecember, "฿")
            }],
            stack: 'new',
            color: '#222D32'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetAMB1 + targetMCB1,
                month: 1,
                value: accounting.formatMoney(targetAMB1 + targetMCB1, "฿")
            }, {
                y: targetAMB2 + targetMCB2,
                month: 2,
                value: accounting.formatMoney(targetAMB2 + targetMCB2, "฿")
            }, {
                y: targetAMB3 + targetMCB3,
                month: 3,
                value: accounting.formatMoney(targetAMB3 + targetMCB3, "฿")
            }, {
                y: targetAMB4 + targetMCB4,
                month: 4,
                value: accounting.formatMoney(targetAMB4 + targetMCB4, "฿")
            }, {
                y: targetAMB5 + targetMCB4,
                month: 5,
                value: accounting.formatMoney(targetAMB5 + targetMCB4, "฿")
            }, {
                y: targetAMB6 + targetMCB6,
                month: 6,
                value: accounting.formatMoney(targetAMB6 + targetMCB6, "฿")
            }, {
                y: targetAMB7 + targetMCB7,
                month: 7,
                value: accounting.formatMoney(targetAMB7 + targetMCB7, "฿")
            }, {
                y: targetAMB8 + targetMCB8,
                month: 8,
                value: accounting.formatMoney(targetAMB8 + targetMCB8, "฿")
            }, {
                y: targetAMB9 + targetMCB9,
                month: 9,
                value: accounting.formatMoney(targetAMB9 + targetMCB9, "฿")
            }, {
                y: targetAMB10 + targetMCB10,
                month: 10,
                value: accounting.formatMoney(targetAMB10 + targetMCB10, "฿")
            }, {
                y: targetAMB11 + targetMCB11,
                month: 11,
                value: accounting.formatMoney(targetAMB11 + targetMCB11, "฿")
            }, {
                y: targetAMB12 + targetMCB12,
                month: 12,
                value: accounting.formatMoney(targetAMB12 + targetMCB12, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });

}

function unitGraphQ(year, targetAMBQ1, targetAMBQ2, targetAMBQ3, targetAMBQ4, targetAMBTotal, currAMBQ1, currAMBQ2, currAMBQ3, currAMBQ4, currAMBTotal, oldAMBQ1, oldAMBQ2, oldAMBQ3, oldAMBQ4, oldAMBTotal,
    targetMCBQ1, targetMCBQ2, targetMCBQ3, targetMCBQ4, targetMCBTotal, currMCBQ1, currMCBQ2, currMCBQ3, currMCBQ4, currMCBTotal, oldMCBQ1, oldMCBQ2, oldMCBQ3, oldMCBQ4, oldMCBTotal) {

    Highcharts.chart('UnitQ', {
        chart: {
            renderTo: 'UnitQ',
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
                stacking: 'normal',
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        var type = "Q";
                        selectDataTable(nameMonth, month, year, type);
                    }
                }
            }
        },
        title: {
            text: 'SPD Sales Summary Report : Quaterly of ' + year + ' (Unit)'
        },
        xAxis: {
            categories: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
            min: 0
        },
        series: [{
            type: 'column',
            name: year - 1,
            stack: 'old',
            data: [{
                y: oldAMBQ1,
                month: 1,
                value: accounting.formatNumber(oldAMBQ1)
            }, {
                y: oldAMBQ2,
                month: 2,
                value: accounting.formatNumber(oldAMBQ2)
            }, {
                y: oldAMBQ3,
                month: 3,
                value: accounting.formatNumber(oldAMBQ3)
            }, {
                y: oldAMBQ4,
                month: 4,
                value: accounting.formatNumber(oldAMBQ4)
            }],
            color: '#7ab9de'
        }, {
            type: 'column',
            name: year - 1,
            stack: 'old',
            data: [{
                y: oldMCBQ1,
                month: 1,
                value: accounting.formatNumber(oldMCBQ1)
            }, {
                y: oldMCBQ2,
                month: 2,
                value: accounting.formatNumber(oldMCBQ2)
            }, {
                y: oldMCBQ3,
                month: 3,
                value: accounting.formatNumber(oldMCBQ3)
            }, {
                y: oldMCBQ4,
                month: 4,
                value: accounting.formatNumber(oldMCBQ4)
            }],
            color: '#eed1d2'
        }, {
            type: 'column',
            name: year,
            stack: 'new',
            data: [{
                y: currAMBQ1,
                month: 1,
                value: accounting.formatNumber(currAMBQ1)
            }, {
                y: currAMBQ2,
                month: 2,
                value: accounting.formatNumber(currAMBQ2)
            }, {
                y: currAMBQ3,
                month: 3,
                value: accounting.formatNumber(currAMBQ3)
            }, {
                y: currAMBQ4,
                month: 4,
                value: accounting.formatNumber(currAMBQ4)
            }],
            color: '#2988bc'
        }, {
            type: 'column',
            name: year,
            stack: 'new',
            data: [{
                y: currMCBQ1,
                month: 1,
                value: accounting.formatNumber(currMCBQ1)
            }, {
                y: currMCBQ2,
                month: 2,
                value: accounting.formatNumber(currMCBQ2)
            }, {
                y: currMCBQ3,
                month: 3,
                value: accounting.formatNumber(currMCBQ3)
            }, {
                y: currMCBQ4,
                month: 4,
                value: accounting.formatNumber(currMCBQ4)
            }],
            color: '#ffb6b9'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetAMBQ1 + targetMCBQ1,
                month: 1,
                value: accounting.formatNumber(targetAMBQ1 + targetMCBQ1)
            }, {
                y: targetAMBQ2 + targetMCBQ2,
                month: 2,
                value: accounting.formatNumber(targetAMBQ2 + targetMCBQ2)
            }, {
                y: targetAMBQ3 + targetMCBQ3,
                month: 3,
                value: accounting.formatNumber(targetAMBQ3 + targetMCBQ3)
            }, {
                y: targetAMBQ4 + targetMCBQ4,
                month: 4,
                value: accounting.formatNumber(targetAMBQ4 + targetMCBQ4)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });
}

function bahtGraphQ(year, targetAMBQ1, targetAMBQ2, targetAMBQ3, targetAMBQ4, targetAMBTotal, currAMBQ1, currAMBQ2, currAMBQ3, currAMBQ4, currAMBTotal, oldAMBQ1, oldAMBQ2, oldAMBQ3, oldAMBQ4, oldAMBTotal,
    targetMCBQ1, targetMCBQ2, targetMCBQ3, targetMCBQ4, targetMCBTotal, currMCBQ1, currMCBQ2, currMCBQ3, currMCBQ4, currMCBTotal, oldMCBQ1, oldMCBQ2, oldMCBQ3, oldMCBQ4, oldMCBTotal) {

    Highcharts.chart('BahtQ', {
        chart: {
            renderTo: 'BahtQ',
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
                stacking: 'normal',
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        var nameMonth = event.point.category;
                        var month = event.point.month;
                        var type = "Q";
                        selectDataTable(nameMonth, month, year, type);
                    }
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name} : <b>{point.value}</b>'
        },
        title: {
            text: 'SPD Sales Summary Report : Quaterly of ' + year + ' (Baht)'
        },
        xAxis: {
            categories: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
            min: 0
        },
        series: [{
            type: 'column',
            name: year - 1,
            stack: 'old',
            data: [{
                y: oldAMBQ1,
                month: 1,
                value: accounting.formatNumber(oldAMBQ1)
            }, {
                y: oldAMBQ2,
                month: 2,
                value: accounting.formatNumber(oldAMBQ2)
            }, {
                y: oldAMBQ3,
                month: 3,
                value: accounting.formatNumber(oldAMBQ3)
            }, {
                y: oldAMBQ4,
                month: 4,
                value: accounting.formatNumber(oldAMBQ4)
            }],
            color: '#ff7666'
        }, {
            type: 'column',
            name: year - 1,
            stack: 'old',
            data: [{
                y: oldMCBQ1,
                month: 1,
                value: accounting.formatNumber(oldMCBQ1)
            }, {
                y: oldMCBQ2,
                month: 2,
                value: accounting.formatNumber(oldMCBQ2)
            }, {
                y: oldMCBQ3,
                month: 3,
                value: accounting.formatNumber(oldMCBQ3)
            }, {
                y: oldMCBQ4,
                month: 4,
                value: accounting.formatNumber(oldMCBQ4)
            }],
            color: '#737b7e'
        }, {
            type: 'column',
            name: year,
            stack: 'new',
            data: [{
                y: currAMBQ1,
                month: 1,
                value: accounting.formatNumber(currAMBQ1)
            }, {
                y: currAMBQ2,
                month: 2,
                value: accounting.formatNumber(currAMBQ2)
            }, {
                y: currAMBQ3,
                month: 3,
                value: accounting.formatNumber(currAMBQ3)
            }, {
                y: currAMBQ4,
                month: 4,
                value: accounting.formatNumber(currAMBQ4)
            }],
            color: '#DD4B39'
        }, {
            type: 'column',
            name: year,
            stack: 'new',
            data: [{
                y: currMCBQ1,
                month: 1,
                value: accounting.formatNumber(currMCBQ1)
            }, {
                y: currMCBQ2,
                month: 2,
                value: accounting.formatNumber(currMCBQ2)
            }, {
                y: currMCBQ3,
                month: 3,
                value: accounting.formatNumber(currMCBQ3)
            }, {
                y: currMCBQ4,
                month: 4,
                value: accounting.formatNumber(currMCBQ4)
            }],
            color: '#222D32'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetAMBQ1 + targetMCBQ1,
                month: 1,
                value: accounting.formatNumber(targetAMBQ1 + targetMCBQ1)
            }, {
                y: targetAMBQ2 + targetMCBQ2,
                month: 2,
                value: accounting.formatNumber(targetAMBQ2 + targetMCBQ2)
            }, {
                y: targetAMBQ3 + targetMCBQ3,
                month: 3,
                value: accounting.formatNumber(targetAMBQ3 + targetMCBQ3)
            }, {
                y: targetAMBQ4 + targetMCBQ4,
                month: 4,
                value: accounting.formatNumber(targetAMBQ4 + targetMCBQ4)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });

}