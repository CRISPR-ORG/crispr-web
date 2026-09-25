import { useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#"

/**
 * Decodes text one character at a time, cycling random glyphs before each
 * letter settles. Fires when the element scrolls into view.
 *
 * Renders the finished string on the server / with motion disabled, so the
 * content is never dependent on the animation running.
 */
export default function Scramble({
  text,
  className = "",
  as: Tag = "span",
  speed = 34,
  stagger = 2.2,
  start = true,
}: {
  text: string
  className?: string
  as?: "span" | "h1" | "h2" | "h3" | "div"
  speed?: number
  stagger?: number
  start?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const [out, setOut] = useState(text)
  const [settled, setSettled] = useState(true)
  const ran = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !start) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const run = () => {
      if (ran.current) return
      ran.current = true
      setSettled(false)

      const chars = text.split("")
      let frame = 0
      let raf = 0

      const tick = () => {
        const next = chars
          .map((c, i) => {
            if (c === " ") return " "
            const startAt = i * stagger
            const endAt = startAt + 8
            if (frame >= endAt) return c
            if (frame < startAt) return ""
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")

        setOut(next)
        frame += 1

        if (frame > chars.length * stagger + 8) {
          setOut(text)
          setSettled(true)
          return
        }
        raf = (window.setTimeout(() => {
          raf = requestAnimationFrame(tick)
        }, speed) as unknown as number)
      }

      tick()
      return () => cancelAnimationFrame(raf)
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, speed, stagger, start])

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ color: settled ? undefined : "var(--color-crispr)" }}
    >
      {out}
    </Tag>
  )
}
