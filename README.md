# Ogburn Creative — suggested redesign

A proposed refresh of [ogburn.ca](https://ogburn.ca). It's plain HTML, CSS and JS with no build
step. Open `index.html` in a browser to view it.

```
index.html      all content
css/style.css   layout, type and colour (type is set by the custom properties at the top)
js/main.js      scroll reveals, index hover preview, lightbox, type switcher
```

**Images:** the `images/` folder and the PNG favicons from the live site aren't in this repo yet
(only `favicon_io/favicon.ico` is).
Until they're copied in, each image falls back to its copy on ogburn.ca, so the preview still
shows the real work. Once the folders are added here, the fallback (the small script in
`<head>`) can be deleted.

## What changed, and why

- **The work leads.** Big, matted images on a 12-column grid with varied sizes and offsets,
  replacing the small thumbnails inside cards. Everything is on one scrolling page, so each
  discipline has a linkable URL (`/#identity`, `/#book-design`, …).
- **A point of view up front.** The tagline becomes the hero headline, followed by one line
  saying who Sharon works with.
- **An editorial index.** A numbered list of disciplines. On desktop, hovering a row floats a
  preview of the work beside the cursor.
- **Warmer palette.** Paper, ink, a vermilion accent and mustard for the playful bits, replacing
  corporate navy on grey. Each section has its own accent colour (`--accent` on the `<section>`).
- **The bio is always visible,** with a facts table (disciplines, training, clients). Contact is
  a large email address you can't miss.
- **Accessibility.** Real buttons and links throughout, keyboard support, a `<dialog>` lightbox
  with ← → navigation and Esc, a skip link, and `prefers-reduced-motion` respected.

## Typography

Sharon's favourites are Univers, Goudy, ITC Garamond and House Industries. All are commercial
faces, so this preview pairs each one with a free stand-in from Google Fonts. **The licensed
font names come first in every font stack**, so on a machine where the real fonts are installed
they replace the stand-ins automatically.

| Role | Her pick | Stand-in in this preview | Why |
|---|---|---|---|
| Display / headlines | Goudy Old Style | Sorts Mill Goudy | A faithful Goudy revival. The italic does the expressive work ("*what matters.*"). |
| Display (alternate) | ITC Garamond | EB Garamond (set tight) | ITC Garamond's tight, big-x-height '70s look is approximated with negative tracking. |
| UI, captions, labels | Univers | Archivo (variable width) | Like Univers' numbered width system, Archivo has a width axis. Labels use expanded caps; body text uses the normal width. |
| Playful accents | House Industries (e.g. Sign Painter) | Yellowtail | Used in only two places: the "Hello!" badge and the "Hi, I'm Sharon!" sticker. |

**The corner switcher** (Goudy / Garamond / Univers) lets Sharon compare the three pairings
live. Her choice is remembered between visits, and `?type=garamond` in the URL also selects
one. Delete the `.type-switch` element before launch.

**To use the real fonts on the live site**, license webfonts and self-host them with
`@font-face`, using the names already in the stacks in `css/style.css`:
- Univers Next or Univers LT: Linotype / Monotype
- Goudy Old Style: Monotype, or Adobe Fonts if she has Creative Cloud
- ITC Garamond: Monotype / ITC
- Sign Painter, Studio Lettering, Neutraface and the rest: houseind.com

Only the custom properties at the top of the CSS need to change.

## Copy edits to review

The site's text is kept almost word for word, with a few light edits Sharon should check:

- **Promotion intro.** The sentence about digital media was garbled ("made printed posters and
  brochures have more exclusive…"). It's reworded as "Digital media has made printed posters and
  brochures rarer — and more impactful."
- **Spelling.** "Synogogue" → "Synagogue".
- **Land acknowledgement.** The Squamish name now uses the Nation's own spelling,
  Sḵwx̱wú7mesh.
- **EFIV caption.** The original called the Inukshuk a "Coast Salish welcoming motif". The
  inukshuk is an Inuit form, so this draft says "a welcoming motif". Please confirm the intended
  wording with Sharon.
- **Identity captions.** Shortened the logo names (e.g. "ALC Logo" → "ALC").
- **"Selected clients" list.** Built only from names already on the site.

## Before launch

- [ ] Copy `images/` and the remaining `favicon_io/` files into the repo and remove the image-fallback script
- [ ] Remove the type switcher
- [ ] License and self-host the final faces
- [ ] Re-add Google Analytics (`G-KDCQCG12T2`) if it's still wanted
- [ ] Replace the text wordmark with an SVG of the logo, if preferred
- [ ] Consider adding a portrait to About and restoring the Instagram link
