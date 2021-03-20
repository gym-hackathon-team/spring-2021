<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class StatisticsController extends Controller
{
    public function user($id) {
        $response = Http::get(env('STATISTICS_SERVICE') . '/user/' . $id);

        return $response->json();
    }

    public function stream($id) {
        $response = Http::get(env('STATISTICS_SERVICE') . '/stream/' . $id);

        return $response->json();
    }
}
