ALTER TABLE "courses" ADD COLUMN "video" varchar(200);--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "deadline" timestamp DEFAULT (date_trunc('day', now() + interval '7 days')) NOT NULL;