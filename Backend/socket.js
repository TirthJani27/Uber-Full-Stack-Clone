const socketIo = require("socket.io");
const captainModel = require("./model/captain.model");
const userModel = require("./model/user.model");

let io = null;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // or your frontend's URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType == "user") {
        console.log(`User ${userId} is joined`);

        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType == "captain") {
        console.log(`Captain ${userId} is joined`);
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected: ", socket.id);
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, userType, location } = data;
      console.log(`User ${userId} updated location to`, location);

      if (
        !location ||
        location.ltd === undefined ||
        location.lng === undefined
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      if (userType == "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      }
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    return true;
  }
  console.warn(`Socket ID ${socketId} not found or IO not initialized.`);
  return false;
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
