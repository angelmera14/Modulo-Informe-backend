const { Router } = require("express");
const { ticketController } = require("../Controllers/TicketController");
const ticketRouter = Router();

ticketRouter.get("/tipoticket", ticketController.listartipotickets);
ticketRouter.get("/listarticketpendientes", ticketController.listarticketpndientes);
ticketRouter.post("/grabarticket", ticketController.grabarticket);
ticketRouter.post("/grabartippoticket", ticketController.grabaTipoticket);
ticketRouter.post("/actualizaticket", ticketController.actualizaTickets);
ticketRouter.post("/listartiporequerimientos", ticketController.consultaRequerimientoController);
ticketRouter.get("/listicketxid/:idticket", ticketController.listarticketxidControlller);
ticketRouter.get("/listarticketodos", ticketController.consultaticketodocontroller);
ticketRouter.post("/enviacorreo", ticketController.enviacorreoController);
ticketRouter.post("/actualizartipoticket", ticketController.actualizartipoticket);
ticketRouter.get("/obtenerdatosinicio", ticketController.obtenerDatosInicioAsync);
module.exports = ticketRouter;
