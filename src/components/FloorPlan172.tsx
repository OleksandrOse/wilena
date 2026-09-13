export function FloorPlan172() {
  return (
    <div className="rp-floorplan__diagram">
      <svg viewBox="0 0 600 590" className="rp-floorplan__svg" role="img" aria-label="Grundriss der Wohnung (gespiegelt)">
        <defs>
          <pattern id="terraceHatch2" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(26,22,18,0.12)" strokeWidth="1" />
          </pattern>
        </defs>

        <g transform="translate(600,0) scale(-1,1)">
          {/* Balkon */}
          <rect x="60" y="520" width="500" height="50" fill="url(#terraceHatch2)" />
          <line x1="60" y1="520" x2="60" y2="570" stroke="#1a1612" strokeWidth="4" />
          <line x1="560" y1="520" x2="560" y2="570" stroke="#1a1612" strokeWidth="4" />
          <g transform="translate(310,0) scale(-1,1) translate(-310,0)">
            <text x="310" y="555" textAnchor="middle" className="rp-floorplan__terrace-label">BALKON</text>
          </g>

          {/* Room fills */}
          <rect x="60" y="60" width="340" height="140" fill="#fdfbf6" />
          <rect x="400" y="60" width="160" height="140" fill="#eef1ee" />
          <rect x="60" y="200" width="250" height="320" fill="#faf8f4" />
          <rect x="310" y="200" width="250" height="320" fill="#faf8f4" />

          {/* Outer walls */}
          <g stroke="#1a1612" strokeWidth={5} strokeLinecap="square">
            <line x1="60" y1="60" x2="250" y2="60" />
            <line x1="300" y1="60" x2="560" y2="60" />
            <line x1="60" y1="60" x2="60" y2="520" />
            <line x1="560" y1="60" x2="560" y2="520" />
            <line x1="60" y1="520" x2="110" y2="520" />
            <line x1="170" y1="520" x2="450" y2="520" />
            <line x1="510" y1="520" x2="560" y2="520" />
          </g>

          {/* Interior walls */}
          <g stroke="#1a1612" strokeWidth={3.5} strokeLinecap="square">
            <line x1="400" y1="60" x2="400" y2="140" />
            <line x1="400" y1="190" x2="400" y2="200" />
            <line x1="60" y1="200" x2="220" y2="200" />
            <line x1="400" y1="200" x2="560" y2="200" />
            <line x1="310" y1="200" x2="310" y2="520" />
          </g>

          {/* Door swings */}
          <g stroke="#c9a24d" strokeWidth={1.6} fill="none">
            <path d="M250,60 L250,110 M300,60 A50,50 0 0 0 250,110" />
            <path d="M400,140 L450,140 M400,190 A50,50 0 0 1 450,140" />
            <path d="M220,200 L220,260 M280,200 A60,60 0 0 0 220,260" />
            <path d="M400,200 L400,260 M340,200 A60,60 0 0 1 400,260" />
            <path d="M110,520 L110,460 M170,520 A60,60 0 0 1 110,460" />
            <path d="M510,520 L510,460 M450,520 A60,60 0 0 0 510,460" />
          </g>

          {/* Labels (un-mirrored so text reads normally) */}
          <g className="rp-floorplan__room-label">
            <g transform="translate(140,0) scale(-1,1) translate(-140,0)">
              <text x="140" y="135" textAnchor="middle">KÜCHE</text>
            </g>
            <g transform="translate(310,0) scale(-1,1) translate(-310,0)">
              <text x="310" y="135" textAnchor="middle">VORRAUM</text>
            </g>
            <g transform="translate(480,0) scale(-1,1) translate(-480,0)">
              <text x="480" y="130" textAnchor="middle">BAD</text>
            </g>

            <g transform="translate(170,0) scale(-1,1) translate(-170,0)">
              <text x="170" y="355" textAnchor="middle">WOHN-</text>
              <text x="170" y="375" textAnchor="middle">ESSZIMMER</text>
            </g>

            <g transform="translate(450,0) scale(-1,1) translate(-450,0)">
              <text x="450" y="355" textAnchor="middle">SCHLAF-</text>
              <text x="450" y="375" textAnchor="middle">ZIMMER</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
