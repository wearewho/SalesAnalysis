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
                            <select class="form-control select2" style="width: 100%;">
                            <option selected="selected">All</option>
                            @foreach ($Market as $market)
                            <option value="{{ $market->Code }}">{{ $market->Name }}</option>
                            @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <div class="form-group">
                            <label>Item Group</label>
                            <select class="form-control select2" style="width: 100%;">
                                <option selected="selected">All</option>
                                @foreach ($ItemGroup as $item)
                                <option value="{{ $item->U_ShortItemGroup }}">{{ $item->ItmsGrpNam }}</option>
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
@endsection