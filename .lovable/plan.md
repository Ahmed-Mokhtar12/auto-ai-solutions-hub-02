

## Plan: Integrate VAPI Voice Call Button

Add a floating phone icon button next to the WhatsApp and chat buttons that starts a VAPI voice call with the AI assistant.

### What changes

**1. Add VAPI script to `index.html`**
- Add the VAPI web SDK script and config:
  ```html
  <script>
    window.vapiPublicKey = "0def23cd-0eff-4436-9295-e10b67221d11";
    window.assistantId = "ce112156-dae6-42ae-925a-c23db6110e70";
  </script>
  <script defer src="https://cdn.vapi.ai/web.js"></script>
  ```

**2. Create `src/hooks/useVapi.ts`**
- Custom hook to initialize the Vapi SDK, start/stop calls, and track call state (idle, connecting, active)
- Uses `window.vapiPublicKey` and `window.assistantId`

**3. Update `src/components/chat/ChatWidget.tsx`**
- Add a phone icon button (same `w-14 h-14` circle style) positioned to the left of the WhatsApp button
- Uses `useVapi` hook — clicking toggles the voice call on/off
- Shows a pulsing green indicator when call is active, red when connecting
- Position: `right-[10rem]` (left of WhatsApp at `right-[5.5rem]`, left of chat at `right-6`)

**4. Add type declarations in `src/vite-env.d.ts`**
- Declare `window.vapiPublicKey`, `window.assistantId`, and the Vapi class on the Window interface

### Technical details
- The VAPI public key `0def23cd-0eff-4436-9295-e10b67221d11` is a publishable key, safe to store in code
- Assistant ID: `ce112156-dae6-42ae-925a-c23db6110e70`
- Three floating buttons in a row: Phone → WhatsApp → Chat (right to left)

