import * as z from "zod";
//Form schema
export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z
    .string()
    .min(40, {
      message: "Description must be at least 40 characters.",
    })
    .trim(),
  subtitle: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.coerce.number(),
  color: z.string(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string(),
      })
    )
    .nonempty({ message: "At least one images has to be added." }),
});

export type FormType = z.infer<typeof formSchema>;
