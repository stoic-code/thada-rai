import { z } from "zod";
import {
  PHONE_REGEX,
  VALID_DATE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  NUMBER_REGEX,
} from "../constants";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "सम्पर्क नम्बर अनिवार्य 10 अंकको हुनुपर्छ ।")
    .max(10, "सम्पर्क नम्बर १० भन्दा बढी अक्षर हुनुहुँदैन।")
    .refine((value) => PHONE_REGEX.test(value), {
      message: "सम्पर्क नम्बरमा केवल संख्याहरू मात्र हुनुपर्छ।",
    }),
});
export type TPhoneSchema = z.infer<typeof phoneSchema>;

// PERSON Schema
export const selfSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 10MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
    ),
  firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
  lastName: z
    .string()
    .min(1, { message: "थर लेख्न अनिवार्य छ।" })
    .default("Adhikari "),
  englishName: z.string().min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
  nickName: z.string().optional(),
  childIndex: z.string().refine((val) => Number(val), {
    message: "कृपया एक संख्या प्रविष्ट गर्नुहोस्।",
  }),
  dob: z
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
      }
    ),
  phone: z
    .string()
    .optional()
    // .min(10, "सम्पर्क नम्बर अनिवार्य छ।")
    // .max(10, "सम्पर्क नम्बर १० भन्दा बढी अक्षर हुनुहुँदैन।")
    .refine(
      (value) => {
        return !value || (value.length !== 0 && PHONE_REGEX.test(value));
      },
      {
        message: "सम्पर्क नम्बरमा केवल संख्याहरू मात्र हुनुपर्छ।",
      }
    ),
  origin: z
    .string()
    .optional() /* .min(1, { message: "पुर्खेउली थालो अनिवार्य छ।" }) */,
  birthPlace: z
    .string()
    .optional() /* .min(1, { message: "जन्म थालो अनिवार्य छ।" }) */,
  province: z
    .string()
    .optional() /* .min(1, { message: "प्रदेश अनिवार्य छ।" }) */,
  district: z
    .string()
    .optional() /* .min(1, { message: "जिल्ला अनिवार्य छ।" }) */,
  local: z
    .string()
    .optional() /* min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }) */,
  profession: z
    .string()
    .optional() /* min(1, { message: "पेशागत जानकारी अनिवार्य छ।" }) */,
  qualification: z.string().optional(),
  isNrn: z.boolean().default(false),
  country: z.string(),
  motherId: z.string().optional(),
  deathDate: z
    .string()
    .nullable()
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
});
export type TSelfSchema = z.infer<typeof selfSchema>;

// SPOUSE or WIFE Schema
export const spouseSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
    ),
  firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
  lastName: z.string().min(1, { message: "थर लेख्न अनिवार्य छ।" }),
  englishName: z.string().min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
  dob: z
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
      }
    ),
  phone: z
    .string()
    .optional()
    // .min(10, "सम्पर्क नम्बर अनिवार्य छ।")
    // .max(10, "सम्पर्क नम्बर १० भन्दा बढी अक्षर हुनुहुँदैन।")
    .refine(
      (value) => {
        return !value || (value.length !== 0 && PHONE_REGEX.test(value));
      },
      {
        message: "सम्पर्क नम्बरमा केवल संख्याहरू मात्र हुनुपर्छ।",
      }
    ),
  childrenCount: z
    .string()
    .optional()
    // .min(1, { message: "बालबालिकाको संख्या अनिवार्य गरिएको छ।" })
    .default("0")
    .refine(
      (value) => {
        return !value || (value.length !== 0 && PHONE_REGEX.test(value));
      },
      {
        message: "केवल संख्याहरू मात्र हुनुपर्छ।",
      }
    ),

  marriageDate: z
    .string()
    .nullable()
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
  deathDate: z
    .string()
    .nullable()
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
  imgurl: z
    .string()
    .url()
    .default(
      "https://img.freepik.com/free-photo/portrait-caucasian-woman-smiling_53876-24998.jpg?w=740&t=st=1704371088~exp=1704371688~hmac=066f1d3359aa9f55f39d48267efb47542bc234efe742cb7484f9bfa514d2c58c"
    ),
  contactless: z.boolean().optional(),
  divorced: z.boolean().optional(),
});

export type TSpouseSchema = z.infer<typeof spouseSchema>;

// DAUGHTER SCHEMA
export const daughterSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
    ),
  firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
  lastName: z
    .string()
    .min(1, { message: "थर लेख्न अनिवार्य छ।" })
    .default("Adhikari "),
  dob: z
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
  englishName: z.string().min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
  divorced: z.boolean().optional().nullable(),
  sonInLaw: z.string().optional(),
  contactless: z.boolean().nullish(),
  motherId: z.string().optional(),
  childIndex: z.string().refine((val) => Number(val), {
    message: "कृपया एक संख्या प्रविष्ट गर्नुहोस्।",
  }),
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
});
export type TDaughterSchema = z.infer<typeof daughterSchema>;
