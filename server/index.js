import Express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import ws from "./ws.js";
import "./services/mongoose.js";
import profileRoutes from "./routes/profileRoutes.js";
const App = Express();
App.use(cors());
authRoutes(App);
profileRoutes(App);

const server = App.listen(8000, () =>
  console.log("Server running on port 8000")
);

ws(server);
