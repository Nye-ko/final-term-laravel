import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function JobDetail({ job, hasApplied, existingApplication }) {
    // 🛡️ Guard clause to handle empty or loading job models safely
    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
                <div className="bg-white border p-6 rounded-xl text-center shadow-sm max-w-sm">
                    <p className="font-bold text-gray-900">Loading Gig Details...</p>
                    <p className="text-xs text-gray-400 mt-1">If this persists, verify your JobController payload configuration variables.</p>
                </div>
            </div>
        );
    }

    // 📋 1. Initialize the Inertia form infrastructure with the required database keys
    const freelancerForm = useForm({
        message: ''
    });

    // 🚀 2. Process form submission cleanly to the ApplicationController endpoint
    const handleFreelancerSubmit = (e) => {
        e.preventDefault();
        
        freelancerForm.post(`/freelancer/jobs/${job.id}/apply`, {
            onSuccess: () => {
                freelancerForm.reset();
            },
            onError: (errors) => {
                console.error("Application transmission failure details:", errors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 selection:bg-[#099639]/20">
            <Head title={`View Gig - ${job?.title || 'Loading...'}`} />
            
            <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
                {/* Navigation Breadcrumb */}
                <div className="mb-6">
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-semibold flex items-center gap-1">
                        &larr; Back to Dashboard Hub
                    </Link>
                </div>

                {/* Gig Header Card Sector */}
                <div className="border-b pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{job?.title || 'Untitled Gig Posting'}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Faculty Client: <span className="font-semibold text-gray-700">{job?.client?.full_name || 'Faculty Member'}</span>
                        </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl text-center self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center">
                        <span className="block text-xs uppercase tracking-wider text-emerald-600 font-bold">Estimated Budget</span>
                        <span className="text-2xl font-black text-emerald-700">
                            ₱{job?.budget ? Number(job.budget).toLocaleString() : '0'}
                        </span>
                    </div>
                </div>

                {/* Main Body Description Compartment */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Gig Project Description</h2>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                        {job?.description || 'No description preview available for this job opening.'}
                    </p>
                </div>

                {/* Action Interface Workspace Module */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                    {hasApplied ? (
                        /* Case A: Student has submitted a proposal already */
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span>🎉</span> Pitch Already Submitted
                            </h3>
                            <div className="mt-3 p-4 bg-white rounded-lg border border-slate-200">
                                <p className="text-xs text-gray-400 mb-2">
                                    Submitted on: {existingApplication?.applied_at || 'N/A'}
                                </p>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Your Pitch Summary:</span>
                                <p className="text-sm text-gray-700 italic mt-1 bg-gray-50 p-3 rounded border">
                                    "{existingApplication?.pitch || existingApplication?.message || 'No description proposal details written.'}"
                                </p>
                                
                                <div className="mt-4 pt-3 border-t flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-600">Application Evaluation Status:</span>
                                    <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full ${
                                        existingApplication?.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        existingApplication?.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-amber-100 text-amber-800'
                                    }`}>
                                        {existingApplication?.status || 'pending'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Case B: Open submission box matching ApplicationController requirements */
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Submit Your Pitch Proposal</h3>
                            <p className="text-xs text-gray-500 mb-4">Express your interest directly to the faculty client. State your skills clearly.</p>
                            
                            <form onSubmit={handleFreelancerSubmit} className="space-y-4">
                                <textarea
                                    rows="4"
                                    value={freelancerForm.data.message}
                                    onChange={e => freelancerForm.setData('message', e.target.value)}
                                    placeholder="Hello! I am a student capable of completing this task effectively..."
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#099639] focus:ring-1 focus:ring-[#099639] p-3 border text-sm outline-none bg-white transition-all"
                                    required
                                    minLength={10}
                                    maxLength={1000}
                                />
                                
                                {/* Live Validation Error Notification Banner */}
                                {freelancerForm.errors.message && (
                                    <div className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg mt-1">
                                        ⚠️ {freelancerForm.errors.message}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={freelancerForm.processing}
                                        className="px-6 py-2.5 bg-[#099639] text-white font-semibold text-sm rounded-lg shadow hover:bg-[#077a2e] disabled:bg-gray-300 cursor-pointer transition-all flex items-center gap-2"
                                    >
                                        {freelancerForm.processing ? 'Transmitting Proposal...' : 'Apply for Job'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
