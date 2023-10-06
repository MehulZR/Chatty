import { NextApiRequest, NextApiResponse } from "next";
import { authorizationURL } from "../../../config/oauth.ts";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(authorizationURL);
};
