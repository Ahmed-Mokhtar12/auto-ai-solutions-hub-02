---
name: Footer layout
description: In-flow footer at natural page bottom (no longer fixed)
type: design
---
Footer (`src/components/Footer.tsx`) is a normal in-flow element at the bottom of each page — NOT fixed. Pages use `min-h-screen flex flex-col` with `flex-grow` on `<main>` so the footer sits at the viewport bottom on short pages and below content on long pages. Do NOT add `pb-[Xvh]` to page wrappers; do NOT use `fixed` positioning on the footer.
