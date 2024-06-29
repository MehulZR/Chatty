import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/utils";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const isLoggedIn = await auth(cookies().get("Authentication")?.value);

  if (isLoggedIn && req.nextUrl.pathname === "/login")
    return NextResponse.redirect(new URL("/", req.url));

  if (!isLoggedIn && req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/", "/login"],
};
