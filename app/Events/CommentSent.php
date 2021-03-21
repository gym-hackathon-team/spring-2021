<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CommentSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $stream_id;

    public $name;

    public $text;

    /**
     * Create a new event instance.
     *
     * @param $stream_id
     * @param $name
     * @param $text
     */
    public function __construct($stream_id, $name, $text)
    {
        $this->stream_id = $stream_id;
        $this->name      = $name;
        $this->text      = $text;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn()
    {
        return ['stream-'.$this->stream_id];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs()
    {
        return 'comment.sent';
    }
}
