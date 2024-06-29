import axios from "axios";
import { getToken } from "@/config/oauth";
import prisma from "@/db/client";
import { z } from "zod";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

const oauthRequestBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) return Response.json("Bad Requeset", { status: 401 });

  try {
    const { tokens } = await getToken(code);
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } },
    );

    const parsedResponse = oauthRequestBodySchema.safeParse(response.data);
    if (!parsedResponse.success)
      throw new Error(parsedResponse.error.toString());

    const userInfo = parsedResponse.data;

    let userId;

    const existingUser = await prisma.user.findUnique({
      where: { google_id: userInfo.id },
      select: { id: true },
    });

    if (existingUser) userId = existingUser.id;
    else {
      const newUser = await prisma.user.create({
        data: {
          name: userInfo.name,
          picture: userInfo.picture,
          google_id: userInfo.id,
        },
        select: { id: true },
      });
      userId = newUser.id;
    }

    const jsonWebToken = await new SignJWT({ id: userId })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(process.env.JWT_KEY));

    cookies().set({
      name: "Authentication",
      value: jsonWebToken,
      httpOnly: true,
      secure: true,
      maxAge: 2592000,
    });

    if (!process.env.ORIGIN) throw new Error("Origin URL not found");

    return Response.redirect(process.env.ORIGIN);
  } catch (err) {
    console.error(err);
    return Response.json("Internal Server Error", { status: 500 });
  }
}
