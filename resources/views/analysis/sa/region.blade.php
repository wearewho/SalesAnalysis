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
                                <option>2018</option>
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
                              <select class="form-control select2" name="market" id="market" style="width: 100%;"> 
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
                              <select class="form-control select2" name="region" id="region" style="width: 100%;" disabled> 
                                  <option selected="selected" value="Thailand">All Regions</option>  
                                <optgroup label="Thailand">    
                                  @foreach ($Region as $region)
                                  <option value="{{ $region->Name }}">{{ $region->Name }}</option>
                                  @endforeach
                                </optgroup>        
                              </select>
                            </div> 

                            <div class="form-group">
                              <label>Province	</label>
                              <select class="form-control select2" name="province" id="province" style="width: 100%;" disabled>
                                <option selected="selected">All Provinces</option>
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
    <script src="https://code.highcharts.com/maps/modules/data.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/europe.js"></script>
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

        $("select[name='region']").change(function(){
          var region = $(this).val();
          if(region == 'Thailand'){
            $("select[name='province']").empty();
            $("select[name='province']").append('<option selected="selected" value="All" disabled="disabled">All Provinces</option>');
          }          
          else{
            $.ajax({
              url: "/SalesAnalysis/sa/selectProvince",
              method: 'POST',
              data: {region:region},
              success: function(data) {
                var $select_elem = $("select[name='province']");
                $select_elem.empty();                
                var results = data[0];  
                $select_elem.append('<option selected="selected" value="All">All</option>');
                $.each(results, function() {
                    $select_elem.append('<option value="' + this.U_FName + '">' + this.U_FName + '</option>');
                });
              }
          });
          
          if(region == "Eastern"){          
              chart.series[0].data[0].firePointEvent('click');  
              $("select[name='region']").val(region);
            } 
            else if(region == "Central"){          
              chart.series[0].data[1].firePointEvent('click');  
            } 
            else if(region == "Northeastern"){
              chart.series[0].data[2].firePointEvent('click'); 
            } 
            else if(region == "Bangkok and Surrounding"){
              chart.series[0].data[3].firePointEvent('click');  
            } 
            else if(region == "Northern"){
              chart.series[0].data[4].firePointEvent('click');  
            } 
            else if(region == "Western"){
              chart.series[0].data[5].firePointEvent('click');  
            }       
            else if(region == "Southern"){
              chart.series[0].data[6].firePointEvent('click');  
            } 
        }
          
      }); 

    });     

              
    var data = Highcharts.geojson(Highcharts.maps['countries/th/Region-all']),
        // Some responsiveness
        small = $('#map').width() < 450;        

        // Set drilldown pointers
        $.each(data, function (i) {
        this.drilldown = this.properties['region'];
        this.color = getRandomColor();
        this.value = i; // Non-random bogus data
        });

        // Instanciate the map
        var chart =  Highcharts.mapChart('map', {       
        chart: {
            events: {
                drilldown: function (e) {

                    if (!e.seriesOptions) {
                        var chart = this,
                            mapKey = 'countries/th/' + e.point.drilldown ,
                            // Handle error, the timeout is cleared on success
                            fail = setTimeout(function () {
                                if (!Highcharts.maps[mapKey]) {
                                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                                    fail = setTimeout(function () {
                                        chart.hideLoading();
                                    }, 1000);
                                }
                            }, 3000);
                            
                        // Show the spinner
                        chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                        // Load the drilldown map
                        $.getScript("{{ URL::asset('highmap/mapdata/') }}" + '/' + mapKey + '.js', function () {

                            data = Highcharts.geojson(Highcharts.maps[mapKey]);

                            // Set a non-random bogus value
                            $.each(data, function (i) {
                                this.value = i;
                                this.color = getRandomColor();
                            });
                            
                            if(e.point.name != null){
                                $("select[name='region']").val(e.point.name).change();
                            }

                            // Hide loading and add series
                            chart.hideLoading();
                            clearTimeout(fail);
                            chart.addSeriesAsDrilldown(e.point, {
                                name: e.point.name,
                                data: data,         
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
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
                        });
                    }

                    this.setTitle(null, { text: e.point.name });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'Thailand' });                    
                    $("select[name='region']").val(this.series[1].name).change();
                }
            }
        },

        title: {
            text: 'Highcharts Map Drilldown'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.name}'
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
        series: [{
            data: data,
            name: 'Thailand',
            dataLabels: {
                enabled: true,
                format: '{point.properties.name}'
            },
            borderColor: '#A0A0A0',
            showInLegend: false
        }],
        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textOutline: '1px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
        });            

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }     

    </script>

@endsection



