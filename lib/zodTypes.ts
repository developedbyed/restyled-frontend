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
  price: z.coerce
    .number()
    .multipleOf(0.01)
    .positive()
    .nullable()
    .transform((value, ctx): number => {
      if (value == null)
        ctx.addIssue({
          code: "custom",
          message: "X Cannot be null",
        });
      return value ?? NaN;
    }),
  images: z
    .array(
      z.object({
        image: z.string().url(),
      })
    )
    .nonempty({ message: "One image must be added." }),
  variants: z
    .array(
      z.object({
        color: z.string().min(4).max(9).regex(/^#/),
        image: z.string().url(),
        variantName: z.string().min(5),
      })
    )
    .nonempty({ message: "One product is required." }),
});

export type FormType = z.infer<typeof formSchema>;
