import Express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import ws from "./ws.js";

mongoose.connect("mongodb://localhost:27017/Chatty");

const App = Express();
App.use(cors());
authRoutes(App);

const server = App.listen(8000, () =>
  console.log("Server running on port 8000")
);

ws(server);
