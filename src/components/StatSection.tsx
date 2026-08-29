import { useCountUp } from "../hooks/useCountUp"
import { Shell, SectionLabel } from "./ui"

interface Stat {
  value: number
  suffix?: string
  pad?: boolean
  label: string
  note: string
}

const stats: Stat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Projects shipped",
    note: "Across campus systems, media and tooling",
  },
  {
    value: 2200,
    suffix: "+",
    label: "Students impacted",
    note: "Every user of a CRISPR product on this campus",
  },
  {
    value: 4,
    pad: true,
    label: "Featured alumni",
    note: "From IIM Calcutta to Intel",
  },
  {
    value: 3,
    pad: true,
    label: "Years running",
    note: "Founded 2022, still shipping",
  },
]

function StatFigure({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value)
  const display = stat.pad
    ? String(value).padStart(2, "0")
    : value.toLocaleString("en-US")

  return (
    <div
      className="group relative flex min-w-0 flex-col py-10 md:py-14"
      style={{
        borderTop: "1px solid var(--line)",
        containerType: "inline-size",
      }}
    >
      <div
        className="t-num flex min-w-0 items-baseline whitespace-nowrap font-bold leading-[0.86] text-[color:var(--color-fg)] transition-colors duration-500 group-hover:text-[color:var(--color-crispr)]"
        style={{ fontSize: "clamp(2.75rem, 27cqi, 6.5rem)" }}
      >
        <span ref={ref}>{display}</span>
        {stat.suffix && (
          <span
            className="text-[color:var(--color-crispr)]"
            style={{ fontSize: "0.5em", marginLeft: "0.08em" }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="mt-7">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--color-fg)]">
          {stat.label}
        </div>
        <p className="mt-2 max-w-[16rem] text-[0.8125rem] leading-relaxed text-[color:var(--color-fg-3)]">
          {stat.note}
        </p>
      </div>
    </div>
  )
}

export default function StatSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <Shell className="relative">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="02">Impact</SectionLabel>
            <h2 className="t-h2 reveal mt-7 max-w-2xl">
              The measure of a club is what it leaves running.
            </h2>
          </div>
          <span className="t-mono shrink-0">Updated Aug 2026</span>
        </div>

        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatFigure key={s.label} stat={s} />
          ))}
        </div>
      </Shell>
    </section>
  )
}
