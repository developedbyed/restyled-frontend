"use server";

import { db } from "@/server";
import { productImages, products } from "@/server/schema";
import { formSchema } from "../lib/zodTypes";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const createProduct = action(
  formSchema,
  async ({ title, subtitle, color, price, description, images }) => {
    try {
      await db.transaction(async (tx) => {
        const data = await tx
          .insert(products)
          .values({
            title,
            subtitle,
            description,
            color,
            price,
          })
          .returning({ productID: products.id });
        images.map(async (image) => {
          await tx.insert(productImages).values({
            url: image.url,
            name: image.name,
            productID: data[0].productID,
          });
        });

        revalidatePath("/dashboard/products");
        return { data };
      });
    } catch (err) {
      return { error: "Failed to create a product" };
    }
  }
);

//GET ALL THE PRODUCTS FROM STORE
export async function getProducts() {
  try {
    const data = await db.query.products.findMany({
      with: {
        productImages: true,
      },
      orderBy: (products, { desc }) => [desc(products.id)],
    });

    return { data };
  } catch (error) {
    return { error: `Can't load products...` };
  }
}

//Get individual product
export async function getProduct(id: number) {
  try {
    const data = await db.query.products.findMany({
      where: eq(products.id, id),
      with: {
        productImages: true,
      },
    });
    return { data };
  } catch (error) {
    return { error: `Can't load product` };
  }
}

//Delete a product from the dashboard
const deleteProductSchema = z.number();

export const deleteProduct = action(deleteProductSchema, async (id) => {
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
});
