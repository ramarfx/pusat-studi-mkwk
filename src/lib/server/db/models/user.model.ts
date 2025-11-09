import { eq } from 'drizzle-orm';
import { db } from '..';
import { user } from '../schema';

export async function getUser() {
	return await db.query.user.findMany();
}

export async function getUserById(id: number) {
	return await db.query.user.findFirst({
		where: (c, { eq }) => eq(c.id, id)
	});
}

export async function createUser(data: User) {
	return await db.insert(user).values(data);
}

export async function updateUser(id: number, data: User) {
    return await db.update(user).set(data).where(eq(user.id, id));
}

export async function deleteUser(id: number) {
    return await db.delete(user).where(eq(user.id, id));
}