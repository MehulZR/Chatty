import { NextRequest, NextResponse } from "next/server";
import { auth } from "./utils/utils";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const isLoggedIn = auth(cookies().get("Authentication")?.value);

  if (isLoggedIn && req.nextUrl.basePath === "/login")
    return NextResponse.redirect("/");

  if (!isLoggedIn && req.nextUrl.basePath === "/")
    return NextResponse.redirect("/login");
}

export const config = {
  match: ["/", "/login"],
};
