<?php

namespace Database\Seeders;

use App\Models\Stream;
use App\Models\Comment;
use App\Models\Product;
use App\Models\ProductParameter;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();
        Stream::factory(20)->create();
        Product::factory(50)->create();
        ProductParameter::factory(50)->create();
        Comment::factory(150)->create();
    }
}
