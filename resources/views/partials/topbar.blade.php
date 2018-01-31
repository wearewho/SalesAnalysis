
@include('partials.profileImage')
<header class="main-header">
    <!-- Logo -->
    <a href="{{ url('/home') }}" class="logo"
       style="font-size: 25px;">

        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">
        @lang('global.global_title_mini')</span> 

        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>@lang('global.title1')</b>
        @lang('global.title2')</span>

           
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>

        <div class="navbar-custom-menu" id="top">
        <ul class="nav navbar-nav">
         
          <!-- User Account: style can be found in dropdown.less -->
          <li id="liDropdown" class="dropdown user user-menu">
            <a id="topDropdown" href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="{{ URL::asset('images/profiles/'.$objs->img) }}" class="user-image" alt="User Image">
              <span class="hidden-xs">{{$objs->name}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="{{ URL::asset('images/profiles/'.$objs->img) }}" class="img-circle" alt="User Image" data-toggle="modal" data-target="#modal-default">
                <p>
                    <span id="userName">{{$objs->name}}</span> -
                    <span id="roles">{{ $objs->department->DepartmentName }}</span>
                  <small>Member since {{($objs->created_at)->toFormattedDateString()}}</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="{{ URL('test') }}" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">  
                  <a href="#logout"  class="btn btn-default btn-flat"  onclick="$('#logout').submit();">Log out</a> 
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {!! Form::open(['route' => 'auth.logout', 'style' => 'display:none;', 'id' => 'logout']) !!}
        <button type="submit">@lang('global.logout')</button>
      {!! Form::close() !!}

    </nav>
</header>

