@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                <h3 class="box-title">Sales Report by Date</h3>
                </div>
                <div class="box-body">
                <div class="row">
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Market</label>
                            <select class="form-control select2" name="market" id="market" style="width: 100%;">
                            <option selected="selected" value="All">All</option>
                            @foreach ($Market as $market)
                            <option value="{{ $market->Code }}">{{ $market->Name }}</option>
                            @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Item Group</label>
                            <select class="form-control select2" name="itemGroup" id="itemGroup" style="width: 100%;">
                                <option selected="selected" value="All">All</option>
                                @foreach ($ItemGroup as $item)
                                <option value="{{ $item->ItmsGrpNam }}">{{ $item->ItmsGrpNam }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Date range</label>
                            <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                            <input type="text" class="form-control pull-right" id="reservation">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    <section id="chartsSection" >
        <div class="row">
            <div class="col-md-12">
                <div class="box box-danger">
                    <div class="box-header with-border">
                        <i class="fa fa-bar-chart"></i>
                        <h3 class="box-title">Summary Sales Report by Date</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="createtable"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </section>

   <!--  <div class="row">
        <div class="col-md-6">
            <div class="box box-danger">
                <div class="box-header with-border">
                    <i class="fa fa-bar-chart"></i>
                    <h3 class="box-title">Baht</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="container1" style="height: 380px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box box-danger">
                <div class="box-header with-border">
                    <i class="fa fa-bar-chart"></i>

                    <h3 class="box-title">Unit</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="container2" style="height: 380px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

@endsection

@section('javascript')  
<script src="{{ URL::asset('highchart/highcharts.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/drilldown.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts-3d.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/data.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/exporting.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/offline-exporting.js') }}"></script> 
<script src="{{ URL::asset('js/bydate.js') }}"></script> 
@endsection