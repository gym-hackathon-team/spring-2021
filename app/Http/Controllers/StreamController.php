<?php

namespace App\Http\Controllers;

use App\Http\Requests\Stream\StreamCreateRequest;
use App\Models\Stream;
use App\Models\StreamProduct;
use App\Models\StreamProductParametr;
use Illuminate\Support\Facades\Auth;

class StreamController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StreamCreateRequest $request)
    {
        //TODO Uncomment this
        //$user = Auth::user();
        //$data['user_id'] = $user->id;

        $data['user_id'] = 1;
        $data['name']    = $request->input('name');
        $data['icon']    = $request->input('icon');
        $stream_data     = $this->XMLtoJSON($request->file('products')->path());

        $stream = Stream::create($data);

        if ($stream) {
            foreach ($stream_data['shop']['offers']['offer'] as $offer) {
                $product_data = $this->parseProduct($stream->id, $offer);
                $product      = StreamProduct::create($product_data)->toArray();
                if (isset($product_data['params'])) {
                    foreach ($product_data['params'] as $key => $value) {
                        $product['params'][$key] = StreamProductParametr::create(array(
                            'product_id' => $product['id'],
                            'key'        => $key,
                            'value'      => $value,
                        ));
                    }
                }
                $stream['products'][]   = $product;
                //$stream['products'][]   = $product_data;
            }

            //return response([$stream_data]);
            return response($stream, 201);
        } else {
            return response(['message' => __('auth.register.failed')], 400);
        }
    }

    private function XMLtoJSON($pathToXML)
    {
        $xmlString = file_get_contents($pathToXML);
        $xmlObject = simplexml_load_string($xmlString);
        $json      = json_encode($xmlObject);

        return json_decode($json, true);
    }

    private function parseProduct($stream_id, $offer)
    {
        $product = [];

        $product['stream_id'] = $stream_id;
        if (isset($offer['@attributes']['parent'])) {
            $product['parent_sku'] = $offer['@attributes']['parent'];
        }

        $product['sku']   = $offer['@attributes']['id'];
        $product['name']  = $offer['name'];
        $product['image'] = $offer['image'];
        $product['url']   = $offer['url'];

        $product['price']    = isset($offer['price']) ? $offer['price'] : null;
        $product['currency'] = isset($offer['currencyId']) ? $offer['currencyId'] : null;

        if (isset($offer['param'])) {
            $product['params'] = array(
                'color' => $offer['param'][0],
                'size'  => $offer['param'][1]
            );
        }

        return $product;
    }
}
