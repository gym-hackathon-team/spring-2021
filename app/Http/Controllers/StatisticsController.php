<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class StatisticsController extends Controller
{
    public function user($id) {
        $response = Http::get('https://neural.nix112.tk/user/' . $id);

        return $response->json();
    }

    public function stream() {
        return "Statistic for stream";
    }
}
