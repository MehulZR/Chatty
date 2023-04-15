import jwt from "jsonwebtoken";
import pusher from "../../../config/pusher.js";
export default async (req, res) => {
  try {
    if (!Object.hasOwnProperty.call(req.cookies, "Authentication"))
      throw new Error("Unauthorized");
    const socket_id = req.body.socket_id;
    const channel_name = req.body.channel_name;
    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY
    );
    if (
      channel_name != `private-${decoded.id}` &&
      channel_name != "presence-global"
    )
      throw new Error("Forbidden");
    const presenceData = {
      user_id: decoded.id,
      user_info: { name: decoded.name },
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
    console.log(err);
    if (err.message === "Bad Request") res.status(400).send(err);
    else if (err.message === "Unauthorized") res.status(401).send(err);
    else if (err.message === "Forbidden") res.status(403).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
