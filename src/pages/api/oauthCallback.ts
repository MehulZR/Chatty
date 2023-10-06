import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getToken } from "../../../config/oauth.ts";
import prisma from "../../../db/client.ts";

interface UserInfo {
  name: string;
  picture: string;
  id: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query?.code || typeof req.query.code != "string")
      throw new Error("Bad Request");

    const { tokens } = await getToken(req.query.code);
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    const userInfo: UserInfo = response.data;
    let userId;
    const userExist = await prisma.user.findUnique({
      where: { google_id: userInfo.id },
    });
    if (!userExist) {
      const user = await prisma.user.create({
        data: {
          name: userInfo.name,
          picture: userInfo.picture,
          google_id: userInfo.id,
        },
        select: { id: true },
      });
      userId = user.id;
    } else {
      userId = userExist.id;
    }
    if (!process.env.JWT_PRIVATE_KEY)
      throw new Error("JWT_PRIVATE_KEY not found");
    const token = jwt.sign({ id: userId }, process.env.JWT_PRIVATE_KEY, {
      algorithm: "RS256",
    });
    res.setHeader("Set-Cookie", [
      `Authentication=${token}; Path=/; HttpOnly; Secure;`,
      "LoggedIn=null; Path=/;",
    ]);
    if (!process.env.ORIGIN) throw new Error("Origin URL not found");
    res.status(200).redirect(process.env.ORIGIN);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      if (err.message === "Bad Request") res.status(400).send(err);
      else res.status(500).send("Internal Server Error");
    }
  }
};
