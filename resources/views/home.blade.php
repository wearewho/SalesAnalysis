@extends('layouts.app')

@section('content')

<style>

    .outerdiv
    {
        width:932px; 
        height:269px;
        overflow:hidden;
        position:relative;
    }
    .inneriframe
    {
        position:absolute;
        top:-425px;
        left:-25px;
        width:1280px;
        height:1200px;
    }
    
    .outerdiv2
    {
        width:400px; 
        height:269px;
        overflow:hidden;
        position:relative;
        margin-left:25px;
    }
    .inneriframe2
    {
        position:absolute;
        width: 1280px;
        height: 1085px;        
        top:-550px;
        left:-332px;
        -ms-transform: scale(0.79); 
        -moz-transform: scale(0.79);
        -o-transform: scale(0.79);
        -webkit-transform: scale(0.79);
        transform: scale(0.79);
        
        -ms-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }

</style>

    <div class="row">      
        <div class="col-md-4">                       
            <div class="box box-danger" style="height:320px;">
                <div class="box-header with-border">
                    <h2 class="box-title"> <b>User Profile</b></h2>
                </div>
                @php
                    $formatDate = date("d-m-Y H:i:s", strtotime($result->created_at));
                @endphp
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-4" align="right">
                            <h4>Name :</h4>
                        </div>
                        <div class="col-md-8">
                            <h4><u>{{$result->name}}</u></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4" align="right">
                            <h4>Department :</h4>
                        </div>
                        <div class="col-md-8">
                            <h4><u>{{$result->department->DepartmentName}}</u></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4" align="right">
                            <h4>Create Date :</h4>
                        </div>
                        <div class="col-md-8">
                            <h4><u>{{$formatDate}}</u></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">                 
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
                <li data-target="#carousel-example-generic" data-slide-to="2" class=""></li>
                </ol>
                <div class="carousel-inner">
                <div class="item active">
                    <img src="{{ URL::asset('images/banner/banner1.jpg') }}" style="height:320px;" alt="First slide">
                    <div class="carousel-caption">
                    
                    </div>
                </div>
                <div class="item">
                    <img src="{{ URL::asset('images/banner/banner2.jpg') }}" style="height:320px;" alt="Second slide">
                    <div class="carousel-caption">
                   
                    </div>
                </div>
                <div class="item">
                    <img src="{{ URL::asset('images/banner/banner3.jpg') }}" style="height:320px;" alt="Third slide">
                    <div class="carousel-caption">
                    
                    </div>
                </div>
                </div>
                <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                    <span class="fa fa-angle-left"></span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                    <span class="fa fa-angle-right"></span>
                </a>
            </div>
        </div>
    </div>
    
    <div class="row">      
        <div class="col-md-8"> 
            <div class="outerdiv"> 
                <iframe class="inneriframe" src="http://www.settrade.com/C04_01_stock_quote_p1.jsp?txtSymbol=YUASA&ssoPageId=9&selectPage=" marginwidth="0" marginleft="0" scrolling="no" frameborder="no"></iframe>
            </div>
        </div>        
        <div class="col-md-4"> 
            <div class="outerdiv2"> 
                <iframe class="inneriframe2" src="http://www.settrade.com/C04_01_stock_quote_p1.jsp?txtSymbol=YUASA&ssoPageId=9&selectPage=" marginwidth="0" marginleft="0" scrolling="no" frameborder="no"></iframe>
            </div>    
        </div>      
    </div>
    

@endsection

