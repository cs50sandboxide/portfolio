# Design notes

Working notes for the visual system. Kept so future passes don't re-tread the same ground.

## Brief

**Subject.** The published record of a leveraged long/short equity and options book run by a
physics undergraduate, alongside the record of the person running it.

**Audience.** Recruiters and investment professionals at asset managers, hedge funds and banks,
reading for 30–60 seconds, mostly on a laptop, often after opening a CV.

**Job.** Establish that the numbers are real and the person behind them is rigorous. The data is
pulled live from Interactive Brokers every Saturday; the design should make that provenance feel
like the point rather than a footnote.

## What was here before, and why it changed

The previous theme was near-black (`#0a0a0a` / `#141414` / `#1a1a1a`) with a single gold accent,
Playfair Display over Inter, tracked-out all-caps eyebrows above every heading (`01 / ABOUT`),
middle-dot meta strings, `WORD — fragment` section labels, and a fade-and-slide-up reveal on every
section. That is, almost line for line, the generated-page default: dark ground plus one accent,
plus template chrome. None of it came from the subject matter.

## Tokens

### Colour

Ground is an engineer's computation pad — the pale green ruled paper physics and engineering
working is done on. It is the one place the subject matter and the audience meet: a worked
calculation, shown rather than described.

| Token | Value | Role |
|---|---|---|
| `--pad` | `#e4e8de` | Page ground |
| `--pad-deep` | `#d6dbcd` | Recessed panels, table headers, plot fields |
| `--pad-raised` | `#eef1e9` | Raised surfaces: nav, cards that must sit forward |
| `--ink` | `#161c17` | Body and display type |
| `--ink-soft` | `#5c6459` | Secondary type, notes, axis labels |
| `--rule` | `#a7b09f` | Hairlines, gridlines, borders |
| `--plot` | `#1f4a7a` | The fund's own line. The only accent in the system. |

Signed data carries two further colours, which are information rather than decoration and are
never used for anything unsigned: `--gain #226b3c`, `--loss #94272b`. Benchmarks plot in
`--ink-soft`, never in colour — the fund is the only thing on the page allowed to be blue.

### Type

- **Newsreader** — display and prose. A low-contrast reading serif with real optical sizing, of
  the kind a research note or a fund letter is set in. Deliberately not a high-contrast fashion
  display face.
- **Archivo** — navigation, labels, table headers, and every figure. `tabular-nums` everywhere a
  number appears in a column or is compared against another number.

Scale, a perfect fourth at display sizes tightening through the text sizes:
`3.4 / 2.55 / 1.9 / 1.28 / 1.0625 / 0.8125 rem`. Prose measure is capped at 66 characters and set
at 1.68 line-height, the extra leading a serif wants.

No headline accents a single word. No label is set in all caps. No label appears above content
unless it carries information the content doesn't.

### Layout

Left-aligned and ragged right throughout, on a two-column frame: a narrow margin rail and a wide
text column. The rail carries what the margin of a lab notebook carries — a date, a source, a
count, a unit — and nothing else. Where a section has nothing to put in the margin, the margin
stays empty. That is what replaces the eyebrow labels.

```
┌───────────────────────────────────────────────────────────┐
│ AKV                              About   Fund   Contact   │
├──────────┬────────────────────────────────────────────────┤
│          │  Advaith Krishnan Vinod                        │
│ since    │  Physics, finance, AI.                         │
│ 27 Apr   │                                                │
│ 2026     │  ┌───────────── return path ──────────────┐    │
│          │  │                          ╱‾‾ fund      │    │
│ margin   │  │                    ╱‾‾‾‾               │    │
│ rail     │  │  ╱‾╲___╱‾‾‾  ‥‥‥‥‥‥‥‥‥‥‥‥ S&P 500      │    │
│          │  └────────────────────────────────────────┘    │
│          │  +116.99% since inception    34 positions      │
│          │  View the fund     Download CV                 │
└──────────┴────────────────────────────────────────────────┘
```

Sections on inner pages take the same frame, so the fund page reads as one continuous document
rather than a stack of cards:

```
┌──────────┬────────────────────────────────────────────────┐
│ as of    │  Performance against major indices             │
│ 5 Sep    │  ─────────────────────────────────────────     │
│ 2026     │  [ growth of $1,000 · total return ]           │
│          │                                                │
│ IBKR     │  ┌────────────────────────────────────────┐    │
│          │  │              plotted on the pad grid   │    │
│          │  └────────────────────────────────────────┘    │
└──────────┴────────────────────────────────────────────────┘
```

### Principles

1. **A record, not a landing page.** Every surface should read as something printed and filed.
2. **One bold move.** The pad and the plot drawn on it. Everything around them stays quiet: no
   shadows anywhere, one 2px radius or none, hairlines instead of boxes.
3. **Structure carries information.** A rule separates, a margin note dates, a colour signs a
   number. Nothing structural is decorative. The timeline keeps its ordering because it genuinely
   is a sequence; nothing else is numbered.
