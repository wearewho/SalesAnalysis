@extends('layouts.app')

@section('content')
    <style>
        #container {
            height: 525px;
        }

        .loading {
        margin-top: 10em;
        text-align: center;
        color: gray;
        }
    </style>

    <div class="row">      
        <div class="col-md-9">                       
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">An example of a drilldown map for Sales report by region in Thailand.</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">                       
                            <div id="container">
                                <div id="map" style="max-width: 100%; height: 100%;" ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3"> 
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">Sales Report by Region</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="container"></div>          
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    </div>
@endsection

@section('javascript') 
    <!-- high Maps -->
    <script src="http://code.highcharts.com/maps/highmaps.js"></script>
    <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
    <script src="http://code.highcharts.com/maps/modules/drilldown.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/world-continents.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/asia.js"></script>

    <script src="http://code.highcharts.com/mapdata/custom/oceania.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/european-union.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/africa.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/north-america.js"></script>
    <script src="http://code.highcharts.com/mapdata/custom/south-america.js"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Region-all.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Northeastern.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Bangkok.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Central.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Eastern.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Western.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Southern.js') }}"></script>
    <script src="{{ URL::asset('highmap/mapdata/countries/th/Northern.js') }}"></script>


    <script>
       $(function() {

        
        Highcharts.setOptions({
            lang: {
                drillUpText: '◁ Back to previous map'
            }
        });

        // Initiate the chart
        $('#map').highcharts('Map', {
          title: {
            text: 'Sales Report World Map'
          },
               
          chart: {
            events: {
      
              drilldown: function(e) {
                // alert(e.point.name);
                if (!e.seriesOptions) {
                  //alert(e.point);
                  var chart = this,
                    pointWithLatLon = function(point, latLon) {
                      return Highcharts.merge(point, chart.transformFromLatLon(latLon,
                        Highcharts.maps['custom/world']['hc-transform']['default']));
                    };
      
                  var continent;
                  var contName;
                  switch (e.point.name) {
                    case "Asia":
                        chart.addSeriesAsDrilldown(e.point, {
                        mapData: Highcharts.maps['custom/asia'],
                        joinBy: 'hc-key',
                        data: [{
                          'hc-key': 'ph'
                        }, {
                          'hc-key': 'ir'
                        }, {
                          'hc-key': 'sa'
                        }, {
                          'hc-key': 'jp'
                        }, {    
                          color: '#3366ff',           
                          'hc-key': 'th',
                          drilldown: true,
                        }, {
                          'hc-key': 'om'
                        }, {
                          'hc-key': 'ye'
                        }, {
                          'hc-key': 'in'
                        }, {
                          'hc-key': 'kr'
                        }, {
                          'hc-key': 'bd'
                        }, {
                          'hc-key': 'sp'
                        }, {
                          'hc-key': 'cn'
                        }, {
                          'hc-key': 'bh'
                        }, {
                          'hc-key': 'mm'
                        }, {
                          'hc-key': 'id'
                        }, {
                          'hc-key': 'sg'
                        }, {
                          'hc-key': 'ru'
                        }, {
                          'hc-key': 'sh'
                        }, {
                          'hc-key': 'my'
                        }, {
                          'hc-key': 'az'
                        }, {
                          'hc-key': 'am'
                        }, {
                          'hc-key': 'vn'
                        }, {
                          'hc-key': 'tj'
                        }, {
                          'hc-key': 'uz'
                        }, {
                          'hc-key': 'tl'
                        }, {
                          'hc-key': 'kh'
                        }, {
                          'hc-key': 'bt'
                        }, {
                          'hc-key': 'ge'
                        }, {
                          'hc-key': 'kz'
                        }, {
                          'hc-key': 'il'
                        }, {
                          'hc-key': 'sy'
                        }, {
                          'hc-key': 'jo'
                        }, {
                          'hc-key': 'tm'
                        }, {
                          'hc-key': 'cnm'
                        }, {
                          'hc-key': 'mn'
                        }, {
                          'hc-key': 'kw'
                        }, {
                          'hc-key': 'iq'
                        }, {
                          'hc-key': 'ae'
                        }, {
                          'hc-key': 'la'
                        }, {
                          'hc-key': 'pk'
                        }, {
                          'hc-key': 'jk'
                        }, {
                          'hc-key': 'qa'
                        }, {
                          'hc-key': 'tr'
                        }, {
                          'hc-key': 'bn'
                        }, {
                          'hc-key': 'af'
                        }, {
                          'hc-key': 'kp'
                        }, {
                          'hc-key': 'lb'
                        }, {
                          'hc-key': 'nc'
                        }, {
                          'hc-key': 'cy'
                        }, {
                          'hc-key': 'tw'
                        }, {
                          'hc-key': 'np'
                        }, {
                          'hc-key': 'lk'
                        }, {
                          'hc-key': 'kg'
                        }],
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Europe":
                        data = Highcharts.geojson(Highcharts.maps['custom/european-union']);
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data,                        
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Oceania":
                        data = Highcharts.geojson(Highcharts.maps['custom/oceania']);
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                            return this.point.name;
                            }
                        }

                        });
                        break;
                    case "Africa":
                        data = Highcharts.geojson(Highcharts.maps['custom/africa']);
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                            return this.point.name;
                            }
                        }

                        });
                        break;
                    case "North America":
                        data = Highcharts.geojson(Highcharts.maps['custom/north-america']);
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                            return this.point.name;
                            }
                        }

                        });
                        break;
                    case "South America":
                        data = Highcharts.geojson(Highcharts.maps['custom/south-america']);
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                            return this.point.name;
                            }
                        }

                        });
                        break;
                    case "Thailand":
                        chart.addSeriesAsDrilldown(e.point, {
                        mapData: Highcharts.maps['countries/th/Region-all'],
                        joinBy: 'hc-key',
                        data: [{           
                          color: '#009900', 
                            'hc-key': 'C',
                            drilldown: true
                            }, {         
                          color: '#33cccc',
                            'hc-key': 'N',
                            drilldown: true
                            }, {
                          color: '#4747d1',
                            'hc-key': 'NE', 
                            drilldown: true
                            }, {
                          color: '#ff6600',
                            'hc-key': 'W', 
                            drilldown: true
                            }, {           
                          color: '#ff9999', 
                            'hc-key': 'E',
                            drilldown: true
                            }, {
                          color: '#ff1a1a',
                            'hc-key': 'B', 
                            drilldown: true
                            }, {
                          color: '#ff1aff',
                            'hc-key': 'S',
                            drilldown: true
                            }
                        ],
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Central":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Central']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Northern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Northern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Western":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Western']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Eastern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Eastern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Northeastern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Northeastern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Bangkok and Surrounding":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Bangkok']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                    case "Southern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Southern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        }
      
                      });
                      break;
                  }
      
      
      
                  chart.addSeries({
                    id: 'cities',
                    name: 'Cities',
                    type: 'mappoint',
                    color: 'black',
                    marker: {
                      symbol: 'circle'
                    }
                  });
                }
              }
            }
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          plotOptions: {
            series: {
              point: {
                events: {
                  click: function() {
                    if (this.name) {
                      //	alert(this.name);
                    }
                  }
                }
              }
            }
          },
          legend: {
            enabled: false
          },
          series: [{                      
            name: 'World',
            color: '#666666',
            data: [{
                'hc-key': 'eu',
                drilldown: true,
              }, {          
              color: '#666666',
                'hc-key': 'as',
                drilldown: true
              }, {
                'hc-key': 'th',
                drilldown: true
              }, {
                'hc-key': 'oc',
                drilldown: true
              }, {
                'hc-key': 'af',
                drilldown: true
              }, {
                'hc-key': 'na',
                drilldown: true
              }, {
                'hc-key': 'sa',
                drilldown: true
              }
      
            ],
            mapData: Highcharts.maps['custom/world-continents'],
            joinBy: 'hc-key',
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }]
        });
      });
      
    </script>

@endsection