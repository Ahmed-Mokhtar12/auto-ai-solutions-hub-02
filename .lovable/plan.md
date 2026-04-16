

## Plan: Add HoverVisibleContainer to Industry Solutions and Testimonials

The Industry Solutions cards and Testimonials section are currently always visible. Other sections (ServicesOverview, ProcessSection, SocialProofSection) wrap their cards in `HoverVisibleContainer`, which makes them invisible until hovered. This plan applies the same pattern.

### Changes

**1. `src/components/sections/IndustrySolutions.tsx`**
- Import `HoverVisibleContainer`
- Wrap each industry `<Link>` card inside `<HoverVisibleContainer autoHideDelay={2500} initialVisibility={false} showIndicator={false}>`

**2. `src/components/sections/TestimonialsSection.tsx`**
- Import `HoverVisibleContainer`
- Wrap the testimonial card (the `bg-navy-800/60` div + navigation controls) inside `<HoverVisibleContainer autoHideDelay={2500} initialVisibility={false} showIndicator={false}>`

Both will use the same settings as the existing hover tiles on the page.

