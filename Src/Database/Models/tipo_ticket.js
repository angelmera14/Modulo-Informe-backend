const Sequelize = require('sequelize');
const db = require("../dbConexion");

  const TipoTicketModels = 
   db.define('tipo_ticket', {
    idtipo_ticket: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      autoIncrementIdentity:(1,1)
    },
    tipo: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    estado: {
      type: Sequelize.CHAR(1),
      allowNull: true,
      defaultValue: 'N',

    }
  }, {
    Sequelize,
    tableName: 'tipo_ticket',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtipo_ticket" },
        ]
      },
    ]
  });
  module.exports=TipoTicketModels;
