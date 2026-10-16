import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function login() {
    // Inertia form state management simplifies your entire form handling flow
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatches standard post request to your Laravel authentication backend handler
        post('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Head title="Log in - URaket" />

            <header className="w-full">
                <div className="max-w-360 mx-auto px-6 md:px-20 h-24 flex items-center">
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        URaket
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 sm:px-20 font-sans">
                <div className="w-full max-w-105 flex flex-col gap-5 py-16">
                    
                    {/* Title & Navigation Header */}
                    <div className="w-full max-w-89.5 p-2.5 flex flex-col justify-center items-start gap-2.5">
                        <h1 className="text-[28px] font-medium leading-tight text-black">
                            Log in
                        </h1>
                        <div className="flex items-center gap-2.5 text-base text-black font-normal">
                            <span>New here?</span>
                            <Link href="/auth/signup" className="underline hover:opacity-70 transition-opacity">
                                Create an account
                            </Link>
                        </div>
                    </div>

                    {/* Form Card Container */}
                    <div className="w-full max-w-105 p-2.5 sm:px-4 sm:py-4.5 border border-[#D3D3D3] rounded-[5px] bg-white overflow-hidden">
                        <div className="w-full p-2.5 flex flex-col justify-center items-center gap-1">
                            
                            <form onSubmit={handleSubmit} className="w-full py-1.25 flex flex-col justify-center items-start gap-5">
                                
                                {/* Form Top-Level Errors */}
                                {errors.formError && (
                                    <p role="alert" className="w-full text-sm text-red-600">
                                        {errors.formError}
                                    </p>
                                )}

                                {/* Email Field */}
                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                    <label htmlFor="email" className="text-[16px] font-normal text-black">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                        aria-describedby="email-error"
                                        className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                    />
                                    {errors.email && (
                                        <span id="email-error" role="alert" className="text-xs text-red-600">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="w-full flex flex-col justify-center items-start gap-2">
                                    <label htmlFor="password" className="text-[16px] font-normal text-black">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        aria-describedby="password-error"
                                        className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                    />
                                    {errors.password && (
                                        <span id="password-error" role="alert" className="text-xs text-red-600">
                                            {errors.password}
                                        </span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12.5 bg-[#099639] hover:bg-[#088231] active:bg-[#07702a] disabled:opacity-50 text-white text-[18px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center mt-2"
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </button>
                            </form>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
