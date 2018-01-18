$(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#reservation').daterangepicker({
        startDate: moment().subtract(6, 'days'),
        minDate: "01/01/2017"
    });

    $('#reservation').on('apply.daterangepicker', function(ev, picker) {
        var market = $('#market').val();
        var itemGroup = $('#itemGroup').val();
        var startDate = picker.startDate;
        var endDate = picker.endDate;
        selectData(market, itemGroup, startDate.format('YYYY'), endDate.format('YYYY'), startDate.format('MM/DD/YYYY'), endDate.format('MM/DD/YYYY'));
    });

});

function test() {
    Highcharts.chart('container', {
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
            text: 'Summary Report by date group by Market'
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Automotive Battery',
            data: [5, 3, 4, 7],
            stack: 'group1'
        }, {
            name: 'Motorcycle Battery',
            data: [3, 4, 4, 2],
            stack: 'group2'
        }, {
            name: 'Electric Battery',
            data: [2, 5, 6, 2],
            stack: 'group3'
        }, {
            name: 'Others',
            data: [2, 5, 6, 2],
            stack: 'group4'
        }]
    });

}

function selectData(market, itemGroup, startYear, endYear, startDate, endDate) {
    $.ajax({
        beforeSend: function() {

        },
        url: '/sa/selectByDate',
        type: "POST",
        data: { "market": market, "itemGroup": itemGroup, "startYear": startYear, "endYear": endYear, "startDate": startDate, "endDate": endDate },
        success: function(data, statusText, resObject) {
            // do something with ajax data
            if (data) {

                console.log(data);
            }

            return false;

        },
        complete: function() {

        }
    });
}