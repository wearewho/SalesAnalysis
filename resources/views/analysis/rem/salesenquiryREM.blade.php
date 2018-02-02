@extends('layouts.app')

@section('content')

    
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/> 
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"/> 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.1/css/buttons.dataTables.min.css"/>
<!-- daterange picker -->
<link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css') }}">

    <div class="row">
        <div class="col-md-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                <h3 class="box-title">REM Sales Enquiry</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-4">
                            <div class="form-group">
                                <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" id="reservation">
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        </div>

        
        @php                      
            $todate = date("d/m/Y", strtotime('-1 day'));
        @endphp

        <div class="row">
        <div class="col-md-12">
            <div class="box box-danger">
                <div class="box-header with-border">
                <h3 class="box-title">REM Sales Enquiry Table</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs (Pulled to the right) -->
                            <div class="nav-tabs-custom">
                            <ul class="nav nav-tabs pull-right typeY">
                                <li class="active"><a href="#tab_1-1" data-toggle="tab" id="tab_1"><strong style="font-size:16px;">Product</strong></a></li>
                                <li><a href="#tab_2-2" data-toggle="tab" id="tab_2"><strong style="font-size:16px;">Customer</strong></a></li>
                                <li class="pull-left header"><i class="fa fa-book"></i> Sales Enquiry</li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_1-1">                          
                                    <table id="Product" class="table table-bordered table-striped" style="font-size: 14px;" width="100%">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Item</th>
                                                <th>Description</th>
                                                <th>Brand</th>
                                                <th>Commodity</th>
                                                <th>Unit</th>
                                                <th>Baht</th>
                                                <th>Drilldown</th>
                                            </tr>
                                        </thead>                                            
                                        <tfoot>
                                            <tr>
                                                <th id="exportProduct" colspan="4" style="text-align:center"></th>
                                                <th style="text-align:center"></th>
                                                <th style="text-align:right"></th>
                                                <th style="text-align:right"></th>
                                                <th style="text-align:center"></th>
                                            </tr>
                                        </tfoot>
                                    </table>  
                                </div>
                                <!-- /.tab-pane -->
                                <div class="tab-pane" id="tab_2-2">
                                    <table id="Customer" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Customer Code</th>
                                                <th>Customer Name</th>
                                                <th>Master Dealer</th>
                                                <th>Unit</th>
                                                <th>Baht</th>
                                                <th>Drilldown</th>
                                            </tr>
                                        </thead>                                        
                                        <tfoot>
                                            <tr>
                                                <th id="exportCustomer" colspan="3" style="text-align:center"></th>
                                                <th style="text-align:center"></th>
                                                <th style="text-align:right"></th>
                                                <th style="text-align:right"></th>
                                                <th style="text-align:center"></th>
                                            </tr>
                                        </tfoot>
                                    </table> 
                                
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                                </div>
                                <!-- nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                        <!-- END CUSTOM TABS -->
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-customerDataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headCustModal">REM Sales Enquiry by Customer</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_Customer" data-toggle="tab">Customer</a></li>
                                    <li class="pull-right"><h4 class="text-muted" id="rightCustModal"></h4></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_Customer">                                                              
                                        <table id="enquiryCustomer" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Customer Code</th>
                                                    <th>Customer Name</th>
                                                    <th>Master Dealer</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>                                        
                                            <tfoot>
                                                <tr>
                                                    <th id="exportCustomerModal" colspan="3" style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div>
                            <!-- nav-tabs-custom -->
                        </div>   
                    </div>     
                </div>
                <div class="modal-footer"> 
                    <div class="row">                    
                        <div class="col-md-5"align="left">  
                            <b>Sales Analysis Portal V.1.0</b>
                            <br>
                            <b>Yuasa Battery (Thailand) Public Company Limited</b>
                        </div>
                        <div class="col-md-2" align="center">     
                            <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                            </a>
                        </div>
                        <div class="col-md-5" align="right">  
                            <b>  Data as of:  {{ $todate }} </b>
                            <br>
                            <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                        </div>
                    </div> 
                </div>        
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modal-itemDataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headItemModal">REM Sales Enquiry by Product</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_Customer" data-toggle="tab">Product</a></li>
                                    <li class="pull-right"><h4 class="text-muted" id="rightItemModal"></h4></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_Customer">                                                              
                                        <table id="enquiryProduct" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Item</th>
                                                    <th>Description</th>
                                                    <th>Brand</th>
                                                    <th>Commodity</th>
                                                    <th>Unit</th>
                                                    <th>Baht</th>
                                                </tr>
                                            </thead>                                            
                                            <tfoot>
                                                <tr>
                                                    <th id="exportProductModal" colspan="4" style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div>
                            <!-- nav-tabs-custom -->
                        </div>   
                    </div>     
                </div>
                <div class="modal-footer"> 
                    <div class="row">                    
                        <div class="col-md-5"align="left">  
                            <b>Sales Analysis Portal V.1.0</b>
                            <br>
                            <b>Yuasa Battery (Thailand) Public Company Limited</b>
                        </div>
                        <div class="col-md-2" align="center">     
                            <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                            </a>
                        </div>
                        <div class="col-md-5" align="right">  
                            <b>  Data as of:  {{ $todate }} </b>
                            <br>
                            <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                        </div>
                    </div> 
                </div>        
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    
    <div class="modal fade" id="modal-invoiceCustomerDataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headInvoiceCustModal">REM Sales Enquiry by Invoice Customer</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_Customer" data-toggle="tab">Customer</a></li>
                                    <li class="pull-right"><h4 class="text-muted" id="rightInvoiceCustModal"></h4></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_Customer">                                                              
                                        <table id="enquiryInvoiceCustomer" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Doccument No.</th>
                                                    <th>Doccument Type</th>
                                                    <th>Doccument Date</th>
                                                    <th>Item Code</th>
                                                    <th>Description</th>
                                                    <th>Commodity</th>
                                                    <th>Price</th>
                                                    <th>Unit</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>                                        
                                            <tfoot>
                                                <tr>
                                                    <th id="exportCustomerModal" colspan="7" style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div>
                            <!-- nav-tabs-custom -->
                        </div>   
                    </div>     
                </div>
                <div class="modal-footer"> 
                    <div class="row">                    
                        <div class="col-md-5"align="left">  
                            <b>Sales Analysis Portal V.1.0</b>
                            <br>
                            <b>Yuasa Battery (Thailand) Public Company Limited</b>
                        </div>
                        <div class="col-md-2" align="center">     
                            <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                            </a>
                        </div>
                        <div class="col-md-5" align="right">  
                            <b>  Data as of:  {{ $todate }} </b>
                            <br>
                            <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                        </div>
                    </div> 
                </div>        
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modal-invoiceItemDataTable">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="headInvoiceItemModal">REM Sales Enquiry by Invoice Product</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_Customer" data-toggle="tab">Product</a></li>
                                    <li class="pull-right"><h4 class="text-muted" id="rightInvoiceItemModal"></h4></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_Customer">                                                              
                                        <table id="enquiryInvoiceProduct" class="table table-bordered table-striped" style="font-size: 14px;"  width="100%">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Doccument No.</th>
                                                    <th>Doccument Type</th>
                                                    <th>Doccument Date</th>
                                                    <th>Customer Name</th>
                                                    <th>Price</th>
                                                    <th>Unit</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>                                            
                                            <tfoot>
                                                <tr>
                                                    <th id="exportProductModal" colspan="5" style="text-align:center"></th>
                                                    <th style="text-align:center"></th>
                                                    <th style="text-align:right"></th>
                                                    <th style="text-align:right"></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div>
                            <!-- nav-tabs-custom -->
                        </div>   
                    </div>     
                </div>
                <div class="modal-footer"> 
                    <div class="row">                    
                        <div class="col-md-5"align="left">  
                            <b>Sales Analysis Portal V.1.0</b>
                            <br>
                            <b>Yuasa Battery (Thailand) Public Company Limited</b>
                        </div>
                        <div class="col-md-2" align="center">     
                            <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                            </a>
                        </div>
                        <div class="col-md-5" align="right">  
                            <b>  Data as of:  {{ $todate }} </b>
                            <br>
                            <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                        </div>
                    </div> 
                </div>        
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

        
@endsection

