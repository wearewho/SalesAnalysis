@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.itemgroup.title')</h3>
    
    {!! Form::model($ItemGroup, ['method' => 'PUT', 'route' => ['system.itemgroup.update', $ItemGroup->ItmsGrpCod]]) !!}

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.app_edit')
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('ItmsGrpCod', 'ItemGroup Code', ['class' => 'control-label']) !!}
                    {!! Form::text('ItmsGrpCod', old('ItmsGrpCod'), ['class' => 'form-control', 'placeholder' => '', 'disabled' => 'disabled']) !!}
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

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

