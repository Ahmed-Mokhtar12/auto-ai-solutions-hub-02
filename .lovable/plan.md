

## Reduce Footer Height to 12–13% of Viewport

Currently the footer is ~16–18% of the viewport (140–160px on 887px). Target: 12–13% (~106–115px).

### Changes

**`src/components/Footer.tsx`**
- Reduce container padding from `py-3` to `py-2`
- Reduce grid gap from `gap-3 md:gap-5` to `gap-2 md:gap-3`
- Reduce bottom copyright section padding from `pt-2` to `pt-1.5`
- Reduce `mb-1.5` to `mb-1`

**All subpages** — no change needed; `pb-[10vh]` already undershoots 12%, so content won't overlap.

**Update `mem://ui/fixed-footer`** — reflect the new ~12% target height.

