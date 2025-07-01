const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const FRONTENDURL = process.env.FRONTENDURL || "http://localhost:5173";
// console.log("port:", FRONTENDURL);
const io = new Server(server, {
  cors: {
    origin: FRONTENDURL, // Your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: FRONTENDURL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hey you are there?" });
});

// Store connected users
const users = new Map(); // Map to store socket ID -> user data

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining with their data
  socket.on("join", (userData) => {
    // console.log("userData", userData);
    users.set(socket.id, userData);
    io.emit("userList", Array.from(users.values()));
  });
  // console.log("usersList:", users);
  // Handle direct message

  socket.on(
    "sendMessage",
    ({ recipientId, message, senderId, timestamp, type, track }, callback) => {
      console.log(
        `sendMessage event: from ${senderId} to ${recipientId}: ${message} (type: ${type})`
      );
      if (senderId === recipientId) {
        console.error(
          `Invalid: senderId (${senderId}) cannot equal recipientId`
        );
        if (callback)
          callback({ status: "error", error: "Cannot send message to self" });
        return;
      }
      const recipientSocket = Array.from(users.entries()).find(
        ([_, user]) => user.userId === recipientId
      );
      if (recipientSocket) {
        const [recipientSocketId, recipient] = recipientSocket;
        const messageData = {
          senderId,
          recipientId,
          message,
          timestamp,
          type,
          track,
        };
        console.log(
          `Emitting receiveMessage to recipient ${recipient.userId} (socket ${recipientSocketId})`
        );
        io.to(recipientSocketId).emit("receiveMessage", messageData);
        console.log(
          `Emitting receiveMessage to sender ${senderId} (socket ${socket.id})`
        );
        io.to(socket.id).emit("receiveMessage", messageData);
        if (callback) callback({ status: "success" });
      } else {
        console.error(`Recipient not found for userId: ${recipientId}`);
        console.log("Current users:", Array.from(users.values()));
        if (callback)
          callback({
            status: "error",
            error: `Recipient ${recipientId} not found`,
          });
      }
    }
  );

  socket.on("selectTrack", ({ recipientId, senderId, track }, callback) => {
    console.log(
      `selectTrack event: from ${senderId} to ${recipientId} track ${track.id}`
    );
    if (senderId === recipientId) {
      if (callback)
        callback({ status: "error", error: "Cannot select track with self" });
      return;
    }
    const recipientSocket = Array.from(users.entries()).find(
      ([_, user]) => user.userId === recipientId
    );
    if (recipientSocket) {
      const [recipientSocketId, recipient] = recipientSocket;
      const trackData = { senderId, recipientId, track };
      console.log(
        `Emitting selectTrack to recipient ${recipient.userId} (socket ${recipientSocketId})`
      );
      io.to(recipientSocketId).emit("selectTrack", trackData);
      console.log(
        `Emitting selectTrack to sender ${senderId} (socket ${socket.id})`
      );
      io.to(socket.id).emit("selectTrack", trackData);
      if (callback) callback({ status: "success" });
    } else {
      console.error(`Recipient not found for userId: ${recipientId}`);
      if (callback)
        callback({
          status: "error",
          error: `Recipient ${recipientId} not found`,
        });
    }
  });

  socket.on(
    "playAudio",
    ({ recipientId, senderId, currentTime, previewUrl }, callback) => {
      console.log(
        `playAudio event: from ${senderId} to ${recipientId} at ${currentTime} with ${previewUrl}`
      );
      if (senderId === recipientId) {
        if (callback)
          callback({ status: "error", error: "Cannot play audio with self" });
        return;
      }
      const recipientSocket = Array.from(users.entries()).find(
        ([_, user]) => user.userId === recipientId
      );
      if (recipientSocket) {
        const [recipientSocketId, recipient] = recipientSocket;
        const audioData = { senderId, recipientId, currentTime, previewUrl };
        console.log(
          `Emitting playAudio to recipient ${recipient.userId} (socket ${recipientSocketId})`
        );
        io.to(recipientSocketId).emit("playAudio", audioData);
        console.log(
          `Emitting playAudio to sender ${senderId} (socket ${socket.id})`
        );
        io.to(socket.id).emit("playAudio", audioData);
        if (callback) callback({ status: "success" });
      } else {
        console.error(`Recipient not found for userId: ${recipientId}`);
        if (callback)
          callback({
            status: "error",
            error: `Recipient ${recipientId} not found`,
          });
      }
    }
  );

  socket.on(
    "pauseAudio",
    ({ recipientId, senderId, currentTime, previewUrl }, callback) => {
      console.log(
        `pauseAudio event: from ${senderId} to ${recipientId} at ${currentTime} with ${previewUrl}`
      );
      if (senderId === recipientId) {
        if (callback)
          callback({ status: "error", error: "Cannot pause audio with self" });
        return;
      }
      const recipientSocket = Array.from(users.entries()).find(
        ([_, user]) => user.userId === recipientId
      );
      if (recipientSocket) {
        const [recipientSocketId, recipient] = recipientSocket;
        const audioData = { senderId, recipientId, currentTime, previewUrl };
        console.log(
          `Emitting pauseAudio to recipient ${recipient.userId} (socket ${recipientSocketId})`
        );
        io.to(recipientSocketId).emit("pauseAudio", audioData);
        console.log(
          `Emitting pauseAudio to sender ${senderId} (socket ${socket.id})`
        );
        io.to(socket.id).emit("pauseAudio", audioData);
        if (callback) callback({ status: "success" });
      } else {
        console.error(`Recipient not found for userId: ${recipientId}`);
        if (callback)
          callback({
            status: "error",
            error: `Recipient ${recipientId} not found`,
          });
      }
    }
  );

  socket.on(
    "seekAudio",
    ({ recipientId, senderId, currentTime, previewUrl }, callback) => {
      console.log(
        `seekAudio event: from ${senderId} to ${recipientId} to ${currentTime} with ${previewUrl}`
      );
      if (senderId === recipientId) {
        if (callback)
          callback({ status: "error", error: "Cannot seek audio with self" });
        return;
      }
      const recipientSocket = Array.from(users.entries()).find(
        ([_, user]) => user.userId === recipientId
      );
      if (recipientSocket) {
        const [recipientSocketId, recipient] = recipientSocket;
        const audioData = { senderId, recipientId, currentTime, previewUrl };
        console.log(
          `Emitting seekAudio to recipient ${recipient.userId} (socket ${recipientSocketId})`
        );
        io.to(recipientSocketId).emit("seekAudio", audioData);
        console.log(
          `Emitting seekAudio to sender ${senderId} (socket ${socket.id})`
        );
        io.to(socket.id).emit("seekAudio", audioData);
        if (callback) callback({ status: "success" });
      } else {
        console.error(`Recipient not found for userId: ${recipientId}`);
        if (callback)
          callback({
            status: "error",
            error: `Recipient ${recipientId} not found`,
          });
      }
    }
  );
  //
  // Handle disconnection
  socket.on("disconnect", () => {
    const userData = users.get(socket.id);
    if (userData) {
      console.log(`${userData.username} disconnected (socket ${socket.id})`);
      users.delete(socket.id);
      io.emit("userList", Array.from(users.values()));
    }
  });
});

server.listen(PORT, () => {
  console.log("WebSocket server running on port 5000");
});

// app.listen(3001);
