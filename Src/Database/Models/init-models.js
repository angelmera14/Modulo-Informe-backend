var DataTypes = require("sequelize").DataTypes;
var _contacto = require("./contacto");
var _empresa = require("./empresa");
var _imagen = require("./imagen");
var _operador = require("./operador");
var _ticket = require("./ticket");
var _ticket_status = require("./ticket_status");
var _tipo_ticket = require("./tipo_ticket");

function initModels(sequelize) {
  var contacto = _contacto(sequelize, DataTypes);
  var empresa = _empresa(sequelize, DataTypes);
  var imagen = _imagen(sequelize, DataTypes);
  var operador = _operador(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var ticket_status = _ticket_status(sequelize, DataTypes);
  var tipo_ticket = _tipo_ticket(sequelize, DataTypes);

  ticket.belongsTo(contacto, { as: "contacto_contacto", foreignKey: "contacto"});
  contacto.hasMany(ticket, { as: "tickets", foreignKey: "contacto"});
  ticket.belongsTo(empresa, { as: "empresa_empresa", foreignKey: "empresa"});
  empresa.hasMany(ticket, { as: "tickets", foreignKey: "empresa"});
  ticket.belongsTo(operador, { as: "operador_operador", foreignKey: "operador"});
  operador.hasMany(ticket, { as: "tickets", foreignKey: "operador"});
  imagen.belongsTo(ticket, { as: "id_ticket_ticket", foreignKey: "id_ticket"});
  ticket.hasMany(imagen, { as: "imagens", foreignKey: "id_ticket"});
  ticket_status.belongsTo(ticket, { as: "id_ticket_ticket", foreignKey: "id_ticket"});
  ticket.hasMany(ticket_status, { as: "ticket_statuses", foreignKey: "id_ticket"});
  ticket.belongsTo(tipo_ticket, { as: "tipo_tipo_ticket", foreignKey: "tipo"});
  tipo_ticket.hasMany(ticket, { as: "tickets", foreignKey: "tipo"});

  return {
    contacto,
    empresa,
    imagen,
    operador,
    ticket,
    ticket_status,
    tipo_ticket,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
