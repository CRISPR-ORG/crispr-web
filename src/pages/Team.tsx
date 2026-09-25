import { useScrollReveal } from "../hooks/useScrollReveal"
import { team } from "../data/team"
import TeamMemberCard from "../components/TeamMember"
import { PageHeader, Shell, ArrowLink } from "../components/ui"

function Tier({
  num,
  label,
  count,
  note,
}: {
  num: string
  label: string
  count: number
  note?: string
}) {
  return (
    <div
      className="mb-10 flex items-end justify-between gap-6 pb-4"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[0.6875rem] tabular-nums text-[color:var(--color-crispr)]">
          {num}
        </span>
        <h2 className="text-[1.25rem] font-semibold tracking-[-0.025em] text-[color:var(--color-fg)] md:text-[1.5rem]">
          {label}
        </h2>
        {note && <span className="t-mono hidden md:block">{note}</span>}
      </div>
      <span className="t-mono shrink-0">{String(count).padStart(2, "0")}</span>
    </div>
  )
}

export default function Team() {
  useScrollReveal()

  const leadership = team.filter((m) => m.category === "leadership")
  const development = team.filter((m) => m.category === "development")
  const departments = team.filter((m) => m.category === "departments")
  const infrastructure = team.filter((m) => m.category === "infrastructure")

  return (
    <div>
      <PageHeader
        path="/team"
        title="The team"
        subtitle="People building CRISPR."
        meta={<span className="status">{team.length} active contributors</span>}
      />

      <section className="pb-28 pt-16 md:pb-40 md:pt-24">
        <Shell>
          {/* ── 01 LEADERSHIP — visually dominant ── */}
          <Tier
            num="01"
            label="Leadership"
            count={leadership.length}
            note="Sets direction"
          />
          <div className="grid-12 gap-y-10">
            {leadership.map((m, i) => (
              <div
                key={m.name}
                className={`col-span-12 sm:col-span-6 md:col-span-5 reveal reveal-d${i + 1}`}
              >
                <TeamMemberCard
                  member={m}
                  size="lg"
                  ratio="4/5"
                  index={m.role === "Lead" ? "01" : "02"}
                />
              </div>
            ))}
            <div className="col-span-12 md:col-span-2 md:col-start-11 flex items-end pb-2">
              <p className="t-body reveal reveal-d3">
                Two people accountable for everything the club puts its name on.
              </p>
            </div>
          </div>

          {/* ── 02 DEVELOPMENT ── */}
          <div className="mt-24 md:mt-32">
            <Tier
              num="02"
              label="Development"
              count={development.length}
              note="Ships the software"
            />
            <div className="grid-12 gap-y-10">
              <div className="col-span-12 sm:col-span-7 md:col-span-4 reveal">
                <TeamMemberCard
                  member={development[0]}
                  size="lg"
                  ratio="4/5"
                  index="03"
                />
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-6 flex flex-col justify-center">
                <div className="reveal reveal-d1">
                  <div className="t-mono mb-5 text-[color:var(--color-crispr)]">
                    Engineering
                  </div>
                  <p className="t-lead max-w-md">
                    Leads the engineering arm of CRISPR — shipping products,
                    keeping the infrastructure standing, and turning first-years
                    into people who can review a pull request.
                  </p>
                  <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 max-w-md">
                    {([
                      ["Stack", "React · Node · Python · Postgres"],
                      ["Repos", "https://github.com/CRISPR-ORG"],
                      ["Active builds", "04"],
                      ["Reviewers", "03"],
                    ] as [string, string][]).map(([k, v]) => (
                      <div
                        key={k}
                        className="pt-3"
                        style={{ borderTop: "1px solid var(--line)" }}
                      >
                        <dt className="t-mono mb-1">{k}</dt>
                        <dd className="text-[0.8125rem] text-[color:var(--color-fg)]">
                          {k === "Repos" ? (
                            <a
                              href="https://github.com/yummyPancake2607"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors duration-300 hover:text-[color:var(--color-crispr)]"
                            >
                              github/yummyPancake2607
                            </a>
                          ) : (
                            v
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* ── 03 DEPARTMENT HEADS ── */}
          <div className="mt-24 md:mt-32">
            <Tier
              num="03"
              label="Department heads"
              count={departments.length}
              note="Own a domain each"
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
              {departments.map((m, i) => (
                <div key={m.name} className={`reveal reveal-d${(i % 6) + 1}`}>
                  <TeamMemberCard
                    member={m}
                    size="sm"
                    ratio="1/1"
                    index={String(i + 4).padStart(2, "0")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── 04 INFRASTRUCTURE ── */}
          <div className="mt-24 md:mt-32">
            <Tier
              num="04"
              label="Infrastructure"
              count={infrastructure.length}
              note="Keeps it online"
            />
            <div className="grid-12 gap-y-10">
              {infrastructure.map((m) => (
                <div
                  key={m.name}
                  className="col-span-6 sm:col-span-4 md:col-span-2 reveal"
                >
                  <TeamMemberCard member={m} size="sm" ratio="1/1" index="10" />
                </div>
              ))}
              <div className="col-span-12 md:col-span-6 md:col-start-4 flex items-center">
                <div className="reveal reveal-d1 w-full font-mono text-[0.75rem] leading-[2]">
                  <div className="text-[color:var(--color-fg-3)]">
                    {"// manages CRISPR Server infrastructure"}
                  </div>
                  <div className="text-[color:var(--color-fg-3)]">
                    {"// uptime 99.2%  ·  storage 2 TB  ·  users 1800+"}
                  </div>
                  <div className="mt-4">
                    <span className="status">Server online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div
            className="mt-24 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-32"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <p className="t-body max-w-md">
              Want your name on this page? Recruitment opens each semester —
              talk to us first.
            </p>
            <ArrowLink to="/contact">Get in touch</ArrowLink>
          </div>
        </Shell>
      </section>
    </div>
  )
}
