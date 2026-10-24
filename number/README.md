# Number Systems

An interactive React app for learning Decimal, Binary, Octal, and Hexadecimal
number systems. Features include number conversion with explanations, practice
counters, a quiz, and answer-checking exercises.

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
