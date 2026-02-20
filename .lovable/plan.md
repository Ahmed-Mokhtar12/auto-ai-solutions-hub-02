
## Chat Bar Redesign: Bigger Size + Expandable Input

### What's Changing

The chat bar currently uses a fixed `height: 50px` with a single-line `<Input>` (text input). The goal is to:
1. Make the chat bar visibly larger and more prominent.
2. Replace the single-line `<input>` with an auto-expanding `<textarea>` that grows as the user types, up to a defined max height, then scrolls.

---

### Files to Modify

**1. `src/components/chat/ChatInput.tsx`**
- Replace the `<Input>` (single-line) with a `<textarea>` element.
- Add an `onChange` handler that auto-resizes the textarea by resetting `height` to `auto` then setting it to `scrollHeight`.
- Set `rows={1}` as the base, with `min-height` matching the new bar height (~60px inner), and `max-height` of ~120px before scrolling kicks in.
- Update the `inputRef` type from `React.RefObject<HTMLInputElement>` to `React.RefObject<HTMLTextAreaElement>`.
- Keep `Enter` to send (with `Shift+Enter` for a real newline).

**2. `src/components/chat/types.ts`**
- Update `ChatInputProps.inputRef` type from `React.RefObject<HTMLInputElement>` to `React.RefObject<HTMLTextAreaElement>`.

**3. `src/components/chat/ChatContainer.tsx`**
- Change fixed `height: '50px'` to `minHeight: '68px'` and remove the height cap so it can grow.
- Add `alignItems: 'flex-end'` so the send button stays pinned to the bottom as the textarea expands.
- Add `flexWrap: 'nowrap'` and adjust padding slightly for the bigger look.

**4. `src/components/ChatBar.tsx`**
- Update `messageInputRef` type from `useRef<HTMLInputElement>` to `useRef<HTMLTextAreaElement>`.

**5. `src/hooks/draggable/index.ts`**
- Update `elementSize.height` from `50` to `68` to match the new minimum bar height for drag boundary calculations.

**6. `src/hooks/draggable/usePosition.ts`**
- Update the hardcoded `y: window.innerHeight - 120` to `window.innerHeight - 130` to account for the taller bar.

---

### How the Expansion Works

```text
User types short text:
┌─────────────────────────────────┐  ← height: 68px (min)
│  Type your message...      [➤]  │
└─────────────────────────────────┘

User types a long message:
┌─────────────────────────────────┐
│  This is a very long message    │  ← textarea grows
│  that wraps to a second line    │    up to ~120px
│  and even a third line...  [➤]  │
└─────────────────────────────────┘

Beyond ~120px → textarea scrolls internally
```

- The outer container expands upward (it's `position: fixed` anchored at top-left, so it grows downward). The `y` position is already set near the bottom of the screen so any growth is upward visually since the bar is at the bottom.
- The send button uses `alignItems: 'flex-end'` to stay at the bottom-right as text grows.

---

### Technical Notes
- `Shift+Enter` inserts a newline; plain `Enter` sends the message.
- After sending, `textarea` height resets back to the minimum (via resetting the value and re-triggering the auto-resize).
- The `inputRef` type change is a minor TypeScript update — no functional impact elsewhere since `.focus()` and `.value` work the same on `<textarea>`.
