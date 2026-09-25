import { Outlet, useLocation } from "react-router"
import { useEffect, useRef } from "react"
import { DnaProvider } from "../context/DnaContext"
import EnvironmentalBackground from "./EnvironmentalBackground"
import ProceduralDnaCanvas from "./ProceduralDnaCanvas"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Root() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname])

  return (
    <DnaProvider>
      <div className="relative min-h-screen flex flex-col bg-[#050706] text-[#F2F4F2] selection:bg-[#19A88F]/30 selection:text-[#F2F4F2]">
        {/* Layer 1 - 7: Multi-depth environmental background with subtle particles and atmospheric lighting */}
        <EnvironmentalBackground />

        {/* 3D WebGL Procedural Interactive Double Helix System */}
        <ProceduralDnaCanvas />

        {/* Persistent Floating Navigation */}
        <Navbar />

        {/* Content Shell */}
        <main ref={mainRef} className="flex-1 relative z-20">
          <Outlet />
        </main>

        {/* Closing Calm Footer */}
        <Footer />
      </div>
    </DnaProvider>
  )
}
