// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('session_user');

	if (!session) {
		return { user: null };
	}

	const user = JSON.parse(session);
	return { user };
};
