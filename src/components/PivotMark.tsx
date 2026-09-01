/**
 * The Pivot Prime mark, in one place.
 *
 * WHY THIS FILE EXISTS. There were two logos on the site and they were not the
 * same logo. The header carried this one, sixteen rectangles on a 36x35
 * viewBox, in neon. The footer carried a hand-built 3x3 CSS grid of nine
 * squares in mid green at nine descending opacities, which is not the mark at
 * all: it was an approximation that was never replaced, and it read as a
 * fading checkerboard beside the real thing. Her instruction on 1 September is
 * that the header one is correct and the footer must match it.
 *
 * Defined once and imported by both, so the two cannot drift again.
 * PENDING-COPY 1d7.
 *
 * The colour comes from `currentColor`, so the caller sets it with a text
 * class, exactly as the header already did.
 */
export default function PivotMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M24.711 0.003H18.048V6.581H24.711V0.003Z" fill="currentColor" />
      <path d="M13.533 0H8.056V5.407H13.533V0Z" fill="currentColor" />
      <path d="M24.117 10.927H18.64V16.334H24.117V10.927Z" fill="currentColor" />
      <path d="M23.407 21.489H19.349V25.496H23.407V21.489Z" fill="currentColor" />
      <path d="M13.052 11.627H8.993V15.634H13.052V11.627Z" fill="currentColor" />
      <path d="M12.598 21.715H9V25.267H12.598V21.715Z" fill="currentColor" />
      <path d="M3.34 11.988H0.01V15.276H3.34V11.988Z" fill="currentColor" />
      <path d="M23.042 31.713H19.712V35H23.042V31.713Z" fill="currentColor" />
      <path d="M35.528 31.713H32.198V35H35.528V31.713Z" fill="currentColor" />
      <path d="M3.33 0.213H0V3.5H3.33V0.213Z" fill="currentColor" />
      <path d="M2.872 22.073H0V24.909H2.872V22.073Z" fill="currentColor" />
      <path d="M12.257 31.948H9.385V34.784H12.257V31.948Z" fill="currentColor" />
      <path d="M1.977 32.851H0.02V34.784H1.977V32.851Z" fill="currentColor" />
      <path d="M35.531 10.343H28.868V16.921H35.531V10.343Z" fill="currentColor" />
      <path d="M35.528 20.789H30.051V26.196H35.528V20.789Z" fill="currentColor" />
      <path d="M35.531 0.003H28.868V6.581H35.531V0.003Z" fill="currentColor" />
    </svg>
  );
}
