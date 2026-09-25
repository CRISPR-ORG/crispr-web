import { Link } from "react-router"
import { Shell } from "./ui"
import { OfficialLogo } from "./Logo"

const SECTIONS = [
  { to: "/#about", label: "About CRISPR" },
  { to: "/#what-we-do", label: "What We Do" },
  { to: "/#ecosystem", label: "CRISPR Ecosystem" },
  { to: "/products", label: "Initiatives & Projects" },
  { to: "/#techpulse", label: "TechPulse Publication" },
  { to: "/events", label: "Events & DemoDays" },
  { to: "/team", label: "The Team" },
  { to: "/alumni", label: "Alumni Archive" },
  { to: "/#history", label: "History Timeline" },
  { to: "/#access", label: "CRISPR Access Gateway" },
]

const SERVICES = [
  { href: "https://crispr.iiitn.ac.in/", label: "FTP Server (Campus LAN)" },
  {
    href: "https://github.com/crispr-iiitn",
    label: "AuthBahn Chrome Extension",
  },
  {
    href: "https://github.com/crispr-iiitn",
    label: "Pravesh Entry-Exit System",
  },
  { href: "/aira", label: "AIRA Research Lab" },
  {
    href: "https://github.com/crispr-iiitn",
    label: "CRISPR GitHub Organization",
  },
]

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/crispr-iiit-nagpur/",
  },
  { label: "Instagram", href: "https://www.instagram.com/crispr_iiitn/" },
  { label: "GitHub", href: "https://github.com/crispr-iiitn" },
  { label: "YouTube", href: "https://www.youtube.com/@CRISPRIIITNagpur" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#080909] border-t border-[#242826] overflow-hidden">
      <Shell className="pt-20 pb-12 md:pt-28">
        {/* Top Lockup Bar */}
        <div className="mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#242826]">
          <div className="flex items-center gap-4">
            <OfficialLogo size={44} />
            <div>
              <div className="text-xl font-bold tracking-tight text-[#F2F2F2]">
                CRISPR
              </div>
              <div className="font-mono text-xs text-[#777D7A] mt-0.5">
                Central Research Initiative & Student Public Relations · IIIT
                Nagpur
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-[#19A88F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19A88F] animate-pulse" />
            <span>CRISPR MAIN NETWORK OPERATIONAL</span>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid-12 gap-y-12 pb-16 border-b border-[#242826]">
          {/* Col 1: Sitemap */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#19A88F] mb-4">
              Website Index
            </div>
            <ul className="space-y-2 text-sm">
              {SECTIONS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.to}
                    className="text-[#777D7A] hover:text-[#F2F2F2] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Digital Gateway Services */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#19A88F] mb-4">
              Digital Gateway
            </div>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-[#777D7A] hover:text-[#19A88F] transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#19A88F]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Coordinates & Affiliation */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#19A88F] mb-4">
              Campus Affiliation
            </div>
            <div className="space-y-3 text-xs text-[#777D7A] leading-relaxed">
              <p className="text-[#F2F2F2] font-semibold">
                Indian Institute of Information Technology, Nagpur
              </p>
              <p>
                Survey No. 140, 141/1, Waranga, Dongargaon (Butibori), Nagpur
                441108, Maharashtra, India.
              </p>
              <div className="font-mono pt-2 text-[#777D7A]">
                <div>
                  Email:{" "}
                  <a
                    href="mailto:crispr@iiitn.ac.in"
                    className="text-[#19A88F] hover:underline"
                  >
                    crispr@iiitn.ac.in
                  </a>
                </div>
                <div>Coordinates: 21.1°N 79.0°E · IST (UTC+5:30)</div>
              </div>
            </div>
          </div>

          {/* Col 4: Network & Socials */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#19A88F] mb-4">
              Connect & Verify
            </div>
            <ul className="space-y-2 text-sm mb-6">
              {SOCIALS.map((soc) => (
                <li key={soc.label}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#777D7A] hover:text-[#2ED9B8] transition-colors flex items-center justify-between"
                  >
                    <span>{soc.label}</span>
                    <span className="text-[#19A88F] font-mono text-xs">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-[#0e1010] border border-[#242826] font-mono text-[10px] text-[#777D7A] space-y-1">
              <div className="text-[#19A88F] font-bold">SYSTEM TELEMETRY</div>
              <div className="flex justify-between">
                <span>Infrastructure:</span>
                <span className="text-[#F2F2F2]">Arch Linux / bspwm</span>
              </div>
              <div className="flex justify-between">
                <span>Production Nodes:</span>
                <span className="text-[#F2F2F2]">09 Services</span>
              </div>
              <div className="flex justify-between">
                <span>Overall Uptime:</span>
                <span className="text-[#19A88F]">99.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Architectural Watermark */}
        <div
          className="relative select-none py-6 pointer-events-none"
          aria-hidden
        >
          <div
            className="w-full font-black leading-none tracking-[-0.05em] text-transparent text-center"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 14rem)",
              WebkitTextStroke: "1px rgba(36, 40, 38, 0.9)",
            }}
          >
            CRISPR IIITN
          </div>
        </div>

        {/* Bottom Legal / Student Foundation line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#242826] font-mono text-[11px] text-[#777D7A]">
          <span>
            © {year} CRISPR — Central Research Initiative & Student Public
            Relations.
          </span>
          <span className="text-[#777D7A]">
            Built with integrity by student engineers at IIIT Nagpur.
          </span>
        </div>
      </Shell>
    </footer>
  )
}
