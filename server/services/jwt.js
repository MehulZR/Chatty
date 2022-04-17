import jwt from "jsonwebtoken";
export const jwtSign = (userinfo, res) => {
  jwt.sign(
    { id: userinfo.id },
    process.env.JWT,
    { expiresIn: "24h" },
    (err, token) => {
      console.log(userinfo);
      res.cookie("Account-LoggedIn", token);
      res.redirect("http://localhost:3000");
    }
  );
};
export const jwtValidate = (token) => {
  jwt.verify(token, process.env.JWT, (err, decoded) => {});
};
