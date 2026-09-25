import { useState } from "react"
import { Shell, SectionLabel, Button } from "./ui"
import { useDna } from "../context/DnaContext"

interface Article {
  id: string
  slug: string
  title: string
  category: "Engineering" | "AI Research" | "Infrastructure" | "Security"
  date: string
  readTime: string
  author: string
  authorRole: string
  summary: string
  body: string[]
  tags: string[]
}

const ARTICLES: Article[] = [
  {
    id: "pravesh-architecture",
    slug: "pravesh-architecture",
    title: "Replacing Campus Paper Logbooks with Pravesh: Distributed Transit at Scale",
    category: "Engineering",
    date: "Sep 2025",
    readTime: "7 min read",
    author: "Lakshit Verma",
    authorRole: "Head of Development",
    summary:
      "For years, leaving and entering the IIIT Nagpur campus meant queuing in front of a battered paper binder. Here is how we engineered Pravesh to handle 2,200+ students with instant offline validation and verifiable security auditing.",
    body: [
      "The physical bottleneck of collegiate entry-exit has plagued residential campuses since their inception. At IIIT Nagpur, paper registers led to long queues at evening curfew, smudged ink entries, and zero verifiable emergency auditing.",
      "When the development team set out to build Pravesh, the primary technical constraint was reliability during campus network drops. If the campus Wi-Fi or cellular tower experiences high latency, security guards cannot wait 5 seconds for an API response while 40 students stand at the gate.",
      "We engineered Pravesh on React Native with local SQLite caching and optimistic asynchronous synchronization with our Node.js and MongoDB backend. When a student scans their digital pass, verification occurs in under 120ms against local public key signatures. Once connectivity resumes, logs are seamlessly ingested.",
      "Since rollout, Pravesh has processed over 180,000 transit events with zero downtime, proving that student-led software can replace administrative inertia with rigorous engineering.",
    ],
    tags: ["React Native", "Distributed Systems", "Offline-First", "Node.js"],
  },
  {
    id: "authbahn-captive-portals",
    slug: "authbahn-captive-portals",
    title: "Defeating Captive Portals: Reverse-Engineering Campus Network Auth into AuthBahn",
    category: "Security",
    date: "Aug 2025",
    readTime: "5 min read",
    author: "Tejas Chandane",
    authorRole: "Head of Cybersecurity",
    summary:
      "Campus network captive portals exist to enforce policy, but daily session timeouts create endless friction. We reverse-engineered the handshake to build a lightweight Chrome extension operating strictly on zero-knowledge local storage.",
    body: [
      "Every student who has lived in a hostel knows the frustration: you open your laptop to pull a critical Git branch or join a symposium, only to be redirected to a captive gateway requiring re-authentication.",
      "Existing scripts written by students often took the dangerous shortcut of transmitting plain credentials across raw HTTP scripts or storing them unencrypted on shared desktops.",
      "AuthBahn took a radically different engineering approach. Built as a Chrome Manifest V3 extension, AuthBahn performs client-side AES-GCM encryption using a local device key. Credentials never touch remote servers or telemetry sinks.",
      "When the extension detects the specific challenge payload emitted by the campus firewall, it constructs and dispatches the authenticated challenge response in the background, allowing seamless Internet resumption within milliseconds.",
    ],
    tags: ["Chrome API", "Cryptography", "Network Security", "TypeScript"],
  },
  {
    id: "aira-edge-models",
    slug: "aira-edge-models",
    title: "Small Models, Real Hardware: Why AIRA Evaluates Open-Weights Locally",
    category: "AI Research",
    date: "Jul 2025",
    readTime: "9 min read",
    author: "Abdul Ahad",
    authorRole: "Head of AIRA",
    summary:
      "Frontier API models are remarkable, but relying on external endpoints for campus infrastructure is a recipe for vendor lock-in and latency. How AIRA quantizes and benchmarks 3B–8B models on student hardware.",
    body: [
      "In the rush toward ever-larger commercial AI models, academic engineering labs frequently fall into the trap of becoming mere API wrapper consumers. At AIRA, we deliberately chose a different path.",
      "Campus utilities need to operate within budget, maintain absolute privacy of student queries, and remain functional regardless of external rate limits or API pricing changes.",
      "Our research group focused on 4-bit and 8-bit quantization frameworks (GGUF and AWQ) running against localized consumer GPUs. We evaluated smaller frontier open-weight models across tasks such as syllabus extraction, code review AST traversal, and institutional policy retrieval.",
      "Our findings demonstrate that fine-tuned 7B parameters models, when coupled with structured BM25 and vector hybrid retrieval pipelines, outperform generalist 70B models in institutional precision while running at 45 tokens per second on local student workstations.",
    ],
    tags: ["Quantization", "Local LLMs", "Evaluation", "AIRA"],
  },
  {
    id: "crispr-server-infrastructure",
    slug: "crispr-server-infrastructure",
    title: "Inside the CRISPR Mainframe: Maintaining 99.2% Uptime on 2TB of Academic Storage",
    category: "Infrastructure",
    date: "May 2025",
    readTime: "6 min read",
    author: "Ashmit Garg",
    authorRole: "Server Moderator",
    summary:
      "When cloud drives hit quota limits and external file hosts became infested with advertisements, CRISPR deployed its own high-speed FTP server inside the campus intranet. Here is how it works.",
    body: [
      "Academic coursework in computer science requires massive datasets, Linux distribution ISOs, compiler toolchains, and lecture archives that quickly choke ordinary consumer cloud drives.",
      "In 2023, CRISPR launched the CRISPR Server — a dedicated hardware node hosted directly on the campus LAN. Because traffic traverses the internal network switch, download speeds routinely achieve gigabit throughput without consuming external bandwidth.",
      "Operating a public server on a campus network requires strict rate limiting, automated malware scanning for uploads, and granular permission tiering for department folders.",
      "Through custom Python and FastAPI automation paired with automated daily ZFS snapshots, the server has delivered 99.2% uptime over 2 years, hosting over 1,800 active student users.",
    ],
    tags: ["Linux", "FastAPI", "ZFS", "Networking"],
  },
]

