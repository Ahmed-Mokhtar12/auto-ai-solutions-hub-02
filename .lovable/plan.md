
Got it. Outlined letters with yellow stroke + black fill, except "L" and "D" stay solid yellow. ".ai" stays small, faded yellow.

## Plan

**Update `src/assets/digitlab-wordmark.svg`**

Replace the two `<text>` elements with per-letter rendering so I can style "D" and "L" differently from the rest:

- **"D" and "L"** — solid fill `#F8D042` (gold), no stroke. Same as current.
- **"i", "g", "t", "a", "b"** — fill `#000000` (black), stroke `#F8D042` (gold), stroke-width ~3px. This creates the "yellow border outside + black inside" outlined effect.
  - The dot of "i" is part of the glyph, so it will naturally render as a small yellow-stroked black circle. To match your description ("yellow circle, black inside"), the stroke gives it a gold ring with black center automatically.
- **".ai"** — fill `#F8D042` with `opacity="0.5"` (faded yellow), font-size 44 (smaller, unchanged).

**Font weight**: keep `800` so the strokes read clearly without crushing the letter interiors.

**Letter order in "DigitLab"**: D(solid) – i(outlined) – g(outlined) – i(outlined) – t(outlined) – L(solid) – a(outlined) – b(outlined).

**Layout**: Use `<tspan>` elements inside one `<text>` block so kerning stays natural. Apply per-tspan `fill` and `stroke` attributes.

**No other files change** — `Logo.tsx` and `Footer.tsx` already point to this SVG.

### Visual preview (concept)

```text
 ███   ╔═╗ ╔═╗ ╔═╗ ╔═╗ ███ ╔═╗ ╔═╗  .ai
 █D█    i   g   i   t  █L█  a   b
 ███   (outlined letters: gold edge, black inside)
 (solid gold D & L)                  (faded gold)
```

### Confirm before I build

One quick check: for the outlined letters, do you want the **stroke on the outside only** (letter shape stays the original size, gold ring wraps it) or a **medium stroke centered on the path** (slightly thicker letters, gold edge both sides)? SVG defaults to centered stroke — that matches "borders inside and outside" from your description, so I'll go with that unless you say otherwise.

