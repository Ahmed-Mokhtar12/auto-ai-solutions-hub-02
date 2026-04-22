

## Pre-upload verification page

### What it does
A standalone HTML page (`public/verify-deploy.html`) you open **after building** to confirm `dist/` is upload-ready. It runs entirely client-side — no server needed.

### Checks performed
1. **`index.html` exists** and is reachable at `/index.html`.
2. **No `/src/main.tsx` reference** — fails if the dev script tag is still present.
3. **Compiled `/assets/*.js` reference present** with hash pattern (`index-[hash].js`).
4. **Compiled `/assets/*.css` reference present**.
5. **Each referenced asset returns HTTP 200** (HEAD request) with correct MIME (`application/javascript`, `text/css`).
6. **`.htaccess` is shipped** — fetches `/.htaccess`; on Hostinger Apache will block it (403) which **counts as present**; 404 = missing.
7. **SPA fallback works** — fetches a random non-existent path (`/__verify_deploy_spa_check__`) and confirms the response is the SPA `index.html` (contains `<div id="root">`).

### UI
- Single page, no dependencies, inline CSS matching the navy/gold aesthetic.
- Each check shows ✅ pass / ❌ fail / ⚠️ warning + short explanation.
- Final banner: **"Ready to deploy"** or **"Fix issues before uploading"**.
- Link at bottom: "Delete this file before going live" reminder.

### Usage
After `npm run build`, open `https://yourdomain.com/verify-deploy.html` once uploaded — or test locally with `npx serve dist`. Delete the file from `public_html/` after verification.

### Files
- **New:** `public/verify-deploy.html` (self-contained, ~150 lines HTML+JS+CSS)

### Not changed
No app code, routing, or build config touched. The file is pure static HTML and is copied into `dist/` automatically by Vite.

