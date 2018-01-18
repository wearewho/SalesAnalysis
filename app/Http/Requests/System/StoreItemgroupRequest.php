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
            'ItmsGrpCod' => 'required|integer|unique:S_OITB,ItmsGrpCod',
            'U_ShortItemGroup' => 'required|unique:S_OITB,U_ShortItemGroup|max:10',
            'ItmsGrpNam' => 'required|max:20'
        ];
    }
}
