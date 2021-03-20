<?php

namespace App\Http\Controllers;

use App\Http\Requests\Stream\StreamCommentRequest;
use App\Http\Requests\Stream\StreamCreateRequest;
use App\Http\Requests\Stream\StreamUpdateRequest;
use App\Models\Stream;
use App\Models\StreamComment;
use App\Models\StreamProduct;
use App\Models\StreamProductParametr;
use Illuminate\Support\Facades\Auth;

class StreamController extends Controller
{
    /**
     * @param $id
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show($id)
    {
        $stream = Stream::find($id);

        if ($stream) {
            return response($stream);
        } else {
            return response(['message' => __('stream.show.failed')], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StreamCreateRequest $request)
    {
        $stream_data = $this->XMLtoJSON($request->file('products')->path());

        //TODO Uncomment this
        //$user = Auth::user();
        //$data['user_id'] = $user->id;
        $data['user_id'] = 1; // TODO Delete this

        $data['name']    = $stream_data['shop']['name'];
        $data['company'] = $stream_data['shop']['company'];
        $data['url']     = $stream_data['shop']['url'];
        $data['icon']    = $request->input('icon');

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
                $stream['products'][] = $product;
            }

            return response($stream, 201);
        } else {
            return response(['message' => __('stream.create.failed')], 400);
        }
    }

    /**
     * @param $id
     * @param  StreamCreateRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update($id, StreamUpdateRequest $request)
    {
        $stream = Stream::find($id);

        if ( ! $stream) {
            return response(['message' => __('stream.update.not_found')], 404);
        }

        $data = $request->all();
        $result = $stream->fill($data)->save();

        if ($result) {
            return response($stream);
        } else {
            return response(['message' => __('user.update.failed')], 400);
        }
    }

    /**
     * @param $pathToXML
     *
     * @return mixed
     */
    private function XMLtoJSON($pathToXML)
    {
        $xmlString = file_get_contents($pathToXML);
        $xmlObject = simplexml_load_string($xmlString);
        $json      = json_encode($xmlObject);

        return json_decode($json, true);
    }

    /**
     * @param $stream_id
     * @param $offer
     *
     * @return array
     */
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
