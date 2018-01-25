<?php
namespace App\Http\Requests\System;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMarketRequest extends FormRequest
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
            'Code' => 'required|max:30',
            'Name' => 'required|max:30'
        ];
    }
}