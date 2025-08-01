require("dotenv").config();
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import socketHandler from "./sockets/index.socket";
import { connectDB } from "./config/database";


const PORT = process.env.PORT || 3001;

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => socketHandler(io, socket));

// Connect to MongoDB
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
