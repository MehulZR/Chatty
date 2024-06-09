import { cookies } from "next/headers";

export function POST() {
  if (!process.env.ORIGIN) {
    console.error("Origin URL not found");
    return Response.json("Internal Server Error", { status: 500 });
  }
  cookies().delete("Authentication");
  cookies().delete("LoggedIn");
  return Response.json(null, { status: 200 });
}
