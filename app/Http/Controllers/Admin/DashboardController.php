<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Job;
use App\Models\Application;
use App\Models\JobReport; 
use Inertia\Inertia;
use Inertia\Response;


class DashboardController extends Controller
{
    /**
     * Display the admin control matrix.
     */
    public function index(): Response
    {
        // Replaces Admin::stats() using modern Eloquent counts
        $stats = [
            'totalUsers'          => User::count(),
            'totalFreelancers'    => User::role('freelancer')->count(),
            'totalClients'        => User::role('client')->count(),
            'totalJobPosts'       => Job::count(),
            'openJobPosts'        => Job::where('status', 'open')->count(),
            'closedJobPosts'      => Job::whereIn('status', ['closed', 'completed'])->count(),
            'totalApplications'   => Application::count(),
            'pendingApplications' => Application::where('status', 'pending')->count(),
            'acceptedApplications'=> Application::where('status', 'accepted')->count(),
        ];

        // Replaces Admin::getJobReports()
        $reports = JobReport::with(['job', 'reporter'])
            ->latest() 
            ->get()
            ->map(fn($report) => [
                'id'           => $report->id,
                'jobId'        => $report->job_id,
                'jobTitle'     => $report->job->title ?? 'N/A',
                'reasonLabel'  => $report->reason,
                'reporterName' => $report->reporter->full_name ?? 'N/A', 
                'reporterRole' => $report->reporter->roles->first()?->name,
                'note'         => $report->note,
                'reportedAt'   => $report->created_at,
                'status'       => $report->status,
            ]);
        // Push data straight down into resources/js/pages/admin/dashboard.jsx
        return Inertia::render('admin/dashboard', [
            'stats'   => $stats,
            'reports' => $reports,
        ]);
    }
}
