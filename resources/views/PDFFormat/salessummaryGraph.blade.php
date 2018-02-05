@php
$objs = session('data');
@endphp

<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width:100%;
            margin: auto; 
        }
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        table.head, th.head, td.head {
            border: 0;
            border-collapse: collapse;
            border-style: hidden;
        }
        th, td {
            font-size: 16px;
        }
        header { 
            position: fixed; 
            top: -30px; 
            left: 0px; 
            right: 0px; 
            height: 60px; 
        } 
        footer { 
            position: fixed; 
            bottom: -30px; 
            left: 0px; 
            right: 0px; 
            height: 70px; 
        }       
        footer .pagenum:before {
            content: counter(page);
        }
        .page-break {
            page-break-after: always;
        }
    </style> 
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="{{ ltrim(elixir('adminlte/bootstrap/css/pdfBootstrap.min.css'), '/') }}" />  

</head>
<body>

   

<header>
    <table class="head" >
        <tr>
            <th class="head" rowspan="2" style="width: 50px;">
                <?php $image_path = '/images/pMTlogor1.jpg'; ?>              
                <center><img style="margin-left:0px; align:center;" src="{{ public_path() . $image_path }}" alt="YUASA" title="YUASA"></center>
            </th>
            <th class="head" rowspan="2" style="width: 10px;">
            </th>                
            @php                      
                $todate = date("d/m/Y", strtotime('-1 day'));
            @endphp
            <th class="head" height="15" style="text-align: left;font-size: 16px;"><b>Sales Analysis Portal V.1.0</b></th>            
            <th class="head" height="15" style="text-align: right;font-size: 16px;"><b>Data as of:  {{ $todate }}</b></th>
        </tr> 
        <tr >
            <td class="head" height="15" style="text-align: left;font-size: 16px;"><b>Yuasa Battery (Thailand) Public Company Limited</b></td>
            <td class="head" height="15" style="text-align: right;font-size: 16px;">
                <b>
                    <span id="userName">{{$objs->name}}</span> -
                    <span id="roles">{{ $objs->department->DepartmentName }}</span>
                </b>
            </td>
        </tr> 
    </table> 
    
    <hr>
</header>

<footer>        
    <hr>
    <table class="head" >
        <tr>
            <th class="head" height="5" style="text-align: left;font-size: 14px;"><b>Created on : {{ date("d/m/Y H:i:s") }}</b></th>            
            <th class="head pagenum-container" height="5" style="text-align: right;font-size: 14px;"><b>Page <span class="pagenum"></span></b></th>
        </tr> 
    </table> 

</footer> 
            

<div style="position: absolute; bottom: 0px; top: 75px; left: 0px; right: 0px; ">

    <h4><strong> REM Sales Summary Graph Report : {{$data["oldYear"]}} - {{$data["year"]}}</strong></h4>    

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">
        @php 
            $path = '/images/tempcharts/'; 
            $chart1 = $data["chart1"];
            $chart2 = $data["chart2"];
        @endphp 

        <div class="row">
            <div class="col-xs-6">                   
                <center><img height="350" style="align:center;" src="{{ public_path() . $path . $chart1 }}" ></center>     
            </div>
            <div class="col-xs-6">                   
                <center><img height="350" style="align:center;" src="{{ public_path() . $path . $chart2 }}" ></center>     
            </div>
        </div>
                
    </div>

</body>
</html>

           