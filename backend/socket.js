const { Server } = require("socket.io");

let io;

const allowedOrigins = [
    "http://localhost:5173",
    "https://video-to-pdf-frontend.onrender.com"
];

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

    // 🔥 User joins personal room
    socket.on("join-user-room", (userId) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined room user-${userId}`);
    });

    // 🔥 Admin joins admin room
    socket.on("join-admin-room", () => {
        socket.join("admin-room");
        console.log("Admin joined admin-room");
    });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initSocket, getIO };
