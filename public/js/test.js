$(document).ready(function() {
    // Function to convert an img URL to data URL
    function getBase64FromImageUrl(url) {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        };
        img.src = url;
    }
    // DataTable initialisation
    $('#example').DataTable({
        "dom": '<"dt-buttons"Bf><"clear">lirtp',
        "paging": true,
        "autoWidth": true,
        "buttons": [{
            text: 'Custom PDF',
            extend: 'pdfHtml5',
            filename: 'dt_custom_pdf',
            orientation: 'portrait', //landscape
            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
            table: {
                widths: ['*', '*', '*', '*', '*'],
            },
            exportOptions: {
                columns: ':visible',
                search: 'applied',
                order: 'applied'
            },
            customize: function(doc) {
                //Remove the title created by datatTables
                doc.content.splice(0, 1);
                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                var now = new Date();
                var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
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
                doc['header'] = (function() {
                    return {
                        columns: [{
                                image: logo,
                                width: 40
                            },
                            {
                                alignment: 'left',
                                italics: false,
                                text: 'Sales Analysis Portal V.1.0 ',
                                fontSize: 12,
                                margin: [10, 0]
                            },
                            {
                                alignment: 'left',
                                italics: false,
                                text: 'Yuasa Battery (Thailand) Public Company Limited',
                                fontSize: 12,
                                margin: [0, 20]
                            },
                            {
                                alignment: 'right',
                                fontSize: 14,
                                text: 'Custom PDF export with dataTables'
                            }
                        ],
                        margin: 20
                    }
                });
                // Create a footer object with 2 columns
                // Left side: report creation date
                // Right side: current page and total pages
                doc['footer'] = (function(page, pages) {
                    return {
                        columns: [{
                                alignment: 'left',
                                text: ['Created on: ', { text: jsDate.toString() }]
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



            }
        }]
    });
});