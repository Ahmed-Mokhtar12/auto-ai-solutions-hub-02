
Stack the three floating buttons vertically in the bottom-right corner. Chat (message) icon stays put; WhatsApp moves directly above it; Phone (call) moves above WhatsApp.

## Change

**`src/components/chat/ChatWidget.tsx`** — update `right` and `bottom` classes on the three buttons:

- **Chat toggle** (unchanged): `bottom-[calc(15vh+1rem)] right-6`
- **WhatsApp**: change `bottom-[calc(15vh+1rem)] right-[5.5rem]` → `bottom-[calc(15vh+5rem)] right-6` (one button-height + gap above chat)
- **Phone (VAPI)**: change `bottom-[calc(15vh+1rem)] right-[10rem]` → `bottom-[calc(15vh+9rem)] right-6` (two button-heights + gaps above chat)

Each button is `w-14 h-14` (3.5rem) with ~0.5rem gap, so 4rem spacing between centers works cleanly.

The chat panel anchor (`bottom-[calc(15vh+5rem)] right-6`) is unchanged — it opens from the chat icon as before.

## Result
Vertical column at bottom-right: Phone (top) → WhatsApp (middle) → Chat (bottom), matching the reference image.
