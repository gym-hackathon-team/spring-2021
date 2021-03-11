<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param $id
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id) {
        $user = User::find($id);

        if ($user) {
            return response( $user );
        } else {
            return response( ['message' => 'Not Found'], 404 );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request)
    {
        $user = Auth::user();

        $data = $request->all();
        $result = $user->fill($data)->save();

        if ($result) {
            return response( $user );
        } else {
            return response( ['message' => 'Saving Error'], 400 );
        }
    }
}
