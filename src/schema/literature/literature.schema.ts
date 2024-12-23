import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants";

export const literatureSchema = z.object({
  title: z.string().min(1, { message: "शीर्षक अनिबार्य छ।" }),
  author: z.string().min(1, { message: "पुरा नाम अनिबार्य छ।" }),
  birth_place: z.string().min(1, { message: "जन्म स्थान अनिबार्य छ।" }),
  content: z.string().min(1, { message: "साहित्य सामग्री अनिबार्य छ।" }),
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
    ),
  // description: z.string().min(1, { message: "छोटो विवरण अनिबार्य छ।" }),
});

export type TLiteratureSchema = z.infer<typeof literatureSchema>;
