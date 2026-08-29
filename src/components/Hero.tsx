import { useEffect, useState } from "react"
import { Button, Shell } from "./ui"
import Scramble from "./Scramble"

const SCRIPT = [
  { cmd: "$ whoami", out: "crispr@iiitn" },
  { cmd: "$ cat mission.txt", out: "Building technology for our campus." },
]

const COMMITS = [
  { hash: "a91f2d1", type: "feat", msg: "launch Pravesh" },
  { hash: "7b21ca8", type: "feat", msg: "improve CRISPR Server" },
  { hash: "48fd921", type: "rsch", msg: "AIRA experiments" },
  { hash: "31bc0a2", type: "feat", msg: "Campus Pulse" },
  { hash: "c04e991", type: "fix", msg: "AuthBahn chrome v3" },
]

const SYSTEM: [string, string][] = [
  ["projects", "10"],
  ["contributors", "10"],
  ["alumni", "04"],
  ["students", "2200+"],
]

/** Types the terminal script out character by character. */
function useTypewriter(speed = 26, linePause = 220) {
  const lines = SCRIPT.flatMap((s) => [s.cmd, s.out])
  const [text, setText] = useState<string[]>(() => lines.map(() => ""))
  const [cursorAt, setCursorAt] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(lines)
      setDone(true)
      return
    }
    let li = 0
    let ci = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (li >= lines.length) {
        setDone(true)
        return
      }
      const line = lines[li]
      if (ci <= line.length) {
        const value = line.slice(0, ci)
        setText((prev) => {
          const next = [...prev]
          next[li] = value
          return next
        })
        setCursorAt(li)
        ci += 1
        timer = setTimeout(tick, speed)
      } else {
        li += 1
        ci = 0
        timer = setTimeout(tick, linePause)
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { text, cursorAt, done }
}

/** Ticking IST clock — the hero should feel live, not screenshotted. */
function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  })
}

/** Slowly drifting load figures, so the readout behaves like a real one. */
function useTelemetry() {
  const [vals, setVals] = useState([62, 41, 78])
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      setVals((prev) =>
        prev.map((v) => {
          const next = v + (Math.random() * 14 - 7)
          return Math.max(18, Math.min(94, Math.round(next)))
        }),
      )
    }, 1800)
    return () => window.clearInterval(id)
  }, [])
  return vals
}

const TELEMETRY_LABELS = ["cpu", "mem", "net"]

export default function Hero() {
  const { text, cursorAt, done } = useTypewriter()
  const clock = useClock()
  const telemetry = useTelemetry()

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24">
      {/* Blueprint layers */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
        aria-hidden
      />

      {/* ── Top meta strip: anchors the whole composition to the grid ── */}
      <Shell className="relative">
        <div
          className="flex items-center justify-between py-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[color:var(--color-fg-3)]"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <span className="mono-raw text-[color:var(--color-crispr)]">
            crispr@iiitn:~$
          </span>
          <span className="hidden sm:block">
            Technology · Innovation · Engineering
          </span>
          <span className="hidden md:block">21.1°N 79.0°E</span>
            <span className="hidden tabular-nums accent lg:block">{clock} IST</span>
          <span>Est. 2022</span>
        </div>
      </Shell>

      {/* ── Main composition ── */}
      <Shell className="relative w-full py-12 md:py-16">
        <div className="grid-12 gap-y-14">
          {/* Left: identity */}
          <div className="col-span-12 lg:col-span-7">
            {/* Terminal fragment */}
            <div
              className="mb-9 font-mono text-[0.8125rem] leading-[1.9]"
              style={{ minHeight: "6.5rem" }}
            >
              {text.map((line, i) => {
                const isCmd = i % 2 === 0
                return (
                  <div
                    key={i}
                    className={
                      isCmd
                        ? "text-[color:var(--color-crispr)]"
                        : "text-[color:var(--color-fg-2)]"
                    }
                  >
                    {line}
                    {i === cursorAt && !done && (
                      <span className="caret">▌</span>
                    )}
                    {done && i === text.length - 1 && (
                      <span className="caret ml-1 text-[color:var(--color-crispr)]">
                        ▌
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Wordmark */}
            <h1 className="t-display mb-6">
              <span className="wordmark" data-text="CRISPR">
                <Scramble text="CRISPR" speed={40} stagger={3} />
              </span>
            </h1>

            {/* Statement + description sit on the same rhythm as the wordmark */}
            <div className="grid-12 gap-y-6">
              <h2
                className="col-span-12 md:col-span-7 text-balance font-medium leading-[1.22] tracking-[-0.03em] text-[color:var(--color-fg)]"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}
              >
                We build the technology of our campus.
              </h2>
              <p className="col-span-12 md:col-span-5 t-body max-w-sm md:pt-1">
                A student-led technology and innovation club at IIIT Nagpur —
                shipping products, exploring emerging systems and writing the
                software the campus actually runs on.
              </p>
            </div>

            <div className="mt-11 flex flex-wrap gap-3">
              <Button to="/products" variant="primary" arrow>
                Explore CRISPR
              </Button>
              <Button to="/team" variant="ghost">
                Meet the team
              </Button>
            </div>
          </div>

          {/* Right: system readout — typography, not a dashboard card */}
          <div
            className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-10"
            style={{ borderLeft: "1px solid var(--line)" }}
          >
            <div className="hidden lg:block">
              <div className="mono-raw mb-5 text-[color:var(--color-crispr)]">
                $ git log --oneline
              </div>
              <ul className="mb-12 space-y-[0.4rem] font-mono text-[0.75rem]">
                {COMMITS.map((c) => (
                  <li key={c.hash} className="flex gap-3">
                    <span className="text-[color:var(--color-crispr)] opacity-60">
                      {c.hash}
                    </span>
                    <span className="text-[color:var(--color-crispr-light)] opacity-70">
                      {c.type}:
                    </span>
                    <span className="truncate text-[color:var(--color-fg-2)]">
                      {c.msg}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="t-mono mb-5">CRISPR / System</div>
            <dl className="font-mono text-[0.75rem]">
              {SYSTEM.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 py-[0.4rem]"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <dt className="text-[color:var(--color-fg-3)]">{k}</dt>
                  <dd
                    className="t-num text-[0.9375rem] text-[color:var(--color-fg)]"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <span className="status">All systems active</span>
            </div>

            {/* Live load bars */}
            <div className="mt-8 space-y-3">
              {telemetry.map((v, i) => (
                <div key={TELEMETRY_LABELS[i]} className="flex items-center gap-4">
                  <span className="w-8 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[color:var(--color-fg-3)]">
                    {TELEMETRY_LABELS[i]}
                  </span>
                  <span
                    className="relative h-[3px] flex-1 overflow-hidden"
                    style={{ background: "rgba(0,255,65,0.1)" }}
                  >
                    <span
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: `${v}%`,
                        background: "var(--color-crispr)",
                        boxShadow: "0 0 8px rgba(0,255,65,0.6)",
                        transition: "width 1.6s var(--ease)",
                      }}
                    />
                  </span>
                  <span className="w-8 text-right font-mono text-[0.625rem] tabular-nums text-[color:var(--color-crispr)]">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>

      {/* ── Bottom rail ── */}
      <Shell className="relative">
        <div
          className="flex items-center justify-between py-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[color:var(--color-fg-3)]"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span className="flex items-center gap-3">
            <span className="inline-block h-3 w-px bg-[color:var(--color-crispr)]" />
            Scroll to continue
          </span>
          <span className="hidden sm:block">v3.0.0 — Indexed 09 sections</span>
        </div>
      </Shell>
    </section>
  )
}
