<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserDeleteRequest;
use App\Http\Requests\User\UserShowRequest;
use App\Http\Requests\User\UserUpdateRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "index";
    }

    /**
     * Display the specified resource.
     *
     * @param UserShowRequest $request
     * @return \Illuminate\Http\Response
     */
    public function show(UserShowRequest $request)
    {
        return "show";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request)
    {
        return "update";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param UserDeleteRequest $user
     * @return \Illuminate\Http\Response
     */
    public function delete(UserDeleteRequest $user)
    {
        return "Delete";
    }
}
