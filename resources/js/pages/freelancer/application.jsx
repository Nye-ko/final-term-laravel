import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Application({ applications = [] }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const totalApplications = applications?.length || 0;
    const activePitches = applications ? applications.filter(a => a?.status === 'pending').length : 0;
    const acceptedGigs = applications ? applications.filter(a => a?.status === 'accepted').length : 0;
    const rejectedPitches = applications ? applications.filter(a => a?.status === 'rejected').length : 0;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-[#099639]/10">
            <Head title="My Applications - URaket" />

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

                    <nav aria-label="Dashboard Navigation" className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/dashboard" className="hover:text-gray-900 transition">Dashboard</Link>
                        <Link href="/freelancer/applications" className="text-[#099639] font-bold transition">My Applications</Link>
                        <Link href="/freelancer/profile" className="hover:text-gray-900 transition">Profile</Link>
                        <button onClick={handleLogout} className="hover:text-gray-900 transition cursor-pointer font-medium">
                            Log out
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Applications</h1>
                    <p className="text-sm text-gray-500">Track your submitted job pitches and monitor evaluation updates from faculty clients.</p>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-[96px] flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Pitches</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none">{totalApplications}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-[96px] flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Applications</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none">{activePitches}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-[96px] flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hired Positions</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none text-[#099639]">{acceptedGigs}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-[96px] flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Declined Pitches</h3>
                        <p className="text-2xl font-bold text-gray-900 leading-none text-red-600">{rejectedPitches}</p>
                    </div>
                </section>

                <div className="flex flex-col gap-4">
                    <div className="border-b border-gray-100 pb-3">
                        <h2 className="text-base font-bold text-gray-900 tracking-tight">Your Submitted Pitches</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {totalApplications === 0 ? (
                            <div className="bg-white border border-gray-200/80 rounded-xl py-12 text-center text-gray-400 text-sm border-dashed">
                                You haven't submitted any job pitches to faculty clients yet.
                            </div>
                        ) : (
                            applications.map((app) => (
                                <div key={app?.id} className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm flex flex-col gap-4 hover:border-gray-300 transition">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/freelancer/job/${app?.job?.id}`} className="text-base font-bold text-gray-900 hover:text-[#099639] hover:underline tracking-tight transition">
                                                    {app?.job?.title || 'Deleted Gig Posting'}
                                                </Link>
                                                <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                                                    app?.status === 'accepted' ? 'bg-green-50 text-[#099639] border-green-200/60' :
                                                    app?.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-amber-50 text-amber-600 border-amber-200'
                                                }`}>
                                                    {app?.status || 'pending'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                                <span>₱{app?.job?.budget ? Number(app.job.budget).toLocaleString() : '0'}</span>
                                                <span>&bull;</span>
                                                <span>Posted by: {app?.job?.client_name || 'Faculty Member'}</span>
                                                <span>&bull;</span>
                                                <span>Applied on: {app?.applied_at || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                                            <Link 
    href={`/freelancer/job/${app?.job_id || app?.job?.id}`} 
    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-xs font-bold text-gray-700 text-center flex-1 sm:flex-initial"
>
    View Details
</Link>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-3.5 text-sm text-gray-600 italic">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider not-italic mb-1">Your Proposal Pitch:</span>
                                        "{app?.pitch || app?.message || 'No description proposal details written.'}"
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
