import type { PageServerLoad } from './$types';
import * as courseService from '$lib/services/course.service';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (async ({params}) => {
    const course = await courseService.getCourseById(Number(params.id));

    if (!course) {
        throw redirect(302, '/courses');
    }

    return {
        course: course
    };
}) satisfies PageServerLoad;