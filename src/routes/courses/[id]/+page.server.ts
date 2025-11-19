import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import * as submissionService from '$lib/services/submission.service';
import { redirect, type Actions } from '@sveltejs/kit';
import type { SubmissionRequest } from '$lib/types/submission';

export const load: PageServerLoad = (async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(303, '/auth/login');
	}

	const course = await courseService.getCourseById(Number(params.id));
	const user = locals.user.submissions.find((sub) => sub.course_id === Number(params.id));
	const isSubmitted = locals.user.submissions.some(
		(submission) => submission.course_id === Number(params.id)
	);

	if (!course) {
		throw redirect(302, '/courses');
	}

	return {
		course: course,
		userSubmission: user,
		isSubmitted: isSubmitted
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, params, locals }) => {
		const formData = await request.formData();

		const data: SubmissionRequest = {
			course_id: Number(params.id),
			user_id: locals.user.id,
			file_url: formData.get('file') as File
		};

		await submissionService.createSubmission(data);

		throw redirect(302, `/courses/${params.id}`);
	},
	update: async ({ request, params, locals }) => {
		const formData = await request.formData();

		const data: SubmissionRequest = {
			course_id: Number(params.id),
			user_id: locals.user.id,
			file_url: formData.get('file') as File
		};

		await submissionService.updateSubmission(Number(formData.get('id')), data);

		throw redirect(302, `/courses/${params.id}`);
	}
};
