

## Phase 7: Additional Pages

Enrich the three service subpages, create six industry landing pages, and add a contact/demo form page. All pages follow the existing subpage layout pattern (DynamicBackground, Header, glass card, Back to Home link, Footer, ChatWidget, `pb-[15vh]`).

---

### 1. Enrich Service Subpages

Expand **AI Agents**, **Generative AI**, and **Responsible AI** from a single paragraph to full multi-section pages.

Each page gets:
- Hero intro paragraph (already exists, refined)
- 3-4 content sections with gold headings (reuse the `Section` component pattern from AboutUs/Security)
- Key features list with icons
- Use cases grid (2-3 cards)
- Bottom CTA: "Request a Demo" button linking to Calendly

**Files modified:**
- `src/pages/AIAgents.tsx` — add sections: How It Works, Key Capabilities (icon list), Use Cases (cards), CTA
- `src/pages/GenerativeAI.tsx` — add sections: What We Offer, Applications, Integration, CTA
- `src/pages/ResponsibleAI.tsx` — add sections: Our Framework, Principles (icon list), Governance, CTA

---

### 2. Industry Landing Pages

Create six new pages, one per industry from the IndustrySolutions grid. Each follows the same template:

- Industry icon + title
- Overview paragraph
- 3 use-case sections with descriptions
- "How We Help" process (3 steps)
- Bottom CTA

**New files:**
- `src/pages/industries/Hospitality.tsx`
- `src/pages/industries/Manufacturing.tsx`
- `src/pages/industries/Finance.tsx`
- `src/pages/industries/Retail.tsx`
- `src/pages/industries/Healthcare.tsx`
- `src/pages/industries/Logistics.tsx`

**Files modified:**
- `src/App.tsx` — add routes: `/industries/hospitality`, `/industries/manufacturing`, etc.
- `src/components/sections/IndustrySolutions.tsx` — wrap each industry card title in a `Link` to its page
- `src/components/Header.tsx` — add `href` to industries array items, make them clickable links in the dropdown

---

### 3. Contact / Demo Form Page

A standalone `/contact` page with a form (name, email, company, message) that submits to the existing n8n webhook or a mailto fallback. No backend needed — uses `fetch` to POST to a webhook.

**New file:**
- `src/pages/Contact.tsx` — form with zod validation, gold-styled inputs, Calendly link as alternative

**Files modified:**
- `src/App.tsx` — add `/contact` route
- `src/components/Header.tsx` — add "Contact" link to nav (mobile + desktop)
- `src/components/Footer.tsx` — add "Contact Us" link in Company column

---

### Technical details

- All new pages use the shared pattern: `DynamicBackground`, `Header`, `Footer`, `ChatWidget`, `pb-[15vh]`
- Industry pages share a reusable template component `src/pages/industries/IndustryPageTemplate.tsx` to avoid duplication
- Form validation with zod; input sanitization reuses existing `src/utils/inputSanitizer.ts`
- No new dependencies needed
- Mobile-responsive from the start (using Phase 6 patterns: `text-3xl md:text-4xl`, `py-12 md:py-20`, etc.)

### What stays the same
- All existing pages, layouts, and functionality
- Index page sections unchanged
- Services page (`/services`) unchanged

