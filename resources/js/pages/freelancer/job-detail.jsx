import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function FreelancerJobDetail({ job, application: initialApp, reportSuccess, actionError }) {
    const [application, setApplication] = useState(initialApp);
    const { data, setData, post, processing, reset } = useForm({ title: '', message: '', reason: '', note: '', rating: '', comment: '' });

    const handleApply = (e) => {
        e.preventDefault();
        post(`/freelancer/jobs/${job.id}/apply`, { onSuccess: () => router.reload({ only: ['application'] }) });
    };

    const handleReport = (e) => {
        e.preventDefault();
        post(`/freelancer/jobs/${job.id}/report`, { onSuccess: () => reset('reason', 'note') });
    };

    const handleReview = (e) => {
        e.preventDefault();
        post(`/freelancer/applications/${application.id}/review`, { onSuccess: () => router.reload({ only: ['application'] }) });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title={`${job?.title || 'Job Detail'} - URaket`} />
            <header className="w-full border-b px-6 md:px-20 h-24 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">URaket</Link>
                <div className="flex gap-6"><Link href="/freelancer/dashboard" className="text-sm font-medium">Dashboard</Link></div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
                <Link href="/jobs" className="text-xs font-bold text-gray-400">&larr; BACK TO BROWSE JOBS</Link>
                <div>
                    <div className="flex items-center gap-3"><h1 className="text-2xl font-bold">{job.title}</h1><span className="text-xs border px-2 py-0.5 uppercase tracking-wider font-bold rounded-md bg-gray-50">{job.status}</span></div>
                    <p className="text-sm font-semibold text-gray-500 mt-1">{job.jobType} · <span className="text-[#099639]">₱{job.budget}</span> · Posted by <strong className="text-gray-900">{job.clientName}</strong></p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed border-t pt-4">{job.description}</p>

                {actionError && <p className="text-xs font-semibold text-red-500">{actionError}</p>}
                {reportSuccess && <p className="text-xs font-semibold text-[#099639] bg-green-50 p-4 border border-green-100 rounded-xl">{reportSuccess}</p>}

                {/* Conditional flow rendering panels handles status indicators dynamically */}
                {!application && job.status === 'open' && (
                    <form onSubmit={handleApply} className="border border-gray-200 p-6 rounded-xl flex flex-col gap-4 shadow-sm">
                        <span className="font-bold text-sm block">Interested in this job?</span>
                        <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-500">Application Pitch Title</label><input required value={data.title} onChange={e => setData('title', e.target.value)} className="border p-2 text-sm rounded-lg" placeholder="e.g. Graphic design pitch..." /></div>
                        <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-gray-500">Cover Message</label><textarea required rows="4" value={data.message} onChange={e => setData('message', e.target.value)} className="border p-2 text-sm rounded-lg" placeholder="Why you're a good fit..." /></div>
                        <button type="submit" disabled={processing} className="px-4 py-2.5 bg-[#099639] text-white text-xs font-bold rounded-lg self-start shadow-sm cursor-pointer hover:bg-[#077a2e]">Submit Pitch</button>
                    </form>
                )}

                {application?.status === 'pending' && <div className="border border-amber-200 bg-amber-50/20 p-5 rounded-xl text-sm"><span className="font-bold block text-amber-800">Your application is currently under review.</span><p className="text-gray-500 mt-1">{job.clientName} hasn't responded yet — you'll see a status change here once they do.</p></div>}
                {application?.status === 'rejected' && <div className="border border-gray-200 p-5 rounded-xl text-sm"><p className="text-gray-500">This gig was awarded to another applicant. <Link href="/jobs" className="text-[#099639] font-medium underline">Browse more jobs</Link></p></div>}
                
                {application?.status === 'accepted' && (
                    <div className="border border-green-200 bg-green-50/20 p-5 rounded-xl flex flex-col gap-4">
                        <div><span className="font-bold block text-[#099639]">You're hired for this gig!</span><p className="text-sm text-gray-500 mt-1">Coordinate fulfillment parameters directly with the client. Mark complete when work deliverables finish.</p></div>
                        <button onClick={() => router.post(`/freelancer/applications/${application.id}/complete`)} className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg self-start cursor-pointer">Mark Contract Complete</button>
                    </div>
                )}

                {application?.status === 'completed' && (
                    <section className="border border-gray-200 p-6 rounded-xl flex flex-col gap-4 shadow-sm">
                        <h2 className="text-base font-bold">Review Client Experience</h2>
                        {application.freelancerReview ? (
                            <div className="bg-gray-50 p-4 rounded-xl"><span className="text-xs font-bold text-gray-400 block">Your Review</span><span className="text-sm font-semibold text-[#099639]">Rating: {application.freelancerReview.rating}/5</span><p className="text-sm italic text-gray-500 mt-1">"{application.freelancerReview.comment}"</p></div>
                        ) : (
                            <form onSubmit={handleReview} className="flex flex-col gap-4">
                                <select required value={data.rating} onChange={e => setData('rating', e.target.value)} className="border p-2 text-sm rounded-lg bg-white"><option value="">Select rating score</option>{[5,4,3,2,1].map(v => <option key={v} value={v}>{v}/5 Stars</option>)}</select>
                                <textarea value={data.comment} onChange={e => setData('comment', e.target.value)} placeholder="Share details about working with this client..." rows="3" className="border p-2 text-sm rounded-lg" />
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg self-start cursor-pointer">Submit Review</button>
                            </form>
                        )}
                    </section>
                )}

                {/* Moderation reporting section panel footer */}
                <section className="border-t border-gray-100 pt-6 flex flex-col gap-4">
                    <span className="font-bold text-xs text-gray-400 uppercase tracking-wider block">Flag structural concerns?</span>
                    <form onSubmit={handleReport} className="flex flex-col gap-3 max-w-xl">
                        <select required value={data.reason} onChange={e => setData('reason', e.target.value)} className="border p-2 text-sm rounded-lg bg-white"><option value="">Select a reason</option><option value="Misleading">Misleading</option><option value="Inappropriate">Inappropriate</option><option value="Scam">Scam</option><option value="Other">Other</option></select>
                        <textarea value={data.note} onChange={e => setData('note', e.target.value)} placeholder="Optional description notes context..." rows="2" className="border p-2 text-sm rounded-lg" />
                        <button type="submit" className="text-xs font-bold text-red-500 underline hover:text-red-700 self-start cursor-pointer">Report this posting</button>
                    </form>
                </section>
            </main>
        </div>
    );
}
