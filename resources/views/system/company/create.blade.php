@extends('layouts.app')

@section('content')
    {!! Form::open(['method' => 'POST', 'route' => ['system.company.store']]) !!}

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
            <h3 class="box-title">@lang('global.app_create') @lang('global.company.title')</h3>
        </div>       
        
        <div class="box-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('CompanyName', 'Company Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('CompanyName', old('CompanyName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    {!! csrf_field() !!}
                    <p class="help-block"></p>
                    @if($errors->has('CompanyName'))
                        <p class="help-block">
                            {{ $errors->first('CompanyName') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('CompanyDesp', 'Company Description*', ['class' => 'control-label']) !!}
                    {!! Form::text('CompanyDesp', old('CompanyDesp'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('CompanyDesp'))
                        <p class="help-block">
                            {{ $errors->first('CompanyDesp') }}
                        </p>
                    @endif
                </div>
            </div>
            
        </div>
    </div>

    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

