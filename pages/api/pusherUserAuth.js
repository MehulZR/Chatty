import jwt from "jsonwebtoken";
import pusher from "../../config/pusher";
export default async (req, res) => {
  try {
    if (!Object.hasOwnProperty.call(req.cookies, "Authentication"))
      throw new Error("Unauthorized");
    const socket_id = req.body.socket_id;
    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY
    );
    const authResponse = pusher.authenticateUser(socket_id, {
      user_info: { name: decoded.name },
    });
    res.send(authResponse);
  } catch (err) {
    console.log(err);
    if (err.message === "Bad Request") res.status(400).send(err);
    else if (err.message === "Unauthorized") res.status(401).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
