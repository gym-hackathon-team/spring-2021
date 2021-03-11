<?php

namespace App\Http\Requests\Verification;

use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerificationVerifyRequest extends EmailVerificationRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = User::find($this->route('id'));

        if ( ! $user ) {
            return false;
        }

        if (! hash_equals((string) $this->route('id'), (string) $user->getKey())) {
            return false;
        }

        if (! hash_equals((string) $this->route('hash'), sha1($user->getEmailForVerification()))) {
            return false;
        }

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
            //
        ];
    }
}
