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
                    {!! Form::label('ItemGroupName', 'ItemGroup Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('ItemGroupName', old('ItemGroupName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    {!! csrf_field() !!}
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

    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

