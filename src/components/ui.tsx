import type { ReactNode } from "react"
import { Link } from "react-router"
import Scramble from "./Scramble"

/* ───────────────────────── Layout ───────────────────────── */

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`shell ${className}`}>{children}</div>
}

/** Page header used by every inner route — keeps all pages on one grid. */
export function PageHeader({
  path,
  title,
  subtitle,
  meta,
}: {
  path: string
  title: string
  subtitle: string
  meta?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
      <Shell className="relative">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="mono-raw mb-5 text-[color:var(--color-crispr)]">
              {path}
            </div>
            <h1 className="t-h1">
              <Scramble text={title} speed={38} stagger={2.4} />
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="t-lead max-w-sm">{subtitle}</p>
            {meta && <div className="mt-7">{meta}</div>}
          </div>
        </div>
        <hr className="rule mt-12 md:mt-16" />
      </Shell>
    </header>
  )
}

/* ───────────────────────── Section label ───────────────────────── */

export function SectionLabel({
  num,
  children,
}: {
  num: string
  children: ReactNode
}) {
  return (
    <div className="section-label reveal">
      <span className="tabular-nums">{num}</span>
      <span className="opacity-40">/</span>
      <span>{children}</span>
    </div>
  )
}

/** Section heading block: label + big title + optional aside copy. */
export function SectionHead({
  num,
  label,
  title,
  aside,
  action,
}: {
  num: string
  label: string
  title: string
  aside?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-14 md:mb-20">
      <SectionLabel num={num}>{label}</SectionLabel>
      <div className="mt-7 grid-12 items-end gap-y-6">
        <h2 className="col-span-12 md:col-span-7 t-h2">
          <Scramble text={title} speed={30} stagger={1.5} />
        </h2>
        {(aside || action) && (
          <div className="col-span-12 md:col-span-4 md:col-start-9 reveal reveal-d2">
            {aside && <p className="t-body max-w-xs">{aside}</p>}
            {action && <div className="mt-6">{action}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Arrow link ───────────────────────── */

export function ArrowLink({
  to,
  href,
  children,
  className = "",
}: {
  to?: string
  href?: string
  children: ReactNode
  className?: string
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="arrow" aria-hidden>
        →
      </span>
    </>
  )
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`link-arrow ${className}`}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link to={to ?? "/"} className={`link-arrow ${className}`}>
      {inner}
    </Link>
  )
}

/* ───────────────────────── Buttons ───────────────────────── */

export function Button({
  to,
  href,
  variant = "primary",
  children,
  arrow = false,
  onClick,
  type,
}: {
  to?: string
  href?: string
  variant?: "primary" | "ghost"
  children: ReactNode
  arrow?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  const cls = `btn btn-${variant}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="arrow" aria-hidden>
          →
        </span>
      )}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

/* ───────────────────────── Media frame ───────────────────────── */

/**
 * Image container that tolerates any source dimensions and degrades to a
 * monogram when the file is missing. The monogram sits *behind* the photo,
 * so a real photograph always wins.
 */
export function Frame({
  src,
  alt,
  monogram,
  ratio = "3/4",
  monogramSize = "2.75rem",
  bar = true,
  className = "",
  children,
}: {
  src?: string
  alt: string
  monogram?: string
  ratio?: string
  monogramSize?: string
  bar?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={`frame ${className}`} style={{ aspectRatio: ratio }}>
      {monogram && (
        <div
          className="monogram"
          style={{ fontSize: monogramSize }}
          aria-hidden
        >
          {monogram}
        </div>
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = "none"
          }}
        />
      )}
      {bar && <span className="bar" aria-hidden />}
      {children}
    </div>
  )
}

/* ───────────────────────── Status pill ───────────────────────── */

const LIVE = new Set(["active", "live", "registration open", "research active"])

export function Status({ label }: { label: string }) {
  const live = LIVE.has(label.toLowerCase())
  return <span className={`status ${live ? "" : "status-idle"}`}>{label}</span>
}

/* ───────────────────────── Code block ───────────────────────── */

export function CodeBlock({
  filename,
  children,
  className = "",
}: {
  filename?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`code-surface ${className}`}>
      {filename && (
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <span className="t-mono normal-case tracking-normal">{filename}</span>
        </div>
      )}
      <pre className="code overflow-x-auto px-5 py-5 m-0">{children}</pre>
    </div>
  )
}
