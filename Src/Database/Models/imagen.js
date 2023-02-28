const Sequelize = require('sequelize');
const db = require("../dbConexion");
module.exports = function(sequelize, DataTypes) {
  return db.define('imagen', {
    idimagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ticket',
        key: 'idticket'
      }
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'imagen',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idimagen" },
        ]
      },
      {
        name: "id_ticket_idx",
        using: "BTREE",
        fields: [
          { name: "id_ticket" },
        ]
      },
    ]
  });
};
