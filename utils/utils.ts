import { z } from "zod";
import jwt from "jsonwebtoken";

export const jwtPayloadSchema = z.object({
  id: z.number(),
});

export function auth(jwtToken: string | undefined) {
  if (!jwtToken) return null;
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_PUBLIC_KEY!);

    const parsedJWTPayload = jwtPayloadSchema.safeParse(decoded);

    if (parsedJWTPayload.success) return parsedJWTPayload.data.id;
  } catch {
    return null;
  }
}
