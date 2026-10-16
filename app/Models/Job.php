<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'client_id',
        'title',
        'job_type',
        'budget',
        'description',
        'status',
        'deadline',
    ];

    /**
     * Get the faculty client that posted the job.
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the applications submitted for this job.
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'job_id');
    }

    /**
     * Get the skill tags required for this job (Supports the 5-skill limit layout).
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'job_skills', 'job_id', 'skill_id');
    }
}
