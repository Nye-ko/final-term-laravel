<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->enum('role', ['admin', 'client', 'freelancer']);
            $table->string('full_name', 150);
            $table->string('email', 255)->unique('uq_users_email');
            $table->string('password_hash', 255);
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->string('user_id', 64)->primary();
            $table->string('organization', 150);
            $table->text('about')->nullable();

            $table->foreign('user_id', 'fk_profiles_user')
                  ->references('id')->on('users')
                  ->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->string('name', 100)->unique('uq_skills_name');
        });

        Schema::create('user_skills', function (Blueprint $table) {
            $table->string('user_id', 64);
            $table->string('skill_id', 64);
            $table->primary(['user_id', 'skill_id']);

            $table->foreign('user_id', 'fk_user_skills_user')
                  ->references('id')->on('users')
                  ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('skill_id', 'fk_user_skills_skill')
                  ->references('id')->on('skills')
                  ->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->string('client_id', 64)->index('idx_jobs_client');
            $table->string('title', 200);
            $table->string('job_type', 60);
            $table->decimal('budget', 10, 2)->default(0.00);
            $table->text('description');
            $table->enum('status', ['open', 'closed', 'completed'])->default('open')->index('idx_jobs_status');
            $table->date('deadline')->nullable();
            $table->dateTime('posted_at')->useCurrent();

            $table->foreign('client_id', 'fk_jobs_client')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');
        });

        Schema::create('job_skills', function (Blueprint $table) {
            $table->string('job_id', 64);
            $table->string('skill_id', 64);
            $table->primary(['job_id', 'skill_id']);

            $table->foreign('job_id', 'fk_job_skills_job')
                  ->references('id')->on('jobs')
                  ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('skill_id', 'fk_job_skills_skill')
                  ->references('id')->on('skills')
                  ->onDelete('restrict')->onUpdate('cascade');
        });

        Schema::create('applications', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->string('job_id', 64);
            $table->string('freelancer_id', 64)->index('idx_applications_freelancer');
            $table->string('title', 200)->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'accepted', 'completed', 'rejected'])->default('pending');
            $table->dateTime('applied_at')->useCurrent();

            $table->unique(['job_id', 'freelancer_id'], 'uq_application_job_freelancer');

            $table->foreign('job_id', 'fk_applications_job')
                  ->references('id')->on('jobs')
                  ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('freelancer_id', 'fk_applications_freelancer')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->string('application_id', 64);
            $table->string('reviewer_id', 64);
            $table->string('reviewee_id', 64);
            $table->unsignedTinyInteger('rating');
            $table->text('comment')->nullable();
            $table->dateTime('created_at')->useCurrent();

            $table->unique(['application_id', 'reviewer_id'], 'uq_review_application_reviewer');

            $table->foreign('application_id', 'fk_reviews_application')
                  ->references('id')->on('applications')
                  ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('reviewer_id', 'fk_reviews_reviewer')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');

            $table->foreign('reviewee_id', 'fk_reviews_reviewee')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('sender_id', 64);
            $table->string('recipient_id', 64);
            $table->string('job_id', 64)->nullable();
            $table->text('body');
            $table->dateTime('sent_at')->useCurrent();
            $table->dateTime('read_at')->nullable();

            $table->index(['recipient_id', 'read_at'], 'idx_messages_recipient');

            $table->foreign('sender_id', 'fk_messages_sender')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');

            $table->foreign('recipient_id', 'fk_messages_recipient')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');

            $table->foreign('job_id', 'fk_messages_job')
                  ->references('id')->on('jobs')
                  ->onDelete('set null')->onUpdate('cascade');
        });

        Schema::create('job_reports', function (Blueprint $table) {
            $table->string('id', 64)->primary();
            $table->string('job_id', 64);
            $table->string('reporter_id', 64);
            $table->string('reason', 150);
            $table->text('note')->nullable();
            $table->enum('status', ['pending', 'resolved'])->default('pending')->index('idx_reports_status');
            $table->dateTime('reported_at')->useCurrent();
            $table->dateTime('resolved_at')->nullable();

            $table->foreign('job_id', 'fk_reports_job')
                  ->references('id')->on('jobs')
                  ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('reporter_id', 'fk_reports_reporter')
                  ->references('id')->on('users')
                  ->onDelete('restrict')->onUpdate('cascade');
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
