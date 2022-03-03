import Express from "express";
import cors from "cors";
import { google } from "googleapis";
import keys from "./config/keys.js";
import axios from "axios";
import jwt from "jsonwebtoken";
const App = Express();
App.use(cors());
const oauth2Client = new google.auth.OAuth2(
  keys.googleClientId,
  keys.googleClientSecret,
  "http://localhost:8000/oauth2callback"
);
const scope = "https://www.googleapis.com/auth/userinfo.profile";
const url = oauth2Client.generateAuthUrl({ scope });
App.get("/login", (req, res) => res.redirect(url));
App.get("/oauth2callback", async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${oauth2Client.credentials.access_token}`,
      },
    }
  );
  const userinfo = response.data;
  jwt.sign(userinfo, keys.JWT, { expiresIn: "24h" }, (err, token) => {
    res.cookie("Account-LoggedIn", token);
    res.redirect("http://localhost:3000");
  });
});
App.listen(8000, () => console.log("Server running on port 8000"));
