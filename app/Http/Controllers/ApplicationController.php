<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    /**
     * Store a freelancer's pitch proposal submission (Step 3 E2E Workflow).
     */
    public function store(Request $request, $jobId): RedirectResponse
    {
        $user = Auth::user();

        if (!$user->hasRole('freelancer')) {
            abort(403, 'Unauthorized action. Only student freelancers can apply for gigs.');
        }

        $job = Job::where('status', 'open')->findOrFail($jobId);

        $alreadyApplied = Application::where('job_id', $job->id)
            ->where('freelancer_id', $user->id)
            ->exists();

        if ($alreadyApplied) {
            return back()->with('error', 'You have already submitted a proposal pitch for this campus gig!');
        }

        // 1. Validate the text incoming as 'message' from the updated React form
        $validated = $request->validate([
            'message' => ['required', 'string', 'min:10', 'max:1000'],
        ]);

        // 2. Securely instantiate the application row using your actual physical table structure
        Application::create([
            'job_id'        => $job->id,
            'freelancer_id' => $user->id,
            'title'         => 'Application for ' . $job->title, // Dynamically tracks application title matching column fields
            'message'       => $validated['message'],            // Saves explicitly to message column field
            'status'        => 'pending',
        ]);

        return back()->with('success', 'Your pitch application was transmitted securely to the faculty client!');
    }

    /**
     * Update a faculty client's decision on a student pitch application.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        $user = Auth::user();
        
        // Find application record along with its matching job post configuration
        $application = Application::with('job')->findOrFail($id);

        // Security authorization check: Verify the logged-in client owns this specific job posting
        if ($application->job->client_id !== $user->id) {
            abort(403, 'Unauthorized action. You do not own this job posting listing.');
        }

        // Validate choice array state targets
        $validated = $request->validate([
            'status' => ['required', Rule::in(['accepted', 'rejected'])]
        ]);

        // Update application pitch status decision matrix rules
        $application->update([
            'status' => $validated['status']
        ]);

        return back()->with('success', "Student application pitch status marked as {$validated['status']} successfully.");
    }
}
