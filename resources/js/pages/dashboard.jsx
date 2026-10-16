import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Head title="Dashboard - URaket" />

            {/* Navigation Header */}
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900">
                            URaket
                        </Link>
                        <nav aria-label="Main" className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                            <Link href="/gigs" className="hover:text-gray-900">Browse Gigs</Link>
                            <Link href="/my-gigs" className="hover:text-gray-900">My Gigs</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Welcome, <strong className="font-semibold text-gray-900">{auth?.user?.name || 'User'}</strong>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            {/* Layout Content Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Your Campus Workspace
                        </h1>
                    </div>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 truncate">Available Gigs</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 truncate">Applications Sent</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 truncate">Gigs Completed</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
                    </div>
                </div>
            </main>
        </div>
    );
}