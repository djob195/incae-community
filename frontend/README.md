# Frontend editorial INCAE

Mockup integrado en el proyecto proporcionado: Next.js 16.3.3, React 19.2.8, TypeScript y Tailwind CSS 4. Se conservan package.json, package-lock.json, configuración y Dockerfile del proyecto original.

## Ejecutar

Dentro de la carpeta `frontend`:

```bash
npm ci
npm run dev
```

Abre http://localhost:3000.

```bash
npm run lint
npm run build
npm start
```

## Estructura

- `app/page.tsx`: ruta principal que muestra el prototipo.
- `app/layout.tsx`: idioma español, metadatos y fuentes locales.
- `app/globals.css`: estilos editoriales, variables de marca, diseño móvil y estilos de impresión. Conserva la importación y disponibilidad de Tailwind 4.
- `components/editorial-mockup.tsx`: interfaz e interacciones de demostración.
- `lib/editorial-data.ts`: datos de ejemplo y tipos TypeScript.
- `app/fonts/`: fuentes Merriweather, Source Sans 3 y Public Sans con sus licencias.
- `public/port-reference.png`: fotografía recortada de la captura original.

## Guía visual

| Uso | Valor |
| --- | --- |
| Primario | #0F1F38 |
| Secundario | #C85A32 |
| Terciario | #B85D19 |
| Neutro | #1A1A1A |
| Títulos | Merriweather |
| Texto | Source Sans 3 |
| Etiquetas | Public Sans |

Las fuentes se sirven localmente mediante next/font/local; no requieren conexión a Google Fonts. La paleta queda disponible como variables CSS y colores de Tailwind (por ejemplo, `bg-primary`).

## Acciones y datos

- Entrevistas: abren un diálogo con texto de ejemplo; se cierra con el botón, Escape o al pulsar el fondo.
- Directorio: muestra una entrevista adicional.
- Compartir: copia el enlace cuando el navegador permite usar el portapapeles.
- Imprimir: usa la impresión del navegador con un diseño para el artículo.
- Leer ensayo relacionado: navega a la página del artículo. Postular abre una vista de demostración y no envía datos.

No necesita backend, cuentas ni variables de entorno para probarlo. No se añadió integración con el backend adjuntado por error.

Algunos nombres y textos fueron recreados porque no se leen completamente en la captura. Los retratos usan iniciales. La fotografía es de baja resolución: reemplázala por el archivo original antes de publicar.

## Integrar en tu copia

Puedes usar esta carpeta completa o copiar únicamente `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/fonts/`, `components/`, `lib/` y `public/port-reference.png` a tu proyecto. Conserva tus archivos de entorno locales.

## Validación

Compilación de producción, TypeScript y ESLint verificados. El contenedor de verificación necesitó una adaptación temporal de su API de memoria, que no forma parte del proyecto entregado. La revisión visual en navegador y la ejecución de las interacciones quedaron pendientes: el navegador de prueba no estaba disponible.

## Artículo de demostración

La ruta `/articulos/escalamiento-corporativo` muestra el ensayo de las cuatro capturas. Se abre desde la nueva tarjeta de ensayo y desde el botón «Leer ensayo relacionado» en la portada. El enlace «Volver a la edición» regresa al inicio.

- `app/articulos/escalamiento-corporativo/page.tsx`: contenido del artículo y figura de indicadores.
- `components/article-tools.tsx`: controles de tamaño de texto, lectura con la voz del navegador, compartir, imprimir y guardar en el dossier durante la sesión de la página. El guardado se reinicia al salir o recargar.
- `public/operaciones-reference.png` y `public/alejandro-reference.png`: recortes de las capturas proporcionadas.

No es necesario configurar Strapi para navegar por el mockup. Los datos del ensayo provienen de las capturas, con aproximaciones en los detalles menos legibles.
