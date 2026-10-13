# AMIT — THE SERIES

A cinematic, streaming-inspired portfolio for **Amit Sah**: Senior iOS Developer and Backend Engineer with 5+ years of experience and 30+ production apps.
Every section is an episode, every project is an Original, and the whole site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and can be deployed as-is to Vercel, Netlify, GitHub Pages or any static host.

## Updating the content

**Portfolio facts live in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).** It was generated from the resume, and every component reads from it.

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, GitHub | `profile` |
| A project, or a new one | `projects` (add an object; it appears in Originals, the overlay, the resume sheet and the counts) |
| Achievements / certifications | `achievements`, `certifications` |
| Skills and their "where it's used" notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top Picks row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Profile order (Recruiter / Developer / Creative) | `viewerProfiles` |
| Opening studio card text | `profile.originalLabel` |

**Resume:** replace `public/assets/Resume.pdf`.

**Artwork:** the site uses an Amit Sah monogram because the résumé contains no portrait. Regenerate the responsive artwork and social card with:

```bash
npm run images
```

This rebuilds the responsive WebP monograms and the social share image in `public/assets/`.

## What's inside

```
src/
  data/portfolio.ts        ← single source of truth (from the resume)
  App.tsx                  ← stages: opening → profile select → home; overlays
  components/
    OpeningSequence        ← black → studio card → AMIT → THE SERIES → portrait → ▶ PLAY
    ProfileSelector        ← "Who's watching?" (changes section order only)
    Navbar                 ← hide-on-scroll nav, profile switcher, mobile menu
    Hero                   ← billboard: parallax portrait, particles, light streaks, floating chips
    PlayIntro              ← ▶ Play Intro: zoom into portrait → highlight reel (pause, ← →, tap zones)
    ContinueWatching       ← cards with real "watched" progress bars
    About                  ← The Pilot
    Seasons / EpisodeCard  ← My Journey as seasons and episodes
    Originals / ProjectCard← pinned horizontal sequence on desktop, swipe rail on touch
    ProjectModal           ← full-screen project overlay with a shared-element transition
    TopPicks               ← Top 10-style row
    Skills                 ← skill genres; each card shows where the skill appears
    Achievements           ← award-poster cards + certification rail (links to credentials)
    ResumeViewer/ResumeModal ← designed resume sheet, PDF viewer, download
    FinalCTA               ← TO BE CONTINUED… + contact links
    CustomCursor, fx.tsx   ← cursor states, magnetic buttons, 3D tilt, text reveals, particles
  hooks/                   ← Lenis smooth scroll + scroll lock, media queries, watch progress
scripts/build-images.mjs   ← monogram/share-image pipeline (sharp)
```

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis.

## Accessibility and performance

- `prefers-reduced-motion` is respected: smooth scroll, the custom cursor, tilt, particles, grain and the pinned horizontal scroll turn off, and the opening jumps straight to its final frame.
- Hover effects only run on devices with a precise pointer. Touch devices get tap interactions and native swipe rails.
- The custom cursor appears only with a mouse or trackpad.
- Overlays close with Esc, and the highlight reel supports Space and the ← → keys.
- Monogram artwork is delivered as responsive WebP files. Overlays are code-split, and particles pause when they're off screen.

## Keyboard shortcuts

- **Opening:** Enter or Esc skips it.
- **Play Intro:** Space pauses, ← and → change slides, Esc closes.
- **Project and resume overlays:** Esc closes.

## Deployment configuration

Root hosting works with `npm run build`. For a GitHub Pages repository subpath, set `BASE_PATH=/repository-name/` when building. Asset URLs follow that base, including portraits and the PDF.

The canonical URL defaults to `https://amit-sah.com.np/`, as listed on the résumé. Override `SITE_URL` with the full public portfolio URL (including the repository subpath, if any) to generate a canonical link, `og:url`, and an absolute social image URL. For example:

```bash
BASE_PATH=/portfolio/ SITE_URL=https://example.com/portfolio/ npm run build
```

The opening includes an **Explore portfolio** shortcut to reach the content immediately. Profile selection remains available from the navigation.

## Checks

```bash
npm run check
npx playwright install chromium
npm test
npm run build
```

Browser tests cover direct entry, profile persistence, intro tap controls, modal focus and Escape behavior, PDF availability, and large touch-screen rails. GitHub Actions runs the production build and browser tests on pushes and pull requests. No separate lint configuration is included; TypeScript checks strict typing and unused declarations.

The current content is transcribed from `public/assets/Resume.pdf`: five roles, eight featured apps/projects, 21 linked production apps, and five listed certifications. Certificate URLs are omitted because the résumé does not provide them.
