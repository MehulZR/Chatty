import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import * as jose from "jose";
import { jwtPayloadSchema } from "./validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function auth(jwtToken: string | undefined) {
  if (!jwtToken) return null;
  try {
    const decoded = await jose.jwtVerify(
      jwtToken,
      new TextEncoder().encode(process.env.JWT_KEY),
    );

    const parsedJWTPayload = jwtPayloadSchema.safeParse(decoded.payload);

    if (parsedJWTPayload.success) return parsedJWTPayload.data.id;
  } catch (err) {
    console.error(err);
  }
  return null;
}
