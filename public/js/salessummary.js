$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    addTable();
    selectData($("ul.sub-ysd > li.active").find('a').data("value"), $("a.date-picker-year").text());
    $('#m').val($("ul.sub-ysd > li.active").find('a').data("value"));
    $('#y').val($("a.date-picker-year").text());
    $('#c').val($("ul.pull-right").find("li.active").text());

    //Change Year
    $(".date-picker-year").datepicker({
        minViewMode: 2,
        format: 'yyyy'
    }).on("changeYear", function(e) {
        var currYear = String(e.date).split(" ")[3];
        $(".date-picker-year").text(currYear);
        selectData($("ul.sub-ysd > li.active").find('a').data("value"), $("a.date-picker-year").text());
        $('#y').val($("a.date-picker-year").text());
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
            $('#c').val($(this).text());
            $("#Month").text($("ul.sub-ysd").find("li.active").text());
            $('#m').val($("ul.sub-ysd > li.active").find('a').data("value"));
        } else {
            $('#Company').text($(this).text());
            $('#c').val($(this).text());
            $("#Month").text("");
            $('#m').val("");
        }
    });

    $(document).on("click", "ul.sub-ysd > li.active", function() {
        if ($(this).text() == 'Year to Date') {
            $('#Month').text("");
            $('#m').val("");
        } else {
            $('#Month').text($(this).text());
            $('#m').val($("ul.sub-ysd > li.active").find('a').data("value"));
        }
        selectData($(this).find('a').data("value"), $("a.date-picker-year").text());
    });

    //Scroll down
    $(document).on("click", "#click", function() {
        if ($("#pieSection").css('display') != 'none') {
            $('html, body').animate({
                scrollTop: $("#pieSection").offset().top
            }, 2000);
        }
    });

    $(document).on("click", "#pdf", function() {
        var arr = new Array();
        var index = $("div[id^=container1_]").attr("id").split("_")[1];
        arr.push($('#container1_' + index).highcharts());
        arr.push($('#container2_' + index).highcharts());
        arr.push($('#container3_' + index).highcharts());
        arr.push($('#container4_' + index).highcharts());

        save_chart(arr, function(result) {
            $('#downloadPDF').submit();
        });

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
                var txtHead = "";
                var nameMonth = $("ul.sub-ysd > li.active").text();
                if (nameMonth == 'Year to Date') {
                    txtHead = "Sales Summary: " + year;
                } else {
                    txtHead = "Sales Summary: " + nameMonth + " " + year;
                }

                Product.DataTable().destroy();
                var p = Product.dataTable({
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
                });

                var buttonsProduct = new $.fn.dataTable.Buttons(p, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            title: txtHead
                        }, {
                            extend: 'pdf',
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: txtHead,
                            title: txtHead,
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
                                doc.pageMargins = [20, 80, 20, 40];
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
                            title: txtHead
                        }
                    ]
                }).container().appendTo($('#exportProduct'));

                Customer.DataTable().destroy();
                var c = Customer.dataTable({
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

                var buttonsCustomer = new $.fn.dataTable.Buttons(c, {
                    buttons: [
                        'print',
                        {
                            extend: 'excel',
                            title: txtHead
                        }, {
                            extend: 'pdf',
                            orientation: 'portrait', //landscape
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            filename: txtHead,
                            title: txtHead,
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
                                doc.pageMargins = [20, 80, 20, 40];
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
                                    doc.content[0].table.body[i][2].alignment = 'right';
                                    doc.content[0].table.body[i][3].alignment = 'right';
                                };

                            }
                        }, {
                            extend: 'csv',
                            title: txtHead
                        }
                    ]
                }).container().appendTo($('#exportCustomer'));

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

    $('#REM_AB_Unit_' + month).html(accounting.formatNumber(REM_AB_Unit));
    $('#REM_AB_Baht_' + month).html(accounting.formatMoney(REM_AB_Baht, "฿"));
    $('#REM_MB_Unit_' + month).html(accounting.formatNumber(REM_MB_Unit));
    $('#REM_MB_Baht_' + month).html(accounting.formatMoney(REM_MB_Baht, "฿"));
    $('#REM_EB_Unit_' + month).html(accounting.formatNumber(REM_EB_Unit));
    $('#REM_EB_Baht_' + month).html(accounting.formatMoney(REM_EB_Baht, "฿"));
    $('#REM_PR_Unit_' + month).html(accounting.formatNumber(REM_PR_Unit));
    $('#REM_PR_Baht_' + month).html(accounting.formatMoney(REM_PR_Baht, "฿"));
    $('#REM_OT_Unit_' + month).html(accounting.formatNumber(REM_OT_Unit));
    $('#REM_OT_Baht_' + month).html(accounting.formatMoney(REM_OT_Baht, "฿"));
    $('#MTD_AB_Unit_' + month).html(accounting.formatNumber(MTD_AB_Unit));
    $('#MTD_AB_Baht_' + month).html(accounting.formatMoney(MTD_AB_Baht, "฿"));
    $('#MTD_MB_Unit_' + month).html(accounting.formatNumber(MTD_MB_Unit));
    $('#MTD_MB_Baht_' + month).html(accounting.formatMoney(MTD_MB_Baht, "฿"));
    $('#MTD_EB_Unit_' + month).html(accounting.formatNumber(MTD_EB_Unit));
    $('#MTD_EB_Baht_' + month).html(accounting.formatMoney(MTD_EB_Baht, "฿"));
    $('#MTD_PR_Unit_' + month).html(accounting.formatNumber(MTD_PR_Unit));
    $('#MTD_PR_Baht_' + month).html(accounting.formatMoney(MTD_PR_Baht, "฿"));
    $('#MTD_OT_Unit_' + month).html(accounting.formatNumber(MTD_OT_Unit));
    $('#MTD_OT_Baht_' + month).html(accounting.formatMoney(MTD_OT_Baht, "฿"));
    $('#SPD_AB_Unit_' + month).html(accounting.formatNumber(SPD_AB_Unit));
    $('#SPD_AB_Baht_' + month).html(accounting.formatMoney(SPD_AB_Baht, "฿"));
    $('#SPD_MB_Unit_' + month).html(accounting.formatNumber(SPD_MB_Unit));
    $('#SPD_MB_Baht_' + month).html(accounting.formatMoney(SPD_MB_Baht, "฿"));
    $('#SPD_EB_Unit_' + month).html(accounting.formatNumber(SPD_EB_Unit));
    $('#SPD_EB_Baht_' + month).html(accounting.formatMoney(SPD_EB_Baht, "฿"));
    $('#SPD_PR_Unit_' + month).html(accounting.formatNumber(SPD_PR_Unit));
    $('#SPD_PR_Baht_' + month).html(accounting.formatMoney(SPD_PR_Baht, "฿"));
    $('#SPD_OT_Unit_' + month).html(accounting.formatNumber(SPD_OT_Unit));
    $('#SPD_OT_Baht_' + month).html(accounting.formatMoney(SPD_OT_Baht, "฿"));
    $('#ST_AB_Unit_' + month).html(accounting.formatNumber(ST_AB_Unit));
    $('#ST_AB_Baht_' + month).html(accounting.formatMoney(ST_AB_Baht, "฿"));
    $('#ST_MB_Unit_' + month).html(accounting.formatNumber(ST_MB_Unit));
    $('#ST_MB_Baht_' + month).html(accounting.formatMoney(ST_MB_Baht, "฿"));
    $('#ST_EB_Unit_' + month).html(accounting.formatNumber(ST_EB_Unit));
    $('#ST_EB_Baht_' + month).html(accounting.formatMoney(ST_EB_Baht, "฿"));
    $('#ST_PR_Unit_' + month).html(accounting.formatNumber(ST_PR_Unit));
    $('#ST_PR_Baht_' + month).html(accounting.formatMoney(ST_PR_Baht, "฿"));
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
    var PRUnitResult = REM_PR_Unit + MTD_PR_Unit + SPD_PR_Unit + ST_PR_Unit;
    var PRBahtResult = REM_PR_Baht + MTD_PR_Baht + SPD_PR_Baht + ST_PR_Baht;
    $('#Total_AB_Unit_' + month).html(accounting.formatNumber(ABUnitResult));
    $('#Total_AB_Baht_' + month).html(accounting.formatMoney(ABBahtResult, "฿"));
    $('#Total_MB_Unit_' + month).html(accounting.formatNumber(MBUnitResult));
    $('#Total_MB_Baht_' + month).html(accounting.formatMoney(MBBahtResult, "฿"));
    $('#Total_EB_Unit_' + month).html(accounting.formatNumber(EBUnitResult));
    $('#Total_EB_Baht_' + month).html(accounting.formatMoney(EBBahtResult, "฿"));
    $('#Total_OT_Unit_' + month).html(accounting.formatNumber(OTUnitResult));
    $('#Total_OT_Baht_' + month).html(accounting.formatMoney(OTBahtResult, "฿"));
    $('#Total_PR_Unit_' + month).html(accounting.formatNumber(PRUnitResult));
    $('#Total_PR_Baht_' + month).html(accounting.formatMoney(PRBahtResult, "฿"));

    //Total Bottom
    var REMUnitResult = REM_AB_Unit + REM_MB_Unit + REM_EB_Unit + REM_PR_Unit + REM_OT_Unit;
    var REMBahtResult = REM_AB_Baht + REM_MB_Baht + REM_EB_Baht + REM_PR_Baht + REM_OT_Baht;
    var MTDUnitResult = MTD_AB_Unit + MTD_MB_Unit + MTD_EB_Unit + MTD_PR_Unit + MTD_OT_Unit;
    var MTDBahtResult = MTD_AB_Baht + MTD_MB_Baht + MTD_EB_Baht + MTD_PR_Baht + MTD_OT_Baht;
    var SPDUnitResult = SPD_AB_Unit + SPD_MB_Unit + SPD_EB_Unit + SPD_PR_Unit + SPD_OT_Unit;
    var SPDBahtResult = SPD_AB_Baht + SPD_MB_Baht + SPD_EB_Baht + SPD_PR_Baht + SPD_OT_Baht;
    var STUnitResult = ST_AB_Unit + ST_MB_Unit + ST_EB_Unit + ST_PR_Unit + ST_OT_Unit;
    var STBahtResult = ST_AB_Baht + ST_MB_Baht + ST_EB_Baht + ST_PR_Baht + ST_OT_Baht;
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
        $('#click').css("display", "none");
        $('#pdf').css("display", "none");
    } else {
        //Show Pie Charts
        $('#pieSection').css("display", "block");
        $('#click').css("display", "block");
        $('#pdf').css("display", "block");

        //Cal Pie Charts
        calPie(month, year, data, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult, PRUnitResult, PRBahtResult,
            REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult);
    }

}

