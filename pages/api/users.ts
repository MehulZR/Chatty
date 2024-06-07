import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/db/client";

interface JWTPayload {
  id: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") throw new Error("Bad Request");
    else if (!req.cookies?.Authentication) throw new Error("Unauthorized");
    if (!process.env.JWT_PUBLIC_KEY)
      throw new Error("JWT_PUBLIC_KEY not found");

    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY,
    ) as JWTPayload;

    if (
      typeof req.query.query != "string" &&
      typeof req.query.query != "undefined"
    )
      throw new Error("Invalid Query");

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: !req.query.query ? "" : req.query.query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    });

    const filterdUser = users.filter((user) => user.id != Number(decoded.id));

    res.status(200).json(filterdUser);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request") res.status(400).send(err);
      else if (err.message === "Unauthorized") res.status(401).send(err);
      else res.status(500).send("Internal Server Error");
    }
  }
};
export default handler;
