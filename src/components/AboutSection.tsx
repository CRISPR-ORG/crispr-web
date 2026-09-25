import { Shell, SectionLabel, ArrowLink, CodeBlock } from "./ui"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="01">About CRISPR</SectionLabel>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement & 4 Pillars */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="font-mono text-[11px] text-[#19A88F] uppercase tracking-[0.2em] block mb-3">
                INSTITUTIONAL FOUNDATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight max-w-[20ch]">
                A digital ecosystem rooted in{" "}
                <span className="text-[#19A88F]">IIIT Nagpur.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#A5AEA9] leading-relaxed">
              <p>
                CRISPR stands for{" "}
                <strong className="text-[#F2F4F2] font-semibold">
                  Central Research Initiative & Student Public Relations
                </strong>
                . We are the official student-led technology, research, and
                digital gateway collective chartered at the Indian Institute of
                Information Technology, Nagpur.
              </p>
              <p>
                Founded in 2022, CRISPR operates on an uncompromising
                engineering principle: identify systemic friction on our campus,
                write production software to resolve it, and pass architectural
                knowledge down to subsequent cohorts. No speculative pitch decks
                without working prototypes.
              </p>
            </div>

            {/* 4 Thematic Pillars with Thin Scientific Lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-[#0A0F0D] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors">
                <div className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>01 / RESEARCH</span>
                  <span className="text-[#68736E]">AIRA LAB</span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F4F2] mb-1.5">
                  Applied Machine Learning
                </h3>
                <p className="text-xs text-[#68736E] leading-relaxed">
                  Local model quantization, retrieval-augmented pipelines, and
                  reproducible empirical research run on student hardware.
                </p>
              </div>

              <div className="p-5 bg-[#0A0F0D] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors">
                <div className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>02 / SYSTEMS</span>
                  <span className="text-[#68736E]">PRODUCTION</span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F4F2] mb-1.5">
                  Campus Digital Utility
                </h3>
                <p className="text-xs text-[#68736E] leading-relaxed">
                  Pravesh for transit, AuthBahn for network authentication, and
                  the CRISPR Server powering 2,200+ campus members.
                </p>
              </div>

              <div className="p-5 bg-[#0A0F0D] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors">
                <div className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>03 / CULTURE</span>
                  <span className="text-[#68736E]">CONTINUITY</span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F4F2] mb-1.5">
                  Knowledge Passing
                </h3>
                <p className="text-xs text-[#68736E] leading-relaxed">
                  Rigorous code reviews, weekly paper reading groups, and direct
                  peer mentorship connecting incoming students with alumni.
                </p>
              </div>

              <div className="p-5 bg-[#0A0F0D] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors">
                <div className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>04 / ARENAS</span>
                  <span className="text-[#68736E]">CRITIQUE</span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F4F2] mb-1.5">
                  DemoDays & Hackathons
                </h3>
                <p className="text-xs text-[#68736E] leading-relaxed">
                  Monthly live-code showcases, high-intensity hackathons (Claude
                  Solvathon, Analytica), and zero-slide engineering feedback.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <ArrowLink to="/products">Inspect shipped systems</ArrowLink>
              <ArrowLink to="/team">Meet the contributors</ArrowLink>
            </div>
          </div>

          {/* Right Column: crispr.manifest.ts Architecture Code Spec */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-[11px] text-[#68736E] uppercase tracking-[0.16em]">
              SPECIFICATION // CANONICAL ARCHITECTURE
            </div>

            <CodeBlock filename="crispr.manifest.ts">
              <span className="text-[#68736E]">
                {"// CRISPR Official System Specification"}
              </span>
              {"\n"}
              <span className="text-[#19A88F]">export const</span>{" "}
              <span className="text-[#F2F4F2]">crispr</span> = {"{"}
              {"\n"}
              {"  "}
              <span className="text-[#35D6B3]">name</span>:{" "}
              <span className="text-[#9DE8D5]">&quot;CRISPR&quot;</span>,{"\n"}
              {"  "}
              <span className="text-[#35D6B3]">fullName</span>:{" "}
              <span className="text-[#9DE8D5]">
                &quot;Central Research Initiative & Student Public
                Relations&quot;
              </span>
              ,{"\n"}
              {"  "}
              <span className="text-[#35D6B3]">institution</span>:{" "}
              <span className="text-[#9DE8D5]">
                &quot;Indian Institute of Information Technology, Nagpur&quot;
              </span>
              ,{"\n"}
              {"  "}
              <span className="text-[#35D6B3]">established</span>:{" "}
              <span className="text-[#F2F4F2]">2022</span>,{"\n"}
              {"  "}
              <span className="text-[#35D6B3]">coordinates</span>:{" "}
              <span className="text-[#9DE8D5]">&quot;21.1°N 79.0°E&quot;</span>,
              {"\n"}
              {"  "}
              <span className="text-[#35D6B3]">activeUsers</span>:{" "}
              <span className="text-[#9DE8D5]">&quot;2,200+&quot;</span>,{"\n"}
              {"  "}
              <span className="text-[#35D6B3]">subsystems</span>: [{"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;FTP Server&quot;</span>,
              {"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;AuthBahn&quot;</span>,
              {"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;Pravesh&quot;</span>,{"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;TechPulse&quot;</span>,
              {"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;DemoDays&quot;</span>,
              {"\n"}
              {"    "}
              <span className="text-[#9DE8D5]">&quot;AIRA&quot;</span>
              {"\n"}
              {"  "}],
              {"\n"}
              {"  "}
              <span className="text-[#35D6B3]">philosophy</span>:{" "}
              <span className="text-[#9DE8D5]">
                &quot;Build → Ship → Learn → Repeat&quot;
              </span>
              ,{"\n"}
              {"}"}
            </CodeBlock>

            <div className="p-4 bg-[#0A0F0D] border border-[#15221c] flex items-center justify-between text-xs font-mono">
              <span className="text-[#68736E]">Organization Source:</span>
              <a
                href="https://github.com/crispr-iiitn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#19A88F] hover:text-[#35D6B3] transition-colors"
              >
                github.com/crispr-iiitn ↗
              </a>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
