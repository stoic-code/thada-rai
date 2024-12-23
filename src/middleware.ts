import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "./actions/locale.action";
import { handleUnauthorized, isPrivateRoute } from "./lib/middleware";
import { getSession, updateSession } from "./actions/auth.action";
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (/\.(png|svg|jpg|webp|mp3|geojson|pdf)$/.test(pathname)) return;
  let locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);

  if (isPrivateRoute(pathname)) {
    const session = await getSession();
    if (!session) {
      return handleUnauthorized(request);
    }
    return updateSession({ request, session, url: newUrl as NextURL });
  }

  const response = NextResponse.rewrite(newUrl);
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
