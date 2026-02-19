# Schlaf-Platz.com — Next.js Redesign

Modern, performance-optimized Next.js website for **Schlaf-Platz e.G.** — Germany's free Monteurzimmer platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
schlaf-platz-nextjs/
├── public/                    # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (metadata, fonts)
│   │   ├── page.tsx           # Homepage (Startseite)
│   │   ├── HomeClient.tsx     # Homepage interactive components
│   │   ├── mieter/
│   │   │   ├── page.tsx       # Mieter page (server wrapper)
│   │   │   └── MieterClient.tsx  # Multi-step form + content
│   │   ├── karriere/
│   │   │   ├── page.tsx       # Karriere page (server wrapper)
│   │   │   └── KarriereClient.tsx
│   │   └── monteurzimmer-[city]/
│   │       ├── page.tsx       # Dynamic city pages (SSG)
│   │       └── CityClient.tsx # City template component
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Shared navigation
│   │   │   └── Footer.tsx     # Shared footer
│   │   └── ui/
│   │       └── index.tsx      # Reusable UI components
│   ├── lib/
│   │   └── constants.ts       # Brand data, city data, nav links
│   └── styles/
│       └── globals.css        # Tailwind + custom styles
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-primary` | `#0B2545` | Navy — headings, nav, trust |
| `brand-accent` | `#E8AA42` | Gold — CTAs, highlights |
| `brand-surface` | `#F7F5F0` | Warm off-white backgrounds |
| `brand-success` | `#2D8A4E` | Confirmations, checkmarks |

### Typography
- **Display**: DM Sans (headings, labels, buttons)
- **Body**: Source Sans 3 (paragraphs, form text)

### Components (in `src/components/ui/`)
- `AnimatedNumber` — Scroll-triggered counter animation
- `Stars` — Star rating display
- `FaqItem` — Accordion FAQ component
- `TestimonialCard` — Review card with stars
- `Section` / `SectionHeader` — Page layout helpers
- `ArrowRight`, `Check`, `GoogleLogo` — Icon components

## 🏙️ City Pages

City landing pages are generated statically from data in `src/lib/constants.ts`. Each city includes:
- Hero with city-specific description
- Facts & data (Bundesland, Einwohner, Autobahnen)
- Stadtteile, Industriegebiete, Messen
- Sehenswürdigkeiten, Baumärkte
- Vermieter CTA

**Currently configured cities**: Berlin, München, Hamburg, Köln, Frankfurt, Düsseldorf, Stuttgart, Dortmund, Essen, Leipzig

To add a new city, add an entry to the `CITIES` array in `constants.ts`.

## 🔗 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, value props, dual CTA, testimonials, cities, timeline |
| `/mieter` | Unterkunft finden — multi-step form, pain points, solution, FAQ |
| `/karriere` | Karriere — perks, open positions |
| `/monteurzimmer-berlin` | City landing page (dynamic, 10 cities) |
| `/monteurzimmer-muenchen` | City landing page |
| ... | All 10 cities generated from data |

## 🛠️ Tech Stack

- **Next.js 14** (App Router, Static Generation)
- **React 18** (Client Components for interactivity)
- **TypeScript**
- **Tailwind CSS 3** (custom design tokens)
- **No external UI library** — custom components for full control

## 📋 TODO / Next Steps

- [ ] Connect multi-step form to backend API / email service
- [ ] Add `next/image` optimization for team photos
- [ ] Implement blog/Bibliothek section
- [ ] Add Impressum, Datenschutz, AGB pages
- [ ] Online Shop integration
- [ ] Add structured data (JSON-LD) for SEO
- [ ] Performance audit & Lighthouse optimization
- [ ] Add sitemap.xml generation
