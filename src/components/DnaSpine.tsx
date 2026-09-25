import { useEffect, useState } from "react"

export interface SectionNode {
  id: string
  num: string
  label: string
}

export const SECTIONS: SectionNode[] = [
  { id: "hero", num: "00", label: "Top" },
  { id: "about", num: "01", label: "About" },
  { id: "what-we-do", num: "02", label: "What We Do" },
  { id: "ecosystem", num: "03", label: "Ecosystem" },
  { id: "access", num: "04", label: "Access" },
  { id: "events", num: "05", label: "DemoDays" },
  { id: "team", num: "06", label: "Team" },
  { id: "alumni", num: "07", label: "Alumni" },
  { id: "history", num: "08", label: "History" },
]

export default function DnaSpine() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0
      setScrollProgress(progress)

      // Find current section
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter(
        (item): item is { id: string el: HTMLElement } => item.el !== null,
      )

      const scrollPos = scrollY + window.innerHeight * 0.35

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i]
        if (item.el.offsetTop <= scrollPos) {
          setActiveSection(item.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 70
      const targetPos =
        el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top: targetPos, behavior: "smooth" })
    }
  }

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSection),
  )

  return (
    <aside
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center pointer-events-auto select-none"
      aria-label="CRISPR DNA Navigation Strand"
    >
      {/* Top telemetry signal */}
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#777D7A] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F] animate-pulse" />
        <span className="tabular-nums text-[#19A88F]">
          {String(Math.round(scrollProgress * 100)).padStart(2, "0")}%
        </span>
      </div>

      {/* Abstract DNA Strand Track */}
      <div className="relative py-2 flex flex-col items-center gap-3">
        {/* Background Double Strand SVG */}
        <div className="absolute inset-y-0 w-6 -left-0 pointer-events-none flex justify-center">
          <svg
            className="h-full w-6 overflow-visible"
            viewBox="0 0 24 380"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Strand Alpha */}
            <path
              d="M 6 0 Q 18 45 6 95 T 6 190 T 6 285 T 6 380"
              stroke="#242826"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Strand Beta */}
            <path
              d="M 18 0 Q 6 45 18 95 T 18 190 T 18 285 T 18 380"
              stroke="#242826"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Active illuminated strand segment */}
            <path
              d="M 6 0 Q 18 45 6 95 T 6 190 T 6 285 T 6 380"
              stroke="#19A88F"
              strokeWidth="1.5"
              strokeDasharray="400"
              strokeDashoffset={400 - scrollProgress * 400}
              fill="none"
            />
          </svg>
        </div>

        {/* Nodes */}
        {SECTIONS.map((sec, idx) => {
          const isActive = sec.id === activeSection
          const isPassed = idx <= activeIndex

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#19A88F]"
              aria-label={`Jump to ${sec.num} ${sec.label}`}
            >
              {/* Tooltip on left */}
              <div
                className={`absolute right-7 py-1 px-2.5 rounded-none bg-[#0e1010] border border-[#242826] font-mono text-[10px] uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "opacity-100 translate-x-0 border-[#19A88F]/40 text-[#19A88F]"
                    : "opacity-0 translate-x-2 text-[#777D7A] group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <span className="text-[#19A88F] mr-1.5">{sec.num}</span>
                <span>{sec.label}</span>
              </div>

              {/* Rung connection line */}
              <span
                className={`w-3 h-px transition-colors duration-300 ${
                  isPassed ? "bg-[#19A88F]/60" : "bg-[#242826]"
                }`}
              />

              {/* Node Bead */}
              <span
                className={`relative flex items-center justify-center w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-[#19A88F] bg-[#19A88F] scale-125"
                    : isPassed
                      ? "border-[#19A88F]/50 bg-[#080909]"
                      : "border-[#242826] bg-[#080909] group-hover:border-[#777D7A]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#19A88F] animate-ping opacity-40" />
                )}
              </span>

              {/* Right Rung */}
              <span
                className={`w-3 h-px transition-colors duration-300 ${
                  isPassed ? "bg-[#19A88F]/60" : "bg-[#242826]"
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* Bottom status */}
      <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#777D7A]">
        {SECTIONS[activeIndex]?.num ?? "00"}
      </div>
    </aside>
  )
}
