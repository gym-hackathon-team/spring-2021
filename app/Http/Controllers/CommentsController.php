<?php

namespace App\Http\Controllers;

use App\Events\CommentSent;
use App\Http\Requests\Comment\CommentRequest;
use App\Models\Stream;
use App\Models\Comment;

class CommentsController extends Controller
{
    /**
     * @param $id
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function list($id)
    {
        $stream = Stream::find($id);

        if ( ! $stream) {
            return response(['message' => __('comments.list.stream_not_found')], 404);
        }

        $comments = $stream->comments;

        if ($comments) {
            return response($comments);
        } else {
            return response(['message' => __('comments.list.comments_not_found')], 404);
        }
    }

    /**
     * @param $id
     * @param  CommentRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function create($id, CommentRequest $request)
    {
        $data['stream_id'] = $id;
        $data['name']      = $request->input('name');
        $data['text']      = $request->input('text');

        $comment = Comment::create($data);

        if ($comment) {
            event(new CommentSent($data['stream_id'], $data['name'], $data['text']));

            return response($comment);
        } else {
            return response(['message' => __('comments.create.failed')], 404);
        }
    }
}
