import { useEffect } from "react"

/**
 * Adds `.visible` to any `.reveal*` element as it scrolls into view.
 * Runs once per mount; re-scans when `deps` change (e.g. a filtered list).
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(
    () => {
      const nodes = document.querySelectorAll(
        ".reveal:not(.visible), .reveal-fade:not(.visible), .reveal-mask:not(.visible)",
      )
      if (!nodes.length) return

      // No IntersectionObserver (or reduced motion): show everything immediately.
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
      if (reduced || typeof IntersectionObserver === "undefined") {
        nodes.forEach((n) => n.classList.add("visible"))
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      )

      nodes.forEach((n) => observer.observe(n))
      return () => observer.disconnect()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    deps,
  )
}
