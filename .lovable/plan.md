

## Tune SVG Clouds: Wispy Cirrus, ~30% Coverage

### Goal
Replace the small, repeating "bumpy" cloud pattern with sparse, elongated, wispy cirrus streaks. Sky should read as ~70% clear blue.

### Changes — `src/components/SkyBackground.tsx` only

Adjust the three `<filter>` defs. Key levers:

**1. Lower `baseFrequency` dramatically + heavily anisotropic (x ≪ y)** → larger shapes, stretched horizontally like cirrus streaks instead of round bumps.

**2. Increase `numOctaves` to 4** → more organic, irregular detail; breaks visible tile rhythm.

**3. Soften `feColorMatrix` alpha** → much more transparent so blue sky dominates.

| Filter | baseFrequency (x y) | numOctaves | alpha mult | alpha offset |
|---|---|---|---|---|
| cloud-filter-a | `0.003 0.012` | 4 | 1.05 | -0.55 |
| cloud-filter-b | `0.0025 0.010` | 4 | 1.0 | -0.6 |
| cloud-filter-c | `0.004 0.014` | 4 | 1.05 | -0.5 |

Why x much lower than y: `feTurbulence` baseFrequency controls noise scale per axis. A small x value stretches the noise horizontally → long thin streaks (cirrus shape). Larger y keeps vertical detail tight → feathery edges, not blobs.

Why mult ~1.0–1.05 with offset ~-0.5 to -0.6: Only the brightest noise peaks survive the alpha cutoff, so most of the rect becomes fully transparent → ~70% clear sky. The remaining wisps are soft because the multiplier barely amplifies.

**4. Vary cloud band heights/positions slightly** so the three layers don't all start aligned (further reduces perceived repetition):
- Band A: y=8%, height=30%
- Band B: y=32%, height=28%
- Band C: y=58%, height=22%

(Current values are fine; minor nudges only — no structural change.)

### Not changing
- CSS gradient (`#1a6eb5 → #b8dff0`) — user said colors are good.
- Animation keyframes / durations (60s, 80s, 100s) in `index.css`.
- Bottom haze layer.
- 200% rect width (still required for seamless loop).

### Tuning lever for follow-up
If still too dense after first render → drop multiplier to `0.95` and offset to `-0.65` (clouds become barely-there veils). If too sparse → bump multiplier back to `1.1`.

### QA
- 998px desktop + 375px mobile: confirm sky is dominantly blue, cloud streaks are elongated and wispy, no obvious tile/wallpaper repeat, hero text remains crisp.

### Files Changed
- `src/components/SkyBackground.tsx` — update three `feTurbulence` baseFrequency/numOctaves and three `feColorMatrix` alpha rows.

