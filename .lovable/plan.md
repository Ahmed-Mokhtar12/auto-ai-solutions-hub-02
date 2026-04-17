
User selected the WhatsApp icon (`MessageSquare` svg) inside the 4th social link in `src/components/Footer.tsx`. Remove the entire WhatsApp `<a>` link from the social row.

## Change

**`src/components/Footer.tsx`**
- Delete the 4th social anchor (the `<a href="https://wa.me/15556395391">` block containing the `MessageSquare` icon).
- Remove `MessageSquare` from the `lucide-react` import (no longer used elsewhere in this file).

Result: footer Column 1 shows only Facebook, Instagram, and LinkedIn social icons. WhatsApp remains accessible via the floating WhatsApp button in the bottom-right corner.
