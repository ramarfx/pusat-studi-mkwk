import { env } from '$env/dynamic/private';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
	token: env.UPLOADTHING_TOKEN
});

export const uploadFile = async (file: File) => {
	const uploaded = await utapi.uploadFiles(file);

	if (!uploaded.data) throw new Error('Gagal mengupload file');

	return uploaded;
};

export const deleteFile = async (key: string) => {
	const deleted = await utapi.deleteFiles(key);

	if (!deleted) throw new Error('Gagal menghapus file');

	return deleted;
};
