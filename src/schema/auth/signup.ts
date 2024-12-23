import { z } from "zod";
// Lookahead assertion to check for at least one digit
const digitRegex = /(?=.*\d)/;

// Lookahead assertion to check for at least one non-word character
const nonWordRegex = /(?=.*\W+)/;

// Negative lookahead assertion to exclude dot or newline immediately following
const excludeDotOrNewlineRegex = /(?![.\n])/;

// Lookahead assertion to check for at least one uppercase letter
const uppercaseRegex = /(?=.*[A-Z])/;

// Lookahead assertion to check for at least one lowercase letter
const lowercaseRegex = /(?=.*[a-z])/;

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Full Name is required." }).trim(),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Must be a valid email." })
      .trim(),
    phone: z
      .string()
      .min(10, { message: "Invalid phone nuber." })
      .max(10, { message: "Invalid phone number." })
      .trim(),
    province: z.string().min(1, { message: "Province is requred." }).trim(),
    district: z.string().min(1, { message: "District is requred." }).trim(),
    referral: z
      .string()
      .min(1, { message: "Refferal code is requred." })
      .refine((val) => val === "METALOGIC9", {
        message: "Invalid Referral Code.",
      }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be atleast 8 characters." })
      .max(20, { message: "Password must be at most 20 characters." })
      .refine((val) => digitRegex.test(val), {
        message: "Password must contains atleast a number.",
      })
      .refine((val) => nonWordRegex.test(val), {
        message:
          "Password must contains at least a special characters. Eg: '!', '@', '#'",
      })
      .refine((val) => uppercaseRegex.test(val), {
        message: "Password must contains at least a capital letter.",
      })
      .refine((val) => lowercaseRegex.test(val), {
        message: "Password must contains at least a small letter.",
      })
      .refine((val) => excludeDotOrNewlineRegex.test(val), {
        message: "Password must not contain '.'",
      }),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password must be same as password.",
        path: ["confirmPassword"],
      });
    }
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
