CREATE TYPE "public"."type" AS ENUM('individu', 'kelompok');--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "grade" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "thumbnail" varchar(200);--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "type" "type" DEFAULT 'individu' NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;