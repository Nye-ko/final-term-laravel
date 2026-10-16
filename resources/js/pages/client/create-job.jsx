import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateJob({ skills = [], jobTypes = ['Service', 'Commission', 'Part-time'] }) {
    // 1. Inertia's native form state engine handles input mutations cleanly
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: '',
        price: '',
        description: '',
        skills: []
    });

    // 2. Tracks user click focus fields to control warning outlines safely
    const [touched, setTouched] = useState({
        title: false, type: false, price: false, description: false, skills: false
    });

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    // 3. Reactive skill limit capping rule - locks selections at exactly 5
    const handleSkillChange = (skillId) => {
        setTouched(prev => ({ ...prev, skills: true }));
        const idStr = String(skillId);
        
        if (data.skills.includes(idStr)) {
            setData('skills', data.skills.filter(id => id !== idStr));
        } else {
            if (data.skills.length < 5) {
                setData('skills', [...data.skills, idStr]);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ title: true, type: true, price: true, description: true, skills: true });
        post('/client/create-job');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Post a Job - URaket" />

            {/* Navigation Header Section */}
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
                        URaket
                    </Link>
                    <Link href="/client/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                        My job posts
                    </Link>
                </div>
            </header>

            {/* Form Workspace Body Container */}
            <main className="flex-1">
                <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-16">
                    <div className="max-w-xl flex flex-col gap-8">
                        
                        {/* Section Heading Title */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Post a job</h1>
                            <p className="text-sm text-gray-500">
                                Students will see this on the job board and can apply directly.
                            </p>
                        </div>

                        {/* Interactive Form Panel */}
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                            
                            {/* Job Title Text Input Field */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    onBlur={() => handleBlur('title')}
                                    placeholder="e.g. Logo design for student org"
                                    className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${
                                        (touched.title && (errors.title || !data.title)) ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                                    }`}
                                />
                                {(touched.title && (errors.title || !data.title)) && (
                                    <span role="alert" className="text-xs text-red-500 font-medium">
                                        {errors.title || 'Give the job a title.'}
                                    </span>
                                )}
                            </div>

                            {/* Job Type Option Dropdown Selection */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="type" className="text-sm font-semibold text-gray-700">Job type</label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    onBlur={() => handleBlur('type')}
                                    className={`border px-3 py-2 text-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#099639] ${
                                        (touched.type && (errors.type || !data.type)) ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                                    }`}
                                >
                                    <option value="">Select a type</option>
                                    {jobTypes.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {(touched.type && (errors.type || !data.type)) && (
                                    <span role="alert" className="text-xs text-red-500 font-medium">
                                        {errors.type || 'Choose a valid job type.'}
                                    </span>
                                )}
                            </div>

                            {/* Budget / Pricing Entry Input */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="price" className="text-sm font-semibold text-gray-700">Price</label>
                                <input
                                    id="price"
                                    type="text"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    onBlur={() => handleBlur('price')}
                                    placeholder="e.g. ₱1,500 or negotiable"
                                    className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${
                                        (touched.price && (errors.price || !data.price)) ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {(touched.price && (errors.price || !data.price)) && (
                                    <span role="alert" className="text-xs text-red-500 font-medium">
                                        {errors.price || "Enter a price, or note that it's negotiable."}
                                    </span>
                                )}
                            </div>

                            {/* Job Description Text Area Box */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    rows="5"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    onBlur={() => handleBlur('description')}
                                    placeholder="What does the student need to do? Any deadlines?"
                                    className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${
                                        (touched.description && (errors.description || !data.description)) ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {(touched.description && (errors.description || !data.description)) && (
                                    <span role="alert" className="text-xs text-red-500 font-medium">
                                        {errors.description || 'Add a short description.'}
                                    </span>
                                )}
                            </div>

                            {/* Interactive Skill Selection Tags (Caps selection automatically at max 5) */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">Skills needed (1–5)</label>
                                <p className="text-xs text-gray-400 font-medium mb-3">Select at least 1 and at most 5 skills layout tabs.</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => {
                                        const isChecked = data.skills.includes(String(skill.id));
                                        const isDisabled = !isChecked && data.skills.length >= 5;
                                        return (
                                            <label
                                                key={skill.id}
                                                className={`px-3 py-1.5 text-sm rounded-lg border cursor-pointer transition ${isChecked ? 'bg-[#099639] text-white border-[#099639]' : 'bg-white text-gray-700 border-gray-200'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                                                                <input
                                                    type="checkbox"
                                                    value={skill.id}
                                                    checked={isChecked}
                                                    disabled={isDisabled}
                                                    onChange={() => handleSkillChange(skill.id)}
                                                    className="sr-only"
                                                />
                                                {skill.name}
                                            </label>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-500 mt-2.5 font-semibold">
                                    {data.skills.length} / 5 selected
                                </p>
                                {(touched.skills && (errors.skills || data.skills.length === 0)) && (
                                    <span role="alert" className="text-xs text-red-500 block mt-1.5 font-medium">
                                        {errors.skills || 'Add at least 1 skill.'}
                                    </span>
                                )}
                            </div>

                            {/* Form Action Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#099639] rounded-lg px-6 py-3.5 self-start shadow-sm transition hover:bg-[#077a2e] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? 'Posting...' : 'Post job'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
