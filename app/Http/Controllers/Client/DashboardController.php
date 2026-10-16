<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the Client / Faculty Dashboard Hub.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // 1. Fetch jobs posted by this faculty client along with an aggregate count of applications
        $jobs = Job::where('client_id', $user->id)
            ->withCount(['applications', 'applications as pending_applications_count' => function ($query) {
                $query->where('status', 'pending');
            }])
            ->latest()
            ->get();

        // 2. Format a structured jobs payload array for the frontend loop matrix
        $jobsPayload = $jobs->map(function ($job) {
            return [
                'id'                => $job->id, // FIXED: Explicitly includes the primary key ID field parameter!
                'title'             => $job->title,
                'status'            => $job->status ?? 'open',
                'budget'            => $job->budget,
                'category'          => $job->job_type ?? 'Service',
                'postedAt'          => $job->created_at ? $job->created_at->diffForHumans() : 'Just now',
                'applicationsCount' => $job->applications_count,
                'pendingCount'      => $job->pending_applications_count,
            ];
        });

        // 3. Render directly using Inertia parameters matching your components matrix
        return Inertia::render('client/dashboard', [
            'jobs'              => $jobsPayload,
            'totalJobs'         => $jobs->count(),
            'totalApplications' => $jobs->sum('applications_count'),
        ]);
    }
}
