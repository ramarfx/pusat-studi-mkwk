import { eq } from 'drizzle-orm';
import { db } from '..';
import { course } from '../schema';

export async function getCourse(): Promise<Course[]> {
	return await db.query.course.findMany();
}

export async function getCourseById(id: number): Promise<Course | null> {
	const result = await db.query.course.findFirst({
		where: (c, { eq }) => eq(c.id, id)
	});

	if (!result) {
		return null;
	}
	return result;
}

export async function createCourse(data: CourseRequest) {
	return await db.insert(course).values(data);
}

export async function updateCourse(id: number, data: CourseRequest) {
    return await db.update(course).set(data).where(eq(course.id, id));
}

export async function deleteCourse(id: number) {
    return await db.delete(course).where(eq(course.id, id));
}