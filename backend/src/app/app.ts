import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import basicRoutes from "../routes/basicRoutes";
import { Server } from "socket.io";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*" // not secure
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(basicRoutes);

io.on("connection", () => {
  console.log("Someone has connecte via Socket.IO!!");
});

export default server;