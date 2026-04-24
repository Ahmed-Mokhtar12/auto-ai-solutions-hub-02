## Update the DigitLab logo to transparent letters only

### What I will change
- Create a new logo asset with a transparent background so only the letters/mark remain visible.
- Remove the small tagline text under the wordmark inside the logo asset (`AI AUTOMATION • INTELLIGENCE • IMPACT`).
- Replace the current header logo image so the top-left logo no longer appears inside a dark rectangle.
- Update the footer to use the same cleaned logo asset for consistency.
- Refresh favicon/app icon references only if needed so branding stays consistent.

### How it will look
- Header logo: transparent background, just the DigitLab letters/mark.
- No extra line of small text inside the logo image.
- The logo will sit naturally on top of the existing sky background instead of bringing its own box behind it.

### Files involved
- `src/components/Logo.tsx`
- `src/components/Footer.tsx`
- `src/assets/digitlab-brand-logo.png` or a replacement transparent asset
- `public/digitlab-brand-logo.png` and related icon files if the cleaned asset should also be used there
- `index.html` only if favicon/icon references need to change

### Technical details
- I’ll replace the current raster logo asset with a transparent version derived from the approved brand image.
- If the cleanest result comes from using just the monogram + wordmark on transparency, I’ll export that as the main site logo.
- I will preserve the existing component sizing/positioning unless the new transparent asset needs a minor adjustment for alignment.

### Quality checks
- Confirm the logo background is truly transparent on both day and night themes.
- Confirm the small tagline text is fully removed from the displayed logo.
- Confirm the logo remains crisp in the header and footer and does not overlap the theme toggle.
- Confirm no stale asset path is still showing the old boxed logo.

### Scope note
- This change targets the logo asset itself and where it is displayed.
- I will not change the rest of the site copy or layout unless needed for the new logo to fit cleanly.