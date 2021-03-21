<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'stream_id',
        'parent_sku',
        'sku',
        'name',
        'image',
        'url',
        'price',
        'currency',
    ];

    /**
     * Get product parameters
     */
    public function parameters()
    {
        return $this->hasMany(ProductParameter::class, 'stream_id');
    }
}
