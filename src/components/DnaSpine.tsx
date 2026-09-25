import { useDna, SectionId } from "../context/DnaContext"

export interface SpineSection {
  id: SectionId
  num: string
  label: string
}

export const SPINE_SECTIONS: SpineSection[] = [
  { id: "hero", num: "00", label: "Top" },
  { id: "about", num: "01", label: "About" },
  { id: "ecosystem", num: "02", label: "Ecosystem" },
  { id: "initiatives", num: "03", label: "Initiatives" },
  { id: "events", num: "04", label: "DemoDays" },
  { id: "team", num: "05", label: "People" },
  { id: "alumni", num: "06", label: "Alumni" },
  { id: "history", num: "07", label: "History" },
  { id: "access", num: "08", label: "Access" },
]

/** One half-wave per gap between nodes, so the twist always matches the waypoints. */
const SEGMENTS = SPINE_SECTIONS.length - 1
const UNIT = 40
const HEIGHT = SEGMENTS * UNIT
const CENTER_X = 12
const AMPLITUDE = 8

function buildStrandPath(phase: 0 | 1) {
  const step = HEIGHT / SEGMENTS
  let d = `M ${CENTER_X} 0`
  for (let i = 0; i < SEGMENTS; i++) {
    const dir = (i + phase) % 2 === 0 ? 1 : -1
    const cx = CENTER_X + dir * AMPLITUDE
    const cy = step * (i + 0.5)
    const ey = step * (i + 1)
    d += ` Q ${cx} ${cy} ${CENTER_X} ${ey}`
  }
  return d
}

const STRAND_A = buildStrandPath(0)
const STRAND_B = buildStrandPath(1)

export default function DnaSpine() {
  const { activeSection, scrollProgress } = useDna()

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const offset = 70
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const activeIndex = Math.max(
    0,
    SPINE_SECTIONS.findIndex((s) => s.id === activeSection),
  )

  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-center pointer-events-auto select-none"
      aria-label="CRISPR DNA Navigation Spine"
    >
      {/* Top telemetry signal */}
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#68736E] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F] animate-pulse" />
        <span className="tabular-nums text-[#35D6B3]">
          {String(Math.round(scrollProgress * 100)).padStart(2, "0")}%
        </span>
      </div>

      {/* Interactive Strand Track */}
      <div
        className="relative py-2 flex flex-col items-center justify-between"
        style={{
          height: HEIGHT,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        {/* Background Double Strand + Base-Pair Rungs SVG */}
        <svg
          className="absolute inset-0 w-6 h-full overflow-visible pointer-events-none"
          viewBox={`0 0 24 ${HEIGHT}`}
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Base-pair rungs, one per waypoint */}
          {SPINE_SECTIONS.map((sec, idx) => {
            const y = (HEIGHT / SEGMENTS) * idx
            const isRungPassed = idx <= activeIndex
            return (
              <line
                key={sec.id}
                x1="5"
                y1={y}
                x2="19"
                y2={y}
                stroke={isRungPassed ? "#19A88F" : "#15221c"}
                strokeWidth="1"
                opacity={isRungPassed ? 0.35 : 0.5}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Strand Alpha */}
          <path d={STRAND_A} stroke="#15221c" strokeWidth="1.2" fill="none" />
          {/* Strand Beta */}
          <path d={STRAND_B} stroke="#15221c" strokeWidth="1.2" fill="none" />
          {/* Active illuminated strand, unwinding as the page scrolls */}
          <path
            d={STRAND_A}
            stroke="#19A88F"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={HEIGHT}
            strokeDashoffset={HEIGHT - scrollProgress * HEIGHT}
            className="transition-all duration-300"
          />
        </svg>

        {/* Section Waypoints */}
        {SPINE_SECTIONS.map((sec, idx) => {
          const isActive = sec.id === activeSection
          const isPassed = idx <= activeIndex

          return (
            <div key={sec.id} className="relative flex items-center group">
              {/* Tooltip Label on Left, with a connector tick to the node */}
              <div
                className={`absolute right-6 flex items-center gap-1.5 transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <span
                  className={`py-1 px-2.5 border font-mono text-[10px] tracking-wider uppercase whitespace-nowrap ${
                    isActive
                      ? "bg-[#0A0F0D] text-[#35D6B3] border-[#19A88F]/50 shadow-[0_0_15px_rgba(25,168,143,0.15)]"
                      : "bg-[#0A0F0D] text-[#68736E] border-[#15221c]"
                  }`}
                >
                  <span className="text-[#19A88F] mr-1.5">{sec.num}</span>
                  <span>{sec.label}</span>
                </span>
                <span
                  className={`h-px w-2 ${isActive ? "bg-[#19A88F]" : "bg-[#15221c]"}`}
                />
              </div>

              {/* Node Marker */}
              <button
                onClick={() => scrollToSection(sec.id)}
                className="relative w-3.5 h-3.5 flex items-center justify-center cursor-pointer"
                aria-label={`Jump to ${sec.label}`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-[#35D6B3] animate-ping opacity-60" />
                )}
                <span
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "bg-[#19A88F] border-[#35D6B3] scale-125 shadow-[0_0_12px_rgba(53,214,179,0.5)]"
                      : isPassed
                        ? "bg-[#0A0F0D] border-[#19A88F]/60 group-hover:border-[#35D6B3]"
                        : "bg-[#050706] border-[#15221c] group-hover:border-[#19A88F]"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#050706]" />
                  )}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom coordinate note */}
      <div className="mt-4 font-mono text-[8px] text-[#68736E] tracking-widest uppercase">
        21.1°N 79.0°E
      </div>
    </aside>
  )
}
