const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    //logging: false,
    // dialectOptions: {
    //     options: {
    //         validateBulkLoadParameters: true,
    //         encrypt: true,
    //         trustServerCertificate: true,
    //         // hostNameInCertificate: '*.database.windows.net',
    //         loginTimeout: 30,
    //     },
    // },
    //pool: {
        // max: 5,
        // min: 0,
        // acquire: 30000,
        // idle: 10000
    //}
  }
);
try {
  db.authenticate()
    .then(() => console.log("Se establecio Conexion con la Base de Datos."))
    .catch((err) => console.log("Error:" + err));
} catch (error) {
  console.log(error);
}

module.exports = db;
