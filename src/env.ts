import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string(),
  SESSION_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
