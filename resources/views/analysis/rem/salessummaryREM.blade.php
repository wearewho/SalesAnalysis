@extends('layouts.app')

@section('content') 

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"/> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.1/css/buttons.dataTables.min.css"/>

    <style>
        .uniqueClassName {
            text-align: right;
        }
        .dataTables_wrapper .dt-buttons {
            float:none;  
            text-align:center;
        }
        div.dt-buttons {
            clear: both;
        }
    </style>

    <!-- START CUSTOM TABS -->

    <div class="row">
        <div class="col-md-10">            
            <h2 class="page-header">
                <span><b>REM Sales Summary Report : </b></span>
                <b><a name="Year" id="Year" class="date-picker-year">{{date("Y")}}</a></b>
            </h2>
        </div> 
        <div class="col-md-1 ">        
            <button type="button" id="mode" style="float: left;" class="btn btn-info margin"><i class="fa fa-bar-chart"></i> Quarterly</button> 
        </div>
        <div class="col-md-1">               
            <form action="{{ route('analysis.rem.salessummary.downloadPDF') }}" method="POST" id="downloadPDF"> 
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">    
                <input type="hidden" id="typeHidden" name="type" value="">  
                <input type="hidden" id="modeHidden" name="mode" value="">  
                <input type="hidden" name="year" id="currYear" value=""> 
                <input type="hidden" name="chart1" id="chart1"> 
                <input type="hidden" name="chart2" id="chart2">   
                <button type="button" id="pdf" target="_blank" class="btn btn-danger margin"><i class="fa fa-file-pdf-o"></i> PDF</button> 
            </form>      
        </div>    
    </div>

    <div id="Yearly">
        <div class="row">
        <div class="col-md-12">
            <!-- Custom Tabs (Pulled to the right) -->
            <div class="nav-tabs-custom">
            <ul class="nav nav-tabs pull-right typeY">
                <li class="active"><a href="#tab_1-1" data-toggle="tab" id="tab_1"><strong style="font-size:16px;">Graph</strong></a></li>
                <li><a href="#tab_2-2" data-toggle="tab" id="tab_2"><strong style="font-size:16px;">Table</strong></a></li>
                <li class="pull-left header"><i class="fa fa-object-group"></i> Sales Summary Report of Yearly</li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_1-1">  
                
                <div class="loadGraph">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="Baht"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="Unit"></div>
                        </div>
                    </div>
                </div>
                <div class="loading-img"></div>
                    
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2-2">
                
                <div class="loadTable">
                    <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:130px;">AMB (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="BahtActualNow"></b></td>
                                <td id="BahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="BahtTargetNow"></b></td>
                                <td id="BahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
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
                                <td id="BahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="BahtActualOld" ></b></td>
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
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
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
                                <td id="BahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:130px;">AMB (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="UnitActualNow"></b></td>
                                <td id="UnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="UnitTargetNow"></b></td>                            
                                <td id="UnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
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
                                <td id="UnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="UnitActualOld"></b></td>
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
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
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
                                <td id="UnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>                
                </div>
                <div class="loading-img2"></div>
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
    </div> 

    <div id="Quarterly">
        <div class="row">
        <div class="col-md-12">
            <!-- Custom Tabs (Pulled to the right) -->
            <div class="nav-tabs-custom">
            <ul class="nav nav-tabs pull-right typeQ">
                <li class="active"><a href="#tab_Q1-1" data-toggle="tab" id="tab_Q1" style="font-size:16px;"><strong>Graph</strong></a></li>
                <li><a href="#tab_Q2-2" data-toggle="tab" id="tab_Q2"><strong style="font-size:16px;">Table</strong></a></li>
                <li class="pull-left header"><i class="fa fa-object-group"></i> Sales Summary Report of Quarterly</li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_Q1-1">  
                
                <div class="loadGraphQ">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="BahtQ"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="UnitQ"></div>
                        </div>
                    </div>
                </div>
                <div class="loading-img"></div>
                    
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_Q2-2">
                
                <div class="loadTable">
                    <table id="QBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB (1,000 BAHT)</th>
                                <th style="text-align:center;">Q1</th>
                                <th style="text-align:center;">Q2</th>
                                <th style="text-align:center;">Q3</th>
                                <th style="text-align:center;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="BahtActualQNow"></b></td>
                                <td id="BahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="BahtTargetQNow"></b></td>
                                <td id="BahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                                <td id="BahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="BahtActualQOld" ></b></td>
                                <td id="BahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                                <td id="BahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="BahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="BahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="BahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="BahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="QUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB (UNIT)</th>
                                <th style="text-align:center;">Q1</th>
                                <th style="text-align:center;">Q2</th>
                                <th style="text-align:center;">Q3</th>
                                <th style="text-align:center;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="UnitActualQNow"></b></td>
                                <td id="UnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="UnitTargetQNow"></b></td>                            
                                <td id="UnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                                <td id="UnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="UnitActualQOld"></b></td>
                                <td id="UnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                                <td id="UnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="UnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="UnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="UnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="UnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>                
                </div>
                <div class="loading-img2"></div>
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
    </div> 

    <div class="modal fade" id="modal-dataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <b><h4 class="modal-title" id="headModal">REM Sales Summary: </h4></b>
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
                                                    <th>Brand</th>
                                                    <th>Commodity</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>                                            
                                            <tfoot>
                                                <tr>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
                                        </table>  
                                    </div>
                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="tab_Customer">
                                        <table id="Customer" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Customer Code</th>
                                                    <th>Customer Name</th>
                                                    <th>Master Dealer</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>                                        
                                            <tfoot>
                                                <tr>                                                        
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
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

<script src="{{ URL::asset('js/salessummaryREM.js') }}"></script> 

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
