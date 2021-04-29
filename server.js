import path from "path";
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import fs from 'fs'
import Message from "./models/messageModel.js";
import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = path.resolve();

dotenv.config();
connectDB()

const app = express();
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  Message.find().then((result) => {
    socket.emit("preSavedMessages", result);
  });

  socket.on("join", ({ userID, name, room }, callback) => {
    if (!name) return { error: "Username is required." };
    if (!room) return { error: "Room is required." };

    const user = { userID, name, room };
    socket.join(user.room);
    callback();
  });

  socket.on("sendMessage", (userID, name, room, message, image) => {
    const newMessage = new Message({ userID, name, room, text: message, image });

    newMessage.save().then(() => {
      fs.readFile(image, ()=> {
        io.to(room).emit("message", { userID, name, text: message, image });
      })
    });
  });
});

httpServer.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.red.bold
  )
);
