import React from 'react';

/**
 * Seamless day sky:
 * - One continuous gradient (no hard stops)
 * - Soft blurred radial-gradient "cloud" blobs spread across an oversized strip
 * - Two duplicated strips drift in opposite directions (alternate) so there is
 *   no snap-back and no repeating tile seam.
 */
const SkyBackground: React.FC = () => {
  // Reusable cloud-blob background. Multiple soft radial gradients at varied
  // positions/sizes/opacities — no tiling, no hard edges.
  const cloudBlobs: React.CSSProperties = {
    backgroundImage: [
      'radial-gradient(ellipse 38% 22% at 8% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 30% 18% at 22% 65%, rgba(255,255,255,0.40), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 42% 24% at 38% 22%, rgba(255,255,255,0.50), rgba(255,255,255,0) 72%)',
      'radial-gradient(ellipse 26% 16% at 50% 78%, rgba(255,255,255,0.35), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 44% 26% at 65% 40%, rgba(255,255,255,0.55), rgba(255,255,255,0) 72%)',
      'radial-gradient(ellipse 30% 18% at 78% 70%, rgba(255,255,255,0.40), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 36% 22% at 90% 28%, rgba(255,255,255,0.50), rgba(255,255,255,0) 72%)',
    ].join(', '),
    filter: 'blur(28px)',
    willChange: 'transform',
  };

  const cloudBlobsAlt: React.CSSProperties = {
    backgroundImage: [
      'radial-gradient(ellipse 34% 20% at 12% 55%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 40% 22% at 30% 25%, rgba(255,255,255,0.50), rgba(255,255,255,0) 72%)',
      'radial-gradient(ellipse 28% 18% at 48% 60%, rgba(255,255,255,0.38), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 46% 26% at 68% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 72%)',
      'radial-gradient(ellipse 32% 20% at 84% 62%, rgba(255,255,255,0.42), rgba(255,255,255,0) 70%)',
      'radial-gradient(ellipse 30% 18% at 95% 40%, rgba(255,255,255,0.40), rgba(255,255,255,0) 70%)',
    ].join(', '),
    filter: 'blur(34px)',
    willChange: 'transform',
  };

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Continuous sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #1a6eb5 0%, #3d9bd4 45%, #87CEEB 80%, #b8dff0 100%)',
        }}
      />

      {/* Cloud layer 1 — wide drifting strip, slow */}
      <div
        className="cloud-strip-slow absolute"
        style={{
          top: '-10%',
          left: '-50%',
          width: '200%',
          height: '120%',
          ...cloudBlobs,
        }}
      />

      {/* Cloud layer 2 — alternate direction, even slower, softer */}
      <div
        className="cloud-strip-slower absolute"
        style={{
          top: '-15%',
          left: '-50%',
          width: '200%',
          height: '130%',
          opacity: 0.85,
          ...cloudBlobsAlt,
        }}
      />

      {/* Bottom atmospheric haze */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: '12%',
          background:
            'linear-gradient(to top, rgba(220,235,245,0.55), transparent)',
        }}
      />
    </div>
  );
};

export default SkyBackground;
