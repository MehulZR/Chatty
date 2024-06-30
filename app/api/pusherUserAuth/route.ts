import pusher from "@/config/pusher";
import { z } from "zod";
import prisma from "@/db/client";
import { auth } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const requestFormDataSchema = z.string();

export async function POST(req: NextRequest) {
  const userId = await auth(cookies().get("Authentication")?.value);
  if (!userId) return Response.json("Unauthoried", { status: 401 });

  try {
    const formData = await req.formData();

    const unparsedFormData = formData.get("socket_id");
    const parsedRequestBody = requestFormDataSchema.safeParse(unparsedFormData);
    if (!parsedRequestBody.success)
      throw new Error(parsedRequestBody.error.toString());

    const socket_id = parsedRequestBody.data;

    const userName = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });

    const authResponse = pusher.authenticateUser(socket_id, {
      id: userId.toString(),
      user_info: { name: userName?.name },
    });

    return Response.json(authResponse);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request")
        return Response.json("Bad Request", { status: 400 });
      return Response.json("Internal Server Error", { status: 500 });
    }
  }
}
