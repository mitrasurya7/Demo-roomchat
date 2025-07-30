import { Server, Socket } from "socket.io";
import { Message } from "../models/message.model";

// Room-scoped user storage
const roomUsers = new Map<
  string,
  { id: string; name: string; joinedAt: Date }[]
>();

export default (io: Server, socket: Socket) => {
  const username = socket.handshake.query.username as string;
  const roomId = socket.handshake.query.roomId as string;
  const joinedAt = new Date();

  if (!roomId || !username) {
    console.log("Missing roomId or username");
    socket.disconnect();
    return;
  }

  const newUser = {
    id: socket.id,
    name: username,
    joinedAt,
  };

  socket.join(roomId);
  console.log(`User ${username} joined room ${roomId}`);

  // Tambahkan user ke list room
  if (!roomUsers.has(roomId)) {
    roomUsers.set(roomId, []);
  }
  roomUsers.get(roomId)?.push(newUser);

  // Kirim semua user di room ke user baru
  socket.emit("all_users", roomUsers.get(roomId));

  // Broadcast ke semua di room (kecuali pengirim)
  socket.to(roomId).emit("user_joined", newUser);

  // Handle pesan masuk
  socket.on("send_message", async (msg) => {
    io.to(roomId).emit("new_message", {
      text: msg,
      user: username,
      timestamp: new Date(),
    });

    await Message.create({
      user: username,
      roomId,
      text: msg,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    const users = roomUsers.get(roomId);
    if (users) {
      const index = users.findIndex((u) => u.id === socket.id);
      if (index !== -1) {
        users.splice(index, 1);
      }

      // Broadcast user keluar ke room
      socket.to(roomId).emit("user_left", socket.id);
    }

    console.log(`User ${username} disconnected from room ${roomId}`);
  });
};
