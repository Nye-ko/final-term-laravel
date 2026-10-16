import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ currentUser, applications = [], recommendedJobs = [] }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    // Calculate dynamic dashboard stats metric counts from props payload arrays
    const totalApplications = applications.length;
    const activePitches = applications.filter(a => a.status === 'pending').length;
    const acceptedGigs = applications.filter(a => a.status === 'accepted').length;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-[#099639]/10">
            <Head title="Freelancer Dashboard - URaket" />

            {/* ============================= Navigation Header Bar ============================= */}
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition">
                            URaket
                        </Link>
                        <span className="text-[10px] tracking-wider uppercase font-black px-2 py-0.5 bg-[#099639]/10 text-[#099639] rounded border border-[#099639]/20">
                            Freelancer
                        </span>
                    </div>

                    {/* Adjusted: Swapped Job board link with specialized My Applications navigation router anchor shortcut element */}
                    <nav aria-label="Dashboard Navigation" className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/freelancer/applications" className="hover:text-gray-900 transition">My Applications</Link>
                        <Link href="/freelancer/profile" className="hover:text-gray-900 transition">Profile</Link>
                        <button onClick={handleLogout} className="hover:text-gray-900 transition cursor-pointer font-medium">
                            Log out
                        </button>
                    </nav>
                </div>
            </header>

            {/* ============================= Main Framework Layout Content Body ============================= */}
            <main className="max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-10">
                
                {/* Dashboard Identity Title Heading */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Freelancer Dashboard</h1>
                    <p className="text-sm text-gray-500">Manage your submitted job pitches and discover open campus gig listings.</p>
                </div>

                {/* ============================= Dashboard Metric Info Card Grids ============================= */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Applications</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none">{totalApplications}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Applications</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none">{activePitches}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hired Positions</h3>
                        <p className="text-2xl font-bold text-[#099639] leading-none">{acceptedGigs}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Marketplace Openings</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none">{recommendedJobs.length}</p>
                    </div>
                </section>

                {/* ============================= Cleaned Listing Board Feed ============================= */}
                <div className="flex flex-col gap-4">
                    <div className="border-b border-gray-100 pb-3">
                        <h2 className="text-base font-bold text-gray-900 tracking-tight">Available Campus Gigs</h2>
                    </div>

                    {/* Listing Rows Grid */}
                    <div className="flex flex-col gap-3">
                        {recommendedJobs.length === 0 ? (
                            <div className="bg-white border border-gray-200/80 rounded-xl py-12 text-center text-gray-400 text-sm border-dashed">
                                No campus gig posts are currently available.
                            </div>
                        ) : (
                            recommendedJobs.map((job) => (
                                <div 
                                    key={job.id} 
                                    className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 transition"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <Link 
                                                href={`/freelancer/job/${job.id}`} 
                                                className="text-base font-bold text-gray-900 hover:text-[#099639] hover:underline tracking-tight transition"
                                            >
                                                {job.title}
                                            </Link>
                                            <span className="bg-green-50 text-[#099639] border-green-200/60 text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border">
                                                {job.status || 'open'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                            <span>₱{job.budget ? Number(job.budget).toLocaleString() : '0'}</span>
                                            <span>&bull;</span>
                                            <span>Posted by: {job.clientName || 'Faculty'}</span>
                                        </div>
                                    </div>

                                    {/* Action Button Navigation Link Element */}
                                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                                        <Link 
    href={`/freelancer/job/${job?.id}`} 
    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-xs font-bold text-gray-700 text-center flex-1 sm:flex-initial"
>
    View Details
</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
