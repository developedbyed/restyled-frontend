"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProductAction } from "@/app/actions";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
//Form schema
export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 5 characters.",
  }),
  subtitle: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.coerce.number().multipleOf(0.01),
  variants: z
    .array(
      z.object({
        color: z.string().min(4).max(9).regex(/^#/),
        image: z.string().min(5),
        variantName: z.string().min(5),
      })
    )
    .nonempty({ message: "One product is required." }),
});

export default function AddProduct() {
  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      title: "",
      subtitle: "",
      price: 29.99,
      variants: [{ color: "#ffffff", image: "urllll", variantName: "Title" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.variants);
    createProductAction(values);
  }
  return (
    <div className="max-w-2xl m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Colorful Journal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Colorful Journal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Colorful Journal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Example: 29.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-6">
            {fields.map((item, index) => (
              <Card key={item.id} className="flex-grow basis-64 shrink-0">
                <CardHeader>
                  <CardTitle>Add Variant</CardTitle>
                  <CardDescription>
                    Create at least one type of product.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`variants.${index}.variantName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.variantName}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.variantName} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.color}</FormLabel>
                        <FormControl>
                          <Input placeholder="Hex Color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.image}</FormLabel>
                        <FormControl>
                          <Input placeholder="Image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CldUploadButton
                    onSuccess={({ info }) => {}}
                    uploadPreset="restyled"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button
            onClick={() =>
              append({ color: "#", image: "", variantName: "New Item" })
            }
            type="button"
          >
            Add
          </Button>
          <Button disabled={!form.formState.isValid} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
