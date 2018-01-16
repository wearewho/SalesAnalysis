
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
        
    <h4><strong>Target Master : {{ $TargetH->Company }} Company, {{ $TargetH->Department }} Department, {{ $TargetH->Year }}</strong></h4>

    <table>
        <tr>
            <th bgcolor="#d6d6c2" style="text-align: center;"><b>Item Group</b></th>
            <th bgcolor="#d6d6c2" style="text-align: center;"><b>Month</b></th>            
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>January</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>February</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>March</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>April</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>May</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>June</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>July</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>August</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>September</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>October</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>November</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>December</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Total</b></th>
        </tr>  
            @php 
                $SumAmt01 = 0;
                $SumAmt02 = 0;
                $SumAmt03 = 0;
                $SumAmt04 = 0;
                $SumAmt05 = 0;
                $SumAmt06 = 0;
                $SumAmt07 = 0;
                $SumAmt08 = 0;
                $SumAmt09 = 0;
                $SumAmt10 = 0;
                $SumAmt11 = 0;
                $SumAmt12 = 0; 
                $SumAmtQ1 = 0;
                $SumAmtQ2 = 0;
                $SumAmtQ3 = 0;
                $SumAmtQ4 = 0;               
                $SumUnit01 = 0;
                $SumUnit02 = 0;
                $SumUnit03 = 0;
                $SumUnit04 = 0;
                $SumUnit05 = 0;
                $SumUnit06 = 0;
                $SumUnit07 = 0;
                $SumUnit08 = 0;
                $SumUnit09 = 0;
                $SumUnit10 = 0;
                $SumUnit11 = 0;
                $SumUnit12 = 0;             
                $SumUnitQ1 = 0;
                $SumUnitQ2 = 0;
                $SumUnitQ3 = 0;
                $SumUnitQ4 = 0;
            @endphp
        @foreach ($TargetD as $Item)
            @php
                $AmtQ1 = substr($Item->AmtQ1, 3);
                $AmtQ2 = substr($Item->AmtQ2, 3);
                $AmtQ3 = substr($Item->AmtQ3, 3);
                $AmtQ4 = substr($Item->AmtQ4, 3);
                $newAmtQ1 = str_replace(',', '', $AmtQ1); 
                $newAmtQ2 = str_replace(',', '', $AmtQ2); 
                $newAmtQ3 = str_replace(',', '', $AmtQ3); 
                $newAmtQ4 = str_replace(',', '', $AmtQ4); 
                $newUnitQ1 = str_replace(',', '', $Item->UnitQ1); 
                $newUnitQ2 = str_replace(',', '', $Item->UnitQ2); 
                $newUnitQ3 = str_replace(',', '', $Item->UnitQ3); 
                $newUnitQ4 = str_replace(',', '', $Item->UnitQ4); 
                $AmtQ1 = intval($newAmtQ1); 
                $AmtQ2 = intval($newAmtQ2); 
                $AmtQ3 = intval($newAmtQ3); 
                $AmtQ4 = intval($newAmtQ4); 
                $UnitQ1 = intval($newUnitQ1); 
                $UnitQ2 = intval($newUnitQ2); 
                $UnitQ3 = intval($newUnitQ3); 
                $UnitQ4 = intval($newUnitQ4); 
            
                $newAmt1 = str_replace(',', '', $Item->Amt01); 
                $newAmt2 = str_replace(',', '', $Item->Amt02); 
                $newAmt3 = str_replace(',', '', $Item->Amt03); 
                $newAmt4 = str_replace(',', '', $Item->Amt04);          
                $newAmt5 = str_replace(',', '', $Item->Amt05); 
                $newAmt6 = str_replace(',', '', $Item->Amt06); 
                $newAmt7 = str_replace(',', '', $Item->Amt07); 
                $newAmt8 = str_replace(',', '', $Item->Amt08);          
                $newAmt9 = str_replace(',', '', $Item->Amt09); 
                $newAmt10 = str_replace(',', '', $Item->Amt10); 
                $newAmt11 = str_replace(',', '', $Item->Amt11); 
                $newAmt12 = str_replace(',', '', $Item->Amt12);    
                $newUnit1 = str_replace(',', '', $Item->Unit01); 
                $newUnit2 = str_replace(',', '', $Item->Unit02); 
                $newUnit3 = str_replace(',', '', $Item->Unit03); 
                $newUnit4 = str_replace(',', '', $Item->Unit04);          
                $newUnit5 = str_replace(',', '', $Item->Unit05); 
                $newUnit6 = str_replace(',', '', $Item->Unit06); 
                $newUnit7 = str_replace(',', '', $Item->Unit07); 
                $newUnit8 = str_replace(',', '', $Item->Unit08);          
                $newUnit9 = str_replace(',', '', $Item->Unit09); 
                $newUnit10 = str_replace(',', '', $Item->Unit10); 
                $newUnit11 = str_replace(',', '', $Item->Unit11); 
                $newUnit12 = str_replace(',', '', $Item->Unit12);               
                $Amt01 = intval($newAmt1); 
                $Amt02 = intval($newAmt2); 
                $Amt03 = intval($newAmt3); 
                $Amt04 = intval($newAmt4);            
                $Amt05 = intval($newAmt5); 
                $Amt06 = intval($newAmt6); 
                $Amt07 = intval($newAmt7); 
                $Amt08 = intval($newAmt8);            
                $Amt09 = intval($newAmt9); 
                $Amt10 = intval($newAmt10); 
                $Amt11 = intval($newAmt11); 
                $Amt12 = intval($newAmt12);  
                $Unit01 = intval($newUnit1); 
                $Unit02 = intval($newUnit2); 
                $Unit03 = intval($newUnit3); 
                $Unit04 = intval($newUnit4);            
                $Unit05 = intval($newUnit5); 
                $Unit06 = intval($newUnit6); 
                $Unit07 = intval($newUnit7); 
                $Unit08 = intval($newUnit8);            
                $Unit09 = intval($newUnit9); 
                $Unit10 = intval($newUnit10); 
                $Unit11 = intval($newUnit11); 
                $Unit12 = intval($newUnit12);
            @endphp
            <tr>
                <td rowspan="2" style="text-align:center; vertical-align:middle;" bgcolor="#ffffcc">
                    <b>{{$Item->ItemGroup}}</b> 
                </td>
                <td bgcolor="#d6d6c2" style="text-align: center;  font-size:9px;">
                    <b>Amount</b>
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt01 }}
                    @php 
                        if(count($Item->Amt01) == 1)
                        {                            
                            $SumAmt01 += $Amt01;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt02 }}
                    @php 
                        if(count($Item->Amt02) == 1)
                        {                            
                            $SumAmt02 += $Amt02;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt03 }}
                    @php 
                        if(count($Item->Amt03) == 1)
                        {                            
                            $SumAmt03 += $Amt03;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt04 }}
                    @php 
                        if(count($Item->Amt04) == 1)
                        {                            
                            $SumAmt04 += $Amt04;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt05 }}
                    @php 
                        if(count($Item->Amt05) == 1)
                        {                            
                            $SumAmt05 += $Amt05;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt06 }}
                    @php 
                        if(count($Item->Amt06) == 1)
                        {                            
                            $SumAmt06 += $Amt06;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt07 }}
                    @php 
                        if(count($Item->Amt07) == 1)
                        {                            
                            $SumAmt07 += $Amt07;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt08 }}
                    @php 
                        if(count($Item->Amt08) == 1)
                        {                            
                            $SumAmt08 += $Amt08;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt09 }}
                    @php 
                        if(count($Item->Amt09) == 1)
                        {                            
                            $SumAmt09 += $Amt09;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt10 }}
                    @php 
                        if(count($Item->Amt10) == 1)
                        {                            
                            $SumAmt10 += $Amt10;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt11 }}
                    @php 
                        if(count($Item->Amt01) == 1)
                        {                            
                            $SumAmt11 += $Amt11;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Amt12 }}
                    @php 
                        if(count($Item->Amt12) == 1)
                        {                            
                            $SumAmt12 += $Amt12;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#fde9d9" style="font-size: 10px; text-align: right;">
                    {{ number_format($AmtQ1 + $AmtQ2 + $AmtQ3 + $AmtQ4,2) }}
                </td>
            </tr>
            <tr >    
                <td bgcolor="#d6d6c2" style="text-align: center; font-size:9px;">
                    <b>Unit</b>
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit01 }}
                    @php 
                        if(count($Item->Unit01) == 1)
                        {                            
                            $SumUnit01 += $Unit01;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit02 }}
                    @php 
                        if(count($Item->Unit02) == 1)
                        {                            
                            $SumUnit02 += $Unit02;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit03 }}
                    @php 
                        if(count($Item->Unit03) == 1)
                        {                            
                            $SumUnit03 += $Unit03;                           
                        } 
                    @endphp 
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit04 }}
                    @php 
                        if(count($Item->Unit04) == 1)
                        {                            
                            $SumUnit04 += $Unit04;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit05 }}
                    @php 
                        if(count($Item->Unit05) == 1)
                        {                            
                            $SumUnit05 += $Unit05;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit06 }}
                    @php 
                        if(count($Item->Unit06) == 1)
                        {                            
                            $SumUnit06 += $Unit06;                           
                        }
                    @endphp 
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit07 }}
                    @php 
                        if(count($Item->Unit07) == 1)
                        {                            
                            $SumUnit07 += $Unit07;                           
                        } 
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit08 }}
                    @php 
                        if(count($Item->Unit08) == 1)
                        {                            
                            $SumUnit08 += $Unit08;                           
                        } 
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit09 }}
                    @php 
                        if(count($Item->Unit09) == 1)
                        {                            
                            $SumUnit09 += $Unit09;                           
                        } 
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit10 }}
                    @php 
                        if(count($Item->Unit10) == 1)
                        {                            
                            $SumUnit10 += $Unit10;                           
                        } 
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit11 }}
                    @php 
                        if(count($Item->Unit11) == 1)
                        {                            
                            $SumUnit11 += $Unit11;                           
                        } 
                    @endphp
                </td>
                <td bgcolor="#ffffcc"  style="font-size: 10px; text-align: right;">
                    {{ $Item->Unit12 }}
                    @php 
                        if(count($Item->Unit12) == 1)
                        {                            
                            $SumUnit12 += $Unit12;                           
                        }
                    @endphp 
                </td>
                <td bgcolor="#fde9d9"  style="font-size: 10px; text-align: right;">                   
                    {{ number_format($UnitQ1 + $UnitQ2 + $UnitQ3 + $UnitQ4) }}
                </td>
            </tr>
        @endforeach
        <tr bgcolor="#fde9d9">        
            <td bgcolor="#d6d6c2" rowspan="2" style="vertical-align:middle; text-align: center;">
                <b>Total</b>
            </td>       
            <td bgcolor="#d6d6c2" style=" font-size:9px;">
                <b>Amount</b>
            </td>    
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt01,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt02,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt03,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt04,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt05,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt06,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt07,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt08,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt09,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt10,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt11,2) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                    {{ number_format($SumAmt12,2) }}
            </td>
            <td bgcolor="#d9ffcc" style="font-size: 10px; text-align: right;"> 
                    {{ number_format($SumAmt01+$SumAmt02+$SumAmt03+$SumAmt04+$SumAmt05+$SumAmt06+$SumAmt07+$SumAmt08+$SumAmt09+$SumAmt10+$SumAmt11+$SumAmt12,2) }}
            </td>
        </tr>
        <tr bgcolor="#fde9d9">      
            <td bgcolor="#d6d6c2" style=" font-size:9px;">
                <b>Unit</b>
            </td>       
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit01) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit02) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit03) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit04) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit05) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit06) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit07) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit08) }}
            </td>
            <td style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit09) }}
            </td>
            <td style="font-size: 10px; text-align: right;">                          
                {{ number_format($SumUnit10) }}    
            </td>
            <td style="font-size: 10px; text-align: right;">                         
                {{ number_format($SumUnit11) }}  
            </td>
            <td style="font-size: 10px; text-align: right;">                           
                {{ number_format($SumUnit12) }}        
            </td>
            <td bgcolor="#d9ffcc" style="font-size: 10px; text-align: right;">
                {{ number_format($SumUnit01+$SumUnit02+$SumUnit03+$SumUnit04+$SumUnit05+$SumUnit06+$SumUnit07+$SumUnit08+$SumUnit09+$SumUnit10+$SumUnit11+$SumUnit12) }}
            </td>
        </tr>
    </table>

    <br>

    <table>
        <tr style="text-align: center;font-size: 8px;">
            <th bgcolor="#d6d6c2" style="text-align: center;"><b>Item Group</b></th> style="text-align: center;" font-size:9px;"
            <th bgcolor="#d6d6c2" style="text-align: center;"><b>Quater</b></th>        
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Q1</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Q2</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Q3</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Q4</b></th>
            <th height="30" bgcolor="#d6d6c2" style="text-align: center;"><b>Total</b></th>
        </tr>  
        @foreach ($TargetD as $Item)
            @php
                $AmtQ1 = substr($Item->AmtQ1, 3);
                $AmtQ2 = substr($Item->AmtQ2, 3);
                $AmtQ3 = substr($Item->AmtQ3, 3);
                $AmtQ4 = substr($Item->AmtQ4, 3);
                $newAmtQ1 = str_replace(',', '', $AmtQ1); 
                $newAmtQ2 = str_replace(',', '', $AmtQ2); 
                $newAmtQ3 = str_replace(',', '', $AmtQ3); 
                $newAmtQ4 = str_replace(',', '', $AmtQ4); 
                $newUnitQ1 = str_replace(',', '', $Item->UnitQ1); 
                $newUnitQ2 = str_replace(',', '', $Item->UnitQ2); 
                $newUnitQ3 = str_replace(',', '', $Item->UnitQ3); 
                $newUnitQ4 = str_replace(',', '', $Item->UnitQ4); 
                $AmtQ1 = intval($newAmtQ1); 
                $AmtQ2 = intval($newAmtQ2); 
                $AmtQ3 = intval($newAmtQ3); 
                $AmtQ4 = intval($newAmtQ4); 
                $UnitQ1 = intval($newUnitQ1); 
                $UnitQ2 = intval($newUnitQ2); 
                $UnitQ3 = intval($newUnitQ3); 
                $UnitQ4 = intval($newUnitQ4); 
            @endphp
            <tr style="text-align: center;">
                <td rowspan="2" style="text-align:center; vertical-align:middle;" bgcolor="#ffffcc">
                    <b>{{$Item->ItemGroup}}</b> 
                </td>
                <td bgcolor="#d6d6c2">
                    <b>Amount</b>
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ number_format($AmtQ1,2) }}
                    @php 
                        if(count($Item->AmtQ1) == 1)
                        {                            
                            $SumAmtQ1 += $AmtQ1;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ number_format($AmtQ2,2) }}
                    @php 
                        if(count($Item->AmtQ2) == 1)
                        {                            
                            $SumAmtQ2 += $AmtQ2;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ number_format($AmtQ3,2) }}
                    @php 
                        if(count($Item->AmtQ3) == 1)
                        {                            
                            $SumAmtQ3 += $AmtQ3;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ number_format($AmtQ4,2) }}
                    @php 
                        if(count($Item->AmtQ4) == 1)
                        {                            
                            $SumAmtQ4 += $AmtQ4;                           
                        }                        
                    @endphp
                </td>
                <td bgcolor="#fde9d9" style="text-align: right;">
                    {{ number_format($AmtQ1 + $AmtQ2 + $AmtQ3 + $AmtQ4,2) }}
                </td>
            </tr>
            <tr >    
                <td bgcolor="#d6d6c2">
                    <b>Unit</b>
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ $Item->UnitQ1 }}
                    @php 
                        if(count($Item->UnitQ1) == 1)
                        {                            
                            $SumUnitQ1 += $UnitQ1;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ $Item->UnitQ2 }}
                    @php 
                        if(count($Item->UnitQ2) == 1)
                        {                            
                            $SumUnitQ2 += $UnitQ2;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ $Item->UnitQ3 }}
                    @php 
                    if(count($Item->UnitQ3) == 1)
                        {                            
                            $SumUnitQ3 += $UnitQ3;                           
                        }
                    @endphp  
                </td>
                <td bgcolor="#ffffcc" style="text-align: right;">
                    {{ $Item->UnitQ4 }}
                    @php 
                        if(count($Item->UnitQ4) == 1)
                        {                            
                            $SumUnitQ4 += $UnitQ4;                           
                        }  
                    @endphp
                </td>
                <td bgcolor="#fde9d9" style="text-align: right;">                   
                    {{ number_format($UnitQ1 + $UnitQ2 + $UnitQ3 + $UnitQ4) }}
                </td>
            </tr>
        @endforeach
        <tr>        
            <td bgcolor="#d6d6c2" rowspan="2" style="vertical-align:middle; text-align: center; ">
                <b>Total</b>
            </td>       
            <td bgcolor="#d6d6c2">
                <b>Amount</b>
            </td>    
            <td bgcolor="#fde9d9" style="text-align: right;">                        
                    {{ number_format($SumAmtQ1,2) }}
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">                   
                    {{ number_format($SumAmtQ2,2) }}
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">                
                    {{ number_format($SumAmtQ2,2) }}
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">          
                    {{ number_format($SumAmtQ4,2) }}
            </td>
            <td bgcolor="#d9ffcc" style="text-align: right;"> 
                    {{ number_format($SumAmt01+$SumAmt02+$SumAmt03+$SumAmt04+$SumAmt05+$SumAmt06+$SumAmt07+$SumAmt08+$SumAmt09+$SumAmt10+$SumAmt11+$SumAmt12,2) }}
            </td>
        </tr>
        <tr>      
            <td bgcolor="#d6d6c2">
                <b>Unit</b>
            </td>       
            <td bgcolor="#fde9d9" style="text-align: right;">
                {{ number_format($SumUnitQ1)  }} 
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">
                {{ number_format($SumUnitQ2)  }}  
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">
                {{ number_format($SumUnitQ3)  }}  
            </td>
            <td bgcolor="#fde9d9" style="text-align: right;">
                {{ number_format($SumUnitQ4) }}  
            </td>
            <td bgcolor="#d9ffcc" style="text-align: right;">
                {{ number_format($SumUnitQ1 + $SumUnitQ2 + $SumUnitQ3 + $SumUnitQ4) }}  
            </td>
        </tr>
    </table>


</content>   


</body>
</html>
