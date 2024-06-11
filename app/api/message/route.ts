import pusher from "@/config/pusher";
import prisma from "@/db/client";
import { NextRequest } from "next/server";
import z from "zod";
import { auth } from "@/utils/utils";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const userId = await auth(cookies().get("Authentication")?.value);

  if (!userId) return Response.json("Unauthorized", { status: 401 });

  const receiverId = request.nextUrl.searchParams.get("receiver_id");
  const skipParam = request.nextUrl.searchParams.get("skip");

  if (receiverId === null) return Response.json("Bad Request", { status: 400 });

  let skippedMessageCount = 0;

  if (Number(skipParam)) skippedMessageCount = Number(skipParam);

  try {
    const response = await prisma.message.findMany({
      where: {
        OR: [
          {
            sender_id: userId,
            receiver_id: Number(receiverId),
          },
          {
            sender_id: Number(receiverId),
            receiver_id: userId,
          },
        ],
      },
      select: {
        sender_id: true,
        message: true,
        receiver_id: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
      skip: skippedMessageCount,
      take: 50,
    });

    return Response.json(response);
  } catch (err) {
    console.error(err);
    return Response.json("Internal Server Error", { status: 500 });
  }
}

const requestBodySchema = z.object({
  receiver_id: z.string(),
  message: z.string(),
});

export async function POST(request: NextRequest) {
  const userId = await auth(cookies().get("Authentication")?.value);

  if (!userId) return Response.json("Unauthorized", { status: 401 });

  const parsedRequestBody = requestBodySchema.safeParse(await request.json());

  if (!parsedRequestBody.success)
    return Response.json("Bad Request", { status: 400 });

  const dbResponse = await prisma.message.create({
    data: {
      sender_id: userId,
      receiver_id: Number(parsedRequestBody.data.receiver_id),
      message: parsedRequestBody.data.message,
    },
    select: {
      sender_id: true,
      receiver_id: true,
      message: true,
      created_at: true,
    },
  });

  // Must not run in production
  if (process.env.NODE_ENV === "development")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const response = {
    ...dbResponse,
    created_at: dbResponse.created_at.toISOString(),
  };

  await pusher.trigger(
    `private-${parsedRequestBody.data.receiver_id}`,
    "message",
    response,
  );

  return Response.json(response);
}
