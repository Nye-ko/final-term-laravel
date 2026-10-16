<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//LANDING HOMEPAGE ENTRY POINT

Route::get('/', function () {
    return Inertia::render('welcome');
});


//  SYSTEM AUTHENTICATION VISUAL PATHS
Route::get('/auth/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/auth/signup', function (Request $request) {
    return Inertia::render('auth/signup', [
        'role' => $request->query('role')
    ]);
})->name('signup');


//  CLIENT / FACULTY PORTAL INTERFACES
Route::get('/client/dashboard', function () {
    return Inertia::render('client/dashboard');
})->name('client.dashboard');

Route::get('/client/create-job', function () {
    return Inertia::render('client/create-job');
})->name('client.create-job');

Route::get('/client/jobs/{jobId}', function ($jobId) {
    return Inertia::render('client/job-detail', [
        'jobId' => $jobId
    ]);
})->name('client.job-detail');

Route::get('/client/profile', function () {
    return Inertia::render('client/profile');
})->name('client.profile');


//  STUDENT / FREELANCER PORTAL INTERFACES
Route::get('/freelancer/dashboard', function () {
    return Inertia::render('freelancer/dashboard');
})->name('freelancer.dashboard');

Route::get('/freelancer/applications', function () {
    return Inertia::render('freelancer/applications');
})->name('freelancer.applications');

Route::get('/freelancer/jobs/{jobId}', function ($jobId) {
    return Inertia::render('freelancer/job-detail', [
        'jobId' => $jobId
    ]);
})->name('freelancer.job-detail');

Route::get('/freelancer/profile', function () {
    return Inertia::render('freelancer/profile');
})->name('freelancer.profile');


// 📋 UNIFIED MARKETPLACE SEARCHABLE GIG BOARD HUB
Route::get('/jobs', function () {
    return Inertia::render('jobs/index');
})->name('jobs.index');


//  ADMINISTRATOR PLATFORM VIEW
Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/dashboard');
})->name('admin.dashboard');
