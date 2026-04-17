
User wants the footer to no longer be fixed to the bottom of the viewport. Instead, it should sit at the natural bottom of each page, only visible when scrolled to the end.

## Plan: Make footer non-fixed (normal page bottom)

### Changes

**1. `src/components/Footer.tsx`**
- Remove `fixed bottom-0 left-0 right-0 z-40` classes from the `<footer>`. Keep border, background, blur, and layout intact so it still looks the same — just flows in normal document order at the end of the page.

**2. Remove `pb-[10vh]` (or `pb-[15vh]`) bottom padding from page wrappers** that was reserving space for the fixed footer:
- `src/pages/Index.tsx`
- `src/pages/Services.tsx`
- `src/pages/AboutUs.tsx`
- `src/pages/AIAgents.tsx`
- `src/pages/GenerativeAI.tsx`
- `src/pages/ResponsibleAI.tsx`
- `src/pages/Security.tsx`
- `src/pages/Contact.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/TermsOfService.tsx`
- `src/pages/industries/IndustryPageTemplate.tsx`

Each page already uses `min-h-screen flex flex-col` with `flex-grow` on `<main>`, so the footer will correctly sit at the bottom on short pages and below content on long pages.

**3. Update memory** `mem://ui/fixed-footer` to reflect that the footer is now a normal in-flow footer at the bottom of each page (no longer fixed).

### Result
- Landing page: footer appears only after scrolling past all sections.
- Subpages: footer sits naturally below the content card.
- Chat widget and floating buttons remain unaffected (they're independently positioned).
