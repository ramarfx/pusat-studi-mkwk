import { relations, sql } from 'drizzle-orm';
import {
	boolean,
	pgTable,
	serial,
	varchar,
	timestamp,
	integer,
	pgEnum,
	text
} from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	nip: varchar('nip', { length: 100 }).unique().notNull(),
	name: varchar('name', {length: 200}).default('user'),
	password: varchar('password', { length: 200 }).notNull(),
	is_admin: boolean('is_admin').notNull().default(false),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const courseTypeEnum = pgEnum('type', ['individu', 'kelompok']);
export type COURSE_TYPE = (typeof courseTypeEnum.enumValues)[number];

export const course = pgTable('courses', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 200 }).notNull(),
	description: text('description').notNull(),
	file: varchar('file', { length: 200 }).notNull(),
	video: varchar('video', { length: 200 }),
	thumbnail: varchar('thumbnail', { length: 200 }),
	type: courseTypeEnum('type').notNull().default('individu'),
	deadline: timestamp('deadline').notNull().default(sql`(date_trunc('day', now() + interval '7 days'))`),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const submission = pgTable('submissions', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	course_id: integer('course_id')
		.notNull()
		.references(() => course.id, { onDelete: 'cascade' }),
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
