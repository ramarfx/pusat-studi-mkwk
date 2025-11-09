import { getCurrentUser } from '$lib/services/user.service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_user');

	if (sessionId) {
		const current = await getCurrentUser(Number(sessionId));
		event.locals.user = current;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
