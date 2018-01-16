@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')
    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">@lang('global.app_list') @lang('global.itemgroup.title')</h3>
            <div class="box-tools">
                <a href="{{ route('system.itemgroup.create') }}" class="btn btn-sm btn-success">@lang('global.app_add') @lang('global.itemgroup.title')</a>                      
            </div>
        </div>

        <div class="box-body table-responsive">
            <table class="table table-bordered table-striped {{ count($ItemGroup) > 0 ? 'datatable' : '' }} dt-select">
                <thead>
                    <tr>
                        <th style="text-align:center;"><input type="checkbox" id="select-all" /></th>     
                        
                        <th>@lang('global.itemgroup.fields.id')</th>
                        <th>@lang('global.itemgroup.fields.name')</th>
                        <th>&nbsp;</th>

                    </tr>
                </thead>
                
                <tbody>
                    @if (count($ItemGroup) > 0)
                        @foreach ($ItemGroup as $ItemGroup)
                            <tr data-entry-id="{{ $ItemGroup->ItemGroupID }}">
                                <td></td>

                                <td>{{ $ItemGroup->ItemGroupName }}</td>
                                <td>{{ $ItemGroup->ItemGroupDesp }}</td>
                                <td>
                                    <a href="{{ route('system.itemgroup.edit',[$ItemGroup->ItemGroupID]) }}" class="btn btn-xs btn-info"><i class="fa fa-edit"></i> @lang('global.app_edit')</a>
                                    <a href="#" id="{{ $ItemGroup->ItemGroupID }}" data-route="/system/itemgroup/" data-method="DELETE" class="delete-btn btn btn-xs btn-danger"><i class="fa fa-trash-o"></i> @lang('global.app_delete')</a>
                                   <!-- {!! Form::open(array(
                                        'style' => 'display: inline-block;',
                                        'method' => 'DELETE',
                                        'onsubmit' => "return confirm('".trans("global.app_are_you_sure")."');",
                                        'route' => ['system.itemgroup.destroy', $ItemGroup->ItemGroupID])) !!}
                                    {!! Form::submit(trans('global.app_delete'), array('class' => 'btn btn-xs btn-danger')) !!}
                                    {!! Form::close() !!} -->
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
        window.route_mass_crud_entries_destroy = '{{ route('system.itemgroup.mass_destroy') }}';
    </script>
@endsection
