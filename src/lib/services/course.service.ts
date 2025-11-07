import * as courseModel from '$lib/server/db/models/course.model';
import { courseSchema } from '$lib/utils/validators/courseSchema';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';

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
	let filePath: string = '';

	if (file && file instanceof File) {
		// Pastikan direktori upload tersedia
		const uploadDir = path.join('static', 'courses');
		await fs.mkdir(uploadDir, { recursive: true });

		// Konversi file ke buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Hash nama file agar unik
		const hash = crypto.createHash('sha256').update(buffer).digest('hex');
		const ext = path.extname(file.name);
		const hashedName = `${hash}${ext}`;

		// Simpan file ke folder static
		const fullPath = path.join(uploadDir, hashedName);
		await fs.writeFile(fullPath, buffer);

		// Path publik
		filePath = `/courses/${hashedName}`;
	}

	const result = courseModel.createCourse({
		title: data.title,
		description: data.description,
		file: filePath
	});

	return result;
}

export async function updateCourse(
	id: number,
	data: { title: string; description: string; file: string }
) {
	return await courseModel.updateCourse(id, data);
}

export async function deleteCourse(id: number) {
	return await courseModel.deleteCourse(id);
}
