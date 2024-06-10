import prisma from "@/db/client";
import { auth } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = auth(cookies().get("Authentication")?.value);
  if (!userId) return Response.json("Unauthorised", { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query ?? "",
          mode: "insensitive",
        },
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    });

    return Response.json(users);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return Response.json("Internal Server Error", { status: 500 });
    }
  }
}
