<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(Request $request)
    {
        $query = Article::with(['category', 'author'])
            ->published()
            ->orderBy('published_at', 'desc');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(12);
        
        // Get all active categories for filter
        $categories = Category::active()
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->orderBy('name')
            ->get();

        return Inertia::render('articles/index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'category' => $request->category,
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        // Increment view count
        $article->increment('views_count');

        // Load relationships
        $article->load(['category', 'author']);

        // Get related articles from the same category
        $relatedArticles = Article::with(['category', 'author'])
            ->published()
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'desc')
            ->take(4)
            ->get();

        return Inertia::render('articles/show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}