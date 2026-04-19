import React from 'react';
import skyBase from '@/assets/sky-base.jpg';
import cloudsLayer1 from '@/assets/clouds-layer-1.png';
import cloudsLayer2 from '@/assets/clouds-layer-2.png';

const SkyBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Photographic sky base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${skyBase})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Cloud layer 1 — primary wispy cirrus, slow drift */}
      <div
        className="absolute inset-0 cloud-drift-1"
        style={{
          backgroundImage: `url(${cloudsLayer1})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          opacity: 0.85,
          mixBlendMode: 'screen',
        }}
      />

      {/* Cloud layer 2 — sparser, slower for parallax depth */}
      <div
        className="absolute inset-0 cloud-drift-2"
        style={{
          backgroundImage: `url(${cloudsLayer2})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          opacity: 0.6,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default SkyBackground;
