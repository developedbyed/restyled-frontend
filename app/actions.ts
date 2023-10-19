"use server";
import { db } from "@/server/db";
import { productVariant, products } from "@/server/db/schema";
import { formSchema } from "./zodTypes";
import { z } from "zod";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

        parsedForm.data.variants.map(async (variant) => {
          await tx.insert(productVariant).values({
            color: variant.color,
            image: variant.image,
            variantName: variant.variantName,
            productID: data[0].productID,
          });
        });
        return { success: "We did it", data: parsedForm.data };
      });
    } catch (error) {
      return { error: "Oh noesss" };
    }
  }
  return { error: "Something went wrong" };
}
