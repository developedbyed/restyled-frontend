"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormType, formSchema } from "@/lib/zodTypes";
import * as z from "zod";
import { createProductAction } from "@/server/actions";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BasicFormField from "./basic-field";
import UploadBtn from "./upload-button";
import { GradientPicker } from "./Picker";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Quill from "./quill";

export default function AddProduct() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const paramId = parseInt(params.getAll("id")[0]);

  //Helpers
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  console.log(form.formState.errors);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values + "onsubmit");
    startTransition(async () => {
      toast.loading("Adding your product");
      const result = await createProductAction(values);
      //Handle Error
      if (result?.error) {
        console.log(result.error);
        toast.error(result.error);
      } else {
        toast.success("Product added successfully 😊");
        form.reset();
        router.push("/dashboard/products");
      }
    });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Create a product</CardTitle>
        <CardDescription>
          Create and edit products for your store 🎉
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <BasicFormField
              name="title"
              placeholder="Genius Juice"
              label="Product Title"
              type="text"
            />
            <BasicFormField
              name="subtitle"
              placeholder="Academic Year Diary"
              label="Product subtitle"
              type="text"
            />
            <Quill />
            <BasicFormField
              type="number"
              name="price"
              placeholder="Your product price"
              label="Product price"
            />

            <GradientPicker />
            <UploadBtn />
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
