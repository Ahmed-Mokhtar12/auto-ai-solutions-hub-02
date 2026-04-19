

## Match footer style to the light glass tiles (day mode)

User wants the footer to look like the "99% Client Retention" card — light frosted glass over the sky, not the current solid dark navy bar. Night mode footer should remain dark.

### Change — `src/components/Footer.tsx`

Replace the footer's hard-coded dark background with a day/night-aware glass treatment:

- `<footer>` classes:
  - From: `border-t border-[#F8D042]/30 bg-[#0B0F19]/95 backdrop-blur-md`
  - To: `border-t border-white/30 bg-white/15 backdrop-blur-sm dark:border-[#F8D042]/30 dark:bg-[#0B0F19]/95 dark:backdrop-blur-md`

This matches the established day-mode glass pattern (`bg-white/15 backdrop-blur-sm border-white/30`) used by the stat cards, while preserving the dark navy + gold border for night mode.

### Text legibility in day mode

Currently footer text uses `text-white/50`, `text-white/40`, `text-white/60` — these vanish on a light glass panel. Gate them per mode:

- Tagline (`text-white/50`) → `text-navy-900/70 dark:text-white/50`
- Nav links (`text-white/50`) → `text-navy-900/75 dark:text-white/50` (hover stays gold)
- Social icon buttons: `bg-white/5 border-white/10 text-white/60` → `bg-navy-900/5 border-navy-900/15 text-navy-900/70 dark:bg-white/5 dark:border-white/10 dark:text-white/60` (gold hover state stays unchanged — works on both)
- Copyright (`text-white/40`) → `text-navy-900/60 dark:text-white/40`
- Section headings already `text-[#F8D042]` (gold) — readable on both, no change.
- Wordmark SVG is gold — fine on both.
- Bottom border `border-white/5` → `border-navy-900/10 dark:border-white/5`

### Not changing
- Layout, spacing, columns, font sizes, links, icons.
- Sky background, header, sections — all already correct.
- Night mode appearance — identical to today.

### QA
- Day mode: footer reads as a light frosted panel matching the stat cards; sky/clouds visible through it; all text legible against the glass.
- Night mode: unchanged — dark navy bar with gold accents.
- Toggle day/night: clean swap, no flash.

### Files Changed
- `src/components/Footer.tsx` — footer container + all text/border color classes gated per mode.

