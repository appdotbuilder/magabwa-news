import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, FolderOpen, Plus, Eye, Edit } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="📰 NewsHub Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        📰 Welcome to NewsHub Admin
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Manage your news articles, categories, and content from here
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Create Article */}
                    <Link
                        href={route('admin.articles.create')}
                        className="group relative aspect-video overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                                <Plus className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Create Article
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Write and publish new news articles
                            </p>
                        </div>
                    </Link>

                    {/* Manage Articles */}
                    <Link
                        href={route('admin.articles.index')}
                        className="group relative aspect-video overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Manage Articles
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Edit, publish, and organize articles
                            </p>
                        </div>
                    </Link>

                    {/* Manage Categories */}
                    <Link
                        href={route('admin.categories.index')}
                        className="group relative aspect-video overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                                <FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Manage Categories
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Create and organize content categories
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[60vh] flex-1 overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                🚀 Content Management Hub
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                                Your all-in-one dashboard for managing NewsHub content. Create engaging articles, 
                                organize them into categories, and keep your readers informed with the latest stories.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <Edit className="w-5 h-5 mr-2 text-blue-600" />
                                    Article Management
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        Create and edit articles with rich content
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        Manage publication status (draft/published)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        Add featured images and metadata
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        Track article views and engagement
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <FolderOpen className="w-5 h-5 mr-2 text-purple-600" />
                                    Category Organization
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        Create custom categories with colors
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        Organize articles by topic
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        Enable/disable categories
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        SEO-friendly category URLs
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Eye className="w-5 h-5 mr-2 text-gray-600" />
                                Quick Links
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link
                                    href={route('home')}
                                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">View</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Homepage</div>
                                </Link>
                                <Link
                                    href={route('articles.index')}
                                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">Browse</div>
                                    <div className="font-medium text-gray-900 dark:text-white">All Articles</div>
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">Explore</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Categories</div>
                                </Link>
                                <Link
                                    href={route('admin.categories.create')}
                                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <div className="text-gray-600 dark:text-gray-300 text-sm">Add</div>
                                    <div className="font-medium text-gray-900 dark:text-white">New Category</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}