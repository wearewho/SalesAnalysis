@extends('layouts.authen')

@section('content')
<div class="login-box">
  <div class="login-logo">
    <img src="{{ URL::asset('images/Yuasa.png') }}" width="300" style="margin-left:-15px;" alt=""> 
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Reset password</p>

    @if (session('status'))
        <div class="alert alert-success">
            {{ session('status') }}
        </div>
    @endif

    @if (count($errors) > 0)
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were problems with input:
            <br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form role="form" method="POST" action="{{ url('password/email') }}">
      <div class="form-group has-feedback">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="email" class="form-control" name="email" value="{{ old('email') }}">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="row">
        <!-- /.col -->
        <div class="col-xs-2">            
        </div>
        <div class="col-xs-8">            
          <button type="submit" class="btn btn-primary btn-block btn-flat">Reset password</button>
        </div>
        <div class="col-xs-2">            
        </div>
        <!-- /.col -->
      </div>
    </form>

    <br>
    <center>
        <a href="{{ route('auth.register') }}" class="text-center">Register a new membership</a><br>
        <a href="{{ route('auth.login') }}" class="text-center">I already have a membership</a>
    </center>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

@endsection