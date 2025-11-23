import { createUploadthing } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	fileUpload: f({
		image: {
			maxFileSize: '32MB',
			maxFileCount: 5
		},
		pdf: {
			maxFileSize: '32MB',
			maxFileCount: 5
		},
		'application/msword': { maxFileSize: '8MB' }, // .doc
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
			maxFileSize: '32MB'
		},
		'application/vnd.ms-powerpoint': { maxFileSize: '16MB' }, // .ppt
		'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
			maxFileSize: '32MB'
		}
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await auth(req);

			// If you throw, the user will not be able to upload
			if (!user) throw new Error('Unauthorized');

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.ufsUrl);
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
