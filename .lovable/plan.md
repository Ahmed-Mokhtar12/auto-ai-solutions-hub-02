

## Slow down stars' downward drift

In `src/components/NightBackground.tsx`, stars currently drift downward at `0.05 + Math.random() * 0.1` px/frame (range 0.05–0.15). Reduce by ~4× for a much calmer night sky.

### Change — `src/components/NightBackground.tsx`

In `initStars()`, update the `speed` assignment:

- From: `speed: 0.05 + Math.random() * 0.1`
- To: `speed: 0.01 + Math.random() * 0.03` (range 0.01–0.04, ~4× slower)

Twinkling, star count, colors, and meteors all remain unchanged.

### Files Changed
- `src/components/NightBackground.tsx` — single line in `initStars()` for slower vertical drift.

