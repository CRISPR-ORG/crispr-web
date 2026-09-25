import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useDna } from "../context/DnaContext"

/** Builds a smooth Catmull-Rom curve tracing one strand of the double helix. */
function buildStrandCurve(
  phase: number,
  radius: number,
  height: number,
  frequency: number,
  samples: number,
): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= samples; i++) {
    const u = (i / samples - 0.5) * 2
    const t = u * (height / 2)
    const angle = frequency * t + phase
    points.push(
      new THREE.Vector3(radius * Math.cos(angle), t, radius * Math.sin(angle)),
    )
  }
  return new THREE.CatmullRomCurve3(points)
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
    } else if (
      activeSection === "events" ||
      activeSection === "team" ||
      activeSection === "alumni"
    ) {
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
    renderer.setClearColor(0x000000, 0)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // ══════════════════════════════════════════════════════════════
    // PROCEDURAL DOUBLE HELIX GENERATION
    // ══════════════════════════════════════════════════════════════
    const RADIUS = 2.2
    const HEIGHT = 14.0
    const FREQUENCY = 0.75
    const RUNGS_COUNT = 54
    const PARTICLES_PER_RUNG = 8

    const colCrispr = new THREE.Color("#19A88F")
    const colBright = new THREE.Color("#35D6B3")
    const colMint = new THREE.Color("#9DE8D5")
    const colWhite = new THREE.Color("#F2F4F2")

    const dnaGroup = new THREE.Group()
    scene.add(dnaGroup)

    // 1. GLASS-LIKE STRAND TUBES (two twisting translucent strands)
    const curve1 = buildStrandCurve(0, RADIUS, HEIGHT, FREQUENCY, 160)
    const curve2 = buildStrandCurve(Math.PI, RADIUS, HEIGHT, FREQUENCY, 160)

    const strandGeo1 = new THREE.TubeGeometry(curve1, 200, 0.095, 12, false)
    const strandGeo2 = new THREE.TubeGeometry(curve2, 200, 0.095, 12, false)

    const strandMat1 = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0d2b24"),
      transmission: 0.65,
      thickness: 1.4,
      roughness: 0.14,
      metalness: 0,
      ior: 1.42,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: colCrispr,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.94,
    })
    const strandMat2 = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#123a30"),
      transmission: 0.65,
      thickness: 1.4,
      roughness: 0.14,
      metalness: 0,
      ior: 1.42,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: colBright,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.94,
    })

    const strandMesh1 = new THREE.Mesh(strandGeo1, strandMat1)
    const strandMesh2 = new THREE.Mesh(strandGeo2, strandMat2)
    dnaGroup.add(strandMesh1, strandMesh2)

    // 2. BASE-PAIR RUNGS — instanced glowing spheres connecting the strands
    type RungDatum = {
      x1: number
      y1: number
      z1: number
      x2: number
      y2: number
      z2: number
      frac: number
      phase: number
    }
    const rungData: RungDatum[] = []
    const rungAnchors: {
      x1: number
      y1: number
      z1: number
      x2: number
      y2: number
      z2: number
    }[] = []

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

      rungAnchors.push({ x1, y1, z1, x2, y2, z2 })

      for (let j = 0; j < PARTICLES_PER_RUNG; j++) {
        const frac = (j + 1) / (PARTICLES_PER_RUNG + 1)
        rungData.push({
          x1,
          y1,
          z1,
          x2,
          y2,
          z2,
          frac,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const RUNG_INSTANCE_COUNT = rungData.length
    const rungGeo = new THREE.SphereGeometry(0.05, 8, 8)
    const rungMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const rungMesh = new THREE.InstancedMesh(rungGeo, rungMat, RUNG_INSTANCE_COUNT)
    const rungColorArray = new Float32Array(RUNG_INSTANCE_COUNT * 3)
    for (let i = 0; i < RUNG_INSTANCE_COUNT; i++) {
      const rand = Math.random()
      const c =
        rand < 0.22
          ? colBright
          : rand < 0.4
            ? colWhite
            : rand < 0.75
              ? colCrispr
              : colMint
      rungColorArray[i * 3] = c.r
      rungColorArray[i * 3 + 1] = c.g
      rungColorArray[i * 3 + 2] = c.b
    }
    rungMesh.instanceColor = new THREE.InstancedBufferAttribute(rungColorArray, 3)
    dnaGroup.add(rungMesh)

    // Fine structural lines tracing each base pair (before scatter)
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#19A88F"),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const linePositions = new Float32Array(RUNGS_COUNT * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    const rungLines = new THREE.LineSegments(lineGeo, lineMat)
    dnaGroup.add(rungLines)

    // Restrained cinematic lighting — cyan & emerald key lights, soft fill
    const lightCyan = new THREE.PointLight("#35D6B3", 1.1, 25)
    lightCyan.position.set(4, 3, 6)
    const lightEmerald = new THREE.PointLight("#19A88F", 0.9, 25)
    lightEmerald.position.set(-4, -2.5, 5)
    const ambientLight = new THREE.AmbientLight("#0c1a15", 0.5)
    scene.add(lightCyan, lightEmerald, ambientLight)

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
    const clock = new THREE.Clock()
    let animationFrameId: number
    const dummy = new THREE.Object3D()

    const animate = () => {
      const time = clock.getElapsedTime()
      const state = stateRef.current

      // Smooth lerp positions & rotations
      state.currentX += (state.targetX - state.currentX) * 0.05
      state.currentY += (state.targetY - state.currentY) * 0.05
      state.currentSeparation +=
        (state.separation - state.currentSeparation) * 0.04
      state.currentOpacity += (state.opacity - state.currentOpacity) * 0.05

      const sep = state.currentSeparation
      const sepOffset1 = -sep * 1.6
      const sepOffset2 = sep * 1.6

      // Mouse influence: subtle 5-8 degrees tilt
      const mouseTiltX = state.mousePos.y * 0.12
      const mouseTiltY = state.mousePos.x * 0.18

      // Idle rotation + scroll-driven continuous rotation
      const baseRotationY = time * 0.28 + state.scrollProgress * Math.PI * 4
      dnaGroup.rotation.y = baseRotationY + mouseTiltY
      dnaGroup.rotation.x = mouseTiltX

      // Group position (section-driven drift)
      dnaGroup.position.x = state.currentX
      dnaGroup.position.y = state.currentY

      // Strands drift apart to "unfold" as separation increases
      strandMesh1.position.x = sepOffset1
      strandMesh2.position.x = sepOffset2

      strandMat1.opacity = state.currentOpacity * 0.9
      strandMat2.opacity = state.currentOpacity * 0.9
      rungMat.opacity = state.currentOpacity * 0.85
      lineMat.opacity = Math.max(0.03, 0.22 * (1 - sep * 0.7)) * state.currentOpacity

      // Base-pair rung instances: scatter outward once strands separate
      for (let i = 0; i < RUNG_INSTANCE_COUNT; i++) {
        const d = rungData[i]
        const wave = Math.sin(time * 1.5 + d.y1 * 0.8 + d.phase) * 0.06

        const ex1 = d.x1 + sepOffset1
        const ex2 = d.x2 + sepOffset2

        const rungScatter = sep > 0.3 ? (sep - 0.3) * 1.8 : 0
        const scatterAngle = d.phase + time * 0.5

        const rx =
          ex1 + (ex2 - ex1) * d.frac + Math.cos(scatterAngle) * rungScatter + wave
        const ry = d.y1 + Math.sin(scatterAngle) * rungScatter * 0.5
        const rz = d.z1 + (d.z2 - d.z1) * d.frac + Math.sin(scatterAngle) * rungScatter

        dummy.position.set(rx, ry, rz)
        dummy.updateMatrix()
        rungMesh.setMatrixAt(i, dummy.matrix)
      }
      rungMesh.instanceMatrix.needsUpdate = true

      // Structural connector lines (fade out as strands separate)
      for (let r = 0; r < RUNGS_COUNT; r++) {
        const a = rungAnchors[r]
        linePositions[r * 6] = a.x1 + sepOffset1
        linePositions[r * 6 + 1] = a.y1
        linePositions[r * 6 + 2] = a.z1
        linePositions[r * 6 + 3] = a.x2 + sepOffset2
        linePositions[r * 6 + 4] = a.y2
        linePositions[r * 6 + 5] = a.z2
      }
      ;(lineGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true

      // Subtle living-energy pulse through the strands
      const pulse = 0.3 + Math.sin(time * 1.2) * 0.08
      strandMat1.emissiveIntensity = pulse
      strandMat2.emissiveIntensity = pulse

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
      strandGeo1.dispose()
      strandGeo2.dispose()
      strandMat1.dispose()
      strandMat2.dispose()
      rungGeo.dispose()
      rungMat.dispose()
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
    >
      <div className="dna-hud-overlay" style={{ zIndex: 2 }} />
      <div className="dna-hud-scan" style={{ zIndex: 2 }} />
    </div>
  )
}
