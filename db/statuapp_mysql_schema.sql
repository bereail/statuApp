
-- StatuApp — Esquema MySQL (UTF8MB4) 
-- Generado: 2025-08-19 23:14:54
-- Motor recomendado: InnoDB, MySQL 8.0+
-- Nota: ejecuta en este orden o usa todo el script de corrido.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================================
-- 1) Tablas base
-- =====================================================================

CREATE TABLE IF NOT EXISTS autores (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(180) NOT NULL,
  anio_nacimiento SMALLINT NULL,
  anio_fallecimiento SMALLINT NULL,
  biografia_md  TEXT NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uq_autor_nombre UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ubicaciones (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(180) NOT NULL,
  direccion     VARCHAR(240) NULL,
  barrio        VARCHAR(120) NULL,
  lat           DECIMAL(9,6) NULL,
  lng           DECIMAL(9,6) NULL,
  notas_md      TEXT NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS estatuas (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(140) NOT NULL,
  titulo        VARCHAR(180) NOT NULL,
  descripcion_md MEDIUMTEXT NULL,
  anio          SMALLINT NULL,
  material      VARCHAR(120) NULL,
  barrio        VARCHAR(120) NULL,
  lat           DECIMAL(9,6) NULL,
  lng           DECIMAL(9,6) NULL,

  -- Nuevo: 3 resúmenes
  resumen_corto   VARCHAR(350) NULL,         -- 50-80 palabras aprox. (limite defensivo)
  resumen_extenso MEDIUMTEXT NULL,           -- versión extendida
  dato_curioso    VARCHAR(500) NULL,         -- un dato destacado

  autor_id      BIGINT UNSIGNED NULL,
  ubicacion_id  BIGINT UNSIGNED NULL,
  publicada     TINYINT(1) NOT NULL DEFAULT 1,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT uq_estatua_slug UNIQUE (slug),
  CONSTRAINT fk_estatua_autor FOREIGN KEY (autor_id) REFERENCES autores(id) ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_estatua_ubic FOREIGN KEY (ubicacion_id) REFERENCES ubicaciones(id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX ix_estatua_slug ON estatuas(slug);
CREATE INDEX ix_estatua_geo ON estatuas(lat,lng);
CREATE INDEX ix_estatua_autor ON estatuas(autor_id);
CREATE INDEX ix_estatua_ubic ON estatuas(ubicacion_id);

CREATE TABLE IF NOT EXISTS etiquetas (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(120) NOT NULL,
  CONSTRAINT uq_etiqueta_nombre UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS estatua_etiqueta (
  estatua_id   BIGINT UNSIGNED NOT NULL,
  etiqueta_id  BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (estatua_id, etiqueta_id),
  CONSTRAINT fk_ee_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ee_etiqueta FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS medios (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estatua_id    BIGINT UNSIGNED NOT NULL,
  tipo          ENUM('foto','audio','doc') NOT NULL,
  url           VARCHAR(600) NOT NULL,
  pie           VARCHAR(300) NULL,
  credito       VARCHAR(180) NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_medios_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- 2) NUEVO: FUENTES y relación N:M con estatuas
-- =====================================================================

CREATE TABLE IF NOT EXISTS fuentes (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo          ENUM('bibliografica','web','archivo','oral','otro') NOT NULL DEFAULT 'web',
  titulo        VARCHAR(240) NOT NULL,
  autor         VARCHAR(180) NULL,
  anio          SMALLINT NULL,
  url           VARCHAR(600) NULL,
  editorial     VARCHAR(180) NULL,
  notas_md      TEXT NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS estatua_fuente (
  estatua_id    BIGINT UNSIGNED NOT NULL,
  fuente_id     BIGINT UNSIGNED NOT NULL,
  rol           ENUM('cita','bibliografia','link','documento') NOT NULL DEFAULT 'cita',
  comentario    VARCHAR(300) NULL,
  PRIMARY KEY (estatua_id, fuente_id),
  CONSTRAINT fk_ef_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ef_fuente FOREIGN KEY (fuente_id) REFERENCES fuentes(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- 3) NUEVO: RELEVAMIENTOS (auditoría in-situ)
-- =====================================================================

CREATE TABLE IF NOT EXISTS relevamientos (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estatua_id    BIGINT UNSIGNED NOT NULL,
  fecha         DATE NOT NULL,
  estado        ENUM('excelente','bueno','regular','malo','critico') NOT NULL DEFAULT 'bueno',
  notas_md      TEXT NULL,
  foto_url      VARCHAR(600) NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rel_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX ix_rel_estatua_fecha ON relevamientos(estatua_id, fecha);

-- =====================================================================
-- 4) NUEVO: INSTITUCIONES y coautoría/créditos con estatuas
-- =====================================================================

CREATE TABLE IF NOT EXISTS instituciones (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(200) NOT NULL,
  tipo          ENUM('escuela','museo','universidad','ong','municipio','otro') NOT NULL DEFAULT 'escuela',
  direccion     VARCHAR(240) NULL,
  telefono      VARCHAR(60) NULL,
  sitio_web     VARCHAR(240) NULL,
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uq_inst_nombre UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS estatua_institucion (
  estatua_id    BIGINT UNSIGNED NOT NULL,
  institucion_id BIGINT UNSIGNED NOT NULL,
  rol           ENUM('autor','coautor','editor','curador','credito') NOT NULL DEFAULT 'credito',
  porcentaje_credito DECIMAL(5,2) NULL,  -- ej: 33.33
  PRIMARY KEY (estatua_id, institucion_id, rol),
  CONSTRAINT fk_ei_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ei_inst FOREIGN KEY (institucion_id) REFERENCES instituciones(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- 5) NUEVO: EVENTOS_ESCANEO (tracking anónimo desde QR)
-- =====================================================================

CREATE TABLE IF NOT EXISTS eventos_escaneo (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  occurred_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  slug          VARCHAR(140) NOT NULL,        -- redundante para no bloquear por FK si se anonimiza
  estatua_id    BIGINT UNSIGNED NULL,         -- si se resuelve por slug al momento del insert
  user_agent    VARCHAR(300) NULL,
  referer       VARCHAR(600) NULL,
  utm_source    VARCHAR(80) NULL,
  utm_medium    VARCHAR(80) NULL,
  utm_campaign  VARCHAR(120) NULL,

  -- geolocalización aproximada (opcional)
  geohash       VARCHAR(12) NULL,
  osm_zoom      TINYINT UNSIGNED NULL,
  osm_tile_x    INT NULL,
  osm_tile_y    INT NULL,

  ip_hash       CHAR(64) NULL,                -- hash (ej. SHA-256) para deduplicación anónima

  INDEX ix_ev_slug_time (slug, occurred_at),
  INDEX ix_ev_estatua_time (estatua_id, occurred_at),

  CONSTRAINT fk_ev_estatua FOREIGN KEY (estatua_id) REFERENCES estatuas(id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- 6) Vistas útiles
-- =====================================================================

CREATE OR REPLACE VIEW v_estatuas_full AS
SELECT e.id, e.slug, e.titulo, e.barrio, e.anio, e.material,
       a.nombre AS autor,
       u.nombre AS ubicacion,
       (SELECT COUNT(*) FROM medios m WHERE m.estatua_id = e.id) AS fotos,
       (SELECT COUNT(*) FROM relevamientos r WHERE r.estatua_id = e.id) AS relevamientos,
       e.publicada, e.creado_en, e.actualizado_en
FROM estatuas e
LEFT JOIN autores a ON a.id = e.autor_id
LEFT JOIN ubicaciones u ON u.id = e.ubicacion_id;

SET FOREIGN_KEY_CHECKS = 1;
