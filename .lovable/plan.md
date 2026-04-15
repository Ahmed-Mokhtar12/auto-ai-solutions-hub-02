

## Replace Batching Indicator with Delayed "Thinking" Animation

### What's changing
Replace the "Waiting for more messages…" text with the existing `ThinkingDots` animation (the word "Thinking" followed by bouncing dots, already defined in `ChatMessageItem.tsx`). It appears only after a 3-second delay from the last sent message, so quick follow-ups don't trigger it.

### Changes in `src/components/chat/ChatWidget.tsx`

1. **New state & ref**: `showBatchDots` (boolean, default false) and `batchDotsTimerRef` for the 3s delay timer.

2. **In `handleSend`**: reset `showBatchDots = false`, clear and restart a 3-second timer that sets `showBatchDots = true`.

3. **In `flushMessages`**: clear the dots timer and set `showBatchDots = false`.

4. **Replace the batching indicator UI** (the "Waiting for more messages…" block) with:
   - Condition: `isBatching && !isLoading && showBatchDots`
   - Content: "Thinking" text + 3 bouncing dots (reusing the same `thinking-dot` keyframe already in `index.css`)

5. **Cleanup**: clear `batchDotsTimerRef` on unmount alongside other timers.

### Files modified
- `src/components/chat/ChatWidget.tsx`

