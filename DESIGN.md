# FLYOKAY Visual Design System

> Visual-plane design reference for the FLYOKAY Figma file<br>
> Canonical implementation design reference, synchronized with [`design-system.html`](design-system.html).<br>
> Source: [FLYOKAY Figma](https://www.figma.com/design/N8OzIx0j7VtMrSNeuHL31e/FLYOKAY?node-id=0-1) · audited 2026-08-09<br>
> Scope: visual composition, typography, color, imagery, logo treatment, components and responsive artboards. Website functionality, state logic, and interaction behavior are intentionally out of scope.

## 0. What changed from the Oura reference

FLYOKAY keeps the quiet, premium editorial scaffolding of the preceding Oura-derived reference: warm off-white canvas, coffee-gray type, broad whitespace, pill controls, rounded media cards, dark editorial bands, and soft atmospheric gradients. The brand has been materially re-authored at the visual layer.

| System area | Oura reference | Confirmed FLYOKAY change |
| --- | --- | --- |
| Brand mark | Oura wordmark | Raster asset `FLYOKAY_luxury_black_and_gold_gradient_logo_for_LED_flying_orb_gifts`; metallic black/gold gradient wordmark |
| Display type | Editorial New serif | Inter Light; italic emphasis uses Inter Extra Light Italic |
| UI/body type | AkkuratLL | Inter Regular; Inter Medium/Bold only for product or FAQ emphasis |
| Primary CTA | `#2A72DE` | `#179BD7` bright cyan-blue |
| Product world | Smart ring / quantified health | LED flying orb, light show, celebrations, gifting and playful social moments |
| Image language | Minimal health/lifestyle photography | Warm celebration/lifestyle photography plus colorful illuminated-orb product art |
| Store/product surfaces | Oura product rails | Orb variants, packaging renders, vivid hero photos, softer beige specification cards |
| Shape scale | Mostly 12–16px cards + pills | Retains 12/15px cards and pills; expands into 20/22/24/40px featured containers |

## 1. File structure and visual inventory

The Figma document has one canvas page, `Page 1`, with no local Variables, Paint Styles, Text Styles or Effect Styles. Consequently, every token in this document is taken from actual node fills, strokes, text segments, effects, image fills and artboard geometry—not inferred from style names.

### Major visual page groups

| Group | Figma section | Desktop artboard | Responsive artboards | Visual role |
| --- | --- | ---: | --- | --- |
| Landing Page | `1:2` | `1920w light` · 1920×6000.77 | 1440 / 1024 / 768 / 390 | Brand story, product offers, MemoOrb, light-show scenarios, news and footer |
| Landing copy | `858:1839` | `1920w light` · 1920×6000.77 | Desktop-only duplicate | Duplicate visual working copy; do not treat as a distinct product page |
| Product Page | `317:2144` | `1920w light` · 1920×6638 | 1440 / 1024 / 768 / 390 | Product imagery, variant selection, purchase card, FAQ and specifications |
| Store Page | `329:3337` | `1920w light` · 1920×5106 | 1440 / 1024 / 768 / 390 | Retail catalog, product variants, confidence strip and footer |
| Design notes | `868:*` | Small annotation frames | — | Chinese production notes only; not customer-facing UI |

Every major customer-facing section uses fixed-positioned Figma frames (`layoutMode: NONE`) rather than an auto-layout component library. This is a flat visual specification, not a functional implementation system.

## 2. Visual Theme & Atmosphere

FLYOKAY is a warm, playful premium-lighting brand. It uses a restrained editorial frame—cream paper-like background, soft gray type, broad negative space—then breaks the calm with an unmistakably luminous product: transparent orb shells, LED pixels, saturated blue light, birthday graphics, emoji-scale symbols, and gift/party photography. The result should feel more “curated lifestyle gift” than “consumer electronics dashboard.”

### Key characteristics

- **Warm gallery canvas:** `#F7F1E8` is the dominant background and inverse-text neutral.
- **Soft ink, not pure black:** main typographic ink is `#4A4741`, preserving a tactile, printed feel.
- **Electric blue action:** `#179BD7` gives actions an energetic but clean light-tech signal.
- **Metallic gift-brand logo:** a black/gold gradient raster logo is placed at the left of header/footer; preserve it as an image asset.
- **Luminous product contrast:** warm, desaturated page fields make the orb’s blue/pink/rainbow light read as special.
- **Editorial type with italic spark:** large Inter Light titles are punctuated by Extra Light Italic words such as “Fly”, “Show”, and “glow”.
- **Soft spectacle:** radial color washes and dark photo bands add atmosphere without turning the canvas into a neon UI.

## 3. Color Palette & Roles

### Core FLYOKAY tokens

| Token | Exact Figma value | Role | Confirmed examples |
| --- | --- | --- | --- |
| `color.canvas` | `#F7F1E8` | Default warm canvas, badge/outline inverse, light control surface | Highest-frequency landing/product/store fill |
| `color.ink` | `#4A4741` | Main text, footer dark surface, dark CTA | Main titles, product/store copy, footer |
| `color.action` | `#179BD7` | Primary CTA blue | Landing “Explore”; Product “Add to Cart” |
| `color.surface` | `#FFFFFF` | Light surface / contrast layer | Figma section/artboard base fills |
| `color.muted` | `#A8A5A0` | Supporting copy, newsletter heading | Footer and low-priority text |
| `color.black` | `#000000` | Sale-label text, photo depth | Small utility text and image overlays |
| `color.deep` | `#1C1B1A` | Deep dark band / photo overlay base | Landing dark news region and product overlays |
| `color.ink-soft` | `#5A5958` | Product/store supporting copy | Product descriptor, “Redesigned Finish” |
| `color.store-slate` | `#4F5F68` | Store “New” label background | Store Page `329:2993` |
| `color.product-cream` | `#EFE6DB` | Product FAQ/section surface | Product Page `317:1859` |
| `color.product-cream-soft` | `#EFEAE2` | Product card background | Product Page `385:6211` |
| `color.section-cream` | `#E7E0D9` | Product information section | Product Page `317:1920` |
| `color.divider` | `#D3D1CE` | Divider / light overlay | Product overlays and Landing dividers |

### Atmospheric gradients

Use these exact stop colors and opacity values over `#F7F1E8`. They are recurring Figma gradient fills, not just sampled artwork.

| Token | Gradient specification | Role |
| --- | --- | --- |
| `gradient.dark-orb` | radial: `#3A3837` 0% → `#1C1B1A` 100% | Deep orb / dark media accent |
| `gradient.photo-bottom` | linear: `rgba(0,0,0,.65)` → transparent | White product/card text over photography |
| `glow.peach` | radial: `#EADCCF` 100% at 0 → 0% at 20% | Warm upper/left haze |
| `glow.blue-gray` | radial: `#B6CFDD` 50% at 0 → 0% at 20% | Cool muted blue wash |
| `glow-cream` | radial: `#F3EBE1` 100% at 0 → 0% at 20% | Soft neutral transition |
| `glow.sky` | radial: `#B5E4FE` 50% at 0 → 0% at 20% | Blue-luminous product cue |
| `glow.gold` | radial: `#D5C3AB` 40% at 0 → 0% at 60% | Metallic/gift warmth |
| `glow.sun` | radial: `#FFB648` 30% at 0 → 0% at 20% | Controlled golden lift |

### Translucent layers

| Value | Usage |
| --- | --- |
| `rgba(34,36,40,.4)` / `#222428 @ 40%` | Dark glass label over image cards |
| `#4A4741 @ 10%` | Quiet dark overlay / depth separation |
| `#F7F1E8 @ 40%` | Light carousel item and subtle control layer |
| `#D3D1CE @ 40%` | Product-page overlay divider |
| `#FFFFFF @ 60%` | Semi-transparent white vector / icon detail |
| `#FFFFFF @ 25%` | Light outline on dark product elements |

### Non-brand asset colors

The following colors exist in payment or provider vectors. They are not FLYOKAY design tokens and should not be used as generic UI accents: `#253B80`, `#222D65`, `#172B85`, `#FF5F00`, `#EB001B`, `#4285F4`, `#34A853`, `#FBBC04`, `#EA4335`, `#5F6368`.

## 4. Logo and Asset Treatment

### Logo

- Source asset name: `FLYOKAY_luxury_black_and_gold_gradient_logo_for_LED_flying_orb_gifts`.
- Figma treatment: **image fill**, `scaleMode: FILL`; it is not a vector, text layer, color style, or local variable.
- Visual treatment: embossed/metallic black-to-gold gradient lettering with a warm gold outer edge; shown on light headers and dark footers.
- Confirmed rendered placements scale from about **110×20** at 1024px through **350×65 / 377×70** desktop placements and up to **476×88** in larger footer treatments.
- Implementation rule: reuse/export the approved raster/SVG logo source; do not recolor it by applying a CSS solid color or rebuild it from a font.

### Image direction

- Main subject: LED flying orb with transparent/glass-like shell, saturated internal pixels, blue and multicolor glow.
- Lifestyle imagery: intimate, warm indoor scenes—children, gifting, parties, holidays, hands holding or receiving the orb.
- Product cards: use an image crop as the principal surface; dark lower gradient keeps light typography readable.
- Product/render assets: packaging, glow-ball closeups, colors labelled Gold, Silver, Midnight and Cloud.
- Decorative symbols: oversized emoji-like seasonal/social icons—tree, pumpkin, smiley, cat, globe, basketball—used only as a playful product-world cue, not as a generic UI icon system.

## 5. Typography Rules

The original Oura serif/sans pairing is fully replaced in FLYOKAY’s visual file. Use **Inter only**.

| Role | Figma font | Observed sizes | Line-height pattern | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Hero / store display | Inter Light | 57.4–107.1px | 72–128px | −1.8 to −2.4px | “Your Light Show Starts Here” and landing statements |
| Landing display | Inter Light | 55–78px | 75–100px | −1 to −2px | MemoOrb / Light Show headings |
| Product title | Inter Medium | 27–37.8px | 50px | −2px | “Fly Orb Ball”, “GIF play” |
| Feature card heading | Inter Light | 37–46px | 40–50px | 0 to −1.5px | Product/media card headings |
| Italic emphasis | Inter Extra Light Italic | 29.2–96px | 40–100px | −1 to −2px | “Fly”, “Show”, “glow” and short emphasis words |
| Body / nav / price | Inter Regular | 14–17px primary range | 18–24px | 0 to .9px | Navigation, labels, prices, CTA body copy |
| Label / sale | Inter Regular | 10–12px | 16–18px | 0 | Uppercase-like small product status label |
| FAQ / action emphasis | Inter Bold | 13.3–18.8px | 20–28px | 0 / −2% | FAQ questions, “Learn More” |

### Typography principles

- Compose major statements with Inter Light; they should be airy, not dense or heavily bold.
- Use Extra Light Italic only for one or two emotional words in a sentence. It is a sparkle, not a paragraph style.
- Keep primary body/CTA text around `16px/24px` in Inter Regular.
- Use Inter Medium for a clear product name; reserve Bold for compact FAQ/action text.
- Large headings are centered in spacious sections; product card titles are left-aligned over imagery.

## 6. Component Stylings

### Buttons and CTAs

| Pattern | Confirmed visual settings |
| --- | --- |
| Primary CTA | `#179BD7` fill, white Inter Regular text; Landing desktop sample is **141×59**, Product “Add to Cart” is **310×48** |
| Image CTA | Transparent surface, `1px` `#F7F1E8` outline, light text; Landing “Shop” samples are about **107×50** |
| Dark CTA | `#4A4741` fill with `#F7F1E8` text for secondary/dark placement |
| Sale label | `#F7F1E8` fill, black 10–12px type, `6px` radius; roughly **73×34** on large cards |
| Carousel dots | `#F7F1E8 @ 40%` inactive layer; compact 6px dot/rule forms on product page |
| Arrow controls | Round/pill control language; Store arrows are **55×54** and product icon surfaces are **56×56** |

### Image cards and media rails

- Product offer cards use **12px** radius at desktop and crop imagery to fill the card.
- Landing’s two offer cards are about **924×647** at 1920px, with card title, price, sale label, and outlined “Shop” action placed at the lower edge.
- The seasonal-content rail is visually repurposed as a playful FLYOKAY module; labels use dark translucent glass with Background Blur. The approved reference label is **“Halloween Fun”**.
- “Watch it glow” uses a row of narrow media thumbnails, centered title, and circular pagination controls.
- “IN THE NEWS” is a dark `#1C1B1A` band: a large image/editorial tile sits beside stacked cream story cards.

### Product detail plane

- Main product visual: **1222×960** media region at 1920px, with a right-side **393px** product information column.
- Variant radiogroup: 48px visual swatches for Gold/Silver/other product finishes.
- Add-to-cart surface: an `#EFEAE2` / cream container with a **310×48** cyan-blue action button.
- Feature list: 56×56 icon backgrounds, 24×24 icons, small Inter labels.
- FAQ: broad light-cream accordion-like rows; visual hierarchy comes from spacing, borders, and compact plus affordances—not heavy shadow.
- Technical specifications: a wide soft cream container with product-app screenshot/art on the left and small, multi-column copy on the right.

### Store plane

- Hero is text-led: large centered Inter Light statement, “Your Light Show Starts Here.”
- Product groups are intentionally sparse; each product title is large, followed by a compact price line and two packaging/orb render options.
- “New” badge uses the slate `#4F5F68` background.
- Buy-with-confidence strip uses a large rounded container with the existing warm/cool background-glow language and four compact trust claims.

### Footer

- Surface: deep charcoal-to-black gradient, not flat pure black.
- Logo: metallic FLYOKAY raster logo at left.
- Copy: sandstone/gray text, broad footer columns, compact newsletter field, provider/payment vectors at top right.
- Preserve the dark band’s calm contrast; do not recolor it blue or use white boxed cards inside it.

## 7. Shape, Depth and Surface Rules

### Exact Figma radius inventory

| Radius | Frequency / intended role |
| ---: | --- |
| `999px` (Figma `33554400`) | 188 uses; all pills, buttons, small selectors, circular controls |
| `40px` | 45 uses; large soft containers / special visual blocks |
| `24px` | 17 uses; glass labels and larger rounded modules |
| `22px` | 26 uses; featured card/container variant |
| `20px` | 21 uses; product/store surface variant |
| `15px` | 100 uses; primary image/media cards |
| `12px` | 69 uses; standard cards and content containers |
| `8px` | 72 uses; compact controls and utility surfaces |
| `6px` | 23 uses; sale/badge treatment |
| `4px` | 101 uses; fine utility detail |
| `2px` | 4 uses; hairline micro-detail only |

### Effects

- Background blur: **32px** (18 uses) and **24px** (15 uses) for image labels and translucent cards; **4px** is a rare secondary variation.
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,.06)`—used for quiet edge definition.
- `LAYER_BLUR` with radius 0 occurs as an exported-design placeholder and should not be implemented as visible blur.
- Use gradients, image cropping and translucency before using conventional drop shadows. No branded drop-shadow language was found.

## 8. Layout Principles

### Desktop composition

- Treat each 1920px artboard as a composed editorial poster rather than a grid of reusable application panels.
- Start with a full-width hero, then use 24px outer gutters and large image cards.
- Landing sections intentionally alternate: immersive photo, paired product cards, wide centered title, orb showcase, scenario tabs, media thumbnails, dark news band.
- Store uses exceptionally large whitespace between products; the catalog should feel curated rather than inventory-dense.
- Product page uses the tightest composition: media on the left and a controlled buying decision column on the right.

### Responsive visual references

| Page | 1920 | 1440 | 1024 | 768 | 390 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Landing | 6000.77px high | 5562.77px | 5690.16px | 9425.56px | 9224.75px |
| Product | 6638px | 6194px | 5322px | 8322px | 8422px |
| Store | 5106px | 7747px | 8124px | 5017px | 8235px |

Implementation reference only: each width is a distinct flat artboard, so responsive build work must reproduce visual reflow rather than merely uniformly scale a 1920px canvas.

### Mobile plane

- Keep the warm canvas and dark footer intact.
- Preserve the large Inter Light/Italic title personality but reduce font size and allow deliberate line breaks.
- Convert desktop paired/rail content to a vertical narrative or horizontal swipe presentation; do not squeeze cards below their intended image crop.
- The Figma file supplies separate 390px artboards for Landing, Product, and Store; use these as the source of truth for hierarchy and spacing.

## 9. Do’s and Don’ts

### Do

- Use `#F7F1E8` + `#4A4741` as the default FLYOKAY visual foundation.
- Use `#179BD7`, not Oura’s darker `#2A72DE`, for primary action surfaces.
- Treat the black/gold FLYOKAY wordmark as a protected image asset.
- Use Inter Light + Extra Light Italic for expressive statements; use Inter Regular for product information.
- Make the illuminated orb and its glow the sole high-saturation protagonist.
- Preserve spacious cream fields around merchandising blocks.
- Use 15px image-card rounding, pills for controls, and 20–40px radii only for featured fields.

