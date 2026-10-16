<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Skill;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class JobController extends Controller
{
    public function index(Request $request): Response
    {
        $jobs = Job::with(['client', 'skills'])->where('status', 'open')->latest()->get();
        return Inertia::render('jobs/index', ['jobs' => $jobs]);
    }

    public function create(): Response
    {
        return Inertia::render('client/create-job', [
            'skills' => Skill::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title'       => ['required', 'string', 'max:200'],
            'type'        => ['required', 'string', 'max:60'],
            'price'       => ['required', 'numeric', 'min:1'],
            'description' => ['required', 'string'],
            'skills'      => ['nullable', 'array', 'max:5'], 
            'skills.*'    => ['exists:skills,id'],
        ]);

        $job = Job::create([
            'client_id'   => Auth::id(),
            'title'       => $request->title,
            'job_type'    => $request->type,         
            'budget'      => $request->price,        
            'description' => $request->description,
            'status'      => 'open',
        ]);

        if ($request->has('skills') && !empty($request->skills)) {
            $job->skills()->sync($request->skills);
        }

        return redirect()->route('client.dashboard')
            ->with('success', 'Gig posting published successfully!');
    }

        public function show($jobId)
    {
        $user = Auth::user();
        
        // 1. Fetch the job post with its client info or fail with a 404 error
        $job = Job::with('client:id,full_name,email')->findOrFail($jobId);

        $jobPayload = [
            'id'          => $job->id,
            'title'       => $job->title,
            'job_type'    => $job->job_type,
            'description' => $job->description,
            'budget'      => $job->budget,
            'status'      => $job->status,
            'created_at'  => \Carbon\Carbon::parse($job->created_at)->toFormattedDateString(),
            'client'      => [
                'id'        => $job->client->id ?? 0,
                'full_name' => $job->client->full_name ?? 'Faculty Member (Account Inactive)',
                'email'     => $job->client->email ?? 'noreply@clsu.edu.ph',
            ]
        ];

        // 👔 INTERFACE DIRECTION A: Client / Faculty Workspace (Sees all applicants)
        if ($user->hasRole('client')) {
            $applicationsPayload = \App\Models\Application::where('job_id', $job->id)
                ->join('users', 'applications.freelancer_id', '=', 'users.id')
                ->select(
                    'applications.id as id',
                    'applications.title as app_title',                     
                    'applications.message as message',                   
                    'applications.status as status',                    
                    'applications.created_at as created_at',
                    'users.id as student_id',
                    'users.full_name as student_name',
                    'users.email as student_email'
                )
                ->latest('applications.created_at')
                ->get()
                ->map(function ($app) {
                    return [
                        'id'         => $app->id,
                        // Formats the pitch nicely for your JobDetail UI view
                        'pitch'      => ($app->app_title || $app->message) 
                                            ? trim(($app->app_title ? "{$app->app_title}: " : "") . $app->message) 
                                            : 'No description proposal pitch provided.',
                        'status'     => $app->status,
                        'applied_at' => $app->created_at ? \Carbon\Carbon::parse($app->created_at)->toFormattedDateString() : 'Recently',
                        'freelancer' => [
                            'id'        => $app->student_id,
                            'full_name' => $app->student_name,
                            'email'     => $app->student_email,
                        ]
                    ];
                });

            // Renders resources/js/Pages/client/job-detail.jsx
            return Inertia::render('client/job-detail', [
                'job'          => $jobPayload,
                'applications' => $applicationsPayload,
            ]);
        }

        // 🎓 INTERFACE DIRECTION B: Student / Freelancer Workspace (Sees only their own application status)
        $hasApplied = false;
        
        $existingApplication = [
            'id'         => null,
            'pitch'      => '',
            'status'     => 'pending',
            'applied_at' => '',
        ];

        $application = Application::where('job_id', $job->id)
            ->where('freelancer_id', $user->id)
            ->first();

        if ($application) {
            $hasApplied = true;
            $existingApplication = [
                'id'         => $application->id,
                'pitch'      => $application->message ?? $application->pitch ?? 'No text provided.',
                'status'     => $application->status,
                'applied_at' => \Carbon\Carbon::parse($application->created_at)->toFormattedDateString(),
            ];
        }

        // Renders resources/js/Pages/freelancer/job-detail.jsx
        return Inertia::render('freelancer/job-detail', [
            'job'                 => array_merge($jobPayload, ['jobId' => $job->id]),
            'hasApplied'          => $hasApplied,
            'existingApplication' => $existingApplication, 
        ]);
    }


    public function update(Request $request, $id): RedirectResponse
    {
        $job = Job::findOrFail($id);
        if ($job->client_id !== Auth::id()) { abort(403); }
        
        // Validates open, closed, and your new completed state matrix securely
        $validated = $request->validate([
            'status' => ['required', \Illuminate\Validation\Rule::in(['open', 'closed', 'completed'])]
        ]);
        
        $job->update(['status' => $validated['status']]);
        
        return back()->with('success', 'Job status updated.');
    }
    
}
