<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\Password\PasswordEmailRequest;
use App\Http\Requests\Password\PasswordUpdateRequest;
use Illuminate\Support\Facades\Hash;
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

    public function update(PasswordUpdateRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response(['message' => __($status)]);
        } else {
            return response(['message' => __($status)], 400);
        }
    }
}
