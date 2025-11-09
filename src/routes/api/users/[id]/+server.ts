import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const result = await db.query.user.findFirst({
		where: (c, { eq }) => eq(c.id, Number(params.id)),
		with: { submissions: true }
	});

	return Response.json(result);
};
