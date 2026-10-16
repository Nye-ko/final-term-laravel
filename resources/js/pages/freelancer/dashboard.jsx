import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function FreelancerDashboard({ currentUser, applications = [], recommendedJobs = [] }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Freelancer Dashboard - URaket" />

            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">URaket</Link>
                    <div className="flex items-center gap-6">
                        <nav aria-label="Freelancer navigation" className="flex items-center gap-6">
                            <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Job board</Link>
                            <Link href="/freelancer/applications" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Applications</Link>
                            <Link href="/freelancer/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Profile</Link>
                        </nav>
                        <button onClick={() => router.post('/logout')} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 flex flex-col gap-14">
                    
                    <section className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {currentUser?.fullName ? `Welcome back, ${currentUser.fullName}` : 'Freelancer dashboard'}
                        </h1>
                        <p className="text-sm text-gray-500">Find campus gigs, track your applications, and manage your profile.</p>
                    </section>

                    {/* Recent applications panel snapshot row */}
                    <section aria-labelledby="applications-heading" className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
                            <h2 id="applications-heading" className="text-lg font-bold text-gray-900">Recent applications</h2>
                            <Link href="/freelancer/applications" className="text-sm font-semibold text-[#099639] hover:underline">View all &rarr;</Link>
                        </div>

                        {applications.length === 0 ? (
                            <div className="border border-dashed border-gray-200 p-8 rounded-xl flex flex-col gap-2"><p className="text-sm text-gray-500">You haven't applied to any jobs yet. <Link href="/jobs" className="text-[#099639] font-medium underline">Browse the board</Link></p></div>
                        ) : (
                            <div className="bg-white border border-gray-100 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                                {applications.slice(0, 4).map(app => (
                                    <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50/20 transition">
                                        <div className="flex flex-col gap-0.5">
                                            <Link href={`/freelancer/jobs/${app.jobId}`} className="text-sm font-semibold text-gray-900 hover:text-[#099639] hover:underline">{app.jobTitle}</Link>
                                            <span className="text-xs text-gray-400 font-medium">{app.clientName}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${app.status === 'accepted' ? 'bg-green-50 border-green-100 text-[#099639]' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>{app.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Recommended open gigs display matrix grid loop */}
                    <section aria-labelledby="recommended-jobs-heading" className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
                            <h2 id="recommended-jobs-heading" className="text-lg font-bold text-gray-900">Open gigs</h2>
                        </div>

                        {recommendedJobs.length === 0 ? (
                            <p className="text-sm text-gray-400 font-medium">There are no open gigs to show right now.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {recommendedJobs.slice(0, 4).map(job => (
                                    <article key={job.id} className="border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between gap-4 hover:border-gray-300 transition bg-white">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                                                <span className="text-xs text-gray-400 font-medium">{job.clientName}</span>
                                            </div>
                                            {job.description && <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{job.description}</p>}
                                            {job.skills && (
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {job.skills.map((skill, sIdx) => (
                                                        <span key={sIdx} className="text-[10px] font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-md">{skill.name || skill}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Link href={`/freelancer/jobs/${job.id}`} className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#099639] rounded-lg px-4 py-2.5 self-start shadow-sm transition hover:bg-[#077a2e]">View job</Link>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
