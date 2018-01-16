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
            font-size: 12px;
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
            if(is_null($data["month"])){
                $monthName = ""; 
            }
            else{            
                $dateObj   = DateTime::createFromFormat('!m', $data["month"]);
                $monthName = $dateObj->format('F'); 
            }        
        @endphp

    <h4><$STrong>Sales Summary : {{$monthName}} {{$data["year"]}}</$STrong></h4>

        

    @php    
            $totalUnit = 0;
            $totalBaht = 0;
            $REM_AB_Unit = 0;
            $REM_MB_Unit = 0;
            $REM_EB_Unit = 0;
            $REM_OT_Unit = 0;
            $REM_PR_Unit = 0;
            $REM_Total_Unit = 0; 
            $MTD_AB_Unit = 0;
            $MTD_MB_Unit = 0;
            $MTD_EB_Unit = 0;
            $MTD_OT_Unit = 0;
            $MTD_PR_Unit = 0;
            $MTD_Total_Unit = 0; 
            $SPD_AB_Unit = 0;
            $SPD_MB_Unit = 0;
            $SPD_EB_Unit = 0;
            $SPD_OT_Unit = 0;
            $SPD_PR_Unit = 0;
            $SPD_Total_Unit = 0; 
            $ST_AB_Unit = 0;
            $ST_MB_Unit = 0;
            $ST_EB_Unit = 0;
            $ST_OT_Unit = 0;
            $ST_PR_Unit = 0;            
            $ST_Total_Unit = 0; 
            $REM_AB_Baht = 0;
            $REM_MB_Baht = 0;
            $REM_EB_Baht = 0;
            $REM_OT_Baht = 0;
            $REM_PR_Baht = 0;
            $REM_Total_Baht = 0; 
            $MTD_AB_Baht = 0;
            $MTD_MB_Baht = 0;
            $MTD_EB_Baht = 0;
            $MTD_OT_Baht = 0;
            $MTD_PR_Baht = 0;
            $MTD_Total_Baht = 0; 
            $SPD_AB_Baht = 0;
            $SPD_MB_Baht = 0;
            $SPD_EB_Baht = 0;
            $SPD_OT_Baht = 0;
            $SPD_PR_Baht = 0;
            $SPD_Total_Baht = 0; 
            $ST_AB_Baht = 0;
            $ST_MB_Baht = 0;
            $ST_EB_Baht = 0;
            $ST_OT_Baht = 0;
            $ST_PR_Baht = 0;   
            $ST_Total_Baht = 0; 
        @endphp

        @foreach ($result as $Item) 
            if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Automotive Battery') {
                $REM_AB_Unit += number_format($Item->Quantity);
                $REM_AB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Motorcycle Battery') {
                REM_MB_Unit += number_format($Item->Quantity);
                REM_MB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Electric Battery') {
                REM_EB_Unit += number_format($Item->Quantity);
                REM_EB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Premium') {
                REM_PR_Unit += number_format($Item->Quantity);
                REM_PR_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Others') {
                REM_OT_Unit += number_format($Item->Quantity);
                REM_OT_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Automotive Battery') {
                MTD_AB_Unit += number_format($Item->Quantity);
                MTD_AB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Motorcycle Battery') {
                MTD_MB_Unit += number_format($Item->Quantity);
                MTD_MB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Electric Battery') {
                MTD_EB_Unit += number_format($Item->Quantity);
                MTD_EB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Premium') {
                MTD_PR_Unit += number_format($Item->Quantity);
                MTD_PR_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Others') {
                MTD_OT_Unit += number_format($Item->Quantity);
                MTD_OT_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Automotive Battery') {
                SPD_AB_Unit += number_format($Item->Quantity);
                SPD_AB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Motorcycle Battery') {
                SPD_MB_Unit += number_format($Item->Quantity);
                SPD_MB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Electric Battery') {
                SPD_EB_Unit += number_format($Item->Quantity);
                SPD_EB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Premium') {
                SPD_PR_Unit += number_format($Item->Quantity);
                SPD_PR_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Others') {
                SPD_OT_Unit += number_format($Item->Quantity);
                SPD_OT_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Automotive Battery') {
                ST_AB_Unit += number_format($Item->Quantity);
                ST_AB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Motorcycle Battery') {
                ST_MB_Unit += number_format($Item->Quantity);
                ST_MB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Electric Battery') {
                ST_EB_Unit += number_format($Item->Quantity);
                ST_EB_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Premium') {
                ST_PR_Unit += number_format($Item->Quantity);
                ST_PR_Baht += number_format($Item->Total,2);
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Others') {
                ST_OT_Unit += number_format($Item->Quantity);
                ST_OT_Baht += number_format($Item->Total,2);
            }

            $totalUnit += number_format($Item->Quantity);
            $totalBaht += number_format($Item->Total,2);

        @endforeach

        <table id="YSDTable" class="table table-bordered" style="font-size: 16px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th rowspan="2" style="vertical-align:middle; text-align:center;" >Type</th>
                    <th colspan="2" style="text-align:center;">REM</th>
                    <th colspan="2" style="text-align:center;">MTD</th>
                    <th colspan="2" style="text-align:center;">SPD</th>
                    <th colspan="2" style="text-align:center;">Staff</th>
                    <th colspan="2" style="text-align:center;">Total</th>
                </tr>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="text-align:center;">Unit</th>
                    <th style="text-align:center;">Baht</th>
                    <th style="text-align:center;">Unit</th>
                    <th style="text-align:center;">Baht</th>
                    <th style="text-align:center;">Unit</th>
                    <th style="text-align:center;">Baht</th>
                    <th style="text-align:center;">Unit</th>
                    <th style="text-align:center;">Baht</th>
                    <th style="text-align:center;">Unit</th>
                    <th style="text-align:center;">Baht</th>
                </tr>                                
            </thead>
            <tbody>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>AB</b></td>
                    <td > {{ $REM_AB_Unit }} </td>
                    <td > {{ $REM_AB_Baht }} </td>
                    <td > {{ $MTD_AB_Unit }}</td>
                    <td > {{ $MTD_AB_Baht }} </td>
                    <td > {{ $SPD_AB_Unit }} </td>
                    <td > {{ $SPD_AB_Baht }} </td>
                    <td > {{ $ST_AB_Unit }} </td>
                    <td > {{ $ST_AB_Baht }} </td>
                    <td id="Total_AB_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_AB_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>MB</b></td>
                    <td > {{ $REM_MB_Unit }} </td>
                    <td > {{ $REM_MB_Baht }} </td>
                    <td > {{ $MTD_MB_Unit }} </td>
                    <td > {{ $MTD_MB_Baht }} </td>
                    <td > {{ $SPD_MB_Unit }} </td>
                    <td > {{ $SPD_MB_Baht }} </td>
                    <td > {{ $ST_MB_Unit }} </td>
                    <td > {{ $ST_MB_Baht }} </td>
                    <td id="Total_MB_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_MB_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>EB</b></td>
                    <td > {{ $REM_EB_Unit }} </td>
                    <td > {{ $REM_EB_Baht }} </td>
                    <td > {{ $MTD_EB_Unit }} </td>
                    <td > {{ $MTD_EB_Baht }} </td>  
                    <td > {{ $SPD_EB_Unit }} </td>
                    <td > {{ $SPD_EB_Baht }} </td>
                    <td > {{ $ST_EB_Unit }} </td>
                    <td > {{ $ST_EB_Baht }} </td>
                    <td id="Total_EB_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_EB_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Premium</b></td>
                    <td > {{ $REM_PR_Unit }} </td>
                    <td > {{ $REM_PR_Baht }} </td>
                    <td > {{ $MTD_PR_Unit }} </td>
                    <td > {{ $MTD_PR_Unit }} </td>
                    <td > {{ $SPD_PR_Unit }} </td>
                    <td > {{ $SPD_PR_Baht }} </td>
                    <td > {{ $ST_PR_Unit }} </td>
                    <td > {{ $ST_PR_Baht }} </td>
                    <td id="Total_PR_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_PR_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Others</b></td>
                    <td > {{ $REM_OT_Unit }} </td>
                    <td > {{ $REM_OT_Baht }} </td>
                    <td > {{ $MTD_OT_Unit }} </td>
                    <td > {{ $MTD_OT_Baht }} </td>
                    <td > {{ $SPD_OT_Unit }} </td>
                    <td > {{ $SPD_OT_Baht }}</td>
                    <td > {{ $ST_OT_Unit }} </td>
                    <td > {{ $ST_OT_Baht }} </td>
                    <td id="Total_OT_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_OT_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
            </tbody>            
            <tfoot>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <td bgcolor="#b6dde8"><b>Total</b></td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $REM_Total_Unit }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $REM_Total_Baht }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $MTD_Total_Unit }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $MTD_Total_Baht }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $SPD_Total_Unit }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $SPD_Total_Baht }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $ST_Total_Unit }} </td>
                    <td  style="font-weight: bold;" bgcolor="#c2efaa"> {{ $ST_Total_Baht }} </td>
                    <td id="Total_Unit" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                    <td id="Total_Baht" style="font-weight: bold;" bgcolor="#c2efaa">&nbsp;</td>
                </tr>
            </tfoot>
        </table>

</content>   


</body>
</html>
