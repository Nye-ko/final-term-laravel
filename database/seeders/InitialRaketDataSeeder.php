<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InitialRaketDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. POPULATE USERS TABLE VIA STANDARD MODEL INSERTS (Allows Spatie Role Assignment)
        $password = Hash::make('Password123!');

        // Admin Accounts
        $admin1 = User::create(['id' => 1, 'full_name' => 'Admin User', 'email' => 'admin@example.com', 'password' => $password]);
        $admin1->assignRole('admin');

        // Client Accounts (Faculty & Organizations)
        $client1 = User::create(['id' => 2, 'full_name' => 'Client User', 'email' => 'client@example.com', 'password' => $password]);
        $client1->assignRole('client');

        $client2 = User::create(['id' => 3, 'full_name' => "Registrar's Office", 'email' => 'registrar@example.com', 'password' => $password]);
        $client2->assignRole('client');

        $client3 = User::create(['id' => 4, 'full_name' => 'Prof. A. Santos', 'email' => 'prof.santos@example.com', 'password' => $password]);
        $client3->assignRole('client');

        $client4 = User::create(['id' => 5, 'full_name' => 'Student Council', 'email' => 'council@example.com', 'password' => $password]);
        $client4->assignRole('client');

        // Freelancer Accounts (Students)
        $free1 = User::create(['id' => 6, 'full_name' => 'Student User', 'email' => 'student@example.com', 'password' => $password]);
        $free1->assignRole('freelancer');

        $free2 = User::create(['id' => 7, 'full_name' => 'Student User Two', 'email' => 'student01@example.com', 'password' => $password]);
        $free2->assignRole('freelancer');

        $free3 = User::create(['id' => 8, 'full_name' => 'J. Cruz', 'email' => 'j.cruz@example.com', 'password' => $password]);
        $free3->assignRole('freelancer');

        $free4 = User::create(['id' => 9, 'full_name' => 'M. Reyes', 'email' => 'm.reyes@example.com', 'password' => $password]);
        $free4->assignRole('freelancer');


        // 2. POPULATE EXTENDED USER PROFILES TABLE
        DB::table('user_profiles')->insert([
            ['user_id' => 2, 'organization' => 'Film Club', 'about' => 'Faculty member looking for reliable students for campus projects.'],
            ['user_id' => 4, 'organization' => 'Film Club', 'about' => 'Faculty member looking for reliable students for campus projects.'],
            ['user_id' => 3, 'organization' => "Registrar's Office", 'about' => null],
            ['user_id' => 5, 'organization' => 'Student Council', 'about' => null],
            ['user_id' => 6, 'organization' => 'Student', 'about' => null],
            ['user_id' => 7, 'organization' => 'Student', 'about' => null],
            ['user_id' => 8, 'organization' => 'Student', 'about' => null],
            ['user_id' => 9, 'organization' => 'Student', 'about' => null],
        ]);


        // 3. POPULATE GLOBAL LOOKUP SKILLS TABLE
        DB::table('skills')->insert([
            ['id' => 1, 'name' => 'Graphic Design', 'slug' => 'graphic-design'],
            ['id' => 2, 'name' => 'Logo Design', 'slug' => 'logo-design'],
            ['id' => 3, 'name' => 'Web Development', 'slug' => 'web-development'],
            ['id' => 4, 'name' => 'Programming', 'slug' => 'programming'],
            ['id' => 5, 'name' => 'Data Entry', 'slug' => 'data-entry'],
            ['id' => 6, 'name' => 'Photography', 'slug' => 'photography'],
            ['id' => 7, 'name' => 'Video Editing', 'slug' => 'video-editing'],
            ['id' => 8, 'name' => 'Writing', 'slug' => 'writing'],
            ['id' => 9, 'name' => 'Social Media', 'slug' => 'social-media'],
            ['id' => 10, 'name' => 'Tutoring', 'slug' => 'tutoring'],
        ]);


        // 4. POPULATE USER SKILLS PIVOT TABLE
        DB::table('user_skills')->insert([
            ['user_id' => 6, 'skill_id' => 4],
            ['user_id' => 7, 'skill_id' => 1], 
            ['user_id' => 7, 'skill_id' => 7],
            ['user_id' => 8, 'skill_id' => 1], 
            ['user_id' => 8, 'skill_id' => 2],
            ['user_id' => 9, 'skill_id' => 6],
        ]);


        // 5. POPULATE MARKETPLACE JOBS/GIGS TABLE
        DB::table('jobs')->insert([
            ['id' => 1, 'client_id' => 4, 'title' => 'Poster design for orientation week', 'job_type' => 'Service', 'budget' => 1500, 'description' => 'Create promotional artwork for the upcoming student orientation.', 'status' => 'open', 'deadline' => '2026-08-30'],
            ['id' => 2, 'client_id' => 4, 'title' => 'Short promo video for the film club', 'job_type' => 'Commission', 'budget' => 2500, 'description' => 'Edit a short promotional video for an upcoming campus screening.', 'status' => 'open', 'deadline' => null],
            ['id' => 3, 'client_id' => 5, 'title' => 'Student organization website', 'job_type' => 'Service', 'budget' => 5000, 'description' => 'Build and maintain a simple website for a student organization.', 'status' => 'open', 'deadline' => null],
            ['id' => 4, 'client_id' => 2, 'title' => 'Logo design for student org', 'job_type' => 'Design', 'budget' => 1500, 'description' => 'Create a clean and simple logo for a student organization.', 'status' => 'open', 'deadline' => null],
            ['id' => 5, 'client_id' => 3, 'title' => 'Data entry - 10 hrs/week', 'job_type' => 'Part-time', 'budget' => 3000, 'description' => 'Help organize and encode campus-related data.', 'status' => 'open', 'deadline' => null],
            ['id' => 6, 'client_id' => 2, 'title' => 'Event Flyer Design', 'job_type' => 'Design & Creative', 'budget' => 100, 'description' => 'Create a flyer for a campus event.', 'status' => 'closed', 'deadline' => null],
            ['id' => 7, 'client_id' => 2, 'title' => 'Poster design for orientation week duplicate', 'job_type' => 'Service', 'budget' => 1500, 'description' => 'Create promotional artwork for the upcoming student orientation.', 'status' => 'open', 'deadline' => '2026-08-30'],
            ['id' => 8, 'client_id' => 2, 'title' => 'Short promo video for the film club active', 'job_type' => 'Commission', 'budget' => 2500, 'description' => 'Edit a short promotional video for an upcoming campus screening.', 'status' => 'completed', 'deadline' => null],
            ['id' => 9, 'client_id' => 3, 'title' => 'Data entry - 10 hrs/week registrar', 'job_type' => 'Part-time', 'budget' => 3000, 'description' => 'Assist with data entry tasks for the registrar.', 'status' => 'closed', 'deadline' => null],
            ['id' => 10, 'client_id' => 2, 'title' => 'Photography for campus event', 'job_type' => 'Service', 'budget' => 1800, 'description' => 'Take photographs for a campus event.', 'status' => 'open', 'deadline' => null],
        ]);


        // 6. POPULATE JOB SKILLS PIVOT TABLE
        DB::table('job_skills')->insert([
            ['job_id' => 1, 'skill_id' => 1], 
            ['job_id' => 2, 'skill_id' => 7], 
            ['job_id' => 3, 'skill_id' => 4], 
            ['job_id' => 3, 'skill_id' => 8],
            ['job_id' => 4, 'skill_id' => 2], 
            ['job_id' => 5, 'skill_id' => 5], 
            ['job_id' => 7, 'skill_id' => 1],
            ['job_id' => 8, 'skill_id' => 7], 
            ['job_id' => 9, 'skill_id' => 5], 
            ['job_id' => 10, 'skill_id' => 6],
        ]);


        // 7. POPULATE FREELANCER GIG APPLICATIONS TABLE
        DB::table('applications')->insert([
            ['id' => 1, 'job_id' => 2, 'freelancer_id' => 7, 'title' => 'Video editing application', 'message' => 'I can edit the promotional video for the film club.', 'status' => 'completed'],
            ['id' => 2, 'job_id' => 1, 'freelancer_id' => 7, 'title' => 'Poster design application', 'message' => 'I would love to create the orientation poster.', 'status' => 'pending'],
            ['id' => 3, 'job_id' => 9, 'freelancer_id' => 7, 'title' => 'Data entry application', 'message' => 'I am interested in helping with the data entry work.', 'status' => 'rejected'],
            ['id' => 4, 'job_id' => 4, 'freelancer_id' => 8, 'title' => 'I can create the requested logo.', 'message' => 'I have experience creating logos for student organizations.', 'status' => 'pending'],
            ['id' => 5, 'job_id' => 5, 'freelancer_id' => 9, 'title' => 'I can assist with data entry.', 'message' => 'I am available to help with the data entry tasks.', 'status' => 'pending'],
        ]);
    }
}
