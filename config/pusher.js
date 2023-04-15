import * as Pusher from "pusher";
export default new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  host: process.env.PUSHER_APP_HOST,
  port: process.env.PUSHER_APP_PORT,
  useTLS: true,
});
