const jsPDF = require("jspdf");
const fs = require("fs");

class Pdf {
  generateData = function (data) {
    var result = [];
    // var data = {
    //   coin: "100",
    //   game_group: "GameGroup",
    //   game_name: "XPTO2",
    //   game_version: "25",
    //   machine: "20485861",
    //   vlt: "0",
    // };
    for (const rows of data){
        const solucion = rows.solucion !== null ? rows.solucion : "Pendiente";
        const fechacreado = rows.creado.substring(0, 19).replace("T", " ");
        // console.load(fechacreado)
        result.push({
            Empresa:rows.nombre_empresa,
            Contacto:rows.nombre_contacto,
            Tipo:rows.tipo,
            Descripcion:rows.descripcion,
            Solucion: solucion,
            Fecha: fechacreado,
            Operador:rows.nombre,
        });
    }
    // for (var i = 0; i < data.length; i += 1) {
    // //   data.id = (i + 1).toString();
     
    // }
    return result;
  };

  createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 55,
        align: "center",
        padding: 0,
      });
    }
    return result;
  }

  generarPdf = (data) => {
    var headers = this.createHeaders([
      "Empresa",
      "Contacto",
      "Tipo",
      "Descripcion",
      "Solucion",
      "Fecha",
      "Operador",
    ]);
    // var { jsPDF } = jsPDF;
    var doc = new jsPDF.jsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
    });
    doc.table(1, 1, this.generateData(data), headers, { autoSize: false });
    doc.save("soporte.pdf");
    
  };
}

module.exports = { Pdf };
