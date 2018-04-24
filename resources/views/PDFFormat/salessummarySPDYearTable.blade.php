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

    <h4><strong> SPD Sales Summary Report : {{$data["year"]}}</strong></h4>        

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
               
        $groupedTarget = array_group_by($targetData, "ItemGroup");
        
        $targetNP = $groupedTarget['NP'][0];
        $targetEB = $groupedTarget['EB'][0];
        $targetIND = $groupedTarget['IND'][0];
        $targetOTH = $groupedTarget['Retifier'][0];        
        
        $currNPTotalBaht = 0;
        $currNPTotalUnit = 0;
        $oldNPTotalBaht = 0;
        $oldNPTotalUnit = 0;
        $currNPUnitJanuary = 0;
        $currNPUnitFebruary = 0;
        $currNPUnitMarch = 0;
        $currNPUnitApril = 0;
        $currNPUnitMay = 0;
        $currNPUnitJune = 0;
        $currNPUnitJuly = 0;
        $currNPUnitAugust = 0;
        $currNPUnitSeptember = 0;
        $currNPUnitOctober = 0;
        $currNPUnitNovember = 0;
        $currNPUnitDecember = 0;
        $currNPBahtJanuary = 0;
        $currNPBahtFebruary = 0;
        $currNPBahtMarch = 0;
        $currNPBahtApril = 0;
        $currNPBahtMay = 0;
        $currNPBahtJune = 0;
        $currNPBahtJuly = 0;
        $currNPBahtAugust = 0;
        $currNPBahtSeptember = 0;
        $currNPBahtOctober = 0;
        $currNPBahtNovember = 0;
        $currNPBahtDecember = 0;
        $currNPUnitQ1 = 0;
        $currNPBahtQ1 = 0;
        $currNPUnitQ2 = 0;
        $currNPBahtQ2 = 0;
        $currNPUnitQ3 = 0;
        $currNPBahtQ3 = 0;
        $currNPUnitQ4 = 0;
        $currNPBahtQ4 = 0;
        $oldNPUnitJanuary = 0;
        $oldNPUnitFebruary = 0;
        $oldNPUnitMarch = 0;
        $oldNPUnitApril = 0;
        $oldNPUnitMay = 0;
        $oldNPUnitJune = 0;
        $oldNPUnitJuly = 0;
        $oldNPUnitAugust = 0;
        $oldNPUnitSeptember = 0;
        $oldNPUnitOctober = 0;
        $oldNPUnitNovember = 0;
        $oldNPUnitDecember = 0;
        $oldNPBahtJanuary = 0;
        $oldNPBahtFebruary = 0;
        $oldNPBahtMarch = 0;
        $oldNPBahtApril = 0;
        $oldNPBahtMay = 0;
        $oldNPBahtJune = 0;
        $oldNPBahtJuly = 0;
        $oldNPBahtAugust = 0;
        $oldNPBahtSeptember = 0;
        $oldNPBahtOctober = 0;
        $oldNPBahtNovember = 0;
        $oldNPBahtDecember = 0;
        $oldNPUnitQ1 = 0;
        $oldNPBahtQ1 = 0;
        $oldNPUnitQ2 = 0;
        $oldNPBahtQ2 = 0;
        $oldNPUnitQ3 = 0;
        $oldNPBahtQ3 = 0;
        $oldNPUnitQ4 = 0;
        $oldNPBahtQ4 = 0;
        $achieveNPBahtJanuary = 0;
        $achieveNPBahtFebruary = 0;
        $achieveNPBahtMarch = 0;
        $achieveNPBahtApril = 0;
        $achieveNPBahtMay = 0;
        $achieveNPBahtJune = 0;
        $achieveNPBahtJuly = 0;
        $achieveNPBahtAugust = 0;
        $achieveNPBahtSeptember = 0;
        $achieveNPBahtOctober = 0;
        $achieveNPBahtNovember = 0;
        $achieveNPBahtDecember = 0;
        $achieveNPBahtQ1 = 0;
        $achieveNPUnitQ1 = 0;
        $achieveNPBahtQ2 = 0;
        $achieveNPUnitQ2 = 0;
        $achieveNPBahtQ3 = 0;
        $achieveNPUnitQ3 = 0;
        $achieveNPBahtQ4 = 0;
        $achieveNPUnitQ4 = 0;
        $growthNPBahtJanuary = 0;
        $growthNPBahtFebruary = 0;
        $growthNPBahtMarch = 0;
        $growthNPBahtApril = 0;
        $growthNPBahtMay = 0;
        $growthNPBahtJune = 0;
        $growthNPBahtJuly = 0;
        $growthNPBahtAugust = 0;
        $growthNPBahtSeptember = 0;
        $growthNPBahtOctober = 0;
        $growthNPBahtNovember = 0;
        $growthNPBahtDecember = 0;
        $achieveNPUnitJanuary = 0;
        $achieveNPUnitFebruary = 0;
        $achieveNPUnitMarch = 0;
        $achieveNPUnitApril = 0;
        $achieveNPUnitMay = 0;
        $achieveNPUnitJune = 0;
        $achieveNPUnitJuly = 0;
        $achieveNPUnitAugust = 0;
        $achieveNPUnitSeptember = 0;
        $achieveNPUnitOctober = 0;
        $achieveNPUnitNovember = 0;
        $achieveNPUnitDecember = 0;
        $growthNPUnitJanuary = 0;
        $growthNPUnitFebruary = 0;
        $growthNPUnitMarch = 0;
        $growthNPUnitApril = 0;
        $growthNPUnitMay = 0;
        $growthNPUnitJune = 0;
        $growthNPUnitJuly = 0;
        $growthNPUnitAugust = 0;
        $growthNPUnitSeptember = 0;
        $growthNPUnitOctober = 0;
        $growthNPUnitNovember = 0;
        $growthNPUnitDecember = 0;
        $growthNPBahtQ1 = 0;
        $growthNPUnitQ1 = 0;
        $growthNPBahtQ2 = 0;
        $growthNPUnitQ2 = 0;
        $growthNPBahtQ3 = 0;
        $growthNPUnitQ3 = 0;
        $growthNPBahtQ4 = 0;
        $growthNPUnitQ4 = 0;  

        $currEBTotalBaht = 0;
        $currEBTotalUnit = 0;
        $oldEBTotalBaht = 0;
        $oldEBTotalUnit = 0;
        $currEBUnitJanuary = 0;
        $currEBUnitFebruary = 0;
        $currEBUnitMarch = 0;
        $currEBUnitApril = 0;
        $currEBUnitMay = 0;
        $currEBUnitJune = 0;
        $currEBUnitJuly = 0;
        $currEBUnitAugust = 0;
        $currEBUnitSeptember = 0;
        $currEBUnitOctober = 0;
        $currEBUnitNovember = 0;
        $currEBUnitDecember = 0;
        $currEBBahtJanuary = 0;
        $currEBBahtFebruary = 0;
        $currEBBahtMarch = 0;
        $currEBBahtApril = 0;
        $currEBBahtMay = 0;
        $currEBBahtJune = 0;
        $currEBBahtJuly = 0;
        $currEBBahtAugust = 0;
        $currEBBahtSeptember = 0;
        $currEBBahtOctober = 0;
        $currEBBahtNovember = 0;
        $currEBBahtDecember = 0;
        $currEBUnitQ1 = 0;
        $currEBBahtQ1 = 0;
        $currEBUnitQ2 = 0;
        $currEBBahtQ2 = 0;
        $currEBUnitQ3 = 0;
        $currEBBahtQ3 = 0;
        $currEBUnitQ4 = 0;
        $currEBBahtQ4 = 0;
        $oldEBUnitJanuary = 0;
        $oldEBUnitFebruary = 0;
        $oldEBUnitMarch = 0;
        $oldEBUnitApril = 0;
        $oldEBUnitMay = 0;
        $oldEBUnitJune = 0;
        $oldEBUnitJuly = 0;
        $oldEBUnitAugust = 0;
        $oldEBUnitSeptember = 0;
        $oldEBUnitOctober = 0;
        $oldEBUnitNovember = 0;
        $oldEBUnitDecember = 0;
        $oldEBBahtJanuary = 0;
        $oldEBBahtFebruary = 0;
        $oldEBBahtMarch = 0;
        $oldEBBahtApril = 0;
        $oldEBBahtMay = 0;
        $oldEBBahtJune = 0;
        $oldEBBahtJuly = 0;
        $oldEBBahtAugust = 0;
        $oldEBBahtSeptember = 0;
        $oldEBBahtOctober = 0;
        $oldEBBahtNovember = 0;
        $oldEBBahtDecember = 0;
        $oldEBUnitQ1 = 0;
        $oldEBBahtQ1 = 0;
        $oldEBUnitQ2 = 0;
        $oldEBBahtQ2 = 0;
        $oldEBUnitQ3 = 0;
        $oldEBBahtQ3 = 0;
        $oldEBUnitQ4 = 0;
        $oldEBBahtQ4 = 0;
        $achieveEBBahtJanuary = 0;
        $achieveEBBahtFebruary = 0;
        $achieveEBBahtMarch = 0;
        $achieveEBBahtApril = 0;
        $achieveEBBahtMay = 0;
        $achieveEBBahtJune = 0;
        $achieveEBBahtJuly = 0;
        $achieveEBBahtAugust = 0;
        $achieveEBBahtSeptember = 0;
        $achieveEBBahtOctober = 0;
        $achieveEBBahtNovember = 0;
        $achieveEBBahtDecember = 0;
        $achieveEBBahtQ1 = 0;
        $achieveEBUnitQ1 = 0;
        $achieveEBBahtQ2 = 0;
        $achieveEBUnitQ2 = 0;
        $achieveEBBahtQ3 = 0;
        $achieveEBUnitQ3 = 0;
        $achieveEBBahtQ4 = 0;
        $achieveEBUnitQ4 = 0;
        $growthEBBahtJanuary = 0;
        $growthEBBahtFebruary = 0;
        $growthEBBahtMarch = 0;
        $growthEBBahtApril = 0;
        $growthEBBahtMay = 0;
        $growthEBBahtJune = 0;
        $growthEBBahtJuly = 0;
        $growthEBBahtAugust = 0;
        $growthEBBahtSeptember = 0;
        $growthEBBahtOctober = 0;
        $growthEBBahtNovember = 0;
        $growthEBBahtDecember = 0;
        $achieveEBUnitJanuary = 0;
        $achieveEBUnitFebruary = 0;
        $achieveEBUnitMarch = 0;
        $achieveEBUnitApril = 0;
        $achieveEBUnitMay = 0;
        $achieveEBUnitJune = 0;
        $achieveEBUnitJuly = 0;
        $achieveEBUnitAugust = 0;
        $achieveEBUnitSeptember = 0;
        $achieveEBUnitOctober = 0;
        $achieveEBUnitNovember = 0;
        $achieveEBUnitDecember = 0;
        $growthEBUnitJanuary = 0;
        $growthEBUnitFebruary = 0;
        $growthEBUnitMarch = 0;
        $growthEBUnitApril = 0;
        $growthEBUnitMay = 0;
        $growthEBUnitJune = 0;
        $growthEBUnitJuly = 0;
        $growthEBUnitAugust = 0;
        $growthEBUnitSeptember = 0;
        $growthEBUnitOctober = 0;
        $growthEBUnitNovember = 0;
        $growthEBUnitDecember = 0;
        $growthEBBahtQ1 = 0;
        $growthEBUnitQ1 = 0;
        $growthEBBahtQ2 = 0;
        $growthEBUnitQ2 = 0;
        $growthEBBahtQ3 = 0;
        $growthEBUnitQ3 = 0;
        $growthEBBahtQ4 = 0;
        $growthEBUnitQ4 = 0;  

        $currINDTotalBaht = 0;
        $currINDTotalUnit = 0;
        $oldINDTotalBaht = 0;
        $oldINDTotalUnit = 0;
        $currINDUnitJanuary = 0;
        $currINDUnitFebruary = 0;
        $currINDUnitMarch = 0;
        $currINDUnitApril = 0;
        $currINDUnitMay = 0;
        $currINDUnitJune = 0;
        $currINDUnitJuly = 0;
        $currINDUnitAugust = 0;
        $currINDUnitSeptember = 0;
        $currINDUnitOctober = 0;
        $currINDUnitNovember = 0;
        $currINDUnitDecember = 0;
        $currINDBahtJanuary = 0;
        $currINDBahtFebruary = 0;
        $currINDBahtMarch = 0;
        $currINDBahtApril = 0;
        $currINDBahtMay = 0;
        $currINDBahtJune = 0;
        $currINDBahtJuly = 0;
        $currINDBahtAugust = 0;
        $currINDBahtSeptember = 0;
        $currINDBahtOctober = 0;
        $currINDBahtNovember = 0;
        $currINDBahtDecember = 0;
        $currINDUnitQ1 = 0;
        $currINDBahtQ1 = 0;
        $currINDUnitQ2 = 0;
        $currINDBahtQ2 = 0;
        $currINDUnitQ3 = 0;
        $currINDBahtQ3 = 0;
        $currINDUnitQ4 = 0;
        $currINDBahtQ4 = 0;
        $oldINDUnitJanuary = 0;
        $oldINDUnitFebruary = 0;
        $oldINDUnitMarch = 0;
        $oldINDUnitApril = 0;
        $oldINDUnitMay = 0;
        $oldINDUnitJune = 0;
        $oldINDUnitJuly = 0;
        $oldINDUnitAugust = 0;
        $oldINDUnitSeptember = 0;
        $oldINDUnitOctober = 0;
        $oldINDUnitNovember = 0;
        $oldINDUnitDecember = 0;
        $oldINDBahtJanuary = 0;
        $oldINDBahtFebruary = 0;
        $oldINDBahtMarch = 0;
        $oldINDBahtApril = 0;
        $oldINDBahtMay = 0;
        $oldINDBahtJune = 0;
        $oldINDBahtJuly = 0;
        $oldINDBahtAugust = 0;
        $oldINDBahtSeptember = 0;
        $oldINDBahtOctober = 0;
        $oldINDBahtNovember = 0;
        $oldINDBahtDecember = 0;
        $oldINDUnitQ1 = 0;
        $oldINDBahtQ1 = 0;
        $oldINDUnitQ2 = 0;
        $oldINDBahtQ2 = 0;
        $oldINDUnitQ3 = 0;
        $oldINDBahtQ3 = 0;
        $oldINDUnitQ4 = 0;
        $oldINDBahtQ4 = 0;
        $achieveINDBahtJanuary = 0;
        $achieveINDBahtFebruary = 0;
        $achieveINDBahtMarch = 0;
        $achieveINDBahtApril = 0;
        $achieveINDBahtMay = 0;
        $achieveINDBahtJune = 0;
        $achieveINDBahtJuly = 0;
        $achieveINDBahtAugust = 0;
        $achieveINDBahtSeptember = 0;
        $achieveINDBahtOctober = 0;
        $achieveINDBahtNovember = 0;
        $achieveINDBahtDecember = 0;
        $achieveINDBahtQ1 = 0;
        $achieveINDUnitQ1 = 0;
        $achieveINDBahtQ2 = 0;
        $achieveINDUnitQ2 = 0;
        $achieveINDBahtQ3 = 0;
        $achieveINDUnitQ3 = 0;
        $achieveINDBahtQ4 = 0;
        $achieveINDUnitQ4 = 0;
        $growthINDBahtJanuary = 0;
        $growthINDBahtFebruary = 0;
        $growthINDBahtMarch = 0;
        $growthINDBahtApril = 0;
        $growthINDBahtMay = 0;
        $growthINDBahtJune = 0;
        $growthINDBahtJuly = 0;
        $growthINDBahtAugust = 0;
        $growthINDBahtSeptember = 0;
        $growthINDBahtOctober = 0;
        $growthINDBahtNovember = 0;
        $growthINDBahtDecember = 0;
        $achieveINDUnitJanuary = 0;
        $achieveINDUnitFebruary = 0;
        $achieveINDUnitMarch = 0;
        $achieveINDUnitApril = 0;
        $achieveINDUnitMay = 0;
        $achieveINDUnitJune = 0;
        $achieveINDUnitJuly = 0;
        $achieveINDUnitAugust = 0;
        $achieveINDUnitSeptember = 0;
        $achieveINDUnitOctober = 0;
        $achieveINDUnitNovember = 0;
        $achieveINDUnitDecember = 0;
        $growthINDUnitJanuary = 0;
        $growthINDUnitFebruary = 0;
        $growthINDUnitMarch = 0;
        $growthINDUnitApril = 0;
        $growthINDUnitMay = 0;
        $growthINDUnitJune = 0;
        $growthINDUnitJuly = 0;
        $growthINDUnitAugust = 0;
        $growthINDUnitSeptember = 0;
        $growthINDUnitOctober = 0;
        $growthINDUnitNovember = 0;
        $growthINDUnitDecember = 0;
        $growthINDBahtQ1 = 0;
        $growthINDUnitQ1 = 0;
        $growthINDBahtQ2 = 0;
        $growthINDUnitQ2 = 0;
        $growthINDBahtQ3 = 0;
        $growthINDUnitQ3 = 0;
        $growthINDBahtQ4 = 0;
        $growthINDUnitQ4 = 0;  

        $currOTHTotalBaht = 0;
        $currOTHTotalUnit = 0;
        $oldOTHTotalBaht = 0;
        $oldOTHTotalUnit = 0;
        $currOTHUnitJanuary = 0;
        $currOTHUnitFebruary = 0;
        $currOTHUnitMarch = 0;
        $currOTHUnitApril = 0;
        $currOTHUnitMay = 0;
        $currOTHUnitJune = 0;
        $currOTHUnitJuly = 0;
        $currOTHUnitAugust = 0;
        $currOTHUnitSeptember = 0;
        $currOTHUnitOctober = 0;
        $currOTHUnitNovember = 0;
        $currOTHUnitDecember = 0;
        $currOTHBahtJanuary = 0;
        $currOTHBahtFebruary = 0;
        $currOTHBahtMarch = 0;
        $currOTHBahtApril = 0;
        $currOTHBahtMay = 0;
        $currOTHBahtJune = 0;
        $currOTHBahtJuly = 0;
        $currOTHBahtAugust = 0;
        $currOTHBahtSeptember = 0;
        $currOTHBahtOctober = 0;
        $currOTHBahtNovember = 0;
        $currOTHBahtDecember = 0;
        $currOTHUnitQ1 = 0;
        $currOTHBahtQ1 = 0;
        $currOTHUnitQ2 = 0;
        $currOTHBahtQ2 = 0;
        $currOTHUnitQ3 = 0;
        $currOTHBahtQ3 = 0;
        $currOTHUnitQ4 = 0;
        $currOTHBahtQ4 = 0;
        $oldOTHUnitJanuary = 0;
        $oldOTHUnitFebruary = 0;
        $oldOTHUnitMarch = 0;
        $oldOTHUnitApril = 0;
        $oldOTHUnitMay = 0;
        $oldOTHUnitJune = 0;
        $oldOTHUnitJuly = 0;
        $oldOTHUnitAugust = 0;
        $oldOTHUnitSeptember = 0;
        $oldOTHUnitOctober = 0;
        $oldOTHUnitNovember = 0;
        $oldOTHUnitDecember = 0;
        $oldOTHBahtJanuary = 0;
        $oldOTHBahtFebruary = 0;
        $oldOTHBahtMarch = 0;
        $oldOTHBahtApril = 0;
        $oldOTHBahtMay = 0;
        $oldOTHBahtJune = 0;
        $oldOTHBahtJuly = 0;
        $oldOTHBahtAugust = 0;
        $oldOTHBahtSeptember = 0;
        $oldOTHBahtOctober = 0;
        $oldOTHBahtNovember = 0;
        $oldOTHBahtDecember = 0;
        $oldOTHUnitQ1 = 0;
        $oldOTHBahtQ1 = 0;
        $oldOTHUnitQ2 = 0;
        $oldOTHBahtQ2 = 0;
        $oldOTHUnitQ3 = 0;
        $oldOTHBahtQ3 = 0;
        $oldOTHUnitQ4 = 0;
        $oldOTHBahtQ4 = 0;
        $achieveOTHBahtJanuary = 0;
        $achieveOTHBahtFebruary = 0;
        $achieveOTHBahtMarch = 0;
        $achieveOTHBahtApril = 0;
        $achieveOTHBahtMay = 0;
        $achieveOTHBahtJune = 0;
        $achieveOTHBahtJuly = 0;
        $achieveOTHBahtAugust = 0;
        $achieveOTHBahtSeptember = 0;
        $achieveOTHBahtOctober = 0;
        $achieveOTHBahtNovember = 0;
        $achieveOTHBahtDecember = 0;
        $achieveOTHBahtQ1 = 0;
        $achieveOTHUnitQ1 = 0;
        $achieveOTHBahtQ2 = 0;
        $achieveOTHUnitQ2 = 0;
        $achieveOTHBahtQ3 = 0;
        $achieveOTHUnitQ3 = 0;
        $achieveOTHBahtQ4 = 0;
        $achieveOTHUnitQ4 = 0;
        $growthOTHBahtJanuary = 0;
        $growthOTHBahtFebruary = 0;
        $growthOTHBahtMarch = 0;
        $growthOTHBahtApril = 0;
        $growthOTHBahtMay = 0;
        $growthOTHBahtJune = 0;
        $growthOTHBahtJuly = 0;
        $growthOTHBahtAugust = 0;
        $growthOTHBahtSeptember = 0;
        $growthOTHBahtOctober = 0;
        $growthOTHBahtNovember = 0;
        $growthOTHBahtDecember = 0;
        $achieveOTHUnitJanuary = 0;
        $achieveOTHUnitFebruary = 0;
        $achieveOTHUnitMarch = 0;
        $achieveOTHUnitApril = 0;
        $achieveOTHUnitMay = 0;
        $achieveOTHUnitJune = 0;
        $achieveOTHUnitJuly = 0;
        $achieveOTHUnitAugust = 0;
        $achieveOTHUnitSeptember = 0;
        $achieveOTHUnitOctober = 0;
        $achieveOTHUnitNovember = 0;
        $achieveOTHUnitDecember = 0;
        $growthOTHUnitJanuary = 0;
        $growthOTHUnitFebruary = 0;
        $growthOTHUnitMarch = 0;
        $growthOTHUnitApril = 0;
        $growthOTHUnitMay = 0;
        $growthOTHUnitJune = 0;
        $growthOTHUnitJuly = 0;
        $growthOTHUnitAugust = 0;
        $growthOTHUnitSeptember = 0;
        $growthOTHUnitOctober = 0;
        $growthOTHUnitNovember = 0;
        $growthOTHUnitDecember = 0;
        $growthOTHBahtQ1 = 0;
        $growthOTHUnitQ1 = 0;
        $growthOTHBahtQ2 = 0;
        $growthOTHUnitQ2 = 0;
        $growthOTHBahtQ3 = 0;
        $growthOTHUnitQ3 = 0;
        $growthOTHBahtQ4 = 0;
        $growthOTHUnitQ4 = 0;        

        @endphp

        @php
        if(isset($groupedCurrYear['NP'])){        
        @endphp
            @foreach ($groupedCurrYear['NP'] as $Item)             
                @php
                if ($Item->DocMonth == '1') {
                    $currNPUnitJanuary += $Item->Quantity;
                    $currNPBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $currNPUnitFebruary += $Item->Quantity;
                    $currNPBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $currNPUnitMarch += $Item->Quantity;
                    $currNPBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $currNPUnitApril += $Item->Quantity;
                    $currNPBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $currNPUnitMay += $Item->Quantity;
                    $currNPBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $currNPUnitJune += $Item->Quantity;
                    $currNPBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $currNPUnitJuly += $Item->Quantity;
                    $currNPBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $currNPUnitAugust += $Item->Quantity;
                    $currNPBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $currNPUnitSeptember += $Item->Quantity;
                    $currNPBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $currNPUnitOctober += $Item->Quantity;
                    $currNPBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $currNPUnitNovember += $Item->Quantity;
                    $currNPBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $currNPUnitDecember += $Item->Quantity;
                    $currNPBahtDecember += $Item->Total;
                }

                $currNPTotalBaht += $Item->Total;
                $currNPTotalUnit += $Item->Quantity;           
                @endphp  
            @endforeach   
        @php   
        }   
        @endphp

        @php
        if(isset($groupedOldYear['NP'])){
        @endphp
            @foreach ($groupedOldYear['NP'] as $Item)             
                @php     
                if ($Item->DocMonth == '1') {
                    $oldNPUnitJanuary += $Item->Quantity;
                    $oldNPBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $oldNPUnitFebruary += $Item->Quantity;
                    $oldNPBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $oldNPUnitMarch += $Item->Quantity;
                    $oldNPBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $oldNPUnitApril += $Item->Quantity;
                    $oldNPBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $oldNPUnitMay += $Item->Quantity;
                    $oldNPBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $oldNPUnitJune += $Item->Quantity;
                    $oldNPBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $oldNPUnitJuly += $Item->Quantity;
                    $oldNPBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $oldNPUnitAugust += $Item->Quantity;
                    $oldNPBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $oldNPUnitSeptember += $Item->Quantity;
                    $oldNPBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $oldNPUnitOctober += $Item->Quantity;
                    $oldNPBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $oldNPUnitNovember += $Item->Quantity;
                    $oldNPBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $oldNPUnitDecember += $Item->Quantity;
                    $oldNPBahtDecember += $Item->Total;
                }

                $oldNPTotalBaht += $Item->Total;
                $oldNPTotalUnit += $Item->Quantity;     
                @endphp  
            @endforeach
        @php
        }   
        @endphp

        @php
        if(isset($groupedCurrYear['EB'])){
        @endphp
            @foreach ($groupedCurrYear['EB'] as $Item)             
                @php
                if ($Item->DocMonth == '1') {
                    $currEBUnitJanuary += $Item->Quantity;
                    $currEBBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $currEBUnitFebruary += $Item->Quantity;
                    $currEBBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $currEBUnitMarch += $Item->Quantity;
                    $currEBBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $currEBUnitApril += $Item->Quantity;
                    $currEBBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $currEBUnitMay += $Item->Quantity;
                    $currEBBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $currEBUnitJune += $Item->Quantity;
                    $currEBBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $currEBUnitJuly += $Item->Quantity;
                    $currEBBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $currEBUnitAugust += $Item->Quantity;
                    $currEBBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $currEBUnitSeptember += $Item->Quantity;
                    $currEBBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $currEBUnitOctober += $Item->Quantity;
                    $currEBBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $currEBUnitNovember += $Item->Quantity;
                    $currEBBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $currEBUnitDecember += $Item->Quantity;
                    $currEBBahtDecember += $Item->Total;
                }

                $currEBTotalBaht += $Item->Total;
                $currEBTotalUnit += $Item->Quantity;           
                @endphp  
            @endforeach
        @php
        }   
        @endphp

        @php
        if(isset($groupedOldYear['EB'])){
        @endphp
            @foreach ($groupedOldYear['EB'] as $Item)             
                @php     
                if ($Item->DocMonth == '1') {
                    $oldEBUnitJanuary += $Item->Quantity;
                    $oldEBBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $oldEBUnitFebruary += $Item->Quantity;
                    $oldEBBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $oldEBUnitMarch += $Item->Quantity;
                    $oldEBBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $oldEBUnitApril += $Item->Quantity;
                    $oldEBBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $oldEBUnitMay += $Item->Quantity;
                    $oldEBBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $oldEBUnitJune += $Item->Quantity;
                    $oldEBBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $oldEBUnitJuly += $Item->Quantity;
                    $oldEBBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $oldEBUnitAugust += $Item->Quantity;
                    $oldEBBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $oldEBUnitSeptember += $Item->Quantity;
                    $oldEBBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $oldEBUnitOctober += $Item->Quantity;
                    $oldEBBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $oldEBUnitNovember += $Item->Quantity;
                    $oldEBBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $oldEBUnitDecember += $Item->Quantity;
                    $oldEBBahtDecember += $Item->Total;
                }

                $oldEBTotalBaht += $Item->Total;
                $oldEBTotalUnit += $Item->Quantity;     
                @endphp  
            @endforeach
        @php
        }   
        @endphp

        @php
        if(isset($groupedCurrYear['IND'])){
        @endphp
            @foreach ($groupedCurrYear['IND'] as $Item)             
                @php
                if ($Item->DocMonth == '1') {
                    $currINDUnitJanuary += $Item->Quantity;
                    $currINDBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $currINDUnitFebruary += $Item->Quantity;
                    $currINDBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $currINDUnitMarch += $Item->Quantity;
                    $currINDBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $currINDUnitApril += $Item->Quantity;
                    $currINDBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $currINDUnitMay += $Item->Quantity;
                    $currINDBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $currINDUnitJune += $Item->Quantity;
                    $currINDBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $currINDUnitJuly += $Item->Quantity;
                    $currINDBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $currINDUnitAugust += $Item->Quantity;
                    $currINDBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $currINDUnitSeptember += $Item->Quantity;
                    $currINDBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $currINDUnitOctober += $Item->Quantity;
                    $currINDBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $currINDUnitNovember += $Item->Quantity;
                    $currINDBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $currINDUnitDecember += $Item->Quantity;
                    $currINDBahtDecember += $Item->Total;
                }

                $currINDTotalBaht += $Item->Total;
                $currINDTotalUnit += $Item->Quantity;           
                @endphp  
            @endforeach 
        @php
        }   
        @endphp

        @php
        if(isset($groupedOldYear['IND'])){
        @endphp
            @foreach ($groupedOldYear['IND'] as $Item)             
                @php     
                if ($Item->DocMonth == '1') {
                    $oldINDUnitJanuary += $Item->Quantity;
                    $oldINDBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $oldINDUnitFebruary += $Item->Quantity;
                    $oldINDBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $oldINDUnitMarch += $Item->Quantity;
                    $oldINDBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $oldINDUnitApril += $Item->Quantity;
                    $oldINDBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $oldINDUnitMay += $Item->Quantity;
                    $oldINDBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $oldINDUnitJune += $Item->Quantity;
                    $oldINDBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $oldINDUnitJuly += $Item->Quantity;
                    $oldINDBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $oldINDUnitAugust += $Item->Quantity;
                    $oldINDBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $oldINDUnitSeptember += $Item->Quantity;
                    $oldINDBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $oldINDUnitOctober += $Item->Quantity;
                    $oldINDBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $oldINDUnitNovember += $Item->Quantity;
                    $oldINDBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $oldINDUnitDecember += $Item->Quantity;
                    $oldINDBahtDecember += $Item->Total;
                }

                $oldINDTotalBaht += $Item->Total;
                $oldINDTotalUnit += $Item->Quantity;     
                @endphp  
            @endforeach
        @php
        }   
        @endphp

        @php
        if(isset($groupedCurrYear['OTH'])){
        @endphp
            @foreach ($groupedCurrYear['OTH'] as $Item)             
                @php
                if ($Item->DocMonth == '1') {
                    $currOTHUnitJanuary += $Item->Quantity;
                    $currOTHBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $currOTHUnitFebruary += $Item->Quantity;
                    $currOTHBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $currOTHUnitMarch += $Item->Quantity;
                    $currOTHBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $currOTHUnitApril += $Item->Quantity;
                    $currOTHBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $currOTHUnitMay += $Item->Quantity;
                    $currOTHBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $currOTHUnitJune += $Item->Quantity;
                    $currOTHBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $currOTHUnitJuly += $Item->Quantity;
                    $currOTHBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $currOTHUnitAugust += $Item->Quantity;
                    $currOTHBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $currOTHUnitSeptember += $Item->Quantity;
                    $currOTHBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $currOTHUnitOctober += $Item->Quantity;
                    $currOTHBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $currOTHUnitNovember += $Item->Quantity;
                    $currOTHBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $currOTHUnitDecember += $Item->Quantity;
                    $currOTHBahtDecember += $Item->Total;
                }

                $currOTHTotalBaht += $Item->Total;
                $currOTHTotalUnit += $Item->Quantity;           
                @endphp  
            @endforeach 
        @php
        }   
        @endphp

        @php
        if(isset($groupedOldYear['OTH'])){
        @endphp
            @foreach ($groupedOldYear['OTH'] as $Item)             
                @php     
                if ($Item->DocMonth == '1') {
                    $oldOTHUnitJanuary += $Item->Quantity;
                    $oldOTHBahtJanuary += $Item->Total;
                } else if ($Item->DocMonth == '2') {
                    $oldOTHUnitFebruary += $Item->Quantity;
                    $oldOTHBahtFebruary += $Item->Total;
                } else if ($Item->DocMonth == '3') {
                    $oldOTHUnitMarch += $Item->Quantity;
                    $oldOTHBahtMarch += $Item->Total;
                } else if ($Item->DocMonth == '4') {
                    $oldOTHUnitApril += $Item->Quantity;
                    $oldOTHBahtApril += $Item->Total;
                } else if ($Item->DocMonth == '5') {
                    $oldOTHUnitMay += $Item->Quantity;
                    $oldOTHBahtMay += $Item->Total;
                } else if ($Item->DocMonth == '6') {
                    $oldOTHUnitJune += $Item->Quantity;
                    $oldOTHBahtJune += $Item->Total;
                } else if ($Item->DocMonth == '7') {
                    $oldOTHUnitJuly += $Item->Quantity;
                    $oldOTHBahtJuly += $Item->Total;
                } else if ($Item->DocMonth == '8') {
                    $oldOTHUnitAugust += $Item->Quantity;
                    $oldOTHBahtAugust += $Item->Total;
                } else if ($Item->DocMonth == '9') {
                    $oldOTHUnitSeptember += $Item->Quantity;
                    $oldOTHBahtSeptember += $Item->Total;
                } else if ($Item->DocMonth == '10') {
                    $oldOTHUnitOctober += $Item->Quantity;
                    $oldOTHBahtOctober += $Item->Total;
                } else if ($Item->DocMonth == '11') {
                    $oldOTHUnitNovember += $Item->Quantity;
                    $oldOTHBahtNovember += $Item->Total;
                } else if ($Item->DocMonth == '12') {
                    $oldOTHUnitDecember += $Item->Quantity;
                    $oldOTHBahtDecember += $Item->Total;
                }

                $oldOTHTotalBaht += $Item->Total;
                $oldOTHTotalUnit += $Item->Quantity;     
                @endphp  
            @endforeach
        @php
        }   
        @endphp
              
        @php
            
            function calZero($zero)
                {
                    if ($zero == 0) {                    
                        return NAN;
                    } else {
                        return $zero;
                    }
                }

        $growthNPBahtJanuary = (($currNPBahtJanuary - $oldNPBahtJanuary) * 100) / calZero($oldNPBahtJanuary);
        $growthNPBahtFebruary = (($currNPBahtFebruary - $oldNPBahtFebruary) * 100) / calZero($oldNPBahtFebruary);
        $growthNPBahtMarch = (($currNPBahtMarch - $oldNPBahtMarch) * 100) / calZero($oldNPBahtMarch);
        $growthNPBahtApril = (($currNPBahtApril - $oldNPBahtApril) * 100) / calZero($oldNPBahtApril);
        $growthNPBahtMay = (($currNPBahtMay - $oldNPBahtMay) * 100) / calZero($oldNPBahtMay);
        $growthNPBahtJune = (($currNPBahtJune - $oldNPBahtJune) * 100) / calZero($oldNPBahtJune);
        $growthNPBahtJuly = (($currNPBahtJuly - $oldNPBahtJuly) * 100) / calZero($oldNPBahtJuly);
        $growthNPBahtAugust = (($currNPBahtAugust - $oldNPBahtAugust) * 100) / calZero($oldNPBahtAugust);
        $growthNPBahtSeptember = (($currNPBahtSeptember - $oldNPBahtSeptember) * 100) / calZero($oldNPBahtSeptember);
        $growthNPBahtOctober = (($currNPBahtOctober - $oldNPBahtOctober) * 100) / calZero($oldNPBahtOctober);
        $growthNPBahtNovember = (($currNPBahtNovember - $oldNPBahtNovember) * 100) / calZero($oldNPBahtNovember);
        $growthNPBahtDecember = (($currNPBahtDecember - $oldNPBahtDecember) * 100) / calZero($oldNPBahtDecember);
        $growthNPBahtTotal = (($currNPTotalBaht - $oldNPTotalBaht) * 100) / calZero($oldNPTotalBaht);

        $growthNPUnitJanuary = (($currNPUnitJanuary - $oldNPUnitJanuary) * 100) / calZero($oldNPUnitJanuary);
        $growthNPUnitFebruary = (($currNPUnitFebruary - $oldNPUnitFebruary) * 100) / calZero($oldNPUnitFebruary);
        $growthNPUnitMarch = (($currNPUnitMarch - $oldNPUnitMarch) * 100) / calZero($oldNPUnitMarch);
        $growthNPUnitApril = (($currNPUnitApril - $oldNPUnitApril) * 100) / calZero($oldNPUnitApril);
        $growthNPUnitMay = (($currNPUnitMay - $oldNPUnitMay) * 100) / calZero($oldNPUnitMay);
        $growthNPUnitJune = (($currNPUnitJune - $oldNPUnitJune) * 100) / calZero($oldNPUnitJune);
        $growthNPUnitJuly = (($currNPUnitJuly - $oldNPUnitJuly) * 100) / calZero($oldNPUnitJuly);
        $growthNPUnitAugust = (($currNPUnitAugust - $oldNPUnitAugust) * 100) / calZero($oldNPUnitAugust);
        $growthNPUnitSeptember = (($currNPUnitSeptember - $oldNPUnitSeptember) * 100) / calZero($oldNPUnitSeptember);
        $growthNPUnitOctober = (($currNPUnitOctober - $oldNPUnitOctober) * 100) / calZero($oldNPUnitOctober);
        $growthNPUnitNovember = (($currNPUnitNovember - $oldNPUnitNovember) * 100) / calZero($oldNPUnitNovember);
        $growthNPUnitDecember = (($currNPUnitDecember - $oldNPUnitDecember) * 100) / calZero($oldNPUnitDecember);
        $growthNPUnitTotal = (($currNPTotalUnit - $oldNPTotalUnit) * 100) / calZero($oldNPTotalUnit);
        
        $totalNPBahtTarget = getAmount($targetNP->AmtQ1) + getAmount($targetNP->AmtQ2) + getAmount($targetNP->AmtQ3) + getAmount($targetNP->AmtQ4); 
        $totalNPUnitTarget = getAmount($targetNP->UnitQ1) + getAmount($targetNP->UnitQ2) + getAmount($targetNP->UnitQ3) + getAmount($targetNP->UnitQ4);
    
        $achieveNPBahtJanuary = ($currNPBahtJanuary * 100) /  calZero(getAmount($targetNP->Amt01));
        $achieveNPBahtFebruary = ($currNPBahtFebruary * 100) /  calZero(getAmount($targetNP->Amt02));
        $achieveNPBahtMarch = ($currNPBahtMarch * 100) /  calZero(getAmount($targetNP->Amt03));
        $achieveNPBahtApril = ($currNPBahtApril * 100) /  calZero(getAmount($targetNP->Amt04));
        $achieveNPBahtMay = ($currNPBahtMay * 100) /  calZero(getAmount($targetNP->Amt05));
        $achieveNPBahtJune = ($currNPBahtJune * 100) /  calZero(getAmount($targetNP->Amt06));
        $achieveNPBahtJuly = ($currNPBahtJuly * 100) /  calZero(getAmount($targetNP->Amt07));
        $achieveNPBahtAugust = ($currNPBahtAugust * 100) /  calZero(getAmount($targetNP->Amt08));
        $achieveNPBahtSeptember = ($currNPBahtSeptember * 100) /  calZero(getAmount($targetNP->Amt09));
        $achieveNPBahtOctober = ($currNPBahtOctober * 100) /  calZero(getAmount($targetNP->Amt10));
        $achieveNPBahtNovember = ($currNPBahtNovember * 100) /  calZero(getAmount($targetNP->Amt11));
        $achieveNPBahtDecember = ($currNPBahtDecember * 100) /  calZero(getAmount($targetNP->Amt12));
        $achieveNPBahtTotal = ($currNPTotalBaht * 100) / calZero($totalNPBahtTarget);
        
        $achieveNPUnitJanuary = ($currNPUnitJanuary * 100) /  calZero(getAmount($targetNP->Unit01));
        $achieveNPUnitFebruary = ($currNPUnitFebruary * 100) /  calZero(getAmount($targetNP->Unit02));
        $achieveNPUnitMarch = ($currNPUnitMarch * 100) /  calZero(getAmount($targetNP->Unit03));
        $achieveNPUnitApril = ($currNPUnitApril * 100) /  calZero(getAmount($targetNP->Unit04));
        $achieveNPUnitMay = ($currNPUnitMay * 100) /  calZero(getAmount($targetNP->Unit05));
        $achieveNPUnitJune = ($currNPUnitJune * 100) /  calZero(getAmount($targetNP->Unit06));
        $achieveNPUnitJuly = ($currNPUnitJuly * 100) /  calZero(getAmount($targetNP->Unit07));
        $achieveNPUnitAugust = ($currNPUnitAugust * 100) /  calZero(getAmount($targetNP->Unit08));
        $achieveNPUnitSeptember = ($currNPUnitSeptember * 100) /  calZero(getAmount($targetNP->Unit09));
        $achieveNPUnitOctober = ($currNPUnitOctober * 100) /  calZero(getAmount($targetNP->Unit10));
        $achieveNPUnitNovember = ($currNPUnitNovember * 100) /  calZero(getAmount($targetNP->Unit11));
        $achieveNPUnitDecember = ($currNPUnitDecember * 100) /  calZero(getAmount($targetNP->Unit12));
        $achieveNPUnitTotal = ($currNPTotalUnit * 100) / calZero($totalNPUnitTarget);

        $growthEBBahtJanuary = (($currEBBahtJanuary - $oldEBBahtJanuary) * 100) / calZero($oldEBBahtJanuary);
        $growthEBBahtFebruary = (($currEBBahtFebruary - $oldEBBahtFebruary) * 100) / calZero($oldEBBahtFebruary);
        $growthEBBahtMarch = (($currEBBahtMarch - $oldEBBahtMarch) * 100) / calZero($oldEBBahtMarch);
        $growthEBBahtApril = (($currEBBahtApril - $oldEBBahtApril) * 100) / calZero($oldEBBahtApril);
        $growthEBBahtMay = (($currEBBahtMay - $oldEBBahtMay) * 100) / calZero($oldEBBahtMay);
        $growthEBBahtJune = (($currEBBahtJune - $oldEBBahtJune) * 100) / calZero($oldEBBahtJune);
        $growthEBBahtJuly = (($currEBBahtJuly - $oldEBBahtJuly) * 100) / calZero($oldEBBahtJuly);
        $growthEBBahtAugust = (($currEBBahtAugust - $oldEBBahtAugust) * 100) / calZero($oldEBBahtAugust);
        $growthEBBahtSeptember = (($currEBBahtSeptember - $oldEBBahtSeptember) * 100) / calZero($oldEBBahtSeptember);
        $growthEBBahtOctober = (($currEBBahtOctober - $oldEBBahtOctober) * 100) / calZero($oldEBBahtOctober);
        $growthEBBahtNovember = (($currEBBahtNovember - $oldEBBahtNovember) * 100) / calZero($oldEBBahtNovember);
        $growthEBBahtDecember = (($currEBBahtDecember - $oldEBBahtDecember) * 100) / calZero($oldEBBahtDecember);
        $growthEBBahtTotal = (($currEBTotalBaht - $oldEBTotalBaht) * 100) / calZero($oldEBTotalBaht);

        $growthEBUnitJanuary = (($currEBUnitJanuary - $oldEBUnitJanuary) * 100) / calZero($oldEBUnitJanuary);
        $growthEBUnitFebruary = (($currEBUnitFebruary - $oldEBUnitFebruary) * 100) / calZero($oldEBUnitFebruary);
        $growthEBUnitMarch = (($currEBUnitMarch - $oldEBUnitMarch) * 100) / calZero($oldEBUnitMarch);
        $growthEBUnitApril = (($currEBUnitApril - $oldEBUnitApril) * 100) / calZero($oldEBUnitApril);
        $growthEBUnitMay = (($currEBUnitMay - $oldEBUnitMay) * 100) / calZero($oldEBUnitMay);
        $growthEBUnitJune = (($currEBUnitJune - $oldEBUnitJune) * 100) / calZero($oldEBUnitJune);
        $growthEBUnitJuly = (($currEBUnitJuly - $oldEBUnitJuly) * 100) / calZero($oldEBUnitJuly);
        $growthEBUnitAugust = (($currEBUnitAugust - $oldEBUnitAugust) * 100) / calZero($oldEBUnitAugust);
        $growthEBUnitSeptember = (($currEBUnitSeptember - $oldEBUnitSeptember) * 100) / calZero($oldEBUnitSeptember);
        $growthEBUnitOctober = (($currEBUnitOctober - $oldEBUnitOctober) * 100) / calZero($oldEBUnitOctober);
        $growthEBUnitNovember = (($currEBUnitNovember - $oldEBUnitNovember) * 100) / calZero($oldEBUnitNovember);
        $growthEBUnitDecember = (($currEBUnitDecember - $oldEBUnitDecember) * 100) / calZero($oldEBUnitDecember);
        $growthEBUnitTotal = (($currEBTotalUnit - $oldEBTotalUnit) * 100) / calZero($oldEBTotalUnit);
        
        $totalEBBahtTarget = getAmount($targetEB->AmtQ1) + getAmount($targetEB->AmtQ2) + getAmount($targetEB->AmtQ3) + getAmount($targetEB->AmtQ4); 
        $totalEBUnitTarget = getAmount($targetEB->UnitQ1) + getAmount($targetEB->UnitQ2) + getAmount($targetEB->UnitQ3) + getAmount($targetEB->UnitQ4);
    
        $achieveEBBahtJanuary = ($currEBBahtJanuary * 100) /  calZero(getAmount($targetEB->Amt01));
        $achieveEBBahtFebruary = ($currEBBahtFebruary * 100) /  calZero(getAmount($targetEB->Amt02));
        $achieveEBBahtMarch = ($currEBBahtMarch * 100) /  calZero(getAmount($targetEB->Amt03));
        $achieveEBBahtApril = ($currEBBahtApril * 100) /  calZero(getAmount($targetEB->Amt04));
        $achieveEBBahtMay = ($currEBBahtMay * 100) /  calZero(getAmount($targetEB->Amt05));
        $achieveEBBahtJune = ($currEBBahtJune * 100) /  calZero(getAmount($targetEB->Amt06));
        $achieveEBBahtJuly = ($currEBBahtJuly * 100) /  calZero(getAmount($targetEB->Amt07));
        $achieveEBBahtAugust = ($currEBBahtAugust * 100) /  calZero(getAmount($targetEB->Amt08));
        $achieveEBBahtSeptember = ($currEBBahtSeptember * 100) /  calZero(getAmount($targetEB->Amt09));
        $achieveEBBahtOctober = ($currEBBahtOctober * 100) /  calZero(getAmount($targetEB->Amt10));
        $achieveEBBahtNovember = ($currEBBahtNovember * 100) /  calZero(getAmount($targetEB->Amt11));
        $achieveEBBahtDecember = ($currEBBahtDecember * 100) /  calZero(getAmount($targetEB->Amt12));
        $achieveEBBahtTotal = ($currEBTotalBaht * 100) / calZero($totalEBBahtTarget);
        
        $achieveEBUnitJanuary = ($currEBUnitJanuary * 100) /  calZero(getAmount($targetEB->Unit01));
        $achieveEBUnitFebruary = ($currEBUnitFebruary * 100) /  calZero(getAmount($targetEB->Unit02));
        $achieveEBUnitMarch = ($currEBUnitMarch * 100) /  calZero(getAmount($targetEB->Unit03));
        $achieveEBUnitApril = ($currEBUnitApril * 100) /  calZero(getAmount($targetEB->Unit04));
        $achieveEBUnitMay = ($currEBUnitMay * 100) /  calZero(getAmount($targetEB->Unit05));
        $achieveEBUnitJune = ($currEBUnitJune * 100) /  calZero(getAmount($targetEB->Unit06));
        $achieveEBUnitJuly = ($currEBUnitJuly * 100) /  calZero(getAmount($targetEB->Unit07));
        $achieveEBUnitAugust = ($currEBUnitAugust * 100) /  calZero(getAmount($targetEB->Unit08));
        $achieveEBUnitSeptember = ($currEBUnitSeptember * 100) /  calZero(getAmount($targetEB->Unit09));
        $achieveEBUnitOctober = ($currEBUnitOctober * 100) /  calZero(getAmount($targetEB->Unit10));
        $achieveEBUnitNovember = ($currEBUnitNovember * 100) /  calZero(getAmount($targetEB->Unit11));
        $achieveEBUnitDecember = ($currEBUnitDecember * 100) /  calZero(getAmount($targetEB->Unit12));
        $achieveEBUnitTotal = ($currEBTotalUnit * 100) / calZero($totalEBUnitTarget);

        $growthINDBahtJanuary = (($currINDBahtJanuary - $oldINDBahtJanuary) * 100) / calZero($oldINDBahtJanuary);
        $growthINDBahtFebruary = (($currINDBahtFebruary - $oldINDBahtFebruary) * 100) / calZero($oldINDBahtFebruary);
        $growthINDBahtMarch = (($currINDBahtMarch - $oldINDBahtMarch) * 100) / calZero($oldINDBahtMarch);
        $growthINDBahtApril = (($currINDBahtApril - $oldINDBahtApril) * 100) / calZero($oldINDBahtApril);
        $growthINDBahtMay = (($currINDBahtMay - $oldINDBahtMay) * 100) / calZero($oldINDBahtMay);
        $growthINDBahtJune = (($currINDBahtJune - $oldINDBahtJune) * 100) / calZero($oldINDBahtJune);
        $growthINDBahtJuly = (($currINDBahtJuly - $oldINDBahtJuly) * 100) / calZero($oldINDBahtJuly);
        $growthINDBahtAugust = (($currINDBahtAugust - $oldINDBahtAugust) * 100) / calZero($oldINDBahtAugust);
        $growthINDBahtSeptember = (($currINDBahtSeptember - $oldINDBahtSeptember) * 100) / calZero($oldINDBahtSeptember);
        $growthINDBahtOctober = (($currINDBahtOctober - $oldINDBahtOctober) * 100) / calZero($oldINDBahtOctober);
        $growthINDBahtNovember = (($currINDBahtNovember - $oldINDBahtNovember) * 100) / calZero($oldINDBahtNovember);
        $growthINDBahtDecember = (($currINDBahtDecember - $oldINDBahtDecember) * 100) / calZero($oldINDBahtDecember);
        $growthINDBahtTotal = (($currINDTotalBaht - $oldINDTotalBaht) * 100) / calZero($oldINDTotalBaht);

        $growthINDUnitJanuary = (($currINDUnitJanuary - $oldINDUnitJanuary) * 100) / calZero($oldINDUnitJanuary);
        $growthINDUnitFebruary = (($currINDUnitFebruary - $oldINDUnitFebruary) * 100) / calZero($oldINDUnitFebruary);
        $growthINDUnitMarch = (($currINDUnitMarch - $oldINDUnitMarch) * 100) / calZero($oldINDUnitMarch);
        $growthINDUnitApril = (($currINDUnitApril - $oldINDUnitApril) * 100) / calZero($oldINDUnitApril);
        $growthINDUnitMay = (($currINDUnitMay - $oldINDUnitMay) * 100) / calZero($oldINDUnitMay);
        $growthINDUnitJune = (($currINDUnitJune - $oldINDUnitJune) * 100) / calZero($oldINDUnitJune);
        $growthINDUnitJuly = (($currINDUnitJuly - $oldINDUnitJuly) * 100) / calZero($oldINDUnitJuly);
        $growthINDUnitAugust = (($currINDUnitAugust - $oldINDUnitAugust) * 100) / calZero($oldINDUnitAugust);
        $growthINDUnitSeptember = (($currINDUnitSeptember - $oldINDUnitSeptember) * 100) / calZero($oldINDUnitSeptember);
        $growthINDUnitOctober = (($currINDUnitOctober - $oldINDUnitOctober) * 100) / calZero($oldINDUnitOctober);
        $growthINDUnitNovember = (($currINDUnitNovember - $oldINDUnitNovember) * 100) / calZero($oldINDUnitNovember);
        $growthINDUnitDecember = (($currINDUnitDecember - $oldINDUnitDecember) * 100) / calZero($oldINDUnitDecember);
        $growthINDUnitTotal = (($currINDTotalUnit - $oldINDTotalUnit) * 100) / calZero($oldINDTotalUnit);
        
        $totalINDBahtTarget = getAmount($targetIND->AmtQ1) + getAmount($targetIND->AmtQ2) + getAmount($targetIND->AmtQ3) + getAmount($targetIND->AmtQ4); 
        $totalINDUnitTarget = getAmount($targetIND->UnitQ1) + getAmount($targetIND->UnitQ2) + getAmount($targetIND->UnitQ3) + getAmount($targetIND->UnitQ4);
    
        $achieveINDBahtJanuary = ($currINDBahtJanuary * 100) /  calZero(getAmount($targetIND->Amt01));
        $achieveINDBahtFebruary = ($currINDBahtFebruary * 100) /  calZero(getAmount($targetIND->Amt02));
        $achieveINDBahtMarch = ($currINDBahtMarch * 100) /  calZero(getAmount($targetIND->Amt03));
        $achieveINDBahtApril = ($currINDBahtApril * 100) /  calZero(getAmount($targetIND->Amt04));
        $achieveINDBahtMay = ($currINDBahtMay * 100) /  calZero(getAmount($targetIND->Amt05));
        $achieveINDBahtJune = ($currINDBahtJune * 100) /  calZero(getAmount($targetIND->Amt06));
        $achieveINDBahtJuly = ($currINDBahtJuly * 100) /  calZero(getAmount($targetIND->Amt07));
        $achieveINDBahtAugust = ($currINDBahtAugust * 100) /  calZero(getAmount($targetIND->Amt08));
        $achieveINDBahtSeptember = ($currINDBahtSeptember * 100) /  calZero(getAmount($targetIND->Amt09));
        $achieveINDBahtOctober = ($currINDBahtOctober * 100) /  calZero(getAmount($targetIND->Amt10));
        $achieveINDBahtNovember = ($currINDBahtNovember * 100) /  calZero(getAmount($targetIND->Amt11));
        $achieveINDBahtDecember = ($currINDBahtDecember * 100) /  calZero(getAmount($targetIND->Amt12));
        $achieveINDBahtTotal = ($currINDTotalBaht * 100) / calZero($totalINDBahtTarget);
        
        $achieveINDUnitJanuary = ($currINDUnitJanuary * 100) /  calZero(getAmount($targetIND->Unit01));
        $achieveINDUnitFebruary = ($currINDUnitFebruary * 100) /  calZero(getAmount($targetIND->Unit02));
        $achieveINDUnitMarch = ($currINDUnitMarch * 100) /  calZero(getAmount($targetIND->Unit03));
        $achieveINDUnitApril = ($currINDUnitApril * 100) /  calZero(getAmount($targetIND->Unit04));
        $achieveINDUnitMay = ($currINDUnitMay * 100) /  calZero(getAmount($targetIND->Unit05));
        $achieveINDUnitJune = ($currINDUnitJune * 100) /  calZero(getAmount($targetIND->Unit06));
        $achieveINDUnitJuly = ($currINDUnitJuly * 100) /  calZero(getAmount($targetIND->Unit07));
        $achieveINDUnitAugust = ($currINDUnitAugust * 100) /  calZero(getAmount($targetIND->Unit08));
        $achieveINDUnitSeptember = ($currINDUnitSeptember * 100) /  calZero(getAmount($targetIND->Unit09));
        $achieveINDUnitOctober = ($currINDUnitOctober * 100) /  calZero(getAmount($targetIND->Unit10));
        $achieveINDUnitNovember = ($currINDUnitNovember * 100) /  calZero(getAmount($targetIND->Unit11));
        $achieveINDUnitDecember = ($currINDUnitDecember * 100) /  calZero(getAmount($targetIND->Unit12));
        $achieveINDUnitTotal = ($currINDTotalUnit * 100) / calZero($totalINDUnitTarget);

        $growthOTHBahtJanuary = (($currOTHBahtJanuary - $oldOTHBahtJanuary) * 100) / calZero($oldOTHBahtJanuary);
        $growthOTHBahtFebruary = (($currOTHBahtFebruary - $oldOTHBahtFebruary) * 100) / calZero($oldOTHBahtFebruary);
        $growthOTHBahtMarch = (($currOTHBahtMarch - $oldOTHBahtMarch) * 100) / calZero($oldOTHBahtMarch);
        $growthOTHBahtApril = (($currOTHBahtApril - $oldOTHBahtApril) * 100) / calZero($oldOTHBahtApril);
        $growthOTHBahtMay = (($currOTHBahtMay - $oldOTHBahtMay) * 100) / calZero($oldOTHBahtMay);
        $growthOTHBahtJune = (($currOTHBahtJune - $oldOTHBahtJune) * 100) / calZero($oldOTHBahtJune);
        $growthOTHBahtJuly = (($currOTHBahtJuly - $oldOTHBahtJuly) * 100) / calZero($oldOTHBahtJuly);
        $growthOTHBahtAugust = (($currOTHBahtAugust - $oldOTHBahtAugust) * 100) / calZero($oldOTHBahtAugust);
        $growthOTHBahtSeptember = (($currOTHBahtSeptember - $oldOTHBahtSeptember) * 100) / calZero($oldOTHBahtSeptember);
        $growthOTHBahtOctober = (($currOTHBahtOctober - $oldOTHBahtOctober) * 100) / calZero($oldOTHBahtOctober);
        $growthOTHBahtNovember = (($currOTHBahtNovember - $oldOTHBahtNovember) * 100) / calZero($oldOTHBahtNovember);
        $growthOTHBahtDecember = (($currOTHBahtDecember - $oldOTHBahtDecember) * 100) / calZero($oldOTHBahtDecember);
        $growthOTHBahtTotal = (($currOTHTotalBaht - $oldOTHTotalBaht) * 100) / calZero($oldOTHTotalBaht);

        $growthOTHUnitJanuary = (($currOTHUnitJanuary - $oldOTHUnitJanuary) * 100) / calZero($oldOTHUnitJanuary);
        $growthOTHUnitFebruary = (($currOTHUnitFebruary - $oldOTHUnitFebruary) * 100) / calZero($oldOTHUnitFebruary);
        $growthOTHUnitMarch = (($currOTHUnitMarch - $oldOTHUnitMarch) * 100) / calZero($oldOTHUnitMarch);
        $growthOTHUnitApril = (($currOTHUnitApril - $oldOTHUnitApril) * 100) / calZero($oldOTHUnitApril);
        $growthOTHUnitMay = (($currOTHUnitMay - $oldOTHUnitMay) * 100) / calZero($oldOTHUnitMay);
        $growthOTHUnitJune = (($currOTHUnitJune - $oldOTHUnitJune) * 100) / calZero($oldOTHUnitJune);
        $growthOTHUnitJuly = (($currOTHUnitJuly - $oldOTHUnitJuly) * 100) / calZero($oldOTHUnitJuly);
        $growthOTHUnitAugust = (($currOTHUnitAugust - $oldOTHUnitAugust) * 100) / calZero($oldOTHUnitAugust);
        $growthOTHUnitSeptember = (($currOTHUnitSeptember - $oldOTHUnitSeptember) * 100) / calZero($oldOTHUnitSeptember);
        $growthOTHUnitOctober = (($currOTHUnitOctober - $oldOTHUnitOctober) * 100) / calZero($oldOTHUnitOctober);
        $growthOTHUnitNovember = (($currOTHUnitNovember - $oldOTHUnitNovember) * 100) / calZero($oldOTHUnitNovember);
        $growthOTHUnitDecember = (($currOTHUnitDecember - $oldOTHUnitDecember) * 100) / calZero($oldOTHUnitDecember);
        $growthOTHUnitTotal = (($currOTHTotalUnit - $oldOTHTotalUnit) * 100) / calZero($oldOTHTotalUnit);
        
        $totalOTHBahtTarget = getAmount($targetOTH->AmtQ1) + getAmount($targetOTH->AmtQ2) + getAmount($targetOTH->AmtQ3) + getAmount($targetOTH->AmtQ4); 
        $totalOTHUnitTarget = getAmount($targetOTH->UnitQ1) + getAmount($targetOTH->UnitQ2) + getAmount($targetOTH->UnitQ3) + getAmount($targetOTH->UnitQ4);
    
        $achieveOTHBahtJanuary = ($currOTHBahtJanuary * 100) /  calZero(getAmount($targetOTH->Amt01));
        $achieveOTHBahtFebruary = ($currOTHBahtFebruary * 100) /  calZero(getAmount($targetOTH->Amt02));
        $achieveOTHBahtMarch = ($currOTHBahtMarch * 100) /  calZero(getAmount($targetOTH->Amt03));
        $achieveOTHBahtApril = ($currOTHBahtApril * 100) /  calZero(getAmount($targetOTH->Amt04));
        $achieveOTHBahtMay = ($currOTHBahtMay * 100) /  calZero(getAmount($targetOTH->Amt05));
        $achieveOTHBahtJune = ($currOTHBahtJune * 100) /  calZero(getAmount($targetOTH->Amt06));
        $achieveOTHBahtJuly = ($currOTHBahtJuly * 100) /  calZero(getAmount($targetOTH->Amt07));
        $achieveOTHBahtAugust = ($currOTHBahtAugust * 100) /  calZero(getAmount($targetOTH->Amt08));
        $achieveOTHBahtSeptember = ($currOTHBahtSeptember * 100) /  calZero(getAmount($targetOTH->Amt09));
        $achieveOTHBahtOctober = ($currOTHBahtOctober * 100) /  calZero(getAmount($targetOTH->Amt10));
        $achieveOTHBahtNovember = ($currOTHBahtNovember * 100) /  calZero(getAmount($targetOTH->Amt11));
        $achieveOTHBahtDecember = ($currOTHBahtDecember * 100) /  calZero(getAmount($targetOTH->Amt12));
        $achieveOTHBahtTotal = ($currOTHTotalBaht * 100) / calZero($totalOTHBahtTarget);
        
        $achieveOTHUnitJanuary = ($currOTHUnitJanuary * 100) /  calZero(getAmount($targetOTH->Unit01));
        $achieveOTHUnitFebruary = ($currOTHUnitFebruary * 100) /  calZero(getAmount($targetOTH->Unit02));
        $achieveOTHUnitMarch = ($currOTHUnitMarch * 100) /  calZero(getAmount($targetOTH->Unit03));
        $achieveOTHUnitApril = ($currOTHUnitApril * 100) /  calZero(getAmount($targetOTH->Unit04));
        $achieveOTHUnitMay = ($currOTHUnitMay * 100) /  calZero(getAmount($targetOTH->Unit05));
        $achieveOTHUnitJune = ($currOTHUnitJune * 100) /  calZero(getAmount($targetOTH->Unit06));
        $achieveOTHUnitJuly = ($currOTHUnitJuly * 100) /  calZero(getAmount($targetOTH->Unit07));
        $achieveOTHUnitAugust = ($currOTHUnitAugust * 100) /  calZero(getAmount($targetOTH->Unit08));
        $achieveOTHUnitSeptember = ($currOTHUnitSeptember * 100) /  calZero(getAmount($targetOTH->Unit09));
        $achieveOTHUnitOctober = ($currOTHUnitOctober * 100) /  calZero(getAmount($targetOTH->Unit10));
        $achieveOTHUnitNovember = ($currOTHUnitNovember * 100) /  calZero(getAmount($targetOTH->Unit11));
        $achieveOTHUnitDecember = ($currOTHUnitDecember * 100) /  calZero(getAmount($targetOTH->Unit12));
        $achieveOTHUnitTotal = ($currOTHTotalUnit * 100) / calZero($totalOTHUnitTarget);
        
        $currTotalBaht = $currNPTotalBaht + $currEBTotalBaht + $currINDTotalBaht + $currOTHTotalBaht;
        $currTotalUnit = $currNPTotalUnit + $currEBTotalUnit + $currINDTotalUnit + $currOTHTotalUnit;
        $oldTotalBaht = $oldNPTotalBaht + $oldEBTotalBaht + $oldINDTotalBaht + $oldOTHTotalBaht;
        $oldTotalUnit = $oldNPTotalUnit + $oldEBTotalUnit + $oldINDTotalUnit + $oldOTHTotalUnit;
        $currUnitJanuary = $currNPUnitJanuary + $currEBUnitJanuary + $currINDUnitJanuary + $currOTHUnitJanuary;
        $currUnitFebruary = $currNPUnitFebruary + $currEBUnitFebruary + $currINDUnitFebruary + $currOTHUnitFebruary;
        $currUnitMarch = $currNPUnitMarch + $currEBUnitMarch + $currINDUnitMarch + $currOTHUnitMarch;
        $currUnitApril = $currNPUnitApril + $currEBUnitApril + $currINDUnitApril + $currOTHUnitApril;
        $currUnitMay = $currNPUnitMay + $currEBUnitMay + $currINDUnitMay + $currOTHUnitMay;
        $currUnitJune = $currNPUnitJune + $currEBUnitJune + $currINDUnitJune + $currOTHUnitJune;
        $currUnitJuly = $currNPUnitJuly + $currEBUnitJuly + $currINDUnitJuly + $currOTHUnitJuly;
        $currUnitAugust = $currNPUnitAugust + $currEBUnitAugust + $currINDUnitAugust + $currOTHUnitAugust;
        $currUnitSeptember = $currNPUnitSeptember + $currEBUnitSeptember + $currINDUnitSeptember + $currOTHUnitSeptember;
        $currUnitOctober = $currNPUnitOctober + $currEBUnitOctober + $currINDUnitOctober + $currOTHUnitOctober;
        $currUnitNovember = $currNPUnitNovember + $currEBUnitNovember + $currINDUnitNovember + $currOTHUnitNovember;
        $currUnitDecember = $currNPUnitDecember + $currEBUnitDecember + $currINDUnitDecember + $currOTHUnitDecember;
        $currBahtJanuary = $currNPBahtJanuary + $currEBBahtJanuary + $currINDBahtJanuary + $currOTHBahtJanuary;
        $currBahtFebruary = $currNPBahtFebruary + $currEBBahtFebruary + $currINDBahtFebruary + $currOTHBahtFebruary;
        $currBahtMarch = $currNPBahtMarch + $currEBBahtMarch + $currINDBahtMarch + $currOTHBahtMarch;
        $currBahtApril = $currNPBahtApril + $currEBBahtApril + $currINDBahtApril + $currOTHBahtApril;
        $currBahtMay = $currNPBahtMay + $currEBBahtMay + $currINDBahtMay + $currOTHBahtMay;
        $currBahtJune = $currNPBahtJune + $currEBBahtJune + $currINDBahtJune + $currOTHBahtJune;
        $currBahtJuly = $currNPBahtJuly + $currEBBahtJuly + $currINDBahtJuly + $currOTHBahtJuly;
        $currBahtAugust = $currNPBahtAugust + $currEBBahtAugust + $currINDBahtAugust + $currOTHBahtAugust;
        $currBahtSeptember = $currNPBahtSeptember + $currEBBahtSeptember + $currINDBahtSeptember + $currOTHBahtSeptember;
        $currBahtOctober = $currNPBahtOctober + $currEBBahtOctober + $currINDBahtOctober + $currOTHBahtOctober;
        $currBahtNovember = $currNPBahtNovember + $currEBBahtNovember + $currINDBahtNovember + $currOTHBahtNovember;
        $currBahtDecember = $currNPBahtDecember + $currEBBahtDecember + $currINDBahtDecember + $currOTHBahtDecember;
        $currUnitQ1 = $currNPUnitQ1 + $currEBUnitQ1 + $currINDUnitQ1 + $currOTHUnitQ1;
        $currBahtQ1 = $currNPBahtQ1 + $currEBBahtQ1 + $currINDBahtQ1 + $currOTHBahtQ1;
        $currUnitQ2 = $currNPUnitQ2 + $currEBUnitQ2 + $currINDUnitQ2 + $currOTHUnitQ2;
        $currBahtQ2 = $currNPBahtQ2 + $currEBBahtQ2 + $currINDBahtQ2 + $currOTHBahtQ2;
        $currUnitQ3 = $currNPUnitQ3 + $currEBUnitQ3 + $currINDUnitQ3 + $currOTHUnitQ3;
        $currBahtQ3 = $currNPBahtQ3 + $currEBBahtQ3 + $currINDBahtQ3 + $currOTHBahtQ3;
        $currUnitQ4 = $currNPUnitQ4 + $currEBUnitQ4 + $currINDUnitQ4 + $currOTHUnitQ4;
        $currBahtQ4 = $currNPBahtQ4 + $currEBBahtQ4 + $currINDBahtQ4 + $currOTHBahtQ4;
        $oldUnitJanuary = $oldNPUnitJanuary + $oldEBUnitJanuary + $oldINDUnitJanuary + $oldOTHUnitJanuary;
        $oldUnitFebruary = $oldNPUnitFebruary + $oldEBUnitFebruary + $oldINDUnitFebruary + $oldOTHUnitFebruary;
        $oldUnitMarch = $oldNPUnitMarch + $oldEBUnitMarch + $oldINDUnitMarch + $oldOTHUnitMarch;
        $oldUnitApril = $oldNPUnitApril + $oldEBUnitApril + $oldINDUnitApril + $oldOTHUnitApril;
        $oldUnitMay = $oldNPUnitMay + $oldEBUnitMay + $oldINDUnitMay + $oldOTHUnitMay;
        $oldUnitJune = $oldNPUnitJune + $oldEBUnitJune + $oldINDUnitJune + $oldOTHUnitJune;
        $oldUnitJuly = $oldNPUnitJuly + $oldEBUnitJuly + $oldINDUnitJuly + $oldOTHUnitJuly;
        $oldUnitAugust = $oldNPUnitAugust + $oldEBUnitAugust + $oldINDUnitAugust + $oldOTHUnitAugust;
        $oldUnitSeptember = $oldNPUnitSeptember + $oldEBUnitSeptember + $oldINDUnitSeptember + $oldOTHUnitSeptember;
        $oldUnitOctober = $oldNPUnitOctober + $oldEBUnitOctober + $oldINDUnitOctober + $oldOTHUnitOctober;
        $oldUnitNovember = $oldNPUnitNovember + $oldEBUnitNovember + $oldINDUnitNovember + $oldOTHUnitNovember;
        $oldUnitDecember = $oldNPUnitDecember + $oldEBUnitDecember + $oldINDUnitDecember + $oldOTHUnitDecember;
        $oldBahtJanuary = $oldNPBahtJanuary + $oldEBBahtJanuary + $oldINDBahtJanuary + $oldOTHBahtJanuary;
        $oldBahtFebruary = $oldNPBahtFebruary + $oldEBBahtFebruary + $oldINDBahtFebruary + $oldOTHBahtFebruary;
        $oldBahtMarch = $oldNPBahtMarch + $oldEBBahtMarch + $oldINDBahtMarch + $oldOTHBahtMarch;
        $oldBahtApril = $oldNPBahtApril + $oldEBBahtApril + $oldINDBahtApril + $oldOTHBahtApril;
        $oldBahtMay = $oldNPBahtMay + $oldEBBahtMay + $oldINDBahtMay + $oldOTHBahtMay;
        $oldBahtJune = $oldNPBahtJune + $oldEBBahtJune + $oldINDBahtJune + $oldOTHBahtJune;
        $oldBahtJuly = $oldNPBahtJuly + $oldEBBahtJuly + $oldINDBahtJuly + $oldOTHBahtJuly;
        $oldBahtAugust = $oldNPBahtAugust + $oldEBBahtAugust + $oldINDBahtAugust + $oldOTHBahtAugust;
        $oldBahtSeptember = $oldNPBahtSeptember + $oldEBBahtSeptember + $oldINDBahtSeptember + $oldOTHBahtSeptember;
        $oldBahtOctober = $oldNPBahtOctober + $oldEBBahtOctober + $oldINDBahtOctober + $oldOTHBahtOctober;
        $oldBahtNovember = $oldNPBahtNovember + $oldEBBahtNovember + $oldINDBahtNovember + $oldOTHBahtNovember;
        $oldBahtDecember = $oldNPBahtDecember + $oldEBBahtDecember + $oldINDBahtDecember + $oldOTHBahtDecember;
        $oldUnitQ1 = $oldNPUnitQ1 + $oldEBUnitQ1 + $oldINDUnitQ1 + $oldOTHUnitQ1;
        $oldBahtQ1 = $oldNPBahtQ1 + $oldEBBahtQ1 + $oldINDBahtQ1 + $oldOTHBahtQ1;
        $oldUnitQ2 = $oldNPUnitQ2 + $oldEBUnitQ2 + $oldINDUnitQ2 + $oldOTHUnitQ2;
        $oldBahtQ2 = $oldNPBahtQ2 + $oldEBBahtQ2 + $oldINDBahtQ2 + $oldOTHBahtQ2;
        $oldUnitQ3 = $oldNPUnitQ3 + $oldEBUnitQ3 + $oldINDUnitQ3 + $oldOTHUnitQ3;
        $oldBahtQ3 = $oldNPBahtQ3 + $oldEBBahtQ3 + $oldINDBahtQ3 + $oldOTHBahtQ3;
        $oldUnitQ4 = $oldNPUnitQ4 + $oldEBUnitQ4 + $oldINDUnitQ4 + $oldOTHUnitQ4;
        $oldBahtQ4 = $oldNPBahtQ4 + $oldEBBahtQ4 + $oldINDBahtQ4 + $oldOTHBahtQ4;

        $totalBahtTarget = (getAmount($targetNP->AmtQ1) + getAmount($targetNP->AmtQ2) + getAmount($targetNP->AmtQ3) + getAmount($targetNP->AmtQ4) + 
                            getAmount($targetEB->AmtQ1) + getAmount($targetEB->AmtQ2) + getAmount($targetEB->AmtQ3) + getAmount($targetEB->AmtQ4) + 
                            getAmount($targetIND->AmtQ1) + getAmount($targetIND->AmtQ2) + getAmount($targetIND->AmtQ3) + getAmount($targetIND->AmtQ4) + 
                            getAmount($targetOTH->AmtQ1) + getAmount($targetOTH->AmtQ2) + getAmount($targetOTH->AmtQ3) + getAmount($targetOTH->AmtQ4));
        $totalUnitTarget = (getAmount($targetNP->UnitQ1) + getAmount($targetNP->UnitQ2) + getAmount($targetNP->UnitQ3) + getAmount($targetNP->UnitQ4) + 
                            getAmount($targetEB->UnitQ1) + getAmount($targetEB->UnitQ2) + getAmount($targetEB->UnitQ3) + getAmount($targetEB->UnitQ4) + 
                            getAmount($targetIND->UnitQ1) + getAmount($targetIND->UnitQ2) + getAmount($targetIND->UnitQ3) + getAmount($targetIND->UnitQ4) + 
                            getAmount($targetOTH->UnitQ1) + getAmount($targetOTH->UnitQ2) + getAmount($targetOTH->UnitQ3) + getAmount($targetOTH->UnitQ4));

        $achieveBahtJanuary = (($currBahtJanuary * 100) / (getAmount($targetNP->Amt01) + getAmount($targetEB->Amt01) + getAmount($targetIND->Amt01) + getAmount($targetOTH->Amt01)));          
        $achieveBahtFebruary = (($currBahtFebruary * 100) / (getAmount($targetNP->Amt02) + getAmount($targetEB->Amt02) + getAmount($targetIND->Amt02) + getAmount($targetOTH->Amt02)));
        $achieveBahtMarch = (($currBahtMarch * 100) / (getAmount($targetNP->Amt03) + getAmount($targetEB->Amt03) + getAmount($targetIND->Amt03) + getAmount($targetOTH->Amt03)));
        $achieveBahtApril = (($currBahtApril * 100) / (getAmount($targetNP->Amt04) + getAmount($targetEB->Amt04) + getAmount($targetIND->Amt04) + getAmount($targetOTH->Amt04)));
        $achieveBahtMay = (($currBahtMay * 100) / (getAmount($targetNP->Amt05) + getAmount($targetEB->Amt05) + getAmount($targetIND->Amt05) + getAmount($targetOTH->Amt05)));
        $achieveBahtJune = (($currBahtJune * 100) / (getAmount($targetNP->Amt06) + getAmount($targetEB->Amt06) + getAmount($targetIND->Amt06) + getAmount($targetOTH->Amt06)));
        $achieveBahtJuly = (($currBahtJuly * 100) / (getAmount($targetNP->Amt07) + getAmount($targetEB->Amt07) + getAmount($targetIND->Amt07) + getAmount($targetOTH->Amt07)));
        $achieveBahtAugust = (($currBahtAugust * 100) / (getAmount($targetNP->Amt08) + getAmount($targetEB->Amt08) + getAmount($targetIND->Amt08) + getAmount($targetOTH->Amt08)));
        $achieveBahtSeptember = (($currBahtSeptember * 100) / (getAmount($targetNP->Amt09) + getAmount($targetEB->Amt09) + getAmount($targetIND->Amt09) + getAmount($targetOTH->Amt09)));
        $achieveBahtOctober = (($currBahtOctober * 100) / (getAmount($targetNP->Amt10) + getAmount($targetEB->Amt10) + getAmount($targetIND->Amt10) + getAmount($targetOTH->Amt10)));
        $achieveBahtNovember = (($currBahtNovember * 100) / (getAmount($targetNP->Amt11) + getAmount($targetEB->Amt11) + getAmount($targetIND->Amt11) + getAmount($targetOTH->Amt11)));
        $achieveBahtDecember = (($currBahtDecember * 100) / (getAmount($targetNP->Amt12) + getAmount($targetEB->Amt12) + getAmount($targetIND->Amt12) + getAmount($targetOTH->Amt12)));      
        $achieveBahtTotal = ($currTotalBaht * 100) / calZero($totalBahtTarget);
        $achieveBahtQ1 = (($currBahtQ1 * 100) / (getAmount($targetNP->AmtQ1) + getAmount($targetEB->AmtQ1) + getAmount($targetIND->AmtQ1) + getAmount($targetOTH->AmtQ1)));      
        $achieveUnitQ1 = (($currUnitQ1 * 100) / (getAmount($targetNP->UnitQ1) + getAmount($targetEB->UnitQ1) + getAmount($targetIND->UnitQ1) + getAmount($targetOTH->UnitQ1)));
        $achieveBahtQ2 = (($currBahtQ2 * 100) / (getAmount($targetNP->AmtQ2) + getAmount($targetEB->AmtQ2) + getAmount($targetIND->AmtQ2) + getAmount($targetOTH->AmtQ2)));      
        $achieveUnitQ2 = (($currUnitQ2 * 100) / (getAmount($targetNP->UnitQ2) + getAmount($targetEB->UnitQ2) + getAmount($targetIND->UnitQ2) + getAmount($targetOTH->UnitQ2)));   
        $achieveBahtQ3 = (($currBahtQ3 * 100) / (getAmount($targetNP->AmtQ3) + getAmount($targetEB->AmtQ3) + getAmount($targetIND->AmtQ3) + getAmount($targetOTH->AmtQ3)));      
        $achieveUnitQ3 = (($currUnitQ3 * 100) / (getAmount($targetNP->UnitQ3) + getAmount($targetEB->UnitQ3) + getAmount($targetIND->UnitQ3) + getAmount($targetOTH->UnitQ3)));   
        $achieveBahtQ4 = (($currBahtQ4 * 100) / (getAmount($targetNP->AmtQ4) + getAmount($targetEB->AmtQ4) + getAmount($targetIND->AmtQ4) + getAmount($targetOTH->AmtQ4)));      
        $achieveUnitQ4 = (($currUnitQ4 * 100) / (getAmount($targetNP->UnitQ4) + getAmount($targetEB->UnitQ4) + getAmount($targetIND->UnitQ4) + getAmount($targetOTH->UnitQ4)));   
        $growthBahtJanuary = (($currBahtJanuary - $oldBahtJanuary) * 100) / $oldBahtJanuary;
        $growthBahtFebruary = (($currBahtFebruary - $oldBahtFebruary) * 100) / $oldBahtFebruary;
        $growthBahtMarch = (($currBahtMarch - $oldBahtMarch) * 100) / $oldBahtMarch;
        $growthBahtApril = (($currBahtApril - $oldBahtApril) * 100) / $oldBahtApril;
        $growthBahtMay = (($currBahtMay - $oldBahtMay) * 100) / $oldBahtMay;
        $growthBahtJune = (($currBahtJune - $oldBahtJune) * 100) / $oldBahtJune;
        $growthBahtJuly = (($currBahtJuly - $oldBahtJuly) * 100) / $oldBahtJuly;
        $growthBahtAugust = (($currBahtAugust - $oldBahtAugust) * 100) / $oldBahtAugust;
        $growthBahtSeptember = (($currBahtSeptember - $oldBahtSeptember) * 100) / $oldBahtSeptember;
        $growthBahtOctober = (($currBahtOctober - $oldBahtOctober) * 100) / $oldBahtOctober;
        $growthBahtNovember = (($currBahtNovember - $oldBahtNovember) * 100) / $oldBahtNovember;
        $growthBahtDecember = (($currBahtDecember - $oldBahtDecember) * 100) / $oldBahtDecember;
        $growthBahtTotal = (($currTotalBaht - $oldTotalBaht) * 100) / $oldTotalBaht;
        $achieveUnitJanuary = (($currUnitJanuary * 100) / (getAmount($targetNP->Unit01) + getAmount($targetEB->Unit01) + getAmount($targetIND->Unit01) + getAmount($targetOTH->Unit01)));          
        $achieveUnitFebruary = (($currUnitFebruary * 100) / (getAmount($targetNP->Unit02) + getAmount($targetEB->Unit02) + getAmount($targetIND->Unit02) + getAmount($targetOTH->Unit02)));
        $achieveUnitMarch = (($currUnitMarch * 100) / (getAmount($targetNP->Unit03) + getAmount($targetEB->Unit03) + getAmount($targetIND->Unit03) + getAmount($targetOTH->Unit03)));
        $achieveUnitApril = (($currUnitApril * 100) / (getAmount($targetNP->Unit04) + getAmount($targetEB->Unit04) + getAmount($targetIND->Unit04) + getAmount($targetOTH->Unit04)));
        $achieveUnitMay = (($currUnitMay * 100) / (getAmount($targetNP->Unit05) + getAmount($targetEB->Unit05) + getAmount($targetIND->Unit05) + getAmount($targetOTH->Unit05)));
        $achieveUnitJune = (($currUnitJune * 100) / (getAmount($targetNP->Unit06) + getAmount($targetEB->Unit06) + getAmount($targetIND->Unit06) + getAmount($targetOTH->Unit06)));
        $achieveUnitJuly = (($currUnitJuly * 100) / (getAmount($targetNP->Unit07) + getAmount($targetEB->Unit07) + getAmount($targetIND->Unit07) + getAmount($targetOTH->Unit07)));
        $achieveUnitAugust = (($currUnitAugust * 100) / (getAmount($targetNP->Unit08) + getAmount($targetEB->Unit08) + getAmount($targetIND->Unit08) + getAmount($targetOTH->Unit08)));
        $achieveUnitSeptember = (($currUnitSeptember * 100) / (getAmount($targetNP->Unit09) + getAmount($targetEB->Unit09) + getAmount($targetIND->Unit09) + getAmount($targetOTH->Unit09)));
        $achieveUnitOctober = (($currUnitOctober * 100) / (getAmount($targetNP->Unit10) + getAmount($targetEB->Unit10) + getAmount($targetIND->Unit10) + getAmount($targetOTH->Unit10)));
        $achieveUnitNovember = (($currUnitNovember * 100) / (getAmount($targetNP->Unit11) + getAmount($targetEB->Unit11) + getAmount($targetIND->Unit11) + getAmount($targetOTH->Unit11)));
        $achieveUnitDecember = (($currUnitDecember * 100) / (getAmount($targetNP->Unit12) + getAmount($targetEB->Unit12) + getAmount($targetIND->Unit12) + getAmount($targetOTH->Unit12)));    
        $achieveUnitTotal = ($currTotalUnit * 100) / calZero($totalUnitTarget);
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
        $growthUnitTotal = (($currTotalUnit - $oldTotalUnit) * 100) / $oldTotalUnit;
        $growthBahtQ1 = (($currBahtQ1 - $oldBahtQ1) * 100) / calZero($oldBahtQ1);
        $growthUnitQ1 = (($currUnitQ1 - $oldUnitQ1) * 100) / calZero($oldUnitQ1);
        $growthBahtQ2 = (($currBahtQ2 - $oldBahtQ2) * 100) / calZero($oldBahtQ2);
        $growthUnitQ2 = (($currUnitQ2 - $oldUnitQ2) * 100) / calZero($oldUnitQ2);
        $growthBahtQ3 = (($currBahtQ3 - $oldBahtQ3) * 100) / calZero($oldBahtQ3);
        $growthUnitQ3 = (($currUnitQ3 - $oldUnitQ3) * 100) / calZero($oldUnitQ3);
        $growthBahtQ4 = (($currBahtQ4 - $oldBahtQ4) * 100) / calZero($oldBahtQ4);
        $growthUnitQ4 = (($currUnitQ4 - $oldUnitQ4) * 100) / calZero($oldUnitQ4);

        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">NP,EB,IND,OTH (1,000 BAHT)</th>
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
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt01) + getAmount($targetEB->Amt01) + getAmount($targetIND->Amt01) + getAmount($targetOTH->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt02) + getAmount($targetEB->Amt02) + getAmount($targetIND->Amt02) + getAmount($targetOTH->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt03) + getAmount($targetEB->Amt03) + getAmount($targetIND->Amt03) + getAmount($targetOTH->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt04) + getAmount($targetEB->Amt04) + getAmount($targetIND->Amt04) + getAmount($targetOTH->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt05) + getAmount($targetEB->Amt05) + getAmount($targetIND->Amt05) + getAmount($targetOTH->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt06) + getAmount($targetEB->Amt06) + getAmount($targetIND->Amt06) + getAmount($targetOTH->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt07) + getAmount($targetEB->Amt07) + getAmount($targetIND->Amt07) + getAmount($targetOTH->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt08) + getAmount($targetEB->Amt08) + getAmount($targetIND->Amt08) + getAmount($targetOTH->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt09) + getAmount($targetEB->Amt09) + getAmount($targetIND->Amt09) + getAmount($targetOTH->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt10) + getAmount($targetEB->Amt10) + getAmount($targetIND->Amt10) + getAmount($targetOTH->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt11) + getAmount($targetEB->Amt11) + getAmount($targetIND->Amt11) + getAmount($targetOTH->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt12) + getAmount($targetEB->Amt12) + getAmount($targetIND->Amt12) + getAmount($targetOTH->Amt12))/1000,2) }}</td>
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
                    <th style="vertical-align:middle; text-align:center; width:100px;">NP,EB,IND,OTH (UNIT)</th>
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
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit01) + getAmount($targetEB->Unit01) + getAmount($targetIND->Unit01) + getAmount($targetOTH->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit02) + getAmount($targetEB->Unit02) + getAmount($targetIND->Unit02) + getAmount($targetOTH->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit03) + getAmount($targetEB->Unit03) + getAmount($targetIND->Unit03) + getAmount($targetOTH->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit04) + getAmount($targetEB->Unit04) + getAmount($targetIND->Unit04) + getAmount($targetOTH->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit05) + getAmount($targetEB->Unit05) + getAmount($targetIND->Unit05) + getAmount($targetOTH->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit06) + getAmount($targetEB->Unit06) + getAmount($targetIND->Unit06) + getAmount($targetOTH->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit07) + getAmount($targetEB->Unit07) + getAmount($targetIND->Unit07) + getAmount($targetOTH->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit08) + getAmount($targetEB->Unit08) + getAmount($targetIND->Unit08) + getAmount($targetOTH->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit09) + getAmount($targetEB->Unit09) + getAmount($targetIND->Unit09) + getAmount($targetOTH->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit10) + getAmount($targetEB->Unit10) + getAmount($targetIND->Unit10) + getAmount($targetOTH->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit11) + getAmount($targetEB->Unit11) + getAmount($targetIND->Unit11) + getAmount($targetOTH->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit12) + getAmount($targetEB->Unit12) + getAmount($targetIND->Unit12) + getAmount($targetOTH->Unit12))/1000,2) }}</td>
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
                    <th style="vertical-align:middle; text-align:center; width:100px;">NP (1,000 BAHT)</th>
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currNPBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currNPTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtJanuary) ? number_format(0,2) : number_format($achieveNPBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtFebruary) ? number_format(0,2) : number_format($achieveNPBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtMarch) ? number_format(0,2) : number_format($achieveNPBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtApril) ? number_format(0,2) : number_format($achieveNPBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtMay) ? number_format(0,2) : number_format($achieveNPBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtJune) ? number_format(0,2) : number_format($achieveNPBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtJuly) ? number_format(0,2) : number_format($achieveNPBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtAugust) ? number_format(0,2) : number_format($achieveNPBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtSeptember) ? number_format(0,2) : number_format($achieveNPBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtOctober) ? number_format(0,2) : number_format($achieveNPBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtNovember) ? number_format(0,2) : number_format($achieveNPBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPBahtDecember) ? number_format(0,2) : number_format($achieveNPBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveNPBahtTotal) ? number_format(0,2) : number_format($achieveNPBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldNPBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldNPTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtJanuary) ? number_format(0,2) : number_format($growthNPBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtFebruary) ? number_format(0,2) : number_format($growthNPBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtMarch) ? number_format(0,2) : number_format($growthNPBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtApril) ? number_format(0,2) : number_format($growthNPBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtMay) ? number_format(0,2) : number_format($growthNPBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtJune) ? number_format(0,2) : number_format($growthNPBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtJuly) ? number_format(0,2) : number_format($growthNPBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtAugust) ? number_format(0,2) : number_format($growthNPBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtSeptember) ? number_format(0,2) : number_format($growthNPBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtOctober) ? number_format(0,2) : number_format($growthNPBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtNovember) ? number_format(0,2) : number_format($growthNPBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPBahtDecember) ? number_format(0,2) : number_format($growthNPBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthNPBahtTotal) ? number_format(0,2) : number_format($growthNPBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">NP (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currNPUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currNPTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetNP->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitJanuary) ? number_format(0,2) : number_format($achieveNPUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitFebruary) ? number_format(0,2) : number_format($achieveNPUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitMarch) ? number_format(0,2) : number_format($achieveNPUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitApril) ? number_format(0,2) : number_format($achieveNPUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitMay) ? number_format(0,2) : number_format($achieveNPUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitJune) ? number_format(0,2) : number_format($achieveNPUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitJuly) ? number_format(0,2) : number_format($achieveNPUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitAugust) ? number_format(0,2) : number_format($achieveNPUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitSeptember) ? number_format(0,2) : number_format($achieveNPUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitOctober) ? number_format(0,2) : number_format($achieveNPUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitNovember) ? number_format(0,2) : number_format($achieveNPUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveNPUnitDecember) ? number_format(0,2) : number_format($achieveNPUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveNPUnitTotal) ? number_format(0,2) : number_format($achieveNPUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldNPUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldNPTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitJanuary) ? number_format(0,2) : number_format($growthNPUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitFebruary) ? number_format(0,2) : number_format($growthNPUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitMarch) ? number_format(0,2) : number_format($growthNPUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitApril) ? number_format(0,2) : number_format($growthNPUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitMay) ? number_format(0,2) : number_format($growthNPUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitJune) ? number_format(0,2) : number_format($growthNPUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitJuly) ? number_format(0,2) : number_format($growthNPUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitAugust) ? number_format(0,2) : number_format($growthNPUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitSeptember) ? number_format(0,2) : number_format($growthNPUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitOctober) ? number_format(0,2) : number_format($growthNPUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitNovember) ? number_format(0,2) : number_format($growthNPUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthNPUnitDecember) ? number_format(0,2) : number_format($growthNPUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthNPUnitTotal) ? number_format(0,2) : number_format($growthNPUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">EB (1,000 BAHT)</th>
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currEBBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currEBTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtJanuary) ? number_format(0,2) : number_format($achieveEBBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtFebruary) ? number_format(0,2) : number_format($achieveEBBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtMarch) ? number_format(0,2) : number_format($achieveEBBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtApril) ? number_format(0,2) : number_format($achieveEBBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtMay) ? number_format(0,2) : number_format($achieveEBBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtJune) ? number_format(0,2) : number_format($achieveEBBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtJuly) ? number_format(0,2) : number_format($achieveEBBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtAugust) ? number_format(0,2) : number_format($achieveEBBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtSeptember) ? number_format(0,2) : number_format($achieveEBBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtOctober) ? number_format(0,2) : number_format($achieveEBBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtNovember) ? number_format(0,2) : number_format($achieveEBBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBBahtDecember) ? number_format(0,2) : number_format($achieveEBBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveEBBahtTotal) ? number_format(0,2) : number_format($achieveEBBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldEBBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldEBTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtJanuary) ? number_format(0,2) : number_format($growthEBBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtFebruary) ? number_format(0,2) : number_format($growthEBBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtMarch) ? number_format(0,2) : number_format($growthEBBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtApril) ? number_format(0,2) : number_format($growthEBBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtMay) ? number_format(0,2) : number_format($growthEBBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtJune) ? number_format(0,2) : number_format($growthEBBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtJuly) ? number_format(0,2) : number_format($growthEBBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtAugust) ? number_format(0,2) : number_format($growthEBBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtSeptember) ? number_format(0,2) : number_format($growthEBBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtOctober) ? number_format(0,2) : number_format($growthEBBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtNovember) ? number_format(0,2) : number_format($growthEBBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBBahtDecember) ? number_format(0,2) : number_format($growthEBBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthEBBahtTotal) ? number_format(0,2) : number_format($growthEBBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">EB (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currEBUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currEBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetEB->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitJanuary) ? number_format(0,2) : number_format($achieveEBUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitFebruary) ? number_format(0,2) : number_format($achieveEBUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitMarch) ? number_format(0,2) : number_format($achieveEBUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitApril) ? number_format(0,2) : number_format($achieveEBUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitMay) ? number_format(0,2) : number_format($achieveEBUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitJune) ? number_format(0,2) : number_format($achieveEBUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitJuly) ? number_format(0,2) : number_format($achieveEBUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitAugust) ? number_format(0,2) : number_format($achieveEBUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitSeptember) ? number_format(0,2) : number_format($achieveEBUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitOctober) ? number_format(0,2) : number_format($achieveEBUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitNovember) ? number_format(0,2) : number_format($achieveEBUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveEBUnitDecember) ? number_format(0,2) : number_format($achieveEBUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveEBUnitTotal) ? number_format(0,2) : number_format($achieveEBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldEBUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldEBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitJanuary) ? number_format(0,2) : number_format($growthEBUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitFebruary) ? number_format(0,2) : number_format($growthEBUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitMarch) ? number_format(0,2) : number_format($growthEBUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitApril) ? number_format(0,2) : number_format($growthEBUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitMay) ? number_format(0,2) : number_format($growthEBUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitJune) ? number_format(0,2) : number_format($growthEBUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitJuly) ? number_format(0,2) : number_format($growthEBUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitAugust) ? number_format(0,2) : number_format($growthEBUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitSeptember) ? number_format(0,2) : number_format($growthEBUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitOctober) ? number_format(0,2) : number_format($growthEBUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitNovember) ? number_format(0,2) : number_format($growthEBUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthEBUnitDecember) ? number_format(0,2) : number_format($growthEBUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthEBUnitTotal) ? number_format(0,2) : number_format($growthEBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">IND (1,000 BAHT)</th>
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currINDBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currINDTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtJanuary) ? number_format(0,2) : number_format($achieveINDBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtFebruary) ? number_format(0,2) : number_format($achieveINDBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtMarch) ? number_format(0,2) : number_format($achieveINDBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtApril) ? number_format(0,2) : number_format($achieveINDBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtMay) ? number_format(0,2) : number_format($achieveINDBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtJune) ? number_format(0,2) : number_format($achieveINDBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtJuly) ? number_format(0,2) : number_format($achieveINDBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtAugust) ? number_format(0,2) : number_format($achieveINDBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtSeptember) ? number_format(0,2) : number_format($achieveINDBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtOctober) ? number_format(0,2) : number_format($achieveINDBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtNovember) ? number_format(0,2) : number_format($achieveINDBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDBahtDecember) ? number_format(0,2) : number_format($achieveINDBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveINDBahtTotal) ? number_format(0,2) : number_format($achieveINDBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldINDBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldINDTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtJanuary) ? number_format(0,2) : number_format($growthINDBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtFebruary) ? number_format(0,2) : number_format($growthINDBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtMarch) ? number_format(0,2) : number_format($growthINDBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtApril) ? number_format(0,2) : number_format($growthINDBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtMay) ? number_format(0,2) : number_format($growthINDBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtJune) ? number_format(0,2) : number_format($growthINDBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtJuly) ? number_format(0,2) : number_format($growthINDBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtAugust) ? number_format(0,2) : number_format($growthINDBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtSeptember) ? number_format(0,2) : number_format($growthINDBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtOctober) ? number_format(0,2) : number_format($growthINDBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtNovember) ? number_format(0,2) : number_format($growthINDBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDBahtDecember) ? number_format(0,2) : number_format($growthINDBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthINDBahtTotal) ? number_format(0,2) : number_format($growthINDBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">IND (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currINDUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currINDTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetIND->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitJanuary) ? number_format(0,2) : number_format($achieveINDUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitFebruary) ? number_format(0,2) : number_format($achieveINDUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitMarch) ? number_format(0,2) : number_format($achieveINDUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitApril) ? number_format(0,2) : number_format($achieveINDUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitMay) ? number_format(0,2) : number_format($achieveINDUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitJune) ? number_format(0,2) : number_format($achieveINDUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitJuly) ? number_format(0,2) : number_format($achieveINDUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitAugust) ? number_format(0,2) : number_format($achieveINDUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitSeptember) ? number_format(0,2) : number_format($achieveINDUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitOctober) ? number_format(0,2) : number_format($achieveINDUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitNovember) ? number_format(0,2) : number_format($achieveINDUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveINDUnitDecember) ? number_format(0,2) : number_format($achieveINDUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveINDUnitTotal) ? number_format(0,2) : number_format($achieveINDUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldINDUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldINDTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitJanuary) ? number_format(0,2) : number_format($growthINDUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitFebruary) ? number_format(0,2) : number_format($growthINDUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitMarch) ? number_format(0,2) : number_format($growthINDUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitApril) ? number_format(0,2) : number_format($growthINDUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitMay) ? number_format(0,2) : number_format($growthINDUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitJune) ? number_format(0,2) : number_format($growthINDUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitJuly) ? number_format(0,2) : number_format($growthINDUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitAugust) ? number_format(0,2) : number_format($growthINDUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitSeptember) ? number_format(0,2) : number_format($growthINDUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitOctober) ? number_format(0,2) : number_format($growthINDUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitNovember) ? number_format(0,2) : number_format($growthINDUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthINDUnitDecember) ? number_format(0,2) : number_format($growthINDUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthINDUnitTotal) ? number_format(0,2) : number_format($growthINDUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">    
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">OTH (1,000 BAHT)</th>
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
                <td id="BahtActualNow1"  style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtJanuary/1000,2) }}</td>
                <td id="BahtActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtFebruary/1000,2) }}</td>
                <td id="BahtActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtMarch/1000,2) }}</td>
                <td id="BahtActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtApril/1000,2) }}</td>
                <td id="BahtActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtMay/1000,2) }}</td>
                <td id="BahtActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtJune/1000,2) }}</td>
                <td id="BahtActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtJuly/1000,2) }}</td>
                <td id="BahtActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtAugust/1000,2) }}</td>
                <td id="BahtActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtSeptember/1000,2) }}</td>
                <td id="BahtActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtOctober/1000,2) }}</td>
                <td id="BahtActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtNovember/1000,2) }}</td>
                <td id="BahtActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currOTHBahtDecember/1000,2) }}</td>
                <td id="BahtActualNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currOTHTotalBaht/1000,2) }}</td>
                </tr>               
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                    <td id="BahtTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt01))/1000,2) }}</td>
                    <td id="BahtTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt02))/1000,2) }}</td>
                    <td id="BahtTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt03))/1000,2) }}</td>
                    <td id="BahtTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt04))/1000,2) }}</td>
                    <td id="BahtTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt05))/1000,2) }}</td>
                    <td id="BahtTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt06))/1000,2) }}</td>
                    <td id="BahtTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt07))/1000,2) }}</td>
                    <td id="BahtTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt08))/1000,2) }}</td>
                    <td id="BahtTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt09))/1000,2) }}</td>
                    <td id="BahtTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt10))/1000,2) }}</td>
                    <td id="BahtTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt11))/1000,2) }}</td>
                    <td id="BahtTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Amt12))/1000,2) }}</td>
                    <td id="BahtTargetNowTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget/1000) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="BahtAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtJanuary) ? number_format(0,2) : number_format($achieveOTHBahtJanuary,2))."%" }}</td>
                    <td id="BahtAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtFebruary) ? number_format(0,2) : number_format($achieveOTHBahtFebruary,2))."%" }}</td>
                    <td id="BahtAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtMarch) ? number_format(0,2) : number_format($achieveOTHBahtMarch,2))."%" }}</td>
                    <td id="BahtAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtApril) ? number_format(0,2) : number_format($achieveOTHBahtApril,2))."%" }}</td>
                    <td id="BahtAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtMay) ? number_format(0,2) : number_format($achieveOTHBahtMay,2))."%" }}</td>
                    <td id="BahtAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtJune) ? number_format(0,2) : number_format($achieveOTHBahtJune,2))."%" }}</td>
                    <td id="BahtAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtJuly) ? number_format(0,2) : number_format($achieveOTHBahtJuly,2))."%" }}</td>
                    <td id="BahtAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtAugust) ? number_format(0,2) : number_format($achieveOTHBahtAugust,2))."%" }}</td>
                    <td id="BahtAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtSeptember) ? number_format(0,2) : number_format($achieveOTHBahtSeptember,2))."%" }}</td>
                    <td id="BahtAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtOctober) ? number_format(0,2) : number_format($achieveOTHBahtOctober,2))."%" }}</td>
                    <td id="BahtAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtNovember) ? number_format(0,2) : number_format($achieveOTHBahtNovember,2))."%" }}</td>
                    <td id="BahtAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHBahtDecember) ? number_format(0,2) : number_format($achieveOTHBahtDecember,2))."%" }}</td>
                    <td id="BahtAchieveTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveOTHBahtTotal) ? number_format(0,2) : number_format($achieveOTHBahtTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                    <td id="BahtActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtJanuary/1000,2) }}</td>
                    <td id="BahtActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtFebruary/1000,2) }}</td>
                    <td id="BahtActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtMarch/1000,2) }}</td>
                    <td id="BahtActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtApril/1000,2) }}</td>
                    <td id="BahtActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtMay/1000,2) }}</td>
                    <td id="BahtActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtJune/1000,2) }}</td>
                    <td id="BahtActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtJuly/1000,2) }}</td>
                    <td id="BahtActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtAugust/1000,2) }}</td>
                    <td id="BahtActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtSeptember/1000,2) }}</td>
                    <td id="BahtActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtOctober/1000,2) }}</td>
                    <td id="BahtActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtNovember/1000,2) }}</td>
                    <td id="BahtActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHBahtDecember/1000,2) }}</td>
                    <td id="BahtActualOldTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldOTHTotalBaht/1000,2) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    
    
                    <td id="BahtGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtJanuary) ? number_format(0,2) : number_format($growthOTHBahtJanuary,2))."%" }}</td>
                    <td id="BahtGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtFebruary) ? number_format(0,2) : number_format($growthOTHBahtFebruary,2))."%" }}</td>
                    <td id="BahtGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtMarch) ? number_format(0,2) : number_format($growthOTHBahtMarch,2))."%" }}</td>
                    <td id="BahtGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtApril) ? number_format(0,2) : number_format($growthOTHBahtApril,2))."%" }}</td>
                    <td id="BahtGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtMay) ? number_format(0,2) : number_format($growthOTHBahtMay,2))."%" }}</td>
                    <td id="BahtGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtJune) ? number_format(0,2) : number_format($growthOTHBahtJune,2))."%" }}</td>
                    <td id="BahtGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtJuly) ? number_format(0,2) : number_format($growthOTHBahtJuly,2))."%" }}</td>
                    <td id="BahtGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtAugust) ? number_format(0,2) : number_format($growthOTHBahtAugust,2))."%" }}</td>
                    <td id="BahtGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtSeptember) ? number_format(0,2) : number_format($growthOTHBahtSeptember,2))."%" }}</td>
                    <td id="BahtGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtOctober) ? number_format(0,2) : number_format($growthOTHBahtOctober,2))."%" }}</td>
                    <td id="BahtGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtNovember) ? number_format(0,2) : number_format($growthOTHBahtNovember,2))."%" }}</td>
                    <td id="BahtGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHBahtDecember) ? number_format(0,2) : number_format($growthOTHBahtDecember,2))."%" }}</td>
                    <td id="BahtGrowthTotal" style="font-size: 11px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthOTHBahtTotal) ? number_format(0,2) : number_format($growthOTHBahtTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:100px;">OTH (UNIT)</th>
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
                    <td id="UnitActualNow1" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitJanuary) }}</td>
                    <td id="UnitActualNow2" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitFebruary) }}</td>
                    <td id="UnitActualNow3" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitMarch) }}</td>
                    <td id="UnitActualNow4" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitApril) }}</td>
                    <td id="UnitActualNow5" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitMay) }}</td>
                    <td id="UnitActualNow6" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitJune) }}</td>
                    <td id="UnitActualNow7" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitJuly) }}</td>
                    <td id="UnitActualNow8" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitAugust) }}</td>
                    <td id="UnitActualNow9" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitSeptember) }}</td>
                    <td id="UnitActualNow10" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitOctober) }}</td>
                    <td id="UnitActualNow11" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitNovember) }}</td>
                    <td id="UnitActualNow12" style="font-size: 11px; text-align: right;">{{ number_format($currOTHUnitDecember) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currOTHTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>    
                    <td id="UnitTargetNow1" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit01))/1000,2) }}</td>
                    <td id="UnitTargetNow2" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit02))/1000,2) }}</td>
                    <td id="UnitTargetNow3" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit03))/1000,2) }}</td>
                    <td id="UnitTargetNow4" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit04))/1000,2) }}</td>
                    <td id="UnitTargetNow5" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit05))/1000,2) }}</td>
                    <td id="UnitTargetNow6" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit06))/1000,2) }}</td>
                    <td id="UnitTargetNow7" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit07))/1000,2) }}</td>
                    <td id="UnitTargetNow8" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit08))/1000,2) }}</td>
                    <td id="UnitTargetNow9" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit09))/1000,2) }}</td>
                    <td id="UnitTargetNow10" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit10))/1000,2) }}</td>
                    <td id="UnitTargetNow11" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit11))/1000,2) }}</td>
                    <td id="UnitTargetNow12" style="font-size: 11px; text-align: right;">{{ number_format((getAmount($targetOTH->Unit12))/1000,2) }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieve1" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitJanuary) ? number_format(0,2) : number_format($achieveOTHUnitJanuary,2))."%" }}</td>
                    <td id="UnitAchieve2" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitFebruary) ? number_format(0,2) : number_format($achieveOTHUnitFebruary,2))."%" }}</td>
                    <td id="UnitAchieve3" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitMarch) ? number_format(0,2) : number_format($achieveOTHUnitMarch,2))."%" }}</td>
                    <td id="UnitAchieve4" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitApril) ? number_format(0,2) : number_format($achieveOTHUnitApril,2))."%" }}</td>
                    <td id="UnitAchieve5" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitMay) ? number_format(0,2) : number_format($achieveOTHUnitMay,2))."%" }}</td>
                    <td id="UnitAchieve6" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitJune) ? number_format(0,2) : number_format($achieveOTHUnitJune,2))."%" }}</td>
                    <td id="UnitAchieve7" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitJuly) ? number_format(0,2) : number_format($achieveOTHUnitJuly,2))."%" }}</td>
                    <td id="UnitAchieve8" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitAugust) ? number_format(0,2) : number_format($achieveOTHUnitAugust,2))."%" }}</td>
                    <td id="UnitAchieve9" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitSeptember) ? number_format(0,2) : number_format($achieveOTHUnitSeptember,2))."%" }}</td>
                    <td id="UnitAchieve10" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitOctober) ? number_format(0,2) : number_format($achieveOTHUnitOctober,2))."%" }}</td>
                    <td id="UnitAchieve11" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitNovember) ? number_format(0,2) : number_format($achieveOTHUnitNovember,2))."%" }}</td>
                    <td id="UnitAchieve12" style="font-size: 11px; text-align: right;">{{ (is_nan($achieveOTHUnitDecember) ? number_format(0,2) : number_format($achieveOTHUnitDecember,2))."%" }}</td>
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveOTHUnitTotal) ? number_format(0,2) : number_format($achieveOTHUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOld1" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitJanuary) }}</td>
                    <td id="UnitActualOld2" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitFebruary) }}</td>
                    <td id="UnitActualOld3" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitMarch) }}</td>
                    <td id="UnitActualOld4" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitApril) }}</td>
                    <td id="UnitActualOld5" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitMay) }}</td>
                    <td id="UnitActualOld6" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitJune) }}</td>
                    <td id="UnitActualOld7" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitJuly) }}</td>
                    <td id="UnitActualOld8" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitAugust) }}</td>
                    <td id="UnitActualOld9" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitSeptember) }}</td>
                    <td id="UnitActualOld10" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitOctober) }}</td>
                    <td id="UnitActualOld11" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitNovember) }}</td>
                    <td id="UnitActualOld12" style="font-size: 11px; text-align: right;">{{ number_format($oldOTHUnitDecember) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldOTHTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowth1" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitJanuary) ? number_format(0,2) : number_format($growthOTHUnitJanuary,2))."%" }}</td>
                    <td id="UnitGrowth2" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitFebruary) ? number_format(0,2) : number_format($growthOTHUnitFebruary,2))."%" }}</td>
                    <td id="UnitGrowth3" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitMarch) ? number_format(0,2) : number_format($growthOTHUnitMarch,2))."%" }}</td>
                    <td id="UnitGrowth4" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitApril) ? number_format(0,2) : number_format($growthOTHUnitApril,2))."%" }}</td>
                    <td id="UnitGrowth5" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitMay) ? number_format(0,2) : number_format($growthOTHUnitMay,2))."%" }}</td>
                    <td id="UnitGrowth6" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitJune) ? number_format(0,2) : number_format($growthOTHUnitJune,2))."%" }}</td>
                    <td id="UnitGrowth7" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitJuly) ? number_format(0,2) : number_format($growthOTHUnitJuly,2))."%" }}</td>
                    <td id="UnitGrowth8" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitAugust) ? number_format(0,2) : number_format($growthOTHUnitAugust,2))."%" }}</td>
                    <td id="UnitGrowth9" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitSeptember) ? number_format(0,2) : number_format($growthOTHUnitSeptember,2))."%" }}</td>
                    <td id="UnitGrowth10" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitOctober) ? number_format(0,2) : number_format($growthOTHUnitOctober,2))."%" }}</td>
                    <td id="UnitGrowth11" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitNovember) ? number_format(0,2) : number_format($growthOTHUnitNovember,2))."%" }}</td>
                    <td id="UnitGrowth12" style="font-size: 11px; text-align: right;">{{ (is_nan($growthOTHUnitDecember) ? number_format(0,2) : number_format($growthOTHUnitDecember,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthOTHUnitTotal) ? number_format(0,2) : number_format($growthOTHUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table> 
    </div>

</body>
</html>

           