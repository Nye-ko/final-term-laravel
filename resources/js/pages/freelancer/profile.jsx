import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function FreelancerProfile({ profile, loadError }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title={`${profile?.fullName || 'Freelancer Profile'} - URaket`} />
            
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">URaket</Link>
                    <div className="flex items-center gap-6">
                        <nav aria-label="Freelancer navigation" className="flex items-center gap-6">
                            <Link href="/freelancer/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
                            <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Job board</Link>
                            <Link href="/freelancer/applications" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Applications</Link>
                        </nav>
                        <button onClick={() => router.post('/logout')} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
                <Link href="/freelancer/dashboard" className="text-xs font-bold text-gray-400">&larr; BACK TO DASHBOARD</Link>
                
                {loadError ? (
                    <p role="alert" className="text-sm font-medium text-red-500">{loadError}</p>
                ) : (
                    <div className="flex flex-col gap-10">
                        {/* Summary Header Identification */}
                        <section className="flex flex-col gap-1.5 border-b pb-4">
                            <h1 className="text-2xl font-bold tracking-tight">{profile?.fullName}</h1>
                            {profile?.college && <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">{profile.college}</span>}
                        </section>

                        {profile?.about && (
                            <section aria-labelledby="about-heading" className="flex flex-col gap-2">
                                <h2 id="about-heading" className="text-sm font-bold text-gray-400 uppercase tracking-wider">About</h2>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{profile.about}</p>
                            </section>
                        )}

                        {profile?.resumeLink && (
                            <section aria-labelledby="resume-heading" className="flex flex-col gap-2 border-t pt-4">
                                <h2 id="resume-heading" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Resume</h2>
                                <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 underline hover:text-blue-800 self-start">View uploaded portfolio resume document &rarr;</a>
                            </section>
                        )}

                        {/* Skills Chips Matrix Grid Loops */}
                        <section aria-labelledby="skills-heading" className="flex flex-col gap-3 border-t pt-4">
                            <h2 id="skills-heading" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Skills</h2>
                            {profile?.skills?.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5">
                                    {profile.skills.map(skill => (
                                        <span key={skill.id} className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-md">{skill.name}</span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">No core skill parameters cataloged yet.</p>
                            )}
                        </section>

                        {/* Historical Clients Feedback Matrix */}
                        <section aria-labelledby="reviews-heading" className="flex flex-col gap-4 border-t pt-4">
                            <h2 id="reviews-heading" className="text-base font-bold text-gray-900">Endorsements & Reviews</h2>
                            {!profile?.reviews || profile.reviews.length === 0 ? (
                                <p className="text-sm text-gray-400 font-medium">No system contract performance reviews recorded yet.</p>
                            ) : (
                                <ul className="flex flex-col gap-4">
                                    {profile.reviews.map((review, idx) => (
                                        <li key={idx} className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm flex flex-col gap-1.5 hover:border-gray-300 transition">
                                            <span className="text-sm font-bold text-gray-900">{review.clientName}</span>
                                            <span className="text-xs font-bold text-[#099639]">Rating: {review.rating} / 5 Stars</span>
                                            <p className="text-sm italic text-gray-600 mt-1">"{review.comment}"</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}
