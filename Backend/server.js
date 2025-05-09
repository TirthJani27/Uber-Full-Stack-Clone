const http = require("http");
const cors = require("cors");
const app = require("./app");
const { initializeSocket } = require("./socket");
const port = process.env.PORT || 8000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log("Server listening to port ", port);
});
