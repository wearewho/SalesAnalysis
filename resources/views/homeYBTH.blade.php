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
                <span>YBTH Sales Monitoring Dashboard : </span>
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
        <div class="col-md-6">  
            <div class="fadeTable" id="C"> 
                <div class="box box-solid  box-danger">
                    <div class="box-header with-border" style="text-align:center;">
                        <h3 class="box-title">OEM VS. SPD VS. Export VS. OEM-Export</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">                        
                        <div id="bahtYBTH" style="height: 200px;"></div>
                        <div id="unitYBTH" style="height: 225px;"></div>  
                    </div>
                    <!-- /.box-body -->                     
                </div>
                <!-- /.box -->             
            </div>
            <div class="loading-img"></div>
        </div>           
        <div class="col-md-6"> 
            <div class="row">
                <div class="col-md-12">
                    <div class="fadeTable">   
                    <!-- Custom Tabs (Pulled to the right) -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                        <li class="active"><a href="#tab_1-1" data-toggle="tab">OEM</a></li>
                        <li><a href="#tab_2-2" data-toggle="tab">SPD</a></li>
                        <li><a href="#tab_3-3" data-toggle="tab">Export</a></li>
                        <li><a href="#tab_4-4" data-toggle="tab">OEM-Export</a></li>
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
                                <tbody id="oemProduct"></tbody>
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
                                <tbody id="spdProduct"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_3-3">                                             
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
                                <tbody id="expProduct"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_4-4">                                             
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
                                <tbody id="oexProduct"></tbody>
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
                        <li class="active"><a href="#tab_1-11" data-toggle="tab">OEM</a></li>
                        <li><a href="#tab_2-21" data-toggle="tab">SPD</a></li>
                        <li><a href="#tab_3-31" data-toggle="tab">Export</a></li>
                        <li><a href="#tab_4-41" data-toggle="tab">OEM-Export</a></li>
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
                                <tbody id="oemCustomer"></tbody>
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
                                <tbody id="spdCustomer"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_3-31">                                                    
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Customer</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="expCustomer"></tbody>
                            </table>
                        </div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="tab_4-41">                                                    
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="text-align:center">No.</th>
                                        <th>Customer</th>
                                        <th style="text-align:right">Unit</th>
                                        <th style="text-align:right">Baht</th>
                                    </tr>
                                </thead> 
                                <tbody id="oexCustomer"></tbody>
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
        </div>     
        
        <div class="row">     
            <div class="col-md-6">        
                <div class="fadeTable" id="D">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">AMB Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH2" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH2" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->     
                </div>
                <div class="loading-img"></div>        
            </div>    
            <div class="col-md-6">   
                <div class="fadeTable" id="E">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">MCB Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH3" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH3" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->             
                </div>
                <div class="loading-img"></div>              
            </div>                                  
        </div>     

        <div class="row">     
            <div class="col-md-6">        
                <div class="fadeTable" id="F">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">NP Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH4" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH4" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->     
                </div>
                <div class="loading-img"></div>         
            </div>    
            <div class="col-md-6">   
                <div class="fadeTable" id="G">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">EB Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH5" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH5" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->             
                </div>
                <div class="loading-img"></div>                 
            </div>                                  
        </div>     

        <div class="row">     
            <div class="col-md-6">        
                <div class="fadeTable" id="H">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">IND Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH6" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH6" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->     
                </div>
                <div class="loading-img"></div>         
            </div>    
            <div class="col-md-6">   
                <div class="fadeTable" id="I">   
                    <div class="box box-solid box-danger">
                        <div class="box-header with-border" style="text-align:center;">
                            <h3 class="box-title">OTH Partion</h3>
                        </div>
                        <div class="box-body">  
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bahtYBTH7" style="height: 220px;"></div> 
                                </div>
                                <div class="col-md-6">
                                    <div id="unitYBTH7" style="height: 220px;"></div> 
                                </div>
                            </div>
                        </div>
                        <!-- /.box-body -->                     
                    </div>
                    <!-- /.box -->             
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM</b></td>                                        
                                        <td id="BahtOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">SPD</b></td>                                        
                                        <td id="BahtSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Export</b></td>                                        
                                        <td id="BahtEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM-Export</b></td>                                        
                                        <td id="BahtOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="BahtOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM</b></td>                                        
                                        <td id="UnitOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">SPD</b></td>                                        
                                        <td id="UnitSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Export</b></td>                                        
                                        <td id="UnitEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM-Export</b></td>                                        
                                        <td id="UnitOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="UnitOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM</b></td>
                                        <td id="ambBahtOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM-Export</b></td>                                        
                                        <td id="ambBahtOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Export</b></td>                                        
                                        <td id="ambBahtEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambBahtEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM</b></td>
                                        <td id="ambUnitOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM-Export</b></td>                                        
                                        <td id="ambUnitOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Export</b></td>                                        
                                        <td id="ambUnitEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="ambUnitEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM</b></td>                                        
                                        <td id="mcbBahtOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>                                
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OEM-Export</b></td>                                        
                                        <td id="mcbBahtOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                        <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Export</b></td>                                        
                                        <td id="mcbBahtEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbBahtEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM</b></td>                                        
                                        <td id="mcbUnitOEM1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEM12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEMTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>                                
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OEM-Export</b></td>                                        
                                        <td id="mcbUnitOEX1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEX12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitOEXTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                        <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">EXP</b></td>                                        
                                        <td id="mcbUnitEXP1" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP2" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP3" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP4" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP5" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP6" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP7" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP8" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP9" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP10" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP11" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXP12" style="text-align: right;">&nbsp;</td>
                                        <td id="mcbUnitEXPTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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

    <div class="modal fade" id="modal-npTotalSales">
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">NP</b></td>                                        
                                        <td id="npBahtSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>       
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="npBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="npBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="npBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="npBahtYearOld" ></b></td>
                                        <td id="npBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="npBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="npBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">NP</b></td>                                        
                                        <td id="npUnitSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>      
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="npUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="npUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="npUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="npUnitYearOld" ></b></td>
                                        <td id="npUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="npUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="npUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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

    <div class="modal fade" id="modal-ebTotalSales">
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">EB</b></td>                                        
                                        <td id="ebBahtSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>         
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="ebBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="ebBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="ebBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="ebBahtYearOld" ></b></td>
                                        <td id="ebBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="ebBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">EB</b></td>                                        
                                        <td id="ebUnitSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>      
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="ebUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="ebUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="ebUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="ebUnitYearOld" ></b></td>
                                        <td id="ebUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="ebUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="ebUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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

    <div class="modal fade" id="modal-indTotalSales">
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">IND</b></td>                                        
                                        <td id="indBahtSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>         
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="indBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="indBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="indBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="indBahtYearOld" ></b></td>
                                        <td id="indBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="indBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="indBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">IND</b></td>                                        
                                        <td id="indUnitSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>      
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="indUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="indUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="indUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="indUnitYearOld" ></b></td>
                                        <td id="indUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="indUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="indUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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

    <div class="modal fade" id="modal-othTotalSales">
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
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">OTH</b></td>                                        
                                        <td id="othBahtSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>         
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtActualNow">Total</b></td>                                       
                                        <td id="othBaht1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBaht12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="BahtTargetNow">Target</b></td>
                                        <td id="othBahtTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="othBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="othBahtYearOld" ></b></td>
                                        <td id="othBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="othBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="othBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">OTH</b></td>                                        
                                        <td id="othUnitSPD1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPD12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitSPDTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>      
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitActualNow">Total</b></td>                                       
                                        <td id="othUnit1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnit12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="UnitTargetNow">Target</b></td>
                                        <td id="othUnitTarget1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTarget12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitTargetTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr> 
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                        <td id="othUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffd699">
                                        <td bgcolor="#b6dde8"><b id="othUnitYearOld" ></b></td>
                                        <td id="othUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                    </tr>
                                    <tr style="text-align:center;" bgcolor="#ffb84d">
                                        <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                        <td id="othUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                        <td id="othUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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

<script src="{{ URL::asset('js/dashboardYBTH.js') }}"></script> 

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