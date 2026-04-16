

## Fix Scrollbar Styling + Footer Overlap on All Subpages

### Problems Identified

1. **Ugly scrollbar**: The content cards on subpages use `scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent` (Tailwind plugin classes) which render a default browser scrollbar. The chat widget uses a custom `.chat-scrollbar` CSS class that looks much better — thin, transparent by default, gold on hover.

2. **Footer overlaps content**: The content card uses `max-h-[65vh]` but with `pb-[15vh]` for the footer, the card extends behind the footer. Need to reduce `max-h` or adjust the layout.

3. **Footer too tall**: Reduce footer padding to make it ~25% shorter.

---

### Changes

**1. Replace scrollbar classes with `.chat-scrollbar` on all subpage content cards**

Files affected:
- `src/pages/ResponsibleAI.tsx` — line 42: replace `scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent` with `chat-scrollbar`
- `src/pages/AIAgents.tsx` — line 48: same replacement
- `src/pages/GenerativeAI.tsx` — same replacement on the content card div
- `src/pages/industries/IndustryPageTemplate.tsx` — same replacement (covers all 6 industry pages)
- `src/pages/AboutUs.tsx` — check and apply if scrollable card exists
- `src/pages/Security.tsx` — check and apply if scrollable card exists
- `src/pages/Contact.tsx` — check and apply if applicable
- `src/pages/PrivacyPolicy.tsx`, `src/pages/TermsOfService.tsx` — check and apply

**2. Reduce content card max-height from `max-h-[65vh]` to `max-h-[55vh]`** on all subpages to prevent footer overlap.

**3. Shrink footer by ~25%**
- `src/components/Footer.tsx`: reduce `py-4` to `py-2`, reduce `mb-3` to `mb-1.5`, reduce `gap-2` to `gap-1`
- Update all pages from `pb-[15vh]` to `pb-[10vh]`
- Update `mem://ui/fixed-footer` to reflect new sizing

**4. Update memory** to document the new footer height and scrollbar convention.

