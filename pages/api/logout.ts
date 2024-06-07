import { NextApiRequest, NextApiResponse } from "next";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Set-Cookie", [
      "Authentication=null; Path=/; Max-Age=0;",
      "LoggedIn=null; Path=/; Max-Age=0;",
    ]);
    if (!process.env.ORIGIN) throw new Error("Origin URL not found");
    res.status(200).redirect(process.env.ORIGIN);
  } catch (err) {
    console.error(err instanceof Error);
    res.status(500).send("Internal server error");
  }
};

export default handler;
