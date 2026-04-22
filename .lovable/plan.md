

## Lock down n8n backend tables (fix `broad_n8n_table_access`)

### Background

The site has **no end-user authentication** — it's fully public. The flagged tables (`n8n_chat_histories`, `Conducted Training`, `N8N_2S`, plus the related `Chat History`, `LongTermMemory`, `Hotel Reviews`, `Info Summary`) are written and read **only by your n8n workflows** using the Supabase service-role key, which bypasses RLS entirely. No browser code touches them (verified — `src/` has zero Supabase queries against them).

That means the safest correct policy is: **deny all access to the `anon` and `authenticated` roles**. n8n keeps working because the service role ignores RLS.

### Migration — drop permissive policies, keep RLS enabled with no public policies

Create a new migration that:

1. Drops every existing permissive policy on these tables:
   - `n8n_chat_histories` — "Only authenticated users can read/insert n8n chat histories"
   - `Conducted Training` — "Only authenticated users can read conducted training"
   - `N8N_2S` — "Only authenticated users can read/insert N8N_2S"
   - `Chat History` — "Users can view/insert own chat history" (dead policies, no client uses them)
   - `LongTermMemory` — "Users can view/insert own long term memory"
   - `Hotel Reviews` — "Anyone can read hotel reviews"
   - `Info Summary` — "Anyone can read info summary"

2. Confirms `ENABLE ROW LEVEL SECURITY` on all seven tables (already on, re-asserted defensively).

3. Adds explicit `REVOKE ALL ... FROM anon, authenticated` on each table for defense-in-depth, so even if a future policy is added by mistake, the role-level grant is gone.

Result: With RLS enabled and no policies, `anon` and `authenticated` get zero rows. The n8n service-role connection is unaffected and continues to read/write normally.

### Files changed

- `supabase/migrations/<timestamp>_lock_down_n8n_tables.sql` — new migration (drops + revokes described above).

### After applying

- Mark the `broad_n8n_table_access` finding as fixed via `security--manage_security_finding`.
- Run `security--run_security_scan` to confirm no remaining warnings on these tables.
- No frontend changes — the chat widget posts to the n8n webhook (`WEBHOOK_URL`), not Supabase, so behavior is unchanged.

### Verification checklist

- Open the site, send a chat message → reply still arrives (n8n unaffected).
- Security scan re-run shows the finding cleared.

