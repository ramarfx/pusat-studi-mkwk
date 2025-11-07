/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import * as courseService from '$lib/services/course.service';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			title: formData.get('title')?.toString() || '',
			description: formData.get('description')?.toString() || '',
			file: formData.get('file') as File
		};

		await courseService.createCourse(data);

		throw redirect(302, '/dashboard/course');
	}
};
