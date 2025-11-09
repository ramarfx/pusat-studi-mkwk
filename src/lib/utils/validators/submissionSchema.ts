import z from 'zod';

export const submissionSchema = z.object({
	user_id: z.number(),
	course_id: z.number(),
	file_url: z.file().optional()
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
