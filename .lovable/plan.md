

## Fix Textarea Scrollbar and Increase Chat Size

### What's changing

1. **Apply the same `.chat-scrollbar` class to the textarea** — the user input textarea currently uses the default browser scrollbar, which looks different from the messages area. Adding the `chat-scrollbar` class makes both scrollbars match (thin, gold-tinted, appears on hover).

2. **Increase chat panel size by 20%** — from `w-[380px] h-[520px]` to `w-[456px] h-[624px]`.

### Technical details

**`src/components/chat/ChatWidget.tsx`**:
- Line 125: Change `w-[380px] h-[520px]` → `w-[456px] h-[624px]`
- Line 212: Add `chat-scrollbar` class to the textarea's className so it uses the same custom scrollbar as the messages area

No other files need changes — the `.chat-scrollbar` CSS is already defined in `index.css`.

