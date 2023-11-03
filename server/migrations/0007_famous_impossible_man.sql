ALTER TABLE "productVariant" ADD COLUMN "productID" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "productVariant" DROP COLUMN IF EXISTS "post_id";