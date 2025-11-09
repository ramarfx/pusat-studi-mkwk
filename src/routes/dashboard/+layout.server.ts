import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/auth/login');
	}

    if (!locals.user.is_admin) {
        throw redirect(303, '/');
    }

	return {};
}) satisfies LayoutServerLoad;
