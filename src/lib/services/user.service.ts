import { db } from '$lib/server/db';

export const getCurrentUser = async (id: number) => {
	return await db.query.user.findFirst({
		where: (c, { eq }) => eq(c.id, id),
		with: {
			submissions: true
		}
	});
};
