<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddNote extends FormRequest
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
            'name' => 'required|string|max:191',
            'status' => 'required|numeric|between:1,2',
            'date' => 'required|date|date_format:Y-m-d',
        ];
    }
}
