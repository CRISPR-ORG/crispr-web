import { createBrowserRouter } from "react-router"
import Root from "./components/Root"
import Home from "./pages/Home"
import Team from "./pages/Team"
import Products from "./pages/Products"
import Events from "./pages/Events"
import Alumni from "./pages/Alumni"
import Aira from "./pages/Aira"
import Contact from "./pages/Contact"
import AuthBahn from "./pages/AuthBahn"
import Badal from "./pages/Badal"
import FtpUpload from "./pages/FtpUpload"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "team", Component: Team },
      { path: "products", Component: Products },
      { path: "events", Component: Events },
      { path: "alumni", Component: Alumni },
      { path: "aira", Component: Aira },
      { path: "contact", Component: Contact },
      { path: "authbahn", Component: AuthBahn },
      { path: "badal", Component: Badal },
      { path: "ftp-upload", Component: FtpUpload },
    ],
  },
])
