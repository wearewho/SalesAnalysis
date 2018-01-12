<!DOCTYPE html>
<html lang="en">
    @php
        $objs = session('data');
    @endphp
<head>
    @include('partials.head')
</head>

<body> 

    <!-- Main content -->
    <section class="content">
        @if(isset($siteTitle))
            <h3 class="page-title">
                {{ $siteTitle }}
            </h3>
        @endif

        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-1">     
                        <a href="http://www.yuasathai.com/" target="_blank">                 
                            <img class="img-responsive" width="70" style="margin-left:30px;" src="{{ url('images/pMTlogor1.jpg') }}" alt="YUASA" title="YUASA"> 
                        </a>
                    </div>
                    <div class="col-md-6">  
                        <strong><p style="font-size:16px;">Sales Analysis Portal V.1.0</p></strong>
                        <strong><p style="font-size:16px;">Yuasa Battery (Thailand) Public Company Limited</p></strong>                        
                        <strong><p style="font-size:16px;">
                            {{$objs->name}} 
                            @foreach ($objs->roles->pluck('name') as $role)
                                - {{ $role }}</span>
                            @endforeach
                        </p></strong>
                    </div>
                    <div class="col-md-5" align="right">  
                        @php                      
                        $todate = date("d/m/Y", strtotime('-1 day'));
                        @endphp
                        <strong><p style="font-size:16px;"></p></strong>
                        <strong><p style="font-size:16px;">  Data as of:  27/12/2018 </p></strong>
                        <strong><p style="font-size:16px;">  Sys Date:  {{ date("d/m/Y") }} </p></strong>
                    </div>
                </div> 

                <hr size="30">

                @yield('content')

            </div>
        </div>
    </section>

@include('partials.javascripts')
</body>
</html>