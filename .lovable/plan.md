
## Focus Mode — Hide Only Main Content During Chat (Keep Header, Footer & ThemeToggle)

### What You Asked For

When the user hovers over or interacts with the chat bar, only the **middle page content** (Hero section, Services, Process, Social Proof, CTA) fades away. The **Header**, **Footer**, and **ThemeToggle** stay fully visible at all times. When the user moves away from the chat, the content smoothly fades back in.

---

### The Approach

A shared React Context (`ChatFocusContext`) will hold a single boolean `isChatFocused`. `ChatBar` sets it to `true` on hover/interaction and `false` (with a short delay) when the user leaves. `Index.tsx` reads it and applies a CSS fade transition **only on the `<main>` element**, leaving Header, Footer, and ThemeToggle completely untouched.

---

### Files to Create / Modify

**1. NEW: `src/contexts/ChatFocusContext.tsx`**
- Creates a React context exposing:
  - `isChatFocused: boolean`
  - `setIsChatFocused: (val: boolean) => void`
- Exports `ChatFocusProvider` wrapper and `useChatFocus` hook.

**2. `src/App.tsx`**
- Wrap the app with `<ChatFocusProvider>` so both `Index.tsx` and `ChatBar.tsx` can access the same focus state.

**3. `src/components/ChatBar.tsx`**
- Import `useChatFocus`.
- Call `setIsChatFocused(true)` when:
  - User hovers over the chat bar (`handleHover` is called with `true`)
  - User hovers over the chat messages window (`handleChatMessagesMouseEnter`)
  - Input receives focus (`handleFocus`)
  - A message is sent
- Call `setIsChatFocused(false)` (with an ~800ms delay) when:
  - User's mouse leaves the chat bar (`handleChatMessagesMouseLeave` / `handleHover` with `false`)
  - Input loses focus (and user is not hovering)

**4. `src/pages/Index.tsx`**
- Import `useChatFocus`.
- Apply fade CSS **only to the `<main>` element** (the content between Header and Footer):
  ```
  style={{
    opacity: isChatFocused ? 0 : 1,
    pointerEvents: isChatFocused ? 'none' : 'auto',
    transition: 'opacity 0.5s ease'
  }}
  ```
- Header, Footer, ThemeToggle, DynamicBackground, and ChatBar are **not wrapped** — they stay visible always.

---

### Visual Behavior

```text
Normal state:
┌──────────────────────────────────────────┐
│  [ThemeToggle]  [Header + Nav]           │  ← always visible
├──────────────────────────────────────────┤
│  Hero Title, CTA buttons                 │
│  Services / Process / Social Proof / CTA │  ← fades out
├──────────────────────────────────────────┤
│  [Footer]                                │  ← always visible
│            [Chat Bar]                    │  ← always visible
└──────────────────────────────────────────┘

Focus mode (user hovers/types in chat):
┌──────────────────────────────────────────┐
│  [ThemeToggle]  [Header + Nav]           │  ← stays visible
├──────────────────────────────────────────┤
│                                          │
│        [Sky / Night Background only]     │  ← main content gone
│   [Chat Messages appear here cleanly]    │
│                                          │
├──────────────────────────────────────────┤
│  [Footer]                                │  ← stays visible
│            [Chat Bar]                    │  ← stays visible
└──────────────────────────────────────────┘
```

- Fade out: **0.5s ease** (content disappears smoothly)
- Fade back in: **0.7s ease** (content returns slowly after mouse leaves)
- Grace period before fading back: **800ms** after all interaction stops
