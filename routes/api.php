<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function() {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('auth.logout');
});

Route::group(['prefix' => 'email'], function() {
    Route::get('/email/verify', [VerificationController::class, 'notice'])->middleware('auth:api')->name('verification.notice');
    Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::post('/verification-notify', [VerificationController::class, 'send'])->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');
});

Route::group(['namespace' => 'User', 'prefix' => 'user', 'middleware' => 'auth:api'], function() {
    Route::get('/{id}', [UserController::class, 'show'])->name('user.show');
    Route::post('/', [UserController::class, 'update'])->name('user.update');

    Route::post('/flex', function () {
        return "Verified Route";
    })->middleware('verified');

});
