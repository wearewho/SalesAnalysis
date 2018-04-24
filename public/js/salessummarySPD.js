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
    $('#npBahtActualNow').text("Actual " + year);
    $('#npBahtTargetNow').text("Target " + year);
    $('#npUnitActualNow').text("Actual " + year);
    $('#npUnitTargetNow').text("Target " + year);
    $('#npBahtActualOld').text("Actual " + (year - 1));
    $('#npUnitActualOld').text("Actual " + (year - 1));
    $('#ebBahtActualNow').text("Actual " + year);
    $('#ebBahtTargetNow').text("Target " + year);
    $('#ebUnitActualNow').text("Actual " + year);
    $('#ebUnitTargetNow').text("Target " + year);
    $('#ebBahtActualOld').text("Actual " + (year - 1));
    $('#ebUnitActualOld').text("Actual " + (year - 1));
    $('#indBahtActualNow').text("Actual " + year);
    $('#indBahtTargetNow').text("Target " + year);
    $('#indUnitActualNow').text("Actual " + year);
    $('#indUnitTargetNow').text("Target " + year);
    $('#indBahtActualOld').text("Actual " + (year - 1));
    $('#indUnitActualOld').text("Actual " + (year - 1));
    $('#othBahtActualNow').text("Actual " + year);
    $('#othBahtTargetNow').text("Target " + year);
    $('#othUnitActualNow').text("Actual " + year);
    $('#othUnitTargetNow').text("Target " + year);
    $('#othBahtActualOld').text("Actual " + (year - 1));
    $('#othUnitActualOld').text("Actual " + (year - 1));
    $('#allBahtActualQNow').text("Actual " + year);
    $('#allBahtTargetQNow').text("Target " + year);
    $('#allUnitActualQNow').text("Actual " + year);
    $('#allUnitTargetQNow').text("Target " + year);
    $('#allBahtActualQOld').text("Actual " + (year - 1));
    $('#allUnitActualQOld').text("Actual " + (year - 1));
    $('#npBahtActualQNow').text("Actual " + year);
    $('#npBahtTargetQNow').text("Target " + year);
    $('#npUnitActualQNow').text("Actual " + year);
    $('#npUnitTargetQNow').text("Target " + year);
    $('#npBahtActualQOld').text("Actual " + (year - 1));
    $('#npUnitActualQOld').text("Actual " + (year - 1));
    $('#ebBahtActualQNow').text("Actual " + year);
    $('#ebBahtTargetQNow').text("Target " + year);
    $('#ebUnitActualQNow').text("Actual " + year);
    $('#ebUnitTargetQNow').text("Target " + year);
    $('#ebBahtActualQOld').text("Actual " + (year - 1));
    $('#ebUnitActualQOld').text("Actual " + (year - 1));
    $('#indBahtActualQNow').text("Actual " + year);
    $('#indBahtTargetQNow').text("Target " + year);
    $('#indUnitActualQNow').text("Actual " + year);
    $('#indUnitTargetQNow').text("Target " + year);
    $('#indBahtActualQOld').text("Actual " + (year - 1));
    $('#indUnitActualQOld').text("Actual " + (year - 1));
    $('#othBahtActualQNow').text("Actual " + year);
    $('#othBahtTargetQNow').text("Target " + year);
    $('#othUnitActualQNow').text("Actual " + year);
    $('#othUnitTargetQNow').text("Target " + year);
    $('#othBahtActualQOld').text("Actual " + (year - 1));
    $('#othUnitActualQOld').text("Actual " + (year - 1));

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
        $('#npBahtActualNow').text("Actual " + currYear);
        $('#npBahtTargetNow').text("Target " + currYear);
        $('#npUnitActualNow').text("Actual " + currYear);
        $('#npUnitTargetNow').text("Target " + currYear);
        $('#npBahtActualOld').text("Actual " + (currYear - 1));
        $('#npUnitActualOld').text("Actual " + (currYear - 1));
        $('#ebBahtActualNow').text("Actual " + currYear);
        $('#ebBahtTargetNow').text("Target " + currYear);
        $('#ebUnitActualNow').text("Actual " + currYear);
        $('#ebUnitTargetNow').text("Target " + currYear);
        $('#ebBahtActualOld').text("Actual " + (currYear - 1));
        $('#ebUnitActualOld').text("Actual " + (currYear - 1));
        $('#indBahtActualNow').text("Actual " + currYear);
        $('#indBahtTargetNow').text("Target " + currYear);
        $('#indUnitActualNow').text("Actual " + currYear);
        $('#indUnitTargetNow').text("Target " + currYear);
        $('#indBahtActualOld').text("Actual " + (currYear - 1));
        $('#indUnitActualOld').text("Actual " + (currYear - 1));
        $('#othBahtActualNow').text("Actual " + currYear);
        $('#othBahtTargetNow').text("Target " + currYear);
        $('#othUnitActualNow').text("Actual " + currYear);
        $('#othUnitTargetNow').text("Target " + currYear);
        $('#othBahtActualOld').text("Actual " + (currYear - 1));
        $('#othUnitActualOld').text("Actual " + (currYear - 1));
        $('#allBahtActualQNow').text("Actual " + currYear);
        $('#allBahtTargetQNow').text("Target " + currYear);
        $('#allUnitActualQNow').text("Actual " + currYear);
        $('#allUnitTargetQNow').text("Target " + currYear);
        $('#allBahtActualQOld').text("Actual " + (currYear - 1));
        $('#allUnitActualQOld').text("Actual " + (currYear - 1));
        $('#npBahtActualQNow').text("Actual " + currYear);
        $('#npBahtTargetQNow').text("Target " + currYear);
        $('#npUnitActualQNow').text("Actual " + currYear);
        $('#npUnitTargetQNow').text("Target " + currYear);
        $('#npBahtActualQOld').text("Actual " + (currYear - 1));
        $('#npUnitActualQOld').text("Actual " + (currYear - 1));
        $('#ebBahtActualQNow').text("Actual " + currYear);
        $('#ebBahtTargetQNow').text("Target " + currYear);
        $('#ebUnitActualQNow').text("Actual " + currYear);
        $('#ebUnitTargetQNow').text("Target " + currYear);
        $('#ebBahtActualQOld').text("Actual " + (currYear - 1));
        $('#ebUnitActualQOld').text("Actual " + (currYear - 1));
        $('#indBahtActualQNow').text("Actual " + currYear);
        $('#indBahtTargetQNow').text("Target " + currYear);
        $('#indUnitActualQNow').text("Actual " + currYear);
        $('#indUnitTargetQNow').text("Target " + currYear);
        $('#indBahtActualQOld').text("Actual " + (currYear - 1));
        $('#indUnitActualQOld').text("Actual " + (currYear - 1));
        $('#othBahtActualQNow').text("Actual " + currYear);
        $('#othBahtTargetQNow').text("Target " + currYear);
        $('#othUnitActualQNow').text("Actual " + currYear);
        $('#othUnitTargetQNow').text("Target " + currYear);
        $('#othBahtActualQOld').text("Actual " + (currYear - 1));
        $('#othUnitActualQOld').text("Actual " + (currYear - 1));
        selectData(currYear);
    });

    //Hide Table
    $('#NPBAHTTable').hide();
    $('#NPUNITTable').hide();
    $('#NPQBAHTTable').hide();
    $('#NPQUNITTable').hide();
    $('#EBBAHTTable').hide();
    $('#EBUNITTable').hide();
    $('#EBQBAHTTable').hide();
    $('#EBQUNITTable').hide();
    $('#INDBAHTTable').hide();
    $('#INDUNITTable').hide();
    $('#INDQBAHTTable').hide();
    $('#INDQUNITTable').hide();
    $('#OTHBAHTTable').hide();
    $('#OTHUNITTable').hide();
    $('#OTHQBAHTTable').hide();
    $('#OTHQUNITTable').hide();

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
        if (itemGroup == "NP") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#NPBAHTTable').show();
            $('#NPUNITTable').show();
            $('#EBBAHTTable').hide();
            $('#EBUNITTable').hide();
            $('#INDBAHTTable').hide();
            $('#INDUNITTable').hide();
            $('#OTHBAHTTable').hide();
            $('#OTHUNITTable').hide();
        } else if (itemGroup == "EB") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#NPBAHTTable').hide();
            $('#NPUNITTable').hide();
            $('#EBBAHTTable').show();
            $('#EBUNITTable').show();
            $('#INDBAHTTable').hide();
            $('#INDUNITTable').hide();
            $('#OTHBAHTTable').hide();
            $('#OTHUNITTable').hide();
        } else if (itemGroup == "IND") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#NPBAHTTable').hide();
            $('#NPUNITTable').hide();
            $('#EBBAHTTable').hide();
            $('#EBUNITTable').hide();
            $('#INDBAHTTable').show();
            $('#INDUNITTable').show();
            $('#OTHBAHTTable').hide();
            $('#OTHUNITTable').hide();
        } else if (itemGroup == "OTH") {
            $('#allBAHTTable').hide();
            $('#allUNITTable').hide();
            $('#NPBAHTTable').hide();
            $('#NPUNITTable').hide();
            $('#EBBAHTTable').hide();
            $('#EBUNITTable').hide();
            $('#INDBAHTTable').hide();
            $('#INDUNITTable').hide();
            $('#OTHBAHTTable').show();
            $('#OTHUNITTable').show();
        } else {
            $('#allBAHTTable').show();
            $('#allUNITTable').show();
            $('#NPBAHTTable').hide();
            $('#NPUNITTable').hide();
            $('#EBBAHTTable').hide();
            $('#EBUNITTable').hide();
            $('#INDBAHTTable').hide();
            $('#INDUNITTable').hide();
            $('#OTHBAHTTable').hide();
            $('#OTHUNITTable').hide();
        }

    });

    $(document).on("click", "#itemGroupQ", function() {

        var itemGroup = $(this).val();
        if (itemGroup == "NP") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#NPQBAHTTable').show();
            $('#NPQUNITTable').show();
            $('#EBQBAHTTable').hide();
            $('#EBQUNITTable').hide();
            $('#INDQBAHTTable').hide();
            $('#INDQUNITTable').hide();
            $('#OTHQBAHTTable').hide();
            $('#OTHQUNITTable').hide();
        } else if (itemGroup == "EB") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#NPQBAHTTable').hide();
            $('#NPQUNITTable').hide();
            $('#EBQBAHTTable').show();
            $('#EBQUNITTable').show();
            $('#INDQBAHTTable').hide();
            $('#INDQUNITTable').hide();
            $('#OTHQBAHTTable').hide();
            $('#OTHQUNITTable').hide();
        } else if (itemGroup == "IND") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#NPQBAHTTable').hide();
            $('#NPQUNITTable').hide();
            $('#EBQBAHTTable').hide();
            $('#EBQUNITTable').hide();
            $('#INDQBAHTTable').show();
            $('#INDQUNITTable').show();
            $('#OTHQBAHTTable').hide();
            $('#OTHQUNITTable').hide();
        } else if (itemGroup == "OTH") {
            $('#allQBAHTTable').hide();
            $('#allQUNITTable').hide();
            $('#NPQBAHTTable').hide();
            $('#NPQUNITTable').hide();
            $('#EBQBAHTTable').hide();
            $('#EBQUNITTable').hide();
            $('#INDQBAHTTable').hide();
            $('#INDQUNITTable').hide();
            $('#OTHQBAHTTable').show();
            $('#OTHQUNITTable').show();
        } else {
            $('#allQBAHTTable').show();
            $('#allQUNITTable').show();
            $('#NPQBAHTTable').hide();
            $('#NPQUNITTable').hide();
            $('#EBQBAHTTable').hide();
            $('#EBQUNITTable').hide();
            $('#INDQBAHTTable').hide();
            $('#INDQUNITTable').hide();
            $('#OTHQBAHTTable').hide();
            $('#OTHQUNITTable').hide();
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
        url: '/spd/selectSPD',
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
                    showConfirmButton: false
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
            $(".loadGraphQ").css("opacity", 1);
            $(".loadTableQ").css("opacity", 1);
            $(".loading-img").hide();
            $(".loading-img2").hide();
        }
    });
}

