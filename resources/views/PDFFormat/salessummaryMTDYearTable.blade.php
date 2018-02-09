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
        $currAMBUnitJanuary = 0;
        $currAMBUnitFebruary = 0;
        $currAMBUnitMarch = 0;
        $currAMBUnitApril = 0;
        $currAMBUnitMay = 0;
        $currAMBUnitJune = 0;
        $currAMBUnitJuly = 0;
        $currAMBUnitAugust = 0;
        $currAMBUnitSeptember = 0;
        $currAMBUnitOctober = 0;
        $currAMBUnitNovember = 0;
        $currAMBUnitDecember = 0;
        $currAMBBahtJanuary = 0;
        $currAMBBahtFebruary = 0;
        $currAMBBahtMarch = 0;
        $currAMBBahtApril = 0;
        $currAMBBahtMay = 0;
        $currAMBBahtJune = 0;
        $currAMBBahtJuly = 0;
        $currAMBBahtAugust = 0;
        $currAMBBahtSeptember = 0;
        $currAMBBahtOctober = 0;
        $currAMBBahtNovember = 0;
        $currAMBBahtDecember = 0;
        $currAMBUnitQ1 = 0;
        $currAMBBahtQ1 = 0;
        $currAMBUnitQ2 = 0;
        $currAMBBahtQ2 = 0;
        $currAMBUnitQ3 = 0;
        $currAMBBahtQ3 = 0;
        $currAMBUnitQ4 = 0;
        $currAMBBahtQ4 = 0;
        $oldAMBUnitJanuary = 0;
        $oldAMBUnitFebruary = 0;
        $oldAMBUnitMarch = 0;
        $oldAMBUnitApril = 0;
        $oldAMBUnitMay = 0;
        $oldAMBUnitJune = 0;
        $oldAMBUnitJuly = 0;
        $oldAMBUnitAugust = 0;
        $oldAMBUnitSeptember = 0;
        $oldAMBUnitOctober = 0;
        $oldAMBUnitNovember = 0;
        $oldAMBUnitDecember = 0;
        $oldAMBBahtJanuary = 0;
        $oldAMBBahtFebruary = 0;
        $oldAMBBahtMarch = 0;
        $oldAMBBahtApril = 0;
        $oldAMBBahtMay = 0;
        $oldAMBBahtJune = 0;
        $oldAMBBahtJuly = 0;
        $oldAMBBahtAugust = 0;
        $oldAMBBahtSeptember = 0;
        $oldAMBBahtOctober = 0;
        $oldAMBBahtNovember = 0;
        $oldAMBBahtDecember = 0;
        $oldAMBUnitQ1 = 0;
        $oldAMBBahtQ1 = 0;
        $oldAMBUnitQ2 = 0;
        $oldAMBBahtQ2 = 0;
        $oldAMBUnitQ3 = 0;
        $oldAMBBahtQ3 = 0;
        $oldAMBUnitQ4 = 0;
        $oldAMBBahtQ4 = 0;
        $achieveAMBBahtJanuary = 0;
        $achieveAMBBahtFebruary = 0;
        $achieveAMBBahtMarch = 0;
        $achieveAMBBahtApril = 0;
        $achieveAMBBahtMay = 0;
        $achieveAMBBahtJune = 0;
        $achieveAMBBahtJuly = 0;
        $achieveAMBBahtAugust = 0;
        $achieveAMBBahtSeptember = 0;
        $achieveAMBBahtOctober = 0;
        $achieveAMBBahtNovember = 0;
        $achieveAMBBahtDecember = 0;
        $achieveAMBBahtQ1 = 0;
        $achieveAMBUnitQ1 = 0;
        $achieveAMBBahtQ2 = 0;
        $achieveAMBUnitQ2 = 0;
        $achieveAMBBahtQ3 = 0;
        $achieveAMBUnitQ3 = 0;
        $achieveAMBBahtQ4 = 0;
        $achieveAMBUnitQ4 = 0;
        $growthAMBBahtJanuary = 0;
        $growthAMBBahtFebruary = 0;
        $growthAMBBahtMarch = 0;
        $growthAMBBahtApril = 0;
        $growthAMBBahtMay = 0;
        $growthAMBBahtJune = 0;
        $growthAMBBahtJuly = 0;
        $growthAMBBahtAugust = 0;
        $growthAMBBahtSeptember = 0;
        $growthAMBBahtOctober = 0;
        $growthAMBBahtNovember = 0;
        $growthAMBBahtDecember = 0;
        $achieveAMBUnitJanuary = 0;
        $achieveAMBUnitFebruary = 0;
        $achieveAMBUnitMarch = 0;
        $achieveAMBUnitApril = 0;
        $achieveAMBUnitMay = 0;
        $achieveAMBUnitJune = 0;
        $achieveAMBUnitJuly = 0;
        $achieveAMBUnitAugust = 0;
        $achieveAMBUnitSeptember = 0;
        $achieveAMBUnitOctober = 0;
        $achieveAMBUnitNovember = 0;
        $achieveAMBUnitDecember = 0;
        $growthAMBUnitJanuary = 0;
        $growthAMBUnitFebruary = 0;
        $growthAMBUnitMarch = 0;
        $growthAMBUnitApril = 0;
        $growthAMBUnitMay = 0;
        $growthAMBUnitJune = 0;
        $growthAMBUnitJuly = 0;
        $growthAMBUnitAugust = 0;
        $growthAMBUnitSeptember = 0;
        $growthAMBUnitOctober = 0;
        $growthAMBUnitNovember = 0;
        $growthAMBUnitDecember = 0;
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
        $currMCBUnitJanuary = 0;
        $currMCBUnitFebruary = 0;
        $currMCBUnitMarch = 0;
        $currMCBUnitApril = 0;
        $currMCBUnitMay = 0;
        $currMCBUnitJune = 0;
        $currMCBUnitJuly = 0;
        $currMCBUnitAugust = 0;
        $currMCBUnitSeptember = 0;
        $currMCBUnitOctober = 0;
        $currMCBUnitNovember = 0;
        $currMCBUnitDecember = 0;
        $currMCBBahtJanuary = 0;
        $currMCBBahtFebruary = 0;
        $currMCBBahtMarch = 0;
        $currMCBBahtApril = 0;
        $currMCBBahtMay = 0;
        $currMCBBahtJune = 0;
        $currMCBBahtJuly = 0;
        $currMCBBahtAugust = 0;
        $currMCBBahtSeptember = 0;
        $currMCBBahtOctober = 0;
        $currMCBBahtNovember = 0;
        $currMCBBahtDecember = 0;
        $currMCBUnitQ1 = 0;
        $currMCBBahtQ1 = 0;
        $currMCBUnitQ2 = 0;
        $currMCBBahtQ2 = 0;
        $currMCBUnitQ3 = 0;
        $currMCBBahtQ3 = 0;
        $currMCBUnitQ4 = 0;
        $currMCBBahtQ4 = 0;
        $oldMCBUnitJanuary = 0;
        $oldMCBUnitFebruary = 0;
        $oldMCBUnitMarch = 0;
        $oldMCBUnitApril = 0;
        $oldMCBUnitMay = 0;
        $oldMCBUnitJune = 0;
        $oldMCBUnitJuly = 0;
        $oldMCBUnitAugust = 0;
        $oldMCBUnitSeptember = 0;
        $oldMCBUnitOctober = 0;
        $oldMCBUnitNovember = 0;
        $oldMCBUnitDecember = 0;
        $oldMCBBahtJanuary = 0;
        $oldMCBBahtFebruary = 0;
        $oldMCBBahtMarch = 0;
        $oldMCBBahtApril = 0;
        $oldMCBBahtMay = 0;
        $oldMCBBahtJune = 0;
        $oldMCBBahtJuly = 0;
        $oldMCBBahtAugust = 0;
        $oldMCBBahtSeptember = 0;
        $oldMCBBahtOctober = 0;
        $oldMCBBahtNovember = 0;
        $oldMCBBahtDecember = 0;
        $oldMCBUnitQ1 = 0;
        $oldMCBBahtQ1 = 0;
        $oldMCBUnitQ2 = 0;
        $oldMCBBahtQ2 = 0;
        $oldMCBUnitQ3 = 0;
        $oldMCBBahtQ3 = 0;
        $oldMCBUnitQ4 = 0;
        $oldMCBBahtQ4 = 0;
        $achieveMCBBahtJanuary = 0;
        $achieveMCBBahtFebruary = 0;
        $achieveMCBBahtMarch = 0;
        $achieveMCBBahtApril = 0;
        $achieveMCBBahtMay = 0;
        $achieveMCBBahtJune = 0;
        $achieveMCBBahtJuly = 0;
        $achieveMCBBahtAugust = 0;
        $achieveMCBBahtSeptember = 0;
        $achieveMCBBahtOctober = 0;
        $achieveMCBBahtNovember = 0;
        $achieveMCBBahtDecember = 0;
        $achieveMCBBahtQ1 = 0;
        $achieveMCBUnitQ1 = 0;
        $achieveMCBBahtQ2 = 0;
        $achieveMCBUnitQ2 = 0;
        $achieveMCBBahtQ3 = 0;
        $achieveMCBUnitQ3 = 0;
        $achieveMCBBahtQ4 = 0;
        $achieveMCBUnitQ4 = 0;
        $growthMCBBahtJanuary = 0;
        $growthMCBBahtFebruary = 0;
        $growthMCBBahtMarch = 0;
        $growthMCBBahtApril = 0;
        $growthMCBBahtMay = 0;
        $growthMCBBahtJune = 0;
        $growthMCBBahtJuly = 0;
        $growthMCBBahtAugust = 0;
        $growthMCBBahtSeptember = 0;
        $growthMCBBahtOctober = 0;
        $growthMCBBahtNovember = 0;
        $growthMCBBahtDecember = 0;
        $achieveMCBUnitJanuary = 0;
        $achieveMCBUnitFebruary = 0;
        $achieveMCBUnitMarch = 0;
        $achieveMCBUnitApril = 0;
        $achieveMCBUnitMay = 0;
        $achieveMCBUnitJune = 0;
        $achieveMCBUnitJuly = 0;
        $achieveMCBUnitAugust = 0;
        $achieveMCBUnitSeptember = 0;
        $achieveMCBUnitOctober = 0;
        $achieveMCBUnitNovember = 0;
        $achieveMCBUnitDecember = 0;
        $growthMCBUnitJanuary = 0;
        $growthMCBUnitFebruary = 0;
        $growthMCBUnitMarch = 0;
        $growthMCBUnitApril = 0;
        $growthMCBUnitMay = 0;
        $growthMCBUnitJune = 0;
        $growthMCBUnitJuly = 0;
        $growthMCBUnitAugust = 0;
        $growthMCBUnitSeptember = 0;
        $growthMCBUnitOctober = 0;
        $growthMCBUnitNovember = 0;
        $growthMCBUnitDecember = 0;
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
            if ($Item->DocMonth == '1') {
                $currAMBUnitJanuary += $Item->Quantity;
                $currAMBBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $currAMBUnitFebruary += $Item->Quantity;
                $currAMBBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $currAMBUnitMarch += $Item->Quantity;
                $currAMBBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $currAMBUnitApril += $Item->Quantity;
                $currAMBBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $currAMBUnitMay += $Item->Quantity;
                $currAMBBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $currAMBUnitJune += $Item->Quantity;
                $currAMBBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $currAMBUnitJuly += $Item->Quantity;
                $currAMBBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $currAMBUnitAugust += $Item->Quantity;
                $currAMBBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $currAMBUnitSeptember += $Item->Quantity;
                $currAMBBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $currAMBUnitOctober += $Item->Quantity;
                $currAMBBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $currAMBUnitNovember += $Item->Quantity;
                $currAMBBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $currAMBUnitDecember += $Item->Quantity;
                $currAMBBahtDecember += $Item->Total;
            }

            $currAMBTotalBaht += $Item->Total;
            $currAMBTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach

        @foreach ($groupedCurrYear['MCB'] as $Item)             
            @php
            if ($Item->DocMonth == '1') {
                $currMCBUnitJanuary += $Item->Quantity;
                $currMCBBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $currMCBUnitFebruary += $Item->Quantity;
                $currMCBBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $currMCBUnitMarch += $Item->Quantity;
                $currMCBBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $currMCBUnitApril += $Item->Quantity;
                $currMCBBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $currMCBUnitMay += $Item->Quantity;
                $currMCBBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $currMCBUnitJune += $Item->Quantity;
                $currMCBBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $currMCBUnitJuly += $Item->Quantity;
                $currMCBBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $currMCBUnitAugust += $Item->Quantity;
                $currMCBBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $currMCBUnitSeptember += $Item->Quantity;
                $currMCBBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $currMCBUnitOctober += $Item->Quantity;
                $currMCBBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $currMCBUnitNovember += $Item->Quantity;
                $currMCBBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $currMCBUnitDecember += $Item->Quantity;
                $currMCBBahtDecember += $Item->Total;
            }

            $currMCBTotalBaht += $Item->Total;
            $currMCBTotalUnit += $Item->Quantity;           
            @endphp  
        @endforeach  

        @foreach ($groupedOldYear['AMB'] as $Item)             
            @php     
            if ($Item->DocMonth == '1') {
                $oldAMBUnitJanuary += $Item->Quantity;
                $oldAMBBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $oldAMBUnitFebruary += $Item->Quantity;
                $oldAMBBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $oldAMBUnitMarch += $Item->Quantity;
                $oldAMBBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $oldAMBUnitApril += $Item->Quantity;
                $oldAMBBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $oldAMBUnitMay += $Item->Quantity;
                $oldAMBBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $oldAMBUnitJune += $Item->Quantity;
                $oldAMBBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $oldAMBUnitJuly += $Item->Quantity;
                $oldAMBBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $oldAMBUnitAugust += $Item->Quantity;
                $oldAMBBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $oldAMBUnitSeptember += $Item->Quantity;
                $oldAMBBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $oldAMBUnitOctober += $Item->Quantity;
                $oldAMBBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $oldAMBUnitNovember += $Item->Quantity;
                $oldAMBBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $oldAMBUnitDecember += $Item->Quantity;
                $oldAMBBahtDecember += $Item->Total;
            }

            $oldAMBTotalBaht += $Item->Total;
            $oldAMBTotalUnit += $Item->Quantity;     
            @endphp  
        @endforeach

        @foreach ($groupedOldYear['MCB'] as $Item)             
            @php     
            if ($Item->DocMonth == '1') {
                $oldMCBUnitJanuary += $Item->Quantity;
                $oldMCBBahtJanuary += $Item->Total;
            } else if ($Item->DocMonth == '2') {
                $oldMCBUnitFebruary += $Item->Quantity;
                $oldMCBBahtFebruary += $Item->Total;
            } else if ($Item->DocMonth == '3') {
                $oldMCBUnitMarch += $Item->Quantity;
                $oldMCBBahtMarch += $Item->Total;
            } else if ($Item->DocMonth == '4') {
                $oldMCBUnitApril += $Item->Quantity;
                $oldMCBBahtApril += $Item->Total;
            } else if ($Item->DocMonth == '5') {
                $oldMCBUnitMay += $Item->Quantity;
                $oldMCBBahtMay += $Item->Total;
            } else if ($Item->DocMonth == '6') {
                $oldMCBUnitJune += $Item->Quantity;
                $oldMCBBahtJune += $Item->Total;
            } else if ($Item->DocMonth == '7') {
                $oldMCBUnitJuly += $Item->Quantity;
                $oldMCBBahtJuly += $Item->Total;
            } else if ($Item->DocMonth == '8') {
                $oldMCBUnitAugust += $Item->Quantity;
                $oldMCBBahtAugust += $Item->Total;
            } else if ($Item->DocMonth == '9') {
                $oldMCBUnitSeptember += $Item->Quantity;
                $oldMCBBahtSeptember += $Item->Total;
            } else if ($Item->DocMonth == '10') {
                $oldMCBUnitOctober += $Item->Quantity;
                $oldMCBBahtOctober += $Item->Total;
            } else if ($Item->DocMonth == '11') {
                $oldMCBUnitNovember += $Item->Quantity;
                $oldMCBBahtNovember += $Item->Total;
            } else if ($Item->DocMonth == '12') {
                $oldMCBUnitDecember += $Item->Quantity;
                $oldMCBBahtDecember += $Item->Total;
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

        $growthAMBBahtJanuary = (($currAMBBahtJanuary - $oldAMBBahtJanuary) * 100) / calZero($oldAMBBahtJanuary);
        $growthAMBBahtFebruary = (($currAMBBahtFebruary - $oldAMBBahtFebruary) * 100) / calZero($oldAMBBahtFebruary);
        $growthAMBBahtMarch = (($currAMBBahtMarch - $oldAMBBahtMarch) * 100) / calZero($oldAMBBahtMarch);
        $growthAMBBahtApril = (($currAMBBahtApril - $oldAMBBahtApril) * 100) / calZero($oldAMBBahtApril);
        $growthAMBBahtMay = (($currAMBBahtMay - $oldAMBBahtMay) * 100) / calZero($oldAMBBahtMay);
        $growthAMBBahtJune = (($currAMBBahtJune - $oldAMBBahtJune) * 100) / calZero($oldAMBBahtJune);
        $growthAMBBahtJuly = (($currAMBBahtJuly - $oldAMBBahtJuly) * 100) / calZero($oldAMBBahtJuly);
        $growthAMBBahtAugust = (($currAMBBahtAugust - $oldAMBBahtAugust) * 100) / calZero($oldAMBBahtAugust);
        $growthAMBBahtSeptember = (($currAMBBahtSeptember - $oldAMBBahtSeptember) * 100) / calZero($oldAMBBahtSeptember);
        $growthAMBBahtOctober = (($currAMBBahtOctober - $oldAMBBahtOctober) * 100) / calZero($oldAMBBahtOctober);
        $growthAMBBahtNovember = (($currAMBBahtNovember - $oldAMBBahtNovember) * 100) / calZero($oldAMBBahtNovember);
        $growthAMBBahtDecember = (($currAMBBahtDecember - $oldAMBBahtDecember) * 100) / calZero($oldAMBBahtDecember);
        $growthAMBBahtTotal = (($currAMBTotalBaht - $oldAMBTotalBaht) * 100) / calZero($oldAMBTotalBaht);

        $growthMCBBahtJanuary = (($currMCBBahtJanuary - $oldMCBBahtJanuary) * 100) / calZero($oldMCBBahtJanuary);
        $growthMCBBahtFebruary = (($currMCBBahtFebruary - $oldMCBBahtFebruary) * 100) / calZero($oldMCBBahtFebruary);
        $growthMCBBahtMarch = (($currMCBBahtMarch - $oldMCBBahtMarch) * 100) / calZero($oldMCBBahtMarch);
        $growthMCBBahtApril = (($currMCBBahtApril - $oldMCBBahtApril) * 100) / calZero($oldMCBBahtApril);
        $growthMCBBahtMay = (($currMCBBahtMay - $oldMCBBahtMay) * 100) / calZero($oldMCBBahtMay);
        $growthMCBBahtJune = (($currMCBBahtJune - $oldMCBBahtJune) * 100) / calZero($oldMCBBahtJune);
        $growthMCBBahtJuly = (($currMCBBahtJuly - $oldMCBBahtJuly) * 100) / calZero($oldMCBBahtJuly);
        $growthMCBBahtAugust = (($currMCBBahtAugust - $oldMCBBahtAugust) * 100) / calZero($oldMCBBahtAugust);
        $growthMCBBahtSeptember = (($currMCBBahtSeptember - $oldMCBBahtSeptember) * 100) / calZero($oldMCBBahtSeptember);
        $growthMCBBahtOctober = (($currMCBBahtOctober - $oldMCBBahtOctober) * 100) / calZero($oldMCBBahtOctober);
        $growthMCBBahtNovember = (($currMCBBahtNovember - $oldMCBBahtNovember) * 100) / calZero($oldMCBBahtNovember);
        $growthMCBBahtDecember = (($currMCBBahtDecember - $oldMCBBahtDecember) * 100) / calZero($oldMCBBahtDecember);
        $growthMCBBahtTotal = (($currMCBTotalBaht - $oldMCBTotalBaht) * 100) / calZero($oldMCBTotalBaht);

        $growthAMBUnitJanuary = (($currAMBUnitJanuary - $oldAMBUnitJanuary) * 100) / calZero($oldAMBUnitJanuary);
        $growthAMBUnitFebruary = (($currAMBUnitFebruary - $oldAMBUnitFebruary) * 100) / calZero($oldAMBUnitFebruary);
        $growthAMBUnitMarch = (($currAMBUnitMarch - $oldAMBUnitMarch) * 100) / calZero($oldAMBUnitMarch);
        $growthAMBUnitApril = (($currAMBUnitApril - $oldAMBUnitApril) * 100) / calZero($oldAMBUnitApril);
        $growthAMBUnitMay = (($currAMBUnitMay - $oldAMBUnitMay) * 100) / calZero($oldAMBUnitMay);
        $growthAMBUnitJune = (($currAMBUnitJune - $oldAMBUnitJune) * 100) / calZero($oldAMBUnitJune);
        $growthAMBUnitJuly = (($currAMBUnitJuly - $oldAMBUnitJuly) * 100) / calZero($oldAMBUnitJuly);
        $growthAMBUnitAugust = (($currAMBUnitAugust - $oldAMBUnitAugust) * 100) / calZero($oldAMBUnitAugust);
        $growthAMBUnitSeptember = (($currAMBUnitSeptember - $oldAMBUnitSeptember) * 100) / calZero($oldAMBUnitSeptember);
        $growthAMBUnitOctober = (($currAMBUnitOctober - $oldAMBUnitOctober) * 100) / calZero($oldAMBUnitOctober);
        $growthAMBUnitNovember = (($currAMBUnitNovember - $oldAMBUnitNovember) * 100) / calZero($oldAMBUnitNovember);
        $growthAMBUnitDecember = (($currAMBUnitDecember - $oldAMBUnitDecember) * 100) / calZero($oldAMBUnitDecember);
        $growthAMBUnitTotal = (($currAMBTotalUnit - $oldAMBTotalUnit) * 100) / calZero($oldAMBTotalUnit);

        $growthMCBUnitJanuary = (($currMCBUnitJanuary - $oldMCBUnitJanuary) * 100) / calZero($oldMCBUnitJanuary);
        $growthMCBUnitFebruary = (($currMCBUnitFebruary - $oldMCBUnitFebruary) * 100) / calZero($oldMCBUnitFebruary);
        $growthMCBUnitMarch = (($currMCBUnitMarch - $oldMCBUnitMarch) * 100) / calZero($oldMCBUnitMarch);
        $growthMCBUnitApril = (($currMCBUnitApril - $oldMCBUnitApril) * 100) / calZero($oldMCBUnitApril);
        $growthMCBUnitMay = (($currMCBUnitMay - $oldMCBUnitMay) * 100) / calZero($oldMCBUnitMay);
        $growthMCBUnitJune = (($currMCBUnitJune - $oldMCBUnitJune) * 100) / calZero($oldMCBUnitJune);
        $growthMCBUnitJuly = (($currMCBUnitJuly - $oldMCBUnitJuly) * 100) / calZero($oldMCBUnitJuly);
        $growthMCBUnitAugust = (($currMCBUnitAugust - $oldMCBUnitAugust) * 100) / calZero($oldMCBUnitAugust);
        $growthMCBUnitSeptember = (($currMCBUnitSeptember - $oldMCBUnitSeptember) * 100) / calZero($oldMCBUnitSeptember);
        $growthMCBUnitOctober = (($currMCBUnitOctober - $oldMCBUnitOctober) * 100) / calZero($oldMCBUnitOctober);
        $growthMCBUnitNovember = (($currMCBUnitNovember - $oldMCBUnitNovember) * 100) / calZero($oldMCBUnitNovember);
        $growthMCBUnitDecember = (($currMCBUnitDecember - $oldMCBUnitDecember) * 100) / calZero($oldMCBUnitDecember);
        $growthMCBUnitTotal = (($currMCBTotalUnit - $oldMCBTotalUnit) * 100) / calZero($oldMCBTotalUnit);

        

        $totalAMBBahtTarget = getAmount($targetAMB->AmtQ1) + getAmount($targetAMB->AmtQ2) + getAmount($targetAMB->AmtQ3) + getAmount($targetAMB->AmtQ4); 
        $totalAMBUnitTarget = getAmount($targetAMB->UnitQ1) + getAmount($targetAMB->UnitQ2) + getAmount($targetAMB->UnitQ3) + getAmount($targetAMB->UnitQ4);
        $totalMCBBahtTarget = getAmount($targetMCB->AmtQ1) + getAmount($targetMCB->AmtQ2) + getAmount($targetMCB->AmtQ3) + getAmount($targetMCB->AmtQ4); 
        $totalMCBUnitTarget = getAmount($targetMCB->UnitQ1) + getAmount($targetMCB->UnitQ2) + getAmount($targetMCB->UnitQ3) + getAmount($targetMCB->UnitQ4);
    
        $achieveAMBBahtJanuary = ($currAMBBahtJanuary * 100) /  calZero(getAmount($targetAMB->Amt01));
        $achieveAMBBahtFebruary = ($currAMBBahtFebruary * 100) /  calZero(getAmount($targetAMB->Amt02));
        $achieveAMBBahtMarch = ($currAMBBahtMarch * 100) /  calZero(getAmount($targetAMB->Amt03));
        $achieveAMBBahtApril = ($currAMBBahtApril * 100) /  calZero(getAmount($targetAMB->Amt04));
        $achieveAMBBahtMay = ($currAMBBahtMay * 100) /  calZero(getAmount($targetAMB->Amt05));
        $achieveAMBBahtJune = ($currAMBBahtJune * 100) /  calZero(getAmount($targetAMB->Amt06));
        $achieveAMBBahtJuly = ($currAMBBahtJuly * 100) /  calZero(getAmount($targetAMB->Amt07));
        $achieveAMBBahtAugust = ($currAMBBahtAugust * 100) /  calZero(getAmount($targetAMB->Amt08));
        $achieveAMBBahtSeptember = ($currAMBBahtSeptember * 100) /  calZero(getAmount($targetAMB->Amt09));
        $achieveAMBBahtOctober = ($currAMBBahtOctober * 100) /  calZero(getAmount($targetAMB->Amt10));
        $achieveAMBBahtNovember = ($currAMBBahtNovember * 100) /  calZero(getAmount($targetAMB->Amt11));
        $achieveAMBBahtDecember = ($currAMBBahtDecember * 100) /  calZero(getAmount($targetAMB->Amt12));
        $achieveAMBBahtTotal = ($currAMBTotalBaht * 100) / calZero($totalAMBBahtTarget);
        
        $achieveAMBUnitJanuary = ($currAMBUnitJanuary * 100) /  calZero(getAmount($targetAMB->Unit01));
        $achieveAMBUnitFebruary = ($currAMBUnitFebruary * 100) /  calZero(getAmount($targetAMB->Unit02));
        $achieveAMBUnitMarch = ($currAMBUnitMarch * 100) /  calZero(getAmount($targetAMB->Unit03));
        $achieveAMBUnitApril = ($currAMBUnitApril * 100) /  calZero(getAmount($targetAMB->Unit04));
        $achieveAMBUnitMay = ($currAMBUnitMay * 100) /  calZero(getAmount($targetAMB->Unit05));
        $achieveAMBUnitJune = ($currAMBUnitJune * 100) /  calZero(getAmount($targetAMB->Unit06));
        $achieveAMBUnitJuly = ($currAMBUnitJuly * 100) /  calZero(getAmount($targetAMB->Unit07));
        $achieveAMBUnitAugust = ($currAMBUnitAugust * 100) /  calZero(getAmount($targetAMB->Unit08));
        $achieveAMBUnitSeptember = ($currAMBUnitSeptember * 100) /  calZero(getAmount($targetAMB->Unit09));
        $achieveAMBUnitOctober = ($currAMBUnitOctober * 100) /  calZero(getAmount($targetAMB->Unit10));
        $achieveAMBUnitNovember = ($currAMBUnitNovember * 100) /  calZero(getAmount($targetAMB->Unit11));
        $achieveAMBUnitDecember = ($currAMBUnitDecember * 100) /  calZero(getAmount($targetAMB->Unit12));
        $achieveAMBUnitTotal = ($currAMBTotalUnit * 100) / calZero($totalAMBUnitTarget);
        $achieveMCBBahtJanuary = ($currMCBBahtJanuary * 100) /  calZero(getAmount($targetMCB->Amt01));
        $achieveMCBBahtFebruary = ($currMCBBahtFebruary * 100) /  calZero(getAmount($targetMCB->Amt02));
        $achieveMCBBahtMarch = ($currMCBBahtMarch * 100) /  calZero(getAmount($targetMCB->Amt03));
        $achieveMCBBahtApril = ($currMCBBahtApril * 100) /  calZero(getAmount($targetMCB->Amt04));
        $achieveMCBBahtMay = ($currMCBBahtMay * 100) /  calZero(getAmount($targetMCB->Amt05));
        $achieveMCBBahtJune = ($currMCBBahtJune * 100) /  calZero(getAmount($targetMCB->Amt06));
        $achieveMCBBahtJuly = ($currMCBBahtJuly * 100) /  calZero(getAmount($targetMCB->Amt07));
        $achieveMCBBahtAugust = ($currMCBBahtAugust * 100) /  calZero(getAmount($targetMCB->Amt08));
        $achieveMCBBahtSeptember = ($currMCBBahtSeptember * 100) /  calZero(getAmount($targetMCB->Amt09));
        $achieveMCBBahtOctober = ($currMCBBahtOctober * 100) /  calZero(getAmount($targetMCB->Amt10));
        $achieveMCBBahtNovember = ($currMCBBahtNovember * 100) /  calZero(getAmount($targetMCB->Amt11));
        $achieveMCBBahtDecember = ($currMCBBahtDecember * 100) /  calZero(getAmount($targetMCB->Amt12));
        $achieveMCBBahtTotal = ($currMCBTotalBaht * 100) / calZero($totalMCBBahtTarget);
        
        $achieveMCBUnitJanuary = ($currMCBUnitJanuary * 100) /  calZero(getAmount($targetMCB->Unit01));
        $achieveMCBUnitFebruary = ($currMCBUnitFebruary * 100) /  calZero(getAmount($targetMCB->Unit02));
        $achieveMCBUnitMarch = ($currMCBUnitMarch * 100) /  calZero(getAmount($targetMCB->Unit03));
        $achieveMCBUnitApril = ($currMCBUnitApril * 100) /  calZero(getAmount($targetMCB->Unit04));
        $achieveMCBUnitMay = ($currMCBUnitMay * 100) /  calZero(getAmount($targetMCB->Unit05));
        $achieveMCBUnitJune = ($currMCBUnitJune * 100) /  calZero(getAmount($targetMCB->Unit06));
        $achieveMCBUnitJuly = ($currMCBUnitJuly * 100) /  calZero(getAmount($targetMCB->Unit07));
        $achieveMCBUnitAugust = ($currMCBUnitAugust * 100) /  calZero(getAmount($targetMCB->Unit08));
        $achieveMCBUnitSeptember = ($currMCBUnitSeptember * 100) /  calZero(getAmount($targetMCB->Unit09));
        $achieveMCBUnitOctober = ($currMCBUnitOctober * 100) /  calZero(getAmount($targetMCB->Unit10));
        $achieveMCBUnitNovember = ($currMCBUnitNovember * 100) /  calZero(getAmount($targetMCB->Unit11));
        $achieveMCBUnitDecember = ($currMCBUnitDecember * 100) /  calZero(getAmount($targetMCB->Unit12));
        $achieveMCBUnitTotal = ($currMCBTotalUnit * 100) / calZero($totalMCBUnitTarget);

        $currTotalBaht = $currAMBTotalBaht + $currMCBTotalBaht;
        $currTotalUnit = $currAMBTotalUnit + $currMCBTotalUnit;
        $oldTotalBaht = $oldAMBTotalBaht + $oldMCBTotalBaht;
        $oldTotalUnit = $oldAMBTotalUnit + $oldMCBTotalUnit;
        $currUnitJanuary = $currAMBUnitJanuary + $currMCBUnitJanuary;
        $currUnitFebruary = $currAMBUnitFebruary + $currMCBUnitFebruary;
        $currUnitMarch = $currAMBUnitMarch + $currMCBUnitMarch;
        $currUnitApril = $currAMBUnitApril + $currMCBUnitApril;
        $currUnitMay = $currAMBUnitMay + $currMCBUnitMay;
        $currUnitJune = $currAMBUnitJune + $currMCBUnitJune;
        $currUnitJuly = $currAMBUnitJuly + $currMCBUnitJuly;
        $currUnitAugust = $currAMBUnitAugust + $currMCBUnitAugust;
        $currUnitSeptember = $currAMBUnitSeptember + $currMCBUnitSeptember;
        $currUnitOctober = $currAMBUnitOctober + $currMCBUnitOctober;
        $currUnitNovember = $currAMBUnitNovember + $currMCBUnitNovember;
        $currUnitDecember = $currAMBUnitDecember + $currMCBUnitDecember;
        $currBahtJanuary = $currAMBBahtJanuary + $currMCBBahtJanuary;
        $currBahtFebruary = $currAMBBahtFebruary + $currMCBBahtFebruary;
        $currBahtMarch = $currAMBBahtMarch + $currMCBBahtMarch;
        $currBahtApril = $currAMBBahtApril + $currMCBBahtApril;
        $currBahtMay = $currAMBBahtMay + $currMCBBahtMay;
        $currBahtJune = $currAMBBahtJune + $currMCBBahtJune;
        $currBahtJuly = $currAMBBahtJuly + $currMCBBahtJuly;
        $currBahtAugust = $currAMBBahtAugust + $currMCBBahtAugust;
        $currBahtSeptember = $currAMBBahtSeptember + $currMCBBahtSeptember;
        $currBahtOctober = $currAMBBahtOctober + $currMCBBahtOctober;
        $currBahtNovember = $currAMBBahtNovember + $currMCBBahtNovember;
        $currBahtDecember = $currAMBBahtDecember + $currMCBBahtDecember;
        $currUnitQ1 = $currAMBUnitQ1 + $currMCBUnitQ1;
        $currBahtQ1 = $currAMBBahtQ1 + $currMCBBahtQ1;
        $currUnitQ2 = $currAMBUnitQ2 + $currMCBUnitQ2;
        $currBahtQ2 = $currAMBBahtQ2 + $currMCBBahtQ2;
        $currUnitQ3 = $currAMBUnitQ3 + $currMCBUnitQ3;
        $currBahtQ3 = $currAMBBahtQ3 + $currMCBBahtQ3;
        $currUnitQ4 = $currAMBUnitQ4 + $currMCBUnitQ4;
        $currBahtQ4 = $currAMBBahtQ4 + $currMCBBahtQ4;
        $oldUnitJanuary = $oldAMBUnitJanuary + $oldMCBUnitJanuary;
        $oldUnitFebruary = $oldAMBUnitFebruary + $oldMCBUnitFebruary;
        $oldUnitMarch = $oldAMBUnitMarch + $oldMCBUnitMarch;
        $oldUnitApril = $oldAMBUnitApril + $oldMCBUnitApril;
        $oldUnitMay = $oldAMBUnitMay + $oldMCBUnitMay;
        $oldUnitJune = $oldAMBUnitJune + $oldMCBUnitJune;
        $oldUnitJuly = $oldAMBUnitJuly + $oldMCBUnitJuly;
        $oldUnitAugust = $oldAMBUnitAugust + $oldMCBUnitAugust;
        $oldUnitSeptember = $oldAMBUnitSeptember + $oldMCBUnitSeptember;
        $oldUnitOctober = $oldAMBUnitOctober + $oldMCBUnitOctober;
        $oldUnitNovember = $oldAMBUnitNovember + $oldMCBUnitNovember;
        $oldUnitDecember = $oldAMBUnitDecember + $oldMCBUnitDecember;
        $oldBahtJanuary = $oldAMBBahtJanuary + $oldMCBBahtJanuary;
        $oldBahtFebruary = $oldAMBBahtFebruary + $oldMCBBahtFebruary;
        $oldBahtMarch = $oldAMBBahtMarch + $oldMCBBahtMarch;
        $oldBahtApril = $oldAMBBahtApril + $oldMCBBahtApril;
        $oldBahtMay = $oldAMBBahtMay + $oldMCBBahtMay;
        $oldBahtJune = $oldAMBBahtJune + $oldMCBBahtJune;
        $oldBahtJuly = $oldAMBBahtJuly + $oldMCBBahtJuly;
        $oldBahtAugust = $oldAMBBahtAugust + $oldMCBBahtAugust;
        $oldBahtSeptember = $oldAMBBahtSeptember + $oldMCBBahtSeptember;
        $oldBahtOctober = $oldAMBBahtOctober + $oldMCBBahtOctober;
        $oldBahtNovember = $oldAMBBahtNovember + $oldMCBBahtNovember;
        $oldBahtDecember = $oldAMBBahtDecember + $oldMCBBahtDecember;
        $oldUnitQ1 = $oldAMBUnitQ1 + $oldMCBUnitQ1;
        $oldBahtQ1 = $oldAMBBahtQ1 + $oldMCBBahtQ1;
        $oldUnitQ2 = $oldAMBUnitQ2 + $oldMCBUnitQ2;
        $oldBahtQ2 = $oldAMBBahtQ2 + $oldMCBBahtQ2;
        $oldUnitQ3 = $oldAMBUnitQ3 + $oldMCBUnitQ3;
        $oldBahtQ3 = $oldAMBBahtQ3 + $oldMCBBahtQ3;
        $oldUnitQ4 = $oldAMBUnitQ4 + $oldMCBUnitQ4;
        $oldBahtQ4 = $oldAMBBahtQ4 + $oldMCBBahtQ4;

        $totalBahtTarget = (getAmount($targetAMB->AmtQ1) + getAmount($targetAMB->AmtQ2) + getAmount($targetAMB->AmtQ3) + getAmount($targetAMB->AmtQ4) + getAmount($targetMCB->AmtQ1) + getAmount($targetMCB->AmtQ2) + getAmount($targetMCB->AmtQ3) + getAmount($targetMCB->AmtQ4));
        $totalUnitTarget = (getAmount($targetAMB->UnitQ1) + getAmount($targetAMB->UnitQ2) + getAmount($targetAMB->UnitQ3) + getAmount($targetAMB->UnitQ4) + getAmount($targetMCB->UnitQ1) + getAmount($targetMCB->UnitQ2) + getAmount($targetMCB->UnitQ3) + getAmount($targetMCB->UnitQ4));

        $achieveBahtJanuary = $achieveAMBBahtJanuary + $achieveMCBBahtJanuary;
        $achieveBahtFebruary = $achieveAMBBahtFebruary + $achieveMCBBahtFebruary;
        $achieveBahtMarch = $achieveAMBBahtMarch + $achieveMCBBahtMarch;
        $achieveBahtApril = $achieveAMBBahtApril + $achieveMCBBahtApril;
        $achieveBahtMay = $achieveAMBBahtMay + $achieveMCBBahtMay;
        $achieveBahtJune = $achieveAMBBahtJune + $achieveMCBBahtJune;
        $achieveBahtJuly = $achieveAMBBahtJuly + $achieveMCBBahtJuly;
        $achieveBahtAugust = $achieveAMBBahtAugust + $achieveMCBBahtAugust;
        $achieveBahtSeptember = $achieveAMBBahtSeptember + $achieveMCBBahtSeptember;
        $achieveBahtOctober = $achieveAMBBahtOctober + $achieveMCBBahtOctober;
        $achieveBahtNovember = $achieveAMBBahtNovember + $achieveMCBBahtNovember;
        $achieveBahtDecember = $achieveAMBBahtDecember + $achieveMCBBahtDecember;
        $achieveBahtTotal = ($currTotalBaht * 100) / calZero($totalBahtTarget);
        $achieveBahtQ1 = $achieveAMBBahtQ1 + $achieveMCBBahtQ1;
        $achieveUnitQ1 = $achieveAMBUnitQ1 + $achieveMCBUnitQ1;
        $achieveBahtQ2 = $achieveAMBBahtQ2 + $achieveMCBBahtQ2;
        $achieveUnitQ2 = $achieveAMBUnitQ2 + $achieveMCBUnitQ2;
        $achieveBahtQ3 = $achieveAMBBahtQ3 + $achieveMCBBahtQ3;
        $achieveUnitQ3 = $achieveAMBUnitQ3 + $achieveMCBUnitQ3;
        $achieveBahtQ4 = $achieveAMBBahtQ4 + $achieveMCBBahtQ4;
        $achieveUnitQ4 = $achieveAMBUnitQ4 + $achieveMCBUnitQ4;
        $growthBahtJanuary = $growthAMBBahtJanuary + $growthMCBBahtJanuary;
        $growthBahtFebruary = $growthAMBBahtFebruary + $growthMCBBahtFebruary;
        $growthBahtMarch = $growthAMBBahtMarch + $growthMCBBahtMarch;
        $growthBahtApril = $growthAMBBahtApril + $growthMCBBahtApril;
        $growthBahtMay = $growthAMBBahtMay + $growthMCBBahtMay;
        $growthBahtJune = $growthAMBBahtJune + $growthMCBBahtJune;
        $growthBahtJuly = $growthAMBBahtJuly + $growthMCBBahtJuly;
        $growthBahtAugust = $growthAMBBahtAugust + $growthMCBBahtAugust;
        $growthBahtSeptember = $growthAMBBahtSeptember + $growthMCBBahtSeptember;
        $growthBahtOctober = $growthAMBBahtOctober + $growthMCBBahtOctober;
        $growthBahtNovember = $growthAMBBahtNovember + $growthMCBBahtNovember;
        $growthBahtDecember = $growthAMBBahtDecember + $growthMCBBahtDecember;
        $growthBahtTotal = (($currTotalBaht - $oldTotalBaht) * 100) / $oldTotalBaht;
        $achieveUnitJanuary = $achieveAMBUnitJanuary + $achieveMCBUnitJanuary;
        $achieveUnitFebruary = $achieveAMBUnitFebruary + $achieveMCBUnitFebruary;
        $achieveUnitMarch = $achieveAMBUnitMarch + $achieveMCBUnitMarch;
        $achieveUnitApril = $achieveAMBUnitApril + $achieveMCBUnitApril;
        $achieveUnitMay = $achieveAMBUnitMay + $achieveMCBUnitMay;
        $achieveUnitJune = $achieveAMBUnitJune + $achieveMCBUnitJune;
        $achieveUnitJuly = $achieveAMBUnitJuly + $achieveMCBUnitJuly;
        $achieveUnitAugust = $achieveAMBUnitAugust + $achieveMCBUnitAugust;
        $achieveUnitSeptember = $achieveAMBUnitSeptember + $achieveMCBUnitSeptember;
        $achieveUnitOctober = $achieveAMBUnitOctober + $achieveMCBUnitOctober;
        $achieveUnitNovember = $achieveAMBUnitNovember + $achieveMCBUnitNovember;
        $achieveUnitDecember = $achieveAMBUnitDecember + $achieveMCBUnitDecember;
        $achieveUnitTotal = ($currTotalUnit * 100) / calZero($totalUnitTarget);
        $growthUnitJanuary = $growthAMBUnitJanuary + $growthMCBUnitJanuary;
        $growthUnitFebruary = $growthAMBUnitFebruary + $growthMCBUnitFebruary;        
        $growthUnitMarch = $growthAMBUnitMarch + $growthMCBUnitMarch;
        $growthUnitApril = $growthAMBUnitApril + $growthMCBUnitApril;
        $growthUnitMay = $growthAMBUnitMay + $growthMCBUnitMay;
        $growthUnitJune = $growthAMBUnitJune + $growthMCBUnitJune;
        $growthUnitJuly = $growthAMBUnitJuly + $growthMCBUnitJuly;
        $growthUnitAugust = $growthAMBUnitAugust + $growthMCBUnitAugust;
        $growthUnitSeptember = $growthAMBUnitSeptember + $growthMCBUnitSeptember;
        $growthUnitOctober = $growthAMBUnitOctober + $growthMCBUnitOctober;
        $growthUnitNovember = $growthAMBUnitNovember + $growthMCBUnitNovember;
        $growthUnitDecember = $growthAMBUnitDecember + $growthMCBUnitDecember;
        $growthUnitTotal = (($currTotalUnit - $oldTotalUnit) * 100) / $oldTotalUnit;
        $growthBahtQ1 = $growthAMBBahtQ1 + $growthMCBBahtQ1;
        $growthUnitQ1 = $growthAMBUnitQ1 + $growthMCBUnitQ1;
        $growthBahtQ2 = $growthAMBBahtQ2 + $growthMCBBahtQ2;
        $growthUnitQ2 = $growthAMBUnitQ2 + $growthMCBUnitQ2;
        $growthBahtQ3 = $growthAMBBahtQ3 + $growthMCBBahtQ3;
        $growthUnitQ3 = $growthAMBUnitQ3 + $growthMCBUnitQ3;
        $growthBahtQ4 = $growthAMBBahtQ4 + $growthMCBBahtQ4;
        $growthUnitQ4 = $growthAMBUnitQ4 + $growthMCBUnitQ4;

        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">AMB,MCB (1,000 BAHT)</th>
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
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt01) + getAmount($targetMCB->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt02) + getAmount($targetMCB->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt03) + getAmount($targetMCB->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt04) + getAmount($targetMCB->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt05) + getAmount($targetMCB->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt06) + getAmount($targetMCB->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt07) + getAmount($targetMCB->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt08) + getAmount($targetMCB->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt09) + getAmount($targetMCB->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt10) + getAmount($targetMCB->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt11) + getAmount($targetMCB->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt12) + getAmount($targetMCB->Amt12))/1000,2) }}</td>
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
                    <th style="vertical-align:middle; text-align:center; width:100px;">AMB,MCB (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit01) + getAmount($targetMCB->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit02) + getAmount($targetMCB->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit03) + getAmount($targetMCB->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit04) + getAmount($targetMCB->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit05) + getAmount($targetMCB->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit06) + getAmount($targetMCB->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit07) + getAmount($targetMCB->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit08) + getAmount($targetMCB->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit09) + getAmount($targetMCB->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit10) + getAmount($targetMCB->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit11) + getAmount($targetMCB->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit12) + getAmount($targetMCB->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitJanuary) ? number_format(0,2) : number_format($achieveUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitFebruary) ? number_format(0,2) : number_format($achieveUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitMarch) ? number_format(0,2) : number_format($achieveUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitApril) ? number_format(0,2) : number_format($achieveUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitMay) ? number_format(0,2) : number_format($achieveUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitJune) ? number_format(0,2) : number_format($achieveUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitJuly) ? number_format(0,2) : number_format($achieveUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitAugust) ? number_format(0,2) : number_format($achieveUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitSeptember) ? number_format(0,2) : number_format($achieveUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitOctober) ? number_format(0,2) : number_format($achieveUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitNovember) ? number_format(0,2) : number_format($achieveUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveUnitDecember) ? number_format(0,2) : number_format($achieveUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveUnitTotal) ? number_format(0,2) : number_format($achieveUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitJanuary) ? number_format(0,2) : number_format($growthUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitFebruary) ? number_format(0,2) : number_format($growthUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitMarch) ? number_format(0,2) : number_format($growthUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitApril) ? number_format(0,2) : number_format($growthUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitMay) ? number_format(0,2) : number_format($growthUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitJune) ? number_format(0,2) : number_format($growthUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitJuly) ? number_format(0,2) : number_format($growthUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitAugust) ? number_format(0,2) : number_format($growthUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitSeptember) ? number_format(0,2) : number_format($growthUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitOctober) ? number_format(0,2) : number_format($growthUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitNovember) ? number_format(0,2) : number_format($growthUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthUnitDecember) ? number_format(0,2) : number_format($growthUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthUnitTotal) ? number_format(0,2) : number_format($growthUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>          
    </div>   

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currAMBBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currAMBTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtJanuary) ? number_format(0,2) : number_format($achieveAMBBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtFebruary) ? number_format(0,2) : number_format($achieveAMBBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtMarch) ? number_format(0,2) : number_format($achieveAMBBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtApril) ? number_format(0,2) : number_format($achieveAMBBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtMay) ? number_format(0,2) : number_format($achieveAMBBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtJune) ? number_format(0,2) : number_format($achieveAMBBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtJuly) ? number_format(0,2) : number_format($achieveAMBBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtAugust) ? number_format(0,2) : number_format($achieveAMBBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtSeptember) ? number_format(0,2) : number_format($achieveAMBBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtOctober) ? number_format(0,2) : number_format($achieveAMBBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtNovember) ? number_format(0,2) : number_format($achieveAMBBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBBahtDecember) ? number_format(0,2) : number_format($achieveAMBBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveAMBBahtTotal) ? number_format(0,2) : number_format($achieveAMBBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldAMBTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtJanuary) ? number_format(0,2) : number_format($growthAMBBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtFebruary) ? number_format(0,2) : number_format($growthAMBBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtMarch) ? number_format(0,2) : number_format($growthAMBBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtApril) ? number_format(0,2) : number_format($growthAMBBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtMay) ? number_format(0,2) : number_format($growthAMBBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtJune) ? number_format(0,2) : number_format($growthAMBBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtJuly) ? number_format(0,2) : number_format($growthAMBBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtAugust) ? number_format(0,2) : number_format($growthAMBBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtSeptember) ? number_format(0,2) : number_format($growthAMBBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtOctober) ? number_format(0,2) : number_format($growthAMBBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtNovember) ? number_format(0,2) : number_format($growthAMBBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBBahtDecember) ? number_format(0,2) : number_format($growthAMBBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthAMBBahtTotal) ? number_format(0,2) : number_format($growthAMBBahtTotal,2))."%" }}</td>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currAMBUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currAMBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit01) + getAmount($targetMCB->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetAMB->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitJanuary) ? number_format(0,2) : number_format($achieveAMBUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitFebruary) ? number_format(0,2) : number_format($achieveAMBUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitMarch) ? number_format(0,2) : number_format($achieveAMBUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitApril) ? number_format(0,2) : number_format($achieveAMBUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitMay) ? number_format(0,2) : number_format($achieveAMBUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitJune) ? number_format(0,2) : number_format($achieveAMBUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitJuly) ? number_format(0,2) : number_format($achieveAMBUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitAugust) ? number_format(0,2) : number_format($achieveAMBUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitSeptember) ? number_format(0,2) : number_format($achieveAMBUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitOctober) ? number_format(0,2) : number_format($achieveAMBUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitNovember) ? number_format(0,2) : number_format($achieveAMBUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveAMBUnitDecember) ? number_format(0,2) : number_format($achieveAMBUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveAMBUnitTotal) ? number_format(0,2) : number_format($achieveAMBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldAMBUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldAMBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitJanuary) ? number_format(0,2) : number_format($growthAMBUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitFebruary) ? number_format(0,2) : number_format($growthAMBUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitMarch) ? number_format(0,2) : number_format($growthAMBUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitApril) ? number_format(0,2) : number_format($growthAMBUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitMay) ? number_format(0,2) : number_format($growthAMBUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitJune) ? number_format(0,2) : number_format($growthAMBUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitJuly) ? number_format(0,2) : number_format($growthAMBUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitAugust) ? number_format(0,2) : number_format($growthAMBUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitSeptember) ? number_format(0,2) : number_format($growthAMBUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitOctober) ? number_format(0,2) : number_format($growthAMBUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitNovember) ? number_format(0,2) : number_format($growthAMBUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthAMBUnitDecember) ? number_format(0,2) : number_format($growthAMBUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthAMBUnitTotal) ? number_format(0,2) : number_format($growthAMBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">MCB (1,000 BAHT)</th>
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currMCBBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currMCBTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtJanuary) ? number_format(0,2) : number_format($achieveMCBBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtFebruary) ? number_format(0,2) : number_format($achieveMCBBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtMarch) ? number_format(0,2) : number_format($achieveMCBBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtApril) ? number_format(0,2) : number_format($achieveMCBBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtMay) ? number_format(0,2) : number_format($achieveMCBBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtJune) ? number_format(0,2) : number_format($achieveMCBBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtJuly) ? number_format(0,2) : number_format($achieveMCBBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtAugust) ? number_format(0,2) : number_format($achieveMCBBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtSeptember) ? number_format(0,2) : number_format($achieveMCBBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtOctober) ? number_format(0,2) : number_format($achieveMCBBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtNovember) ? number_format(0,2) : number_format($achieveMCBBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBBahtDecember) ? number_format(0,2) : number_format($achieveMCBBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveMCBBahtTotal) ? number_format(0,2) : number_format($achieveMCBBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldMCBTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtJanuary) ? number_format(0,2) : number_format($growthMCBBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtFebruary) ? number_format(0,2) : number_format($growthMCBBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtMarch) ? number_format(0,2) : number_format($growthMCBBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtApril) ? number_format(0,2) : number_format($growthMCBBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtMay) ? number_format(0,2) : number_format($growthMCBBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtJune) ? number_format(0,2) : number_format($growthMCBBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtJuly) ? number_format(0,2) : number_format($growthMCBBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtAugust) ? number_format(0,2) : number_format($growthMCBBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtSeptember) ? number_format(0,2) : number_format($growthMCBBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtOctober) ? number_format(0,2) : number_format($growthMCBBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtNovember) ? number_format(0,2) : number_format($growthMCBBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBBahtDecember) ? number_format(0,2) : number_format($growthMCBBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthMCBBahtTotal) ? number_format(0,2) : number_format($growthMCBBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">MCB (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currMCBUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currMCBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit01) + getAmount($targetMCB->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetMCB->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitJanuary) ? number_format(0,2) : number_format($achieveMCBUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitFebruary) ? number_format(0,2) : number_format($achieveMCBUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitMarch) ? number_format(0,2) : number_format($achieveMCBUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitApril) ? number_format(0,2) : number_format($achieveMCBUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitMay) ? number_format(0,2) : number_format($achieveMCBUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitJune) ? number_format(0,2) : number_format($achieveMCBUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitJuly) ? number_format(0,2) : number_format($achieveMCBUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitAugust) ? number_format(0,2) : number_format($achieveMCBUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitSeptember) ? number_format(0,2) : number_format($achieveMCBUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitOctober) ? number_format(0,2) : number_format($achieveMCBUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitNovember) ? number_format(0,2) : number_format($achieveMCBUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveMCBUnitDecember) ? number_format(0,2) : number_format($achieveMCBUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveMCBUnitTotal) ? number_format(0,2) : number_format($achieveMCBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldMCBUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldMCBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitJanuary) ? number_format(0,2) : number_format($growthMCBUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitFebruary) ? number_format(0,2) : number_format($growthMCBUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitMarch) ? number_format(0,2) : number_format($growthMCBUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitApril) ? number_format(0,2) : number_format($growthMCBUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitMay) ? number_format(0,2) : number_format($growthMCBUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitJune) ? number_format(0,2) : number_format($growthMCBUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitJuly) ? number_format(0,2) : number_format($growthMCBUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitAugust) ? number_format(0,2) : number_format($growthMCBUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitSeptember) ? number_format(0,2) : number_format($growthMCBUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitOctober) ? number_format(0,2) : number_format($growthMCBUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitNovember) ? number_format(0,2) : number_format($growthMCBUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthMCBUnitDecember) ? number_format(0,2) : number_format($growthMCBUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthMCBUnitTotal) ? number_format(0,2) : number_format($growthMCBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

</body>
</html>

           