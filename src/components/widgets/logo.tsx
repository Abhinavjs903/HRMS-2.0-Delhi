export function NagarSetuLogo({ size = 48, showText = false }: { size?: number; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {/* Official MCD Delhi HRMS Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer Circle */}
        <circle cx="60" cy="60" r="58" fill="#6B21A8" opacity="0.1" stroke="#6B21A8" strokeWidth="2" />

        {/* Inner Circle */}
        <circle cx="60" cy="60" r="50" fill="#6B21A8" opacity="0.05" />

        {/* Central Flower/Star Shape - representing community */}
        <g transform="translate(60, 60)">
          {/* Center circle */}
          <circle cx="0" cy="0" r="8" fill="#6B21A8" />

          {/* 8 petals/points */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 12;
            const y1 = Math.sin(rad) * 12;
            const x2 = Math.cos(rad) * 24;
            const y2 = Math.sin(rad) * 24;

            return (
              <g key={angle}>
                {/* Line */}
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6B21A8" strokeWidth="2" />
                {/* Circle at tip */}
                <circle cx={x2} cy={y2} r="4" fill="#6B21A8" />
              </g>
            );
          })}
        </g>

        {/* Text circle arc - Nagar Setu */}
        <defs>
          <path
            id="circlePath"
            d="M 30, 60 A 30, 30 0 0, 1 90, 60"
            fill="none"
          />
          <style>{`
            .logo-text { font-size: 8px; font-weight: bold; fill: #6B21A8; letter-spacing: 1px; }
          `}</style>
        </defs>
        <text className="logo-text" letterSpacing="2">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            NAGAR SETU
          </textPath>
        </text>

        {/* Bottom text arc - MCD HRMS */}
        <defs>
          <path
            id="circlePath2"
            d="M 90, 60 A 30, 30 0 0, 1 30, 60"
            fill="none"
          />
        </defs>
        <text className="logo-text" letterSpacing="1" fontSize="7">
          <textPath href="#circlePath2" startOffset="50%" textAnchor="middle">
            HRMS PORTAL
          </textPath>
        </text>
      </svg>

      {showText && (
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-tight text-foreground">Nagar Setu</p>
          <p className="text-xs text-muted-foreground">MCD · HRMS</p>
        </div>
      )}
    </div>
  );
}

export function NagarSetuLogoLarge() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Large centered logo */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer Circle */}
        <circle cx="100" cy="100" r="95" fill="#6B21A8" opacity="0.08" stroke="#6B21A8" strokeWidth="3" />

        {/* Inner decorative circle */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="#6B21A8" strokeWidth="1.5" opacity="0.3" strokeDasharray="5,5" />

        {/* Central Flower/Star Shape */}
        <g transform="translate(100, 100)">
          {/* Center circle - larger */}
          <circle cx="0" cy="0" r="14" fill="#6B21A8" />
          <circle cx="0" cy="0" r="10" fill="white" />
          <circle cx="0" cy="0" r="6" fill="#6B21A8" />

          {/* 8 petals/community points */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 18;
            const y1 = Math.sin(rad) * 18;
            const x2 = Math.cos(rad) * 45;
            const y2 = Math.sin(rad) * 45;

            return (
              <g key={angle}>
                {/* Connection line */}
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6B21A8" strokeWidth="2.5" opacity="0.6" />
                {/* Community circle at tip */}
                <circle cx={x2} cy={y2} r="8" fill="#6B21A8" opacity="0.8" />
                <circle cx={x2} cy={y2} r="5" fill="white" />
              </g>
            );
          })}
        </g>

        {/* Top text - curved */}
        <defs>
          <path
            id="topArc"
            d="M 40, 100 A 60, 60 0 0, 1 160, 100"
            fill="none"
          />
        </defs>
        <text
          fill="#6B21A8"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="3"
          fontFamily="system-ui, sans-serif"
        >
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            MUNICIPAL CORPORATION
          </textPath>
        </text>

        {/* Bottom text - curved */}
        <defs>
          <path
            id="bottomArc"
            d="M 160, 100 A 60, 60 0 0, 1 40, 100"
            fill="none"
          />
        </defs>
        <text
          fill="#6B21A8"
          fontSize="16"
          fontWeight="bold"
          letterSpacing="2"
          fontFamily="system-ui, sans-serif"
        >
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            HRMS PORTAL
          </textPath>
        </text>

        {/* Center text */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fill="#6B21A8"
          fontSize="32"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          DELHI
        </text>
      </svg>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Nagar Setu</h2>
        <p className="text-sm text-muted-foreground">Human Resource Management System</p>
        <p className="text-xs text-muted-foreground mt-1">Municipal Corporation of Delhi</p>
      </div>
    </div>
  );
}
