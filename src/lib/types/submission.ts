import type { Course } from './course';

export interface Submission {
	user?: User;
	course?: Course;
	id: number;
	user_id: number;
	course_id: number;
	file_url: string | null;
	grade: number | null;
	created_at: Date;
}

export interface SubmissionRequest {
	user_id: number;
	course_id: number;
	file_url: File | string;
}
