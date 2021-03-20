<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function user() {
        return "Statistic for user";
    }

    public function stream() {
        return "Statistic for stream";
    }
}
