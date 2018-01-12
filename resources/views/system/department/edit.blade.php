@extends('layouts.app')

@section('content')
    <h3 class="page-title">@lang('global.department.title')</h3>
    
    {!! Form::model($department, ['method' => 'PUT', 'route' => ['system.department.update', $department->DepartmentID]]) !!}

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
                    {!! Form::label('DepartmentName', 'Department Name*', ['class' => 'control-label']) !!}
                    {!! Form::text('DepartmentName', old('DepartmentName'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
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

    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger']) !!}
    {!! Form::close() !!}
@stop