function selectDataTable(nameMonth, month, year, type) {
    $.ajax({
        url: '/spd/selectDataTableSPD',
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
                        { data: "ItemShortName" },
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
    var targetYear = data[2];

    var groupedItem = _.groupBy(targetYear, function(targetYear) {
        return targetYear.ItemGroup;
    });

    var targetNP = groupedItem.NP[0];
    var targetEB = groupedItem.EB[0];
    var targetIND = groupedItem.IND[0];
    var targetOTH = groupedItem.Retifier[0];

    var currEBTotalBaht = 0,
        currEBTotalUnit = 0,
        oldEBTotalBaht = 0,
        oldEBTotalUnit = 0,
        currEBUnitJanuary = 0,
        currEBUnitFebruary = 0,
        currEBUnitMarch = 0,
        currEBUnitApril = 0,
        currEBUnitMay = 0,
        currEBUnitJune = 0,
        currEBUnitJuly = 0,
        currEBUnitAugust = 0,
        currEBUnitSeptember = 0,
        currEBUnitOctober = 0,
        currEBUnitNovember = 0,
        currEBUnitDecember = 0,
        currEBBahtJanuary = 0,
        currEBBahtFebruary = 0,
        currEBBahtMarch = 0,
        currEBBahtApril = 0,
        currEBBahtMay = 0,
        currEBBahtJune = 0,
        currEBBahtJuly = 0,
        currEBBahtAugust = 0,
        currEBBahtSeptember = 0,
        currEBBahtOctober = 0,
        currEBBahtNovember = 0,
        currEBBahtDecember = 0,
        currEBUnitQ1 = 0,
        currEBBahtQ1 = 0,
        currEBUnitQ2 = 0,
        currEBBahtQ2 = 0,
        currEBUnitQ3 = 0,
        currEBBahtQ3 = 0,
        currEBUnitQ4 = 0,
        currEBBahtQ4 = 0,
        oldEBUnitJanuary = 0,
        oldEBUnitFebruary = 0,
        oldEBUnitMarch = 0,
        oldEBUnitApril = 0,
        oldEBUnitMay = 0,
        oldEBUnitJune = 0,
        oldEBUnitJuly = 0,
        oldEBUnitAugust = 0,
        oldEBUnitSeptember = 0,
        oldEBUnitOctober = 0,
        oldEBUnitNovember = 0,
        oldEBUnitDecember = 0,
        oldEBBahtJanuary = 0,
        oldEBBahtFebruary = 0,
        oldEBBahtMarch = 0,
        oldEBBahtApril = 0,
        oldEBBahtMay = 0,
        oldEBBahtJune = 0,
        oldEBBahtJuly = 0,
        oldEBBahtAugust = 0,
        oldEBBahtSeptember = 0,
        oldEBBahtOctober = 0,
        oldEBBahtNovember = 0,
        oldEBBahtDecember = 0,
        oldEBUnitQ1 = 0,
        oldEBBahtQ1 = 0,
        oldEBUnitQ2 = 0,
        oldEBBahtQ2 = 0,
        oldEBUnitQ3 = 0,
        oldEBBahtQ3 = 0,
        oldEBUnitQ4 = 0,
        oldEBBahtQ4 = 0,
        achieveEBBahtJanuary = 0,
        achieveEBBahtFebruary = 0,
        achieveEBBahtMarch = 0,
        achieveEBBahtApril = 0,
        achieveEBBahtMay = 0,
        achieveEBBahtJune = 0,
        achieveEBBahtJuly = 0,
        achieveEBBahtAugust = 0,
        achieveEBBahtSeptember = 0,
        achieveEBBahtOctober = 0,
        achieveEBBahtNovember = 0,
        achieveEBBahtDecember = 0,
        achieveEBBahtQ1 = 0,
        achieveEBUnitQ1 = 0,
        achieveEBBahtQ2 = 0,
        achieveEBUnitQ2 = 0,
        achieveEBBahtQ3 = 0,
        achieveEBUnitQ3 = 0,
        achieveEBBahtQ4 = 0,
        achieveEBUnitQ4 = 0,
        growthEBBahtJanuary = 0,
        growthEBBahtFebruary = 0,
        growthEBBahtMarch = 0,
        growthEBBahtApril = 0,
        growthEBBahtMay = 0,
        growthEBBahtJune = 0,
        growthEBBahtJuly = 0,
        growthEBBahtAugust = 0,
        growthEBBahtSeptember = 0,
        growthEBBahtOctober = 0,
        growthEBBahtNovember = 0,
        growthEBBahtDecember = 0,
        achieveEBUnitJanuary = 0,
        achieveEBUnitFebruary = 0,
        achieveEBUnitMarch = 0,
        achieveEBUnitApril = 0,
        achieveEBUnitMay = 0,
        achieveEBUnitJune = 0,
        achieveEBUnitJuly = 0,
        achieveEBUnitAugust = 0,
        achieveEBUnitSeptember = 0,
        achieveEBUnitOctober = 0,
        achieveEBUnitNovember = 0,
        achieveEBUnitDecember = 0,
        growthEBUnitJanuary = 0,
        growthEBUnitFebruary = 0,
        growthEBUnitMarch = 0,
        growthEBUnitApril = 0,
        growthEBUnitMay = 0,
        growthEBUnitJune = 0,
        growthEBUnitJuly = 0,
        growthEBUnitAugust = 0,
        growthEBUnitSeptember = 0,
        growthEBUnitOctober = 0,
        growthEBUnitNovember = 0,
        growthEBUnitDecember = 0,
        growthEBBahtQ1 = 0,
        growthEBUnitQ1 = 0,
        growthEBBahtQ2 = 0,
        growthEBUnitQ2 = 0,
        growthEBBahtQ3 = 0,
        growthEBUnitQ3 = 0,
        growthEBBahtQ4 = 0,
        growthEBUnitQ4 = 0,
        currNPTotalBaht = 0,
        currNPTotalUnit = 0,
        oldNPTotalBaht = 0,
        oldNPTotalUnit = 0,
        currNPUnitJanuary = 0,
        currNPUnitFebruary = 0,
        currNPUnitMarch = 0,
        currNPUnitApril = 0,
        currNPUnitMay = 0,
        currNPUnitJune = 0,
        currNPUnitJuly = 0,
        currNPUnitAugust = 0,
        currNPUnitSeptember = 0,
        currNPUnitOctober = 0,
        currNPUnitNovember = 0,
        currNPUnitDecember = 0,
        currNPBahtJanuary = 0,
        currNPBahtFebruary = 0,
        currNPBahtMarch = 0,
        currNPBahtApril = 0,
        currNPBahtMay = 0,
        currNPBahtJune = 0,
        currNPBahtJuly = 0,
        currNPBahtAugust = 0,
        currNPBahtSeptember = 0,
        currNPBahtOctober = 0,
        currNPBahtNovember = 0,
        currNPBahtDecember = 0,
        currNPUnitQ1 = 0,
        currNPBahtQ1 = 0,
        currNPUnitQ2 = 0,
        currNPBahtQ2 = 0,
        currNPUnitQ3 = 0,
        currNPBahtQ3 = 0,
        currNPUnitQ4 = 0,
        currNPBahtQ4 = 0,
        oldNPUnitJanuary = 0,
        oldNPUnitFebruary = 0,
        oldNPUnitMarch = 0,
        oldNPUnitApril = 0,
        oldNPUnitMay = 0,
        oldNPUnitJune = 0,
        oldNPUnitJuly = 0,
        oldNPUnitAugust = 0,
        oldNPUnitSeptember = 0,
        oldNPUnitOctober = 0,
        oldNPUnitNovember = 0,
        oldNPUnitDecember = 0,
        oldNPBahtJanuary = 0,
        oldNPBahtFebruary = 0,
        oldNPBahtMarch = 0,
        oldNPBahtApril = 0,
        oldNPBahtMay = 0,
        oldNPBahtJune = 0,
        oldNPBahtJuly = 0,
        oldNPBahtAugust = 0,
        oldNPBahtSeptember = 0,
        oldNPBahtOctober = 0,
        oldNPBahtNovember = 0,
        oldNPBahtDecember = 0,
        oldNPUnitQ1 = 0,
        oldNPBahtQ1 = 0,
        oldNPUnitQ2 = 0,
        oldNPBahtQ2 = 0,
        oldNPUnitQ3 = 0,
        oldNPBahtQ3 = 0,
        oldNPUnitQ4 = 0,
        oldNPBahtQ4 = 0,
        achieveNPBahtJanuary = 0,
        achieveNPBahtFebruary = 0,
        achieveNPBahtMarch = 0,
        achieveNPBahtApril = 0,
        achieveNPBahtMay = 0,
        achieveNPBahtJune = 0,
        achieveNPBahtJuly = 0,
        achieveNPBahtAugust = 0,
        achieveNPBahtSeptember = 0,
        achieveNPBahtOctober = 0,
        achieveNPBahtNovember = 0,
        achieveNPBahtDecember = 0,
        achieveNPBahtQ1 = 0,
        achieveNPUnitQ1 = 0,
        achieveNPBahtQ2 = 0,
        achieveNPUnitQ2 = 0,
        achieveNPBahtQ3 = 0,
        achieveNPUnitQ3 = 0,
        achieveNPBahtQ4 = 0,
        achieveNPUnitQ4 = 0,
        growthNPBahtJanuary = 0,
        growthNPBahtFebruary = 0,
        growthNPBahtMarch = 0,
        growthNPBahtApril = 0,
        growthNPBahtMay = 0,
        growthNPBahtJune = 0,
        growthNPBahtJuly = 0,
        growthNPBahtAugust = 0,
        growthNPBahtSeptember = 0,
        growthNPBahtOctober = 0,
        growthNPBahtNovember = 0,
        growthNPBahtDecember = 0,
        achieveNPUnitJanuary = 0,
        achieveNPUnitFebruary = 0,
        achieveNPUnitMarch = 0,
        achieveNPUnitApril = 0,
        achieveNPUnitMay = 0,
        achieveNPUnitJune = 0,
        achieveNPUnitJuly = 0,
        achieveNPUnitAugust = 0,
        achieveNPUnitSeptember = 0,
        achieveNPUnitOctober = 0,
        achieveNPUnitNovember = 0,
        achieveNPUnitDecember = 0,
        growthNPUnitJanuary = 0,
        growthNPUnitFebruary = 0,
        growthNPUnitMarch = 0,
        growthNPUnitApril = 0,
        growthNPUnitMay = 0,
        growthNPUnitJune = 0,
        growthNPUnitJuly = 0,
        growthNPUnitAugust = 0,
        growthNPUnitSeptember = 0,
        growthNPUnitOctober = 0,
        growthNPUnitNovember = 0,
        growthNPUnitDecember = 0,
        growthNPBahtQ1 = 0,
        growthNPUnitQ1 = 0,
        growthNPBahtQ2 = 0,
        growthNPUnitQ2 = 0,
        growthNPBahtQ3 = 0,
        growthNPUnitQ3 = 0,
        growthNPBahtQ4 = 0,
        growthNPUnitQ4 = 0,
        currINDTotalBaht = 0,
        currINDTotalUnit = 0,
        oldINDTotalBaht = 0,
        oldINDTotalUnit = 0,
        currINDUnitJanuary = 0,
        currINDUnitFebruary = 0,
        currINDUnitMarch = 0,
        currINDUnitApril = 0,
        currINDUnitMay = 0,
        currINDUnitJune = 0,
        currINDUnitJuly = 0,
        currINDUnitAugust = 0,
        currINDUnitSeptember = 0,
        currINDUnitOctober = 0,
        currINDUnitNovember = 0,
        currINDUnitDecember = 0,
        currINDBahtJanuary = 0,
        currINDBahtFebruary = 0,
        currINDBahtMarch = 0,
        currINDBahtApril = 0,
        currINDBahtMay = 0,
        currINDBahtJune = 0,
        currINDBahtJuly = 0,
        currINDBahtAugust = 0,
        currINDBahtSeptember = 0,
        currINDBahtOctober = 0,
        currINDBahtNovember = 0,
        currINDBahtDecember = 0,
        currINDUnitQ1 = 0,
        currINDBahtQ1 = 0,
        currINDUnitQ2 = 0,
        currINDBahtQ2 = 0,
        currINDUnitQ3 = 0,
        currINDBahtQ3 = 0,
        currINDUnitQ4 = 0,
        currINDBahtQ4 = 0,
        oldINDUnitJanuary = 0,
        oldINDUnitFebruary = 0,
        oldINDUnitMarch = 0,
        oldINDUnitApril = 0,
        oldINDUnitMay = 0,
        oldINDUnitJune = 0,
        oldINDUnitJuly = 0,
        oldINDUnitAugust = 0,
        oldINDUnitSeptember = 0,
        oldINDUnitOctober = 0,
        oldINDUnitNovember = 0,
        oldINDUnitDecember = 0,
        oldINDBahtJanuary = 0,
        oldINDBahtFebruary = 0,
        oldINDBahtMarch = 0,
        oldINDBahtApril = 0,
        oldINDBahtMay = 0,
        oldINDBahtJune = 0,
        oldINDBahtJuly = 0,
        oldINDBahtAugust = 0,
        oldINDBahtSeptember = 0,
        oldINDBahtOctober = 0,
        oldINDBahtNovember = 0,
        oldINDBahtDecember = 0,
        oldINDUnitQ1 = 0,
        oldINDBahtQ1 = 0,
        oldINDUnitQ2 = 0,
        oldINDBahtQ2 = 0,
        oldINDUnitQ3 = 0,
        oldINDBahtQ3 = 0,
        oldINDUnitQ4 = 0,
        oldINDBahtQ4 = 0,
        achieveINDBahtJanuary = 0,
        achieveINDBahtFebruary = 0,
        achieveINDBahtMarch = 0,
        achieveINDBahtApril = 0,
        achieveINDBahtMay = 0,
        achieveINDBahtJune = 0,
        achieveINDBahtJuly = 0,
        achieveINDBahtAugust = 0,
        achieveINDBahtSeptember = 0,
        achieveINDBahtOctober = 0,
        achieveINDBahtNovember = 0,
        achieveINDBahtDecember = 0,
        achieveINDBahtQ1 = 0,
        achieveINDUnitQ1 = 0,
        achieveINDBahtQ2 = 0,
        achieveINDUnitQ2 = 0,
        achieveINDBahtQ3 = 0,
        achieveINDUnitQ3 = 0,
        achieveINDBahtQ4 = 0,
        achieveINDUnitQ4 = 0,
        growthINDBahtJanuary = 0,
        growthINDBahtFebruary = 0,
        growthINDBahtMarch = 0,
        growthINDBahtApril = 0,
        growthINDBahtMay = 0,
        growthINDBahtJune = 0,
        growthINDBahtJuly = 0,
        growthINDBahtAugust = 0,
        growthINDBahtSeptember = 0,
        growthINDBahtOctober = 0,
        growthINDBahtNovember = 0,
        growthINDBahtDecember = 0,
        achieveINDUnitJanuary = 0,
        achieveINDUnitFebruary = 0,
        achieveINDUnitMarch = 0,
        achieveINDUnitApril = 0,
        achieveINDUnitMay = 0,
        achieveINDUnitJune = 0,
        achieveINDUnitJuly = 0,
        achieveINDUnitAugust = 0,
        achieveINDUnitSeptember = 0,
        achieveINDUnitOctober = 0,
        achieveINDUnitNovember = 0,
        achieveINDUnitDecember = 0,
        growthINDUnitJanuary = 0,
        growthINDUnitFebruary = 0,
        growthINDUnitMarch = 0,
        growthINDUnitApril = 0,
        growthINDUnitMay = 0,
        growthINDUnitJune = 0,
        growthINDUnitJuly = 0,
        growthINDUnitAugust = 0,
        growthINDUnitSeptember = 0,
        growthINDUnitOctober = 0,
        growthINDUnitNovember = 0,
        growthINDUnitDecember = 0,
        growthINDBahtQ1 = 0,
        growthINDUnitQ1 = 0,
        growthINDBahtQ2 = 0,
        growthINDUnitQ2 = 0,
        growthINDBahtQ3 = 0,
        growthINDUnitQ3 = 0,
        growthINDBahtQ4 = 0,
        growthINDUnitQ4 = 0,
        currOTHTotalBaht = 0,
        currOTHTotalUnit = 0,
        oldOTHTotalBaht = 0,
        oldOTHTotalUnit = 0,
        currOTHUnitJanuary = 0,
        currOTHUnitFebruary = 0,
        currOTHUnitMarch = 0,
        currOTHUnitApril = 0,
        currOTHUnitMay = 0,
        currOTHUnitJune = 0,
        currOTHUnitJuly = 0,
        currOTHUnitAugust = 0,
        currOTHUnitSeptember = 0,
        currOTHUnitOctober = 0,
        currOTHUnitNovember = 0,
        currOTHUnitDecember = 0,
        currOTHBahtJanuary = 0,
        currOTHBahtFebruary = 0,
        currOTHBahtMarch = 0,
        currOTHBahtApril = 0,
        currOTHBahtMay = 0,
        currOTHBahtJune = 0,
        currOTHBahtJuly = 0,
        currOTHBahtAugust = 0,
        currOTHBahtSeptember = 0,
        currOTHBahtOctober = 0,
        currOTHBahtNovember = 0,
        currOTHBahtDecember = 0,
        currOTHUnitQ1 = 0,
        currOTHBahtQ1 = 0,
        currOTHUnitQ2 = 0,
        currOTHBahtQ2 = 0,
        currOTHUnitQ3 = 0,
        currOTHBahtQ3 = 0,
        currOTHUnitQ4 = 0,
        currOTHBahtQ4 = 0,
        oldOTHUnitJanuary = 0,
        oldOTHUnitFebruary = 0,
        oldOTHUnitMarch = 0,
        oldOTHUnitApril = 0,
        oldOTHUnitMay = 0,
        oldOTHUnitJune = 0,
        oldOTHUnitJuly = 0,
        oldOTHUnitAugust = 0,
        oldOTHUnitSeptember = 0,
        oldOTHUnitOctober = 0,
        oldOTHUnitNovember = 0,
        oldOTHUnitDecember = 0,
        oldOTHBahtJanuary = 0,
        oldOTHBahtFebruary = 0,
        oldOTHBahtMarch = 0,
        oldOTHBahtApril = 0,
        oldOTHBahtMay = 0,
        oldOTHBahtJune = 0,
        oldOTHBahtJuly = 0,
        oldOTHBahtAugust = 0,
        oldOTHBahtSeptember = 0,
        oldOTHBahtOctober = 0,
        oldOTHBahtNovember = 0,
        oldOTHBahtDecember = 0,
        oldOTHUnitQ1 = 0,
        oldOTHBahtQ1 = 0,
        oldOTHUnitQ2 = 0,
        oldOTHBahtQ2 = 0,
        oldOTHUnitQ3 = 0,
        oldOTHBahtQ3 = 0,
        oldOTHUnitQ4 = 0,
        oldOTHBahtQ4 = 0,
        achieveOTHBahtJanuary = 0,
        achieveOTHBahtFebruary = 0,
        achieveOTHBahtMarch = 0,
        achieveOTHBahtApril = 0,
        achieveOTHBahtMay = 0,
        achieveOTHBahtJune = 0,
        achieveOTHBahtJuly = 0,
        achieveOTHBahtAugust = 0,
        achieveOTHBahtSeptember = 0,
        achieveOTHBahtOctober = 0,
        achieveOTHBahtNovember = 0,
        achieveOTHBahtDecember = 0,
        achieveOTHBahtQ1 = 0,
        achieveOTHUnitQ1 = 0,
        achieveOTHBahtQ2 = 0,
        achieveOTHUnitQ2 = 0,
        achieveOTHBahtQ3 = 0,
        achieveOTHUnitQ3 = 0,
        achieveOTHBahtQ4 = 0,
        achieveOTHUnitQ4 = 0,
        growthOTHBahtJanuary = 0,
        growthOTHBahtFebruary = 0,
        growthOTHBahtMarch = 0,
        growthOTHBahtApril = 0,
        growthOTHBahtMay = 0,
        growthOTHBahtJune = 0,
        growthOTHBahtJuly = 0,
        growthOTHBahtAugust = 0,
        growthOTHBahtSeptember = 0,
        growthOTHBahtOctober = 0,
        growthOTHBahtNovember = 0,
        growthOTHBahtDecember = 0,
        achieveOTHUnitJanuary = 0,
        achieveOTHUnitFebruary = 0,
        achieveOTHUnitMarch = 0,
        achieveOTHUnitApril = 0,
        achieveOTHUnitMay = 0,
        achieveOTHUnitJune = 0,
        achieveOTHUnitJuly = 0,
        achieveOTHUnitAugust = 0,
        achieveOTHUnitSeptember = 0,
        achieveOTHUnitOctober = 0,
        achieveOTHUnitNovember = 0,
        achieveOTHUnitDecember = 0,
        growthOTHUnitJanuary = 0,
        growthOTHUnitFebruary = 0,
        growthOTHUnitMarch = 0,
        growthOTHUnitApril = 0,
        growthOTHUnitMay = 0,
        growthOTHUnitJune = 0,
        growthOTHUnitJuly = 0,
        growthOTHUnitAugust = 0,
        growthOTHUnitSeptember = 0,
        growthOTHUnitOctober = 0,
        growthOTHUnitNovember = 0,
        growthOTHUnitDecember = 0,
        growthOTHBahtQ1 = 0,
        growthOTHUnitQ1 = 0,
        growthOTHBahtQ2 = 0,
        growthOTHUnitQ2 = 0,
        growthOTHBahtQ3 = 0,
        growthOTHUnitQ3 = 0,
        growthOTHBahtQ4 = 0,
        growthOTHUnitQ4 = 0;

    var groupedCurrYear = _.groupBy(currYear, function(currYear) {
        return currYear.ItemGroupShort;
    });

    var groupedOldYear = _.groupBy(oldYear, function(oldYear) {
        return oldYear.ItemGroupShort;
    });

    $.each(groupedCurrYear.NP, function() {
        if (this.DocMonth == '1') {
            currNPUnitJanuary += parseFloat(this.Quantity);
            currNPBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currNPUnitFebruary += parseFloat(this.Quantity);
            currNPBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currNPUnitMarch += parseFloat(this.Quantity);
            currNPBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currNPUnitApril += parseFloat(this.Quantity);
            currNPBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currNPUnitMay += parseFloat(this.Quantity);
            currNPBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currNPUnitJune += parseFloat(this.Quantity);
            currNPBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currNPUnitJuly += parseFloat(this.Quantity);
            currNPBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currNPUnitAugust += parseFloat(this.Quantity);
            currNPBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currNPUnitSeptember += parseFloat(this.Quantity);
            currNPBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currNPUnitOctober += parseFloat(this.Quantity);
            currNPBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currNPUnitNovember += parseFloat(this.Quantity);
            currNPBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currNPUnitDecember += parseFloat(this.Quantity);
            currNPBahtDecember += parseFloat(this.Total);
        }

        currNPTotalBaht += parseFloat(this.Total);
        currNPTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.EB, function() {
        if (this.DocMonth == '1') {
            currEBUnitJanuary += parseFloat(this.Quantity);
            currEBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currEBUnitFebruary += parseFloat(this.Quantity);
            currEBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currEBUnitMarch += parseFloat(this.Quantity);
            currEBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currEBUnitApril += parseFloat(this.Quantity);
            currEBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currEBUnitMay += parseFloat(this.Quantity);
            currEBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currEBUnitJune += parseFloat(this.Quantity);
            currEBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currEBUnitJuly += parseFloat(this.Quantity);
            currEBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currEBUnitAugust += parseFloat(this.Quantity);
            currEBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currEBUnitSeptember += parseFloat(this.Quantity);
            currEBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currEBUnitOctober += parseFloat(this.Quantity);
            currEBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currEBUnitNovember += parseFloat(this.Quantity);
            currEBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currEBUnitDecember += parseFloat(this.Quantity);
            currEBBahtDecember += parseFloat(this.Total);
        }

        currEBTotalBaht += parseFloat(this.Total);
        currEBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.IND, function() {
        if (this.DocMonth == '1') {
            currINDUnitJanuary += parseFloat(this.Quantity);
            currINDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currINDUnitFebruary += parseFloat(this.Quantity);
            currINDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currINDUnitMarch += parseFloat(this.Quantity);
            currINDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currINDUnitApril += parseFloat(this.Quantity);
            currINDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currINDUnitMay += parseFloat(this.Quantity);
            currINDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currINDUnitJune += parseFloat(this.Quantity);
            currINDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currINDUnitJuly += parseFloat(this.Quantity);
            currINDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currINDUnitAugust += parseFloat(this.Quantity);
            currINDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currINDUnitSeptember += parseFloat(this.Quantity);
            currINDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currINDUnitOctober += parseFloat(this.Quantity);
            currINDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currINDUnitNovember += parseFloat(this.Quantity);
            currINDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currINDUnitDecember += parseFloat(this.Quantity);
            currINDBahtDecember += parseFloat(this.Total);
        }

        currINDTotalBaht += parseFloat(this.Total);
        currINDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.OTH, function() {
        if (this.DocMonth == '1') {
            currOTHUnitJanuary += parseFloat(this.Quantity);
            currOTHBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            currOTHUnitFebruary += parseFloat(this.Quantity);
            currOTHBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            currOTHUnitMarch += parseFloat(this.Quantity);
            currOTHBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            currOTHUnitApril += parseFloat(this.Quantity);
            currOTHBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            currOTHUnitMay += parseFloat(this.Quantity);
            currOTHBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            currOTHUnitJune += parseFloat(this.Quantity);
            currOTHBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            currOTHUnitJuly += parseFloat(this.Quantity);
            currOTHBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            currOTHUnitAugust += parseFloat(this.Quantity);
            currOTHBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            currOTHUnitSeptember += parseFloat(this.Quantity);
            currOTHBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            currOTHUnitOctober += parseFloat(this.Quantity);
            currOTHBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            currOTHUnitNovember += parseFloat(this.Quantity);
            currOTHBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            currOTHUnitDecember += parseFloat(this.Quantity);
            currOTHBahtDecember += parseFloat(this.Total);
        }

        currOTHTotalBaht += parseFloat(this.Total);
        currOTHTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedCurrYear.NP, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currNPUnitQ1 += parseFloat(this.Quantity);
            currNPBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currNPUnitQ2 += parseFloat(this.Quantity);
            currNPBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currNPUnitQ3 += parseFloat(this.Quantity);
            currNPBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currNPUnitQ4 += parseFloat(this.Quantity);
            currNPBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.EB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currEBUnitQ1 += parseFloat(this.Quantity);
            currEBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currEBUnitQ2 += parseFloat(this.Quantity);
            currEBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currEBUnitQ3 += parseFloat(this.Quantity);
            currEBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currEBUnitQ4 += parseFloat(this.Quantity);
            currEBBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.IND, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currINDUnitQ1 += parseFloat(this.Quantity);
            currINDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currINDUnitQ2 += parseFloat(this.Quantity);
            currINDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currINDUnitQ3 += parseFloat(this.Quantity);
            currINDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currINDUnitQ4 += parseFloat(this.Quantity);
            currINDBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedCurrYear.OTH, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            currOTHUnitQ1 += parseFloat(this.Quantity);
            currOTHBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            currOTHUnitQ2 += parseFloat(this.Quantity);
            currOTHBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            currOTHUnitQ3 += parseFloat(this.Quantity);
            currOTHBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            currOTHUnitQ4 += parseFloat(this.Quantity);
            currOTHBahtQ4 += parseFloat(this.Total);
        }

    });


    $.each(groupedOldYear.NP, function() {
        if (this.DocMonth == '1') {
            oldNPUnitJanuary += parseFloat(this.Quantity);
            oldNPBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldNPUnitFebruary += parseFloat(this.Quantity);
            oldNPBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldNPUnitMarch += parseFloat(this.Quantity);
            oldNPBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldNPUnitApril += parseFloat(this.Quantity);
            oldNPBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldNPUnitMay += parseFloat(this.Quantity);
            oldNPBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldNPUnitJune += parseFloat(this.Quantity);
            oldNPBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldNPUnitJuly += parseFloat(this.Quantity);
            oldNPBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldNPUnitAugust += parseFloat(this.Quantity);
            oldNPBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldNPUnitSeptember += parseFloat(this.Quantity);
            oldNPBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldNPUnitOctober += parseFloat(this.Quantity);
            oldNPBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldNPUnitNovember += parseFloat(this.Quantity);
            oldNPBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldNPUnitDecember += parseFloat(this.Quantity);
            oldNPBahtDecember += parseFloat(this.Total);
        }

        oldNPTotalBaht += parseFloat(this.Total);
        oldNPTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.EB, function() {
        if (this.DocMonth == '1') {
            oldEBUnitJanuary += parseFloat(this.Quantity);
            oldEBBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldEBUnitFebruary += parseFloat(this.Quantity);
            oldEBBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldEBUnitMarch += parseFloat(this.Quantity);
            oldEBBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldEBUnitApril += parseFloat(this.Quantity);
            oldEBBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldEBUnitMay += parseFloat(this.Quantity);
            oldEBBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldEBUnitJune += parseFloat(this.Quantity);
            oldEBBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldEBUnitJuly += parseFloat(this.Quantity);
            oldEBBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldEBUnitAugust += parseFloat(this.Quantity);
            oldEBBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldEBUnitSeptember += parseFloat(this.Quantity);
            oldEBBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldEBUnitOctober += parseFloat(this.Quantity);
            oldEBBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldEBUnitNovember += parseFloat(this.Quantity);
            oldEBBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldEBUnitDecember += parseFloat(this.Quantity);
            oldEBBahtDecember += parseFloat(this.Total);
        }

        oldEBTotalBaht += parseFloat(this.Total);
        oldEBTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.IND, function() {
        if (this.DocMonth == '1') {
            oldINDUnitJanuary += parseFloat(this.Quantity);
            oldINDBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldINDUnitFebruary += parseFloat(this.Quantity);
            oldINDBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldINDUnitMarch += parseFloat(this.Quantity);
            oldINDBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldINDUnitApril += parseFloat(this.Quantity);
            oldINDBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldINDUnitMay += parseFloat(this.Quantity);
            oldINDBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldINDUnitJune += parseFloat(this.Quantity);
            oldINDBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldINDUnitJuly += parseFloat(this.Quantity);
            oldINDBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldINDUnitAugust += parseFloat(this.Quantity);
            oldINDBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldINDUnitSeptember += parseFloat(this.Quantity);
            oldINDBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldINDUnitOctober += parseFloat(this.Quantity);
            oldINDBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldINDUnitNovember += parseFloat(this.Quantity);
            oldINDBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldINDUnitDecember += parseFloat(this.Quantity);
            oldINDBahtDecember += parseFloat(this.Total);
        }

        oldINDTotalBaht += parseFloat(this.Total);
        oldINDTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.OTH, function() {
        if (this.DocMonth == '1') {
            oldOTHUnitJanuary += parseFloat(this.Quantity);
            oldOTHBahtJanuary += parseFloat(this.Total);
        } else if (this.DocMonth == '2') {
            oldOTHUnitFebruary += parseFloat(this.Quantity);
            oldOTHBahtFebruary += parseFloat(this.Total);
        } else if (this.DocMonth == '3') {
            oldOTHUnitMarch += parseFloat(this.Quantity);
            oldOTHBahtMarch += parseFloat(this.Total);
        } else if (this.DocMonth == '4') {
            oldOTHUnitApril += parseFloat(this.Quantity);
            oldOTHBahtApril += parseFloat(this.Total);
        } else if (this.DocMonth == '5') {
            oldOTHUnitMay += parseFloat(this.Quantity);
            oldOTHBahtMay += parseFloat(this.Total);
        } else if (this.DocMonth == '6') {
            oldOTHUnitJune += parseFloat(this.Quantity);
            oldOTHBahtJune += parseFloat(this.Total);
        } else if (this.DocMonth == '7') {
            oldOTHUnitJuly += parseFloat(this.Quantity);
            oldOTHBahtJuly += parseFloat(this.Total);
        } else if (this.DocMonth == '8') {
            oldOTHUnitAugust += parseFloat(this.Quantity);
            oldOTHBahtAugust += parseFloat(this.Total);
        } else if (this.DocMonth == '9') {
            oldOTHUnitSeptember += parseFloat(this.Quantity);
            oldOTHBahtSeptember += parseFloat(this.Total);
        } else if (this.DocMonth == '10') {
            oldOTHUnitOctober += parseFloat(this.Quantity);
            oldOTHBahtOctober += parseFloat(this.Total);
        } else if (this.DocMonth == '11') {
            oldOTHUnitNovember += parseFloat(this.Quantity);
            oldOTHBahtNovember += parseFloat(this.Total);
        } else if (this.DocMonth == '12') {
            oldOTHUnitDecember += parseFloat(this.Quantity);
            oldOTHBahtDecember += parseFloat(this.Total);
        }

        oldOTHTotalBaht += parseFloat(this.Total);
        oldOTHTotalUnit += parseFloat(this.Quantity);

    });

    $.each(groupedOldYear.NP, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldNPUnitQ1 += parseFloat(this.Quantity);
            oldNPBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldNPUnitQ2 += parseFloat(this.Quantity);
            oldNPBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldNPUnitQ3 += parseFloat(this.Quantity);
            oldNPBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldNPUnitQ4 += parseFloat(this.Quantity);
            oldNPBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.EB, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldEBUnitQ1 += parseFloat(this.Quantity);
            oldEBBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldEBUnitQ2 += parseFloat(this.Quantity);
            oldEBBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldEBUnitQ3 += parseFloat(this.Quantity);
            oldEBBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldEBUnitQ4 += parseFloat(this.Quantity);
            oldEBBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.IND, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldINDUnitQ1 += parseFloat(this.Quantity);
            oldINDBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldINDUnitQ2 += parseFloat(this.Quantity);
            oldINDBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldINDUnitQ3 += parseFloat(this.Quantity);
            oldINDBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldINDUnitQ4 += parseFloat(this.Quantity);
            oldINDBahtQ4 += parseFloat(this.Total);
        }

    });

    $.each(groupedOldYear.OTH, function() {
        if (this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3') {
            oldOTHUnitQ1 += parseFloat(this.Quantity);
            oldOTHBahtQ1 += parseFloat(this.Total);
        } else if (this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6') {
            oldOTHUnitQ2 += parseFloat(this.Quantity);
            oldOTHBahtQ2 += parseFloat(this.Total);
        } else if (this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9') {
            oldOTHUnitQ3 += parseFloat(this.Quantity);
            oldOTHBahtQ3 += parseFloat(this.Total);
        } else if (this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12') {
            oldOTHUnitQ4 += parseFloat(this.Quantity);
            oldOTHBahtQ4 += parseFloat(this.Total);
        }

    });

    growthNPBahtJanuary = ((currNPBahtJanuary - oldNPBahtJanuary) * 100) / oldNPBahtJanuary;
    growthNPBahtFebruary = ((currNPBahtFebruary - oldNPBahtFebruary) * 100) / oldNPBahtFebruary;
    growthNPBahtMarch = ((currNPBahtMarch - oldNPBahtMarch) * 100) / oldNPBahtMarch;
    growthNPBahtApril = ((currNPBahtApril - oldNPBahtApril) * 100) / oldNPBahtApril;
    growthNPBahtMay = ((currNPBahtMay - oldNPBahtMay) * 100) / oldNPBahtMay;
    growthNPBahtJune = ((currNPBahtJune - oldNPBahtJune) * 100) / oldNPBahtJune;
    growthNPBahtJuly = ((currNPBahtJuly - oldNPBahtJuly) * 100) / oldNPBahtJuly;
    growthNPBahtAugust = ((currNPBahtAugust - oldNPBahtAugust) * 100) / oldNPBahtAugust;
    growthNPBahtSeptember = ((currNPBahtSeptember - oldNPBahtSeptember) * 100) / oldNPBahtSeptember;
    growthNPBahtOctober = ((currNPBahtOctober - oldNPBahtOctober) * 100) / oldNPBahtOctober;
    growthNPBahtNovember = ((currNPBahtNovember - oldNPBahtNovember) * 100) / oldNPBahtNovember;
    growthNPBahtDecember = ((currNPBahtDecember - oldNPBahtDecember) * 100) / oldNPBahtDecember;
    growthNPBahtTotal = ((currNPTotalBaht - oldNPTotalBaht) * 100) / oldNPTotalBaht;
    growthNPBahtQ1 = ((currNPBahtQ1 - oldNPBahtQ1) * 100) / oldNPBahtQ1;
    growthNPBahtQ2 = ((currNPBahtQ2 - oldNPBahtQ2) * 100) / oldNPBahtQ2;
    growthNPBahtQ3 = ((currNPBahtQ3 - oldNPBahtQ3) * 100) / oldNPBahtQ3;
    growthNPBahtQ4 = ((currNPBahtQ4 - oldNPBahtQ4) * 100) / oldNPBahtQ4;

    growthNPUnitJanuary = ((currNPUnitJanuary - oldNPUnitJanuary) * 100) / oldNPUnitJanuary;
    growthNPUnitFebruary = ((currNPUnitFebruary - oldNPUnitFebruary) * 100) / oldNPUnitFebruary;
    growthNPUnitMarch = ((currNPUnitMarch - oldNPUnitMarch) * 100) / oldNPUnitMarch;
    growthNPUnitApril = ((currNPUnitApril - oldNPUnitApril) * 100) / oldNPUnitApril;
    growthNPUnitMay = ((currNPUnitMay - oldNPUnitMay) * 100) / oldNPUnitMay;
    growthNPUnitJune = ((currNPUnitJune - oldNPUnitJune) * 100) / oldNPUnitJune;
    growthNPUnitJuly = ((currNPUnitJuly - oldNPUnitJuly) * 100) / oldNPUnitJuly;
    growthNPUnitAugust = ((currNPUnitAugust - oldNPUnitAugust) * 100) / oldNPUnitAugust;
    growthNPUnitSeptember = ((currNPUnitSeptember - oldNPUnitSeptember) * 100) / oldNPUnitSeptember;
    growthNPUnitOctober = ((currNPUnitOctober - oldNPUnitOctober) * 100) / oldNPUnitOctober;
    growthNPUnitNovember = ((currNPUnitNovember - oldNPUnitNovember) * 100) / oldNPUnitNovember;
    growthNPUnitDecember = ((currNPUnitDecember - oldNPUnitDecember) * 100) / oldNPUnitDecember;
    growthNPUnitTotal = ((currNPTotalUnit - oldNPTotalUnit) * 100) / oldNPTotalUnit;
    growthNPUnitQ1 = ((currNPUnitQ1 - oldNPUnitQ1) * 100) / oldNPUnitQ1;
    growthNPUnitQ2 = ((currNPUnitQ2 - oldNPUnitQ2) * 100) / oldNPUnitQ2;
    growthNPUnitQ3 = ((currNPUnitQ3 - oldNPUnitQ3) * 100) / oldNPUnitQ3;
    growthNPUnitQ4 = ((currNPUnitQ4 - oldNPUnitQ4) * 100) / oldNPUnitQ4;

    growthEBBahtJanuary = ((currEBBahtJanuary - oldEBBahtJanuary) * 100) / oldEBBahtJanuary;
    growthEBBahtFebruary = ((currEBBahtFebruary - oldEBBahtFebruary) * 100) / oldEBBahtFebruary;
    growthEBBahtMarch = ((currEBBahtMarch - oldEBBahtMarch) * 100) / oldEBBahtMarch;
    growthEBBahtApril = ((currEBBahtApril - oldEBBahtApril) * 100) / oldEBBahtApril;
    growthEBBahtMay = ((currEBBahtMay - oldEBBahtMay) * 100) / oldEBBahtMay;
    growthEBBahtJune = ((currEBBahtJune - oldEBBahtJune) * 100) / oldEBBahtJune;
    growthEBBahtJuly = ((currEBBahtJuly - oldEBBahtJuly) * 100) / oldEBBahtJuly;
    growthEBBahtAugust = ((currEBBahtAugust - oldEBBahtAugust) * 100) / oldEBBahtAugust;
    growthEBBahtSeptember = ((currEBBahtSeptember - oldEBBahtSeptember) * 100) / oldEBBahtSeptember;
    growthEBBahtOctober = ((currEBBahtOctober - oldEBBahtOctober) * 100) / oldEBBahtOctober;
    growthEBBahtNovember = ((currEBBahtNovember - oldEBBahtNovember) * 100) / oldEBBahtNovember;
    growthEBBahtDecember = ((currEBBahtDecember - oldEBBahtDecember) * 100) / oldEBBahtDecember;
    growthEBBahtTotal = ((currEBTotalBaht - oldEBTotalBaht) * 100) / oldEBTotalBaht;
    growthEBBahtQ1 = ((currEBBahtQ1 - oldEBBahtQ1) * 100) / oldEBBahtQ1;
    growthEBBahtQ2 = ((currEBBahtQ2 - oldEBBahtQ2) * 100) / oldEBBahtQ2;
    growthEBBahtQ3 = ((currEBBahtQ3 - oldEBBahtQ3) * 100) / oldEBBahtQ3;
    growthEBBahtQ4 = ((currEBBahtQ4 - oldEBBahtQ4) * 100) / oldEBBahtQ4;

    growthEBUnitJanuary = ((currEBUnitJanuary - oldEBUnitJanuary) * 100) / oldEBUnitJanuary;
    growthEBUnitFebruary = ((currEBUnitFebruary - oldEBUnitFebruary) * 100) / oldEBUnitFebruary;
    growthEBUnitMarch = ((currEBUnitMarch - oldEBUnitMarch) * 100) / oldEBUnitMarch;
    growthEBUnitApril = ((currEBUnitApril - oldEBUnitApril) * 100) / oldEBUnitApril;
    growthEBUnitMay = ((currEBUnitMay - oldEBUnitMay) * 100) / oldEBUnitMay;
    growthEBUnitJune = ((currEBUnitJune - oldEBUnitJune) * 100) / oldEBUnitJune;
    growthEBUnitJuly = ((currEBUnitJuly - oldEBUnitJuly) * 100) / oldEBUnitJuly;
    growthEBUnitAugust = ((currEBUnitAugust - oldEBUnitAugust) * 100) / oldEBUnitAugust;
    growthEBUnitSeptember = ((currEBUnitSeptember - oldEBUnitSeptember) * 100) / oldEBUnitSeptember;
    growthEBUnitOctober = ((currEBUnitOctober - oldEBUnitOctober) * 100) / oldEBUnitOctober;
    growthEBUnitNovember = ((currEBUnitNovember - oldEBUnitNovember) * 100) / oldEBUnitNovember;
    growthEBUnitDecember = ((currEBUnitDecember - oldEBUnitDecember) * 100) / oldEBUnitDecember;
    growthEBUnitTotal = ((currEBTotalUnit - oldEBTotalUnit) * 100) / oldEBTotalUnit;
    growthEBUnitQ1 = ((currEBUnitQ1 - oldEBUnitQ1) * 100) / oldEBUnitQ1;
    growthEBUnitQ2 = ((currEBUnitQ2 - oldEBUnitQ2) * 100) / oldEBUnitQ2;
    growthEBUnitQ3 = ((currEBUnitQ3 - oldEBUnitQ3) * 100) / oldEBUnitQ3;
    growthEBUnitQ4 = ((currEBUnitQ4 - oldEBUnitQ4) * 100) / oldEBUnitQ4;

    growthINDBahtJanuary = ((currINDBahtJanuary - oldINDBahtJanuary) * 100) / oldINDBahtJanuary;
    growthINDBahtFebruary = ((currINDBahtFebruary - oldINDBahtFebruary) * 100) / oldINDBahtFebruary;
    growthINDBahtMarch = ((currINDBahtMarch - oldINDBahtMarch) * 100) / oldINDBahtMarch;
    growthINDBahtApril = ((currINDBahtApril - oldINDBahtApril) * 100) / oldINDBahtApril;
    growthINDBahtMay = ((currINDBahtMay - oldINDBahtMay) * 100) / oldINDBahtMay;
    growthINDBahtJune = ((currINDBahtJune - oldINDBahtJune) * 100) / oldINDBahtJune;
    growthINDBahtJuly = ((currINDBahtJuly - oldINDBahtJuly) * 100) / oldINDBahtJuly;
    growthINDBahtAugust = ((currINDBahtAugust - oldINDBahtAugust) * 100) / oldINDBahtAugust;
    growthINDBahtSeptember = ((currINDBahtSeptember - oldINDBahtSeptember) * 100) / oldINDBahtSeptember;
    growthINDBahtOctober = ((currINDBahtOctober - oldINDBahtOctober) * 100) / oldINDBahtOctober;
    growthINDBahtNovember = ((currINDBahtNovember - oldINDBahtNovember) * 100) / oldINDBahtNovember;
    growthINDBahtDecember = ((currINDBahtDecember - oldINDBahtDecember) * 100) / oldINDBahtDecember;
    growthINDBahtTotal = ((currINDTotalBaht - oldINDTotalBaht) * 100) / oldINDTotalBaht;
    growthINDBahtQ1 = ((currINDBahtQ1 - oldINDBahtQ1) * 100) / oldINDBahtQ1;
    growthINDBahtQ2 = ((currINDBahtQ2 - oldINDBahtQ2) * 100) / oldINDBahtQ2;
    growthINDBahtQ3 = ((currINDBahtQ3 - oldINDBahtQ3) * 100) / oldINDBahtQ3;
    growthINDBahtQ4 = ((currINDBahtQ4 - oldINDBahtQ4) * 100) / oldINDBahtQ4;

    growthINDUnitJanuary = ((currINDUnitJanuary - oldINDUnitJanuary) * 100) / oldINDUnitJanuary;
    growthINDUnitFebruary = ((currINDUnitFebruary - oldINDUnitFebruary) * 100) / oldINDUnitFebruary;
    growthINDUnitMarch = ((currINDUnitMarch - oldINDUnitMarch) * 100) / oldINDUnitMarch;
    growthINDUnitApril = ((currINDUnitApril - oldINDUnitApril) * 100) / oldINDUnitApril;
    growthINDUnitMay = ((currINDUnitMay - oldINDUnitMay) * 100) / oldINDUnitMay;
    growthINDUnitJune = ((currINDUnitJune - oldINDUnitJune) * 100) / oldINDUnitJune;
    growthINDUnitJuly = ((currINDUnitJuly - oldINDUnitJuly) * 100) / oldINDUnitJuly;
    growthINDUnitAugust = ((currINDUnitAugust - oldINDUnitAugust) * 100) / oldINDUnitAugust;
    growthINDUnitSeptember = ((currINDUnitSeptember - oldINDUnitSeptember) * 100) / oldINDUnitSeptember;
    growthINDUnitOctober = ((currINDUnitOctober - oldINDUnitOctober) * 100) / oldINDUnitOctober;
    growthINDUnitNovember = ((currINDUnitNovember - oldINDUnitNovember) * 100) / oldINDUnitNovember;
    growthINDUnitDecember = ((currINDUnitDecember - oldINDUnitDecember) * 100) / oldINDUnitDecember;
    growthINDUnitTotal = ((currINDTotalUnit - oldINDTotalUnit) * 100) / oldINDTotalUnit;
    growthINDUnitQ1 = ((currINDUnitQ1 - oldINDUnitQ1) * 100) / oldINDUnitQ1;
    growthINDUnitQ2 = ((currINDUnitQ2 - oldINDUnitQ2) * 100) / oldINDUnitQ2;
    growthINDUnitQ3 = ((currINDUnitQ3 - oldINDUnitQ3) * 100) / oldINDUnitQ3;
    growthINDUnitQ4 = ((currINDUnitQ4 - oldINDUnitQ4) * 100) / oldINDUnitQ4;

    growthOTHBahtJanuary = ((currOTHBahtJanuary - oldOTHBahtJanuary) * 100) / oldOTHBahtJanuary;
    growthOTHBahtFebruary = ((currOTHBahtFebruary - oldOTHBahtFebruary) * 100) / oldOTHBahtFebruary;
    growthOTHBahtMarch = ((currOTHBahtMarch - oldOTHBahtMarch) * 100) / oldOTHBahtMarch;
    growthOTHBahtApril = ((currOTHBahtApril - oldOTHBahtApril) * 100) / oldOTHBahtApril;
    growthOTHBahtMay = ((currOTHBahtMay - oldOTHBahtMay) * 100) / oldOTHBahtMay;
    growthOTHBahtJune = ((currOTHBahtJune - oldOTHBahtJune) * 100) / oldOTHBahtJune;
    growthOTHBahtJuly = ((currOTHBahtJuly - oldOTHBahtJuly) * 100) / oldOTHBahtJuly;
    growthOTHBahtAugust = ((currOTHBahtAugust - oldOTHBahtAugust) * 100) / oldOTHBahtAugust;
    growthOTHBahtSeptember = ((currOTHBahtSeptember - oldOTHBahtSeptember) * 100) / oldOTHBahtSeptember;
    growthOTHBahtOctober = ((currOTHBahtOctober - oldOTHBahtOctober) * 100) / oldOTHBahtOctober;
    growthOTHBahtNovember = ((currOTHBahtNovember - oldOTHBahtNovember) * 100) / oldOTHBahtNovember;
    growthOTHBahtDecember = ((currOTHBahtDecember - oldOTHBahtDecember) * 100) / oldOTHBahtDecember;
    growthOTHBahtTotal = ((currOTHTotalBaht - oldOTHTotalBaht) * 100) / oldOTHTotalBaht;
    growthOTHBahtQ1 = ((currOTHBahtQ1 - oldOTHBahtQ1) * 100) / oldOTHBahtQ1;
    growthOTHBahtQ2 = ((currOTHBahtQ2 - oldOTHBahtQ2) * 100) / oldOTHBahtQ2;
    growthOTHBahtQ3 = ((currOTHBahtQ3 - oldOTHBahtQ3) * 100) / oldOTHBahtQ3;
    growthOTHBahtQ4 = ((currOTHBahtQ4 - oldOTHBahtQ4) * 100) / oldOTHBahtQ4;

    growthOTHUnitJanuary = ((currOTHUnitJanuary - oldOTHUnitJanuary) * 100) / oldOTHUnitJanuary;
    growthOTHUnitFebruary = ((currOTHUnitFebruary - oldOTHUnitFebruary) * 100) / oldOTHUnitFebruary;
    growthOTHUnitMarch = ((currOTHUnitMarch - oldOTHUnitMarch) * 100) / oldOTHUnitMarch;
    growthOTHUnitApril = ((currOTHUnitApril - oldOTHUnitApril) * 100) / oldOTHUnitApril;
    growthOTHUnitMay = ((currOTHUnitMay - oldOTHUnitMay) * 100) / oldOTHUnitMay;
    growthOTHUnitJune = ((currOTHUnitJune - oldOTHUnitJune) * 100) / oldOTHUnitJune;
    growthOTHUnitJuly = ((currOTHUnitJuly - oldOTHUnitJuly) * 100) / oldOTHUnitJuly;
    growthOTHUnitAugust = ((currOTHUnitAugust - oldOTHUnitAugust) * 100) / oldOTHUnitAugust;
    growthOTHUnitSeptember = ((currOTHUnitSeptember - oldOTHUnitSeptember) * 100) / oldOTHUnitSeptember;
    growthOTHUnitOctober = ((currOTHUnitOctober - oldOTHUnitOctober) * 100) / oldOTHUnitOctober;
    growthOTHUnitNovember = ((currOTHUnitNovember - oldOTHUnitNovember) * 100) / oldOTHUnitNovember;
    growthOTHUnitDecember = ((currOTHUnitDecember - oldOTHUnitDecember) * 100) / oldOTHUnitDecember;
    growthOTHUnitTotal = ((currOTHTotalUnit - oldOTHTotalUnit) * 100) / oldOTHTotalUnit;
    growthOTHUnitQ1 = ((currOTHUnitQ1 - oldOTHUnitQ1) * 100) / oldOTHUnitQ1;
    growthOTHUnitQ2 = ((currOTHUnitQ2 - oldOTHUnitQ2) * 100) / oldOTHUnitQ2;
    growthOTHUnitQ3 = ((currOTHUnitQ3 - oldOTHUnitQ3) * 100) / oldOTHUnitQ3;
    growthOTHUnitQ4 = ((currOTHUnitQ4 - oldOTHUnitQ4) * 100) / oldOTHUnitQ4;

    var totalNPBahtTarget = accounting.unformat(targetNP.AmtQ1) + accounting.unformat(targetNP.AmtQ2) + accounting.unformat(targetNP.AmtQ3) + accounting.unformat(targetNP.AmtQ4);
    var totalNPUnitTarget = accounting.unformat(targetNP.UnitQ1) + accounting.unformat(targetNP.UnitQ2) + accounting.unformat(targetNP.UnitQ3) + accounting.unformat(targetNP.UnitQ4);
    var totalEBBahtTarget = accounting.unformat(targetEB.AmtQ1) + accounting.unformat(targetEB.AmtQ2) + accounting.unformat(targetEB.AmtQ3) + accounting.unformat(targetEB.AmtQ4);
    var totalEBUnitTarget = accounting.unformat(targetEB.UnitQ1) + accounting.unformat(targetEB.UnitQ2) + accounting.unformat(targetEB.UnitQ3) + accounting.unformat(targetEB.UnitQ4);
    var totalINDBahtTarget = accounting.unformat(targetIND.AmtQ1) + accounting.unformat(targetIND.AmtQ2) + accounting.unformat(targetIND.AmtQ3) + accounting.unformat(targetIND.AmtQ4);
    var totalINDUnitTarget = accounting.unformat(targetIND.UnitQ1) + accounting.unformat(targetIND.UnitQ2) + accounting.unformat(targetIND.UnitQ3) + accounting.unformat(targetIND.UnitQ4);
    var totalOTHBahtTarget = accounting.unformat(targetOTH.AmtQ1) + accounting.unformat(targetOTH.AmtQ2) + accounting.unformat(targetOTH.AmtQ3) + accounting.unformat(targetOTH.AmtQ4);
    var totalOTHUnitTarget = accounting.unformat(targetOTH.UnitQ1) + accounting.unformat(targetOTH.UnitQ2) + accounting.unformat(targetOTH.UnitQ3) + accounting.unformat(targetOTH.UnitQ4);

    achieveNPBahtJanuary = (currNPBahtJanuary * 100) / accounting.unformat(targetNP.Amt01);
    achieveNPBahtFebruary = (currNPBahtFebruary * 100) / accounting.unformat(targetNP.Amt02);
    achieveNPBahtMarch = (currNPBahtMarch * 100) / accounting.unformat(targetNP.Amt03);
    achieveNPBahtApril = (currNPBahtApril * 100) / accounting.unformat(targetNP.Amt04);
    achieveNPBahtMay = (currNPBahtMay * 100) / accounting.unformat(targetNP.Amt05);
    achieveNPBahtJune = (currNPBahtJune * 100) / accounting.unformat(targetNP.Amt06);
    achieveNPBahtJuly = (currNPBahtJuly * 100) / accounting.unformat(targetNP.Amt07);
    achieveNPBahtAugust = (currNPBahtAugust * 100) / accounting.unformat(targetNP.Amt08);
    achieveNPBahtSeptember = (currNPBahtSeptember * 100) / accounting.unformat(targetNP.Amt09);
    achieveNPBahtOctober = (currNPBahtOctober * 100) / accounting.unformat(targetNP.Amt10);
    achieveNPBahtNovember = (currNPBahtNovember * 100) / accounting.unformat(targetNP.Amt11);
    achieveNPBahtDecember = (currNPBahtDecember * 100) / accounting.unformat(targetNP.Amt12);
    achieveNPBahtTotal = (currNPTotalBaht * 100) / totalNPBahtTarget;
    achieveNPBahtQ1 = (currNPBahtQ1 * 100) / accounting.unformat(targetNP.AmtQ1);
    achieveNPBahtQ2 = (currNPBahtQ2 * 100) / accounting.unformat(targetNP.AmtQ2);
    achieveNPBahtQ3 = (currNPBahtQ3 * 100) / accounting.unformat(targetNP.AmtQ3);
    achieveNPBahtQ4 = (currNPBahtQ4 * 100) / accounting.unformat(targetNP.AmtQ4);

    achieveNPUnitJanuary = (currNPUnitJanuary * 100) / accounting.unformat(targetNP.Unit01);
    achieveNPUnitFebruary = (currNPUnitFebruary * 100) / accounting.unformat(targetNP.Unit02);
    achieveNPUnitMarch = (currNPUnitMarch * 100) / accounting.unformat(targetNP.Unit03);
    achieveNPUnitApril = (currNPUnitApril * 100) / accounting.unformat(targetNP.Unit04);
    achieveNPUnitMay = (currNPUnitMay * 100) / accounting.unformat(targetNP.Unit05);
    achieveNPUnitJune = (currNPUnitJune * 100) / accounting.unformat(targetNP.Unit06);
    achieveNPUnitJuly = (currNPUnitJuly * 100) / accounting.unformat(targetNP.Unit07);
    achieveNPUnitAugust = (currNPUnitAugust * 100) / accounting.unformat(targetNP.Unit08);
    achieveNPUnitSeptember = (currNPUnitSeptember * 100) / accounting.unformat(targetNP.Unit09);
    achieveNPUnitOctober = (currNPUnitOctober * 100) / accounting.unformat(targetNP.Unit10);
    achieveNPUnitNovember = (currNPUnitNovember * 100) / accounting.unformat(targetNP.Unit11);
    achieveNPUnitDecember = (currNPUnitDecember * 100) / accounting.unformat(targetNP.Unit12);
    achieveNPUnitTotal = (currNPTotalUnit * 100) / totalNPUnitTarget;
    achieveNPUnitQ1 = (currNPUnitQ1 * 100) / accounting.unformat(targetNP.UnitQ1);
    achieveNPUnitQ2 = (currNPUnitQ2 * 100) / accounting.unformat(targetNP.UnitQ2);
    achieveNPUnitQ3 = (currNPUnitQ3 * 100) / accounting.unformat(targetNP.UnitQ3);
    achieveNPUnitQ4 = (currNPUnitQ4 * 100) / accounting.unformat(targetNP.UnitQ4);

    achieveEBBahtJanuary = (currEBBahtJanuary * 100) / accounting.unformat(targetEB.Amt01);
    achieveEBBahtFebruary = (currEBBahtFebruary * 100) / accounting.unformat(targetEB.Amt02);
    achieveEBBahtMarch = (currEBBahtMarch * 100) / accounting.unformat(targetEB.Amt03);
    achieveEBBahtApril = (currEBBahtApril * 100) / accounting.unformat(targetEB.Amt04);
    achieveEBBahtMay = (currEBBahtMay * 100) / accounting.unformat(targetEB.Amt05);
    achieveEBBahtJune = (currEBBahtJune * 100) / accounting.unformat(targetEB.Amt06);
    achieveEBBahtJuly = (currEBBahtJuly * 100) / accounting.unformat(targetEB.Amt07);
    achieveEBBahtAugust = (currEBBahtAugust * 100) / accounting.unformat(targetEB.Amt08);
    achieveEBBahtSeptember = (currEBBahtSeptember * 100) / accounting.unformat(targetEB.Amt09);
    achieveEBBahtOctober = (currEBBahtOctober * 100) / accounting.unformat(targetEB.Amt10);
    achieveEBBahtNovember = (currEBBahtNovember * 100) / accounting.unformat(targetEB.Amt11);
    achieveEBBahtDecember = (currEBBahtDecember * 100) / accounting.unformat(targetEB.Amt12);
    achieveEBBahtTotal = (currEBTotalBaht * 100) / totalEBBahtTarget;
    achieveEBBahtQ1 = (currEBBahtQ1 * 100) / accounting.unformat(targetEB.AmtQ1);
    achieveEBBahtQ2 = (currEBBahtQ2 * 100) / accounting.unformat(targetEB.AmtQ2);
    achieveEBBahtQ3 = (currEBBahtQ3 * 100) / accounting.unformat(targetEB.AmtQ3);
    achieveEBBahtQ4 = (currEBBahtQ4 * 100) / accounting.unformat(targetEB.AmtQ4);

    achieveEBUnitJanuary = (currEBUnitJanuary * 100) / accounting.unformat(targetEB.Unit01);
    achieveEBUnitFebruary = (currEBUnitFebruary * 100) / accounting.unformat(targetEB.Unit02);
    achieveEBUnitMarch = (currEBUnitMarch * 100) / accounting.unformat(targetEB.Unit03);
    achieveEBUnitApril = (currEBUnitApril * 100) / accounting.unformat(targetEB.Unit04);
    achieveEBUnitMay = (currEBUnitMay * 100) / accounting.unformat(targetEB.Unit05);
    achieveEBUnitJune = (currEBUnitJune * 100) / accounting.unformat(targetEB.Unit06);
    achieveEBUnitJuly = (currEBUnitJuly * 100) / accounting.unformat(targetEB.Unit07);
    achieveEBUnitAugust = (currEBUnitAugust * 100) / accounting.unformat(targetEB.Unit08);
    achieveEBUnitSeptember = (currEBUnitSeptember * 100) / accounting.unformat(targetEB.Unit09);
    achieveEBUnitOctober = (currEBUnitOctober * 100) / accounting.unformat(targetEB.Unit10);
    achieveEBUnitNovember = (currEBUnitNovember * 100) / accounting.unformat(targetEB.Unit11);
    achieveEBUnitDecember = (currEBUnitDecember * 100) / accounting.unformat(targetEB.Unit12);
    achieveEBUnitTotal = (currEBTotalUnit * 100) / totalEBUnitTarget;
    achieveEBUnitQ1 = (currEBUnitQ1 * 100) / accounting.unformat(targetEB.UnitQ1);
    achieveEBUnitQ2 = (currEBUnitQ2 * 100) / accounting.unformat(targetEB.UnitQ2);
    achieveEBUnitQ3 = (currEBUnitQ3 * 100) / accounting.unformat(targetEB.UnitQ3);
    achieveEBUnitQ4 = (currEBUnitQ4 * 100) / accounting.unformat(targetEB.UnitQ4);

    achieveINDBahtJanuary = (currINDBahtJanuary * 100) / accounting.unformat(targetIND.Amt01);
    achieveINDBahtFebruary = (currINDBahtFebruary * 100) / accounting.unformat(targetIND.Amt02);
    achieveINDBahtMarch = (currINDBahtMarch * 100) / accounting.unformat(targetIND.Amt03);
    achieveINDBahtApril = (currINDBahtApril * 100) / accounting.unformat(targetIND.Amt04);
    achieveINDBahtMay = (currINDBahtMay * 100) / accounting.unformat(targetIND.Amt05);
    achieveINDBahtJune = (currINDBahtJune * 100) / accounting.unformat(targetIND.Amt06);
    achieveINDBahtJuly = (currINDBahtJuly * 100) / accounting.unformat(targetIND.Amt07);
    achieveINDBahtAugust = (currINDBahtAugust * 100) / accounting.unformat(targetIND.Amt08);
    achieveINDBahtSeptember = (currINDBahtSeptember * 100) / accounting.unformat(targetIND.Amt09);
    achieveINDBahtOctober = (currINDBahtOctober * 100) / accounting.unformat(targetIND.Amt10);
    achieveINDBahtNovember = (currINDBahtNovember * 100) / accounting.unformat(targetIND.Amt11);
    achieveINDBahtDecember = (currINDBahtDecember * 100) / accounting.unformat(targetIND.Amt12);
    achieveINDBahtTotal = (currINDTotalBaht * 100) / totalINDBahtTarget;
    achieveINDBahtQ1 = (currINDBahtQ1 * 100) / accounting.unformat(targetIND.AmtQ1);
    achieveINDBahtQ2 = (currINDBahtQ2 * 100) / accounting.unformat(targetIND.AmtQ2);
    achieveINDBahtQ3 = (currINDBahtQ3 * 100) / accounting.unformat(targetIND.AmtQ3);
    achieveINDBahtQ4 = (currINDBahtQ4 * 100) / accounting.unformat(targetIND.AmtQ4);

    achieveINDUnitJanuary = (currINDUnitJanuary * 100) / accounting.unformat(targetIND.Unit01);
    achieveINDUnitFebruary = (currINDUnitFebruary * 100) / accounting.unformat(targetIND.Unit02);
    achieveINDUnitMarch = (currINDUnitMarch * 100) / accounting.unformat(targetIND.Unit03);
    achieveINDUnitApril = (currINDUnitApril * 100) / accounting.unformat(targetIND.Unit04);
    achieveINDUnitMay = (currINDUnitMay * 100) / accounting.unformat(targetIND.Unit05);
    achieveINDUnitJune = (currINDUnitJune * 100) / accounting.unformat(targetIND.Unit06);
    achieveINDUnitJuly = (currINDUnitJuly * 100) / accounting.unformat(targetIND.Unit07);
    achieveINDUnitAugust = (currINDUnitAugust * 100) / accounting.unformat(targetIND.Unit08);
    achieveINDUnitSeptember = (currINDUnitSeptember * 100) / accounting.unformat(targetIND.Unit09);
    achieveINDUnitOctober = (currINDUnitOctober * 100) / accounting.unformat(targetIND.Unit10);
    achieveINDUnitNovember = (currINDUnitNovember * 100) / accounting.unformat(targetIND.Unit11);
    achieveINDUnitDecember = (currINDUnitDecember * 100) / accounting.unformat(targetIND.Unit12);
    achieveINDUnitTotal = (currINDTotalUnit * 100) / totalINDUnitTarget;
    achieveINDUnitQ1 = (currINDUnitQ1 * 100) / accounting.unformat(targetIND.UnitQ1);
    achieveINDUnitQ2 = (currINDUnitQ2 * 100) / accounting.unformat(targetIND.UnitQ2);
    achieveINDUnitQ3 = (currINDUnitQ3 * 100) / accounting.unformat(targetIND.UnitQ3);
    achieveINDUnitQ4 = (currINDUnitQ4 * 100) / accounting.unformat(targetIND.UnitQ4);

    achieveOTHBahtJanuary = (currOTHBahtJanuary * 100) / accounting.unformat(targetOTH.Amt01);
    achieveOTHBahtFebruary = (currOTHBahtFebruary * 100) / accounting.unformat(targetOTH.Amt02);
    achieveOTHBahtMarch = (currOTHBahtMarch * 100) / accounting.unformat(targetOTH.Amt03);
    achieveOTHBahtApril = (currOTHBahtApril * 100) / accounting.unformat(targetOTH.Amt04);
    achieveOTHBahtMay = (currOTHBahtMay * 100) / accounting.unformat(targetOTH.Amt05);
    achieveOTHBahtJune = (currOTHBahtJune * 100) / accounting.unformat(targetOTH.Amt06);
    achieveOTHBahtJuly = (currOTHBahtJuly * 100) / accounting.unformat(targetOTH.Amt07);
    achieveOTHBahtAugust = (currOTHBahtAugust * 100) / accounting.unformat(targetOTH.Amt08);
    achieveOTHBahtSeptember = (currOTHBahtSeptember * 100) / accounting.unformat(targetOTH.Amt09);
    achieveOTHBahtOctober = (currOTHBahtOctober * 100) / accounting.unformat(targetOTH.Amt10);
    achieveOTHBahtNovember = (currOTHBahtNovember * 100) / accounting.unformat(targetOTH.Amt11);
    achieveOTHBahtDecember = (currOTHBahtDecember * 100) / accounting.unformat(targetOTH.Amt12);
    achieveOTHBahtTotal = (currOTHTotalBaht * 100) / totalOTHBahtTarget;
    achieveOTHBahtQ1 = (currOTHBahtQ1 * 100) / accounting.unformat(targetOTH.AmtQ1);
    achieveOTHBahtQ2 = (currOTHBahtQ2 * 100) / accounting.unformat(targetOTH.AmtQ2);
    achieveOTHBahtQ3 = (currOTHBahtQ3 * 100) / accounting.unformat(targetOTH.AmtQ3);
    achieveOTHBahtQ4 = (currOTHBahtQ4 * 100) / accounting.unformat(targetOTH.AmtQ4);

    achieveOTHUnitJanuary = (currOTHUnitJanuary * 100) / accounting.unformat(targetOTH.Unit01);
    achieveOTHUnitFebruary = (currOTHUnitFebruary * 100) / accounting.unformat(targetOTH.Unit02);
    achieveOTHUnitMarch = (currOTHUnitMarch * 100) / accounting.unformat(targetOTH.Unit03);
    achieveOTHUnitApril = (currOTHUnitApril * 100) / accounting.unformat(targetOTH.Unit04);
    achieveOTHUnitMay = (currOTHUnitMay * 100) / accounting.unformat(targetOTH.Unit05);
    achieveOTHUnitJune = (currOTHUnitJune * 100) / accounting.unformat(targetOTH.Unit06);
    achieveOTHUnitJuly = (currOTHUnitJuly * 100) / accounting.unformat(targetOTH.Unit07);
    achieveOTHUnitAugust = (currOTHUnitAugust * 100) / accounting.unformat(targetOTH.Unit08);
    achieveOTHUnitSeptember = (currOTHUnitSeptember * 100) / accounting.unformat(targetOTH.Unit09);
    achieveOTHUnitOctober = (currOTHUnitOctober * 100) / accounting.unformat(targetOTH.Unit10);
    achieveOTHUnitNovember = (currOTHUnitNovember * 100) / accounting.unformat(targetOTH.Unit11);
    achieveOTHUnitDecember = (currOTHUnitDecember * 100) / accounting.unformat(targetOTH.Unit12);
    achieveOTHUnitTotal = (currOTHTotalUnit * 100) / totalOTHUnitTarget;
    achieveOTHUnitQ1 = (currOTHUnitQ1 * 100) / accounting.unformat(targetOTH.UnitQ1);
    achieveOTHUnitQ2 = (currOTHUnitQ2 * 100) / accounting.unformat(targetOTH.UnitQ2);
    achieveOTHUnitQ3 = (currOTHUnitQ3 * 100) / accounting.unformat(targetOTH.UnitQ3);
    achieveOTHUnitQ4 = (currOTHUnitQ4 * 100) / accounting.unformat(targetOTH.UnitQ4);

    var currTotalBaht = currNPTotalBaht + currEBTotalBaht + currINDTotalBaht + currOTHTotalBaht,
        currTotalUnit = currNPTotalUnit + currEBTotalUnit + currINDTotalUnit + currOTHTotalUnit,
        oldTotalBaht = oldNPTotalBaht + oldEBTotalBaht + oldINDTotalBaht + oldOTHTotalBaht,
        oldTotalUnit = oldNPTotalUnit + oldEBTotalUnit + oldINDTotalUnit + oldOTHTotalUnit,
        currUnitJanuary = currNPUnitJanuary + currEBUnitJanuary + currINDUnitJanuary + currOTHUnitJanuary,
        currUnitFebruary = currNPUnitFebruary + currEBUnitFebruary + currINDUnitFebruary + currOTHUnitFebruary,
        currUnitMarch = currNPUnitMarch + currEBUnitMarch + currINDUnitMarch + currOTHUnitMarch,
        currUnitApril = currNPUnitApril + currEBUnitApril + currINDUnitApril + currOTHUnitApril,
        currUnitMay = currNPUnitMay + currEBUnitMay + currINDUnitMay + currOTHUnitMay,
        currUnitJune = currNPUnitJune + currEBUnitJune + currINDUnitJune + currOTHUnitJune,
        currUnitJuly = currNPUnitJuly + currEBUnitJuly + currINDUnitJuly + currOTHUnitJuly,
        currUnitAugust = currNPUnitAugust + currEBUnitAugust + currINDUnitAugust + currOTHUnitAugust,
        currUnitSeptember = currNPUnitSeptember + currEBUnitSeptember + currINDUnitSeptember + currOTHUnitSeptember,
        currUnitOctober = currNPUnitOctober + currEBUnitOctober + currINDUnitOctober + currOTHUnitOctober,
        currUnitNovember = currNPUnitNovember + currEBUnitNovember + currINDUnitNovember + currOTHUnitNovember,
        currUnitDecember = currNPUnitDecember + currEBUnitDecember + currINDUnitDecember + currOTHUnitDecember,
        currBahtJanuary = currNPBahtJanuary + currEBBahtJanuary + currINDBahtJanuary + currOTHBahtJanuary,
        currBahtFebruary = currNPBahtFebruary + currEBBahtFebruary + currINDBahtFebruary + currOTHBahtFebruary,
        currBahtMarch = currNPBahtMarch + currEBBahtMarch + currINDBahtMarch + currOTHBahtMarch,
        currBahtApril = currNPBahtApril + currEBBahtApril + currINDBahtApril + currOTHBahtApril,
        currBahtMay = currNPBahtMay + currEBBahtMay + currINDBahtMay + currEBBahtMay,
        currBahtJune = currNPBahtJune + currEBBahtJune + currINDBahtJune + currOTHBahtJune,
        currBahtJuly = currNPBahtJuly + currEBBahtJuly + currINDBahtJuly + currOTHBahtJuly,
        currBahtAugust = currNPBahtAugust + currEBBahtAugust + currINDBahtAugust + currOTHBahtAugust,
        currBahtSeptember = currNPBahtSeptember + currEBBahtSeptember + currINDBahtSeptember + currOTHBahtSeptember,
        currBahtOctober = currNPBahtOctober + currEBBahtOctober + currINDBahtOctober + currOTHBahtOctober,
        currBahtNovember = currNPBahtNovember + currEBBahtNovember + currINDBahtNovember + currOTHBahtNovember,
        currBahtDecember = currNPBahtDecember + currEBBahtDecember + currINDBahtDecember + currOTHBahtDecember,
        currUnitQ1 = currNPUnitQ1 + currEBUnitQ1 + currINDUnitQ1 + currOTHUnitQ1,
        currBahtQ1 = currNPBahtQ1 + currEBBahtQ1 + currINDBahtQ1 + currOTHBahtQ1,
        currUnitQ2 = currNPUnitQ2 + currEBUnitQ2 + currINDUnitQ2 + currOTHUnitQ2,
        currBahtQ2 = currNPBahtQ2 + currEBBahtQ2 + currINDBahtQ2 + currOTHBahtQ2,
        currUnitQ3 = currNPUnitQ3 + currEBUnitQ3 + currINDUnitQ3 + currOTHUnitQ3,
        currBahtQ3 = currNPBahtQ3 + currEBBahtQ3 + currINDBahtQ3 + currOTHBahtQ3,
        currUnitQ4 = currNPUnitQ4 + currEBUnitQ4 + currINDUnitQ4 + currOTHUnitQ4,
        currBahtQ4 = currNPBahtQ4 + currEBBahtQ4 + currINDBahtQ4 + currOTHBahtQ4,
        oldUnitJanuary = oldNPUnitJanuary + oldEBUnitJanuary + oldINDUnitJanuary + oldOTHUnitJanuary,
        oldUnitFebruary = oldNPUnitFebruary + oldEBUnitFebruary + oldINDUnitFebruary + oldOTHUnitFebruary,
        oldUnitMarch = oldNPUnitMarch + oldEBUnitMarch + oldINDUnitMarch + oldOTHUnitMarch,
        oldUnitApril = oldNPUnitApril + oldEBUnitApril + oldINDUnitApril + oldOTHUnitApril,
        oldUnitMay = oldNPUnitMay + oldEBUnitMay + oldINDUnitMay + oldOTHUnitMay,
        oldUnitJune = oldNPUnitJune + oldEBUnitJune + oldINDUnitJune + oldOTHUnitJune,
        oldUnitJuly = oldNPUnitJuly + oldEBUnitJuly + oldINDUnitJuly + oldOTHUnitJuly,
        oldUnitAugust = oldNPUnitAugust + oldEBUnitAugust + oldINDUnitAugust + oldOTHUnitAugust,
        oldUnitSeptember = oldNPUnitSeptember + oldEBUnitSeptember + oldINDUnitSeptember + oldOTHUnitSeptember,
        oldUnitOctober = oldNPUnitOctober + oldEBUnitOctober + oldINDUnitOctober + oldOTHUnitOctober,
        oldUnitNovember = oldNPUnitNovember + oldEBUnitNovember + oldINDUnitNovember + oldOTHUnitNovember,
        oldUnitDecember = oldNPUnitDecember + oldEBUnitDecember + oldINDUnitDecember + oldOTHUnitDecember,
        oldBahtJanuary = oldNPBahtJanuary + oldEBBahtJanuary + oldINDBahtJanuary + oldOTHBahtJanuary,
        oldBahtFebruary = oldNPBahtFebruary + oldEBBahtFebruary + oldINDBahtFebruary + oldOTHBahtFebruary,
        oldBahtMarch = oldNPBahtMarch + oldEBBahtMarch + oldINDBahtMarch + oldOTHBahtMarch,
        oldBahtApril = oldNPBahtApril + oldEBBahtApril + oldINDBahtApril + oldOTHBahtApril,
        oldBahtMay = oldNPBahtMay + oldEBBahtMay + oldINDBahtMay + oldOTHBahtMay,
        oldBahtJune = oldNPBahtJune + oldEBBahtJune + oldINDBahtJune + oldOTHBahtJune,
        oldBahtJuly = oldNPBahtJuly + oldEBBahtJuly + oldINDBahtJuly + oldOTHBahtJuly,
        oldBahtAugust = oldNPBahtAugust + oldEBBahtAugust + oldINDBahtAugust + oldOTHBahtAugust,
        oldBahtSeptember = oldNPBahtSeptember + oldEBBahtSeptember + oldINDBahtSeptember + oldOTHBahtSeptember,
        oldBahtOctober = oldNPBahtOctober + oldEBBahtOctober + oldINDBahtOctober + oldOTHBahtOctober,
        oldBahtNovember = oldNPBahtNovember + oldEBBahtNovember + oldINDBahtNovember + oldOTHBahtNovember,
        oldBahtDecember = oldNPBahtDecember + oldEBBahtDecember + oldINDBahtDecember + oldOTHBahtDecember,
        oldUnitQ1 = oldNPUnitQ1 + oldEBUnitQ1 + oldINDUnitQ1 + oldOTHUnitQ1,
        oldBahtQ1 = oldNPBahtQ1 + oldEBBahtQ1 + oldINDBahtQ1 + oldOTHBahtQ1,
        oldUnitQ2 = oldNPUnitQ2 + oldEBUnitQ2 + oldINDUnitQ2 + oldOTHUnitQ2,
        oldBahtQ2 = oldNPBahtQ2 + oldEBBahtQ2 + oldINDBahtQ2 + oldOTHBahtQ2,
        oldUnitQ3 = oldNPUnitQ3 + oldEBUnitQ3 + oldINDUnitQ3 + oldOTHUnitQ3,
        oldBahtQ3 = oldNPBahtQ3 + oldEBBahtQ3 + oldINDBahtQ3 + oldOTHBahtQ3,
        oldUnitQ4 = oldNPUnitQ4 + oldEBUnitQ4 + oldINDUnitQ4 + oldOTHUnitQ4,
        oldBahtQ4 = oldNPBahtQ4 + oldEBBahtQ4 + oldINDBahtQ4 + oldOTHBahtQ4;

    var totalBahtTarget = (accounting.unformat(targetNP.AmtQ1) + accounting.unformat(targetNP.AmtQ2) + accounting.unformat(targetNP.AmtQ3) + accounting.unformat(targetNP.AmtQ4) + accounting.unformat(targetEB.AmtQ1) + accounting.unformat(targetEB.AmtQ2) + accounting.unformat(targetEB.AmtQ3) + accounting.unformat(targetEB.AmtQ4)) + (accounting.unformat(targetIND.AmtQ1) + accounting.unformat(targetIND.AmtQ2) + accounting.unformat(targetIND.AmtQ3) + accounting.unformat(targetIND.AmtQ4) + accounting.unformat(targetOTH.AmtQ1) + accounting.unformat(targetOTH.AmtQ2) + accounting.unformat(targetOTH.AmtQ3) + accounting.unformat(targetOTH.AmtQ4));
    var totalUnitTarget = (accounting.unformat(targetNP.UnitQ1) + accounting.unformat(targetNP.UnitQ2) + accounting.unformat(targetNP.UnitQ3) + accounting.unformat(targetNP.UnitQ4) + accounting.unformat(targetEB.UnitQ1) + accounting.unformat(targetEB.UnitQ2) + accounting.unformat(targetEB.UnitQ3) + accounting.unformat(targetEB.UnitQ4)) + (accounting.unformat(targetIND.UnitQ1) + accounting.unformat(targetIND.UnitQ2) + accounting.unformat(targetIND.UnitQ3) + accounting.unformat(targetIND.UnitQ4) + accounting.unformat(targetOTH.UnitQ1) + accounting.unformat(targetOTH.UnitQ2) + accounting.unformat(targetOTH.UnitQ3) + accounting.unformat(targetOTH.UnitQ4));

    var achieveBahtJanuary = (((currNPBahtJanuary + currEBBahtJanuary + currINDBahtJanuary + currOTHBahtJanuary) * 100) / (accounting.unformat(targetNP.Amt01) + accounting.unformat(targetEB.Amt01) + accounting.unformat(targetIND.Amt01) + accounting.unformat(targetOTH.Amt01))),
        achieveBahtFebruary = (((currNPBahtFebruary + currEBBahtFebruary + currINDBahtFebruary + currOTHBahtFebruary) * 100) / (accounting.unformat(targetNP.Amt02) + accounting.unformat(targetEB.Amt02) + accounting.unformat(targetIND.Amt02) + accounting.unformat(targetOTH.Amt02))),
        achieveBahtMarch = (((currNPBahtMarch + currEBBahtMarch + currINDBahtMarch + currOTHBahtMarch) * 100) / (accounting.unformat(targetNP.Amt03) + accounting.unformat(targetEB.Amt03) + accounting.unformat(targetIND.Amt03) + accounting.unformat(targetOTH.Amt03))),
        achieveBahtApril = (((currNPBahtApril + currEBBahtApril + currINDBahtApril + currOTHBahtApril) * 100) / (accounting.unformat(targetNP.Amt04) + accounting.unformat(targetEB.Amt04) + accounting.unformat(targetIND.Amt04) + accounting.unformat(targetOTH.Amt04))),
        achieveBahtMay = (((currNPBahtMay + currEBBahtMay + currINDBahtMay + currOTHBahtMay) * 100) / (accounting.unformat(targetNP.Amt05) + accounting.unformat(targetEB.Amt05) + accounting.unformat(targetIND.Amt05) + accounting.unformat(targetOTH.Amt05))),
        achieveBahtJune = (((currNPBahtJune + currEBBahtJune + currINDBahtJune + currOTHBahtJune) * 100) / (accounting.unformat(targetNP.Amt06) + accounting.unformat(targetEB.Amt06) + accounting.unformat(targetIND.Amt06) + accounting.unformat(targetOTH.Amt06))),
        achieveBahtJuly = (((currNPBahtJuly + currEBBahtJuly + currINDBahtJuly + currOTHBahtJuly) * 100) / (accounting.unformat(targetNP.Amt07) + accounting.unformat(targetEB.Amt07) + accounting.unformat(targetIND.Amt07) + accounting.unformat(targetOTH.Amt07))),
        achieveBahtAugust = (((currNPBahtAugust + currEBBahtAugust + currINDBahtAugust + currOTHBahtAugust) * 100) / (accounting.unformat(targetNP.Amt08) + accounting.unformat(targetEB.Amt08) + accounting.unformat(targetIND.Amt08) + accounting.unformat(targetOTH.Amt08))),
        achieveBahtSeptember = (((currNPBahtSeptember + currEBBahtSeptember + currINDBahtSeptember + currOTHBahtSeptember) * 100) / (accounting.unformat(targetNP.Amt09) + accounting.unformat(targetEB.Amt09) + accounting.unformat(targetIND.Amt09) + accounting.unformat(targetOTH.Amt09))),
        achieveBahtOctober = (((currNPBahtOctober + currEBBahtOctober + currINDBahtOctober + currOTHBahtOctober) * 100) / (accounting.unformat(targetNP.Amt10) + accounting.unformat(targetEB.Amt10) + accounting.unformat(targetIND.Amt10) + accounting.unformat(targetOTH.Amt10))),
        achieveBahtNovember = (((currNPBahtNovember + currEBBahtNovember + currINDBahtNovember + currOTHBahtNovember) * 100) / (accounting.unformat(targetNP.Amt11) + accounting.unformat(targetEB.Amt11) + accounting.unformat(targetIND.Amt11) + accounting.unformat(targetOTH.Amt11))),
        achieveBahtDecember = (((currNPBahtDecember + currEBBahtDecember + currINDBahtDecember + currOTHBahtDecember) * 100) / (accounting.unformat(targetNP.Amt12) + accounting.unformat(targetEB.Amt12) + accounting.unformat(targetIND.Amt12) + accounting.unformat(targetOTH.Amt12))),
        achieveBahtTotal = (currTotalBaht * 100) / totalBahtTarget,
        achieveBahtQ1 = (((currNPBahtQ1 + currEBBahtQ1 + currINDBahtQ1 + currOTHBahtQ1) * 100) / (accounting.unformat(targetNP.AmtQ1) + accounting.unformat(targetEB.AmtQ1) + accounting.unformat(targetIND.AmtQ1) + accounting.unformat(targetOTH.AmtQ1))),
        achieveUnitQ1 = (((currNPUnitQ1 + currEBUnitQ1 + currINDUnitQ1 + currOTHUnitQ1) * 100) / (accounting.unformat(targetNP.UnitQ1) + accounting.unformat(targetEB.UnitQ1) + accounting.unformat(targetIND.UnitQ1) + accounting.unformat(targetOTH.UnitQ1))),
        achieveBahtQ2 = (((currNPBahtQ2 + currEBBahtQ2 + currINDBahtQ2 + currOTHBahtQ2) * 100) / (accounting.unformat(targetNP.AmtQ2) + accounting.unformat(targetEB.AmtQ2) + accounting.unformat(targetIND.AmtQ2) + accounting.unformat(targetOTH.AmtQ2))),
        achieveUnitQ2 = (((currNPUnitQ2 + currEBUnitQ2 + currINDUnitQ2 + currOTHUnitQ2) * 100) / (accounting.unformat(targetNP.UnitQ2) + accounting.unformat(targetEB.UnitQ2) + accounting.unformat(targetIND.UnitQ2) + accounting.unformat(targetOTH.UnitQ2))),
        achieveBahtQ3 = (((currNPBahtQ3 + currEBBahtQ3 + currINDBahtQ3 + currOTHBahtQ3) * 100) / (accounting.unformat(targetNP.AmtQ3) + accounting.unformat(targetEB.AmtQ3) + accounting.unformat(targetIND.AmtQ3) + accounting.unformat(targetOTH.AmtQ3))),
        achieveUnitQ3 = (((currNPUnitQ3 + currEBUnitQ3 + currINDUnitQ3 + currOTHUnitQ3) * 100) / (accounting.unformat(targetNP.UnitQ3) + accounting.unformat(targetEB.UnitQ3) + accounting.unformat(targetIND.UnitQ3) + accounting.unformat(targetOTH.UnitQ3))),
        achieveBahtQ4 = (((currNPBahtQ4 + currEBBahtQ4 + currINDBahtQ4 + currOTHBahtQ4) * 100) / (accounting.unformat(targetNP.AmtQ4) + accounting.unformat(targetEB.AmtQ4) + accounting.unformat(targetIND.AmtQ4) + accounting.unformat(targetOTH.AmtQ4))),
        achieveUnitQ4 = (((currNPUnitQ4 + currEBUnitQ4 + currINDUnitQ4 + currOTHUnitQ4) * 100) / (accounting.unformat(targetNP.UnitQ4) + accounting.unformat(targetEB.UnitQ4) + accounting.unformat(targetIND.UnitQ4) + accounting.unformat(targetOTH.UnitQ4))),
        growthBahtJanuary = (((currNPBahtJanuary + currEBBahtJanuary + currINDBahtJanuary + currOTHBahtJanuary) - (oldNPBahtJanuary + oldEBBahtJanuary + oldINDBahtJanuary + oldOTHBahtJanuary)) * 100) / (oldNPBahtJanuary + oldEBBahtJanuary + oldINDBahtJanuary + oldOTHBahtJanuary),
        growthBahtFebruary = (((currNPBahtFebruary + currEBBahtFebruary + currINDBahtFebruary + currOTHBahtFebruary) - (oldNPBahtFebruary + oldEBBahtFebruary + oldINDBahtFebruary + oldOTHBahtFebruary)) * 100) / (oldNPBahtFebruary + oldEBBahtFebruary + oldINDBahtFebruary + oldOTHBahtFebruary),
        growthBahtMarch = (((currNPBahtMarch + currEBBahtMarch + currINDBahtMarch + currOTHBahtMarch) - (oldNPBahtMarch + oldEBBahtMarch + oldINDBahtMarch + oldOTHBahtMarch)) * 100) / (oldNPBahtMarch + oldEBBahtMarch + oldINDBahtMarch + oldOTHBahtMarch),
        growthBahtApril = (((currNPBahtApril + currEBBahtApril + currINDBahtApril + currOTHBahtApril) - (oldNPBahtApril + oldEBBahtApril + oldINDBahtApril + oldOTHBahtApril)) * 100) / (oldNPBahtApril + oldEBBahtApril + oldINDBahtApril + oldOTHBahtApril),
        growthBahtMay = (((currNPBahtMay + currEBBahtMay + currINDBahtMay + currOTHBahtMay) - (oldNPBahtMay + oldEBBahtMay + oldINDBahtMay + oldOTHBahtMay)) * 100) / (oldNPBahtMay + oldEBBahtMay + oldINDBahtMay + oldOTHBahtMay),
        growthBahtJune = (((currNPBahtJune + currEBBahtJune + currINDBahtJune + currOTHBahtJune) - (oldNPBahtJune + oldEBBahtJune + oldINDBahtJune + oldOTHBahtJune)) * 100) / (oldNPBahtJune + oldEBBahtJune + oldINDBahtJune + oldOTHBahtJune),
        growthBahtJuly = (((currNPBahtJuly + currEBBahtJuly + currINDBahtJuly + currOTHBahtJuly) - (oldNPBahtJuly + oldEBBahtJuly + oldINDBahtJuly + oldOTHBahtJuly)) * 100) / (oldNPBahtJuly + oldEBBahtJuly + oldINDBahtJuly + oldOTHBahtJuly),
        growthBahtAugust = (((currNPBahtAugust + currEBBahtAugust + currINDBahtAugust + currOTHBahtAugust) - (oldNPBahtAugust + oldEBBahtAugust + oldINDBahtAugust + oldOTHBahtAugust)) * 100) / (oldNPBahtAugust + oldEBBahtAugust + oldINDBahtAugust + oldOTHBahtAugust),
        growthBahtSeptember = (((currNPBahtSeptember + currEBBahtSeptember + currINDBahtSeptember + currOTHBahtSeptember) - (oldNPBahtSeptember + oldEBBahtSeptember + oldINDBahtSeptember + oldOTHBahtSeptember)) * 100) / (oldNPBahtSeptember + oldEBBahtSeptember + oldINDBahtSeptember + oldOTHBahtSeptember),
        growthBahtOctober = (((currNPBahtOctober + currEBBahtOctober + currINDBahtOctober + currOTHBahtOctober) - (oldNPBahtOctober + oldEBBahtOctober + oldINDBahtOctober + oldOTHBahtOctober)) * 100) / (oldNPBahtOctober + oldEBBahtOctober + oldINDBahtOctober + oldOTHBahtOctober),
        growthBahtNovember = (((currNPBahtNovember + currEBBahtNovember + currINDBahtNovember + currOTHBahtNovember) - (oldNPBahtNovember + oldEBBahtNovember + oldINDBahtNovember + oldOTHBahtNovember)) * 100) / (oldNPBahtNovember + oldEBBahtNovember + oldINDBahtNovember + oldOTHBahtNovember),
        growthBahtDecember = (((currNPBahtDecember + currEBBahtDecember + currINDBahtDecember + currOTHBahtDecember) - (oldNPBahtDecember + oldEBBahtDecember + oldINDBahtDecember + oldOTHBahtDecember)) * 100) / (oldNPBahtDecember + oldEBBahtDecember + oldINDBahtDecember + oldOTHBahtDecember),
        growthBahtTotal = ((currTotalBaht - oldTotalBaht) * 100) / oldTotalBaht,
        achieveUnitJanuary = (((currNPUnitJanuary + currEBUnitJanuary + currINDUnitJanuary + currOTHUnitJanuary) * 100) / (accounting.unformat(targetNP.Unit01) + accounting.unformat(targetEB.Unit01) + accounting.unformat(targetIND.Unit01) + accounting.unformat(targetOTH.Unit01))),
        achieveUnitFebruary = (((currNPUnitFebruary + currEBUnitFebruary + currINDUnitFebruary + currOTHUnitFebruary) * 100) / (accounting.unformat(targetNP.Unit02) + accounting.unformat(targetEB.Unit02) + accounting.unformat(targetIND.Unit02) + accounting.unformat(targetOTH.Unit02))),
        achieveUnitMarch = (((currNPUnitMarch + currEBUnitMarch + currINDUnitMarch + currOTHUnitMarch) * 100) / (accounting.unformat(targetNP.Unit03) + accounting.unformat(targetEB.Unit03) + accounting.unformat(targetIND.Unit03) + accounting.unformat(targetOTH.Unit03))),
        achieveUnitApril = (((currNPUnitApril + currEBUnitApril + currINDUnitApril + currOTHUnitApril) * 100) / (accounting.unformat(targetNP.Unit04) + accounting.unformat(targetEB.Unit04) + accounting.unformat(targetIND.Unit04) + accounting.unformat(targetOTH.Unit04))),
        achieveUnitMay = (((currNPUnitMay + currEBUnitMay + currINDUnitMay + currOTHUnitMay) * 100) / (accounting.unformat(targetNP.Unit05) + accounting.unformat(targetEB.Unit05) + accounting.unformat(targetIND.Unit05) + accounting.unformat(targetOTH.Unit05))),
        achieveUnitJune = (((currNPUnitJune + currEBUnitJune + currINDUnitJune + currOTHUnitJune) * 100) / (accounting.unformat(targetNP.Unit06) + accounting.unformat(targetEB.Unit06) + accounting.unformat(targetIND.Unit06) + accounting.unformat(targetOTH.Unit06))),
        achieveUnitJuly = (((currNPUnitJuly + currEBUnitJuly + currINDUnitJuly + currOTHUnitJuly) * 100) / (accounting.unformat(targetNP.Unit07) + accounting.unformat(targetEB.Unit07) + accounting.unformat(targetIND.Unit07) + accounting.unformat(targetOTH.Unit07))),
        achieveUnitAugust = (((currNPUnitAugust + currEBUnitAugust + currINDUnitAugust + currOTHUnitAugust) * 100) / (accounting.unformat(targetNP.Unit08) + accounting.unformat(targetEB.Unit08) + accounting.unformat(targetIND.Unit08) + accounting.unformat(targetOTH.Unit08))),
        achieveUnitSeptember = (((currNPUnitSeptember + currEBUnitSeptember + currINDUnitSeptember + currOTHUnitSeptember) * 100) / (accounting.unformat(targetNP.Unit09) + accounting.unformat(targetEB.Unit09) + accounting.unformat(targetIND.Unit09) + accounting.unformat(targetOTH.Unit09))),
        achieveUnitOctober = (((currNPUnitOctober + currEBUnitOctober + currINDUnitOctober + currOTHUnitOctober) * 100) / (accounting.unformat(targetNP.Unit10) + accounting.unformat(targetEB.Unit10) + accounting.unformat(targetIND.Unit10) + accounting.unformat(targetOTH.Unit10))),
        achieveUnitNovember = (((currNPUnitNovember + currEBUnitNovember + currINDUnitNovember + currOTHUnitNovember) * 100) / (accounting.unformat(targetNP.Unit11) + accounting.unformat(targetEB.Unit11) + accounting.unformat(targetIND.Unit11) + accounting.unformat(targetOTH.Unit11))),
        achieveUnitDecember = (((currNPUnitDecember + currEBUnitDecember + currINDUnitDecember + currOTHUnitDecember) * 100) / (accounting.unformat(targetNP.Unit12) + accounting.unformat(targetEB.Unit12) + accounting.unformat(targetIND.Unit12) + accounting.unformat(targetOTH.Unit12))),
        achieveUnitTotal = (currTotalUnit * 100) / totalUnitTarget,
        growthUnitJanuary = (((currNPUnitJanuary + currEBUnitJanuary + currINDUnitJanuary + currOTHUnitJanuary) - (oldNPUnitJanuary + oldEBUnitJanuary + oldINDUnitJanuary + oldOTHUnitJanuary)) * 100) / (oldNPUnitJanuary + oldEBUnitJanuary + oldINDUnitJanuary + oldOTHUnitJanuary),
        growthUnitFebruary = (((currNPUnitFebruary + currEBUnitFebruary + currINDUnitFebruary + currOTHUnitFebruary) - (oldNPUnitFebruary + oldEBUnitFebruary + oldINDUnitFebruary + oldOTHUnitFebruary)) * 100) / (oldNPUnitFebruary + oldEBUnitFebruary + oldINDUnitFebruary + oldOTHUnitFebruary),
        growthUnitMarch = (((currNPUnitMarch + currEBUnitMarch + currINDUnitMarch + currOTHUnitMarch) - (oldNPUnitMarch + oldEBUnitMarch + oldINDUnitMarch + oldOTHUnitMarch)) * 100) / (oldNPUnitMarch + oldEBUnitMarch + oldINDUnitMarch + oldOTHUnitMarch),
        growthUnitApril = (((currNPUnitApril + currEBUnitApril + currINDUnitApril + currOTHUnitApril) - (oldNPUnitApril + oldEBUnitApril + oldINDUnitApril + oldOTHUnitApril)) * 100) / (oldNPUnitApril + oldEBUnitApril + oldINDUnitApril + oldOTHUnitApril),
        growthUnitMay = (((currNPUnitMay + currEBUnitMay + currINDUnitMay + currOTHUnitMay) - (oldNPUnitMay + oldEBUnitMay + oldINDUnitMay + oldOTHUnitMay)) * 100) / (oldNPUnitMay + oldEBUnitMay + oldINDUnitMay + oldOTHUnitMay),
        growthUnitJune = (((currNPUnitJune + currEBUnitJune + currINDUnitJune + currOTHUnitJune) - (oldNPUnitJune + oldEBUnitJune + oldINDUnitJune + oldOTHUnitJune)) * 100) / (oldNPUnitJune + oldEBUnitJune + oldINDUnitJune + oldOTHUnitJune),
        growthUnitJuly = (((currNPUnitJuly + currEBUnitJuly + currINDUnitJuly + currOTHUnitJuly) - (oldNPUnitJuly + oldEBUnitJuly + oldINDUnitJuly + oldOTHUnitJuly)) * 100) / (oldNPUnitJuly + oldEBUnitJuly + oldINDUnitJuly + oldOTHUnitJuly),
        growthUnitAugust = (((currNPUnitAugust + currEBUnitAugust + currINDUnitAugust + currOTHUnitAugust) - (oldNPUnitAugust + oldEBUnitAugust + oldINDUnitAugust + oldOTHUnitAugust)) * 100) / (oldNPUnitAugust + oldEBUnitAugust + oldINDUnitAugust + oldOTHUnitAugust),
        growthUnitSeptember = (((currNPUnitSeptember + currEBUnitSeptember + currINDUnitSeptember + currOTHUnitSeptember) - (oldNPUnitSeptember + oldEBUnitSeptember + oldINDUnitSeptember + oldOTHUnitSeptember)) * 100) / (oldNPUnitSeptember + oldEBUnitSeptember + oldINDUnitSeptember + oldOTHUnitSeptember),
        growthUnitOctober = (((currNPUnitOctober + currEBUnitOctober + currINDUnitOctober + currOTHUnitOctober) - (oldNPUnitOctober + oldEBUnitOctober + oldINDUnitOctober + oldOTHUnitOctober)) * 100) / (oldNPUnitOctober + oldEBUnitOctober + oldINDUnitOctober + oldOTHUnitOctober),
        growthUnitNovember = (((currNPUnitNovember + currEBUnitNovember + currINDUnitNovember + currOTHUnitNovember) - (oldNPUnitNovember + oldEBUnitNovember + oldINDUnitNovember + oldOTHUnitNovember)) * 100) / (oldNPUnitNovember + oldEBUnitNovember + oldINDUnitNovember + oldOTHUnitNovember),
        growthUnitDecember = (((currNPUnitDecember + currEBUnitDecember + currINDUnitDecember + currOTHUnitDecember) - (oldNPUnitDecember + oldEBUnitDecember + oldINDUnitDecember + oldOTHUnitDecember)) * 100) / (oldNPUnitDecember + oldEBUnitDecember + oldINDUnitDecember + oldOTHUnitDecember),
        growthUnitTotal = ((currTotalUnit - oldTotalUnit) * 100) / oldTotalUnit,
        growthBahtQ1 = (((currNPBahtQ1 + currEBBahtQ1 + currINDBahtQ1 + currOTHBahtQ1) - (oldNPBahtQ1 + oldEBBahtQ1 + oldINDBahtQ1 + oldOTHBahtQ1)) * 100) / (oldNPBahtQ1 + oldEBBahtQ1 + oldINDBahtQ1 + oldOTHBahtQ1),
        growthUnitQ1 = (((currNPUnitQ1 + currEBUnitQ1 + currINDUnitQ1 + currOTHUnitQ1) - (oldNPUnitQ1 + oldEBUnitQ1 + oldINDUnitQ1 + oldOTHUnitQ1)) * 100) / (oldNPUnitQ1 + oldEBUnitQ1 + oldINDUnitQ1 + oldOTHUnitQ1),
        growthBahtQ2 = (((currNPBahtQ2 + currEBBahtQ2 + currINDBahtQ2 + currOTHBahtQ2) - (oldNPBahtQ2 + oldEBBahtQ2 + oldINDBahtQ2 + oldOTHBahtQ2)) * 100) / (oldNPBahtQ2 + oldEBBahtQ2 + oldINDBahtQ2 + oldOTHBahtQ2),
        growthUnitQ2 = (((currNPUnitQ2 + currEBUnitQ2 + currINDUnitQ2 + currOTHUnitQ2) - (oldNPUnitQ2 + oldEBUnitQ2 + oldINDUnitQ2 + oldOTHUnitQ2)) * 100) / (oldNPUnitQ2 + oldEBUnitQ2 + oldINDUnitQ2 + oldOTHUnitQ2),
        growthBahtQ3 = (((currNPBahtQ3 + currEBBahtQ3 + currINDBahtQ3 + currOTHBahtQ3) - (oldNPBahtQ3 + oldEBBahtQ3 + oldINDBahtQ3 + oldOTHBahtQ3)) * 100) / (oldNPBahtQ3 + oldEBBahtQ3 + oldINDBahtQ3 + oldOTHBahtQ3),
        growthUnitQ3 = (((currNPUnitQ3 + currEBUnitQ3 + currINDUnitQ3 + currOTHUnitQ3) - (oldNPUnitQ3 + oldEBUnitQ3 + oldINDUnitQ3 + oldOTHUnitQ3)) * 100) / (oldNPUnitQ3 + oldEBUnitQ3 + oldINDUnitQ3 + oldOTHUnitQ3),
        growthBahtQ4 = (((currNPBahtQ4 + currEBBahtQ4 + currINDBahtQ4 + currOTHBahtQ4) - (oldNPBahtQ4 + oldEBBahtQ4 + oldINDBahtQ4 + oldOTHBahtQ4)) * 100) / (oldNPBahtQ4 + oldEBBahtQ4 + oldINDBahtQ4 + oldOTHBahtQ4),
        growthUnitQ4 = (((currNPUnitQ4 + currEBUnitQ4 + currINDUnitQ4 + currOTHUnitQ4) - (oldNPUnitQ4 + oldEBUnitQ4 + oldINDUnitQ4 + oldOTHUnitQ4)) * 100) / (oldNPUnitQ4 + oldEBUnitQ4 + oldINDUnitQ4 + oldOTHUnitQ4);


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

    //NP        
    $('#npBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetNP.AmtQ1), 2));
    $('#npBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetNP.AmtQ2), 2));
    $('#npBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetNP.AmtQ3), 2));
    $('#npBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetNP.AmtQ4), 2));
    $('#npBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetNP.Amt01) / 1000, 2));
    $('#npBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetNP.Amt02) / 1000, 2));
    $('#npBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetNP.Amt03) / 1000, 2));
    $('#npBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetNP.Amt04) / 1000, 2));
    $('#npBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetNP.Amt05) / 1000, 2));
    $('#npBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetNP.Amt06) / 1000, 2));
    $('#npBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetNP.Amt07) / 1000, 2));
    $('#npBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetNP.Amt08) / 1000, 2));
    $('#npBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetNP.Amt09) / 1000, 2));
    $('#npBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetNP.Amt10) / 1000, 2));
    $('#npBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetNP.Amt11) / 1000, 2));
    $('#npBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetNP.Amt12) / 1000, 2));
    $('#npBahtTargetNowTotal').html(accounting.formatNumber(totalNPBahtTarget / 1000, 2));
    $('#npBahtTargetNowQTotal').html(accounting.formatNumber(totalNPBahtTarget, 2));

    $('#npUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetNP.UnitQ1)));
    $('#npUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetNP.UnitQ2)));
    $('#npUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetNP.UnitQ3)));
    $('#npUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetNP.UnitQ4)));
    $('#npUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetNP.Unit01)));
    $('#npUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetNP.Unit02)));
    $('#npUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetNP.Unit03)));
    $('#npUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetNP.Unit04)));
    $('#npUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetNP.Unit05)));
    $('#npUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetNP.Unit06)));
    $('#npUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetNP.Unit07)));
    $('#npUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetNP.Unit08)));
    $('#npUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetNP.Unit09)));
    $('#npUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetNP.Unit10)));
    $('#npUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetNP.Unit11)));
    $('#npUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetNP.Unit12)));
    $('#npUnitTargetNowTotal').html(accounting.formatNumber(totalNPUnitTarget));
    $('#npUnitTargetNowQTotal').html(accounting.formatNumber(totalNPUnitTarget));

    $('#npBahtActualNowQ1').html(accounting.formatNumber(currNPBahtQ1, 2));
    $('#npBahtActualNowQ2').html(accounting.formatNumber(currNPBahtQ2, 2));
    $('#npBahtActualNowQ3').html(accounting.formatNumber(currNPBahtQ3, 2));
    $('#npBahtActualNowQ4').html(accounting.formatNumber(currNPBahtQ4, 2));
    $('#npBahtActualNow1').html(accounting.formatNumber(currNPBahtJanuary / 1000, 2));
    $('#npBahtActualNow2').html(accounting.formatNumber(currNPBahtFebruary / 1000, 2));
    $('#npBahtActualNow3').html(accounting.formatNumber(currNPBahtMarch / 1000, 2));
    $('#npBahtActualNow4').html(accounting.formatNumber(currNPBahtApril / 1000, 2));
    $('#npBahtActualNow5').html(accounting.formatNumber(currNPBahtMay / 1000, 2));
    $('#npBahtActualNow6').html(accounting.formatNumber(currNPBahtJune / 1000, 2));
    $('#npBahtActualNow7').html(accounting.formatNumber(currNPBahtJuly / 1000, 2));
    $('#npBahtActualNow8').html(accounting.formatNumber(currNPBahtAugust / 1000, 2));
    $('#npBahtActualNow9').html(accounting.formatNumber(currNPBahtSeptember / 1000, 2));
    $('#npBahtActualNow10').html(accounting.formatNumber(currNPBahtOctober / 1000, 2));
    $('#npBahtActualNow11').html(accounting.formatNumber(currNPBahtNovember / 1000, 2));
    $('#npBahtActualNow12').html(accounting.formatNumber(currNPBahtDecember / 1000, 2));
    $('#npBahtActualNowTotal').html(accounting.formatNumber(currNPTotalBaht / 1000, 2));
    $('#npBahtActualNowQTotal').html(accounting.formatNumber(currNPTotalBaht, 2));

    $('#npBahtActualOldQ1').html(accounting.formatNumber(oldNPBahtQ1, 2));
    $('#npBahtActualOldQ2').html(accounting.formatNumber(oldNPBahtQ2, 2));
    $('#npBahtActualOldQ3').html(accounting.formatNumber(oldNPBahtQ3, 2));
    $('#npBahtActualOldQ4').html(accounting.formatNumber(oldNPBahtQ4, 2));
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
    $('#npBahtActualOldQTotal').html(accounting.formatNumber(oldNPTotalBaht, 2));

    $('#npBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthNPBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtQ1, 2)) + "%");
    $('#npBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthNPBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtQ2, 2)) + "%");
    $('#npBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthNPBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtQ3, 2)) + "%");
    $('#npBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthNPBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtQ4, 2)) + "%");
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
    $('#npBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthNPBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPBahtTotal, 2)) + "%");

    $('#npBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveNPBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtQ1, 2)) + "%");
    $('#npBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveNPBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtQ2, 2)) + "%");
    $('#npBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveNPBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtQ3, 2)) + "%");
    $('#npBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveNPBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtQ4, 2)) + "%");
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
    $('#npBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveNPBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPBahtTotal, 2)) + "%");

    $('#npUnitActualNowQ1').html(accounting.formatNumber(currNPUnitQ1));
    $('#npUnitActualNowQ2').html(accounting.formatNumber(currNPUnitQ2));
    $('#npUnitActualNowQ3').html(accounting.formatNumber(currNPUnitQ3));
    $('#npUnitActualNowQ4').html(accounting.formatNumber(currNPUnitQ4));
    $('#npUnitActualNow1').html(accounting.formatNumber(currNPUnitJanuary));
    $('#npUnitActualNow2').html(accounting.formatNumber(currNPUnitFebruary));
    $('#npUnitActualNow3').html(accounting.formatNumber(currNPUnitMarch));
    $('#npUnitActualNow4').html(accounting.formatNumber(currNPUnitApril));
    $('#npUnitActualNow5').html(accounting.formatNumber(currNPUnitMay));
    $('#npUnitActualNow6').html(accounting.formatNumber(currNPUnitJune));
    $('#npUnitActualNow7').html(accounting.formatNumber(currNPUnitJuly));
    $('#npUnitActualNow8').html(accounting.formatNumber(currNPUnitAugust));
    $('#npUnitActualNow9').html(accounting.formatNumber(currNPUnitSeptember));
    $('#npUnitActualNow10').html(accounting.formatNumber(currNPUnitOctober));
    $('#npUnitActualNow11').html(accounting.formatNumber(currNPUnitNovember));
    $('#npUnitActualNow12').html(accounting.formatNumber(currNPUnitDecember));
    $('#npUnitActualNowTotal').html(accounting.formatNumber(currNPTotalUnit));
    $('#npUnitActualNowQTotal').html(accounting.formatNumber(currNPTotalUnit));

    $('#npUnitActualOldQ1').html(accounting.formatNumber(oldNPUnitQ1));
    $('#npUnitActualOldQ2').html(accounting.formatNumber(oldNPUnitQ2));
    $('#npUnitActualOldQ3').html(accounting.formatNumber(oldNPUnitQ3));
    $('#npUnitActualOldQ4').html(accounting.formatNumber(oldNPUnitQ4));
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
    $('#npUnitActualOldQTotal').html(accounting.formatNumber(oldNPTotalUnit));

    $('#npUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthNPUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitQ1, 2)) + "%");
    $('#npUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthNPUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitQ2, 2)) + "%");
    $('#npUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthNPUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitQ3, 2)) + "%");
    $('#npUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthNPUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitQ4, 2)) + "%");
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
    $('#npUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthNPUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthNPUnitTotal, 2)) + "%");

    $('#npUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveNPUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitQ1, 2)) + "%");
    $('#npUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveNPUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitQ2, 2)) + "%");
    $('#npUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveNPUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitQ3, 2)) + "%");
    $('#npUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveNPUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitQ4, 2)) + "%");
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
    $('#npUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveNPUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveNPUnitTotal, 2)) + "%");

    //EB
    $('#ebBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetEB.AmtQ1), 2));
    $('#ebBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetEB.AmtQ2), 2));
    $('#ebBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetEB.AmtQ3), 2));
    $('#ebBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetEB.AmtQ4), 2));
    $('#ebBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetEB.Amt01) / 1000, 2));
    $('#ebBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetEB.Amt02) / 1000, 2));
    $('#ebBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetEB.Amt03) / 1000, 2));
    $('#ebBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetEB.Amt04) / 1000, 2));
    $('#ebBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetEB.Amt05) / 1000, 2));
    $('#ebBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetEB.Amt06) / 1000, 2));
    $('#ebBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetEB.Amt07) / 1000, 2));
    $('#ebBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetEB.Amt08) / 1000, 2));
    $('#ebBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetEB.Amt09) / 1000, 2));
    $('#ebBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetEB.Amt10) / 1000, 2));
    $('#ebBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetEB.Amt11) / 1000, 2));
    $('#ebBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetEB.Amt12) / 1000, 2));
    $('#ebBahtTargetNowTotal').html(accounting.formatNumber(totalEBBahtTarget / 1000, 2));
    $('#ebBahtTargetNowQTotal').html(accounting.formatNumber(totalEBBahtTarget, 2));

    $('#ebUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetEB.UnitQ1)));
    $('#ebUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetEB.UnitQ2)));
    $('#ebUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetEB.UnitQ3)));
    $('#ebUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetEB.UnitQ4)));
    $('#ebUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetEB.Unit01)));
    $('#ebUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetEB.Unit02)));
    $('#ebUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetEB.Unit03)));
    $('#ebUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetEB.Unit04)));
    $('#ebUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetEB.Unit05)));
    $('#ebUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetEB.Unit06)));
    $('#ebUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetEB.Unit07)));
    $('#ebUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetEB.Unit08)));
    $('#ebUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetEB.Unit09)));
    $('#ebUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetEB.Unit10)));
    $('#ebUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetEB.Unit11)));
    $('#ebUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetEB.Unit12)));
    $('#ebUnitTargetNowTotal').html(accounting.formatNumber(totalEBUnitTarget));
    $('#ebUnitTargetNowQTotal').html(accounting.formatNumber(totalEBUnitTarget));

    $('#ebBahtActualNowQ1').html(accounting.formatNumber(currEBBahtQ1, 2));
    $('#ebBahtActualNowQ2').html(accounting.formatNumber(currEBBahtQ2, 2));
    $('#ebBahtActualNowQ3').html(accounting.formatNumber(currEBBahtQ3, 2));
    $('#ebBahtActualNowQ4').html(accounting.formatNumber(currEBBahtQ4, 2));
    $('#ebBahtActualNow1').html(accounting.formatNumber(currEBBahtJanuary / 1000, 2));
    $('#ebBahtActualNow2').html(accounting.formatNumber(currEBBahtFebruary / 1000, 2));
    $('#ebBahtActualNow3').html(accounting.formatNumber(currEBBahtMarch / 1000, 2));
    $('#ebBahtActualNow4').html(accounting.formatNumber(currEBBahtApril / 1000, 2));
    $('#ebBahtActualNow5').html(accounting.formatNumber(currEBBahtMay / 1000, 2));
    $('#ebBahtActualNow6').html(accounting.formatNumber(currEBBahtJune / 1000, 2));
    $('#ebBahtActualNow7').html(accounting.formatNumber(currEBBahtJuly / 1000, 2));
    $('#ebBahtActualNow8').html(accounting.formatNumber(currEBBahtAugust / 1000, 2));
    $('#ebBahtActualNow9').html(accounting.formatNumber(currEBBahtSeptember / 1000, 2));
    $('#ebBahtActualNow10').html(accounting.formatNumber(currEBBahtOctober / 1000, 2));
    $('#ebBahtActualNow11').html(accounting.formatNumber(currEBBahtNovember / 1000, 2));
    $('#ebBahtActualNow12').html(accounting.formatNumber(currEBBahtDecember / 1000, 2));
    $('#ebBahtActualNowTotal').html(accounting.formatNumber(currEBTotalBaht / 1000, 2));
    $('#ebBahtActualNowQTotal').html(accounting.formatNumber(currEBTotalBaht, 2));

    $('#ebBahtActualOldQ1').html(accounting.formatNumber(oldEBBahtQ1, 2));
    $('#ebBahtActualOldQ2').html(accounting.formatNumber(oldEBBahtQ2, 2));
    $('#ebBahtActualOldQ3').html(accounting.formatNumber(oldEBBahtQ3, 2));
    $('#ebBahtActualOldQ4').html(accounting.formatNumber(oldEBBahtQ4, 2));
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
    $('#ebBahtActualOldQTotal').html(accounting.formatNumber(oldEBTotalBaht, 2));

    $('#ebBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthEBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtQ1, 2)) + "%");
    $('#ebBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthEBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtQ2, 2)) + "%");
    $('#ebBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthEBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtQ3, 2)) + "%");
    $('#ebBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthEBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtQ4, 2)) + "%");
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
    $('#ebBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthEBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBBahtTotal, 2)) + "%");

    $('#ebBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveEBBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtQ1, 2)) + "%");
    $('#ebBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveEBBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtQ2, 2)) + "%");
    $('#ebBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveEBBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtQ3, 2)) + "%");
    $('#ebBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveEBBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtQ4, 2)) + "%");
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
    $('#ebBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveEBBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBBahtTotal, 2)) + "%");

    $('#ebUnitActualNowQ1').html(accounting.formatNumber(currEBUnitQ1));
    $('#ebUnitActualNowQ2').html(accounting.formatNumber(currEBUnitQ2));
    $('#ebUnitActualNowQ3').html(accounting.formatNumber(currEBUnitQ3));
    $('#ebUnitActualNowQ4').html(accounting.formatNumber(currEBUnitQ4));
    $('#ebUnitActualNow1').html(accounting.formatNumber(currEBUnitJanuary));
    $('#ebUnitActualNow2').html(accounting.formatNumber(currEBUnitFebruary));
    $('#ebUnitActualNow3').html(accounting.formatNumber(currEBUnitMarch));
    $('#ebUnitActualNow4').html(accounting.formatNumber(currEBUnitApril));
    $('#ebUnitActualNow5').html(accounting.formatNumber(currEBUnitMay));
    $('#ebUnitActualNow6').html(accounting.formatNumber(currEBUnitJune));
    $('#ebUnitActualNow7').html(accounting.formatNumber(currEBUnitJuly));
    $('#ebUnitActualNow8').html(accounting.formatNumber(currEBUnitAugust));
    $('#ebUnitActualNow9').html(accounting.formatNumber(currEBUnitSeptember));
    $('#ebUnitActualNow10').html(accounting.formatNumber(currEBUnitOctober));
    $('#ebUnitActualNow11').html(accounting.formatNumber(currEBUnitNovember));
    $('#ebUnitActualNow12').html(accounting.formatNumber(currEBUnitDecember));
    $('#ebUnitActualNowTotal').html(accounting.formatNumber(currEBTotalUnit));
    $('#ebUnitActualNowQTotal').html(accounting.formatNumber(currEBTotalUnit));

    $('#ebUnitActualOldQ1').html(accounting.formatNumber(oldEBUnitQ1));
    $('#ebUnitActualOldQ2').html(accounting.formatNumber(oldEBUnitQ2));
    $('#ebUnitActualOldQ3').html(accounting.formatNumber(oldEBUnitQ3));
    $('#ebUnitActualOldQ4').html(accounting.formatNumber(oldEBUnitQ4));
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
    $('#ebUnitActualOldQTotal').html(accounting.formatNumber(oldEBTotalUnit));

    $('#ebUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthEBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitQ1, 2)) + "%");
    $('#ebUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthEBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitQ2, 2)) + "%");
    $('#ebUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthEBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitQ3, 2)) + "%");
    $('#ebUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthEBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitQ4, 2)) + "%");
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
    $('#ebUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthEBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthEBUnitTotal, 2)) + "%");

    $('#ebUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveEBUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitQ1, 2)) + "%");
    $('#ebUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveEBUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitQ2, 2)) + "%");
    $('#ebUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveEBUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitQ3, 2)) + "%");
    $('#ebUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveEBUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitQ4, 2)) + "%");
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
    $('#ebUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveEBUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveEBUnitTotal, 2)) + "%");

    //IND
    $('#indBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetIND.AmtQ1), 2));
    $('#indBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetIND.AmtQ2), 2));
    $('#indBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetIND.AmtQ3), 2));
    $('#indBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetIND.AmtQ4), 2));
    $('#indBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetIND.Amt01) / 1000, 2));
    $('#indBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetIND.Amt02) / 1000, 2));
    $('#indBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetIND.Amt03) / 1000, 2));
    $('#indBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetIND.Amt04) / 1000, 2));
    $('#indBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetIND.Amt05) / 1000, 2));
    $('#indBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetIND.Amt06) / 1000, 2));
    $('#indBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetIND.Amt07) / 1000, 2));
    $('#indBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetIND.Amt08) / 1000, 2));
    $('#indBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetIND.Amt09) / 1000, 2));
    $('#indBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetIND.Amt10) / 1000, 2));
    $('#indBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetIND.Amt11) / 1000, 2));
    $('#indBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetIND.Amt12) / 1000, 2));
    $('#indBahtTargetNowTotal').html(accounting.formatNumber(totalINDBahtTarget / 1000, 2));
    $('#indBahtTargetNowQTotal').html(accounting.formatNumber(totalINDBahtTarget, 2));

    $('#indUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetIND.UnitQ1)));
    $('#indUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetIND.UnitQ2)));
    $('#indUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetIND.UnitQ3)));
    $('#indUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetIND.UnitQ4)));
    $('#indUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetIND.Unit01)));
    $('#indUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetIND.Unit02)));
    $('#indUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetIND.Unit03)));
    $('#indUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetIND.Unit04)));
    $('#indUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetIND.Unit05)));
    $('#indUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetIND.Unit06)));
    $('#indUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetIND.Unit07)));
    $('#indUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetIND.Unit08)));
    $('#indUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetIND.Unit09)));
    $('#indUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetIND.Unit10)));
    $('#indUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetIND.Unit11)));
    $('#indUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetIND.Unit12)));
    $('#indUnitTargetNowTotal').html(accounting.formatNumber(totalINDUnitTarget));
    $('#indUnitTargetNowQTotal').html(accounting.formatNumber(totalINDUnitTarget));

    $('#indBahtActualNowQ1').html(accounting.formatNumber(currINDBahtQ1, 2));
    $('#indBahtActualNowQ2').html(accounting.formatNumber(currINDBahtQ2, 2));
    $('#indBahtActualNowQ3').html(accounting.formatNumber(currINDBahtQ3, 2));
    $('#indBahtActualNowQ4').html(accounting.formatNumber(currINDBahtQ4, 2));
    $('#indBahtActualNow1').html(accounting.formatNumber(currINDBahtJanuary / 1000, 2));
    $('#indBahtActualNow2').html(accounting.formatNumber(currINDBahtFebruary / 1000, 2));
    $('#indBahtActualNow3').html(accounting.formatNumber(currINDBahtMarch / 1000, 2));
    $('#indBahtActualNow4').html(accounting.formatNumber(currINDBahtApril / 1000, 2));
    $('#indBahtActualNow5').html(accounting.formatNumber(currINDBahtMay / 1000, 2));
    $('#indBahtActualNow6').html(accounting.formatNumber(currINDBahtJune / 1000, 2));
    $('#indBahtActualNow7').html(accounting.formatNumber(currINDBahtJuly / 1000, 2));
    $('#indBahtActualNow8').html(accounting.formatNumber(currINDBahtAugust / 1000, 2));
    $('#indBahtActualNow9').html(accounting.formatNumber(currINDBahtSeptember / 1000, 2));
    $('#indBahtActualNow10').html(accounting.formatNumber(currINDBahtOctober / 1000, 2));
    $('#indBahtActualNow11').html(accounting.formatNumber(currINDBahtNovember / 1000, 2));
    $('#indBahtActualNow12').html(accounting.formatNumber(currINDBahtDecember / 1000, 2));
    $('#indBahtActualNowTotal').html(accounting.formatNumber(currINDTotalBaht / 1000, 2));
    $('#indBahtActualNowQTotal').html(accounting.formatNumber(currINDTotalBaht, 2));

    $('#indBahtActualOldQ1').html(accounting.formatNumber(oldINDBahtQ1, 2));
    $('#indBahtActualOldQ2').html(accounting.formatNumber(oldINDBahtQ2, 2));
    $('#indBahtActualOldQ3').html(accounting.formatNumber(oldINDBahtQ3, 2));
    $('#indBahtActualOldQ4').html(accounting.formatNumber(oldINDBahtQ4, 2));
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
    $('#indBahtActualOldQTotal').html(accounting.formatNumber(oldINDTotalBaht, 2));

    $('#indBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthINDBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtQ1, 2)) + "%");
    $('#indBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthINDBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtQ2, 2)) + "%");
    $('#indBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthINDBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtQ3, 2)) + "%");
    $('#indBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthINDBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtQ4, 2)) + "%");
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
    $('#indBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthINDBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDBahtTotal, 2)) + "%");

    $('#indBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveINDBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtQ1, 2)) + "%");
    $('#indBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveINDBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtQ2, 2)) + "%");
    $('#indBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveINDBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtQ3, 2)) + "%");
    $('#indBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveINDBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtQ4, 2)) + "%");
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
    $('#indBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveINDBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDBahtTotal, 2)) + "%");

    $('#indUnitActualNowQ1').html(accounting.formatNumber(currINDUnitQ1));
    $('#indUnitActualNowQ2').html(accounting.formatNumber(currINDUnitQ2));
    $('#indUnitActualNowQ3').html(accounting.formatNumber(currINDUnitQ3));
    $('#indUnitActualNowQ4').html(accounting.formatNumber(currINDUnitQ4));
    $('#indUnitActualNow1').html(accounting.formatNumber(currINDUnitJanuary));
    $('#indUnitActualNow2').html(accounting.formatNumber(currINDUnitFebruary));
    $('#indUnitActualNow3').html(accounting.formatNumber(currINDUnitMarch));
    $('#indUnitActualNow4').html(accounting.formatNumber(currINDUnitApril));
    $('#indUnitActualNow5').html(accounting.formatNumber(currINDUnitMay));
    $('#indUnitActualNow6').html(accounting.formatNumber(currINDUnitJune));
    $('#indUnitActualNow7').html(accounting.formatNumber(currINDUnitJuly));
    $('#indUnitActualNow8').html(accounting.formatNumber(currINDUnitAugust));
    $('#indUnitActualNow9').html(accounting.formatNumber(currINDUnitSeptember));
    $('#indUnitActualNow10').html(accounting.formatNumber(currINDUnitOctober));
    $('#indUnitActualNow11').html(accounting.formatNumber(currINDUnitNovember));
    $('#indUnitActualNow12').html(accounting.formatNumber(currINDUnitDecember));
    $('#indUnitActualNowTotal').html(accounting.formatNumber(currINDTotalUnit));
    $('#indUnitActualNowQTotal').html(accounting.formatNumber(currINDTotalUnit));

    $('#indUnitActualOldQ1').html(accounting.formatNumber(oldINDUnitQ1));
    $('#indUnitActualOldQ2').html(accounting.formatNumber(oldINDUnitQ2));
    $('#indUnitActualOldQ3').html(accounting.formatNumber(oldINDUnitQ3));
    $('#indUnitActualOldQ4').html(accounting.formatNumber(oldINDUnitQ4));
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
    $('#indUnitActualOldQTotal').html(accounting.formatNumber(oldINDTotalUnit));

    $('#indUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthINDUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitQ1, 2)) + "%");
    $('#indUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthINDUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitQ2, 2)) + "%");
    $('#indUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthINDUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitQ3, 2)) + "%");
    $('#indUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthINDUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitQ4, 2)) + "%");
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
    $('#indUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthINDUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthINDUnitTotal, 2)) + "%");

    $('#indUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveINDUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitQ1, 2)) + "%");
    $('#indUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveINDUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitQ2, 2)) + "%");
    $('#indUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveINDUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitQ3, 2)) + "%");
    $('#indUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveINDUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitQ4, 2)) + "%");
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
    $('#indUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveINDUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveINDUnitTotal, 2)) + "%");

    //OTH
    $('#othBahtTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetOTH.AmtQ1), 2));
    $('#othBahtTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetOTH.AmtQ2), 2));
    $('#othBahtTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetOTH.AmtQ3), 2));
    $('#othBahtTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetOTH.AmtQ4), 2));
    $('#othBahtTargetNow1').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt01) / 1000, 2));
    $('#othBahtTargetNow2').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt02) / 1000, 2));
    $('#othBahtTargetNow3').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt03) / 1000, 2));
    $('#othBahtTargetNow4').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt04) / 1000, 2));
    $('#othBahtTargetNow5').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt05) / 1000, 2));
    $('#othBahtTargetNow6').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt06) / 1000, 2));
    $('#othBahtTargetNow7').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt07) / 1000, 2));
    $('#othBahtTargetNow8').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt08) / 1000, 2));
    $('#othBahtTargetNow9').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt09) / 1000, 2));
    $('#othBahtTargetNow10').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt10) / 1000, 2));
    $('#othBahtTargetNow11').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt11) / 1000, 2));
    $('#othBahtTargetNow12').html(accounting.formatNumber(accounting.unformat(targetOTH.Amt12) / 1000, 2));
    $('#othBahtTargetNowTotal').html(accounting.formatNumber(totalOTHBahtTarget / 1000, 2));
    $('#othBahtTargetNowQTotal').html(accounting.formatNumber(totalOTHBahtTarget, 2));

    $('#othUnitTargetNowQ1').html(accounting.formatNumber(accounting.unformat(targetOTH.UnitQ1)));
    $('#othUnitTargetNowQ2').html(accounting.formatNumber(accounting.unformat(targetOTH.UnitQ2)));
    $('#othUnitTargetNowQ3').html(accounting.formatNumber(accounting.unformat(targetOTH.UnitQ3)));
    $('#othUnitTargetNowQ4').html(accounting.formatNumber(accounting.unformat(targetOTH.UnitQ4)));
    $('#othUnitTargetNow1').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit01)));
    $('#othUnitTargetNow2').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit02)));
    $('#othUnitTargetNow3').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit03)));
    $('#othUnitTargetNow4').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit04)));
    $('#othUnitTargetNow5').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit05)));
    $('#othUnitTargetNow6').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit06)));
    $('#othUnitTargetNow7').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit07)));
    $('#othUnitTargetNow8').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit08)));
    $('#othUnitTargetNow9').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit09)));
    $('#othUnitTargetNow10').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit10)));
    $('#othUnitTargetNow11').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit11)));
    $('#othUnitTargetNow12').html(accounting.formatNumber(accounting.unformat(targetOTH.Unit12)));
    $('#othUnitTargetNowTotal').html(accounting.formatNumber(totalOTHUnitTarget));
    $('#othUnitTargetNowQTotal').html(accounting.formatNumber(totalOTHUnitTarget));

    $('#othBahtActualNowQ1').html(accounting.formatNumber(currOTHBahtQ1, 2));
    $('#othBahtActualNowQ2').html(accounting.formatNumber(currOTHBahtQ2, 2));
    $('#othBahtActualNowQ3').html(accounting.formatNumber(currOTHBahtQ3, 2));
    $('#othBahtActualNowQ4').html(accounting.formatNumber(currOTHBahtQ4, 2));
    $('#othBahtActualNow1').html(accounting.formatNumber(currOTHBahtJanuary / 1000, 2));
    $('#othBahtActualNow2').html(accounting.formatNumber(currOTHBahtFebruary / 1000, 2));
    $('#othBahtActualNow3').html(accounting.formatNumber(currOTHBahtMarch / 1000, 2));
    $('#othBahtActualNow4').html(accounting.formatNumber(currOTHBahtApril / 1000, 2));
    $('#othBahtActualNow5').html(accounting.formatNumber(currOTHBahtMay / 1000, 2));
    $('#othBahtActualNow6').html(accounting.formatNumber(currOTHBahtJune / 1000, 2));
    $('#othBahtActualNow7').html(accounting.formatNumber(currOTHBahtJuly / 1000, 2));
    $('#othBahtActualNow8').html(accounting.formatNumber(currOTHBahtAugust / 1000, 2));
    $('#othBahtActualNow9').html(accounting.formatNumber(currOTHBahtSeptember / 1000, 2));
    $('#othBahtActualNow10').html(accounting.formatNumber(currOTHBahtOctober / 1000, 2));
    $('#othBahtActualNow11').html(accounting.formatNumber(currOTHBahtNovember / 1000, 2));
    $('#othBahtActualNow12').html(accounting.formatNumber(currOTHBahtDecember / 1000, 2));
    $('#othBahtActualNowTotal').html(accounting.formatNumber(currOTHTotalBaht / 1000, 2));
    $('#othBahtActualNowQTotal').html(accounting.formatNumber(currOTHTotalBaht, 2));

    $('#othBahtActualOldQ1').html(accounting.formatNumber(oldOTHBahtQ1, 2));
    $('#othBahtActualOldQ2').html(accounting.formatNumber(oldOTHBahtQ2, 2));
    $('#othBahtActualOldQ3').html(accounting.formatNumber(oldOTHBahtQ3, 2));
    $('#othBahtActualOldQ4').html(accounting.formatNumber(oldOTHBahtQ4, 2));
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
    $('#othBahtActualOldQTotal').html(accounting.formatNumber(oldOTHTotalBaht, 2));

    $('#othBahtGrowthQ1').html((isNaN(accounting.formatNumber(growthOTHBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtQ1, 2)) + "%");
    $('#othBahtGrowthQ2').html((isNaN(accounting.formatNumber(growthOTHBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtQ2, 2)) + "%");
    $('#othBahtGrowthQ3').html((isNaN(accounting.formatNumber(growthOTHBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtQ3, 2)) + "%");
    $('#othBahtGrowthQ4').html((isNaN(accounting.formatNumber(growthOTHBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtQ4, 2)) + "%");
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
    $('#othBahtGrowthQTotal').html((isNaN(accounting.formatNumber(growthOTHBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHBahtTotal, 2)) + "%");

    $('#othBahtAchieveQ1').html((isNaN(accounting.formatNumber(achieveOTHBahtQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtQ1, 2)) + "%");
    $('#othBahtAchieveQ2').html((isNaN(accounting.formatNumber(achieveOTHBahtQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtQ2, 2)) + "%");
    $('#othBahtAchieveQ3').html((isNaN(accounting.formatNumber(achieveOTHBahtQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtQ3, 2)) + "%");
    $('#othBahtAchieveQ4').html((isNaN(accounting.formatNumber(achieveOTHBahtQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtQ4, 2)) + "%");
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
    $('#othBahtAchieveQTotal').html((isNaN(accounting.formatNumber(achieveOTHBahtTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHBahtTotal, 2)) + "%");

    $('#othUnitActualNowQ1').html(accounting.formatNumber(currOTHUnitQ1));
    $('#othUnitActualNowQ2').html(accounting.formatNumber(currOTHUnitQ2));
    $('#othUnitActualNowQ3').html(accounting.formatNumber(currOTHUnitQ3));
    $('#othUnitActualNowQ4').html(accounting.formatNumber(currOTHUnitQ4));
    $('#othUnitActualNow1').html(accounting.formatNumber(currOTHUnitJanuary));
    $('#othUnitActualNow2').html(accounting.formatNumber(currOTHUnitFebruary));
    $('#othUnitActualNow3').html(accounting.formatNumber(currOTHUnitMarch));
    $('#othUnitActualNow4').html(accounting.formatNumber(currOTHUnitApril));
    $('#othUnitActualNow5').html(accounting.formatNumber(currOTHUnitMay));
    $('#othUnitActualNow6').html(accounting.formatNumber(currOTHUnitJune));
    $('#othUnitActualNow7').html(accounting.formatNumber(currOTHUnitJuly));
    $('#othUnitActualNow8').html(accounting.formatNumber(currOTHUnitAugust));
    $('#othUnitActualNow9').html(accounting.formatNumber(currOTHUnitSeptember));
    $('#othUnitActualNow10').html(accounting.formatNumber(currOTHUnitOctober));
    $('#othUnitActualNow11').html(accounting.formatNumber(currOTHUnitNovember));
    $('#othUnitActualNow12').html(accounting.formatNumber(currOTHUnitDecember));
    $('#othUnitActualNowTotal').html(accounting.formatNumber(currOTHTotalUnit));
    $('#othUnitActualNowQTotal').html(accounting.formatNumber(currOTHTotalUnit));

    $('#othUnitActualOldQ1').html(accounting.formatNumber(oldOTHUnitQ1));
    $('#othUnitActualOldQ2').html(accounting.formatNumber(oldOTHUnitQ2));
    $('#othUnitActualOldQ3').html(accounting.formatNumber(oldOTHUnitQ3));
    $('#othUnitActualOldQ4').html(accounting.formatNumber(oldOTHUnitQ4));
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
    $('#othUnitActualOldQTotal').html(accounting.formatNumber(oldOTHTotalUnit));

    $('#othUnitGrowthQ1').html((isNaN(accounting.formatNumber(growthOTHUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitQ1, 2)) + "%");
    $('#othUnitGrowthQ2').html((isNaN(accounting.formatNumber(growthOTHUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitQ2, 2)) + "%");
    $('#othUnitGrowthQ3').html((isNaN(accounting.formatNumber(growthOTHUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitQ3, 2)) + "%");
    $('#othUnitGrowthQ4').html((isNaN(accounting.formatNumber(growthOTHUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitQ4, 2)) + "%");
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
    $('#othUnitGrowthQTotal').html((isNaN(accounting.formatNumber(growthOTHUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(growthOTHUnitTotal, 2)) + "%");

    $('#othUnitAchieveQ1').html((isNaN(accounting.formatNumber(achieveOTHUnitQ1, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitQ1, 2)) + "%");
    $('#othUnitAchieveQ2').html((isNaN(accounting.formatNumber(achieveOTHUnitQ2, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitQ2, 2)) + "%");
    $('#othUnitAchieveQ3').html((isNaN(accounting.formatNumber(achieveOTHUnitQ3, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitQ3, 2)) + "%");
    $('#othUnitAchieveQ4').html((isNaN(accounting.formatNumber(achieveOTHUnitQ4, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitQ4, 2)) + "%");
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
    $('#othUnitAchieveQTotal').html((isNaN(accounting.formatNumber(achieveOTHUnitTotal, 2)) ? accounting.formatNumber(0, 2) : accounting.formatNumber(achieveOTHUnitTotal, 2)) + "%");

    //All
    $('#allBahtTargetNowQ1').html(accounting.formatNumber((accounting.unformat(targetNP.AmtQ1) + accounting.unformat(targetEB.AmtQ1) + accounting.unformat(targetIND.AmtQ1) + accounting.unformat(targetOTH.AmtQ1)), 2));
    $('#allBahtTargetNowQ2').html(accounting.formatNumber((accounting.unformat(targetNP.AmtQ2) + accounting.unformat(targetEB.AmtQ2) + accounting.unformat(targetIND.AmtQ2) + accounting.unformat(targetOTH.AmtQ2)), 2));
    $('#allBahtTargetNowQ3').html(accounting.formatNumber((accounting.unformat(targetNP.AmtQ3) + accounting.unformat(targetEB.AmtQ3) + accounting.unformat(targetIND.AmtQ3) + accounting.unformat(targetOTH.AmtQ3)), 2));
    $('#allBahtTargetNowQ4').html(accounting.formatNumber((accounting.unformat(targetNP.AmtQ4) + accounting.unformat(targetEB.AmtQ4) + accounting.unformat(targetIND.AmtQ4) + accounting.unformat(targetOTH.AmtQ4)), 2));
    $('#allBahtTargetNow1').html(accounting.formatNumber((accounting.unformat(targetNP.Amt01) + accounting.unformat(targetEB.Amt01) + accounting.unformat(targetIND.Amt01) + accounting.unformat(targetOTH.Amt01)) / 1000, 2));
    $('#allBahtTargetNow2').html(accounting.formatNumber((accounting.unformat(targetNP.Amt02) + accounting.unformat(targetEB.Amt02) + accounting.unformat(targetIND.Amt02) + accounting.unformat(targetOTH.Amt02)) / 1000, 2));
    $('#allBahtTargetNow3').html(accounting.formatNumber((accounting.unformat(targetNP.Amt03) + accounting.unformat(targetEB.Amt03) + accounting.unformat(targetIND.Amt03) + accounting.unformat(targetOTH.Amt03)) / 1000, 2));
    $('#allBahtTargetNow4').html(accounting.formatNumber((accounting.unformat(targetNP.Amt04) + accounting.unformat(targetEB.Amt04) + accounting.unformat(targetIND.Amt04) + accounting.unformat(targetOTH.Amt04)) / 1000, 2));
    $('#allBahtTargetNow5').html(accounting.formatNumber((accounting.unformat(targetNP.Amt05) + accounting.unformat(targetEB.Amt05) + accounting.unformat(targetIND.Amt05) + accounting.unformat(targetOTH.Amt05)) / 1000, 2));
    $('#allBahtTargetNow6').html(accounting.formatNumber((accounting.unformat(targetNP.Amt06) + accounting.unformat(targetEB.Amt06) + accounting.unformat(targetIND.Amt06) + accounting.unformat(targetOTH.Amt06)) / 1000, 2));
    $('#allBahtTargetNow7').html(accounting.formatNumber((accounting.unformat(targetNP.Amt07) + accounting.unformat(targetEB.Amt07) + accounting.unformat(targetIND.Amt07) + accounting.unformat(targetOTH.Amt07)) / 1000, 2));
    $('#allBahtTargetNow8').html(accounting.formatNumber((accounting.unformat(targetNP.Amt08) + accounting.unformat(targetEB.Amt08) + accounting.unformat(targetIND.Amt08) + accounting.unformat(targetOTH.Amt08)) / 1000, 2));
    $('#allBahtTargetNow9').html(accounting.formatNumber((accounting.unformat(targetNP.Amt09) + accounting.unformat(targetEB.Amt09) + accounting.unformat(targetIND.Amt09) + accounting.unformat(targetOTH.Amt09)) / 1000, 2));
    $('#allBahtTargetNow10').html(accounting.formatNumber((accounting.unformat(targetNP.Amt10) + accounting.unformat(targetEB.Amt10) + accounting.unformat(targetIND.Amt10) + accounting.unformat(targetOTH.Amt10)) / 1000, 2));
    $('#allBahtTargetNow11').html(accounting.formatNumber((accounting.unformat(targetNP.Amt11) + accounting.unformat(targetEB.Amt11) + accounting.unformat(targetIND.Amt11) + accounting.unformat(targetOTH.Amt11)) / 1000, 2));
    $('#allBahtTargetNow12').html(accounting.formatNumber((accounting.unformat(targetNP.Amt12) + accounting.unformat(targetEB.Amt12) + accounting.unformat(targetIND.Amt12) + accounting.unformat(targetOTH.Amt12)) / 1000, 2));
    $('#allBahtTargetNowTotal').html(accounting.formatNumber((accounting.unformat(totalNPBahtTarget) + accounting.unformat(totalEBBahtTarget) + accounting.unformat(totalINDBahtTarget) + accounting.unformat(totalOTHBahtTarget)) / 1000, 2));
    $('#allBahtTargetNowQTotal').html(accounting.formatNumber((accounting.unformat(totalNPBahtTarget) + accounting.unformat(totalEBBahtTarget) + accounting.unformat(totalINDBahtTarget) + accounting.unformat(totalOTHBahtTarget)), 2));

    $('#allUnitTargetNowQ1').html(accounting.formatNumber((accounting.unformat(targetNP.UnitQ1) + accounting.unformat(targetEB.UnitQ1) + accounting.unformat(targetIND.UnitQ1) + accounting.unformat(targetOTH.UnitQ1))));
    $('#allUnitTargetNowQ2').html(accounting.formatNumber((accounting.unformat(targetNP.UnitQ2) + accounting.unformat(targetEB.UnitQ2) + accounting.unformat(targetIND.UnitQ2) + accounting.unformat(targetOTH.UnitQ2))));
    $('#allUnitTargetNowQ3').html(accounting.formatNumber((accounting.unformat(targetNP.UnitQ3) + accounting.unformat(targetEB.UnitQ3) + accounting.unformat(targetIND.UnitQ3) + accounting.unformat(targetOTH.UnitQ3))));
    $('#allUnitTargetNowQ4').html(accounting.formatNumber((accounting.unformat(targetNP.UnitQ4) + accounting.unformat(targetEB.UnitQ4) + accounting.unformat(targetIND.UnitQ4) + accounting.unformat(targetOTH.UnitQ4))));
    $('#allUnitTargetNow1').html(accounting.formatNumber((accounting.unformat(targetNP.Unit01) + accounting.unformat(targetEB.Unit01) + accounting.unformat(targetIND.Unit01) + accounting.unformat(targetOTH.Unit01))));
    $('#allUnitTargetNow2').html(accounting.formatNumber((accounting.unformat(targetNP.Unit02) + accounting.unformat(targetEB.Unit02) + accounting.unformat(targetIND.Unit02) + accounting.unformat(targetOTH.Unit02))));
    $('#allUnitTargetNow3').html(accounting.formatNumber((accounting.unformat(targetNP.Unit03) + accounting.unformat(targetEB.Unit03) + accounting.unformat(targetIND.Unit03) + accounting.unformat(targetOTH.Unit03))));
    $('#allUnitTargetNow4').html(accounting.formatNumber((accounting.unformat(targetNP.Unit04) + accounting.unformat(targetEB.Unit04) + accounting.unformat(targetIND.Unit04) + accounting.unformat(targetOTH.Unit04))));
    $('#allUnitTargetNow5').html(accounting.formatNumber((accounting.unformat(targetNP.Unit05) + accounting.unformat(targetEB.Unit05) + accounting.unformat(targetIND.Unit05) + accounting.unformat(targetOTH.Unit05))));
    $('#allUnitTargetNow6').html(accounting.formatNumber((accounting.unformat(targetNP.Unit06) + accounting.unformat(targetEB.Unit06) + accounting.unformat(targetIND.Unit06) + accounting.unformat(targetOTH.Unit06))));
    $('#allUnitTargetNow7').html(accounting.formatNumber((accounting.unformat(targetNP.Unit07) + accounting.unformat(targetEB.Unit07) + accounting.unformat(targetIND.Unit07) + accounting.unformat(targetOTH.Unit07))));
    $('#allUnitTargetNow8').html(accounting.formatNumber((accounting.unformat(targetNP.Unit08) + accounting.unformat(targetEB.Unit08) + accounting.unformat(targetIND.Unit08) + accounting.unformat(targetOTH.Unit08))));
    $('#allUnitTargetNow9').html(accounting.formatNumber((accounting.unformat(targetNP.Unit09) + accounting.unformat(targetEB.Unit09) + accounting.unformat(targetIND.Unit09) + accounting.unformat(targetOTH.Unit09))));
    $('#allUnitTargetNow10').html(accounting.formatNumber((accounting.unformat(targetNP.Unit10) + accounting.unformat(targetEB.Unit10) + accounting.unformat(targetIND.Unit10) + accounting.unformat(targetOTH.Unit10))));
    $('#allUnitTargetNow11').html(accounting.formatNumber((accounting.unformat(targetNP.Unit11) + accounting.unformat(targetEB.Unit11) + accounting.unformat(targetIND.Unit11) + accounting.unformat(targetOTH.Unit11))));
    $('#allUnitTargetNow12').html(accounting.formatNumber((accounting.unformat(targetNP.Unit12) + accounting.unformat(targetEB.Unit12) + accounting.unformat(targetIND.Unit12) + accounting.unformat(targetOTH.Unit12))));
    $('#allUnitTargetNowTotal').html(accounting.formatNumber((accounting.unformat(totalNPUnitTarget) + accounting.unformat(totalEBUnitTarget) + accounting.unformat(totalINDUnitTarget) + accounting.unformat(totalOTHUnitTarget))));
    $('#allUnitTargetNowQTotal').html(accounting.formatNumber((accounting.unformat(totalNPUnitTarget) + accounting.unformat(totalEBUnitTarget) + accounting.unformat(totalINDUnitTarget) + accounting.unformat(totalOTHUnitTarget))));

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

    unitGraph(year, accounting.unformat(targetNP.Unit01), accounting.unformat(targetNP.Unit02), accounting.unformat(targetNP.Unit03), accounting.unformat(targetNP.Unit04),
        accounting.unformat(targetNP.Unit05), accounting.unformat(targetNP.Unit06), accounting.unformat(targetNP.Unit07), accounting.unformat(targetNP.Unit08),
        accounting.unformat(targetNP.Unit09), accounting.unformat(targetNP.Unit10), accounting.unformat(targetNP.Unit11), accounting.unformat(targetNP.Unit12),
        accounting.unformat(totalNPUnitTarget), currNPUnitJanuary, currNPUnitFebruary, currNPUnitMarch, currNPUnitApril, currNPUnitMay, currNPUnitJune, currNPUnitJuly, currNPUnitAugust,
        currNPUnitSeptember, currNPUnitOctober, currNPUnitNovember, currNPUnitDecember, currNPTotalUnit, oldNPUnitJanuary, oldNPUnitFebruary, oldNPUnitMarch, oldNPUnitApril, oldNPUnitMay,
        oldNPUnitJune, oldNPUnitJuly, oldNPUnitAugust, oldNPUnitSeptember, oldNPUnitOctober, oldNPUnitNovember, oldNPUnitDecember, oldNPTotalUnit,
        accounting.unformat(targetEB.Unit01), accounting.unformat(targetEB.Unit02), accounting.unformat(targetEB.Unit03), accounting.unformat(targetEB.Unit04),
        accounting.unformat(targetEB.Unit05), accounting.unformat(targetEB.Unit06), accounting.unformat(targetEB.Unit07), accounting.unformat(targetEB.Unit08),
        accounting.unformat(targetEB.Unit09), accounting.unformat(targetEB.Unit10), accounting.unformat(targetEB.Unit11), accounting.unformat(targetEB.Unit12),
        accounting.unformat(totalEBUnitTarget), currEBUnitJanuary, currEBUnitFebruary, currEBUnitMarch, currEBUnitApril, currEBUnitMay, currEBUnitJune, currEBUnitJuly, currEBUnitAugust,
        currEBUnitSeptember, currEBUnitOctober, currEBUnitNovember, currEBUnitDecember, currEBTotalUnit, oldEBUnitJanuary, oldEBUnitFebruary, oldEBUnitMarch, oldEBUnitApril, oldEBUnitMay,
        oldEBUnitJune, oldEBUnitJuly, oldEBUnitAugust, oldEBUnitSeptember, oldEBUnitOctober, oldEBUnitNovember, oldEBUnitDecember, oldEBTotalUnit,
        accounting.unformat(targetIND.Unit01), accounting.unformat(targetIND.Unit02), accounting.unformat(targetIND.Unit03), accounting.unformat(targetIND.Unit04),
        accounting.unformat(targetIND.Unit05), accounting.unformat(targetIND.Unit06), accounting.unformat(targetIND.Unit07), accounting.unformat(targetIND.Unit08),
        accounting.unformat(targetIND.Unit09), accounting.unformat(targetIND.Unit10), accounting.unformat(targetIND.Unit11), accounting.unformat(targetIND.Unit12),
        accounting.unformat(totalINDUnitTarget), currINDUnitJanuary, currINDUnitFebruary, currINDUnitMarch, currINDUnitApril, currINDUnitMay, currINDUnitJune, currINDUnitJuly, currINDUnitAugust,
        currINDUnitSeptember, currINDUnitOctober, currINDUnitNovember, currINDUnitDecember, currINDTotalUnit, oldINDUnitJanuary, oldINDUnitFebruary, oldINDUnitMarch, oldINDUnitApril, oldINDUnitMay,
        oldINDUnitJune, oldINDUnitJuly, oldINDUnitAugust, oldINDUnitSeptember, oldINDUnitOctober, oldINDUnitNovember, oldINDUnitDecember, oldINDTotalUnit,
        accounting.unformat(targetOTH.Unit01), accounting.unformat(targetOTH.Unit02), accounting.unformat(targetOTH.Unit03), accounting.unformat(targetOTH.Unit04),
        accounting.unformat(targetOTH.Unit05), accounting.unformat(targetOTH.Unit06), accounting.unformat(targetOTH.Unit07), accounting.unformat(targetOTH.Unit08),
        accounting.unformat(targetOTH.Unit09), accounting.unformat(targetOTH.Unit10), accounting.unformat(targetOTH.Unit11), accounting.unformat(targetOTH.Unit12),
        accounting.unformat(totalOTHUnitTarget), currOTHUnitJanuary, currOTHUnitFebruary, currOTHUnitMarch, currOTHUnitApril, currOTHUnitMay, currOTHUnitJune, currOTHUnitJuly, currOTHUnitAugust,
        currOTHUnitSeptember, currOTHUnitOctober, currOTHUnitNovember, currOTHUnitDecember, currOTHTotalUnit, oldOTHUnitJanuary, oldOTHUnitFebruary, oldOTHUnitMarch, oldOTHUnitApril, oldOTHUnitMay,
        oldOTHUnitJune, oldOTHUnitJuly, oldOTHUnitAugust, oldOTHUnitSeptember, oldOTHUnitOctober, oldOTHUnitNovember, oldOTHUnitDecember, oldOTHTotalUnit);
    unitGraphQ(year, accounting.unformat(targetNP.UnitQ1), accounting.unformat(targetNP.UnitQ2), accounting.unformat(targetNP.UnitQ3), accounting.unformat(targetNP.UnitQ4),
        accounting.unformat(totalNPUnitTarget), currNPUnitQ1, currNPUnitQ2, currNPUnitQ3, currNPUnitQ4, currNPTotalUnit, oldNPUnitQ1, oldNPUnitQ2, oldNPUnitQ3, oldNPUnitQ4, oldNPTotalUnit,
        accounting.unformat(targetEB.UnitQ1), accounting.unformat(targetEB.UnitQ2), accounting.unformat(targetEB.UnitQ3), accounting.unformat(targetEB.UnitQ4),
        accounting.unformat(totalEBUnitTarget), currEBUnitQ1, currEBUnitQ2, currEBUnitQ3, currEBUnitQ4, currEBTotalUnit, oldEBUnitQ1, oldEBUnitQ2, oldEBUnitQ3, oldEBUnitQ4, oldEBTotalUnit,
        accounting.unformat(targetIND.UnitQ1), accounting.unformat(targetIND.UnitQ2), accounting.unformat(targetIND.UnitQ3), accounting.unformat(targetIND.UnitQ4),
        accounting.unformat(totalINDUnitTarget), currINDUnitQ1, currINDUnitQ2, currINDUnitQ3, currINDUnitQ4, currINDTotalUnit, oldINDUnitQ1, oldINDUnitQ2, oldINDUnitQ3, oldINDUnitQ4, oldINDTotalUnit,
        accounting.unformat(targetOTH.UnitQ1), accounting.unformat(targetOTH.UnitQ2), accounting.unformat(targetOTH.UnitQ3), accounting.unformat(targetOTH.UnitQ4),
        accounting.unformat(totalOTHUnitTarget), currOTHUnitQ1, currOTHUnitQ2, currOTHUnitQ3, currOTHUnitQ4, currOTHTotalUnit, oldOTHUnitQ1, oldOTHUnitQ2, oldOTHUnitQ3, oldOTHUnitQ4, oldOTHTotalUnit);
    bahtGraph(year, accounting.unformat(targetNP.Amt01), accounting.unformat(targetNP.Amt02), accounting.unformat(targetNP.Amt03), accounting.unformat(targetNP.Amt04),
        accounting.unformat(targetNP.Amt05), accounting.unformat(targetNP.Amt06), accounting.unformat(targetNP.Amt07), accounting.unformat(targetNP.Amt08),
        accounting.unformat(targetNP.Amt09), accounting.unformat(targetNP.Amt10), accounting.unformat(targetNP.Amt11), accounting.unformat(targetNP.Amt12),
        accounting.unformat(totalNPBahtTarget), currNPBahtJanuary, currNPBahtFebruary, currNPBahtMarch, currNPBahtApril, currNPBahtMay, currNPBahtJune, currNPBahtJuly, currNPBahtAugust,
        currNPBahtSeptember, currNPBahtOctober, currNPBahtNovember, currNPBahtDecember, currNPTotalBaht, oldNPBahtJanuary, oldNPBahtFebruary, oldNPBahtMarch, oldNPBahtApril, oldNPBahtMay,
        oldNPBahtJune, oldNPBahtJuly, oldNPBahtAugust, oldNPBahtSeptember, oldNPBahtOctober, oldNPBahtNovember, oldNPBahtDecember, oldNPTotalBaht,
        accounting.unformat(targetEB.Amt01), accounting.unformat(targetEB.Amt02), accounting.unformat(targetEB.Amt03), accounting.unformat(targetEB.Amt04),
        accounting.unformat(targetEB.Amt05), accounting.unformat(targetEB.Amt06), accounting.unformat(targetEB.Amt07), accounting.unformat(targetEB.Amt08),
        accounting.unformat(targetEB.Amt09), accounting.unformat(targetEB.Amt10), accounting.unformat(targetEB.Amt11), accounting.unformat(targetEB.Amt12),
        accounting.unformat(totalEBBahtTarget), currEBBahtJanuary, currEBBahtFebruary, currEBBahtMarch, currEBBahtApril, currEBBahtMay, currEBBahtJune, currEBBahtJuly, currEBBahtAugust,
        currEBBahtSeptember, currEBBahtOctober, currEBBahtNovember, currEBBahtDecember, currEBTotalBaht, oldEBBahtJanuary, oldEBBahtFebruary, oldEBBahtMarch, oldEBBahtApril, oldEBBahtMay,
        oldEBBahtJune, oldEBBahtJuly, oldEBBahtAugust, oldEBBahtSeptember, oldEBBahtOctober, oldEBBahtNovember, oldEBBahtDecember, oldEBTotalBaht,
        accounting.unformat(targetIND.Amt01), accounting.unformat(targetIND.Amt02), accounting.unformat(targetIND.Amt03), accounting.unformat(targetIND.Amt04),
        accounting.unformat(targetIND.Amt05), accounting.unformat(targetIND.Amt06), accounting.unformat(targetIND.Amt07), accounting.unformat(targetIND.Amt08),
        accounting.unformat(targetIND.Amt09), accounting.unformat(targetIND.Amt10), accounting.unformat(targetIND.Amt11), accounting.unformat(targetIND.Amt12),
        accounting.unformat(totalINDBahtTarget), currINDBahtJanuary, currINDBahtFebruary, currINDBahtMarch, currINDBahtApril, currINDBahtMay, currINDBahtJune, currINDBahtJuly, currINDBahtAugust,
        currINDBahtSeptember, currINDBahtOctober, currINDBahtNovember, currINDBahtDecember, currINDTotalBaht, oldINDBahtJanuary, oldINDBahtFebruary, oldINDBahtMarch, oldINDBahtApril, oldINDBahtMay,
        oldINDBahtJune, oldINDBahtJuly, oldINDBahtAugust, oldINDBahtSeptember, oldINDBahtOctober, oldINDBahtNovember, oldINDBahtDecember, oldINDTotalBaht,
        accounting.unformat(targetOTH.Amt01), accounting.unformat(targetOTH.Amt02), accounting.unformat(targetOTH.Amt03), accounting.unformat(targetOTH.Amt04),
        accounting.unformat(targetOTH.Amt05), accounting.unformat(targetOTH.Amt06), accounting.unformat(targetOTH.Amt07), accounting.unformat(targetOTH.Amt08),
        accounting.unformat(targetOTH.Amt09), accounting.unformat(targetOTH.Amt10), accounting.unformat(targetOTH.Amt11), accounting.unformat(targetOTH.Amt12),
        accounting.unformat(totalOTHBahtTarget), currOTHBahtJanuary, currOTHBahtFebruary, currOTHBahtMarch, currOTHBahtApril, currOTHBahtMay, currOTHBahtJune, currOTHBahtJuly, currOTHBahtAugust,
        currOTHBahtSeptember, currOTHBahtOctober, currOTHBahtNovember, currOTHBahtDecember, currOTHTotalBaht, oldOTHBahtJanuary, oldOTHBahtFebruary, oldOTHBahtMarch, oldOTHBahtApril, oldOTHBahtMay,
        oldOTHBahtJune, oldOTHBahtJuly, oldOTHBahtAugust, oldOTHBahtSeptember, oldOTHBahtOctober, oldOTHBahtNovember, oldOTHBahtDecember, oldOTHTotalBaht);
    bahtGraphQ(year, accounting.unformat(targetNP.AmtQ1), accounting.unformat(targetNP.AmtQ2), accounting.unformat(targetNP.AmtQ3), accounting.unformat(targetNP.AmtQ4),
        accounting.unformat(totalNPBahtTarget), currNPBahtQ1, currNPBahtQ2, currNPBahtQ3, currNPBahtQ4, currNPTotalBaht, oldNPBahtQ1, oldNPBahtQ2, oldNPBahtQ3, oldNPBahtQ4, oldNPTotalBaht,
        accounting.unformat(targetEB.AmtQ1), accounting.unformat(targetEB.AmtQ2), accounting.unformat(targetEB.AmtQ3), accounting.unformat(targetEB.AmtQ4),
        accounting.unformat(totalEBBahtTarget), currEBBahtQ1, currEBBahtQ2, currEBBahtQ3, currEBBahtQ4, currEBTotalBaht, oldEBBahtQ1, oldEBBahtQ2, oldEBBahtQ3, oldEBBahtQ4, oldEBTotalBaht,
        accounting.unformat(targetIND.AmtQ1), accounting.unformat(targetIND.AmtQ2), accounting.unformat(targetIND.AmtQ3), accounting.unformat(targetIND.AmtQ4),
        accounting.unformat(totalINDBahtTarget), currINDBahtQ1, currINDBahtQ2, currINDBahtQ3, currINDBahtQ4, currINDTotalBaht, oldINDBahtQ1, oldINDBahtQ2, oldINDBahtQ3, oldINDBahtQ4, oldINDTotalBaht,
        accounting.unformat(targetOTH.AmtQ1), accounting.unformat(targetOTH.AmtQ2), accounting.unformat(targetOTH.AmtQ3), accounting.unformat(targetOTH.AmtQ4),
        accounting.unformat(totalOTHBahtTarget), currOTHBahtQ1, currOTHBahtQ2, currOTHBahtQ3, currOTHBahtQ4, currOTHTotalBaht, oldOTHBahtQ1, oldOTHBahtQ2, oldOTHBahtQ3, oldOTHBahtQ4, oldOTHTotalBaht);

}

function unitGraph(year, targetNP1, targetNP2, targetNP3, targetNP4, targetNP5, targetNP6, targetNP7, targetNP8, targetNP9, targetNP10, targetNP11, targetNP12, targetNPTotal, currNPJanuary, currNPFebruary, currNPMarch, currNPApril, currNPMay, currNPJune, currNPJuly, currNPAugust, currNPSeptember, currNPOctober, currNPNovember, currNPDecember, currNPTotal, oldNPJanuary, oldNPFebruary, oldNPMarch, oldNPApril, oldNPMay, oldNPJune, oldNPJuly, oldNPAugust, oldNPSeptember, oldNPOctober, oldNPNovember, oldNPDecember, oldNPTotal,
    targetEB1, targetEB2, targetEB3, targetEB4, targetEB5, targetEB6, targetEB7, targetEB8, targetEB9, targetEB10, targetEB11, targetEB12, targetEBTotal, currEBJanuary, currEBFebruary, currEBMarch, currEBApril, currEBMay, currEBJune, currEBJuly, currEBAugust, currEBSeptember, currEBOctober, currEBNovember, currEBDecember, currEBTotal, oldEBJanuary, oldEBFebruary, oldEBMarch, oldEBApril, oldEBMay, oldEBJune, oldEBJuly, oldEBAugust, oldEBSeptember, oldEBOctober, oldEBNovember, oldEBDecember, oldEBTotal,
    targetIND1, targetIND2, targetIND3, targetIND4, targetIND5, targetIND6, targetIND7, targetIND8, targetIND9, targetIND10, targetIND11, targetIND12, targetINDTotal, currINDJanuary, currINDFebruary, currINDMarch, currINDApril, currINDMay, currINDJune, currINDJuly, currINDAugust, currINDSeptember, currINDOctober, currINDNovember, currINDDecember, currINDTotal, oldINDJanuary, oldINDFebruary, oldINDMarch, oldINDApril, oldINDMay, oldINDJune, oldINDJuly, oldINDAugust, oldINDSeptember, oldINDOctober, oldINDNovember, oldINDDecember, oldINDTotal,
    targetOTH1, targetOTH2, targetOTH3, targetOTH4, targetOTH5, targetOTH6, targetOTH7, targetOTH8, targetOTH9, targetOTH10, targetOTH11, targetOTH12, targetOTHTotal, currOTHJanuary, currOTHFebruary, currOTHMarch, currOTHApril, currOTHMay, currOTHJune, currOTHJuly, currOTHAugust, currOTHSeptember, currOTHOctober, currOTHNovember, currOTHDecember, currOTHTotal, oldOTHJanuary, oldOTHFebruary, oldOTHMarch, oldOTHApril, oldOTHMay, oldOTHJune, oldOTHJuly, oldOTHAugust, oldOTHSeptember, oldOTHOctober, oldOTHNovember, oldOTHDecember, oldOTHTotal) {

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
            name: 'NP ' + (year - 1),
            data: [{
                y: oldNPJanuary,
                month: 1,
                value: accounting.formatNumber(oldNPJanuary)
            }, {
                y: oldNPFebruary,
                month: 2,
                value: accounting.formatNumber(oldNPFebruary)
            }, {
                y: oldNPMarch,
                month: 3,
                value: accounting.formatNumber(oldNPMarch)
            }, {
                y: oldNPApril,
                month: 4,
                value: accounting.formatNumber(oldNPApril)
            }, {
                y: oldNPMay,
                month: 5,
                value: accounting.formatNumber(oldNPMay)
            }, {
                y: oldNPJune,
                month: 6,
                value: accounting.formatNumber(oldNPJune)
            }, {
                y: oldNPJuly,
                month: 7,
                value: accounting.formatNumber(oldNPJuly)
            }, {
                y: oldNPAugust,
                month: 8,
                value: accounting.formatNumber(oldNPAugust)
            }, {
                y: oldNPSeptember,
                month: 9,
                value: accounting.formatNumber(oldNPSeptember)
            }, {
                y: oldNPOctober,
                month: 10,
                value: accounting.formatNumber(oldNPOctober)
            }, {
                y: oldNPNovember,
                month: 11,
                value: accounting.formatNumber(oldNPNovember)
            }, {
                y: oldNPDecember,
                month: 12,
                value: accounting.formatNumber(oldNPDecember)
            }],
            stack: 'old',
            color: '#c1b2e6'
        }, {
            name: 'EB ' + (year - 1),
            data: [{
                y: oldEBJanuary,
                month: 1,
                value: accounting.formatNumber(oldEBJanuary)
            }, {
                y: oldEBFebruary,
                month: 2,
                value: accounting.formatNumber(oldEBFebruary)
            }, {
                y: oldEBMarch,
                month: 3,
                value: accounting.formatNumber(oldEBMarch)
            }, {
                y: oldEBApril,
                month: 4,
                value: accounting.formatNumber(oldEBApril)
            }, {
                y: oldEBMay,
                month: 5,
                value: accounting.formatNumber(oldEBMay)
            }, {
                y: oldEBJune,
                month: 6,
                value: accounting.formatNumber(oldEBJune)
            }, {
                y: oldEBJuly,
                month: 7,
                value: accounting.formatNumber(oldEBJuly)
            }, {
                y: oldEBAugust,
                month: 8,
                value: accounting.formatNumber(oldEBAugust)
            }, {
                y: oldEBSeptember,
                month: 9,
                value: accounting.formatNumber(oldEBSeptember)
            }, {
                y: oldEBOctober,
                month: 10,
                value: accounting.formatNumber(oldEBOctober)
            }, {
                y: oldEBNovember,
                month: 11,
                value: accounting.formatNumber(oldEBNovember)
            }, {
                y: oldEBDecember,
                month: 12,
                value: accounting.formatNumber(oldEBDecember)
            }],
            stack: 'old',
            color: '#dfb9dc'
        }, {
            name: 'IND ' + (year - 1),
            data: [{
                y: oldINDJanuary,
                month: 1,
                value: accounting.formatNumber(oldINDJanuary)
            }, {
                y: oldINDFebruary,
                month: 2,
                value: accounting.formatNumber(oldINDFebruary)
            }, {
                y: oldINDMarch,
                month: 3,
                value: accounting.formatNumber(oldINDMarch)
            }, {
                y: oldINDApril,
                month: 4,
                value: accounting.formatNumber(oldINDApril)
            }, {
                y: oldINDMay,
                month: 5,
                value: accounting.formatNumber(oldINDMay)
            }, {
                y: oldINDJune,
                month: 6,
                value: accounting.formatNumber(oldINDJune)
            }, {
                y: oldINDJuly,
                month: 7,
                value: accounting.formatNumber(oldINDJuly)
            }, {
                y: oldINDAugust,
                month: 8,
                value: accounting.formatNumber(oldINDAugust)
            }, {
                y: oldINDSeptember,
                month: 9,
                value: accounting.formatNumber(oldINDSeptember)
            }, {
                y: oldINDOctober,
                month: 10,
                value: accounting.formatNumber(oldINDOctober)
            }, {
                y: oldINDNovember,
                month: 11,
                value: accounting.formatNumber(oldINDNovember)
            }, {
                y: oldINDDecember,
                month: 12,
                value: accounting.formatNumber(oldINDDecember)
            }],
            stack: 'old',
            color: '#fa99ff'
        }, {
            name: 'OTH ' + (year - 1),
            data: [{
                y: oldOTHJanuary,
                month: 1,
                value: accounting.formatNumber(oldOTHJanuary)
            }, {
                y: oldOTHFebruary,
                month: 2,
                value: accounting.formatNumber(oldOTHFebruary)
            }, {
                y: oldOTHMarch,
                month: 3,
                value: accounting.formatNumber(oldOTHMarch)
            }, {
                y: oldOTHApril,
                month: 4,
                value: accounting.formatNumber(oldOTHApril)
            }, {
                y: oldOTHMay,
                month: 5,
                value: accounting.formatNumber(oldOTHMay)
            }, {
                y: oldOTHJune,
                month: 6,
                value: accounting.formatNumber(oldOTHJune)
            }, {
                y: oldOTHJuly,
                month: 7,
                value: accounting.formatNumber(oldOTHJuly)
            }, {
                y: oldOTHAugust,
                month: 8,
                value: accounting.formatNumber(oldOTHAugust)
            }, {
                y: oldOTHSeptember,
                month: 9,
                value: accounting.formatNumber(oldOTHSeptember)
            }, {
                y: oldOTHOctober,
                month: 10,
                value: accounting.formatNumber(oldOTHOctober)
            }, {
                y: oldOTHNovember,
                month: 11,
                value: accounting.formatNumber(oldOTHNovember)
            }, {
                y: oldOTHDecember,
                month: 12,
                value: accounting.formatNumber(oldOTHDecember)
            }],
            stack: 'old',
            color: '#ff99d6'
        }, {
            name: 'NP ' + year,
            data: [{
                y: currNPJanuary,
                month: 1,
                value: accounting.formatNumber(currNPJanuary)
            }, {
                y: currNPFebruary,
                month: 2,
                value: accounting.formatNumber(currNPFebruary)
            }, {
                y: currNPMarch,
                month: 3,
                value: accounting.formatNumber(currNPMarch)
            }, {
                y: currNPApril,
                month: 4,
                value: accounting.formatNumber(currNPApril)
            }, {
                y: currNPMay,
                month: 5,
                value: accounting.formatNumber(currNPMay)
            }, {
                y: currNPJune,
                month: 6,
                value: accounting.formatNumber(currNPJune)
            }, {
                y: currNPJuly,
                month: 7,
                value: accounting.formatNumber(currNPJuly)
            }, {
                y: currNPAugust,
                month: 8,
                value: accounting.formatNumber(currNPAugust)
            }, {
                y: currNPSeptember,
                month: 9,
                value: accounting.formatNumber(currNPSeptember)
            }, {
                y: currNPOctober,
                month: 10,
                value: accounting.formatNumber(currNPOctober)
            }, {
                y: currNPNovember,
                month: 11,
                value: accounting.formatNumber(currNPNovember)
            }, {
                y: currNPDecember,
                month: 12,
                value: accounting.formatNumber(currNPDecember)
            }],
            stack: 'new',
            color: '#603cba'
        }, {
            name: 'EB ' + year,
            data: [{
                y: currEBJanuary,
                month: 1,
                value: accounting.formatNumber(currEBJanuary)
            }, {
                y: currEBFebruary,
                month: 2,
                value: accounting.formatNumber(currEBFebruary)
            }, {
                y: currEBMarch,
                month: 3,
                value: accounting.formatNumber(currEBMarch)
            }, {
                y: currEBApril,
                month: 4,
                value: accounting.formatNumber(currEBApril)
            }, {
                y: currEBMay,
                month: 5,
                value: accounting.formatNumber(currEBMay)
            }, {
                y: currEBJune,
                month: 6,
                value: accounting.formatNumber(currEBJune)
            }, {
                y: currEBJuly,
                month: 7,
                value: accounting.formatNumber(currEBJuly)
            }, {
                y: currEBAugust,
                month: 8,
                value: accounting.formatNumber(currEBAugust)
            }, {
                y: currEBSeptember,
                month: 9,
                value: accounting.formatNumber(currEBSeptember)
            }, {
                y: currEBOctober,
                month: 10,
                value: accounting.formatNumber(currEBOctober)
            }, {
                y: currEBNovember,
                month: 11,
                value: accounting.formatNumber(currEBNovember)
            }, {
                y: currEBDecember,
                month: 12,
                value: accounting.formatNumber(currEBDecember)
            }],
            stack: 'new',
            color: '#7e3878'
        }, {
            name: 'IND ' + year,
            data: [{
                y: currINDJanuary,
                month: 1,
                value: accounting.formatNumber(currINDJanuary)
            }, {
                y: currINDFebruary,
                month: 2,
                value: accounting.formatNumber(currINDFebruary)
            }, {
                y: currINDMarch,
                month: 3,
                value: accounting.formatNumber(currINDMarch)
            }, {
                y: currINDApril,
                month: 4,
                value: accounting.formatNumber(currINDApril)
            }, {
                y: currINDMay,
                month: 5,
                value: accounting.formatNumber(currINDMay)
            }, {
                y: currINDJune,
                month: 6,
                value: accounting.formatNumber(currINDJune)
            }, {
                y: currINDJuly,
                month: 7,
                value: accounting.formatNumber(currINDJuly)
            }, {
                y: currINDAugust,
                month: 8,
                value: accounting.formatNumber(currINDAugust)
            }, {
                y: currINDSeptember,
                month: 9,
                value: accounting.formatNumber(currINDSeptember)
            }, {
                y: currINDOctober,
                month: 10,
                value: accounting.formatNumber(currINDOctober)
            }, {
                y: currINDNovember,
                month: 11,
                value: accounting.formatNumber(currINDNovember)
            }, {
                y: currINDDecember,
                month: 12,
                value: accounting.formatNumber(currINDDecember)
            }],
            stack: 'new',
            color: '#9f00a7'
        }, {
            name: 'OTH ' + year,
            data: [{
                y: currOTHJanuary,
                month: 1,
                value: accounting.formatNumber(currOTHJanuary)
            }, {
                y: currOTHFebruary,
                month: 2,
                value: accounting.formatNumber(currOTHFebruary)
            }, {
                y: currOTHMarch,
                month: 3,
                value: accounting.formatNumber(currOTHMarch)
            }, {
                y: currOTHApril,
                month: 4,
                value: accounting.formatNumber(currOTHApril)
            }, {
                y: currOTHMay,
                month: 5,
                value: accounting.formatNumber(currOTHMay)
            }, {
                y: currOTHJune,
                month: 6,
                value: accounting.formatNumber(currOTHJune)
            }, {
                y: currOTHJuly,
                month: 7,
                value: accounting.formatNumber(currOTHJuly)
            }, {
                y: currOTHAugust,
                month: 8,
                value: accounting.formatNumber(currOTHAugust)
            }, {
                y: currOTHSeptember,
                month: 9,
                value: accounting.formatNumber(currOTHSeptember)
            }, {
                y: currOTHOctober,
                month: 10,
                value: accounting.formatNumber(currOTHOctober)
            }, {
                y: currOTHNovember,
                month: 11,
                value: accounting.formatNumber(currOTHNovember)
            }, {
                y: currOTHDecember,
                month: 12,
                value: accounting.formatNumber(currOTHDecember)
            }],
            stack: 'new',
            color: '#ff0097'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetNP1 + targetEB1 + targetIND1 + targetOTH1,
                month: 1,
                value: accounting.formatNumber(targetNP1 + targetEB1 + targetIND1 + targetOTH1)
            }, {
                y: targetNP2 + targetEB2 + targetIND2 + targetOTH2,
                month: 2,
                value: accounting.formatNumber(targetNP2 + targetEB2 + targetIND2 + targetOTH2)
            }, {
                y: targetNP3 + targetEB3 + targetIND3 + targetOTH3,
                month: 3,
                value: accounting.formatNumber(targetNP3 + targetEB3 + targetIND3 + targetOTH3)
            }, {
                y: targetNP4 + targetEB4 + targetIND4 + targetOTH4,
                month: 4,
                value: accounting.formatNumber(targetNP4 + targetEB4 + targetIND4 + targetOTH4)
            }, {
                y: targetNP5 + targetEB5 + targetIND5 + targetOTH5,
                month: 5,
                value: accounting.formatNumber(targetNP5 + targetEB5 + targetIND5 + targetOTH5)
            }, {
                y: targetNP6 + targetEB6 + targetIND6 + targetOTH6,
                month: 6,
                value: accounting.formatNumber(targetNP6 + targetEB6 + targetIND6 + targetOTH6)
            }, {
                y: targetNP7 + targetEB7 + targetIND7 + targetOTH7,
                month: 7,
                value: accounting.formatNumber(targetNP7 + targetEB7 + targetIND7 + targetOTH7)
            }, {
                y: targetNP8 + targetEB8 + targetIND8 + targetOTH8,
                month: 8,
                value: accounting.formatNumber(targetNP8 + targetEB8 + targetIND8 + targetOTH8)
            }, {
                y: targetNP9 + targetEB9 + targetIND9 + targetOTH9,
                month: 9,
                value: accounting.formatNumber(targetNP9 + targetEB9 + targetIND9 + targetOTH9)
            }, {
                y: targetNP10 + targetEB10 + targetIND10 + targetOTH10,
                month: 10,
                value: accounting.formatNumber(targetNP10 + targetEB10 + targetIND10 + targetOTH10)
            }, {
                y: targetNP11 + targetEB11 + targetIND11 + targetOTH11,
                month: 11,
                value: accounting.formatNumber(targetNP11 + targetEB11 + targetIND11 + targetOTH11)
            }, {
                y: targetNP12 + targetEB12 + targetIND12 + targetOTH12,
                month: 12,
                value: accounting.formatNumber(targetNP12 + targetEB12 + targetIND12 + targetOTH12)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });
}

function bahtGraph(year, targetNP1, targetNP2, targetNP3, targetNP4, targetNP5, targetNP6, targetNP7, targetNP8, targetNP9, targetNP10, targetNP11, targetNP12, targetNPTotal, currNPJanuary, currNPFebruary, currNPMarch, currNPApril, currNPMay, currNPJune, currNPJuly, currNPAugust, currNPSeptember, currNPOctober, currNPNovember, currNPDecember, currNPTotal, oldNPJanuary, oldNPFebruary, oldNPMarch, oldNPApril, oldNPMay, oldNPJune, oldNPJuly, oldNPAugust, oldNPSeptember, oldNPOctober, oldNPNovember, oldNPDecember, oldNPTotal,
    targetEB1, targetEB2, targetEB3, targetEB4, targetEB5, targetEB6, targetEB7, targetEB8, targetEB9, targetEB10, targetEB11, targetEB12, targetEBTotal, currEBJanuary, currEBFebruary, currEBMarch, currEBApril, currEBMay, currEBJune, currEBJuly, currEBAugust, currEBSeptember, currEBOctober, currEBNovember, currEBDecember, currEBTotal, oldEBJanuary, oldEBFebruary, oldEBMarch, oldEBApril, oldEBMay, oldEBJune, oldEBJuly, oldEBAugust, oldEBSeptember, oldEBOctober, oldEBNovember, oldEBDecember, oldEBTotal,
    targetIND1, targetIND2, targetIND3, targetIND4, targetIND5, targetIND6, targetIND7, targetIND8, targetIND9, targetIND10, targetIND11, targetIND12, targetINDTotal, currINDJanuary, currINDFebruary, currINDMarch, currINDApril, currINDMay, currINDJune, currINDJuly, currINDAugust, currINDSeptember, currINDOctober, currINDNovember, currINDDecember, currINDTotal, oldINDJanuary, oldINDFebruary, oldINDMarch, oldINDApril, oldINDMay, oldINDJune, oldINDJuly, oldINDAugust, oldINDSeptember, oldINDOctober, oldINDNovember, oldINDDecember, oldINDTotal,
    targetOTH1, targetOTH2, targetOTH3, targetOTH4, targetOTH5, targetOTH6, targetOTH7, targetOTH8, targetOTH9, targetOTH10, targetOTH11, targetOTH12, targetOTHTotal, currOTHJanuary, currOTHFebruary, currOTHMarch, currOTHApril, currOTHMay, currOTHJune, currOTHJuly, currOTHAugust, currOTHSeptember, currOTHOctober, currOTHNovember, currOTHDecember, currOTHTotal, oldOTHJanuary, oldOTHFebruary, oldOTHMarch, oldOTHApril, oldOTHMay, oldOTHJune, oldOTHJuly, oldOTHAugust, oldOTHSeptember, oldOTHOctober, oldOTHNovember, oldOTHDecember, oldOTHTotal) {

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
            name: 'NP ' + (year - 1),
            data: [{
                y: oldNPJanuary,
                month: 1,
                value: accounting.formatMoney(oldNPJanuary, "฿")
            }, {
                y: oldNPFebruary,
                month: 2,
                value: accounting.formatMoney(oldNPFebruary, "฿")
            }, {
                y: oldNPMarch,
                month: 3,
                value: accounting.formatMoney(oldNPMarch, "฿")
            }, {
                y: oldNPApril,
                month: 4,
                value: accounting.formatMoney(oldNPApril, "฿")
            }, {
                y: oldNPMay,
                month: 5,
                value: accounting.formatMoney(oldNPMay, "฿")
            }, {
                y: oldNPJune,
                month: 6,
                value: accounting.formatMoney(oldNPJune, "฿")
            }, {
                y: oldNPJuly,
                month: 7,
                value: accounting.formatMoney(oldNPJuly, "฿")
            }, {
                y: oldNPAugust,
                month: 8,
                value: accounting.formatMoney(oldNPAugust, "฿")
            }, {
                y: oldNPSeptember,
                month: 9,
                value: accounting.formatMoney(oldNPSeptember, "฿")
            }, {
                y: oldNPOctober,
                month: 10,
                value: accounting.formatMoney(oldNPOctober, "฿")
            }, {
                y: oldNPNovember,
                month: 11,
                value: accounting.formatMoney(oldNPNovember, "฿")
            }, {
                y: oldNPDecember,
                month: 12,
                value: accounting.formatMoney(oldNPDecember, "฿")
            }],
            stack: 'old',
            color: '#ffe699'
        }, {
            name: 'EB ' + (year - 1),
            data: [{
                y: oldEBJanuary,
                month: 1,
                value: accounting.formatMoney(oldEBJanuary, "฿")
            }, {
                y: oldEBFebruary,
                month: 2,
                value: accounting.formatMoney(oldEBFebruary, "฿")
            }, {
                y: oldEBMarch,
                month: 3,
                value: accounting.formatMoney(oldEBMarch, "฿")
            }, {
                y: oldEBApril,
                month: 4,
                value: accounting.formatMoney(oldEBApril, "฿")
            }, {
                y: oldEBMay,
                month: 5,
                value: accounting.formatMoney(oldEBMay, "฿")
            }, {
                y: oldEBJune,
                month: 6,
                value: accounting.formatMoney(oldEBJune, "฿")
            }, {
                y: oldEBJuly,
                month: 7,
                value: accounting.formatMoney(oldEBJuly, "฿")
            }, {
                y: oldEBAugust,
                month: 8,
                value: accounting.formatMoney(oldEBAugust, "฿")
            }, {
                y: oldEBSeptember,
                month: 9,
                value: accounting.formatMoney(oldEBSeptember, "฿")
            }, {
                y: oldEBOctober,
                month: 10,
                value: accounting.formatMoney(oldEBOctober, "฿")
            }, {
                y: oldEBNovember,
                month: 11,
                value: accounting.formatMoney(oldEBNovember, "฿")
            }, {
                y: oldEBDecember,
                month: 12,
                value: accounting.formatMoney(oldEBDecember, "฿")
            }],
            stack: 'old',
            color: '#f4dba4'
        }, {
            name: 'IND ' + (year - 1),
            data: [{
                y: oldINDJanuary,
                month: 1,
                value: accounting.formatMoney(oldINDJanuary, "฿")
            }, {
                y: oldINDFebruary,
                month: 2,
                value: accounting.formatMoney(oldINDFebruary, "฿")
            }, {
                y: oldINDMarch,
                month: 3,
                value: accounting.formatMoney(oldINDMarch, "฿")
            }, {
                y: oldINDApril,
                month: 4,
                value: accounting.formatMoney(oldINDApril, "฿")
            }, {
                y: oldINDMay,
                month: 5,
                value: accounting.formatMoney(oldINDMay, "฿")
            }, {
                y: oldINDJune,
                month: 6,
                value: accounting.formatMoney(oldINDJune, "฿")
            }, {
                y: oldINDJuly,
                month: 7,
                value: accounting.formatMoney(oldINDJuly, "฿")
            }, {
                y: oldINDAugust,
                month: 8,
                value: accounting.formatMoney(oldINDAugust, "฿")
            }, {
                y: oldINDSeptember,
                month: 9,
                value: accounting.formatMoney(oldINDSeptember, "฿")
            }, {
                y: oldINDOctober,
                month: 10,
                value: accounting.formatMoney(oldINDOctober, "฿")
            }, {
                y: oldINDNovember,
                month: 11,
                value: accounting.formatMoney(oldINDNovember, "฿")
            }, {
                y: oldINDDecember,
                month: 12,
                value: accounting.formatMoney(oldINDDecember, "฿")
            }],
            stack: 'old',
            color: '#f0b8a8'
        }, {
            name: 'OTH ' + (year - 1),
            data: [{
                y: oldOTHJanuary,
                month: 1,
                value: accounting.formatMoney(oldOTHJanuary, "฿")
            }, {
                y: oldOTHFebruary,
                month: 2,
                value: accounting.formatMoney(oldOTHFebruary, "฿")
            }, {
                y: oldOTHMarch,
                month: 3,
                value: accounting.formatMoney(oldOTHMarch, "฿")
            }, {
                y: oldOTHApril,
                month: 4,
                value: accounting.formatMoney(oldOTHApril, "฿")
            }, {
                y: oldOTHMay,
                month: 5,
                value: accounting.formatMoney(oldOTHMay, "฿")
            }, {
                y: oldOTHJune,
                month: 6,
                value: accounting.formatMoney(oldOTHJune, "฿")
            }, {
                y: oldOTHJuly,
                month: 7,
                value: accounting.formatMoney(oldOTHJuly, "฿")
            }, {
                y: oldOTHAugust,
                month: 8,
                value: accounting.formatMoney(oldOTHAugust, "฿")
            }, {
                y: oldOTHSeptember,
                month: 9,
                value: accounting.formatMoney(oldOTHSeptember, "฿")
            }, {
                y: oldOTHOctober,
                month: 10,
                value: accounting.formatMoney(oldOTHOctober, "฿")
            }, {
                y: oldOTHNovember,
                month: 11,
                value: accounting.formatMoney(oldOTHNovember, "฿")
            }, {
                y: oldOTHDecember,
                month: 12,
                value: accounting.formatMoney(oldOTHDecember, "฿")
            }],
            stack: 'old',
            color: '#f8a0a0'
        }, {
            name: 'NP ' + year,
            data: [{
                y: currNPJanuary,
                month: 1,
                value: accounting.formatMoney(currNPJanuary, "฿")
            }, {
                y: currNPFebruary,
                month: 2,
                value: accounting.formatMoney(currNPFebruary, "฿")
            }, {
                y: currNPMarch,
                month: 3,
                value: accounting.formatMoney(currNPMarch, "฿")
            }, {
                y: currNPApril,
                month: 4,
                value: accounting.formatMoney(currNPApril, "฿")
            }, {
                y: currNPMay,
                month: 5,
                value: accounting.formatMoney(currNPMay, "฿")
            }, {
                y: currNPJune,
                month: 6,
                value: accounting.formatMoney(currNPJune, "฿")
            }, {
                y: currNPJuly,
                month: 7,
                value: accounting.formatMoney(currNPJuly, "฿")
            }, {
                y: currNPAugust,
                month: 8,
                value: accounting.formatMoney(currNPAugust, "฿")
            }, {
                y: currNPSeptember,
                month: 9,
                value: accounting.formatMoney(currNPSeptember, "฿")
            }, {
                y: currNPOctober,
                month: 10,
                value: accounting.formatMoney(currNPOctober, "฿")
            }, {
                y: currNPNovember,
                month: 11,
                value: accounting.formatMoney(currNPNovember, "฿")
            }, {
                y: currNPDecember,
                month: 12,
                value: accounting.formatMoney(currNPDecember, "฿")
            }],
            stack: 'new',
            color: '#ffc40d'
        }, {
            name: 'EB ' + year,
            data: [{
                y: currEBJanuary,
                month: 1,
                value: accounting.formatMoney(currEBJanuary, "฿")
            }, {
                y: currEBFebruary,
                month: 2,
                value: accounting.formatMoney(currEBFebruary, "฿")
            }, {
                y: currEBMarch,
                month: 3,
                value: accounting.formatMoney(currEBMarch, "฿")
            }, {
                y: currEBApril,
                month: 4,
                value: accounting.formatMoney(currEBApril, "฿")
            }, {
                y: currEBMay,
                month: 5,
                value: accounting.formatMoney(currEBMay, "฿")
            }, {
                y: currEBJune,
                month: 6,
                value: accounting.formatMoney(currEBJune, "฿")
            }, {
                y: currEBJuly,
                month: 7,
                value: accounting.formatMoney(currEBJuly, "฿")
            }, {
                y: currEBAugust,
                month: 8,
                value: accounting.formatMoney(currEBAugust, "฿")
            }, {
                y: currEBSeptember,
                month: 9,
                value: accounting.formatMoney(currEBSeptember, "฿")
            }, {
                y: currEBOctober,
                month: 10,
                value: accounting.formatMoney(currEBOctober, "฿")
            }, {
                y: currEBNovember,
                month: 11,
                value: accounting.formatMoney(currEBNovember, "฿")
            }, {
                y: currEBDecember,
                month: 12,
                value: accounting.formatMoney(currEBDecember, "฿")
            }],
            stack: 'new',
            color: '#e3a21a'
        }, {
            name: 'IND ' + year,
            data: [{
                y: currINDJanuary,
                month: 1,
                value: accounting.formatMoney(currINDJanuary, "฿")
            }, {
                y: currINDFebruary,
                month: 2,
                value: accounting.formatMoney(currINDFebruary, "฿")
            }, {
                y: currINDMarch,
                month: 3,
                value: accounting.formatMoney(currINDMarch, "฿")
            }, {
                y: currINDApril,
                month: 4,
                value: accounting.formatMoney(currINDApril, "฿")
            }, {
                y: currINDMay,
                month: 5,
                value: accounting.formatMoney(currINDMay, "฿")
            }, {
                y: currINDJune,
                month: 6,
                value: accounting.formatMoney(currINDJune, "฿")
            }, {
                y: currINDJuly,
                month: 7,
                value: accounting.formatMoney(currINDJuly, "฿")
            }, {
                y: currINDAugust,
                month: 8,
                value: accounting.formatMoney(currINDAugust, "฿")
            }, {
                y: currINDSeptember,
                month: 9,
                value: accounting.formatMoney(currINDSeptember, "฿")
            }, {
                y: currINDOctober,
                month: 10,
                value: accounting.formatMoney(currINDOctober, "฿")
            }, {
                y: currINDNovember,
                month: 11,
                value: accounting.formatMoney(currINDNovember, "฿")
            }, {
                y: currINDDecember,
                month: 12,
                value: accounting.formatMoney(currINDDecember, "฿")
            }],
            stack: 'new',
            color: '#da532c'
        }, {
            name: 'OTH ' + year,
            data: [{
                y: currOTHJanuary,
                month: 1,
                value: accounting.formatMoney(currOTHJanuary, "฿")
            }, {
                y: currOTHFebruary,
                month: 2,
                value: accounting.formatMoney(currOTHFebruary, "฿")
            }, {
                y: currOTHMarch,
                month: 3,
                value: accounting.formatMoney(currOTHMarch, "฿")
            }, {
                y: currOTHApril,
                month: 4,
                value: accounting.formatMoney(currOTHApril, "฿")
            }, {
                y: currOTHMay,
                month: 5,
                value: accounting.formatMoney(currOTHMay, "฿")
            }, {
                y: currOTHJune,
                month: 6,
                value: accounting.formatMoney(currOTHJune, "฿")
            }, {
                y: currOTHJuly,
                month: 7,
                value: accounting.formatMoney(currOTHJuly, "฿")
            }, {
                y: currOTHAugust,
                month: 8,
                value: accounting.formatMoney(currOTHAugust, "฿")
            }, {
                y: currOTHSeptember,
                month: 9,
                value: accounting.formatMoney(currOTHSeptember, "฿")
            }, {
                y: currOTHOctober,
                month: 10,
                value: accounting.formatMoney(currOTHOctober, "฿")
            }, {
                y: currOTHNovember,
                month: 11,
                value: accounting.formatMoney(currOTHNovember, "฿")
            }, {
                y: currOTHDecember,
                month: 12,
                value: accounting.formatMoney(currOTHDecember, "฿")
            }],
            stack: 'new',
            color: '#ee1111'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetNP1 + targetEB1 + targetIND1 + targetOTH1,
                month: 1,
                value: accounting.formatMoney(targetNP1 + targetEB1 + targetIND1 + targetOTH1, "฿")
            }, {
                y: targetNP2 + targetEB2 + targetIND2 + targetOTH2,
                month: 2,
                value: accounting.formatMoney(targetNP2 + targetEB2 + targetIND2 + targetOTH2, "฿")
            }, {
                y: targetNP3 + targetEB3 + targetIND3 + targetOTH3,
                month: 3,
                value: accounting.formatMoney(targetNP3 + targetEB3 + targetIND3 + targetOTH3, "฿")
            }, {
                y: targetNP4 + targetEB4 + targetIND4 + targetOTH4,
                month: 4,
                value: accounting.formatMoney(targetNP4 + targetEB4 + targetIND4 + targetOTH4, "฿")
            }, {
                y: targetNP5 + targetEB5 + targetIND5 + targetOTH5,
                month: 5,
                value: accounting.formatMoney(targetNP5 + targetEB5 + targetIND5 + targetOTH5, "฿")
            }, {
                y: targetNP6 + targetEB6 + targetIND6 + targetOTH6,
                month: 6,
                value: accounting.formatMoney(targetNP6 + targetEB6 + targetIND6 + targetOTH6, "฿")
            }, {
                y: targetNP7 + targetEB7 + targetIND7 + targetOTH7,
                month: 7,
                value: accounting.formatMoney(targetNP7 + targetEB7 + targetIND7 + targetOTH7, "฿")
            }, {
                y: targetNP8 + targetEB8 + targetIND8 + targetOTH8,
                month: 8,
                value: accounting.formatMoney(targetNP8 + targetEB8 + targetIND8 + targetOTH8, "฿")
            }, {
                y: targetNP9 + targetEB9 + targetIND9 + targetOTH9,
                month: 9,
                value: accounting.formatMoney(targetNP9 + targetEB9 + targetIND9 + targetOTH9, "฿")
            }, {
                y: targetNP10 + targetEB10 + targetIND10 + targetOTH10,
                month: 10,
                value: accounting.formatMoney(targetNP10 + targetEB10 + targetIND10 + targetOTH10, "฿")
            }, {
                y: targetNP11 + targetEB11 + targetIND11 + targetOTH11,
                month: 11,
                value: accounting.formatMoney(targetNP11 + targetEB11 + targetIND11 + targetOTH11, "฿")
            }, {
                y: targetNP12 + targetEB12 + targetIND12 + targetOTH12,
                month: 12,
                value: accounting.formatMoney(targetNP12 + targetEB12 + targetIND12 + targetOTH12, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]

    });

}

function unitGraphQ(year, targetNPQ1, targetNPQ2, targetNPQ3, targetNPQ4, targetNPTotal, currNPQ1, currNPQ2, currNPQ3, currNPQ4, currNPTotal, oldNPQ1, oldNPQ2, oldNPQ3, oldNPQ4, oldNPTotal,
    targetEBQ1, targetEBQ2, targetEBQ3, targetEBQ4, targetEBTotal, currEBQ1, currEBQ2, currEBQ3, currEBQ4, currEBTotal, oldEBQ1, oldEBQ2, oldEBQ3, oldEBQ4, oldEBTotal,
    targetINDQ1, targetINDQ2, targetINDQ3, targetINDQ4, targetINDTotal, currINDQ1, currINDQ2, currINDQ3, currINDQ4, currINDTotal, oldINDQ1, oldINDQ2, oldINDQ3, oldINDQ4, oldINDTotal,
    targetOTHQ1, targetOTHQ2, targetOTHQ3, targetOTHQ4, targetOTHTotal, currOTHQ1, currOTHQ2, currOTHQ3, currOTHQ4, currOTHTotal, oldOTHQ1, oldOTHQ2, oldOTHQ3, oldOTHQ4, oldOTHTotal) {

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
            name: 'NP ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldNPQ1,
                month: 1,
                value: accounting.formatNumber(oldNPQ1)
            }, {
                y: oldNPQ2,
                month: 2,
                value: accounting.formatNumber(oldNPQ2)
            }, {
                y: oldNPQ3,
                month: 3,
                value: accounting.formatNumber(oldNPQ3)
            }, {
                y: oldNPQ4,
                month: 4,
                value: accounting.formatNumber(oldNPQ4)
            }],
            color: '#c1b2e6'
        }, {
            type: 'column',
            name: 'EB ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldEBQ1,
                month: 1,
                value: accounting.formatNumber(oldEBQ1)
            }, {
                y: oldEBQ2,
                month: 2,
                value: accounting.formatNumber(oldEBQ2)
            }, {
                y: oldEBQ3,
                month: 3,
                value: accounting.formatNumber(oldEBQ3)
            }, {
                y: oldEBQ4,
                month: 4,
                value: accounting.formatNumber(oldEBQ4)
            }],
            color: '#dfb9dc'
        }, {
            type: 'column',
            name: 'IND ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldINDQ1,
                month: 1,
                value: accounting.formatNumber(oldINDQ1)
            }, {
                y: oldINDQ2,
                month: 2,
                value: accounting.formatNumber(oldINDQ2)
            }, {
                y: oldINDQ3,
                month: 3,
                value: accounting.formatNumber(oldINDQ3)
            }, {
                y: oldINDQ4,
                month: 4,
                value: accounting.formatNumber(oldINDQ4)
            }],
            color: '#fa99ff'
        }, {
            type: 'column',
            name: 'OTH ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldOTHQ1,
                month: 1,
                value: accounting.formatNumber(oldOTHQ1)
            }, {
                y: oldOTHQ2,
                month: 2,
                value: accounting.formatNumber(oldOTHQ2)
            }, {
                y: oldOTHQ3,
                month: 3,
                value: accounting.formatNumber(oldOTHQ3)
            }, {
                y: oldOTHQ4,
                month: 4,
                value: accounting.formatNumber(oldOTHQ4)
            }],
            color: '#ff99d6'
        }, {
            type: 'column',
            name: 'NP ' + year,
            stack: 'new',
            data: [{
                y: currNPQ1,
                month: 1,
                value: accounting.formatNumber(currNPQ1)
            }, {
                y: currNPQ2,
                month: 2,
                value: accounting.formatNumber(currNPQ2)
            }, {
                y: currNPQ3,
                month: 3,
                value: accounting.formatNumber(currNPQ3)
            }, {
                y: currNPQ4,
                month: 4,
                value: accounting.formatNumber(currNPQ4)
            }],
            color: '#2988bc'
        }, {
            type: 'column',
            name: 'EB ' + year,
            stack: 'new',
            data: [{
                y: currEBQ1,
                month: 1,
                value: accounting.formatNumber(currEBQ1)
            }, {
                y: currEBQ2,
                month: 2,
                value: accounting.formatNumber(currEBQ2)
            }, {
                y: currEBQ3,
                month: 3,
                value: accounting.formatNumber(currEBQ3)
            }, {
                y: currEBQ4,
                month: 4,
                value: accounting.formatNumber(currEBQ4)
            }],
            color: '#603cba'
        }, {
            type: 'column',
            name: 'IND ' + year,
            stack: 'new',
            data: [{
                y: currINDQ1,
                month: 1,
                value: accounting.formatNumber(currINDQ1)
            }, {
                y: currINDQ2,
                month: 2,
                value: accounting.formatNumber(currINDQ2)
            }, {
                y: currINDQ3,
                month: 3,
                value: accounting.formatNumber(currINDQ3)
            }, {
                y: currINDQ4,
                month: 4,
                value: accounting.formatNumber(currINDQ4)
            }],
            color: '#7e3878'
        }, {
            type: 'column',
            name: 'OTH ' + year,
            stack: 'new',
            data: [{
                y: currOTHQ1,
                month: 1,
                value: accounting.formatNumber(currOTHQ1)
            }, {
                y: currOTHQ2,
                month: 2,
                value: accounting.formatNumber(currOTHQ2)
            }, {
                y: currOTHQ3,
                month: 3,
                value: accounting.formatNumber(currOTHQ3)
            }, {
                y: currOTHQ4,
                month: 4,
                value: accounting.formatNumber(currOTHQ4)
            }],
            color: '#9f00a7'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetNPQ1 + targetEBQ1 + targetINDQ1 + targetOTHQ1,
                month: 1,
                value: accounting.formatNumber(targetNPQ1 + targetEBQ1 + targetINDQ1 + targetOTHQ1)
            }, {
                y: targetNPQ2 + targetEBQ2 + targetINDQ2 + targetOTHQ2,
                month: 2,
                value: accounting.formatNumber(targetNPQ2 + targetEBQ2 + targetINDQ2 + targetOTHQ2)
            }, {
                y: targetNPQ3 + targetEBQ3 + targetINDQ3 + targetOTHQ3,
                month: 3,
                value: accounting.formatNumber(targetNPQ3 + targetEBQ3 + targetINDQ3 + targetOTHQ3)
            }, {
                y: targetNPQ4 + targetEBQ4 + targetINDQ4 + targetOTHQ4,
                month: 4,
                value: accounting.formatNumber(targetNPQ4 + targetEBQ4 + targetINDQ4 + targetOTHQ4)
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#ff0097'
        }]
    });
}

function bahtGraphQ(year, targetNPQ1, targetNPQ2, targetNPQ3, targetNPQ4, targetNPTotal, currNPQ1, currNPQ2, currNPQ3, currNPQ4, currNPTotal, oldNPQ1, oldNPQ2, oldNPQ3, oldNPQ4, oldNPTotal,
    targetEBQ1, targetEBQ2, targetEBQ3, targetEBQ4, targetEBTotal, currEBQ1, currEBQ2, currEBQ3, currEBQ4, currEBTotal, oldEBQ1, oldEBQ2, oldEBQ3, oldEBQ4, oldEBTotal,
    targetINDQ1, targetINDQ2, targetINDQ3, targetINDQ4, targetINDTotal, currINDQ1, currINDQ2, currINDQ3, currINDQ4, currINDTotal, oldINDQ1, oldINDQ2, oldINDQ3, oldINDQ4, oldINDTotal,
    targetOTHQ1, targetOTHQ2, targetOTHQ3, targetOTHQ4, targetOTHTotal, currOTHQ1, currOTHQ2, currOTHQ3, currOTHQ4, currOTHTotal, oldOTHQ1, oldOTHQ2, oldOTHQ3, oldOTHQ4, oldOTHTotal) {

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
            name: 'NP ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldNPQ1,
                month: 1,
                value: accounting.formatMoney(oldNPQ1, "฿")
            }, {
                y: oldNPQ2,
                month: 2,
                value: accounting.formatMoney(oldNPQ2, "฿")
            }, {
                y: oldNPQ3,
                month: 3,
                value: accounting.formatMoney(oldNPQ3, "฿")
            }, {
                y: oldNPQ4,
                month: 4,
                value: accounting.formatMoney(oldNPQ4, "฿")
            }],
            color: '#ffe699'
        }, {
            type: 'column',
            name: 'EB ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldEBQ1,
                month: 1,
                value: accounting.formatMoney(oldEBQ1, "฿")
            }, {
                y: oldEBQ2,
                month: 2,
                value: accounting.formatMoney(oldEBQ2, "฿")
            }, {
                y: oldEBQ3,
                month: 3,
                value: accounting.formatMoney(oldEBQ3, "฿")
            }, {
                y: oldEBQ4,
                month: 4,
                value: accounting.formatMoney(oldEBQ4, "฿")
            }],
            color: '#f4dba4'
        }, {
            type: 'column',
            name: 'IND ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldINDQ1,
                month: 1,
                value: accounting.formatMoney(oldINDQ1, "฿")
            }, {
                y: oldINDQ2,
                month: 2,
                value: accounting.formatMoney(oldINDQ2, "฿")
            }, {
                y: oldINDQ3,
                month: 3,
                value: accounting.formatMoney(oldINDQ3, "฿")
            }, {
                y: oldINDQ4,
                month: 4,
                value: accounting.formatMoney(oldINDQ4, "฿")
            }],
            color: '#f0b8a8'
        }, {
            type: 'column',
            name: 'OTH ' + (year - 1),
            stack: 'old',
            data: [{
                y: oldOTHQ1,
                month: 1,
                value: accounting.formatMoney(oldOTHQ1, "฿")
            }, {
                y: oldOTHQ2,
                month: 2,
                value: accounting.formatMoney(oldOTHQ2, "฿")
            }, {
                y: oldOTHQ3,
                month: 3,
                value: accounting.formatMoney(oldOTHQ3, "฿")
            }, {
                y: oldOTHQ4,
                month: 4,
                value: accounting.formatMoney(oldOTHQ4, "฿")
            }],
            color: '#f8a0a0'
        }, {
            type: 'column',
            name: 'NP ' + year,
            stack: 'new',
            data: [{
                y: currNPQ1,
                month: 1,
                value: accounting.formatMoney(currNPQ1, "฿")
            }, {
                y: currNPQ2,
                month: 2,
                value: accounting.formatMoney(currNPQ2, "฿")
            }, {
                y: currNPQ3,
                month: 3,
                value: accounting.formatMoney(currNPQ3, "฿")
            }, {
                y: currNPQ4,
                month: 4,
                value: accounting.formatMoney(currNPQ4, "฿")
            }],
            color: '#ffc40d'
        }, {
            type: 'column',
            name: 'EB ' + year,
            stack: 'new',
            data: [{
                y: currEBQ1,
                month: 1,
                value: accounting.formatMoney(currEBQ1, "฿")
            }, {
                y: currEBQ2,
                month: 2,
                value: accounting.formatMoney(currEBQ2, "฿")
            }, {
                y: currEBQ3,
                month: 3,
                value: accounting.formatMoney(currEBQ3, "฿")
            }, {
                y: currEBQ4,
                month: 4,
                value: accounting.formatMoney(currEBQ4, "฿")
            }],
            color: '#e3a21a'
        }, {
            type: 'column',
            name: 'IND ' + year,
            stack: 'new',
            data: [{
                y: currINDQ1,
                month: 1,
                value: accounting.formatMoney(currINDQ1, "฿")
            }, {
                y: currINDQ2,
                month: 2,
                value: accounting.formatMoney(currINDQ2, "฿")
            }, {
                y: currINDQ3,
                month: 3,
                value: accounting.formatMoney(currINDQ3, "฿")
            }, {
                y: currINDQ4,
                month: 4,
                value: accounting.formatMoney(currINDQ4, "฿")
            }],
            color: '#da532c'
        }, {
            type: 'column',
            name: 'OTH ' + year,
            stack: 'new',
            data: [{
                y: currOTHQ1,
                month: 1,
                value: accounting.formatMoney(currOTHQ1, "฿")
            }, {
                y: currOTHQ2,
                month: 2,
                value: accounting.formatMoney(currOTHQ2, "฿")
            }, {
                y: currOTHQ3,
                month: 3,
                value: accounting.formatMoney(currOTHQ3, "฿")
            }, {
                y: currOTHQ4,
                month: 4,
                value: accounting.formatMoney(currOTHQ4, "฿")
            }],
            color: '#ee1111'
        }, {
            type: 'spline',
            name: 'Target ' + year,
            data: [{
                y: targetNPQ1 + targetEBQ1 + targetINDQ1 + targetOTHQ1,
                month: 1,
                value: accounting.formatMoney(targetNPQ1 + targetEBQ1 + targetINDQ1 + targetOTHQ1, "฿")
            }, {
                y: targetNPQ2 + targetEBQ2 + targetINDQ2 + targetOTHQ2,
                month: 2,
                value: accounting.formatMoney(targetNPQ2 + targetEBQ2 + targetINDQ2 + targetOTHQ2, "฿")
            }, {
                y: targetNPQ3 + targetEBQ3 + targetINDQ3 + targetOTHQ3,
                month: 3,
                value: accounting.formatMoney(targetNPQ3 + targetEBQ3 + targetINDQ3 + targetOTHQ3, "฿")
            }, {
                y: targetNPQ4 + targetEBQ4 + targetINDQ4 + targetOTHQ4,
                month: 4,
                value: accounting.formatMoney(targetNPQ4 + targetEBQ4 + targetINDQ4 + targetOTHQ4, "฿")
            }],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            color: '#69acde'
        }]
    });

}