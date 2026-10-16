import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function JobBoardIndex({ currentUser, jobs = [], skills = [], clientJobs = [] }) {
    // 1. Role Detection Flag Context Variables
    const isFreelancer = currentUser?.role === 'freelancer';
    const isClient = currentUser?.role === 'client';
    const isAdmin = currentUser?.role === 'admin';

    // 2. Freelancer Interface State Hooks (Search and Tag Filters)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    
    // Freelancer Application Pitch Modal Overlay State
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [targetedJob, setTargetedJob] = useState(null);
    const [pitchTitle, setPitchTitle] = useState('');
    const [pitchMessage, setPitchMessage] = useState('');

    // 3. Client-side Search and Chip Filtration Logic Engine
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchQuery || 
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.clientName.toLowerCase().includes(searchQuery.toLowerCase());

        const jobSkillIds = job.skills?.map(s => String(s.id)) || [];
        const matchesSkills = selectedSkillIds.length === 0 || 
            jobSkillIds.some(id => selectedSkillIds.includes(id));

        return matchesSearch && matchesSkills;
    });

    const toggleSkillFilter = (skillId) => {
        const idStr = String(skillId);
        if (selectedSkillIds.includes(idStr)) {
            setSelectedSkillIds(selectedSkillIds.filter(id => id !== idStr));
        } else {
            setSelectedSkillIds([...selectedSkillIds, idStr]);
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedSkillIds([]);
    };

    // 4. Modal Submission Operations Handlers
    const openApplyModal = (job) => {
        setTargetedJob(job);
        setIsApplyModalOpen(true);
    };

    const closeApplyModal = () => {
        setIsApplyModalOpen(false);
        setTargetedJob(null);
        setPitchTitle('');
        setPitchMessage('');
    };

    const handleApplySubmit = (e) => {
        e.preventDefault();
        router.post('/applications/create', {
            job_id: targetedJob.id,
            title: pitchTitle,
            message: pitchMessage
        }, {
            onSuccess: () => closeModal()
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Job Board - URaket" />

            {/* Global Context Header Workspace Navigation Panels */}
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-360 mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">URaket</Link>
                    
                    <div className="flex items-center gap-6">
                        <nav aria-label="Role specific layout directions" className="flex items-center gap-6">
                            {isFreelancer ? (
                                <>
                                    <Link href="/freelancer/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
                                    <Link href="/freelancer/applications" className="text-sm font-medium text-gray-600 hover:text-gray-900">Applications</Link>
                                    <Link href="/freelancer/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900">Profile</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/client/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
                                    <Link href="/client/profile" className="text-sm font-medium text-gray-600 hover:text-gray-900">Profile</Link>
                                </>
                            )}
                        </nav>
                        <button onClick={() => router.post('/logout')} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </div>
                </div>
            </header>

            {/* Master Content Router Node Split Layout */}
            <main className="flex-1">
                <div className="max-w-360 mx-auto px-6 md:px-20 py-16 flex flex-col gap-10">
                    
                    {/* ========================================================================= */}
                    {/* 👤 TYPE A VIEWPORT MAPPING VIEW: FREELANCER & ADMIN PLATFORM BOARD         */}
                    {/* ========================================================================= */}
                    {(isFreelancer || isAdmin) && (
                        <>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Job board</h1>
                                <p className="text-sm text-gray-500">Find gigs that match your unique skillsets.</p>
                            </div>

                            {/* Live Text Query Searches Filter Field Section */}
                            <section className="flex flex-col gap-2 max-w-xl">
                                <label htmlFor="searchJobs" className="text-sm font-semibold text-gray-700">Search marketplace openings</label>
                                <input
                                    id="searchJobs"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by title, description, or client skills..."
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#099639]"
                                />
                            </section>

                            {/* Interactive Capability Skills Matrix Filter Badge Clusters Row */}
                            <section className="flex flex-col gap-3">
                                <div className="flex items-center justify-between gap-4 max-w-xl">
                                    <h2 className="text-sm font-semibold text-gray-700">Filter by skill prerequisites</h2>
                                    {(searchQuery || selectedSkillIds.length > 0) && (
                                        <button onClick={handleClearFilters} className="text-xs font-semibold text-red-500 underline cursor-pointer">Clear filters</button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => {
                                        const isChecked = selectedSkillIds.includes(String(skill.id));
                                        return (
                                            <button
                                                key={skill.id}
                                                type="button"
                                                onClick={() => toggleSkillFilter(skill.id)}
                                                className={`text-xs px-3 py-1.5 border rounded-lg transition-all cursor-pointer ${
                                                    isChecked 
                                                        ? 'bg-black text-white border-black font-semibold' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                                }`}
                                            >
                                                {isChecked ? `✓ ${skill.name}` : skill.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Job Listings Results Visualizer Segment Grid */}
                            <section className="flex flex-col gap-6">
                                <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
                                    <h2 className="text-base font-bold text-gray-900">{filteredJobs.length} open gig{filteredJobs.length === 1 ? '' : 's'} available</h2>
                                    {isFreelancer && <Link href="/freelancer/applications" className="text-sm font-semibold text-[#099639] hover:underline">My applications &rarr;</Link>}
                                </div>

                                {filteredJobs.length === 0 ? (
                                    <div className="border border-dashed border-gray-200 p-12 text-center rounded-xl bg-gray-50/20">
                                        <p className="text-sm font-semibold text-gray-800">No jobs match your search parameters.</p>
                                        <p className="text-xs text-gray-400 mt-1">Try resetting chips selection filters or search tags input string keys.</p>
                                    </div>
                                ) : (
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredJobs.map(job => (
                                            <article key={job.id} className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between gap-5 bg-white">
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-0.5">
                                                        <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                                                        <span className="text-xs font-semibold text-gray-500">
                                                            {job.jobType} · <span className="text-[#099639]">₱{job.budget}</span>
                                                        </span>
                                                        <span className="text-[11px] text-gray-400 font-medium">By {job.clientName}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{job.description}</p>
                                                    <div className="flex flex-wrap gap-1 pt-1">
                                                        {job.skills?.map(s => (
                                                            <span key={s.id} className="text-[9px] font-bold bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md">{s.name}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto border-t border-gray-50 pt-3">
                                                    <Link href={`/freelancer/jobs/${job.id}`} className="text-xs font-bold text-gray-400 hover:text-black underline">View Full Details</Link>
                                                    {isFreelancer && (
                                                        job.hasApplied ? (
                                                            <span className="text-[10px] font-bold bg-green-50 border border-green-100 text-[#099639] px-2.5 py-1 rounded-full uppercase">Applied</span>
                                                        ) : (
                                                            <button onClick={() => openApplyModal(job)} className="text-xs font-semibold px-4 py-2 bg-[#099639] text-white rounded-md hover:bg-[#077a2e] cursor-pointer shadow-sm">Apply Now</button>
                                                        )
                                                    )}
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                    {/* ========================================================================= */}
                    {/* 💼 TYPE B VIEWPORT MAPPING VIEW: CLIENT SUBMISSION LISTINGS HUB           */}
                    {/* ========================================================================= */}
                    {isClient && (
                        <>
                            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Your job posts</h1>
                                    <p className="text-sm text-gray-500">Manage applicants and track contract fulfillment status metrics here.</p>
                                </div>
                                <Link href="/client/create-job" className="text-sm font-semibold px-5 py-3 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800">+ Post a job</Link>
                            </div>

                            {clientJobs.length === 0 ? (
                                <div className="border border-dashed border-gray-200 p-12 text-center rounded-xl flex flex-col items-center justify-center gap-2 bg-gray-50/20">
                                    <p className="text-sm font-semibold text-gray-800">You haven't posted any jobs yet.</p>
                                    <Link href="/client/create-job" className="text-xs font-bold text-[#099639] underline mt-1">Post your very first gig opportunity &rarr;</Link>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                                    {clientJobs.map(job => (
                                        <div key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/30 transition">
                                            <div className="flex flex-col gap-1.5">
                                                <Link href={`/client/jobs/${job.id}`} className="text-base font-semibold text-gray-900 hover:text-[#099639] hover:underline">{job.title}</Link>
                                                <div className="text-xs text-gray-400 font-medium"><span>{job.jobType}</span> · <span className="text-gray-700">₱{job.budget}</span> · <span className="font-semibold text-amber-600">{job.applicantCount || 0} Applicant{job.applicantCount === 1 ? '' : 's'}</span></div>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border self-start sm:self-auto ${
                                                job.status === 'open' ? 'bg-green-50 border-green-100 text-[#099639]' : 'bg-gray-50 border-gray-100 text-gray-500'
                                            }`}>{job.status}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                </div>
            </main>

            {/* ========================================================================= */}
            {/* 📋 REGISTRATION MODAL FORM SLIDE LAYOUT OVERLAY                           */}
            {/* ========================================================================= */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={closeApplyModal}></div>
                    <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                        <div className="flex flex-col gap-1 mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Apply to this job</h2>
                            <p className="text-xs font-semibold text-gray-400">Position: <span className="text-gray-700 font-bold">{targetedJob?.title}</span></p>
                        </div>

                        <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="appTitle" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Application Proposal Title</label>
                                <input id="appTitle" type="text" required value={pitchTitle} onChange={e => setPitchTitle(e.target.value)} className="border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#099639]" placeholder="e.g. Expert logo design proposal..." />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="appMsg" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pitch Cover Letter Notes</label>
                                <textarea id="appMsg" rows="5" required value={pitchMessage} onChange={e => setPitchMessage(e.target.value)} className="border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#099639]" placeholder="Explain why your credentials fit this contract request..." />
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                                <button type="submit" className="px-5 py-2.5 bg-[#099639] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#077a2e] shadow-sm">Submit Application</button>
                                <button type="button" onClick={closeApplyModal} className="text-xs font-semibold text-gray-400 hover:text-gray-700 underline">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

