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
    res.json({
      name: decoded.name,
      id: decoded.id,
      picture: decoded.picture,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Bad Request") res.status(400).send(err);
    else if (err.message === "Unauthorized") res.status(401).send(err);
    else res.status(500).send("Internal Server Error");
  }
};
