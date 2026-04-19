

# Full Code Audit — DigitLab.ai

## Findings

### 🔴 Must-fix before publish

1. **Broken nav link in Footer** — `Footer.tsx` line 60 links to `/about-us`, but the route in `App.tsx` is `/about`. Clicking "About Us" in the footer hits the 404 page.
2. **Broken "Your AI Dashboard" buttons** — `Header.tsx` (desktop line 194 + mobile line 68) link to `/auth`, but `App.tsx` redirects `/auth` → `/`. Per memory ("site is fully public, no authentication"), these CTAs should be removed entirely, not silently redirected.
3. **Dead auth code still shipped in bundle** — `src/pages/Auth.tsx`, `src/components/auth/AuthForm.tsx`, `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx` all reference Supabase auth flows but are never used (and `AuthProvider` is not even mounted in `App.tsx`, so `AuthForm` would crash if reached). Remove these files to shrink bundle and eliminate confusion.
4. **NotFound page off-brand** — `pages/NotFound.tsx` uses light gray bg + blue links, breaking the navy/gold theme. Rebuild with `DynamicBackground`, `Header`, `Footer`, gold link.

### ⚠️ Minor / recommended

5. **Header "Industries" → Hospitality "Core" badge** — fine, but the dropdown shows it only on first item via index check; brittle if list reorders. Use `ind.label === 'Hospitality'`.
6. **`ChatWidget` session ID** — created via `localStorage.getItem(...) || crypto.randomUUID()` but never written back. The 60-min TTL session in `useChatApi` is the source of truth; the ref in `ChatWidget` can drift. Use `useChatApi`'s exported `sessionId` instead of the local ref (used only by `flushBeacon`).
7. **`index.html` still loads `cdn.gpteng.co/gptengineer.js`** — fine in preview, but consider removing for production publish (it's the Lovable editor script).
8. **SEO** — `index.html` title/description are good; missing `<html lang>` localization hint for Arabic visitors (optional). Favicon path `/digitlab-logo-v3.png` — confirm file exists in `public/`.
9. **Theme toggle** — `App.tsx` wraps everything in `<div className="dark">` forcing dark mode regardless of `ThemeContext` state. Either drop the hard-coded `dark` class or remove `ThemeToggle`.

### 🔒 Security review (focused)

10. ✅ **Supabase scan clean** — no exposed tables / missing RLS findings. Project has tables (`Chat History`, `profiles`, etc.) but they aren't queried client-side, so anon key exposure is acceptable (anon key is a publishable key by design).
11. ✅ **Input validation** — `Contact.tsx` and `useChatApi` both use `zod` + `sanitizeInput`. Good.
12. ✅ **XSS** — only one `dangerouslySetInnerHTML` usage in `ui/chart.tsx`, content is internally generated CSS (safe, not user input).
13. ✅ **External links** — all `target="_blank"` use `rel="noopener noreferrer"`.
14. ⚠️ **Webhook URL exposed in client** — `n8n.digitlab.ai/webhook/chat` is callable by anyone. Mitigation: add rate-limiting, HMAC signature, or origin checks at the n8n side. Not blocking, but worth noting.
15. ⚠️ **Email harvesting** — `Ai.Agent@DigitLab.ai` appears in plain `mailto:` links across Footer/Contact/Privacy/Terms/Security. Acceptable for a business contact, but bots will scrape it. Optional: obfuscate or use a contact form only.
16. ✅ **No localStorage-based auth/role checks** — site has no auth, so privilege escalation N/A.
17. ✅ **Console logs** — clean. No runtime errors.

## Proposed fix scope (one batch)

**A. Critical (apply now):**
- Fix footer `/about-us` → `/about`.
- Remove "Your AI Dashboard" buttons from `Header.tsx` (desktop + mobile).
- Delete `src/pages/Auth.tsx`, `src/components/auth/AuthForm.tsx`, `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`.
- Remove `<Route path="/auth" ...>` from `App.tsx`.
- Rebrand `NotFound.tsx` (navy/gold + back-home button using site layout).

**B. Recommended polish:**
- Switch ChatWidget to use `sessionId` from `useChatApi` (single source of truth).
- Make Hospitality "Core" badge label-based, not index-based.
- Decide on theme: either remove forced `dark` class in `App.tsx` to honor `ThemeContext`, or remove `ThemeToggle` to be honest about dark-only.

**C. Out of scope (informational only):**
- Webhook hardening on the n8n side (server change, not codebase).
- Email obfuscation (optional UX call).

Approve **A only**, **A + B**, or **all** and I'll apply in default mode.

