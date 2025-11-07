import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    if (!locals.user) {
        throw redirect(303, '/auth/login');
    }

    if (!locals.user) {
        throw redirect(303, '/auth/login');
        
    }
    console.log(locals.user);
    

    return {};
}) satisfies LayoutServerLoad;

