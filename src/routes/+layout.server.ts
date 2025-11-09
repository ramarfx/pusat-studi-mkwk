import type { LayoutServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';

export const load: LayoutServerLoad = (async ({ locals }) => {
	const courses = await courseService.getCourses();

	return {
		user: locals.user ?? null,
		courses: courses
	};
    
}) satisfies LayoutServerLoad;
