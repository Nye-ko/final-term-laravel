import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function ClientProfile({ client, postedJobs = [] }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
            <Head title="Client Profile | URaket" />
            <header className="w-full border-b bg-white sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">URaket</Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/client/dashboard" className="text-sm font-semibold text-gray-600 hover:text-black">Dashboard</Link>
                        <button onClick={() => router.post('/logout')} className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">Log out</button>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
                <section className="border-b border-gray-200 pb-4">
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Client Account</p>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profile</h1>
                </section>

                <section className="bg-white border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold rounded-full select-none">{client?.name?.substring(0, 1).toUpperCase() || 'C'}</div>
                        <div><h2 className="text-lg font-bold text-gray-900">{client?.name}</h2><span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-bold uppercase tracking-wider">Client Profile</span></div>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div><span className="text-xs font-bold text-gray-400 block uppercase">Office / Department</span><p className="font-semibold mt-0.5">{client?.collegeOrOffice}</p></div>
                        <div className="md:col-span-2"> Mesozoic <span className="text-xs font-bold text-gray-400 block uppercase">About Narrative</span><p className="text-gray-600 mt-0.5 whitespace-pre-wrap">{client?.about || 'No descriptive overview listed.'}</p></div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-2">Posted Jobs ({postedJobs.length})</h2>
                    {postedJobs.length === 0 ? (
                        <div className="bg-white border border-dashed rounded-xl p-8 text-center text-sm text-gray-400">No jobs managed yet.</div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {postedJobs.map(job => (
                                <article key={job.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex justify-between items-center hover:shadow-md transition">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2"><h3 className="font-bold text-gray-900">{job.title}</h3><span className="text-[9px] uppercase tracking-wider font-bold border border-gray-200 bg-gray-50 px-2 py-0.5 rounded-full">{job.status}</span></div>
                                        <span className="text-xs text-gray-400">Budget: <strong className="text-gray-700">₱{job.budget}</strong></span>
                                    </div>
                                    <Link href={`/client/jobs/${job.id}`} className="text-xs font-bold hover:underline">View details &rarr;</Link>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
