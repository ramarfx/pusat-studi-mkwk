/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import * as courseService from '$lib/services/course.service';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			title: formData.get('title')?.toString() || '',
			description: formData.get('description')?.toString() || '',
			file: formData.get('file') as File,
			type: (formData.get('type')?.toString() === 'individu' ? 'individu' : 'kelompok') as 'individu' | 'kelompok',
			thumbnail: formData.get('thumbnail') as File,
			video: formData.get('video') ?? '',
			deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null
		};

		await courseService.createCourse(data);

		throw redirect(302, '/dashboard/course');
	}
};
