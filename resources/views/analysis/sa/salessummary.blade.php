@extends('layouts.app')

@section('content') 

    <!-- START CUSTOM TABS -->

    <div class="row">
        <div class="col-md-10">            
            <h2 class="page-header">
                <span id="Company"></span>
                <span> Sales Summary Report : </span>
                <span id="Month"></span>
                <a name="Year" id="Year" class="date-picker-year">{{date("Y")}}</a>
            </h2>
        </div> 
        <div class="col-md-1 ">        
            <button type="button" id="click" class="btn btn-info margin"><i class="fa fa-pie-chart"></i> Pie Charts</button> 
        </div>
        <div class="col-md-1">    
            {!! Form::open(['method' => 'POST', 'route' => ['analysis.sa.salessummary.downloadPDF']]) !!}        
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">    
                <input type="hidden" name="month" id="m" value=""> 
                <input type="hidden" name="year" id="y" value="">   
                <input type="hidden" name="company" id="c" value="">  
                <input type="hidden" name="chart1" id="chart1" value=""> 
                <input type="hidden" name="chart2" id="chart2" value=""> 
                <input type="hidden" name="chart3" id="chart3" value=""> 
                <input type="hidden" name="chart4" id="chart4" value=""> 
                <button type="submit" id="pdf" target="_blank" class="btn btn-danger margin"><i class="fa fa-file-pdf-o"></i> PDF</button> 
            {!! Form::close() !!}    
        </div>    
    </div>

    <button type="button" id="test" target="_blank" class="btn btn-danger margin"><i class="fa fa-file-pdf-o"></i> PDF</button> 

    <div class="row">
    <div class="col-md-12">
        <!-- Custom Tabs (Pulled to the right) -->
        <div class="nav-tabs-custom">
        <ul class="nav nav-tabs pull-right">
            <li class="active"><a href="#tab_1-1" data-toggle="tab" id="tab_1">YSD</a></li>
            <li><a href="#tab_2-2" data-toggle="tab" id="tab_2">YBTH</a></li>
            <li><a href="#tab_3-2" data-toggle="tab" id="tab_3">Consolidate</a></li>
            <li class="pull-left header"><i class="fa fa-object-group"></i> Sales Summary Report</li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab_1-1">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs sub-ysd">
                    <li class="active"><a href="#Jan" data-toggle="tab" data-value="1">January</a></li>
                    <li><a href="#Feb" data-toggle="tab" data-value="2">Febuary</a></li>
                    <li><a href="#Mar" data-toggle="tab" data-value="3">March</a></li>
                    <li><a href="#Apr" data-toggle="tab" data-value="4">April</a></li>
                    <li><a href="#May" data-toggle="tab" data-value="5">May</a></li>
                    <li><a href="#Jun" data-toggle="tab" data-value="6">June</a></li>
                    <li><a href="#Jul" data-toggle="tab" data-value="7">July</a></li>
                    <li><a href="#Aug" data-toggle="tab" data-value="8">August</a></li>
                    <li><a href="#Sep" data-toggle="tab" data-value="9">September</a></li>
                    <li><a href="#Oct" data-toggle="tab" data-value="10">October</a></li>
                    <li><a href="#Nov" data-toggle="tab" data-value="11">November</a></li>
                    <li><a href="#Dec" data-toggle="tab" data-value="12">December</a></li>
                    <li><a href="#YtoD" data-toggle="tab" data-value="13">Year to Date</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="Jan">   
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Feb">  
                            @include('partials.ysdTable')                           
                        </div>
                        <div class="tab-pane" id="Mar">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Apr">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="May">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Jun">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Jul">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Aug">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Sep">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Oct">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Nov">
                            @include('partials.ysdTable')
                        </div>
                        <div class="tab-pane" id="Dec">
                            @include('partials.ysdTable')
                        </div>                        
                        <div class="tab-pane" id="YtoD">
                            @include('partials.ysdTable')
                        </div>
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- nav-tabs-custom -->
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_2-2">
            The European languages are members of the same family. Their separate existence is a myth.
            For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
            in their grammar, their pronunciation and their most common words. Everyone realizes why a
            new common language would be desirable: one could refuse to pay expensive translators. To
            achieve this, it would be necessary to have uniform grammar, pronunciation and more common
            words. If several languages coalesce, the grammar of the resulting language is more simple
            and regular than that of the individual languages.
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_3-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <!-- /.tab-pane -->
        </div>
        <!-- /.tab-content -->
        </div>
        <!-- nav-tabs-custom -->
    </div>
    <!-- /.col -->
    </div>
    <!-- /.row -->
    <!-- END CUSTOM TABS --> 

    <section id="pieSection" >
        <div id="waitPie">
            <div class="loadPie">
                <div class="row">
                    <div class="col-md-6">
                        <div class="box box-danger">
                            <div class="box-header with-border">
                                <i class="fa fa-pie-chart"></i>

                                <h3 class="box-title">By Market</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="container1" style="height: 280px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="loading-img2"></div>
                        </div>
                        <!-- /.box -->
                    </div>
                    <div class="col-md-6">
                        <div class="box box-danger">
                            <div class="box-header with-border">
                                <i class="fa fa-pie-chart"></i>

                                <h3 class="box-title">By Market</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="container2" style="height: 280px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="loading-img2"></div>
                        </div>
                        <!-- /.box -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="box box-danger">
                            <div class="box-header with-border">
                                <i class="fa fa-pie-chart"></i>

                                <h3 class="box-title">By Type</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="container3" style="height: 280px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="loading-img2"></div>
                        </div>
                        <!-- /.box -->
                    </div>
                    <div class="col-md-6">
                        <div class="box box-danger">
                            <div class="box-header with-border">
                                <i class="fa fa-pie-chart"></i>

                                <h3 class="box-title">By Type</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="container4" style="height: 280px;"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="loading-img2"></div>
                        </div>
                        <!-- /.box -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="modal-dataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headModal">Sales Summary: December 2017</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_Product" data-toggle="tab">Product Item</a></li>
                                    <li><a href="#tab_Customer" data-toggle="tab">Customer</a></li>
                                    <li class="pull-right"><h4 class="text-muted" id="rightModal"></h4></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_Product">
                                        <table id="Product" class="table table-bordered table-striped" style="font-size: 14px;" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Item</th>
                                                    <th>Description</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>
                                        </table> 
                                    </div>
                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="tab_Customer">
                                        <table id="Customer" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Customer</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>
                                        </table> 
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div>
                            <!-- nav-tabs-custom -->
                        </div>   
                    </div>     
                </div>
                <div class="modal-footer"> 
                    <div class="row">                    
                        <div class="col-md-5"align="left">  
                            <b>Sales Analysis Portal V.1.0</b>
                            <br>
                            <b>Yuasa Battery (Thailand) Public Company Limited</b>
                        </div>
                        <div class="col-md-2" align="center">     
                            <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                            </a>
                        </div>
                        <div class="col-md-5" align="right">  
                            @php                      
                            $todate = date("d/m/Y", strtotime('-1 day'));
                            @endphp
                            <b>  Data as of:  27/12/2018 </b>
                            <br>
                            <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                        </div>
                    </div> 
                </div>        
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

@endsection

@section('javascript')  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="{{ URL::asset('adminlte/js/select2.full.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/main.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/fastclick/fastclick.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/app.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/drilldown.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts-3d.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/data.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/exporting.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/offline-exporting.js') }}"></script> 
<script src="{{ URL::asset('js/salessummary.js') }}"></script> 
<script>
    $(function() {
        $(document).on("click", "a#topDropdown", function() {
            if($("li#liDropdown").hasClass("open")){                
                $("li#liDropdown").removeClass("open");                
                $(this).attr("aria-expanded", "false");
            }
            else{
                $("li#liDropdown").addClass("open");  
                $(this).attr("aria-expanded", "true");
            }            
        });
    });

</script>
@endsection
