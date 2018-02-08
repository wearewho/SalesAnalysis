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

    <h4><strong> MTD Sales Summary Report : {{$data["year"]}}</strong></h4>        

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

        $grouped = array_group_by($currYearData, "ItemGroupShort");

        dd($grouped);

        $currTotalBaht = 0;
        $currTotalUnit = 0;
        $oldTotalBaht = 0;
        $oldTotalUnit = 0;
        $currUnitJanuary = 0;
        $currUnitFebruary = 0;
        $currUnitMarch = 0;
        $currUnitApril = 0;
        $currUnitMay = 0;
        $currUnitJune = 0;
        $currUnitJuly = 0;
        $currUnitAugust = 0;
        $currUnitSeptember = 0;
        $currUnitOctober = 0;
        $currUnitNovember = 0;
        $currUnitDecember = 0;
        $currBahtJanuary = 0;
        $currBahtFebruary = 0;
        $currBahtMarch = 0;
        $currBahtApril = 0;
        $currBahtMay = 0;
        $currBahtJune = 0;
        $currBahtJuly = 0;
        $currBahtAugust = 0;
        $currBahtSeptember = 0;
        $currBahtOctober = 0;
        $currBahtNovember = 0;
        $currBahtDecember = 0;
        $currUnitQ1 = 0;
        $currBahtQ1 = 0;
        $currUnitQ2 = 0;
        $currBahtQ2 = 0;
        $currUnitQ3 = 0;
        $currBahtQ3 = 0;
        $currUnitQ4 = 0;
        $currBahtQ4 = 0;
        $oldUnitJanuary = 0;
        $oldUnitFebruary = 0;
        $oldUnitMarch = 0;
        $oldUnitApril = 0;
        $oldUnitMay = 0;
        $oldUnitJune = 0;
        $oldUnitJuly = 0;
        $oldUnitAugust = 0;
        $oldUnitSeptember = 0;
        $oldUnitOctober = 0;
        $oldUnitNovember = 0;
        $oldUnitDecember = 0;
        $oldBahtJanuary = 0;
        $oldBahtFebruary = 0;
        $oldBahtMarch = 0;
        $oldBahtApril = 0;
        $oldBahtMay = 0;
        $oldBahtJune = 0;
        $oldBahtJuly = 0;
        $oldBahtAugust = 0;
        $oldBahtSeptember = 0;
        $oldBahtOctober = 0;
        $oldBahtNovember = 0;
        $oldBahtDecember = 0;
        $oldUnitQ1 = 0;
        $oldBahtQ1 = 0;
        $oldUnitQ2 = 0;
        $oldBahtQ2 = 0;
        $oldUnitQ3 = 0;
        $oldBahtQ3 = 0;
        $oldUnitQ4 = 0;
        $oldBahtQ4 = 0;
        $achieveBahtJanuary = 0;
        $achieveBahtFebruary = 0;
        $achieveBahtMarch = 0;
        $achieveBahtApril = 0;
        $achieveBahtMay = 0;
        $achieveBahtJune = 0;
        $achieveBahtJuly = 0;
        $achieveBahtAugust = 0;
        $achieveBahtSeptember = 0;
        $achieveBahtOctober = 0;
        $achieveBahtNovember = 0;
        $achieveBahtDecember = 0;
        $achieveBahtQ1 = 0;
        $achieveUnitQ1 = 0;
        $achieveBahtQ2 = 0;
        $achieveUnitQ2 = 0;
        $achieveBahtQ3 = 0;
        $achieveUnitQ3 = 0;
        $achieveBahtQ4 = 0;
        $achieveUnitQ4 = 0;
        $growthBahtJanuary = 0;
        $growthBahtFebruary = 0;
        $growthBahtMarch = 0;
        $growthBahtApril = 0;
        $growthBahtMay = 0;
        $growthBahtJune = 0;
        $growthBahtJuly = 0;
        $growthBahtAugust = 0;
        $growthBahtSeptember = 0;
        $growthBahtOctober = 0;
        $growthBahtNovember = 0;
        $growthBahtDecember = 0;
        $achieveUnitJanuary = 0;
        $achieveUnitFebruary = 0;
        $achieveUnitMarch = 0;
        $achieveUnitApril = 0;
        $achieveUnitMay = 0;
        $achieveUnitJune = 0;
        $achieveUnitJuly = 0;
        $achieveUnitAugust = 0;
        $achieveUnitSeptember = 0;
        $achieveUnitOctober = 0;
        $achieveUnitNovember = 0;
        $achieveUnitDecember = 0;
        $growthUnitJanuary = 0;
        $growthUnitFebruary = 0;
        $growthUnitMarch = 0;
        $growthUnitApril = 0;
        $growthUnitMay = 0;
        $growthUnitJune = 0;
        $growthUnitJuly = 0;
        $growthUnitAugust = 0;
        $growthUnitSeptember = 0;
        $growthUnitOctober = 0;
        $growthUnitNovember = 0;
        $growthUnitDecember = 0;
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
            if ($Item->DocMonth == '1') {
                $currUnitJanuary += $Item->Quantity;
                $currBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $currUnitFebruary += $Item->Quantity;
                $currBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $currUnitMarch += $Item->Quantity;
                $currBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $currUnitApril += $Item->Quantity;
                $currBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $currUnitMay += $Item->Quantity;
                $currBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $currUnitJune += $Item->Quantity;
                $currBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $currUnitJuly += $Item->Quantity;
                $currBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $currUnitAugust += $Item->Quantity;
                $currBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $currUnitSeptember += $Item->Quantity;
                $currBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $currUnitOctober += $Item->Quantity;
                $currBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $currUnitNovember += $Item->Quantity;
                $currBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $currUnitDecember += $Item->Quantity;
                $currBahtDecember += $Item->Total;
            }

            $currTotalBaht += $Item->Total;
            $currTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach

        @foreach ($oldYearData as $Item)             
            @php     
            if ($Item->DocMonth == '1') {
                $oldUnitJanuary += $Item->Quantity;
                $oldBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $oldUnitFebruary += $Item->Quantity;
                $oldBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $oldUnitMarch += $Item->Quantity;
                $oldBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $oldUnitApril += $Item->Quantity;
                $oldBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $oldUnitMay += $Item->Quantity;
                $oldBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $oldUnitJune += $Item->Quantity;
                $oldBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $oldUnitJuly += $Item->Quantity;
                $oldBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $oldUnitAugust += $Item->Quantity;
                $oldBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $oldUnitSeptember += $Item->Quantity;
                $oldBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $oldUnitOctober += $Item->Quantity;
                $oldBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $oldUnitNovember += $Item->Quantity;
                $oldBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $oldUnitDecember += $Item->Quantity;
                $oldBahtDecember += $Item->Total;
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

                $growthBahtJanuary = (($currBahtJanuary - $oldBahtJanuary) * 100) / calZero($oldBahtJanuary);
                $growthBahtFebruary = (($currBahtFebruary - $oldBahtFebruary) * 100) / calZero($oldBahtFebruary);
                $growthBahtMarch = (($currBahtMarch - $oldBahtMarch) * 100) / calZero($oldBahtMarch);
                $growthBahtApril = (($currBahtApril - $oldBahtApril) * 100) / calZero($oldBahtApril);
                $growthBahtMay = (($currBahtMay - $oldBahtMay) * 100) / calZero($oldBahtMay);
                $growthBahtJune = (($currBahtJune - $oldBahtJune) * 100) / calZero($oldBahtJune);
                $growthBahtJuly = (($currBahtJuly - $oldBahtJuly) * 100) / calZero($oldBahtJuly);
                $growthBahtAugust = (($currBahtAugust - $oldBahtAugust) * 100) / calZero($oldBahtAugust);
                $growthBahtSeptember = (($currBahtSeptember - $oldBahtSeptember) * 100) / calZero($oldBahtSeptember);
                $growthBahtOctober = (($currBahtOctober - $oldBahtOctober) * 100) / calZero($oldBahtOctober);
                $growthBahtNovember = (($currBahtNovember - $oldBahtNovember) * 100) / calZero($oldBahtNovember);
                $growthBahtDecember = (($currBahtDecember - $oldBahtDecember) * 100) / calZero($oldBahtDecember);
                $growthBahtTotal = (($currTotalBaht - $oldTotalBaht) * 100) / calZero($oldTotalBaht);

                $growthUnitJanuary = (($currUnitJanuary - $oldUnitJanuary) * 100) / calZero($oldUnitJanuary);
                $growthUnitFebruary = (($currUnitFebruary - $oldUnitFebruary) * 100) / calZero($oldUnitFebruary);
                $growthUnitMarch = (($currUnitMarch - $oldUnitMarch) * 100) / calZero($oldUnitMarch);
                $growthUnitApril = (($currUnitApril - $oldUnitApril) * 100) / calZero($oldUnitApril);
                $growthUnitMay = (($currUnitMay - $oldUnitMay) * 100) / calZero($oldUnitMay);
                $growthUnitJune = (($currUnitJune - $oldUnitJune) * 100) / calZero($oldUnitJune);
                $growthUnitJuly = (($currUnitJuly - $oldUnitJuly) * 100) / calZero($oldUnitJuly);
                $growthUnitAugust = (($currUnitAugust - $oldUnitAugust) * 100) / calZero($oldUnitAugust);
                $growthUnitSeptember = (($currUnitSeptember - $oldUnitSeptember) * 100) / calZero($oldUnitSeptember);
                $growthUnitOctober = (($currUnitOctober - $oldUnitOctober) * 100) / calZero($oldUnitOctober);
                $growthUnitNovember = (($currUnitNovember - $oldUnitNovember) * 100) / calZero($oldUnitNovember);
                $growthUnitDecember = (($currUnitDecember - $oldUnitDecember) * 100) / calZero($oldUnitDecember);
                $growthUnitTotal = (($currTotalUnit - $oldTotalUnit) * 100) / calZero($oldTotalUnit);

            $totalBahtTarget = getAmount($targetData[0]->AmtQ1) + getAmount($targetData[0]->AmtQ2) + getAmount($targetData[0]-> AmtQ3) + getAmount($targetData[0]->AmtQ4);
            $totalUnitTarget = getAmount($targetData[0]->UnitQ1) + getAmount($targetData[0]->UnitQ2) + getAmount($targetData[0]-> UnitQ3) + getAmount($targetData[0]->UnitQ4);
          
            $achieveBahtJanuary = ($currBahtJanuary * 100) /  calZero(getAmount($targetData[0]->Amt01));
            $achieveBahtFebruary = ($currBahtFebruary * 100) /  calZero(getAmount($targetData[0]->Amt02));
            $achieveBahtMarch = ($currBahtMarch * 100) /  calZero(getAmount($targetData[0]->Amt03));
            $achieveBahtApril = ($currBahtApril * 100) /  calZero(getAmount($targetData[0]->Amt04));
            $achieveBahtMay = ($currBahtMay * 100) /  calZero(getAmount($targetData[0]->Amt05));
            $achieveBahtJune = ($currBahtJune * 100) /  calZero(getAmount($targetData[0]->Amt06));
            $achieveBahtJuly = ($currBahtJuly * 100) /  calZero(getAmount($targetData[0]->Amt07));
            $achieveBahtAugust = ($currBahtAugust * 100) /  calZero(getAmount($targetData[0]->Amt08));
            $achieveBahtSeptember = ($currBahtSeptember * 100) /  calZero(getAmount($targetData[0]->Amt09));
            $achieveBahtOctober = ($currBahtOctober * 100) /  calZero(getAmount($targetData[0]->Amt10));
            $achieveBahtNovember = ($currBahtNovember * 100) /  calZero(getAmount($targetData[0]->Amt11));
            $achieveBahtDecember = ($currBahtDecember * 100) /  calZero(getAmount($targetData[0]->Amt12));
            $achieveBahtTotal = ($currTotalBaht * 100) / calZero($totalBahtTarget);
            
            $achieveUnitJanuary = ($currUnitJanuary * 100) /  calZero(getAmount($targetData[0]->Unit01));
            $achieveUnitFebruary = ($currUnitFebruary * 100) /  calZero(getAmount($targetData[0]->Unit02));
            $achieveUnitMarch = ($currUnitMarch * 100) /  calZero(getAmount($targetData[0]->Unit03));
            $achieveUnitApril = ($currUnitApril * 100) /  calZero(getAmount($targetData[0]->Unit04));
            $achieveUnitMay = ($currUnitMay * 100) /  calZero(getAmount($targetData[0]->Unit05));
            $achieveUnitJune = ($currUnitJune * 100) /  calZero(getAmount($targetData[0]->Unit06));
            $achieveUnitJuly = ($currUnitJuly * 100) /  calZero(getAmount($targetData[0]->Unit07));
            $achieveUnitAugust = ($currUnitAugust * 100) /  calZero(getAmount($targetData[0]->Unit08));
            $achieveUnitSeptember = ($currUnitSeptember * 100) /  calZero(getAmount($targetData[0]->Unit09));
            $achieveUnitOctober = ($currUnitOctober * 100) /  calZero(getAmount($targetData[0]->Unit10));
            $achieveUnitNovember = ($currUnitNovember * 100) /  calZero(getAmount($targetData[0]->Unit11));
            $achieveUnitDecember = ($currUnitDecember * 100) /  calZero(getAmount($targetData[0]->Unit12));
            $achieveUnitTotal = ($currTotalUnit * 100) / calZero($totalUnitTarget);

        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">AMB (1,000 BAHT)</th>
                    <th style="text-align:center;">January</th>
                    <th style="text-align:center;">February</th>
                    <th style="text-align:center;">March</th>
                    <th style="text-align:center;">April</th>
                    <th style="text-align:center;">May</th>
                    <th style="text-align:center;">June</th>
                    <th style="text-align:center;">July</th>
                    <th style="text-align:center;">August</th>
                    <th style="text-align:center;">September</th>
                    <th style="text-align:center;">October</th>
                    <th style="text-align:center;">November</th>
                    <th style="text-align:center;">December</th>
                    <th style="text-align:center;">Total</th>
                </tr>                               
            </thead>
            <tbody>
                <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["year"]}}</b></td>
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt01)/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt02)/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt03)/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt04)/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt05)/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt06)/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt07)/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt08)/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt09)/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt10)/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt11)/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format(getAmount($targetData[0]->Amt12)/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtJanuary) ? number_format(0,2) : number_format($achieveBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtFebruary) ? number_format(0,2) : number_format($achieveBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtMarch) ? number_format(0,2) : number_format($achieveBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtApril) ? number_format(0,2) : number_format($achieveBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtMay) ? number_format(0,2) : number_format($achieveBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtJune) ? number_format(0,2) : number_format($achieveBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtJuly) ? number_format(0,2) : number_format($achieveBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtAugust) ? number_format(0,2) : number_format($achieveBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtSeptember) ? number_format(0,2) : number_format($achieveBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtOctober) ? number_format(0,2) : number_format($achieveBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtNovember) ? number_format(0,2) : number_format($achieveBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveBahtDecember) ? number_format(0,2) : number_format($achieveBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveBahtTotal) ? number_format(0,2) : number_format($achieveBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtJanuary) ? number_format(0,2) : number_format($growthBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtFebruary) ? number_format(0,2) : number_format($growthBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtMarch) ? number_format(0,2) : number_format($growthBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtApril) ? number_format(0,2) : number_format($growthBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtMay) ? number_format(0,2) : number_format($growthBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtJune) ? number_format(0,2) : number_format($growthBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtJuly) ? number_format(0,2) : number_format($growthBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtAugust) ? number_format(0,2) : number_format($growthBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtSeptember) ? number_format(0,2) : number_format($growthBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtOctober) ? number_format(0,2) : number_format($growthBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtNovember) ? number_format(0,2) : number_format($growthBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthBahtDecember) ? number_format(0,2) : number_format($growthBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthBahtTotal) ? number_format(0,2) : number_format($growthBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">AMB (UNIT)</th>
                    <th style="text-align:center;">January</th>
                    <th style="text-align:center;">February</th>
                    <th style="text-align:center;">March</th>
                    <th style="text-align:center;">April</th>
                    <th style="text-align:center;">May</th>
                    <th style="text-align:center;">June</th>
                    <th style="text-align:center;">July</th>
                    <th style="text-align:center;">August</th>
                    <th style="text-align:center;">September</th>
                    <th style="text-align:center;">October</th>
                    <th style="text-align:center;">November</th>
                    <th style="text-align:center;">December</th>
                    <th style="text-align:center;">Total</th>
                </tr>                               
            </thead>
            <tbody>     
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["year"]}}</b></td>
                    <td id="UnitActualNow1" style="font-size: 13px; text-align: right;">{{ number_format($currUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 13px; text-align: right;">{{ number_format($currUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 13px; text-align: right;">{{ number_format($currUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 13px; text-align: right;">{{ number_format($currUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 13px; text-align: right;">{{ number_format($currUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 13px; text-align: right;">{{ number_format($currUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 13px; text-align: right;">{{ number_format($currUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 13px; text-align: right;">{{ number_format($currUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 13px; text-align: right;">{{ number_format($currUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 13px; text-align: right;">{{ number_format($currUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 13px; text-align: right;">{{ number_format($currUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 13px; text-align: right;">{{ number_format($currUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNow1" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit01 }}</td>
                    <td id="UnitTargetNow2" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit02 }}</td>
                    <td id="UnitTargetNow3" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit03 }}</td>
                    <td id="UnitTargetNow4" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit04 }}</td>
                    <td id="UnitTargetNow5" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit05 }}</td>
                    <td id="UnitTargetNow6" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit06 }}</td>
                    <td id="UnitTargetNow7" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit07 }}</td>
                    <td id="UnitTargetNow8" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit08 }}</td>
                    <td id="UnitTargetNow9" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit09 }}</td>
                    <td id="UnitTargetNow10" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit10 }}</td>
                    <td id="UnitTargetNow11" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit11 }}</td>
                    <td id="UnitTargetNow12" style="font-size: 13px; text-align: right;">{{ $targetData[0]->Unit12 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitJanuary) ? number_format(0,2) : number_format($achieveUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitFebruary) ? number_format(0,2) : number_format($achieveUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitMarch) ? number_format(0,2) : number_format($achieveUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitApril) ? number_format(0,2) : number_format($achieveUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitMay) ? number_format(0,2) : number_format($achieveUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitJune) ? number_format(0,2) : number_format($achieveUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitJuly) ? number_format(0,2) : number_format($achieveUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitAugust) ? number_format(0,2) : number_format($achieveUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitSeptember) ? number_format(0,2) : number_format($achieveUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitOctober) ? number_format(0,2) : number_format($achieveUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitNovember) ? number_format(0,2) : number_format($achieveUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveUnitDecember) ? number_format(0,2) : number_format($achieveUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveUnitTotal) ? number_format(0,2) : number_format($achieveUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 13px; text-align: right;">{{ number_format($oldUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitJanuary) ? number_format(0,2) : number_format($growthUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitFebruary) ? number_format(0,2) : number_format($growthUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitMarch) ? number_format(0,2) : number_format($growthUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitApril) ? number_format(0,2) : number_format($growthUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitMay) ? number_format(0,2) : number_format($growthUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitJune) ? number_format(0,2) : number_format($growthUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitJuly) ? number_format(0,2) : number_format($growthUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitAugust) ? number_format(0,2) : number_format($growthUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitSeptember) ? number_format(0,2) : number_format($growthUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitOctober) ? number_format(0,2) : number_format($growthUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitNovember) ? number_format(0,2) : number_format($growthUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 13px; text-align: right;">{{ (is_nan($growthUnitDecember) ? number_format(0,2) : number_format($growthUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthUnitTotal) ? number_format(0,2) : number_format($growthUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>          
    </div>   

</body>
</html>

           