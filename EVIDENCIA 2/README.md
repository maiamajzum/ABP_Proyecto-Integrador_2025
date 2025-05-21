# EVIDENCIA 2

Este proyecto es una aplicación de React que muestra una lista de productos obtenidos desde una API externa utilizando axios. Los productos se presentan en una grilla responsiva utilizando Tailwind CSS.

**Estadísticas Agregadas**
En esta aplicación, se incluyen las siguientes estadísticas relacionadas con los productos obtenidos:
```
1-Número total de productos filtrados: Muestra el total de productos que cumplen con el criterio de búsqueda ingresado por el usuario.
2-Producto con el precio más alto: Muestra el producto con el precio más alto de los productos filtrados.
3-Producto con el precio más bajo: Muestra el producto con el precio más bajo de los productos filtrados.
4-Cantidad de productos con títulos largos: Cuenta cuántos productos tienen un título de más de 20 caracteres.
5-Precio total de los productos filtrados: Suma el precio de todos los productos que cumplen con el filtro de búsqueda.
6-Descuento promedio de los productos: Calcula el promedio de los descuentos aplicados a los productos filtrados.
```
Estas estadísticas se presentan en un panel que puede ser mostrado u ocultado por el usuario.

**División del Código en Componentes**

El código se ha dividido en dos componentes principales para mejorar la organización y la reutilización del código:

-ProductList: Este componente es responsable de mostrar la lista de productos filtrados. Recibe como propiedad la lista de productos y los muestra en una grilla.

-StatsPanel: Este componente se encarga de mostrar las estadísticas calculadas sobre los productos filtrados. Recibe como propiedades las estadísticas como el total de productos, el producto con el precio más alto, el producto con el precio más bajo, la cantidad de productos con títulos largos, el precio total y el descuento promedio.

La aplicación principal (App.jsx) gestiona el estado de los productos, el filtro de búsqueda y el control de la visibilidad del panel de estadísticas. Se utiliza useEffect para hacer la solicitud de los productos a la API externa y actualizar el estado de la aplicación.

## Requisitos previos

Antes de ejecutar el proyecto, debes asegurarte de tener instaladas las siguientes herramientas en tu PC:

- [Node.js](https://nodejs.org/) (version 14 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)

## Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**

   Clona el proyecto en tu máquina, desde Git Bash usando el siguiente comando:

   git clone https://github.com/maiamajzum/PROYECTO-INTEGRADOR-2025/tree/main/EVIDENCIA%202

2. **Instalar las dependencias:**

Accede al directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

cd tu-repositorio
npm install

3. **Ejecutar el Proyecto:**

Para iniciar la aplicación en tu entorno local, ejecuta el siguiente comando:
npm run dev

Esto abrirá la aplicación en el navegador en http://localhost:5173.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
├──/src
|   ├──/App.css      Estilos de la aplicación
|   ├──/App.jsx      Componente principal de React
|   ├──/index.jsx    Punto de entrada de la aplicación
├──/package.json     Archivo de configuración de dependencias
└──/vite.config.js   Configuración de Vite
```     
## Captura de pantalla

![image](https://github.com/user-attachments/assets/155a29f1-3af5-4888-8e23-0fa3888cce84)


