<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear internal Spatie cache arrays securely
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Build core application role tiers
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'client']);
        Role::firstOrCreate(['name' => 'freelancer']);
    }
}
