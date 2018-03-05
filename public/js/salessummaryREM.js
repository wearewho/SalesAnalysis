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
    $('#BahtActualNow').text("Actual " + year);
    $('#BahtTargetNow').text("Target " + year);
    $('#UnitActualNow').text("Actual " + year);
    $('#UnitTargetNow').text("Target " + year);
    $('#BahtActualOld').text("Actual " + (year - 1));
    $('#UnitActualOld').text("Actual " + (year - 1));
    $('#BahtActualQNow').text("Actual " + year);
    $('#BahtTargetQNow').text("Target " + year);
    $('#UnitActualQNow').text("Actual " + year);
    $('#UnitTargetQNow').text("Target " + year);
    $('#BahtActualQOld').text("Actual " + (year - 1));
    $('#UnitActualQOld').text("Actual " + (year - 1));

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
        $('#BahtActualNow').text("Actual " + currYear);
        $('#BahtTargetNow').text("Target " + currYear);
        $('#UnitActualNow').text("Actual " + currYear);
        $('#UnitTargetNow').text("Target " + currYear);
        $('#BahtActualOld').text("Actual " + (currYear - 1));
        $('#UnitActualOld').text("Actual " + (currYear - 1));
        $('#BahtActualQNow').text("Actual " + currYear);
        $('#BahtTargetQNow').text("Target " + currYear);
        $('#UnitActualQNow').text("Actual " + currYear);
        $('#UnitTargetQNow').text("Target " + currYear);
        $('#BahtActualQOld').text("Actual " + (currYear - 1));
        $('#UnitActualQOld').text("Actual " + (currYear - 1));
        selectData(currYear);
    });

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
        url: '/SalesAnalysis/rem/selectREM',
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
        url: '/SalesAnalysis/rem/selectDataTableREM',
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
                    data: Item,
                    columns: [{
                            data: "index",
                            defaultContent: ''
                        },
                        { data: "ItemCode" },
                        { data: "Dscription" },
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
                            .column(5)
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
                            .column(6)
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
                        $(api.column(4).footer()).html('Grand Total');
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
                            "targets": 0, // your case first column
                            "orderable": false,
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
                            "width": "21%"
                        },
                        {
                            "targets": 3,
                            "className": "text-center",
                            "width": "10%"
                        },
                        {
                            "targets": 4,
                            "className": "text-left",
                            "width": "11%"
                        },
                        {
                            "targets": 5,
                            "className": "text-left",
                            "width": "15%"
                        },
                        {
                            "targets": 6,
                            "className": "text-left",
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

                var buttonsProduct = new $.fn.dataTable.Buttons(tableProduct, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            footer: true,
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'pdf',
                            footer: true,
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: "RSS" + nameMonth + year,
                            title: "REM Sales Summary: " + nameMonth + " " + year,
                            exportOptions: {
                                columns: ':visible',
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
                                                [{
                                                    colSpan: 3,
                                                    text: "REM Sales Summary by Product: " + nameMonth + " " + year,
                                                    alignment: 'center',
                                                    bold: true,
                                                    fontSize: 11
                                                }],
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
                                doc.content[0].table.widths = [30, 80, "*", 40, 70, 60, 80];
                                var rowCount = doc.content[0].table.body.length;
                                var sumtotal = 0;
                                var sumunit = 0;
                                for (i = 1; i < rowCount; i++) {
                                    doc.content[0].table.body[i][0].alignment = 'center';
                                    doc.content[0].table.body[i][3].alignment = 'center';
                                    doc.content[0].table.body[i][4].alignment = 'center';
                                    doc.content[0].table.body[i][5].alignment = 'right';
                                    doc.content[0].table.body[i][6].alignment = 'right';

                                    sumunit += parseFloat(accounting.unformat(doc.content[0].table.body[i][5].text));
                                    sumtotal += parseFloat(accounting.unformat(doc.content[0].table.body[i][6].text));

                                };

                            }
                        }, {
                            extend: 'csv',
                            footer: true,
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }
                    ]
                });

                tableProduct.buttons(null, null).container().appendTo(
                    tableProduct.table().container()
                );


                Customer.DataTable().destroy();
                var tableCustomer = Customer.DataTable({
                    data: Cust,
                    columns: [{
                            data: "index",
                            defaultContent: ''
                        },
                        { data: "CustCode" },
                        { data: "CustName" },
                        { data: "MasterDealer" },
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
                        $(api.column(3).footer()).html('Grand Total');
                        $(api.column(4).footer()).html(
                            accounting.formatNumber(Unit)
                        );
                        $(api.column(5).footer()).html(
                            accounting.formatNumber(Total, 2)
                        );
                    },
                    "order": [
                        [5, "desc"]
                    ],
                    'columnDefs': [{
                            "targets": 0,
                            "orderable": false,
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
                            "width": "15%"
                        },
                        {
                            "targets": 5,
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

                var buttonsCustomer = new $.fn.dataTable.Buttons(tableCustomer, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            footer: true,
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }, {
                            extend: 'pdf',
                            footer: true,
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: "RSS" + nameMonth + year,
                            title: "REM Sales Summary: " + nameMonth + " " + year,
                            exportOptions: {
                                columns: ':visible',
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
                                var logo = 'data:image/jpeg;base64,/9j/4QDmRXhpZgAASUkqAAgAAAAFABIBAwABAAAAAQAAADEBAgAcAAAASgAAADIBAgAUAAAAZgAAABMCAwABAAAAAQAAAGmHBAABAAAAegAAAAAAAABBQ0QgU3lzdGVtcyBEaWdpdGFsIEltYWdpbmcAMjAwNzowNToxNSAxMDozMjo0MAAFAACQBwAEAAAAMDIyMJCSAgAEAAAAMjE4AAKgBAABAAAASwAAAAOgBAABAAAASwAAAAWgBAABAAAAvAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAD//wAA//4AJ0ZpbGUgd3JpdHRlbiBieSBBZG9iZSBQaG90b3Nob3CoIDUuMAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t/////gAnRmlsZSB3cml0dGVuIGJ5IEFkb2JlIFBob3Rvc2hvcKggNS4wAP/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAEsASwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP028b69qHhjwpqWraZo0viG8s4jMumwSiOScDlghIOWxkgdyMDk18n/APDyTTCu4eAb8/8AcRj/APiK+za+Af22/wBnL/hDtWm+IPh2126FqEv/ABNbaJeLS4Y/64DskhPPo5/2uPBzaeLoU/bYaWi3Vk/nt95+rcA4bh/M8W8tzqjec/glzSjr/I7SS1+y++mt0ej+Jv8AgoJY+G9V+yv4FvbiCWGK6trlNQQLPBIoaOQAp3BwR2IYdQam1D9vuxsvB+i+IU8EXs1rqNzdWbIL9AYJYfLJUnbzuSVGH4+lfJmkaYfiL8HtRgiUy+IPA+6+hUDLz6RK+Z06c+RMfMHosz1d8D6cPFf7PnxF08MGufD1/Y+IoExk+Wwe3uMe2zaT/uivnFmmNk9J7ptaLpq1t5Nfifsk+BeGaNNOph3enUjCfvz1U2oxl8WifPCem2sb6M+nbT/goNZ3nhrV9YTwJeCPTpraF4zqKfN5xkAOdnGPLP51J4U/b/tfFOpXdsngW7t4bSwutRnnbUUYJHBE0h42dyFUe7CvlXwbpYuvgB8U7zGTbX2h4/7/AE4P/oVP8AacukfBH4oeJ5AyyXS2Xhu0bHBM0yzXH/kOJB/wI0o5pjW4Nz0cXJ6Lo5eXlYdbgbhiMcRGOG96NWFOPvz0c40tfi1s5t+iPo+2/wCCjsV5PDBB8OLya4mdY44Y9UVmd2OFUDyuSSQB9a0fFX/BQmz8M+Ir/SF8ES3sljJ9nmmi1VAnmqAJFU+WchX3Lu77c96+XPhNYf8ACK6B4g+Jl0gCaFix0QOOJtXmUiNhxg+QhaY+4Sk/Z5+CF/8AHPx7DpCGWHRbQLcatfjrHDn7ob/npIQQP+BN/DUwzPMZ8kIzvKW2i2+7rr6JX6m+I4K4PwrxGJr4floUF7z56nxaNr4vsrlStvKfLuj9Df2fvjRqPxz8N3Wvy+FJPDekiXybOaa8E5uyMh2UBFwqkYzzk5HavVKo6Jotj4b0ey0rTLWOy06ziWC3t4RhY0UYCj8KvV99RjOFNRqS5pdWfydmFbDYjF1KmDpezpN+7G7dl0u222+r132stAqnq+kWWv6Vd6ZqNtHe2F3E0E9vMu5JEYYZSPQg1corVpNWZwRlKElKLs0fm14q8E3n7Hn7QmkahJHJe+DbqV1immXeLiwk+S4gk7M8atnn721G7kDtfhb8LoPhj+1D4i+H8p83wt4w0C8h06fO5ZbSRRIgB7lAsiZ9ge9fWfxv+F2j/Fz4c6poesJgCNri2ukAMltOqkpIufxBHcEjvXzv8G7p/HPwT+D3iy+ONe8LeI4dHtrsctLayTC2aNvby3T8Yx6mvj54FYbEKEfhvzx9NFOP3NW9D+iMPxTVznKJYit/FcfYVH3k1KeHqLzU4yUv8Te1kvGPh/4XuNI/Zr+P2n3qbb3TL6wt5QRyHgnw39as+N/CV/pH7NHwe8H6dbNNrfjDV5dY+yjgyOyhIc+2yWLntgmvf/iB4RsrXw3+0hZQAxRajPaXEmAPleS2hZiP+BEt9TXaa34Z0/TvjD/a32dZU8C+DRJpNo33EeV50Zs+oS2CD2c+1ZLL/d9nfZcvy55Nv7kzsnxb+9+t8t+ap7a3eSw1KMI+ntKkW+yVz4/+OPh+U+KfBfwP8GR/2nJoCCKYxcC81ScB55XPYKuMk/dBYdq+7vgX8HNM+CPgGz0Cx2z3jfv9QvtuGurggbn9lHCqOygd8k+EfsEeDLPXtG174paqx1DxVq+oXEDXEoz5Kkh5Nvu7NyfRVA75+ua9TKsLHXGSWsvhXaPRfd/W58Vx5nlZOPDtKTcKDvUf/Pyq9ZyfkpN2Xdt7WsUUUV9EfjwUUUUAU9ZGdIvh/wBMH/8AQTXx9+zMc/sweFPbxxZj/wAn4a+xb+FrmxuYkxvkjZBnpkgivnz4KfAvxR4G+CWieGNVSyTVrTxNb6tKsVxvj8hLqOVsNt5bahwMdcV5GKpznXjKKuuWS+/lsff5FjMPQyuvSqzSk61FpN6tRVW79FdX9UO+I3/IP+Pg/wBnT2/8lYv8K67xYM/EDx+vr4Kg4/7a31Hi/wCGOta3bfFOO2+zbvEkdqtjvlI5jhVG38fLyDjrXQa34L1HUPF3ibUovI+zaj4ci0qAM5Decslyx3DHC4mTn68UKlPmbt1f5z/zX3jljcP7GC51dRj1/uYZfnGX3M8f/wCCeRz+z59NWuf/AEGOvpuvF/2TPhLrvwW+FJ8PeIjaHUDfzXP+hSmRNjKgHJUc/Ke1e0Vvl8JU8JThNWaSPM4txNHGZ9jMRh5KUJTk01s03ugooor0D5IxvGWn6xqvhTV7Tw9qqaJrs1rIljqMkCzpbzlTsdo24dQ2MjuM9K/NK4/4KU/EnwJ8JfHXgfxjYov7QWl60uj6f9nsAYpFkbBlEYGxmTBCDpJ5sBAILV+o1fI/xW/ZH1zxp+3Z8O/jDYWeg/8ACLaPZxjVluJGW7nuoxcCKURiMq5TfBhiwI8sf3RQB5b8TPj58e/gp42/Zm8I+JfF1nPrfi+7Q+KVTS7YIfMvLdPs6YT5fLjlKb1OWbLZ6Y7n9pn9o34gfDn9tz4J/D3QNaisvCPiUW39qWLWUMrT77qSNsSMpdPlVR8pFa/7eX7Iviz9oS68EeL/AIe61aaV418ITvLaw6g5jimBeORWVwrbXR4lIypVgSDjFeU+C/2R/wBof4p/tEeGfi38atV8NxXXhKNX03TNKmx9pki3vDH8iFY0MrbnclmI4C4xgAwf21/25/iv4R+O3iHw18IL6FNC8DaZDdeInNhBdK0rSpv3u6koi+dBEduDud/7vHrH7YH7XXi/Rf2QPCXxP+EkPl2/iZrc3esiAXB0eF42LZVgVDCVfKLsCqnPcrXmHw7/AOCW/j7V7fxnqvxA+Ld1oPiLxVcz/wBqw+FCZ7bUIZG8xhcNKqF8yPJ8mNoAXkk8dJ8Nv2PP2kvhh+zzqPgTQPiboWgarp+sPqGjvZs1xa3ltMp+0Wlws1ufLG8CRCquMySqwwQQAc1+yb8cvGfij4weGrXQf2nNB+J/h/UAv9q+G/GWmyaRqozneLNfLYSuo+YBZcHBBXHId+3b+2J8WNA+Nuq+B/gxqz2Nv4O0B9X8ST29jb3RQ/I7sxlRsLFG8OQuDmUg528QwfsF/FT4ufFjwh4p8eaF8N/hlaeHZorq5bwJG8N1q8sbrIrNtGxGLIAH6oHYhW4A0/Av/BMz4ga34m8e+KfH3xbn8OeIvFdxcG9TwPIxiura4YvLDOZUQlCx2hMFdqDPoAD7F/Zi+NNt+0F8DPCfjeLYl3f2oS/gjIxBeRnZOmOwEitj/ZKnvXqVfJn7CH7LnxB/ZQj8Y+G/EPiHQ9d8IajdC+0tNPkmFxBKP3bM6PGFAeNYiQrHDIcZzmvrOgDm/iUzr8OfFTRyNFINKuysiEhlPktggjuK+HvCWgHwB8M/hF45b4ft8PtPhbQ7rV/Htl4ga5lFu/kh/OtVIMqXJcRPu3CMTGQglK+/b+xg1SxubO6jE1tcRtDLGSQGRgQw49QTXkOg/s3+AEl02ym0zUNQ03QJYX03TdS1y/u7O2MJAhxbyztGdm1duVO0qCMECgDxX49/EaTU/it4k8R6RH4jvNR+FwtV0S10fTL65tb+8JE+qQySQRNFl7VorYCQ/I7O3HWtDUfgf8IvF37Q/wANrjTvCOjX/hzxP4V1jW2CxEw3khm054bhlzgttnkwSOkjetfU/hTwppPg7TZbTR7NbKC4uri/mAZmMlxPK0s0jMxJJZ3Y8njOBgAAZHhv4ReEPCE2gy6PocFjJoNrc2OmFHc/ZLe4kSSaJMsflZo4zjsFAXA4oEeBeCf2dPhjZftWeNLKHwNoqWul+H9C1LT4RbApa3LXOobpo1PCufKiyR/zzX0rivgv8IIPF3hzVdSvPgd4P8Zm48T66r6/rOrKl1dAatdLl42tnI2gbAN5yEHTOB9l23hPSLTxTf8AiSGxjj1y+tILG5vQTvlghaR4kPOMK00pHGfnNefyfsufDdp72WPRr60N5czXc0dlrl/bxtNK7SSuI451VSzszHAHJNAHhep+B9K8R/tK/GJbz4N2nxPFsNGSGW5lslFmv2EfulFw4IBxn5ePXms74Z6Bf6D8D7j4qeHDLpfiPwNq+tyHwrdXLMtppUU7fa/D8spzu2eSZIpOVjl2bP3WQ3174e8CaF4V1TU9S0vT1tb/AFNLeO8ud7vJcCCPy4d5YkkqnGep75NVrb4b+GbDS/EmmW+j28Wn+JLie61e3XOy7lnQJMzDPV1ABxjPJ6kmgDjP2evDd3daFcfEXxBIlz4s8bxwalcFHLx2FmU3WlhEePkijf5iAN8ryv8AxAD1uqej6RZ+H9IsdL063S00+xgS2treP7sUSKFRR7AAD8KuUDP/2Q==';
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
                                                [{ colSpan: 3, text: "REM Sales Summary by Customer: " + nameMonth + " " + year, alignment: 'center', bold: true, fontSize: 11 }],
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
                                    doc.content[0].table.body[i][3].alignment = 'center';
                                    doc.content[0].table.body[i][4].alignment = 'right';
                                    doc.content[0].table.body[i][5].alignment = 'right';
                                };

                            }
                        }, {
                            extend: 'csv',
                            footer: true,
                            title: "REM Sales Summary: " + nameMonth + " " + year
                        }
                    ]
                });

                tableCustomer.buttons(null, null).container().appendTo(
                    tableCustomer.table().container()
                );

                if (type == "M") {
                    $("#headModal").text("REM Sales Summary: " + nameMonth + " " + year);
                } else {
                    $("#headModal").text("REM Sales Summary: " + nameMonth + " of year " + year);
                }
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
        currUnitQ1 = 0,
        currBahtQ1 = 0,
        currUnitQ2 = 0,
        currBahtQ2 = 0,
        currUnitQ3 = 0,
        currBahtQ3 = 0,
        currUnitQ4 = 0,
        currBahtQ4 = 0,
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
        oldUnitQ1 = 0,
        oldBahtQ1 = 0,
        oldUnitQ2 = 0,
        oldBahtQ2 = 0,
        oldUnitQ3 = 0,
        oldBahtQ3 = 0,
        oldUnitQ4 = 0,
        oldBahtQ4 = 0,
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
        achieveBahtQ1 = 0,
        achieveUnitQ1 = 0,
        achieveBahtQ2 = 0,
        achieveUnitQ2 = 0,
        achieveBahtQ3 = 0,
        achieveUnitQ3 = 0,
        achieveBahtQ4 = 0,
        achieveUnitQ4 = 0,
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
        growthUnitDecember = 0,
        growthBahtQ1 = 0,
        growthUnitQ1 = 0,
        growthBahtQ2 = 0,
        growthUnitQ2 = 0,
        growthBahtQ3 = 0,
        growthUnitQ3 = 0,
        growthBahtQ4 = 0,
        growthUnitQ4 = 0;

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

    $.each(currYear, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currUnitQ1 += parseFloat(this.Quantity);
            currBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currUnitQ2 += parseFloat(this.Quantity);
            currBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currUnitQ3 += parseFloat(this.Quantity);
            currBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currUnitQ4 += parseFloat(this.Quantity);
            currBahtQ4 += parseFloat(this.Total);
        }

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

    $.each(oldYear, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldUnitQ1 += parseFloat(this.Quantity);
            oldBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldUnitQ2 += parseFloat(this.Quantity);
            oldBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldUnitQ3 += parseFloat(this.Quantity);
            oldBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldUnitQ4 += parseFloat(this.Quantity);
            oldBahtQ4 += parseFloat(this.Total);
        }

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
    growthBahtQ1 = ((currBahtQ1 - oldBahtQ1) * 100) / oldBahtQ1;
    growthBahtQ2 = ((currBahtQ2 - oldBahtQ2) * 100) / oldBahtQ2;
    growthBahtQ3 = ((currBahtQ3 - oldBahtQ3) * 100) / oldBahtQ3;
    growthBahtQ4 = ((currBahtQ4 - oldBahtQ4) * 100) / oldBahtQ4;

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
    growthUnitQ1 = ((currUnitQ1 - oldUnitQ1) * 100) / oldUnitQ1;
    growthUnitQ2 = ((currUnitQ2 - oldUnitQ2) * 100) / oldUnitQ2;
    growthUnitQ3 = ((currUnitQ3 - oldUnitQ3) * 100) / oldUnitQ3;
    growthUnitQ4 = ((currUnitQ4 - oldUnitQ4) * 100) / oldUnitQ4;

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
    achieveBahtQ1 = (currBahtQ1 * 100) / accounting.unformat(target.AmtQ1);
    achieveBahtQ2 = (currBahtQ2 * 100) / accounting.unformat(target.AmtQ2);
    achieveBahtQ3 = (currBahtQ3 * 100) / accounting.unformat(target.AmtQ3);
    achieveBahtQ4 = (currBahtQ4 * 100) / accounting.unformat(target.AmtQ4);

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
    achieveUnitQ1 = (currUnitQ1 * 100) / accounting.unformat(target.UnitQ1);
    achieveUnitQ2 = (currUnitQ2 * 100) / accounting.unformat(target.UnitQ2);
    achieveUnitQ3 = (currUnitQ3 * 100) / accounting.unformat(target.UnitQ3);
    achieveUnitQ4 = (currUnitQ4 * 100) / accounting.unformat(target.UnitQ4);

    $('#BahtActualNowQ1').html(accounting.formatNumber(currBahtQ1, 2));
    $('#BahtActualNowQ2').html(accounting.formatNumber(currBahtQ2, 2));
    $('#BahtActualNowQ3').html(accounting.formatNumber(currBahtQ3, 2));
    $('#BahtActualNowQ4').html(accounting.formatNumber(currBahtQ4, 2));
    $('#BahtActualNow1').html(accounting.formatNumber(currBahtJanuary / 1000, 2));
    $('#BahtActualNow2').html(accounting.formatNumber(currBahtFebruary / 1000, 2));
    $('#BahtActualNow3').html(accounting.formatNumber(currBahtMarch / 1000, 2));
    $('#BahtActualNow4').html(accounting.formatNumber(currBahtApril / 1000, 2));
    $('#BahtActualNow5').html(accounting.formatNumber(currBahtMay / 1000, 2));
    $('#BahtActualNow6').html(accounting.formatNumber(currBahtJune / 1000, 2));
    $('#BahtActualNow7').html(accounting.formatNumber(currBahtJuly / 1000, 2));
    $('#BahtActualNow8').html(accounting.formatNumber(currBahtAugust / 1000, 2));
    $('#BahtActualNow9').html(accounting.formatNumber(currBahtSeptember / 1000, 2));
    $('#BahtActualNow10').html(accounting.formatNumber(currBahtOctober / 1000, 2));
    $('#BahtActualNow11').html(accounting.formatNumber(currBahtNovember / 1000, 2));
    $('#BahtActualNow12').html(accounting.formatNumber(currBahtDecember / 1000, 2));
    $('#BahtActualNowTotal').html(accounting.formatNumber(currTotalBaht / 1000, 2));
    $('#BahtActualNowQTotal').html(accounting.formatNumber(currTotalBaht, 2));

    $('#BahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(target.AmtQ1), 2));
    $('#BahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(target.AmtQ2), 2));
    $('#BahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(target.AmtQ3), 2));
    $('#BahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(target.AmtQ4), 2));
    $('#BahtTargetNow1').html(accounting.formatNumber(accounting.unformat(target.Amt01) / 1000, 2));
    $('#BahtTargetNow2').html(accounting.formatNumber(accounting.unformat(target.Amt02) / 1000, 2));
    $('#BahtTargetNow3').html(accounting.formatNumber(accounting.unformat(target.Amt03) / 1000, 2));
    $('#BahtTargetNow4').html(accounting.formatNumber(accounting.unformat(target.Amt04) / 1000, 2));
    $('#BahtTargetNow5').html(accounting.formatNumber(accounting.unformat(target.Amt05) / 1000, 2));
    $('#BahtTargetNow6').html(accounting.formatNumber(accounting.unformat(target.Amt06) / 1000, 2));
    $('#BahtTargetNow7').html(accounting.formatNumber(accounting.unformat(target.Amt07) / 1000, 2));
    $('#BahtTargetNow8').html(accounting.formatNumber(accounting.unformat(target.Amt08) / 1000, 2));
    $('#BahtTargetNow9').html(accounting.formatNumber(accounting.unformat(target.Amt09) / 1000, 2));
    $('#BahtTargetNow10').html(accounting.formatNumber(accounting.unformat(target.Amt10) / 1000, 2));
    $('#BahtTargetNow11').html(accounting.formatNumber(accounting.unformat(target.Amt11) / 1000, 2));
    $('#BahtTargetNow12').html(accounting.formatNumber(accounting.unformat(target.Amt12) / 1000, 2));
    $('#BahtTargetNowTotal').html(accounting.formatNumber(totalBahtTarget / 1000, 2));
    $('#BahtTargetNowQTotal').html(accounting.formatNumber(totalBahtTarget, 2));

    $('#BahtActualOldQ1').html(accounting.formatNumber(oldBahtQ1, 2));
    $('#BahtActualOldQ2').html(accounting.formatNumber(oldBahtQ2, 2));
    $('#BahtActualOldQ3').html(accounting.formatNumber(oldBahtQ3, 2));
    $('#BahtActualOldQ4').html(accounting.formatNumber(oldBahtQ4, 2));
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
    $('#BahtActualOldQTotal').html(accounting.formatNumber(oldTotalBaht, 2));


    $('#BahtGrowthQ1').html((isNaN(accounting.formatNumber(growthBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ1, 2)) + "%");
    $('#BahtGrowthQ2').html((isNaN(accounting.formatNumber(growthBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ2, 2)) + "%");
    $('#BahtGrowthQ3').html((isNaN(accounting.formatNumber(growthBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ3, 2)) + "%");
    $('#BahtGrowthQ4').html((isNaN(accounting.formatNumber(growthBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtQ4, 2)) + "%");
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
    $('#BahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthBahtTotal, 2)) + "%");

    $('#BahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ1, 2)) + "%");
    $('#BahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ2, 2)) + "%");
    $('#BahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ3, 2)) + "%");
    $('#BahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtQ4, 2)) + "%");
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
    $('#BahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveBahtTotal, 2)) + "%");

    $('#UnitActualNowQ1').html(accounting.formatNumber(currUnitQ1));
    $('#UnitActualNowQ2').html(accounting.formatNumber(currUnitQ2));
    $('#UnitActualNowQ3').html(accounting.formatNumber(currUnitQ3));
    $('#UnitActualNowQ4').html(accounting.formatNumber(currUnitQ4));
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
    $('#UnitActualNowQTotal').html(accounting.formatNumber(currTotalUnit));

    $('#UnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(target.UnitQ1)));
    $('#UnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(target.UnitQ2)));
    $('#UnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(target.UnitQ3)));
    $('#UnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(target.UnitQ4)));
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
    $('#UnitTargetNowQTotal').html(accounting.formatNumber(totalUnitTarget));

    $('#UnitActualOldQ1').html(accounting.formatNumber(oldUnitQ1));
    $('#UnitActualOldQ2').html(accounting.formatNumber(oldUnitQ2));
    $('#UnitActualOldQ3').html(accounting.formatNumber(oldUnitQ3));
    $('#UnitActualOldQ4').html(accounting.formatNumber(oldUnitQ4));
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
    $('#UnitActualOldQTotal').html(accounting.formatNumber(oldTotalUnit));

    $('#UnitGrowthQ1').html((isNaN(accounting.formatNumber(growthUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ1, 2)) + "%");
    $('#UnitGrowthQ2').html((isNaN(accounting.formatNumber(growthUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ2, 2)) + "%");
    $('#UnitGrowthQ3').html((isNaN(accounting.formatNumber(growthUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ3, 2)) + "%");
    $('#UnitGrowthQ4').html((isNaN(accounting.formatNumber(growthUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitQ4, 2)) + "%");
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
    $('#UnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthUnitTotal, 2)) + "%");

    $('#UnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ1, 2)) + "%");
    $('#UnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ2, 2)) + "%");
    $('#UnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ3, 2)) + "%");
    $('#UnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitQ4, 2)) + "%");
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
    $('#UnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveUnitTotal, 2)) + "%");

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
    unitGraphQ(year, accounting.unformat(target.UnitQ1), accounting.unformat(target.UnitQ2), accounting.unformat(target.UnitQ3), accounting.unformat(target.UnitQ4),
        accounting.unformat(totalUnitTarget), currUnitQ1, currUnitQ2, currUnitQ3, currUnitQ4, currTotalUnit, oldUnitQ1, oldUnitQ2, oldUnitQ3, oldUnitQ4, oldTotalUnit);
    bahtGraphQ(year, accounting.unformat(target.AmtQ1), accounting.unformat(target.AmtQ2), accounting.unformat(target.AmtQ3), accounting.unformat(target.AmtQ4), accounting.unformat(totalBahtTarget),
        currBahtQ1, currBahtQ2, currBahtQ3, currBahtQ4, currTotalBaht, oldBahtQ1, oldBahtQ2, oldBahtQ3, oldBahtQ4, oldTotalBaht);

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
                        var type = "M";
                        selectDataTable(nameMonth, month, year, type);
                    }
                }
            }
        },
        title: {
            text: 'REM Sales Summary Report : ' + year + ' (Unit)'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        yAxis: {
            min: 0
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
                //,
                // dataLabels: {
                //     enabled: true,
                //     rotation: -90,
                //     color: '#FFFFFF',
                //     align: 'right',
                //     format: '{point.value}', // one decimal
                //     style: {
                //         fontSize: '11px',
                //         fontFamily: 'sans-serif'
                //     }
                // }
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
                //,
                // dataLabels: {
                //     enabled: true,
                //     rotation: -90,
                //     color: '#FFFFFF',
                //     align: 'right',
                //     format: '{point.value}', // one decimal
                //     style: {
                //         fontSize: '11px',
                //         fontFamily: 'sans-serif'
                //     }
                // }
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
            text: 'REM Sales Summary Report : ' + year + ' (Baht)'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        yAxis: {
            min: 0
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

function unitGraphQ(year, targetQ1, targetQ2, targetQ3, targetQ4, targetTotal, currQ1, currQ2, currQ3, currQ4, currTotal, oldQ1, oldQ2, oldQ3, oldQ4, oldTotal) {

    Highcharts.setOptions({
        colors: ['#BFD641', '#ECDB54', '#69acde']
    });

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
            text: 'REM Sales Summary Report : Quaterly of ' + year + ' (Unit)'
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
            data: [{
                y: oldQ1,
                month: 1,
                value: accounting.formatNumber(oldQ1)
            }, {
                y: oldQ2,
                month: 2,
                value: accounting.formatNumber(oldQ2)
            }, {
                y: oldQ3,
                month: 3,
                value: accounting.formatNumber(oldQ3)
            }, {
                y: oldQ4,
                month: 4,
                value: accounting.formatNumber(oldQ4)
            }]
        }, {
            type: 'column',
            name: year,
            data: [{
                y: currQ1,
                month: 1,
                value: accounting.formatNumber(currQ1)
            }, {
                y: currQ2,
                month: 2,
                value: accounting.formatNumber(currQ2)
            }, {
                y: currQ3,
                month: 3,
                value: accounting.formatNumber(currQ3)
            }, {
                y: currQ4,
                month: 4,
                value: accounting.formatNumber(currQ4)
            }]
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetQ1,
                month: 1,
                value: accounting.formatNumber(targetQ1)
            }, {
                y: targetQ2,
                month: 2,
                value: accounting.formatNumber(targetQ2)
            }, {
                y: targetQ3,
                month: 3,
                value: accounting.formatNumber(targetQ3)
            }, {
                y: targetQ4,
                month: 4,
                value: accounting.formatNumber(targetQ4)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot'
        }]
    });
}

function bahtGraphQ(year, targetQ1, targetQ2, targetQ3, targetQ4, targetTotal, currQ1, currQ2, currQ3, currQ4, currTotal, oldQ1, oldQ2, oldQ3, oldQ4, oldTotal) {

    Highcharts.setOptions({
        colors: ['#DD4B39', '#222D32', '#69acde']
    });

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
            text: 'REM Sales Summary Report : Quaterly of ' + year + ' (Baht)'
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
            data: [{
                y: oldQ1,
                month: 1,
                value: accounting.formatMoney(oldQ1, "฿")
            }, {
                y: oldQ2,
                month: 2,
                value: accounting.formatMoney(oldQ2, "฿")
            }, {
                y: oldQ3,
                month: 3,
                value: accounting.formatMoney(oldQ3, "฿")
            }, {
                y: oldQ4,
                month: 4,
                value: accounting.formatMoney(oldQ4, "฿")
            }]
        }, {
            type: 'column',
            name: year,
            data: [{
                y: currQ1,
                month: 1,
                value: accounting.formatMoney(currQ1, "฿")
            }, {
                y: currQ2,
                month: 2,
                value: accounting.formatMoney(currQ2, "฿")
            }, {
                y: currQ3,
                month: 3,
                value: accounting.formatMoney(currQ3, "฿")
            }, {
                y: currQ4,
                month: 4,
                value: accounting.formatMoney(currQ4, "฿")
            }]
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetQ1,
                month: 1,
                value: accounting.formatMoney(targetQ1, "฿")
            }, {
                y: targetQ2,
                month: 2,
                value: accounting.formatMoney(targetQ2, "฿")
            }, {
                y: targetQ3,
                month: 3,
                value: accounting.formatMoney(targetQ3, "฿")
            }, {
                y: targetQ4,
                month: 4,
                value: accounting.formatMoney(targetQ4, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot'
        }]
    });

}