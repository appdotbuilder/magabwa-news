<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        $categories = Category::active()
            ->withCount(['articles as articles_count' => function ($query) {
                $query->where('status', 'published')->whereNotNull('published_at');
            }])
            ->orderBy('articles_count', 'desc')
            ->get();

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Display articles for a specific category.
     */
    public function show(Category $category, Request $request)
    {
        $query = $category->articles()
            ->with(['category', 'author'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc');

        // Search within category
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(12);

        return Inertia::render('categories/show', [
            'category' => $category,
            'articles' => $articles,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }
}