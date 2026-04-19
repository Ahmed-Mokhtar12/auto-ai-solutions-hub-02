

## Make the hero sky fully seamless and natural-looking

### What is causing the visible lines now
The current day sky uses SVG `feTurbulence` cloud layers tiled across a full-screen `<svg>`. Even though the horizontal motion was made loop-safe, this setup can still create visible horizontal banding or rectangular seam artifacts from how the filtered areas are rasterized and repeated. That matches the 3 horizontal lines visible in the screenshot.

### Implementation approach
Replace the current day-mode cloud rendering with a softer, non-tiled sky system that does not rely on SVG turbulence patterns.

1. **Keep a single smooth sky gradient**
   - Preserve the realistic blue sky feel, but refine the gradient stops so the background reads as one continuous sky from top to bottom.
   - No hard stop transitions.

2. **Replace SVG turbulence clouds with blurred gradient cloud layers**
   - Build clouds from several oversized, low-opacity radial gradients / blurred cloud blobs.
   - Spread them across the viewport with different scales and opacities so they feel organic instead of repeated.
   - Use soft masking and blur so there are no hard edges, no horizontal bands, and no tile boundaries.

3. **Use subtle drift animation without visible reset**
   - Animate the cloud groups very slowly with gentle horizontal drift.
   - Use mirrored/alternate motion or duplicated oversized groups so the motion never snaps and never exposes a repeated seam.
   - Keep motion minimal so the result feels like a natural sky, not an obvious animated texture.

4. **Preserve the rest of the page**
   - Keep night mode unchanged.
   - Keep the existing day-mode readability pattern, haze feel, and overall hero composition unchanged.
   - Only improve the day sky rendering.

### Files to update
- `src/components/SkyBackground.tsx`
  - Remove the current SVG turbulence/pattern cloud system.
  - Rebuild the day background with:
    - one continuous sky gradient layer
    - multiple soft blurred cloud overlays
    - subtle atmospheric haze
- `src/index.css`
  - Replace the current cloud drift animation classes with simpler slow-drift keyframes for the new cloud groups.
  - Keep reduced-motion support.

### QA
- Day mode shows no horizontal lines, no rectangular seams, and no tiling artifacts.
- Sky looks smooth and realistic behind the hero content.
- Cloud movement feels gentle and continuous, with no visible jump at any loop boundary.
- Night mode remains exactly as it is now.
- Check desktop and mobile widths to make sure no new seams appear at different viewport sizes.

### Technical notes
I would intentionally move away from `feTurbulence` here, because the issue is visual naturalness and seam-free rendering, not just loop timing. Large blurred gradient-based cloud layers are more controllable, lighter, and much less likely to produce the horizontal band artifacts visible in the current implementation.

