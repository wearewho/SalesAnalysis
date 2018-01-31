@extends('layouts.app')

@section('content')
    
    {!! Form::model($user, ['method' => 'PUT', 'route' => ['profile', $user->id]]) !!}

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">@lang('global.app_edit') Profile</h3>
                </div>            
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-6 form-group">
                            {!! Form::label('name', 'Name*', ['class' => 'control-label']) !!}
                            {!! Form::text('name', old('name'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                            <p class="help-block"></p>
                            @if($errors->has('name'))
                                <p class="help-block">
                                    {{ $errors->first('name') }}
                                </p>
                            @endif
                        </div>                  
                        <div class="col-xs-6 form-group">
                            {!! Form::label('department', 'Department*', ['class' => 'control-label']) !!}
                            <select class="form-control select2" name="DepartmentID" style="width: 100%;" required>      
                                @foreach ($department as $department)
                                    @if ($department->DepartmentID == $user->DepartmentID)
                                        <option value="{{$department->DepartmentID}}" selected="selected">{{$department->DepartmentDesp}}</option>
                                    @else
                                        <option value="{{$department->DepartmentID}}">{{$department->DepartmentDesp}}</option>
                                    @endif
                                @endforeach
                            </select>
                            <p class="help-block"></p>
                            @if($errors->has('DepartmentID'))
                                <p class="help-block">
                                    {{ $errors->first('DepartmentID') }}
                                </p>
                            @endif
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            {!! Form::label('email', 'Email*', ['class' => 'control-label']) !!}
                            {!! Form::email('email', old('email'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                            <p class="help-block"></p>
                            @if($errors->has('email'))
                                <p class="help-block">
                                    {{ $errors->first('email') }}
                                </p>
                            @endif
                        </div>
                    </div>            
                </div>
                <div class="box-footer with-border">
                    {!! Form::submit(trans('global.app_update'), ['class' => 'btn btn-danger pull-right']) !!}
                </div> 
            </div>
        </div>
    </div>

    {!! Form::close() !!}
@stop

