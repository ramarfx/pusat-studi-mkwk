import { logout } from '$lib/server/auth';
import type { PageServerLoad, RequestEvent } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies }: RequestEvent) => {
		return logout(cookies);
	}
};
