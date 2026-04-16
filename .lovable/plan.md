

## Remove Tech Stack Section + Phase 5: Footer Expansion

Two changes. All existing features untouched.

---

### 1. Remove Tech Stack from TrustSection

**`src/components/sections/TrustSection.tsx`** — Delete the `techStack` array (lines 4-6) and the entire "Tech stack" div (lines 32-47). Keep the trust badges (SOC 2 Ready, GDPR Compliant, etc.) intact. Remove the `mb-12` from the trust badges wrapper since there's nothing below it anymore.

### 2. Phase 5: Footer Expansion

Per the original 7-phase plan, expand the current compact fixed footer into a richer multi-column layout.

**`src/components/Footer.tsx`** — Expand from the current 3-column single-row layout to a 4-column layout:

- **Column 1 (Brand)**: DigitLab.ai name + short tagline ("AI-Powered Automation Solutions") + social icons (moved here from current right column)
- **Column 2 (Solutions)**: Links to AI Agents, Generative AI, Responsible AI
- **Column 3 (Company)**: Links to About Us, Security, Privacy Policy, Terms of Service
- **Column 4 (Contact)**: Email (Ai.Agent@DigitLab.ai), Phone (+971 591 3426), WhatsApp link

**Key constraints**:
- Keep `fixed bottom-0 z-40` positioning — do not change to scrollable footer (per `mem://ui/fixed-footer`)
- Increase height from `h-[10vh]` to `h-[15vh]` to fit the expanded content
- Update `pb-[10vh]` to `pb-[15vh]` on all page wrappers that use it: `Index.tsx`, `Services.tsx`, `AIAgents.tsx`, `GenerativeAI.tsx`, `ResponsibleAI.tsx`, `AboutUs.tsx`, `Security.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`, `NotFound.tsx`
- Keep the same visual style: `bg-[#0B0F19]/95 backdrop-blur-md border-t border-[#F8D042]/30`
- Copyright line stays centered at the bottom
- On mobile, stack into 2x2 grid or single column with smaller text

### Files modified
- `src/components/sections/TrustSection.tsx` (remove tech stack)
- `src/components/Footer.tsx` (expand to 4-column layout)
- All page files with `pb-[10vh]` → `pb-[15vh]`

