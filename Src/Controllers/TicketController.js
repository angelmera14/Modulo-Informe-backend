const { response, request } = require("express");
const { ticketervices } = require("../Services/TicketService.js");
class TicketControllers {
  async listartipotickets(req = request, res = response) {
    const datatipotickets = await ticketervices.bucarTipoTickets();
    res.json(datatipotickets);
  }
  async grabaTipoticket(req = request, res = response) {
    const { tipo, estado } = req.body;
    const dataTipoTickets = await ticketervices.guardatipoticket(tipo, estado);
    res.json(dataTipoTickets);
  }
  async grabarticket(req = request, res = response) {
    const { idempresa, tipo, contacto, descripcion, creado } = req.body;
    const datatickets = await ticketervices.grabarTicket(
      idempresa,
      tipo,
      contacto,
      descripcion,
      creado
    );
    res.json(datatickets);
  }
  async listarticketpndientes(req = request, res = response) {
    const datatickets = await ticketervices.listarTicketPendientes();
    res.json(datatickets);
  }
  async listarticketxidControlller(req = request, res = response) {
    const { idticket } = req.params;
    const datatickets = await ticketervices.buscarticketsxid(idticket);
    res.json(datatickets);
  }
  async actualizaTickets(req = request, res = response) {
    const { dataticket } = req.body;
    const datatickets = await ticketervices.actualizaTicket(dataticket);
    res.json(datatickets);
  }
  async consultaRequerimientoController(req = request, res = response) {
    const { filtros } = req.body;
    const datatickets = await ticketervices.buscartiporequerimiento(filtros);
    res.json(datatickets);
  }
  async consultaticketodocontroller(req = request, res = response) {
    const datatickets = await ticketervices.buscartodosrequerimiento();
    res.json(datatickets);
  }
  async enviacorreoController(req = request, res = response) {
    const { daTicket } = req.body;
    const datatickets = await ticketervices.enviacorreo(daTicket);
    res.json(datatickets);
  }
  async actualizartipoticket(req = request, res = response) {
    const { datipoTicket } = req.body;
    const datatipotickets = await ticketervices.actualizartipoticket(datipoTicket);
    res.json(datatipotickets);
  }
  async obtenerDatosInicioAsync(req = request, res = response) {
    const datos = await ticketervices.obtenerDatosInicio();
    res.json(datos);
  }
}
const ticketController = new TicketControllers();
module.exports = { ticketController };
