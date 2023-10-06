import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface JWTPaylod {
  name: string;
  id: string;
  picture: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") throw new Error("Bad Request");
    else if (!req.cookies?.Authentication) throw new Error("Unauthorized");

    const decoded = jwt.verify(
      req.cookies.Authentication!,
      process.env.JWT_PUBLIC_KEY!
    ) as JWTPaylod;

    res.json({
      name: decoded.name,
      id: decoded.id,
      picture: decoded.picture,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request") res.status(400).send(err);
      else if (err.message === "Unauthorized") res.status(401).send(err);
      else res.status(500).send("Internal Server Error");
    }
  }
};
