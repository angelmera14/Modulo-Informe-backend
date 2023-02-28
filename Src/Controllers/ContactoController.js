const { response, request } = require("express");
const { contactoServices } = require("../Services/ContactoService");
class ContactoControllers {
  async listarcontactos(req = request, res = response) {
    const datacontacto = await contactoServices.bucarContactos();
    res.json(datacontacto);
  }
  async guardarcontactos(req = request, res = response) {
    const { idempresa, tipo, contacto, descripcion } = req.body;
    const datatickets = await contactoServices.grabarContactos(idempresa, tipo, contacto, descripcion);
    res.json(datatickets);
  }
  async grabarcontactos(req = request, res = response) {
    const {
      idcontacto,
      nombre_contacto,
      email_contacto,
      tlg_contacto,
      cargo,
      empresa
    } = req.body;
    const contacto = await contactoServices.guardarContactos(
      idcontacto,
      nombre_contacto,
      email_contacto,
      tlg_contacto,
      cargo,
      empresa
    );
    res.json(contacto);
  }
}
const contactoController = new ContactoControllers();
module.exports = { contactoController };
