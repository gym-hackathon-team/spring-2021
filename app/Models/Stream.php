<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'company',
        'url',
        'icon',
    ];

    /**
     * Get stream products
     */
    public function products()
    {
        return $this->hasMany(StreamProduct::class, 'stream_id');
    }

    /**
     * Get stream comments
     */
    public function comments()
    {
        return $this->hasMany(StreamComment::class, 'stream_id');
    }
}
