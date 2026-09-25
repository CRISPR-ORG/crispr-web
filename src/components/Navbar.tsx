import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"

const NAV_ITEMS = [
  { label: "About", anchor: "about", route: "/#about" },
  { label: "Ecosystem", anchor: "ecosystem", route: "/#ecosystem" },
  { label: "Initiatives", anchor: "initiatives", route: "/products" },
  { label: "TechPulse", anchor: "techpulse", route: "/#techpulse" },
  { label: "Events", anchor: "events", route: "/events" },
  { label: "People", anchor: "team", route: "/team" },
  { label: "Access", anchor: "access", route: "/#access", isCta: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleNavClick = (anchor: string, route: string) => {
    setOpen(false)
    if (pathname === "/") {
      const el = document.getElementById(anchor)
      if (el) {
        const offset = 70
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
        return
      }
    }
    // If on subpage and route is an anchor on home:
    if (route.startsWith("/#")) {
      window.location.href = route
    }
  }

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-[#080909]/90 backdrop-blur-md border-b border-[#242826]"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between lg:h-18">
          {/* Official CRISPR Identity */}
          <Link
            to="/"
            className="group flex flex-col items-start gap-0.5 focus:outline-none"
            aria-label="CRISPR IIIT Nagpur home"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#19A88F]">
              CRISPR - Central Research Initiative & Student Public Relations
            </span>
            <span className="font-bold text-[13px] tracking-tight text-[#F2F2F2]">
              IIIT NAGPUR
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#777D7A]">
              CENTRAL RESEARCH INITIATIVE & STUDENT PUBLIC RELATIONS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => {
              if (item.isCta) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.anchor, item.route)}
                    className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#080909] bg-[#19A88F] font-semibold hover:bg-[#2ED9B8] transition-colors cursor-pointer"
                  >
                    CRISPR Access
                  </button>
                )
              }

              if (pathname === "/" && item.anchor) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.anchor, item.route)}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#777D7A] hover:text-[#F2F2F2] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )
              }

              return (
                <Link
                  key={item.label}
                  to={item.route}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#777D7A] hover:text-[#F2F2F2] transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}

            <span className="h-3 w-px bg-[#242826]" />

            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#19A88F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden text-[#F2F2F2]"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className="block h-px w-5 bg-current transition-transform duration-300"
              style={{
                transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-5 bg-current transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-px w-5 bg-current transition-transform duration-300"
              style={{
                transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Clean Full-Screen Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 flex flex-col lg:hidden bg-[#080909] px-6 pt-24 pb-12 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#19A88F] mb-6">
          Navigation Index
        </div>

        <div className="flex flex-col divide-y divide-[#242826]">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.anchor, item.route)}
              className="py-4 text-left flex items-baseline justify-between text-2xl font-bold text-[#F2F2F2] hover:text-[#19A88F] transition-colors"
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-[#777D7A]">
                {String(idx + 1).padStart(2, "0")} →
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-[#242826] flex items-center justify-between font-mono text-xs text-[#777D7A]">
          <span className="text-[#19A88F]">● CRISPR Gateway Active</span>
          <span>IIIT Nagpur</span>
        </div>
      </div>
    </>
  )
}
