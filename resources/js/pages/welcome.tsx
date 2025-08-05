import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, Eye, User, ArrowRight, Search, BookOpen } from 'lucide-react';

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
    description: string;
    color: string;
    articles_count: number;
    latest_articles?: Article[];
}

interface Props {
    featuredArticles: Article[];
    categories: Category[];
    categoriesWithArticles: Category[];
    [key: string]: unknown;
}

export default function Welcome({ featuredArticles, categories }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="📰 NewsHub - Latest News & Stories">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    📰 NewsHub
                                </h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href={route('articles.index')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Articles
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Categories
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                📰 Stay Informed with NewsHub
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100">
                                Your trusted source for breaking news, in-depth analysis, and stories that matter
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('articles.index')}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Read Latest Articles
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Articles */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🔥 Latest Headlines
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Stay up to date with our most recent news articles
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredArticles.map((article) => (
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
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div className="bg-white dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                📚 Browse by Category
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Find stories that interest you most
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('categories.show', category.slug)}
                                    className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <div className="text-center">
                                        <div 
                                            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                                            style={{ backgroundColor: category.color }}
                                        >
                                            {category.name.charAt(0)}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {category.articles_count} articles
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">📰 NewsHub</h3>
                            <p className="text-gray-400 mb-8">
                                Your trusted source for breaking news and stories that matter
                            </p>
                            <div className="flex justify-center space-x-6">
                                <Link
                                    href={route('articles.index')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Articles
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Categories
                                </Link>
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <p className="text-gray-400 text-sm">
                                    Built with ❤️ by{" "}
                                    <a 
                                        href="https://app.build" 
                                        target="_blank" 
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        app.build
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}