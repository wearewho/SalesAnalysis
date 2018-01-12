@php
$x=0;
@endphp
@foreach ($TargetD as $Item)
@php
$x++;
@endphp
<tr id="trAmount{{"_".$x}}">
    <td rowspan="2" style="text-align:center; vertical-align:middle;" bgcolor="#ffff99">            
        <button type="button" class="btn btn-sm btn-danger" id="btnDeleteItemGroup{{"_".$x}}">Delete</button>
    </td>
    <td rowspan="2" class="BorderLeft BorderRight BorderTopBot" style="vertical-align:middle;" bgcolor="#ffff99">
        <select class="form-control" name="ItemGroup[]" id="ItemGroup{{"_".$x}}">
            @foreach ($ItemGroup as $ItemNew)    
                @php
                    $ItemNew->ItemGroupName=str_replace(" ", "", $ItemNew->ItemGroupName); 
                    $Item->ItemGroup=str_replace(" ", "", $Item->ItemGroup); 
                @endphp 
                @if ($ItemNew->ItemGroupName == $Item->ItemGroup )
                    <option value="{{$Item->ItemGroup}}" selected="selected">{{$Item->ItemGroup}}</option>
                @else
                    <option value="{{$ItemNew->ItemGroupName}}">{{$ItemNew->ItemGroupName}}</option>
                @endif
            @endforeach
        </select>
    </td>
    <td style="text-align: center;" bgcolor="#b6dde8">
        <b>Amount</b>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_01[]" id="Amt_01{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt01 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_02[]" id="Amt_02{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt02 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">                            
        <input name="Amt_03[]" id="Amt_03{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt03 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Amt_Q1[]" id="Amt_Q1{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">                            
        <input name="Amt_04[]" id="Amt_04{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt04 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">                            
        <input name="Amt_05[]" id="Amt_05{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt05 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_06[]" id="Amt_06{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt06 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Amt_Q2[]" id="Amt_Q2{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}"  readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">                            
        <input name="Amt_07[]" id="Amt_07{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt07 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_08[]" id="Amt_08{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt08 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_09[]" id="Amt_09{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt09 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Amt_Q3[]" id="Amt_Q3{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}"  readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_10[]" id="Amt_10{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt10 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_11[]" id="Amt_11{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt11 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Amt_12[]" id="Amt_12{{"_".$x}}" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ $Item->Amt12 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">                            
        <input name="Amt_Q4[]" id="Amt_Q4{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#47d147">
        <input name="Amt_Total[]" id="Amt_Total{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
    </td>
</tr>
<tr  id="trUnit{{"_".$x}}">    
    <td style="text-align: center;" bgcolor="#b6dde8">
        <b>Unit</b>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_01[]" id="Unit_01{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit01 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_02[]" id="Unit_02{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit02 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_03[]" id="Unit_03{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit03 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Unit_Q1[]" id="Unit_Q1{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}"  readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_04[]" id="Unit_04{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit04 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_05[]" id="Unit_05{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit05 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_06[]" id="Unit_06{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit06 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Unit_Q2[]" id="Unit_Q2{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_07[]" id="Unit_07{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit07 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_08[]" id="Unit_08{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit08 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_09[]" id="Unit_09{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit09 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Unit_Q3[]" id="Unit_Q3{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_10[]" id="Unit_10{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit10 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_11[]" id="Unit_11{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit11 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#ffff99">
        <input name="Unit_12[]" id="Unit_12{{"_".$x}}" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ $Item->Unit12 }}">
    </td>
    <td align="center" class="BorderRight" bgcolor="#b6dde8">
        <input name="Unit_Q4[]" id="Unit_Q4{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
    </td>
    <td align="center" class="BorderRight" bgcolor="#47d147">
        <input name="Unit_Total[]" id="Unit_Total{{"_".$x}}" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
    </td>
</tr>
@endforeach