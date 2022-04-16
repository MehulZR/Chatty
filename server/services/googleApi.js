import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
  process.env.googleClientId,
  process.env.googleClientSecret,
  "http://localhost:8000/oauth2callback"
);
export default oauth2Client;
