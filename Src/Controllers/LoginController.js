const { response, request } = require("express");
const { loginServices } = require("../Services/LoginServices");
class LoginControllers {
  async authOperador(req = request, res = response) {
    const { codigo,clave } = req.body;
    console.log(req.body);
    const dataOperador = await loginServices.AuthenticationUsers(codigo,clave);
    res.json(dataOperador);
  }
}
const loginController = new LoginControllers();
module.exports = { loginController };
