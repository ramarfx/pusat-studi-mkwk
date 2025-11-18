import { login } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const form: FormData = await request.formData();
		const nip = form.get('nip')?.toString().trim();
		const password = form.get('password')?.toString().trim();

		if (!nip || !password || typeof nip !== 'string' || typeof password !== 'string') {
			return fail(401, { error: 'Nip dan password wajib diisi' });
		}

		const user = await login(nip, password);
		if (!user) {
			return fail(401, { error: 'NIP atau password salah' });
		}

		cookies.set('session_user', user.id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, '/dashboard/course');
	}
};
