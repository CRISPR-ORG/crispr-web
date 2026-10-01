import { useScrollReveal } from "../hooks/useScrollReveal"
import { alumni } from "../data/alumni"
import { PageHeader, Shell, Frame, ArrowLink } from "../components/ui"

export default function Alumni() {
  useScrollReveal()

  return (
    <div>
      <PageHeader
        path="/alumni"
        title="Our Alumni"
        subtitle="Where are they now? Following the journeys of CRISPR's trailblazers."
        meta={
          <div className="t-mono">
            {String(alumni.length).padStart(2, "0")} stories · 2025—2026
          </div>
        }
      />

      <section className="pb-24 md:pb-40">
        <Shell>
          {alumni.map((person, i) => (
            <article
              key={person.id}
              className="group reveal py-16 md:py-24"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
                {/* Portrait */}
                <div className="md:col-span-4">
                  <div data-cursor="open">
                    <Frame
                      src={person.image}
                      alt={person.name}
                      monogram={person.initials}
                      monogramSize="3.5rem"
                      ratio="4/5"
                    />
                  </div>
                  <div
                    className="mt-5 flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    <span className="t-mono">Alumni / {person.num}</span>
                    <span className="t-mono">
                      {person.batch.replace("Batch of ", "'")}
                    </span>
                  </div>
                </div>

                {/* Story */}
                <div className="md:col-span-7 md:col-start-6">
                  <div className="t-mono mb-3 text-[color:var(--color-crispr)]">
                    {person.role}
                  </div>

                  <h2 className="t-h2 mb-2">{person.name}</h2>

                  <div className="t-mono mb-6 text-[color:var(--color-fg-3)]">
                    {person.batch}
                  </div>

                  <p className="mb-8 text-[0.9375rem] text-[color:var(--color-fg-2)]">
                    {person.current}
                  </p>

                  {/* Quote */}
                  <blockquote
                    className="mb-10 max-w-xl pl-6 md:pl-8"
                    style={{ borderLeft: "2px solid #19A88F" }}
                  >
                    <p
                      className="font-light leading-[1.45] tracking-[-0.02em] text-[color:var(--color-fg)]"
                      style={{ fontSize: "clamp(1.125rem, 1.9vw, 1.625rem)" }}
                    >
                      &ldquo;{person.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Key Achievements */}
                  <div className="mb-10 max-w-xl">
                    <div className="t-mono mb-4 text-[color:var(--color-crispr)]">
                      Key Achievements
                    </div>
                    <dl>
                      {person.achievements.map((a, j) => (
                        <div
                          key={a}
                          className="flex gap-5 py-3"
                          style={{ borderTop: "1px solid var(--line)" }}
                        >
                          <dt className="shrink-0 font-mono text-[0.75rem] font-semibold tabular-nums text-[color:var(--color-crispr)] pt-[0.1rem]">
                            {j + 1}
                          </dt>
                          <dd className="text-[0.875rem] leading-relaxed text-[color:var(--color-fg-2)]">
                            {a}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <ArrowLink href={person.linkedin}>LinkedIn</ArrowLink>
                </div>
              </div>
            </article>
          ))}

          <div
            className="flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <p className="t-body max-w-md">
              Every one of them left something running. That&apos;s the only
              requirement.
            </p>
            <ArrowLink to="/#team">Meet the current team</ArrowLink>
          </div>
        </Shell>
      </section>
    </div>
  )
}
