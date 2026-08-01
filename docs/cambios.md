# Registro de cambios

Reorganización completa de *Wake-Up*, del 30 de julio de 2026. Agrupado por fase.
El estado de partida está documentado en [auditoria.md](auditoria.md).

**No se ejecutó ningún comando de git.** Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventario completo de los 3 HTML, 4 CSS, 42 imágenes y 16 TTF del proyecto en `docs/auditoria.md`.
- Verificación con `grep` de qué archivos se referenciaban realmente: 41 de las 42 imágenes no las usaba nadie, y la única referenciada (`IMG/25.jpg`) lo estaba con un `rel` inválido.
- Identificados 6 enlaces rotos, 0 declaraciones `@font-face` y 2 páginas con marcadores de plantilla sin rellenar.

## Fase 2 — Estructura

| Antes | Después |
|---|---|
| `index.html` | `index.html` |
| `index2.html` | `terms.html` |
| `index3.html` | `about.html` |
| — | `404.html` (nuevo) |
| `Estilos.css`, `Normalize.css`, `Scroll.css` | `assets/css/base.css`, `layout.css`, `components.css` |
| `Estilos2.css` | fusionado en los tres anteriores |
| `<script>` en línea en `index.html` | `assets/js/main.js` + `assets/js/modules/{nav,hero}.js` |
| `IMG/36.ico` | `assets/img/logo/favicon.ico` |
| `IMG/32.jpg` | `assets/img/logo/owl-mark.png` |
| `FONTS/**/*.ttf` | `assets/fonts/*.woff2` |
| — | `assets/img/og-cover.jpg` (nuevo) |
| — | `.gitignore`, `robots.txt`, `sitemap.xml` (nuevos) |

- Todos los nombres pasan a minúsculas y guiones. Sin espacios, tildes ni números de versión.
- Actualizadas las 74 referencias internas de HTML y CSS; todas verificadas contra el disco.

**Aviso de rutas**: `index2.html` e `index3.html` ya no existen. Si esas URLs estaban publicadas, hay que redirigirlas a `terms.html` y `about.html` desde la configuración del hosting.

## Fase 3 — Higiene

Eliminado:

| Archivo | Motivo |
|---|---|
| `IMG/` (39 JPEG, 9.6 MB) | Trabajo de diseño de terceros guardado como moodboard —campañas ajenas, identidades corporativas ajenas, la tipografía HappyFatFont, el logotipo de Instagram—. Ninguna imagen se usaba en el sitio y publicarlas es un problema de derechos de autor |
| `IMG/40.jpg`, `IMG/41.png` | Pictogramas genéricos (halterofilia, lupa) sin relación con la marca y sin usar |
| `IMG/waves.svg` | Olas de `#000000` a `#0b0b0b`: invisibles sobre el fondo `#0D0D0D` del sitio, y sin usar |
| `FONTS/` (16 TTF, 6.9 MB) | Sustituido por WOFF2 subseteados. Los originales nunca se cargaron por falta de `@font-face` |
| `FONTS/Passions_Conflict/` | Tercera familia tipográfica: el sistema se limita a dos |
| `Resets.txt` | CSS con extensión `.txt` que ninguna página enlazaba. Contenía un `@font-face` de plantilla (`INSERT_NAME`, `NOMBREFUENTE.ttf`), la regla `html` duplicada y `-mox-box-sizing` mal escrito |
| `Scroll.css` | Duplicado exacto de un bloque de `Estilos2.css`. Sus reglas de scrollbar se conservan en `base.css` |
| `Normalize.css` | Normalize v8.0.1 modificado a mano (`img { cursor: pointer }`). Sustituido por un reset propio y mínimo |
| `Estilos.css`, `Estilos2.css` | Reescritos como `base` / `layout` / `components` |

- Antes de borrar cada imagen se confirmó con `grep` que ningún HTML, CSS o JS la referenciaba.
- Todos los archivos borrados siguen en el historial de git y son recuperables.
- `.gitignore` nuevo para un stack sin dependencias: `node_modules/`, `.env`, `dist/`, `.vercel/`, `.DS_Store`, `Thumbs.db`, `*.log`, `*.bak`.
- Formato normalizado: 2 espacios de indentación, comillas dobles en HTML, punto y coma en JS, salto de línea final en todos los archivos, cero tabulaciones.
- **No se encontró ninguna credencial, token ni clave de API** en el código, ni antes ni después.

