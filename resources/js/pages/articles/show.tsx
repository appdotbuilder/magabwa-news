import { Head, Link } from '@inertiajs/react';
import { Calendar, Eye, User, ArrowLeft, ArrowRight } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
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

interface Props {
    article: Article;
    relatedArticles: Article[];
    [key: string]: unknown;
}

export default function ArticleShow({ article, relatedArticles }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`${article.title} - NewsHub`} />
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

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('articles.index')}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Articles
                        </Link>
                    </div>

                    {/* Article Header */}
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        {article.featured_image && (
                            <div className="aspect-video">
                                <img 
                                    src={article.featured_image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-8">
                            {/* Category Badge */}
                            <div className="mb-4">
                                <Link
                                    href={route('categories.show', article.category.slug)}
                                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: article.category.color }}
                                >
                                    {article.category.name}
                                </Link>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {article.title}
                            </h1>

                            {/* Summary */}
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {article.summary}
                            </p>

                            {/* Article Meta */}
                            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    <span>By {article.author.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    <span>{formatDate(article.published_at)}</span>
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-5 h-5 mr-2" />
                                    <span>{article.views_count.toLocaleString()} views</span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                {article.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-6 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                📖 More from {article.category.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((relatedArticle) => (
                                    <div key={relatedArticle.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        {relatedArticle.featured_image && (
                                            <img 
                                                src={relatedArticle.featured_image} 
                                                alt={relatedArticle.title}
                                                className="w-full h-32 object-cover"
                                            />
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {relatedArticle.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm">
                                                {relatedArticle.summary}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                <div className="flex items-center">
                                                    <User className="w-3 h-3 mr-1" />
                                                    {relatedArticle.author.name}
                                                </div>
                                                <div className="flex items-center">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    {relatedArticle.views_count}
                                                </div>
                                            </div>
                                            <Link
                                                href={route('articles.show', relatedArticle.slug)}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                                            >
                                                Read More
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}