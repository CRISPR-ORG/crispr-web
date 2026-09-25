import React, { createContext, useContext, useState, useEffect, useRef } from "react"

export type SectionId =
  | "hero"
  | "about"
  | "ecosystem"
  | "initiatives"
  | "techpulse"
  | "events"
  | "team"
  | "alumni"
  | "history"
  | "access"
  | "footer"

interface DnaContextType {
  scrollProgress: number
  activeSection: SectionId
  activeTarget: string | null
  setActiveTarget: (target: string | null) => void
  mousePos: { x: number; y: number }
  dnaSeparation: number
  dnaMode: "helix" | "unfolding" | "network" | "stream" | "constellation" | "dissolve"
}

const DnaContext = createContext<DnaContextType>({
  scrollProgress: 0,
  activeSection: "hero",
  activeTarget: null,
  setActiveTarget: () => {},
  mousePos: { x: 0, y: 0 },
  dnaSeparation: 0,
  dnaMode: "helix",
})

export const SECTIONS_CONFIG: { id: SectionId; label: string; num: string }[] = [
  { id: "hero", label: "Overview", num: "00" },
  { id: "about", label: "About CRISPR", num: "01" },
  { id: "ecosystem", label: "Ecosystem", num: "02" },
  { id: "initiatives", label: "Initiatives", num: "03" },
  { id: "techpulse", label: "TechPulse", num: "04" },
  { id: "events", label: "Events & DemoDays", num: "05" },
  { id: "team", label: "People", num: "06" },
  { id: "alumni", label: "Alumni Archive", num: "07" },
  { id: "history", label: "History Timeline", num: "08" },
  { id: "access", label: "Access Gateway", num: "09" },
]

export function DnaProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<SectionId>("hero")
  const [activeTarget, setActiveTarget] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x, y })
    }

    const handleScroll = () => {
      if (rafId.current !== null) return
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null
        const scrollY = window.scrollY
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
        setScrollProgress(progress)

        // Determine active section
        const sections: SectionId[] = [
          "hero",
          "about",
          "ecosystem",
          "initiatives",
          "techpulse",
          "events",
          "team",
          "alumni",
          "history",
          "access",
          "footer",
        ]

        let currentSection: SectionId = "hero"
        const viewportCheck = scrollY + window.innerHeight * 0.38

        for (const id of sections) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            const top = rect.top + scrollY
            if (top <= viewportCheck) {
              currentSection = id
            }
          }
        }
        setActiveSection(currentSection)
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  // Derive DNA morphology mode based on active section and scroll
  let dnaMode: "helix" | "unfolding" | "network" | "stream" | "constellation" | "dissolve" = "helix"
  let dnaSeparation = 0

  if (activeSection === "hero") {
    // Starts tight, begins separating as user scrolls down hero
    dnaMode = "helix"
    dnaSeparation = Math.min(1, scrollProgress * 5)
  } else if (activeSection === "about") {
    dnaMode = "unfolding"
    dnaSeparation = 0.45
  } else if (activeSection === "ecosystem") {
    dnaMode = "network"
    dnaSeparation = 0.7
  } else if (activeSection === "initiatives") {
    dnaMode = "network"
    dnaSeparation = 0.8
  } else if (activeSection === "techpulse") {
    dnaMode = "stream"
    dnaSeparation = 0.65
  } else if (activeSection === "events" || activeSection === "team" || activeSection === "alumni") {
    dnaMode = "constellation"
    dnaSeparation = 0.5
  } else if (activeSection === "history" || activeSection === "access") {
    dnaMode = "network"
    dnaSeparation = 0.4
  } else if (activeSection === "footer") {
    dnaMode = "dissolve"
    dnaSeparation = 1.0
  }

  return (
    <DnaContext.Provider
      value={{
        scrollProgress,
        activeSection,
        activeTarget,
        setActiveTarget,
        mousePos,
        dnaSeparation,
        dnaMode,
      }}
    >
      {children}
    </DnaContext.Provider>
  )
}

export function useDna() {
  return useContext(DnaContext)
}

export default DnaContext
