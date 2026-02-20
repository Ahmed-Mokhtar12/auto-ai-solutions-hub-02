
## Add a Security Page at /security

### What's happening

The header already has a "Security" link pointing to `/security`, but the route and page don't exist yet — clicking it leads to the 404 page. The goal is to create a proper `/security` page matching the exact dark card style used by Privacy Policy and Terms of Service.

---

### New file: `src/pages/Security.tsx`

Follows the identical structure to `PrivacyPolicy.tsx` and `TermsOfService.tsx`:

- `DynamicBackground` + `Header` + `ChatBar` + `Footer`
- `pb-[10vh]` on the root div to clear the fixed footer
- Gold "Back to Home" arrow link at the top
- `bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700` card
- `Section` component for each topic
- Gold headings, white/70 body text, gold email links

**Content sections** relevant to an AI automation company:

1. Our Security Commitment
2. Data Encryption
3. Access Control
4. Infrastructure Security
5. AI Model Security
6. Incident Response
7. Compliance
8. Responsible Disclosure
9. Contact

---

### Update `src/App.tsx`

Add the import and route:

```ts
import Security from "./pages/Security";
// ...
<Route path="/security" element={<Security />} />
```

The header link at `/security` is already wired up correctly — no changes needed to `Header.tsx`.

---

### Summary of files to change

| File | Change |
|---|---|
| `src/pages/Security.tsx` | Create — new page with dark card style |
| `src/App.tsx` | Add import + `<Route path="/security">` |
