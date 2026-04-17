
## Plan: `booking_cta` Support with Robust Parsing

### Files to change

**1. `src/utils/messageUtils.ts`**
- Extend `ChatMessage` with optional `cta?: { label: string; url: string }`.

**2. `src/hooks/chat/useChatApi.ts`**
- Change `sendChatMessage` return type to `Promise<{ text: string; cta?: { label: string; url: string } }>`.
- Add a `parseWebhookResponse(data)` helper that:
  - Walks candidate containers in order: `data`, `data.output`, `data.reply`, `data.data`.
  - For each, checks if `type === 'booking_cta'` with a `button` object.
  - Extracts `cta.url` (must be string starting with `http`); if missing/invalid → no CTA.
  - Extracts `cta.label`; defaults to `"Book a Demo"` when missing.
  - Extracts message text from (in order): container's `message`, `text`, `reply.message`, `output.message`, then top-level fallbacks already used today (`reply`, `output`, `message`, raw string).
- Plain-text path unchanged → returns `{ text }` only.

**3. `src/components/chat/ChatWidget.tsx`**
- Update `addMessage(text, sender, cta?)` to accept and store optional CTA.
- In `flushMessages`, destructure `{ text, cta }` from the API response and pass through.
- In the message render loop, when `msg.cta` exists, render below the bubble:
  - `<a href target="_blank" rel="noopener noreferrer">` styled as a premium gold pill: `bg-gold text-navy-900 font-semibold rounded-full px-5 py-2.5 hover:bg-gold/90 hover:scale-[1.02] transition shadow-lg shadow-gold/20`, with an external-link icon.
  - Block-level under the bubble, max-width 85%, mobile-friendly tap target.

### Detection logic (frontend)

Treats response as booking CTA when any of these contain `type: "booking_cta"` + `button.url` (http-prefixed):
- `data`, `data.output`, `data.reply`, `data.data`

Message text resolved from (first match wins):
- container `.message` → `.text` → `.reply.message` → `.output.message` → existing fallbacks

### Final supported response shape

```json
{
  "type": "booking_cta",
  "message": "Absolutely — pick a time:",
  "button": { "label": "Book a Demo", "url": "https://calendly.com/..." }
}
```
Also accepted nested under `output`, `reply`, or `data`. Plain text / `{reply: "..."}` / `{output: "..."}` continue to work unchanged.

### Refactor scope

- `useChatApi`'s response-parsing block is extracted into a small pure helper. No other code paths change.
- `ChatWidget.addMessage` signature gains one optional arg — all existing call sites still compile.

### Edge cases to know before updating n8n

- If `button.url` does not start with `http(s)`, the CTA is silently dropped (text still renders) — keeps the link safe.
- If `button.label` is missing/empty, defaults to **"Book a Demo"**.
- If `message` is missing on a `booking_cta` payload, the bubble shows an empty string above the button — recommend always sending `message`.
- Multiple `booking_cta`s per reply are not supported — one CTA per assistant message.
- Batched user messages still produce a single assistant reply; CTA detection runs once per reply.
- Query params (`utm_source=website_chat`, `name`, `email`, `company`) should be appended in n8n directly to the URL — frontend forwards as-is.
- Do not auto-open: frontend will never navigate; user must click.
