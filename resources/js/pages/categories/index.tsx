import { Head, Link } from '@inertiajs/react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    articles_count: number;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    return (
        <>
            <Head title="📚 Categories - NewsHub" />
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
                                    href={route('articles.index')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Articles
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            📚 Browse Categories
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Discover articles organized by topic and interest
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {/* Category Header */}
                                <div 
                                    className="h-24 flex items-center justify-center relative"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-2xl font-bold text-white">
                                                {category.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Content */}
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            {category.name}
                                        </h2>
                                        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-3">
                                            <BookOpen className="w-4 h-4 mr-1" />
                                            <span className="text-sm">
                                                {category.articles_count} {category.articles_count === 1 ? 'article' : 'articles'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                                        {category.description}
                                    </p>

                                    <div className="text-center">
                                        <Link
                                            href={route('categories.show', category.slug)}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors hover:opacity-90"
                                            style={{ backgroundColor: category.color }}
                                        >
                                            Explore Articles
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {categories.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <BookOpen className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No categories available
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Categories will appear here once they are created
                            </p>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">
                                🚀 Can't find what you're looking for?
                            </h2>
                            <p className="text-blue-100 mb-6">
                                Browse all our articles or use our search feature to find specific topics
                            </p>
                            <Link
                                href={route('articles.index')}
                                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                View All Articles
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}