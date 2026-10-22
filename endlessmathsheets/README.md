# Endless Math Sheets

Free printable math worksheet generator: 110 worksheet makers (K–7th grade) that create a
new set of problems on every click, each with an answer key. Static site, no server, no
runtime dependencies.

- Live site config: `site.config.js` (domain, contact email, AdSense ID)
- Korean launch guide: [`SETUP.ko.md`](SETUP.ko.md)

## Commands

```bash
npm run build          # build the site into dist/
npm test               # generator correctness tests + full build/link check
npm run serve          # serve dist/ on http://localhost:4321
npm run build:preview  # relative-link build in dist-preview/ (for sandboxed previews)
```

Node 18+ is required. There is nothing to `npm install`.

## How it works

```
src/engine/      Runs in the browser and at build time (same code, same output)
  rng.js         Seeded random numbers; the seed is the "sheet code" printed on each sheet
  generators.js  One generator per problem type, each with exact rules (e.g. "every
                 problem needs regrouping")
  render.js      Turns problems into sheet HTML; sizes in cqw/em so screen and print match
  index.js       makeWorksheet(config, state)
src/client/app.js  Worksheet maker UI (options, new sheet, print, shareable links)
src/content/     All page data: categories, 110 worksheets, grades, static pages
src/site/        Page templates and CSS (site.css; fonts.css is self-hosted Google Fonts)
scripts/build.js Writes every page, sitemap.xml, robots.txt and (when configured) ads.txt
```

Every worksheet page ships with a pre-rendered sheet (seed derived from its URL), so the
page has real content without JavaScript. The URL query (`?s=CODE&n=20...`) restores any
sheet exactly.

## Adding a worksheet

Add an entry with `ws({...})` in `src/content/worksheets.js`: pick a generator from
`src/engine/generators.js`, its params, the default format and count, and write the intro,
`onSheet` and tips. Then run `npm test` — the tests check every answer and every link.

## Ads

1. Set `adsense.client` in `site.config.js` to your `ca-pub-...` ID and rebuild.
   This adds the AdSense script to every page and writes `ads.txt`.
2. Turn on Auto ads in AdSense, or create ad units and put their slot IDs in
   `adsense.slots.top` / `adsense.slots.bottom` for fixed placements.

Ads never print: print styles hide everything except the worksheet.

## Deploying

Any static host works. On Cloudflare Pages: root directory `endlessmathsheets`, build command
`npm run build`, output directory `dist`.
