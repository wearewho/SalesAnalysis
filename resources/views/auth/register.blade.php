@extends('layouts.authen')

@section('content')
<div class="register-box">
<div class="register-logo">
    <img src="{{ URL::asset('images/Yuasa.png') }}" width="300" style="margin-left:-15px;" alt=""> 
</div>

<div class="register-box-body">
  <p class="login-box-msg">{{ ucfirst(config('app.name')) }} Register</p>

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

  <form action="{{route('auth.register')}}" method="post">
    <div class="form-group has-feedback">
      <input type="text" name="name" class="form-control" placeholder="Full name">   
      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">   
      @php
        $postvalue=array("user");
        foreach($postvalue as $value)
        {
          echo '<input type="hidden" name="roles[]" value="'. $value.'">';
        }
      @endphp
      <span class="glyphicon glyphicon-user form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <input type="email" name="email" class="form-control" placeholder="Email">
      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <input type="password" name="password" class="form-control" placeholder="Password">
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <input type="password" name="password_confirmation" class="form-control" placeholder="Retype password">
      <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
    </div>
    <div class="row">
      <!-- <div class="col-xs-8">
        <div class="checkbox icheck">
          <label>
            <input type="checkbox"> I agree to the <a href="#">terms</a>
          </label>
        </div>
      </div> -->
      <!-- /.col -->
      <div class="col-xs-12">
        <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
      </div>
      <!-- /.col -->
    </div>
  </form>
  <br>
  <center>
    <a href="{{ route('auth.login') }}" class="text-center">I already have a membership</a>
  </center>

</div>
<!-- /.form-box -->
</div>
<!-- /.register-box -->

@endsection
