import { useState } from "react"
import { Shell, SectionLabel, ArrowLink } from "./ui"

interface InitiativePanel {
  id: string
  num: string
  title: string
  tagline: string
  description: string
  systems: { name: string; detail: string; tag: string }[]
  metrics: { label: string; value: string }[]
  actionLabel: string
  actionUrl: string
}

const INITIATIVES: InitiativePanel[] = [
  {
    id: "tech",
    num: "01",
    title: "TECHNOLOGY",
    tagline: "Software that campuses run on.",
    description:
      "We identify friction points across student life at IIIT Nagpur and engineer production software to resolve them. No speculative mockups that wither in a repository — everything we build ships to production with real campus users.",
    systems: [
      {
        name: "Pravesh Entry-Exit App",
        detail:
          "Replaced paper logbooks with instant digital security verification for hostels and gates.",
        tag: "Active · 2,200+ Users",
      },
      {
        name: "AuthBahn Chrome Extension",
        detail:
          "Eliminated daily captive portal login friction across the campus network with secure local storage.",
        tag: "Production · Manifest V3",
      },
      {
        name: "CRISPR Server",
        detail:
          "High-throughput campus FTP server distributing gigabytes of course material, labs, and mirrors.",
        tag: "99.2% Uptime · 2 TB",
      },
      {
        name: "CampusKart & Badal",
        detail:
          "Student marketplace and decentralized academic notes archive for all semesters.",
        tag: "In Service",
      },
    ],
    metrics: [
      { label: "Active Products", value: "09" },
      { label: "Campus Users", value: "2,200+" },
      { label: "LAN Storage", value: "2 TB" },
    ],
    actionLabel: "Inspect all shipped products",
    actionUrl: "/products",
  },
  {
    id: "research",
    num: "02",
    title: "RESEARCH",
    tagline: "Rigorous curiosity through AIRA.",
    description:
      "Through our dedicated research division, AIRA (Artificial Intelligence Research at CRISPR), student engineers explore frontier machine learning, natural language retrieval, and computer vision with experiments that yield reproducible benchmarks.",
    systems: [
      {
        name: "Local Model Quantization",
        detail:
          "Evaluating 4-bit and 8-bit quantized models locally on student workstations without API dependency.",
        tag: "Active Benchmark",
      },
      {
        name: "Weekly Paper Reading Group",
        detail:
          "Deep reading of recent ArXiv preprints, failure-mode critique, and zero-slide technical discussions.",
        tag: "Weekly Cadence",
      },
      {
        name: "Campus AI Assistant",
        detail:
          "Retrieval-augmented pipeline indexing institutional policies, courses, and paperwork.",
        tag: "RAG Evaluation",
      },
      {
        name: "Code Review AST AI",
        detail:
          "Static analysis fused with learned models to leave review comments a human would agree with.",
        tag: "Research Phase",
      },
    ],
    metrics: [
      { label: "Research Areas", value: "04" },
      { label: "Papers Critiqued", value: "40+" },
      { label: "Open Benchmark", value: "Local LLMs" },
    ],
    actionLabel: "Enter AIRA Research Division",
    actionUrl: "/aira",
  },
  {
    id: "community",
    num: "03",
    title: "COMMUNITY",
    tagline: "Engineering culture and continuity.",
    description:
      "Technical skills can be taught, but engineering culture is cultivated. CRISPR maintains an uncompromised environment where juniors learn directly from seniors through code reviews, open collaboration, and shared responsibility.",
    systems: [
      {
        name: "Peer Code Reviews",
        detail:
          "Every line of production code deployed on campus passes through rigorous multi-reviewer critique.",
        tag: "Engineering Standard",
      },
      {
        name: "Alumni Knowledge Bridge",
        detail:
          "Continuous technical mentorship connecting active campus builders with alumni across industry.",
        tag: "Continuous Continuity",
      },
      {
        name: "Campus Pulse Dispatches",
        detail:
          "Curated technical writing documenting architecture decisions and campus engineering stories.",
        tag: "Published Termly",
      },
    ],
    metrics: [
      { label: "Contributors", value: "10 Core" },
      { label: "Alumni Network", value: "04 Leads" },
      { label: "Knowledge Handover", value: "100%" },
    ],
    actionLabel: "Meet the contributors",
    actionUrl: "/#team",
  },
  {
    id: "innovation",
    num: "04",
    title: "INNOVATION",
    tagline: "Showcase stages and hackathons.",
    description:
      "We believe students learn fastest when they put working code in front of people who can critique it. We run high-intensity hackathons and monthly DemoDays where working prototypes are the only currency.",
    systems: [
      {
        name: "DemoDays Monthly Stage",
        detail:
          "Monthly open demonstration stage where builders present working software and accept peer critique.",
        tag: "Monthly Cadence",
      },
      {
        name: "Claude Solvathon",
        detail:
          "Two-stage AI challenge where teams ship real solutions on frontier models from problem to demo.",
        tag: "Upcoming Dec 2025",
      },
      {
        name: "Analytica ML Hackathon",
        detail:
          "Data science and machine learning competition evaluated on modeling rigour and communication.",
        tag: "Nov 2025",
      },
      {
        name: "Server Marathon",
        detail:
          "High-intensity server management and network moderation challenge run inside CRISPR Server.",
        tag: "Live Now",
      },
    ],
    metrics: [
      { label: "Hackathons Hosted", value: "07+" },
      { label: "DemoDays", value: "Monthly" },
      { label: "Event Formats", value: "No Pitch Decks" },
    ],
    actionLabel: "View all events & DemoDays",
    actionUrl: "/events",
  },
]

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(0)
  const current = INITIATIVES[activeTab]

  return (
    <section
      id="initiatives"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="03">Pillars of Impact</SectionLabel>

        {/* Header & Section Navigation Tabs */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              Four Core <span className="text-[#19A88F]">Initiatives.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              From mission-critical campus tools to foundational AI experiments,
              explore our primary operational pillars.
            </p>
          </div>

          {/* Editorial Tab Switcher */}
          <div className="flex flex-wrap gap-2">
            {INITIATIVES.map((init, idx) => {
              const isActive = activeTab === idx
              return (
                <button
                  key={init.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-semibold"
                      : "bg-[#0A0F0D] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F]/50 hover:text-[#F2F4F2]"
                  }`}
                >
                  <span className="opacity-70 mr-1.5">{init.num}</span>
                  <span>{init.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Large Editorial Panel Layout */}
        <div className="mt-12 bg-[#0A0F0D] border border-[#15221c] p-8 lg:p-14 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side: Statement & Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs text-[#19A88F] uppercase tracking-[0.2em]">
                {current.num} // {current.title}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F2F4F2] leading-snug">
                {current.tagline}
              </h3>

              <p className="text-sm sm:text-base text-[#A5AEA9] leading-relaxed">
                {current.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#15221c]">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-[9px] text-[#68736E] uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-lg font-bold text-[#F2F4F2] font-mono mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <ArrowLink to={current.actionUrl}>
                  {current.actionLabel}
                </ArrowLink>
              </div>
            </div>

            {/* Right Side: Key Systems Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.systems.map((sys) => (
                <div
                  key={sys.name}
                  className="p-5 bg-[#050706] border border-[#15221c] hover:border-[#19A88F]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[9px] text-[#35D6B3] uppercase tracking-wider block mb-2">
                      {sys.tag}
                    </span>
                    <h4 className="text-base font-bold text-[#F2F4F2] mb-1.5">
                      {sys.name}
                    </h4>
                    <p className="text-xs text-[#A5AEA9] leading-relaxed">
                      {sys.detail}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#15221c]/60 flex items-center justify-between font-mono text-[10px] text-[#68736E]">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-[#19A88F]">●</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
