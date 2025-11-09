import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import * as submissionService from '$lib/services/submission.service';
import { redirect, type Actions } from '@sveltejs/kit';
import type { SubmissionRequest } from '$lib/types/submission';

export const load: PageServerLoad = (async ({ params }) => {
	const course = await courseService.getCourseById(Number(params.id));

	if (!course) {
		throw redirect(302, '/courses');
	}

	return {
		course: course
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const formData = await request.formData();

		const data: SubmissionRequest = {
			course_id: Number(params.id),
			user_id: locals.user.id,
			file_url: formData.get('file') as File
		};

		await submissionService.createSubmission(data);

		throw redirect(302, `/courses/${params.id}`);
	}
};
