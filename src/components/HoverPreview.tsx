import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface PreviewState {
  src: string
  label: string
}

/**
 * A single floating thumbnail that follows the pointer. One instance is shared
 * by every row on the page — rows publish what they want shown through the
 * returned setter, so we never mount one node per row.
 */
export function useHoverPreview() {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  return { preview, setPreview }
}

export default function HoverPreview({
  preview,
}: {
  preview: PreviewState | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0
    let synced = false

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      // Snap on the first sample, otherwise the thumbnail flies in from 0,0.
      if (!synced) {
        synced = true
        cx = x
        cy = y
        el.style.left = `${cx}px`
        el.style.top = `${cy}px`
      }
    }

    const tick = () => {
      // Lag the thumbnail behind the pointer so it feels weighted.
      cx += (x - cx) * 0.13
      cy += (y - cy) * 0.13
      el.style.left = `${cx}px`
      el.style.top = `${cy}px`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [mounted])

  if (!mounted) return null

  return createPortal(
    <div
      ref={ref}
      className={`hover-preview ${preview ? "is-on" : ""}`}
      aria-hidden
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "16/10",
          border: "1px solid rgba(0,255,65,0.45)",
          boxShadow: "0 0 40px rgba(0,255,65,0.18)",
          background: "#0a0a0a",
        }}
      >
        {preview?.src && (
          <img
            src={preview.src}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        )}
        <span
          className="absolute inset-0 flex items-center justify-center font-bold"
          style={{ color: "rgba(0,255,65,0.28)", fontSize: "2rem" }}
        >
          {preview?.label?.charAt(0)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.14em]">
        <span className="accent">{preview?.label}</span>
        <span className="accent">View →</span>
      </div>
    </div>,
    document.body,
  )
}
