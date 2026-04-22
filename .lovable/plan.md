

## Restore the "Dashboard" button in the header

### What's missing
The header currently shows: Services • Industries • Security • About Us • Contact • **Request a Demo**. There is no "Dashboard" button. Per project memory, "Your AI Dashboard" is a navigation-only button (no auth) — it was removed at some point and needs to be restored next to "Request a Demo".

### Where it goes
`src/components/Header.tsx`

- **Desktop** (right side, before the "Request a Demo" button):
  ```
  [ Dashboard ]  [ Request a Demo ]
  ```
  Style: outline gold button (`variant="outline"` with `border-gold text-gold hover:bg-gold/10`) so it visually defers to the primary gold CTA.

- **Mobile** (inside the Sheet menu, in the bottom links group with Security / About / Contact): a "Dashboard" link styled like the other items.

### Where it links
Open question — the previous destination isn't in the current code. Two options:
1. **`/dashboard`** route (would need a placeholder page added to `App.tsx`)
2. **External URL** (e.g. the n8n/agent dashboard you use)

I'll default to **option 1** with a simple placeholder `Dashboard.tsx` page (navy/gold styling, "Coming soon" message, Back to Home link, fixed footer padding) unless you tell me otherwise.

### Files touched
- `src/components/Header.tsx` — add Dashboard button (desktop) + link (mobile sheet)
- `src/pages/Dashboard.tsx` — new placeholder page
- `src/App.tsx` — register `/dashboard` route

### Not changed
Routing for other pages, footer, theme, or any styling tokens.

### Confirm before I build
Reply with:
- **"use /dashboard placeholder"** → I'll build as planned, OR
- **"link to <URL>"** → I'll point the button at that URL instead (no new page/route needed)

