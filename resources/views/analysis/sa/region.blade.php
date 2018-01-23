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

        #one {
        top: 0;
        left: 0;
        background: pink;
        }
        #two {
            top: 50%;
            left: 0;
            background: lightgreen;
        }
        #three {
            top: 0;
            left: 50%;    
            background: green;
            background-position: center center;
            background-size: cover;
            height: 100%;
        }
    </style>

    <div class="row">      
        <div class="col-md-9">                       
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">Drilldown Map for Sales Report by Region in Thailand.</h3>
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
          <div class="col-md-12"> 
              <div class="box box-danger">
                  <div class="box-header with-border">
                      <h3 class="box-title">Sales Report by Region</h3>
                  </div>
                  <div class="box-body">
                      <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Report Year</label>
                              <select class="form-control select2" name="year" style="width: 100%;">
                                <option selected="selected">2017</option>
                                <option>2018/option>
                              </select>
                            </div>  
                            <div class="form-group">
                              <label>Group by</label>
                              <select class="form-control select2" name="group" style="width: 100%;">
                                <option selected="selected">Product Type</option>
                                <option>Item</option>
                                <option>Customer</option>
                              </select>
                            </div> 
                            <div class="form-group">
                              <label>Market	</label>
                              <select class="form-control select2" name="market" style="width: 100%;">
                                <option selected="selected">All</option>
                                @foreach ($Market as $market)
                                <option value="{{ $market->Code }}">{{ $market->Name }}</option>
                                @endforeach
                              </select>
                            </div>     
                            <div class="form-group">
                              <label>Period	</label>
                              <select class="form-control select2" name="period" style="width: 100%;">
                                <option selected="selected">Monthly</option>
                                <option>Quaterly</option>
                                <option>Yearly</option>
                              </select>
                            </div> 

                            <hr>

                            <div class="form-group">  
                              <label>Region	</label>
                              <select class="form-control select2" name="region" style="width: 100%;">
                                <option selected="selected" value="World">World</option> 
                                <optgroup label="Outside Thailand">
                                  <option value="Asia">Asia</option>
                                  <option value="Europe">Europe</option>
                                  <option value="Oceania">Oceania</option>
                                  <option value="Africa">Africa</option>
                                  <option value="North America">North America</option>
                                  <option value="South America">South America</option>
                                </optgroup>  
                                <optgroup label="Thailand">
                                  <option value="Thailand">All (Regions in Thailand)</option>      
                                  @foreach ($Region as $region)
                                  <option value="{{ $region->Name }}">{{ $region->Name }}</option>
                                  @endforeach
                                </optgroup>        
                              </select>
                            </div> 

                            <div class="form-group">
                              <label>Province	</label>
                              <select class="form-control select2" name="province" style="width: 100%;">
                                <option selected="selected">-- Select Region --</option>
                              </select>
                            </div> 

                          </div>
                      </div>
                  </div>                  
                  <div class="box-footer" style="text-align:center;">
                    <button align="center" type="submit" class="btn btn-primary">Submit</button>
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

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });   

        selectMap();

        $("select[name='region']").change(function(){
          var region = $(this).val();
          if(region == 'World' || region == 'Asia' || region == 'Europe' || region == 'Oceania' || region == 'Africa' || region == 'North America' || region == 'South America'){
            $("select[name='province'").empty();
            $("select[name='province'").append('<option selected="selected">-- Select Region --</option>');
            
          }
          else if(region == 'Thailand'){
            $("select[name='province'").empty();
            $("select[name='province'").append('<option selected="selected" value="All" disabled="disabled">All (Provinces in Thailand)</option>');
          }
          else{
            $.ajax({
              url: "/sa/selectProvince",
              method: 'POST',
              data: {region:region},
              success: function(data) {
                var $select_elem = $("select[name='province'");
                $select_elem.empty();                
                var results = data[0];  
                $select_elem.append('<option selected="selected" value="All">All</option>');
                $.each(results, function() {
                    $select_elem.append('<option value="' + this.U_FName + '">' + this.U_FName + '</option>');
                });
              }
          });
          }
          
      }); 


    });     
      
      
      function selectMap(region) {
        
        Highcharts.setOptions({
            lang: {
                drillUpText: '◁ Back to previous map'
            }
        });

        // Initiate the map
        $('#map').highcharts('Map', {
          title: {
            text: 'Sales Report World Map'
          },
               
          chart: {
            events: {
      
              drilldown: function(e) {
                if (!e.seriesOptions) {
                  var chart = this,
                    pointWithLatLon = function(point, latLon) {
                      return Highcharts.merge(point, chart.transformFromLatLon(latLon,
                        Highcharts.maps['custom/world']['hc-transform']['default']));
                    };      
                    
                  var continent;
                  var contName;                
                  $("select[name='region']").val(e.point.name).change();

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
                        name: 'Asia', 
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
                        name: 'Europe',                      
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
                        name: 'Oceania', 
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
                        name: 'Africa',
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
                        name: 'North America',
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
                        name: 'South America',
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
                          color: '#29a3a3',
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
                        name: 'Thailand',
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
                        name: 'Central',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
                      });
                      break;
                    case "Northern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Northern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Northern',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
      
                      });
                      break;
                    case "Western":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Western']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Western',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
      
                      });
                      break;
                    case "Eastern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Eastern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Eastern',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
      
                      });
                      break;
                    case "Northeastern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Northeastern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Northeastern',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
      
                      });
                      break;
                    case "Bangkok and Surrounding":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Bangkok']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Bangkok and Surrounding',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black',
                                
                            }
                        } 
      
                      });
                      break;
                    case "Southern":
                        data = Highcharts.geojson(Highcharts.maps['countries/th/Southern']),
                        chart.addSeriesAsDrilldown(e.point, {
                        data: data, 
                        name: 'Southern',
                        dataLabels: {
                          enabled: true,
                          formatter: function() {
                            return this.point.name;
                          }
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        states: {
                            hover: {
                                color: '#a4edba'
                            },
                            select: {
                                color: '#fbfff0',
                                borderColor: 'black'
                            }
                        } 
      
                      });
                      break;
                  }      
                  /* chart.addSeries({
                    id: 'cities',
                    name: 'Cities',
                    type: 'mappoint',
                    color: 'black',
                    marker: {
                      symbol: 'circle'
                    }
                  }); */

                }
              },
              drillup: function (e) {                
                  $("select[name='region']").val(this.series[1].name).change();
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

                      select: function () {                        
                        if(this.properties["woe-name"]){                              
                          $("select[name='province']").val(this.properties["woe-name"]).change();
                        }
                        else{
                          $("select[name='province'").empty();
                          $("select[name='province'").append('<option selected="selected">-- Select Region --</option>');
                        }
                      },
                      unselect: function () {                                                  
                        var oldProvince = $("select[name='province']").val();
                        var newProvince = this.properties["woe-name"];
                        if(oldProvince == newProvince){                          
                          $("select[name='province']").val("All").change();
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
                drilldown: true
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
    }
      
    </script>

@endsection



