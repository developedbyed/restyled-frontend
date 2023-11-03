"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

export default function BasicFormField({
  name,
  label,
  control,
  alt,
}: {
  name: string;
  label: string;
  control: Control;
  alt: string;
}) {
  return (
    <FormField
      key={name}
      control={control}
      name={label}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input placeholder={alt} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
