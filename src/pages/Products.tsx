import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { products, type Product } from "../data/products"
import ProductRow from "../components/ProductRow"
import { PageHeader, Shell, Status } from "../components/ui"

const tags = ["All", "Campus", "Media", "Community", "Tools"] as const
type Tag = typeof tags[number]

function matches(p: Product, tag: Tag) {
  return tag === "All" || p.tag === tag.toUpperCase()
}

export default function Products() {
  const [tag, setTag] = useState<Tag>("All")
  const filtered = products.filter((p) => matches(p, tag))
  useScrollReveal([tag])

  const active = products.filter((p) => p.status === "Active").length

  return (
    <div>
      <PageHeader
        path="/products"
        title="Products"
        subtitle="Nine things we made because the campus needed them and nobody else was going to."
        meta={
          <div className="flex gap-8">
            <div>
              <div className="t-num text-2xl font-semibold text-[color:var(--color-fg)]">
                {String(products.length).padStart(2, "0")}
              </div>
              <div className="t-mono mt-1">Shipped</div>
            </div>
            <div>
              <div className="t-num text-2xl font-semibold text-[color:var(--color-crispr)]">
                {String(active).padStart(2, "0")}
              </div>
              <div className="t-mono mt-1">In service</div>
            </div>
          </div>
        }
      />

      {/* Filter rail */}
      <div
        className="sticky top-16 z-30 md:top-[4.5rem]"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <Shell>
          <div className="flex items-center justify-between gap-6">
            <div className="-mx-1 flex overflow-x-auto">
              {tags.map((t) => {
                const on = tag === t
                return (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className="relative shrink-0 px-4 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300"
                    style={{
                      color: on ? "var(--color-crispr)" : "var(--color-fg-3)",
                    }}
                  >
                    {t}
                    <span
                      className="absolute inset-x-3 bottom-0 h-px origin-left transition-transform duration-500"
                      style={{
                        background: "var(--color-crispr)",
                        transform: on ? "scaleX(1)" : "scaleX(0)",
                        transitionTimingFunction: "var(--ease)",
                      }}
                    />
                  </button>
                )
              })}
            </div>
            <span className="t-mono hidden shrink-0 sm:block">
              {String(filtered.length).padStart(2, "0")} results
            </span>
          </div>
        </Shell>
      </div>

      {/* Archive */}
      <section className="pb-28 pt-6 md:pb-40">
        <Shell>
          <div className="flex items-center justify-between py-4">
            <span className="t-mono">Project</span>
            <span className="t-mono hidden md:block">Status / Year</span>
          </div>

          {filtered.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}

          <div
            className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <span className="t-mono">End of archive</span>
            <Status label="All systems active" />
          </div>
        </Shell>
      </section>
    </div>
  )
}
