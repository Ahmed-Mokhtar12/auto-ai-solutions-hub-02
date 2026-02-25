

## Update Chat Webhook URL

### Change

One file to modify:

**`src/hooks/chat/constants.ts`** — Replace the current webhook URL:
- From: `https://n8n.srv1095066.hstgr.cloud/webhook/Website`
- To: `https://n8n-digitlab-u38985.vm.elestio.app/webhook/Website`

No other files reference this URL directly; the constant is imported everywhere it's needed.

