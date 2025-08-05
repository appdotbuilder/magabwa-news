<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles for admin.
     */
    public function index()
    {
        $articles = Article::with(['category', 'author'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/articles/index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new article.
     */
    public function create()
    {
        $categories = Category::active()
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/articles/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created article.
     */
    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['author_id'] = auth()->id();

        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $article = Article::create($data);

        return redirect()->route('admin.articles.show', $article)
            ->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        $article->load(['category', 'author']);

        return Inertia::render('admin/articles/show', [
            'article' => $article,
        ]);
    }

    /**
     * Show the form for editing the specified article.
     */
    public function edit(Article $article)
    {
        $categories = Category::active()
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/articles/edit', [
            'article' => $article,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified article.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);

        if ($data['status'] === 'published' && !$article->published_at) {
            $data['published_at'] = now();
        } elseif ($data['status'] !== 'published') {
            $data['published_at'] = null;
        }

        $article->update($data);

        return redirect()->route('admin.articles.show', $article)
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified article.
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}