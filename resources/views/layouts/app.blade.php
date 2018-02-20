<!DOCTYPE html>
<html lang="en">
    @php
        $objs = session('data');
    @endphp
<head>
    @include('partials.head')
</head>

<body class="hold-transition skin-red fixed sidebar-mini"> 

<div id="wrapper">

@include('partials.topbar')
@include('partials.sidebar')

<!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            @if(isset($siteTitle))
                <h3 class="page-title">
                    {{ $siteTitle }}
                </h3>
            @endif

            <div class="row">
                <div class="col-md-12">

                    @if (Session::has('message'))
                        <div class="note note-info">
                            <p>{{ Session::get('message') }}</p>
                        </div>
                    @endif
                    <!-- @if ($errors->count() > 0)
                        <div class="note note-danger">
                            <ul class="list-unstyled">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif -->

                    <div class="box box-danger" >
                        <div class="box-header with-border">
                            <div class="row">
                                <div class="col-md-1">     
                                    <a href="http://www.yuasathai.com/" target="_blank">                 
                                    <img class="img-responsive" width="40" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                                    </a>
                                </div>
                                <div class="col-md-6">  
                                    <b>Sales Analysis Portal V.1.0</b>
                                    <br>
                                    <b>Yuasa Battery (Thailand) Public Company Limited</b>
                                </div>
                                <div class="col-md-5" align="right">  
                                    @php
                                        $todate = date("d/m/Y", strtotime('-1 day'));
                                    @endphp
                                    <b>  Data as of:  {{ $todate }} </b>
                                    <br>
                                    <b>  Sys Date:  {{ date("d/m/Y") }} </b>
                                </div>
                            </div> 
                            <!-- /.box-tools -->
                        </div>
                        <!-- /.box-header -->
                    </div>
                    <!-- /.box -->

                    @yield('content')

                    <a href="#" class="scrollToTop"></a>
                </div>
            </div>
        </section>
    </div>
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Sales Analysis Portal </b> V.1.0
        </div>
        <strong>Copyright &copy; 2018 <a href="http://www.yuasathai.com">Yuasa Battery (Thailand) Public Company Limited</a>.</strong> All rights
        reserved.
  </footer>
</div>

{!! Form::open(['route' => 'auth.logout', 'style' => 'display:none;', 'id' => 'logout']) !!}
<button type="submit">Logout</button>
{!! Form::close() !!}

@include('partials.javascripts')
</body>
</html>