import * as submissionModel from '$lib/server/db/models/submission.model';
import { submissionSchema } from '$lib/utils/validators/submissionSchema';
import path from 'path';
import { promises as fs } from 'fs';
import { deleteFile, uploadFile } from '$lib/utils/uploadFile';
import type { SubmissionRequest } from '$lib/types/submission';

export async function getSubmission() {
	return await submissionModel.getSubmission();
}

export async function getSubmissionById(id: number) {
	return await submissionModel.getSubmissionById(id);
}

export async function getSubmissionByCourseId(id: number) {
	return await submissionModel.getSubmissionByCourseId(id);
}

export async function createSubmission(data: SubmissionRequest) {
	const parsed = submissionSchema.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const { file_url } = parsed.data;
	let uploaded = null;

	if (file_url && file_url instanceof File) {
		try {
			const response = await uploadFile(file_url);

			uploaded = response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	const result = submissionModel.createSubmission({
		user_id: data.user_id,
		course_id: data.course_id,
		file_url: uploaded?.data?.ufsUrl
	});
	return result;
}

export async function updateSubmission(id: number, data: SubmissionRequest) {
	const parsed = submissionSchema.safeParse(data);

	if (!parsed.success) {
		const messages = parsed.error.issues.map((e) => e.message).join(', ');
		throw new Error(messages);
	}

	const submission = await submissionModel.getSubmissionById(id);

	if (!submission) {
		throw new Error('Submission tidak ditemukan');
	}

	const { file_url } = parsed.data;

	let uploaded = null;

	if (file_url && submission.file_url && file_url instanceof File && file_url.size > 0) {
		try {
			// delete file lama
			const oldFile = submission.file_url.split('/f/')[1];
			await deleteFile(oldFile);

			// upload file
			const response = await uploadFile(file_url);

			uploaded = response;
		} catch (error) {
			console.error(error);
			throw error;
		}

		return await submissionModel.updateSubmission(id, {
			course_id: data.course_id,
			user_id: data.user_id,
			file_url: uploaded?.data?.ufsUrl || submission.file_url
		});
	}

	throw new Error('Tidak ada file yang diupload');
}

export async function deleteSubmission(id: number) {
	const submission = await submissionModel.getSubmissionById(id);

	if (!submission) {
		throw new Error('Submission tidak ditemukan');
	}

	if (submission.file_url) {
		const uploadDir = path.join(process.cwd(), 'uploads');
		const filePath = path.join(
			uploadDir,
			submission.file_url.replace(/^\/submission\//, 'submission/')
		);
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

	await submissionModel.deleteSubmission(id);

	return { success: true };
}
