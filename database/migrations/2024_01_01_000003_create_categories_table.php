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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name');
            $table->string('slug')->unique()->comment('URL-friendly version of the name');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('color', 7)->default('#3b82f6')->comment('Category color for UI display');
            $table->boolean('is_active')->default(true)->comment('Whether the category is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('slug');
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};