import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import pusher from "../../../config/pusher.ts";
import prisma from "../../../db/client.ts";
interface JWTPayload {
  id: string;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies?.Authentication) throw new Error("Unauthorized");

    const socket_id = req.body.socket_id;

    const channel_name = req.body.channel_name;

    if (!process.env.JWT_PUBLIC_KEY)
      throw new Error("JWT_PUBLIC_KEY not found");

    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY
    ) as JWTPayload;

    if (
      channel_name != `private-${decoded.id}` &&
      channel_name != "presence-global"
    )
      throw new Error("Forbidden");

    const user_name = await prisma.user.findUnique({
      where: {
        id: Number(decoded.id),
      },
      select: {
        name: true,
      },
    });

    const presenceData = {
      user_id: decoded.id,
      user_info: { name: user_name },
    };

    let authResponse;

    if (channel_name === "presence-global") {
      authResponse = pusher.authorizeChannel(
        socket_id,
        channel_name,
        presenceData
      );
    } else authResponse = pusher.authorizeChannel(socket_id, channel_name);

    res.status(200).send(authResponse);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request") res.status(400).send(err);
      else if (err.message === "Unauthorized") res.status(401).send(err);
      else if (err.message === "Forbidden") res.status(403).send(err);
      else res.status(500).send("Internal Server Error");
    }
  }
};
