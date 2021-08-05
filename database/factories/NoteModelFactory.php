<?php

namespace Database\Factories;

use App\Models\NoteModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoteModelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = NoteModel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'status' => rand(1,2),
            'date' =>  $this->faker->date($format = 'Y-m-d', $max = 'now') 
        ];
    }
}
