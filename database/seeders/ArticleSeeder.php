<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all categories and users
        $categories = Category::all();
        $users = User::all();

        // If no users exist, create some
        if ($users->isEmpty()) {
            $users = User::factory(3)->create();
        }

        // Create articles for each category
        $categories->each(function ($category) use ($users) {
            // Create 5-8 articles per category
            Article::factory(random_int(5, 8))
                ->published()
                ->create([
                    'category_id' => $category->id,
                    'author_id' => $users->random()->id,
                ]);
        });

        // Create some draft articles
        Article::factory(10)
            ->draft()
            ->create([
                'category_id' => $categories->random()->id,
                'author_id' => $users->random()->id,
            ]);
    }
}