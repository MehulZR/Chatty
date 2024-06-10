import pusher from "@/config/pusher";
import prisma from "@/db/client";
import z from "zod";
import { auth } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const requestFormDataSchema = z.object({
  socket_id: z.string(),
  channel_name: z.string(),
});

export async function POST(req: NextRequest) {
  const userId = auth(cookies().get("Authentication")?.value);
  if (!userId) return Response.json("Unauthorised", { status: 401 });

  try {
    const formData = await req.formData();
    const unparsedFormData = {
      socket_id: formData.get("socket_id"),
      channel_name: formData.get("channel_name"),
    };

    const parsedRequestBody = requestFormDataSchema.safeParse(unparsedFormData);
    if (!parsedRequestBody.success) throw new Error("Bad Request");

    const { socket_id, channel_name } = parsedRequestBody.data;

    if (![`private-${userId}`, "presence-global"].includes(channel_name))
      throw new Error(`Unauthorised channel: ${channel_name}`);

    const user_name = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });

    const presenceData = {
      user_id: userId.toString(),
      user_info: { name: user_name?.name },
    };

    const authResponse =
      channel_name === "presence-global"
        ? pusher.authorizeChannel(socket_id, channel_name, presenceData)
        : pusher.authorizeChannel(socket_id, channel_name);

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
