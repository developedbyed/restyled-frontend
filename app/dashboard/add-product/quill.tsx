"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

export default function Quill() {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Product Description</FormLabel>
            <FormControl>
              <ReactQuill {...field} />
            </FormControl>
            <FormDescription>
              You can always come back and modify this.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
