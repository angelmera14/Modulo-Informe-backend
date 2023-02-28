const EmpresaModels = require("../Database/Models/empresa");
const { Op } = require("sequelize");
const {encriptaClave}=require("../Helpers/FuncionesPrimarias");
const { request } = require("express");
const db = require("../Database/dbConexion");
const { QueryTypes, Sequelize, where } = require("sequelize");
class EmpresaServices {
  async BuscarTodasLasEmpresas() {
    try {
      const verificaEmpresas = await EmpresaModels.findAll({
        // where: {
        //   [Op.and]: [{ email: codigo }, { clave: clave }],
        // },
		order: [
            ['nombre_empresa', 'ASC'],
        ],
      });
      return { status: true, data: verificaEmpresas };
    } catch (error) {
      return { status: true, data: "Error Inesperado " };
    }
  }
  async GuardarEmpresas(nombre, representante, contacto, email, password, ruc) {
    try {
   const nuevaClave=await encriptaClave(password);
      const verificaEmpresas = await EmpresaModels.create({
        nombre_empresa: nombre,
        representante: representante,
        tlf_contacto: contacto,
        email: email,
        password: nuevaClave,
        ruc: ruc,
        activo: 1,
      });
      console.log(verificaEmpresas);
      return { status: true, data: verificaEmpresas };
    } catch (error) {
      console.log(error);
      return { status: false, data: "Error Inesperado " };
    }
  }
  async ActualizarEmpresa(dataEmpresa){
    try {
      console.log(dataEmpresa)
      console.log(dataEmpresa.password)
      const clave = encriptaClave(dataEmpresa.password)
      //console.log(dataEmpresa.nombre,dataEmpresa.representante,dataEmpresa.email,dataEmpresa.contacto,clave,dataEmpresa.ruc)
      const updateTipoReque = await db.query(`UPDATE empresa SET nombre_empresa = '${dataEmpresa.nombre}',
      representante = '${dataEmpresa.representante}', email = '${dataEmpresa.email}', tlf_contacto = '${dataEmpresa.contacto}',
      password = '${clave}', ruc = '${dataEmpresa.ruc}' WHERE idempresa = '${dataEmpresa.idemp}' 
      `, { type: QueryTypes.UPDATE });
      return { status: true, data: 'estamos editando empresa' };
    } catch (error) {
      console.log(error)
      return { status: false, data: error };
    }
  }
}
const empresaServices = new EmpresaServices();
module.exports = { empresaServices };
