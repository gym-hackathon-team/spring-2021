<?php

namespace Database\Factories;

use App\Models\StreamProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

class StreamProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StreamProduct::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'stream_id' => rand(1, 20),

            'name' => $this->faker->text(20),
            'price' => $this->faker->randomFloat(6, 20.00, 9999.99),
            'sku' => rand(10, 99) . '-'. 'MB' . rand(10, 99),
        ];
    }
}
