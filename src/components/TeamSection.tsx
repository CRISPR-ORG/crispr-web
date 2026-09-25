import { useState } from "react"
import { Shell, SectionLabel, ArrowLink } from "./ui"
import { team, TeamMember } from "../data/team"

export default function TeamSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = [
    { key: "all", label: "All Contributors" },
    { key: "leadership", label: "Leadership" },
    { key: "development", label: "Engineering" },
    { key: "departments", label: "Divisions & Labs" },
    { key: "infrastructure", label: "Infrastructure" },
  ]

  const filteredTeam =
    activeCategory === "all"
      ? team
      : team.filter((m) => m.category === activeCategory)

  return (
    <section
      id="team"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="06">People of CRISPR</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              The Engineering <span className="text-[#19A88F]">Collective.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              Student software architects, machine learning researchers, and
              infrastructure maintainers driving CRISPR at IIIT Nagpur.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.key
                    ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-semibold"
                    : "bg-[#0A0F0D] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F]/50 hover:text-[#F2F4F2]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Team Directory (No cheap circular cards) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeam.map((member, idx) => (
            <div
              key={member.name}
              className="group bg-[#0A0F0D] border border-[#15221c] p-5 flex flex-col justify-between hover:border-[#19A88F]/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="font-mono text-[10px] text-[#68736E] uppercase tracking-widest pb-3 border-b border-[#15221c]/60 flex items-center justify-between">
                <span>INDEX // {String(idx + 1).padStart(2, "0")}</span>
                <span className="text-[#19A88F]">LEVEL 0{member.level}</span>
              </div>

              {/* Portrait / Initials Frame */}
              <div className="my-5 relative h-52 w-full overflow-hidden bg-[#050706] border border-[#15221c]">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to initials avatar if image not found
                      ;(e.target as HTMLElement).style.display = "none"
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-[#15221c] select-none -z-10">
                  {member.initials}
                </div>
              </div>

              {/* Member Details */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-[#F2F4F2] group-hover:text-[#35D6B3] transition-colors">
                  {member.name}
                </h3>
                <div className="font-mono text-xs text-[#19A88F]">
                  {member.role}
                </div>
              </div>

              {/* Footer Meta / GitHub Link */}
              <div className="mt-4 pt-3 border-t border-[#15221c]/60 flex items-center justify-between font-mono text-[10px] text-[#68736E]">
                <span className="uppercase">{member.category}</span>
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#35D6B3] hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ArrowLink to="/team">View complete organizational directory</ArrowLink>
        </div>
      </Shell>
    </section>
  )
}
