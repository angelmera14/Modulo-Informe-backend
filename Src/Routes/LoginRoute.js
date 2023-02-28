const { Router } = require("express");
const { loginController } = require("../Controllers/LoginController");
const loginRouter = Router();

loginRouter.post("/authlogin", loginController.authOperador);
module.exports = loginRouter;
