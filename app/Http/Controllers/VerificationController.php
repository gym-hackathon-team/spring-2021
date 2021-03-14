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
            return response(['message' => 'User not found']);
        }

        if ( ! hash_equals((string) $request->route('id'), (string) $user->getKey())) {
            return response(['message' => 'Invalid/Expired url provided.']);
        }

        if ( ! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response(['message' => 'Invalid/Expired url provided.']);
        }

        if ($user->hasVerifiedEmail()) {
            return response(['message' => 'Email already verified.']);
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect()->route('home');
    }

    public function notify(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        return response(['message' => 'Verification link sent!']);
    }
}
