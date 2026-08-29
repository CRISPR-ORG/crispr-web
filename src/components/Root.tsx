import { Outlet, useLocation } from "react-router"
import { useEffect, useRef } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Root() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    const el = mainRef.current
    if (!el) return
    el.classList.remove("page-animate")
    void el.offsetWidth // force reflow so the animation restarts
    el.classList.add("page-animate")
  }, [pathname])

  return (
    <div className="crt flex min-h-full flex-col bg-[color:var(--color-bg)]">
      <span className="sweep" aria-hidden />
      <Navbar />
      <main ref={mainRef} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
