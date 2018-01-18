@extends('layouts.app')

@section('content')
    {!! Form::open(['method' => 'POST', 'route' => ['system.itemgroup.store']]) !!}

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">@lang('global.app_create') @lang('global.itemgroup.title')</h3>
        </div>
        
        <div class="box-body">  
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('ItmsGrpCod', 'ItemGroup Code*', ['class' => 'control-label']) !!}
                    {!! Form::text('ItmsGrpCod', old('ItmsGrpCod'), ['class' => 'form-control', 'placeholder' => '', 'required' => '', 'maxlength' => '3']) !!}
                    {!! csrf_field() !!}
                    <p class="help-block"></p>
                    @if($errors->has('ItmsGrpCod'))
                        <p class="help-block">
                            {{ $errors->first('ItmsGrpCod') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('U_ShortItemGroup', 'ItemGroup Short Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('U_ShortItemGroup', old('U_ShortItemGroup'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('U_ShortItemGroup'))
                        <p class="help-block">
                            {{ $errors->first('U_ShortItemGroup') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('ItmsGrpNam', 'ItemGroup Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('ItmsGrpNam', old('ItmsGrpNam'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('ItmsGrpNam'))
                        <p class="help-block">
                            {{ $errors->first('ItmsGrpNam') }}
                        </p>
                    @endif
                </div>
            </div>
            
        </div>
    </div>

    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

