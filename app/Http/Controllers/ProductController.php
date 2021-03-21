<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @param $id
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id)
    {
        $stream = Product::find($id);

        if ($stream) {
            return response($stream);
        } else {
            return response(['message' => __('stream.show.failed')], 404);
        }
    }
}
