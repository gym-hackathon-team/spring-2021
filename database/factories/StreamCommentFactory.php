<?php

namespace Database\Factories;

use App\Models\StreamComment;
use Illuminate\Database\Eloquent\Factories\Factory;

class StreamCommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StreamComment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'stream_id' => rand(1, 20),

            'name' => $this->faker->name,
            'text' => $this->faker->text(50),
        ];
    }
}
