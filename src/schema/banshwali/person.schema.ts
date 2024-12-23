import { z } from "zod";

import {
  PHONE_REGEX,
  VALID_DATE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  VALID_WARD,
} from "../constants";
import { bsToAd } from "@/lib/date";

// PERSON Schema
export const selfSchema = z
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
      .default("अधिकारी"),
    englishName: z
      .string()
      .min(1, { message: "अंग्रेजी नाम लेख्न अनिवार्य छ।" }),
    nickName: z.string().nullish(),
    remarks: z.string().nullish(),

    childIndex: z.coerce
      .number({
        invalid_type_error: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।",
        required_error: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।",
      })
      .min(1, { message: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।" })
      .max(100, { message: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।" }),

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
    origin: z
      .string()
      .nullish() /* .min(1, { message: "पुर्खेउली थालो अनिवार्य छ।" }) */,
    birthPlace: z
      .string()
      .nullish() /* .min(1, { message: "जन्म थालो अनिवार्य छ।" }) */,
    province: z
      .string()
      .nullish() /* .min(1, { message: "प्रदेश अनिवार्य छ।" }) */,
    district: z
      .string()
      .nullish() /* .min(1, { message: "जिल्ला अनिवार्य छ।" }) */,
    local: z
      .string()
      .nullish() /* min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }) */,
    ward: z.coerce
      .number()
      .nullish() /* min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }) */,
    // .refine(
    //   (value) => {
    //     return !value || (value.length !== 0 && VALID_WARD.test(value));
    //   },
    //   { message: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।" },
    // ),
    isNrn: z
      .boolean()
      .default(false)
      .transform((isNrnValue) => isNrnValue.toString()),
    status: z.string(),
    deathDate: z
      .string()
      .nullable()
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
    qualification: z.string().optional(),
    country: z.string(),
    profession: z.string().nullable(),
    mother: z.string().optional(),
    updateForm: z.boolean().default(false),
    self: z.boolean().default(false),
  })
  .superRefine(
    (
      {
        status,
        image,
        district,
        province,
        local,
        ward,
        birthDate,
        profession,
        birthPlace,
        updateForm,
        mother,
      },
      ctx
    ) => {
      if (!updateForm && !mother && !self) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "आमाको नाम अनिबार्य छ !",
          path: ["mother"],
        });
      }

      if (status === "ALIVE") {
        // if (!ward) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "वार्ड नम्बर अनिवार्य छ।",
        //     path: ["ward"],
        //   });
        // }
        // if (!local) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "स्थानिय ठाउँ को जानकारी अनिवार्य छ ।",
        //     path: ["local"],
        //   });
        // }
        //
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
        // if (!birthDate) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "जन्म मिति अनिवार्य छ ।",
        //     path: ["birthDate"],
        //   });
        // }
        // if (!profession) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "पेशागत जानकारी अनिवार्य छ ।",
        //     path: ["profession"],
        //   });
        // }
        // if (!image && !updateForm && self) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message: "फोटो अनिवार्य छ।",
        //     path: ["image"],
        //   });
        // }
      }
    }
  );
export type TSelfSchema = z.infer<typeof selfSchema>;
