<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the student gig control board.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Replaces Freelancer::stats() array looping completely
        $stats = [
            'totalApplications'         => $user->applications()->count(),
            'totalPendingApplications'  => $user->applications()->where('status', 'pending')->count(),
            'totalAcceptedApplications' => $user->applications()->where('status', 'accepted')->count(),
            'totalRejectedApplications' => $user->applications()->where('status', 'rejected')->count(),
        ];

        // Replaces Freelancer::openJobs() mapping
        $openGigs = Job::with('client')
            ->where('status', 'open')
            ->latest()
            ->get();

        // Push data down into resources/js/pages/freelancer/dashboard.jsx
        // Push data down matching your React prop expectations exactly
        return Inertia::render('freelancer/dashboard', [
            // 1. Matches currentUser prop mapping
            'currentUser' => [
                'fullName' => $user->full_name,
            ],
            
            // 2. Load applications snapshots if any exist
            'applications' => $user->applications()
                ->with('job.client')
                ->latest()
                ->get()
                ->map(fn($app) => [
                    'id'          => $app->id,
                    'jobId'       => $app->job_id,
                    'jobTitle'    => $app->job->title ?? 'N/A',
                    'clientName'  => $app->job->client->full_name ?? 'Faculty Client',
                    'status'      => $app->status,
                ]),

            // 3. Fixed: Matches recommendedJobs prop loop mapping
            'recommendedJobs' => $openGigs->map(fn($job) => [
            'id'          => $job->id,
            'title'       => $job->title,
            'clientName'  => $job->client->full_name ?? 'Faculty Client',
            'description' => $job->description,
            'skills'      => $job->skills ?? [],
            'budget'      => $job->budget, // Added: Explicitly feeds budget column decimal string to React
            'status'      => $job->status,
        ]),
        ]);
    }
}
