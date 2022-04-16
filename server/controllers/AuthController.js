import axios from "axios";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import oauth2Client from "../services/googleApi.js";
export default {
  login: (req, res) => {
    const scope = "https://www.googleapis.com/auth/userinfo.profile";
    const url = oauth2Client.generateAuthUrl({ scope });
    res.redirect(url);
  },
  authCallback: async (req, res) => {
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
    Users.findOne({ id: userinfo.id }).then((result) => {
      if (result == null)
        Users.create({
          name: userinfo.name,
          pictureURL: userinfo.picture,
          id: userinfo.id,
        });
    });
    jwt.sign(userinfo, process.env.JWT, { expiresIn: "24h" }, (err, token) => {
      res.cookie("Account-LoggedIn", token);
      res.redirect("http://localhost:3000");
    });
  },
};
