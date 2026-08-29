import { useEffect, useRef, useState } from "react"

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "ok"; text: string }

const SCRIPT: Line[] = [
  { kind: "cmd", text: "ssh crispr@iiitn.ac.in" },
  { kind: "ok", text: "Connection established — 21.1°N 79.0°E" },
  { kind: "cmd", text: "crispr init --env production" },
  { kind: "out", text: "Mounting team · products · events · aira" },
  { kind: "ok", text: "10 projects · 2200+ students · 4 alumni" },
  { kind: "cmd", text: "crispr start" },
]

const CHAR_MS = 9
const CMD_CHAR_MS = 17
const LINE_GAP = 70
const HOLD_MS = 340

/**
 * Terminal boot screen. Plays on every full page load — it is short, and
 * skippable with any click or keypress. Skipped entirely under reduced motion.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([])
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const finished = useRef(false)

  const finish = useRef(() => {
    if (finished.current) return
    finished.current = true
    setLeaving(true)
    window.setTimeout(onDone, 700)
  })

  useEffect(() => {
    let li = 0
    let ci = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (li >= SCRIPT.length) {
        timer = setTimeout(() => finish.current(), HOLD_MS)
        return
      }
      const line = SCRIPT[li]
      const speed = line.kind === "cmd" ? CMD_CHAR_MS : CHAR_MS

      if (ci <= line.text.length) {
        const value = line.text.slice(0, ci)
        setShown((prev) => {
          const next = [...prev]
          next[li] = value
          return next
        })
        setActive(li)
        ci += 1
        timer = setTimeout(tick, speed)
      } else {
        li += 1
        ci = 0
        timer = setTimeout(tick, LINE_GAP)
      }
    }

    timer = setTimeout(tick, 180)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const skip = () => finish.current()
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [])

  const progress = Math.min(100, Math.round(((active + 1) / SCRIPT.length) * 100))
  const filled = Math.round((progress / 100) * 28)

  return (
    <div
      className="crt fixed inset-0 z-[100] flex flex-col justify-between bg-black px-6 py-6 md:px-10 md:py-8"
      style={{
        opacity: leaving ? 0 : 1,
        clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: "opacity 0.5s var(--ease), clip-path 0.7s var(--ease)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading CRISPR"
    >
      <span className="sweep" aria-hidden />

      {/* Top rail */}
      <div
        className="relative flex items-center justify-between pb-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[color:var(--color-fg-3)]"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <span className="accent">CRISPR</span>
        <span className="hidden sm:block">Central Research Initiative</span>
        <span>Booting</span>
      </div>

      {/* Terminal */}
      <div className="relative w-full max-w-3xl">
        <div
          className="font-mono text-[0.8125rem] leading-[2] sm:text-[0.9375rem]"
          style={{ minHeight: "13rem" }}
        >
          {SCRIPT.map((line, i) => {
            const text = shown[i]
            if (text === undefined) return null
            const color =
              line.kind === "cmd"
                ? "var(--color-crispr)"
                : line.kind === "ok"
                  ? "var(--color-crispr-light)"
                  : "var(--color-fg-2)"
            return (
              <div
                key={i}
                style={{ color, textShadow: "var(--glow-sm)" }}
                className="whitespace-pre-wrap break-words"
              >
                {line.kind === "cmd" && <span className="opacity-60">$ </span>}
                {line.kind === "ok" && <span>✓ </span>}
                {text}
                {i === active && <span className="caret">▌</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom rail: block progress */}
      <div className="relative">
        <div className="mb-3 flex items-center gap-4">
          <span
            className="font-mono text-[0.75rem] tracking-[0.08em] accent"
            aria-hidden
          >
            [{"█".repeat(filled)}
            <span className="opacity-25">{"░".repeat(28 - filled)}</span>]
          </span>
          <span className="font-mono text-[0.75rem] tabular-nums accent">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
        <div className="flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[color:var(--color-fg-3)]">
          <span>Press any key to skip</span>
          <span>IIIT Nagpur</span>
        </div>
      </div>
    </div>
  )
}

/** Boot plays on every full load; only reduced-motion opts out. */
export function shouldBoot() {
  if (typeof window === "undefined") return false
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
