import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { PageHeader, Shell, ArrowLink } from "../components/ui"

const socials = [
  {
    label: "Instagram",
    handle: "@crispr_iiitn",
    href: "https://www.instagram.com/crispr_iiitn/",
  },
  {
    label: "LinkedIn",
    handle: "CRISPR IIIT Nagpur",
    href: "https://www.linkedin.com/company/crispr-iiit-nagpur/",
  },
  {
    label: "GitHub",
    handle: "crispr-iiitn",
    href: "https://github.com/crispr-iiitn",
  },
  {
    label: "YouTube",
    handle: "@CRISPRIIITNagpur",
    href: "https://www.youtube.com/@CRISPRIIITNagpur",
  },
]

const details = [
  {
    label: "Email",
    value: "crispr@iiitn.ac.in",
    href: "mailto:crispr@iiitn.ac.in",
  },
  { label: "Phone", value: "+91 99305 01541", href: "tel:+918087167841" },
  { label: "Address", value: "IIIT Nagpur\nNagpur, Maharashtra 440006" },
]

const fields = [
  {
    key: "name" as const,
    label: "Name",
    type: "text",
    placeholder: "Your name",
  },
  {
    key: "email" as const,
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
]

export default function Contact() {
  useScrollReveal()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        path="/contact"
        title="Get in touch."
        subtitle="Have a question, an idea, or something on campus that needs fixing?"
        meta={<span className="status">Usually replies within 48h</span>}
      />

      <section className="pb-28 pt-16 md:pb-40 md:pt-24">
        <Shell>
          <div className="grid-12 gap-y-20">
            {/* ── Left: coordinates ── */}
            <div className="col-span-12 lg:col-span-4">
              <div className="t-mono mb-8 text-[color:var(--color-crispr)]">
                Coordinates
              </div>

              <dl className="mb-14">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="py-5"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    <dt className="t-mono mb-2">{d.label}</dt>
                    <dd className="text-[0.9375rem] text-[color:var(--color-fg)]">
                      {d.href ? (
                        <a href={d.href} className="link-underline">
                          {d.value}
                        </a>
                      ) : (
                        <span className="whitespace-pre-line leading-relaxed">
                          {d.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="t-mono mb-6 text-[color:var(--color-crispr)]">
                Elsewhere
              </div>
              <ul>
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                      style={{ borderTop: "1px solid var(--line)" }}
                    >
                      <span className="t-mono transition-colors duration-300 group-hover:text-[color:var(--color-crispr)]">
                        {s.label}
                      </span>
                      <span className="flex items-center gap-3 text-[0.875rem] text-[color:var(--color-fg-2)] transition-colors duration-300 group-hover:text-[color:var(--color-fg)]">
                        {s.handle}
                        <span className="inline-block text-[color:var(--color-crispr)] transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right: the form, styled as a terminal transaction ── */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {sent ? (
                <div className="code-surface reveal p-8 md:p-12">
                  <div className="font-mono text-[0.8125rem] leading-[2]">
                    <div className="text-[color:var(--color-crispr)]">
                      $ send --to crispr@iiitn.ac.in
                    </div>
                    <div className="text-[color:var(--color-fg-2)]">
                      ✓ message queued from {form.name || "anonymous"}
                    </div>
                    <div className="text-[color:var(--color-fg-3)]">exit 0</div>
                  </div>
                  <h2 className="t-h3 mt-9 mb-3">Message sent.</h2>
                  <p className="t-body max-w-sm">
                    Thanks — someone from the team will get back to you shortly.
                  </p>
                  <button
                    className="link-arrow mt-8"
                    onClick={() => {
                      setSent(false)
                      setForm({ name: "", email: "", message: "" })
                    }}
                  >
                    Send another <span className="arrow">→</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reveal">
                  <div
                    className="mb-10 flex items-center justify-between pb-4"
                    style={{ borderBottom: "1px solid var(--line)" }}
                  >
                    <span className="font-mono text-[0.8125rem] text-[color:var(--color-crispr)]">
                      $ compose message
                    </span>
                    <span className="t-mono">3 fields</span>
                  </div>

                  <div className="space-y-10">
                    {fields.map((f, i) => (
                      <div key={f.key}>
                        <label
                          htmlFor={f.key}
                          className="mb-3 flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--color-fg-3)]"
                        >
                          <span className="text-[color:var(--color-crispr)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type={f.type}
                          required
                          className="field"
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={(e) =>
                            setForm({ ...form, [f.key]: e.target.value })
                          }
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-3 flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--color-fg-3)]"
                      >
                        <span className="text-[color:var(--color-crispr)]">
                          03
                        </span>
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        required
                        className="field"
                        placeholder="What's on your mind?"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-6">
                    <button type="submit" className="btn btn-primary">
                      <span>$ send message</span>
                      <span className="arrow" aria-hidden>
                        →
                      </span>
                    </button>
                    <span className="t-mono">Or email us directly</span>
                  </div>
                </form>
              )}

              {/* Location strip */}
              <div
                className="mt-20 pt-8"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <div className="grid gap-8 sm:grid-cols-3">
                  {[
                    ["Campus", "IIIT Nagpur"],
                    ["Coordinates", "21.1°N 79.0°E"],
                    ["Time zone", "IST · UTC+5:30"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="t-mono mb-2">{k}</div>
                      <div className="text-[0.875rem] text-[color:var(--color-fg)]">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <ArrowLink to="/team">
                    Rather talk to a person? Meet the team
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </div>
  )
}
