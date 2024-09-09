const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", // Allow requests from any origin
  },
}); // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

const db = {
  players: [],
};

io.on("connection", (socket) => {
  // "joinGame" listerner
  socket.on("joinGame", (user) => {
    db.players.push(user);
    console.log(user);
    io.emit("userJoined", db); // Example: Broadcasts the message to all connected clients including the sender
    // socket.broadcast.emit("userJoined", db); // Example: Broadcasts the message to all connected clients except the sender
  });

  // implement "startGame" listener

  // implement "notifyMarco" listener
  socket.on("scream", (nickname)=>{
    console.log(nickname + ' gritó');
    io.emit("scream", nickname) 
  })
  // implement "notifyPolo" listener

  // implement "onSelectPolo" listener
});

httpServer.listen(5050, () => {
  // Starts the server on port 5050, same as before but now we are using the httpServer object
  console.log(`Server is running on http://localhost:${5050}`);
});

