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
        div.dt-buttons {
            clear: both;
        }
        .modal .modal-dialog { width: 70%; }
    </style>

    <!-- START CUSTOM TABS -->

    <div class="row">
        <div class="col-md-10">            
            <h2 class="page-header">
                <span>SPD Sales Summary Report : </span>
                <a name="Year" id="Year" class="date-picker-year">{{date("Y")}}</a>
            </h2>
        </div> 
        <div class="col-md-1 ">        
            <button type="button" id="mode" style="float: left;" class="btn btn-info margin"><i class="fa fa-bar-chart"></i> Quarterly</button> 
        </div>
        <div class="col-md-1">               
            <form action="{{ route('analysis.spd.salessummary.downloadPDF') }}" method="POST" id="downloadPDF"> 
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
                            <div id="Baht" style="height: 400px;"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="Unit" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                <div class="loading-img"></div>
                    
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2-2">

                <div class="row">               
                    <div class="col-md-12 form-horizontal">
                        <div class="form-group pull-right">
                            <label for="inputEmail3" class="col-sm-5 control-label">Item Group :</label>        
                            <div class="col-sm-7">                                
                                <select class="form-control" id="itemGroup" name="itemGroup">
                                    <option value="All">All</option>
                                    <option value="AMB">Automotive Battery</option>
                                    <option value="MCB">Motorcycle Battery</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loadTable">
                <table id="allBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> AMB,MCB (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="allBahtActualNow"></b></td>
                                <td id="allBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allBahtTargetNow"></b></td>
                                <td id="allBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="allBahtAchieve1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve5" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve6" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve7" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve8" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve9" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve10" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve11" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieve12" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allBahtActualOld" ></b></td>
                                <td id="allBahtActualOld1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld5" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld6" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld7" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld8" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld9" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld10" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld11" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOld12" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="allBahtGrowth1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth5" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth6" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth7" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth8" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth9" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth10" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth11" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowth12" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>    
                        </tbody>
                    </table>
                    <table id="allUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">AMB,MCB (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="allUnitActualNow"></b></td>
                                <td id="allUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allUnitTargetNow"></b></td>                            
                                <td id="allUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="allUnitAchieve1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve5" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve6" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve7" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve8" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve9" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve10" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve11" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieve12" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieveTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allUnitActualOld"></b></td>
                                <td id="allUnitActualOld1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld5" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld6" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld7" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld8" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld9" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld10" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld11" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOld12" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOldTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="allUnitGrowth1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth5" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth6" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth7" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth8" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth9" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth10" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth11" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowth12" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowthTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                                  
                        </tbody>                        
                    </table>  
                    <table id="AMBBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> AMB (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="ambBahtActualNow"></b></td>
                                <td id="ambBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambBahtTargetNow"></b></td>
                                <td id="ambBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="ambBahtActualOld" ></b></td>
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
                    <table id="AMBUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">AMB (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="ambUnitActualNow"></b></td>
                                <td id="ambUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambUnitTargetNow"></b></td>                            
                                <td id="ambUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="ambUnitActualOld"></b></td>
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
                    <table id="MCBBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> MCB (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="mcbBahtActualNow"></b></td>
                                <td id="mcbBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbBahtTargetNow"></b></td>
                                <td id="mcbBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="mcbBahtActualOld" ></b></td>
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
                    <table id="MCBUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">MCB (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="mcbUnitActualNow"></b></td>
                                <td id="mcbUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbUnitTargetNow"></b></td>                            
                                <td id="mcbUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="mcbUnitActualOld"></b></td>
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
                            <div id="BahtQ" style="height: 400px;"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="UnitQ" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                <div class="loading-img"></div>
                    
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_Q2-2">
                
                <div class="row">               
                    <div class="col-md-12 form-horizontal">
                        <div class="form-group pull-right">
                            <label for="inputEmail3" class="col-sm-5 control-label">Item Group :</label>        
                            <div class="col-sm-7">                                
                                <select class="form-control" id="itemGroupQ" name="itemGroupQ">
                                    <option value="All">All</option>
                                    <option value="AMB">Automotive Battery</option>
                                    <option value="MCB">Motorcycle Battery</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loadTable">
                    <table id="allQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB,MCB (BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allBahtActualQNow"></b></td>
                                <td id="allBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allBahtTargetQNow"></b></td>
                                <td id="allBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="allBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allBahtActualQOld" ></b></td>
                                <td id="allBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="allBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="allQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB,MCB (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allUnitActualQNow"></b></td>
                                <td id="allUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allUnitTargetQNow"></b></td>                            
                                <td id="allUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="allUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="allUnitActualQOld"></b></td>
                                <td id="allUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="allUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="allUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                        <table id="AMBQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB (BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambBahtActualQNow"></b></td>
                                <td id="ambBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambBahtTargetQNow"></b></td>
                                <td id="ambBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="ambBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambBahtActualQOld" ></b></td>
                                <td id="ambBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="ambBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="AMBQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">AMB (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambUnitActualQNow"></b></td>
                                <td id="ambUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambUnitTargetQNow"></b></td>                            
                                <td id="ambUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="ambUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ambUnitActualQOld"></b></td>
                                <td id="ambUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="ambUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ambUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                        <table id="MCBQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">MCB (1,000 BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbBahtActualQNow"></b></td>
                                <td id="mcbBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbBahtTargetQNow"></b></td>
                                <td id="mcbBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="mcbBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbBahtActualQOld" ></b></td>
                                <td id="mcbBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="mcbBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="MCBQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">MCB (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbUnitActualQNow"></b></td>
                                <td id="mcbUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbUnitTargetQNow"></b></td>                            
                                <td id="mcbUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="mcbUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="mcbUnitActualQOld"></b></td>
                                <td id="mcbUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="mcbUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="mcbUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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

<div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box bg-aqua">
        <span class="info-box-icon"><i class="fa fa-btc"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Baht</span>
          <span class="info-box-number" id="totalBaht"></span>

          <div class="progress">
            <div class="progress-bar" id="percentBaht"></div>
          </div>
              <span class="progress-description" id="despTotalBaht">
              </span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box bg-green">
        <span class="info-box-icon"><i class="fa fa-cubes"></i></span>

        <div class="info-box-content">
          <span class="info-box-text">Unit</span>
          <span class="info-box-number" id="totalUnit"></span>

          <div class="progress"> 
            <div class="progress-bar" id="percentUnit"></div>
          </div>
              <span class="progress-description" id="despTotalUnit">
              </span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
    <!-- /.col -->
  </div>
  <!-- /.row -->

    <div class="modal fade" id="modal-dataTable">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headModal">SPD Sales Summary: </h4>
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
                                                    <th>Type</th>
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
                                                    <th>Type</th>
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
<script src='https://cdn.jsdelivr.net/lodash/4.17.2/lodash.min.js'></script>

<script src="{{ URL::asset('js/salessummarySPD.js') }}"></script> 

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
