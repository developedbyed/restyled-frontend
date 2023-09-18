ALTER TABLE "users" ADD COLUMN "stripeCustomer" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_stripeCustomer_unique" UNIQUE("stripeCustomer");