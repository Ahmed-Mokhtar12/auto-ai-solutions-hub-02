
## Add an About Us Page at /about

### What's needed

The header already has an "About Us" link pointing to `/about`, but no route or page exists — clicking it hits the 404 page. The goal is to create the page and wire up the route, matching the exact same dark card style as Security, Privacy Policy, and Terms of Service.

---

### New file: `src/pages/AboutUs.tsx`

Follows the identical structure to `Security.tsx` and `PrivacyPolicy.tsx`:

- `DynamicBackground` + `Header` + `ChatBar` + `Footer`
- `pb-[10vh]` on the root div to clear the fixed footer
- Gold "Back to Home" arrow link at the top
- `bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700` card
- `Section` component for each topic
- Gold headings, white/70 body text, gold email contact link

**Content sections** for an AI automation company:

1. Who We Are
2. Our Mission
3. What We Build
4. Our Approach
5. Contact Us (with `info@digitlab.ai`)

---

### Update `src/App.tsx`

Add the import and route:

```ts
import AboutUs from "./pages/AboutUs";
// ...
<Route path="/about" element={<AboutUs />} />
```

The header link at `/about` is already wired up correctly — no changes needed to `Header.tsx`.

---

### Summary of files to change

| File | Change |
|---|---|
| `src/pages/AboutUs.tsx` | Create — new page with dark card style |
| `src/App.tsx` | Add import + `<Route path="/about">` |
