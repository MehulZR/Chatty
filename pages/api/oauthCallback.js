import axios from "axios";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../config/mongodb.js";
import { getToken } from "../../config/oauth.js";

export default async (req, res) => {
  try {
    if (!req.query.hasOwnProperty("code")) throw new Error("Bad Request");
    const { tokens } = await getToken(req.query.code);
    const userInfo = (
      await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })
    ).data;
    let userMongoDBId;
    const db = (await connectToDatabase()).db(process.env.DATABASE_NAME);
    const users = db.collection("users");
    const userExist = await users.find({ googleId: userInfo.id }).toArray();
    if (!userExist.length) {
      const response = await users.insertOne({
        googleId: userInfo.id,
        name: userInfo.name,
        picture: userInfo.picture,
      });
      userMongoDBId = response.insertedId;
    } else userMongoDBId = userExist[0]._id;
    const token = jwt.sign(
      {
        name: userInfo.name,
        id: userMongoDBId,
        picture: userInfo.picture,
      },
      process.env.JWT_PRIVATE_KEY,
      { algorithm: "RS256" }
    );
    res.setHeader("Set-Cookie", [
      `Authentication=${token}; Path=/; HttpOnly; Secure;`,
      "LoggedIn=null; Path=/;",
    ]);
    res.status(200).redirect(process.env.ORIGIN);
  } catch (err) {
    console.log(err);
    if (err.message === "Bad Request") res.status(400).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
