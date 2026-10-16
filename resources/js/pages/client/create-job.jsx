import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateJob({ skills = [], jobTypes = ['Service', 'Commission', 'Part-time'] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: '',
        price: '',
        description: '',
        skills: []
    });

    const [touched, setTouched] = useState({
        title: false, type: false, price: false, description: false, skills: false
    });

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSkillChange = (skillId) => {
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
        setTouched({ title: true, type: true, price: true, description: true, skills: false });
        post('/client/create-job');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Post a Job - URaket" />
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-360 mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">URaket</Link>
                    <Link href="/client/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">My job posts</Link>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-360 mx-auto px-6 md:px-20 py-16">
                    <div className="max-w-xl flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Post a job</h1>
                            <p className="text-sm text-gray-500">Students will see this on the board and apply directly.</p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
                                <input id="title" type="text" value={data.title} onChange={e => setData('title', e.target.value)} onBlur={() => handleBlur('title')} placeholder="e.g. Logo design" className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${touched.title && (errors.title || !data.title) ? 'border-red-500' : 'border-gray-200'}`} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="type" className="text-sm font-semibold text-gray-700">Job type</label>
                                <select id="type" value={data.type} onChange={e => setData('type', e.target.value)} onBlur={() => handleBlur('type')} className={`border px-3 py-2 text-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#099639] ${touched.type && (errors.type || !data.type) ? 'border-red-500' : 'border-gray-200'}`}>
                                    <option value="">Select a type</option>
                                    {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="price" className="text-sm font-semibold text-gray-700">Price</label>
                                <input id="price" type="text" value={data.price} onChange={e => setData('price', e.target.value)} onBlur={() => handleBlur('price')} placeholder="e.g. 500" className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${touched.price && (errors.price || !data.price) ? 'border-red-500' : 'border-gray-200'}`} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea id="description" rows="5" value={data.description} onChange={e => setData('description', e.target.value)} onBlur={() => handleBlur('description')} placeholder="Job description..." className={`border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#099639] ${touched.description && (errors.description || !data.description) ? 'border-red-500' : 'border-gray-200'}`} />
                            </div>

                            <div>
                                <label htmlFor="skill-select" className="text-sm font-semibold text-gray-700 block mb-1">Skills needed (Optional)</label>
                                <p className="text-xs text-gray-400 font-medium mb-3">Choose skills from the database registry or skip this section (Max 5).</p>
                                
                                <div className="flex gap-2 mb-4 max-w-sm">
                                    <select id="skill-select" defaultValue="" onChange={(e) => { handleSkillChange(e.target.value); e.target.value = ""; }} className="flex-1 border border-gray-200 px-3 py-2 text-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#099639]">
                                        <option value="" disabled>Select a skill from registry...</option>
                                        {skills.filter(s => !data.skills.includes(String(s.id))).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {skills.filter(s => data.skills.includes(String(s.id))).map(s => (
                                        <div key={s.id} onClick={() => handleSkillChange(s.id)} className="px-3 py-1.5 text-sm rounded-lg bg-[#099639] text-white flex items-center gap-1.5 cursor-pointer hover:bg-red-600 transition">
                                            <span>{s.name}</span><span className="text-[10px] font-black">&times;</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2.5 font-semibold">{data.skills.length} / 5 selected</p>
                            </div>

                            <button type="submit" disabled={processing} className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#099639] rounded-lg px-6 py-3.5 self-start shadow-sm transition hover:bg-[#077a2e] disabled:opacity-50 cursor-pointer">
                                {processing ? 'Posting...' : 'Post job'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
