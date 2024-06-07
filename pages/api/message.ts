import { NextApiRequest, NextApiResponse } from "next";
import pusher from "@/config/pusher";
import jwt from "jsonwebtoken";
import prisma from "@/db/client";
import { z } from "zod";

interface JWTPayload {
  id: string;
}
const requestBodySchema = z.object({
  receiver_id: z.string(),
  msg: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET" && req.method !== "POST")
      throw new Error("Bad Request");
    else if (!req.cookies?.Authentication) throw new Error("Unauthorized");

    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY!,
    ) as JWTPayload;

    if (req.method === "GET") {
      if (!req.query?.receiver_id) throw new Error("Incomplete Query");

      const response = await prisma.message.findMany({
        where: {
          OR: [
            {
              sender_id: Number(decoded.id),
              receiver_id: Number(req.query.receiver_id),
            },
            {
              sender_id: Number(req.query.receiver_id),
              receiver_id: Number(decoded.id),
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
        skip: Number(req.query.skip),
        take: 50,
      });

      res.status(200).json(response);
    } else {
      const parsedRequestBody = requestBodySchema.safeParse(req.body);
      if (!parsedRequestBody.success) {
        throw new Error("Incomplete Query");
      }

      const dbResponse = await prisma.message.create({
        data: {
          sender_id: Number(decoded.id),
          receiver_id: Number(parsedRequestBody.data.receiver_id),
          message: parsedRequestBody.data.msg,
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
      res.status(200).send({
        status: "Message was sent",
        data: response,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Unauthorized") res.status(401).send(err);
      else if (
        err.message === "Bad Request" ||
        err.message === "Incomplete Query"
      )
        res.status(400).send(err);
      else res.status(500).send("Internal Server Error");
    }
  }
};

export default handler;
