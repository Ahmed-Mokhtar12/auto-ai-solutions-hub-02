

## Deliver Hostinger deploy guide as a Markdown file

### What you'll get
A single downloadable Markdown file with the full Hostinger deployment plan (the `.htaccess` content + step-by-step upload instructions).

### Action
Generate `/mnt/documents/HOSTINGER_DEPLOY.md` containing:

1. **Why the site is broken** — `src/` was uploaded instead of the built `dist/`; Hostinger can't compile `.tsx`.
2. **`public/.htaccess` contents** to add to the project (SPA fallback, MIME types for `.js`/`.mjs`/`.css`, gzip, long-cache for `/assets/*`, no-cache for `index.html`).
3. **Deployment steps**:
   - `npm install`
   - `npm run build`
   - Upload **contents** of `dist/` (not the folder) into `public_html/`
   - Include hidden `.htaccess` (enable "Show hidden files")
   - Hard refresh (Ctrl/Cmd + Shift + R)
4. **Troubleshooting** — subfolder deploys need `base: '/subfolder/'` in `vite.config.ts`; verify `index.html` + `/assets/` sit directly under `public_html/`.
5. **What's NOT changed** — `index.html`, `vite.config.ts`, routing already correct.

### Delivery
The file will be attached as a downloadable artifact you can save or share.

