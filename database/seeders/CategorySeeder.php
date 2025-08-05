<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Latest news and updates from the tech world',
                'color' => '#3b82f6',
                'is_active' => true,
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'description' => 'Business news, market updates, and economic trends',
                'color' => '#10b981',
                'is_active' => true,
            ],
            [
                'name' => 'Sports',
                'slug' => 'sports',
                'description' => 'Sports news, scores, and athlete updates',
                'color' => '#f59e0b',
                'is_active' => true,
            ],
            [
                'name' => 'Entertainment',
                'slug' => 'entertainment',
                'description' => 'Movies, music, celebrities, and entertainment news',
                'color' => '#ef4444',
                'is_active' => true,
            ],
            [
                'name' => 'Health',
                'slug' => 'health',
                'description' => 'Health tips, medical breakthroughs, and wellness news',
                'color' => '#8b5cf6',
                'is_active' => true,
            ],
            [
                'name' => 'Politics',
                'slug' => 'politics',
                'description' => 'Political news, government updates, and policy changes',
                'color' => '#6366f1',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create additional random categories
        Category::factory(4)->active()->create();
    }
}