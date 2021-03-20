<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class StatisticsController extends Controller
{
    public function user($id) {
        //$response = Http::get(env('STATISTICS_SERVICE') . '/user/' . $id);

        //return $response->json();

        return response([
            'streams_count' => rand(321, 1337),
            'total_sales' => rand(50, 312),
            'total_conversion' => 0.6,
        ]);
    }

    public function stream($id) {
        //$response = Http::get(env('STATISTICS_SERVICE') . '/stream/' . $id);

        //return $response->json();

        return response([
            'users_count' => rand(321, 1337),
            'duration' => rand(30, 120) . ' min',
            'conversion' => 0.6,
            'sales_count' => rand(50, 312),
        ]);
    }
}
