const { Router } = require("express");
const { contactoController } = require("../Controllers/ContactoController");
const contactoRouter = Router();

contactoRouter.get("/listarcontacto", contactoController.listarcontactos);
contactoRouter.post("/grabacontacto", contactoController.grabarcontactos);
module.exports = contactoRouter;
