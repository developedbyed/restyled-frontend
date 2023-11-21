"use client";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useFormContext, useFieldArray } from "react-hook-form";
import * as z from "zod";

export default function UploadBtn() {
  const { control } = useFormContext();

  const imageFields = useFieldArray({
    control: control,
    rules: { minLength: 1, required: true },
    name: "images",
  });

  return (
    <div className="my-4">
      {imageFields.fields.map((image, index) => (
        <div key={image.id} className="relative inline-block mx-4">
          <Image
            className="rounded-md"
            // @ts-ignore
            alt={image.name}
            key={image.id}
            // @ts-ignore
            src={image.url}
            width={150}
            height={150}
          />
          <Button
            variant={"destructive"}
            className="absolute right-0 text-xs top-0"
            onClick={() => imageFields.remove(index)}
          >
            X
          </Button>
        </div>
      ))}
      {imageFields.fields.length === 0 && (
        <UploadDropzone
          endpoint="imageUploader"
          className=" text-primary ut-label:text-primary rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ut-button:bg-primary"
          onClientUploadComplete={(res) => {
            // Do something with the response
            if (res) {
              console.log("Files: ", res);
              console.log(res);
              res.map((image) =>
                imageFields.append({
                  name: image.name,
                  url: image.url,
                })
              );
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log(error.message);
          }}
        />
      )}
    </div>
  );
}
