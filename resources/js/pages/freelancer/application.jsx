import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function FreelancerApplications({ applications = [], counts = {} }) {
    const statusLabels = {
        pending: 'Pending',
        accepted: 'Accepted',
        completed: 'Completed',
        rejected: 'Rejected'
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Your Applications - URaket" />

            {/* Navigation Header */}
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">URaket</Link>
                    <div className="flex items-center gap-6">
                        <nav aria-label="Freelancer navigation" className="flex items-center gap-6">
                            <Link href="/freelancer/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
                            <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Job board</Link>
                            <Link href="/freelancer/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Profile</Link>
                        </nav>
                        <button onClick={() => router.post('/logout')} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </div>
                </div>
            </header>

            {/* Workspace View */}
            <main className="flex-1">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-gray-900">Your applications</h1>
                        <p className="text-sm text-gray-500">Track where each application stands.</p>
                    </div>

                    {/* Stats metric tracker grid counters */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['pending', 'accepted', 'completed', 'rejected'].map((status) => (
                            <div key={status} className="border border-gray-200 p-5 flex flex-col gap-1 rounded-xl shadow-sm">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{statusLabels[status]}</span>
                                <span className={`text-2xl font-bold ${status === 'accepted' ? 'text-[#099639]' : status === 'rejected' ? 'text-red-500' : 'text-gray-900'}`}>{counts[status] || 0}</span>
                            </div>
                        ))}
                    </div>

                    {applications.length === 0 ? (
                        <div className="border border-dashed border-gray-200 p-12 flex flex-col items-center gap-3 text-center rounded-xl bg-gray-50/50">
                            <p className="text-sm font-semibold text-gray-800">You haven't applied to any jobs yet.</p>
                            <Link href="/jobs" className="text-sm font-semibold px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 shadow-sm">Browse the job board</Link>
                        </div>
                    ) : (
                        <section aria-labelledby="applications-list-heading" className="flex flex-col gap-4">
                            <h2 id="applications-list-heading" className="text-lg font-semibold text-gray-900">Applications</h2>
                            <div className="bg-white border border-gray-100 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                                {applications.map((app) => (
                                    <div key={app.id} className="p-6 hover:bg-gray-50/30 transition">
                                        <Link href={`/freelancer/jobs/${app.jobId}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-sm font-bold text-gray-900 hover:text-[#099639] hover:underline">{app.jobTitle}</span>
                                                <span className="text-xs text-gray-400 font-medium">{app.clientName} · <span className="italic">Applied {app.appliedAt}</span></span>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border self-start sm:self-auto ${
                                                app.status === 'accepted' ? 'bg-green-50 border-green-100 text-[#099639]' : app.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' : app.status === 'rejected' ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-500'
                                            }`}>{statusLabels[app.status] || app.status}</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
