import { string, z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../constants";

export const constributionSchema = z
  .object({
    full_name: string().min(1, { message: "पहिलो नाम अनिबार्य छ।" }),
    phone: string()
      .min(10, { message: "सम्पर्क नम्बर अनिबार्य छ।" })
      .max(10, { message: "सम्पर्क नम्बर १० अंक को हुनु पर्ने छ।  " }),
    amount: string().min(1, { message: "रकम अनिबार्य छ।" }),
    eventId: string().optional(),
    mode: string().min(1, { message: "भुक्तानीको प्रकार अनिबार्य छ।" }),
    type: string().min(1, { message: "डोनेसनको प्रकार अनिबार्य छ । " }),
    purpose: string().min(1, {
      message: "डोनेसनको उद्देश्य प्रकार अनिबार्य छ । ",
    }),
    contributor_image: z
      .any()
      .refine((file) => file !== null && file !== undefined, {
        message: "रसिद को फोटो अनिवार्य छ।",
      })
      .refine((file) => !file || file?.size <= MAX_FILE_SIZE, {
        message: "फोटोको अधिकतम साइज ५ MB हुनु पर्छ",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।",
      }),
    receipt_photo: z
      .any()
      .refine((file) => file !== null && file !== undefined, {
        message: "रसिद को फोटो अनिवार्य छ।",
      })
      .refine((file) => !file || file?.size <= MAX_FILE_SIZE, {
        message: "फोटोको अधिकतम साइज ५ MB हुनु पर्छ",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: ".jpg, .jpeg, .png र .webp ढाँचामा मात्र अपलोड गर्न सकिन्छ।",
      }),
  })
  .superRefine(({ type, eventId }, ctx) => {
    if (type === "EVENT" && !eventId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "कार्यक्रम को नाम अनिबार्य छ।",
        path: ["event"],
      });
    }
  });

export type TContributionSchema = z.infer<typeof constributionSchema>;

// export const contributionServerSchema = z.object({
//   fullName: string().min(1, { message: "First Name is required." }),
//   amount: string().min(1, { message: "amount is required." }),
//   event: string().min(1, { message: "Event is required." }),
//   mode: string().min(1, { message: "First Name is required." }),
//   image: z.object({
//     secure_url: z.string(),
//     public_id: z.string()
//   }),
// })
//
// export type TContributionServerSchema = z.infer<typeof contributionServerSchema>
