import { z } from "zod";
import { VALID_DATE } from "./constants";

export const pitriSchema = z.object({
  type: z.string().min(1, { message: "कृपया पितृ चयन गर्नुहोस।" }),
  name: z
    .string({
      required_error: "नाम अनिबार्य गरिएको छ।",
      invalid_type_error: "नाम अनिबार्य गरिएको छ।",
    })
    .min(1, { message: "नाम अनिबार्य गरिएको छ।" }),
  gotra: z
    .string({
      required_error: "गोत्र अनिबार्य गरिएको छ।",
      invalid_type_error: "गोत्र अनिबार्य गरिएको छ।",
    })
    .min(1, { message: "गोत्र अनिबार्य गरिएको छ।" }),
  dod: z
    .string()
    .optional()
    // .min(1, "जन्म मिति लेख्न अनिवार्य छ।")
    .refine(
      (value) => {
        // Check if value is present and matches the desired format
        return !value || (value.length !== 0 && VALID_DATE.test(value));
      },
      {
        message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
      },
    ),
  tithi: z.string().optional(),
});

export type TPitriSchema = z.infer<typeof pitriSchema>;
