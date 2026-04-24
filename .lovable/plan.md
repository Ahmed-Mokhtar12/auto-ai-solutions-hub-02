## Implement the new DigitLab logo system

### What I will change
- Use the uploaded logo image as the new visual brand asset across the site.
- Replace the current wordmark usage in the header and footer with a project-local logo asset copied from the upload.
- Update the browser favicon to use the uploaded logo image.

### Placement and sizing
- Header: keep a clean horizontal logo area, sized similarly to the current wordmark so navigation layout does not shift.
- Footer: use the same brand asset at a smaller size, preserving the existing compact fixed-footer layout.
- Favicon: reference the copied image from `public/` so browsers can load it reliably.

### Files to update
- Copy uploaded image into the project, likely:
  - `public/digitlab-brand-logo.png` for favicon/public usage
  - optionally `src/assets/digitlab-brand-logo.png` for React imports
- Update:
  - `src/components/Logo.tsx`
  - `src/components/Footer.tsx`
  - `index.html`

### Quality checks
- Confirm the logo renders clearly on the default dark navy background.
- Confirm it does not overflow the desktop or mobile header.
- Confirm footer still fits within the fixed 15vh footer contract.
- Remove or bypass stale favicon references if needed so the new icon is used consistently.

### Notes
- I will not change the site theme, copy, navigation, backend, chat, or page layout.
- If the uploaded file includes extra whitespace or a full square composition, I will size it conservatively first rather than cropping destructively. If it needs a cleaner transparent SVG later, we can replace the PNG with SVG exports.