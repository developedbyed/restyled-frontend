CREATE TABLE IF NOT EXISTS "productVariant" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"color" text NOT NULL,
	"variantName" text NOT NULL,
	"author_id" integer,
	"post_id" integer
);
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_id_unique";