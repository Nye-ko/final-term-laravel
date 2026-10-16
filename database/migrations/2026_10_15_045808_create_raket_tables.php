<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. CORE AUTHENTICATION USERS TABLE
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Unsigned Big Integer
            $table->string('full_name', 150);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. EXTENDED USER PROFILES TABLE
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('organization', 150)->nullable();
            $table->text('about')->nullable();
            $table->timestamps();
        });

        // 3. GLOBAL LOOKUP SKILLS TABLE
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->string('slug')->unique()->nullable();
            $table->timestamps();
        });

        // 4. USER SKILLS PIVOT TABLE (Student Portfolio Profiles)
        Schema::create('user_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained()->cascadeOnDelete();
            $table->unique(['user_id', 'skill_id']);
            $table->timestamps();
        });

        // 5. MARKETPLACE JOBS/GIGS TABLE
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            // Maps 'client_id' safely back to the users primary key row
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 200);
            $table->string('job_type', 60);
            $table->decimal('budget', 10, 2)->default(0.00);
            $table->text('description');
            $table->enum('status', ['open', 'closed', 'completed'])->default('open')->index();
            $table->date('deadline')->nullable();
            $table->timestamps();
        });

        // 6. JOB SKILLS PIVOT TABLE (Max 5 Skills Requirement Matrix)
        Schema::create('job_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained()->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained()->cascadeOnDelete();
            $table->unique(['job_id', 'skill_id']);
            $table->timestamps();
        });

        // 7. FREELANCER GIG APPLICATIONS TABLE
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained()->cascadeOnDelete();
            $table->foreignId('freelancer_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 200)->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'accepted', 'completed', 'rejected'])->default('pending');
            $table->unique(['job_id', 'freelancer_id']);
            $table->timestamps();
        });

        // 8. ESCROW GIG PERFORMANCE REVIEWS TABLE
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reviewer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('reviewee_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedTinyInteger('rating');
            $table->text('comment')->nullable();
            $table->unique(['application_id', 'reviewer_id']);
            $table->timestamps();
        });

        // 9. CHAT SYSTEM MESSAGES TABLE
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('recipient_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('job_id')->nullable()->constrained()->nullOnDelete();
            $table->text('body');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        // 10. MODERATION JOB FLAGS/REPORTS TABLE
        Schema::create('job_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->string('reason', 150);
            $table->text('note')->nullable();
            $table->enum('status', ['pending', 'resolved'])->default('pending')->index();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_reports');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('applications');
        Schema::dropIfExists('job_skills');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('user_skills');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('users');
    }
};
