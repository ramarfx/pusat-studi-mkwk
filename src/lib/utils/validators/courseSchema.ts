import z from "zod";

export const courseSchema = z.object({
    title: z.string().min(3),
    description: z.string(),
    file: z.file(),
    thumbnail: z.file(),
    type: z.enum(['individu', 'kelompok'])
})

export const courseSchemaUpdate = courseSchema.nullable();

export type CourseInput = z.infer<typeof courseSchema>;