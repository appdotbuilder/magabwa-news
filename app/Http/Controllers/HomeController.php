<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage with latest news articles.
     */
    public function index()
    {
        // Get featured articles (latest published articles)
        $featuredArticles = Article::with(['category', 'author'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->take(6)
            ->get();

        // Get active categories with article counts
        $categories = Category::active()
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->orderBy('articles_count', 'desc')
            ->take(8)
            ->get();

        // Get latest articles by category (top 3 categories)
        $categoriesWithArticles = Category::active()
            ->withCount(['articles as articles_count' => function ($query) {
                $query->where('status', 'published')->whereNotNull('published_at');
            }])
            ->orderBy('articles_count', 'desc')
            ->take(3)
            ->get()
            ->map(function ($category) {
                $latestArticles = $category->articles()
                    ->with('author')
                    ->where('status', 'published')
                    ->whereNotNull('published_at')
                    ->orderBy('published_at', 'desc')
                    ->take(4)
                    ->get();
                
                $categoryArray = $category->toArray();
                $categoryArray['latest_articles'] = $latestArticles->toArray();
                
                return $categoryArray;
            });

        return Inertia::render('welcome', [
            'featuredArticles' => $featuredArticles,
            'categories' => $categories,
        ]);
    }
}