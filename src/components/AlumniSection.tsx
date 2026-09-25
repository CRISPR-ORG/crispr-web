import { alumni } from "../data/alumni"
import { Shell, SectionLabel, ArrowLink, Frame } from "./ui"

export default function AlumniSection() {
  return (
    <section
      id="alumni"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="07">Alumni Archive</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              Founding Leads & <span className="text-[#19A88F]">Alumni.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              CRISPR is not a single graduating cohort. It is an unbroken chain
              of student engineers passing down production systems, mentorship,
              and high standards.
            </p>
          </div>
          <span className="font-mono text-xs text-[#68736E] uppercase tracking-wider">
            CONTINUITY // 04 VERIFIED LEAD NARRATIVES
          </span>
        </div>

        {/* Alumni Dossiers Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {alumni.map((alum) => (
            <article
              key={alum.id}
              className="p-6 md:p-8 bg-[#0A0F0D] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-6 items-start mb-6">
                  <div className="w-24 h-28 shrink-0">
                    <Frame
                      src={alum.image}
                      alt={alum.name}
                      monogram={alum.initials}
                      monogramSize="2.5rem"
                      ratio="4/5"
                    />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider mb-1">
                      {alum.role} · {alum.batch}
                    </div>
                    <h3 className="text-2xl font-bold text-[#F2F4F2] tracking-tight">
                      {alum.name}
                    </h3>
                    <div className="text-xs text-[#A5AEA9] font-medium mt-1">
                      {alum.current}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="pl-4 border-l-2 border-[#19A88F]/50 mb-6 text-sm text-[#F2F4F2]/90 italic leading-relaxed">
                  &ldquo;{alum.quote}&rdquo;
                </blockquote>

                {/* Achievements List */}
                <div className="space-y-1.5 font-mono text-[11px] text-[#A5AEA9] mb-6">
                  {alum.achievements.map((ach) => (
                    <div key={ach} className="flex items-start gap-2">
                      <span className="text-[#35D6B3] shrink-0">▸</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#15221c] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#68736E]">
                  Archive Entry #{alum.num}
                </span>
                <a
                  href={alum.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#19A88F] hover:text-[#35D6B3] flex items-center gap-1 transition-colors"
                >
                  LinkedIn Profile ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#15221c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#68736E]">
            Every alumnus remains an active advisor to current student teams.
          </span>
          <ArrowLink to="/alumni">Explore complete alumni narratives</ArrowLink>
        </div>
      </Shell>
    </section>
  )
}
