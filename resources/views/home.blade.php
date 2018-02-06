@extends('layouts.app')

@section('content')
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

@endsection

