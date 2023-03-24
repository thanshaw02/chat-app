import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import basicRoutes from "../routes/basicRoutes";
import { Server, Socket } from "socket.io";
import ChatMessage from "../models/chatMessage";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // not secure
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(basicRoutes); // not really needed, was just playing around

// all events that need to happen when a client is connected to the socket go within this "io.on("connection", ...)" block
io.on("connection", (socket: Socket) => {
  console.log(`Someone has connected to the socket with id: ${socket.id}`);

  // let the client know what their id is
  socket.emit("current-id", socket.id);

  socket.on("new-chat", (chat: ChatMessage) => {
    console.log(`New chat from user ${chat.id}: ${chat.message}`);

    socket.broadcast.emit("new-chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

export default server;
