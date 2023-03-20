import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const authorizationURL = oauth2Client.generateAuthUrl({
  scope: "https://www.googleapis.com/auth/userinfo.profile",
});

export async function getToken(code) {
  return await oauth2Client.getToken(code);
}
