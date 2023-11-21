"use server";

import { db } from "@/server";
import { productImages, products } from "@/server/schema";
import { formSchema } from "@/lib/zodTypes";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//CREATE PRODUCT
export async function createProductAction(values: z.infer<typeof formSchema>) {
  const parsedForm = formSchema.safeParse(values);
  if (parsedForm.success) {
    console.log(parsedForm.data + "parsed");
    try {
      await db.transaction(async (tx) => {
        const data = await tx
          .insert(products)
          .values({
            title: parsedForm.data.title,
            description: parsedForm.data.description,
            price: parsedForm.data.price,
            subtitle: parsedForm.data.subtitle,
            color: parsedForm.data.color,
          })
          .returning({ productID: products.id });

        parsedForm.data.images.map(async (image) => {
          await tx.insert(productImages).values({
            url: image.url,
            name: image.name,
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
