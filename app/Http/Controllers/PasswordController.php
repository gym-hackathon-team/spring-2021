<?php

namespace App\Http\Controllers;

use App\Http\Requests\Password\PasswordValidateRequest;
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
        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response(['message' => __($status)]);
        } else {
            return response(['message' => __('passwords.sent_error')], 400);
        }
    }

    /**
     * @param  PasswordValidateRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function validation(PasswordValidateRequest $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ( ! $user) {
            return response(['message' => __('passwords.user')], 404);
        }

        $status = Password::tokenExists($user, $request->input('code'));

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

        if ($status ===  Password::PASSWORD_RESET) {
            return response(['message' => __($status)]);
        } else {
            return response(['message' => __($status)], 400);
        }
    }
}
