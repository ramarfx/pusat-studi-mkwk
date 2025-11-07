import z from "zod";

export const courseSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    file: z.file().optional()
})

export type CourseInput = z.infer<typeof courseSchema>;