import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { User } from "./models/users.js";
import { Message } from "./models/chatModel.js";

// Connect to MongoDB

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Define Mongoose Schema

// API Endpoints
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post("/api/signup", async (req, res) => {
  const user = new User({ ...req.body });
  await user.save();
  res.json({ success: true, message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({ success: true, message: "Login successful" });
});

app.post("/api/update-profile-pic", async (req, res) => {
  await User.updateOne(
    {
      username: req.body.username,
    },
    {
      $set: { img: req.body.profilePic },
    }
  );
  res.json(await User.findOne({ username: req.body.username }));
});

app.post("/api/edit-profile", async (req, res) => {
  await User.updateOne(
    {
      username: req.body.username,
    },
    {
      $set: { ...req.body },
    }
  );
  res.json(await User.findOne({ username: req.body.username }));
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", async ({ roomId, currentUserId }) => {
    socket.join(roomId);
    const messages = await Message.find({ roomId });
    io.to(roomId).emit("privateMessage", messages);
  });

  // Handle private messages
  socket.on( 
    "privateMessage",
    async ({ roomId, content, from, to, originalName, type }) => {
      const message = new Message({
        roomId: roomId,
        sender: from,
        recipient: to,
        content: content,
        originalName: originalName,
        type: type,
      });
      await message.save();
      const messages = await Message.find({ roomId });
      io.to(roomId).emit("privateMessage", messages);
    }
  );

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 