<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles; // [!] 1. IMPORT SPATIE TRAIT

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles; // [!] 2. ADD HASROLES TRAIT HERE

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name', // Adjusted to match your clean migration field name
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    /**
     * Get the jobs posted by the faculty client.
     */
    public function jobs()
    {
        return $this->hasMany(Job::class, 'client_id');
    }

    /**
     * Get the applications submitted by the student freelancer.
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'freelancer_id');
    }
}
