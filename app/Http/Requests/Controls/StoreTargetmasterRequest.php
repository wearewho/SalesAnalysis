<?php

namespace App\Http\Requests\Controls;

use Illuminate\Foundation\Http\FormRequest;

class StoreTargetmasterRequest extends FormRequest
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
            'market' => 'required',
            'company' => 'required',
            'year' => 'required'
        ];
    }
}
