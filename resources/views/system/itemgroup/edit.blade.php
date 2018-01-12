@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.itemgroup.title')</h3>
    
    {!! Form::model($ItemGroup, ['method' => 'PUT', 'route' => ['system.itemgroup.update', $ItemGroup->ItemGroupID]]) !!}

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
                    {!! Form::label('ItemGroupName', 'ItemGroup Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('ItemGroupName', old('ItemGroupName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('ItemGroupName'))
                        <p class="help-block">
                            {{ $errors->first('ItemGroupName') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('ItemGroupDesp', 'ItemGroup Description*', ['class' => 'control-label']) !!}
                    {!! Form::text('ItemGroupDesp', old('ItemGroupDesp'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('ItemGroupDesp'))
                        <p class="help-block">
                            {{ $errors->first('ItemGroupDesp') }}
                        </p>
                    @endif
                </div>
            </div>
                      
        </div>
    </div>

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

