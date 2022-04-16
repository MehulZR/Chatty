import { WebSocketServer } from "ws";
export default (server) => {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    ws.on("message", (msg) => console.log(msg.toString()));
  });
};
