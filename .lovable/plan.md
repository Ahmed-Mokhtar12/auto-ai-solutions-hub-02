
## Make the Footer Taller — ~10% of Screen Height

### What's changing

The footer currently uses `py-3` (12px top/bottom padding) with small `text-xs` labels and tiny `w-8 h-8` icon buttons. This makes it look like a thin strip at the bottom.

The goal is to make it feel like a real footer — approximately 10% of the viewport height — so it becomes a substantial, visually prominent section of every page.

---

### Changes to `src/components/Footer.tsx`

1. **Height**: Set a fixed height using `h-[10vh]` on the footer element itself, so it always occupies exactly 10% of the screen regardless of device.

2. **Padding**: Replace `py-3` with taller padding (`py-5`) inside the container, and use `h-full` on the inner grid so content is vertically centred within the 10vh bar.

3. **Text sizes**: Bump up from `text-xs` to `text-sm` for all labels (email, phone, copyright, legal links).

4. **Icon circle buttons**: Increase from `w-8 h-8` to `w-10 h-10` and icon size from `h-4 w-4` to `h-5 w-5` so they're easier to tap and more visually prominent.

5. **Gap spacing**: Increase gaps between elements (`gap-4` instead of `gap-3`, `gap-2` between contact lines).

6. **Brand label**: Add a small `DigitLab.ai` or `AI-Powered Automation` label above the copyright line in the centre column for a polished look.

---

### Changes to all pages (bottom padding)

All pages currently have `pb-16` (64px) to offset the footer. With the footer now set to `10vh`, this needs to change to `pb-[10vh]` so content is never hidden behind the taller footer.

Files to update:
- `src/pages/Index.tsx`
- `src/pages/AIAgents.tsx`
- `src/pages/GenerativeAI.tsx`
- `src/pages/ResponsibleAI.tsx`
- `src/pages/Services.tsx`
- `src/pages/PrivacyPolicy.tsx`
