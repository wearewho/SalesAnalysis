<meta charset="utf-8">
<title>
    {{ trans('global.global_title') }}
</title>

<meta http-equiv="X-UA-Compatible"
      content="IE=edge">
<meta content="width=device-width, initial-scale=1.0"
      name="viewport"/>
<meta http-equiv="Content-type"
      content="text/html; charset=utf-8">
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<!-- favicons -->
<link rel="shortcut icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon" />
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<link rel="stylesheet" href="{{ URL::asset('adminlte/css/select2.min.css') }}"/>
<link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link href="{{ URL::asset('adminlte/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
<link href="{{ URL::asset('adminlte/css/AdminLTE.min.css') }}" rel="stylesheet">
<link href="{{ URL::asset('adminlte/css/skins/skin-blue.min.css') }}" rel="stylesheet">
<link href="{{ URL::asset('adminlte/css/skins/skin-red.min.css') }}" rel="stylesheet">
<link rel="stylesheet"
      href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
<link rel="stylesheet"
      href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css"/>
<link rel="stylesheet"
      href="https://cdn.datatables.net/select/1.2.0/css/select.dataTables.min.css"/>     
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.min.css"/>
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/css/bootstrap-datepicker.standalone.min.css"/>   
<!-- Any Charts  --> 
<link rel="stylesheet" href="{{ URL::asset('anychart/css/anychart-ui.min.css') }}" />
<!-- High Charts  --> 
<link rel="stylesheet" href="{{ URL::asset('highchart/css/highcharts.css') }}" />
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css') }}">
<!-- daterange picker -->
<link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css') }}">

<style>
      .scrollToTop{
	width:50px; 
	height:50px;
	padding:10px; 
	text-align:center; 
	font-weight: bold;
	text-decoration: none;
	position:fixed;
	bottom:30px;
	right:40px;
	display:none; 
      opacity : 0.8;
	background: url("../images/element/arrowup.PNG");  center no-repeat;
      background-size: 50px;
      }
      .scrollToTop:hover{
            text-decoration:none;
      }
</style>