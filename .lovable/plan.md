

## Fix the visible "jump" in the cloud loop

One of the cloud layers visibly snaps back at the end of its cycle. Fix is to make the last frame pixel-identical to the first frame so the loop is truly seamless.

### Why it happens

In `SkyBackground.tsx` each layer is a 200%-wide rect filled with `feTurbulence` noise, animated `translateX(0)` → `translateX(-50%)`. For seamless looping, the left half (0–100%) must match the right half (100–200%). But `feTurbulence` generates unique noise across the full width — so when it snaps back, you see the jump.

### Fix: tile the noise via SVG `<pattern>`

- For each of the 3 cloud filters, wrap the filtered output in a `<pattern>` sized 100% × 100% (`patternUnits="userSpaceOnUse"`).
- Fill a 200%-wide rect with that pattern → the right half is an exact copy of the left half.
- Keep the same `translateX(0) → translateX(-50%)` animation → the second tile lands exactly where the first was. No visible snap.

Apply to all 3 layers so whichever one was glitching is fixed.

### Keep unchanged

- Cloud look, density, opacity, colors.
- Durations: 60s / 80s / 100s.
- Day/night logic, gradient, haze, navbar, footer, sections.
- `prefers-reduced-motion` handling.

### Files changed

- `src/components/SkyBackground.tsx` — wrap each turbulence filter in a `<pattern>`, fill rect with the pattern so left/right halves are pixel-identical.

### QA

- Watch each layer through a full cycle (60s, 80s, 100s) — no snap at loop boundary.
- Day mode otherwise unchanged; night mode untouched.

