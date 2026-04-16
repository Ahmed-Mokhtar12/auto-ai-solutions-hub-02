

## Restore "Your AI Dashboard" Button to Header

The "Your AI Dashboard" button was accidentally removed during the Phase 2 navigation rewrite. It needs to be added back to both desktop and mobile header layouts.

---

### Changes

**`src/components/Header.tsx`**

- **Desktop**: Add a gold-styled "Your AI Dashboard" button/link before the "Request a Demo" button in the nav bar, matching the original styling (gold background, dark text)
- **Mobile**: Add "Your AI Dashboard" as a prominent link in the Sheet menu, placed above the Services section

The button was previously a navigation element (not linked to auth). Per project memory, "Your AI Dashboard" is a navigation button — it will link to the same location it did before (likely `/` or a dashboard route).

---

### Technical detail

- Add a `<Link to="/auth">` or `<Button>` styled with `gold-btn` class, positioned in the header nav alongside the existing items
- Desktop: Insert before the "Request a Demo" button
- Mobile: Add as a styled link at the top of the Sheet content

### Files modified
- `src/components/Header.tsx`

