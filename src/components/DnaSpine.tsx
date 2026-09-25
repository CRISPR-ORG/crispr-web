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
  { id: "techpulse", num: "04", label: "TechPulse" },
  { id: "events", num: "05", label: "DemoDays" },
  { id: "team", num: "06", label: "People" },
  { id: "alumni", num: "07", label: "Alumni" },
  { id: "history", num: "08", label: "History" },
  { id: "access", num: "09", label: "Access" },
]

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
      <div className="relative py-2 flex flex-col items-center gap-3">
        {/* Background Double Strand SVG */}
        <div className="absolute inset-y-0 w-6 left-0 pointer-events-none flex justify-center">
          <svg
            className="h-full w-6 overflow-visible"
            viewBox="0 0 24 380"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Strand Alpha */}
            <path
              d="M 6 0 Q 18 45 6 90 Q -6 135 6 180 Q 18 225 6 270 Q -6 315 6 360 L 6 380"
              stroke="#15221c"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Strand Beta */}
            <path
              d="M 18 0 Q -6 45 18 90 Q 30 135 18 180 Q -6 225 18 270 Q 30 315 18 360 L 18 380"
              stroke="#15221c"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Active illuminated strand */}
            <path
              d="M 6 0 Q 18 45 6 90 Q -6 135 6 180 Q 18 225 6 270 Q -6 315 6 360 L 6 380"
              stroke="#19A88F"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="380"
              strokeDashoffset={380 - scrollProgress * 380}
              className="transition-all duration-300"
            />
          </svg>
        </div>

        {/* Section Waypoints */}
        {SPINE_SECTIONS.map((sec, idx) => {
          const isActive = sec.id === activeSection
          const isPassed = idx <= activeIndex

          return (
            <div key={sec.id} className="relative flex items-center group">
              {/* Tooltip Label on Left */}
              <div
                className={`absolute right-7 py-1 px-2.5 bg-[#0A0F0D] border border-[#15221c] font-mono text-[10px] tracking-wider uppercase whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "opacity-100 translate-x-0 text-[#35D6B3] border-[#19A88F]/50 shadow-[0_0_15px_rgba(25,168,143,0.15)]"
                    : "opacity-0 translate-x-2 text-[#68736E] group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <span className="text-[#19A88F] mr-1.5">{sec.num}</span>
                <span>{sec.label}</span>
              </div>

              {/* Node Marker */}
              <button
                onClick={() => scrollToSection(sec.id)}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-[#19A88F] border-[#35D6B3] scale-125 shadow-[0_0_12px_rgba(53,214,179,0.5)]"
                    : isPassed
                      ? "bg-[#0A0F0D] border-[#19A88F]/60 hover:border-[#35D6B3]"
                      : "bg-[#050706] border-[#15221c] hover:border-[#19A88F]"
                }`}
                aria-label={`Jump to ${sec.label}`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#050706]" />
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom coordinate note */}
      <div className="mt-3 font-mono text-[8px] text-[#68736E] tracking-widest uppercase">
        21.1°N
      </div>
    </aside>
  )
}
