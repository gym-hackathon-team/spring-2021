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
    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response($user);
        } else {
            return response(['message' => __('user.show.failed')], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserUpdateRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request)
    {
        $user = Auth::user();

        $data   = $request->all();
        $result = $user->fill($data)->save();

        if ($result) {
            return response($user);
        } else {
            return response(['message' => __('user.update.failed')], 400);
        }
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     *
     */
    public function streams($id) {
        $user = User::find($id);

        if ( ! $user) {
            return response(['message' => __('user.show.failed')], 404);
        }

        $streams = $user->streams;

        if ($streams) {
            return response($streams);
        } else {
            return response(['message' => __('user.streams.failed')], 400);
        }
    }
}
