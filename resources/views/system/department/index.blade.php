@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')

   
    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">@lang('global.app_list') @lang('global.department.title')</h3>
            <div class="box-tools">
                <a href="{{ route('system.department.create') }}" class="btn btn-sm btn-success">@lang('global.app_add') @lang('global.department.title')</a>                      
            </div>
        </div>

        <div class="box-body table-responsive">
            <table class="table table-bordered table-striped {{ count($department) > 0 ? 'datatable' : '' }} dt-select">
                <thead>
                    <tr>
                        <th style="text-align:center;"><input type="checkbox" id="select-all" /></th>     
                        
                        <th>@lang('global.department.fields.id')</th>
                        <th>@lang('global.department.fields.name')</th>
                        <th>Action</th>

                    </tr>
                </thead>
                
                <tbody>
                    @if (count($department) > 0)
                        @foreach ($department as $department)
                            <tr data-entry-id="{{ $department->DepartmentID }}">
                                <td></td>

                                <td>{{ $department->DepartmentName }}</td>
                                <td>{{ $department->DepartmentDesp }}</td>
                                <td>
                                    <a href="{{ route('system.department.edit',[$department->DepartmentID]) }}" class="btn btn-xs btn-info"><i class="fa fa-edit"></i> @lang('global.app_edit')</a>
                                    <a href="#" id="{{ $department->DepartmentID }}" data-route="/system/department/" data-method="DELETE" class="delete-btn btn btn-xs btn-danger"><i class="fa fa-trash-o"></i> @lang('global.app_delete')</a>
                                    <!-- <a href="#" class="btn btn-xs btn-info" id="delete">@lang('global.app_delete')</a> 
                                    {!! Form::open(array(
                                        'style' => 'display: inline-block;',
                                        'method' => 'DELETE',
                                        'onsubmit' => "return confirm('".trans("global.app_are_you_sure")."');",
                                        'route' => ['system.department.destroy', $department->DepartmentID])) !!}
                                    {!! Form::submit(trans('global.app_delete'), array('class' => 'btn btn-xs btn-danger')) !!}
                                    {!! Form::close() !!}  -->
                                </td>

                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="9">@lang('global.app_no_entries_in_table')</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
@stop

@section('javascript') 
    <script>
        window.route_mass_crud_entries_destroy = '{{ route('system.department.mass_destroy') }}';
    </script>    
@endsection
