

## Fix "Chat with us" tooltip visibility in day mode

The tooltip pill behind the chat button is dark/transparent and blends into the light blue sky, making the text unreadable. Need to locate it and make it readable in day mode.

### Investigation needed
Find the "Chat with us" tooltip — likely in `ChatWidget.tsx` or `FloatingServiceBox.tsx` near the floating action buttons (call/WhatsApp/chat).

### Fix
Update the tooltip pill's classes so it has solid contrast in day mode:
- Background: keep dark navy with higher opacity (e.g. `bg-navy-900/90`) so white text reads on light sky.
- Text: ensure `text-white` with optional subtle shadow.
- Night mode: unchanged.

If the current style is `bg-navy-900/40` or similar low-opacity dark, bump to `bg-navy-900/85 backdrop-blur-sm` and add `text-white font-medium`.

### Files Changed
- `src/components/chat/ChatWidget.tsx` (or wherever the "Chat with us" label lives) — adjust tooltip background opacity + text color for day-mode legibility.

