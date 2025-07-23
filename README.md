# Mi Tienda Online

Este es un proyecto de comercio electrónico desarrollado con React, que incluye gestión de productos, carrito de compras, autenticación de usuarios y un diseño moderno y responsivo.

## Características

- **Catálogo de Productos:** Visualización de productos con búsqueda y paginación.
- **Gestión de Productos (CRUD):** Interfaz de administración para crear, leer, actualizar y eliminar productos.
- **Carrito de Compras:** Funcionalidad completa para agregar, modificar y eliminar productos del carrito.
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión para proteger rutas y funcionalidades.
- **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles, tablets y de escritorio.
- **Notificaciones:** Mensajes de éxito y error para una mejor experiencia de usuario.

## Tecnologías Utilizadas

- **React:** Biblioteca principal para la construcción de la interfaz.
- **Vite:** Herramienta de desarrollo para un entorno rápido y optimizado.
- **React Router DOM:** Para la gestión de rutas en la aplicación.
- **Styled-components:** Para la estilización modular y personalizada de componentes.
- **Context API:** Para la gestión del estado global (carrito y autenticación).
- **React Icons:** Para la inclusión de iconos en la interfaz.
- **React Toastify:** Para mostrar notificaciones y alertas.
- **React Helmet Async:** Para la optimización SEO de las páginas.
- **MockAPI:** Para simular un backend y gestionar los datos de los productos.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Lucas198821/eccomerce-app.git
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd eccomerce-app
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

## Uso

Una vez que hayas instalado las dependencias, puedes iniciar el servidor de desarrollo con el siguiente comando:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo y podrás acceder a ella en tu navegador, generalmente en `http://localhost:5173`.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

-   `src/assets`: Contiene los recursos estáticos como imágenes y logos.
-   `src/components`: Almacena los componentes reutilizables de la aplicación (Navbar, Footer, etc.).
-   `src/context`: Contiene los proveedores de contexto para el estado global (autenticación y carrito).
-   `src/pages`: Contiene los componentes que representan las páginas principales de la aplicación (Home, Login, Admin, etc.).
