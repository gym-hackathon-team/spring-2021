<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ( ! $user) {
            return response(['message' => __('auth.login.failed')], 403);
        }

        if ( ! Hash::check($request->input('password'), $user->password)) {
            return response(['message' => __('auth.login.password')], 403);
        }

        $token = $user->createToken('SPA Access', ['*'])->accessToken;

        $user_data                 = $user->toArray();
        $user_data['access_token'] = $token;

        return response($user_data);
    }

    public function register(AuthRegisterRequest $request)
    {
        $data['email']    = $request->input('email');
        $data['password'] = Hash::make($request->input('password'));
        $data['name']     = $request->input('name');

        $user = User::create($data);

        if ($user) {
            event(new Registered($user));

            /*Http::post(env('STATISTICS_SERVICE') . '/user/', [
                'user_id' => $user->id,
            ]);*/

            return response($user, 201);
        } else {
            return response(['message' => __('auth.register.failed')], 400);
        }
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
        }

        return response(['message' => __('auth.logout.success')]);
    }
}
