

## Phase 6: Mobile Optimization

Ensure all sections, buttons, and interactive elements are fully optimized for mobile devices with proper touch targets, readable text, and responsive stacking.

---

### Current State

The site already has some mobile handling:
- Header: has a mobile Sheet menu (hamburger) at `<768px`
- Footer: uses `grid-cols-2` on mobile, `grid-cols-4` on desktop
- ChatWidget: uses `isMobile` hook for sizing
- Hero CTA boxes: use `flex-col md:flex-row`
- Grids: most use `grid-cols-1 md:grid-cols-3`

### What Needs Improvement

**1. Touch Target Sizes** — Ensure all interactive elements meet the 48px minimum:
- Footer social icons: currently `w-7 h-7` (28px) — increase to `w-10 h-10` on mobile
- Footer links: currently `text-xs` with no padding — add `py-1` for tappable height
- Testimonial nav dots: currently `h-2 w-2/w-6` — increase hit area
- Trust badges: fine as-is (pill-shaped with padding)

**2. Typography Scaling** — Reduce oversized headings on small screens:
- `HeroSection.tsx`: `text-4xl md:text-5xl` is fine, but the subtitle `text-2xl md:text-3xl` could be `text-xl md:text-3xl`
- `ServicesOverview.tsx`, `IndustrySolutions.tsx`, `ProcessSection.tsx`, `SocialProofSection.tsx`: section headings are `text-4xl` with no mobile reduction — change to `text-3xl md:text-4xl`
- Subheadings: `text-xl` descriptions could be `text-lg md:text-xl` on some sections

**3. Section Spacing** — Tighten vertical padding on mobile:
- Most sections use `py-20` — change to `py-12 md:py-20` for tighter mobile spacing
- Grid gaps: some use `gap-8` which is large on mobile — change to `gap-4 md:gap-8` where appropriate

**4. Hero CTA Boxes** — Reduce width constraint on mobile:
- Currently `w-full md:w-[350px]` which is good, but the gap `gap-8 md:gap-16` could be `gap-6 md:gap-16`

**5. Process Section** — 4-column grid on desktop, currently `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. This is fine. Just tighten card padding on mobile: `p-6 md:p-8`.

**6. Industry Solutions Cards** — Add minimum touch target for the tags/use-case badges.

**7. ChatWidget Mobile** — The toggle button and panel already adapt, but ensure the panel doesn't overflow the viewport width on very small screens.

**8. ThemeToggle Position** — Currently `top-4 left-4`, may overlap with mobile header. Check and adjust if needed.

---

### Files Modified

- `src/components/sections/HeroSection.tsx` — responsive text sizing, tighter mobile spacing
- `src/components/sections/ServicesOverview.tsx` — responsive headings, spacing, grid gaps
- `src/components/sections/IndustrySolutions.tsx` — responsive headings, spacing
- `src/components/sections/ProcessSection.tsx` — responsive headings, spacing, card padding
- `src/components/sections/SocialProofSection.tsx` — responsive headings, spacing
- `src/components/sections/TestimonialsSection.tsx` — responsive text, larger touch targets for nav
- `src/components/sections/TrustSection.tsx` — responsive badge sizing
- `src/components/Footer.tsx` — larger mobile touch targets for social icons and links
- `src/pages/Index.tsx` — responsive CTA section text and spacing
- `src/components/chat/ChatWidget.tsx` — ensure panel fits narrow screens

### What Stays the Same
- Header (already has full mobile implementation)
- All functionality, colors, animations
- Desktop layout unchanged

