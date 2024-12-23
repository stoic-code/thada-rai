import { z } from "zod";

import {
  PHONE_REGEX,
  VALID_DATE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "../constants";
import { bsToAd } from "@/lib/date";

// InLaw  SCHEMA
export const inLawSchema = z
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
      )
      .optional(),
    firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
    lastName: z
      .string()
      .min(1, { message: "थर लेख्न अनिवार्य छ।" })
      .default("Adhikari "),

    englishName: z
      .string()
      .min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),

    dob: z
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

    phone: z
      .string()
      .nullish()
      .refine(
        (value) => {
          return !value || (value.length !== 0 && PHONE_REGEX.test(value));
        },
        {
          message: "फोन नम्बर १० अंककोसंख्याहरू हुनुपर्छ",
        }
      ),
    status: z.string(),
    province: z
      .string()
      .nullish() /* .min(1, { message: "प्रदेश अनिवार्य छ।" }) */,
    district: z
      .string()
      .nullish() /* .min(1, { message: "जिल्ला अनिवार्य छ।" }) */,
    ward: z
      .string()
      .nullish() /* min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }) */,
    local: z
      .string()
      .nullish() /* min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }) */,
    qualification: z.string().optional(),
    isNrn: z.boolean().default(false),
    country: z.string(),
    profession: z.string().nullable(),
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
    // .transform((val) => val && bsToAd(val)),
    updateForm: z.boolean().default(false),
  })
  .superRefine(
    (
      { status, image, district, province, local, phone, dob, updateForm },
      ctx
    ) => {
      if (status === "ALIVE") {
        // if (!local) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "स्थानिय ठाउँ को जानकारी अनिवार्य छ ।",
        //     path: ["local"],
        //   });
        // }
        // if (!district) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "जिल्ला को जानकारी अनिवार्य छ ।",
        //     path: ["district"],
        //   });
        // }
        // if (!province) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "प्रदेश अनिवार्य गरिएको छ ।",
        //     path: ["province"],
        //   });
        // }
        // if (!phone) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "सम्पर्क नम्बर अनिवार्य छ ।",
        //     path: ["phone"],
        //   });
        // }
        // if (!dob) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "जन्म मिति अनिवार्य छ ।",
        //     path: ["dob"],
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
    }
  );

export type TInLawSchema = z.infer<typeof inLawSchema>;
