/**
 * A cylinder filling up, used as the route-transition state.
 *
 * ── Why this is not a startup splash ────────────────────────────────────────
 *
 * A splash screen on first load would *hold back* content that is already
 * there. This site's entire pitch is that it turns up fast on a workshop 4G
 * connection; making a buyer watch an animation before they can read the phone
 * number would trade the thing that matters for the thing that looks nice.
 *
 * So it runs where there is genuinely a wait to fill: Next renders this while a
 * route's assets are still in flight. On a fast connection it barely appears —
 * which is correct. It is honest feedback, not decoration.
 *
 * Motion is CSS-only (no JS, no library) and stops entirely under
 * `prefers-reduced-motion`, where the cylinder simply shows as filled.
 */
export function FillingCylinder({
  className = "",
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-5 ${className}`}
      role="status"
      aria-live="polite"
    >
      <svg
        viewBox="0 0 100 260"
        className="h-40 w-auto"
        aria-hidden
        focusable="false"
      >
        <defs>
          {/* Clips the rising fill to the cylinder's interior, so the liquid
              follows the domed shoulder instead of overrunning it. */}
          <clipPath id="fc-body">
            <path
              d="M22 240 L22 74 C22 53 34 40 50 40 C66 40 78 53 78 74 L78 240
                 Q78 248 70 248 L30 248 Q22 248 22 240 Z"
            />
          </clipPath>
          <linearGradient id="fc-steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#20262a" />
            <stop offset="24%" stopColor="#39434a" />
            <stop offset="44%" stopColor="#4c575e" />
            <stop offset="72%" stopColor="#2e363b" />
            <stop offset="100%" stopColor="#191e21" />
          </linearGradient>
        </defs>

        {/* Valve, neck, neck ring */}
        <rect x="38" y="6" width="24" height="15" rx="2.5" fill="#5c666d" />
        <rect x="60" y="10" width="11" height="6" rx="2" fill="#5c666d" />
        <circle cx="50" cy="5" r="3" fill="#79848b" />
        <rect x="42" y="20" width="16" height="15" fill="#4a545a" />
        <rect x="38" y="32" width="24" height="6" rx="1.5" fill="#6c767c" />

        {/* Empty body */}
        <path
          d="M22 240 L22 74 C22 53 34 40 50 40 C66 40 78 53 78 74 L78 240
             Q78 248 70 248 L30 248 Q22 248 22 240 Z"
          fill="url(#fc-steel)"
        />

        {/* The fill. Rises from the base, in the brand red. */}
        <g clipPath="url(#fc-body)">
          <rect
            className="fc-fill"
            x="18"
            y="0"
            width="64"
            height="260"
            fill="var(--color-brand)"
          />
        </g>

        {/* Outline drawn last so the fill never spills past the edge. */}
        <path
          d="M22 240 L22 74 C22 53 34 40 50 40 C66 40 78 53 78 74 L78 240
             Q78 248 70 248 L30 248 Q22 248 22 240 Z"
          fill="none"
          stroke="#5c666d"
          strokeWidth="2"
        />
      </svg>

      <span className="text-sm text-dim">{label}</span>

      <style>{`
        /* Translating a full-height rect is cheaper than animating height or
           y — it stays on the compositor and never triggers layout. */
        .fc-fill {
          transform: translateY(100%);
          animation: fc-rise 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes fc-rise {
          0%   { transform: translateY(100%); }
          55%  { transform: translateY(18%); }
          100% { transform: translateY(18%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .fc-fill {
            animation: none;
            transform: translateY(18%);
          }
        }
      `}</style>
    </div>
  );
}
