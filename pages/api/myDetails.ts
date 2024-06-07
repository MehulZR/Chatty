import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/db/client";

interface JWTPaylod {
  id: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") throw new Error("Bad Request");
    else if (!req.cookies?.Authentication) throw new Error("Unauthorized");

    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY!,
    ) as JWTPaylod;

    const response = await prisma.user.findFirst({
      where: {
        id: Number(decoded.id),
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    });

    if (response === null) {
      res.redirect("/api/logout");
      return;
    }

    res.json({
      name: response.name,
      id: response.id,
      picture: response.picture,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request") res.status(400).send(err);
      else if (err.message === "Unauthorized") res.status(401).send(err);
      else if (
        ["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(
          err.name,
        )
      )
        res.redirect("/api/logout");
      else res.status(500).send("Internal Server Error");
    }
  }
};
export default handler;
