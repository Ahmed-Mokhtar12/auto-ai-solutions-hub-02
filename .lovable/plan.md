

## Slow down cloud drift animations

Current speeds in `src/index.css`:
- `.cloud-drift-a`: 60s
- `.cloud-drift-b`: 80s
- `.cloud-drift-c`: 100s

Increase by ~50% for a slower, more relaxed drift:
- `.cloud-drift-a`: 60s → 90s
- `.cloud-drift-b`: 80s → 120s
- `.cloud-drift-c`: 100s → 150s

### Files Changed
- `src/index.css` — update the three `animation` durations on `.cloud-drift-a/b/c`.

