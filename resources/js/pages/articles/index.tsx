import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Eye, User, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    summary: string;
    featured_image: string | null;
    published_at: string;
    views_count: number;
    category: {
        id: number;
        name: string;
        slug: string;
        color: string;
    };
    author: {
        id: number;
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    articles_count: number;
}

interface Props {
    articles: {
        data: Article[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function ArticlesIndex({ articles, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('articles.index'), { 
            search, 
            category: selectedCategory || undefined 
        }, { 
            preserveState: true 
        });
    };

    const handleCategoryFilter = (categorySlug: string) => {
        setSelectedCategory(categorySlug);
        router.get(route('articles.index'), { 
            search: search || undefined, 
            category: categorySlug || undefined 
        }, { 
            preserveState: true 
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        router.get(route('articles.index'));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="📰 All Articles - NewsHub" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href={route('home')} className="text-2xl font-bold text-gray-900 dark:text-white">
                                📰 NewsHub
                            </Link>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href={route('home')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Categories
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            📰 All Articles
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Browse our complete collection of news articles
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search articles..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Search
                                </button>
                                {(search || selectedCategory) && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Category Filter */}
                        <div className="mt-4">
                            <div className="flex items-center mb-3">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Category:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleCategoryFilter('')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        !selectedCategory 
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryFilter(category.slug)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedCategory === category.slug
                                                ? 'text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                        style={selectedCategory === category.slug ? { backgroundColor: category.color } : {}}
                                    >
                                        {category.name} ({category.articles_count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {articles.data.map((article) => (
                            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {article.featured_image && (
                                    <img 
                                        src={article.featured_image} 
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <span 
                                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-white"
                                            style={{ backgroundColor: article.category.color }}
                                        >
                                            {article.category.name}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                        {article.summary}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            {article.author.name}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDate(article.published_at)}
                                        </div>
                                        <div className="flex items-center">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {article.views_count}
                                        </div>
                                    </div>
                                    <Link
                                        href={route('articles.show', article.slug)}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {articles.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No articles found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Try adjusting your search terms or filters
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {articles.meta.last_page > 1 && (
                        <div className="flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {articles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}