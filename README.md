# 🧪 Prueba Técnica Desarrollo y bases de datos para Media Commerce  -- Ingeniero de soluciones 3

## 📌 Descripción General

Este proyecto corresponde al desarrollo de la prueba técnica solicitada,
la cual incluye:

-   Modelado y consultas SQL 
-   Implementación en JavaScript puro
-   Implementación en React (Vite)
-   Análisis técnico de código en PHP (Prueba de escritorio)
-   Aplicación de buenas prácticas de desarrollo

------------------------------------------------------------------------

# 🛠 Tecnologías Utilizadas

-   PHP 8+
-   MySQL
-   JavaScript (ES6+)
-   React + Vite
-   HTML5
-   CSS3 (Responsive + Modern UI)

------------------------------------------------------------------------

# 🗂 Estructura del Proyecto

/sql\
├── 1_schema.sql\
├── 2_queries_test.sql

/JavaScriptPuro\
├── index.html\
├── css\styles.css\
├── js\app.js

/React\
├── src/\
│ ├── components/
│ ├── App.jsx\
│ ├── debounce.jsx\
│ ├── index.css\


/php\
├── prueba_escritorio.php
├── prueba_escritorio.pdf

README.md

------------------------------------------------------------------------

# 🗄 Base de Datos

## 1️⃣ Creación

Ejecutar el archivo:

1_schema.sql

Este archivo contiene:

-   Creación de base de datos
-   Creación de tablas
-   Inserción de datos de prueba

## 2️⃣ Consultas

El archivo:

2_queries.sql

Incluye las consultas solicitadas en la prueba técnica.

Para este punto se utilizó Mysql y DBeaver

------------------------------------------------------------------------

# 💻 Implementación en JavaScript Puro

Ubicación: /JavaScriptPruo

Características implementadas:

-   Consumo de API
-   Filtro por cualquier campo
-   Autocompletado
-   Paginación
-   Spinner de carga
-   Interfaz moderna responsive
-   Scroll interno con altura fija
-   Resaltado de coincidencias

Para ejecutar:

Abrir index.html en el navegador.

------------------------------------------------------------------------

# ⚛ Implementación en React (Vite)

Ubicación: /React

## Instalación

npm install

## Ejecutar

npm run dev

## Características

-   Hooks (useState, useEffect)
-   Filtro dinámico global
-   Autocomplete con sugerencias
-   Paginación
-   Spinner overlay
-   UI moderna tipo SaaS
-   Responsive design
-   Código modularizado por componentes

------------------------------------------------------------------------

# 🧠 Punto 3 -- Prueba de Escritorio en PHP

El script analiza una lista de productos asociados a una factura
aplicando validaciones:

-   Se ignoran productos con código '00000'
-   Se omiten productos con cantidad menor o igual a cero
-   Se detiene el procesamiento si el código es '99999'

### Resultado del cálculo:

-   Total sin impuesto: 610000
-   Impuesto (19%): 115900
-   Total a pagar: 725900

Se adjunta documento PDF con el análisis técnico completo.



------------------------------------------------------------------------

# 🚀 Conclusión

La solución desarrollada cumple con los requerimientos solicitados en la
prueba técnica, demostrando:

-   Lógica de programación
-   Dominio de estructuras de control
-   Manipulación de datos
-   Desarrollo frontend moderno
-   Organización profesional del código

------------------------------------------------------------------------

👨‍💻 Desarrollado por: Sebastián Álvarez\
📅 Año: 2026