### Don’t

- Don’t reintroduce Editorial New, AkkuratLL, or any Oura wordmark into FLYOKAY output.
- Don’t replace FLYOKAY’s cyan-blue CTA with Oura’s `#2A72DE` or indigo `#4A4AF4`.
- Don’t treat payment-provider icon colors as FLYOKAY brand colors.
- Don’t flatten the metallic Logo into a single gold or black CSS text treatment.
- Don’t use pure-black panels as the default; use `#1C1B1A` / charcoal gradient and sandstone text.
- Don’t turn emoji/saturation into persistent UI chrome; it belongs to the orb/light-show editorial scenes.
- Don’t infer tabs, sliders, accordion logic, checkout behavior or product functionality from these flat artboards.

## 10. Agent Prompt Guide

### Quick visual reference

- Canvas: `#F7F1E8`
- Main ink: `#4A4741`
- Primary action: `#179BD7`
- Deep dark band: `#1C1B1A`
- Display font: Inter Light
- Italic accent: Inter Extra Light Italic
- Body/UI: Inter Regular
- Main media card radius: `15px`
- CTA: pill, 48–59px high
- Brand logo: approved black/gold gradient raster asset

### Ready-to-use build prompt

Create a visually faithful FLYOKAY marketing page from the design system. Use a warm `#F7F1E8` canvas, `#4A4741` soft ink, and `#179BD7` pill CTAs. Build all typography in Inter: Light for large statements, Extra Light Italic for one emotional word, Regular for body/product UI, and Medium/Bold only where compact emphasis is required. Use the approved black/gold gradient FLYOKAY logo as an image asset. Compose warm celebration photography around a transparent LED flying orb with blue/multicolor glow. Use 15px media cards, full-width image crops with dark bottom gradients, glassy 24px-radius labels, broad whitespace, and deep charcoal editorial/footer bands. For the seasonal glass-label example, use “Halloween Fun”. Do not use Oura typography, Oura branding, generic SaaS cards, or payment-brand colors as product accents.

### Visual QA checklist

1. Confirm all primary CTAs are `#179BD7`, not `#2A72DE`.
2. Confirm the FLYOKAY black/gold logo is used as the source asset, not recreated as text.
3. Confirm titles use Inter Light and italic highlight words use Inter Extra Light Italic.
4. Confirm photos are warm/cinematic and product glow is the concentrated saturated focal point.
5. Confirm desktop and 390px layouts follow their dedicated artboards rather than scale proportionally.
6. Confirm only visual-plane claims are implemented; interaction behavior needs a separate specification.

## Evidence Notes

- Audited `4677` nodes across `13` top-level canvas objects.
- No local Figma variables or local paint/text/effect styles exist in the file; all values above are node-derived.
- The visual screenshots for Landing, Product and Store were cross-checked against desktop 1920px Figma artboards.
- This document distinguishes confirmed Figma values from implementation guidance. It intentionally excludes website interaction/functionality because no functional specification was requested or inspected.
