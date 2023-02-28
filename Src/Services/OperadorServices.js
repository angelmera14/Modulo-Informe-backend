const OperadorModels = require("../Database/Models/operador");
const { Op } = require("sequelize");
const { encriptaClave } = require("../Helpers/FuncionesPrimarias");

class OperadorServices {
  async buscarTodoslosOperadores() {
    try {
      const verificarOperador = await OperadorModels.findAll();
      return { status: true, data: verificarOperador };
    } catch (error) {
      return { status: true, data: "Error Inesperado " };
    }
  }
  async GuardarOperadores(nombre, email, departamento, telefono, detalle, clave, estado) {
    try {
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      console.log(emailRegexp.test(email));
      if (!emailRegexp.test(email)) {
        return { status: false, data: [], error: 'Verifique el email ingresado' };
      }
      const clavencryptada = encriptaClave(clave);
      const guradaOperador = await OperadorModels.create({
        nombre: nombre,
        email: email,
        departamento: departamento,
        telefono: telefono,
        detalle: detalle,
        clave: clavencryptada,
        estado: estado
      });
      //  console.log(guradaOperador);
      return { status: true, data: guradaOperador };
    } catch (error) {
      console.log(error);
      return { status: false, data: "Error Inesperado " };
    }
  }
  async EditarOperadores(id,nombre, email, departamento, telefono, detalle, clave,estado) {
    try {
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(!emailRegexp.test(email)){
            return {status: false, data:[],error:'Verifique el email ingresado'};
      }
      const clavencryptada= encriptaClave(clave);
      const _consultaOpe= await OperadorModels.findByPk(id)
;
      _consultaOpe.nombre=nombre;
      _consultaOpe.email=email;
      _consultaOpe.departamento=departamento;
      _consultaOpe.telefono=telefono;
      _consultaOpe.clave=clavencryptada;
      _consultaOpe.detalle=detalle;
      _consultaOpe.estado=estado;
      _consultaOpe.save();
    //  console.log(guradaOperador);
      return { status: true, message:'Operador actualizado con exito.'};
    } catch (error) {
      console.log(error);
      return { status: false, message: error,info:"verifique que la informacion ingresada sea la correcta" };
    }
  }
}
const operadorServices = new OperadorServices();
module.exports = { operadorServices };
