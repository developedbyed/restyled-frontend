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
import { formSchema } from "@/app/zodTypes";
import * as z from "zod";
import { createProductAction } from "@/app/actions";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { GradientPicker } from "./Picker";
import { Upload } from "lucide-react";
import Tiptap from "./TipTap";
import { useState } from "react";

export default function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      title: "",
      subtitle: "",
      price: 29.99,
      variants: [
        {
          color: "",
          image: "https://placehold.co/300x300/png",
          variantName: "",
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    rules: { minLength: 1, required: true },
    name: "variants",
  });

  const setColor = (color: string, index: number) => {
    form.setValue(`variants.${index}.color`, color);
    console.log(index);
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    createProductAction(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your product" {...field} />
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
                  <Input
                    placeholder="A short description about your product"
                    {...field}
                  />
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
                  <Tiptap description={field.value} onChange={field.onChange} />
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
                <CardContent className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.variantName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Title</FormLabel>
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
                        <FormLabel>Product Color</FormLabel>
                        <FormControl className="flex">
                          <GradientPicker
                            setColor={setColor}
                            background={field.value}
                            pickerNumber={index}
                          >
                            <Input placeholder="#hex" {...field} />
                          </GradientPicker>
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
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-6">
                            <Input placeholder="Image" {...field} />
                            <CldUploadButton
                              className="w-8 h-8 bg-primary p-2 rounded-full flex items-center justify-center "
                              onUpload={({ info, event }) => {
                                if (event === "success") {
                                  update(index, {
                                    color: fields[index].color,
                                    variantName: fields[index].variantName,
                                    // @ts-ignore
                                    image: info?.url,
                                  });
                                }
                              }}
                              onBatchCancelled={() => {
                                console.log("cancelled");
                              }}
                              uploadPreset="restyled"
                            >
                              <Upload />
                            </CldUploadButton>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Image
                    alt="preview"
                    width={100}
                    height={100}
                    src={fields[index].image}
                    className="rounded-md"
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
              append({
                color: "#",
                image: "https://placehold.co/300x300/png",
                variantName: "New Product",
              })
            }
            type="button"
            variant={"secondary"}
          >
            Add
          </Button>
          <Button
            disabled={!form.formState.isValid || isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
