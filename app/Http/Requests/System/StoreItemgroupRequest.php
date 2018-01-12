<?php
namespace App\Http\Requests\System;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemgroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ItemGroupName' => 'required|unique:X_ItemGroup,ItemGroupName|max:10',
            'ItemGroupDesp' => 'required|max:50'
        ];
    }
}
