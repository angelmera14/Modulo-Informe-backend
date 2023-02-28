const OperadorModels = require("../Database/Models/operador");
const EmpresaModels = require("../Database/Models/empresa");
const { Op } = require("sequelize");
const {
  descriptarClave,
  generarTokenAcceso,
} = require("../Helpers/FuncionesPrimarias");
class LoginServices {
  async AuthenticationUsers(codigo,clave) {
    try {
      // console.log(data.email);
      // console.log( data.password);
      const verificaOperador = await OperadorModels.findOne({
        where: {
          [Op.and]: [{ email: codigo }], //, { clave: clave }
        },
      });
      if (verificaOperador) {
        const compararclave = await descriptarClave(
          clave,
          verificaOperador.clave
        );
        if (!compararclave) {
          const error = [
            {
              type: "password",
              message: "Check your password",
            },
          ];
          // return { status: false, data: 'usuario o contraseña incorrecta ingrese nuevamente' };
          return {error};
        }




        const access_token = await generarTokenAcceso(
          verificaOperador.idoperador
        );
        return {
          user: [
            {
              uuid:  verificaOperador.idoperador,
              from: "custom-db",
              password: "",
              role: "admin",
              data: {
                displayName: verificaOperador.nombre,
                photoURL: "assets/images/avatars/Abbott.jpg",
                email: verificaOperador.email,
                settings: {
                  layout: {
                    style: "layout1",
                    config: {
                      scroll: "content",
                      navbar: {
                        display: true,
                        folded: true,
                        position: "left",
                      },
                      toolbar: {
                        display: true,
                        style: "fixed",
                        position: "below",
                      },
                      footer: {
                        display: true,
                        style: "fixed",
                        position: "below",
                      },
                      mode: "fullwidth",
                    },
                  },
                  customScrollbars: true,
                  theme: {
                    main: "default",
                    navbar: "greyDark",
                    toolbar: "mainThemeLight",
                    footer: "mainThemeDark",
                  },
                },
                shortcuts: ["calendar", "mail", "contacts"],
              },
            },
          ],
          access_token,
        };
        //   return { status: true, data: verificaOperador };
      }
      // const verificaClientes = await EmpresaModels.findOne({
      //   where: {
      //     [Op.and]: [  { ruc: codigo }],
      //   },
      // });
      // if(verificaClientes){
      //   const compararclavecliente=descriptarClave(clave,verificaClientes.password);
      //   if(compararclavecliente){
      //     return { status: true, data: verificaClientes};
      //   }
      //   return { status: false, data: 'Ruc o contraseña incorrecta ingrese nuevamente' };
      // }
      const error = [
        {
          type: "email",
          message: "Verifique el Correo Ingresado",
        },
      ];
      return {error};
      // return { status: false, data: 'usuario o contraseña incorrecta ingrese nuevamente' };
    } catch (error) {
      console.log(error);
      return { status: false, error: error.message };
    }
  }
  async AuthenticationToken(token) {
    try {
      const verificaOperador = await OperadorModels.findOne({
        where: {
          [Op.and]: [{ email: codigo }], //, { clave: clave }
        },
      });
      if (verificaOperador) {
        const compararclave = await descriptarClave(
          clave,
          verificaOperador.clave
        );
        if (!compararclave) {
          const error = [
            {
              type: "password",
              message: "Check your password",
            },
          ];
          // return { status: false, data: 'usuario o contraseña incorrecta ingrese nuevamente' };
          return {error};
        }
        const access_token = await generarTokenAcceso(
          verificaOperador.idoperador
        );
        return {
          user: [
            {
              uuid:  verificaOperador.idoperador,
              from: "custom-db",
              password: "",
              role: "admin",
              data: {
                displayName: verificaOperador.nombre,
                photoURL: "assets/images/avatars/Abbott.jpg",
                email: verificaOperador.email,
                settings: {
                  layout: {
                    style: "layout1",
                    config: {
                      scroll: "content",
                      navbar: {
                        display: true,
                        folded: true,
                        position: "left",
                      },
                      toolbar: {
                        display: true,
                        style: "fixed",
                        position: "below",
                      },
                      footer: {
                        display: true,
                        style: "fixed",
                        position: "below",
                      },
                      mode: "fullwidth",
                    },
                  },
                  customScrollbars: true,
                  theme: {
                    main: "default",
                    navbar: "greyDark",
                    toolbar: "mainThemeLight",
                    footer: "mainThemeDark",
                  },
                },
                shortcuts: ["calendar", "mail", "contacts"],
              },
            },
          ],
          access_token,
        };
        //   return { status: true, data: verificaOperador };
      }
      // const verificaClientes = await EmpresaModels.findOne({
      //   where: {
      //     [Op.and]: [  { ruc: codigo }],
      //   },
      // });
      // if(verificaClientes){
      //   const compararclavecliente=descriptarClave(clave,verificaClientes.password);
      //   if(compararclavecliente){
      //     return { status: true, data: verificaClientes};
      //   }
      //   return { status: false, data: 'Ruc o contraseña incorrecta ingrese nuevamente' };
      // }
      const error = [
        {
          type: "email",
          message: "Verifique el Correo Ingresado",
        },
      ];
      return {error};
      // return { status: false, data: 'usuario o contraseña incorrecta ingrese nuevamente' };
    } catch (error) {
      console.log(error);
      return { status: false, error: error.message };
    }
  }
  async AuthenticationClientes(ruc, codigo, clave) {
    try {
      const verificaClientes = await EmpresaModels.findAll({
        where: {
          [Op.and]: [{ email: codigo }, { password: clave }, { ruc: ruc }],
        },
      });
      return { status: true, data: verificaClientes };
    } catch (error) {
      return { status: true, data: "Error Inesperada " };
    }
  }
}
const loginServices = new LoginServices();
module.exports = { loginServices };
