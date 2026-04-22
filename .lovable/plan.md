

## Add thin black outline to all gold/yellow text inside cards (day mode only)

### What changes
Every yellow (`text-gold` / `text-[#F8D042]`) letter or number that appears **inside a card** gets a thin black outline in **light/day mode**. In dark/night mode, text stays as-is (no outline) so it keeps the current look against the navy background.

### Visual result
- Light mode: gold text reads crisply against the bright sky — black hairline traces every glyph.
- Dark mode: unchanged.

### How it's done (one reusable utility, not scattered classes)
Add a single utility class in `src/index.css`:

```css
@layer utilities {
  .gold-outline {
    -webkit-text-stroke: 0.6px #000;
    paint-order: stroke fill;
  }
}

/* Only apply in day mode — strip the stroke in dark mode */
html.dark .gold-outline {
  -webkit-text-stroke: 0;
}
```

`paint-order: stroke fill` keeps the gold fill on top so the stroke sits cleanly behind the letterforms (no muddy edges).

### Where it gets applied
Append `gold-outline` to every gold text element **inside cards** across these files:

| File | Gold elements inside cards |
|---|---|
| `src/components/sections/HeroSection.tsx` | benefit card numbers/labels, CTA card headings |
| `src/components/sections/ServicesOverview.tsx` | service card titles, icons-as-text if any |
| `src/components/sections/IndustrySolutions.tsx` | "Core Expertise" badge, industry card titles, use-case bullets |
| `src/components/sections/ProcessSection.tsx` | step numbers (01–04), step titles |
| `src/components/sections/TestimonialsSection.tsx` | quotation marks, name/title accents |
| `src/components/sections/TrustSection.tsx` | badge icons (gold) |
| `src/pages/industries/IndustryPageTemplate.tsx` | section headings ("Use Cases", "How We Help"), step numbers |
| `src/pages/AIAgents.tsx`, `GenerativeAI.tsx`, `ResponsibleAI.tsx`, `AboutUs.tsx`, `Security.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`, `Contact.tsx`, `Dashboard.tsx` | gold section headings and accent text inside the dark glass card |

### Not changed
- Gold text **outside** cards (e.g. header nav links, "Back to Home" link, footer accents) — left alone.
- Gold buttons (`gold-btn`, "Request a Demo") — the fill is gold, not the text; outlining the dark text on them would look wrong.
- Dark mode appearance — stroke is disabled via `html.dark` override.
- No color tokens, fonts, or layout touched.

### Files touched
- `src/index.css` — add `.gold-outline` utility + dark-mode override
- ~12 component/page files — append `gold-outline` class to gold text nodes inside cards

