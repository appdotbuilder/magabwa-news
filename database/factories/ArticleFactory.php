<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Article>
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8));
        $title = rtrim($title, '.');
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'summary' => fake()->paragraph(3),
            'content' => fake()->paragraphs(random_int(5, 12), true),
            'featured_image' => fake()->imageUrl(800, 600, 'news'),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'published_at' => fake()->boolean(70) ? fake()->dateTimeBetween('-1 year', 'now') : null,
            'category_id' => Category::factory(),
            'author_id' => User::factory(),
            'views_count' => fake()->numberBetween(0, 10000),
            'meta_tags' => [
                'keywords' => fake()->words(5),
                'description' => fake()->sentence(15),
            ],
        ];
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ]);
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}