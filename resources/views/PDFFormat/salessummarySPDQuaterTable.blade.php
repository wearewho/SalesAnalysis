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

    <h4><strong> SPD Sales Summary Report (NP,EB,IND,OTH) : Quater of {{$data["year"]}}</strong></h4>        

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
        $currNPUnitQ1 = 0;
        $currNPBahtQ1 = 0;
        $currNPUnitQ2 = 0;
        $currNPBahtQ2 = 0;
        $currNPUnitQ3 = 0;
        $currNPBahtQ3 = 0;
        $currNPUnitQ4 = 0;
        $currNPBahtQ4 = 0;
        $oldNPUnitQ1 = 0;
        $oldNPBahtQ1 = 0;
        $oldNPUnitQ2 = 0;
        $oldNPBahtQ2 = 0;
        $oldNPUnitQ3 = 0;
        $oldNPBahtQ3 = 0;
        $oldNPUnitQ4 = 0;
        $oldNPBahtQ4 = 0;
        $achieveNPBahtQ1 = 0;
        $achieveNPUnitQ1 = 0;
        $achieveNPBahtQ2 = 0;
        $achieveNPUnitQ2 = 0;
        $achieveNPBahtQ3 = 0;
        $achieveNPUnitQ3 = 0;
        $achieveNPBahtQ4 = 0;
        $achieveNPUnitQ4 = 0;
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
        $currEBUnitQ1 = 0;
        $currEBBahtQ1 = 0;
        $currEBUnitQ2 = 0;
        $currEBBahtQ2 = 0;
        $currEBUnitQ3 = 0;
        $currEBBahtQ3 = 0;
        $currEBUnitQ4 = 0;
        $currEBBahtQ4 = 0;
        $oldEBUnitQ1 = 0;
        $oldEBBahtQ1 = 0;
        $oldEBUnitQ2 = 0;
        $oldEBBahtQ2 = 0;
        $oldEBUnitQ3 = 0;
        $oldEBBahtQ3 = 0;
        $oldEBUnitQ4 = 0;
        $oldEBBahtQ4 = 0;
        $achieveEBBahtQ1 = 0;
        $achieveEBUnitQ1 = 0;
        $achieveEBBahtQ2 = 0;
        $achieveEBUnitQ2 = 0;
        $achieveEBBahtQ3 = 0;
        $achieveEBUnitQ3 = 0;
        $achieveEBBahtQ4 = 0;
        $achieveEBUnitQ4 = 0;
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
        $currINDUnitQ1 = 0;
        $currINDBahtQ1 = 0;
        $currINDUnitQ2 = 0;
        $currINDBahtQ2 = 0;
        $currINDUnitQ3 = 0;
        $currINDBahtQ3 = 0;
        $currINDUnitQ4 = 0;
        $currINDBahtQ4 = 0;
        $oldINDUnitQ1 = 0;
        $oldINDBahtQ1 = 0;
        $oldINDUnitQ2 = 0;
        $oldINDBahtQ2 = 0;
        $oldINDUnitQ3 = 0;
        $oldINDBahtQ3 = 0;
        $oldINDUnitQ4 = 0;
        $oldINDBahtQ4 = 0;
        $achieveINDBahtQ1 = 0;
        $achieveINDUnitQ1 = 0;
        $achieveINDBahtQ2 = 0;
        $achieveINDUnitQ2 = 0;
        $achieveINDBahtQ3 = 0;
        $achieveINDUnitQ3 = 0;
        $achieveINDBahtQ4 = 0;
        $achieveINDUnitQ4 = 0;
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
        $currOTHUnitQ1 = 0;
        $currOTHBahtQ1 = 0;
        $currOTHUnitQ2 = 0;
        $currOTHBahtQ2 = 0;
        $currOTHUnitQ3 = 0;
        $currOTHBahtQ3 = 0;
        $currOTHUnitQ4 = 0;
        $currOTHBahtQ4 = 0;
        $oldOTHUnitQ1 = 0;
        $oldOTHBahtQ1 = 0;
        $oldOTHUnitQ2 = 0;
        $oldOTHBahtQ2 = 0;
        $oldOTHUnitQ3 = 0;
        $oldOTHBahtQ3 = 0;
        $oldOTHUnitQ4 = 0;
        $oldOTHBahtQ4 = 0;
        $achieveOTHBahtQ1 = 0;
        $achieveOTHUnitQ1 = 0;
        $achieveOTHBahtQ2 = 0;
        $achieveOTHUnitQ2 = 0;
        $achieveOTHBahtQ3 = 0;
        $achieveOTHUnitQ3 = 0;
        $achieveOTHBahtQ4 = 0;
        $achieveOTHUnitQ4 = 0;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $currNPUnitQ1+= $Item->Quantity;
                    $currNPBahtQ1+= $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $currNPUnitQ2 += $Item->Quantity;
                    $currNPBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $currNPUnitQ3 += $Item->Quantity;
                    $currNPBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $currNPUnitQ4 += $Item->Quantity;
                    $currNPBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $oldNPUnitQ1 += $Item->Quantity;
                    $oldNPBahtQ1 += $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $oldNPUnitQ2 += $Item->Quantity;
                    $oldNPBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $oldNPUnitQ3 += $Item->Quantity;
                    $oldNPBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $oldNPUnitQ4 += $Item->Quantity;
                    $oldNPBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $currEBUnitQ1+= $Item->Quantity;
                    $currEBBahtQ1+= $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $currEBUnitQ2 += $Item->Quantity;
                    $currEBBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $currEBUnitQ3 += $Item->Quantity;
                    $currEBBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $currEBUnitQ4 += $Item->Quantity;
                    $currEBBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $oldEBUnitQ1 += $Item->Quantity;
                    $oldEBBahtQ1 += $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $oldEBUnitQ2 += $Item->Quantity;
                    $oldEBBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $oldEBUnitQ3 += $Item->Quantity;
                    $oldEBBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $oldEBUnitQ4 += $Item->Quantity;
                    $oldEBBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $currINDUnitQ1+= $Item->Quantity;
                    $currINDBahtQ1+= $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $currINDUnitQ2 += $Item->Quantity;
                    $currINDBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $currINDUnitQ3 += $Item->Quantity;
                    $currINDBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $currINDUnitQ4 += $Item->Quantity;
                    $currINDBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $oldINDUnitQ1 += $Item->Quantity;
                    $oldINDBahtQ1 += $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $oldINDUnitQ2 += $Item->Quantity;
                    $oldINDBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $oldINDUnitQ3 += $Item->Quantity;
                    $oldINDBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $oldINDUnitQ4 += $Item->Quantity;
                    $oldINDBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $currOTHUnitQ1+= $Item->Quantity;
                    $currOTHBahtQ1+= $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $currOTHUnitQ2 += $Item->Quantity;
                    $currOTHBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $currOTHUnitQ3 += $Item->Quantity;
                    $currOTHBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $currOTHUnitQ4 += $Item->Quantity;
                    $currOTHBahtQ4 += $Item->Total;
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
                if ($Item->DocMonth == '1' || $Item->DocMonth == '2' || $Item->DocMonth == '3') {
                    $oldOTHUnitQ1 += $Item->Quantity;
                    $oldOTHBahtQ1 += $Item->Total;
                } else if ($Item->DocMonth == '4' || $Item->DocMonth == '5' || $Item->DocMonth == '6') {
                    $oldOTHUnitQ2 += $Item->Quantity;
                    $oldOTHBahtQ2 += $Item->Total;
                } else if ($Item->DocMonth == '7' || $Item->DocMonth == '8' || $Item->DocMonth == '9') {
                    $oldOTHUnitQ3 += $Item->Quantity;
                    $oldOTHBahtQ3 += $Item->Total;
                } else if ($Item->DocMonth == '10' || $Item->DocMonth == '11' || $Item->DocMonth == '12') {
                    $oldOTHUnitQ4 += $Item->Quantity;
                    $oldOTHBahtQ4 += $Item->Total;
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

            $currTotalBaht = $currNPTotalBaht + $currEBTotalBaht + $currINDTotalBaht + $currOTHTotalBaht;
            $currTotalUnit = $currNPTotalUnit + $currEBTotalUnit + $currINDTotalUnit + $currOTHTotalUnit;
            $oldTotalBaht = $oldNPTotalBaht + $oldEBTotalBaht + $oldINDTotalBaht + $oldOTHTotalBaht;
            $oldTotalUnit = $oldNPTotalUnit + $oldEBTotalUnit + $oldINDTotalUnit + $oldOTHTotalUnit;      
            $currUnitQ1 = $currNPUnitQ1 + $currEBUnitQ1 + $currINDUnitQ1 + $currOTHUnitQ1;
            $currBahtQ1 = $currNPBahtQ1 + $currEBBahtQ1 + $currINDBahtQ1 + $currOTHBahtQ1;

            $currUnitQ2 = $currNPUnitQ2 + $currEBUnitQ2 + $currINDUnitQ2 + $currOTHUnitQ2;
            $currBahtQ2 = $currNPBahtQ2 + $currEBBahtQ2 + $currINDBahtQ2 + $currOTHBahtQ2;
            $currUnitQ3 = $currNPUnitQ3 + $currEBUnitQ3 + $currINDUnitQ3 + $currOTHUnitQ3;
            $currBahtQ3 = $currNPBahtQ3 + $currEBBahtQ3 + $currINDBahtQ3 + $currOTHBahtQ3;
            $currUnitQ4 = $currNPUnitQ4 + $currEBUnitQ4 + $currINDUnitQ4 + $currOTHUnitQ4;
            $currBahtQ4 = $currNPBahtQ4 + $currEBBahtQ4 + $currINDBahtQ4 + $currOTHBahtQ4;     
            $oldUnitQ1 = $oldNPUnitQ1 + $oldEBUnitQ1 + $oldINDUnitQ1 + $oldOTHUnitQ1;
            $oldBahtQ1 = $oldNPBahtQ1 + $oldEBBahtQ1 + $oldINDBahtQ1 + $oldOTHBahtQ1;
            $oldUnitQ2 = $oldNPUnitQ2 + $oldEBUnitQ2 + $oldINDUnitQ2 + $oldOTHUnitQ2;
            $oldBahtQ2 = $oldNPBahtQ2 + $oldEBBahtQ2 + $oldINDBahtQ2 + $oldOTHBahtQ2;
            $oldUnitQ3 = $oldNPUnitQ3 + $oldEBUnitQ3 + $oldINDUnitQ3 + $oldOTHUnitQ3;
            $oldBahtQ3 = $oldNPBahtQ3 + $oldEBBahtQ3 + $oldINDBahtQ3 + $oldOTHBahtQ3;
            $oldUnitQ4 = $oldNPUnitQ4 + $oldEBUnitQ4 + $oldINDUnitQ4 + $oldOTHUnitQ4;
            $oldBahtQ4 = $oldNPBahtQ4 + $oldEBBahtQ4 + $oldINDBahtQ4 + $oldOTHBahtQ4;
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

            $totalBahtTarget = (getAmount($targetNP->AmtQ1) + getAmount($targetNP->AmtQ2) + getAmount($targetNP->AmtQ3) + getAmount($targetNP->AmtQ4) + 
                            getAmount($targetEB->AmtQ1) + getAmount($targetEB->AmtQ2) + getAmount($targetEB->AmtQ3) + getAmount($targetEB->AmtQ4) + 
                            getAmount($targetIND->AmtQ1) + getAmount($targetIND->AmtQ2) + getAmount($targetIND->AmtQ3) + getAmount($targetIND->AmtQ4) + 
                            getAmount($targetOTH->AmtQ1) + getAmount($targetOTH->AmtQ2) + getAmount($targetOTH->AmtQ3) + getAmount($targetOTH->AmtQ4));
        $totalUnitTarget = (getAmount($targetNP->UnitQ1) + getAmount($targetNP->UnitQ2) + getAmount($targetNP->UnitQ3) + getAmount($targetNP->UnitQ4) + 
                            getAmount($targetEB->UnitQ1) + getAmount($targetEB->UnitQ2) + getAmount($targetEB->UnitQ3) + getAmount($targetEB->UnitQ4) + 
                            getAmount($targetIND->UnitQ1) + getAmount($targetIND->UnitQ2) + getAmount($targetIND->UnitQ3) + getAmount($targetIND->UnitQ4) + 
                            getAmount($targetOTH->UnitQ1) + getAmount($targetOTH->UnitQ2) + getAmount($targetOTH->UnitQ3) + getAmount($targetOTH->UnitQ4));
            
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

            $growthNPBahtQ1 = (($currNPBahtQ1 - $oldNPBahtQ1) * 100) / calZero($oldNPBahtQ1);
            $growthNPBahtQ2 = (($currNPBahtQ2 - $oldNPBahtQ2) * 100) / calZero($oldNPBahtQ2);
            $growthNPBahtQ3 = (($currNPBahtQ3 - $oldNPBahtQ3) * 100) / calZero($oldNPBahtQ3);
            $growthNPBahtQ4 = (($currNPBahtQ4 - $oldNPBahtQ4) * 100) / calZero($oldNPBahtQ4);
            $growthNPBahtTotal = (($currNPTotalBaht - $oldNPTotalBaht) * 100) / calZero($oldNPTotalBaht);

            $growthNPUnitQ1 = (($currNPUnitQ1 - $oldNPUnitQ1) * 100) / calZero($oldNPUnitQ1);
            $growthNPUnitQ2 = (($currNPUnitQ2 - $oldNPUnitQ2) * 100) / calZero($oldNPUnitQ2);
            $growthNPUnitQ3 = (($currNPUnitQ3 - $oldNPUnitQ3) * 100) / calZero($oldNPUnitQ3);
            $growthNPUnitQ4 = (($currNPUnitQ4 - $oldNPUnitQ4) * 100) / calZero($oldNPUnitQ4);
            $growthNPUnitTotal = (($currNPTotalUnit - $oldNPTotalUnit) * 100) / calZero($oldNPTotalUnit);

            $totalNPBahtTarget = getAmount($targetNP->AmtQ1) + getAmount($targetNP->AmtQ2) + getAmount($targetNP-> AmtQ3) + getAmount($targetNP->AmtQ4);
            $totalNPUnitTarget = getAmount($targetNP->UnitQ1) + getAmount($targetNP->UnitQ2) + getAmount($targetNP-> UnitQ3) + getAmount($targetNP->UnitQ4);
          
            $achieveNPBahtQ1 = ($currNPBahtQ1 * 100) /  calZero(getAmount($targetNP->AmtQ1));
            $achieveNPBahtQ2 = ($currNPBahtQ2 * 100) /  calZero(getAmount($targetNP->AmtQ2));
            $achieveNPBahtQ3 = ($currNPBahtQ3 * 100) /  calZero(getAmount($targetNP->AmtQ3));
            $achieveNPBahtQ4 = ($currNPBahtQ4 * 100) /  calZero(getAmount($targetNP->AmtQ4));
            $achieveNPBahtTotal = ($currNPTotalBaht * 100) / calZero($totalNPBahtTarget);
            
            $achieveNPUnitQ1 = ($currNPUnitQ1 * 100) /  calZero(getAmount($targetNP->UnitQ1));
            $achieveNPUnitQ2 = ($currNPUnitQ2 * 100) /  calZero(getAmount($targetNP->UnitQ2));
            $achieveNPUnitQ3 = ($currNPUnitQ3 * 100) /  calZero(getAmount($targetNP->UnitQ3));
            $achieveNPUnitQ4 = ($currNPUnitQ4 * 100) /  calZero(getAmount($targetNP->UnitQ4));
            $achieveNPUnitTotal = ($currNPTotalUnit * 100) / calZero($totalNPUnitTarget);

                        $growthEBBahtQ1 = (($currEBBahtQ1 - $oldEBBahtQ1) * 100) / calZero($oldEBBahtQ1);
            $growthEBBahtQ2 = (($currEBBahtQ2 - $oldEBBahtQ2) * 100) / calZero($oldEBBahtQ2);
            $growthEBBahtQ3 = (($currEBBahtQ3 - $oldEBBahtQ3) * 100) / calZero($oldEBBahtQ3);
            $growthEBBahtQ4 = (($currEBBahtQ4 - $oldEBBahtQ4) * 100) / calZero($oldEBBahtQ4);
            $growthEBBahtTotal = (($currEBTotalBaht - $oldEBTotalBaht) * 100) / calZero($oldEBTotalBaht);

            $growthEBUnitQ1 = (($currEBUnitQ1 - $oldEBUnitQ1) * 100) / calZero($oldEBUnitQ1);
            $growthEBUnitQ2 = (($currEBUnitQ2 - $oldEBUnitQ2) * 100) / calZero($oldEBUnitQ2);
            $growthEBUnitQ3 = (($currEBUnitQ3 - $oldEBUnitQ3) * 100) / calZero($oldEBUnitQ3);
            $growthEBUnitQ4 = (($currEBUnitQ4 - $oldEBUnitQ4) * 100) / calZero($oldEBUnitQ4);
            $growthEBUnitTotal = (($currEBTotalUnit - $oldEBTotalUnit) * 100) / calZero($oldEBTotalUnit);

            $totalEBBahtTarget = getAmount($targetEB->AmtQ1) + getAmount($targetEB->AmtQ2) + getAmount($targetEB-> AmtQ3) + getAmount($targetEB->AmtQ4);
            $totalEBUnitTarget = getAmount($targetEB->UnitQ1) + getAmount($targetEB->UnitQ2) + getAmount($targetEB-> UnitQ3) + getAmount($targetEB->UnitQ4);
          
            $achieveEBBahtQ1 = ($currEBBahtQ1 * 100) /  calZero(getAmount($targetEB->AmtQ1));
            $achieveEBBahtQ2 = ($currEBBahtQ2 * 100) /  calZero(getAmount($targetEB->AmtQ2));
            $achieveEBBahtQ3 = ($currEBBahtQ3 * 100) /  calZero(getAmount($targetEB->AmtQ3));
            $achieveEBBahtQ4 = ($currEBBahtQ4 * 100) /  calZero(getAmount($targetEB->AmtQ4));
            $achieveEBBahtTotal = ($currEBTotalBaht * 100) / calZero($totalEBBahtTarget);
            
            $achieveEBUnitQ1 = ($currEBUnitQ1 * 100) /  calZero(getAmount($targetEB->UnitQ1));
            $achieveEBUnitQ2 = ($currEBUnitQ2 * 100) /  calZero(getAmount($targetEB->UnitQ2));
            $achieveEBUnitQ3 = ($currEBUnitQ3 * 100) /  calZero(getAmount($targetEB->UnitQ3));
            $achieveEBUnitQ4 = ($currEBUnitQ4 * 100) /  calZero(getAmount($targetEB->UnitQ4));
            $achieveEBUnitTotal = ($currEBTotalUnit * 100) / calZero($totalEBUnitTarget);
            
            $growthINDBahtQ1 = (($currINDBahtQ1 - $oldINDBahtQ1) * 100) / calZero($oldINDBahtQ1);
            $growthINDBahtQ2 = (($currINDBahtQ2 - $oldINDBahtQ2) * 100) / calZero($oldINDBahtQ2);
            $growthINDBahtQ3 = (($currINDBahtQ3 - $oldINDBahtQ3) * 100) / calZero($oldINDBahtQ3);
            $growthINDBahtQ4 = (($currINDBahtQ4 - $oldINDBahtQ4) * 100) / calZero($oldINDBahtQ4);
            $growthINDBahtTotal = (($currINDTotalBaht - $oldINDTotalBaht) * 100) / calZero($oldINDTotalBaht);

            $growthINDUnitQ1 = (($currINDUnitQ1 - $oldINDUnitQ1) * 100) / calZero($oldINDUnitQ1);
            $growthINDUnitQ2 = (($currINDUnitQ2 - $oldINDUnitQ2) * 100) / calZero($oldINDUnitQ2);
            $growthINDUnitQ3 = (($currINDUnitQ3 - $oldINDUnitQ3) * 100) / calZero($oldINDUnitQ3);
            $growthINDUnitQ4 = (($currINDUnitQ4 - $oldINDUnitQ4) * 100) / calZero($oldINDUnitQ4);
            $growthINDUnitTotal = (($currINDTotalUnit - $oldINDTotalUnit) * 100) / calZero($oldINDTotalUnit);

            $totalINDBahtTarget = getAmount($targetIND->AmtQ1) + getAmount($targetIND->AmtQ2) + getAmount($targetIND-> AmtQ3) + getAmount($targetIND->AmtQ4);
            $totalINDUnitTarget = getAmount($targetIND->UnitQ1) + getAmount($targetIND->UnitQ2) + getAmount($targetIND-> UnitQ3) + getAmount($targetIND->UnitQ4);
          
            $achieveINDBahtQ1 = ($currINDBahtQ1 * 100) /  calZero(getAmount($targetIND->AmtQ1));
            $achieveINDBahtQ2 = ($currINDBahtQ2 * 100) /  calZero(getAmount($targetIND->AmtQ2));
            $achieveINDBahtQ3 = ($currINDBahtQ3 * 100) /  calZero(getAmount($targetIND->AmtQ3));
            $achieveINDBahtQ4 = ($currINDBahtQ4 * 100) /  calZero(getAmount($targetIND->AmtQ4));
            $achieveINDBahtTotal = ($currINDTotalBaht * 100) / calZero($totalINDBahtTarget);
            
            $achieveINDUnitQ1 = ($currINDUnitQ1 * 100) /  calZero(getAmount($targetIND->UnitQ1));
            $achieveINDUnitQ2 = ($currINDUnitQ2 * 100) /  calZero(getAmount($targetIND->UnitQ2));
            $achieveINDUnitQ3 = ($currINDUnitQ3 * 100) /  calZero(getAmount($targetIND->UnitQ3));
            $achieveINDUnitQ4 = ($currINDUnitQ4 * 100) /  calZero(getAmount($targetIND->UnitQ4));
            $achieveINDUnitTotal = ($currINDTotalUnit * 100) / calZero($totalINDUnitTarget);
            
            $growthOTHBahtQ1 = (($currOTHBahtQ1 - $oldOTHBahtQ1) * 100) / calZero($oldOTHBahtQ1);
            $growthOTHBahtQ2 = (($currOTHBahtQ2 - $oldOTHBahtQ2) * 100) / calZero($oldOTHBahtQ2);
            $growthOTHBahtQ3 = (($currOTHBahtQ3 - $oldOTHBahtQ3) * 100) / calZero($oldOTHBahtQ3);
            $growthOTHBahtQ4 = (($currOTHBahtQ4 - $oldOTHBahtQ4) * 100) / calZero($oldOTHBahtQ4);
            $growthOTHBahtTotal = (($currOTHTotalBaht - $oldOTHTotalBaht) * 100) / calZero($oldOTHTotalBaht);

            $growthOTHUnitQ1 = (($currOTHUnitQ1 - $oldOTHUnitQ1) * 100) / calZero($oldOTHUnitQ1);
            $growthOTHUnitQ2 = (($currOTHUnitQ2 - $oldOTHUnitQ2) * 100) / calZero($oldOTHUnitQ2);
            $growthOTHUnitQ3 = (($currOTHUnitQ3 - $oldOTHUnitQ3) * 100) / calZero($oldOTHUnitQ3);
            $growthOTHUnitQ4 = (($currOTHUnitQ4 - $oldOTHUnitQ4) * 100) / calZero($oldOTHUnitQ4);
            $growthOTHUnitTotal = (($currOTHTotalUnit - $oldOTHTotalUnit) * 100) / calZero($oldOTHTotalUnit);

            $totalOTHBahtTarget = getAmount($targetOTH->AmtQ1) + getAmount($targetOTH->AmtQ2) + getAmount($targetOTH-> AmtQ3) + getAmount($targetOTH->AmtQ4);
            $totalOTHUnitTarget = getAmount($targetOTH->UnitQ1) + getAmount($targetOTH->UnitQ2) + getAmount($targetOTH-> UnitQ3) + getAmount($targetOTH->UnitQ4);
          
            $achieveOTHBahtQ1 = ($currOTHBahtQ1 * 100) /  calZero(getAmount($targetOTH->AmtQ1));
            $achieveOTHBahtQ2 = ($currOTHBahtQ2 * 100) /  calZero(getAmount($targetOTH->AmtQ2));
            $achieveOTHBahtQ3 = ($currOTHBahtQ3 * 100) /  calZero(getAmount($targetOTH->AmtQ3));
            $achieveOTHBahtQ4 = ($currOTHBahtQ4 * 100) /  calZero(getAmount($targetOTH->AmtQ4));
            $achieveOTHBahtTotal = ($currOTHTotalBaht * 100) / calZero($totalOTHBahtTarget);
            
            $achieveOTHUnitQ1 = ($currOTHUnitQ1 * 100) /  calZero(getAmount($targetOTH->UnitQ1));
            $achieveOTHUnitQ2 = ($currOTHUnitQ2 * 100) /  calZero(getAmount($targetOTH->UnitQ2));
            $achieveOTHUnitQ3 = ($currOTHUnitQ3 * 100) /  calZero(getAmount($targetOTH->UnitQ3));
            $achieveOTHUnitQ4 = ($currOTHUnitQ4 * 100) /  calZero(getAmount($targetOTH->UnitQ4));
            $achieveOTHUnitTotal = ($currOTHTotalUnit * 100) / calZero($totalOTHUnitTarget);
                
        @endphp        

        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">NP,EB,IND,OTH (BAHT)</th>
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
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ1) + getAmount($targetEB->AmtQ1) + getAmount($targetIND->AmtQ1) + getAmount($targetOTH->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ2) + getAmount($targetEB->AmtQ2) + getAmount($targetIND->AmtQ2) + getAmount($targetOTH->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ3) + getAmount($targetEB->AmtQ3) + getAmount($targetIND->AmtQ3) + getAmount($targetOTH->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ4) + getAmount($targetEB->AmtQ4) + getAmount($targetIND->AmtQ4) + getAmount($targetOTH->AmtQ4),2) }}</td>
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
                    <th style="vertical-align:middle; text-align:center; width:160px;">NP,EB,IND,OTH (UNIT)</th>
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
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->UnitQ1) + getAmount($targetEB->UnitQ1) + getAmount($targetIND->UnitQ1) + getAmount($targetOTH->UnitQ1),2) }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->UnitQ2) + getAmount($targetEB->UnitQ2) + getAmount($targetIND->UnitQ2) + getAmount($targetOTH->UnitQ2),2) }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->UnitQ3) + getAmount($targetEB->UnitQ3) + getAmount($targetIND->UnitQ3) + getAmount($targetOTH->UnitQ3),2) }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->UnitQ4) + getAmount($targetEB->UnitQ4) + getAmount($targetIND->UnitQ4) + getAmount($targetOTH->UnitQ4),2) }}</td>
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
        <h4><strong> SPD Sales Summary Report (NP) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">NP (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currNPBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currNPBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currNPBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currNPBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currNPTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetNP->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPBahtQ1) ? number_format(0,2) : number_format($achieveNPBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPBahtQ2) ? number_format(0,2) : number_format($achieveNPBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPBahtQ3) ? number_format(0,2) : number_format($achieveNPBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPBahtQ4) ? number_format(0,2) : number_format($achieveNPBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveNPBahtTotal) ? number_format(0,2) : number_format($achieveNPBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldNPBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldNPBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldNPBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldNPBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldNPTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPBahtQ1) ? number_format(0,2) : number_format($growthNPBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPBahtQ2) ? number_format(0,2) : number_format($growthNPBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPBahtQ3) ? number_format(0,2) : number_format($growthNPBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPBahtQ4) ? number_format(0,2) : number_format($growthNPBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthNPBahtTotal) ? number_format(0,2) : number_format($growthNPBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">NP (UNIT)</th>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currNPUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currNPUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currNPUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currNPUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currNPTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetNP->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetNP->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetNP->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetNP->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPUnitQ1) ? number_format(0,2) : number_format($achieveNPUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPUnitQ2) ? number_format(0,2) : number_format($achieveNPUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPUnitQ3) ? number_format(0,2) : number_format($achieveNPUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveNPUnitQ4) ? number_format(0,2) : number_format($achieveNPUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveNPUnitTotal) ? number_format(0,2) : number_format($achieveNPUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldNPUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldNPUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldNPUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldNPUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldNPTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPUnitQ1) ? number_format(0,2) : number_format($growthNPUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPUnitQ2) ? number_format(0,2) : number_format($growthNPUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPUnitQ3) ? number_format(0,2) : number_format($growthNPUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthNPUnitQ4) ? number_format(0,2) : number_format($growthNPUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthNPUnitTotal) ? number_format(0,2) : number_format($growthNPUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>

    
    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">  
        <h4><strong> SPD Sales Summary Report (EB) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">EB (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currEBBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currEBBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currEBBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currEBBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currEBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetEB->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetEB->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetEB->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetEB->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBBahtQ1) ? number_format(0,2) : number_format($achieveEBBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBBahtQ2) ? number_format(0,2) : number_format($achieveEBBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBBahtQ3) ? number_format(0,2) : number_format($achieveEBBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBBahtQ4) ? number_format(0,2) : number_format($achieveEBBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveEBBahtTotal) ? number_format(0,2) : number_format($achieveEBBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldEBBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldEBBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldEBBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldEBBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldEBTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBBahtQ1) ? number_format(0,2) : number_format($growthEBBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBBahtQ2) ? number_format(0,2) : number_format($growthEBBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBBahtQ3) ? number_format(0,2) : number_format($growthEBBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBBahtQ4) ? number_format(0,2) : number_format($growthEBBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthEBBahtTotal) ? number_format(0,2) : number_format($growthEBBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">EB (UNIT)</th>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currEBUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currEBUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currEBUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currEBUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currEBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetEB->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetEB->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetEB->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetEB->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBUnitQ1) ? number_format(0,2) : number_format($achieveEBUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBUnitQ2) ? number_format(0,2) : number_format($achieveEBUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBUnitQ3) ? number_format(0,2) : number_format($achieveEBUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveEBUnitQ4) ? number_format(0,2) : number_format($achieveEBUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveEBUnitTotal) ? number_format(0,2) : number_format($achieveEBUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldEBUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldEBUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldEBUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldEBUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldEBTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBUnitQ1) ? number_format(0,2) : number_format($growthEBUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBUnitQ2) ? number_format(0,2) : number_format($growthEBUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBUnitQ3) ? number_format(0,2) : number_format($growthEBUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthEBUnitQ4) ? number_format(0,2) : number_format($growthEBUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthEBUnitTotal) ? number_format(0,2) : number_format($growthEBUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>

    
    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">  
        <h4><strong> SPD Sales Summary Report (IND) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">IND (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currINDBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currINDBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currINDBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currINDBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currINDTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetIND->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetIND->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetIND->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetIND->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDBahtQ1) ? number_format(0,2) : number_format($achieveINDBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDBahtQ2) ? number_format(0,2) : number_format($achieveINDBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDBahtQ3) ? number_format(0,2) : number_format($achieveINDBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDBahtQ4) ? number_format(0,2) : number_format($achieveINDBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveINDBahtTotal) ? number_format(0,2) : number_format($achieveINDBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldINDBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldINDBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldINDBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldINDBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldINDTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDBahtQ1) ? number_format(0,2) : number_format($growthINDBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDBahtQ2) ? number_format(0,2) : number_format($growthINDBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDBahtQ3) ? number_format(0,2) : number_format($growthINDBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDBahtQ4) ? number_format(0,2) : number_format($growthINDBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthINDBahtTotal) ? number_format(0,2) : number_format($growthINDBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">IND (UNIT)</th>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currINDUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currINDUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currINDUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currINDUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currINDTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetIND->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetIND->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetIND->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetIND->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDUnitQ1) ? number_format(0,2) : number_format($achieveINDUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDUnitQ2) ? number_format(0,2) : number_format($achieveINDUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDUnitQ3) ? number_format(0,2) : number_format($achieveINDUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveINDUnitQ4) ? number_format(0,2) : number_format($achieveINDUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveINDUnitTotal) ? number_format(0,2) : number_format($achieveINDUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldINDUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldINDUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldINDUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldINDUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldINDTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDUnitQ1) ? number_format(0,2) : number_format($growthINDUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDUnitQ2) ? number_format(0,2) : number_format($growthINDUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDUnitQ3) ? number_format(0,2) : number_format($growthINDUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthINDUnitQ4) ? number_format(0,2) : number_format($growthINDUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthINDUnitTotal) ? number_format(0,2) : number_format($growthINDUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>

    
    <div class="page-break"></div>

    <div style="position: absolute; bottom: 0px; top: 100px; left: 0px; right: 0px; ">  
        <h4><strong> SPD Sales Summary Report (OTH) : Quater of {{$data["year"]}}</strong></h4>  
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">OTH (BAHT)</th>
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
            <td id="BahtActualNowQ1"  style="font-size: 13px; text-align: right;">{{ number_format($currOTHBahtQ1,2) }}</td>
            <td id="BahtActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currOTHBahtQ2,2) }}</td>
            <td id="BahtActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currOTHBahtQ3,2) }}</td>
            <td id="BahtActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currOTHBahtQ4,2) }}</td>
            <td id="BahtActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currOTHTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>
                <td id="BahtTargetNowQ1" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetOTH->AmtQ1),2) }}</td>
                <td id="BahtTargetNowQ2" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetOTH->AmtQ2),2) }}</td>
                <td id="BahtTargetNowQ3" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetOTH->AmtQ3),2) }}</td>
                <td id="BahtTargetNowQ4" style="font-size: 13px; text-align: right;">{{ number_format(getAmount($targetOTH->AmtQ4),2) }}</td>
                <td id="BahtTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalBahtTarget) }}</td>
            </tr> 
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                <td id="BahtAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHBahtQ1) ? number_format(0,2) : number_format($achieveOTHBahtQ1,2))."%" }}</td>
                <td id="BahtAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHBahtQ2) ? number_format(0,2) : number_format($achieveOTHBahtQ2,2))."%" }}</td>
                <td id="BahtAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHBahtQ3) ? number_format(0,2) : number_format($achieveOTHBahtQ3,2))."%" }}</td>
                <td id="BahtAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHBahtQ4) ? number_format(0,2) : number_format($achieveOTHBahtQ4,2))."%" }}</td>
                <td id="BahtAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveOTHBahtTotal) ? number_format(0,2) : number_format($achieveOTHBahtTotal,2))."%" }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td>
                <td id="BahtActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHBahtQ1,2) }}</td>
                <td id="BahtActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHBahtQ2,2) }}</td>
                <td id="BahtActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHBahtQ3,2) }}</td>
                <td id="BahtActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHBahtQ4,2) }}</td>
                <td id="BahtActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldOTHTotalBaht,2) }}</td>
            </tr>
            <tr style="text-align:center;" bgcolor="#ffd699">
                <td bgcolor="#b6dde8"><b>Growth(%)</b></td>                    

                <td id="BahtGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHBahtQ1) ? number_format(0,2) : number_format($growthOTHBahtQ1,2))."%" }}</td>
                <td id="BahtGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHBahtQ2) ? number_format(0,2) : number_format($growthOTHBahtQ2,2))."%" }}</td>
                <td id="BahtGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHBahtQ3) ? number_format(0,2) : number_format($growthOTHBahtQ3,2))."%" }}</td>
                <td id="BahtGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHBahtQ4) ? number_format(0,2) : number_format($growthOTHBahtQ4,2))."%" }}</td>
                <td id="BahtGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthOTHBahtTotal) ? number_format(0,2) : number_format($growthOTHBahtTotal,2))."%" }}</td>
            </tr>                   
        </tbody>
        </table>
        <table id="BAHTTable" class="table table-bordered" style="font-size: 14px;" >
            <thead>
                <tr style="text-align:center;" bgcolor="#b6dde8">
                    <th style="vertical-align:middle; text-align:center; width:160px;">OTH (UNIT)</th>
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
                    <td id="UnitActualNowQ1" style="font-size: 13px; text-align: right;">{{ number_format($currOTHUnitQ1) }}</td>
                    <td id="UnitActualNowQ2" style="font-size: 13px; text-align: right;">{{ number_format($currOTHUnitQ2) }}</td>
                    <td id="UnitActualNowQ3" style="font-size: 13px; text-align: right;">{{ number_format($currOTHUnitQ3) }}</td>
                    <td id="UnitActualNowQ4" style="font-size: 13px; text-align: right;">{{ number_format($currOTHUnitQ4) }}</td>
                    <td id="UnitActualNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($currOTHTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699"> 
                    <td bgcolor="#b6dde8"><b>Target {{$data["year"]}}</b></td>                             
                    <td id="UnitTargetNowQ1" style="font-size: 13px; text-align: right;">{{ $targetOTH->UnitQ1 }}</td>
                    <td id="UnitTargetNowQ2" style="font-size: 13px; text-align: right;">{{ $targetOTH->UnitQ2 }}</td>
                    <td id="UnitTargetNowQ3" style="font-size: 13px; text-align: right;">{{ $targetOTH->UnitQ3 }}</td>
                    <td id="UnitTargetNowQ4" style="font-size: 13px; text-align: right;">{{ $targetOTH->UnitQ4 }}</td>
                    <td id="UnitTargetNowTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($totalUnitTarget,2) }}</td>
                </tr> 
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Achieve(%)</b></td>
                    <td id="UnitAchieveQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHUnitQ1) ? number_format(0,2) : number_format($achieveOTHUnitQ1,2))."%" }}</td>
                    <td id="UnitAchieveQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHUnitQ2) ? number_format(0,2) : number_format($achieveOTHUnitQ2,2))."%" }}</td>
                    <td id="UnitAchieveQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHUnitQ3) ? number_format(0,2) : number_format($achieveOTHUnitQ3,2))."%" }}</td>
                    <td id="UnitAchieveQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($achieveOTHUnitQ4) ? number_format(0,2) : number_format($achieveOTHUnitQ4,2))."%" }}</td>              
                    <td id="UnitAchieveTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($achieveOTHUnitTotal) ? number_format(0,2) : number_format($achieveOTHUnitTotal,2))."%" }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Actual {{$data["oldYear"]}}</b></td> 
                    <td id="UnitActualOldQ1" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHUnitQ1) }}</td>
                    <td id="UnitActualOldQ2" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHUnitQ2) }}</td>
                    <td id="UnitActualOldQ3" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHUnitQ3) }}</td>
                    <td id="UnitActualOldQ4" style="font-size: 13px; text-align: right;">{{ number_format($oldOTHUnitQ4) }}</td>
                    <td id="UnitActualOldTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ number_format($oldOTHTotalUnit) }}</td>
                </tr>
                <tr style="text-align:center;" bgcolor="#ffd699">
                    <td bgcolor="#b6dde8"><b>Growth(%)</b></td>
                    <td id="UnitGrowthQ1" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHUnitQ1) ? number_format(0,2) : number_format($growthOTHUnitQ1,2))."%" }}</td>
                    <td id="UnitGrowthQ2" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHUnitQ2) ? number_format(0,2) : number_format($growthOTHUnitQ2,2))."%" }}</td>
                    <td id="UnitGrowthQ3" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHUnitQ3) ? number_format(0,2) : number_format($growthOTHUnitQ3,2))."%" }}</td>
                    <td id="UnitGrowthQ4" style="font-size: 13px; text-align: right;">{{ (is_nan($growthOTHUnitQ4) ? number_format(0,2) : number_format($growthOTHUnitQ4,2))."%" }}</td>
                    <td id="UnitGrowthTotal" style="font-size: 13px; font-weight: bold; text-align: right;" bgcolor="#c2efaa">{{ (is_nan($growthOTHUnitTotal) ? number_format(0,2) : number_format($growthOTHUnitTotal,2))."%" }}</td>
                </tr>                   
            </tbody>
        </table>
    </div>
    
</body>
</html>

           