4. **Motion once.** The hero plot draws itself on load, and interactive elements respond when
   used. Nothing else moves unbidden, and all of it stops under `prefers-reduced-motion`.
5. **Numbers are the typography.** Tabular, signed, aligned, and given the largest sizes on the
   page after the name itself.

### Dark

The same pad, seen at night. Ground and ink swap roles rather than the palette being inverted
channel by channel, so the two modes read as reciprocal rather than merely opposite: the light
mode's ground `#e4e8de` becomes the dark mode's type, and the dark ground `#171b14` is the pad's
own green taken down to near-black.

| Token | Light | Dark |
|---|---|---|
| `--pad` | `#e4e8de` | `#171b14` |
| `--pad-deep` | `#d6dbcd` | `#10130e` |
| `--pad-raised` | `#eef1e9` | `#1f2419` |
| `--ink` | `#161c17` | `#e4e8de` |
| `--ink-soft` | `#5c6459` | `#98a18d` |
| `--plot` | `#1f4a7a` | `#7aa9dd` |
| `--green` | `#226b3c` | `#6fc98a` |
| `--red` | `#94272b` | `#e0736f` |

Three states, in the order people expect: no stored choice follows the system, and an explicit
choice overrides it until changed. The stored value is applied by a short script in the document
head so the page never paints the wrong theme first. Every colour is defined on bare `:root`,
redefined under `@media (prefers-color-scheme: dark)` guarded as `:root:not([data-theme="light"])`,
and again under `:root[data-theme="dark"]` so the toggle wins in both directions.

Charts take their colour from these variables through inline `style="stroke: var(--plot)"` rather
than through SVG presentation attributes, which do not accept `var()`. That is what lets a theme
change recolour every chart on the page without anything being re-rendered — worth knowing before
adding a chart, because a hard-coded hex in a `fill=` or `stroke=` attribute will silently stay
the wrong colour in one of the two modes.

Contrast was checked against both grounds: body and secondary text clear 4.5:1, and every plotted
line, sector swatch and signed figure clears 3:1.

## Review against the generic defaults

Checked before building, against the traits that show up in generated pages regardless of subject:

- *Warm cream ground, high-contrast serif, terracotta accent.* The ground is a cool green
  `#e4e8de`, nowhere near `#f4f1ea`; Newsreader is low contrast and set at 400–500; the accent is
  an ink blue drawn from ballpoint on paper, not clay.
- *Near-black ground, one bright accent.* Removed outright — this was the previous theme.
- *Broadsheet: hairlines, zero radius, dense columns.* Hairlines yes, but the measure is a single
  66-character column with generous leading, not newspaper columns, and the pad grid is the
  opposite of a broadsheet's austerity.
- *SaaS card kit.* No shadows, no uniform rounded cards. Panels are defined by ground shift and a
  single hairline.
- *Template chrome.* All-caps eyebrows, `01 /` numbering, `A · B · C` meta strings, `WORD —
  fragment` labels, tinted near-black, and `→` glyphs appended to links are all gone.
- *Scattered motion.* Per-section fade-and-slide reveals and per-card hover lifts removed; one
  orchestrated draw on load remains.

Two things changed as a result of that review. The accent started as the old gold, which is the
luxury-portfolio default — it became the plot's ink blue, so the only accent on the page is the
line the whole site exists to show. And the display face started as a high-contrast serif out of
habit; it became a reading serif, because the brief is a record and not a masthead.

## What changed in the build, and why

Notes for the next pass, so the same ground is not re-tread.

- **The pad ruling moved.** It started as a wash behind the whole page. Because
  most sections paint their own background, it only showed through the few that
  did not, which read as a mistake rather than as paper. It now appears only
  inside a plot field, where a grid is doing a job.
- **The dashed benchmark line came out solid.** The draw-on animation owns
  `stroke-dasharray`, so a dash set on the path is overwritten. The two
  benchmarks are separated by tone instead.
- **A duplicate skills ruleset in `style.css` was fighting `about.css`.**
  `about.css` restated some properties and not others, so the old background and
  1px gap survived and printed a tinted panel behind every row. The duplicate is
  gone; skills live in `about.css` alone.
- **Both charts are drawn twice.** A phone gets a narrower, taller viewBox,
  because scaling the wide field down to a 340px column shrinks the axis labels
  along with everything else. They redraw only when the layout actually crosses
  the breakpoint.
- **A local variable named `window` took down the fund page.** `initBenchmark`
  had `const window = ...` for a date range; adding a `window.addEventListener`
  above it in the same function put the global in a temporal dead zone, and
  every renderer after that point silently stopped. Renamed to `dateRange`.
- **Alignment went left everywhere.** The page had been centred to stop content
  hugging the left of a wide container; the margin rail fills that space with
  something useful instead, so the prose can go back to a left edge and a
  consistent measure.

## Still open

- The site loads Newsreader and Archivo from Google Fonts. Both have real
  fallbacks (Georgia, system sans), but a self-hosted subset would remove the
  third-party request and the flash before the faces arrive.
- The loader overlay is a holdover from the old theme. With one page-load
  animation already carrying the opening moment, it may be redundant.
