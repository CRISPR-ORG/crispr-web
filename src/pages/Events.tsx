import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { events, eventYears, type EventItem } from "../data/events"
import { PageHeader, Shell, Frame, Status } from "../components/ui"

/** One archive entry: alternating editorial spread, no cards. */
function EventEntry({ event, flip }: { event: EventItem; flip: boolean }) {
  return (
    <article
      className="group reveal grid-12 items-center gap-y-8 py-14 md:py-20"
      style={{ borderTop: "1px solid var(--line)" }}
      data-cursor="open"
    >
      {/* Photograph */}
      <div
        className={`col-span-12 md:col-span-6 ${
          flip ? "md:order-2 md:col-start-7" : ""
        }`}
      >
        <Frame
          src={event.image}
          alt={event.name}
          monogram={event.name.charAt(0)}
          monogramSize="4rem"
          ratio="3/2"
        />
      </div>

      {/* Copy */}
      <div
        className={`col-span-12 md:col-span-5 ${
          flip ? "md:order-1 md:col-start-1" : "md:col-start-8"
        }`}
      >
        <div className="mb-5 flex items-center gap-4">
          <span className="font-mono text-[0.6875rem] tabular-nums text-[color:var(--color-crispr)]">
            {event.num}
          </span>
          <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          <Status label={event.status} />
        </div>

        <div className="t-mono mb-4">
          {event.type} · {event.date} · {event.location}
        </div>

        <h2 className="t-h2 mb-5 transition-colors duration-500 group-hover:text-[color:var(--color-crispr-light)]">
          {event.name}
        </h2>

        <p className="t-body max-w-md">{event.description}</p>

        {event.highlights.length > 0 && (
          <ul className="mt-8 space-y-0">
            {event.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[color:var(--color-fg-2)]"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <span className="text-[color:var(--color-crispr)]">▸</span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function Events() {
  const [year, setYear] = useState("All")
  const filtered =
    year === "All" ? events : events.filter((e) => e.year === year)
  useScrollReveal([year])

  return (
    <div>
      <PageHeader
        path="/events"
        title="Events"
        subtitle="Competitions, workshops, and experiences that shape our community."
        meta={
          <div>
            <div className="t-num text-2xl font-semibold text-[color:var(--color-fg)]">
              {String(events.length).padStart(2, "0")}
            </div>
            <div className="t-mono mt-1">In archive</div>
          </div>
        }
      />

      {/* Year filter */}
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <Shell>
          <div className="flex items-center justify-between gap-6 py-4">
            <div className="flex gap-1">
              {eventYears.map((y) => {
                const on = year === y
                return (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className="px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300"
                    style={{
                      color: on ? "var(--color-bg)" : "var(--color-fg-3)",
                      background: on ? "var(--color-crispr)" : "transparent",
                    }}
                  >
                    {y}
                  </button>
                )
              })}
            </div>
            <span className="t-mono">
              {String(filtered.length).padStart(2, "0")} entries
            </span>
          </div>
        </Shell>
      </div>

      {/* Archive */}
      <section className="pb-24 md:pb-40">
        <Shell>
          {filtered.map((e, i) => (
            <EventEntry key={e.id} event={e} flip={i % 2 === 1} />
          ))}
          <div
            className="flex items-center justify-between pt-8"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="t-mono">End of archive</span>
            <span className="t-mono">More coming this semester</span>
          </div>
        </Shell>
      </section>
    </div>
  )
}
