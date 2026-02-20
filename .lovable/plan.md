
## Redesign the Footer — Always Visible, Fixed at the Bottom

### What's changing

The current footer uses a hide/show animation that causes it to disappear and reappear. This entire behaviour will be removed. Instead, the footer will be:

- Always visible — no hover trick, no fade in/out
- Fixed to the bottom of every page — it stays in place as the user scrolls
- Slightly taller and visually redesigned with a proper layout, gold accents, and a clean border

---

### Visual redesign

The new footer will be a single horizontal bar fixed to the bottom of the screen with these design elements:

- A thin gold top border (`border-t border-gold/30`) for a premium feel
- A dark semi-transparent background (`bg-navy-900/95 backdrop-blur-md`) so the background (sky/night) subtly shows through
- Three columns laid out in a row on desktop, stacked on mobile:
  - **Left**: Email and Phone with gold icons
  - **Centre**: Copyright line and Privacy Policy / Terms of Service links
  - **Right**: Social media icons (Facebook, Instagram, LinkedIn, WhatsApp) in a row
- Slightly more padding (`py-3`) for breathing room

---

### Files to change

**1. `src/components/Footer.tsx`**

Full visual redesign:
- Fixed positioning (`fixed bottom-0 left-0 right-0 z-40`)
- `backdrop-blur-md bg-navy-900/95 border-t border-gold/30`
- Three-column layout: contact info | legal links | social icons
- Larger icons (`h-4 w-4`), readable text (`text-xs/text-sm`)

**2. `src/components/FooterContainer.tsx`**

Remove entirely — it will no longer be needed. The `Footer` component itself will be fixed-positioned and always visible.

**3. `src/pages/Index.tsx`**

- Replace `<FooterContainer />` with `<Footer />` (direct import)
- Add `pb-16` (padding-bottom) to the main page wrapper so scrollable content is never hidden behind the fixed footer

**4. All subpages** (`AIAgents.tsx`, `GenerativeAI.tsx`, `ResponsibleAI.tsx`, `Services.tsx`, `PrivacyPolicy.tsx`)

- Import and render `<Footer />` directly (same fixed footer on every page)
- Add `pb-16` to the main wrapper so content doesn't get clipped by the footer
