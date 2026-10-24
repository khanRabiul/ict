# Number Systems

An interactive React app for learning Decimal, Binary, Octal, and Hexadecimal
number systems. Features include number conversion with explanations, practice
counters, a quiz, and answer-checking exercises. The converter supports
fractional values (for example, `10.625`) and explains the fractional
place-value and repeated-multiplication steps.

## Run locally

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

The production build is generated in `dist`.

## Deploy to Vercel

Import this repository into Vercel and use the detected Vite settings:

- Framework preset: **Vite**
- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install`

`vercel.json` rewrites application routes to `index.html`, so direct visits and
refreshes on routes such as `/counters`, `/converter`, `/quiz`, `/test-skills`,
and `/about` load the single-page app correctly.

### Visitor analytics

Vercel Web Analytics is integrated with the app. After deploying, open the
project in Vercel, go to **Analytics**, and enable Web Analytics to view visitor
and page-view data. Analytics data appears after the site receives traffic.
