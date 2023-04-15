import connectToDatabase from "../../../config/mongodb.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    if (req.method !== "GET") throw new Error("Bad Request");
    else if (!Object.hasOwnProperty.call(req.cookies, "Authentication"))
      throw new Error("Unauthorized");
    const decoded = jwt.verify(
      req.cookies.Authentication,
      process.env.JWT_PUBLIC_KEY
    );
    const db = (await connectToDatabase()).db(process.env.DATABASE_NAME);
    const collection = db.collection("users");
    let result = await collection
      .find(
        !req.query.query
          ? {}
          : { name: { $regex: `${req.query.query}`, $options: "i" } }
      )
      .project({ googleId: 0 })
      .toArray();
    res.status(200).json(result.filter((user) => user._id != decoded.id));
  } catch (err) {
    console.log(err);
    if (err.message === "Bad Request") res.status(400).send(err);
    else if (err.message === "Unauthorized") res.status(401).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
