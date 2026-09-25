import DnaSpine from "../components/DnaSpine"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import AboutSection from "../components/AboutSection"
import Ecosystem from "../components/Ecosystem"
import WhatWeDo from "../components/WhatWeDo"
import EventsDemoDays from "../components/EventsDemoDays"
import TeamSection from "../components/TeamSection"
import AlumniSection from "../components/AlumniSection"
import HistorySection from "../components/HistorySection"
import AccessGateway from "../components/AccessGateway"
import { Shell, Button } from "../components/ui"

export default function Home() {
  return (
    <>
      {/* Signature CRISPR DNA Navigation Spine for ultra-wide displays */}
      <DnaSpine />

      {/* ═══════════════ 00 / HERO & PROCEDURAL DNA ═══════════════ */}
      <Hero />

      {/* Kinetic architectural band */}
      <div className="py-4 border-y border-[#15221c] bg-[#0A0F0D]/60 backdrop-blur-sm relative z-20">
        <Marquee
          items={[
            "RESEARCH",
            "DEVELOPMENT",
            "COMMUNITY",
            "INNOVATION",
            "DEMODAYS",
            "AIRA LAB",
            "PRAVESH",
            "AUTHBAHN",
            "CRISPR SERVER",
          ]}
          duration={35}
        />
      </div>

      {/* ═══════════════ 01 / ABOUT CRISPR ═══════════════ */}
      <AboutSection />

      {/* ═══════════════ 02 / LIVING ECOSYSTEM NETWORK ═══════════════ */}
      <Ecosystem />

      {/* ═══════════════ 03 / FOUR CORE INITIATIVES ═══════════════ */}
      <WhatWeDo />

      {/* ═══════════════ 04 / DEMODAYS & EVENTS ═══════════════ */}
      <EventsDemoDays />

      {/* ═══════════════ 05 / PEOPLE OF CRISPR ═══════════════ */}
      <TeamSection />

      {/* ═══════════════ 06 / ALUMNI ARCHIVE ═══════════════ */}
      <AlumniSection />

      {/* ═══════════════ 07 / HISTORY & EVOLUTION ═══════════════ */}
      <HistorySection />

      {/* ═══════════════ 08 / CRISPR ACCESS GATEWAY ═══════════════ */}
      <AccessGateway />

      {/* ═══════════════ 09 / CLOSING COLLABORATION BANNER ═══════════════ */}
      <section className="relative py-28 md:py-36 border-t border-[#15221c] bg-[#0A0F0D] z-20">
        <Shell>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-xs text-[#19A88F] uppercase tracking-[0.2em]">
                OPEN CONTRIBUTIONS // RECRUITMENT & COLLABORATION
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
                Got a campus problem worth solving?{" "}
                <span className="text-[#19A88F]">Build with us.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#A5AEA9] max-w-xl leading-relaxed">
                Recruitment, project proposals, and research collaborations open
                continuously. Talk to our team directly, test our deployed
                systems, or inspect our open-source codebase.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
              <Button to="/contact" variant="primary" arrow>
                Get in touch
              </Button>
              <Button href="https://github.com/crispr-iiitn" variant="ghost">
                GitHub Organization ↗
              </Button>
            </div>
          </div>
        </Shell>
      </section>
    </>
  )
}
