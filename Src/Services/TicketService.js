const TipoTicketModels = require("../Database/Models/tipo_ticket");
const TicketModels = require("../Database/Models/ticket");
const ContactoModels = require("../Database/Models/contacto");
const fs = require("fs");
const db = require("../Database/dbConexion");
//var dateFormat =require( "dateformat");
const { QueryTypes, Sequelize, Op, where } = require("sequelize");
var moment = require("moment");
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
const { Pdf } = require("../Utils/generarPdf");
const { Excel } = require("../Utils/generarExcel");
class TicketServices {
  async bucarTipoTickets() {
    try {
      const verificarTipoTicket = await TipoTicketModels.findAll();
      return { status: true, data: verificarTipoTicket };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async guardatipoticket(tipo, estado) {
    try {
      const guardaticket = await TipoTicketModels.create({
        tipo: tipo,
        estado: estado,
      });
      return { status: true, data: guardaticket };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async grabarTicket(idempresa, tipo, contacto, descripcion, creado) {
    try {
      console.log(creado);
      const guardarticket = await TicketModels.create({
        idempresa: idempresa,
        tipo: tipo,
        contacto: contacto,
        descripcion: descripcion,
        estado: 0,
        creado: creado,
        escorreo: 0,
      });
      return { status: true, data: [{ nticket: guardarticket.idticket }] };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async actualizaTicket(dataticket) {
    try {
      // console.log(dataticket)
      // if (dataticket.essolucion === 1) {
      //   dataticket.estado = 1;
      //   dataticket.fecha = new Date().toISOString().substring(0,10)
      // } else {
      //   dataticket.estado = 1;
      //   console.log("entrrooo")
      // }
      dataticket.fecha = new Date().toISOString().substring(0, 10);
      const dataactualiza = await TicketModels.update(
        {
          operador: dataticket.idoperador,
          estado: dataticket.estado,
          terminado: dataticket.terminado,
          solucion: dataticket.solucion,
          contacto: dataticket.idcontacto,
        },
        { where: { idticket: dataticket.idticket } }
      );
      return { status: true, data: dataactualiza };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async listarTicketPendientes() {
    try {
      const buscarTickets = await db.query("CALL SP_CONSULTATICKET(:OP)", {
        replacements: {
          OP: 1,
        },
      });
      return { status: true, data: buscarTickets };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async buscarticketsxid(idticket) {
    try {
      const dataactualiza = await db.query(
        `
      SELECT t.idticket,t.idempresa,t.tipo,t.contacto,t.descripcion,t.operador,t.creado,
      e.nombre_empresa,c.nombre_contacto,o.nombre AS 'nombre_operador'
      FROM ticket t inner join empresa e ON t.idempresa=e.idempresa inner join contacto c
      on t.contacto =c.idcontacto inner join operador o on t.operador =o.idoperador
      where t.idticket=${idticket} and t.estado=0
      `,
        { type: QueryTypes.SELECT }
      );
      return { status: true, data: dataactualiza };
    } catch (error) {
      console.log(error);
      return { status: false, data: [], error: error.message };
    }
  }

  async buscartiporequerimiento(filtros) {
    try {
      //console.log(filtros.fechadesde);
      //console.log(filtros.fechahasta);

      console.log("miraaaaaaaaaaaaa", String(filtros));

      const fechadesde = moment(filtros.fechadesde).format("YYYY-MM-DD");
      const fechahasta = moment(filtros.fechahasta).format("YYYY-MM-DD");

      let _datatiporequerimiento;
      if (String(filtros.idempresa).trim().length === 0) {
        _datatiporequerimiento = await db.query(
          `
			SELECT t.idticket,e.nombre_empresa,t.creado,c.nombre_contacto,t.descripcion,tt.tipo,t.solucion,t.escorreo,o.idoperador,o.nombre,
				CASE t.estado WHEN 0 THEN 'Pendiente' WHEN 1 THEN 'Solucionado' ELSE NULL END as 'Estado'
			FROM ticket t INNER JOIN operador o ON t.operador = o.idoperador  
			INNER JOIN empresa e ON t.idempresa = e.idempresa
			INNER JOIN contacto c ON t.contacto = c.idcontacto
			INNER JOIN tipo_ticket tt ON t.tipo = tt.idtipo_ticket
			WHERE t.creado BETWEEN '${fechadesde}' AND '${fechahasta}'  AND  t.estado = ${filtros.estado} AND t.escorreo = ${filtros.escorreo} `,
          { type: QueryTypes.SELECT }
        );
      } else {
        _datatiporequerimiento = await db.query(
          `
      SELECT t.idticket,e.nombre_empresa,t.creado,c.nombre_contacto,t.descripcion,tt.tipo,t.solucion,t.escorreo,o.idoperador,o.nombre,
      CASE t.estado WHEN 0 THEN 'Pendiente' WHEN 1 THEN 'Solucionado' ELSE NULL END as 'Estado'
      FROM ticket t INNER JOIN operador o ON t.operador = o.idoperador  
        INNER JOIN empresa e ON t.idempresa = e.idempresa
        INNER JOIN contacto c ON t.contacto = c.idcontacto
        INNER JOIN tipo_ticket tt ON t.tipo = tt.idtipo_ticket
        WHERE t.creado BETWEEN '${fechadesde}' AND '${fechahasta}'  AND  t.estado = ${filtros.estado} AND t.escorreo = ${filtros.escorreo}
        AND t.idempresa = ${filtros.idempresa}
      `,
          { type: QueryTypes.SELECT }
        );
      }

      //console.log(fechadesde);
      //console.log(fechahasta);
      // console.log(_datatiporequerimiento);

      return { status: true, data: _datatiporequerimiento };
    } catch (error) {
      console.log(error);
      return { status: false, data: [], error: error.message };
    }
  }

  async buscartodosrequerimiento() {
    try {
      //console.log(filtros.fechadesde);
      //console.log(filtros.fechahasta);
      //  const fechadesde=moment(filtros.fechadesde).format( "YYYY-MM-DD");
      //   const fechahasta=moment(filtros.fechahasta).format("YYYY-MM-DD");
      const _datatiporequerimiento = await db.query(
        `
    SELECT t.idticket,e.nombre_empresa,t.creado,c.nombre_contacto,t.descripcion,tt.tipo,t.solucion,o.idoperador,o.nombre,t.escorreo, /*t.estado,*/
    CASE t.estado
          WHEN 0 THEN 'Pendiente'
          WHEN 1 THEN 'Solucionado'
          ELSE NULL
      END as 'Estado'
    FROM ticket t 
      INNER JOIN operador o ON t.operador = o.idoperador  
      INNER JOIN empresa e ON t.idempresa = e.idempresa
      INNER JOIN contacto c ON t.contacto = c.idcontacto
      INNER JOIN tipo_ticket tt ON t.tipo = tt.idtipo_ticket
	  order by e.nombre_empresa asc ;
    `,
        { type: QueryTypes.SELECT }
      );

      //console.log(fechadesde);
      //console.log(fechahasta);   // console.log(_datatiporequerimiento);
      return { status: true, data: _datatiporequerimiento };
    } catch (error) {
      console.log(error);
      return { status: false, data: [], error: error.message };
    }
  }
  async enviacorreo(daTicket) {
    try {
      //console.log(daTicket);
      console.log(daTicket.data.nombre);
      console.log(daTicket.data.email);
      console.log(daTicket.list);
      const fechadesde = moment(daTicket.fi).format("YYYY-MM-DD");
      const fechahasta = moment(daTicket.ff).format("YYYY-MM-DD");
      console.log(fechadesde);
      console.log(fechahasta);

      let message =
        `<style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #dddddd;
      }
      </style>` +
        `<h2> <strong> Le Saluda </strong> ${daTicket.data.nombre}</h2>` +
        `<p> Soporte brindado desde ${fechadesde} hasta ${fechahasta} </p>` +
        "<p>Estimado se adjunta soportes brindado a usted </p> " +
        '<table style="border: 1px solid #333;">' +
        '<thead style="background-color:   #3a8a3a ; color:white;">' +
        "<th> Empresa </th>" +
        "<th> Contacto </th>" +
        "<th> Tipo </th>" +
        "<th> Requerimiento </th>" +
        "<th> Solucion </th>" +
        "<th> Fecha y hora </th>" +
        "<th> Operador </th>" +
        /*...*/
        "</thead>";

      for (const rows of daTicket.list) {
        // actualizacion del correo
        TicketModels.update(
          {
            escorreo: 1,
          },
          { where: { idticket: rows.idticket } }
        );
        const solucion = rows.solucion !== null ? rows.solucion : "Pendiente";
        const fechacreado = rows.creado.substring(0, 19).replace("T", " ");
        // console.load(fechacreado)
        message +=
          '<tr style="background-color:  #b0ebb0  ;">' +
          "<td>" +
          rows.nombre_empresa +
          "</td>" +
          "<td>" +
          rows.nombre_contacto +
          "</td>" +
          "<td>" +
          rows.tipo +
          "</td>" +
          "<td>" +
          rows.descripcion +
          "</td>" +
          "<td>" +
          solucion +
          "</td>" +
          "<td>" +
          fechacreado +
          "</td>" +
          "<td>" +
          rows.nombre +
          "</td>" +
          /*...*/
          "</tr>";
      }

      message += "</table>";
      // GENERAR PDF
      const pdfGenerado = new Pdf();
      pdfGenerado.generarPdf(daTicket.list);
      // GENERAR EXCEL
      const excelGenerado = new Excel();
      excelGenerado.generarExcel(
        daTicket.list.map((m) => {
          const solucion = m.solucion !== null ? m.solucion : "Pendiente";
          const fechacreado = m.creado.substring(0, 19).replace("T", " ");
          return {
            Empresa: m.nombre_empresa,
            Contacto: m.nombre_contacto,
            Tipo: m.tipo,
            Descripcion: m.descripcion,
            Solucion: solucion,
            Fecha: fechacreado,
            Operador: m.nombre,
          };
        })
      );

      const excelAttachment = {
        filename: "soporte.xlsx",
        content: fs.createReadStream("soporte.xlsx"),
      };
      const pdfAttachment = {
        filename: "soporte.pdf",
        content: fs.createReadStream("soporte.pdf"),
      };
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "softgreens.a.14@gmail.com",
          //process.env.CORREOEMISOR, // generated ethereal user
          pass: "qzhkhrdsdkbnacnb", //process.env.PASSOWORDEMISOR, // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: "softgreens.a.14@gmail.com", //process.env.CORREOEMISOR, // sender address
        // to: 'cede97bsc@outlook.com', // list of receivers
        to: daTicket.data.email, // list of receivers
        bcc: "softgreens.a.14@gmail.com",
        subject: daTicket.data.mensaje, // Subject line
        text: `${daTicket.data.mensaje}`,
        attachments: [excelAttachment, pdfAttachment],
      });
      // const filePath = "soporte.pdf";
      // fs.readFile(filePath, async function (err, data) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   let testAccount = await nodemailer.createTestAccount();
      //   let transporter = nodemailer.createTransport({
      //     host: "smtp.gmail.com",
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: "softgreens.a.14@gmail.com",
      //       //process.env.CORREOEMISOR, // generated ethereal user
      //       pass: "jwnosycparyojoaa", //process.env.PASSOWORDEMISOR, // generated ethereal password
      //     },
      //   });
      //   let info = await transporter.sendMail({
      //     from: "softgreens.a.14@gmail.com", //process.env.CORREOEMISOR, // sender address
      //     // to: 'cede97bsc@outlook.com', // list of receivers
      //     to: daTicket.data.email, // list of receivers
      //     bcc: "softgreens.a.14@gmail.com",
      //     subject: daTicket.data.mensaje, // Subject line
      //     text: `${daTicket.data.mensaje}`,
      //     // html: message,
      //     attachments: [
      //       {
      //         filename: "soporte.pdf",
      //         contentType: "application/pdf",
      //         content: data,
      //       },
      //     ],
      //   });
      // });

      console.log(daTicket.list);
      // console.log(transporter.MailMessage);
      // console.log(transporter.meta);
      return { status: true, mensaje: "correo enviado con exito" };
    } catch (error) {
      console.error(error);
      return {
        status: true,
        mensaje: "problemas  al momento de enviar el correo",
      };
    }
  }
  // GET DE TIPO REQUIRIMIENTO
  async actualizartipoticket(datipoTicket) {
    console.log("estoy actualizando");
    console.log(datipoTicket);
    //return { status: true, data: 'tamo activo' };
    try {
      const updateTipoReque = await db.query(
        `
      UPDATE tipo_ticket SET tipo = '${datipoTicket.tipo}',estado = '${datipoTicket.estado}' WHERE idtipo_ticket = ${datipoTicket.idtipo_ticket}
      `,
        { type: QueryTypes.UPDATE }
      );

      return { status: true, data: "Se actualizo la base de datos" };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  async obtenerDatosInicio() {
    try {
      const totales = await db.query('CALL SP_TOTALES_DASHBOARD()', {
        // type: Sequelize.QueryTypes.SELECT
      });
      const soporte_operador = await db.query('CALL SP_SOPORTES_REALIZADOS()', {
        // type: Sequelize.QueryTypes.SELECT
      });
      const soporte_tipo_soporte = await db.query('CALL SP_TIPO_SOPORTE_REALIZADOS()', {
        // type: Sequelize.QueryTypes.SELECT
      });
      const datos_inicio = {
        ...totales["0"],
        soporte_operador,
        soporte_tipo_soporte
      }
      return { status: true, data: datos_inicio };
    } catch (error) {
      return { status: false, data: [], error: error.message };
    }
  }
  // DASHBOARD
  // async obtenerDatosInicio() {
  //   try {
  //     const estadisticas = await db.query("CALL SP_CONSULTATICKET(:OP)", {
  //       replacements: {
  //         OP: 1,
  //       },
  //     });
  //     return { status: true, data: buscarTickets };
  //   } catch (error) {
  //     return { status: false, data: [], error: error.message };
  //   }
  // }
}
var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

const ticketervices = new TicketServices();
module.exports = { ticketervices };
