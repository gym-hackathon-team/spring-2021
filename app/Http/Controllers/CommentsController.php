<?php

namespace App\Http\Controllers;

use App\Events\SentMessage;
use App\Http\Requests\Stream\StreamCommentRequest;
use App\Models\Stream;
use App\Models\Comment;
use Illuminate\Http\Request;

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
     * @param  StreamCommentRequest  $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function create($id, StreamCommentRequest $request)
    {
        $data['stream_id'] = $id;
        $data['name']      = $request->input('name');
        $data['text']      = $request->input('text');

        $comment = Comment::create($data);

        if ($comment) {
            broadcast(new SentMessage($data['stream_id'], $data['name'], $data['text']))->toOthers();

            return response($comment);
        } else {
            return response(['message' => __('comments.create.failed')], 404);
        }
    }
}
