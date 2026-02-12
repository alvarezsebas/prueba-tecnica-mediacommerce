USE prueba_tecnica;

-- =====================================
-- a) Calcular total de cada orden y actualizarlo
-- =====================================

UPDATE ORDENES o
SET TOTAL = (
    SELECT SUM(CANTIDAD * PRECIO)
    FROM DETALLE_ORDEN d
    WHERE d.ORDEN_ID = o.ID
);

-- =====================================
-- b) Listar clientes con total comprado
-- =====================================

SELECT 
    c.NOMBRE AS Cliente,
    c.CIUDAD,
    SUM(o.TOTAL) AS total_compras
FROM CLIENTES c
JOIN ORDENES o ON c.ID = o.CLIENTE_ID
GROUP BY c.ID, c.NOMBRE, c.CIUDAD;

-- =====================================
-- c) Producto más vendido por cantidad
-- =====================================

SELECT p.NOMBRE, SUM(d.CANTIDAD) AS total_vendido
FROM DETALLE_ORDEN d
JOIN PRODUCTOS p ON d.PRODUCTO_ID = p.ID
GROUP BY p.ID
ORDER BY total_vendido DESC
LIMIT 1;

-- =====================================
-- d) Órdenes del año 2026 con nombre del cliente
-- =====================================

SELECT o.ID, c.NOMBRE, o.FECHA, o.TOTAL
FROM ORDENES o
JOIN CLIENTES c ON o.CLIENTE_ID = c.ID
WHERE YEAR(o.FECHA) = 2026;

-- =====================================
-- e) Clientes que han comprado más de una orden
-- =====================================

SELECT c.NOMBRE, COUNT(o.ID) AS cantidad_ordenes
FROM CLIENTES c
JOIN ORDENES o ON c.ID = o.CLIENTE_ID
GROUP BY c.ID
HAVING COUNT(o.ID) > 1;

-- =====================================
-- f) Top 3 clientes con mayor facturación
-- =====================================

SELECT c.NOMBRE, SUM(o.TOTAL) AS facturacion
FROM CLIENTES c
JOIN ORDENES o ON c.ID = o.CLIENTE_ID
GROUP BY c.ID
ORDER BY facturacion DESC
LIMIT 3;

-- =====================================
-- g) Órdenes que superan los $3.000
-- =====================================

SELECT *
FROM ORDENES
WHERE TOTAL > 3000;

-- =====================================
-- j) Insertar orden con rollback si falla
-- =====================================

START TRANSACTION;

INSERT INTO ORDENES VALUES (6,2,'2026-02-01',0);

INSERT INTO DETALLE_ORDEN VALUES (10,6,1,1,3500);

UPDATE ORDENES
SET TOTAL = (
    SELECT SUM(CANTIDAD * PRECIO)
    FROM DETALLE_ORDEN
    WHERE ORDEN_ID = 6
)
WHERE ID = 6;

COMMIT;
