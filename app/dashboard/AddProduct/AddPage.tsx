"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createProductAction } from "@/app/actions"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { GradientPicker } from "./Picker"
import { Upload } from "lucide-react"

//Form schema
export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  subtitle: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.coerce.number().multipleOf(0.01),
  variants: z
    .array(
      z.object({
        color: z.string().min(4).max(9).regex(/^#/),
        image: z.string().url(),
        variantName: z.string().min(5),
      })
    )
    .nonempty({ message: "One product is required." }),
})

export default function AddProduct() {
  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
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
  })

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    rules: { minLength: 1, required: true },
    name: "variants",
  })

  const setColor = (color: string, index: number) => {
    form.setValue(`variants.${index}.color`, color)
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createProductAction(values)
  }

  return (
    <div className="max-w-2xl m-auto">
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

          <div className="flex flex-wrap ">
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
                          <Input placeholder="Image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-6">
                    <CldUploadButton
                      className="w-24 h-24 bg-muted flex items-center justify-center"
                      onUpload={({ info, event }) => {
                        if (event === "success") {
                          update(index, {
                            color: fields[index].color,
                            variantName: fields[index].variantName,
                            image: info?.url as string,
                          })
                        }
                      }}
                      onBatchCancelled={() => {
                        console.log("cancelled")
                      }}
                      uploadPreset="restyled"
                    >
                      <Upload />
                    </CldUploadButton>

                    <Image
                      alt="preview"
                      width={150}
                      height={150}
                      src={fields[index].image}
                      className="rounded-md"
                    />
                  </div>
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
          >
            Add
          </Button>
          <Button disabled={!form.formState.isValid} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
