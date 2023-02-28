const { response, request } = require("express");
const { operadorServices } = require("../Services/OperadorServices");
class OperadorControllers {
  async guardaroperador(req = request, res = response) {
    const { nombre, email, departamento, telefono, detalle, clave,estado} = req.body;
    const dataOperador = await operadorServices.GuardarOperadores(nombre, email, departamento, telefono, detalle, clave,estado);
    res.json(dataOperador);
  }
  async listarTodaslosOperadores(req = request, res = response) {
    const dataOperador = await operadorServices.buscarTodoslosOperadores();
    res.json(dataOperador);
  }
  async editaroperador(req = request, res = response) {
    const {id, nombre, email, departamento, telefono, detalle, clave,estado} = req.body;
    const dataOperador = await operadorServices.EditarOperadores(id,nombre, email, departamento, telefono, detalle, clave,estado);
    res.json(dataOperador);
  }
}
const operadorController = new OperadorControllers();
module.exports = { operadorController };
