import type { ReactNode } from "react"

/**
 * Kinetic type band. The track is duplicated so the loop is seamless; the
 * copy is aria-hidden so screen readers hear the line once.
 */
export default function Marquee({
  items,
  duration = 34,
  reverse = false,
  className = "",
}: {
  items: string[]
  duration?: number
  reverse?: boolean
  className?: string
}) {
  // Each track must be at least as wide as the viewport or a gap opens at the
  // seam, so short lists get repeated until there is enough content.
  const repeat = Math.max(2, Math.ceil(12 / items.length))
  const filled = Array.from({ length: repeat }, () => items).flat()

  const track = (key: string, hidden: boolean): ReactNode => (
    <div className="marquee__track" key={key} aria-hidden={hidden || undefined}>
      {filled.map((item, i) => (
        <span className="marquee__item" key={`${key}-${i}`}>
          <span className={i % 2 === 1 ? "solid" : undefined}>{item}</span>
          <span className="marquee__dot" aria-hidden>
            ●
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {track("a", false)}
      {track("b", true)}
    </div>
  )
}
