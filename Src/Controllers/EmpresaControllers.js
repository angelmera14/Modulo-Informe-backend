const { response, request } = require("express");
const { empresaServices } = require("../Services/EmpresaServices");
class EmpresaControllers {
  async guardaEmpresa(req = request, res = response) {
    const { nombre, representante, contacto, email, password, ruc} = req.body;
    const dataOperador = await empresaServices.GuardarEmpresas(nombre, representante, contacto, email, password, ruc);
    res.json(dataOperador);
  }
  async listarTodaslasEmpresa(req = request, res = response) {
    const dataOperador = await empresaServices.BuscarTodasLasEmpresas();
    res.status(200).json(dataOperador);
  }
  async EditarEmpresa(req = request, res = response){
    const {dataEmpresa}=req.body;
    const msjEmpresa = await empresaServices.ActualizarEmpresa(dataEmpresa);
    res.json(msjEmpresa);
  }
}
const empresaController = new EmpresaControllers();
module.exports = { empresaController };
