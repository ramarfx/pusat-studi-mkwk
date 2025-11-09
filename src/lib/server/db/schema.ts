import { relations } from 'drizzle-orm';
import { boolean, pgTable, serial, varchar, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 50 }).unique().notNull(),
	password: varchar('password', { length: 200 }).notNull(),
	is_admin: boolean('is_admin').notNull().default(false),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const COURSE_TYPE = pgEnum("type", ["individu", "kelompok"]);

export const course = pgTable('courses', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 50 }).notNull(),
	description: varchar('description', { length: 200 }).notNull(),
	file: varchar('file', { length: 200 }).notNull(),
	thumbnail: varchar('thumbnail', { length: 200 }),
	type: COURSE_TYPE("type").notNull().default("individu"),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const submission = pgTable('submissions', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.id),
	course_id: integer('course_id')
		.notNull()
		.references(() => course.id),
	file_url: varchar('file_url', { length: 200 }),
	grade: integer('grade').default(0),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const userRelations = relations(user, ({ many }) => ({
	submissions: many(submission)
}));

export const submissionRelations = relations(submission, ({ one }) => ({
	user: one(user, {
		fields: [submission.user_id],
		references: [user.id]
	}),
	course: one(course, {
		fields: [submission.course_id],
		references: [course.id]
	})
}));
