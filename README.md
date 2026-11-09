# SAI — THE SERIES

A cinematic, streaming-inspired portfolio for **Sai Inapakolla**: Full Stack Developer, ML Engineer, and Java Backend Engineer (B.Tech CSE, Parul University 2023–2027).
Every section is an episode, every project is an Original, and the whole site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173 or http://localhost:5174).

Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and can be deployed to Vercel. Vercel also detects the `api/` function used by the Portfolio Studio admin API.

For production admin access, configure these Vercel environment variables for the Production environment:

- `MONGODB_URI`
- `MONGODB_DB` (optional; overrides the database name in `MONGODB_URI`, otherwise defaults to `portfolio`)
- `ADMIN_PASSWORD`

The admin API requires a serverless host such as Vercel; deploying only the `dist/` folder to a static host does not provide API routes.

## Updating the content

**Portfolio facts live in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).** Every component reads from it.

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, GitHub, LeetCode | `profile` |
| Projects & Originals (TeamX, SafeGo, TAI, Aeros, etc.) | `projects` |
| Achievements & Stats | `achievements`, `certifications` |
| Skills and evidence notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top Picks row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Profile order (Recruiter / Developer / Creative) | `viewerProfiles` |
| Opening studio card text | `profile.originalLabel` |

**Resume:** the built-in PDF has been removed. Add your own PDF at `public/assets/Resume.pdf`, or set `profile.resumePdf` to a hosted resume URL.

**Artwork:**
Regenerate responsive artwork and social card with:

```bash
npm run images
```
