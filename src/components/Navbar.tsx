import { useState, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router"
import Logo from "./Logo"

const links = [
  { to: "/team", label: "Team" },
  { to: "/products", label: "Products" },
  { to: "/events", label: "Events" },
  { to: "/alumni", label: "Alumni" },
  { to: "/aira", label: "AIRA" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? "nav-solid" : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between lg:h-[4.5rem]">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="CRISPR home"
          >
            <Logo size={26} />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive
                      ? "text-[color:var(--color-crispr)]"
                      : "text-[color:var(--color-fg-3)] hover:text-[color:var(--color-fg)]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <span className="h-3 w-px bg-[color:var(--line-strong)]" />
            <span className="status">Systems Online</span>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-50 -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className="block h-px w-[18px] bg-[color:var(--color-fg)] transition-transform duration-300"
              style={{
                transform: open ? "translateY(3px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-[18px] bg-[color:var(--color-fg)] transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-px w-[18px] bg-[color:var(--color-fg)] transition-transform duration-300"
              style={{
                transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col lg:hidden"
        style={{
          background: "#000000",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.4s var(--ease)",
        }}
        aria-hidden={!open}
      >
        <div className="relative flex flex-1 flex-col justify-center px-6 pb-16 pt-24">
          <div className="t-mono mb-8">Navigation</div>
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="block border-b py-5 text-[2rem] font-semibold leading-none tracking-[-0.035em] text-[color:var(--color-fg)]"
              style={{
                borderColor: "var(--line)",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(0.75rem)",
                transition: `opacity 0.5s var(--ease) ${i * 45 + 80}ms, transform 0.5s var(--ease) ${i * 45 + 80}ms`,
              }}
            >
              <span className="mr-4 font-mono text-[0.625rem] align-middle text-[color:var(--color-crispr)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </NavLink>
          ))}
          <div className="mt-10 flex items-center justify-between">
            <span className="status">Systems Online</span>
            <span className="t-mono">crispr@iiitn</span>
          </div>
        </div>
      </div>
    </>
  )
}
