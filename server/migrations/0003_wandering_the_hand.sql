CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"details" text NOT NULL,
	"price" numeric NOT NULL,
	"author_id" integer,
	CONSTRAINT "products_id_unique" UNIQUE("id")
);
