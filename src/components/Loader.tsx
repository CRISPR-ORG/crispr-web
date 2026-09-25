import { useEffect, useRef, useState } from "react"

type Line = { kind: "cmd" text: string } | { kind: "out" text: string } | {
  kind: "ok"
  text: string
}

const SCRIPT: Line[] = [
  { kind: "cmd", text: "ssh crispr@iiitn.ac.in" },
  { kind: "ok", text: "Gateway connected — IIIT Nagpur (21.1°N 79.0°E)" },
  { kind: "cmd", text: "crispr mount --subsystems all" },
  {
    kind: "out",
    text: "Mounting FTP · AuthBahn · TechPulse · DemoDays · AIRA",
  },
  {
    kind: "ok",
    text: "09 production tools · 2,200+ campus members · 10 contributors",
  },
  { kind: "cmd", text: "crispr start --env production" },
]

const CHAR_MS = 8
const CMD_CHAR_MS = 14
const LINE_GAP = 50
const HOLD_MS = 250

export default function Loader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([])
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const finished = useRef(false)

  const finish = useRef(() => {
    if (finished.current) return
    finished.current = true
    try {
      sessionStorage.setItem("crispr_booted", "true")
    } catch {}
    setLeaving(true)
    window.setTimeout(onDone, 400)
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

    timer = setTimeout(tick, 100)
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

  const progress = Math.min(
    100,
    Math.round(((active + 1) / SCRIPT.length) * 100),
  )
  const filled = Math.round((progress / 100) * 24)

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#080909] px-6 py-8 md:px-12 md:py-10 text-[#F2F2F2]"
      style={{
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Initializing CRISPR"
    >
      {/* Top technical rail */}
      <div className="flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#777D7A] border-b border-[#242826]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F]" />
          <span className="text-[#19A88F] font-bold">CRISPR</span>
        </div>
        <span className="hidden sm:block">
          Central Research Initiative & Student Public Relations
        </span>
        <span>INITIALIZING</span>
      </div>

      {/* Terminal log */}
      <div className="w-full max-w-2xl my-auto">
        <div className="font-mono text-xs md:text-sm leading-[2] space-y-1">
          {SCRIPT.map((line, i) => {
            const text = shown[i]
            if (text === undefined) return null
            const color =
              line.kind === "cmd"
                ? "#19A88F"
                : line.kind === "ok"
                  ? "#2ED9B8"
                  : "#777D7A"
            return (
              <div
                key={i}
                style={{ color }}
                className="whitespace-pre-wrap break-words"
              >
                {line.kind === "cmd" && <span className="opacity-60">$ </span>}
                {line.kind === "ok" && (
                  <span className="text-[#19A88F]">✓ </span>
                )}
                {text}
                {i === active && (
                  <span className="caret ml-1 text-[#19A88F]">▌</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="pt-4 border-t border-[#242826]">
        <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#777D7A]">
          <div className="flex items-center gap-2 text-[#19A88F]">
            <span>
              [{"█".repeat(filled)}
              {"░".repeat(24 - filled)}]
            </span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <span>Press any key or click to enter</span>
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[#777D7A]">
          <span>IIIT Nagpur · Maharashtra 441108</span>
          <span>EST. 2022</span>
        </div>
      </div>
    </div>
  )
}

export function shouldBoot() {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false
  try {
    return sessionStorage.getItem("crispr_booted") !== "true"
  } catch {
    return true
  }
}
