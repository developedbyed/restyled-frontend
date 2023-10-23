"use server";

import { db } from "@/server/db";
import { productImages, productVariant, products } from "@/server/db/schema";
import { formSchema } from "./zodTypes";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//CREATE PRODUCT
export async function createProductAction(values: z.infer<typeof formSchema>) {
  const parsedForm = formSchema.safeParse(values);

  if (parsedForm.success) {
    try {
      await db.transaction(async (tx) => {
        const data = await tx
          .insert(products)
          .values({
            title: parsedForm.data.title,
            description: parsedForm.data.description,
            price: parsedForm.data.price,
            subtitle: parsedForm.data.subtitle,
          })
          .returning({ productID: products.id });

        parsedForm.data.images.map(async (image) => {
          await tx.insert(productImages).values({
            image: image.image,
            productID: data[0].productID,
          });
        });

        parsedForm.data.variants.map(async (variant) => {
          await tx.insert(productVariant).values({
            color: variant.color,
            image: variant.image,
            variantName: variant.variantName,
            productID: data[0].productID,
          });
        });
      });
      revalidatePath("/dashboard/products");
    } catch (error) {
      return { error: "Oh noesss" };
    }
  } else {
    return { error: "Something went wrong" };
  }
}

//GET ALL THE PRODUCTS FROM STORE
export async function getProducts() {
  try {
    const data = await db.query.products.findMany({
      with: {
        productVariants: true,
      },
      orderBy: (products, { desc }) => [desc(products.id)],
    });
    return { data };
  } catch (error) {
    return { error: `Can't load products...` };
  }
}

//Delete a product from the dashboard
export async function deleteProduct(id: number) {
  console.log(id);
  try {
    const data = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    revalidatePath("/dashboard/products");
    return { data };
  } catch (error) {
    return { error: "Failed deleting a product 😞" };
  }
}
