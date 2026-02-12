-- =====================================
-- CREACIÓN DE BASE DE DATOS
-- =====================================

CREATE DATABASE IF NOT EXISTS prueba_tecnica;
USE prueba_tecnica;

-- =====================================
-- ELIMINAR TABLAS SI EXISTEN
-- =====================================

DROP TABLE IF EXISTS DETALLE_ORDEN;
DROP TABLE IF EXISTS ORDENES;
DROP TABLE IF EXISTS PRODUCTOS;
DROP TABLE IF EXISTS CLIENTES;

-- =====================================
-- CREACIÓN DE TABLAS
-- =====================================

CREATE TABLE CLIENTES (
    ID INT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    CIUDAD VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUCTOS (
    ID INT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    PRECIO DECIMAL(10,2) NOT NULL
);

CREATE TABLE ORDENES (
    ID INT PRIMARY KEY,
    CLIENTE_ID INT,
    FECHA DATE,
    TOTAL DECIMAL(10,2),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTES(ID)
);

CREATE TABLE DETALLE_ORDEN (
    ID INT PRIMARY KEY,
    ORDEN_ID INT,
    PRODUCTO_ID INT,
    CANTIDAD INT,
    PRECIO DECIMAL(10,2),
    FOREIGN KEY (ORDEN_ID) REFERENCES ORDENES(ID),
    FOREIGN KEY (PRODUCTO_ID) REFERENCES PRODUCTOS(ID)
);

-- =====================================
-- INSERCIÓN DE DATOS
-- =====================================

INSERT INTO CLIENTES VALUES
(1,'Juan Perez','Bogotá'),
(2,'Ana Torres','Medellín'),
(3,'Carlos Ruiz','Cali'),
(4,'Laura Gómez','Bogotá'),
(5,'Pedro León','Barranquilla');

INSERT INTO PRODUCTOS VALUES
(1,'Laptop',3500),
(2,'Mouse',50),
(3,'Teclado',120),
(4,'Monitor',900),
(5,'Impresora',800);

INSERT INTO ORDENES VALUES
(1,1,'2025-12-01',0),
(2,2,'2025-12-10',0),
(3,3,'2026-01-05',0),
(4,1,'2026-01-15',0),
(5,4,'2026-01-20',0);

INSERT INTO DETALLE_ORDEN VALUES
(1,1,1,1,3500),
(2,1,2,2,50),
(3,2,3,1,120),
(4,2,4,1,900),
(5,3,2,3,50),
(6,3,5,1,800),
(7,4,1,1,3500),
(8,4,4,2,900),
(9,5,3,2,120);

-- =====================================
-- CREAR VISTA
-- =====================================

CREATE OR REPLACE VIEW VW_RESUMEN_VENTAS AS
SELECT 
    c.NOMBRE AS Cliente,
    p.NOMBRE AS Producto,
    d.CANTIDAD,
    (d.CANTIDAD * d.PRECIO) AS Subtotal
FROM DETALLE_ORDEN d
JOIN ORDENES o ON d.ORDEN_ID = o.ID
JOIN CLIENTES c ON o.CLIENTE_ID = c.ID
JOIN PRODUCTOS p ON d.PRODUCTO_ID = p.ID;

-- =====================================
-- CREAR ÍNDICE
-- =====================================

CREATE INDEX idx_fecha_cliente
ON ORDENES(FECHA, CLIENTE_ID);
