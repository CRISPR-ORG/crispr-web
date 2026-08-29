import { useScrollReveal } from "../hooks/useScrollReveal"
import { researchAreas, airaProjects, airaActivities } from "../data/aira"
import {
  Shell,
  SectionLabel,
  ArrowLink,
  Status,
  Button,
} from "../components/ui"

export default function Aira() {
  useScrollReveal()

  return (
    <div>
      {/* ── Header: research division masthead ── */}
      <header className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
        <Shell className="relative">
          <div className="mono-raw mb-8 text-[color:var(--color-crispr)]">
            /aira
          </div>

          <div className="grid-12 items-end gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <h1
                className="font-bold leading-[0.84] tracking-[-0.055em] text-[color:var(--color-fg)]"
                style={{ fontSize: "clamp(5rem, 15vw, 13rem)" }}
              >
                AIRA
              </h1>
              <div className="t-mono mt-6">
                Artificial Intelligence Research at CRISPR
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pb-4">
              <p className="t-lead mb-8">
                Where curiosity meets artificial intelligence — a student
                research division working on problems that have an answer you
                can measure.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Status label="Research active" />
                <span className="t-mono">Head · Abdul Ahad</span>
              </div>
            </div>
          </div>

          {/* File tree spanning the full grid — structure as decoration */}
          <div
            className="mt-16 grid-12 gap-y-8 pt-10 md:mt-24"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <div className="col-span-12 md:col-span-5 font-mono text-[0.8125rem] leading-[2]">
              <div className="text-[color:var(--color-crispr)]">research/</div>
              {researchAreas.map((a) => (
                <div key={a.id} className="flex items-center gap-2">
                  <span className="text-[color:var(--color-fg-3)] opacity-50">
                    ├──
                  </span>
                  <span
                    className={
                      a.active
                        ? "text-[color:var(--color-crispr-light)]"
                        : "text-[color:var(--color-fg-3)]"
                    }
                  >
                    {a.path}
                  </span>
                  {a.active && (
                    <span className="text-[0.5rem] text-[color:var(--color-crispr)]">
                      ●
                    </span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-[color:var(--color-fg-3)] opacity-50">
                  └──
                </span>
                <span className="text-[color:var(--color-fg-3)]">
                  experimentation
                </span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-3 gap-6">
              {[
                ["Areas", String(researchAreas.length).padStart(2, "0")],
                ["Projects", String(airaProjects.length).padStart(2, "0")],
                ["Papers read", "40+"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="t-num text-[2rem] font-semibold leading-none text-[color:var(--color-fg)] md:text-[2.75rem]">
                    {v}
                  </div>
                  <div className="t-mono mt-3">{k}</div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </header>

      {/* ── 01 Research areas ── */}
      <section
        className="py-24 md:py-32"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <Shell>
          <SectionLabel num="01">Research areas</SectionLabel>
          <h2 className="t-h2 reveal mt-7 mb-16 max-w-2xl">
            Four directions, one method.
          </h2>

          <div>
            {researchAreas.map((area) => (
              <article key={area.id} className="row group" data-cursor="view">
                <div className="grid-12 items-start gap-y-6 py-9 md:py-12">
                  <div className="col-span-12 md:col-span-4">
                    <div className="mono-raw mb-3 text-[color:var(--color-crispr)]">
                      ./{area.path}
                    </div>
                    <h3 className="t-h3 transition-colors duration-300 group-hover:text-[color:var(--color-crispr-light)]">
                      {area.title}
                    </h3>
                  </div>

                  <div className="col-span-12 md:col-span-4">
                    <p className="t-body max-w-sm">{area.description}</p>
                  </div>

                  <div className="col-span-12 md:col-span-3 md:col-start-10">
                    <ul className="space-y-2">
                      {area.topics.map((t) => (
                        <li
                          key={t}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[color:var(--color-fg-3)] transition-colors duration-300 group-hover:text-[color:var(--color-fg-2)]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Status label={area.active ? "Active" : "Paused"} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 02 Projects ── */}
      <section
        className="py-24 md:py-32"
        style={{
          background: "var(--color-bg-2, #070707)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <Shell>
          <SectionLabel num="02">Featured projects</SectionLabel>
          <h2 className="t-h2 reveal mt-7 mb-16 max-w-2xl">
            Currently in the lab.
          </h2>

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {airaProjects.map((p, i) => (
              <article
                key={p.name}
                className={`reveal reveal-d${i + 1} pt-6`}
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[0.6875rem] tabular-nums text-[color:var(--color-crispr)]">
                    {p.num}
                  </span>
                  <Status label={p.status} />
                </div>
                <h3 className="t-h3 mb-4">{p.name}</h3>
                <p className="t-body mb-7">{p.summary}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[color:var(--color-fg-3)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── 03 How it runs ── */}
      <section
        className="py-24 md:py-32"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <Shell>
          <div className="grid-12 gap-y-14">
            <div className="col-span-12 lg:col-span-4">
              <SectionLabel num="03">How it runs</SectionLabel>
              <h2 className="t-h2 reveal mt-7 max-w-[12ch]">
                No mystery, just meetings.
              </h2>
              <p className="t-body mt-8 max-w-sm">
                AIRA is open to any CRISPR member willing to read the paper
                before showing up.
              </p>
              <div className="mt-10">
                <Button to="/contact" variant="ghost" arrow>
                  Join a session
                </Button>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {airaActivities.map((a, i) => (
                <div
                  key={a.title}
                  className={`reveal reveal-d${i + 1} grid grid-cols-[3rem_1fr] gap-6 py-7`}
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span className="font-mono text-[0.6875rem] tabular-nums text-[color:var(--color-crispr)] pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 text-[1.0625rem] font-semibold tracking-[-0.02em] text-[color:var(--color-fg)]">
                      {a.title}
                    </h3>
                    <p className="t-body">{a.detail}</p>
                  </div>
                </div>
              ))}
              <div
                className="flex items-center justify-between pt-7"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <span className="t-mono">Meets weekly</span>
                <ArrowLink to="/contact">Ask about AIRA</ArrowLink>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </div>
  )
}
