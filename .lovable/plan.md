

## Update floating button tooltips: black text on light glass background

User wants the three tooltip pills ("Voice call", "WhatsApp", "Chat with us") to match the day-mode card style — light frosted glass with black text instead of the current dark navy with white text.

### Change — `src/components/chat/ChatWidget.tsx`

All three tooltip `<span>` elements currently use:
`bg-navy-900/90 backdrop-blur-sm border border-gold/30 text-white font-medium`

Update to day-mode glass with black text, gated for night mode to keep the dark variant:

`bg-white/80 backdrop-blur-sm border border-white/40 text-navy-900 font-semibold dark:bg-navy-900/90 dark:border-gold/30 dark:text-white`

This matches the established day-mode card pattern (light frosted white glass) used by the stat cards and section tiles. Night mode keeps the existing dark navy + gold border + white text.

### Files Changed
- `src/components/chat/ChatWidget.tsx` — three tooltip spans (Voice call, WhatsApp, Chat with us) updated to light glass / black text in day mode, dark in night mode.

