import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Detail({ job, userRole, isOwner, hasApplied, existingApplication, applications }) {

    
    // Freelancer Application Pitch Hook Form
    const freelancerForm = useForm({ pitch: '' });

    // Client Hiring Actions Form Hook (for accepting/rejecting bids)
    const clientActionForm = useForm({ status: '' });

    const handleFreelancerSubmit = (e) => {
        e.preventDefault();
        freelancerForm.post(`/freelancer/jobs/${job.id}/apply`, {
            onSuccess: () => freelancerForm.reset(),
        });
    };

    const handleClientDecision = (applicationId, decisionStatus) => {
        if (confirm(`Are you sure you want to mark this pitch as ${decisionStatus}?`)) {
            clientActionForm.put(`/client/applications/${applicationId}`, {
                data: { status: decisionStatus },
                preserveScroll: true
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg my-8 font-sans">
            <Head title={`Gig Workspace - ${job.title}`} />
            
            {/* Quick Navigation Anchor */}
            <div className="mb-6 flex justify-between items-center bg-gray-50 p-3 rounded">
                <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-medium">
                    ← Back to Dashboard Hub
                </Link>
                <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2.5 py-1 rounded uppercase tracking-wider">
                    Viewing Role: {userRole}
                </span>
            </div>

            {/* Top Identity Block */}
            <div className="border-b pb-6 mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{job.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Posted by Faculty Client: <span className="font-semibold text-gray-700">{job.client.full_name}</span>
                    </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl text-center">
                    <span className="block text-xs uppercase tracking-wider text-emerald-600 font-bold">Estimated Budget</span>
                    <span className="text-2xl font-black text-emerald-700">₱{Number(job.budget).toLocaleString()}</span>
                </div>
            </div>

            {/* Core Description Content */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Gig Project Description</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {job.description}
                </p>
            </div>

            {/* DYNAMIC VIEW MANAGEMENT SYSTEM PANEL */}
            <div className="mt-8 border-t pt-6">
                
                {/* INTERFACE LAYER A: USER IS A STUDENT FREELANCER */}
                {userRole === 'freelancer' && (
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                        {hasApplied ? (
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <span>🎉</span> Application Active
                                </h3>
                                <div className="mt-3 p-4 bg-white rounded-lg border border-slate-200">
                                    <p className="text-xs text-gray-400 mb-2">Submitted on: {existingApplication.applied_at}</p>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Your Pitch Summary:</span>
                                    <p className="text-sm text-gray-700 italic mt-1 bg-gray-50 p-3 rounded border">"{existingApplication.pitch}"</p>
                                    
                                    <div className="mt-4 pt-3 border-t flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-600">Application Evaluation Status:</span>
                                        <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full ${
                                            existingApplication.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            existingApplication.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                            {existingApplication.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Submit Your Pitch Proposal</h3>
                                <p className="text-xs text-gray-500 mb-4">Express your interest directly to the faculty client. State your skills clearly.</p>
                                <form onSubmit={handleFreelancerSubmit} className="space-y-4">
                                    <textarea
                                        rows="4"
                                        value={freelancerForm.data.pitch}
                                        onChange={e => freelancerForm.setData('pitch', e.target.value)}
                                        placeholder="Hello! I am a 3rd year student capable of completing this task effectively..."
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-sm"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={freelancerForm.processing}
                                        className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-300"
                                    >
                                        {freelancerForm.processing ? 'Transmitting Proposal...' : 'Submit Pitch Application'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {/* INTERFACE LAYER B: USER IS THE FACULTY CLIENT WHO POSTED IT */}
                {userRole === 'client' && isOwner && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Incoming Student Applicant Bids ({applications.length})</h3>
                        <p className="text-xs text-gray-500 mb-4">Review submitted student credentials and text pitches below to finalize hiring actions.</p>
                        
                        {applications.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed text-gray-400 text-sm">
                                No students have submitted application pitches for this gig yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="p-5 bg-white border rounded-xl shadow-sm hover:border-blue-200 transition-all">
                                        <div className="flex justify-between items-center mb-3">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{app.freelancer.full_name}</h4>
                                                <p className="text-xs text-gray-400">Applied on {app.applied_at}</p>
                                            </div>
                                            <span className={`text-xs uppercase font-extrabold px-2.5 py-1 rounded ${
                                                app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 bg-slate-50 p-3 rounded border italic mb-4">
                                            "{app.pitch}"
                                        </p>

                                        {/* Faculty Control Flow Trigger Actions */}
                                        {app.status === 'pending' && (
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => handleClientDecision(app.id, 'rejected')}
                                                    className="px-3 py-1.5 border border-red-200 text-red-600 text-xs font-semibold rounded hover:bg-red-50"
                                                >
                                                                                                    Decline Pitch
                                            </button>
                                            <button
                                                onClick={() => handleClientDecision(app.id, 'accepted')}
                                                className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 shadow-sm"
                                            >
                                                Accept & Hire Student
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
</div>
)}

