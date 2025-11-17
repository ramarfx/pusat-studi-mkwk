import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export const load = (async ({ params, locals }) => {
	const courseId = Number(params.id);
	const user = locals.user;

	let hasSubmitted = false;

	if (user) {
		const existing = await db.query.submission.findFirst({
			where: (s, { eq, and }) => and(eq(s.user_id, user.id), eq(s.course_id, courseId))
		});
		hasSubmitted = !!existing;
	}

	const course = await courseService.getCourseById(courseId);

	return {
		course,
		hasSubmitted
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = {
			id: Number(formData.get('id')),
			title: formData.get('title')?.toString() || '',
			thumbnail: formData.get('thumbnail') as File,
			type: (formData.get('type')?.toString() === 'individu' ? 'individu' : 'kelompok') as
				| 'individu'
				| 'kelompok',
			description: formData.get('description')?.toString() || '',
			file: formData.get('file') as File,
			video: formData.get('video'),
			deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null
		};
		await courseService.updateCourse(data.id, data);
		throw redirect(302, '/dashboard/course');
	}
};
