

## Implementation Plan: Pure CSS + SVG Sky

### Files to change
1. **`src/components/SkyBackground.tsx`** — full rewrite
2. **`src/index.css`** — replace cloud drift keyframes
3. **`mem://design/sky-background-details`** — update notes

### SkyBackground.tsx structure
- Remove all image imports (`sky-base.jpg`, `clouds-layer-1.png`, `clouds-layer-2.png`).
- Fixed full-viewport container (`fixed inset-0 z-0 pointer-events-none`).
- **Layer A — sky gradient** (CSS `linear-gradient`): `#1a6eb5 0% → #3d9bd4 40% → #87CEEB 75% → #b8dff0 100%`.
- **Layer B — SVG turbulence clouds**, full width/height, `preserveAspectRatio="xMidYMid slice"`:
  - 3 `<filter>` defs using `feTurbulence type="fractalNoise"` with different `baseFrequency` and `seed` values.
  - Each filter ends with `feColorMatrix` mapping noise to white-with-alpha. **Starting tuning per user note**: alpha multiplier `1.15`, offset `-0.5` (wispy, sky shows through clearly).
  - 3 `<g>` cloud bands at different y-positions (10%, 35%, 55%), each containing a `<rect width="200%">` with the filter applied.
  - Each band gets one of three CSS classes: `.cloud-drift-a`, `.cloud-drift-b`, `.cloud-drift-c`.
- **Layer C — bottom atmospheric haze**: absolute `bottom-0 inset-x-0 h-[8%]`, `linear-gradient(to top, rgba(220,235,245,0.4), transparent)`.

### index.css changes
Replace the existing `cloud-drift-slow` / `cloud-drift-slower` keyframes and `.cloud-drift-1` / `.cloud-drift-2` rules with:

```css
@keyframes cloud-band-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.cloud-drift-a { animation: cloud-band-drift 60s linear infinite; transform-origin: center; }
.cloud-drift-b { animation: cloud-band-drift 80s linear infinite; transform-origin: center; }
.cloud-drift-c { animation: cloud-band-drift 100s linear infinite; transform-origin: center; }

@media (prefers-reduced-motion: reduce) {
  .cloud-drift-a, .cloud-drift-b, .cloud-drift-c { animation: none; }
}
```

Because each band's `<rect>` is 200% wide and the noise tile is identical at the 0% and 50% mark, translating by -50% loops invisibly.

### Tuning lever (per user note)
The two numbers to tweak after first render are inside each `feColorMatrix` last row:
- alpha multiplier (currently `1.15`, range `1.1–1.4`)
- alpha offset (currently `-0.5`, range `-0.55 to -0.45`)
Lower multiplier + less negative offset = wispier, more transparent.

### QA after implementation
- 998px desktop: clouds wispy, sky blue clearly visible through them, no seam, hero text readable.
- 375px mobile: same checks.
- Verify night mode still works (untouched).
- If clouds too dense → lower multiplier toward 1.1.

### Notes
- Old asset files (`sky-base.jpg`, cloud PNGs, preview PNGs) left on disk — harmless, removable later.
- Zero network cost, GPU-composited.

