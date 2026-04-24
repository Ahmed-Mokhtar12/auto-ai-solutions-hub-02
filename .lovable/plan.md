Yes, I understand. The laptop/desktop view will keep the current mouse-hover behavior. On mobile and tablet, the cards should appear automatically as the user scrolls down to them.

Plan:

1. Update the shared card reveal wrapper
   - Modify `HoverVisibleContainer` so it supports two behaviors:
     - Desktop/laptop: keep existing hover-to-show behavior.
     - Mobile/tablet: use scroll visibility instead of mouse hover.

2. Add tablet + mobile scroll detection
   - Use an `IntersectionObserver` inside `HoverVisibleContainer` for viewports below the desktop breakpoint.
   - When a card enters the viewport while scrolling, fade/scale it into view.
   - Keep it visible after it appears so users do not have to hover or tap.

3. Preserve desktop behavior exactly
   - For desktop widths, keep `onMouseEnter` / `onMouseLeave` and the existing auto-hide delay.
   - No change to laptop/computer hover behavior.

4. Apply automatically to all existing cards using this wrapper
   - This will affect the existing card sections already using `HoverVisibleContainer`, including hero CTA cards, services cards, industry cards, process cards, testimonials, and social proof cards.
   - No need to rewrite each individual section.

Technical details:

- Current mobile behavior renders cards directly and always visible. I will replace that mobile-only shortcut with scroll-based reveal.
- I will likely use a breakpoint such as `< 1024px` for mobile/tablet scroll reveal, matching the current tablet header behavior.
- Desktop/laptop `>= 1024px` will remain hover-based.
- The animation will reuse the existing classes: hidden state `opacity-0 scale-95`, visible state `opacity-100 scale-100`, with the same smooth transition style.