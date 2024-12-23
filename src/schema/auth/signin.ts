import { z } from "zod";

export const signInSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .min(10, { message: "Invalid phone number." })
    .max(10, { message: "Invalid phone number." })
    .trim(),
  // agree: z.boolean().refine((val) => val === true, {
  //   message: "You must read and accept our privacy policy to proceed.",
  // }),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
