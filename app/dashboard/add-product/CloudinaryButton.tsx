"use client";

import { CldUploadButton } from "next-cloudinary";
import { Upload } from "lucide-react";
import { UseFormSetValue, FieldValues } from "react-hook-form";

export default function CloudinaryButton({
  imageSource,
  setValue,
}: {
  imageSource: string;
  setValue: UseFormSetValue<FieldValues>;
}) {
  return (
    <CldUploadButton
      className="w-8 h-8 bg-primary p-2 rounded-full flex items-center justify-center "
      onUpload={({ info, event }) => {
        if (event === "success" && typeof info === "object" && "url" in info) {
          setValue(imageSource, info.url as string);
        }
      }}
      uploadPreset="restyled"
    >
      <Upload />
    </CldUploadButton>
  );
}
