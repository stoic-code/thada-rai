import { NextRequest } from "next/server";

export function getLocale(request: NextRequest): string {
  return request.cookies.get("lang")?.value || "np";
}
