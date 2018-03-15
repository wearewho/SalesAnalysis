@extends('layouts.app')

@section('content')
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('adminlte/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.css') }}">
    <style>
        .dotWhite {
            height: 10px;
            width: 10px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
        }
        .dotGreen {
            height: 10px;
            width: 10px;
            background-color: green;
            border-radius: 50%;
            display: inline-block;
        }
        .dotRed {
            height: 10px;
            width: 10px;
            background-color: red;
            border-radius: 50%;
            display: inline-block;
        }
        .five {
            background-color: #f63a0f;
        }

        .twentyfive {
            background-color: #f27011;
        }

        .fifty {
            background-color: #f2b01e;
        }

        .seventyfive {
            background-color: #f2d31b;
        }
        .onehundred {
            background-color: #86e01e;
        }
        .modal .modal-dialog { width: 80%; }
    </style>

    <div class="row">
        <div class="col-md-12">            
            <h2 class="page-header">
                <span>YSD Sales Monitoring Dashboard : </span>
                <a name="Year" id="Year" class="date-picker-year">{{date("Y")}}</a>
            </h2>
        </div>    
    </div>
              
    <div class="row">
        <div class="col-md-5">  
            <div class="fadeTable" id="A">  
                <div class="box box-solid  box-danger">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div id="Baht" style="height: 250px;"></div>   
                        <table class="table table-bordered" style="font-size: 10px;">                    
                            <thead>
                                <tr>
                                    <th style="width: 10px; text-align:center;">#</th>
                                    <th>Jan</th>
                                    <th>Feb</th>
                                    <th>Mar</th>
                                    <th>Apr</th>
                                    <th>May</th>
                                    <th>Jun</th>
                                    <th>Jul</th>
                                    <th>Aug</th>
                                    <th>Sept</th>
                                    <th>Oct</th>
                                    <th>Nov</th>
                                    <th>Dec</th>
                                    <th style="width: 40px">YtoD</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                <tr style="text-align:center;">
                                    <td style="width: 10px; font-weight: bold;">Growth</td>
                                    <td>
                                        <div id="bahtGrowth1"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth2"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth3"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth4"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth5"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth6"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth7"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth8"></div>
                                    </td>
                                    <td>                                    
                                        <div id="bahtGrowth9"></div>                                
                                    </td>
                                    <td>
                                        <div id="bahtGrowth10"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth11"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowth12"></div>
                                    </td>
                                    <td>
                                        <div id="bahtGrowthTotal"></div>
                                    </td>
                                </tr>  
                                <tr style="text-align:center;">  
                                    <td style="width: 10px; font-weight: bold;">Achieve</td>
                                    <td>
                                        <div id="bahtAchieve1"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve2"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve3"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve4"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve5"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve6"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve7"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve8"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve9"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve10"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve11"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieve12"></div>
                                    </td>
                                    <td>
                                        <div id="bahtAchieveTotal"></div>
                                    </td>
                                </tr>                                                                                
                            </tbody>                      
                        </table>             
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->             
            </div>
            <div class="loading-img"></div>
        </div>        
        <div class="col-md-5">  
            <div class="fadeTable" id="B">  
                <div class="box box-solid box-danger">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div id="Unit" style="height: 250px;"></div>   
                        <table class="table table-bordered" style="font-size: 10px;">                    
                            <thead>
                                <tr>
                                    <th style="width: 10px; text-align:center;" >#</th>
                                    <th>Jan</th>
                                    <th>Feb</th>
                                    <th>Mar</th>
                                    <th>Apr</th>
                                    <th>May</th>
                                    <th>Jun</th>
                                    <th>Jul</th>
                                    <th>Aug</th>
                                    <th>Sept</th>
                                    <th>Oct</th>
                                    <th>Nov</th>
                                    <th>Dec</th>
                                    <th style="width: 40px">YtoD</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                <tr style="text-align:center;">
                                    <td style="width: 10px; font-weight: bold;">Growth</td>
                                    <td>
                                        <div id="unitGrowth1"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth2"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth3"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth4"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth5"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth6"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth7"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth8"></div>
                                    </td>
                                    <td>                                    
                                        <div id="unitGrowth9"></div>                                
                                    </td>
                                    <td>
                                        <div id="unitGrowth10"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth11"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowth12"></div>
                                    </td>
                                    <td>
                                        <div id="unitGrowthTotal"></div>
                                    </td>
                                </tr>  
                                <tr style="text-align:center;">  
                                    <td style="width: 10px; font-weight: bold;">Achieve</td>
                                    <td>
                                        <div id="unitAchieve1"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve2"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve3"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve4"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve5"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve6"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve7"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve8"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve9"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve10"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve11"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieve12"></div>
                                    </td>
                                    <td>
                                        <div id="unitAchieveTotal"></div>
                                    </td>
                                </tr>                                                                                
                            </tbody>                      
                        </table>             
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->             
            </div>
            <div class="loading-img2"></div>
        </div>         
        <div class="col-md-2">
            <div class="fadeTable">  
                <div class="box box-solid box-danger" style="min-height: 365px;">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6" style="text-align:center;">
                                <b><p id="targetBaht"></p></b>
                                <div class="progress vertical bottom" style="width: 80px; min-height: 265px;">
                                    <div id="graphBaht" class="progress-bar progress-bar-info" role="progressbar" data-transitiongoal=""></div>
                                </div>                            
                                <b><p id="totalBaht"></p></b>
                            </div>    
                            <div class="col-md-6" style="margin-left: -8px;text-align:center;">
                                <b><p id="targetUnit"></p></b>
                                <div class="progress vertical bottom" style="width: 80px; min-height: 265px;">
                                    <div id="graphUnit" class="progress-bar progress-bar-info" role="progressbar" data-transitiongoal=""></div> 
                                </div>        
                                <b><p id="totalUnit"></p></b>
                            </div>
                        </div>
                    </div>            
                </div>        
            </div> 
            <div class="loading-img2"></div>  
        </div> 
    </div>

    <div class="row">
        <div class="col-md-3">  
            <div class="fadeTable" id="C"> 
                <div class="box box-solid  box-danger">
                    <div class="box-header with-border" style="text-align:center;">
                        <h3 class="box-title">MTD VS. REM</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">                        
                        <div id="bahtYSD" style="height: 200px;"></div>
                        <div id="unitYSD" style="height: 225px;"></div>  
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->             
            </div>
            <div class="loading-img"></div>
        </div>        
        <div class="col-md-5">  
            <div class="fadeTable" id="D">   
                <div class="box box-solid box-danger">
                    <div class="box-header with-border" style="text-align:center;">
                        <h3 class="box-title">AMB Partion</h3>
                    </div>
                    <div class="box-body">  
                        <div class="row">
                            <div class="col-md-6">
                                <div id="bahtYSD2" style="height: 220px;"></div> 
                            </div>
                            <div class="col-md-6">
                                <div id="unitYSD2" style="height: 220px;"></div> 
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->     
            </div>
            <div class="loading-img"></div>
            <div class="fadeTable" id="E">   
                <div class="box box-solid box-danger">
                    <div class="box-header with-border" style="text-align:center;">
                        <h3 class="box-title">MCB Partion</h3>
                    </div>
                    <div class="box-body">  
                        <div class="row">
                            <div class="col-md-6">
                                <div id="bahtYSD3" style="height: 220px;"></div> 
                            </div>
                            <div class="col-md-6">
                                <div id="unitYSD3" style="height: 220px;"></div> 
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->             
            </div>
            <div class="loading-img"></div>
        </div>         
        <div class="col-md-4"> 
            <div class="row">
                <div class="col-md-12">
                    <div class="fadeTable">   
                    <!-- Custom Tabs (Pulled to the right) -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                        <li class="active"><a href="#tab_1-1" data-toggle="tab">REM</a></li>
                        <li><a href="#tab_2-2" data-toggle="tab">MTD</a></li>
                        <li class="pull-left header"><i class="fa fa-star-o"></i>Top 5 Products</li>
                        </ul>
                        <div class="tab-content">
                        <div class="tab-pane active" id="tab_1-1">                            
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Item</th>
                                        <th style="text-align:center">Group</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="remProduct"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_2-2">                                             
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Item</th>
                                        <th style="text-align:center">Group</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="mtdProduct"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div>
                    <!-- nav-tabs-custom -->
                    </div>
                    <!-- /.col -->  
                    </div>
                    <div class="loading-img"></div>
                </div>  
                <div class="row">
                <div class="col-md-12">
                    <div class="fadeTable">   
                    <!-- Custom Tabs (Pulled to the right) -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                        <li class="active"><a href="#tab_1-11" data-toggle="tab">REM</a></li>
                        <li><a href="#tab_2-21" data-toggle="tab">MTD</a></li>
                        <li class="pull-left header"><i class="fa fa-star-o"></i>Top 5 Customers</li>
                        </ul>
                        <div class="tab-content">
                        <div class="tab-pane active" id="tab_1-11">                                                       
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Customer</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="remCustomer"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_2-21">                                                    
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Customer</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="mtdCustomer"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div>
                    <!-- nav-tabs-custom -->
                    </div>
                    <!-- /.col -->  
                    </div>
                    <div class="loading-img"></div>
                </div>                                  
        </div>     

        <div class="modal fade" id="modal-totalSales">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headModal">Total Sales</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">                                                           
                            <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (1,000 BAHT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">REM</b></td>
                                        <td id="BahtREM1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREM12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtREMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">MTD</b></td>                                        
                                        <td id="BahtMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="Baht1" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht2" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht3" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht4" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht5" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht6" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht7" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht8" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht9" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht10" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht11" style="text-align: right;">&nbsp;</td>
                                        <td id="Baht12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="BahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="BahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtYearOld" ></b></td>
                                        <td id="BahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="BahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>
                            <table id="UnitTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (UNIT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">REM</b></td>
                                        <td id="UnitREM1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREM12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitREMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">MTD</b></td>                                        
                                        <td id="UnitMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="Unit1" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit2" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit3" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit4" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit5" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit6" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit7" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit8" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit9" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit10" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit11" style="text-align: right;">&nbsp;</td>
                                        <td id="Unit12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="UnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="UnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitYearOld" ></b></td>
                                        <td id="UnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="UnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>     
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
                            <b>  Data as of:  {{ $todate }} </b>
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

    <div class="modal fade" id="modal-ambTotalSales">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headModal2">Total Sales</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">                                                           
                            <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (1,000 BAHT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">REM</b></td>
                                        <td id="ambBahtREM1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREM12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtREMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">MTD</b></td>                                        
                                        <td id="ambBahtMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="ambBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="ambBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="ambBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="ambBahtYearOld" ></b></td>
                                        <td id="ambBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="ambBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>
                            <table id="UnitTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (UNIT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">REM</b></td>
                                        <td id="ambUnitREM1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREM12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitREMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">MTD</b></td>                                        
                                        <td id="ambUnitMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="ambUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="ambUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="ambUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="ambUnitYearOld" ></b></td>
                                        <td id="ambUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="ambUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>     
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
                            <b>  Data as of:  {{ $todate }} </b>
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

    <div class="modal fade" id="modal-mcbTotalSales">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headModal3">Total Sales</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">                                                           
                            <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (1,000 BAHT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">MTD</b></td>                                        
                                        <td id="mcbBahtMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="mcbBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="mcbBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="mcbBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="mcbBahtYearOld" ></b></td>
                                        <td id="mcbBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="mcbBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>
                            <table id="UnitTTable" class="table table-bordered" style="font-size: 14px;" >
                                <thead>
                                    <tr style="text-align:center;" bgcolor="#b6dde8">
                                        <th style="vertical-align:middle; text-align:center; width:150px;">Sales (UNIT)</th>
                                        <th style="text-align:center;">January</th>
                                        <th style="text-align:center;">February</th>
                                        <th style="text-align:center;">March</th>
                                        <th style="text-align:center;">April</th>
                                        <th style="text-align:center;">May</th>
                                        <th style="text-align:center;">June</th>
                                        <th style="text-align:center;">July</th>
                                        <th style="text-align:center;">August</th>
                                        <th style="text-align:center;">September</th>
                                        <th style="text-align:center;">October</th>
                                        <th style="text-align:center;">November</th>
                                        <th style="text-align:center;">December</th>
                                        <th style="text-align:center;">Total</th>
                                    </tr>                               
                                </thead>
                                <tbody>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">MTD</b></td>                                        
                                        <td id="mcbUnitMTD1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTD12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitMTDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="mcbUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="mcbUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="mcbUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="mcbUnitYearOld" ></b></td>
                                        <td id="mcbUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="mcbUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>                   
                                </tbody>
                            </table>     
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
                            <b>  Data as of:  {{ $todate }} </b>
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
<script src="{{ URL::asset('adminlte/plugins/bootstrap-progressbar/bootstrap-progressbar.js') }}"></script> 
<script src="{{ URL::asset('adminlte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts-3d.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/series-label.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/data.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/exporting.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/offline-exporting.js') }}"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>

<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.bootstrap.min.js"></script> 
<script src="https://cdn.datatables.net/1.10.16/js/dataTables.semanticui.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.flash.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"></script> 
<script src='https://cdn.jsdelivr.net/lodash/4.17.2/lodash.min.js'></script>

<script src="{{ URL::asset('js/dashboard.js') }}"></script> 

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

        $('.progress .progress-bar').progressbar({
                display_text: 'fill'                            
        });   
        
        $('[data-toggle="tooltip"]').tooltip();   

    });
</script>
@endsection