import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function AdminDashboard({ stats, reports: initialReports, liveMessage }) {
    // 1. Core States managed correctly inside function boundaries
    const [activeTab, setActiveTab] = useState('pending');
    const [expandedReportId, setExpandedReportId] = useState(null);
    const [reports, setReports] = useState(initialReports || []);

    const pendingCount = reports.filter(r => r.status === 'pending').length;

    const visibleReports = reports.filter(report => {
        if (activeTab === 'all') return true;
        return report.status === activeTab;
    });

    const toggleExpandReport = (id) => {
        setExpandedReportId(expandedReportId === id ? null : id);
    };

    const handleResolveReport = (e, reportId) => {
        e.preventDefault();
        router.post(`/admin/reports/${reportId}/resolve`, {}, {
            onSuccess: () => {
                setReports(reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
            }
        });
    };

    // Helper to replace the old PHP date formatter function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Head title="Admin Dashboard - URaket" />

            {/* Navigation Header Section */}
            <header className="w-full border-b">
                <div className="max-w-360 mx-auto px-20 h-24 flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                        <Link href="/" className="text-xl font-semibold tracking-tight">URaket</Link>
                        <span className="text-sm text-gray-500">Admin</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.post('/logout')}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border border-[#D3D3D3] rounded-[6px] transition-all cursor-pointer hover:bg-green-500 hover:text-white"
                    >
                        Log out
                    </button>
                </div>
            </header>

            {/* Main Application Body Workspace Container */}
            <main className="flex-1">
                <div className="max-w-360 mx-auto px-20 py-16 flex flex-col gap-16">

                    {liveMessage && (
                        <p role="status" className="text-sm text-green-600">
                            {liveMessage}
                        </p>
                    )}

                    {/* Page Heading Title block */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <p className="text-sm text-gray-500">Platform-wide activity and moderation.</p>
                    </div>

                    {/* Aggregate Counter Grid Section */}
                    <section aria-labelledby="stats-heading" className="flex flex-col gap-6">
                        <h2 id="stats-heading" className="text-lg font-medium">Counts</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            
                            {/* Users metric card */}
                            <div className="border p-5 flex flex-col gap-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Users</span>
                                <span className="text-3xl font-semibold">{stats?.totalUsers || 0}</span>
                                <dl className="flex flex-col gap-1 border-t pt-2 mt-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Freelancers</dt>
                                        <dd className="text-xs font-medium">{stats?.totalFreelancers || 0}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Clients</dt>
                                        <dd className="text-xs font-medium">{stats?.totalClients || 0}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Job posts metric card */}
                            <div className="border p-5 flex flex-col gap-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Job posts</span>
                                <span className="text-3xl font-semibold">{stats?.totalJobPosts || 0}</span>
                                <dl className="flex flex-col gap-1 border-t pt-2 mt-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Open</dt>
                                        <dd className="text-xs font-medium">{stats?.openJobPosts || 0}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Closed</dt>
                                        <dd className="text-xs font-medium">{stats?.closedJobPosts || 0}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Applications metric card */}
                            <div className="border p-5 flex flex-col gap-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Applications</span>
                                <span className="text-3xl font-semibold">{stats?.totalApplications || 0}</span>
                                <dl className="flex flex-col gap-1 border-t pt-2 mt-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Pending</dt>
                                        <dd className="text-xs font-medium">{stats?.pendingApplications || 0}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-xs text-gray-500">Accepted</dt>
                                        <dd className="text-xs font-medium">{stats?.acceptedApplications || 0}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Pending reports metric card */}
                            <div className="border p-5 flex flex-col gap-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Pending reports</span>
                                <span className="text-3xl font-semibold text-red-600">{pendingCount}</span>
                            </div>
                        </div>
                    </section>

                    {/* Job Reports Mod Filters List */}
                    <section aria-labelledby="reports-heading" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-4">
                            <h2 id="reports-heading" className="text-lg font-medium">Job reports</h2>
                            
                            <div role="tablist" aria-label="Filter reports by status" className="flex gap-2">
                                {['pending', 'resolved', 'all'].map((tabId) => {
                                    const isSelected = activeTab === tabId;
                                    return (
                                        <button
                                            key={tabId}
                                            role="tab"
                                            type="button"
                                            aria-selected={isSelected}
                                            onClick={() => setActiveTab(tabId)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[6px] border transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'bg-black text-white border-black shadow-sm font-semibold'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-black'
                                            }`}
                                        >
                                            <span className="capitalize">{tabId}</span>
                                            {tabId === 'pending' && pendingCount > 0 && (
                                                <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full ${
                                                    isSelected ? 'bg-white text-black' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {pendingCount}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {visibleReports.length === 0 ? (
                            <div className="border border-dashed p-10 flex flex-col items-center gap-1 text-center bg-gray-50/20 rounded-lg">
                                <p className="text-sm font-medium">
                                    {activeTab === 'pending' ? 'No pending reports right now.' : 'No reports here.'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {activeTab === 'pending'
                                        ? 'New reports will show up here.'
                                        : 'Switch tabs to see reports in a different state.'}
                                </p>
                            </div>
                        ) : (
                            <ul className="flex flex-col border-t">
                                {visibleReports.map((report) => {
                                    const isExpanded = expandedReportId === report.id;
                                    return (
                                        <li key={report.id} className="border-b">
                                            <div className="py-4 grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-3 md:items-center">
                                                
                                                <button
                                                    type="button"
                                                    onClick={() => toggleExpandReport(report.id)}
                                                    className="text-left flex flex-col gap-1 focus:outline-none cursor-pointer"
                                                >
                                                    <span className="text-sm font-medium text-black hover:underline">{report.jobTitle}</span>
                                                    <span className="text-xs text-gray-500">Reason: {report.reasonLabel}</span>
                                                </button>

                                                <span className="text-xs text-gray-600">
                                                    Reported by {report.reporterName} ({report.reporterRole})
                                                </span>

                                                <span className="text-xs text-gray-500">
                                                    {formatDate(report.reportedAt)} · <span className="capitalize">{report.status}</span>
                                                </span>

                                                <div className="justify-self-start md:justify-self-end">
                                                    {report.status === 'pending' ? (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleResolveReport(e, report.id)}
                                                            className="text-xs px-4 py-2 border rounded bg-white text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
                                                        >
                                                            Mark resolved
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                                                            Resolved
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="pb-4 flex flex-col gap-2 text-sm max-w-2xl pl-4 border-l border-gray-200 ml-1">
                                                    <p>
                                                        <strong>Job: </strong>
                                                        <Link href={`/admin/jobs/${report.jobId}`} className="underline text-blue-600 font-medium">
                                                            View job detail
                                                        </Link>
                                                    </p>
                                                    <p>
                                                        <strong>Reporter's note: </strong>
                                                        <span className="italic text-gray-600">
                                                            {report.note ? report.note : 'No additional note provided.'}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}