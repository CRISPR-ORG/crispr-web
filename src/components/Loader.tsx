import { useEffect, useRef } from "react"
import * as THREE from "three"

/** Soft circular particle sprite with quadratic falloff. */
function createParticleTexture(): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")!

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
  gradient.addColorStop(0.2, "rgba(53, 214, 179, 0.95)")
  gradient.addColorStop(0.5, "rgba(25, 168, 143, 0.45)")
  gradient.addColorStop(0.85, "rgba(14, 33, 27, 0.15)")
  gradient.addColorStop(1, "rgba(5, 7, 6, 0)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const smoothstep = (t: number) => {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}

/** Boot sequence timeline, in seconds from mount. */
const T = {
  particlesAppear: [0.3, 0.7],
  formStrands: [0.7, 1.2],
  twist: [1.2, 1.7],
  basePairs: [1.7, 2.1],
  stretch: [3.0, 3.4],
  explode: [3.4, 3.5],
} as const

const TOTAL_MS = 3500

export default function Loader({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const finishedRef = useRef(false)

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    try {
      sessionStorage.setItem("crispr_booted", "true")
    } catch {}
    onDone()
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 8.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setClearColor(0x000000, 0)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const particleTexture = createParticleTexture()

    // ══════════════════════════════════════════════════════════════
    // PARTICLE FIELD — each particle knows where it scatters from,
    // where it settles on the helix, and where it flies apart to.
    // ══════════════════════════════════════════════════════════════
    const RADIUS = 1.4
    const HEIGHT = 7.2
    const FREQUENCY = 0.95
    const STRAND_POINTS = 130
    const RUNGS_COUNT = 26
    const PARTICLES_PER_RUNG = 4

    const colCrispr = new THREE.Color("#19A88F")
    const colBright = new THREE.Color("#35D6B3")
    const colMint = new THREE.Color("#9DE8D5")
    const colWhite = new THREE.Color("#F2F4F2")

    type Kind = "strand1" | "strand2" | "rung"
    type Particle = {
      target: THREE.Vector3
      scatter: THREE.Vector3
      explodeDir: THREE.Vector3
      explodeMag: number
      kind: Kind
      color: THREE.Color
      size: number
    }
    const particles: Particle[] = []

    const randomScatter = () => {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize()
      const dist = 4 + Math.random() * 4.5
      return dir.multiplyScalar(dist)
    }

    for (const kind of ["strand1", "strand2"] as const) {
      const phase = kind === "strand1" ? 0 : Math.PI
      for (let i = 0; i < STRAND_POINTS; i++) {
        const u = (i / STRAND_POINTS - 0.5) * 2
        const t = u * (HEIGHT / 2)
        const angle = FREQUENCY * t + phase
        const target = new THREE.Vector3(
          RADIUS * Math.cos(angle),
          t,
          RADIUS * Math.sin(angle),
        )
        const scatter = randomScatter()
        const rand = Math.random()
        const color =
          rand < 0.18
            ? colBright
            : rand < 0.3
              ? colWhite
              : kind === "strand1"
                ? colCrispr
                : colMint
        particles.push({
          target,
          scatter,
          explodeDir: scatter.clone().normalize(),
          explodeMag: 6 + Math.random() * 6,
          kind,
          color,
          size: 3 + Math.random() * 2,
        })
      }
    }

    for (let r = 0; r < RUNGS_COUNT; r++) {
      const u = (r / RUNGS_COUNT - 0.5) * 2
      const t = u * (HEIGHT / 2)
      const angle = FREQUENCY * t
      const x1 = RADIUS * Math.cos(angle)
      const z1 = RADIUS * Math.sin(angle)
      const x2 = RADIUS * Math.cos(angle + Math.PI)
      const z2 = RADIUS * Math.sin(angle + Math.PI)
      for (let j = 0; j < PARTICLES_PER_RUNG; j++) {
        const frac = (j + 1) / (PARTICLES_PER_RUNG + 1)
        const target = new THREE.Vector3(
          x1 + (x2 - x1) * frac,
          t,
          z1 + (z2 - z1) * frac,
        )
        const scatter = randomScatter()
        const rand = Math.random()
        const color = rand < 0.3 ? colBright : rand < 0.6 ? colWhite : colCrispr
        particles.push({
          target,
          scatter,
          explodeDir: scatter.clone().normalize(),
          explodeMag: 5 + Math.random() * 5,
          kind: "rung",
          color,
          size: 2.2 + Math.random() * 1.6,
        })
      }
    }

    const count = particles.length
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    particles.forEach((p, i) => {
      positions[i * 3] = p.scatter.x
      positions[i * 3 + 1] = p.scatter.y
      positions[i * 3 + 2] = p.scatter.z
      colors[i * 3] = 0
      colors[i * 3 + 1] = 0
      colors[i * 3 + 2] = 0
      sizes[i] = p.size
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.09,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Idle spin, with a fast burst during the "twisting" beat
    const SPIN_SLOW = 0.35
    const SPIN_FAST = 2.4
    const getRotation = (t: number) => {
      const capped = Math.min(t, T.stretch[0])
      if (capped <= T.twist[0]) return capped * SPIN_SLOW
      const base = T.twist[0] * SPIN_SLOW
      if (capped <= T.twist[1]) return base + (capped - T.twist[0]) * SPIN_FAST
      const held = base + (T.twist[1] - T.twist[0]) * SPIN_FAST
      return held + (capped - T.twist[1]) * SPIN_SLOW
    }

    const startTime = performance.now()
    let animationFrameId: number

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
      const posArr = posAttr.array as Float32Array
      const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute

      for (let i = 0; i < count; i++) {
        const p = particles[i]
        const isRung = p.kind === "rung"
        let opacity = 1
        let pos: THREE.Vector3 = p.target

        if (elapsed < T.particlesAppear[0]) {
          opacity = 0
          pos = p.scatter
        } else if (elapsed < T.particlesAppear[1]) {
          const localT = smoothstep(
            (elapsed - T.particlesAppear[0]) /
              (T.particlesAppear[1] - T.particlesAppear[0]),
          )
          opacity = isRung ? 0 : localT
          pos = p.scatter
        } else if (elapsed < T.formStrands[1]) {
          const localT = smoothstep(
            (elapsed - T.formStrands[0]) /
              (T.formStrands[1] - T.formStrands[0]),
          )
          if (isRung) {
            opacity = 0
            pos = p.scatter
          } else {
            opacity = 1
            pos = p.scatter.clone().lerp(p.target, localT)
          }
        } else if (elapsed < T.twist[1]) {
          if (isRung) {
            opacity = 0
            pos = p.scatter
          } else {
            opacity = 1
            pos = p.target
          }
        } else if (elapsed < T.basePairs[1]) {
          const localT = smoothstep(
            (elapsed - T.basePairs[0]) / (T.basePairs[1] - T.basePairs[0]),
          )
          if (isRung) {
            opacity = localT
            pos = p.scatter.clone().lerp(p.target, localT)
          } else {
            opacity = 1
            pos = p.target
          }
        } else if (elapsed < T.explode[0]) {
          opacity = 1
          pos = p.target
        } else {
          const localT = smoothstep(
            (elapsed - T.explode[0]) / (T.explode[1] - T.explode[0]),
          )
          opacity = 1 - localT
          pos = p.target
            .clone()
            .addScaledVector(p.explodeDir, localT * p.explodeMag)
        }

        posArr[i * 3] = pos.x
        posArr[i * 3 + 1] = pos.y
        posArr[i * 3 + 2] = pos.z

        // No per-vertex opacity on PointsMaterial — fade brightness instead;
        // with additive blending, black contributes nothing (== invisible).
        colorAttr.setXYZ(
          i,
          p.color.r * opacity,
          p.color.g * opacity,
          p.color.b * opacity,
        )
      }
      posAttr.needsUpdate = true
      colorAttr.needsUpdate = true

      points.rotation.y = getRotation(elapsed)

      if (elapsed >= T.stretch[0]) {
        const localT = smoothstep(
          (elapsed - T.stretch[0]) / (T.stretch[1] - T.stretch[0]),
        )
        points.scale.x = 1 + localT * 1.9
        points.scale.z = 1 - localT * 0.35
      }

      renderer.render(scene, camera)

      if (elapsed < TOTAL_MS / 1000 + 0.1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    const doneTimer = window.setTimeout(finish, TOTAL_MS)

    const skip = () => {
      window.clearTimeout(doneTimer)
      finish()
    }
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.clearTimeout(doneTimer)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      particleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className="loader-root fixed inset-0 z-[100] bg-[#050706] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Initializing CRISPR"
    >
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

      {/* CRISPR wordmark + tagline, timed to fade in/out via CSS keyframes */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="loader-crispr text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#F2F4F2]">
          CRISPR
        </h1>
        <p className="loader-tagline mt-3 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#35D6B3]">
          Rewriting the Campus DNA
        </p>
      </div>

      {/* Top technical rail */}
      <div className="absolute top-6 left-0 right-0 px-6 sm:px-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#68736E] pointer-events-none">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#19A88F] animate-pulse" />
          CRISPR · IIIT NAGPUR
        </span>
        <span>INITIALIZING</span>
      </div>

      {/* Bottom rail + progress */}
      <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#68736E] pointer-events-none">
        <span>Assembling genome</span>
        <span className="hidden sm:inline">Press any key or click to skip</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#15221c]">
        <div className="loader-progress-bar h-full bg-[#19A88F]" />
      </div>
    </div>
  )
}

export function shouldBoot() {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false
  try {
    return sessionStorage.getItem("crispr_booted") !== "true"
  } catch {
    return true
  }
}
