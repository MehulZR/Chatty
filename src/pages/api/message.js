import connectToDatabase from "../../../config/mongodb.js";
import pusher from "../../../config/pusher.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "POST")
      throw new Error("Bad Request");
    else if (!Object.hasOwnProperty.call(req.cookies, "Authentication"))
      throw new Error("Unauthorized");
    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY
    );
    const db = (await connectToDatabase()).db(process.env.DATABASE_NAME);
    const collection = db.collection("messages");
    if (req.method === "GET") {
      if (!req.query.hasOwnProperty("receiver_id"))
        throw new Error("Incomplete Query");
      const response = await collection
        .find({
          $or: [
            {
              sender_id: decoded.id,
              receiver_id: req.query.receiver_id,
            },

            {
              sender_id: req.query.receiver_id,
              receiver_id: decoded.id,
            },
          ],
        })
        .sort({ time_stamp: -1 })
        .skip(Number(req.query.skip))
        .limit(50)
        .project({ _id: 0 })
        .toArray();
      res.status(200).json(response);
    } else {
      if (
        !req.body.hasOwnProperty("receiver_id") ||
        !req.body.hasOwnProperty("msg")
      )
        throw new Error("Incomplete Query");
      let time_stamp = Date.now();
      let acknowledged = (
        await collection.insertOne({
          sender_id: decoded.id,
          receiver_id: req.body.receiver_id,
          msg: req.body.msg,
          time_stamp: time_stamp,
        })
      ).acknowledged;
      if (!acknowledged) throw new Error("Database Error");

      // Must not run in production
      if (process.env.NODE_ENV === "development")
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      await pusher.trigger(`private-${req.body.receiver_id}`, "message", {
        sender_id: decoded.id,
        receiver_id: req.body.receiver_id,
        msg: req.body.msg,
        time_stamp: time_stamp,
      });
      res.status(200).send("Message was sent");
    }
  } catch (err) {
    console.log(err);
    if (err.message === "Unauthorized") res.status(401).send(err);
    else if (
      err.message === "Bad Request" ||
      err.message === "Incomplete Query"
    )
      res.status(400).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
