import z from 'zod';

export const courseSchema = z.object({
	title: z.string().min(3),
	description: z.string(),
	file: z.file(),
	thumbnail: z.file(),
	type: z.enum(['individu', 'kelompok']),
	deadline: z.date().optional(),
	video: z.string().optional()
});

export const courseSchemaUpdate = z.object({
	title: z.string().min(3).optional(),
	description: z.string().optional(),
	file: z.instanceof(File).optional().nullable(),
	thumbnail: z.instanceof(File).optional().nullable(),
	type: z.enum(['individu', 'kelompok']).optional(),
	deadline: z.date().optional(),
	video: z.string().optional()
});

export type CourseInput = z.infer<typeof courseSchema>;
