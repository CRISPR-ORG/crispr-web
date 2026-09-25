import { useState } from "react"
import { Shell, SectionLabel, Button } from "./ui"
import { useDna } from "../context/DnaContext"

interface NetworkNode {
  id: string
  name: string
  code: string
  role: string
  category: "SYSTEM" | "RESEARCH" | "TOOL" | "MEDIA" | "COMMUNITY"
  specs: string
  desc: string
  actionLabel: string
  actionUrl: string
  external?: boolean
  coords: { x: number; y: number } // Percentage position for visual network
}

const NETWORK_NODES: NetworkNode[] = [
  {
    id: "ftp",
    name: "FTP Server",
    code: "NODE_01",
    role: "Campus LAN Intranet Mirror",
    category: "SYSTEM",
    specs: "2 TB Storage · Gigabit Switch · 99.2% Uptime",
    desc: "CRISPR's central file server providing students high-speed on-campus access to course archives, academic papers, syllabus materials, developer tooling, and system mirrors without consuming external internet bandwidth.",
    actionLabel: "Access FTP Server",
    actionUrl: "https://crispr.iiitn.ac.in/",
    external: true,
    coords: { x: 18, y: 22 },
  },
  {
    id: "authbahn",
    name: "AuthBahn",
    code: "NODE_02",
    role: "Browser Authentication Extension",
    category: "TOOL",
    specs: "Chrome Manifest V3 · AES-GCM Client Crypto",
    desc: "A client-side Chrome extension designed to eliminate daily captive portal login friction across the IIIT Nagpur campus network. Authenticates securely using zero-knowledge local storage.",
    actionLabel: "Inspect AuthBahn",
    actionUrl: "https://github.com/crispr-iiitn",
    external: true,
    coords: { x: 82, y: 20 },
  },
  {
    id: "techpulse",
    name: "TechPulse",
    code: "NODE_03",
    role: "Editorial Intelligence Publication",
    category: "MEDIA",
    specs: "Vol. 03 · Student Written · Systems Postmortems",
    desc: "CRISPR's tech journalism platform delivering curated deep-dives on applied artificial intelligence, campus engineering projects, and system breakdowns without corporate fluff.",
    actionLabel: "Read TechPulse",
    actionUrl: "#techpulse",
    coords: { x: 86, y: 55 },
  },
  {
    id: "demodays",
    name: "DemoDays",
    code: "NODE_04",
    role: "Monthly Live Build Showcase",
    category: "COMMUNITY",
    specs: "Monthly Cadence · Open Registration · Zero Pitch Decks",
    desc: "The flagship monthly showcase where student builders put unfinished code in front of the community. No pitch decks: ship real software, demo it live on stage, and absorb peer feedback.",
    actionLabel: "Explore DemoDays",
    actionUrl: "#events",
    coords: { x: 74, y: 84 },
  },
  {
    id: "pravesh",
    name: "Pravesh",
    code: "NODE_05",
    role: "Campus Transit & Gatepass Portal",
    category: "SYSTEM",
    specs: "React Native · Node.js · 2,200+ Active Users",
    desc: "A smart gate-pass and entry-exit platform replacing physical paper registers across campus hostels and checkpoints, drastically enhancing student convenience and verifiable security auditing.",
    actionLabel: "View Pravesh Specs",
    actionUrl: "/products",
    coords: { x: 16, y: 78 },
  },
  {
    id: "aira",
    name: "AIRA Lab",
    code: "NODE_06",
    role: "AI Research at CRISPR",
    category: "RESEARCH",
    specs: "4 Research Directions · Local Model Quantization",
    desc: "Our dedicated artificial intelligence research division investigating local quantization, RAG evaluation pipelines, and static code AST traversal running on student hardware.",
    actionLabel: "Enter AIRA Lab",
    actionUrl: "/aira",
    coords: { x: 48, y: 12 },
  },
  {
    id: "campuspulse",
    name: "Campus Pulse",
    code: "NODE_07",
    role: "Official Community Newsletter",
    category: "MEDIA",
    specs: "Termly Dispatches · Campus Culture & Tech",
    desc: "The voice of the CRISPR community — chronicling student achievements, technical deep dives, workshop summaries, and campus culture across every academic term.",
    actionLabel: "Read Campus Pulse",
    actionUrl: "/products",
    coords: { x: 12, y: 48 },
  },
  {
    id: "badal",
    name: "Badal & CampusKart",
    code: "NODE_08",
    role: "Academic Cloud & Marketplace",
    category: "TOOL",
    specs: "Peer Maintained · Resource Bank",
    desc: "Decentralized digital utility platforms aggregating class notes, syllabus guidelines, and previous-year exam papers alongside a peer-to-peer student marketplace.",
    actionLabel: "View Utility Tools",
    actionUrl: "/products",
    coords: { x: 38, y: 88 },
  },
]

