import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants";

// Define your Zod schema
export const alekhSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(1, { message: "Alekh title is required." }),
  author: z
    .string({ required_error: "Author's name is required." })
    .min(1, { message: "Author is required." }),
  body: z
    .string({ required_error: "Alekh description is required." })
    .min(1, { message: "Content is required." }),
  image: z
    .any()
    .refine((file) => file !== undefined && file !== null, {
      message: "Alekh image is required.",
    })
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max Image size is 10MB.",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png & .webp are allowed.",
    ),
});

export type TAlekhSchema = z.infer<typeof alekhSchema>;
