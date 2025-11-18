// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// import { user } from '$lib/server/db/schema';
import type { Submission } from '$lib/types/submission';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				nip: string;
				name: string;
				is_admin: boolean;
				submissions: Submission[];
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
