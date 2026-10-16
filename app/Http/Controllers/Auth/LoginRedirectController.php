<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class LoginRedirectController extends Controller
{
    /**
     * Dynamically route authenticated users to their specific platform workspace deck.
     */
    public function __invoke(): RedirectResponse
    {
        $user = Auth::user();

        if ($user->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->hasRole('client')) {
            return redirect()->route('client.dashboard');
        }

        if ($user->hasRole('freelancer')) {
            return redirect()->route('freelancer.dashboard');
        }

        // Fallback safety endpoint rule if no active role is attached
        return redirect()->route('jobs.index');
    }
}
