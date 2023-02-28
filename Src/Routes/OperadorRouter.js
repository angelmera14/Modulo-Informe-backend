const { Router } = require("express");
const { operadorController } = require("../Controllers/OperadorController");
const operadorRouter = Router();
operadorRouter.post("/grabaroperador", operadorController.guardaroperador);
operadorRouter.get("/listaroperador", operadorController.listarTodaslosOperadores);
operadorRouter.post("/editaroperador", operadorController.editaroperador);
module.exports = operadorRouter;
