import { useScrollReveal } from "../hooks/useScrollReveal"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import WhatWeDo from "../components/WhatWeDo"
import Ecosystem from "../components/Ecosystem"
import AccessGateway from "../components/AccessGateway"
import EventsDemoDays from "../components/EventsDemoDays"
import TeamSection from "../components/TeamSection"
import AlumniSection from "../components/AlumniSection"
import HistorySection from "../components/HistorySection"
import DnaSpine from "../components/DnaSpine"
import {
  Shell,
  SectionLabel,
  ArrowLink,
  Button,
  CodeBlock,
} from "../components/ui"

export default function Home() {
  useScrollReveal()

  return (
    <>
      {/* Signature CRISPR DNA Navigation Spine */}
      <DnaSpine />

      {/* ═══════════════ HERO ═══════════════ */}
      <Hero />

      {/* Kinetic architectural band */}
      <div className="py-6 border-y border-[#242826] bg-[#080909]">
        <Marquee
          items={["RESEARCH", "DEVELOPMENT", "COMMUNITY", "INNOVATION", "DEMODAYS"]}
          duration={30}
        />
      </div>

      {/* ═══════════════ 01 / ABOUT CRISPR ═══════════════ */}
      <section
        id="about"
        className="relative py-24 md:py-36 border-t border-[#242826] bg-[#080909]"
      >
        <Shell>
          <SectionLabel num="01">About CRISPR</SectionLabel>

          <div className="mt-8 grid-12 gap-y-14">
            {/* Left Column: Thesis & 4 Core Themes */}
            <div className="col-span-12 lg:col-span-7">
              <h2 className="t-h2 reveal max-w-[18ch]">
                What is CRISPR?{" "}
                <span className="text-[#19A88F]">
                  A digital ecosystem rooted in IIIT Nagpur.
                </span>
              </h2>

              <div className="reveal reveal-d1 mt-8 max-w-xl space-y-4">
                <p className="t-lead">
                  CRISPR stands for{" "}
                  <strong className="text-[#F2F2F2]">
                    Central Research Initiative & Student Public Relations
                  </strong>
                  . We are the official student-led technology, research, and
                  digital gateway organization at the Indian Institute of
                  Information Technology, Nagpur.
                </p>
                <p className="t-body">
                  Founded in 2022, CRISPR operates on a straightforward
                  principle: identify systemic friction on our campus, write
                  production software to resolve it, and pass knowledge down to
                  the next cohort. No pitch decks without working prototypes.
                </p>
              </div>

              {/* 4 Thematic Pillars */}
              <div className="reveal reveal-d2 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-[#0e1010] border border-[#242826]">
                  <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                    01 / Research
                  </div>
                  <h3 className="text-base font-bold text-[#F2F2F2] mb-1">
                    AIRA & Applied Models
                  </h3>
                  <p className="text-xs text-[#777D7A] leading-relaxed">
                    Local model quantization, retrieval-augmented pipelines, and
                    reproducible empirical research run by student engineers.
                  </p>
                </div>

                <div className="p-5 bg-[#0e1010] border border-[#242826]">
                  <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                    02 / Development
                  </div>
                  <h3 className="text-base font-bold text-[#F2F2F2] mb-1">
                    Production Systems
                  </h3>
                  <p className="text-xs text-[#777D7A] leading-relaxed">
                    Pravesh for transit, AuthBahn for network authentication,
                    and the CRISPR Server powering 2,200+ active campus members.
                  </p>
                </div>

                <div className="p-5 bg-[#0e1010] border border-[#242826]">
                  <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                    03 / Community
                  </div>
                  <h3 className="text-base font-bold text-[#F2F2F2] mb-1">
                    Peer Mentorship
                  </h3>
                  <p className="text-xs text-[#777D7A] leading-relaxed">
                    Rigorous code reviews, weekly paper reading groups, and a
                    continuous bridge connecting first-years with senior alumni.
                  </p>
                </div>

                <div className="p-5 bg-[#0e1010] border border-[#242826]">
                  <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                    04 / Innovation
                  </div>
                  <h3 className="text-base font-bold text-[#F2F2F2] mb-1">
                    DemoDays & Arenas
                  </h3>
                  <p className="text-xs text-[#777D7A] leading-relaxed">
                    Monthly live-code showcases, high-intensity hackathons
                    (Claude Solvathon, Analytica), and zero-slide engineering
                    critiques.
                  </p>
                </div>
              </div>

              <div className="reveal reveal-d3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ArrowLink to="/products">Inspect shipped systems</ArrowLink>
                <ArrowLink to="/team">Meet the contributors</ArrowLink>
              </div>
            </div>

            {/* Right Column: crispr.manifest.ts code spec */}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <CodeBlock
                filename="crispr.manifest.ts"
                className="reveal reveal-d2"
              >
                <span className="c">
                  {"// Official CRISPR System Specification"}
                </span>
                {"\n"}
                <span className="k">export const</span>{" "}
                <span className="s">crispr</span> <span className="p">=</span>{" "}
                <span className="s">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="p">name</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;CRISPR&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">fullName</span>
                <span className="s">:</span>{" "}
                <span className="k">
                  &quot;Central Research Initiative & Student Public Relations&quot;
                </span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">institution</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;IIIT Nagpur&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">established</span>
                <span className="s">:</span> <span className="k">2022</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">coordinates</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;21.1°N 79.0°E&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">activeUsers</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;2,200+&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">ecosystem</span>
                <span className="s">: [</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;FTP Server&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;AuthBahn&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;Pravesh&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;TechPulse&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;DemoDays&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;AIRA&quot;</span>
                {"\n"}
                {"  "}
                <span className="s">],</span>
                {"\n"}
                {"  "}
                <span className="p">corePhilosophy</span>
                <span className="s">:</span>{" "}
                <span className="k">
                  &quot;Build → Ship → Learn → Repeat&quot;
                </span>
                <span className="s">,</span>
                {"\n"}
                <span className="s">{"}"}</span>
              </CodeBlock>

              <div className="reveal reveal-d3 mt-6 p-4 bg-[#0e1010] border border-[#242826] flex items-center justify-between text-xs font-mono">
                <span className="text-[#777D7A]">Source repository:</span>
                <a
                  href="https://github.com/crispr-iiitn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#19A88F] hover:underline"
                >
                  github.com/crispr-iiitn ↗
                </a>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ═══════════════ 02 / WHAT WE DO ═══════════════ */}
      <WhatWeDo />

      {/* ═══════════════ 03 / CRISPR ECOSYSTEM ═══════════════ */}
      <Ecosystem />

      {/* ═══════════════ 04 / CRISPR ACCESS GATEWAY ═══════════════ */}
      <AccessGateway />

      {/* ═══════════════ 05 / DEMODAYS & EVENTS ═══════════════ */}
      <EventsDemoDays />

      {/* ═══════════════ 06 / PEOPLE OF CRISPR ═══════════════ */}
      <TeamSection />

      {/* ═══════════════ 07 / ALUMNI ARCHIVE ═══════════════ */}
      <AlumniSection />

      {/* ═══════════════ 08 / HISTORY & EVOLUTION ═══════════════ */}
      <HistorySection />

      {/* ═══════════════ CLOSING CONTACT BANNER ═══════════════ */}
      <section className="relative py-24 md:py-32 border-t border-[#242826] bg-[#0e1010]">
        <Shell>
          <div className="grid-12 items-center gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                $ echo &quot;collaborate with crispr&quot;
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2] max-w-[20ch]">
                Got a campus problem worth solving? Bring it to us.
              </h2>
              <p className="mt-4 t-body max-w-lg">
                Recruitment, project proposals, and research collaborations open
                continuously. Talk to the team directly or inspect our
                open-source code.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
              <Button to="/contact" variant="primary" arrow>
                Get in touch
              </Button>
              <Button href="https://github.com/crispr-iiitn" variant="ghost">
                GitHub Organization
              </Button>
            </div>
          </div>
        </Shell>
      </section>
    </>
  )
}
