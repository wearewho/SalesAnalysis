@inject('request', 'Illuminate\Http\Request')
@extends('layouts.app')

@section('content')

            <div class="box box-danger" >
                <div class="box-header with-border">
                    <h3 class="box-title">Log Activity Lists</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Subject</th>
                            <th>URL</th>
                            <th>Method</th>
                            <th>IP</th>
                            <th>Time</th>
                            <th>User Id</th>
                        </tr>
                    </thead>
                    <tbody>                            
                        @if($logs->count())
                            @foreach($logs as $key => $log)
                            <tr>
                                <td>{{ ++$key }}</td>
                                <td>{{ $log->subject }}</td>
                                <td class="text-success">{{ $log->url }}</td>
                                <td>
                                    @if ($log->method == "POST")
                                    <label class="label label-warning">{{ $log->method }}</label>                                    
                                    @elseif ($log->method == "GET")
                                    <label class="label label-danger">{{ $log->method }}</label> 
                                    @else
                                    <label class="label label-info">{{ $log->method }}</label>
                                    @endif 
                                </td>
                                <td class="text-warning">{{ $log->ip }}</td>
                                @php
                                    $newDate = date("d/m/y H:i:s", strtotime($log->created_at));
                                @endphp
                                <td class="text-danger" style="text-align:center;">{{ $newDate }}</td>
                                <td>{{ $log->user_id }}</td>
                            </tr>
                            @endforeach
                        @endif
                    </tbody>
                </table>
            </div>
            <!-- /.box-body -->
@stop

@section('javascript') 
    <script>

    window.route_mass_crud_entries_destroy = '{{ route('admin.users.mass_destroy') }}';
        
    $(function () {
        $('#example1').DataTable();
    })

    </script>
@endsection
