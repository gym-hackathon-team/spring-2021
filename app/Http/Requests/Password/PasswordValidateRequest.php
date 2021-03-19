<?php

namespace App\Http\Requests\Password;

use Illuminate\Foundation\Http\FormRequest;

class PasswordValidateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
            'code' => 'required',
        ];
    }
}
