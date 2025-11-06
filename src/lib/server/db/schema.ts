import { boolean, pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 50 }).notNull(),
	password: varchar('password', { length: 200 }).notNull(),
	is_admin: boolean('is_admin').notNull().default(false),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const course = pgTable('courses', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 50 }).notNull(),
	description: varchar('description', { length: 200 }).notNull(),
	file: varchar('file', { length: 200 }).notNull(),
	created_at: timestamp('created_at').notNull().defaultNow()
});

export const submission = pgTable('submissions', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id').notNull().references(() => user.id),
	course_id: integer('course_id').notNull().references(() => course.id),
	file_url: varchar('file_url', { length: 200 }),
	grade: integer('grade'),
	created_at: timestamp('created_at').notNull().defaultNow()
});
