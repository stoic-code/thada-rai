"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { r } from "@/config/request";
import { URL } from "url";
import { handleUnauthorized } from "@/lib/middleware";
import { NextURL } from "next/dist/server/web/next-url";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  noStore();
  const session = cookies().get("session")?.value;
  if (!session) return;
  try {
    return await decrypt(session);
  } catch (err) {
    return;
  }
}

export async function updateSession({
  session,
  url,
  request,
}: {
  session: any;
  url: NextURL;
  request: NextRequest;
}) {
  try {
    const {
      accessToken: token,
      user: { refreshToken },
    } = session;

    // GET new session from the backend
    const newSession = await r.post({
      endpoint: "/auth/refreshtoken",
      token,
      payload: { refreshToken },
    });

    // console.log("newSession refresh token: ", newSession);

    // PREPARE CONSTANTS
    const expires = new Date(Date.now() + 30 * 60 * 60 * 1000);
    const res = NextResponse.rewrite(url);

    // SET COOKIES
    res.cookies.set({
      name: "session",
      value: await encrypt(newSession),
      httpOnly: true,
      expires: expires,
    });

    // RETURN
    return res;
  } catch (err) {
    console.log("Error while refreshing token :", err);
    return handleUnauthorized(request);
  }
}

type Response = {
  message?: string;
  error?: string;
  code: number;
};

export const login = async (payload: any): Promise<Response> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("RESPONSE", res);

    if (!res.ok) {
      if (res.status === 403) {
        return {
          error: "Please verify OTP first !!",
          code: res.status,
        };
      } else {
        return {
          error: "Please check your credientials and try again !!",
          code: res.status,
        };
      }
    } else {
      const data = await res.json();
      const session = await encrypt(data);
      cookies().set("session", session, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 1000),
      });
      revalidatePath("/", "layout");
      return {
        code: res.status,
        message: "You have been loggedin successfully !!",
      };
    }
  } catch (err) {
    return {
      code: 500,
      error: "Internal server error !!",
    };
  }
};
