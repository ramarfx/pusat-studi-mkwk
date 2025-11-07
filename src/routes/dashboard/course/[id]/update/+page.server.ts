import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const id = Number(params.id);

	const course = await courseService.getCourseById(id);

	return {
		course
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const data = {
            id: Number(formData.get('id')),
            title: formData.get('title')?.toString() || '',
            description: formData.get('description')?.toString() || '',
            file: formData.get('file') as File
        };

        await courseService.updateCourse(data.id, data);

        throw redirect(302, '/dashboard/course');
    }
}
