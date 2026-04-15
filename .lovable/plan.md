

## Replace Floating Chat Bar with Fixed Chat Widget

### Overview
Remove the current draggable/hovering chat bar and replace it with a modern chat widget: a floating icon button in the bottom-right corner that opens a full chat panel with smooth animation — matching the Scrape.do reference and the website's navy/gold theme.

### What Changes

**1. New component: `src/components/chat/ChatWidget.tsx`**
- Floating circular button (bottom-right, above footer) with a chat/message icon in gold (`#F8D042`) on navy background
- Click toggles a chat panel with scale+fade animation
- Chat panel: ~380px wide, ~500px tall, rounded corners, navy-800 background with subtle gold border
- Panel contains: header bar with title + close button, scrollable message area, input area with text field + attachment button + voice note button + send button
- Image attachment: file input that accepts images, shows preview before send
- Voice note: uses browser MediaRecorder API to record audio, shows recording indicator
- Messages styled with user messages right-aligned (navy-700 bg) and AI messages left-aligned (navy-800 bg, gold accent)
- Reuses existing `useChatState` hook for message/send logic
- Reuses existing `useChatApi` hook for webhook calls with session_id

**2. Remove old chat infrastructure**
- Delete or gut: `ChatBar.tsx`, `ChatMessages.tsx`, `ChatContainer.tsx`, `ChatInput.tsx`, `SendButton.tsx`, `PlaceholderManager.tsx`, `MessageContainer.tsx`, `MessageEmptyState.tsx`
- Remove draggable hooks usage from chat (`useDraggable`, `useAutoHide`, `useDrag`, `usePosition`)
- Remove `ChatFocusContext` usage that dims the page background (the new widget overlays without dimming)

**3. Update `src/pages/Index.tsx`**
- Replace `<ChatBar />` with `<ChatWidget />`
- Remove the `isChatFocused` opacity/pointer-events logic on `<main>` — page no longer dims

**4. Update `src/hooks/chat/index.ts` and `useVisibility.ts`**
- Simplify visibility: just an `isOpen` boolean toggle, no auto-hide/hover/drag complexity

**5. Styling**
- Widget icon: navy-800 bg, gold icon, subtle glow on hover, matches footer social icon style
- Chat panel: `bg-[#0B0F19]/95 backdrop-blur-md border border-[#F8D042]/20`
- Input area: dark input field, gold send button, attachment + mic icons in white/gold
- Animation: CSS transform scale(0)→scale(1) with origin bottom-right, 300ms ease-out

### Technical Details

- **Image upload**: HTML file input (`accept="image/*"`), converts to base64 or sends as form data alongside message to webhook
- **Voice note**: `navigator.mediaDevices.getUserMedia({ audio: true })` → MediaRecorder → Blob → can be sent as base64 or stored; initially will show as a placeholder since the n8n webhook may not support audio — the UI will be ready
- **Session ID**: No changes to `useChatApi.ts` — session_id logic stays as-is
- **Responsive**: On mobile, chat panel goes full-width with slight margins
- **Z-index**: Widget button z-50, panel z-50, above footer (z-40)

### Files to Create
- `src/components/chat/ChatWidget.tsx` — main widget (icon + panel)

### Files to Modify
- `src/pages/Index.tsx` — swap ChatBar → ChatWidget, remove focus dimming
- `src/hooks/chat/index.ts` — simplify exports

### Files to Remove/Deprecate
- `src/components/ChatBar.tsx` — replaced
- `src/components/ChatMessages.tsx` — integrated into widget
- `src/components/chat/ChatContainer.tsx` — no longer needed
- `src/components/chat/ChatInput.tsx` — rebuilt inside widget
- `src/components/chat/SendButton.tsx` — rebuilt inside widget
- `src/components/chat/messages/MessageContainer.tsx` — integrated
- `src/components/chat/messages/MessageEmptyState.tsx` — integrated
- `src/components/chat/PlaceholderManager.tsx` — simplified
- Draggable hooks remain in codebase but are no longer imported by chat

