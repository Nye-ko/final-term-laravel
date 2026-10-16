import React from 'react';
import { useForm, Head, Link, router } from '@inertiajs/react';

export default function JobDetail({ job, applications = [] }) {
    // Form management engine hook handling row state triggers
    const clientActionForm = useForm();

    const handleClientDecision = (applicationId, decisionStatus) => {
        const confirmationMessage = decisionStatus === 'accepted' 
            ? 'Are you sure you want to approve this student application and hire them?' 
            : 'Are you sure you want to decline this student application pitch?';

        if (confirm(confirmationMessage)) {
            // Sends a standard RESTful PUT request to ApplicationController@update
            router.put(`/client/applications/${applicationId}`, { 
                status: decisionStatus 
            }, {
                preserveScroll: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-[#099639]/10">
            <Head title={`Manage Job - ${job?.title || 'Loading...'}`} />
            
            {/*Main Navigation Header Bar*/}
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition">
                            URaket
                        </Link>
                        <span className="text-[10px] tracking-wider uppercase font-black px-2 py-0.5 bg-green-100 text-green-800 rounded border border-green-200/30">
                            Client Portal
                        </span>
                    </div>

                    <nav aria-label="Dashboard Navigation" className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/client/dashboard" className="text-[#099639] font-bold transition">My job posts</Link>
                        <Link href="/client/profile" className="hover:text-gray-900 transition">Profile</Link>
                    </nav>
                </div>
            </header>

            {/*Main Workspace Framework Layout*/}
            <main className="max-w-5xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
                
                {/* Back to Dashboard Link Shortcut */}
                <div>
                    <Link href="/client/dashboard" className="text-sm font-bold text-gray-400 hover:text-black transition">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                {/* Job Core Details Workspace Card */}
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Job Post Details</span>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">{job?.title}</h1>
                        </div>
                        
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md border ${
                                job?.status === 'open' ? 'bg-green-50 text-[#099639] border-green-200/60' :
                                job?.status === 'completed' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-500'
                            }`}>
                                {job?.status || 'open'}
                            </span>

                            {job?.status === 'open' && applications.some(app => app.status === 'accepted') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to mark this campus gig as Completed?')) {
                                            router.put(`/client/jobs/${job.id}`, { status: 'completed' }, {
                                                preserveScroll: true
                                            });
                                        }
                                    }}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md shadow-sm transition cursor-pointer"
                                >
                                    ✓ Complete Job
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <hr className="border-gray-100" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Estimated Budget</span>
                            <p className="font-extrabold text-lg text-gray-900 mt-0.5">₱{job?.budget ? Number(job.budget).toLocaleString() : '0'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Classification Assignment</span>
                            <p className="font-semibold text-gray-700 mt-0.5">{job?.job_type || 'General Service'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Published on Board</span>
                            <p className="font-semibold text-gray-700 mt-0.5">{job?.created_at}</p>
                        </div>
                    </div>

                    <div className="mt-2">
                        <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider mb-1">Project Description Summary</span>
                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 border border-gray-100 p-4 rounded-lg whitespace-pre-wrap">
                            {job?.description}
                        </p>
                    </div>
                </section>

                {/*Applicant Management Roster Grid*/}
                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                        Incoming Student Applicant Pitches ({applications.length})
                    </h2>
                    
                    {applications.length === 0 ? (
                        <div className="bg-white border border-dashed border-gray-200 py-12 text-center rounded-xl text-sm text-gray-400">
                            No student freelancers have submitted application pitches for this gig yet.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {applications.map((app) => (
                                <div key={app.id} className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm flex flex-col gap-4 hover:border-gray-300 transition">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-gray-900 text-base tracking-tight">{app.freelancer.full_name}</h4>
                                            <span className="text-xs text-gray-400 font-medium">{app.freelancer.email} &bull; Applied: {app.applied_at}</span>
                                        </div>

                                        {/* Status Evaluation Badge Badge View */}
                                        <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded border tracking-wide self-start sm:self-auto ${
                                            app.status === 'accepted' ? 'bg-green-50 text-[#099639] border-green-200/60' :
                                            app.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                            'bg-amber-50 text-amber-600 border-amber-200'
                                        }`}>
                                            {app.status || 'pending'}
                                        </span>
                                    </div>

                                    {/* Detailed Text Pitch Content Column Wrap */}
                                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg text-sm text-gray-600 leading-relaxed italic">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider not-italic mb-1">Student Pitch Proposal:</span>
                                        "{app.pitch}"
                                    </div>

                                    {/* Action Buttons: Displayed only if the application state loop is pending */}
                                    {app.status === 'pending' && job?.status === 'open' && (
                                        <div className="flex gap-2 justify-end border-t border-gray-100 pt-3 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => handleClientDecision(app.id, 'rejected')}
                                                className="px-4 py-2 border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition cursor-pointer"
                                            >
                                                Decline Pitch
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleClientDecision(app.id, 'accepted')}
                                                className="px-4 py-2 bg-[#099639] text-white text-xs font-bold rounded-lg hover:bg-[#077a2e] shadow-sm transition cursor-pointer"
                                            >
                                                Approve Application &amp; Hire
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
    
