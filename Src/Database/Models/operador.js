const Sequelize= require("sequelize");
const db = require("../dbConexion");

const OperadorModels = db.define(
    "operador",
    {
      idoperador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        autoIncrementIdentity:(1,1)
      },
      nombre: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      departamento: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      detalle: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      clave: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      Sequelize,
      tableName: "operador",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "idoperador" }],
        },
      ],
    }
  );
module.exports = OperadorModels ;
