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
                                    <option value="NP">NP Battery</option>
                                    <option value="EB">EB Battery</option>
                                    <option value="IND">Industrial Battery</option>
                                    <option value="OTH">Retifier/UPS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loadTable">
                <table id="allBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> NP,EB,IND,OTH (1,000 BAHT)</th>
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
                                <th style="vertical-align:middle; text-align:center; width:170px;">NP,EB,IND,OTH (UNIT)</th>
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
                    <table id="NPBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> NP (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="npBahtActualNow"></b></td>
                                <td id="npBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npBahtTargetNow"></b></td>
                                <td id="npBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="npBahtActualOld" ></b></td>
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
                    <table id="NPUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">NP (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="npUnitActualNow"></b></td>
                                <td id="npUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npUnitTargetNow"></b></td>                            
                                <td id="npUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="npUnitActualOld"></b></td>
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
                    <table id="EBBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> EB (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="ebBahtActualNow"></b></td>
                                <td id="ebBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebBahtTargetNow"></b></td>
                                <td id="ebBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="ebBahtActualOld" ></b></td>
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
                    <table id="EBUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">EB (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="ebUnitActualNow"></b></td>
                                <td id="ebUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebUnitTargetNow"></b></td>                            
                                <td id="ebUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="ebUnitActualOld"></b></td>
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
                    <table id="INDBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> IND (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="indBahtActualNow"></b></td>
                                <td id="indBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indBahtTargetNow"></b></td>
                                <td id="indBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="indBahtActualOld" ></b></td>
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
                    <table id="INDUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">IND (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="indUnitActualNow"></b></td>
                                <td id="indUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indUnitTargetNow"></b></td>                            
                                <td id="indUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="indUnitActualOld"></b></td>
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
                    <table id="OTHBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;"> OTH (1,000 BAHT)</th>
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
                                <td bgcolor="#b6dde8"><b id="othBahtActualNow"></b></td>
                                <td id="othBahtActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                                </tr>
                                <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othBahtTargetNow"></b></td>
                                <td id="othBahtTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="othBahtActualOld" ></b></td>
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
                    <table id="OTHUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:170px;">OTH (UNIT)</th>
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
                                <td bgcolor="#b6dde8"><b id="othUnitActualNow"></b></td>
                                <td id="othUnitActualNow1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow5" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow6" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow7" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow8" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow9" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow10" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow11" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNow12" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othUnitTargetNow"></b></td>                            
                                <td id="othUnitTargetNow1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow5" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow6" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow7" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow8" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow9" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow10" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow11" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNow12" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNowTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
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
                                <td bgcolor="#b6dde8"><b id="othUnitActualOld"></b></td>
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
                                    <option value="NP">NP Battery</option>
                                    <option value="EB">EB Battery</option>
                                    <option value="IND">Industrial Battery</option>
                                    <option value="OTH">Retifier/UPS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loadTable">
                    <table id="allQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">NP,EB,IND,OTH (BAHT)</th>
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
                                <th style="vertical-align:middle; text-align:center; width:180px;">NP,EB,IND,OTH (UNIT)</th>
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
                        <table id="NPQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">NP (BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npBahtActualQNow"></b></td>
                                <td id="npBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npBahtTargetQNow"></b></td>
                                <td id="npBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="npBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npBahtActualQOld" ></b></td>
                                <td id="npBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="npBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="NPQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">NP (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npUnitActualQNow"></b></td>
                                <td id="npUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npUnitTargetQNow"></b></td>                            
                                <td id="npUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="npUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="npUnitActualQOld"></b></td>
                                <td id="npUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="npUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="npUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                        <table id="EBQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">EB (1,000 BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebBahtActualQNow"></b></td>
                                <td id="ebBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebBahtTargetQNow"></b></td>
                                <td id="ebBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="ebBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebBahtActualQOld" ></b></td>
                                <td id="ebBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="ebBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="EBQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">EB (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebUnitActualQNow"></b></td>
                                <td id="ebUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebUnitTargetQNow"></b></td>                            
                                <td id="ebUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="ebUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="ebUnitActualQOld"></b></td>
                                <td id="ebUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="ebUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="ebUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>                
                    <table id="INDQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">IND (BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indBahtActualQNow"></b></td>
                                <td id="indBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indBahtTargetQNow"></b></td>
                                <td id="indBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="indBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indBahtActualQOld" ></b></td>
                                <td id="indBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="indBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="INDQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">IND (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indUnitActualQNow"></b></td>
                                <td id="indUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indUnitTargetQNow"></b></td>                            
                                <td id="indUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="indUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="indUnitActualQOld"></b></td>
                                <td id="indUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="indUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="indUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                        <table id="OTHQBAHTTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">OTH (1,000 BAHT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othBahtActualQNow"></b></td>
                                <td id="othBahtActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othBahtTargetQNow"></b></td>
                                <td id="othBahtTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="othBahtAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othBahtActualQOld" ></b></td>
                                <td id="othBahtActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="othBahtGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othBahtGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>                   
                        </tbody>
                    </table>
                    <table id="OTHQUNITTable" class="table table-bordered" style="font-size: 14px;" >
                        <thead>
                            <tr style="text-align:center;" bgcolor="#b6dde8">
                                <th style="vertical-align:middle; text-align:center; width:180px;">OTH (UNIT)</th>
                                <th style="text-align:center; width:220px;">Q1</th>
                                <th style="text-align:center; width:220px;">Q2</th>
                                <th style="text-align:center; width:220px;">Q3</th>
                                <th style="text-align:center; width:220px;">Q4</th>
                                <th style="text-align:center;">Total</th>
                            </tr>                               
                        </thead>
                        <tbody>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othUnitActualQNow"></b></td>
                                <td id="othUnitActualNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othUnitTargetQNow"></b></td>                            
                                <td id="othUnitTargetNowQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNowQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNowQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNowQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitTargetNowQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr> 
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Achieve(%)</b></td>
                                <td id="othUnitAchieveQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitAchieveQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitAchieveQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitAchieveQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitAchieveQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffd699">
                                <td bgcolor="#b6dde8"><b id="othUnitActualQOld"></b></td>
                                <td id="othUnitActualOldQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualOldQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualOldQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualOldQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitActualOldQTotal" style="font-weight: bold; text-align: right;" bgcolor="#c2efaa">&nbsp;</td>
                            </tr>
                            <tr style="text-align:center;" bgcolor="#ffb84d">
                                <td bgcolor="#8bc9da"><b>Growth(%)</b></td>
                                <td id="othUnitGrowthQ1" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitGrowthQ2" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitGrowthQ3" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitGrowthQ4" style="text-align: right;">&nbsp;</td>
                                <td id="othUnitGrowthQTotal" style="font-weight: bold; text-align: right;" bgcolor="#94e269">&nbsp;</td>
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
