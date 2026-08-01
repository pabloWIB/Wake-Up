# Wake Up

A four-page static manifesto site with an animated typographic hero. No framework, no build step, no dependencies.

![Wake Up](assets/img/og-cover.jpg)

Live at **[wakeup.wib.digital](https://wakeup.wib.digital)**.

## Description

Wake Up is a single argument, printed large: results follow from turning up, not from waiting until you feel like it. The copy is deliberately blunt, which is why it is set in a formal serif instead of a poster face — the tension between the message and the typography is the design.

The front-page text is not written for the site. It comes from an Instagram post and is kept word for word apart from the spelling.

The hero reveal — a vertical rule sweeping across the wordmark, then the letters staggering in — runs on CSS animation driven by a custom property set per letter in JavaScript. It stops entirely under `prefers-reduced-motion`.

## Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | HTML5 | Four static pages, semantic landmarks, one `<h1>` each |
| Styling | CSS3 | Custom properties, grid and flexbox; mobile-first at 480 / 768 / 1024 / 1440 |
| Scripting | Vanilla JavaScript | Three files, one entry point, one namespaced global |
| Display and text | Cormorant Garamond | 300, 400, 400 italic, 700 |
| Handwritten cuts | Caveat | One static instance at 500, flattened from the variable source |
| Font delivery | Self-hosted WOFF2 | Subset to Latin — five files, 175 KB total |
| Build | None | Files are served exactly as written |
| Dependencies | None | No package manager, no CDN, no third-party script |

First load of the landing page is 12 requests: about 200 KB over the wire from a server that compresses text, 275 KB uncompressed. The fonts are 175 KB of that and are the only thing worth optimising further.

## Project structure

```
.
├── index.html              # Manifesto — landing page with the animated wordmark
├── about.html              # What the project is, plus the colophon
├── terms.html              # Terms and conditions
├── 404.html                # Not found, with links back into the site
├── robots.txt              # Allows everything but 404.html; points at the sitemap
├── sitemap.xml             # The three indexable URLs
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── base.css        # @font-face, design tokens, reset, base typography
│   │   ├── layout.css      # Shell, header, hero, bands, footer, breakpoints
│   │   └── components.css  # Skip link, nav, buttons, statements, hero motion
│   ├── js/
│   │   ├── main.js         # Entry point — starts each registered module in order
│   │   └── modules/
│   │       ├── nav.js      # Mobile menu: open, close, Escape, scroll lock
│   │       └── hero.js     # Splits the wordmark so CSS can stagger the reveal
│   ├── fonts/              # Five WOFF2 files, subset to Latin
│   └── img/
│       ├── og-cover.jpg    # Open Graph share card
│       └── logo/
│           ├── owl-mark.png
│           └── favicon.ico
└── docs/
    ├── auditoria.md        # Audit of the state before the reorganisation (Spanish)
    └── cambios.md          # Change log grouped by phase (Spanish)
```

## Running it locally

Opening `index.html` in a browser works — every path is relative and the scripts are classic deferred scripts, so nothing is blocked by the `file://` origin.

To serve it over HTTP instead:

```bash
git clone https://github.com/pabloWIB/Wake-Up.git
cd Wake-Up
npx serve .
```

Any static server will do; `python -m http.server` works the same way.

## Deployment

Static hosting, root of the repository, no build command and no output directory. `404.html` is picked up automatically by hosts that serve a file of that name for unmatched paths.

The canonical URLs, the Open Graph URLs and `sitemap.xml` all point at `https://wakeup.wib.digital`. Change them together if the site moves.

## Accessibility and SEO

- One `<h1>` per page, headings in order, `<header>` / `<nav>` / `<main>` / `<footer>` landmarks.
- Skip link, visible focus ring on every interactive element, 44px minimum touch targets.
- Body and de-emphasised text clear 4.5:1 against both dark surfaces; the brand red is lifted for text use and the original red is kept for rules and borders.
- Mobile menu closes on Escape, on link activation and on resize past the desktop breakpoint, and returns focus to its button.
- Unique `<title>` and `<meta name="description">` per page, canonical links, Open Graph tags, `robots.txt` and `sitemap.xml`.

## A note on the copy

The manifesto is profane by design and the profanity is asterisked throughout, matching the way the original text was written. It is the loudest line on the landing page — worth knowing before the repository is linked from a client-facing context.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