@section('javascript')  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="{{ URL::asset('adminlte/js/select2.full.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/main.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/slimScroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/plugins/fastclick/fastclick.js') }}"></script>
<script src="{{ URL::asset('adminlte/js/app.min.js') }}"></script> 
<script src="{{ URL::asset('highchart/highcharts.js') }}"></script>
<script src="{{ URL::asset('highchart/highcharts-3d.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/series-label.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/data.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/exporting.js') }}"></script>
<script src="{{ URL::asset('highchart/modules/offline-exporting.js') }}"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>
<!-- date-range-picker -->
<script src="{{ URL::asset('adminlte/bower_components/moment/min/moment.min.js') }}"></script>
<script src="{{ URL::asset('adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js') }}"></script>

<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.2.2/js/buttons.bootstrap.min.js"></script> 
<script src="https://cdn.datatables.net/1.10.16/js/dataTables.semanticui.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.flash.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script> 
<script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"></script> 
<script src="{{ URL::asset('js/salesenquiryREM.js') }}"></script> 

<script>
    $(function() {
        $(document).on("click", "a#topDropdown", function() {
            if($("li#liDropdown").hasClass("open")){                
                $("li#liDropdown").removeClass("open");                
                $(this).attr("aria-expanded", "false");
            }
            else{
                $("li#liDropdown").addClass("open");  
                $(this).attr("aria-expanded", "true");
            }            
        });
    });

</script>
@endsection