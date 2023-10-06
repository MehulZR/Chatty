import { NextApiRequest, NextApiResponse } from "next";
import pusher from "../../../config/pusher.ts";
import jwt from "jsonwebtoken";
import prisma from "../../../db/client.ts";

interface JWTPayload {
  id: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET" && req.method !== "POST")
      throw new Error("Bad Request");
    else if (!req.cookies?.Authentication) throw new Error("Unauthorized");

    const decoded = jwt.verify(
      req.cookies.Authentication!,
      process.env.JWT_PUBLIC_KEY!
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
          id: true,
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
      if (!req.body?.receiver_id || !req.body?.msg)
        throw new Error("Incomplete Query");

      const response = await prisma.message.create({
        data: {
          sender_id: Number(decoded.id),
          receiver_id: Number(req.body.receiver_id),
          message: req.body.msg,
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

      await pusher.trigger(
        `private-${req.body.receiver_id}`,
        "message",
        response
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
