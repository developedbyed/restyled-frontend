ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_productID_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
