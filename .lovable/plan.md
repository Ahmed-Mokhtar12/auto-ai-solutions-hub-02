
The user's n8n webhook is returning a placeholder URL (`calendly.com/YOUR-CALENDLY-LINK`) which 404s. They want the chat CTA button to always use the real Calendly link used by "Request a Demo" across the site: `https://calendly.com/ahmed-mokhtar12/30min`.

## Plan: Force valid Calendly URL on chat CTA button

### Change

**`src/hooks/chat/useChatApi.ts`** — in `parseWebhookResponse`, when a `booking_cta` is detected:
- If the returned `button.url` is missing, invalid, or contains the placeholder string `YOUR-CALENDLY-LINK` (or doesn't point to a real calendly.com path), override it with the canonical URL: `https://calendly.com/ahmed-mokhtar12/30min`.
- Keep label fallback as `"Book a Demo"`.

### Why only this file
The button rendering in `ChatWidget.tsx` already correctly opens `cta.url` in a new tab. The bug is purely the URL value coming from n8n. Sanitizing it in the parser fixes every CTA without needing a backend change.

### Result
Clicking "Book a Demo" in the chat will open the same Calendly page as the header's "Request a Demo" button.
