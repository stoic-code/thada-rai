import { z } from "zod";

import {
  PHONE_REGEX,
  VALID_DATE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "../constants";
import { bsToAd } from "@/lib/date";

// SPOUSE or WIFE Schema
export const spouseSchema = z
  .object({
    image: z
      .any()
      .refine(
        (file) => !file || file?.size <= MAX_FILE_SIZE,
        "Max Image size is 10MB."
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
      ),
    firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
    lastName: z.string().min(1, { message: "थर लेख्न अनिवार्य छ।" }),
    englishName: z
      .string()
      .min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
    birthDate: z
      .string()
      .nullish()
      // .min(1, "जन्म मिति लेख्न अनिवार्य छ।")
      .refine(
        (value) => {
          // Check if value is present and matches the desired format
          return !value || (value.length !== 0 && VALID_DATE.test(value));
        },
        {
          message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
        }
      ),
    // .transform((val) => val && bsToAd(val)),
    phone: z
      .string()
      .nullish()
      // .min(10, "सम्पर्क नम्बर अनिवार्य छ।")
      // .max(10, "सम्पर्क नम्बर १० भन्दा बढी अक्षर हुनुहुँदैन।")
      .refine(
        (value) => {
          return !value || (value.length !== 0 && PHONE_REGEX.test(value));
        },
        {
          message: "कृपया १०-अंकको फोन नम्बर प्रविष्टि गर्नुहोस्।",
        }
      ),
    childrenCount: z.coerce.number({
      required_error: "बालबालिका को संख्या अनिबार्य छ ।",
      invalid_type_error: "केवल संख्याहरू मात्र हुनुपर्छ।",
    }),
    // .refine(
    //   (value) => {
    //     return !value;
    //   },
    //   {
    //     message: "केवल संख्याहरू मात्र हुनुपर्छ।",
    //   },
    //  ),
    status: z.string(),
    marriedDate: z
      .string()
      .nullish()
      .refine(
        (value) => {
          // Check if value is present and matches the desired format
          return !value || (value.length !== 0 && VALID_DATE.test(value));
        },
        {
          message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
        }
      ),
    // .transform((val) => val && bsToAd(val)),
    maiti: z.string().nullish(),
    deathDate: z
      .string()
      .nullish()
      .refine(
        (value) => {
          // Check if value is present and matches the desired format
          return !value || (value.length !== 0 && VALID_DATE.test(value));
        },
        {
          message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
        }
      ),
    isNrn: z.boolean().default(false),
    country: z.string(),
    qualification: z.string().optional(),
    profession: z.string().nullable(),
    contactless: z.boolean().optional(),
    divorced: z.boolean().default(false),
    updateForm: z.boolean().default(false),
  })
  .superRefine(({ image, status, birthDate, updateForm }, ctx) => {
    if (status === "ALIVE") {
      // if (!image && !updateForm) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "फोटो अनिवार्य छ।",
      //     path: ["image"],
      //   });
      // }
      // if (!birthDate) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "जन्म मिति अनिवार्य छ ।",
      //     path: ["birthDate"],
      //   });
      // }
    }
  });

export type TspouseSchema = z.infer<typeof spouseSchema>;
