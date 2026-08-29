# CRISPR Website

The official website for CRISPR — a student-led technology and innovation club at IIIT Nagpur.

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **React Router v8** for client-side routing
- **Vite 8** for build tooling

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Install & Run

```bash
pnpm install
pnpm dev
```

The dev server runs on `http://localhost:8443` by default.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Format Code

```bash
pnpm format
```

## Project Structure

```
src/
├── App.tsx                 # Root component with router
├── routes.ts               # Route definitions
├── index.css               # Global styles + Tailwind v4 import
├── main.tsx                # Entry point
├── components/
│   ├── Cursor.tsx           # Custom cursor
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Hero section
│   ├── ProductRow.tsx       # Product display row
│   ├── TeamMember.tsx       # Team member card
│   ├── Marquee.tsx          # Scrolling marquee
│   ├── StatSection.tsx      # Statistics section
│   └── ui/                  # Reusable UI components
├── pages/
│   ├── Home.tsx             # Landing page
│   ├── Team.tsx             # Team members
│   ├── Products.tsx         # Products showcase
│   ├── Events.tsx           # Events & competitions
│   ├── Alumni.tsx           # Alumni stories
│   ├── Aira.tsx             # AI research section
│   └── Contact.tsx          # Contact form & info
├── data/
│   ├── team.ts              # Team member data
│   ├── products.ts          # Product listings
│   ├── events.ts            # Events data
│   └── alumni.ts            # Alumni profiles
└── hooks/
    └── useScrollReveal.ts   # Scroll animation hook
```

## Pages

| Page | Description |
|------|-------------|
| `/` | Home — Hero, about, products preview, team, events, AIRA |
| `/team` | Full team with leadership, development, department heads |
| `/products` | All products with tag filtering |
| `/events` | Event archive with year filtering |
| `/alumni` | Alumni stories and achievements |
| `/aira` | AI research areas and projects |
| `/contact` | Contact info and message form |

## Assets

Place images in:

- `public/photos/` — Team member photos
- `public/events/` — Event photos
- `public/alumni/` — Alumni photos
- `public/logo.png` — CRISPR logo
