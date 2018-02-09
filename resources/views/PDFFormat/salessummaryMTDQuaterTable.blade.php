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

    <h4><strong> MTD Sales Summary Report (AMB,MCB) : Quater of {{$data["year"]}}</strong></h4>        

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

        $groupedCurrYear = array_group_by($currYearData, "ItemGroupShort");
        $groupedOldYear = array_group_by($oldYearData, "ItemGroupShort");

        if ($targetData[0]->ItemGroup) {
            $targetAMB = $targetData[0];
            $targetMCB = $targetData[1];
        } else {
            $targetMCB = $targetData[0];
            $targetAMB = $targetData[1];
        }

        $currAMBTotalBaht = 0;
        $currAMBTotalUnit = 0;
        $oldAMBTotalBaht = 0;
        $oldAMBTotalUnit = 0;
        $currAMBUnitQ1 = 0;
        $currAMBBahtQ1 = 0;
        $currAMBUnitQ2 = 0;
        $currAMBBahtQ2 = 0;
        $currAMBUnitQ3 = 0;
        $currAMBBahtQ3 = 0;
        $currAMBUnitQ4 = 0;
        $currAMBBahtQ4 = 0;
        $oldAMBUnitQ1 = 0;
        $oldAMBBahtQ1 = 0;
        $oldAMBUnitQ2 = 0;
        $oldAMBBahtQ2 = 0;
        $oldAMBUnitQ3 = 0;
        $oldAMBBahtQ3 = 0;
        $oldAMBUnitQ4 = 0;
        $oldAMBBahtQ4 = 0;
        $achieveAMBBahtQ1 = 0;
        $achieveAMBUnitQ1 = 0;
        $achieveAMBBahtQ2 = 0;
        $achieveAMBUnitQ2 = 0;
        $achieveAMBBahtQ3 = 0;
        $achieveAMBUnitQ3 = 0;
        $achieveAMBBahtQ4 = 0;
        $achieveAMBUnitQ4 = 0;
        $growthAMBBahtQ1 = 0;
        $growthAMBUnitQ1 = 0;
        $growthAMBBahtQ2 = 0;
        $growthAMBUnitQ2 = 0;
        $growthAMBBahtQ3 = 0;
        $growthAMBUnitQ3 = 0;
        $growthAMBBahtQ4 = 0;
        $growthAMBUnitQ4 = 0;
        $currMCBTotalBaht = 0;
        $currMCBTotalUnit = 0;
        $oldMCBTotalBaht = 0;
        $oldMCBTotalUnit = 0;
        $currMCBUnitQ1 = 0;
        $currMCBBahtQ1 = 0;
        $currMCBUnitQ2 = 0;
        $currMCBBahtQ2 = 0;
        $currMCBUnitQ3 = 0;
        $currMCBBahtQ3 = 0;
        $currMCBUnitQ4 = 0;
        $currMCBBahtQ4 = 0;
        $oldMCBUnitQ1 = 0;
        $oldMCBBahtQ1 = 0;
        $oldMCBUnitQ2 = 0;
        $oldMCBBahtQ2 = 0;
        $oldMCBUnitQ3 = 0;
        $oldMCBBahtQ3 = 0;
        $oldMCBUnitQ4 = 0;
        $oldMCBBahtQ4 = 0;
        $achieveMCBBahtQ1 = 0;
        $achieveMCBUnitQ1 = 0;
        $achieveMCBBahtQ2 = 0;
        $achieveMCBUnitQ2 = 0;
        $achieveMCBBahtQ3 = 0;
        $achieveMCBUnitQ3 = 0;
        $achieveMCBBahtQ4 = 0;
        $achieveMCBUnitQ4 = 0;
        $growthMCBBahtQ1 = 0;
        $growthMCBUnitQ1 = 0;
        $growthMCBBahtQ2 = 0;
        $growthMCBUnitQ2 = 0;
        $growthMCBBahtQ3 = 0;
        $growthMCBUnitQ3 = 0;
        $growthMCBBahtQ4 = 0;
        $growthMCBUnitQ4 = 0;

        @endphp

        @foreach ($groupedCurrYear['AMB'] as $Item)             
            @php
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $currAMBUnitQ1+= $Item->Quantity;
                $currAMBBahtQ1+= $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $currAMBUnitQ2 += $Item->Quantity;
                $currAMBBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $currAMBUnitQ3 += $Item->Quantity;
                $currAMBBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $currAMBUnitQ4 += $Item->Quantity;
                $currAMBBahtQ4 += $Item->Total;
            } 

            $currAMBTotalBaht += $Item->Total;
            $currAMBTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach

        @foreach ($groupedCurrYear['MCB'] as $Item)             
            @php
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $currMCBUnitQ1+= $Item->Quantity;
                $currMCBBahtQ1+= $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $currMCBUnitQ2 += $Item->Quantity;
                $currMCBBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $currMCBUnitQ3 += $Item->Quantity;
                $currMCBBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $currMCBUnitQ4 += $Item->Quantity;
                $currMCBBahtQ4 += $Item->Total;
            } 

            $currMCBTotalBaht += $Item->Total;
            $currMCBTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach

        @foreach ($groupedOldYear['AMB'] as $Item)             
            @php     
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $oldAMBUnitQ1 += $Item->Quantity;
                $oldAMBBahtQ1 += $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $oldAMBUnitQ2 += $Item->Quantity;
                $oldAMBBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $oldAMBUnitQ3 += $Item->Quantity;
                $oldAMBBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $oldAMBUnitQ4 += $Item->Quantity;
                $oldAMBBahtQ4 += $Item->Total;
            } 

            $oldAMBTotalBaht += $Item->Total;
            $oldAMBTotalUnit += $Item->Quantity;     
            @endphp  
        @endforeach

        @foreach ($groupedOldYear['MCB'] as $Item)             
            @php     
            if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                $oldMCBUnitQ1 += $Item->Quantity;
                $oldMCBBahtQ1 += $Item->Total;
            } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                $oldMCBUnitQ2 += $Item->Quantity;
                $oldMCBBahtQ2 += $Item->Total;
            } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                $oldMCBUnitQ3 += $Item->Quantity;
                $oldMCBBahtQ3 += $Item->Total;
            } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                $oldMCBUnitQ4 += $Item->Quantity;
                $oldMCBBahtQ4 += $Item->Total;
            } 

            $oldMCBTotalBaht += $Item->Total;
            $oldMCBTotalUnit += $Item->Quantity;     
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

            $currTotalBaht = $currAMBTotalBaht + $currMCBTotalBaht;
            $currTotalUnit = $currAMBTotalUnit + $currMCBTotalUnit;
            $oldTotalBaht = $oldAMBTotalBaht + $oldMCBTotalBaht;
            $oldTotalUnit = $oldAMBTotalUnit + $oldMCBTotalUnit;       
            $currUnitQ1 = $currAMBUnitQ1 + $currMCBUnitQ1;
            $currBahtQ1 = $currAMBBahtQ1 + $currMCBBahtQ1;
            $currUnitQ2 = $currAMBUnitQ2 + $currMCBUnitQ2;
            $currBahtQ2 = $currAMBBahtQ2 + $currMCBBahtQ2;
            $currUnitQ3 = $currAMBUnitQ3 + $currMCBUnitQ3;
            $currBahtQ3 = $currAMBBahtQ3 + $currMCBBahtQ3;
            $currUnitQ4 = $currAMBUnitQ4 + $currMCBUnitQ4;
            $currBahtQ4 = $currAMBBahtQ4 + $currMCBBahtQ4;        
            $oldUnitQ1 = $oldAMBUnitQ1 + $oldMCBUnitQ1;
            $oldBahtQ1 = $oldAMBBahtQ1 + $oldMCBBahtQ1;
            $oldUnitQ2 = $oldAMBUnitQ2 + $oldMCBUnitQ2;
            $oldBahtQ2 = $oldAMBBahtQ2 + $oldMCBBahtQ2;
            $oldUnitQ3 = $oldAMBUnitQ3 + $oldMCBUnitQ3;
            $oldBahtQ3 = $oldAMBBahtQ3 + $oldMCBBahtQ3;
            $oldUnitQ4 = $oldAMBUnitQ4 + $oldMCBUnitQ4;
            $oldBahtQ4 = $oldAMBBahtQ4 + $oldMCBBahtQ4;
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

            $totalBahtTarget = getAmount($targetAMB->AmtQ1) + getAmount($targetAMB->AmtQ2) + getAmount($targetAMB->AmtQ3) + getAmount($targetAMB->AmtQ4) + getAmount($targetMCB->AmtQ1) + getAmount($targetMCB->AmtQ2) + getAmount($targetMCB->AmtQ3) + getAmount($targetMCB->AmtQ4);
            $totalUnitTarget = getAmount($targetAMB->UnitQ1) + getAmount($targetAMB->UnitQ2) + getAmount($targetAMB->UnitQ3) + getAmount($targetAMB->UnitQ4) + getAmount($targetMCB->UnitQ1) + getAmount($targetMCB->UnitQ2) + getAmount($targetMCB->UnitQ3) + getAmount($targetMCB->UnitQ4);
            
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


            $growthAMBBahtQ1 = (($currAMBBahtQ1 - $oldAMBBahtQ1) * 100) / calZero($oldAMBBahtQ1);
            $growthAMBBahtQ2 = (($currAMBBahtQ2 - $oldAMBBahtQ2) * 100) / calZero($oldAMBBahtQ2);
            $growthAMBBahtQ3 = (($currAMBBahtQ3 - $oldAMBBahtQ3) * 100) / calZero($oldAMBBahtQ3);
            $growthAMBBahtQ4 = (($currAMBBahtQ4 - $oldAMBBahtQ4) * 100) / calZero($oldAMBBahtQ4);
            $growthAMBBahtTotal = (($currAMBTotalBaht - $oldAMBTotalBaht) * 100) / calZero($oldAMBTotalBaht);

            $growthAMBUnitQ1 = (($currAMBUnitQ1 - $oldAMBUnitQ1) * 100) / calZero($oldAMBUnitQ1);
            $growthAMBUnitQ2 = (($currAMBUnitQ2 - $oldAMBUnitQ2) * 100) / calZero($oldAMBUnitQ2);
            $growthAMBUnitQ3 = (($currAMBUnitQ3 - $oldAMBUnitQ3) * 100) / calZero($oldAMBUnitQ3);
            $growthAMBUnitQ4 = (($currAMBUnitQ4 - $oldAMBUnitQ4) * 100) / calZero($oldAMBUnitQ4);
            $growthAMBUnitTotal = (($currAMBTotalUnit - $oldAMBTotalUnit) * 100) / calZero($oldAMBTotalUnit);

            $totalAMBBahtTarget = getAmount($targetAMB->AmtQ1) + getAmount($targetAMB->AmtQ2) + getAmount($targetAMB-> AmtQ3) + getAmount($targetAMB->AmtQ4);
            $totalAMBUnitTarget = getAmount($targetAMB->UnitQ1) + getAmount($targetAMB->UnitQ2) + getAmount($targetAMB-> UnitQ3) + getAmount($targetAMB->UnitQ4);
          
            $achieveAMBBahtQ1 = ($currAMBBahtQ1 * 100) /  calZero(getAmount($targetAMB->AmtQ1));
            $achieveAMBBahtQ2 = ($currAMBBahtQ2 * 100) /  calZero(getAmount($targetAMB->AmtQ2));
            $achieveAMBBahtQ3 = ($currAMBBahtQ3 * 100) /  calZero(getAmount($targetAMB->AmtQ3));
            $achieveAMBBahtQ4 = ($currAMBBahtQ4 * 100) /  calZero(getAmount($targetAMB->AmtQ4));
            $achieveAMBBahtTotal = ($currAMBTotalBaht * 100) / calZero($totalAMBBahtTarget);
            
            $achieveAMBUnitQ1 = ($currAMBUnitQ1 * 100) /  calZero(getAmount($targetAMB->UnitQ1));
            $achieveAMBUnitQ2 = ($currAMBUnitQ2 * 100) /  calZero(getAmount($targetAMB->UnitQ2));
            $achieveAMBUnitQ3 = ($currAMBUnitQ3 * 100) /  calZero(getAmount($targetAMB->UnitQ3));
            $achieveAMBUnitQ4 = ($currAMBUnitQ4 * 100) /  calZero(getAmount($targetAMB->UnitQ4));
            $achieveAMBUnitTotal = ($currAMBTotalUnit * 100) / calZero($totalAMBUnitTarget);


            $growthMCBBahtQ1 = (($currMCBBahtQ1 - $oldMCBBahtQ1) * 100) / calZero($oldMCBBahtQ1);
            $growthMCBBahtQ2 = (($currMCBBahtQ2 - $oldMCBBahtQ2) * 100) / calZero($oldMCBBahtQ2);
            $growthMCBBahtQ3 = (($currMCBBahtQ3 - $oldMCBBahtQ3) * 100) / calZero($oldMCBBahtQ3);
            $growthMCBBahtQ4 = (($currMCBBahtQ4 - $oldMCBBahtQ4) * 100) / calZero($oldMCBBahtQ4);
            $growthMCBBahtTotal = (($currMCBTotalBaht - $oldMCBTotalBaht) * 100) / calZero($oldMCBTotalBaht);

            $growthMCBUnitQ1 = (($currMCBUnitQ1 - $oldMCBUnitQ1) * 100) / calZero($oldMCBUnitQ1);
            $growthMCBUnitQ2 = (($currMCBUnitQ2 - $oldMCBUnitQ2) * 100) / calZero($oldMCBUnitQ2);
            $growthMCBUnitQ3 = (($currMCBUnitQ3 - $oldMCBUnitQ3) * 100) / calZero($oldMCBUnitQ3);
            $growthMCBUnitQ4 = (($currMCBUnitQ4 - $oldMCBUnitQ4) * 100) / calZero($oldMCBUnitQ4);
            $growthMCBUnitTotal = (($currMCBTotalUnit - $oldMCBTotalUnit) * 100) / calZero($oldMCBTotalUnit);

            $totalMCBBahtTarget = getAmount($targetMCB->AmtQ1) + getAmount($targetMCB->AmtQ2) + getAmount($targetMCB->AmtQ3) + getAmount($targetMCB->AmtQ4);
            $totalMCBUnitTarget = getAmount($targetMCB->UnitQ1) + getAmount($targetMCB->UnitQ2) + getAmount($targetMCB->UnitQ3) + getAmount($targetMCB->UnitQ4);
          
            $achieveMCBBahtQ1 = ($currMCBBahtQ1 * 100) /  calZero(getAmount($targetMCB->AmtQ1));
            $achieveMCBBahtQ2 = ($currMCBBahtQ2 * 100) /  calZero(getAmount($targetMCB->AmtQ2));
            $achieveMCBBahtQ3 = ($currMCBBahtQ3 * 100) /  calZero(getAmount($targetMCB->AmtQ3));
            $achieveMCBBahtQ4 = ($currMCBBahtQ4 * 100) /  calZero(getAmount($targetMCB->AmtQ4));
            $achieveMCBBahtTotal = ($currMCBTotalBaht * 100) / calZero($totalMCBBahtTarget);
            
            $achieveMCBUnitQ1 = ($currMCBUnitQ1 * 100) /  calZero(getAmount($targetMCB->UnitQ1));
            $achieveMCBUnitQ2 = ($currMCBUnitQ2 * 100) /  calZero(getAmount($targetMCB->UnitQ2));
            $achieveMCBUnitQ3 = ($currMCBUnitQ3 * 100) /  calZero(getAmount($targetMCB->UnitQ3));
            $achieveMCBUnitQ4 = ($currMCBUnitQ4 * 100) /  calZero(getAmount($targetMCB->UnitQ4));
            $achieveMCBUnitTotal = ($currMCBTotalUnit * 100) / calZero($totalMCBUnitTarget);

        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">AMB,MCB (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ1) + getAmount($targetMCB->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ2) + getAmount($targetMCB->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ3) + getAmount($targetMCB->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ4) + getAmount($targetMCB->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveBahtQ1) ? number_format(0,2) : number_format($achieveBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveBahtQ2) ? number_format(0,2) : number_format($achieveBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveBahtQ3) ? number_format(0,2) : number_format($achieveBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveBahtQ4) ? number_format(0,2) : number_format($achieveBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveBahtTotal) ? number_format(0,2) : number_format($achieveBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthBahtQ1) ? number_format(0,2) : number_format($growthBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthBahtQ2) ? number_format(0,2) : number_format($growthBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthBahtQ3) ? number_format(0,2) : number_format($growthBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthBahtQ4) ? number_format(0,2) : number_format($growthBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthBahtTotal) ? number_format(0,2) : number_format($growthBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">AMB,MCB (UNIT)</th>
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
                    <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->UnitQ1) + getAmount($targetMCB->UnitQ1),2) }}</td>
                    <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->UnitQ2) + getAmount($targetMCB->UnitQ2),2) }}</td>
                    <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->UnitQ3) + getAmount($targetMCB->UnitQ3),2) }}</td>
                    <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->UnitQ4) + getAmount($targetMCB->UnitQ4),2) }}</td>
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

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">  
        <h4><strong> MTD Sales Summary Report (AMB) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">AMB (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currAMBBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currAMBBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currAMBBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currAMBBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currAMBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetAMB->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBBahtQ1) ? number_format(0,2) : number_format($achieveAMBBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBBahtQ2) ? number_format(0,2) : number_format($achieveAMBBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBBahtQ3) ? number_format(0,2) : number_format($achieveAMBBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBBahtQ4) ? number_format(0,2) : number_format($achieveAMBBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveAMBBahtTotal) ? number_format(0,2) : number_format($achieveAMBBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldAMBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBBahtQ1) ? number_format(0,2) : number_format($growthAMBBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBBahtQ2) ? number_format(0,2) : number_format($growthAMBBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBBahtQ3) ? number_format(0,2) : number_format($growthAMBBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBBahtQ4) ? number_format(0,2) : number_format($growthAMBBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthAMBBahtTotal) ? number_format(0,2) : number_format($growthAMBBahtTotal,2))."%" }}</td>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currAMBUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currAMBUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currAMBUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currAMBUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currAMBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetAMB->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetAMB->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetAMB->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetAMB->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBUnitQ1) ? number_format(0,2) : number_format($achieveAMBUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBUnitQ2) ? number_format(0,2) : number_format($achieveAMBUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBUnitQ3) ? number_format(0,2) : number_format($achieveAMBUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveAMBUnitQ4) ? number_format(0,2) : number_format($achieveAMBUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveAMBUnitTotal) ? number_format(0,2) : number_format($achieveAMBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldAMBUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldAMBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBUnitQ1) ? number_format(0,2) : number_format($growthAMBUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBUnitQ2) ? number_format(0,2) : number_format($growthAMBUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBUnitQ3) ? number_format(0,2) : number_format($growthAMBUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthAMBUnitQ4) ? number_format(0,2) : number_format($growthAMBUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthAMBUnitTotal) ? number_format(0,2) : number_format($growthAMBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
    <h4><strong> MTD Sales Summary Report (MCB) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">MCB (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currMCBBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currMCBBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currMCBBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currMCBBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currMCBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetMCB->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetMCB->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetMCB->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetMCB->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBBahtQ1) ? number_format(0,2) : number_format($achieveMCBBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBBahtQ2) ? number_format(0,2) : number_format($achieveMCBBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBBahtQ3) ? number_format(0,2) : number_format($achieveMCBBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBBahtQ4) ? number_format(0,2) : number_format($achieveMCBBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveMCBBahtTotal) ? number_format(0,2) : number_format($achieveMCBBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldMCBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBBahtQ1) ? number_format(0,2) : number_format($growthMCBBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBBahtQ2) ? number_format(0,2) : number_format($growthMCBBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBBahtQ3) ? number_format(0,2) : number_format($growthMCBBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBBahtQ4) ? number_format(0,2) : number_format($growthMCBBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthMCBBahtTotal) ? number_format(0,2) : number_format($growthMCBBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">MCB (UNIT)</th>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currMCBUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currMCBUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currMCBUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currMCBUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currMCBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetMCB->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetMCB->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetMCB->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetMCB->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBUnitQ1) ? number_format(0,2) : number_format($achieveMCBUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBUnitQ2) ? number_format(0,2) : number_format($achieveMCBUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBUnitQ3) ? number_format(0,2) : number_format($achieveMCBUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveMCBUnitQ4) ? number_format(0,2) : number_format($achieveMCBUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveMCBUnitTotal) ? number_format(0,2) : number_format($achieveMCBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldMCBUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldMCBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBUnitQ1) ? number_format(0,2) : number_format($growthMCBUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBUnitQ2) ? number_format(0,2) : number_format($growthMCBUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBUnitQ3) ? number_format(0,2) : number_format($growthMCBUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthMCBUnitQ4) ? number_format(0,2) : number_format($growthMCBUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthMCBUnitTotal) ? number_format(0,2) : number_format($growthMCBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>

</body>
</html>

           