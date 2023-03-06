const XLSX = require("xlsx");

class Excel {
  generarExcel(data) {
    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    // Crear una nueva hoja de Excel y asignar los datos del array de objetos
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Agregar la hoja de Excel al libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Soportes");
    // Guardar el libro de Excel en un archivo
    XLSX.writeFile(workbook, "soporte.xlsx");
  }
}

module.exports = { Excel };
