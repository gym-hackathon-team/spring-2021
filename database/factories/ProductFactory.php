<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $rand = rand(1, 10);
        if ($rand > 7) {
            $parent_sku = rand(10, 99).'-'.'MB';
        } else {
            $parent_sku = null;
        }

        return [
            'stream_id'  => rand(1, 20),
            'parent_sku' => $parent_sku,

            'sku'   => rand(10, 99).'-'.'MB'.rand(10, 99),
            'name'  => $this->faker->text(20),
            'image' => $this->faker->imageUrl(),
            'url'   => $this->faker->url,

            'price'    => $this->faker->randomFloat(6, 20.00, 9999.99),
            'currency' => $this->faker->currencyCode,
        ];
    }
}
