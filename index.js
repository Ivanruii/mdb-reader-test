import { readFileSync, createWriteStream } from "fs";
import MDBReader from "mdb-reader";
import path from "path";

const buffer = readFileSync("BD-Embalses.mdb");
const reader = new MDBReader(buffer);
const table = reader.getTable(reader.getTableNames()[0]);

const totalRows = table.rowCount;
console.log(`Total de filas a procesar: ${totalRows}`);
console.log("Este proceso puede tardar varios minutos...");

const data = table.getData({ rowLimit: totalRows, rowOffset: 0 });

const outPath = path.join(process.cwd(), "output.json");
const writeStream = createWriteStream(outPath, { encoding: "utf-8" });

writeStream.write("[\n");

const jsonStrings = data.map((row) => JSON.stringify(row, null, 2));
writeStream.write(jsonStrings.join(",\n"));

writeStream.write("\n]\n");

writeStream.end(() => {
  console.log(`Exportación completada en "${outPath}"`);
});
