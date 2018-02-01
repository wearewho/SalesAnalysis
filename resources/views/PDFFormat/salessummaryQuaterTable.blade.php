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

    <h4><strong> REM Sales Summary Report : Quater of {{$data["year"]}}</strong></h4>        

    @php    
            
        function getAmount($money)
        {
            $cleanString = preg_replace('/([^0-9\.,])/i', '', $money);
            $onlyNumbersString = preg_replace('/([^0-9])/i', '', $money);

            $separatorsCountToBeErased = strlen($cleanString) - strlen($onlyNumbersString) - 1;

            $stringWithCommaOrDot = preg_replace('/([,\.])/', '', $cleanString, $separatorsCountToBeErased);
            $removedThousendSeparator = preg_replace('/(\.|,)(?=[0-9]{3,}$)/', '',  $stringWithCommaOrDot);

            return (float) str_replace(',', '.', $removedThousendSeparator);
        }

        $currTotalBaht = 0;
        $currTotalUnit = 0;
        $oldTotalBaht = 0;
        $oldTotalUnit = 0;
        $currUnitQ1 = 0;
        $currBahtQ1 = 0;
        $currUnitQ2 = 0;
        $currBahtQ2 = 0;
        $currUnitQ3 = 0;
        $currBahtQ3 = 0;
        $currUnitQ4 = 0;
        $currBahtQ4 = 0;
        $oldUnitQ1 = 0;
        $oldBahtQ1 = 0;
        $oldUnitQ2 = 0;
        $oldBahtQ2 = 0;
        $oldUnitQ3 = 0;
        $oldBahtQ3 = 0;
        $oldUnitQ4 = 0;
        $oldBahtQ4 = 0;
        $achieveBahtQ1 = 0;
        $achieveUnitQ1 = 0;
        $achieveBahtQ2 = 0;
        $achieveUnitQ2 = 0;
        $achieveBahtQ3 = 0;
        $achieveUnitQ3 = 0;
        $achieveBahtQ4 = 0;
        $achieveUnitQ4 = 0;
        $growthBahtQ1 = 0;
        $growthUnitQ1 = 0;
        $growthBahtQ2 = 0;
        $growthUnitQ2 = 0;
        $growthBahtQ3 = 0;
        $growthUnitQ3 = 0;
        $growthBahtQ4 = 0;
        $growthUnitQ4 = 0;

        @endphp

        @foreach ($currYearData as $Item)             
            @php
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $currUnitQ1+= $Item->Quantity;
                $currBahtQ1+= $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $currUnitQ2 += $Item->Quantity;
                $currBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $currUnitQ3 += $Item->Quantity;
                $currBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $currUnitQ4 += $Item->Quantity;
                $currBahtQ4 += $Item->Total;
            } 

            $currTotalBaht += $Item->Total;
            $currTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach

        @foreach ($oldYearData as $Item)             
            @php     
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $oldUnitQ1 += $Item->Quantity;
                $oldBahtQ1 += $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $oldUnitQ2 += $Item->Quantity;
                $oldBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $oldUnitQ3 += $Item->Quantity;
                $oldBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $oldUnitQ4 += $Item->Quantity;
                $oldBahtQ4 += $Item->Total;
            } 

            $oldTotalBaht += $Item->Total;
            $oldTotalUnit += $Item->Quantity;     
            @endphp  
        @endforeach
               
        @php
            
            function calZero($zero)
                {
                    if ($zero == 0) {                    
                        return NAN;
                    } else {
                        return $zero;
                    }
                }

                $growthBahtQ1 = (($currBahtQ1 - $oldBahtQ1) * 100) / calZero($oldBahtQ1);
                $growthBahtQ2 = (($currBahtQ2 - $oldBahtQ2) * 100) / calZero($oldBahtQ2);
                $growthBahtQ3 = (($currBahtQ3 - $oldBahtQ3) * 100) / calZero($oldBahtQ3);
                $growthBahtQ4 = (($currBahtQ4 - $oldBahtQ4) * 100) / calZero($oldBahtQ4);
                $growthBahtTotal = (($currTotalBaht - $oldTotalBaht) * 100) / calZero($oldTotalBaht);

                $growthUnitQ1 = (($currUnitQ1 - $oldUnitQ1) * 100) / calZero($oldUnitQ1);
                $growthUnitQ2 = (($currUnitQ2 - $oldUnitQ2) * 100) / calZero($oldUnitQ2);
                $growthUnitQ3 = (($currUnitQ3 - $oldUnitQ3) * 100) / calZero($oldUnitQ3);
                $growthUnitQ4 = (($currUnitQ4 - $oldUnitQ4) * 100) / calZero($oldUnitQ4);
                $growthUnitTotal = (($currTotalUnit - $oldTotalUnit) * 100) / calZero($oldTotalUnit);

            $totalBahtTarget = getAmount($targetData[0]->AmtQ1) + getAmount($targetData[0]->AmtQ2) + getAmount($targetData[0]-> AmtQ3) + getAmount($targetData[0]->AmtQ4);
            $totalUnitTarget = getAmount($targetData[0]->UnitQ1) + getAmount($targetData[0]->UnitQ2) + getAmount($targetData[0]-> UnitQ3) + getAmount($targetData[0]->UnitQ4);
          
            $achieveBahtQ1 = ($currBahtQ1 * 100) /  calZero(getAmount($targetData[0]->AmtQ1));
            $achieveBahtQ2 = ($currBahtQ2 * 100) /  calZero(getAmount($targetData[0]->AmtQ2));
            $achieveBahtQ3 = ($currBahtQ3 * 100) /  calZero(getAmount($targetData[0]->AmtQ3));
            $achieveBahtQ4 = ($currBahtQ4 * 100) /  calZero(getAmount($targetData[0]->AmtQ4));
            $achieveBahtTotal = ($currTotalBaht * 100) / calZero($totalBahtTarget);
            
            $achieveUnitQ1 = ($currUnitQ1 * 100) /  calZero(getAmount($targetData[0]->UnitQ1));
            $achieveUnitQ2 = ($currUnitQ2 * 100) /  calZero(getAmount($targetData[0]->UnitQ2));
            $achieveUnitQ3 = ($currUnitQ3 * 100) /  calZero(getAmount($targetData[0]->UnitQ3));
            $achieveUnitQ4 = ($currUnitQ4 * 100) /  calZero(getAmount($targetData[0]->UnitQ4));
            $achieveUnitTotal = ($currTotalUnit * 100) / calZero($totalUnitTarget);

        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">AMB (1,000 BAHT)</th>
                    <th style="text-align:center;">Q1</th>
                    <th style="text-align:center;">Q2</th>
                    <th style="text-align:center;">Q3</th>
                    <th style="text-align:center;">Q4</th>
                    <th style="text-align:center;">Total</th>
                </tr>                               
            </thead>
            <tbody>
            <tr style="text-align:center;" bgcolor="#ffd699">
            <td bgcolor="#b6dde8"><b>Actual {{$data["year"]}}</b></td>
            <td id="BahtActualNowQ1"  style="font-size: 11px; text-align: right;">{{ number_format($currBahtQ1/1000,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 11px; text-align: right;">{{ number_format($currBahtQ2/1000,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 11px; text-align: right;">{{ number_format($currBahtQ3/1000,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 11px; text-align: right;">{{ number_format($currBahtQ4/1000,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalBaht/1000,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt01)/1000,2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt02)/1000,2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt03)/1000,2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt04)/1000,2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtQ1) ? number_format(0,2) : number_format($achieveBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtQ2) ? number_format(0,2) : number_format($achieveBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtQ3) ? number_format(0,2) : number_format($achieveBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtQ4) ? number_format(0,2) : number_format($achieveBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveBahtTotal) ? number_format(0,2) : number_format($achieveBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtQ1/1000,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtQ2/1000,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtQ3/1000,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtQ4/1000,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalBaht/1000,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtQ1) ? number_format(0,2) : number_format($growthBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtQ2) ? number_format(0,2) : number_format($growthBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtQ3) ? number_format(0,2) : number_format($growthBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtQ4) ? number_format(0,2) : number_format($growthBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthBahtTotal) ? number_format(0,2) : number_format($growthBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">AMB (UNIT)</th>
                    <th style="text-align:center;">Q1</th>
                    <th style="text-align:center;">Q2</th>
                    <th style="text-align:center;">Q3</th>
                    <th style="text-align:center;">Q4</th>
                    <th style="text-align:center;">Total</th>
                </tr>                               
            </thead>
            <tbody>     
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["year"]}}</b></td>
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit01 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit02 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit03 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit04 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitQ1) ? number_format(0,2) : number_format($achieveUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitQ2) ? number_format(0,2) : number_format($achieveUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitQ3) ? number_format(0,2) : number_format($achieveUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitQ4) ? number_format(0,2) : number_format($achieveUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveUnitTotal) ? number_format(0,2) : number_format($achieveUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitQ1) ? number_format(0,2) : number_format($growthUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitQ2) ? number_format(0,2) : number_format($growthUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitQ3) ? number_format(0,2) : number_format($growthUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitQ4) ? number_format(0,2) : number_format($growthUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthUnitTotal) ? number_format(0,2) : number_format($growthUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>          
    </div>   

</body>
</html>

           