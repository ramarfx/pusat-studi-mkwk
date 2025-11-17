import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';

export const load: PageServerLoad = (async () => {
	const courses = await courseService.getCourses();

	console.log('courses', courses);
	

	return { courses: courses };
}) satisfies PageServerLoad;
