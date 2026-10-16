import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function JobDetail({ job, applications = [] }) {
    const [localApplications, setLocalApplications] = useState(applications);
    const [localJob, setLocalJob] = useState(job);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const pendingApps = localApplications.filter(a => a.status === 'pending');
    const hiredApp = localApplications.find(a => a.status === 'accepted' || a.status === 'completed');

    const handleAction = (e, appId, actionType) => {
        e.preventDefault();
        if (confirm(actionType === 'accept' ? 'Accept this applicant and close the post?' : 'Reject this applicant?')) {
            router.post(`/client/applications/${appId}/${actionType}`, {}, {
                onSuccess: () => {
                    if (actionType === 'accept') {
                        setLocalJob({ ...localJob, status: 'closed' });
                        setLocalApplications(localApplications.map(a => a.id === appId ? { ...a, status: 'accepted' } : { ...a, status: 'rejected' }));
                    } else {
                        setLocalApplications(localApplications.map(a => a.id === appId ? { ...a, status: 'rejected' } : a));
                    }
                }
            });
        }
    };

    const handleMarkCompleted = (e) => {
        e.preventDefault();
        if (confirm('Mark this job as completed?')) {
            router.post(`/client/jobs/${localJob.id}/complete`, {}, {
                onSuccess: () => {
                    setLocalJob({ ...localJob, status: 'completed' });
                    setLocalApplications(localApplications.map(a => a.status === 'accepted' ? { ...a, status: 'completed' } : a));
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title={`${localJob?.title || 'Job Details'} - URaket`} />
            <header className="w-full border-b px-6 md:px-20 h-24 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">URaket</Link>
                <div className="flex gap-6"><Link href="/client/dashboard" className="text-sm font-medium">Dashboard</Link></div>
            </header>
            <main className="max-w-3xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
                <Link href="/client/dashboard" className="text-xs font-bold text-gray-400">&larr; BACK TO YOUR JOBS</Link>
                <div>
                    <h1 className="text-2xl font-bold">{localJob.title}</h1>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{localJob.jobType} · <span className="text-[#099639]">₱{localJob.budget}</span></p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed border-t pt-4">{localJob.description}</p>

                {localJob.status === 'open' && (
                    <section className="flex flex-col gap-4 border-t pt-6">
                        <h2 className="text-lg font-bold">Applicants ({pendingApps.length})</h2>
                        {pendingApps.map(app => (
                            <div key={app.id} className="border p-4 rounded-xl flex flex-col gap-3">
                                <div><span className="block font-bold text-sm">{app.freelancerName}</span><p className="text-sm text-gray-600 mt-1">{app.message}</p></div>
                                <div className="flex gap-2">
                                    <button onClick={(e) => handleAction(e, app.id, 'accept')} className="text-xs font-bold px-3 py-1.5 bg-[#099639] text-white rounded-lg cursor-pointer">Accept</button>
                                    <button onClick={(e) => handleAction(e, app.id, 'reject')} className="text-xs font-bold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg cursor-pointer">Reject</button>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {hiredApp && (
                    <section className="flex flex-col gap-4 border-t pt-6">
                        <h2 className="text-lg font-bold">Hired Freelancer</h2>
                        <div className="border p-4 rounded-xl bg-gray-50"><span className="font-bold text-sm">{hiredApp.freelancerName}</span><span className="block text-xs text-gray-500 mt-1">Status: {hiredApp.status}</span></div>
                        {hiredApp.status === 'accepted' && <button onClick={handleMarkCompleted} className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg self-start cursor-pointer">Mark Complete</button>}
                        
                        {hiredApp.status === 'completed' && (
                            <div className="border-t pt-4">
                                {hiredApp.clientReview ? (
                                    <div className="bg-gray-50 p-4 rounded-xl"><span className="text-xs font-bold text-gray-400 block mb-1">Your Review</span><span className="text-sm font-semibold text-[#099639]">Rating: {hiredApp.clientReview.rating}/5</span><p className="text-sm italic text-gray-600 mt-1">"{hiredApp.clientReview.comment}"</p></div>
                                ) : (
                                    <form onSubmit={(e) => { e.preventDefault(); router.post(`/client/applications/${hiredApp.id}/review`, { rating, comment }); }} className="flex flex-col gap-3">
                                        <select required value={rating} onChange={e => setRating(e.target.value)} className="border p-2 text-sm rounded-lg bg-white"><option value="">Select rating</option>{[5,4,3,2,1].map(v => <option key={v} value={v}>{v}/5</option>)}</select>
                                        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Experience review notes..." rows="3" className="border p-2 text-sm rounded-lg" />
                                        <button type="submit" className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg self-start cursor-pointer">Submit Review</button>
                                    </form>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
