@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                    <h3 class="box-title">Target Master</h3>
                    <div class="box-tools">
                        <a href="{{ route('system.targetmaster.create') }}" class="btn btn-sm btn-success">New Target</a>                      
                    </div>
                    </div>
                    <div class="box-body table-responsive">
                    <table id="targetMaster" class="table table-bordered table-striped {{ count($TargetH) > 0 ? 'datatable' : '' }} dt-select">
                        <thead>
                            <tr>
                                <th style="text-align:center;"><input type="checkbox" id="select-all" /></th>
                                <th>No.</th>
                                <th>Company</th>
                                <th>Year</th>
                                <th>Market</th>
                                <th>Action</th>
                                <th>Export</th>

                            </tr>
                        </thead>
                        
                        <tbody>
                            @if (count($TargetH) > 0)
                                @php
                                    $x=1;
                                @endphp
                                @foreach ($TargetH as $TargetH)
                                    <tr data-entry-id="{{ $TargetH->TargetID }}">
                                        <td></td>
                                        <td>{{ $x++ }}</td>
                                        <td>{{ $TargetH->Company }}</td>                                 
                                        <td>{{ $TargetH->Year }}</td>  
                                        <td>{{ $TargetH->Market }}</td> 
                                        <td>
                                            <a href="{{ route('system.targetmaster.edit',[$TargetH->TargetID]) }}" class="btn btn-xs btn-info"><i class="fa fa-edit"></i> @lang('global.app_edit')</a> 
                                            <a href="#" id="{{ $TargetH->TargetID }}" data-route="/SalesAnalysis/system/targetmaster/" data-method="DELETE" class="delete-btn btn btn-xs btn-danger"><i class="fa fa-trash-o"></i> @lang('global.app_delete')</a>
                                        </td>
                                        <td>
                                            <a href="{{ route('system.targetmaster.downloadPDF', ['id' => $TargetH->TargetID])}}" class="btn btn-xs btn-danger"><i class="fa fa-file-pdf-o"></i> PDF</a> 
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
        window.route_mass_crud_entries_destroy = '{{ route('system.targetmaster.mass_destroy') }}';
    </script>
@endsection
            