/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import * as courseService from '$lib/services/course.service';
import { deadlineFormat } from '$lib/utils/deadlineFormat';

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
			deadline: deadlineFormat(formData.get('deadline') as string)
		};

		await courseService.createCourse(data);

		throw redirect(302, '/dashboard/course');
	}
};
