import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = (async () => {
	const courses = await courseService.getCourses();

	return { courses };
}) satisfies PageServerLoad;

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		console.log('id', id);
		

		if (id) {
			const result = await courseService.deleteCourse(Number(id));
			console.log('hasil hapus',result);
			
		}

		console.log('gagal hapus');
		

		throw redirect(302, '/dashboard/course');
	}
};
