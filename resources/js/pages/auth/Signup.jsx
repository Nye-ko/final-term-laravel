import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function signup({ role }) {
    // Static configuration matching your original data structures
    const ROLE_COPY = {
        freelancer: {
            label: 'Student',
            description: 'Find and apply jobs; build your profile.',
            orgFieldLabel: 'College',
            orgFieldPlaceholder: 'e.g. College of Engineering',
        },
        client: {
            label: 'Faculty / staff',
            description: 'Post jobs and hire students.',
            orgFieldLabel: 'College or office',
            orgFieldPlaceholder: "e.g. Registrar's Office",
        },
    };

    const isRoleSelected = role && ROLE_COPY[role];
    const roleCopy = isRoleSelected ? ROLE_COPY[role] : null;

    // Connect form hook fields natively
    const { data, setData, post, processing, errors } = useForm({
        role: role || '',
        fullName: '',
        email: '',
        orgUnit: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/signup');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <Head title="Create your account - URaket" />

            <header className="w-full border-b border-gray-100">
                <div className="max-w-360 mx-auto px-6 md:px-20 h-24 flex items-center">
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        URaket
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 sm:px-20">
                <div className="w-full max-w-105 flex flex-col gap-7 py-16">
                    
                    {/* Title Header */}
                    <div className="p-2.5 flex flex-col gap-2.5">
                        <h1 className="text-[28px] font-medium leading-tight text-black">
                            Create your account
                        </h1>
                        <p className="flex items-center gap-2.5 text-base text-black">
                            <span>Already have one?</span>
                            <Link href="/auth/login" className="underline text-black hover:opacity-70 transition-opacity">
                                Log in
                            </Link>
                        </p>
                    </div>

                    {!isRoleSelected ? (
                        /*State A: Role Selection*/
                        <section aria-labelledby="role-heading" className="w-full flex flex-col justify-start items-start gap-5">
                            <div className="flex flex-col gap-1 w-full">
                                <h2 id="role-heading" className="text-[18px] font-medium text-black">Choose your role</h2>
                                <p className="text-sm font-normal text-gray-500">Your account can have one profile role at a time.</p>
                            </div>

                            <div className="w-full grid grid-cols-1 gap-4">
                                <Link
                                    href="/auth/signup?role=freelancer"
                                    className="w-full p-4 border border-black rounded-lg flex flex-col justify-start items-start gap-2 text-left hover:border-[#099639] hover:bg-[#099639]/5 transition group"
                                >
                                    <span className="text-[18px] font-medium text-black group-hover:text-[#099639] transition-colors">Student</span>
                                    <span className="text-sm font-normal text-gray-600 leading-normal">Find and apply jobs; build your profile.</span>
                                </Link>

                                <Link
                                    href="/auth/signup?role=client"
                                    className="w-full p-4 border border-black rounded-lg flex flex-col justify-start items-start gap-2 text-left hover:border-[#099639] hover:bg-[#099639]/5 transition group"
                                >
                                    <span className="text-[18px] font-medium text-black group-hover:text-[#099639] transition-colors">Faculty / Staff</span>
                                    <span className="text-sm font-normal text-gray-600 leading-normal">Post jobs and hire students.</span>
                                </Link>
                            </div>
                        </section>
                    ) : (
                        /*State B: Inputs Form Details*/
                        <>
                            {/* Role Summary Banner */}
                            <div className="w-full min-h-27.5 p-4.5 border border-[#D9D9D9] rounded-lg flex items-center justify-between gap-4">
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <span className="text-sm text-gray-500">Signing up as</span>
                                    <strong className="text-lg font-semibold text-black">{roleCopy.label}</strong>
                                    <span className="text-sm text-gray-600">{roleCopy.description}</span>
                                </div>
                                <Link href="/auth/signup" className="text-sm text-black underline self-start hover:opacity-70 transition-opacity shrink-0">
                                    Change
                                </Link>
                            </div>

                            {/* Main Inputs Wrapper Container */}
                            <div className="w-full p-4 sm:p-4.5 border border-[#D3D3D3] rounded-[5px]">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                                    
                                    {errors.formError && (
                                        <p role="alert" className="text-sm text-red-600">{errors.formError}</p>
                                    )}

                                    {/* Full Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="fullName" className="text-[16px] font-normal text-black">Full Name</label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            value={data.fullName}
                                            onChange={e => setData('fullName', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.fullName && <span role="alert" className="text-xs text-red-600">{errors.fullName}</span>}
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-[16px] font-normal text-black">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.email && <span role="alert" className="text-xs text-red-600">{errors.email}</span>}
                                    </div>

                                    {/* Organization Unit (College/Office) */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="orgUnit" className="text-[16px] font-normal text-black">{roleCopy.orgFieldLabel}</label>
                                        <input
                                            id="orgUnit"
                                            type="text"
                                            value={data.orgUnit}
                                            placeholder={roleCopy.orgFieldPlaceholder}
                                            onChange={e => setData('orgUnit', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.orgUnit && <span role="alert" className="text-xs text-red-600">{errors.orgUnit}</span>}
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password" className="text-[16px] font-normal text-black">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-[16px] font-normal text-black">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.email && <span role="alert" className="text-xs text-red-600">{errors.email}</span>}
                                    </div>

                                    {/* Organization Unit (College/Office) */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="orgUnit" className="text-[16px] font-normal text-black">{roleCopy.orgFieldLabel}</label>
                                        <input
                                            id="orgUnit"
                                            type="text"
                                            value={data.orgUnit}
                                            placeholder={roleCopy.orgFieldPlaceholder}
                                            onChange={e => setData('orgUnit', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.orgUnit && <span role="alert" className="text-xs text-red-600">{errors.orgUnit}</span>}
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password" className="text-[16px] font-normal text-black">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        <span className="text-xs text-gray-500">At least 8 characters.</span>
                                        {errors.password && <span role="alert" className="text-xs text-red-600">{errors.password}</span>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="confirmPassword" className="text-[16px] font-normal text-black">Confirm Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={data.confirmPassword}
                                            onChange={e => setData('confirmPassword', e.target.value)}
                                            className="w-full h-12.5 px-4 text-base border border-black rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {errors.confirmPassword && <span role="alert" className="text-xs text-red-600">{errors.confirmPassword}</span>}
                                    </div>

                                    {/* Terms and Agreements Checkbox */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="flex items-start gap-2 text-sm text-black cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.agreedToTerms}
                                                onChange={e => setData('agreedToTerms', e.target.checked)}
                                                className="mt-1 rounded accent-[#099639]"
                                            />
                                            <span>
                                                I agree to the <Link href="/" className="underline hover:opacity-70 transition-opacity">terms of use</Link>.
                                            </span>
                                        </label>
                                        {errors.agreedToTerms && <span role="alert" className="text-xs text-red-600">{errors.agreedToTerms}</span>}
                                    </div>

                                    {/* Submit Action Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12.5 bg-[#099639] hover:bg-[#088231] active:bg-[#07702a] disabled:opacity-50 text-white text-[18px] font-medium rounded-[10px] transition-colors cursor-pointer flex items-center justify-center"
                                    >
                                        {processing ? 'Creating account...' : 'Create account'}
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
