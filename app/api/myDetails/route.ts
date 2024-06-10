import prisma from "@/db/client";
import { auth } from "@/utils/utils";
import { cookies } from "next/headers";

export async function GET() {
  const userId = auth(cookies().get("Authentication")?.value);
  if (!userId) return Response.json("Unauthorised", { status: 400 });

  try {
    const response = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    });

    return Response.json({
      name: response?.name,
      id: response?.id,
      picture: response?.picture,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return Response.json("Internal Server Error", { status: 500 });
    }
  }
}
