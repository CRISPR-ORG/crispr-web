import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { OfficialLogo } from "./Logo"
import { useDna, SectionId } from "../context/DnaContext"

interface NavLinkItem {
  id: SectionId
  label: string
  anchor: string
  route: string
  isCta?: boolean
}

const NAV_ITEMS: NavLinkItem[] = [
  {
    id: "techpulse",
    label: "TechPulse",
    anchor: "techpulse",
    route: "/#techpulse",
  },
  { id: "events", label: "Events", anchor: "events", route: "/#events" },
  {
    id: "access",
    label: "Access",
    anchor: "access",
    route: "/#access",
    isCta: true,
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { activeSection } = useDna()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleNavClick = (item: NavLinkItem) => {
    setMobileOpen(false)
    if (pathname === "/") {
      const el = document.getElementById(item.anchor)
      if (el) {
        const offset = 70
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
      }
    } else {
      window.location.href = item.route
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#050706]/90 backdrop-blur-md border-b border-[#15221c]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between">
          {/* Logo on Left */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none group"
            aria-label="CRISPR IIIT Nagpur Home"
          >
            <OfficialLogo size={36} className="shrink-0" />
            <div className="hidden sm:block leading-tight">
              <span className="font-mono text-xs text-[#19A88F] uppercase tracking-[0.2em] font-semibold block">
                IIIT Nagpur
              </span>
              <span className="font-mono text-[10px] text-[#A5AEA9] tracking-[0.1em] uppercase block">
                Central Research Initiative &amp; Student Public Relations
              </span>
            </div>
          </Link>

          {/* Sections on Right (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id && pathname === "/"

              if (item.isCta) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#050706] bg-[#19A88F] hover:bg-[#35D6B3] font-semibold transition-colors cursor-pointer ml-2"
                  >
                    CRISPR Access
                  </button>
                )
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`relative font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer py-1 ${
                    isActive
                      ? "text-[#F2F4F2] font-semibold"
                      : "text-[#68736E] hover:text-[#A5AEA9]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#19A88F]" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#A5AEA9] hover:text-[#F2F4F2] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="font-mono text-xs uppercase text-[#19A88F]">
              {mobileOpen ? "[CLOSE]" : "[MENU]"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-[#050706] p-8 flex flex-col justify-between lg:hidden overflow-y-auto">
          <div className="space-y-6">
            <div className="font-mono text-xs text-[#19A88F] uppercase tracking-wider pb-2 border-b border-[#15221c]">
              NAVIGATION INDEX
            </div>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`text-xl font-bold tracking-tight uppercase flex items-center justify-between w-full text-left cursor-pointer ${
                        isActive
                          ? "text-[#35D6B3]"
                          : "text-[#A5AEA9] hover:text-[#F2F4F2]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-[#68736E]">
                        {isActive ? "●" : "→"}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="pt-8 border-t border-[#15221c] font-mono text-xs text-[#68736E] space-y-2">
            <div>CRISPR · IIIT NAGPUR</div>
            <div className="text-[#19A88F]">21.1°N 79.0°E</div>
          </div>
        </div>
      )}
    </>
  )
}
