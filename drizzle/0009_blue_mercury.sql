ALTER TABLE "users" RENAME COLUMN "username" TO "nip";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(200) DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_nip_unique" UNIQUE("nip");