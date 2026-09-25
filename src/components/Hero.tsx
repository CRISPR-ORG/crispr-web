import { useDna } from "../context/DnaContext"
import { OfficialLogo } from "./Logo"
import { Button } from "./ui"

export default function Hero() {
  const { scrollProgress } = useDna()

  // Calculate subtle hero exit parallax on first scroll
  const heroOpacity = Math.max(0, 1 - scrollProgress * 3.5)
  const heroTranslateX = -scrollProgress * 80 // slight drift left as user scrolls down

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden z-20"
      style={{
        opacity: heroOpacity,
        transform: `translate3d(${heroTranslateX}px, 0, 0)`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
    >
      {/* Top Scientific Metadata Bar */}
      <div className="shell w-full">
        <div className="flex items-center justify-between py-3 border-b border-[#15221c] font-mono text-[10px] uppercase tracking-[0.18em] text-[#68736E]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F]" />
            <span className="text-[#F2F4F2] font-medium tracking-[0.14em]">
              IIIT NAGPUR · CAMPUS DIGITAL ECOSYSTEM
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>COORDINATES: 21.1°N 79.0°E</span>
            <span>ESTABLISHED 2022</span>
            <span className="text-[#35D6B3]">DNA PROTOCOL V2.6</span>
          </div>
        </div>
      </div>

      {/* Main Split Composition */}
      <div className="shell w-full my-auto py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Brand Narrative (~55% width) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            {/* Logo Emblem & Institutional Heading */}
            <div className="flex items-center gap-4">
              <OfficialLogo size={52} className="shrink-0" />
              <div>
                <span className="font-mono text-xs text-[#19A88F] uppercase tracking-[0.2em] font-semibold block">
                  IIIT NAGPUR
                </span>
                <span className="font-mono text-[11px] text-[#A5AEA9] tracking-[0.12em] uppercase">
                  CENTRAL RESEARCH INITIATIVE & STUDENT PUBLIC RELATIONS
                </span>
              </div>
            </div>

            {/* CRISPR Wordmark Display */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-[-0.045em] text-[#F2F4F2] leading-none">
                CRISPR
              </h1>
            </div>

            {/* Core Manifesto Tagline */}
            <div className="border-l-2 border-[#19A88F] pl-5 py-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#F2F4F2] leading-snug">
                Building ideas.
                <br />
                Connecting people.
                <br />
                <span className="text-[#19A88F]">Creating what comes next.</span>
              </p>
            </div>

            {/* Editorial Lead Description */}
            <p className="text-sm sm:text-base text-[#A5AEA9] leading-relaxed max-w-xl font-normal">
              The official digital collective and student research initiative at
              the Indian Institute of Information Technology, Nagpur. We engineer
              production software for campus infrastructure, investigate applied
              machine learning, and foster technical continuity across cohorts.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                onClick={() => {
                  document
                    .getElementById("ecosystem")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                arrow
              >
                Explore Ecosystem
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  document
                    .getElementById("access")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                CRISPR Access Gateway
              </Button>
            </div>

            {/* Verified Operational Grounding */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#15221c] max-w-lg">
              <div>
                <div className="font-mono text-[10px] text-[#68736E] uppercase tracking-wider">
                  Deployed Systems
                </div>
                <div className="text-xl font-bold text-[#F2F4F2] font-mono mt-0.5">
                  09
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#68736E] uppercase tracking-wider">
                  Campus Members
                </div>
                <div className="text-xl font-bold text-[#35D6B3] font-mono mt-0.5">
                  2,200+
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#68736E] uppercase tracking-wider">
                  AIRA Focus Labs
                </div>
                <div className="text-xl font-bold text-[#F2F4F2] font-mono mt-0.5">
                  04
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Procedural DNA Viewing Zone (45% width) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col items-center justify-center min-h-[380px] lg:min-h-[500px]">
            {/* Scientific Framing Marks around DNA Area */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 opacity-40">
              <div className="flex justify-between items-start font-mono text-[9px] text-[#68736E]">
                <span>[HELIX_STRAND_ALPHA]</span>
                <span>λ: 0.75 | R: 2.2</span>
              </div>
              <div className="flex justify-between items-end font-mono text-[9px] text-[#68736E]">
                <span>550 BASE PAIRS</span>
                <span>[PARAMETRIC_3D]</span>
              </div>
            </div>

            {/* Subtle center coordinate reticle */}
            <div className="w-16 h-16 border border-[#19A88F]/20 rounded-full flex items-center justify-center opacity-30 pointer-events-none animate-pulse">
              <div className="w-1 h-1 rounded-full bg-[#35D6B3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Signature Hint */}
      <div className="shell w-full">
        <div className="flex items-center justify-between py-3 border-t border-[#15221c] font-mono text-[10px] uppercase tracking-[0.16em] text-[#68736E]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full border border-[#19A88F] flex items-center justify-center">
              <span className="w-0.5 h-0.5 rounded-full bg-[#19A88F]" />
            </span>
            <span>Scroll down to initiate DNA unfolding</span>
          </div>
          <span className="hidden sm:inline text-[#19A88F]">
            CRISPR → CENTRAL RESEARCH INITIATIVE
          </span>
        </div>
      </div>
    </section>
  )
}
