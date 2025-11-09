import * as courseModel from '$lib/server/db/models/course.model';
import { courseSchema } from '$lib/utils/validators/courseSchema';
import { deleteFile, uploadFile } from '$lib/utils/uploadFile';

export async function getCourses() {
	return await courseModel.getCourse();
}

export async function getCourseById(id: number) {
	return await courseModel.getCourseById(id);
}

export async function createCourse(data: { title: string; description: string; file: File }) {
	const parsed = courseSchema.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const { file } = parsed.data;
	let uploaded = null;

	if (file && file instanceof File) {
		try {
			uploaded = await uploadFile(file);

			console.log('uploaded', uploaded);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	const result = courseModel.createCourse({
		title: data.title,
		description: data.description,
		file: uploaded.data.ufsUrl
	});
	return result;
}

export async function updateCourse(
	id: number,
	data: { title: string; description: string; file: File | null }
) {
	const parsed = courseSchema.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const course = await courseModel.getCourseById(id);

	if (!course) {
		throw new Error('Course tidak ditemukan');
	}

	const { file } = parsed.data;
	let uploaded = null;

	if (file && file instanceof File) {
		// hapus file lama
		const oldFile = course.file.split('/f/')[1];
		await deleteFile(oldFile);

		// upload file
		uploaded = await uploadFile(file);

		console.log('uploaded', uploaded);
	}

	return await courseModel.updateCourse(id, {
		title: data.title,
		description: data.description,
		file: uploaded?.data?.ufsUrl || course.file
	});
}

export async function deleteCourse(id: number) {
	const course = await courseModel.getCourseById(id);

	if (!course) {
		throw new Error('Course tidak ditemukan');
	}

	if (course.file) {
		const oldFile = course.file.split('/f/')[1];
		await deleteFile(oldFile);
	}

	await courseModel.deleteCourse(id);

	return { success: true };
}
