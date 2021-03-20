<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        $user = User::find($request->route('id'));

        if ( ! $user) {
            return response(['message' => __('verification.verify.user_not_found')]);
        }

        if ( ! hash_equals((string) $request->route('id'), (string) $user->getKey())) {
            return response(['message' => __('verification.verify.invalid_url')]);
        }

        if ( ! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response(['message' => __('verification.verify.invalid_url')]);
        }

        if ($user->hasVerifiedEmail()) {
            return response(['message' => __('verification.verify.already_verified')]);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect()->route('spa');
    }

    public function notify(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        return response(['message' => __('verification.notify.sent')]);
    }
}
