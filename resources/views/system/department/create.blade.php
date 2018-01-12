@extends('layouts.app')

@section('content')
    {!! Form::open(['method' => 'POST', 'route' => ['system.department.store']]) !!}

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
            <h3 class="box-title">@lang('global.app_create') @lang('global.department.title')</h3>
        </div>
        
        <div class="box-body">
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('DepartmentName', 'Department Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('DepartmentName', old('DepartmentName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    {!! csrf_field() !!}
                    <p class="help-block"></p>
                    @if($errors->has('DepartmentName'))
                        <p class="help-block">
                            {{ $errors->first('DepartmentName') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 form-group">
                    {!! Form::label('DepartmentDesp', 'Department Description*', ['class' => 'control-label']) !!}
                    {!! Form::text('DepartmentDesp', old('DepartmentDesp'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                    <p class="help-block"></p>
                    @if($errors->has('DepartmentDesp'))
                        <p class="help-block">
                            {{ $errors->first('DepartmentDesp') }}
                        </p>
                    @endif
                </div>
            </div>
            
        </div>
    </div>

    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

