import { eq } from 'drizzle-orm';
import { db } from '..';
import { submission } from '../schema';
import type { Submission, SubmissionRequest } from '$lib/types/submission';

export async function getSubmission(): Promise<Submission[]> {
	return await db.query.submission.findMany();
}

export async function getSubmissionById(id: number): Promise<Submission | null> {
	const result = await db.query.submission.findFirst({
		where: (c, { eq }) => eq(c.id, id)
	});

	if (!result) {
		return null;
	}
	return result;
}

export async function getSubmissionByCourseId(id: number): Promise<Submission[]> {
	return await db.query.submission.findMany({
		where: (c, { eq }) => eq(c.course_id, id),
		with: {
			user: true,
			course: true
		}
	});
}

export async function createSubmission(data: SubmissionRequest) {
	return await db.insert(submission).values(data);
}

export async function updateSubmission(id: number, data: SubmissionRequest) {
	return await db
		.update(submission)
		.set({ ...data, created_at: new Date() })
		.where(eq(submission.id, id));
}

export async function deleteSubmission(id: number) {
	return await db.delete(submission).where(eq(submission.id, id));
}
