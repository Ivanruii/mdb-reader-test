import { readFileSync, createWriteStream } from "fs";
import MDBReader from "mdb-reader";
import path from "path";

const buffer = readFileSync("BD-Embalses.mdb");
const reader = new MDBReader(buffer);
const table = reader.getTable(reader.getTableNames()[0]);

const chunkSize = 10000;
let offset = 0;
let isFirstChunk = true;
let chunkIndex = 0;

const outPath = path.join(process.cwd(), "output.json");
const writeStream = createWriteStream(outPath, { encoding: "utf-8" });

writeStream.write("[\n");

while (true) {
  const dataChunk = table.getData({ rowLimit: chunkSize, rowOffset: offset });
  if (dataChunk.length === 0) break;

  console.log(
    `Procesando chunk #${chunkIndex} con ${dataChunk.length} filas...`
  );

  for (let i = 0; i < dataChunk.length; i++) {
    const jsonString = JSON.stringify(dataChunk[i], null, 2);
    if (!isFirstChunk) writeStream.write(",\n");
    writeStream.write(jsonString);
    isFirstChunk = false;
  }

  offset += chunkSize;
  chunkIndex++;
}

writeStream.write("\n]\n");

writeStream.end(() => {
  console.log(`Exportación completada en "${outPath}"`);
});
