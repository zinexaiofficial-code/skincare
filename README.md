# Sashwari Skincare Website

Premium multi-page React/Vite website for the Sashwari Sri Lankan skincare brand.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Architecture

- `src/pages` contains the Home, Collections, collection detail, Skin Concerns, Our Science, About, Contact and 404 routes.
- `src/components/common` contains shared buttons, cards, page heroes, image loading, motion reveals and the branded loader.
- `src/components/layout` contains the shared header, footer and site shell.
- `src/data/site.js` is the single source of truth for confirmed brand links, collection content and concern content.
- `public/brand` contains the supplied official logo and loader artwork.
- `public/video` contains the supplied home hero videos.
- `public/carousel` contains the supplied editorial background images.

## Motion and media

Motion for React powers the first-load logo reveal, route transitions, scroll reveals, video crossfades and card entrances. CSS handles lightweight hover states, the WhatsApp pulse, gradients and reduced-motion fallbacks. The initial loader appears once per browser session; route changes use a shorter fade transition. Hero video autoplay is muted and inline, with manual slide controls.

## Client information still required

Before public launch, confirm official product photography, product names and details, ingredient information, technical/testing information, delivery and return policies, business contact details, and approved customer testimonials. The current site intentionally makes no unverified medical, certification, pricing or performance claims.
