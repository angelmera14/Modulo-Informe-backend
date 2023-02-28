const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const encriptaClave =  (clave) => {
  const salt =  bcryptjs.genSaltSync(10);
  console.log(salt);
  const hash =  bcryptjs.hashSync(clave, salt);
  return hash;
};
const descriptarClave = async (clavenueva, claveantigua) => {
  const decifrarclave =  bcryptjs.compareSync(clavenueva, claveantigua);
  return decifrarclave;
};
const generarTokenAcceso = (id='') => {
  return new Promise((resolve, reject) => {
    const payload = {id};
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, (err, token) => {
      if (err) {
        reject("No se puedo generar Json Webtoken");
      } else {
        resolve(token);
      }
    });
  });
};
module.exports = { encriptaClave, descriptarClave,generarTokenAcceso };
