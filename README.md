# ABP_Proyecto-Integrador_2025

Este proyecto es una aplicación web desarrollada con React y Tailwind CSS que permite explorar y analizar productos obtenidos desde una API externa. La app implementa búsqueda, filtrado por categoría, ordenamiento, estadísticas y exportación de datos.

**Funcionalidades principales**
```
Exploración de productos:
-Visualización de productos en grilla responsiva.
-Búsqueda por título del producto.
-Filtros por categoría (obtenidas desde la API).
-Ordenamiento por precio y calificación (ascendente o descendente).
-Navegación paginada desde la API.
```

**Estadísticas dinámicas**
```
Panel de estadísticas generales con:
-Producto más caro y más barato.
-Productos con títulos largos.
-Suma total de precios.
-Promedio de precios.
-Promedio de descuento.
-Promedio general de rating.
-Cantidad de productos con stock > 50.
-Cantidad de productos con calificación > 4.5.
```
```
Panel de estadísticas por categoría:
-Precio promedio y rating promedio  por categoría.
-Producto más caro y más barato por categoría.
```
```
Panel de gráficos (barras, líneas, tortas):
-Producos por categoría.
-Simulacion de precios.
-Proporcion de productos según stock.
```
```
Exportación de productos filtrados:
-JSON
-CSV
-Excel (.XLSX)
```
```
Modo oscuro:
-Permite alternar entre modo claro y oscuro.
```
**División del código en componentes**

El código se ha dividido en dos componentes principales para mejorar la organización y la reutilización del código:

-ProductList: Muestra la grilla de productos filtrados. Recibe la lista de productos por props y los renderiza de forma responsiva.

-StatsPanel: StatsPanel: Muestra estadísticas generales como: Total de productos filtrados, producto más caro y más barato, promedios de precios, descuentos y rating, cantidad de productos con títulos largos y stock alto.

-AdvancedStatsPanel: Muestra estadísticas específicas por categoría, como precio promedio y rating por categoría. Producto más caro y más barato en cada categoría.

-SearchBar: Campo de búsqueda que permite filtrar productos por título.

-FilterBar: Barra de filtros que permite seleccionar categoría, ordenar por precio o rating y reiniciar los filtros.

-ProductCharts: Componente que genera gráficos dinámicos (barras, líneas y tortas) a partir de los productos filtrados.
```
La aplicación principal (App.jsx) gestiona:
-El estado global de los productos, filtros y opciones de exportación.
-Las llamadas a la API externa con axios para obtener productos y categorías.
-La lógica de paginación, ordenamiento y filtrado.
-La exportación de los productos filtrados en distintos formatos (JSON, CSV, Excel).
-El control del modo oscuro y la visibilidad del panel de estadísticas.
```
**Requisitos previos**
Antes de ejecutar el proyecto, debes asegurarte de tener instaladas las siguientes herramientas en tu PC:

Node.js (version 14 o superior)
npm (viene con Node.js)
Pasos para ejecutar el proyecto
Clonar el repositorio:

Clona el proyecto en tu máquina, desde Git Bash usando el siguiente comando:

git clone https://github.com/maiamajzum/ABP_Proyecto-Integrador_2025

Instalar las dependencias:

Accede al directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

cd tu-repositorio npm install

**Ejecutar el Proyecto:**
Para iniciar la aplicación en tu entorno local, ejecuta el siguiente comando: npm run dev

Esto abrirá la aplicación en el navegador en http://localhost:5173.

Estructura del Proyecto
El proyecto tiene la siguiente estructura de archivos:

├──/src
|   ├──/App.css      Estilos de la aplicación
|   ├──/App.jsx      Componente principal de React
|   ├──/index.jsx    Punto de entrada de la aplicación
├──/package.json     Archivo de configuración de dependencias
└──/vite.config.js   Configuración de Vite
