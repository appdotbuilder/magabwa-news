import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FolderOpen, Plus, BookOpen } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    is_active: boolean;
    articles_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: {
        data: Category[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/admin/categories' },
];

export default function AdminCategoriesIndex({ categories }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="📁 Manage Categories - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📁 Manage Categories
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Create and organize content categories
                        </p>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Category
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.data.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                            {/* Category Header */}
                            <div 
                                className="h-20 flex items-center justify-center relative"
                                style={{ backgroundColor: category.color }}
                            >
                                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">
                                        {category.name.charAt(0)}
                                    </span>
                                </div>
                                {!category.is_active && (
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            Inactive
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Category Content */}
                            <div className="p-4">
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {category.articles_count} {category.articles_count === 1 ? 'article' : 'articles'}
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-2">
                                    {category.description}
                                </p>

                                <div className="text-xs text-gray-400 text-center mb-4">
                                    Created {formatDate(category.created_at)}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-center space-x-2">
                                    <Link
                                        href={route('admin.categories.show', category.id)}
                                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('admin.categories.edit', category.id)}
                                        className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('admin.categories.destroy', category.id)}
                                        method="delete"
                                        as="button"
                                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                        data={{ confirm: 'Are you sure you want to delete this category? This action cannot be undone.' }}
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {categories.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <FolderOpen className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No categories yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Get started by creating your first category
                        </p>
                        <Link
                            href={route('admin.categories.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Category
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {categories.meta.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <nav className="flex items-center space-x-2">
                            {categories.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                            ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm border border-gray-300 dark:border-gray-600'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}