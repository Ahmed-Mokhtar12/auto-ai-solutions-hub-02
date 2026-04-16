

## Integrate V3 Logo into Header and Footer (Icon Only)

### Changes

**`src/components/Logo.tsx`**
- Import `digitlab-logo-v3.png`
- Replace the entire text ("Digit", "Lab", ".ai") with just the `<img>` tag (32×32px)
- Keep the `<Link to="/">` wrapper

**`src/components/Footer.tsx`**
- Import `digitlab-logo-v3.png`
- Replace the "DigitLab.ai" text in column 1 with a 20×20px `<img>` of the logo

**`index.html`**
- Update favicon `href` to `/digitlab-logo-v3.png` (copy asset to `public/`)

