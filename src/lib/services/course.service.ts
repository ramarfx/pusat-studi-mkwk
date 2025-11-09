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
		title: string;
		description: string;
		file?: File | null;
		thumbnail?: File | null;
		type?: COURSE_TYPE;
	}
) {
	const parsed = courseSchemaUpdate.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const course = await courseModel.getCourseById(id);

	if (!course) throw new Error('Course tidak ditemukan');

	const dataToUpdate = parsed.data!;
	const title = dataToUpdate.title;
	const description = dataToUpdate.description;
	const file = dataToUpdate.file;
	const thumbnail = dataToUpdate.thumbnail;
	const type = dataToUpdate.type;

	let uploadedFileUrl = course.file;
	let uploadedThumbnailUrl = course.thumbnail ?? '';

	// upload file baru jika ada
	if (file) {
		if (course.file) {
			const oldFileKey = course.file.split('/f/')[1];
			await deleteFile(oldFileKey);
		}
		const uploadedFile = await uploadFile(file);
		if (!uploadedFile.data) throw new Error('Gagal mengupload file utama');
		uploadedFileUrl = uploadedFile.data.ufsUrl;
	}

	// upload thumbnail baru jika ada
	if (thumbnail) {
		if (course.thumbnail) {
			const oldThumbnailKey = course.thumbnail.split('/f/')[1];
			await deleteFile(oldThumbnailKey);
		}
		const uploadedThumbnail = await uploadFile(thumbnail);
		if (!uploadedThumbnail.data) throw new Error('Gagal mengupload thumbnail');
		uploadedThumbnailUrl = uploadedThumbnail.data.ufsUrl;
	}

	return await courseModel.updateCourse(id, {
		title,
		description,
		file: uploadedFileUrl,
		thumbnail: uploadedThumbnailUrl,
		type: type ?? course.type // jika tidak diubah, tetap pakai yang lama
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
