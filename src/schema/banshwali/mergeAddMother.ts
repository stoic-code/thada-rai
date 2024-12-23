import { z } from "zod";
const PHONE_REGEX = /^\d+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const NEPALI_REGEX = /^[\u0900-\u097F\s]+$/;

// SPOUSE or WIFE Schema
export const spouseSchema = z.object({
  image: z
    .string()
    .refine((base64String) => base64String.length > 0, {
      message: "फोटो अनिवार्य छ।",
    })
    .refine(
      (base64String) => {
        const decodedData = Buffer.from(base64String, "base64");
        return decodedData.length <= MAX_FILE_SIZE;
      },
      { message: "Max Image size is 10MB." },
    )
    .refine(
      (base64String) => {
        // This is a basic check for image type based on the data URI format. A more robust check can be implemented.
        const typeRegex = /^data:image\/(jpeg|jpg|png|webp);base64,/i;
        return typeRegex.test(base64String);
      },
      { message: ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।" },
    ),
  firstName: z.string().min(1, { message: "नाम लेख्न अनिवार्य छ।" }),
  lastName: z.string().min(1, { message: "थर लेख्न अनिवार्य छ।" }),

  dob: z
    .string()
    .optional()
    // .min(1, "जन्म मिति लेख्न अनिवार्य छ।")
    .refine(
      (value) => {
        // Check if value is present and matches the desired format
        return !value || (value.length !== 0 && DATE_REGEX.test(value));
      },
      {
        message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
      },
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
      },
    ),
  childrenCount: z
    .string()
    .min(1, { message: "बालबालिकाको संख्या अनिवार्य गरिएको छ।" })
    .default("0")
    .refine((val) => Number(val)),

  marriageDate: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => {
        // Check if value is present and matches the desired format
        return !value || (value.length !== 0 && DATE_REGEX.test(value));
      },
      {
        message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
      },
    ),
  deathDate: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => {
        // Check if value is present and matches the desired format
        return !value || (value.length !== 0 && DATE_REGEX.test(value));
      },
      {
        message: "मिति यो ढाँचामा हुनुपर्छ: वर्ष-महिना-दिन (YYYY-MM-DD)",
      },
    ),
  imgurl: z
    .string()
    .url()
    .default(
      "https://img.freepik.com/free-photo/portrait-caucasian-woman-smiling_53876-24998.jpg?w=740&t=st=1704371088~exp=1704371688~hmac=066f1d3359aa9f55f39d48267efb47542bc234efe742cb7484f9bfa514d2c58c",
    ),
  contactless: z.boolean().optional(),
  divorced: z.boolean().optional(),
});

export type TSpouseSchema = z.infer<typeof spouseSchema>;
