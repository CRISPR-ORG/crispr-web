import { useState } from "react"
import { Shell, SectionLabel, Frame } from "./ui"
import { team, TeamMember } from "../data/team"

export default function TeamSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [featuredIndex, setFeaturedIndex] = useState<number>(0)
  const [viewMode, setViewMode] = useState<"spotlight" | "gallery">("spotlight")

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

  // Ensure featuredIndex stays within range of filtered list
  const activeMember = filteredTeam[featuredIndex] || filteredTeam[0] || team[0]

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
              The Engineering{" "}
              <span className="text-[#19A88F]">Collective.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              Student software architects, machine learning researchers, and
              infrastructure maintainers driving CRISPR at IIIT Nagpur.
            </p>
          </div>

          {/* Department Tabs & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key)
                    setFeaturedIndex(0)
                  }}
                  className={`px-3 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                    activeCategory === cat.key
                      ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-semibold"
                      : "bg-[#0A0F0D] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F]/50 hover:text-[#F2F4F2]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Spotlight vs Gallery */}
            <div className="flex items-center border border-[#15221c] bg-[#0A0F0D] p-0.5">
              <button
                onClick={() => setViewMode("spotlight")}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "spotlight"
                    ? "bg-[#19A88F]/20 text-[#35D6B3] font-semibold"
                    : "text-[#68736E] hover:text-[#A5AEA9]"
                }`}
                title="Interactive Spotlight View"
              >
                Spotlight
              </button>
              <button
                onClick={() => setViewMode("gallery")}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "gallery"
                    ? "bg-[#19A88F]/20 text-[#35D6B3] font-semibold"
                    : "text-[#68736E] hover:text-[#A5AEA9]"
                }`}
                title="Full Roster Gallery View"
              >
                Gallery
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════ VIEW MODE 1: INTERACTIVE SPOTLIGHT ═══════════════ */}
        {viewMode === "spotlight" ? (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Large Editorial Focus Canvas */}
            <div className="lg:col-span-5 bg-[#0A0F0D] border border-[#15221c] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[#68736E] uppercase pb-3 border-b border-[#15221c] mb-6">
                  <span className="text-[#35D6B3] font-semibold">
                    LEVEL 0{activeMember.level} // {activeMember.category}
                  </span>
                  <span>IIIT_NAGPUR</span>
                </div>

                {/* Portrait Canvas */}
                <div className="group mb-6">
                  <Frame
                    key={activeMember.image}
                    src={activeMember.image}
                    alt={activeMember.name}
                    monogram={activeMember.initials}
                    monogramSize="3rem"
                    ratio="4/5"
                  />
                </div>

                {/* Information Lockup */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider font-semibold">
                    {activeMember.domain || activeMember.role}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F2F4F2]">
                    {activeMember.name}
                  </h3>
                  <div className="font-mono text-sm text-[#A5AEA9]">
                    {activeMember.role}
                  </div>
                </div>

                <p className="mt-4 text-sm text-[#A5AEA9] leading-relaxed pt-3 border-t border-[#15221c]/70">
                  {activeMember.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#15221c] flex items-center justify-between">
                {activeMember.github ? (
                  <a
                    href={activeMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#35D6B3] hover:underline flex items-center gap-1.5"
                  >
                    <span>View GitHub Profile</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span className="font-mono text-[10px] text-[#68736E] uppercase">
                    CRISPR Contributor
                  </span>
                )}
                <span className="font-mono text-[10px] text-[#68736E]">
                  Verified Lead
                </span>
              </div>
            </div>

            {/* Right Column: Architectural Interactive Roster */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                {filteredTeam.map((member, idx) => {
                  const isSelected = activeMember.name === member.name
                  return (
                    <div
                      key={member.name}
                      onMouseEnter={() => setFeaturedIndex(idx)}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[#0A0F0D] border-[#19A88F] shadow-[0_0_20px_rgba(25,168,143,0.12)] translate-x-1"
                          : "bg-[#050706] border-[#15221c] hover:border-[#19A88F]/40"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <div>
                          <h4
                            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                              isSelected ? "text-[#35D6B3]" : "text-[#F2F4F2]"
                            }`}
                          >
                            {member.name}
                          </h4>
                          <div className="font-mono text-xs text-[#A5AEA9]">
                            {member.role}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className="font-mono text-[10px] uppercase text-[#68736E] px-2 py-0.5 border border-[#15221c] bg-[#0A0F0D]">
                          {member.category}
                        </span>
                        <span
                          className={`font-mono text-sm transition-transform ${
                            isSelected
                              ? "text-[#19A88F] translate-x-1"
                              : "text-[#68736E] opacity-40"
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-6 flex items-center justify-between font-mono text-xs text-[#68736E]">
                <span>
                  Hover or tap any contributor to inspect full profile
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ═══════════════ VIEW MODE 2: EDITORIAL GALLERY GRID ═══════════════ */
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeam.map((member, idx) => (
              <div
                key={member.name}
                className="group bg-[#0A0F0D] border border-[#15221c] p-5 flex flex-col justify-between hover:border-[#19A88F]/60 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="font-mono text-[10px] text-[#68736E] uppercase tracking-widest pb-3 border-b border-[#15221c]/60 flex items-center justify-between">
                    <span className="text-[#35D6B3]">
                      LEVEL 0{member.level}
                    </span>
                  </div>

                  {/* Portrait Frame with Monogram Fallback */}
                  <Frame
                    className="my-5"
                    src={member.image}
                    alt={member.name}
                    monogram={member.initials}
                    monogramSize="2.5rem"
                    ratio="4/5"
                  />

                  {/* Name & Role */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-[#F2F4F2] group-hover:text-[#35D6B3] transition-colors">
                      {member.name}
                    </h3>
                    <div className="font-mono text-xs text-[#19A88F]">
                      {member.role}
                    </div>
                  </div>

                  {/* Editorial Description */}
                  {member.description && (
                    <p className="mt-3 text-xs text-[#A5AEA9] leading-relaxed line-clamp-3">
                      {member.description}
                    </p>
                  )}
                </div>

                {/* Footer Meta & GitHub */}
                <div className="mt-5 pt-3 border-t border-[#15221c]/60 flex items-center justify-between font-mono text-[10px] text-[#68736E]">
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
        )}

      </Shell>
    </section>
  )
}
