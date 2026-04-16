

## Minimal Changes: Remove Logo Image + Phase 4 CTA Standardization

Two surgical edits. No layout, structure, or feature changes.

---

### 1. Remove favicon image from Logo

**`src/components/Logo.tsx`** — Delete the `<img>` tag (lines 8-14) and the `faviconSrc` import (line 3). Keep everything else identical.

### 2. Phase 4: Standardize CTA button labels

**`src/components/sections/HeroSection.tsx`** — Two text-only changes:
- Line 69: Change `"Book Your Free Consultation"` → `"Request a Demo"`
- Line 99-101: Change `"Explore solutions →"` text to a proper `<Button>` with variant `"outline"` and text `"Explore Solutions"`

**`src/pages/Index.tsx`** — One addition:
- In the pre-footer CTA section (around line 64), add a secondary outlined "Explore Solutions" button below the existing "Request a Demo" button that calls `handleSolutionsClick`

No other files touched. Header, footer, chat, background, dropdowns, mobile menu — all untouched.

### Files modified
- `src/components/Logo.tsx` (remove image)
- `src/components/sections/HeroSection.tsx` (rename CTA labels)
- `src/pages/Index.tsx` (add secondary CTA to pre-footer)

