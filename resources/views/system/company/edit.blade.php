@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.company.title')</h3>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    
    {!! Form::model($company, ['method' => 'PUT', 'route' => ['system.company.update', $company->CompanyID]]) !!}

    <div class="panel panel-default">
        <div class="panel-heading">
            @lang('global.app_edit')
        </div>

        <div class="panel-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('CompanyName', 'Company Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('CompanyName', old('CompanyName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
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

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

