import type { Product } from "../data/products"
import { Status } from "./ui"

export default function ProductRow({
  product,
  showTech = true,
}: {
  product: Product
  showTech?: boolean
}) {
  return (
    <article className="row group" data-cursor="view">
      <div className="relative grid-12 items-start gap-y-4 py-7 md:py-9">
        {/* Index */}
        <div className="col-span-2 md:col-span-1 md:col-start-1">
          <span className="font-mono text-[0.6875rem] tabular-nums text-[color:var(--color-fg-3)]">
            {product.num}
          </span>
        </div>

        {/* Name */}
        <div className="col-span-10 md:col-span-3 md:col-start-2">
          <h3
            className="font-semibold tracking-[-0.028em] text-[color:var(--color-fg)] transition-colors duration-300 group-hover:text-[color:var(--color-crispr)]"
            style={{ fontSize: "clamp(1.375rem, 2.4vw, 2rem)" }}
          >
            {product.name}
          </h3>
          <span className="mt-2 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[color:var(--color-fg-3)]">
            {product.category}
          </span>
        </div>

        {/* Summary */}
        <div className="col-span-12 md:col-span-4 md:col-start-5">
          <p className="t-body max-w-sm text-[color:var(--color-fg-3)]">
            {product.description}
          </p>
          {showTech && product.tech.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {product.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[color:var(--color-crispr)] opacity-80"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Status + year + arrow */}
        <div className="col-span-12 md:col-span-3 md:col-start-10 flex items-center justify-between gap-6 md:justify-end">
          <div className="flex flex-col items-start gap-2 md:items-end">
            <Status label={product.status} />
            <span className="font-mono text-[0.625rem] tabular-nums text-[color:var(--color-fg-3)]">
              {product.year}
            </span>
          </div>
          <span
            className="font-mono text-[color:var(--color-crispr)] opacity-25"
            style={{ fontSize: "1.125rem" }}
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </article>
  )
}