## Fase 4 — Imágenes

Solo se trabajó con imágenes que ya existían. No se descargó ni se inventó ninguna.

- `IMG/32.jpg` (búho low-poly, 908×909, 212 KB, líneas negras sobre blanco) → `assets/img/logo/owl-mark.png`: canal alfa derivado de la luminancia, líneas en blanco, recortado y reescalado a 256×256. **15.9 KB**.
- `IMG/36.ico` (48×48) → `assets/img/logo/favicon.ico` a 32×32. **4.2 KB**.
- `assets/img/og-cover.jpg`: tarjeta de 1200×630 compuesta a partir de los assets reales del proyecto —el búho, el logotipo tipográfico y el eslogan, en la propia tipografía del sitio. **30.5 KB**.
- Las dos imágenes en HTML llevan `width` y `height` explícitos, y `alt=""` porque la marca es decorativa: el texto «Wake Up» ya está a su lado.
- Ninguna imagen queda por debajo del pliegue, así que no hay `loading="lazy"` que aplicar.

## Fase 5 — HTML, SEO y accesibilidad

- `lang="Es"` → `lang="en"` (el código estaba mal escrito y el contenido está en inglés).
- Añadidos `<meta charset="utf-8">` y `<meta name="viewport">`, que faltaban por completo en la portada.
- Estructura semántica en las cuatro páginas: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. Un solo `<h1>` por página, jerarquía sin saltos.
- Corregido `<h2>` como hijo directo de `<ul>` (se repetía tres veces en el pie), el `<li>` vacío y los `<HR></HR>`.
- `target="blank"` → `target="_blank" rel="noopener"` en los cuatro casos.
- `<link rel="website icon">` → `<link rel="icon" sizes="32x32">`.
- `<title>` único por página, de 53 a 57 caracteres. `<meta name="description">` única, de 152 a 156 caracteres.
- Open Graph completo (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`) y `<link rel="canonical">` en las tres páginas indexables. `404.html` lleva `noindex` y no lleva canonical.
- Accesibilidad: enlace «Skip to content», anillo de foco visible sobre todo elemento interactivo, áreas táctiles de 44px mínimo, `aria-label` y `aria-expanded` en el botón del menú, `aria-current="page"` en el enlace activo, `aria-hidden` en las flechas decorativas.
- Las letras del logotipo se parten en `<span>` para animarlas, pero se acompañan de una etiqueta oculta con la palabra íntegra: un lector de pantalla lee «Wake Up», no seis letras sueltas.
- `robots.txt` y `sitemap.xml` generados con las URLs reales del sitio.

Contenido eliminado por ser plantilla o dato inventado:

| Qué | Dónde estaba |
|---|---|
| `Infor@therunt.com` | Pie de la portada. Correo inventado |
| `1-234-5678` | Pie de la portada. Teléfono de plantilla |
| Bloque «Ways to Give» (`Forms`, `Text Giving`, `Mobile App Giving`, `Giving`) | Pie de la portada. Resto de una plantilla de donaciones para iglesias |
| Bloque «Help & Support» (`Q&A`, `Contact Us`, `FAQs`, `<li>` vacío) | Pie de la portada. Ninguno llevaba a ningún sitio |
| Enlace `MERCH` → `index4.html` | Nav del artículo. La página no existe |
| Enlaces `file:///C:/Users/pablo/Desktop/ESTATICAS/...` | Pie de `index2.html` e `index3.html`. Rutas a un disco local |
| `Webiste Name accessible at Website.com` | Términos. Marcador sin rellenar |
| `Company Name` (×2) | Términos. Marcador sin rellenar |
| Texto de los términos copiado en la página INFO | `index3.html`. Copia truncada a media frase |
| Formulario de newsletter | Portada. `action=""` y `method="get"`: no enviaba a ningún sitio |

Contenido corregido o completado con información real del proyecto:

- Erratas: `REALLITY` → `Reality`, `second change` → `second chance`, `Subcribe`, `Doesnt`, `didnt`, `you re`, `Webiste`.
- El título de la portada era `And Up`; ahora es el nombre de la marca.
- Los marcadores de los términos se rellenan con los datos reales: el sitio es «Wake Up» y está en `wakeup.wib.digital`. La frase que quedaba cortada se cierra.
- `about.html` se reescribe con contenido real: qué es el proyecto, de dónde viene el texto (el post de Instagram, cuyo enlace ya estaba en el código), un colofón verificable sobre tipografía y build, y quién lo hizo.
- El formulario de newsletter no estaba conectado a ningún servicio, así que se sustituye por un enlace real al post original de Instagram en lugar de fingir que funcionaba.
- La palabrota del titular se mantiene con asterisco, igual que el propio sitio ya escribía `sh*t` en la línea siguiente.

## Fase 6 — CSS y sistema de diseño

- Paleta derivada de los colores que el sitio ya usaba: `#0D0D0D`, `#0F1640`, `#031626`, `#F2F2F2`, `#CDCDCD`, `#B81611`, `#566573`.
- Dos colores se ajustaron por contraste, no por gusto:
  - `#B81611` sobre `#0D0D0D` da 2.91:1 y no llega al mínimo de texto. Se conserva como `--accent-deep` para filetes, bordes y fondos de botón, y se añade `--accent: #EE4B41` (5.29:1 sobre el negro, 4.73:1 sobre el azul) para el texto en rojo.
  - `#566573` sobre el pie da 3.08:1. Se conserva como `--steel` para bordes y se añade `--steel-text: #8B98A5` (6.26:1 sobre el pie, 5.90:1 sobre el azul) para el texto secundario.
  - Ratios medidos sobre las combinaciones reales del sitio: texto principal 17.36:1, texto secundario de 10.93:1 a 12.23:1, botón primario 5.93:1. La más baja de todas es 4.73:1.
- Escala de espaciado de 4/8/16/24/32/48/64/96 en ocho tokens. No queda ningún valor suelto tipo `margin-top: 37px`.
- Escala tipográfica coherente con `clamp()` para los tres tamaños de display. Dos familias, no tres.
- Orden dentro de cada archivo: fuentes → variables → reset → base → layout → componentes → utilidades → media queries.
- Eliminado el CSS muerto: `.moving-letters` (sin elemento), `.form label` (sin ningún `<label>` en el proyecto), las reglas del formulario borrado y los `transition: 0.3s` declarados dos veces en la misma regla.
- Cero `!important` fuera del bloque de `prefers-reduced-motion`, donde es la forma correcta de anular animaciones. Ningún selector de más de tres niveles. Ningún estilo en línea.

## Fase 7 — Responsive

- Reescrito el layout entero. Antes, las cuatro secciones se apilaban con `position: absolute` y desplazamientos fijos de 450px, 920px y 1460px sobre un `header` de 569px de alto: cualquier cambio de contenido descolocaba el orden vertical. Ahora es flujo normal con flexbox y grid.
- Mobile-first, media queries con `min-width` en 480 / 768 / 1024 / 1440.
- Verificado en 360, 768, 1024 y 1440px en las cuatro páginas: `document.documentElement.scrollWidth > window.innerWidth` es `false` en los 16 casos.
- Áreas táctiles: ningún enlace ni botón por debajo de 44px de alto.
- Menú móvil funcional por debajo de 768px: abre, cierra, bloquea el scroll del fondo, se cierra al pulsar un enlace, se cierra con Escape devolviendo el foco al botón, y se cierra solo al cruzar el breakpoint de escritorio.
- A partir de 1024px la etiqueta de sección se mueve a un raíl en el margen izquierdo, para que el ancho grande se lea como una columna editorial y no como espacio vacío.

## Fase 8 — UX / UI

- Un CTA principal por pantalla, con destino real: el héroe lleva al manifiesto; el manifiesto lleva al post original de Instagram.
- Estados completos en botones y enlaces: default, hover, focus, active y disabled, con transiciones de 180 a 240ms.
- Ancho de línea de texto entre 60 y 75 caracteres (`--measure: 62ch`).
- Sin gradientes, sin sombras. La única sombra del proyecto original (`box-shadow: 5px 5px 40px 16px`) desaparece con el formulario.
- Se eliminó el `backdrop-filter: blur(10px)` de la cabecera: además de ser decoración innecesaria, convertía la cabecera en el bloque contenedor del panel de navegación `position: fixed` y lo colapsaba a la altura de la propia cabecera.

## Fase 9 — JavaScript

- Fuera jQuery 1.12.2 (~97 KB) y anime.js 2.0.2 (~14 KB). Se usaban para una sola secuencia de texto.
- La animación del héroe se reimplementa en CSS: un filete vertical que barre el logotipo y las letras entrando escalonadas mediante una custom property por letra. Se preserva la intención del original y se elimina el bucle infinito que hacía desaparecer el logotipo cada pocos segundos.
- Un solo punto de entrada, `main.js`; la lógica vive en `modules/nav.js` y `modules/hero.js`.
- Un único global (`window.wakeUp`) en lugar de `$`, `jQuery`, `anime` y `ml`. Ningún `var`; todo `const` y `let`.
- Cada módulo comprueba que sus elementos existen antes de operar y no hace nada si faltan, así que el mismo JS es seguro en las cuatro páginas.
- Delegación de eventos para cerrar el menú al pulsar cualquier enlace del panel.
- Sin `type="module"`: los scripts de módulo están bloqueados por CORS en el origen `file://`, y eso habría dado un error de consola al abrir `index.html` directamente.

## Fase 10 — Rendimiento

| | Antes | Después |
|---|---|---|
| Peso del repositorio | 17 MB | 0.36 MB |
| Primera carga de la portada | jQuery + anime.js + 2 peticiones a Google Fonts + un favicon JPEG de 111 KB | 12 peticiones: ~200 KB transferidos con compresión, 275 KB sin comprimir |
| Peticiones a terceros | 4 | 0 |
| Fuentes | 6.9 MB de TTF que nunca se cargaron | 175 KB en 5 WOFF2 |

- Fuentes convertidas a WOFF2 y subseteadas a Latin. Caveat se aplana desde su fuente variable a la única instancia que el sitio usa (peso 500), lo que ahorra 23 KB de deltas.
- `font-display: swap` en las cinco declaraciones y `preload` de las dos cortadas críticas. No hay `preconnect` porque ya no hay origen externo al que conectarse.
- Los tres `<script>` llevan `defer`.
- El CSS se sirve en tres archivos con una responsabilidad clara cada uno, no fragmentado sin motivo.

## Fase 11 — QA

Verificado, punto por punto:

- Cada enlace del menú y del pie lleva a una página que existe: 74 de 74 referencias locales resuelven contra el disco.
- Cada `<link>`, `<script>` e `<img>` apunta a un archivo real.
- Cero errores y cero avisos en consola en `index`, `about`, `terms` y `404`.
- Sin scroll horizontal en 360, 768, 1024 y 1440px en las cuatro páginas.
- Menú móvil verificado en las dos direcciones, incluyendo Escape y el retorno del foco.
- No queda ningún «Lorem ipsum», «TODO», «Website.com», «Company Name» ni texto de plantilla: comprobado con `grep` sobre todo el repositorio.
- Ninguna imagen rota. Las cinco fuentes cargan (`document.fonts` las reporta todas como `loaded`).
- `title` y `description` únicos y dentro de rango en las cuatro páginas.
- `404.html` existe y enlaza de vuelta a la portada, a `about` y a `terms`.
- Ninguna credencial en el código.

## Fase 12 — Documentación

- `README.md` reescrito en inglés técnico: qué es, stack en tabla, árbol comentado, cómo correrlo en local, deploy, accesibilidad y autor. La única imagen que referencia es `assets/img/og-cover.jpg`, que existe.
- `docs/auditoria.md` y `docs/cambios.md` (este archivo).

## Fase 13 — Deploy

- Sin rutas absolutas de la máquina de desarrollo en ningún archivo del sitio. Las dos únicas apariciones de `file:///C:/Users/...` están en `docs/auditoria.md`, citadas como hallazgo.
- Todas las rutas internas son relativas y en minúsculas. Ninguna empieza por `/`, así que abrir `index.html` directamente funciona igual que servirlo por HTTP.
- No se creó configuración de hosting (`vercel.json`, `_redirects`, `.htaccess`) porque no se indicó destino.
- No se hizo deploy ni se ejecutó ninguna herramienta de publicación.
