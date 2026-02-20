
## Add Privacy Policy Page with info@digitlab.ai

### Overview

Create a `/privacy-policy` route that opens when someone clicks "Privacy Policy" in the footer. It will inherit the current sky/night background (DynamicBackground), match the existing page style, contain the full policy content from your document, and use **info@digitlab.ai** as the contact email.

---

### Files to create / modify

**1. New file — `src/pages/PrivacyPolicy.tsx`**

A page built with the same shell as `GenerativeAI.tsx`:
- `DynamicBackground` — picks up the current theme (sky or night)
- `Header` — same navigation bar as every other page
- `ChatBar` — floating chat remains available
- A scrollable glass card (`bg-navy-800/80 backdrop-blur-md rounded-2xl`) containing all 9 policy sections
- Gold (`text-gold`) section headings, white body text — consistent with the rest of the site
- "← Back to Home" button at the top linking to `/`

Policy sections (from your uploaded document):
1. Information We Collect
2. How We Use Your Information
3. Data Storage & Security
4. Data Sharing
5. Data Deletion (contact: **info@digitlab.ai**, within 7 business days)
6. Cookies
7. Children's Privacy
8. Changes to This Policy
9. Contact Information — **info@digitlab.ai**

---

**2. Modified — `src/App.tsx`**

- Import the new `PrivacyPolicy` page
- Add `<Route path="/privacy-policy" element={<PrivacyPolicy />} />` alongside the existing routes

---

**3. Modified — `src/components/Footer.tsx`**

- Import React Router's `Link` component
- Change the "Privacy Policy" anchor tag from `<a href="#">` to `<Link to="/privacy-policy">` so it navigates in-app without a full page reload
