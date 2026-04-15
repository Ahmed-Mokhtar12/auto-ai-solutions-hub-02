

## Improve Chat Widget Scrollbar and Remove Attachment Icon

### What's changing

1. **Remove the attachment (Paperclip) button and related file input** from the input area — lines 224-238
2. **Replace the default browser scrollbar** on the messages area (line 166) with a custom styled thin scrollbar that matches the navy/gold theme — using CSS utilities for a sleek, semi-transparent gold-tinted track and thumb with smooth fade-in on hover
3. **Add subtle entrance animations** to messages as they appear (slide-up + fade-in)

### Technical details

**`src/components/chat/ChatWidget.tsx`**:
- Remove `Paperclip` import and `fileInputRef`, `attachedImage` state, `handleImageSelect`, the attachment button, and the hidden file input
- Remove the image preview section (lines 200-213)
- Clean up `handleSend` and `handleKeyDown` to remove `attachedImage` references
- Replace `scrollbar-thin` on messages div with a custom class
- Add a fade-in animation class to each message bubble

**`src/index.css`**:
- Add custom scrollbar styles (`.chat-scrollbar`) with a thin, gold-tinted thumb on a transparent track that only appears on hover/scroll

