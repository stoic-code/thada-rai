import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants";

export const yogdanSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।",
    ),
  name: z.string().min(1, { message: "Name is required." }),
  birthPlace: z.string().min(1, { message: "Birth place is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  desc: z.string().min(1, { message: "Description is required." }),
});

export type TYogdanSchema = z.infer<typeof yogdanSchema>;
