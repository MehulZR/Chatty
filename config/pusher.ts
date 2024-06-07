import * as Pusher from "pusher";

const pusher = new Pusher.default({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.PUSHER_APP_KEY ?? "",
  secret: process.env.PUSHER_APP_SECRET ?? "",
  cluster: process.env.PUSHER_APP_CLUSTER ?? "",
  useTLS: false,
});
export default pusher;
