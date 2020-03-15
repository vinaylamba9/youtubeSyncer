const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

io.on("connection", socket => {
  socket.on("playerEvent", message => {
    io.emit("playerEvent", message);
    console.log(message);
  });
  socket.on("progressEvent", message => {
    io.emit("progressEvent", message);
    console.log(message);
  });
  socket.on("buffering", message => {
    io.emit("buffering", message);
    console.log(message);
  });
  console.log(`A user connected...`);
});

http.listen(PORT, () => "Server started...");
