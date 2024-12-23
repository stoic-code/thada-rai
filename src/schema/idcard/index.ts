import { z } from "zod";
import {
  VALID_WARD,
  PHONE_REGEX,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../constants";
// const PHONE_REGEX = /^\d+$/;
// const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
// const NEPALI_REGEX = /^[\u0900-\u097F\s]+$/;

export const idCardSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "फोटो अनिवार्य छ।")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max Image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।"
    ),
  full_name: z.string().min(1, { message: "पुरा नाम लेख्न अनिवार्य छ" }),
  birth_date: z.string({ required_error: "जन्म मिति लेख्न अनिवार्य छ।" }),
  // .min(1, "जन्म मिति लेख्न अनिवार्य छ।")
  // .refine((value) => DATE_REGEX.test(value), {
  //   message: "Date should be in YYYY-MM-DD format.",
  // }),
  contact: z
    .string()
    .min(10, "सम्पर्क नम्बर अनिवार्य छ।")
    .max(10, "सम्पर्क नम्बर १० भन्दा बढी अक्षर हुनुहुँदैन।")
    .refine((value) => PHONE_REGEX.test(value), {
      message: "सम्पर्क नम्बरमा केवल संख्याहरू मात्र हुनुपर्छ।",
    }),
  birth_place: z.string().min(1, { message: "जन्म थालो अनिवार्य छ।" }),
  province: z.string().min(1, { message: "प्रदेश अनिवार्य छ।" }),
  district: z.string().min(1, { message: "जिल्ला अनिवार्य छ।" }),
  local: z.string().min(1, { message: "स्थानीय ठेगाना अनिवार्य छ।" }),
  ward: z.string().refine((val) => VALID_WARD.test(val), {
    message: "कृपया एक वा दुई अंकमा प्रविष्टि गर्नुहोस्।",
  }),
  blood_group: z.string().min(1, { message: "रक्त समूह अनिवार्य छ।" }),
  profession: z.string().nullable().optional(),
  org_position: z.string().min(1, { message: "पद को जानकारी अनिवार्य छ।" }),
  gender: z
    .string()
    .min(1, { message: "लैंगिक जानकारी अनिवार्य छ ।" })
    .default(""),
});
export type TIdCardSchema = z.infer<typeof idCardSchema>;
