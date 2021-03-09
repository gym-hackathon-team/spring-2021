<?php

namespace App\Http\Requests\User;

use App\Http\Requests\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'email',
            'password' => 'string|min:6|max:20',
            'name' => 'string|min:2|max:50',
        ];
    }
}
