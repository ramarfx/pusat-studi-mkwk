import { env } from '$env/dynamic/private';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
	token: env.UPLOADTHING_TOKEN
});

export const uploadFile = async (file: File) => {
	const uploaded = await utapi.uploadFiles(file);

	return uploaded;
};
