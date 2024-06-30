export const dynamic = "force-dynamic";

import { authorizationURL } from "@/config/oauth";

export function GET() {
  return Response.redirect(authorizationURL);
}