export default function TechPulseSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const { scrollProgress } = useDna()

  const categories = ["All", "Engineering", "AI Research", "Security", "Infrastructure"]

  const filteredArticles =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory)

  return (
    <section
      id="techpulse"
      className="relative py-28 md:py-36 border-t border-[#15221c] z-20 overflow-hidden"
    >
      <Shell>
        <SectionLabel num="04">TechPulse Publication</SectionLabel>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15221c]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F4F2] leading-tight">
              Engineering <span className="text-[#19A88F]">Intelligence.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A5AEA9] max-w-xl">
              Authentic systems postmortems, architecture breakdowns, and AI
              benchmarks written by the engineers building CRISPR.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#19A88F] text-[#050706] border-[#35D6B3] font-semibold"
                    : "bg-[#0A0F0D] text-[#A5AEA9] border-[#15221c] hover:border-[#19A88F]/50 hover:text-[#F2F4F2]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Information Stream Bar — horizontal particle flow simulation */}
        <div className="my-8 py-3 px-4 bg-[#0A0F0D] border border-[#15221c] flex items-center justify-between font-mono text-[10px] text-[#68736E] overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#35D6B3] animate-pulse" />
            <span className="text-[#35D6B3] uppercase tracking-wider">
              FLOWING_STREAM // TECHPULSE_FEED
            </span>
          </div>

          {/* Animated Stream Lines */}
          <div className="hidden md:flex items-center gap-1 overflow-hidden px-8 flex-1 justify-center opacity-60">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="inline-block w-4 h-px bg-[#19A88F] transition-all duration-300"
                style={{
                  opacity: ((i + Math.round(scrollProgress * 20)) % 4) / 4,
                  transform: `scaleX(${0.5 + (i % 3) * 0.25})`,
                }}
              />
            ))}
          </div>

          <span className="shrink-0 text-[#A5AEA9]">
            DISPATCHES: 04 PEER-REVIEWED ARTICLES
          </span>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-[#0A0F0D] border border-[#15221c] p-6 lg:p-8 flex flex-col justify-between hover:border-[#19A88F]/60 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Subtle top hover highlight line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#19A88F] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[#68736E] pb-3 border-b border-[#15221c]/60 mb-4">
                  <span className="text-[#19A88F] font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span>
                    {article.date} · {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F4F2] group-hover:text-[#35D6B3] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#A5AEA9] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#15221c]/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#F2F4F2]">
                    {article.author}
                  </div>
                  <div className="font-mono text-[10px] text-[#68736E]">
                    {article.authorRole}
                  </div>
                </div>

                <span className="font-mono text-xs text-[#19A88F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read dispatch →
                </span>
              </div>
            </article>
          ))}
        </div>
      </Shell>

      {/* Reader Modal for Selected Article */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050706]/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-[#0A0F0D] border border-[#19A88F]/40 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 relative space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 font-mono text-xs text-[#68736E] hover:text-[#F2F4F2] px-2 py-1 border border-[#15221c] cursor-pointer"
            >
              [ESC / CLOSE]
            </button>

            <div>
              <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider mb-2">
                {selectedArticle.category} // {selectedArticle.date} // {selectedArticle.readTime}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F2F4F2] leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="mt-2 text-xs text-[#A5AEA9] font-mono">
                By {selectedArticle.author} · {selectedArticle.authorRole}
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#A5AEA9] leading-relaxed pt-4 border-t border-[#15221c]">
              {selectedArticle.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#15221c] flex flex-wrap gap-2">
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-[#35D6B3] px-2.5 py-1 bg-[#050706] border border-[#15221c]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
