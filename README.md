# MDB-READER-TEST

Este proyecto lee datos de un archivo MDB (Microsoft Access Database) y los exporta a formato JSON.

## Funcionalidades

El proyecto incluye dos scripts principales:

1.  **`index.js`**:

    - Lee el archivo `BD-Embalses.mdb`.
    - Extrae todos los datos de la primera tabla encontrada en el archivo MDB.
    - Guarda todos los datos extraídos en el archivo `output.json`.

2.  **`last-week-query.js`**:
    - Lee el archivo `BD-Embalses.mdb`.
    - Extrae todos los datos de la primera tabla.
    - Identifica la fecha más reciente en la columna `FECHA`.
    - Filtra los datos para incluir únicamente los registros correspondientes a esa fecha más reciente.
    - Guarda los datos filtrados en el archivo `last_week.json`.

## Uso

- Para exportar todos los datos:

  ```bash
  node index.js
  ```

- Para exportar los datos de la fecha más reciente:
  ```bash
  node last-week-query.js
  ```

## Fuente de Datos

El archivo `BD-Embalses.mdb` utilizado en este proyecto puede ser descargado desde:
[Descargar Embalses.mdb](https://www.miteco.gob.es/content/dam/miteco/es/agua/temas/evaluacion-de-los-recursos-hidricos/boletin-hidrologico/Historico-de-embalses/BD-Embalses.zip)
