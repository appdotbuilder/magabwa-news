<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->string('slug')->unique()->comment('URL-friendly version of the title');
            $table->text('summary')->comment('Article summary/excerpt');
            $table->longText('content')->comment('Full article content');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->string('status')->default('draft')->comment('Article status: draft, published, archived');
            $table->timestamp('published_at')->nullable()->comment('When the article was published');
            $table->unsignedBigInteger('category_id')->comment('Category foreign key');
            $table->unsignedBigInteger('author_id')->comment('Author (user) foreign key');
            $table->unsignedInteger('views_count')->default(0)->comment('Number of views');
            $table->json('meta_tags')->nullable()->comment('SEO meta tags');
            $table->timestamps();
            
            // Foreign key constraints
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
            
            // Indexes for performance
            $table->index('title');
            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index('category_id');
            $table->index('author_id');
            $table->index(['status', 'published_at']);
            $table->index(['category_id', 'status', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};