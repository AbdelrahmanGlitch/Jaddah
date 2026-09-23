import { company } from "@/data/company";
import {
  LOGO_COLORS as C,
  bandPath,
  bodyPath,
  goldCapPath,
  markLoops,
  marksPath,
  planePath,
  planeTransform,
  tealPath,
  wordmarkDots,
  wordmarkPath,
} from "./logo-paths";

type Props = {
  className?: string;
  /**
   * Show the "Jeddah Tourism" line inside the badge.
   * Turn off at small sizes (navbar, favicon) where it would be illegible.
   */
  withText?: boolean;
  title?: string;
};

/** The Jeddah Tourism circular badge, drawn as inline SVG. */
export function LogoMark({ className, withText = true, title = `${company.displayName.ar} — ${company.name}` }: Props) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>

      {/* Badge */}
      <circle cx="512" cy="513" r="492" fill="#fff" stroke={C.gold} strokeWidth="29" />

      {/* Outlined Kufic wordmark — behind the calligraphy */}
      <path d={wordmarkPath} fill="none" stroke={C.gold} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <g fill={C.gold}>
        {wordmarkDots.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      {/* Navy calligraphy with globe */}
      <path d={bodyPath} fill={C.navy} />
      <path d={bandPath} fill={C.navy} />
      <path d={goldCapPath} fill={C.gold} stroke="#fff" strokeWidth="3" paintOrder="stroke" />
      <path d={tealPath} fill={C.teal} />

      {/* Wordmark stem that crosses in front of the calligraphy, and the gold dot */}
      <path d="M405.5 612V742" stroke={C.gold} strokeWidth="7" strokeLinecap="round" />
      <circle cx="780" cy="640" r="40" fill={C.gold} />

      {/* Airplane */}
      <path d={planePath} transform={planeTransform} fill={C.navy} />

      {/* Diacritic marks */}
      <g fill="none" stroke={C.gold} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d={marksPath} />
        {markLoops.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      {withText && (
        <text
          x="215"
          y="845"
          fill={C.gold}
          fontFamily="var(--font-manrope), Manrope, Arial, sans-serif"
          fontWeight="700"
          fontSize="50"
          textLength="636"
          lengthAdjust="spacing"
          direction="ltr"
        >
          {company.name}
        </text>
      )}
    </svg>
  );
}
