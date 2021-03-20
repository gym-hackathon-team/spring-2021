<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStreamProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stream_products', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('stream_id');
            $table->string('parent_sku')->nullable();

            $table->string('sku');
            $table->string('name');
            $table->string('image');
            $table->string('url');

            $table->float('price')->nullable();
            $table->string('currency')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stream_products');
    }
}
