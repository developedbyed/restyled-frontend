import { FormType } from "@/lib/zodTypes"
import { DefaultValues } from "react-hook-form"

export const initialFormData: DefaultValues<FormType> = {
  title: undefined,
  price: undefined,
  subtitle: undefined,
  description: "<p>Hello there</p>",
  images: [
    {
      image: undefined,
    },
  ],
  variants: [
    {
      color: undefined,
      image: undefined,
      variantName: undefined,
    },
  ],
}
