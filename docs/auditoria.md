# Auditoría — Wake-Up

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

- Fecha: 2026-07-30
- Peso del repo (sin `.git`): **17 MB**
- Archivos fuente: 3 HTML, 4 CSS (uno de ellos en `.txt`), 0 JS externos, 42 imágenes, 16 fuentes TTF

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `And Up` | `WAKEUP` + un `<h1 class="letters">` vacío | Landing con héroe animado | Sin `charset`, sin `viewport`, sin `description`, `lang="Es"`, dos `<h1>` |
| `index2.html` | `Terms` | `Terms and Conditions` | Términos y condiciones | Texto de plantilla con marcadores sin rellenar |
| `index3.html` | `Info` | `INFORMATION` | Página de información | Copia literal y truncada del texto de `index2.html` |

No existía `404.html`.

## 2. Hojas de estilo

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `Estilos.css` | 5.8 KB | Sí, en `index.html` | Layout entero a `position: absolute` con desplazamientos fijos en px |
| `Estilos2.css` | 2.1 KB | Sí, en `index2.html` e `index3.html` | Contiene `Scroll.css` copiado literalmente (líneas 2–15) |
| `Normalize.css` | 6.5 KB | Sí, en `index.html` | Normalize v8.0.1 **modificado**: `img { cursor: pointer }` y `button, input { cursor: pointer }` añadidos a mano |
| `Scroll.css` | 238 B | Sí, en `index.html` | Duplicado íntegro de un bloque de `Estilos2.css` |
| `Resets.txt` | 1.8 KB | **No** | CSS guardado con extensión `.txt`. Ninguna página lo enlaza |

## 3. JavaScript

| Origen | Qué es | Uso real |
|---|---|---|
| `<script>` en línea, `index.html` | Secuencia de animación del héroe | 35 líneas, sin archivo propio |
| jQuery 1.12.2 (Google Hosted Libraries) | ~97 KB | Solo `.each()`, `.html()`, `.text()` y `.width()` |
| anime.js 2.0.2 (cdnjs) | ~14 KB | Timeline del héroe |
| `var ml = { timelines: {} }` | Global suelto en `<head>` | Nunca se lee después de escribirse |

## 4. Imágenes

| Grupo | Archivos | Peso | ¿Referenciadas? | Qué son |
|---|---|---|---|---|
| Moodboard JPEG | 39 `.jpg` | 9.6 MB | No (salvo `25.jpg`, ver abajo) | Trabajo de diseño de **terceros**: campañas «REUEL 2022», identidad «Gebeiteld», tipografía «HappyFatFont» de hoytypo.xyz, fotografía de arquitectura, Marina Bay Sands, logotipo de Instagram |
| Marca búho | `36.ico` (48×48) | 15 KB | Sí, ninguna página la enlaza | Búho low-poly. Único icono propio del proyecto |
| Búho en JPEG | `32.jpg`, `33.jpg` (908×909) | 422 KB | No | El mismo búho sobre blanco y sobre negro |
| Iconos genéricos | `40.jpg` (halterofilia), `41.png` (lupa) | 28 KB | No | Pictogramas sueltos sin relación con la marca |
| Vector | `waves.svg` (900×900) | 3.2 KB | No | Olas en capas de `#000000` a `#0b0b0b`: invisible sobre el fondo `#0D0D0D` del sitio |

Las dos imágenes más pesadas eran `20.jpg` (1010 KB) y `19.jpg` (851 KB), ninguna usada.
`IMG/2.jpg` no existe: hay un hueco en la numeración.

## 5. Tipografías

| Familia | Archivos | Peso | ¿Declarada en CSS? |
|---|---|---|---|
| Cormorant Garamond | 10 TTF | 5.5 MB | **No.** Ningún `@font-face` |
| Caveat | 5 TTF | 1.2 MB | **No.** Ningún `@font-face` |
| Passions Conflict | 1 TTF | 143 KB | **No.** Ningún `@font-face` |
| Lato | CDN Google Fonts | — | Sí, dos peticiones separadas (`Lato:100` y `Lato:100italic`) |

`Estilos.css` pedía `font-family: Passions` en cinco reglas y `Resets.txt` pedía `font-family: Caveat`.
Sin ninguna declaración `@font-face`, **las tres familias autoalojadas nunca llegaron a cargarse**: el navegador
caía al `serif` del sistema. Los 6.9 MB de TTF eran peso muerto en el repositorio.

## 6. Enlaces y referencias rotas

| Dónde | Referencia | Problema |
|---|---|---|
| `index.html:67` | `href="index4.html"` (MERCH) | El archivo no existe |
| `index2.html:42` | `href="file:///C:/Users/pablo/Desktop/ESTATICAS/8.%20Estatica%20%C2%B0/Wake%20Up.html"` | Ruta absoluta a un disco local. Rota para cualquier visitante |
| `index3.html:30` | Misma ruta `file:///C:/Users/pablo/...` | Idéntico |
| `index.html:9` | `<link rel="website icon" href="IMG/25.jpg">` | `rel` inválido (`icon` es el valor correcto) y apunta a una imagen de moodboard de 111 KB |
| `index.html:90` | `<li>Instagram</li>` | Texto plano, no era un enlace |
| `index.html:45, 67, 81` | `target="blank"` | Falta el guion bajo: abre una ventana llamada «blank» en vez de una pestaña nueva. Sin `rel="noopener"` |

