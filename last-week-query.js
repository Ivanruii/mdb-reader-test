import { readFileSync, createWriteStream } from "fs";
import MDBReader from "mdb-reader";
import path from "path";

const buffer = readFileSync("BD-Embalses.mdb");
const reader = new MDBReader(buffer);
const table = reader.getTable(reader.getTableNames()[0]);

console.log(`Total de filas a procesar: ${table.rowCount}`);
console.log("Este proceso puede tardar varios minutos...");

const totalRows = table.rowCount;
// Hay que leer todas las filas para obtener la fecha más reciente,
// no hay opción de query ni order by en MDBReader.
const data = table.getData({ rowLimit: totalRows, rowOffset: 0 });

console.log(`Total de filas cargadas: ${totalRows}`);

const maxFecha = data.reduce((max, row) => {
  const fecha = new Date(row.FECHA);
  return fecha > max ? fecha : max;
}, new Date(0));

console.log(`Fecha más reciente encontrada: ${maxFecha.toISOString()}`);

const filteredData = data.filter((row) => {
  const fecha = new Date(row.FECHA);
  return fecha.getTime() === maxFecha.getTime();
});

console.log(`Registros con la fecha más reciente: ${filteredData.length}`);

const outPath = path.join(process.cwd(), "last_week.json");
const writeStream = createWriteStream(outPath, { encoding: "utf-8" });

writeStream.write("[\n");

const jsonStrings = filteredData.map((row) => JSON.stringify(row, null, 2));
writeStream.write(jsonStrings.join(",\n"));

writeStream.write("\n]\n");

writeStream.end(() => {
  console.log(`Exportación completada en "${outPath}"`);
});
