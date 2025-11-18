import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const GET: RequestHandler = async () => {
	return Response.json(await db.query.user.findMany());
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

    const body: UserRequest = {
        nip: data.nip,
        password: await bcrypt.hash(data.password, 10),
    }

	try {
		const [createUser] = await db.insert(user).values(body).returning({
            id: user.id,
            nip: user.nip
        });

		return Response.json({
            id: createUser.id,
            nip: createUser.nip,
        });
	} catch (error) {
		throw Response.json(error);
	}
};
