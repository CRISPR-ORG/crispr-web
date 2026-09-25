/**
 * Official CRISPR Brand Lockup
 * Central Research Initiative & Student Public Relations, IIIT Nagpur
 *
 * Uses the authentic official logo proportions and true brand teal (#19A88F).
 * No artificial recoloring or distortion.
 */

// Exact bounding box of the central DNA helix inside the 501×498 master asset:
const MARK = { x: 196, y: 135, w: 108, h: 228, imgW: 501 }

export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number
  className?: string
}) {
  const scale = size / MARK.h
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
      style={{ width: Math.round(MARK.w * scale), height: size }}
      aria-hidden
    >
      <img
        src="/logo-white.png"
        alt=""
        style={{
          position: "absolute",
          width: Math.round(MARK.imgW * scale),
          maxWidth: "none",
          left: -Math.round(MARK.x * scale),
          top: -Math.round(MARK.y * scale),
        }}
      />
    </span>
  )
}

/**
 * Full official CRISPR emblem lockup with exact proportions.
 */
export function OfficialLogo({
  size = 56,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      <img
        src="/logo-white.png"
        alt="CRISPR - Central Research Initiative & Student Public Relations"
        className="w-auto object-contain"
        style={{ height: size, maxHeight: size }}
      />
    </div>
  )
}

export default function Logo({
  size = 30,
  showSuffix = true,
  className = "",
}: {
  size?: number
  showSuffix?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <div className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-bold tracking-[-0.03em] text-[#F2F2F2]">
          CRISPR
        </span>
        {showSuffix && (
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-[#777D7A] mt-0.5">
            IIIT Nagpur
          </span>
        )}
      </div>
    </div>
  )
}
