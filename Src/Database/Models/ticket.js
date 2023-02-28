const {Sequelize,DataTypes} = require('sequelize');
const ContactoModels = require("./contacto");
const db = require("../dbConexion");
const TicketModels = db.define('ticket', {
    idticket: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      autoIncrementIdentity:(1,1)
    },
    tipo: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_ticket',
        key: 'idtipo_ticket'
      }
    },
    contacto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'contacto',
        key: 'idcontacto'
      }
    },
    descripcion: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    estado: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
	escorreo: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    creado: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW 
    },
    terminado: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    solucion: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    operador: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'operador',
        key: 'idoperador'
      }
    },
    idempresa: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'empresa',
        key: 'idempresa'
      }
    }
  }, {
    Sequelize,
    tableName: 'ticket',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idticket" },
        ]
      },
      {
        name: "id_tipo_ticket_idx",
        using: "BTREE",
        fields: [
          { name: "tipo" },
        ]
      },
      {
        name: "id_operador_idx",
        using: "BTREE",
        fields: [
          { name: "operador" },
        ]
      },
      {
        name: "id_empresa_idx",
        using: "BTREE",
        fields: [
          { name: "idempresa" },
        ]
      },
      {
        name: "id_contacto_idx",
        using: "BTREE",
        fields: [
          { name: "contacto" },
        ]
      },
    ]
  });
  TicketModels.hasMany(ContactoModels, {foreignKey: 'idcontacto',});
  //TicketModels.hasMany(ContactoModels, {primaryKey: 'idcontacto' }); as:'co' 
 // ContactoModels.belongsToMany(TicketModels, {through:'contacto', uniqueKey: 'idcontacto' });

module.exports=TicketModels
