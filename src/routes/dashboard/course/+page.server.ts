import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';

export const load = (async () => {
	const courses = await courseService.getCourses();

	return { courses };
}) satisfies PageServerLoad;
