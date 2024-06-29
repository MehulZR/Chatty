import { authorizationURL } from "@/config/oauth";

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET() {
  return Response.redirect(authorizationURL);
}
