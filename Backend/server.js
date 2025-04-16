const http = require("http");
const cors = require("cors");
const app = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server listening to port ", port);
});
