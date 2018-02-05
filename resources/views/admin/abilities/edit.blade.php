@extends('layouts.app')

@section('content')

    {!! Form::model($ability, ['method' => 'PUT', 'route' => ['admin.abilities.update', $ability->id]]) !!}

    <div class="row">
        <div class="col-xs-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">@lang('global.app_edit') @lang('global.abilities.title')</h3>
                </div>            
                <div class="box-body">                    
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            {!! Form::label('name', 'Name*', ['class' => 'control-label']) !!}
                            {!! Form::text('name', old('title'), ['class' => 'form-control', 'placeholder' => '', 'required' => '']) !!}
                            <p class="help-block"></p>
                            @if($errors->has('name'))
                                <p class="help-block">
                                    {{ $errors->first('name') }}
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

