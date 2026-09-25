import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useDna } from "../context/DnaContext"

/**
 * Creates a soft circular particle sprite texture with quadratic falloff.
 * Produces crisp, beautiful bioluminescent particles without heavy shaders.
 */
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

export default function ProceduralDnaCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollProgress, activeSection, mousePos, activeTarget } = useDna()

  // References to keep animation loop decoupled from React renders
  const stateRef = useRef({
    scrollProgress: 0,
    activeSection: "hero",
    mousePos: { x: 0, y: 0 },
    activeTarget: null as string | null,
    targetX: 2.5,
    currentX: 2.5,
    targetY: 0,
    currentY: 0,
    targetRotationY: 0,
    currentRotationY: 0,
    separation: 0,
    currentSeparation: 0,
    opacity: 1,
    currentOpacity: 1,
  })

  // Synchronize incoming state into mutable ref
  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress
    stateRef.current.activeSection = activeSection
    stateRef.current.mousePos = mousePos
    stateRef.current.activeTarget = activeTarget

    // Target positions & separation based on section
    const isMobile = window.innerWidth < 1024

    if (activeSection === "hero") {
      stateRef.current.targetX = isMobile ? 0 : 2.6
      stateRef.current.targetY = 0
      stateRef.current.separation = Math.min(0.5, scrollProgress * 2.5)
      stateRef.current.opacity = 1
    } else if (activeSection === "about") {
      stateRef.current.targetX = isMobile ? 0 : -2.8
      stateRef.current.targetY = -0.5
      stateRef.current.separation = 0.65
      stateRef.current.opacity = 0.85
    } else if (activeSection === "ecosystem") {
      stateRef.current.targetX = 0
      stateRef.current.targetY = 0
      stateRef.current.separation = 1.1
      stateRef.current.opacity = 0.95
    } else if (activeSection === "initiatives") {
      stateRef.current.targetX = isMobile ? 0 : 2.2
      stateRef.current.targetY = 0.4
      stateRef.current.separation = 1.3
      stateRef.current.opacity = 0.8
    } else if (activeSection === "techpulse") {
      stateRef.current.targetX = 0
      stateRef.current.targetY = -0.8
      stateRef.current.separation = 1.5
      stateRef.current.opacity = 0.9
    } else if (activeSection === "events" || activeSection === "team" || activeSection === "alumni") {
      stateRef.current.targetX = isMobile ? 0 : -2.4
      stateRef.current.targetY = 0.2
      stateRef.current.separation = 0.9
      stateRef.current.opacity = 0.75
    } else if (activeSection === "history" || activeSection === "access") {
      stateRef.current.targetX = isMobile ? 0 : 1.8
      stateRef.current.targetY = 0
      stateRef.current.separation = 0.8
      stateRef.current.opacity = 0.85
    } else if (activeSection === "footer") {
      stateRef.current.targetX = 0
      stateRef.current.targetY = 2.0
      stateRef.current.separation = 2.0
      stateRef.current.opacity = 0.15
    }
  }, [scrollProgress, activeSection, mousePos, activeTarget])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 14)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const particleTexture = createParticleTexture()

    // ══════════════════════════════════════════════════════════════
    // PROCEDURAL DOUBLE HELIX GENERATION
    // ══════════════════════════════════════════════════════════════
    const STRAND_POINTS = 550
    const RUNGS_COUNT = 44
    const PARTICLES_PER_RUNG = 7
    const AMBIENT_COUNT = 400
    const STREAM_COUNT = 250

    const TOTAL_PARTICLES =
      STRAND_POINTS * 2 + RUNGS_COUNT * PARTICLES_PER_RUNG + AMBIENT_COUNT + STREAM_COUNT

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(TOTAL_PARTICLES * 3)
    const basePositions = new Float32Array(TOTAL_PARTICLES * 3)
    const colors = new Float32Array(TOTAL_PARTICLES * 3)
    const sizes = new Float32Array(TOTAL_PARTICLES)
    const particleTypes = new Float32Array(TOTAL_PARTICLES) // 0: strand1, 1: strand2, 2: rung, 3: ambient, 4: stream
    const phases = new Float32Array(TOTAL_PARTICLES)

    const RADIUS = 2.2
    const HEIGHT = 14.0
    const FREQUENCY = 0.75

    // Brand color palette instances
    const colDeep = new THREE.Color("#0E211B")
    const colTeal = new THREE.Color("#11473c")
    const colCrispr = new THREE.Color("#19A88F")
    const colBright = new THREE.Color("#35D6B3")
    const colMint = new THREE.Color("#9DE8D5")
    const colWhite = new THREE.Color("#F2F4F2")

    let pIdx = 0

    const setParticle = (
      index: number,
      x: number,
      y: number,
      z: number,
      color: THREE.Color,
      size: number,
      type: number,
    ) => {
      positions[index * 3] = x
      positions[index * 3 + 1] = y
      positions[index * 3 + 2] = z

      basePositions[index * 3] = x
      basePositions[index * 3 + 1] = y
      basePositions[index * 3 + 2] = z

      colors[index * 3] = color.r
      colors[index * 3 + 1] = color.g
      colors[index * 3 + 2] = color.b

      sizes[index] = size
      particleTypes[index] = type
      phases[index] = Math.random() * Math.PI * 2
    }

    // 1. STRAND 1
    for (let i = 0; i < STRAND_POINTS; i++) {
      const u = (i / STRAND_POINTS - 0.5) * 2
      const t = u * (HEIGHT / 2)
      const angle = FREQUENCY * t
      const x = RADIUS * Math.cos(angle)
      const y = t
      const z = RADIUS * Math.sin(angle)

      // Color variation hierarchy
      const rand = Math.random()
      let c = colCrispr
      let sz = 3.6
      if (rand < 0.15) {
        c = colBright
        sz = 4.4
      } else if (rand < 0.22) {
        c = colWhite
        sz = 5.0
      } else if (rand < 0.6) {
        c = colTeal
        sz = 3.0
      }

      setParticle(pIdx++, x, y, z, c, sz, 0)
    }

    // 2. STRAND 2 (Phase shifted by PI)
    for (let i = 0; i < STRAND_POINTS; i++) {
      const u = (i / STRAND_POINTS - 0.5) * 2
      const t = u * (HEIGHT / 2)
      const angle = FREQUENCY * t + Math.PI
      const x = RADIUS * Math.cos(angle)
      const y = t
      const z = RADIUS * Math.sin(angle)

      const rand = Math.random()
      let c = colCrispr
      let sz = 3.6
      if (rand < 0.15) {
        c = colMint
        sz = 4.4
      } else if (rand < 0.22) {
        c = colWhite
        sz = 5.0
      } else if (rand < 0.6) {
        c = colTeal
        sz = 3.0
      }

      setParticle(pIdx++, x, y, z, c, sz, 1)
    }

    // 3. BASE-PAIR RUNGS (connecting Strand 1 & Strand 2)
    for (let r = 0; r < RUNGS_COUNT; r++) {
      const u = (r / RUNGS_COUNT - 0.5) * 2
      const t = u * (HEIGHT / 2)
      const angle = FREQUENCY * t

      const x1 = RADIUS * Math.cos(angle)
      const y1 = t
      const z1 = RADIUS * Math.sin(angle)

      const x2 = RADIUS * Math.cos(angle + Math.PI)
      const y2 = t
      const z2 = RADIUS * Math.sin(angle + Math.PI)

      for (let j = 0; j < PARTICLES_PER_RUNG; j++) {
        const frac = (j + 1) / (PARTICLES_PER_RUNG + 1)
        const rx = x1 + (x2 - x1) * frac
        const ry = y1 + (y2 - y1) * frac
        const rz = z1 + (z2 - z1) * frac

        const rand = Math.random()
        const c = rand < 0.25 ? colBright : rand < 0.7 ? colCrispr : colTeal
        const sz = 2.2 + Math.random() * 1.5

        setParticle(pIdx++, rx, ry, rz, c, sz, 2)
      }
    }

    // 4. AMBIENT SCIENTIFIC PARTICLES (floating around helix cylinder)
    for (let a = 0; a < AMBIENT_COUNT; a++) {
      const t = (Math.random() - 0.5) * HEIGHT * 1.2
      const r = RADIUS * (0.6 + Math.random() * 1.4)
      const theta = Math.random() * Math.PI * 2
      const ax = r * Math.cos(theta)
      const ay = t
      const az = r * Math.sin(theta)

      const c = Math.random() < 0.3 ? colCrispr : colDeep
      const sz = 1.6 + Math.random() * 2.2

      setParticle(pIdx++, ax, ay, az, c, sz, 3)
    }

    // 5. TECHPULSE INFORMATION STREAM PARTICLES (horizontal drift)
    for (let s = 0; s < STREAM_COUNT; s++) {
      const sx = (Math.random() - 0.5) * 20
      const sy = (Math.random() - 0.5) * 4 - 2
      const szCoord = (Math.random() - 0.5) * 5
      const c = Math.random() < 0.4 ? colBright : colCrispr
      const sz = 2.0 + Math.random() * 2.4

      setParticle(pIdx++, sx, sy, szCoord, c, sz, 4)
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    // Points Material with Additive Blending for subtle luminescence
    const material = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    })

    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)

    // Optional fine connection lines between base pairs for structural precision
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#19A88F"),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const linePositions = new Float32Array(RUNGS_COUNT * 6)
    for (let r = 0; r < RUNGS_COUNT; r++) {
      const u = (r / RUNGS_COUNT - 0.5) * 2
      const t = u * (HEIGHT / 2)
      const angle = FREQUENCY * t
      linePositions[r * 6] = RADIUS * Math.cos(angle)
      linePositions[r * 6 + 1] = t
      linePositions[r * 6 + 2] = RADIUS * Math.sin(angle)
      linePositions[r * 6 + 3] = RADIUS * Math.cos(angle + Math.PI)
      linePositions[r * 6 + 4] = t
      linePositions[r * 6 + 5] = RADIUS * Math.sin(angle + Math.PI)
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    const rungLines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(rungLines)

    // Subtle atmospheric point light
    const pointLight = new THREE.PointLight("#35D6B3", 1.8, 25)
    pointLight.position.set(3, 2, 6)
    scene.add(pointLight)

    // Handle Window Resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    // ══════════════════════════════════════════════════════════════
    // ANIMATION & INTERACTION LOOP
    // ══════════════════════════════════════════════════════════════
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const dt = clock.getDelta()
      const time = clock.getElapsedTime()
      const state = stateRef.current

      // Smooth lerp positions & rotations
      state.currentX += (state.targetX - state.currentX) * 0.05
      state.currentY += (state.targetY - state.currentY) * 0.05
      state.currentSeparation += (state.separation - state.currentSeparation) * 0.04
      state.currentOpacity += (state.opacity - state.currentOpacity) * 0.05

      // Mouse influence: subtle 5-8 degrees tilt
      const mouseTiltX = state.mousePos.y * 0.12
      const mouseTiltY = state.mousePos.x * 0.18

      // Idle rotation + scroll-driven continuous rotation
      const baseRotationY = time * 0.28 + state.scrollProgress * Math.PI * 4
      pointCloud.rotation.y = baseRotationY + mouseTiltY
      pointCloud.rotation.x = mouseTiltX
      rungLines.rotation.y = pointCloud.rotation.y
      rungLines.rotation.x = pointCloud.rotation.x

      // Group position
      pointCloud.position.x = state.currentX
      pointCloud.position.y = state.currentY
      rungLines.position.x = state.currentX
      rungLines.position.y = state.currentY

      material.opacity = state.currentOpacity
      lineMat.opacity = Math.max(0.04, 0.22 * (1 - state.currentSeparation * 0.7))

      // Dynamic Particle Morphing based on separation & active section
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array
      const sep = state.currentSeparation

      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const type = particleTypes[i]
        const bx = basePositions[i * 3]
        const by = basePositions[i * 3 + 1]
        const bz = basePositions[i * 3 + 2]
        const phase = phases[i]

        // Microscopic organic breathing undulation
        const wave = Math.sin(time * 1.5 + by * 0.8 + phase) * 0.08

        if (type === 0) {
          // Strand 1: drifts left/outward on separation
          const sepX = -sep * 1.6
          posArray[i * 3] = bx + sepX + wave
          posArray[i * 3 + 1] = by
          posArray[i * 3 + 2] = bz + wave
        } else if (type === 1) {
          // Strand 2: drifts right/outward on separation
          const sepX = sep * 1.6
          posArray[i * 3] = bx + sepX - wave
          posArray[i * 3 + 1] = by
          posArray[i * 3 + 2] = bz - wave
        } else if (type === 2) {
          // Rungs: dissolve outward when strands separate
          const rungScatter = sep > 0.3 ? (sep - 0.3) * 1.8 : 0
          const scatterAngle = phase + time * 0.5
          posArray[i * 3] = bx + Math.cos(scatterAngle) * rungScatter + wave
          posArray[i * 3 + 1] = by + Math.sin(scatterAngle) * rungScatter * 0.5
          posArray[i * 3 + 2] = bz + Math.sin(scatterAngle) * rungScatter
        } else if (type === 3) {
          // Ambient particles: slow orbital drift
          const orbAngle = time * 0.15 + phase
          const r = Math.sqrt(bx * bx + bz * bz) + wave * 2
          posArray[i * 3] = r * Math.cos(orbAngle)
          posArray[i * 3 + 1] = by + Math.sin(time * 0.5 + phase) * 0.4
          posArray[i * 3 + 2] = r * Math.sin(orbAngle)
        } else if (type === 4) {
          // Information stream for TechPulse
          if (state.activeSection === "techpulse") {
            let sx = posArray[i * 3] - dt * 4.5
            if (sx < -12) sx = 12
            posArray[i * 3] = sx
            posArray[i * 3 + 1] = by + Math.sin(sx * 0.6 + time * 2) * 0.35
            posArray[i * 3 + 2] = bz + Math.cos(sx * 0.4 + time) * 0.3
          } else {
            // Keep inactive or subtle
            posArray[i * 3] = bx
            posArray[i * 3 + 1] = by - 15 // hidden offscreen
            posArray[i * 3 + 2] = bz
          }
        }
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  )
}
