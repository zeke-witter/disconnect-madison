import Image from "next/image";

/**
 * Brand logo system. Renders the correct pre-colored SVG variant from
 * public/brand/logos/ and enforces clear-space via a padding wrapper.
 *
 * Variant guide (see BRAND.md):
 *  - primary   Full lockup, Forest. Default on Cream backgrounds.
 *  - secondary Stacked lockup, Forest. Secondary placements.
 *  - wordmark  Type-only, Forest. Tight horizontal spaces.
 *  - icon      Mark only, Forest. Compact / app-icon contexts.
 *  - mono      Single-color (black) lockup. Single-ink print.
 *  - inverted  Light-on-dark lockup (white). On Forest / photo backgrounds.
 */

type Variant = "primary" | "secondary" | "wordmark" | "icon" | "mono" | "inverted";

// Intrinsic aspect ratios come from each SVG's viewBox.
const VARIANTS: Record<Variant, { src: string; width: number; height: number }> = {
  primary:   { src: "/brand/logos/Primary Logo.svg",   width: 2000, height: 690 },
  secondary: { src: "/brand/logos/Secondary Logo.svg", width: 2000, height: 1657 },
  wordmark:  { src: "/brand/logos/Wordmark.svg",       width: 2000, height: 906 },
  icon:      { src: "/brand/logos/Icon.svg",           width: 2000, height: 2000 },
  mono:      { src: "/brand/logos/Monochrome.svg",     width: 2000, height: 690 },
  inverted:  { src: "/brand/logos/Inverted.svg",       width: 2000, height: 690 },
};

type LogoProps = {
  variant?: Variant;
  /** Rendered height in px; width scales to preserve aspect ratio. */
  height?: number;
  /** Accessible name. Empty string marks the logo decorative (use when adjacent text names it). */
  alt?: string;
  /** Extra classes on the <img> (e.g. responsive height utilities). */
  className?: string;
  /** Disable the clear-space padding wrapper. */
  bare?: boolean;
  priority?: boolean;
};

export default function Logo({
  variant = "primary",
  height = 48,
  alt = "Disconnect Madison",
  className = "",
  bare = false,
  priority = false,
}: LogoProps) {
  const { src, width: w, height: h } = VARIANTS[variant];
  const width = Math.round((w / h) * height);

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto ${className}`}
      style={{ height, width }}
    />
  );

  if (bare) return img;

  // Clear-space: minimum margin equal to ~25% of the mark height on all sides.
  return <span className="inline-flex" style={{ padding: Math.round(height * 0.25) }}>{img}</span>;
}
