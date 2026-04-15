

## Phase 1: Core Messaging & Positioning Update

Rebrand from hospitality-only to "hospitality-first, multi-sector ready" across all main page sections.

---

### Changes

**1. HeroSection.tsx** — Update headline, subheading, benefit cards, and CTA boxes:
- Headline: "Enterprise AI Solutions" with gold "Built for Hospitality, Ready for Every Industry"
- Subheading: Lead with hospitality expertise, then broaden to "proven methodology for enterprises across every sector"
- Benefit cards:
  - "24/7 Intelligent Operations" (was "24/7 Guest Service")
  - "Up to 70% Cost Reduction" (generalized description)
  - "Measurable ROI in 90 Days" (was "Guest Satisfaction+")
- Left CTA box: "Free AI Consultation" (was "Free Hotel AI Consultation") — keep hospitality flavor in description but also mention enterprise
- Right CTA box: "Enterprise AI Solutions" (was "Hospitality AI Solutions") — list both hospitality and cross-industry offerings

**2. ServicesOverview.tsx** — Broaden section while leading with hospitality:
- Section header: "AI Solutions" with subtitle mentioning hospitality specialization plus multi-sector capability
- Remove "100% Hospitality Focused" badge, replace with "Hospitality Specialists | Enterprise Ready"
- Rename services to be more universal while keeping hospitality context:
  - "AI Hotel Concierge" → "AI-Powered Automation" (mention hospitality concierge as example)
  - "Guest Experience AI" → "Intelligent Analytics & Personalization"
  - "Hospitality-Safe AI" → "Responsible & Secure AI"
- Keep the specialized hospitality solutions grid but add a note: "We also serve Manufacturing, Finance, Retail, Healthcare, and more"

**3. SocialProofSection.tsx** — Generalize stats and messaging:
- Header: "Proven Results Across Industries" (was "Hospitality AI Specialists")
- Remove hospitality-first approach callout box
- Update stats to be more universal:
  - "200+ AI Workflows Deployed" (was "Hotels AI Workflows")
  - "15,000+ Hours Saved Monthly" (was "Guest Hours Saved")
  - "70% Average Cost Reduction" (was "Guest Satisfaction Increase")
  - "99% Client Retention" (was "Hotel Client Retention")
- Update icons to be less hospitality-specific

**4. Index.tsx** — Fix Calendly URL and update CTA section:
- Remove hardcoded `?month=2025-06` from Calendly link
- Update bottom CTA text to be more universal

**5. Memory update** — Update `mem://business/specialization-focus` to reflect new hybrid positioning

---

### Files modified
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ServicesOverview.tsx`
- `src/components/sections/SocialProofSection.tsx`
- `src/pages/Index.tsx`
- `mem://business/specialization-focus`

### What stays the same
- ProcessSection.tsx — already generic enough ("How We Work")
- All visual styling, layout, and animations
- Footer, Header, chat widget, background

