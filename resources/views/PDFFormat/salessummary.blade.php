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

    <h4><strong>Sales Summary : {{$monthName}} {{$data["year"]}}</strong></h4>

        

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
            @php
            if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Automotive Battery') {
                $REM_AB_Unit += $Item->Quantity ;
                $REM_AB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Motorcycle Battery') {
                $REM_MB_Unit += $Item->Quantity ;
                $REM_MB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Electric Battery') {
                $REM_EB_Unit += $Item->Quantity ;
                $REM_EB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Premium') {
                $REM_PR_Unit += $Item->Quantity ;
                $REM_PR_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'REM' && $Item->ItemGroupName == 'Others') {
                $REM_OT_Unit += $Item->Quantity ;
                $REM_OT_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Automotive Battery') {
                $MTD_AB_Unit += $Item->Quantity ;
                $MTD_AB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Motorcycle Battery') {
                $MTD_MB_Unit += $Item->Quantity ;
                $MTD_MB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Electric Battery') {
                $MTD_EB_Unit += $Item->Quantity ;
                $MTD_EB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Premium') {
                $MTD_PR_Unit += $Item->Quantity ;
                $MTD_PR_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'MTD' && $Item->ItemGroupName == 'Others') {
                $MTD_OT_Unit += $Item->Quantity ;
                $MTD_OT_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Automotive Battery') {
                $SPD_AB_Unit += $Item->Quantity ;
                $SPD_AB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Motorcycle Battery') {
                $SPD_MB_Unit += $Item->Quantity ;
                $SPD_MB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Electric Battery') {
                $SPD_EB_Unit += $Item->Quantity ;
                $SPD_EB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Premium') {
                $SPD_PR_Unit += $Item->Quantity ;
                $SPD_PR_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'SPD' && $Item->ItemGroupName == 'Others') {
                $SPD_OT_Unit += $Item->Quantity ;
                $SPD_OT_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Automotive Battery') {
                $ST_AB_Unit += $Item->Quantity ;
                $ST_AB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Motorcycle Battery') {
                $ST_MB_Unit += $Item->Quantity ;
                $ST_MB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Electric Battery') {
                $ST_EB_Unit += $Item->Quantity ;
                $ST_EB_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Premium') {
                $ST_PR_Unit += $Item->Quantity ;
                $ST_PR_Baht += $Item->Total ;
            } else if ($Item->SalesPersonGroup == 'ST' && $Item->ItemGroupName == 'Others') {
                $ST_OT_Unit += $Item->Quantity ;
                $ST_OT_Baht += $Item->Total ;
            }

            $totalUnit += $Item->Quantity ;
            $totalBaht += $Item->Total ;            
            @endphp
            
        @endforeach

        @php
            //Total Bottom
            $REMUnitResult = $REM_AB_Unit + $REM_MB_Unit + $REM_EB_Unit + $REM_PR_Unit + $REM_OT_Unit;
            $REMBahtResult = $REM_AB_Baht + $REM_MB_Baht + $REM_EB_Baht + $REM_PR_Baht + $REM_OT_Baht;
            $MTDUnitResult = $MTD_AB_Unit + $MTD_MB_Unit + $MTD_EB_Unit + $MTD_PR_Unit + $MTD_OT_Unit;
            $MTDBahtResult = $MTD_AB_Baht + $MTD_MB_Baht + $MTD_EB_Baht + $MTD_PR_Baht + $MTD_OT_Baht;
            $SPDUnitResult = $SPD_AB_Unit + $SPD_MB_Unit + $SPD_EB_Unit + $SPD_PR_Unit + $SPD_OT_Unit;
            $SPDBahtResult = $SPD_AB_Baht + $SPD_MB_Baht + $SPD_EB_Baht + $SPD_PR_Baht + $SPD_OT_Baht;
            $STUnitResult = $ST_AB_Unit + $ST_MB_Unit + $ST_EB_Unit + $ST_PR_Unit + $ST_OT_Unit;
            $STBahtResult = $ST_AB_Baht + $ST_MB_Baht + $ST_EB_Baht + $ST_PR_Baht + $ST_OT_Baht;

            //Total Right
            $ABUnitResult = $REM_AB_Unit + $MTD_AB_Unit + $SPD_AB_Unit + $ST_AB_Unit;
            $ABBahtResult = $REM_AB_Baht + $MTD_AB_Baht + $SPD_AB_Baht + $ST_AB_Baht;
            $MBUnitResult = $REM_MB_Unit + $MTD_MB_Unit + $SPD_MB_Unit + $ST_MB_Unit;
            $MBBahtResult = $REM_MB_Baht + $MTD_MB_Baht + $SPD_MB_Baht + $ST_MB_Baht;
            $EBUnitResult = $REM_EB_Unit + $MTD_EB_Unit + $SPD_EB_Unit + $ST_EB_Unit;
            $EBBahtResult = $REM_EB_Baht + $MTD_EB_Baht + $SPD_EB_Baht + $ST_EB_Baht;
            $OTUnitResult = $REM_OT_Unit + $MTD_OT_Unit + $SPD_OT_Unit + $ST_OT_Unit;
            $OTBahtResult = $REM_OT_Baht + $MTD_OT_Baht + $SPD_OT_Baht + $ST_OT_Baht;
            $PRUnitResult = $REM_PR_Unit + $MTD_PR_Unit + $SPD_PR_Unit + $ST_PR_Unit;
            $PRBahtResult = $REM_PR_Baht + $MTD_PR_Baht + $SPD_PR_Baht + $ST_PR_Baht;

        @endphp

        <table id="YSDTable" class="table table-bordered">
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th rowspan="2" style="vertical-align:middle; text-align:center; font-size: 14px;" >Type</th>
                    <th colspan="2" style="text-align:center; font-size: 14px;">REM</th>
                    <th colspan="2" style="text-align:center; font-size: 14px;">MTD</th>
                    <th colspan="2" style="text-align:center; font-size: 14px;">SPD</th>
                    <th colspan="2" style="text-align:center; font-size: 14px;">Staff</th>
                    <th colspan="2" style="text-align:center; font-size: 14px;">Total</th>
                </tr>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="text-align:center; font-size: 14px;">Unit</th>
                    <th style="text-align:center; font-size: 14px;">Baht</th>
                    <th style="text-align:center; font-size: 14px;">Unit</th>
                    <th style="text-align:center; font-size: 14px;">Baht</th>
                    <th style="text-align:center; font-size: 14px;">Unit</th>
                    <th style="text-align:center; font-size: 14px;">Baht</th>
                    <th style="text-align:center; font-size: 14px;">Unit</th>
                    <th style="text-align:center; font-size: 14px;">Baht</th>
                    <th style="text-align:center; font-size: 14px;">Unit</th>
                    <th style="text-align:center; font-size: 14px;">Baht</th>
                </tr>                                
            </thead>
            <tbody>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>AB</b></td>
                    <td style="font-size: 14px;"> {{ number_format($REM_AB_Unit) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($REM_AB_Baht,2) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($MTD_AB_Unit) }}</td>
                    <td style="font-size: 14px;"> {{ number_format($MTD_AB_Baht,2) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($SPD_AB_Unit) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($SPD_AB_Baht,2) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($ST_AB_Unit) }} </td>
                    <td style="font-size: 14px;"> {{ number_format($ST_AB_Baht,2) }} </td>
                    <td id="Total_AB_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($ABUnitResult) }}</td>
                    <td id="Total_AB_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($ABBahtResult,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>MB</b></td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_MB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_MB_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_MB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_MB_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_MB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_MB_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_MB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_MB_Baht,2) }} </td>
                    <td id="Total_MB_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($MBUnitResult) }}</td>
                    <td id="Total_MB_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($MBBahtResult,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>EB</b></td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_EB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_EB_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_EB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_EB_Baht,2) }} </td>  
                    <td  style="font-size: 14px;" > {{ number_format($SPD_EB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_EB_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_EB_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_EB_Baht,2) }} </td>
                    <td id="Total_EB_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($EBUnitResult) }}</td>
                    <td id="Total_EB_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($EBBahtResult,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>Premium</b></td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_PR_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_PR_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_PR_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_PR_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_PR_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_PR_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_PR_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_PR_Baht,2) }} </td>
                    <td id="Total_PR_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($PRUnitResult) }}</td>
                    <td id="Total_PR_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($PRBahtResult,2) }}</td>
                </tr>    
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>Others</b></td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_OT_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($REM_OT_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_OT_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($MTD_OT_Baht,2) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_OT_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($SPD_OT_Baht,2) }}</td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_OT_Unit) }} </td>
                    <td  style="font-size: 14px;" > {{ number_format($ST_OT_Baht,2) }} </td>
                    <td id="Total_OT_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($OTUnitResult) }}</td>
                    <td id="Total_OT_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($OTBahtResult,2) }}</td>
                </tr>
            </tbody>            
            <tfoot>
                <tr style="text-align:center;" bgcolor="#b6dde8"> $unitTotal
                    <td bgcolor="#b6dde8" style="font-size: 14px;"><b>Total</b></td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($REMUnitResult) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($REMBahtResult,2) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($MTDUnitResult) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($MTDBahtResult,2) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($SPDUnitResult) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($SPDBahtResult,2) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($STUnitResult) }} </td>
                    <td  style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa"> {{ number_format($STBahtResult,2) }} </td>
                    <td id="Total_Unit" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($totalUnit) }}</td>
                    <td id="Total_Baht" style="font-weight: bold; font-size: 14px;" bgcolor="#c2efaa">{{ number_format($totalBaht,2) }}</td>
                </tr>
            </tfoot>
        </table>

</content>   


</body>
</html>

           