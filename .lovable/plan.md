
## Reposition the Chat Bar Above the Footer

### The Problem

The chat bar (draggable input) uses a default Y position of `window.innerHeight - 120px`. The footer is now `h-[10vh]` fixed at the bottom. On a standard 1080px screen, 10vh = 108px, so the chat bar and footer overlap.

### The Fix

The default Y position needs to account for the footer height. The new formula should be:

```
y = window.innerHeight - (10vh in px) - chatBarHeight - gap
  = window.innerHeight - (window.innerHeight * 0.1) - 50 - 16
  = window.innerHeight * 0.9 - 66
```

This places the chat bar ~16px above the top edge of the footer.

### File to change

**`src/hooks/draggable/index.ts`** — one line change:

```ts
// Before
y: typeof window !== 'undefined' ? window.innerHeight - 120 : 400

// After
y: typeof window !== 'undefined' ? window.innerHeight * 0.9 - 66 : 400
```

- `window.innerHeight * 0.9` = bottom of the scrollable area (top edge of the 10vh footer)
- `- 50` = height of the chat bar itself
- `- 16` = a comfortable 16px gap between chat bar and footer top border

This is a minimal, targeted fix — no other files need to change.