export default function Ecosystem() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(
    NETWORK_NODES[0],
  )
  const { setActiveTarget } = useDna()

  const handleNodeHover = (node: NetworkNode) => {
    setSelectedNode(node)
    setActiveTarget(node.id)
  }

  const handleNodeLeave = () => {
    setActiveTarget(null)
  }

  return (
    <section
      id="ecosystem"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20 overflow-hidden"
    >
      <Shell>
        <SectionLabel num="02">Living Network</SectionLabel>

        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              The CRISPR <span className="text-[#19A88F]">Ecosystem.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              An interconnected web of production systems, research initiatives,
              and tools engineered by students for the IIIT Nagpur campus.
            </p>
          </div>
          <div className="font-mono text-xs text-[#68736E] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19A88F] animate-pulse" />
            <span>INTERACTIVE NETWORK GRAPH // 08 CONNECTED NODES</span>
          </div>
        </div>

        {/* Network Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Living Network (Desktop Graph) */}
          <div className="lg:col-span-7 bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-8 min-h-[460px] lg:min-h-[540px] relative flex items-center justify-center">
            {/* SVG Connecting Lines between Central CRISPR and Nodes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Concentric orbital rings */}
              <circle
                cx="50"
                cy="50"
                r="22"
                fill="none"
                stroke="#15221c"
                strokeWidth="0.4"
                strokeDasharray="1 2"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#15221c"
                strokeWidth="0.4"
              />

              {NETWORK_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id
                return (
                  <line
                    key={node.id}
                    x1="50"
                    y1="50"
                    x2={node.coords.x}
                    y2={node.coords.y}
                    stroke={isSelected ? "#35D6B3" : "#15221c"}
                    strokeWidth={isSelected ? "1.2" : "0.5"}
                    strokeDasharray={isSelected ? "none" : "1 1"}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>

            {/* Central CRISPR Hub Node */}
            <div className="z-10 w-24 h-24 rounded-full bg-[#050706] border-2 border-[#19A88F] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(25,168,143,0.2)]">
              <span className="font-black text-sm text-[#F2F4F2] tracking-wider">
                CRISPR
              </span>
              <span className="font-mono text-[8px] text-[#35D6B3] tracking-widest mt-0.5">
                NEXUS
              </span>
            </div>

            {/* Distributed Perimeter Nodes */}
            {NETWORK_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeHover(node)}
                  onMouseEnter={() => handleNodeHover(node)}
                  onMouseLeave={handleNodeLeave}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-1.5 rounded transition-all duration-300 flex items-center gap-2 cursor-pointer font-mono text-[10px] uppercase tracking-wider border ${
                    isSelected
                      ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] scale-110 shadow-[0_0_20px_rgba(53,214,179,0.4)]"
                      : "bg-[#050706] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F] hover:text-[#F2F4F2]"
                  }`}
                  style={{
                    left: `${node.coords.x}%`,
                    top: `${node.coords.y}%`,
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-[#050706]" : "bg-[#19A88F]"
                    }`}
                  />
                  <span>{node.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Active Node Telemetry & Direct Action */}
          <div className="lg:col-span-5 bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#15221c] font-mono text-xs">
                <span className="text-[#19A88F] font-semibold">
                  {selectedNode.code} // {selectedNode.category}
                </span>
                <span className="text-[#68736E]">CAMPUS_VERIFIED</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2F4F2]">
                  {selectedNode.name}
                </h3>
                <div className="font-mono text-xs text-[#35D6B3] mt-1">
                  {selectedNode.role}
                </div>
              </div>

              <div className="p-3 bg-[#050706] border border-[#15221c] font-mono text-xs text-[#A5AEA9] space-y-1">
                <span className="text-[#68736E] text-[10px] block uppercase">
                  Technical Specifications
                </span>
                <span className="text-[#F2F4F2]">{selectedNode.specs}</span>
              </div>

              <p className="text-sm text-[#A5AEA9] leading-relaxed pt-2">
                {selectedNode.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#15221c] flex items-center justify-between">
              {selectedNode.external ? (
                <Button href={selectedNode.actionUrl} variant="primary" arrow>
                  {selectedNode.actionLabel}
                </Button>
              ) : (
                <Button to={selectedNode.actionUrl} variant="primary" arrow>
                  {selectedNode.actionLabel}
                </Button>
              )}

              <span className="font-mono text-[10px] text-[#68736E] uppercase">
                Active in production
              </span>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
