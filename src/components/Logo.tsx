/**
 * Brand lockup.
 *
 * The supplied /logo.png is a square lockup — dark-grey "CRISPR" letterforms,
 * a teal helix, and a small tagline. On a black navbar the grey type is close
 * to invisible and the tagline turns to mush below ~40px. So we crop to the
 * helix alone, tune it into the CRISPR green, and set the wordmark in type.
 */

// Helix bounding box inside the 501×498 source, measured off the pixels:
// the teal strokes span x 197–303, y 136–363. Cropping to exactly that keeps
// the grey "I" and "S" letterforms out of the mark.
const MARK = { x: 197, y: 136, w: 106, h: 227, imgW: 501 }

export function LogoMark({ size = 28 }: { size?: number }) {
  const scale = size / MARK.h
  return (
    <span
      className="relative block shrink-0 overflow-hidden"
      style={{ width: MARK.w * scale, height: size }}
      aria-hidden
    >
      <img
        src="/logo.png"
        alt=""
        style={{
          position: "absolute",
          width: MARK.imgW * scale,
          maxWidth: "none",
          left: -MARK.x * scale,
          top: -MARK.y * scale,
          // Source teal is rgb(40,163,144) (~173°); pull it onto the CRISPR green.
          filter: "brightness(1.3) saturate(2.4) hue-rotate(-46deg)",
        }}
      />
    </span>
  )
}

export default function Logo({
  size = 28,
  showSuffix = true,
}: {
  size?: number
  showSuffix?: boolean
}) {
  return (
    <>
      <LogoMark size={size} />
      <span className="text-[1.0625rem] font-bold tracking-[-0.03em] text-[color:var(--color-fg)]">
        CRISPR
      </span>
      {showSuffix && (
        <>
          <span className="hidden h-3 w-px bg-[color:var(--line-strong)] md:block" />
          <span className="t-mono hidden whitespace-nowrap md:block">
            IIIT Nagpur
          </span>
        </>
      )}
    </>
  )
}
