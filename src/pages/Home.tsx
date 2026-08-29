import { Link } from "react-router"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { products } from "../data/products"
import { team } from "../data/team"
import { events } from "../data/events"
import Hero from "../components/Hero"
import StatSection from "../components/StatSection"
import Marquee from "../components/Marquee"
import ProductRow from "../components/ProductRow"
import TeamMemberCard from "../components/TeamMember"
import {
  Shell,
  SectionHead,
  SectionLabel,
  ArrowLink,
  Button,
  Frame,
  CodeBlock,
  Status,
} from "../components/ui"

const featured = products.filter((p) => p.featured)
const people = team.slice(0, 5)
const recentEvents = events.slice(0, 3)

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Hero />

      {/* Kinetic band — the seam between hero and the page proper */}
      <div
        className="py-8 md:py-10"
        style={{ borderBlock: "1px solid var(--line)" }}
      >
        <Marquee
          items={["BUILD", "SHIP", "LEARN", "REPEAT"]}
          duration={26}
        />
      </div>

      {/* ═══════════════ 01 / ABOUT ═══════════════ */}
      <section className="relative py-24 md:py-36">
        <Shell>
          <SectionLabel num="01">About</SectionLabel>

          <div className="mt-8 grid-12 gap-y-14">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="t-h2 reveal max-w-[15ch]">
                We don&apos;t just talk about technology.{" "}
                <span className="accent">We build it.</span>
              </h2>

              <div className="reveal reveal-d2 mt-10 max-w-lg space-y-5">
                <p className="t-lead">
                  CRISPR is the technology and innovation club at IIIT Nagpur.
                  We take problems that exist on this campus and turn them into
                  software people use every day.
                </p>
                <p className="t-body">
                  No pitch decks without prototypes. No projects that die in a
                  repository. Members join, pick something broken, and ship a
                  fix — then teach the next person how they did it.
                </p>
              </div>

              <div className="reveal reveal-d3 mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
                <ArrowLink to="/products">See what we&apos;ve built</ArrowLink>
                <ArrowLink to="/team">The people behind it</ArrowLink>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <CodeBlock
                filename="crispr.config.ts"
                className="reveal reveal-d2"
              >
                <span className="c">{"// the short version"}</span>
                {"\n"}
                <span className="k">const</span>{" "}
                <span className="s">crispr</span> <span className="p">=</span>{" "}
                <span className="s">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="p">campus</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;IIIT Nagpur&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">founded</span>
                <span className="s">:</span> <span className="k">2022</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="p">focus</span>
                <span className="s">: [</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;Engineering&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;Innovation&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;AI&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"    "}
                <span className="k">&quot;Products&quot;</span>
                <span className="s">,</span>
                {"\n"}
                {"  "}
                <span className="s">],</span>
                {"\n"}
                {"  "}
                <span className="p">philosophy</span>
                <span className="s">:</span>{" "}
                <span className="k">&quot;Build → Ship → Learn&quot;</span>
                <span className="s">,</span>
                {"\n"}
                <span className="s">{"}"}</span>
              </CodeBlock>

              <div
                className="reveal reveal-d3 mt-6 flex items-center justify-between pt-5"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <span className="t-mono">Open source</span>
                <ArrowLink href="https://github.com/crispr-iiitn">
                  github/crispr-iiitn
                </ArrowLink>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ═══════════════ 02 / IMPACT ═══════════════ */}
      <StatSection />

      {/* ═══════════════ 03 / PRODUCTS ═══════════════ */}
      <section className="relative py-24 md:py-36">
        <Shell>
          <SectionHead
            num="03"
            label="Products"
            title="Things we’ve built."
            aside="Software that started as a complaint in a group chat and ended up part of campus life."
            action={
              <ArrowLink to="/products">
                All {products.length} projects
              </ArrowLink>
            }
          />

          <div>
            {featured.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </div>

          <div
            className="flex items-center justify-between pt-7"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <ArrowLink to="/products">View the full archive</ArrowLink>
            <span className="t-mono">{products.length} total</span>
          </div>
        </Shell>
      </section>

      {/* ═══════════════ 04 / PEOPLE ═══════════════ */}
      <section
        className="relative py-24 md:py-36"
        style={{
          background: "var(--color-bg-2, #070707)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <Shell>
          <SectionHead
            num="04"
            label="People"
            title="The people behind the code."
            aside="Ten members, one campus, and a shared refusal to leave things half-finished."
            action={<ArrowLink to="/team">View full team</ArrowLink>}
          />

          {/* Editorial: two dominant portraits, then a supporting run */}
          <div className="grid-12 gap-y-10">
            <div className="col-span-6 md:col-span-4 reveal">
              <TeamMemberCard member={people[0]} size="lg" index="Lead" />
            </div>
            <div className="col-span-6 md:col-span-4 reveal reveal-d1 md:pt-16">
              <TeamMemberCard member={people[1]} size="lg" index="Co-Lead" />
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end pb-2">
              <p className="t-body reveal reveal-d2 mb-6">
                Leadership, development, product, innovation, management,
                outreach, AI and security — each with a name attached and a
                piece of the system to answer for.
              </p>
              <Button to="/team" variant="ghost" arrow>
                The full team
              </Button>
            </div>

            {people.slice(2).map((m, i) => (
              <div
                key={m.name}
                className={`col-span-6 md:col-span-4 reveal reveal-d${i + 1}`}
              >
                <TeamMemberCard member={m} size="md" ratio="5/4" />
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* ═══════════════ 05 / EVENTS ═══════════════ */}
      <section className="relative py-24 md:py-36">
        <Shell>
          <SectionHead
            num="05"
            label="Events"
            title="What happened here."
            aside="Hackathons, workshops and long nights — the archive of everything the club has run."
            action={<ArrowLink to="/events">Full archive</ArrowLink>}
          />

          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {recentEvents.map((e, i) => (
              <Link
                key={e.id}
                to="/events"
                className={`group block reveal reveal-d${i + 1}`}
                data-cursor="open"
              >
                <Frame
                  src={e.image}
                  alt={e.name}
                  monogram={e.name.charAt(0)}
                  monogramSize="3rem"
                  ratio="4/3"
                />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[color:var(--color-fg-3)]">
                    {e.type} · {e.date}
                  </span>
                  <Status label={e.status} />
                </div>
                <h3 className="t-h3 mt-3 transition-colors duration-300 group-hover:text-[color:var(--color-crispr-light)]">
                  {e.name}
                </h3>
                <p className="t-body mt-2 line-clamp-3">{e.description}</p>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      {/* ═══════════════ 06 / AIRA ═══════════════ */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background: "var(--color-bg-3, #0c0c0c)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <Shell className="relative">
          <div className="grid-12 items-center gap-y-14">
            <div className="col-span-12 lg:col-span-6">
              <SectionLabel num="06">AIRA</SectionLabel>
              <h2
                className="reveal mt-8 font-bold leading-[0.86] tracking-[-0.05em] text-[color:var(--color-fg)]"
                style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
              >
                AIRA
              </h2>
              <div className="t-mono reveal reveal-d1 mt-5">
                Artificial Intelligence Research at CRISPR
              </div>
              <p className="t-lead reveal reveal-d2 mt-7 max-w-md">
                Where curiosity meets artificial intelligence. A student
                research division working on machine learning, language, vision
                and generative systems — with results you can run.
              </p>
              <div className="reveal reveal-d3 mt-10">
                <Button to="/aira" variant="ghost" arrow>
                  Enter AIRA
                </Button>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="reveal reveal-d2 font-mono text-[0.8125rem] leading-[2]">
                <div className="mb-1 text-[color:var(--color-crispr)]">
                  research/
                </div>
                {[
                  ["├──", "machine-learning", true],
                  ["├──", "nlp", true],
                  ["├──", "computer-vision", false],
                  ["├──", "generative-ai", true],
                  ["└──", "experimentation", false],
                ].map(([prefix, name, active]) => (
                  <div key={name as string} className="flex items-center gap-2">
                    <span className="text-[color:var(--color-fg-3)] opacity-60">
                      {prefix}
                    </span>
                    <span
                      className={
                        active
                          ? "text-[color:var(--color-crispr-light)]"
                          : "text-[color:var(--color-fg-3)]"
                      }
                    >
                      {name}
                    </span>
                    {active && (
                      <span className="text-[0.5rem] text-[color:var(--color-crispr)]">
                        ●
                      </span>
                    )}
                  </div>
                ))}
                <div
                  className="mt-7 pt-5"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <div className="c mb-3 text-[color:var(--color-fg-3)]">
                    {"// 3 active projects · led by Abdul Ahad"}
                  </div>
                  <span className="status">Research active</span>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Kinetic band — reversed, listing what we actually ship */}
      <div
        className="py-8 md:py-10"
        style={{ borderBlock: "1px solid var(--line)" }}
      >
        <Marquee
          items={["PRAVESH", "CAMPUS PULSE", "TECHPULSE", "CRISPR SERVER", "AUTHBAHN", "AIRA"]}
          duration={44}
          reverse
        />
      </div>

      {/* ═══════════════ CLOSING ═══════════════ */}
      <section className="relative overflow-hidden pt-28 pb-8 md:pt-40">
        <Shell className="relative">
          <div className="grid-12 items-end gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="reveal font-mono text-[0.8125rem] leading-[1.9]">
                <div className="text-[color:var(--color-crispr)]">
                  $ echo &quot;see you inside&quot;
                </div>
                <div className="text-[color:var(--color-fg-2)]">
                  see you inside.
                </div>
              </div>
              <h2 className="t-h2 reveal reveal-d1 mt-8 max-w-[16ch]">
                Got something worth building? Bring it to us.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-wrap gap-3">
              <Button to="/contact" variant="primary" arrow>
                Get in touch
              </Button>
              <Button href="https://github.com/crispr-iiitn" variant="ghost">
                GitHub
              </Button>
            </div>
          </div>
        </Shell>
      </section>
    </>
  )
}
