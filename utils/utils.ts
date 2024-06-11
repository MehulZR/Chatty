import { z } from "zod";
import * as jose from "jose";

export const jwtPayloadSchema = z.object({
  id: z.number(),
});

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
