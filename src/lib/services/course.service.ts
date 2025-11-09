import * as courseModel from '$lib/server/db/models/course.model';
import { courseSchema } from '$lib/utils/validators/courseSchema';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';
import { uploadFile } from '$lib/utils/uploadFile';

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
			const response = await uploadFile(file);

			uploaded = response;
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
	let filePath: string = course.file;

	if (file && file instanceof File) {
		// Pastikan direktori upload tersedia
		const uploadDir = path.join(process.cwd(), 'uploads', 'courses');
		await fs.mkdir(uploadDir, { recursive: true });

		// Konversi file ke buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Hash nama file agar unik
		const random = crypto.randomUUID();
		const hash = crypto
			.createHash('sha256')
			.update(buffer + random)
			.digest('hex');
		const ext = path.extname(file.name);
		const hashedName = `${hash}${ext}`;

		// Simpan file ke folder static
		const fullPath = path.join(uploadDir, hashedName);
		await fs.writeFile(fullPath, buffer);

		// Path publik
		filePath = `/courses/${hashedName}`;
	}

	return await courseModel.updateCourse(id, {
		title: data.title,
		description: data.description,
		file: filePath
	});
}

export async function deleteCourse(id: number) {
	const course = await courseModel.getCourseById(id);

	if (!course) {
		throw new Error('Course tidak ditemukan');
	}

	if (course.file) {
		const uploadDir = path.join(process.cwd(), 'uploads');
		const filePath = path.join(uploadDir, course.file.replace(/^\/courses\//, 'courses/'));
		// buang leading slash

		try {
			await fs.unlink(filePath);
			console.log('File berhasil dihapus:', filePath);
		} catch (err: any) {
			// Jangan langsung throw error biar delete tetap jalan meski file gak ketemu
			if (err.code !== 'ENOENT') {
				console.log('Gagal hapus file:', err);
				throw new Error('Gagal menghapus file di server');
			}
			console.warn('File tidak ditemukan, tapi record sudah dihapus:', filePath);
		}
	}

	await courseModel.deleteCourse(id);

	return { success: true };
}
