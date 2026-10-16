import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'URaket';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    // Bypass layout wrappers so your custom pages control their own design layout shells
    layout: () => null,
    strictMode: true,
    withApp(app) {
        return (
            <>
                {app}
            </>
        );
    },
    progress: {
        color: '#099639', // Updated to match your URaket signature green!
    },
});
