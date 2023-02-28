const { Router } = require("express");
const { empresaController } = require("../Controllers/EmpresaControllers");
const empresaRouter = Router();

empresaRouter.post("/grabaempresa", empresaController.guardaEmpresa);
empresaRouter.get("/listarempresa", empresaController.listarTodaslasEmpresa);
empresaRouter.post("/editarempresa", empresaController.EditarEmpresa);
module.exports = empresaRouter;
