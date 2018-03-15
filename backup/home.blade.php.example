@extends('layouts.app')

@section('content')
    <div class="row">      
        <div class="col-md-6">                       
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">Sales Report on Column Chart</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">                       
                            <div id="column" style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6"> 
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">Sales Report on Pie Chart</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="pie" style="width: 100%;"></div>         
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    </div>
@endsection

@section('javascript') 
<!-- High Charts -->
<script src="{{ URL::asset('highchart/highcharts.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/drilldown.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts-3d.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/data.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/exporting.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/offline-exporting.js') }}"></script>
<script>

    var object = {!! json_encode($result) !!};

    var MTDB1 = 0,REMB1 = 0,SPDB1 = 0,STB1 = 0,MTDU1 = 0,REMU1 = 0,SPDU1 = 0,STU1 = 0,MTDB2 = 0,REMB2 = 0,SPDB2 = 0,STB2 = 0,MTDU2 = 0,REMU2 = 0,SPDU2 = 0,STU2 = 0;
    var MTDB3 = 0,REMB3 = 0,SPDB3 = 0,STB3 = 0,MTDU3 = 0,REMU3 = 0,SPDU3 = 0,STU3 = 0,MTDB4 = 0,REMB4 = 0,SPDB4 = 0,STB4 = 0,MTDU4 = 0,REMU4 = 0,SPDU4 = 0,STU4 = 0;
    var MTDB5 = 0,REMB5 = 0,SPDB5 = 0,STB5 = 0,MTDU5 = 0,REMU5 = 0,SPDU5 = 0,STU5 = 0,MTDB6 = 0,REMB6 = 0,SPDB6 = 0,STB6 = 0,MTDU6 = 0,REMU6 = 0,SPDU6 = 0,STU6 = 0;
    var MTDB7 = 0,REMB7 = 0,SPDB7 = 0,STB7 = 0,MTDU7 = 0,REMU7 = 0,SPDU7 = 0,STU7 = 0,MTDB8 = 0,REMB8 = 0,SPDB8 = 0,STB8 = 0,MTDU8 = 0,REMU8 = 0,SPDU8 = 0,STU8 = 0;
    var MTDB9 = 0,REMB9 = 0,SPDB9 = 0,STB9 = 0,MTDU9 = 0,REMU9 = 0,SPDU9 = 0,STU9 = 0,MTDB10 = 0,REMB10 = 0,SPDB10 = 0,STB10 = 0,MTDU10 = 0,REMU10 = 0,SPDU10 = 0,STU10 = 0;
    var MTDB11 = 0,REMB11 = 0,SPDB11 = 0,STB11 = 0,MTDU11 = 0,REMU11 = 0,SPDU11 = 0,STU11 = 0,MTDB12 = 0,REMB12 = 0,SPDB12 = 0,STB12 = 0,MTDU12 = 0,REMU12 = 0,SPDU12 = 0,STU12 = 0;
    var totalBaht = 0,totalUnit = 0,totalQ1Baht = 0,totalQ1Unit = 0,totalQ2Baht = 0,totalQ2Unit = 0,totalQ3Baht = 0,totalQ3Unit = 0,totalQ4Baht = 0,totalQ4Unit = 0;
    var total1Baht = 0,total1Unit = 0,total2Baht = 0,total2Unit = 0,total3Baht = 0,total3Unit = 0,total4Baht = 0,total4Unit = 0,total5Baht = 0,total5Unit = 0;
    var total6Baht = 0,total6Unit = 0,total7Baht = 0,total7Unit = 0,total8Baht = 0,total8Unit = 0,total9Baht = 0,total9Unit = 0,total10Baht = 0,total10Unit = 0;
    var total11Baht = 0,total11Unit = 0,total12Baht = 0,total12Unit = 0;
    $.each(object,function() {
        if(this.DocYear == '2017'){
            totalBaht += parseFloat(this.Total);
            totalUnit += parseInt(this.Quantity);
        }

        if(this.DocYear == '2017' && this.DocMonth == '1' || this.DocMonth == '2' || this.DocMonth == '3' ){
            totalQ1Baht += parseFloat(this.Total);
            totalQ1Unit += parseInt(this.Quantity);
        }
        else if(this.DocYear == '2017' && this.DocMonth == '4' || this.DocMonth == '5' || this.DocMonth == '6' ){
            totalQ2Baht += parseFloat(this.Total);
            totalQ2Unit += parseInt(this.Quantity);
        }
        else if(this.DocYear == '2017' && this.DocMonth == '7' || this.DocMonth == '8' || this.DocMonth == '9' ){
            totalQ3Baht += parseFloat(this.Total);
            totalQ3Unit += parseInt(this.Quantity);
        }
        else if(this.DocYear == '2017' && this.DocMonth == '10' || this.DocMonth == '11' || this.DocMonth == '12' ){
            totalQ4Baht += parseFloat(this.Total);
            totalQ4Unit += parseInt(this.Quantity);
        }

        if(this.DocYear == '2017' && this.DocMonth == '1'){
            total1Baht += parseFloat(this.Total);
            total1Unit += parseInt(this.Quantity);
            if(this.SalesPersonGroup == 'REM'){
                REMB1 = parseFloat(this.Total);
                REMU1 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB1 = parseFloat(this.Total);
                MTDU1 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB1 = parseFloat(this.Total);
                SPDU1 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB1 = parseFloat(this.Total);
                STU1 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '2'){
            total2Baht += parseFloat(this.Total);
            total2Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB2 = parseFloat(this.Total);
                REMU2 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB2 = parseFloat(this.Total);
                MTDU2 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB2 = parseFloat(this.Total);
                SPDU2 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB2 = parseFloat(this.Total);
                STU2 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '3'){
            total3Baht += parseFloat(this.Total);
            total3Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB3 = parseFloat(this.Total);
                REMU3 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB3 = parseFloat(this.Total);
                MTDU3 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB3 = parseFloat(this.Total);
                SPDU3 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB3 = parseFloat(this.Total);
                STU3 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '4'){
            total4Baht += parseFloat(this.Total);
            total4Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB4 = parseFloat(this.Total);
                REMU4 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB4 = parseFloat(this.Total);
                MTDU4 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB4 = parseFloat(this.Total);
                SPDU4 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB4 = parseFloat(this.Total);
                STU4 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '5'){
            total5Baht += parseFloat(this.Total);
            total5Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB5 = parseFloat(this.Total);
                REMU5 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB5 = parseFloat(this.Total);
                MTDU5 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB5 = parseFloat(this.Total);
                SPDU5 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB5 = parseFloat(this.Total);
                STU5 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '6'){
            total6Baht += parseFloat(this.Total);
            total6Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB6 = parseFloat(this.Total);
                REMU6 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB6 = parseFloat(this.Total);
                MTDU6 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB6 = parseFloat(this.Total);
                SPDU6 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB6 = parseFloat(this.Total);
                STU6 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '7'){
            total7Baht += parseFloat(this.Total);
            total7Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB67 = parseFloat(this.Total);
                REMU7 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB7 = parseFloat(this.Total);
                MTDU7 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB7 = parseFloat(this.Total);
                SPDU7 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB6 = parseFloat(this.Total);
                STU6 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '8'){
            total8Baht += parseFloat(this.Total);
            total8Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB8 = parseFloat(this.Total);
                REMU8 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB8 = parseFloat(this.Total);
                MTDU8 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB8 = parseFloat(this.Total);
                SPDU8 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB8 = parseFloat(this.Total);
                STU8 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '9'){
            total9Baht += parseFloat(this.Total);
            total9Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB9 = parseFloat(this.Total);
                REMU9 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB9 = parseFloat(this.Total);
                MTDU9 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB9 = parseFloat(this.Total);
                SPDU9 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB9 = parseFloat(this.Total);
                STU9 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '10'){
            total10Baht += parseFloat(this.Total);
            total10Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB10 = parseFloat(this.Total);
                REMU10 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB10 = parseFloat(this.Total);
                MTDU10 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB10 = parseFloat(this.Total);
                SPDU10 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB10 = parseFloat(this.Total);
                STU10 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '11' ){
            total11Baht += parseFloat(this.Total);
            total11Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB11 = parseFloat(this.Total);
                REMU11 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB11 = parseFloat(this.Total);
                MTDU11 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB11 = parseFloat(this.Total);
                SPDU11 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB11 = parseFloat(this.Total);
                STU11 = parseInt(this.Quantity);
            }
        }
        else if(this.DocYear == '2017' && this.DocMonth == '12' ){
            total12Baht += parseFloat(this.Total);
            total12Unit += parseInt(this.Quantity);
            
            if(this.SalesPersonGroup == 'REM'){
                REMB12 = parseFloat(this.Total);
                REMU12 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'MTD'){
                MTDB12 = parseFloat(this.Total);
                MTDU12 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'SPD'){
                SPDB12 = parseFloat(this.Total);
                SPDU12 = parseInt(this.Quantity);
            }
            else if(this.SalesPersonGroup == 'ST'){
                STB12 = parseFloat(this.Total);
                STU12 = parseInt(this.Quantity);
            }
        }

    });    

    ColumnChart();
    PieChart();

    function ColumnChart(){
            // Create the chart
            $('#column').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: 12,
                    depth: 50
                    }
                },
                title: {
                    text: 'Sales 2017 : Yuasa Battery (Thailand) Public Company Limited.'
                },
                tooltip: {
                    pointFormat: 'Total Baht: <b>{point.valueTotal}</b><br/>Quantity: <b>{point.valueQuantity}</b><br/>'
                }, 
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        x: -35
                    }
                },        
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        depth: 100
                    },       
                    series: {
                        pointWidth: 60
                    }    
                },    
                    
                series: [{
                name: 'Total',
                colorByPoint: true,	
                data: [ {
                    name: '2015',                     
                    valueTotal: accounting.formatMoney('827653830.550000', "฿"),  
                    valueQuantity: accounting.formatNumber('1018199.000000'),
                    y: totalBaht,
                    drilldown: '2015'
                },{
                    name: '2016',                    
                    valueTotal: accounting.formatMoney('1039170570.310000', "฿"),  
                    valueQuantity: accounting.formatNumber('1396799.000000'),
                    y: totalBaht,
                    drilldown: '2016'
                },
                {
                    name: '2017',                    
                    valueTotal: accounting.formatMoney(totalBaht, "฿"),  
                    valueQuantity: accounting.formatNumber(totalUnit),
                    y: totalBaht,
                    drilldown: '2017'
                }]
            }],
                drilldown: {
                    series: [{
                        id: '2017',
                        name: '2017',
                        data: [{
                            name: 'Q1',
                            y: totalQ1Baht,                             
                            valueTotal: accounting.formatMoney(totalQ1Baht, "฿"),
                            valueQuantity: accounting.formatNumber(totalQ1Unit),
                            drilldown: '2017Q1'
                        }, {
                            name: 'Q2',
                            y: totalQ2Baht,
                            valueTotal: accounting.formatMoney(totalQ2Baht, "฿"),
                            valueQuantity: accounting.formatNumber(totalQ2Unit),
                            drilldown: '2017Q2'
                        }, {
                            name: 'Q3',
                            y: totalQ3Baht,
                            valueTotal: accounting.formatMoney(totalQ3Baht, "฿"),
                            valueQuantity: accounting.formatNumber(totalQ3Unit),
                            drilldown: '2017Q3'
                        }, {
                            name: 'Q4',
                            y: totalQ4Baht,
                            valueTotal: accounting.formatMoney(totalQ4Baht, "฿"),
                            valueQuantity: accounting.formatNumber(totalQ4Unit), 
                            drilldown: '2017Q4'
                            }                
                        ]
                    },  {
                        id: '2017Q1',       
                        data: [
                            {
                                name: 'January',
                                y: total1Baht,
                                valueTotal: accounting.formatMoney(total1Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total1Unit), 
                            },{
                                name: 'February',
                                y: total2Baht,
                                valueTotal: accounting.formatMoney(total2Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total2Unit), 
                            },{
                                name: 'March',
                                y: total3Baht,
                                valueTotal: accounting.formatMoney(total3Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total3Unit), 
                            }                            
                        ] 
                    }, {
                        id: '2017Q2',
                        data: [
                            {
                                name: 'April',
                                y: total1Baht,
                                valueTotal: accounting.formatMoney(total4Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total4Unit), 
                            },{
                                name: 'May',
                                y: total2Baht,
                                valueTotal: accounting.formatMoney(total5Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total5Unit), 
                            },{
                                name: 'June',
                                y: total3Baht,
                                valueTotal: accounting.formatMoney(total6Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total6Unit), 
                            }                            
                        ] 
                    }, {
                        id: '2017Q3',
                        data: [
                            {
                                name: 'July',
                                y: total1Baht,
                                valueTotal: accounting.formatMoney(total7Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total7Unit), 
                            },{
                                name: 'August',
                                y: total2Baht,
                                valueTotal: accounting.formatMoney(total8Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total8Unit), 
                            },{
                                name: 'September',
                                y: total3Baht,
                                valueTotal: accounting.formatMoney(total9Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total9Unit), 
                            }                            
                        ] 
                    }, {
                        id: '2017Q4',
                        data: [ 
                            {
                                name: 'October',
                                y: total1Baht,
                                valueTotal: accounting.formatMoney(total10Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total10Unit), 
                            },{
                                name: 'November',
                                y: total2Baht,
                                valueTotal: accounting.formatMoney(total11Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total11Unit), 
                            },{
                                name: 'December',
                                y: total3Baht,
                                valueTotal: accounting.formatMoney(total12Baht, "฿"),
                                valueQuantity: accounting.formatNumber(total12Unit), 
                            }                            
                        ] 
                    }]
                }
            })
        }

        function PieChart(){

                chart = Highcharts.chart('pie', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Yuasa Battery Market Shares of the Month in 2017'
                },
                subtitle: {
                    text: 'Click the slices to view market.'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br>Total Baht: <b>{point.valueTotal}</b><br/>Quantity: <b>{point.valueQuantity}</b><br/>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        events: {
                            click: function () {
                                    if(this.name == 'Month'){
                                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>');
                                    setTimeout(function () {
                                    chart.hideLoading();
                                    }, 1200);
                                }
                            }
                        },
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    name: 'Month',
                    colorByPoint: true,
                    data: [{
                        name: 'January',   
                        y: total1Baht,
                        valueTotal: accounting.formatMoney(total1Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total1Unit), 
                        drilldown: 'January'
                    }, {
                        name: 'February',
                        y: total1Baht,
                        valueTotal: accounting.formatMoney(total2Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total2Unit), 
                        drilldown: 'February'
                    }, {
                        name: 'March',
                        y: total3Baht,
                        valueTotal: accounting.formatMoney(total3Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total3Unit), 
                        drilldown: 'March'
                    }, {
                        name: 'April',
                        y: total4Baht,
                        valueTotal: accounting.formatMoney(total4Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total4Unit), 
                        drilldown: 'April'
                    }, {
                        name: 'May',
                        y: total5Baht,
                        valueTotal: accounting.formatMoney(total5Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total5Unit), 
                        drilldown: 'May'
                    }, {
                        name: 'June',
                        y: total6Baht,
                        valueTotal: accounting.formatMoney(total6Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total6Unit), 
                        drilldown: 'June'
                    }, {
                        name: 'July',
                        y: total7Baht,
                        valueTotal: accounting.formatMoney(total7Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total7Unit), 
                        drilldown: 'July'
                    }, {
                        name: 'August',
                        y: total8Baht,
                        valueTotal: accounting.formatMoney(total8Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total8Unit), 
                        drilldown: 'August'
                    }, {
                        name: 'September',
                        y: total9Baht,
                        valueTotal: accounting.formatMoney(total9Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total9Unit), 
                        drilldown: 'September'
                    }, {
                        name: 'October',
                        y: total10Baht,
                        valueTotal: accounting.formatMoney(total10Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total10Unit), 
                        drilldown: 'October'
                    }, {
                        name: 'November',
                        y: total11Baht,
                        valueTotal: accounting.formatMoney(total11Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total11Unit), 
                        drilldown: 'November'
                    }, {
                        name: 'December',
                        y: total12Baht, 
                        valueTotal: accounting.formatMoney(total12Baht, "฿"),
                        valueQuantity: accounting.formatNumber(total12Unit), 
                        drilldown: 'December'
                    }]
                }],
                drilldown: {
                    series: [{
                        name: 'January',
                        id: 'January',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB1,
                                valueTotal: accounting.formatMoney(MTDB1, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU1), 
                            },{
                                name: 'REM',
                                y: REMB1,
                                valueTotal: accounting.formatMoney(REMB1, "฿"),
                                valueQuantity: accounting.formatNumber(REMU1), 
                            },{
                                name: 'SPD',
                                y: SPDB1,
                                valueTotal: accounting.formatMoney(SPDB1, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU1), 
                            },{
                                name: 'Staff',
                                y: STB1,
                                valueTotal: accounting.formatMoney(STB1, "฿"),
                                valueQuantity: accounting.formatNumber(STU1), 
                            }                            
                        ]
                    },{
                        name: 'February',
                        id: 'February',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB2,
                                valueTotal: accounting.formatMoney(MTDB2, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU2), 
                            },{
                                name: 'REM',
                                y: REMB2,
                                valueTotal: accounting.formatMoney(REMB2, "฿"),
                                valueQuantity: accounting.formatNumber(REMU2), 
                            },{
                                name: 'SPD',
                                y: SPDB2,
                                valueTotal: accounting.formatMoney(SPDB2, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU2), 
                            },{
                                name: 'Staff',
                                y: STB2,
                                valueTotal: accounting.formatMoney(STB2, "฿"),
                                valueQuantity: accounting.formatNumber(STU2), 
                            }                            
                        ]
                    },{
                        name: 'March',
                        id: 'March',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB3,
                                valueTotal: accounting.formatMoney(MTDB3, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU3), 
                            },{
                                name: 'REM',
                                y: REMB3,
                                valueTotal: accounting.formatMoney(REMB3, "฿"),
                                valueQuantity: accounting.formatNumber(REMU3), 
                            },{
                                name: 'SPD',
                                y: SPDB3,
                                valueTotal: accounting.formatMoney(SPDB3, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU3), 
                            },{
                                name: 'Staff',
                                y: STB3,
                                valueTotal: accounting.formatMoney(STB3, "฿"),
                                valueQuantity: accounting.formatNumber(STU3), 
                            }                            
                        ]
                    },{
                        name: 'April',    
                        id: 'April',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB4,
                                valueTotal: accounting.formatMoney(MTDB4, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU4), 
                            },{
                                name: 'REM',
                                y: REMB4,
                                valueTotal: accounting.formatMoney(REMB4, "฿"),
                                valueQuantity: accounting.formatNumber(REMU4), 
                            },{
                                name: 'SPD',
                                y: SPDB4,
                                valueTotal: accounting.formatMoney(SPDB4, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU4), 
                            },{
                                name: 'Staff',
                                y: STB4,
                                valueTotal: accounting.formatMoney(STB4, "฿"),
                                valueQuantity: accounting.formatNumber(STU4), 
                            }                            
                        ]
                    },{
                        name: 'May',
                        id: 'May',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB5,
                                valueTotal: accounting.formatMoney(MTDB5, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU5), 
                            },{
                                name: 'REM',
                                y: REMB5,
                                valueTotal: accounting.formatMoney(REMB5, "฿"),
                                valueQuantity: accounting.formatNumber(REMU5), 
                            },{
                                name: 'SPD',
                                y: SPDB5,
                                valueTotal: accounting.formatMoney(SPDB5, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU5), 
                            },{
                                name: 'Staff',
                                y: STB5,
                                valueTotal: accounting.formatMoney(STB5, "฿"),
                                valueQuantity: accounting.formatNumber(STU5), 
                            }                            
                        ]
                    },{
                        name: 'June',
                        id: 'June',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB6,
                                valueTotal: accounting.formatMoney(MTDB6, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU6), 
                            },{
                                name: 'REM',
                                y: REMB6,
                                valueTotal: accounting.formatMoney(REMB6, "฿"),
                                valueQuantity: accounting.formatNumber(REMU6), 
                            },{
                                name: 'SPD',
                                y: SPDB6,
                                valueTotal: accounting.formatMoney(SPDB6, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU6), 
                            },{
                                name: 'Staff',
                                y: STB6,
                                valueTotal: accounting.formatMoney(STB6, "฿"),
                                valueQuantity: accounting.formatNumber(STU6), 
                            }                            
                        ]
                    },{
                        name: 'July',
                        id: 'July',                            
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB7,
                                valueTotal: accounting.formatMoney(MTDB7, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU7), 
                            },{
                                name: 'REM',
                                y: REMB7,
                                valueTotal: accounting.formatMoney(REMB7, "฿"),
                                valueQuantity: accounting.formatNumber(REMU7), 
                            },{
                                name: 'SPD',
                                y: SPDB7,
                                valueTotal: accounting.formatMoney(SPDB7, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU7), 
                            },{
                                name: 'Staff',
                                y: STB7,
                                valueTotal: accounting.formatMoney(STB7, "฿"),
                                valueQuantity: accounting.formatNumber(STU7), 
                            }                            
                        ]
                    },{
                        name: 'August',    
                        id: 'August',                            
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB8,
                                valueTotal: accounting.formatMoney(MTDB8, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU8), 
                            },{
                                name: 'REM',
                                y: REMB8,
                                valueTotal: accounting.formatMoney(REMB8, "฿"),
                                valueQuantity: accounting.formatNumber(REMU8), 
                            },{
                                name: 'SPD',
                                y: SPDB8,
                                valueTotal: accounting.formatMoney(SPDB8, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU8), 
                            },{
                                name: 'Staff',
                                y: STB8,
                                valueTotal: accounting.formatMoney(STB8, "฿"),
                                valueQuantity: accounting.formatNumber(STU8), 
                            }                            
                        ]
                    },{
                        name: 'September',
                        id: 'September',                            
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB9,
                                valueTotal: accounting.formatMoney(MTDB9, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU1), 
                            },{
                                name: 'REM',
                                y: REMB9,
                                valueTotal: accounting.formatMoney(REMB9, "฿"),
                                valueQuantity: accounting.formatNumber(REMU9), 
                            },{
                                name: 'SPD',
                                y: SPDB9,
                                valueTotal: accounting.formatMoney(SPDB9, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU9), 
                            },{
                                name: 'Staff',
                                y: STB9,
                                valueTotal: accounting.formatMoney(STB9, "฿"),
                                valueQuantity: accounting.formatNumber(STU9), 
                            }                            
                        ]
                    },{
                        name: 'October',
                        id: 'October',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB10,
                                valueTotal: accounting.formatMoney(MTDB10, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU10), 
                            },{
                                name: 'REM',
                                y: REMB10,
                                valueTotal: accounting.formatMoney(REMB10, "฿"),
                                valueQuantity: accounting.formatNumber(REMU10), 
                            },{
                                name: 'SPD',
                                y: SPDB10,
                                valueTotal: accounting.formatMoney(SPDB10, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU10), 
                            },{
                                name: 'Staff',
                                y: STB10,
                                valueTotal: accounting.formatMoney(STB10, "฿"),
                                valueQuantity: accounting.formatNumber(STU10), 
                            }                            
                        ]
                    },{
                        name: 'November',
                        id: 'November',                          
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB11,
                                valueTotal: accounting.formatMoney(MTDB11, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU11), 
                            },{
                                name: 'REM',
                                y: REMU11,
                                valueTotal: accounting.formatMoney(REMB11, "฿"),
                                valueQuantity: accounting.formatNumber(REMU11), 
                            },{
                                name: 'SPD',
                                y: SPDB11,
                                valueTotal: accounting.formatMoney(SPDB11, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU11), 
                            },{
                                name: 'Staff',
                                y: STB11,
                                valueTotal: accounting.formatMoney(STB11, "฿"),
                                valueQuantity: accounting.formatNumber(STU11), 
                            }                            
                        ]
                    },{
                        name: 'December',
                        id: 'December',                            
                        data: [
                            {
                                name: 'MTD',
                                y: MTDB12,
                                valueTotal: accounting.formatMoney(MTDB12, "฿"),
                                valueQuantity: accounting.formatNumber(MTDU12), 
                            },{
                                name: 'REM',
                                y: REMB12,
                                valueTotal: accounting.formatMoney(REMB12, "฿"),
                                valueQuantity: accounting.formatNumber(REMU12), 
                            },{
                                name: 'SPD',
                                y: SPDB12,
                                valueTotal: accounting.formatMoney(SPDB12, "฿"),
                                valueQuantity: accounting.formatNumber(SPDU12), 
                            },{
                                name: 'Staff',
                                y: STB12,
                                valueTotal: accounting.formatMoney(STB12, "฿"),
                                valueQuantity: accounting.formatNumber(STU12), 
                            }                            
                        ]
                    }]
                }
            }); 
        }
        
    /* $(function () {
            // Create the chart
            $('#column').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: 10,
                    depth: 20
                    }
                },
                title: {
                    text: 'Sales Target : Yuasa Battery (Thailand) Public Company Limited.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        x: -35
                    }
                },        
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        depth: 100
                    }            
                },    
                    
                series: [{
                name: 'Total',
                colorByPoint: true,
                data: [{
                    name: '2013',
                    y: 235647899,
                    drilldown: '2013'
                }, {
                    name: '2014',
                    y: 205647899,
                    drilldown: '2014'
                },   {
                    name: '2015',
                    y: 205647899,
                    drilldown: '2015'
                },  {
                    name: '2016',
                    y: 375647899,
                    drilldown: '2016'
                },  {
                    name: '2017',
                    y: 285647899,
                    drilldown: '2017'
                }]
            }],
                drilldown: {
                    series: [{
                        id: '2013',
                        name: '2013',
                        data: [{
                            name: 'Q1',
                            y: 9231314,
                            drilldown: '2013Q1'
                        }, {
                            name: 'Q2',
                            y: 6234324,
                            drilldown: '2013Q2'
                        }, {
                            name: 'Q3',
                            y: 7432564,
                            drilldown: '2013Q3'
                        }, {
                            name: 'Q4',
                            y: 4423454,
                            drilldown: '2013Q4'
                        }                
                        ]
                    },{
                        id: '2014',
                        name: '2014',
                        data: [{
                            name: 'Q1',
                            y: 1231314,
                            drilldown: '2014Q1'
                        }, {
                            name: 'Q2',
                            y: 4234324,
                            drilldown: '2014Q2'
                        }, {
                            name: 'Q3',
                            y: 5432564,
                            drilldown: '2014Q3'
                        }, {
                            name: 'Q4',
                            y: 3423454,
                            drilldown: '2014Q4'
                        }                
                        ]
                    },{
                        id: '2015',
                        name: '2015',
                        data: [{
                            name: 'Q1',
                            y: 2231314,
                            drilldown: '2015Q1'
                        }, {
                            name: 'Q2',
                            y: 3234324,
                            drilldown: '2015Q2'
                        }, {
                            name: 'Q3',
                            y: 2432564,
                            drilldown: '2015Q3'
                        }, {
                            name: 'Q4',
                            y: 2423454,
                            drilldown: '2015Q4'
                        }                
                        ]
                    },{
                        id: '2016',
                        name: '2016',
                        data: [{
                            name: 'Q1',
                            y: 8231314,
                            drilldown: '2016Q1'
                        }, {
                            name: 'Q2',
                            y: 7234324,
                            drilldown: '2016Q2'
                        }, {
                            name: 'Q3',
                            y: 9432564,
                            drilldown: '2016Q3'
                        }, {
                            name: 'Q4',
                            y: 8423454,
                            drilldown: '2016Q4'
                        }                
                        ]
                    },{
                        id: '2017',
                        name: '2017',
                        data: [{
                            name: 'Q1',
                            y: 1231314,
                            drilldown: '2017Q1'
                        }, {
                            name: 'Q2',
                            y: 4234324,
                            drilldown: '2017Q2'
                        }, {
                            name: 'Q3',
                            y: 5432564,
                            drilldown: '2017Q3'
                        }, {
                            name: 'Q4',
                            y: 3423454,
                            drilldown: '2017Q4'
                        }                
                        ]
                    }, {
                        id: '2013Q1',
                        data: [
                            ['Jan', 131231],['Feb', 123222],['March', 43343]
                        ] 
                    }, {
                        id: '2013Q2',
                        data: [
                            ['Apr', 567891],['May', 234562],['June', 546453]
                        ] 
                    }, {
                        id: '2013Q3',
                        data: [
                            ['Jul', 813456],['Aug', 325675],['Sep', 633567]
                        ] 
                    }, {
                        id: '2013Q4',
                        data: [
                            ['Oct', 464321],['Nov', 243452],['Dec', 324453]
                        ] 
                    }, {
                        id: '2014Q1',
                        data: [
                            ['Jan', 531231],['Feb', 123222],['March', 43343]
                        ] 
                    }, {
                        id: '2014Q2',
                        data: [
                            ['Apr', 667891],['May', 234562],['June', 546453]
                        ] 
                    }, {
                        id: '2014Q3',
                        data: [
                            ['Jul', 713456],['Aug', 325675],['Sep', 633567]
                        ] 
                    }, {
                        id: '2014Q4',
                        data: [
                            ['Oct', 864321],['Nov', 243452],['Dec', 324453]
                        ] 
                    }, {
                        id: '2015Q1',
                        data: [
                            ['Jan', 131231],['Feb', 123222],['March', 43343]
                        ] 
                    }, {
                        id: '2015Q2',
                        data: [
                            ['Apr', 867898],['May', 234562],['June', 546453]
                        ] 
                    }, {
                        id: '2015Q3',
                        data: [
                            ['Jul', 813456],['Aug', 725675],['Sep', 633567]
                        ] 
                    }, {
                        id: '2015Q4',
                        data: [
                            ['Oct', 864321],['Nov', 543452],['Dec', 324453]
                        ] 
                    }, {
                        id: '2016Q1',
                        data: [
                            ['Jan', 531231],['Feb', 123222],['March', 43343]
                        ] 
                    }, {
                        id: '2016Q2',
                        data: [
                            ['Apr', 367891],['May', 234562],['June', 546453]
                        ] 
                    }, {
                        id: '2016Q3',
                        data: [
                            ['Jul', 713456],['Aug', 325675],['Sep', 633567]
                        ] 
                    }, {
                        id: '2016Q4',
                        data: [
                            ['Oct', 864321],['Nov', 243452],['Dec', 324453]
                        ] 
                    }, {
                        id: '2017Q1',
                        data: [
                            ['Jan', 131231],['Feb', 823222],['March', 53343]
                        ] 
                    }, {
                        id: '2017Q2',
                        data: [
                            ['Apr', 567891],['May', 734562],['June', 346453]
                        ] 
                    }, {
                        id: '2017Q3',
                        data: [
                            ['Jul', 713456],['Aug', 325675],['Sep', 433567]
                        ] 
                    }, {
                        id: '2017Q4',
                        data: [
                            ['Oct', 264321],['Nov', 243452],['Dec', 524453]
                        ] 
                    }]
                }
            })
        });

        $(function () {

            chart = Highcharts.chart('pie', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Browser market shares at a specific website, 2017'
            },
            subtitle: {
                text: 'Click the slices to view versions. Source: netmarketshare.com.'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    events: {
                        click: function () {
                                if(this.name == 'Brands'){
                                chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>');
                                setTimeout(function () {
                                chart.hideLoading();
                                }, 1200);
                            }
                        }
                    },
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'IE',
                    y: 56.33,
                    drilldown: 'IE'
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    drilldown: 'Chrome'
                }, {
                    name: 'Firefox',
                    y: 10.38,
                    drilldown: 'Firefox'
                }, {
                    name: 'Safari',
                    y: 4.77,
                    drilldown: 'Safari'
                }, {
                    name: 'Opera',
                    y: 0.91,
                    drilldown: 'Opera'
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2,
                    drilldown: null
                }]
            }],
            drilldown: {
                series: [{
                    name: 'IE',
                    id: 'IE',
                    data: [
                        ['v11.0', 24.13],
                        ['v8.0', 17.2],
                        ['v9.0', 8.11],
                        ['v10.0', 5.33],
                        ['v6.0', 1.06],
                        ['v7.0', 0.5]
                    ]
                }, {
                    name: 'Chrome',
                    id: 'Chrome',
                    data: [
                        ['v40.0', 5],
                        ['v41.0', 4.32],
                        ['v42.0', 3.68],
                        ['v39.0', 2.96],
                        ['v36.0', 2.53],
                        ['v43.0', 1.45],
                        ['v31.0', 1.24],
                        ['v35.0', 0.85],
                        ['v38.0', 0.6],
                        ['v32.0', 0.55],
                        ['v37.0', 0.38],
                        ['v33.0', 0.19],
                        ['v34.0', 0.14],
                        ['v30.0', 0.14]
                    ]
                }, {
                    name: 'Firefox',
                    id: 'Firefox',
                    data: [
                        ['v35', 2.76],
                        ['v36', 2.32],
                        ['v37', 2.31],
                        ['v34', 1.27],
                        ['v38', 1.02],
                        ['v31', 0.33],
                        ['v33', 0.22],
                        ['v32', 0.15]
                    ]
                }, {
                    name: 'Safari',
                    id: 'Safari',
                    data: [
                        ['v8.0', 2.56],
                        ['v7.1', 0.77],
                        ['v5.1', 0.42],
                        ['v5.0', 0.3],
                        ['v6.1', 0.29],
                        ['v7.0', 0.26],
                        ['v6.2', 0.17]
                    ]
                }, {
                    name: 'Opera',
                    id: 'Opera',
                    data: [
                        ['v12.x', 0.34],
                        ['v28', 0.24],
                        ['v27', 0.17],
                        ['v29', 0.16]
                    ]
                }]
            }
        }); 
    });  */

</script>   
@endsection
