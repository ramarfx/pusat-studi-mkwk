import { db } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_user');

	if (sessionId) {
		const current = await db.query.user.findFirst({
			where: (u, { eq }) => eq(u.id, Number(sessionId))
		});
		event.locals.user = current;
        console.log(event.locals.user);
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
