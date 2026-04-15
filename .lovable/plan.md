

## Implement Message Batching with Safeguards

### Summary
Buffer user messages client-side with a 5s debounce / 15s max-wait, then send them as one webhook call. Three safeguards added: flush guard, beforeunload/visibilitychange flush, and retry-safe pending buffer.

### Changes

**`src/hooks/chat/useChatApi.ts`**
- Extend `sendChatMessage` signature to accept optional batch metadata object: `{ batched: boolean, batched_count: number, first_message_at: string, last_message_at: string }`
- Spread these fields into the JSON body alongside existing `session_id`, `message`, `timestamp`
- Update the `ChatApiHook` interface accordingly

**`src/components/chat/ChatWidget.tsx`**
- Add refs: `pendingMessagesRef` (array of `{text, timestamp}`), `debounceTimerRef`, `maxWaitTimerRef`, `isFlushingRef` (boolean guard)
- Add state: `isBatching` for UI indicator
- Rewrite `handleSend`:
  1. Add message to UI immediately
  2. Push to `pendingMessagesRef` with ISO timestamp
  3. Clear/restart 5s debounce timer
  4. If first pending message, start 15s max-wait timer
  5. Set `isBatching = true`
- New `flushMessages` function:
  1. Check `isFlushingRef` — if true, return (prevents double flush)
  2. If no pending messages, return
  3. Set `isFlushingRef = true`
  4. Clear both timers, set `isBatching = false`
  5. Join messages with `\n---\n`, build metadata
  6. Call `sendChatMessage(joined, meta)`
  7. On **success**: clear `pendingMessagesRef`, add bot reply
  8. On **failure**: keep `pendingMessagesRef` intact, show error message, re-enable batching state so user can retry
  9. Set `isFlushingRef = false`
- Flush triggers:
  - Debounce timer (5s)
  - Max-wait timer (15s)
  - Chat close: wrap `setIsOpen(false)` calls to flush first
  - `visibilitychange` (document hidden) and `beforeunload` — use `useEffect` to register/cleanup these listeners; use synchronous `navigator.sendBeacon` as fallback in `beforeunload` since async fetch may not complete
- UI: when `isBatching && !isLoading`, show subtle "Waiting for more messages..." with pulsing dot below last user message

### Webhook payload shape (backward compatible)
```json
{
  "session_id": "...",
  "message": "first message\n---\nsecond message",
  "timestamp": "...",
  "batched": true,
  "batched_count": 2,
  "first_message_at": "...",
  "last_message_at": "..."
}
```
Single messages: `batched: false, batched_count: 1`.

### Files modified
- `src/hooks/chat/useChatApi.ts`
- `src/components/chat/ChatWidget.tsx`

