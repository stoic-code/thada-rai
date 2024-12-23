import { z } from "zod";
import {
  PHONE_REGEX,
  VALID_DATE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  NUMBER_REGEX,
} from "../constants";
import { bsToAd } from "@/lib/date";

// DAUGHTER SCHEMA
export const daughterSchema = z
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
    lastName: z
      .string()
      .min(1, { message: "थर लेख्न अनिवार्य छ।" })
      .default("Adhikari "),
    birthDate: z
      .string()
      .optional()
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
    englishName: z
      .string()
      .min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
    divorced: z.boolean().optional().nullable(),
    status: z.string().optional(),
    contactless: z.boolean().nullish(),
    motherId: z.coerce.number().optional(),
    childIndex: z.coerce.number({
      invalid_type_error: "कृपया एक संख्या प्रविष्ट गर्नुहोस्।",
      required_error: "कृपया एक संख्या प्रविष्ट गर्नुहोस्।",
    }),
    qualification: z.string().optional(),
    isNrn: z.boolean().default(false),
    country: z.string(),
    profession: z.string().nullable(),
    phone: z
      .string()
      .optional()
      .refine(
        (value) => {
          return !value || (value.length !== 0 && PHONE_REGEX.test(value));
        },
        {
          message: "सम्पर्क नम्बरमा केवल संख्याहरू मात्र हुनुपर्छ।",
        }
      ),
    deathDate: z
      .string()
      .nullable()
      .optional()
      .refine(
        (value) => {
          return !value || (value.length !== 0 && VALID_DATE.test(value));
        },
        {
          message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
        }
      ),
    // .transform((val) => val && bsToAd(val)),
    marriageDate: z
      .string()
      .nullable()
      .optional()
      .refine(
        (value) => {
          return !value || (value.length !== 0 && VALID_DATE.test(value));
        },
        {
          message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
        }
      ),
    // .transform((val) => val && bsToAd(val)),
    mother: z.string().optional(),
    updateForm: z.boolean().default(false),
  })
  .superRefine(({ status, image, updateForm, mother, birthDate }, ctx) => {
    if (!updateForm && !mother) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "आमाको नाम अनिबार्य छ।",
        path: ["mother"],
      });
    }
    if (status === "ALIVE") {
      // if (!birthDate) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "जन्म मिति अनिवार्य छ ।",
      //     path: ["birthDate"],
      //   });
      // }
      // if (!image && !updateForm) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "फोटो अनिवार्य छ।",
      //     path: ["image"],
      //   });
      // }
    }
  });
export type TDaughterSchema = z.infer<typeof daughterSchema>;
