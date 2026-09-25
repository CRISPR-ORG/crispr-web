import { useEffect, useRef } from "react"
import { useDna, SectionId } from "../context/DnaContext"

interface AmbientParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  pulseSpeed: number
  phase: number
}

export default function EnvironmentalBackground() {
  const { activeSection, scrollProgress, mousePos } = useDna()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Atmospheric lighting coordinates and tints per section
  const getAtmosphereConfig = (section: SectionId) => {
    switch (section) {
      case "hero":
        return {
          glowX: "65%",
          glowY: "38%",
          glowSize: "850px",
          color1: "rgba(25, 168, 143, 0.12)",
          color2: "rgba(14, 33, 27, 0.4)",
          bgTint: "#050706",
          extraHaze: 0.15,
        }
      case "about":
        return {
          glowX: "30%",
          glowY: "50%",
          glowSize: "750px",
          color1: "rgba(25, 168, 143, 0.08)",
          color2: "rgba(18, 30, 26, 0.35)",
          bgTint: "#060907",
          extraHaze: 0.1,
        }
      case "ecosystem":
        return {
          glowX: "50%",
          glowY: "45%",
          glowSize: "900px",
          color1: "rgba(53, 214, 179, 0.11)",
          color2: "rgba(14, 33, 27, 0.45)",
          bgTint: "#050807",
          extraHaze: 0.18,
        }
      case "initiatives":
        return {
          glowX: "40%",
          glowY: "40%",
          glowSize: "700px",
          color1: "rgba(25, 168, 143, 0.07)",
          color2: "rgba(10, 22, 18, 0.3)",
          bgTint: "#050706",
          extraHaze: 0.08,
        }
      case "techpulse":
        return {
          glowX: "55%",
          glowY: "50%",
          glowSize: "850px",
          color1: "rgba(53, 214, 179, 0.13)",
          color2: "rgba(25, 168, 143, 0.25)",
          bgTint: "#060a08",
          extraHaze: 0.2,
        }
      case "events":
        return {
          glowX: "60%",
          glowY: "45%",
          glowSize: "800px",
          color1: "rgba(25, 168, 143, 0.12)",
          color2: "rgba(14, 33, 27, 0.4)",
          bgTint: "#050806",
          extraHaze: 0.16,
        }
      case "team":
      case "alumni":
        return {
          glowX: "45%",
          glowY: "50%",
          glowSize: "750px",
          color1: "rgba(25, 168, 143, 0.09)",
          color2: "rgba(12, 26, 21, 0.35)",
          bgTint: "#050706",
          extraHaze: 0.12,
        }
      case "history":
      case "access":
        return {
          glowX: "50%",
          glowY: "55%",
          glowSize: "800px",
          color1: "rgba(53, 214, 179, 0.1)",
          color2: "rgba(14, 33, 27, 0.35)",
          bgTint: "#050807",
          extraHaze: 0.14,
        }
      case "footer":
      default:
        return {
          glowX: "50%",
          glowY: "80%",
          glowSize: "600px",
          color1: "rgba(25, 168, 143, 0.04)",
          color2: "rgba(10, 18, 15, 0.2)",
          bgTint: "#040504",
          extraHaze: 0.04,
        }
    }
  }

  const atmo = getAtmosphereConfig(activeSection)

  // Tiny scientific ambient floating particles in Layer 4
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Reduced count for clean, restrained feel
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 35 : 75
    const particles: AmbientParticle[] = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18 - 0.04,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let t = 0
    const render = () => {
      t += 1
      ctx.clearRect(0, 0, width, height)

      // Slight cursor push
      const mx = (mousePos.x * width) / 2
      const my = (-mousePos.y * height) / 2

      ctx.fillStyle = "#19A88F"

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around borders
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        p.phase += p.pulseSpeed
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase))

        ctx.globalAlpha = Math.max(0.04, Math.min(0.65, currentAlpha))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [mousePos.x, mousePos.y])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ backgroundColor: atmo.bgTint, transition: "background-color 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* Layer 2: Subtle radial lighting behind DNA, smoothly follows section position & cursor */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle ${atmo.glowSize} at ${atmo.glowX} ${atmo.glowY}, ${atmo.color1} 0%, ${atmo.color2} 45%, transparent 75%)`,
          transform: `translate3d(${mousePos.x * 12}px, ${-mousePos.y * 10}px, 0)`,
        }}
      />

      {/* Layer 3: Soft green atmospheric haze */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 10%, rgba(25, 168, 143, 0.08) 0%, rgba(14, 33, 27, 0.12) 50%, transparent 80%)",
        }}
      />

      {/* Layer 4: Tiny scientific ambient particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 5: Extremely subtle noise / grain texture (SVG Data URI) */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 6: Occasional thin lines & scientific markings */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Subtle top left coordinate crosshair */}
        <div className="absolute top-24 left-8 text-[9px] font-mono text-[#68736E] tracking-[0.2em] uppercase select-none flex items-center gap-2">
          <span className="text-[#19A88F]/60">+</span>
          <span className="hidden md:inline">21°07'N 79°03'E</span>
        </div>

        {/* Subtle top right registration mark */}
        <div className="absolute top-24 right-8 text-[9px] font-mono text-[#68736E] tracking-[0.2em] uppercase select-none flex items-center gap-2">
          <span className="hidden md:inline">CRISPR_IIITN</span>
          <span className="text-[#19A88F]/60">+</span>
        </div>

        {/* Subtle vertical hairline scale ticks along left border */}
        <div className="absolute left-4 top-1/3 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-30">
          <div className="w-2 h-px bg-[#19A88F]" />
          <div className="w-1 h-px bg-[#68736E]" />
          <div className="w-1 h-px bg-[#68736E]" />
          <div className="w-2 h-px bg-[#19A88F]" />
          <div className="w-1 h-px bg-[#68736E]" />
          <div className="w-1 h-px bg-[#68736E]" />
          <div className="w-2 h-px bg-[#19A88F]" />
        </div>
      </div>

      {/* Layer 7: Subtle light-based gradient depth vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(5, 7, 6, 0.75) 100%)",
        }}
      />
    </div>
  )
}
