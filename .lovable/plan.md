
Fix the missing homepage header by restoring its layering and layout so it is visibly present at the top of the screen again.

What I found
- `Header` is still rendered on the homepage in `src/pages/Index.tsx`; it was not deleted.
- The issue is that the header has no positioning/z-index protection, while the page uses multiple full-screen layers (`DynamicBackground`, theme toggle at `z-50`, main content at `z-10`, fixed footer at `z-40`, chat UI/floating controls).
- `src/components/Header.tsx` currently renders as a plain block (`w-full py-6`) with no `relative z-...`, so it can visually fall behind or get lost against the hero/background.
- The current desktop structure also puts logo, nav, and CTA buttons in one row, which makes the right-side actions fragile at the user’s current 1311px viewport.

Implementation
1. Update `src/components/Header.tsx` to make the header explicitly visible above the page layers:
   - add `relative z-30` or higher to the header wrapper
   - give the inner container stable horizontal padding
2. Refactor the desktop header into 3 zones:
   - Left: logo
   - Center: Services, Industries, Security, About Us
   - Right: “Your AI Dashboard” and “Request a Demo”
3. Pin the right CTA group with `ml-auto shrink-0` so those buttons stay in the top-right and do not get squeezed out.
4. Keep the mobile sheet menu, but ensure the same hierarchy remains:
   - logo left
   - CTA/hamburger right
   - dashboard link prominent inside the drawer
5. Restore the dashboard button behavior to match project memory:
   - it remains a navigation button, not auth-driven
   - link target should be aligned with the intended public route instead of relying on `/auth` redirect behavior
6. Verify after implementation at the current desktop width and on mobile that:
   - the header is visible
   - Security and About Us are visible
   - “Your AI Dashboard” and “Request a Demo” are visible in the top-right
   - dropdowns and hamburger still work

Files to update
- `src/components/Header.tsx`
- optionally `mem://ui/navigation-patterns` to record that the homepage header must stay layered above background/content and keep the CTA group pinned right
