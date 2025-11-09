import { env } from '$env/dynamic/private';
import { ourFileRouter } from '$lib/server/uploadThing';
import { createRouteHandler } from 'uploadthing/server';

const handler = createRouteHandler({
	router: ourFileRouter,
	config: {
		token: env.UPLOADTHING_TOKEN
	}
});

export const GET = handler;
export const POST = handler;
