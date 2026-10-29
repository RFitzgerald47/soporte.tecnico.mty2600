# Soporte Técnico MTY 2600 — respaldo completo del sitio

Este paquete contiene los archivos de funcionamiento de la página publicada en GitHub Pages y Render, con sus recursos locales integrados.

## Archivos principales
- `index.html`: estructura y contenido.
- `styles.css`: diseño y adaptación a pantallas.
- `script.js`: interactividad y fichas de servicios.
- `logo-soporte-mty2600.png`, `hero-servidores-tecnico.jpg`, `nosotros-informatica.jpg`: imágenes generales del sitio.
- `assets/service-images/`: 36 imágenes de las galerías de servicios.
- `assets/fallbacks/`: 36 ilustraciones alternativas por si una imagen principal falla.
- `.nojekyll`: evita que GitHub Pages omita archivos por reglas de Jekyll.

## Cómo usar el respaldo
1. Conserva el ZIP original en un lugar seguro.
2. Para editar, extrae todo el contenido manteniendo la estructura de carpetas.
3. Abre `index.html` para revisar el sitio localmente. Para una comprobación más fiel, usa un servidor local estático.
4. Antes de reemplazar la versión publicada, guarda una copia de la carpeta actual y prueba los cambios.
5. Para publicar en GitHub Pages, sube el contenido completo a la raíz de la rama/carpeta que publica el sitio. No cambies las mayúsculas, minúsculas ni las rutas de `assets/`.
6. En Render, mantén la configuración del servicio estático que ya está funcionando y publica el contenido completo de esta carpeta como raíz del sitio.

## Direcciones publicadas
- GitHub Pages: https://rfitzgerald47.github.io/soporte.tecnico.mty2600/
- Repositorio: https://github.com/RFitzgerald47/soporte.tecnico.mty2600

Nota: el ZIP es un respaldo de los archivos del sitio; las variables, ajustes del panel y configuración interna de la cuenta de Render/GitHub no se exportan dentro de un ZIP estático.
