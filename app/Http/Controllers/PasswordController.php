<?php

namespace App\Http\Controllers;

use App\Http\Requests\Password\PasswordEmailRequest;
use App\Http\Requests\Password\PasswordUpdateRequest;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    public function email(PasswordEmailRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response(['message' => __($status)]);
        } else {
            return response(['message' => 'Sending error'], 400);
        }
    }

    public function reset()
    {

    }

    public function update(PasswordUpdateRequest $request)
    {

    }
}
