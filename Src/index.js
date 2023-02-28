require("dotenv").config();
const Server = require('../Src/Middleware/Middleware');
const server = new Server();
server.listen();

