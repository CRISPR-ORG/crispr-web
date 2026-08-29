import { Link } from "react-router"
import { Shell } from "./ui"
import { LogoMark } from "./Logo"

const nav = [
  { to: "/team", label: "Team" },
  { to: "/products", label: "Products" },
  { to: "/events", label: "Events" },
  { to: "/alumni", label: "Alumni" },
  { to: "/aira", label: "AIRA" },
  { to: "/contact", label: "Contact" },
]

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/crispr_iiitn/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/crispr-iiit-nagpur/",
  },
  { label: "GitHub", href: "https://github.com/crispr-iiitn" },
  { label: "YouTube", href: "https://www.youtube.com/@CRISPRIIITNagpur" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <Shell className="relative pt-20 pb-10 md:pt-28">
        <div
          className="mb-16 flex items-center gap-4 pb-8"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <LogoMark size={34} />
          <div>
            <div className="text-[1.0625rem] font-bold tracking-[-0.03em] text-[color:var(--color-fg)]">
              CRISPR
            </div>
            <div className="t-mono mt-1">
              Central Research Initiative and Student Public Relations
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid-12 gap-y-12 pb-16 md:pb-24">
          <div className="col-span-12 md:col-span-4">
            <div className="t-mono mb-5">Index</div>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-[0.9375rem] text-[color:var(--color-fg)] hover:text-[color:var(--color-crispr-light)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="t-mono mb-5">Elsewhere</div>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.9375rem] text-[color:var(--color-fg)] hover:text-[color:var(--color-crispr-light)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="t-mono mb-5">Reach us</div>
            <ul className="space-y-3 text-[0.9375rem] text-[color:var(--color-fg-2)]">
              <li>
                <a
                  href="mailto:crispr@iiitn.ac.in"
                  className="link-underline text-[color:var(--color-fg)]"
                >
                  crispr@iiitn.ac.in
                </a>
              </li>
              <li>
                <a href="tel:+918087167841" className="link-underline">
                  +91 80871 67841
                </a>
              </li>
              <li className="leading-relaxed">
                IIIT Nagpur
                <br />
                Nagpur, Maharashtra 440006
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="t-mono mb-5">Status</div>
            <div className="space-y-3 font-mono text-[0.6875rem] text-[color:var(--color-fg-3)]">
              <span className="status">Operational</span>
              <div className="flex justify-between">
                <span>Projects</span>
                <span className="text-[color:var(--color-fg)]">10</span>
              </div>
              <div className="flex justify-between">
                <span>Members</span>
                <span className="text-[color:var(--color-fg)]">10</span>
              </div>
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="text-[color:var(--color-fg)]">99.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark, clipped to the grid */}
        <div className="relative select-none" aria-hidden>
          <div
            className="w-full font-bold leading-[0.78] tracking-[-0.055em] text-transparent"
            style={{
              fontSize: "clamp(4rem, 18.6vw, 16rem)",
              WebkitTextStroke: "1px rgba(0, 255, 65, 0.18)",
            }}
          >
            CRISPR
          </div>
        </div>

        <hr className="rule mt-10 mb-6" />

        <div className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="t-mono">© {year} CRISPR · IIIT Nagpur</span>
          <span className="t-mono">Built by students, for the campus</span>
        </div>
      </Shell>
    </footer>
  )
}
