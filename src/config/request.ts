import { RequestHandler } from "@hyper/web-common";

export const r = new RequestHandler(process.env.NEXT_PUBLIC_BACKEND_URL!);
