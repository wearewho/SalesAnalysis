 <table id="newItem" style="display: none;">
    <tr id="trAmount">
        <td rowspan="2" style="text-align:center; vertical-align:middle;" bgcolor="#ffff99">            
            <button type="button" class="btn btn-sm btn-danger" id="btnDeleteItemGroup">Delete</button>
        </td>
        <td rowspan="2" class="BorderLeft BorderRight BorderTopBot" style="vertical-align:middle;" bgcolor="#ffff99">
            <select class="form-control" name="ItemGroup[]" id="ItemGroup" required>
                <option disabled selected value>Select</option>
                @foreach ($ItemGroup as $Item)
                @php
                    $Item->U_ShortItemGroup=str_replace(" ", "", $Item->U_ShortItemGroup); 
                @endphp 
                <option value="{{ $Item->U_ShortItemGroup }}">{{ $Item->U_ShortItemGroup }}</option>
                @endforeach
            </select>
        </td>
        <td style="text-align: center;" bgcolor="#b6dde8">
            <b>Amount</b>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_01[]" id="Amt_01" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_02[]" id="Amt_02" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">                            
            <input name="Amt_03[]" id="Amt_03" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Amt_Q1[]" id="Amt_Q1" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">                            
            <input name="Amt_04[]" id="Amt_04" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">                            
            <input name="Amt_05[]" id="Amt_05" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_06[]" id="Amt_06" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Amt_Q2[]" id="Amt_Q2" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}"  readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">                            
            <input name="Amt_07[]" id="Amt_07" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_08[]" id="Amt_08" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_09[]" id="Amt_09" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Amt_Q3[]" id="Amt_Q3" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}"  readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_10[]" id="Amt_10" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_11[]" id="Amt_11" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Amt_12[]" id="Amt_12" data-item="money" type="text" class="form-control" onBlur="FncNumberFloatFormat(this);" value="{{ number_format(0,2) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">                            
            <input name="Amt_Q4[]" id="Amt_Q4" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#47d147">
            <input name="Amt_Total[]" id="Amt_Total" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0,2) }}" readonly>
        </td>
    </tr>
    <tr  id="trUnit">    
        <td style="text-align: center;" bgcolor="#b6dde8">
           <b>Unit</b>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_01[]" id="Unit_01" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_02[]" id="Unit_02" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_03[]" id="Unit_03" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Unit_Q1[]" id="Unit_Q1" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}"  readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_04[]" id="Unit_04" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_05[]" id="Unit_05" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_06[]" id="Unit_06" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Unit_Q2[]" id="Unit_Q2" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_07[]" id="Unit_07" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_08[]" id="Unit_08" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_09[]" id="Unit_09" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Unit_Q3[]" id="Unit_Q3" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_10[]" id="Unit_10" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_11[]" id="Unit_11" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#ffff99">
            <input name="Unit_12[]" id="Unit_12" data-item="number" type="text" class="form-control" onBlur="FncNumberFormat(this);" value="{{ number_format(0) }}">
        </td>
        <td align="center" class="BorderRight" bgcolor="#b6dde8">
            <input name="Unit_Q4[]" id="Unit_Q4" type="text" style="font-weight: bold;" class="form-control" value="{{ number_format(0) }}" readonly>
        </td>
        <td align="center" class="BorderRight" bgcolor="#47d147">
            <input name="Unit_Total[]" id="Unit_Total" style="font-weight: bold;" type="text" class="form-control" value="{{ number_format(0) }}" readonly>
        </td>
    </tr>
</table>