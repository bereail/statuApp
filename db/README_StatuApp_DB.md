
# StatuApp — Paquete de Base de Datos (MySQL)

**Archivos incluidos**

- `statuapp_mysql_schema.sql`: esquema completo con tablas, relaciones, índices y vistas.
- `DER_StatuApp_clean.svg`: diagrama entidad–relación limpio (sin elementos encimados).
- `README.md`: este archivo.

**Cómo importar en MySQL Workbench**

1. Abrí *MySQL Workbench* → *File* → *Open SQL Script…* y seleccioná `statuapp_mysql_schema.sql`.
2. Elegí el schema (BD) de destino o creá uno nuevo, por ejemplo `statuapp`:
   ```sql
   CREATE DATABASE IF NOT EXISTS statuapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE statuapp;
   ```
3. Ejecutá el script completo (rayito ⚡) para crear todas las tablas y vistas.
4. Para ver el DER:
   - Opción A: Abrí `DER_StatuApp_clean.svg` (se puede imprimir o ver en el navegador).
   - Opción B: En Workbench, usá *Database* → *Reverse Engineer* sobre el schema `statuapp` para generar el modelo EER nativo.

**Notas de diseño**

- Se agregaron **FUENTES** y su puente **ESTATUA_FUENTE** (N:M).
- Se agregó **RELEVAMIENTOS** para auditoría in-situ (estado, foto, notas, fecha).
- Se agregó **INSTITUCIONES** y puente **ESTATUA_INSTITUCION** (N:M) con `rol` y `porcentaje_credito` para coautoría y créditos.
- Se agregó **EVENTOS_ESCANEO** para métricas anónimas: timestamp, slug, (opcional) geohash u OSM tile.
- En **ESTATUAS** se sumaron los 3 resúmenes: `resumen_corto`, `resumen_extenso` y `dato_curioso`.

**Sugerencias operativas**

- Usá `v_estatuas_full` para listados rápidos (autor, ubicación, contadores).
- Considerá agregar índices adicionales según tus filtros más usados (por ejemplo, `barrio`, `anio`).

Generado automáticamente el 2025-08-19 23:14:54.
