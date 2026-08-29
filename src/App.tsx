import { useState } from "react"
import { RouterProvider } from "react-router"
import { router } from "./routes"
import Loader, { shouldBoot } from "./components/Loader"

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)

  return (
    <>
      {booting && <Loader onDone={() => setBooting(false)} />}
      <RouterProvider router={router} />
    </>
  )
}
