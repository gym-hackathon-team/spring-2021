<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\StreamCommentsController;
use App\Http\Controllers\StreamController;
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

Route::group(['prefix' => 'verification'], function() {
    Route::get('/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::post('/notify', [VerificationController::class, 'notify'])->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');
});

Route::group(['prefix' => 'password', 'middleware' => 'guest'], function() {
    Route::post('/email', [PasswordController::class, 'email'])->name('password.email');
    Route::post('/validate', [PasswordController::class, 'validation'])->name('password.validate');
    Route::post('/reset', [PasswordController::class, 'update'])->name('password.update');
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function() {
    Route::get('/{id}', [UserController::class, 'show'])->name('user.show');
    Route::get('/{id}/streams', [UserController::class, 'streams'])->name('user.streams');
    Route::post('/', [UserController::class, 'update'])->name('user.update');
});

Route::group(['prefix' => 'statistics', 'auth:api'], function() {
    Route::get('/user/{user_id}', [StatisticsController::class, 'user'])->name('statistics.user');
    Route::get('/stream/{stream_id}', [StatisticsController::class, 'stream'])->name('statistics.stream');
});

// TODO add 'middleware' => 'auth:api' except stream page
Route::group(['prefix' => 'stream'], function() {
    Route::post('/', [StreamController::class, 'create'])->name('stream.create');
    Route::get('/{id}', [StreamController::class, 'show'])->name('stream.show');
    Route::post('/{id}', [StreamController::class, 'update'])->name('stream.update');
    Route::post('/{id}/end', [StreamController::class, 'end'])->name('stream.end');

    Route::get('/{id}/comments', [StreamCommentsController::class, 'stream.list']);
    Route::post('/{id}/comments', [StreamCommentsController::class, 'stream.create']);
});
