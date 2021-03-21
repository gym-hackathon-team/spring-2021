<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SentMessage implements ShouldBroadcast
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
     *
     * @return string[]
     */
    public function broadcastOn()
    {
        return ['stream-'.$this->stream_id];
    }
}
