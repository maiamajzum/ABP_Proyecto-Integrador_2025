# ABP_Proyecto-Integrador_2025

Este proyecto es una aplicación web desarrollada con React y Tailwind CSS que permite explorar y analizar productos obtenidos desde una API externa. La app implementa búsqueda, filtrado por categoría, ordenamiento, estadísticas y exportación de datos.
```
**Funcionalidades principales**
```
Exploración de productos:
-Visualización de productos en grilla responsiva.
-Búsqueda por título del producto.
-Filtros por categoría (obtenidas desde la API).
-Ordenamiento por precio y calificación (ascendente o descendente).
-Navegación paginada.
```
```
**Estadísticas dinámicas**
```
Panel de estadísticas generales con:
-Producto más caro y más barato.
-Productos con títulos largos.
-Suma total de precios.
-Promedio de precios.
-Promedio de descuento.
-Promedio general de ranking.
-Cantidad de productos con stock > 50.
-Cantidad de productos con calificación > 4.5.
```
```
Panel de estadísticas por categoría:
-Precio promedio y ranking promedio  por categoría.
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

**División del código en componentes**

El código se ha dividido en dos componentes principales para mejorar la organización y la reutilización del código:

-ProductList: Este componente es responsable de mostrar la lista de productos filtrados. Recibe como propiedad la lista de productos y los muestra en una grilla.

-StatsPanel: Este componente se encarga de mostrar las estadísticas calculadas sobre los productos filtrados. Recibe como propiedades las estadísticas como el total de productos, el producto con el precio más alto, el producto con el precio más bajo, la cantidad de productos con títulos largos, el precio total y el descuento promedio.

La aplicación principal (App.jsx) gestiona el estado de los productos, el filtro de búsqueda y el control de la visibilidad del panel de estadísticas. Se utiliza useEffect para hacer la solicitud de los productos a la API externa y actualizar el estado de la aplicación.

Requisitos previos
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

Ejecutar el Proyecto:
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
