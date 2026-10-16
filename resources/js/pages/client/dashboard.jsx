import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function ClientDashboard({ currentUser, jobs = [], totalJobs = 0, totalApplications = 0 }) {
    const [activeTab, setActiveTab] = useState('all');
    const [localJobs, setLocalJobs] = useState(jobs);

    const openJobs = localJobs.filter(j => j.status === 'open').length;
    const pendingApplications = localJobs.reduce((sum, j) => sum + (parseInt(j.pendingCount) || 0), 0);

    const visibleJobs = localJobs.filter(job => {
        if (activeTab === 'all') return true;
        if (activeTab === 'open') return job.status === 'open';
        return job.status !== 'open';
    });

    const handleCloseJob = (e, jobId) => {
        e.preventDefault();
        if (confirm('Mark this job post as closed?')) {
            router.put(`/client/jobs/${jobId}`, { status: 'closed' }, {
                onSuccess: () => {
                    setLocalJobs(localJobs.map(j => j.id === jobId ? { ...j, status: 'closed' } : j));
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
            <Head title="Client Dashboard - URaket" />

            {/* Header Navigation Section */}
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 md:px-20 h-20 flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">URaket</Link>
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-semibold uppercase tracking-wider">Client</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav aria-label="Client navigation" className="flex items-center gap-6">
                            <Link href="/client/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Profile</Link>
                        </nav>
                        <button onClick={() => router.post('/logout')} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </div>
                </div>
            </header>

            {/* Main Application Content Body */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 flex flex-col gap-10">
                    
                    {/* Welcome Header Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
                            <p className="text-sm text-gray-500">Manage your posted jobs and review student applications.</p>
                        </div>
                        <Link href="/client/create-job" className="text-sm font-semibold px-5 py-3 bg-[#099639] text-white rounded-lg shadow-sm hover:bg-[#077a2e] transition">+ Post a New Job</Link>
                    </div>

                    {/* Core Matrix Summary Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white border p-5 rounded-xl shadow-sm"><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Total Posts</span><span className="text-3xl font-bold">{totalJobs}</span></div>
                        <div className="bg-white border p-5 rounded-xl shadow-sm"><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Active</span><span className="text-3xl font-bold text-[#099639]">{openJobs}</span></div>
                        <div className="bg-white border p-5 rounded-xl shadow-sm"><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Applications</span><span className="text-3xl font-bold">{totalApplications}</span></div>
                        <div className="bg-white border p-5 rounded-xl shadow-sm"><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Review Needed</span><span className="text-3xl font-bold text-amber-600">{pendingApplications}</span></div>
                    </div>

                    {/* Main Postings Table / Roster Section */}
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Your Postings</h2>
                            <div className="flex gap-1 bg-gray-200/60 p-1 rounded-lg">
                                {[{ id: 'all', label: 'All' }, { id: 'open', label: 'Active' }, { id: 'closed', label: 'Closed' }].map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-xs px-4 py-2 font-semibold rounded-md transition cursor-pointer ${activeTab === tab.id ? 'bg-white text-black shadow-sm' : 'text-gray-500'}`}>{tab.label}</button>
                                ))}
                            </div>
                        </div>

                        {visibleJobs.length === 0 ? (
                            <div className="bg-white border border-dashed border-gray-200 p-12 text-center rounded-xl"><p className="text-sm font-semibold text-gray-800">No postings found.</p></div>
                        ) : (
                            <div className="bg-white border border-gray-100 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                                {visibleJobs.map(job => (
                                    <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/40 transition">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-3">
                                                {/* FIXED: Links correctly route to the client job details matrix breakdown view */}
                                                <Link href={`/client/job-detail/${job.id}`} className="text-base font-semibold text-gray-900 hover:text-[#099639] hover:underline cursor-pointer transition">
                                                    {job.title}
                                                </Link>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${job.status === 'open' ? 'bg-green-50 border-green-100 text-[#099639]' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>{job.status}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 font-medium"><span>{job.category}</span> · <span className="text-gray-700">₱{Number(job.budget).toLocaleString()}</span> · <span>Posted {job.postedAt}</span></div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            {/* FIXED: The applications link points to client/job-detail to immediately display student list layout */}
                                            <Link href={`/client/job-detail/${job.id}`} className="text-xs font-semibold px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center">
                                                <span>Applications ({job.applicationsCount || 0})</span>
                                                {parseInt(job.pendingCount) > 0 && (
                                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold ml-1.5">
                                                        {job.pendingCount}
                                                    </span>
                                                )}
                                            </Link>
                                            {job.status === 'open' && <button onClick={(e) => handleCloseJob(e, job.id)} className="text-xs font-semibold px-4 py-2.5 border border-red-100 text-red-600 bg-red-50/30 hover:bg-red-50 rounded-lg cursor-pointer transition">Close Job</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
