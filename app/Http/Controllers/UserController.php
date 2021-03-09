<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserDeleteRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param $id
     *
     * @return JsonResponse
     */
    public function show($id): JsonResponse {
        $user = User::find($id);

        if ($user) {
            return response()->json( $user );
        } else {
            return response()->json( "Not Found", 404 );
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request)
    {
        $user = Auth::user();

        $data = $request->all();
        $result = $user->fill($data)->save();

        if ($result) {
            return response()->json( $user );
        } else {
            return response()->json( "Saving Error", 400 );
        }
    }
}
