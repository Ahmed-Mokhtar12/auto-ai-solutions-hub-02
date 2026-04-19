

## Implementing 3 fixes + day-mode legibility

### 1. Cloud band seams — `SkyBackground.tsx`
All 3 `<rect>` → `x="0" y="0" width="200%" height="100%"`. Overlapping full-canvas layers blend organically (different seeds + baseFrequencies keep patterns distinct). No more horizontal stripes.

### 2. Transparent navbar — `Header.tsx`
Add `bg-transparent` explicitly to the `<header>` element (both mobile + desktop branches) so nothing paints over the sky. Dropdown panels keep their own `bg-background/95` styling — only the bar is see-through.

### 3. Unified sky behind everything

**`src/index.css`** — body bg conditional:
```css
body { @apply text-foreground; background: transparent; }
html.dark body { @apply bg-navy-900; }
```

**`src/pages/Index.tsx`** — CTA section: `bg-navy-800/30` → `dark:bg-navy-800/30` (no bg in day mode).

**Audit + gate opaque section bgs in day mode**:
- `TrustSection.tsx` — `bg-navy-800/30` → `dark:bg-navy-800/30`; badge pills `bg-navy-800/60 border-navy-700` → add `dark:` prefix + day-mode equivalent `bg-white/20 border-white/30`.
- `SocialProofSection`, `ProcessSection`, `IndustrySolutions`, `ServicesOverview`, `HeroSection`, `TestimonialsSection` — scan for `bg-navy-*` on the section root and on cards; gate with `dark:` and add light glass equivalent (`bg-white/10` or `bg-white/15` with `border-white/20`) for day mode.
- `solution-card` utility in `index.css` (`bg-navy-800`) → split into dark/day variants or override per-section.

### 4. Day-mode text legibility
After stripping dark backgrounds, light text on light sky needs help. Two-pronged:

**a. Light glass cards** — every section card/box gets `dark:bg-navy-800 bg-white/10 backdrop-blur-sm border-white/20` pattern so content sits on a soft frosted panel, sky still visible through.

**b. Text shadow utility** — add to `index.css`:
```css
@layer utilities {
  .day-text-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
}
```
Apply via `html:not(.dark) .needs-shadow` or directly add `[&:not(.dark_*)]` — simpler: add a `.day-readable` class on hero headlines / any text floating directly over sky (no card behind it). Footer text already on dark footer — untouched.

### Files changed
- `src/components/SkyBackground.tsx` — full-canvas overlapping rects
- `src/components/Header.tsx` — explicit `bg-transparent` on header
- `src/index.css` — body bg conditional + `.day-text-shadow` utility + `solution-card` day variant
- `src/pages/Index.tsx` — gate CTA bg
- `src/components/sections/*.tsx` (Trust, SocialProof, Process, IndustrySolutions, ServicesOverview, Hero, Testimonials) — gate `bg-navy-*` with `dark:` + add light glass variant for day mode; add `.day-text-shadow` to any floating headlines
- `mem://design/sky-background-details` — note unified background + day glass pattern

### QA
- Day @ 998px + 375px: sky visible behind navbar, all sections, footer area; no horizontal cloud seams; all text readable (cards have light glass, floating text has shadow).
- Night unchanged: navy bg + stars + dark cards.
- Toggle day/night several times — no flicker.

