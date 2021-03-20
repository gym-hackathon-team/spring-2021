<?php

namespace Database\Factories;

use App\Models\Stream;
use Illuminate\Database\Eloquent\Factories\Factory;

class StreamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Stream::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->name;

        return [
            'user_id' => rand(1, 10),

            'name'    => 'Stream by '.$name,
            'company' => $name.'\'s ltd.',
            'url'     => $this->faker->url,
            'icon'    => $this->faker->numberBetween(),

            'live' => $this->faker->boolean
        ];
    }
}
