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
import { createProductAction, getProduct } from "@/app/actions"
import { CldUploadButton } from "next-cloudinary"
import { GradientPicker } from "./Picker"
import { Upload } from "lucide-react"
import Tiptap from "./TipTap"
import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

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
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const params = useSearchParams()
  const paramId = parseInt(params.getAll("id")[0])

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["product"],
    queryFn: async () => await getProduct(paramId),
    refetchInterval: 5000,
  })

  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 0,
      subtitle: "",
      description: "<p></p>",
      images: [
        {
          image: "",
        },
      ],
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

  const imageFields = useFieldArray({
    control: form.control,
    rules: { minLength: 1, required: true },
    name: "images",
  })
  //Array for Variants
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    rules: { minLength: 1, required: true },
    name: "variants",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const result = await createProductAction(values)

      //Handle Error
      if (result?.error) {
        console.log(result.error)
        toast.error(result.error)
      } else {
        toast.success("Product added successfully 😊")
        form.reset()
        router.push("/dashboard/products")
      }
    })
  }

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
          <Button
            onClick={() => imageFields.append({ image: "" })}
            type="button"
            variant={"outline"}
          >
            Add Image
          </Button>
          {imageFields.fields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`images.${index}.image`}
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
                            imageFields.update(index, {
                              image: info.url as string,
                            })
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
          ))}

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
                  {fields.length >= 2 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
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
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
