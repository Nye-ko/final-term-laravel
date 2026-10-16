import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    // React state handles your modal show/hide properties natively
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openRoleModal = () => setIsModalOpen(true);
    const closeRoleModal = () => setIsModalOpen(false);

    const handleSelectRole = (role) => {
        closeRoleModal();
        // Redirects to signup with the chosen role query parameter
        window.location.href = `/auth/signup?role=${encodeURIComponent(role)}`;
    };

    // Listen for Escape key down to close modal safely
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeRoleModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Head title="URaket - Campus Gigs" />

            {/* ============================= Nav ============================= */}
            <header className="w-full border-b border-gray-100">
                <div className="max-w-360 mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        URaket
                    </Link>

                    <nav aria-label="Primary" className="flex items-center gap-8"></nav>

                    <div className="flex items-center gap-4">
                        <a href="#how-it-works" className="text-sm px-4 py-2 text-gray-600 hover:text-gray-900">
                            How It Works
                        </a>
                        <Link href="/auth/login" className="text-sm px-4 py-2 text-gray-600 hover:text-gray-900">
                            Log in
                        </Link>
                        <button
                            type="button"
                            onClick={openRoleModal}
                            className="text-sm px-5 py-2 bg-[#099639] text-white font-medium rounded-[10px] hover:bg-[#077a2e] transition cursor-pointer"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* ============================ Hero ============================ */}
                <section className="max-w-360 mx-auto px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6 max-w-xl">
                        <h1 className="text-5xl leading-tight font-semibold">
                            Find work, hire talent — all inside CLSU.
                        </h1>
                        <p className="text-base text-gray-600 leading-relaxed">
                            URaket connects students looking for paid gigs with faculty and staff who need work done. 
                            Post a job or apply to one — everything from hiring to reviews happens right here.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="button"
                                onClick={openRoleModal}
                                className="text-sm px-6 py-3 bg-[#099639] text-white font-medium rounded-[10px] hover:bg-[#077a2e] transition cursor-pointer"
                            >
                                Get started
                            </button>
                        </div>
                    </div>

                    <div className="justify-self-center max-w-md w-full">
                        <img 
                            src="/Siever_Silver.png" 
                            alt="Silver photo of Siever"
                            className="w-full `aspect-[4/5]` object-cover rounded-2xl  border-gray-100" 
                        />
                    </div>
                </section>

                {/*How it works*/}
                <section id="how-it-works" className="max-w-360 mx-auto px-6 md:px-20 py-20 border-t border-gray-100">
                    <h2 className="text-3xl font-semibold mb-12">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <article className="flex flex-col gap-3">
                            <span className="text-sm text-[#099639] font-medium">Step 1</span>
                            <h3 className="text-lg font-medium">Post or apply</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Faculty/Staff post a job with the skills they need. Students browse open gigs and apply with a short pitch.
                            </p>
                        </article>

                        <article className="flex flex-col gap-3">
                            <span className="text-sm text-[#099639] font-medium">Step 2</span>
                            <h3 className="text-lg font-medium">Get hired</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                The Faculty/Staff reviews applicants and accepts one. That closes the job to further applications automatically.
                            </p>
                        </article>

                        <article className="flex flex-col gap-3">
                            <span className="text-sm text-[#099639] font-medium">Step 3</span>
                            <h3 className="text-lg font-medium">Complete and review</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Once the Faculty/Staff marks the job complete, both sides leave a review — that's what builds trust for the next gig.
                            </p>
                        </article>
                    </div>
                </section>
            </main>

            {/*Footer*/}
            <footer className="w-full border-t border-gray-100">
                <div className="max-w-360 mx-auto px-6 md:px-20 py-10 flex items-center justify-between text-sm text-gray-500">
                    <span>URaket</span>
                    <span>&copy; {new Date().getFullYear()} URaket. For campus use only.</span>
                </div>
            </footer>

            {/*Role Select Modal*/}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    
                    {/* Dark Overlay Backdrop - Ensure this has explicit dark background styling */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
                        onClick={closeRoleModal}
                    ></div>

                    {/* Modal Main Content Box Card Container */}
                    <section 
                        role="dialog" 
                        aria-modal="true" 
                        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-200 mx-4"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-gray-900">Choose your role</h2>
                                <p className="text-sm text-gray-500">Select how you want to use URaket.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSelectRole('freelancer')}
                                    className="w-full border border-gray-200 hover:border-[#099639] hover:bg-[#099639]/5 px-4 py-4 text-left transition rounded-xl group cursor-pointer"
                                >
                                    <span className="block text-sm font-bold text-gray-800 group-hover:text-[#077a2e]">Student / Freelancer</span>
                                    <span className="block text-xs text-gray-500 mt-1">Find campus gigs and apply for jobs.</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSelectRole('client')}
                                    className="w-full border border-gray-200 hover:border-[#099639] hover:bg-[#099639]/5 px-4 py-4 text-left transition rounded-xl group cursor-pointer"
                                >
                                    <span className="block text-sm font-bold text-gray-800 group-hover:text-[#077a2e]">Faculty / Staff Client</span>
                                    <span className="block text-xs text-gray-500 mt-1">Post jobs and hire campus talent.</span>
                                </button>
                            </div>

                            <button 
                                type="button" 
                                onClick={closeRoleModal} 
                                className="text-sm font-medium text-gray-500 hover:text-gray-800 underline self-start cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </section>
                </div>
            )}

        </div>
    );
}
