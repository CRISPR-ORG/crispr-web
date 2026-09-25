import { useState } from "react"
import { Shell, SectionLabel, Button } from "./ui"
import { useDna } from "../context/DnaContext"

interface GatewayService {
  id: string
  title: string
  code: string
  category: string
  actionLabel: string
  url: string
  external?: boolean
  description: string
  protocol: string
  accessGuide: string
  status: "ONLINE" | "ACTIVE" | "PRODUCTION" | "RESEARCH"
}

const GATEWAY_SERVICES: GatewayService[] = [
  {
    id: "ftp",
    title: "FTP Server",
    code: "SVC_01",
    category: "CAMPUS LAN INTRANET",
    actionLabel: "Launch FTP Server",
    url: "https://crispr.iiitn.ac.in/",
    external: true,
    description:
      "CRISPR's on-premises file server distributing academic course archives, datasets, developer environments, and Linux mirrors at gigabit speeds across the campus network.",
    protocol: "ftp://crispr.iiitn.ac.in (IIITN LAN)",
    accessGuide: "Connect via internal campus Wi-Fi or wired hostel ethernet for gigabit throughput.",
    status: "ONLINE",
  },
  {
    id: "authbahn",
    title: "AuthBahn",
    code: "SVC_02",
    category: "SECURITY UTILITY",
    actionLabel: "Get Chrome Extension",
    url: "https://github.com/crispr-iiitn",
    external: true,
    description:
      "A client-side Chrome extension automating campus network captive portal login with zero-knowledge AES local storage. Eliminates daily login timeouts.",
    protocol: "Chrome Web Store / Manifest V3",
    accessGuide: "Install from GitHub release or Chrome Store; credentials remain strictly on-device.",
    status: "PRODUCTION",
  },
  {
    id: "techpulse",
    title: "TechPulse",
    code: "SVC_03",
    category: "EDITORIAL INTELLIGENCE",
    actionLabel: "Read TechPulse Feed",
    url: "#techpulse",
    description:
      "Weekly engineering dispatches, systems postmortems, and artificial intelligence evaluations authored directly by CRISPR student contributors.",
    protocol: "HTTPS / RSS Feed",
    accessGuide: "Browse peer-reviewed technical articles and systems architecture breakdowns.",
    status: "ACTIVE",
  },
  {
    id: "demodays",
    title: "DemoDays",
    code: "SVC_04",
    category: "SHOWCASE STAGE",
    actionLabel: "Inspect DemoDays",
    url: "#events",
    description:
      "Monthly open stage where student engineers demonstrate working code, test early prototypes, and receive transparent technical critiques from peers.",
    protocol: "Monthly Campus Physical Showcase",
    accessGuide: "Open registration for all batches; working code mandatory, zero pitch decks.",
    status: "ACTIVE",
  },
  {
    id: "pravesh",
    title: "Pravesh",
    code: "SVC_05",
    category: "CAMPUS TRANSIT",
    actionLabel: "View Pravesh Specs",
    url: "/products",
    description:
      "Smart gate-pass and entry-exit platform replacing physical paper registers across campus checkpoints with offline public-key validation.",
    protocol: "React Native · Node.js · SQLite",
    accessGuide: "Deployed across campus security gates for 2,200+ residential students.",
    status: "PRODUCTION",
  },
  {
    id: "aira",
    title: "AIRA Lab",
    code: "SVC_06",
    category: "AI RESEARCH",
    actionLabel: "Enter AIRA Lab",
    url: "/aira",
    description:
      "Student artificial intelligence research division focusing on 4-bit/8-bit local model quantization, RAG evaluation, and AST static analysis.",
    protocol: "Open-Weights Local Evaluation",
    accessGuide: "Weekly reading group and active experimental projects open to campus contributors.",
    status: "RESEARCH",
  },
  {
    id: "github",
    title: "CRISPR GitHub",
    code: "SVC_07",
    category: "OPEN SOURCE ORG",
    actionLabel: "Visit GitHub Organization",
    url: "https://github.com/crispr-iiitn",
    external: true,
    description:
      "The official open-source repository containing source code for campus utilities, web applications, and experimental algorithms.",
    protocol: "git://github.com/crispr-iiitn",
    accessGuide: "Pull requests and issue reports welcomed across all public projects.",
    status: "ONLINE",
  },
]

