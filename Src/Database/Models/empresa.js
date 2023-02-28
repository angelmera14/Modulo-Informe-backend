const Sequelize = require("sequelize");
const db = require("../dbConexion");

const EmpresaModels = db.define(
  "empresa",
  {
    idempresa: {
      type: Sequelize.INTEGER,
     // allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity:(1,1)
     // defaultValue:1
    },
    nombre_empresa: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
    representante: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
    tlf_contacto: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(80),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    ruc: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    activo: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    Sequelize,
    tableName: "empresa",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        autoIncrement:true,
        using: "BTREE",
        fields: [{ name: "idempresa" }],
      },
    ],
  }
);

module.exports = EmpresaModels;
