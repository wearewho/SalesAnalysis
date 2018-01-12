@extends('layouts.app')

@section('content')

    @php
        $MonthQ=array("Jan","Feb","Mar","Q1","Apr","May","Jun","Q2","Jul","Aug","Sep","Q3","Oct","Nov","Dec","Q4");
    @endphp

    @include('partials.createItemgroup')
    
    {!! Form::open(['method' => 'POST', 'route' => ['system.targetmaster.store']]) !!}

    <style type="text/css">
        .cssBg{
            background-color:#dfbf9f;
        }
        
        .borderQ{
        border-left:groove; 
        border-left-color:#000; 
        border-right:groove; 
        border-right-color:#000;
        }

        .BorderLeft{
        border-left:groove; 
        border-left-color:#000; 
        }

        .BorderRight{
        border-right:groove; 
        border-right-color:#000;
        }

        .BorderTopBot{
            border-bottom:groove;
            border-bottom-color:#000;
            border-top:groove;
            border-top-color:#000;
        }
    </style>  
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="{{ URL::asset('js/targetmaster.js') }}"></script>
    <script>
        $(function(){
            addItem();
        });
    </script>

     <div class="row">
        <div class="col-md-12">       

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif    
    
        <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">Target Master Control Head</h3>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-xs-3">
                    <div class="form-group">
                        <label for="company" class="col-sm-5 control-label">Company <span style="color:red">*</span></label>

                        <div class="col-sm-6">
                            <select name="company" class="form-control">                            
                            <option disabled selected value>Select</option>
                            @foreach ($Company as $companyItem)
                            <option value="{{ $companyItem->CompanyName }}">{{ $companyItem->CompanyName }}</option>
                            @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-3">
                    <div class="form-group">
                        <label for="year" class="col-sm-4 control-label">Year <span style="color:red">*</span></label>

                        <div class="col-sm-6">
                            <select name="year" class="form-control">
                                <option disabled selected value>Select</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-xs-3">
                    <div class="form-group">
                        <label for="department" class="col-sm-5 control-label">Department <span style="color:red">*</span></label>

                        <div class="col-sm-7">
                            <select name="department" class="form-control">
                            <option disabled selected value>Select</option>
                            @foreach ($Department as $departmentItem)
                            <option value="{{ $departmentItem->DepartmentName }}">{{ $departmentItem->DepartmentName }}</option>
                            @endforeach
                            </select>
                        </div>
                    </div>
                </div>
              </div>              
            </div>
            <!-- /.box-body -->  
            <div class="box-footer">
                <div class="inline pull-right">
                    {!! Form::submit(trans('global.app_save'), ['class' => 'btn btn-success']) !!}
                </div>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
    </div>

    <div class="row" style="max-width: 101%;overflow-x: auto;">
        <div class="col-xs-12" >
          <div class="box box-danger" style="width: 220%;">
            <div class="box-header">
              <h3 class="box-title">Target Master Details</h3>
                <div class="box-tools">                    
                    <!-- <button class="btn btn-sm btn-success" id="btnAddItemGroup">Add</button>  -->                      
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive">
              <table class="table table-bordered">                                      
                    <tr align="center" id="itemHeader">
                        <th style="text-align:center;" class="cssBg">Action</th>
                        <th style="width: 150px; text-align:center;" class="cssBg"><b>Item Group</b></th>
                        <th style="width: 80px; text-align:center;" bgcolor="#b6dde8"><b>Month</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[0] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[1] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[2] }}</b></th>
                        <th style="text-align:center;" height="30" bgcolor="#b6dde8"><b>{{ $MonthQ[3] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[4] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[5] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[6] }}</b></th>
                        <th style="text-align:center;" height="30" bgcolor="#b6dde8"><b>{{ $MonthQ[7] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[8] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[9] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[10] }}</b></th>
                        <th style="text-align:center;" height="30" bgcolor="#b6dde8"><b>{{ $MonthQ[11] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[12] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[13] }}</b></th>
                        <th style="text-align:center;" height="30" class="cssBg"><b>{{ $MonthQ[14] }}</b></th>
                        <th style="text-align:center;" height="30" bgcolor="#b6dde8"><b>{{ $MonthQ[15] }}</b></th>
                        <th style="text-align:center;" height="30" bgcolor="#47d147"><b>Total</b></th>
                    </tr>   

                     <tr bgcolor="#fde9d9">         
                            <td rowspan="2" style="text-align:center; vertical-align:middle;">
                                <button type="button" class="btn btn-sm btn-success" id="btnAddItemGroup">Add</button>  
                            </td>
                            <td rowspan="2" class="BorderLeft BorderRight BorderTopBot" style="vertical-align:middle; text-align: center; ">
                                <b>Total</b>
                            </td>       
                            <td style="text-align: center;" bgcolor="#b6dde8">
                                <b>Amount</b>
                            </td>    
                            <td align="center" class="BorderRight">
                                <input name="total_amt_01" id="total_amt_01" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_02" id="total_amt_02" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_03" id="total_amt_03" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_amt_q1" id="total_amt_q1" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_04" id="total_amt_04" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_05" id="total_amt_05" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_06" id="total_amt_06" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_amt_q2" id="total_amt_q2" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_07" id="total_amt_07" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_08" id="total_amt_08" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_09" id="total_amt_09" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_amt_q3" id="total_amt_q3" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_10" id="total_amt_10" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_11" id="total_amt_11" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_amt_12" id="total_amt_12" type="text" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_amt_q4" id="total_amt_q4" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#47d147"> 
                                <input name="grand_total_amt" id="grand_total_amt" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
                            </td>
                        </tr>
                        <tr bgcolor="#fde9d9">      
                            <td style="text-align: center;" bgcolor="#b6dde8">
                               <b>Unit</b>
                            </td>      
                            <td align="center" class="BorderRight">
                                <input name="total_unit_01" id="total_unit_01" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_02" id="total_unit_02" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_03" id="total_unit_03" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_unit_q1" id="total_unit_q1" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_04" id="total_unit_04" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_05" id="total_unit_05" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_06" id="total_unit_06" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_unit_q2" id="total_unit_q2" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_07" id="total_unit_07" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_08" id="total_unit_08" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_09" id="total_unit_09" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_unit_q3" id="total_unit_q3" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_10" id="total_unit_10" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_11" id="total_unit_11" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight">
                                <input name="total_unit_12" id="total_unit_12" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#b6dde8">
                                <input name="total_unit_q4" id="total_unit_q4" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                            <td align="center" class="BorderRight" bgcolor="#47d147">
                                <input name="grand_total_unit" id="grand_total_unit" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
                            </td>
                        </tr>
                    </table>
                </div>
            <!-- /.box-body -->    
          </div>
          <!-- /.box -->
        </div>
      </div>     
    
    {!! Form::close() !!}
    
@endsection