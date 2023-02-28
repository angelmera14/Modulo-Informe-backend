const Sequelize = require('sequelize');
const db = require("../dbConexion");
module.exports = function(sequelize, DataTypes) {
  return db.define('ticket_status', {
    idticket_status: {
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
    detalle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    operador: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ticket_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idticket_status" },
        ]
      },
      {
        name: "id_ticket_pk_idx",
        using: "BTREE",
        fields: [
          { name: "id_ticket" },
        ]
      },
    ]
  });
};
