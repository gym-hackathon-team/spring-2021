<?php

namespace App\Http\Controllers;

use App\Http\Requests\Verification\VerificationVerifyRequest;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function notice() {
        return response( ['message' => 'Email not verified'] );
    }

    public function verify(VerificationVerifyRequest $request) {
        $user = User::find($request->route('id'));

        if ( $user->hasVerifiedEmail() ) {
            return response( [ 'message' => 'Email already verified' ] );
        }

        $user->markEmailAsVerified();
        event(new Verified($user));

        return redirect()->route('home');
    }

    public function send( Request $request ) {
        $request->user()->sendEmailVerificationNotification();

        return response( ['message' => 'Verification link sent!'] );
    }
}
