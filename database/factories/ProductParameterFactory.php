<?php

namespace Database\Factories;

use App\Models\ProductParameter;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductParameterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductParameter::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        if ((rand(1, 10) > 5)) {
            $key   = 'color';
            $value = $this->faker->colorName;
        } else {
            $key   = 'size';
            $value = rand(28, 53);
        }

        return [
            'product_id' => rand(1, 50),
            'key'        => $key,
            'value'      => $value,
        ];
    }
}