## 7. Errores de marcado

| Dónde | Problema |
|---|---|
| `index.html:2` | `lang="Es"` — código mal escrito, y el contenido está en inglés |
| `index.html` | Sin `<meta charset>` ni `<meta name="viewport">`: sitio no responsive por definición |
| `index.html:17, 24` | Dos `<h1>` en la misma página |
| `index.html:87-93` | `<h2>` como hijo directo de `<ul>` (solo se permite `<li>`) — se repite en los tres bloques del pie |
| `index.html:110` | `<li></li>` vacío |
| `index.html:51` | `placeholder="Ingresa tu email"` en español dentro de un sitio en inglés, y sin `<label>` |
| `index2.html:13`, `index3.html:13` | `<HR></HR>` — etiqueta vacía escrita como par y en mayúsculas |
| `index3.html:26` | `<p>` sin cerrar; el `<div class="FooterPab">` queda dentro de `<main>` y después de un `<hr>` suelto |
| `index2/3.html` | El pie está dentro de `<main>`, no hay `<header>`, `<nav>` ni `<footer>` |

## 8. CSS muerto o problemático

| Regla / archivo | Problema |
|---|---|
| `.moving-letters` (`Estilos.css:13`) | Ningún elemento usa esa clase |
| `.form label` (`Estilos.css:148`) | No existe ni un `<label>` en el proyecto |
| `Scroll.css` completo | Duplicado exacto dentro de `Estilos2.css` |
| `.page`, `.ContenidoArticle`, `.DiveIt`, `.FooterFin` | Apiladas con `position: absolute` y `margin-top` de 450px / 920px / 1460px. Cualquier cambio de alto rompe el orden vertical |
| `.Motivation` | `margin-top: 300px` + `top: 5%` sobre un `header` de altura fija de 569px |
| `Resets.txt:16-19` | `@font-face { font-family: "INSERT_NAME"; src: url(FONTS/CARPETA/NOMBREFUENTE.ttf); }` — plantilla sin rellenar |
| `Resets.txt:21` y `:113` | La regla `html` se declara dos veces en el mismo archivo, con valores distintos |
| `Resets.txt:26` | `-mox-box-sizing` — propiedad mal escrita (`-moz-`) |
| `Estilos.css` | Única media query en todo el proyecto: `@media (max-width:1166px)`, y solo oculta una línea decorativa |
| `Estilos.css:73-85` | `.Motivation div :hover` (con espacio) y `.Motivation div h2:hover` declaran `transition: 0.3s` dos veces en la misma regla |

## 9. Contenido de relleno y datos inventados

| Dónde | Contenido |
|---|---|
| `index.html:89` | `Infor@therunt.com` — correo inventado, con la palabra «Infor» mal escrita |
| `index.html:91` | `1-234-5678` — teléfono de plantilla |
| `index.html:96-102` | Bloque «Ways to Give»: `Forms`, `Text Giving`, `Mobile App Giving`, `Giving`. Restos de una plantilla de donaciones para iglesias |
| `index.html:105-111` | Bloque «Help & Support»: `Q&A`, `Contact Us`, `FAQs` y un `<li>` vacío. Ninguno llevaba a ningún sitio |
| `index2.html:14` | `our website, Webiste Name accessible at Website.com` |
| `index2.html:29, 31` | `without the express written consent of Company Name` (dos veces) |
| `index3.html` | Página «INFORMATION» con el texto de los términos copiado y cortado a media frase |

Erratas en el texto visible: `REALLITY`, `second change` (por *chance*), `Subcribe`, `Doesnt`, `didnt`, `you re`, `Webiste`.

## 10. Rendimiento y seguridad

- Primera carga de `index.html`: jQuery 97 KB + anime.js 14 KB + dos peticiones a Google Fonts + `IMG/25.jpg` (111 KB) como favicon.
- Ningún `<script>` con `defer`: jQuery y anime.js bloqueaban el render en el `<head>`.
- Sin `font-display`, sin `preconnect`.
- **No se encontró ninguna credencial, token ni clave de API** en el código.

---

## Resumen en cinco líneas

1. **Qué es**: *Wake-Up*, un sitio-manifiesto de marca personal de tres páginas, en inglés, con un héroe tipográfico animado con anime.js y jQuery.
2. **En qué estado estaba**: funcionaba en un monitor de escritorio y en ningún sitio más. Todo el layout se apila con `position: absolute` y desplazamientos fijos en píxeles, y `index.html` no tenía ni `charset` ni `viewport`.
3. **Lo más grave**: las 39 imágenes del repositorio (9.6 MB) son **trabajo de diseño de terceros guardado como referencia** —campañas ajenas, identidades corporativas ajenas, una tipografía comercial, el logotipo de Instagram—, y ninguna se usaba en el sitio. Publicarlas en un repositorio de portafolio es un problema de derechos de autor, no de organización.
4. **Lo segundo más grave**: los 6.9 MB de fuentes TTF nunca se cargaron. No existía ni una sola declaración `@font-face`, así que la tipografía que define la marca jamás llegó al navegador.
5. **Lo tercero**: dos de las tres páginas eran texto de plantilla con los marcadores sin rellenar (`Website.com`, `Company Name`), el pie inventaba un correo y un teléfono, y arrastraba un bloque de donaciones de iglesia que no tiene nada que ver con el proyecto.
