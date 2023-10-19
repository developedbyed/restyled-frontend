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
import { formSchema } from "@/app/zodTypes"
import * as z from "zod"
import { createProductAction } from "@/app/actions"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { GradientPicker } from "./Picker"
import { Upload } from "lucide-react"
import Tiptap from "./TipTap"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const constantInputs = [
  { name: "Title", label: "title", alt: "Pick a short and catchy title!" },
  { name: "Price", label: "price", alt: "Your product Price" },
  { name: "Subtitle", label: "subtitle", alt: "A short subtitle" },
  {
    name: "description",
    label: "Description",
    alt: "Add all the details about your product ✨",
  },
] as const

export default function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: undefined,
      price: undefined,
      subtitle: undefined,
      description: "<p></p>",
      variants: [
        {
          color: "",
          image: "",
          variantName: "",
        },
      ],
    },
  })

  //Helpers

  function setRichText(value: string) {
    form.setValue("description", value, { shouldValidate: true })
  }

  const setColor = (color: string, index: number) => {
    form.setValue(`variants.${index}.color`, color)
  }

  //Array for Variants
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    rules: { minLength: 1, required: true },
    name: "variants",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true)
    const result = await createProductAction(values)

    //Handle Error
    if (result?.error) {
      console.log(result.error)
    } else {
      setIsSubmitting(false)
      form.reset()
      console.log("Product Added Sucessfully")
      router.push("/dashboard/products")
    }
  }
  console.log(form.getValues())
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {constantInputs.map((input) => {
            if (input.name === "description")
              return (
                <FormField
                  key={input.name}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Tiptap
                          description={field.value}
                          setRichText={setRichText}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            return (
              <FormField
                key={input.name}
                control={form.control}
                name={input.label}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{input.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={input.alt} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}

          <div className="flex flex-wrap gap-6">
            {fields.map((item, index) => (
              <Card key={item.id} className="flex-grow basis-72 shrink-0">
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
                          <Input
                            placeholder="Select a variant title"
                            {...field}
                          />
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
                            <Input
                              placeholder="Pick a hex color #fff"
                              {...field}
                            />
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
                            <Input
                              placeholder="Paste a link or upload an image"
                              {...field}
                            />
                            <CldUploadButton
                              className="w-8 h-8 bg-primary p-2 rounded-full flex items-center justify-center "
                              onUpload={({ info, event }) => {
                                if (
                                  event === "success" &&
                                  typeof info === "object" &&
                                  "url" in info
                                ) {
                                  form.setValue(
                                    `variants.${index}.image`,
                                    info.url as string
                                  )
                                }
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
                </CardContent>
                <CardFooter className="flex ">
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button
            onClick={() =>
              append({
                color: "",
                image: "",
                variantName: "",
              })
            }
            type="button"
            variant={"secondary"}
          >
            Add
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
