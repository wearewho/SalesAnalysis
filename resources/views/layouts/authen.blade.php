<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{@trans('global.global_title')}}</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/font-awesome/css/font-awesome.min.css') }}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/bower_components/Ionicons/css/ionicons.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/css/AdminLTE.min.css') }}">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/plugins/iCheck/square/blue.css') }}">  
  <!-- select2 -->
  <link rel="stylesheet" href="{{ URL::asset('adminlte/css/select2.min.css') }}"/>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
  <body class="hold-transition register-page" scroll="no" style="overflow: hidden">

      @yield('content')     

  </body>

<!-- jQuery 3 -->
<script src="{{ URL::asset('adminlte/bower_components/jquery/dist/jquery.min.js') }}"></script>
<!-- Bootstrap 3.3.7 -->
<script src="{{ URL::asset('adminlte/bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<!-- iCheck -->
<script src="{{ URL::asset('adminlte/plugins/iCheck/icheck.min.js') }}"></script>
<!-- Sweet Alert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<!-- select2 -->
<script src="{{ URL::asset('adminlte/js/select2.full.min.js') }}"></script>
<!-- Just winter : Snow -->
<!--<script src="{{ URL::asset('js/snow.js') }}"></script> -->
    <script>
      $(function () {
          //Initialize Select2 Elements
          $('.select2').select2()
      })
    </script>
    
    @if (session()->has('incomplete'))
    <script>
        swal({
        title: "<?php echo session()->get('incomplete'); ?>",
        text: 'Something terrible happened.',
        timer: 5000,
        icon: 'error',
        showConfirmButton: false
        });
    </script>
    @endif

    @if (session()->has('complete'))
    <script>
        swal({
        title: "<?php echo session()->get('complete'); ?>",
        icon: 'success',
        showConfirmButton: false
        });
    </script>
    @endif 

<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</html>
