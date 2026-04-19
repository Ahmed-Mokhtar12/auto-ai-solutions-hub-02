import React from 'react';

const SkyBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Layer A — sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #1a6eb5 0%, #3d9bd4 40%, #87CEEB 75%, #b8dff0 100%)',
        }}
      />

      {/* Layer B — SVG turbulence clouds */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cloud-filter-a" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.012"
              numOctaves="4"
              seed="2"
            />
            <feColorMatrix
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 1.05 -0.55"
            />
          </filter>
          <filter id="cloud-filter-b" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0025 0.010"
              numOctaves="4"
              seed="7"
            />
            <feColorMatrix
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 1.0 -0.6"
            />
          </filter>
          <filter id="cloud-filter-c" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.014"
              numOctaves="4"
              seed="13"
            />
            <feColorMatrix
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 1.05 -0.5"
            />
          </filter>
        </defs>

        <g className="cloud-drift-a" style={{ transformBox: 'fill-box' }}>
          <rect x="0" y="0" width="200%" height="100%" filter="url(#cloud-filter-a)" />
        </g>
        <g className="cloud-drift-b" style={{ transformBox: 'fill-box' }}>
          <rect x="0" y="0" width="200%" height="100%" filter="url(#cloud-filter-b)" />
        </g>
        <g className="cloud-drift-c" style={{ transformBox: 'fill-box' }}>
          <rect x="0" y="0" width="200%" height="100%" filter="url(#cloud-filter-c)" />
        </g>
      </svg>

      {/* Layer C — bottom atmospheric haze */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: '8%',
          background:
            'linear-gradient(to top, rgba(220,235,245,0.4), transparent)',
        }}
      />
    </div>
  );
};

export default SkyBackground;
