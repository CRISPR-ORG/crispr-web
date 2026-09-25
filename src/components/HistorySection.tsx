import { Shell, SectionLabel } from "./ui"

interface Milestone {
  period: string
  phase: string
  title: string
  description: string
  achievements: string[]
  badge?: string
}

const MILESTONES: Milestone[] = [
  {
    period: "2022",
    phase: "ORIGIN & CHARTER",
    title: "Genesis of the Initiative",
    description:
      "Founded at IIIT Nagpur by Krishna Chaudhari. Established with a dual mandate: engineer real, usable software for our own campus while providing an uncompromised environment for technical exploration and student public relations.",
    achievements: [
      "Chartered under IIIT Nagpur Technical Council",
      "Adopted 'Build → Ship → Learn' core philosophy",
      "Assembled initial core engineering group",
    ],
    badge: "FOUNDING",
  },
  {
    period: "2023",
    phase: "INTRANET INFRASTRUCTURE",
    title: "Campus Server & Inaugural Hackathons",
    description:
      "Recognizing the pain points of campus bandwidth limits and scattered academic resources, CRISPR deployed the CRISPR Server directly on the campus LAN switch and launched inaugural hackathons.",
    achievements: [
      "Deployed CRISPR Server (2TB academic storage on campus LAN)",
      "Launched Revamp to expand campus technical outreach",
      "Hosted 3.5 Solve-A-Thon: 24-hour campus LLM competition",
    ],
  },
  {
    period: "2024",
    phase: "TOOLING & DIVERSIFICATION",
    title: "AuthBahn & Flagship Competitions",
    description:
      "Engineered AuthBahn to eliminate daily captive portal friction for 1,500+ students. Expanded event portfolio to include finance simulations and data analysis contests.",
    achievements: [
      "AuthBahn Chrome Extension released with zero-knowledge cryptography",
      "Market Wise hosted with Udyam E-Cell: ₹53,000 prize pool & 200+ entrants",
      "Data Wizards visualization contest judged live on stage",
    ],
  },
  {
    period: "2025",
    phase: "RESEARCH & TRANSIT",
    title: "AIRA Research & Pravesh Deployment",
    description:
      "Formalized AIRA as our student artificial intelligence research division. Built and deployed Pravesh across all campus entry-exit checkpoints, replacing paper logbooks entirely.",
    achievements: [
      "Pravesh smart entry-exit deployed for 2,200+ students",
      "AIRA (AI Research at CRISPR) lab founded",
      "Campus Pulse newsletter inaugurated",
      "Claude Solvathon and Analytica hackathons launched",
    ],
  },
  {
    period: "2026",
    phase: "LIVING ECOSYSTEM",
    title: "The Digital Backbone & DemoDays",
    description:
      "Operating as the digital backbone of IIIT Nagpur. Institutionalized monthly DemoDays for ongoing project review, expanded TechPulse, and established continuous cross-batch continuity.",
    achievements: [
      "DemoDays monthly project critique stage established",
      "TechPulse editorial platform integrated",
      "09 production systems maintained with 99.2% uptime",
    ],
    badge: "PRESENT DAY",
  },
]

export default function HistorySection() {
  return (
    <section
      id="history"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="08">History & Evolution</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              The Evolution of <span className="text-[#19A88F]">CRISPR.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              A chronological record of how student-initiated solutions grew
              into the core digital infrastructure of an entire institute.
            </p>
          </div>
          <span className="font-mono text-xs text-[#68736E] uppercase tracking-wider">
            TIMELINE ARCHIVE // 2022 — 2026
          </span>
        </div>

        {/* Vertical Progressive Timeline */}
        <div className="mt-16 relative">
          {/* Vertical Drawing Spine Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#19A88F] via-[#35D6B3] to-[#15221c] -translate-x-1/2 opacity-70" />

          <div className="space-y-16">
            {MILESTONES.map((m, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={m.period}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050706] border-2 border-[#19A88F] flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#35D6B3]" />
                  </div>

                  {/* Content Card (Alternating left & right) */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-10">
                    <div className="bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-8 hover:border-[#19A88F]/50 transition-colors">
                      <div className="flex items-center justify-between pb-3 border-b border-[#15221c]/60 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-black text-[#F2F4F2] font-mono">
                            {m.period}
                          </span>
                          <span className="font-mono text-[10px] text-[#19A88F] uppercase tracking-wider">
                            {m.phase}
                          </span>
                        </div>
                        {m.badge && (
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-[#19A88F]/15 text-[#35D6B3] border border-[#35D6B3]/40">
                            {m.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-[#F2F4F2] mb-2">
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#A5AEA9] leading-relaxed mb-4">
                        {m.description}
                      </p>

                      <div className="space-y-1.5 font-mono text-[11px] text-[#68736E] pt-3 border-t border-[#15221c]/60">
                        {m.achievements.map((ach) => (
                          <div key={ach} className="flex items-start gap-2">
                            <span className="text-[#19A88F]">✓</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Shell>
    </section>
  )
}
