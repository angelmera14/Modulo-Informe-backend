const ContactoModels = require("../Database/Models/contacto");
// let fecharutapdf= dateFormat(hoy, "yyyymmdd");
// const hoy = new Date();
// var fecha =
//   hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
const { Op } = require("sequelize");
class ContactoServices {
  async bucarContactos() {
    try {
      const verificarContactos = await ContactoModels.findAll();
      return { status: true, data: verificarContactos };
    } catch (error) {
      return { status: true, data: [], error: error.message };
    }
  }
  async grabarContactos(idempresa, tipo, contacto, descripcion) {
    try {
      ///const clavencryptada= encriptaClave(clave);
      console.log("miraaa", idempresa, tipo, contacto, descripcion)
      const guardarticket = await ContactoModels.create({
        idempresa: idempresa,
        tipo: tipo,
        contacto: contacto,
        descripcion: descripcion,
      });
      return { status: true, data: guardarticket };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async guardarContactos(idcontacto,
    nombre_contacto,
    email_contacto,
    tlg_contacto,
    cargo,
    empresa) {
    try {
      ///const clavencryptada= encriptaClave(clave);
      console.log("miraaa", idcontacto,
        nombre_contacto,
        email_contacto,
        tlg_contacto,
        cargo,
        empresa)
      const contacto = await ContactoModels.create({
        idcontacto,
        nombre_contacto,
        email_contacto,
        tlg_contacto,
        cargo,
        empresa
      });
      return { status: true, data: contacto };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
}
const contactoServices = new ContactoServices();
module.exports = { contactoServices };