export default function AccessGateway() {
  const [activeService, setActiveService] = useState<GatewayService>(GATEWAY_SERVICES[0])
  const { setActiveTarget } = useDna()

  const handleSelectService = (svc: GatewayService) => {
    setActiveService(svc)
    setActiveTarget(svc.id)
  }

  return (
    <section
      id="access"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20"
    >
      <Shell>
        <SectionLabel num="09">Access Gateway</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              CRISPR Direct <span className="text-[#19A88F]">Gateway.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              The centralized launchpad for connecting to production campus
              servers, extensions, research labs, and open-source repositories.
            </p>
          </div>
          <span className="font-mono text-xs text-[#68736E] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35D6B3] animate-pulse" />
            <span>GATEWAY ROUTER // VERIFIED CAMPUS ENDPOINTS</span>
          </span>
        </div>

        {/* Interactive Gateway Terminal Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Service Selector Directory */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-xs text-[#68736E] uppercase tracking-wider mb-2">
              SERVICES DIRECTORY // SELECT ENDPOINT
            </div>

            {GATEWAY_SERVICES.map((svc) => {
              const isSelected = activeService.id === svc.id
              return (
                <button
                  key={svc.id}
                  onClick={() => handleSelectService(svc)}
                  onMouseEnter={() => handleSelectService(svc)}
                  className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0A0F0D] border-[#19A88F] shadow-[0_0_20px_rgba(25,168,143,0.15)]"
                      : "bg-[#050706] border-[#15221c] hover:border-[#19A88F]/40"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-mono text-[9px] text-[#35D6B3] uppercase tracking-wider">
                      {svc.code} // {svc.category}
                    </div>
                    <div
                      className={`text-lg font-bold tracking-tight ${
                        isSelected ? "text-[#35D6B3]" : "text-[#F2F4F2]"
                      }`}
                    >
                      {svc.title}
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[9px] uppercase px-2 py-0.5 border ${
                      isSelected
                        ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-bold"
                        : "bg-[#0A0F0D] text-[#68736E] border-[#15221c]"
                    }`}
                  >
                    {svc.status}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Active Gateway Connection Console */}
          <div className="lg:col-span-7 bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#15221c] font-mono text-xs">
                <span className="text-[#19A88F] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#19A88F] animate-pulse" />
                  GATEWAY CHANNEL: {activeService.code}
                </span>
                <span className="text-[#68736E]">AUTHENTICATED ROUTE</span>
              </div>

              <div>
                <span className="font-mono text-xs text-[#35D6B3] uppercase tracking-wider block mb-1">
                  {activeService.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F2F4F2]">
                  {activeService.title}
                </h3>
              </div>

              <div className="p-4 bg-[#050706] border border-[#15221c] font-mono text-xs space-y-2">
                <div>
                  <span className="text-[#68736E] text-[10px] uppercase block">
                    Protocol / Endpoint
                  </span>
                  <span className="text-[#35D6B3] break-all">
                    {activeService.protocol}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#15221c]/60">
                  <span className="text-[#68736E] text-[10px] uppercase block">
                    Connection Instructions
                  </span>
                  <span className="text-[#A5AEA9]">
                    {activeService.accessGuide}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#A5AEA9] leading-relaxed">
                {activeService.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#15221c] flex flex-wrap items-center justify-between gap-4">
              {activeService.external ? (
                <Button
                  href={activeService.url}
                  variant="primary"
                  arrow
                >
                  {activeService.actionLabel}
                </Button>
              ) : (
                <Button
                  to={activeService.url}
                  variant="primary"
                  arrow
                >
                  {activeService.actionLabel}
                </Button>
              )}

              <span className="font-mono text-[10px] text-[#68736E] uppercase">
                CRISPR · IIIT NAGPUR
              </span>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
