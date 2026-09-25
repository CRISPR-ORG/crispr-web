import { Link } from "react-router"
import { Shell } from "./ui"
import { OfficialLogo } from "./Logo"

const SECTIONS = [
  { to: "/#about", label: "About CRISPR" },
  { to: "/#ecosystem", label: "Living Ecosystem" },
  { to: "/#initiatives", label: "Four Initiatives" },
  { to: "/#techpulse", label: "TechPulse Publication" },
  { to: "/#events", label: "Events & DemoDays" },
  { to: "/#team", label: "The Team" },
  { to: "/#alumni", label: "Alumni Archive" },
  { to: "/#history", label: "History Timeline" },
  { to: "/#access", label: "Access Gateway" },
]

const SERVICES = [
  { href: "https://crispr.iiitn.ac.in/", label: "FTP Server (Campus LAN)" },
  {
    href: "https://github.com/CRISPR-ORG",
    label: "AuthBahn Chrome Extension",
  },
  { href: "/products", label: "Pravesh Entry-Exit System" },
  { href: "/aira", label: "AIRA Research Lab" },
  {
    href: "https://github.com/CRISPR-ORG",
    label: "CRISPR GitHub Organization",
  },
]

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/crispr-iiit-nagpur/",
  },
  { label: "Instagram", href: "https://www.instagram.com/crispr_iiitn/" },
  { label: "GitHub", href: "https://github.com/CRISPR-ORG" },
  { label: "YouTube", href: "https://www.youtube.com/@CRISPRIIITNagpur" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#040504] border-t border-[#15221c] overflow-hidden z-20">
      <Shell className="pt-20 pb-12 md:pt-28">
        {/* Top Lockup Bar */}
        <div className="mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#15221c]">
          <div className="flex items-center gap-4">
            <OfficialLogo size={46} />
            <div>
              <div className="text-xl font-bold tracking-tight text-[#F2F4F2]">
                CRISPR
              </div>
              <div className="font-mono text-xs text-[#68736E] mt-0.5">
                Central Research Initiative & Student Public Relations · IIIT
                Nagpur
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-[#19A88F] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F]" />
            <span>DNA UNWOUND // SYSTEM AT REST</span>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#15221c]">
          {/* Col 1: Sitemap */}
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#19A88F] mb-4 font-semibold">
              Website Index
            </div>
            <ul className="space-y-2 text-sm">
              {SECTIONS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.to}
                    className="text-[#68736E] hover:text-[#F2F4F2] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Digital Gateway Services */}
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#19A88F] mb-4 font-semibold">
              Production Gateway
            </div>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#68736E] hover:text-[#F2F4F2] transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-[#68736E] hover:text-[#F2F4F2] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Institutional Affiliation */}
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#19A88F] mb-4 font-semibold">
              Institution
            </div>
            <div className="space-y-3 text-sm text-[#68736E]">
              <p>Indian Institute of Information Technology, Nagpur</p>
              <p className="font-mono text-xs">
                Permanent Campus, Survey No. 140,141/1 Behind Br. Sheshrao
                Wankhade Shetkari Sahkari Soot Girni, Village - Waranga, PO -
                Dongargaon (Butibori), Tahsil - Nagpur (Rural) - 441108
              </p>
              <div className="pt-2">
                <a
                  href="https://iiitn.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#35D6B3] hover:underline"
                >
                  iiitn.ac.in ↗
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Community & Socials */}
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#19A88F] mb-4 font-semibold">
              External Channels
            </div>
            <ul className="space-y-2 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68736E] hover:text-[#F2F4F2] transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-[#19A88F]">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-[#15221c]/60">
              <button
                onClick={scrollToTop}
                className="font-mono text-xs text-[#68736E] hover:text-[#35D6B3] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>↑</span>
                <span>BACK TO TOP // DNA ASCENT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#68736E]">
          <div>© 2022–{year} CRISPR, IIIT Nagpur. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>21.1°N 79.0°E</span>
            <span>BUILD → SHIP → LEARN</span>
          </div>
        </div>
      </Shell>
    </footer>
  )
}
