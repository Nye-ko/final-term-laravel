import React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Profile({ currentUser, metrics = {} }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const profileForm = useForm({
        full_name: currentUser?.fullName || currentUser?.full_name || '',
        email: currentUser?.email || 'student@clsu2.edu.ph',
        course: 'Bachelor of Science in Information Technology',
        skills: 'React, Laravel, MySQL, Tailwind CSS',
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-[#099639]/10">
            <Head title="My Profile - URaket" />

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
                        <Link href="/freelancer/applications" className="hover:text-gray-900 transition">My Applications</Link>
                        <Link href="/freelancer/profile" className="text-[#099639] font-bold transition">Profile</Link>
                        <button onClick={handleLogout} className="hover:text-gray-900 transition cursor-pointer font-medium">
                            Log out
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Freelancer Profile</h1>
                    <p className="text-sm text-gray-500">Manage your student digital identity, review account settings, and update your skill credentials.</p>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Account Role</h3>
                        <p className="text-sm font-bold text-[#099639] leading-none uppercase tracking-wide text-sm mt-2">Student</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Verification Status</h3>
                        <p className="text-sm font-bold text-gray-900 leading-none text-sm mt-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#099639]"></span> Verified Student
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Campus Division</h3>
                        <p className="text-sm font-bold text-gray-900 leading-none text-sm mt-2 truncate">CLSU Main Campus</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-24 flex flex-col justify-between">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Security Tier</h3>
                        <p className="text-sm font-bold text-gray-900 leading-none text-sm mt-2">Active Member</p>
                    </div>
                </section>

                <div className="flex flex-col gap-4">
                    <div className="border-b border-gray-100 pb-3">
                        <h2 className="text-base font-bold text-gray-900 tracking-tight">Account Information</h2>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-3xl w-full">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" readOnly disabled value={profileForm.data.full_name} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-500 outline-none cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">CLSU Email Address</label>
                                <input type="email" readOnly disabled value={profileForm.data.email} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-500 outline-none cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">College Course / Track</label>
                                <input type="text" readOnly disabled value={profileForm.data.course} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-500 outline-none cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Skill Badges</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {profileForm.data.skills.split(',').map((skill, index) => (
                                        <span key={index} className="bg-green-50 text-[#099639] border border-green-200/60 text-xs font-bold px-3 py-1 rounded-lg">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
