<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InitialRaketDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            ['id' => 'admin-1', 'role' => 'admin', 'full_name' => 'Admin User', 'email' => 'admin@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'client-1', 'role' => 'client', 'full_name' => 'Client User', 'email' => 'client@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'client-2', 'role' => 'client', 'full_name' => "Registrar's Office", 'email' => 'registrar@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'client-01', 'role' => 'client', 'full_name' => 'Prof. A. Santos', 'email' => 'prof.santos@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'client-02', 'role' => 'client', 'full_name' => 'Student Council', 'email' => 'council@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'freelancer-1', 'role' => 'freelancer', 'full_name' => 'Student User', 'email' => 'student@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'freelancer-01', 'role' => 'freelancer', 'full_name' => 'Student User', 'email' => 'student01@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'freelancer-02', 'role' => 'freelancer', 'full_name' => 'J. Cruz', 'email' => 'j.cruz@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
            ['id' => 'freelancer-03', 'role' => 'freelancer', 'full_name' => 'M. Reyes', 'email' => 'm.reyes@example.com', 'password_hash' => '$2y$10$BMKGiZFl8C52PkjpF9gWIOTjQ64biLGpWfzbc2VByaVzigOWyXwc.'],
        ]);

        DB::table('user_profiles')->insert([
            ['user_id' => 'client-1', 'organization' => 'Film Club', 'about' => 'Faculty member looking for reliable students for campus projects.'],
            ['user_id' => 'client-01', 'organization' => 'Film Club', 'about' => 'Faculty member looking for reliable students for campus projects.'],
            ['user_id' => 'client-2', 'organization' => "Registrar's Office", 'about' => null],
            ['user_id' => 'client-02', 'organization' => 'Student Council', 'about' => null],
            ['user_id' => 'freelancer-1', 'organization' => 'Student', 'about' => null],
            ['user_id' => 'freelancer-01', 'organization' => 'Student', 'about' => null],
            ['user_id' => 'freelancer-02', 'organization' => 'Student', 'about' => null],
            ['user_id' => 'freelancer-03', 'organization' => 'Student', 'about' => null],
        ]);

        DB::table('skills')->insert([
            ['id' => 'skill-1', 'name' => 'Graphic Design'], ['id' => 'skill-2', 'name' => 'Logo Design'],
            ['id' => 'skill-3', 'name' => 'Web Development'], ['id' => 'skill-4', 'name' => 'Programming'],
            ['id' => 'skill-5', 'name' => 'Data Entry'], ['id' => 'skill-6', 'name' => 'Photography'],
            ['id' => 'skill-7', 'name' => 'Video Editing'], ['id' => 'skill-8', 'name' => 'Writing'],
            ['id' => 'skill-9', 'name' => 'Social Media'], ['id' => 'skill-10', 'name' => 'Tutoring'],
        ]);

        DB::table('user_skills')->insert([
            ['user_id' => 'freelancer-1', 'skill_id' => 'skill-4'],
            ['user_id' => 'freelancer-01', 'skill_id' => 'skill-1'], ['user_id' => 'freelancer-01', 'skill_id' => 'skill-7'],
            ['user_id' => 'freelancer-02', 'skill_id' => 'skill-1'], ['user_id' => 'freelancer-02', 'skill_id' => 'skill-2'],
            ['user_id' => 'freelancer-03', 'skill_id' => 'skill-6'],
        ]);

        DB::table('jobs')->insert([
            ['id' => 'job-101', 'client_id' => 'client-01', 'title' => 'Poster design for orientation week', 'job_type' => 'Service', 'budget' => 1500, 'description' => 'Create promotional artwork for the upcoming student orientation.', 'status' => 'open', 'deadline' => '2026-08-30', 'posted_at' => '2026-08-12 10:00:00'],
            ['id' => 'job-102', 'client_id' => 'client-01', 'title' => 'Short promo video for the film club', 'job_type' => 'Commission', 'budget' => 2500, 'description' => 'Edit a short promotional video for an upcoming campus screening.', 'status' => 'open', 'deadline' => null, 'posted_at' => '2026-07-28 10:00:00'],
            ['id' => 'job-103', 'client_id' => 'client-02', 'title' => 'Student organization website', 'job_type' => 'Service', 'budget' => 5000, 'description' => 'Build and maintain a simple website for a student organization.', 'status' => 'open', 'deadline' => null, 'posted_at' => '2026-08-01 10:00:00'],
            ['id' => 'j-102', 'client_id' => 'client-1', 'title' => 'Logo design for student org', 'job_type' => 'Design', 'budget' => 1500, 'description' => 'Create a clean and simple logo for a student organization.', 'status' => 'open', 'deadline' => null, 'posted_at' => '2026-08-10 09:15:00'],
            ['id' => 'j-098', 'client_id' => 'client-2', 'title' => 'Data entry - 10 hrs/week', 'job_type' => 'Part-time', 'budget' => 3000, 'description' => 'Help organize and encode campus-related data.', 'status' => 'open', 'deadline' => null, 'posted_at' => '2026-08-08 14:40:00'],
            ['id' => 'j-075', 'client_id' => 'client-1', 'title' => 'Event Flyer Design', 'job_type' => 'Design & Creative', 'budget' => 100, 'description' => 'Create a flyer for a campus event.', 'status' => 'closed', 'deadline' => null, 'posted_at' => '2026-07-20 09:15:00'],
            ['id' => 'job-orientation-02', 'client_id' => 'client-1', 'title' => 'Poster design for orientation week', 'job_type' => 'Service', 'budget' => 1500, 'description' => 'Create promotional artwork for the upcoming student orientation.', 'status' => 'open', 'deadline' => '2026-08-30', 'posted_at' => '2026-08-12 10:00:00'],
            ['id' => 'job-film-01', 'client_id' => 'client-1', 'title' => 'Short promo video for the film club', 'job_type' => 'Commission', 'budget' => 2500, 'description' => 'Edit a short promotional video for an upcoming campus screening.', 'status' => 'completed', 'deadline' => null, 'posted_at' => '2026-07-28 10:00:00'],
            ['id' => 'job-data-03', 'client_id' => 'client-2', 'title' => 'Data entry - 10 hrs/week', 'job_type' => 'Part-time', 'budget' => 3000, 'description' => 'Assist with data entry tasks for the registrar.', 'status' => 'closed', 'deadline' => null, 'posted_at' => '2026-07-15 09:00:00'],
            ['id' => 'j-081', 'client_id' => 'client-1', 'title' => 'Photography for campus event', 'job_type' => 'Service', 'budget' => 1800, 'description' => 'Take photographs for a campus event.', 'status' => 'open', 'deadline' => null, 'posted_at' => '2026-08-02 11:05:00'],
            ['id' => 'job-1', 'client_id' => 'client-01', 'title' => 'Short promo video for the film club', 'job_type' => 'Commission', 'budget' => 2500, 'description' => 'Edit a short promotional video for an upcoming campus screening.', 'status' => 'completed', 'deadline' => '2026-08-05', 'posted_at' => '2026-07-28 10:00:00'],
            ['id' => 'job-2', 'client_id' => 'client-01', 'title' => 'Poster design for orientation week', 'job_type' => 'Service', 'budget' => 1800, 'description' => 'Create promotional artwork for the upcoming student orientation.', 'status' => 'open', 'deadline' => '2026-08-30', 'posted_at' => '2026-08-12 10:00:00'],
            ['id' => 'job-4', 'client_id' => 'client-01', 'title' => 'Social media graphics for student event', 'job_type' => 'Service', 'budget' => 1500, 'description' => 'Create social media graphics for a student event.', 'status' => 'open', 'deadline' => '2026-09-01', 'posted_at' => '2026-08-12 10:00:00'],
        ]);

        DB::table('job_skills')->insert([
            ['job_id' => 'job-101', 'skill_id' => 'skill-1'], ['job_id' => 'job-102', 'skill_id' => 'skill-7'], ['job_id' => 'job-103', 'skill_id' => 'skill-4'], ['job_id' => 'job-103', 'skill_id' => 'skill-8'],
            ['job_id' => 'j-102', 'skill_id' => 'skill-2'], ['job_id' => 'j-098', 'skill_id' => 'skill-5'], ['job_id' => 'job-orientation-02', 'skill_id' => 'skill-1'],
            ['job_id' => 'job-film-01', 'skill_id' => 'skill-7'], ['job_id' => 'job-data-03', 'skill_id' => 'skill-5'], ['job_id' => 'j-081', 'skill_id' => 'skill-6'],
            ['job_id' => 'job-1', 'skill_id' => 'skill-7'], ['job_id' => 'job-2', 'skill_id' => 'skill-1'], ['job_id' => 'job-4', 'skill_id' => 'skill-9'],
        ]);

        DB::table('applications')->insert([
            ['id' => 'app-77', 'job_id' => 'job-102', 'freelancer_id' => 'freelancer-01', 'title' => 'Video editing application', 'message' => 'I can edit the promotional video for the film club.', 'status' => 'completed', 'applied_at' => '2026-07-28 10:00:00'],
            ['id' => 'app-81', 'job_id' => 'job-101', 'freelancer_id' => 'freelancer-01', 'title' => 'Poster design application', 'message' => 'I would love to create the orientation poster.', 'status' => 'pending', 'applied_at' => '2026-08-12 14:30:00'],
            ['id' => 'app-64', 'job_id' => 'job-data-03', 'freelancer_id' => 'freelancer-01', 'title' => 'Data entry application', 'message' => 'I am interested in helping with the data entry work.', 'status' => 'rejected', 'applied_at' => '2026-07-15 09:00:00'],
            ['id' => 'a-1', 'job_id' => 'j-102', 'freelancer_id' => 'freelancer-02', 'title' => 'I can create the requested logo.', 'message' => 'I have experience creating logos for student organizations.', 'status' => 'pending', 'applied_at' => '2026-08-10 09:15:00'],
            ['id' => 'a-2', 'job_id' => 'j-098', 'freelancer_id' => 'freelancer-03', 'title' => 'I can assist with data entry.', 'message' => 'I am available to help with the data entry tasks.', 'status' => 'pending', 'applied_at' => '2026-08-08 14:40:00'],
        ]);
    }
}