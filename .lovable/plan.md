
## Fix Chat Bar Webhook Connection

### What's broken

There are two issues in the current code:

1. **Wrong URL**: `src/hooks/chat/useChatApi.ts` calls `/api/chat` — a relative local path that doesn't exist. The real webhook URL defined in `constants.ts` is never imported or used.
2. **Old URL in constants**: `constants.ts` still has the old webhook `https://n8n-2seasons-u38985.vm.elestio.app/webhook/Website` instead of your new production one.

### What will be fixed

**File 1 — `src/hooks/chat/constants.ts`**
- Update `WEBHOOK_URL` to: `https://n8n.srv1095066.hstgr.cloud/webhook/Website`

**File 2 — `src/hooks/chat/useChatApi.ts`**
- Import `WEBHOOK_URL` from constants
- Replace `fetch('/api/chat', ...)` with `fetch(WEBHOOK_URL, ...)`
- Add a content-type check to handle cases where the webhook returns HTML instead of JSON (e.g. errors), preventing a cryptic crash
- Handle multiple common N8N response formats: `{ reply }`, `{ output }`, `{ message }`, and plain text responses — so it works regardless of how N8N is configured to respond

### Technical details

```text
Current (broken):                    Fixed:
fetch('/api/chat', ...)    →    fetch('https://n8n.srv1095066.hstgr.cloud/webhook/Website', ...)
                                with proper content-type validation
                                and flexible response parsing
```

No other files need to change — the routing, UI, and chat state management are all fine.