function calPie(month, year, data, ABUnitResult, ABBahtResult, MBUnitResult, MBBahtResult, EBUnitResult, EBBahtResult, OTUnitResult, OTBahtResult, PRUnitResult, PRBahtResult,
    REMUnitResult, REMBahtResult, MTDUnitResult, MTDBahtResult, SPDUnitResult, SPDBahtResult, STUnitResult, STBahtResult) {

    var BMarket = 0,
        UMarket = 0,
        BType = 0,
        UType = 0;
    var BPerREM, BPerMTD, BPerSPD, BPerST, UPerREM, UPerMTD, UPerSPD, UPerST, BPerAB, BPerMB, BPerEB, BPerOT, BPerPR, UPerAB, UPerMB, UPerEB, UPerOT, UPerPR
    BMarket = REMBahtResult + MTDBahtResult + SPDBahtResult + STBahtResult;
    UMarket = REMUnitResult + MTDUnitResult + SPDUnitResult + STUnitResult;
    BType = ABBahtResult + MBBahtResult + EBBahtResult + OTBahtResult + PRBahtResult;
    UType = ABUnitResult + MBUnitResult + EBUnitResult + OTUnitResult + PRUnitResult;

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
        BPerPR = 0;
    } else {
        BPerAB = (ABBahtResult / BType) * 100;
        BPerMB = (MBBahtResult / BType) * 100;
        BPerEB = (EBBahtResult / BType) * 100;
        BPerOT = (OTBahtResult / BType) * 100;
        BPerPR = (PRBahtResult / BType) * 100;
        BahtType(month, year, BPerAB, BPerMB, BPerEB, BPerOT, BPerPR, ABBahtResult, MBBahtResult, EBBahtResult, OTBahtResult, PRBahtResult);
    }

    if (UType == 0) {
        UPerAB = 0;
        UPerMB = 0;
        UPerEB = 0;
        UPerOT = 0;
        UPerPR = 0;
    } else {
        UPerAB = (ABUnitResult / UType) * 100;
        UPerMB = (MBUnitResult / UType) * 100;
        UPerEB = (EBUnitResult / UType) * 100;
        UPerOT = (OTUnitResult / UType) * 100;
        UPerPR = (PRUnitResult / UType) * 100;
        UnitType(month, year, UPerAB, UPerMB, UPerEB, UPerOT, UPerPR, ABUnitResult, MBUnitResult, EBUnitResult, OTUnitResult, PRUnitResult);
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

function BahtType(month, year, BPerAB, BPerMB, BPerEB, BPerOT, BPerPR, ABBahtResult, MBBahtResult, EBBahtResult, OTBahtResult, PRBahtResult) {
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
                    name: 'Premium',
                    code: 'Premium',
                    y: BPerPR,
                    value: accounting.formatMoney(PRBahtResult, "฿")
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

function UnitType(month, year, UPerAB, UPerMB, UPerEB, UPerOT, UPerPR, ABUnitResult, MBUnitResult, EBUnitResult, OTUnitResult, PRUnitResult) {
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
                    name: 'Premium',
                    code: 'Premium',
                    y: UPerPR,
                    value: accounting.formatNumber(PRUnitResult)
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