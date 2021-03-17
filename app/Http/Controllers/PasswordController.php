<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\Password\PasswordEmailRequest;
use App\Http\Requests\Password\PasswordUpdateRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    /**
     * @param  PasswordEmailRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function email(PasswordEmailRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response(['message' => __($status)]);
        } else {
            return response(['message' => 'Sending error.'], 400);
        }
    }

    public function validation($user_id, $code)
    {
        $user = User::find($user_id);

        if ( ! $user) {
            return response(['message' => 'User not found.'], 404);
        }

        $status = Password::tokenExists($user, $code);

        return response(['message' => $status]);
    }

    /**
     * @param  PasswordUpdateRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
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
