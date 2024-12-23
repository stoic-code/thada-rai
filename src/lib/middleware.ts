import { privateRoutes } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export function isPrivateRoute(pathname: string): boolean {
  for (const path of privateRoutes) {
    if (pathname.startsWith(path)) return true;
  }
  return false;
}

export const handleUnauthorized = (req: NextRequest) => {
  const res = NextResponse.redirect(req.nextUrl.origin);
  res.cookies.delete("session");
  return res;
};
