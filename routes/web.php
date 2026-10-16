<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Client\DashboardController as ClientDashboard;
use App\Http\Controllers\Freelancer\DashboardController as FreelancerDashboard;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\LoginRedirectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 🌐 1. PUBLIC LANDING HOMEPAGE ENTRY POINT
Route::get('/', function () {
    return Inertia::render('welcome');
});

// 🔑 2. GUEST SYSTEM AUTHENTICATION VISUAL PATHS
Route::middleware('guest')->group(function () {
    Route::get('/auth/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::get('/auth/signup', function (Request $request) {
        return Inertia::render('auth/signup', [
            'role' => $request->query('role')
        ]);
    })->name('signup');
});

// 📋 3. UNIFIED MARKETPLACE SEARCHABLE GIG BOARD HUB
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');

// 🔒 4. PROTECTED USER WORKSPACE INTERFACES (Requires Authentication)
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', LoginRedirectController::class)->name('dashboard');

    // 🖥️ ADMINISTRATOR PLATFORM ACCESS RULE
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [AdminDashboard::class, 'index'])->name('admin.dashboard');
    });

    // 👔 CLIENT / FACULTY PORTAL ACCESS RULES
    Route::middleware(['role:client'])->group(function () {
        Route::get('/client/dashboard', [ClientDashboard::class, 'index'])->name('client.dashboard');
        Route::get('/client/create-job', [JobController::class, 'create'])->name('client.create-job');
        Route::post('/client/create-job', [JobController::class, 'store'])->name('client.store');
        Route::get('/client/job-detail/{jobId}', [JobController::class, 'show'])->name('client.job-detail');    
        Route::put('/client/jobs/{jobId}', [JobController::class, 'update'])->name('client.jobs.update');
        Route::put('/client/applications/{applicationId}', [ApplicationController::class, 'update'])->name('client.applications.update');

        Route::get('/client/profile', function () {
            return Inertia::render('client/profile');
        })->name('client.profile');
    });

    // 🎓 STUDENT / FREELANCER PORTAL ACCESS RULES
    Route::middleware(['role:freelancer'])->group(function () {
        Route::get('/freelancer/dashboard', [FreelancerDashboard::class, 'index'])->name('freelancer.dashboard');
        
        // 📋 1. FIXED APPLICATIONS ROUTE
        Route::get('/freelancer/applications', function () {
            $user = auth()->user();

            // The variable must be declared inside this specific function closure block
            $myApplications = \App\Models\Application::where('freelancer_id', $user->id)
                    ->with(['job.client'])
                    ->latest()
                    ->get()
                    ->map(function ($app) {
                        return [
                            'id'          => $app->id,
                            'job_id'      => $app->job_id,
                            'job_title'   => $app->job->title ?? 'Deleted Gig Posting',
                            'pitch'       => $app->message ?? 'No proposal text provided.', 
                            'status'      => $app->status,
                            'applied_at'  => \Carbon\Carbon::parse($app->created_at)->toFormattedDateString(),
                            'job' => [
                                'id'          => $app->job_id,
                                'title'       => $app->job->title ?? 'Deleted Gig Posting',
                                'budget'      => $app->job->budget ?? 0,
                                'client_name' => $app->job->client->full_name ?? 'Faculty Member',
                            ]
                        ];
                    });

            return Inertia::render('freelancer/application', [
                'applications' => $myApplications
            ]);
        })->name('freelancer.applications');

        Route::get('/freelancer/job/{jobId}', [JobController::class, 'show'])->name('freelancer.job-detail');
        Route::post('/freelancer/jobs/{jobId}/apply', [ApplicationController::class, 'store'])->name('freelancer.applications.store');

        // 👤 2. FIXED PROFILE ROUTE
        Route::get('/freelancer/profile', function () {
            $user = auth()->user();

            return Inertia::render('freelancer/profile', [
                'currentUser' => [
                    'fullName'  => $user->full_name,
                    'email'     => $user->email,
                ],
                'metrics' => [
                    'totalApplications' => $user->applications()->count(),
                ]
            ]);
        })->name('freelancer.profile');
    });

    Route::get('/freelancer/job/{jobId}', [JobController::class, 'show'])->name('freelancer.job-detail');
    Route::post('/freelancer/jobs/{jobId}/apply', [ApplicationController::class, 'store'])->name('freelancer.applications.store');
    
    // ...
});
