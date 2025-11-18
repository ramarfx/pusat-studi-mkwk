import bcrypt from 'bcrypt';
import { db } from './db';
import { user } from '../server/db/schema';
import { redirect, type Cookies } from '@sveltejs/kit';

export async function register(nip: string, password: string) {
	const hashedPassoword = await bcrypt.hash(password, 10);

	await db.insert(user).values({
		nip: nip,
		password: hashedPassoword
	});
}

export async function login(nip: string, password: string) {
	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.nip, nip)
	});

	if (!existingUser) {
		return null;
	}

	const valid = await bcrypt.compare(password, existingUser.password);

	if (!valid) {
		return null;
	}

	return existingUser;
}

export async function logout(cookies: Cookies) {
	// hapus 
	cookies.delete('session_user', { path: '/' });

	throw redirect(303, '/?invalidate=1');
}
