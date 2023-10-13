"use server";
import { db } from "@/server/db";
import { productVariant, products } from "@/server/db/schema";
import { formSchema } from "./zodTypes";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function createProductAction(values: z.infer<typeof formSchema>) {
  try {
    await db.transaction(async (tx) => {
      const data = await tx
        .insert(products)
        .values({
          title: values.title,
          description: values.description,
          price: values.price,
          subtitle: values.subtitle,
        })
        .returning({ productID: products.id });

      values.variants.map(async (variant) => {
        await tx.insert(productVariant).values({
          color: variant.color,
          image: variant.image,
          variantName: variant.variantName,
          productID: data[0].productID,
        });
      });
      revalidatePath("/dashboard");
    });
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
