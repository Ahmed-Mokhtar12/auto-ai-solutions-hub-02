

## Make Footer Headers Bigger/Bolder, Shrink Content Below

The user wants the 4 column headers (DigitLab.ai, Solutions, Company, Contact) to be more prominent, and the links/text beneath them to be smaller.

### Changes in `src/components/Footer.tsx`

**Headers — make bolder and bigger:**
- "DigitLab.ai": `text-xs font-semibold` → `text-sm font-bold`
- "Solutions", "Company", "Contact" headers: `text-[10px] font-semibold` → `text-xs font-bold`

**Content below headers — shrink:**
- Tagline "AI-Powered Automation Solutions": `text-[10px]` → `text-[9px]`
- All links (Solutions, Company columns): `text-[11px]` → `text-[10px]`
- Contact info (email, phone, WhatsApp): `text-[11px]` → `text-[10px]`

No other files affected.

