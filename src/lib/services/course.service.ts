import * as courseModel from '$lib/server/db/models/course.model';
import { courseSchema, courseSchemaUpdate } from '$lib/utils/validators/courseSchema';
import { deleteFile, uploadFile } from '$lib/utils/uploadFile';
import type { COURSE_TYPE } from '$lib/server/db/schema';

export async function getCourses() {
	return await courseModel.getCourse();
}

export async function getCourseById(id: number) {
	return await courseModel.getCourseById(id);
}

export async function createCourse(data: {
	title: string;
	description: string;
	file: File;
	thumbnail: File;
	type: COURSE_TYPE;
}) {
	const parsed = courseSchema.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const { file, thumbnail } = parsed.data;

	const uploadedFile = await uploadFile(file);
	const uploadedThumbnail = await uploadFile(thumbnail);

	if (!uploadedThumbnail.data) {
		throw new Error('Gagal mengupload thumbnail');
	}

	if (!uploadedFile.data) {
		throw new Error('Gagal mengupload file utama');
	}

	console.log('uploadedFile', uploadedFile);

	const result = await courseModel.createCourse({
		title: data.title,
		thumbnail: uploadedThumbnail.data.ufsUrl,
		description: data.description,
		type: data.type,
		file: uploadedFile.data.ufsUrl
	});

	console.log('result', result);

	return result;
}
export async function updateCourse(
	id: number,
	data: {
		title?: string;
		description?: string;
		file?: File | null;
		thumbnail?: File | null;
		type?: COURSE_TYPE;
	}
) {
	// Validasi
	const parsed = courseSchemaUpdate.safeParse(data);
	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const course = await courseModel.getCourseById(id);
	if (!course) throw new Error('Course tidak ditemukan');

	const { title, description, file, thumbnail, type } = parsed.data;

	console.log('parsed.data', parsed.data);

	let fileUrl = course.file;
	let thumbnailUrl = course.thumbnail as string;

	// === Handle upload file utama ===
	if (file instanceof File && file.size > 0) {
		if (course.file) {
			const oldKey = course.file.split('/f/')[1];
			if (oldKey) await deleteFile(oldKey);
		}

		const result = await uploadFile(file);
		if (!result.data) throw new Error('Gagal mengupload file utama');
		fileUrl = result.data.ufsUrl;
	}

	// === Handle upload thumbnail ===
	if (thumbnail instanceof File && thumbnail.size > 0) {
		if (course.thumbnail) {
			const oldKey = course.thumbnail.split('/f/')[1];
			if (oldKey) await deleteFile(oldKey);
		}

		const result = await uploadFile(thumbnail);
		if (!result.data) throw new Error('Gagal mengupload thumbnail');
		thumbnailUrl = result.data.ufsUrl;
	}

	// Update final
	return await courseModel.updateCourse(id, {
		title: title ?? course.title,
		description: description ?? course.description,
		file: fileUrl,
		thumbnail: thumbnailUrl,
		type: type ?? course.type
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
