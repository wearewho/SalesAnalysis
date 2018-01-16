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
            font-size: 11px;
        }
        .page-break {
            page-break-after: always;
        }
        header { 
            position: fixed; 
            top: -30px; 
            left: 0px; 
            right: 0px; 
            height: 60px; 
        }
        content { 
            position: fixed; 
            bottom: 0px; 
            top: 75px; 
            left: 0px; 
            right: 0px; 
        }
        footer { 
            position: fixed; 
            bottom: -30px; 
            left: 0px; 
            right: 0px; 
            height: 70px; 
        }  
        
    </style> 
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
            <th class="head" height="15" style="text-align: right;font-size: 16px;"><b>Data as of:  27/12/2018</b></th>
        </tr> 
        <tr >
            <td class="head" height="15" style="text-align: left;font-size: 16px;"><b>Yuasa Battery (Thailand) Public Company Limited</b></td>
            <td class="head" height="15" style="text-align: right;font-size: 16px;">
                <b>{{$objs->name}} 
                    @foreach ($objs->roles->pluck('name') as $role)
                        - {{ $role }}</span>
                    @endforeach
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
            <th class="head" height="5" style="text-align: left;font-size: 14px;"><b>{{ date("d/m/Y H:i:s") }}</b></th>            
            <th class="head" height="5" style="text-align: right;font-size: 14px;"><b>Page 1</b></th>
        </tr> 
    </table> 

</footer>

<content>

        @php
        $dateObj   = DateTime::createFromFormat('!m', $data["month"]);
        $monthName = $dateObj->format('F'); // 
        @endphp
        
    <h4></h4>



</content>   


</body>
</html>
